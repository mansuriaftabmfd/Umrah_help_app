import { NextResponse } from "next/server";
import { matchSacredText } from "@/data/sacredTexts";

export const dynamic = "force-dynamic";

// Free OCR keys with automatic failover
const OCR_KEYS = ["helloworld", "K81498188888957"];

async function runOcrSpace(base64Image: string): Promise<string> {
  // Ensure data URL format
  let cleanBase64 = base64Image;
  if (!cleanBase64.startsWith("data:")) {
    cleanBase64 = `data:image/jpeg;base64,${cleanBase64}`;
  }

  for (const key of OCR_KEYS) {
    try {
      const form = new URLSearchParams();
      form.append("base64Image", cleanBase64);
      form.append("language", "auto");
      form.append("OCREngine", "2");
      form.append("isOverlayRequired", "false");
      form.append("detectOrientation", "true");

      const res = await fetch("https://api.ocr.space/parse/image", {
        method: "POST",
        headers: {
          apikey: key,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: form.toString(),
      });

      if (!res.ok) continue;

      const data = await res.json();
      if (data?.IsErroredOnProcessing === false && Array.isArray(data?.ParsedResults)) {
        const text = data.ParsedResults.map((r: any) => r.ParsedText || "").join("\n").trim();
        if (text && text.length > 1) {
          return text;
        }
      }
    } catch (err) {
      console.warn(`OCR.space attempt with key ${key} failed:`, err);
    }
  }

  return "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { 
      imageBase64, 
      extractedText, 
      targetLang = "gu" 
    } = body as { 
      imageBase64?: string; 
      extractedText?: string; 
      targetLang?: string; 
    };

    let textToTranslate = (extractedText || "").trim();

    // If client did not provide pre-extracted text, run server-side OCR on the uploaded image
    if (!textToTranslate && imageBase64) {
      textToTranslate = await runOcrSpace(imageBase64);
    }

    if (!textToTranslate) {
      return NextResponse.json({
        detectedText: "",
        translation: "Could not detect clear text from this image. Please ensure the text is well-lit, sharp, and in focus.",
        targetLang,
        source: "empty",
      });
    }

    // Check if the detected text matches a canonical Sacred Text for rich reference metadata
    const sacredMatch = matchSacredText(textToTranslate);

    // Call Google GTX Live API with sl=auto so it automatically detects Arabic, Urdu, Persian, etc.
    const gtxUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(textToTranslate)}`;
    const res = await fetch(gtxUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });

    let translation = "";
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && Array.isArray(data[0])) {
        translation = data[0].map((item: any) => item[0]).filter(Boolean).join("");
      }
    }

    // If Google translation is empty but we have a sacred database match, use that
    if (!translation && sacredMatch) {
      translation = targetLang === "hi" 
        ? sacredMatch.translation_hi 
        : targetLang === "en" 
        ? sacredMatch.translation_en 
        : sacredMatch.translation_gu;
    }

    if (!translation) {
      translation = textToTranslate;
    }

    return NextResponse.json({
      detectedText: textToTranslate,
      translation,
      targetLang,
      pronunciation_gu: sacredMatch?.pronunciation_gu || undefined,
      reference: sacredMatch?.reference || undefined,
      title: sacredMatch?.title || undefined,
      category: sacredMatch?.category || undefined,
      source: "dynamic-ai-ocr-gtx",
    });
  } catch (err: any) {
    return NextResponse.json({
      error: err.message,
      translation: "Error processing camera translation: " + err.message,
    }, { status: 500 });
  }
}

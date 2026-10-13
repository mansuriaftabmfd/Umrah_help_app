import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const text = url.searchParams.get("text") || "majama cho ne ke nai ese kaam karega";
  const from = url.searchParams.get("from") || "gu";
  const to = url.searchParams.get("to") || "ar";

  return doTranslate(text, from, to);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { text, from = "auto", to = "gu" } = body as { text?: string; from?: string; to?: string };

  if (!text || !text.trim()) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }

  return doTranslate(text, from, to);
}

async function transliterateText(text: string, lang: string = "gu"): Promise<string | null> {
  try {
    const itcMap: Record<string, string> = {
      gu: "gu-t-i0-und",
      hi: "hi-t-i0-und",
      ur: "ur-t-i0-und",
      ar: "ar-t-i0-und",
    };
    const itc = itcMap[lang] || "gu-t-i0-und";
    const url = `https://inputtools.google.com/request?text=${encodeURIComponent(text.trim())}&itc=${itc}&num=1`;
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json && json[0] === "SUCCESS" && Array.isArray(json[1])) {
      const parts = json[1].map((item: any) => {
        if (Array.isArray(item[1]) && item[1].length > 0) {
          return item[1][0];
        }
        return item[0];
      });
      return parts.join(" ");
    }
    return null;
  } catch {
    return null;
  }
}

async function fetchGoogleGTX(text: string, sl: string, tl: string) {
  const gtxUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(text.trim())}`;
  const res = await fetch(gtxUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    },
  });
  if (!res.ok) return null;
  const data = await res.json();
  let translated = "";
  if (Array.isArray(data) && Array.isArray(data[0])) {
    translated = data[0].map((item: any) => item[0]).filter(Boolean).join("");
  } else {
    translated = text;
  }
  const detectedLang = data[2] || sl;
  return { translated, detectedLang };
}

async function doTranslate(text: string, from: string, to: string) {
  const cleanText = text.trim();
  const hasLatin = /[a-zA-Z]/.test(cleanText);
  let effectiveText = cleanText;
  let transliterated: string | null = null;
  let isRomanized = false;

  // 1. If from is Gujarati, Hindi, Urdu, or Auto, but user wrote in Latin English alphabet (e.g. "majama cho", "kese ho")
  if (hasLatin && (from === "gu" || from === "hi" || from === "ur" || from === "auto")) {
    const targetLangForTranslit = from === "auto" ? "gu" : from;
    const translit = await transliterateText(cleanText, targetLangForTranslit);
    if (translit && translit !== cleanText) {
      transliterated = translit;
      effectiveText = translit;
      isRomanized = true;
    }
  }

  try {
    const sl = isRomanized ? (from === "auto" ? "gu" : from) : (from === "auto" ? "auto" : from);
    const tl = to;

    let res = await fetchGoogleGTX(effectiveText, sl, tl);

    // If translation resulted in the exact same text or failed to translate Romanized text:
    // Try Hindi or Gujarati transliteration fallback
    if (
      res &&
      res.translated.trim().toLowerCase() === cleanText.toLowerCase() &&
      hasLatin &&
      !isRomanized
    ) {
      // Try Gujarati transliteration first
      let translit = await transliterateText(cleanText, "gu");
      if (translit && translit !== cleanText) {
        const retryRes = await fetchGoogleGTX(translit, "gu", tl);
        if (retryRes && retryRes.translated.trim().toLowerCase() !== cleanText.toLowerCase()) {
          res = retryRes;
          transliterated = translit;
          isRomanized = true;
        }
      }

      // If still same, try Hindi transliteration
      if (res.translated.trim().toLowerCase() === cleanText.toLowerCase()) {
        translit = await transliterateText(cleanText, "hi");
        if (translit && translit !== cleanText) {
          const retryRes = await fetchGoogleGTX(translit, "hi", tl);
          if (retryRes && retryRes.translated.trim().toLowerCase() !== cleanText.toLowerCase()) {
            res = retryRes;
            transliterated = translit;
            isRomanized = true;
          }
        }
      }
    }

    if (res && res.translated) {
      return NextResponse.json({
        translation: res.translated,
        transliteratedText: transliterated,
        isRomanized,
        detectedLanguage: isRomanized ? `${from} (Romanized)` : res.detectedLang,
        source: "google-gtx",
        from,
        to,
        originalText: cleanText,
      });
    }

    // Fallback: MyMemory API
    const mmUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(effectiveText)}&langpair=${sl}|${tl}`;
    const mmRes = await fetch(mmUrl);
    if (mmRes.ok) {
      const mmData = await mmRes.json();
      return NextResponse.json({
        translation: mmData.responseData?.translatedText || cleanText,
        transliteratedText: transliterated,
        isRomanized,
        source: "mymemory",
        from,
        to,
        originalText: cleanText,
      });
    }

    return NextResponse.json({
      translation: effectiveText,
      transliteratedText: transliterated,
      isRomanized,
      from,
      to,
      originalText: cleanText,
    });
  } catch (err: any) {
    return NextResponse.json({
      error: err.message,
      translation: cleanText,
      source: "error-fallback",
      from,
      to,
      originalText: cleanText,
    }, { status: 500 });
  }
}

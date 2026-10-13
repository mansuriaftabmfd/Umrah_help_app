import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const text = (url.searchParams.get("text") || "").trim();
    const lang = (url.searchParams.get("lang") || "ar").trim();

    if (!text) {
      return NextResponse.json({ error: "Text parameter is required" }, { status: 400 });
    }

    // Language mapping for Google TTS
    const langMap: Record<string, string> = {
      gu: "gu",
      ar: "ar",
      hi: "hi",
      ur: "ur",
      en: "en",
      auto: "gu",
    };

    const targetLang = langMap[lang] || lang || "ar";

    // Limit text length to prevent URL overflow (TTS limit is ~200 chars)
    const truncatedText = text.slice(0, 200);

    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${targetLang}&client=tw-ob&q=${encodeURIComponent(truncatedText)}`;

    const res = await fetch(ttsUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: "https://translate.google.com/",
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "TTS service responded with error" }, { status: res.status });
    }

    const audioBuffer = await res.arrayBuffer();

    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.byteLength.toString(),
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error: any) {
    console.error("TTS generation error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate TTS audio" }, { status: 500 });
  }
}

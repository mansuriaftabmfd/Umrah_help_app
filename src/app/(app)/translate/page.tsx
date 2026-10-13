"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { 
  Languages, Camera, Loader2, Volume2, VolumeX, Copy, Check, 
  ArrowRightLeft, Sparkles, Mic, MicOff, RotateCcw, X, 
  Search, BookOpen, MapPin, Compass, ShieldAlert, ShoppingBag, 
  Coffee, MessageCircle, AlertTriangle, Image as ImageIcon,
  ExternalLink, FlipHorizontal, Zap, RefreshCw, Eye, Sun, Moon
} from "lucide-react";
import { Card, Badge, cn } from "@/components/ui";
import { UMRAH_PHRASES, type UmrahPhrase } from "@/data/umrahPhrases";
import { SACRED_TEXTS_DB, matchSacredText } from "@/data/sacredTexts";

const LANGS = [
  { code: "auto", label: "Auto (Hinglish / Gujlish / Any)", voiceCode: "gu-IN" },
  { code: "gu", label: "Gujarati (ગુજરાતી)", voiceCode: "gu-IN" },
  { code: "hi", label: "Hindi (हिन्दी)", voiceCode: "hi-IN" },
  { code: "ar", label: "Arabic (العربية)", voiceCode: "ar-SA" },
  { code: "en", label: "English", voiceCode: "en-US" },
  { code: "ur", label: "Urdu (اردو)", voiceCode: "ur-PK" },
];

const TARGET_LANGS = [
  { code: "gu", label: "Gujarati (ગુજરાતી)", voiceCode: "gu-IN" },
  { code: "ar", label: "Arabic (العربية)", voiceCode: "ar-SA" },
  { code: "hi", label: "Hindi (हिन्दी)", voiceCode: "hi-IN" },
  { code: "en", label: "English", voiceCode: "en-US" },
  { code: "ur", label: "Urdu (اردو)", voiceCode: "ur-PK" },
];

// Quick Sacred Signboards for 1-tap instant AR simulation / verification
const SACRED_SIGNBOARDS = [
  { 
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", 
    label: "Tawaf Sunnah Dua (Rabbana Atina)", 
    category: "Dua" 
  },
  { arabic: "المطاف", label: "Mataf (Ka'bah Floor)", category: "Haram" },
  { arabic: "المسعى", label: "Masa'a (Safa & Marwah)", category: "Haram" },
  { arabic: "دورات المياه والوضوء", label: "Restrooms & Wudhu", category: "Facility" },
  { arabic: "باب الملك عبد العزيز", label: "King Abdulaziz Gate 1", category: "Gates" },
  { arabic: "بئر زمزم", label: "Zamzam Well", category: "Haram" },
  { arabic: "مخرج طوارئ", label: "Emergency Exit", category: "Safety" },
  { arabic: "صيدلية", label: "Pharmacy", category: "Medical" },
  { arabic: "إسعاف / عيادة طبية", label: "Medical Aid / Clinic", category: "Medical" },
];

interface HistoryItem {
  id: string;
  source: string;
  translated: string;
  from: string;
  to: string;
  timestamp: number;
}

export default function TranslatePage() {
  const [sourceText, setSourceText] = useState("");
  const [result, setResult] = useState("");
  const [transliteratedText, setTransliteratedText] = useState<string | null>(null);
  const [from, setFrom] = useState("gu");
  const [to, setTo] = useState("ar");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeSpeakingText, setActiveSpeakingText] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const speechRecognitionRef = useRef<any>(null);

  // ── Live AR Camera Scanner State ──────────────────────────────────────────
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<"environment" | "user">("environment");
  const [isCameraScanning, setIsCameraScanning] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [ocrStatus, setOcrStatus] = useState<string>("");
  const [darkInvertedNotice, setDarkInvertedNotice] = useState(false);
  const [isLiveStreamActive, setIsLiveStreamActive] = useState(false);
  const [capturedSnapshot, setCapturedSnapshot] = useState<string | null>(null);
  
  // AR Live Overlay result (Google Translate AR style)
  const [arOverlay, setArOverlay] = useState<{
    detectedArabic: string;
    translation: string;
    targetLang: string;
    pronunciation_gu?: string;
    reference?: string;
    title?: string;
    snapshotUrl?: string;
  } | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const pageFileInputRef = useRef<HTMLInputElement | null>(null);
  const mobileCameraInputRef = useRef<HTMLInputElement | null>(null);

  // Phrasebook state
  const [phraseSearch, setPhraseSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // History state
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("umrah_translate_history");
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const saveToHistory = (source: string, translated: string, fromLang: string, toLang: string) => {
    try {
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        source,
        translated,
        from: fromLang,
        to: toLang,
        timestamp: Date.now(),
      };
      const updated = [newItem, ...history.filter(h => h.source !== source)].slice(0, 10);
      setHistory(updated);
      localStorage.setItem("umrah_translate_history", JSON.stringify(updated));
    } catch {}
  };

  // Perform Text Translation
  const handleTranslate = async (textToTranslate?: string) => {
    const text = (textToTranslate ?? sourceText).trim();
    if (!text) return;

    setLoading(true);
    setErrorMsg(null);
    setTransliteratedText(null);

    // Fast check: Is it in sacred text DB?
    const sacred = matchSacredText(text);
    if (sacred && to === "gu") {
      setResult(sacred.translation_gu);
      setLoading(false);
      saveToHistory(text, sacred.translation_gu, from, to);
      return;
    }

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, from, to }),
      });

      const data = await res.json();

      if (data.translation) {
        setResult(data.translation);
        if (data.transliteratedText) {
          setTransliteratedText(data.transliteratedText);
        }
        saveToHistory(text, data.translation, from, to);
      } else {
        throw new Error(data.error || "No translation returned");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Translation failed. Check connection.");
    } finally {
      setLoading(false);
    }
  };

  // Swap languages
  const handleSwapLanguages = () => {
    const prevFrom = from === "auto" ? "gu" : from;
    const prevTo = to;
    setFrom(prevTo);
    setTo(prevFrom);
    if (result && !loading) {
      setSourceText(result);
      setResult(sourceText);
    }
  };

  // Copy text
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Audio Speech Playback (Server-side TTS /api/tts with SpeechSynthesis fallback)
  const handleSpeak = (text: string, langCode: string) => {
    const cleanText = text?.trim();
    if (!cleanText) return;

    // If currently speaking this exact text, toggle off (stop)
    if (activeSpeakingText === cleanText && isPlayingAudio) {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current.currentTime = 0;
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
      setActiveSpeakingText(null);
      return;
    }

    setIsPlayingAudio(true);
    setActiveSpeakingText(cleanText);

    // 1. First priority: High-quality Server-Side TTS stream (/api/tts)
    // Works reliably on 100% of mobile phones without needing language packs
    try {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current.currentTime = 0;
      }

      const encodedText = encodeURIComponent(cleanText.slice(0, 200));
      const ttsUrl = `/api/tts?text=${encodedText}&lang=${encodeURIComponent(langCode)}`;
      const audio = new Audio(ttsUrl);
      audioPlayerRef.current = audio;

      audio.onplay = () => {
        setIsPlayingAudio(true);
        setActiveSpeakingText(cleanText);
      };
      audio.onended = () => {
        setIsPlayingAudio(false);
        setActiveSpeakingText(null);
      };
      audio.onerror = () => {
        fallbackSpeechSynthesis(cleanText, langCode);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          fallbackSpeechSynthesis(cleanText, langCode);
        });
      }
    } catch {
      fallbackSpeechSynthesis(cleanText, langCode);
    }
  };

  const fallbackSpeechSynthesis = (text: string, langCode: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setIsPlayingAudio(false);
      setActiveSpeakingText(null);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();

      const utterance = new SpeechSynthesisUtterance(text);
      const langObj = TARGET_LANGS.find(l => l.code === langCode) || LANGS.find(l => l.code === langCode);
      utterance.lang = langObj?.voiceCode || (langCode === "ar" ? "ar-SA" : "en-US");
      utterance.rate = 0.9;

      utterance.onstart = () => {
        setIsPlayingAudio(true);
        setActiveSpeakingText(text);
      };
      utterance.onend = () => {
        setIsPlayingAudio(false);
        setActiveSpeakingText(null);
      };
      utterance.onerror = () => {
        setIsPlayingAudio(false);
        setActiveSpeakingText(null);
      };

      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 50);
    } catch {
      setIsPlayingAudio(false);
      setActiveSpeakingText(null);
    }
  };

  // Voice Input (Speech Recognition with mobile error diagnostics)
  const handleToggleVoiceInput = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setErrorMsg("Voice input is not supported in this browser. Please use Chrome on Android or Edge.");
      return;
    }

    if (isListening) {
      if (speechRecognitionRef.current) {
        try {
          speechRecognitionRef.current.stop();
        } catch {}
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      speechRecognitionRef.current = recognition;

      const langObj = LANGS.find((l) => l.code === from);
      recognition.lang = langObj?.voiceCode || "gu-IN";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsListening(true);
        setErrorMsg(null);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event);
        setIsListening(false);
        if (event.error === "not-allowed" || event.error === "service-not-allowed") {
          setErrorMsg("Microphone permission was denied. Please allow microphone in your browser settings.");
        } else if (event.error === "no-speech") {
          setErrorMsg("No speech detected. Please speak closer to your phone microphone.");
        } else if (event.error === "network") {
          setErrorMsg("Voice typing requires an internet connection.");
        } else {
          setErrorMsg(`Voice input: ${event.error || "Please speak again."}`);
        }
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          setSourceText(transcript);
          handleTranslate(transcript);
        }
        setIsListening(false);
      };

      recognition.start();
    } catch (err: any) {
      console.error("Speech recognition error:", err);
      setIsListening(false);
      setErrorMsg(err.message || "Could not start microphone. Check browser permissions.");
    }
  };

  // ── LIVE CAMERA FUNCTIONS (Google Translate Camera Lens) ───────────────────
  // Always opens the in-app AR Scanner Viewfinder modal.
  // Attempts live WebRTC video stream; if restricted by HTTP, keeps modal open for in-app scanning.
  const startCamera = async (facing: "environment" | "user" = cameraFacing) => {
    setCameraError(null);
    setArOverlay(null);
    setCapturedSnapshot(null);

    // 1. ALWAYS open the scanner interface modal immediately
    setIsCameraOpen(true);

    // 2. Check if live WebRTC stream is supported by browser/context
    const hasGetUserMedia = typeof navigator !== "undefined" && 
      navigator?.mediaDevices && 
      typeof navigator.mediaDevices.getUserMedia === "function";

    if (!hasGetUserMedia) {
      console.log("WebRTC getUserMedia not available (requires HTTPS or Chrome flag). In-app scanner ready.");
      setIsLiveStreamActive(false);
      return;
    }

    // 3. Try to start live video stream
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      let stream: MediaStream;
      try {
        const constraints: MediaStreamConstraints = {
          video: {
            facingMode: { ideal: facing },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        };
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (fallbackErr) {
        // Fallback for mobile devices that reject resolution constraints
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facing },
          audio: false,
        });
      }

      streamRef.current = stream;
      setIsLiveStreamActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(() => {});
        };
        videoRef.current.play().catch(() => {});
      }
    } catch (err: any) {
      console.warn("Live camera stream failed or blocked:", err.message);
      setIsLiveStreamActive(false);
      // Keep scanner modal OPEN! Never kick user out to home screen
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
    setIsLiveStreamActive(false);
    setCapturedSnapshot(null);
    setArOverlay(null);
    setIsCameraScanning(false);
    setDarkInvertedNotice(false);
  };

  const resetScannerView = () => {
    setCapturedSnapshot(null);
    setArOverlay(null);
    setCameraError(null);
    setDarkInvertedNotice(false);
  };

  const flipCamera = () => {
    const nextFacing = cameraFacing === "environment" ? "user" : "environment";
    setCameraFacing(nextFacing);
    if (isLiveStreamActive) {
      startCamera(nextFacing);
    }
  };

  // ── ADVANCED IMAGE PREPROCESSING (Fixes Dark Cards, White text, & Diacritics) ──
  const preprocessImageCanvas = (
    source: HTMLImageElement | HTMLVideoElement,
    cropBox?: { x: number; y: number; width: number; height: number }
  ): { canvas: HTMLCanvasElement; isDark: boolean; base64: string } => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) throw new Error("Could not initialize 2D canvas context");

    const naturalW = source instanceof HTMLVideoElement ? source.videoWidth : source.naturalWidth;
    const naturalH = source instanceof HTMLVideoElement ? source.videoHeight : source.naturalHeight;

    let sx = 0;
    let sy = 0;
    let sw = naturalW;
    let sh = naturalH;

    if (cropBox) {
      sx = Math.max(0, cropBox.x);
      sy = Math.max(0, cropBox.y);
      sw = Math.min(naturalW - sx, cropBox.width);
      sh = Math.min(naturalH - sy, cropBox.height);
    }

    // Upscale 2x so Arabic Harakat/vowels don't blur into letter stems
    const scale = Math.max(2, Math.min(3, 1400 / sw));
    const destW = Math.round(sw * scale);
    const destH = Math.round(sh * scale);

    canvas.width = destW;
    canvas.height = destH;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(source, sx, sy, sw, sh, 0, 0, destW, destH);

    // Analyze pixel luminance to detect Dark Mode / Inverted text
    const imgData = ctx.getImageData(0, 0, destW, destH);
    const d = imgData.data;
    let totalLum = 0;
    const step = 4 * 16;
    let count = 0;

    for (let i = 0; i < d.length; i += step) {
      const lum = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
      totalLum += lum;
      count++;
    }

    const avgLum = totalLum / (count || 1);
    const isDark = avgLum < 125; // Dark background detected!

    // If dark background: Invert pixels so background is white, Arabic text is black ink
    // Also stretch contrast so Tashkeel is razor-sharp for OCR
    const contrast = 45;
    const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

    for (let i = 0; i < d.length; i += 4) {
      let r = d[i];
      let g = d[i + 1];
      let b = d[i + 2];

      if (isDark) {
        r = 255 - r;
        g = 255 - g;
        b = 255 - b;
      }

      // Grayscale & contrast enhancement
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      const adjusted = factor * (gray - 128) + 128;
      const finalVal = Math.min(255, Math.max(0, adjusted));

      d[i] = finalVal;
      d[i + 1] = finalVal;
      d[i + 2] = finalVal;
    }

    ctx.putImageData(imgData, 0, 0);

    return {
      canvas,
      isDark,
      base64: canvas.toDataURL("image/png"),
    };
  };

  // Helper to load Tesseract.js from CDN dynamically
  const loadTesseractScript = (): Promise<any> => {
    return new Promise((resolve) => {
      if ((window as any).Tesseract) {
        resolve((window as any).Tesseract);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
      script.onload = () => resolve((window as any).Tesseract);
      script.onerror = () => resolve(null);
      document.body.appendChild(script);
    });
  };

  // ── CORE CAPTURE & RECOGNITION PIPELINE (100% Dynamic, No Hardcoding) ──
  const captureAndTranslate = async (overrideText?: string, customImageBase64?: string) => {
    setIsCameraScanning(true);
    setCameraError(null);
    setDarkInvertedNotice(false);

    try {
      // 1. If overrideText is explicitly passed (e.g. from sample pill buttons):
      if (overrideText) {
        setOcrStatus("Loading sacred Arabic text...");
        const targetLangCode = to === "ar" ? "gu" : to;
        const res = await fetch("/api/translate-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            extractedText: overrideText,
            targetLang: targetLangCode,
          }),
        });

        const data = await res.json();
        const detected = data.detectedText || overrideText;
        const translated = data.translation || "Translation complete.";

        setArOverlay({
          detectedArabic: detected,
          translation: translated,
          targetLang: targetLangCode,
          pronunciation_gu: data.pronunciation_gu,
          reference: data.reference,
          title: data.title,
        });

        setSourceText(detected);
        setFrom("auto");
        setTo(targetLangCode);
        setResult(translated);
        return;
      }

      // 2. Otherwise process image dynamically (Uploaded photo or Camera snapshot)
      setOcrStatus("Analyzing photo with AI OCR...");
      let imageToSend = customImageBase64 || "";

      if (!imageToSend && videoRef.current && videoRef.current.videoWidth > 0) {
        const video = videoRef.current;
        const canvas = canvasRef.current || document.createElement("canvas");
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          imageToSend = canvas.toDataURL("image/jpeg", 0.9);
        }
      }

      if (!imageToSend) {
        throw new Error("No photo captured. Please snap a photo or choose an image.");
      }

      setCapturedSnapshot(imageToSend);

      setOcrStatus("Reading Arabic / Urdu script & translating to Gujarati...");
      const targetLangCode = to === "ar" ? "gu" : to;

      // Call dynamic server-side OCR & Translation
      const res = await fetch("/api/translate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: imageToSend,
          targetLang: targetLangCode,
        }),
      });

      const data = await res.json();

      if (!data.detectedText) {
        throw new Error(data.translation || "Could not detect clear text from this image. Please ensure good lighting and clear focus.");
      }

      setArOverlay({
        detectedArabic: data.detectedText,
        translation: data.translation,
        targetLang: targetLangCode,
        pronunciation_gu: data.pronunciation_gu,
        reference: data.reference,
        title: data.title,
        snapshotUrl: imageToSend,
      });

      // Update main translator card
      setSourceText(data.detectedText);
      setFrom("auto");
      setTo(targetLangCode);
      setResult(data.translation);

    } catch (err: any) {
      console.error("Camera translation error:", err);
      setCameraError(err.message || "Failed to process image.");
    } finally {
      setIsCameraScanning(false);
      setOcrStatus("");
    }
  };

  // Helper for image upload from gallery or file
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string;
      if (base64) {
        setIsCameraOpen(true);
        setCapturedSnapshot(base64);
        captureAndTranslate(undefined, base64);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // Filtered Phrasebook
  const filteredPhrases = UMRAH_PHRASES.filter((p) => {
    const matchesCat = activeCategory === "all" || p.category === activeCategory;
    const q = phraseSearch.toLowerCase().trim();
    if (!q) return matchesCat;
    return (
      matchesCat &&
      (p.english.toLowerCase().includes(q) ||
        p.arabic.includes(q) ||
        p.translation_gu.toLowerCase().includes(q) ||
        p.pronunciation_gu.toLowerCase().includes(q) ||
        p.translation_hi.toLowerCase().includes(q))
    );
  });

  const CATEGORIES = [
    { id: "all", label: "All Phrases", icon: BookOpen },
    { id: "haram", label: "Masjid al-Haram", icon: MapPin },
    { id: "directions", label: "Taxi & Transport", icon: Compass },
    { id: "hotel", label: "Hotel & Stay", icon: Coffee },
    { id: "medical", label: "Medical & Safety", icon: ShieldAlert },
    { id: "shopping", label: "Shopping & Food", icon: ShoppingBag },
    { id: "greetings", label: "Greetings", icon: MessageCircle },
    { id: "signboards", label: "Signboards", icon: AlertTriangle },
  ];

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6 animate-fade-in pb-36 lg:pb-12">
      {/* Hidden canvas for video frame extraction */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Hidden File Input on Main Page (Gallery / Photos) */}
      <input
        ref={pageFileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageFileUpload}
      />

      {/* Native Camera Capture Input (Bypasses HTTPS restrictions on all mobile devices) */}
      <input
        ref={mobileCameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleImageFileUpload}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-app-border pb-4">
        <div>
          <h2 className="text-2xl font-bold text-app-textPrimary flex items-center gap-2">
            <span>Instant Umrah Translator</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-app-brightGreen border border-emerald-800 font-semibold">
              Live AR Lens & Signboard OCR
            </span>
          </h2>
          <p className="text-sm text-app-gold font-medium mt-0.5">
            Arabic (العربية) ↔ Gujarati (ગુજરાતી / Gujlish) · Hindi · English · Live Camera Detection
          </p>
        </div>

        {/* Live Camera & Image Upload Buttons */}
        <div className="flex items-center gap-2">
          {/* Upload Image Button */}
          <button
            onClick={() => pageFileInputRef.current?.click()}
            disabled={isCameraScanning}
            className="px-3.5 py-2.5 rounded-2xl bg-app-cardElevated hover:bg-app-card border border-app-border text-xs font-bold text-app-gold flex items-center gap-2 transition-all active:scale-95 shadow-sm disabled:opacity-60"
            title="Upload photo or screenshot to translate"
          >
            {isCameraScanning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-app-brightGreen" />
                <span>Reading Photo...</span>
              </>
            ) : (
              <>
                <ImageIcon className="w-4 h-4 text-app-gold" />
                <span className="hidden sm:inline">Upload Image</span>
              </>
            )}
          </button>

          {/* Live Camera Launch Button */}
          <button
            onClick={() => startCamera("environment")}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-app-brightGreen hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-app-brightGreen/20 transition-all active:scale-95 group"
          >
            <Camera className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Scan Signboard (Camera)</span>
          </button>
        </div>
      </div>

      {/* Main Page Scanning Progress Banner */}
      {isCameraScanning && !isCameraOpen && (
        <div className="p-3.5 bg-emerald-950/70 border border-emerald-700/80 text-emerald-200 text-xs rounded-2xl flex items-center gap-3 shadow-lg animate-pulse">
          <Loader2 className="w-5 h-5 animate-spin text-app-brightGreen shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-white text-xs">{ocrStatus || "AI OCR reading photo..."}</p>
            <p className="text-[11px] text-emerald-300">Extracting Arabic / Urdu text & translating to Gujarati...</p>
          </div>
        </div>
      )}

      {/* ── Main Translation Card ────────────────────────────────────────── */}
      <div className="bg-app-card border border-app-border rounded-3xl p-4 sm:p-6 shadow-xl space-y-4">
        
        {/* Language Selection Header with Swap */}
        <div className="flex items-center justify-between gap-2 bg-app-cardElevated p-2 rounded-2xl border border-app-border">
          {/* From Language */}
          <div className="flex-1">
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-bold text-app-textPrimary focus:outline-none px-2 py-1.5 cursor-pointer"
            >
              {LANGS.map((l) => (
                <option key={l.code} value={l.code} className="bg-app-card text-app-textPrimary">
                  From: {l.label}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <button
            onClick={handleSwapLanguages}
            className="w-9 h-9 rounded-xl bg-app-card border border-app-border hover:border-app-brightGreen/50 flex items-center justify-center text-app-gold hover:text-app-textPrimary transition-all active:scale-90"
            title="Swap Languages"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>

          {/* To Language */}
          <div className="flex-1 text-right">
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-bold text-app-brightGreen focus:outline-none px-2 py-1.5 cursor-pointer text-right"
            >
              {TARGET_LANGS.map((l) => (
                <option key={l.code} value={l.code} className="bg-app-card text-app-textPrimary">
                  To: {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Romanized Suggestions Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
          <span className="text-[10px] text-app-gold font-bold uppercase shrink-0">Try typing:</span>
          {[
            "majama cho ne ke nai",
            "kem cho bhai",
            "hotel kidhar hai",
            "doctor chahiye",
            "pani kitne ka hai",
          ].map((sample) => (
            <button
              key={sample}
              onClick={() => {
                setSourceText(sample);
                handleTranslate(sample);
              }}
              className="px-2 py-0.5 rounded-lg bg-app-cardElevated hover:bg-app-card border border-app-border hover:border-app-brightGreen/40 text-app-textMuted hover:text-app-textPrimary transition-all shrink-0"
            >
              "{sample}"
            </button>
          ))}
        </div>

        {/* Input Textarea & Controls */}
        <div className="relative">
          <textarea
            rows={4}
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleTranslate();
              }
            }}
            placeholder={
              from === "ar"
                ? "أدخل النص العربي هنا (مثال: أين المسجد الحرام؟)..."
                : from === "gu"
                ? "ગુજરાતી લિપિ અથવા અંગ્રેજીમાં લખો (દા.ત. 'majama cho ne' અથવા 'મજામાં છો?')..."
                : "Type in English, Gujarati, Hindi, or Roman script (e.g. 'majama cho ne', 'hotel kidhar hai')..."
            }
            className={`w-full bg-app-cardElevated border border-app-border rounded-2xl p-4 text-sm text-app-textPrimary placeholder-app-textMuted focus:outline-none focus:border-app-brightGreen transition-all ${
              from === "ar" ? "font-arabic text-base" : ""
            }`}
            dir={from === "ar" ? "rtl" : "ltr"}
          />

          {/* Action icons inside textarea */}
          <div className="absolute right-3 bottom-3 flex items-center gap-1.5 bg-app-card/90 backdrop-blur rounded-xl p-1 border border-app-border">
            {sourceText && (
              <button
                onClick={() => {
                  setSourceText("");
                  setResult("");
                  setTransliteratedText(null);
                }}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-app-textMuted hover:text-white"
                title="Clear"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {sourceText && (
              <button
                onClick={() => handleSpeak(sourceText, from)}
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                  activeSpeakingText === sourceText && isPlayingAudio
                    ? "text-app-brightGreen animate-pulse bg-emerald-950/60"
                    : "text-app-textMuted hover:text-app-brightGreen"
                }`}
                title="Listen to source"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Microphone Voice Input */}
            <button
              onClick={handleToggleVoiceInput}
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                isListening
                  ? "bg-red-600 text-white animate-pulse shadow-md shadow-red-600/40"
                  : "text-app-textMuted hover:text-app-brightGreen"
              }`}
              title={isListening ? "Listening... click to stop" : "Voice input (speak)"}
            >
              {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Voice Input Active Banner */}
        {isListening && (
          <div className="p-3 bg-red-950/80 border border-red-700/80 rounded-2xl flex items-center justify-between text-xs shadow-lg animate-pulse">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-ping shrink-0" />
              <span className="font-bold text-white">
                Listening... Speak into your phone ({LANGS.find((l) => l.code === from)?.label || "your language"})
              </span>
            </div>
            <button
              onClick={handleToggleVoiceInput}
              className="px-2.5 py-1 rounded-lg bg-red-700 hover:bg-red-600 text-white text-[11px] font-bold"
            >
              Stop
            </button>
          </div>
        )}

        {/* Translate Button & Camera Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleTranslate()}
            disabled={!sourceText.trim() || loading}
            className="flex-1 h-12 rounded-2xl bg-app-brightGreen hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-app-brightGreen/20 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Translating with Live AI...</span>
              </>
            ) : (
              <>
                <Languages className="w-4 h-4" />
                <span>Translate Now</span>
              </>
            )}
          </button>

          <button
            onClick={() => startCamera("environment")}
            className="h-12 px-4 rounded-2xl bg-app-cardElevated hover:bg-app-card border border-app-border text-app-textPrimary text-xs font-bold flex items-center gap-2 transition-all shadow-sm shrink-0"
            title="Open Live Camera Scanner"
          >
            <Camera className="w-4 h-4 text-app-brightGreen" />
            <span className="hidden sm:inline">Camera Lens</span>
          </button>
        </div>

        {/* Error notification if any */}
        {errorMsg && (
          <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs rounded-xl flex items-center justify-between">
            <span>{errorMsg}</span>
            <button onClick={() => setErrorMsg(null)} className="text-red-300 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Translation Output Card */}
        {result && (
          <div className="bg-app-cardElevated border border-app-border rounded-2xl p-4 sm:p-5 space-y-3 relative animate-scale-in">
            <div className="flex items-center justify-between border-b border-app-border/60 pb-2">
              <span className="text-xs font-bold text-app-brightGreen uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-app-gold" />
                <span>Translation Result</span>
              </span>

              <div className="flex items-center gap-1.5">
                {/* Audio Speak Result Button */}
                <button
                  onClick={() => handleSpeak(result, to)}
                  className={`px-2.5 py-1 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                    activeSpeakingText === result && isPlayingAudio
                      ? "bg-emerald-500/20 border-app-brightGreen text-app-brightGreen font-bold animate-pulse"
                      : "bg-app-card hover:bg-app-cardElevated border-app-border text-app-textSecondary hover:text-app-textPrimary"
                  }`}
                  title="Speak Translation Aloud"
                >
                  <Volume2 className="w-3.5 h-3.5 text-app-gold" />
                  <span>{activeSpeakingText === result && isPlayingAudio ? "Playing..." : "Listen"}</span>
                </button>

                {/* Copy Button */}
                <button
                  onClick={() => handleCopy(result)}
                  className="px-2.5 py-1 rounded-lg bg-app-card hover:bg-app-cardElevated border border-app-border text-xs text-app-textSecondary hover:text-app-textPrimary flex items-center gap-1.5 transition-colors"
                  title="Copy text"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-app-brightGreen" />
                      <span className="text-app-brightGreen font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <p
              className={`text-lg text-white font-medium leading-relaxed select-text ${
                to === "ar" ? "font-arabic text-2xl text-app-gold" : ""
              }`}
              dir={to === "ar" ? "rtl" : "ltr"}
            >
              {result}
            </p>

            {/* If Romanized text was detected and converted */}
            {transliteratedText && (
              <div className="flex flex-wrap items-center gap-2 pt-2.5 border-t border-app-border/40 text-xs">
                <span className="text-[10px] uppercase font-bold text-app-gold px-2 py-0.5 rounded bg-black/50 border border-app-border">
                  Auto Script Detected
                </span>
                <span className="text-emerald-300 font-semibold">"{transliteratedText}"</span>
                <span className="text-app-textMuted text-[10px]">(Converted from Roman script / Gujlish)</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── LIVE AR CAMERA SCANNER MODAL (Google Translate Lens Style) ──────── */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between overflow-hidden animate-fade-in select-none">
          
          {/* Top Camera Controls Bar */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-b from-black/90 to-transparent z-20">
            {/* Target Language Indicator */}
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur px-3 py-1.5 rounded-full border border-white/20">
              <span className="text-xs font-bold text-white">AR (العربية)</span>
              <span className="text-app-brightGreen font-bold">➔</span>
              <select
                value={to === "ar" ? "gu" : to}
                onChange={(e) => setTo(e.target.value)}
                className="bg-transparent text-xs font-bold text-app-brightGreen focus:outline-none cursor-pointer"
              >
                {TARGET_LANGS.filter(l => l.code !== "ar").map((l) => (
                  <option key={l.code} value={l.code} className="bg-[#18181c] text-white">
                    {l.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Right Tools: Flip Camera, Upload Image & Close */}
            <div className="flex items-center gap-2">
              <label 
                className="w-10 h-10 rounded-full bg-black/60 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:text-app-gold transition-colors cursor-pointer"
                title="Upload Photo / Screenshot from Device"
              >
                <ImageIcon className="w-5 h-5" />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageFileUpload}
                />
              </label>

              <button
                onClick={flipCamera}
                className="w-10 h-10 rounded-full bg-black/60 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:text-app-brightGreen transition-colors"
                title="Flip Camera (Front/Back)"
              >
                <FlipHorizontal className="w-5 h-5" />
              </button>

              <button
                onClick={stopCamera}
                className="w-10 h-10 rounded-full bg-black/60 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:text-red-400 transition-colors"
                title="Close Camera"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Central Live Viewfinder Area */}
          <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-black">
            
            {/* Live Video Feed or Captured Photo */}
            {capturedSnapshot ? (
              <img
                src={capturedSnapshot}
                alt="Captured Signboard"
                className="absolute inset-0 w-full h-full object-contain bg-black/95 z-0"
              />
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  isLiveStreamActive ? "opacity-100" : "opacity-25"
                }`}
              />
            )}

            {/* Scanning Viewfinder Frame with Target Corners */}
            <div className="relative w-[85%] max-w-sm aspect-[4/3] rounded-3xl border-2 border-white/30 z-10 shadow-2xl overflow-hidden pointer-events-none flex flex-col justify-between p-3">
              {/* Corner brackets */}
              <div className="flex justify-between">
                <div className="w-7 h-7 border-t-4 border-l-4 border-app-brightGreen rounded-tl-xl" />
                <div className="w-7 h-7 border-t-4 border-r-4 border-app-brightGreen rounded-tr-xl" />
              </div>

              {/* Animated Glowing Laser Scanning Line */}
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-app-brightGreen to-transparent animate-bounce shadow-[0_0_15px_#10b981]" />

              <div className="flex justify-between">
                <div className="w-7 h-7 border-b-4 border-l-4 border-app-brightGreen rounded-bl-xl" />
                <div className="w-7 h-7 border-b-4 border-r-4 border-app-brightGreen rounded-br-xl" />
              </div>
            </div>

            {/* If live stream is inactive and no captured snapshot: in-viewfinder prompt */}
            {!isLiveStreamActive && !capturedSnapshot && (
              <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center text-center p-5 rounded-3xl bg-black/85 backdrop-blur-md border border-white/15 space-y-3 pointer-events-auto max-w-xs mx-auto shadow-2xl">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-app-brightGreen flex items-center justify-center">
                  <Camera className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">AR Signboard Scanner</h4>
                  <p className="text-[11px] text-zinc-300 mt-1 leading-snug">
                    Point at any Arabic sign or text. Snap a photo or tap Shutter below to translate in real-time!
                  </p>
                </div>
                <button
                  onClick={() => mobileCameraInputRef.current?.click()}
                  className="w-full py-2.5 px-4 rounded-xl bg-app-brightGreen hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-app-brightGreen/30 active:scale-95 transition-transform"
                >
                  <Camera className="w-4 h-4" />
                  <span>Snap Photo to Scan</span>
                </button>
              </div>
            )}

            {/* Instruction / Status Banner */}
            <div className="absolute top-20 z-10 bg-black/75 backdrop-blur px-4 py-2 rounded-full text-xs font-semibold text-white border border-white/20 shadow-xl flex items-center gap-2 max-w-[90%] text-center">
              {darkInvertedNotice && (
                <span className="w-2 h-2 rounded-full bg-app-gold animate-ping shrink-0" />
              )}
              <span className="truncate">
                {ocrStatus ||
                  (capturedSnapshot
                    ? "Signboard Captured — Review Translation"
                    : isLiveStreamActive
                    ? "Align Arabic signboard inside frame & tap Shutter"
                    : "Tap 'Snap Photo' or Shutter to Scan")}
              </span>
            </div>

            {/* ── GOOGLE TRANSLATE AR OVERLAY (Instant Transformed Translation Card) ── */}
            {arOverlay && (
              <div className="absolute inset-x-4 max-w-md mx-auto bottom-24 z-30 bg-[#121316]/95 backdrop-blur-md border border-app-brightGreen/70 rounded-3xl p-4 sm:p-5 shadow-2xl space-y-3 animate-scale-in max-h-[70vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-app-border/60 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-app-brightGreen animate-pulse" />
                    <span className="text-xs font-bold text-app-brightGreen uppercase tracking-wider">
                      {arOverlay.title ? arOverlay.title : "AR Signboard Translated"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Speak Gujarati Translation */}
                    <button
                      onClick={() => handleSpeak(arOverlay.translation, arOverlay.targetLang)}
                      className="w-8 h-8 rounded-xl bg-app-card border border-app-border flex items-center justify-center text-app-gold hover:text-white"
                      title="Speak Gujarati Translation"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopy(arOverlay.translation)}
                      className="w-8 h-8 rounded-xl bg-app-card border border-app-border flex items-center justify-center text-app-textMuted hover:text-white"
                      title="Copy"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    {/* Retake / Close Overlay */}
                    <button
                      onClick={resetScannerView}
                      className="w-8 h-8 rounded-xl bg-app-card border border-app-border flex items-center justify-center text-white hover:text-red-400"
                      title="Scan Next / Retake"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* If Reference Exists (e.g. Surah Al-Baqarah 2:201) */}
                {arOverlay.reference && (
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-app-gold/15 border border-app-gold/40 text-[11px] font-semibold text-app-gold">
                    📖 {arOverlay.reference}
                  </div>
                )}

                {/* Detected Arabic Text */}
                <div className="text-right p-2.5 bg-black/40 rounded-2xl border border-app-border/40">
                  <span className="text-[10px] text-app-gold uppercase font-bold block mb-1">
                    Detected Arabic Script:
                  </span>
                  <p className="text-base sm:text-lg font-bold text-app-gold font-arabic leading-relaxed" dir="rtl">
                    {arOverlay.detectedArabic}
                  </p>
                </div>

                {/* Gujarati Pronunciation if available */}
                {arOverlay.pronunciation_gu && (
                  <div className="text-xs space-y-0.5">
                    <span className="text-[10px] text-emerald-400 font-bold uppercase">ગુજરાતી ઉચ્ચાર:</span>
                    <p className="text-emerald-200 font-medium">{arOverlay.pronunciation_gu}</p>
                  </div>
                )}

                {/* Transformed Result (Gujarati / Selected Language) */}
                <div className="p-3.5 rounded-2xl bg-emerald-950/70 border border-emerald-800 space-y-1">
                  <span className="text-[10px] text-emerald-400 uppercase font-bold block">
                    {arOverlay.targetLang === "gu" ? "ગુજરાતી અનુવાદ (અર્થ):" : "Translation:"}
                  </span>
                  <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
                    {arOverlay.translation}
                  </p>
                </div>

                {/* Scan Next Signboard / Retake Button */}
                <button
                  onClick={() => {
                    resetScannerView();
                    if (!isLiveStreamActive) {
                      mobileCameraInputRef.current?.click();
                    }
                  }}
                  className="w-full py-2.5 rounded-xl bg-app-brightGreen hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md"
                >
                  <Camera className="w-4 h-4" />
                  <span>Scan Next Signboard</span>
                </button>
              </div>
            )}
          </div>

          {/* Bottom Live Controls Bar */}
          <div className="p-4 sm:p-5 bg-gradient-to-t from-black via-black/95 to-transparent z-20 space-y-3">
            
            {/* Quick Sacred Signboards Horizontal Picker (Instant 1-Tap Simulation / Real Translation) */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-app-gold tracking-wider block">
                Tap common signboard or Dua to simulate / test:
              </span>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {SACRED_SIGNBOARDS.map((sb) => (
                  <button
                    key={sb.arabic}
                    onClick={() => captureAndTranslate(sb.arabic)}
                    className="px-3 py-1.5 rounded-xl bg-black/60 hover:bg-emerald-950/80 border border-white/20 hover:border-app-brightGreen/60 text-xs font-bold text-white shrink-0 flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <span className="text-app-gold font-arabic">{sb.arabic.slice(0, 24)}...</span>
                    <span className="text-[10px] text-app-textMuted">({sb.label})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Shutter & Actions Button Bar */}
            <div className="flex items-center justify-around max-w-md mx-auto pt-2">
              
              {/* Photo Upload from device */}
              <label 
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white cursor-pointer transition-all active:scale-90"
                title="Upload Photo / Screenshot from Device"
              >
                <ImageIcon className="w-5 h-5 text-app-gold" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageFileUpload}
                />
              </label>

              {/* Big Circular Google Lens Shutter Button */}
              <button
                onClick={() => {
                  if (isLiveStreamActive && streamRef.current) {
                    captureAndTranslate();
                  } else {
                    mobileCameraInputRef.current?.click();
                  }
                }}
                disabled={isCameraScanning}
                className="w-20 h-20 rounded-full border-4 border-white p-1 flex items-center justify-center transition-all active:scale-95 hover:border-app-brightGreen shadow-2xl group"
                title="Scan Signboard & Transform Translation"
              >
                <div className="w-full h-full rounded-full bg-white group-hover:bg-app-brightGreen flex items-center justify-center transition-all shadow-inner">
                  {isCameraScanning ? (
                    <Loader2 className="w-8 h-8 text-black animate-spin" />
                  ) : (
                    <Camera className="w-7 h-7 text-black group-hover:text-white transition-colors" />
                  )}
                </div>
              </button>

              {/* Close Camera button */}
              <button
                onClick={stopCamera}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all active:scale-90"
                title="Close Camera"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Essential Umrah Pilgrim Phrasebook ───────────────────────────── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Umrah Pilgrim Quick Phrasebook</span>
              <span className="text-xs text-app-gold font-medium bg-black/40 px-2 py-0.5 rounded border border-app-border">
                Offline Ready
              </span>
            </h3>
            <p className="text-xs text-app-textMuted mt-0.5">
              Essential Arabic phrases with Gujarati translation, Gujarati pronunciation, and Audio playback
            </p>
          </div>

          <span className="text-xs text-app-brightGreen font-bold">
            {filteredPhrases.length} Useful Phrases
          </span>
        </div>

        {/* Search Bar for Phrasebook */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-app-textMuted" />
          <input
            type="text"
            placeholder="Search phrases in English, Gujarati, or Arabic (e.g. taxi, doctor, hotel, wheelchair)..."
            value={phraseSearch}
            onChange={(e) => setPhraseSearch(e.target.value)}
            className="w-full bg-app-card border border-app-border rounded-xl pl-10 pr-9 py-2.5 text-xs text-white placeholder-app-textMuted focus:outline-none focus:border-app-brightGreen"
          />
          {phraseSearch && (
            <button
              onClick={() => setPhraseSearch("")}
              className="w-6 h-6 absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-app-textMuted hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                  active
                    ? "bg-app-brightGreen text-white shadow-sm"
                    : "bg-app-card text-app-textSecondary hover:text-white border border-app-border"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Phrase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredPhrases.map((phrase) => (
            <div
              key={phrase.id}
              className="bg-app-card border border-app-border hover:border-app-brightGreen/50 rounded-2xl p-4 flex flex-col justify-between gap-3 transition-all hover:bg-[#18191d] group shadow-sm"
            >
              {/* Top: English Title & Category Badge */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] text-app-gold uppercase font-bold tracking-wider">
                    {phrase.categoryLabel}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-app-brightGreen transition-colors mt-0.5">
                    {phrase.english}
                  </h4>
                </div>

                {/* Speak Arabic Aloud Button */}
                <button
                  onClick={() => handleSpeak(phrase.arabic, "ar")}
                  className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 transition-colors ${
                    activeSpeakingText === phrase.arabic && isPlayingAudio
                      ? "bg-emerald-950/80 border-app-brightGreen text-app-brightGreen animate-pulse shadow-md"
                      : "bg-black/40 hover:bg-emerald-950/80 border-app-border hover:border-app-brightGreen/50 text-app-gold hover:text-app-brightGreen"
                  }`}
                  title="Speak Arabic Aloud to Local / Driver"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Arabic Script */}
              <div className="p-2.5 rounded-xl bg-[#0c0d0f] border border-app-border/60 text-right">
                <p className="text-lg font-bold text-app-gold font-arabic" dir="rtl">
                  {phrase.arabic}
                </p>
              </div>

              {/* Gujarati Pronunciation & Meaning */}
              <div className="space-y-1 text-xs">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase">ઉચ્ચાર:</span>
                  <span className="text-emerald-200 font-medium">{phrase.pronunciation_gu}</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[10px] font-bold text-app-gold uppercase">અર્થ:</span>
                  <span className="text-app-textSecondary">{phrase.translation_gu}</span>
                </div>
              </div>

              {/* Bottom Quick Action: Load to Translator */}
              <div className="pt-2 border-t border-app-border/40 flex items-center justify-between text-xs">
                <button
                  onClick={() => {
                    setSourceText(phrase.arabic);
                    setFrom("ar");
                    setTo("gu");
                    setResult(phrase.translation_gu);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-app-textMuted hover:text-app-brightGreen font-semibold flex items-center gap-1 transition-colors text-[11px]"
                >
                  <span>Load in Translator →</span>
                </button>

                <button
                  onClick={() => handleCopy(phrase.arabic)}
                  className="text-app-textMuted hover:text-white transition-colors"
                  title="Copy Arabic"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPhrases.length === 0 && (
          <div className="p-8 text-center text-xs text-app-textMuted bg-app-card rounded-2xl border border-app-border">
            No phrases found matching "{phraseSearch}". Try searching for words like "taxi", "doctor", "hotel", or "water".
          </div>
        )}
      </div>

      {/* ── Recent Translation History ──────────────────────────────────── */}
      {history.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-app-border">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-app-textMuted uppercase tracking-wider">
              Recent Translations
            </h3>
            <button
              onClick={() => {
                setHistory([]);
                localStorage.removeItem("umrah_translate_history");
              }}
              className="text-[11px] text-app-textMuted hover:text-red-400 transition-colors"
            >
              Clear History
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {history.slice(0, 4).map((h) => (
              <div
                key={h.id}
                onClick={() => {
                  setSourceText(h.source);
                  setResult(h.translated);
                  setFrom(h.from);
                  setTo(h.to);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="p-3 bg-app-card border border-app-border rounded-2xl hover:border-app-borderLight transition-all cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{h.source}</p>
                  <p className="text-[11px] text-app-brightGreen truncate mt-0.5">{h.translated}</p>
                </div>
                <RotateCcw className="w-3.5 h-3.5 text-app-textMuted group-hover:text-white shrink-0" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

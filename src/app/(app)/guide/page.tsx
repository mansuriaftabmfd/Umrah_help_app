"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { 
  CheckCircle, Circle, ChevronRight, Plus, Minus, RotateCcw, 
  BookOpen, Volume2, Sparkles, AlertTriangle, ShieldCheck, 
  Languages, Eye, Check, Compass, Info, ArrowRight
} from "lucide-react";
import { getDB } from "@/lib/db";
import { useAppStore, type Language } from "@/store/appStore";
import { Card, ProgressBar, Badge, cn } from "@/components/ui";
import { UMRAH_GUIDE_STEPS, type GuideStep } from "@/data/umrahGuide";

export default function GuidePage() {
  const {
    currentStep, setCurrentStep,
    counter, setTawafLap, setSaiLap,
    setDuaGroup, setCurrentDuaId,
    language: storeLang, setLanguage: setStoreLang
  } = useAppStore();

  const [activeLang, setActiveLang] = useState<Language>(storeLang || "gu");
  const [expandedStepId, setExpandedStepId] = useState<number | null>(currentStep);
  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null);

  const handleLangChange = (lang: Language) => {
    setActiveLang(lang);
    setStoreLang(lang);
  };

  // Audio Speech Synthesis for Duas
  const handlePlayAudio = (arabicText: string, duaId: string) => {
    if (!("speechSynthesis" in window)) {
      alert("Audio is not supported on this browser.");
      return;
    }

    if (isPlayingAudio === duaId) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(arabicText);
    utterance.lang = "ar-SA";
    utterance.rate = 0.85;

    utterance.onstart = () => setIsPlayingAudio(duaId);
    utterance.onend = () => setIsPlayingAudio(null);
    utterance.onerror = () => setIsPlayingAudio(null);

    window.speechSynthesis.speak(utterance);
  };

  // ── Tawaf counter ──────────────────────────────────────────────────────────
  const handleTawafIncrement = useCallback(async () => {
    if (counter.tawafLap >= 7) return;
    const next = counter.tawafLap + 1;
    setTawafLap(next);
    try {
      if (typeof window !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate?.([40, 40]);
      }
      await getDB().counterEvents.add({ type: "tawaf", action: "increment", lap: next, timestamp: Date.now() });
      await getDB().umrahProgress.put({ id: 1, currentStep, tawafLap: next, saiLap: counter.saiLap, updatedAt: Date.now() });
    } catch {}
  }, [counter.tawafLap, counter.saiLap, currentStep, setTawafLap]);

  const handleTawafDecrement = useCallback(async () => {
    if (counter.tawafLap <= 0) return;
    const next = counter.tawafLap - 1;
    setTawafLap(next);
    try {
      await getDB().counterEvents.add({ type: "tawaf", action: "decrement", lap: next, timestamp: Date.now() });
      await getDB().umrahProgress.put({ id: 1, currentStep, tawafLap: next, saiLap: counter.saiLap, updatedAt: Date.now() });
    } catch {}
  }, [counter.tawafLap, counter.saiLap, currentStep, setTawafLap]);

  const handleTawafReset = useCallback(async () => {
    setTawafLap(0);
    try {
      await getDB().counterEvents.add({ type: "tawaf", action: "reset", lap: 0, timestamp: Date.now() });
      await getDB().umrahProgress.put({ id: 1, currentStep, tawafLap: 0, saiLap: counter.saiLap, updatedAt: Date.now() });
    } catch {}
  }, [counter.saiLap, currentStep, setTawafLap]);

  // ── Sa'i counter ───────────────────────────────────────────────────────────
  const handleSaiIncrement = useCallback(async () => {
    if (counter.saiLap >= 7) return;
    const next = counter.saiLap + 1;
    setSaiLap(next);
    try {
      if (typeof window !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate?.([40, 40]);
      }
      await getDB().counterEvents.add({ type: "sai", action: "increment", lap: next, timestamp: Date.now() });
      await getDB().umrahProgress.put({ id: 1, currentStep, tawafLap: counter.tawafLap, saiLap: next, updatedAt: Date.now() });
    } catch {}
  }, [counter.saiLap, counter.tawafLap, currentStep, setSaiLap]);

  const handleSaiDecrement = useCallback(async () => {
    if (counter.saiLap <= 0) return;
    const next = counter.saiLap - 1;
    setSaiLap(next);
    try {
      await getDB().counterEvents.add({ type: "sai", action: "decrement", lap: next, timestamp: Date.now() });
      await getDB().umrahProgress.put({ id: 1, currentStep, tawafLap: counter.tawafLap, saiLap: next, updatedAt: Date.now() });
    } catch {}
  }, [counter.saiLap, counter.tawafLap, currentStep, setSaiLap]);

  const handleSaiReset = useCallback(async () => {
    setSaiLap(0);
    try {
      await getDB().counterEvents.add({ type: "sai", action: "reset", lap: 0, timestamp: Date.now() });
      await getDB().umrahProgress.put({ id: 1, currentStep, tawafLap: counter.tawafLap, saiLap: 0, updatedAt: Date.now() });
    } catch {}
  }, [counter.tawafLap, currentStep, setSaiLap]);

  const advanceStep = useCallback(async (stepIndex: number) => {
    const next = Math.min(UMRAH_GUIDE_STEPS.length - 1, stepIndex + 1);
    setCurrentStep(next);
    setExpandedStepId(next);
    try {
      await getDB().umrahProgress.put({ id: 1, currentStep: next, tawafLap: counter.tawafLap, saiLap: counter.saiLap, updatedAt: Date.now() });
    } catch {}
  }, [counter, setCurrentStep]);

  const totalSteps = UMRAH_GUIDE_STEPS.length;
  const progressPercent = Math.min(100, Math.round((currentStep / (totalSteps - 1)) * 100));

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-6 animate-fade-in pb-36 lg:pb-12">

      {/* ── Page Header with Trilingual Switcher ────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-app-border pb-4">
        <div>
          <h2 className="text-2xl font-bold text-app-textPrimary flex items-center gap-2">
            <span>Umrah Step-by-Step Guide</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-app-brightGreen border border-emerald-800 font-semibold">
              Sunnah Pathway
            </span>
          </h2>
          <p className="text-sm text-app-gold font-medium mt-0.5">
            {activeLang === "gu" 
              ? "મિકાતથી હલક સુધી ઉમરાહની સંપૂર્ણ સુન્નત રીત, દુઆઓ અને નિયમો" 
              : activeLang === "hi"
              ? "मीक़ात से हलक़ तक उमरा का मुकम्मल सुन्नत तरीक़ा, दुआएं और मसाइल"
              : "Complete Sunnah pathway, authentic supplications, and interactive counters"}
          </p>
        </div>

        {/* Language Tabs: Gujarati / English / Hindi */}
        <div className="flex items-center gap-1 bg-app-cardElevated p-1 rounded-2xl border border-app-border shrink-0 self-start sm:self-auto">
          <button
            onClick={() => handleLangChange("gu")}
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
              activeLang === "gu"
                ? "bg-app-brightGreen text-white shadow-sm"
                : "text-app-textMuted hover:text-app-textPrimary"
            )}
          >
            ગુજરાતી
          </button>
          <button
            onClick={() => handleLangChange("en")}
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
              activeLang === "en"
                ? "bg-app-brightGreen text-white shadow-sm"
                : "text-app-textMuted hover:text-app-textPrimary"
            )}
          >
            English
          </button>
          <button
            onClick={() => handleLangChange("hi")}
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
              activeLang === "hi"
                ? "bg-app-brightGreen text-white shadow-sm"
                : "text-app-textMuted hover:text-app-textPrimary"
            )}
          >
            हिन्दी
          </button>
        </div>
      </div>

      {/* ── Progress Card ───────────────────────────────────────────────── */}
      <div className="bg-app-card border border-app-border rounded-2xl p-4 sm:p-5 shadow-lg space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-white flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-app-brightGreen" />
            <span>
              {activeLang === "gu" 
                ? `પગલું ${currentStep + 1} / ${totalSteps}` 
                : activeLang === "hi"
                ? `क़दम ${currentStep + 1} / ${totalSteps}`
                : `Step ${currentStep + 1} of ${totalSteps}`}
            </span>
          </span>
          <span className="text-app-gold font-bold">{progressPercent}% Completed</span>
        </div>
        <ProgressBar value={progressPercent} className="h-2.5 rounded-full" />
      </div>

      {/* ── Timeline of All 8 Steps ─────────────────────────────────────── */}
      <div className="space-y-4">
        {UMRAH_GUIDE_STEPS.map((step, i) => {
          const isDone = i < currentStep;
          const isActive = i === currentStep;
          const isExpanded = expandedStepId === i;

          const label = activeLang === "gu" ? step.label_gu : activeLang === "hi" ? step.label_hi : step.label_en;
          const shortDesc = activeLang === "gu" ? step.shortDesc_gu : activeLang === "hi" ? step.shortDesc_hi : step.shortDesc_en;
          const detailedSteps = activeLang === "gu" ? step.detailedSteps_gu : activeLang === "hi" ? step.detailedSteps_hi : step.detailedSteps_en;
          const sunnahTips = activeLang === "gu" ? step.sunnahTips_gu : activeLang === "hi" ? step.sunnahTips_hi : step.sunnahTips_en;
          const prohibitions = activeLang === "gu" ? step.prohibitions_gu : activeLang === "hi" ? step.prohibitions_hi : step.prohibitions_en;

          return (
            <div key={step.id} className="flex gap-3 sm:gap-4">
              
              {/* Timeline Indicator Column */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => {
                    setCurrentStep(i);
                    setExpandedStepId(i);
                  }}
                  className={cn(
                    "w-10 h-10 rounded-2xl flex items-center justify-center text-lg shrink-0 border-2 transition-all active:scale-90",
                    isDone && "border-app-brightGreen bg-emerald-950/80 text-app-brightGreen shadow-sm",
                    isActive && "border-app-brightGreen bg-app-brightGreen text-white shadow-lg shadow-app-brightGreen/30 scale-105",
                    !isDone && !isActive && "border-app-border bg-app-card text-app-textMuted opacity-70 hover:opacity-100 hover:border-app-gold"
                  )}
                  title={`Go to ${label}`}
                >
                  {isDone ? <Check className="w-5 h-5 stroke-[3]" /> : step.icon}
                </button>
                {i < UMRAH_GUIDE_STEPS.length - 1 && (
                  <div className={cn("w-0.5 flex-1 my-1.5 min-h-[30px] rounded-full", isDone ? "bg-app-brightGreen/60" : "bg-app-border")} />
                )}
              </div>

              {/* Step Main Card */}
              <div className={cn(
                "flex-1 bg-app-card border rounded-3xl p-4 sm:p-5 transition-all shadow-md space-y-3",
                isActive ? "border-app-brightGreen/80 ring-1 ring-app-brightGreen/30 bg-emerald-50/40 dark:bg-[#121316]" : "border-app-border hover:border-app-borderLight"
              )}>
                {/* Header row */}
                <div 
                  className="flex items-start justify-between gap-2 cursor-pointer select-none"
                  onClick={() => setExpandedStepId(isExpanded ? null : i)}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-app-gold font-arabic font-bold">{step.arabicName}</span>
                      {isActive && <Badge variant="green">Current Step</Badge>}
                      {isDone && <span className="text-[10px] font-bold text-emerald-700 dark:text-app-brightGreen bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">✓ Completed</span>}
                    </div>
                    <h3 className={cn("text-base sm:text-lg font-bold mt-0.5", isActive ? "text-app-textPrimary" : isDone ? "text-emerald-700 dark:text-emerald-300" : "text-app-textPrimary")}>
                      {label}
                    </h3>
                  </div>

                  <button 
                    className="w-8 h-8 rounded-xl bg-app-cardElevated border border-app-border flex items-center justify-center text-app-textMuted hover:text-app-textPrimary shrink-0"
                    title={isExpanded ? "Collapse" : "Expand"}
                  >
                    <ChevronRight className={cn("w-4 h-4 transition-transform", isExpanded ? "rotate-90 text-app-brightGreen" : "")} />
                  </button>
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-app-textSecondary leading-relaxed">
                  {shortDesc}
                </p>

                {/* Expandable Details Section */}
                {isExpanded && (
                  <div className="space-y-4 pt-2 border-t border-app-border/60 animate-fade-in">
                    
                    {/* Detailed Steps Checklist */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-app-gold flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-app-brightGreen" />
                        <span>{activeLang === "gu" ? "સુન્નત રીત અને પગલાં:" : activeLang === "hi" ? "सुन्नत तरीक़ा और क़दम:" : "Sunnah Instructions:"}</span>
                      </span>
                      <div className="space-y-1.5 pl-1">
                        {detailedSteps.map((s, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-app-textPrimary leading-relaxed">
                            <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-app-brightGreen font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5 border border-emerald-300 dark:border-emerald-800">
                              {idx + 1}
                            </span>
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Dua Card with Audio Playback */}
                    {step.keyDua && (
                      <div className="bg-emerald-50/60 dark:bg-black/40 border border-app-border rounded-2xl p-4 space-y-2.5">
                        <div className="flex items-center justify-between border-b border-app-border/40 pb-2">
                          <span className="text-[11px] font-bold text-app-brightGreen uppercase flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-app-gold" />
                            <span>{activeLang === "gu" ? "આ પગલાંની પવિત્ર દુઆ:" : activeLang === "hi" ? "इस क़दम की मसनून दुआ:" : "Prescribed Sunnah Dua:"}</span>
                          </span>

                          <div className="flex items-center gap-2">
                            {/* Audio Listen Button */}
                            <button
                              onClick={() => handlePlayAudio(step.keyDua!.arabic, `dua_${step.id}`)}
                              className="px-2.5 py-1 rounded-lg bg-app-card hover:bg-app-cardElevated border border-app-border text-xs text-app-gold hover:text-app-textPrimary flex items-center gap-1.5 transition-colors"
                              title="Listen to Arabic Pronunciation"
                            >
                              <Volume2 className={cn("w-3.5 h-3.5", isPlayingAudio === `dua_${step.id}` && "animate-pulse text-app-brightGreen")} />
                              <span>{isPlayingAudio === `dua_${step.id}` ? "Playing..." : "Listen"}</span>
                            </button>

                            {/* View in Dua reader */}
                            {step.duaId && (
                              <Link
                                href="/duas"
                                onClick={() => {
                                  if (step.duaGroup) setDuaGroup(step.duaGroup);
                                  if (step.duaId) setCurrentDuaId(step.duaId);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-800 dark:text-app-brightGreen hover:text-emerald-900 dark:hover:text-white flex items-center gap-1 transition-colors"
                              >
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>{activeLang === "gu" ? "દુઆ બુક →" : "Duas →"}</span>
                              </Link>
                            )}
                          </div>
                        </div>

                        {/* Arabic text with beautiful font */}
                        <div className="text-right py-1">
                          <p className="text-lg sm:text-xl font-bold text-app-gold font-arabic leading-relaxed" dir="rtl">
                            {step.keyDua.arabic}
                          </p>
                        </div>

                        {/* Gujarati / Hindi Pronunciation */}
                        <div className="text-xs space-y-1 pt-1 border-t border-app-border/40">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase shrink-0">
                              {activeLang === "gu" ? "ઉચ્ચાર:" : activeLang === "hi" ? "उच्चारण:" : "Pronunciation:"}
                            </span>
                            <span className="text-emerald-800 dark:text-emerald-200 font-medium">
                              {activeLang === "gu" ? step.keyDua.pronunciation_gu : step.keyDua.pronunciation_hi}
                            </span>
                          </div>

                          {/* Meaning */}
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-[10px] font-bold text-app-gold uppercase shrink-0">
                              {activeLang === "gu" ? "અર્થ:" : activeLang === "hi" ? "अर्थ:" : "Translation:"}
                            </span>
                            <span className="text-app-textSecondary">
                              {activeLang === "gu" ? step.keyDua.translation_gu : activeLang === "hi" ? step.keyDua.translation_hi : step.keyDua.translation_en}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Prohibitions (Warnings) if any */}
                    {prohibitions && prohibitions.length > 0 && (
                      <div className="p-3 bg-red-950/30 border border-red-900/60 rounded-2xl space-y-1.5">
                        <span className="text-[10px] font-bold uppercase text-red-300 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                          <span>{activeLang === "gu" ? "ઇહરામમાં આ બાબતોની સખત મનાઈ છે:" : activeLang === "hi" ? "एहराम में इन बातों से बचें:" : "Strict Prohibitions in Ihram:"}</span>
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-red-200">
                          {prohibitions.map((p, pIdx) => (
                            <div key={pIdx} className="flex items-center gap-1.5">
                              <span className="text-red-400 font-bold">✕</span>
                              <span>{p}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Sunnah Tips */}
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-bold uppercase text-app-textMuted tracking-wider block">
                        {activeLang === "gu" ? "સુવર્ણ સલાહ (Golden Tips):" : "Important Tips:"}
                      </span>
                      <div className="space-y-1">
                        {sunnahTips.map((tip, tIdx) => (
                          <div key={tIdx} className="flex items-start gap-1.5 text-xs text-app-textMuted">
                            <span className="text-app-gold mt-0.5">•</span>
                            <span>{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Counters: Tawaf or Sa'i */}
                    {step.hasCounter === "tawaf" && (
                      <CounterCard
                        label={activeLang === "gu" ? "તવાફના ચક્કર (Tawaf Rounds)" : activeLang === "hi" ? "तवाफ़ के फेरे" : "Tawaf Rounds"}
                        lapLabel={activeLang === "gu" ? "ચક્કર" : activeLang === "hi" ? "फेरा" : "Circuit"}
                        value={counter.tawafLap}
                        total={7}
                        onIncrement={handleTawafIncrement}
                        onDecrement={handleTawafDecrement}
                        onReset={handleTawafReset}
                      />
                    )}

                    {step.hasCounter === "sai" && (
                      <CounterCard
                        label={activeLang === "gu" ? "સઈના ફેરા (Sa'i Laps - Safa & Marwah)" : activeLang === "hi" ? "सई के चक्कर" : "Sa'i Laps (Safa & Marwah)"}
                        lapLabel={activeLang === "gu" ? "ફેરો" : activeLang === "hi" ? "चक्कर" : "Lap"}
                        value={counter.saiLap}
                        total={7}
                        onIncrement={handleSaiIncrement}
                        onDecrement={handleSaiDecrement}
                        onReset={handleSaiReset}
                      />
                    )}

                    {/* Mark Complete & Advance Button */}
                    <div className="pt-2 flex items-center justify-between gap-3">
                      <button
                        onClick={() => advanceStep(i)}
                        className={cn(
                          "flex-1 h-11 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95",
                          isActive
                            ? "bg-app-brightGreen hover:bg-emerald-600 text-white shadow-app-brightGreen/20"
                            : "bg-app-cardElevated hover:bg-app-card text-app-textSecondary hover:text-app-textPrimary border border-app-border"
                        )}
                      >
                        <Check className="w-4 h-4" />
                        <span>
                          {activeLang === "gu" 
                            ? (i === totalSteps - 1 ? "ઉમરાહ સંપન્ન કરો ✓" : "આ પગલું પૂર્ણ થયું → આગળ વધો") 
                            : activeLang === "hi"
                            ? (i === totalSteps - 1 ? "उमरा मुकम्मल करें ✓" : "यह क़दम पूरा हुआ → आगे बढ़ें")
                            : (i === totalSteps - 1 ? "Complete Umrah ✓" : "Mark Complete & Next Step →")}
                        </span>
                      </button>

                      {step.duaId && (
                        <Link
                          href="/duas"
                          onClick={() => {
                            if (step.duaGroup) setDuaGroup(step.duaGroup);
                            if (step.duaId) setCurrentDuaId(step.duaId);
                          }}
                          className="h-11 px-3.5 rounded-2xl bg-black/40 hover:bg-emerald-950/80 border border-app-border hover:border-app-brightGreen/50 text-xs font-bold text-app-gold hover:text-app-brightGreen flex items-center gap-1.5 transition-colors shrink-0"
                          title="Open all duas for this step"
                        >
                          <BookOpen className="w-4 h-4" />
                          <span className="hidden sm:inline">All Duas</span>
                        </Link>
                      )}
                    </div>

                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── UMRAH COMPLETE CELEBRATION CARD ──────────────────────────────── */}
      {currentStep >= totalSteps - 1 && (
        <Card className="text-center py-8 px-6 border-app-brightGreen/80 bg-gradient-to-b from-[#101913] to-app-card space-y-4 animate-scale-in">
          <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-app-brightGreen flex items-center justify-center text-3xl mx-auto shadow-lg shadow-app-brightGreen/30">
            🎉
          </div>
          <div>
            <h3 className="text-2xl font-bold text-app-brightGreen">
              {activeLang === "gu" ? "અલ્હમ્દુલિલ્લાહ — ઉમરાહ સંપન્ન થયો!" : activeLang === "hi" ? "अल्हम्दुलिल्लाह — उमरा मुकम्मल हुआ!" : "Alhamdulillah — Umrah Complete!"}
            </h3>
            <p className="text-sm text-app-gold font-medium mt-1">
              {activeLang === "gu"
                ? "અલ્લાહ તઆલા તમારી ઉમરાહ અને تمام દુઆઓ કબૂલ ફરમાવે. આમીન!"
                : activeLang === "hi"
                ? "अल्लाह तआला आपका उमरा और तमाम दुआएं क़ुबूल फ़रमाए। आमीन!"
                : "May Allah accept your Umrah, forgive your shortcomings, and grant you abundant rewards."}
            </p>
          </div>

          <div className="p-4 bg-black/40 rounded-2xl border border-app-border text-xs text-app-textSecondary max-w-md mx-auto space-y-2">
            <p className="font-semibold text-white">
              {activeLang === "gu" ? "હવે પછી શું કરવું?" : "Next Steps:"}
            </p>
            <p>
              {activeLang === "gu" 
                ? "હવે તમે સામાન્ય કપડાં પહેરી શકો છો. મક્કાહમાં વધુમાં વધુ તવાફ અને નફલ નમાઝ પઢો અને મદીનાહ મુનવ્વરાહમાં મસ્જિદે નબવીની ઝિયારત કરો." 
                : "All Ihram restrictions are now lifted. Continue performing voluntary Tawafs, making Duas, and prepare for visiting Madeenah al-Munawwarah."}
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <Link
              href="/duas"
              className="px-5 py-2.5 rounded-2xl bg-app-brightGreen hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-app-brightGreen/20 transition-all active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              <span>{activeLang === "gu" ? "બધી ૪૯ દુઆઓ વાંચો" : "Explore All Duas"}</span>
            </Link>
          </div>
        </Card>
      )}

    </div>
  );
}

// ─── TACTILE COUNTER CARD (Laps 1 to 7) ─────────────────────────────────────────
function CounterCard({
  label, lapLabel = "Lap", value, total, onIncrement, onDecrement, onReset,
}: {
  label: string; lapLabel?: string; value: number; total: number;
  onIncrement: () => void; onDecrement: () => void; onReset: () => void;
}) {
  const pct = Math.round((value / total) * 100);
  const isFinished = value >= total;

  return (
    <div className="mt-3 p-4 bg-emerald-50/50 dark:bg-black/35 border border-app-border rounded-2xl space-y-3.5 shadow-inner">
      <div className="flex items-center justify-between border-b border-app-border/40 pb-2">
        <h4 className="font-bold text-xs sm:text-sm text-app-textPrimary flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-app-brightGreen animate-pulse" />
          <span>{label}</span>
        </h4>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-[11px] text-app-textMuted hover:text-red-500 transition-colors"
          title="Reset Counter to 0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Big Lap Number & 7 Pill indicators */}
      <div className="text-center space-y-2">
        <div className="text-5xl font-extrabold text-app-brightGreen tabular-nums tracking-tight">
          {value} <span className="text-lg text-app-textMuted font-normal">/ {total}</span>
        </div>

        {/* 7 Individual Lap Dots */}
        <div className="flex items-center justify-center gap-1.5">
          {Array.from({ length: total }).map((_, idx) => (
            <div
              key={idx}
              className={cn(
                "w-7 h-2 rounded-full transition-all",
                idx < value ? "bg-app-brightGreen shadow-sm shadow-app-brightGreen/50" : "bg-app-cardElevated border border-app-border"
              )}
              title={`${lapLabel} ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Tactile Big Action Buttons */}
      <div className="flex items-center gap-3 pt-1">
        <button
          onClick={onDecrement}
          disabled={value <= 0}
          className="w-14 h-14 rounded-2xl border border-app-border bg-app-cardElevated hover:bg-app-card text-app-textPrimary flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-90 text-xl font-bold"
          aria-label="Decrease lap"
        >
          <Minus className="w-6 h-6 text-app-textMuted" />
        </button>

        <button
          onClick={onIncrement}
          disabled={isFinished}
          className={cn(
            "flex-1 h-14 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 text-base font-bold shadow-lg",
            isFinished
              ? "bg-emerald-950/80 border border-emerald-800 text-emerald-300"
              : "bg-app-brightGreen hover:bg-emerald-600 text-white shadow-app-brightGreen/30"
          )}
          aria-label="Increment lap"
        >
          {isFinished ? (
            <>
              <Check className="w-5 h-5" />
              <span>All 7 {lapLabel}s Complete!</span>
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              <span>Tap when completing {lapLabel} {value + 1}</span>
            </>
          )}
        </button>
      </div>

      {isFinished && (
        <div className="p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-800 text-center text-xs font-bold text-emerald-300 animate-fade-in flex items-center justify-center gap-1.5">
          <CheckCircle className="w-4 h-4 text-app-brightGreen shrink-0" />
          <span>Masha'Allah! All 7 rounds completed successfully!</span>
        </div>
      )}
    </div>
  );
}

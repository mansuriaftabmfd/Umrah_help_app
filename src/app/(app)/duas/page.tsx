"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { 
  ArrowLeft, ArrowRight, Check, Info, FileText, Search, 
  LayoutList, Smartphone, ExternalLink, Volume2, 
  VolumeX, ChevronDown, BookOpen, Sparkles, Compass,
  Eye, CheckCircle2, Languages, BookMarked, Layers,
  ChevronRight
} from "lucide-react";
import { DUAS, DUA_GROUPS, getDuasByGroup, DUA_TITLES_GU, DUA_TITLES_HI, getDuaTitleGu, getDuaTransliterationGu, type Dua, type DuaTranslation } from "@/data/duas";
import { getDB } from "@/lib/db";
import { useAppStore } from "@/store/appStore";
import { Badge, Card, cn } from "@/components/ui";

type LangKey = keyof DuaTranslation;

const STATUS_BADGE: Record<string, { label: string; variant: "green" | "gold" | "muted" }> = {
  established: { label: "Established (Sunnah)", variant: "green" },
  recommended: { label: "Recommended", variant: "gold" },
  traditional:  { label: "Traditional", variant: "muted" },
};

// Section info with icons and PDF page ranges
const SECTION_INFO: Record<string, { title: string; pages: string; icon: string; desc: string }> = {
  "Journey & Umrah": { title: "Journey & Umrah", pages: "Pages 3–4", icon: "✈️", desc: "Leaving home, vehicles, and frequent travel supplications" },
  "Umrah":           { title: "Umrah & Ihram",   pages: "Page 3",    icon: "🤍", desc: "Niyyah (Intention) for Umrah and Talbiyah" },
  "Makkah":          { title: "Makkah al-Mukarramah", pages: "Pages 4–5, 9, 17", icon: "🕌", desc: "Masjid al-Haram, Ka'bah sighting, and Zamzam water" },
  "Tawaf":           { title: "Tawaf around Ka'bah",  pages: "Pages 5–9",   icon: "🕋", desc: "All 11 Duas for rounds, Hajr-e-Aswad, and corners" },
  "Sa’ee":           { title: "Sa’ee (Safa & Marwah)", pages: "Pages 10–12", icon: "🏃", desc: "All 8 Duas between Safa and Marwah and green lights" },
  "Any time":        { title: "Any Time Duas",        pages: "Pages 12–15", icon: "🤲", desc: "11 Qur'anic & Sunnah Duas for forgiveness, parents, family" },
  "Madeenah":        { title: "Madeenah al-Munawwarah", pages: "Pages 16–20", icon: "💚", desc: "Entering city, Masjid Nabawi, Salaam upon the Prophet ﷺ" },
};

export default function DuasPage() {
  const { dua: duaState, setDuaGroup, setCurrentDuaId, setDuaFontScale, setDuaLanguage } = useAppStore();

  // Primary view is "list" so ALL Duas are immediately visible on screen!
  const [viewMode, setViewMode] = useState<"list" | "focus">("list");
  const [search, setSearch] = useState<string>("");
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [expandedTranslations, setExpandedTranslations] = useState<Record<string, boolean>>({});

  const activeGroup = duaState.activeGroup || "All";
  const lang: LangKey = (duaState.language as LangKey) || "gu";

  // Filtered duas by active category
  const categoryDuas = useMemo(() => {
    return getDuasByGroup(activeGroup);
  }, [activeGroup]);

  // Search filtered across all or current category
  const displayedDuas = useMemo(() => {
    if (!search.trim()) return categoryDuas;
    const q = search.toLowerCase().trim();
    return DUAS.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        (DUA_TITLES_GU[d.id] && DUA_TITLES_GU[d.id].includes(q)) ||
        (DUA_TITLES_HI[d.id] && DUA_TITLES_HI[d.id].includes(q)) ||
        d.arabic.includes(q) ||
        d.transliteration.toLowerCase().includes(q) ||
        (d.transliteration_gu && d.transliteration_gu.includes(q)) ||
        d.meaning.en.toLowerCase().includes(q) ||
        d.meaning.gu.includes(q) ||
        d.meaning.hi.includes(q) ||
        d.group.toLowerCase().includes(q) ||
        d.order.toString() === q
    );
  }, [categoryDuas, search]);

  const currentIndex = Math.max(
    0,
    displayedDuas.findIndex((d) => d.id === duaState.currentDuaId)
  );
  const currentDua: Dua = displayedDuas[currentIndex] ?? displayedDuas[0] ?? DUAS[0];

  // Grouped duas for "All" view with section headings
  const groupedSections = useMemo(() => {
    if (activeGroup !== "All" || search.trim()) return null;
    const groups: { name: string; info: (typeof SECTION_INFO)[string]; duas: Dua[] }[] = [];
    const validGroupNames = ["Journey & Umrah", "Umrah", "Makkah", "Tawaf", "Sa’ee", "Any time", "Madeenah"];
    for (const g of validGroupNames) {
      const items = getDuasByGroup(g);
      if (items.length > 0) {
        groups.push({
          name: g,
          info: SECTION_INFO[g] || { title: g, pages: "", icon: "📖", desc: "" },
          duas: items,
        });
      }
    }
    return groups;
  }, [activeGroup, search]);

  // Live read status from IndexedDB
  const readMap = useLiveQuery(async () => {
    try {
      const rows = await getDB().duaReadStatus.toArray();
      return Object.fromEntries(rows.map((r) => [r.duaId, r.read]));
    } catch {
      return {} as Record<string, boolean>;
    }
  }, []);

  const isRead = Boolean(currentDua && readMap?.[currentDua.id]);
  const totalCompletedCount = DUAS.filter((d) => readMap?.[d.id]).length;
  const groupCompletedCount = categoryDuas.filter((d) => readMap?.[d.id]).length;

  // ── Navigation ─────────────────────────────────────────────
  const goNext = useCallback(() => {
    const next = displayedDuas[currentIndex + 1];
    if (next) setCurrentDuaId(next.id);
  }, [displayedDuas, currentIndex, setCurrentDuaId]);

  const goPrev = useCallback(() => {
    const prev = displayedDuas[currentIndex - 1];
    if (prev) setCurrentDuaId(prev.id);
  }, [displayedDuas, currentIndex, setCurrentDuaId]);

  // Keyboard navigation for focus view
  useEffect(() => {
    if (viewMode !== "focus") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, goNext, goPrev]);

  const handleGroupChange = useCallback(
    (group: string) => {
      setDuaGroup(group);
      setSearch("");
      const targetList = getDuasByGroup(group);
      if (targetList[0]) setCurrentDuaId(targetList[0].id);
    },
    [setDuaGroup, setCurrentDuaId]
  );

  const toggleReadDua = useCallback(
    async (id: string) => {
      try {
        const currentlyRead = Boolean(readMap?.[id]);
        await getDB().duaReadStatus.put({
          duaId: id,
          read: !currentlyRead,
          updatedAt: Date.now(),
        });
      } catch (e) {
        console.error("Failed to save read status:", e);
      }
    },
    [readMap]
  );

  const toggleTranslationExpand = (id: string) => {
    setExpandedTranslations((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Audio speech synthesis
  const handleToggleAudio = (targetDua: Dua) => {
    if (playingAudioId === targetDua.id) {
      window.speechSynthesis?.cancel();
      setPlayingAudioId(null);
    } else {
      window.speechSynthesis?.cancel();
      setPlayingAudioId(targetDua.id);
      if ("speechSynthesis" in window) {
        const textToSpeak =
          lang === "gu"
            ? targetDua.meaning.gu
            : lang === "hi"
            ? targetDua.meaning.hi
            : targetDua.transliteration;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = 0.85;
        utterance.onend = () => setPlayingAudioId(null);
        utterance.onerror = () => setPlayingAudioId(null);
        window.speechSynthesis.speak(utterance);
      } else {
        setTimeout(() => setPlayingAudioId(null), 3000);
      }
    }
  };

  const fontScaleClass =
    duaState.fontScale >= 1.3
      ? "text-3xl md:text-4xl"
      : duaState.fontScale >= 1.15
      ? "text-2xl md:text-3xl"
      : duaState.fontScale <= 0.85
      ? "text-lg md:text-xl"
      : "text-xl md:text-2xl";

  const statusInfo = STATUS_BADGE[currentDua?.status] ?? STATUS_BADGE.established;

  // Render an individual Dua card
  const renderDuaCard = (d: Dua) => {
    const read = Boolean(readMap?.[d.id]);
    const showAll3 = Boolean(expandedTranslations[d.id]);
    const isPlayingThis = playingAudioId === d.id;

    return (
      <div
        key={d.id}
        id={`dua-${d.id}`}
        className={cn(
          "p-5 rounded-2xl border transition-all space-y-4 shadow-sm",
          read
            ? "bg-emerald-50/70 dark:bg-emerald-950/25 border-emerald-300 dark:border-emerald-800/60"
            : "bg-app-card border-app-border hover:border-app-borderLight"
        )}
      >
        {/* Top Card Bar: Number + Title + PDF Reference + Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Dua Number Badge */}
              <span className="text-xs font-extrabold text-emerald-800 dark:text-app-brightGreen px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-700/80">
                #{d.order < 10 ? `0${d.order}` : d.order}
              </span>

              {/* Dual Language Title: English + Gujarati */}
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                <h3 className="font-bold text-base md:text-lg text-app-textPrimary">
                  {d.title}
                </h3>
                {getDuaTitleGu(d) && (
                  <span 
                    className="text-xs md:text-sm font-semibold text-app-gold"
                    style={{ fontFamily: '"Noto Sans Gujarati", sans-serif' }}
                  >
                    • {getDuaTitleGu(d)}
                  </span>
                )}
              </div>
            </div>

            {/* Badges: Topic Group + PDF Page + Quran Reference */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="px-2 py-0.5 rounded-lg bg-amber-500/10 text-app-gold font-medium border border-amber-500/30">
                {d.group}
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-app-cardElevated text-app-textMuted border border-app-border">
                PDF Page {d.source_pages}
              </span>
              {d.reference && (
                <span className="px-2 py-0.5 rounded-lg bg-amber-500/15 text-app-gold border border-amber-500/35 font-medium">
                  {d.reference}
                </span>
              )}
            </div>
          </div>

          {/* Quick Action Buttons on Each Card: Sunao (Listen) + Card Reader + Padh Liya */}
          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-app-border/40 w-full sm:w-auto">
            {/* Audio Button */}
            <button
              onClick={() => handleToggleAudio(d)}
              className={cn(
                "h-9 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all flex-1 sm:flex-initial",
                isPlayingThis
                  ? "bg-amber-500/20 border-app-gold text-app-gold animate-pulse"
                  : "bg-app-cardElevated border-app-border text-app-textSecondary hover:text-app-textPrimary hover:border-app-borderLight"
              )}
              title="Listen to pronunciation / translation"
            >
              {isPlayingThis ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-app-gold" />
                  <span>Sun rahe...</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-app-brightGreen" />
                  <span>Sunao</span>
                </>
              )}
            </button>

            {/* Focus Card Reader Button */}
            <button
              onClick={() => {
                setCurrentDuaId(d.id);
                setViewMode("focus");
              }}
              className="h-9 px-3 rounded-xl bg-app-cardElevated border border-app-border text-xs text-app-textSecondary hover:text-app-textPrimary hover:border-app-borderLight flex items-center justify-center gap-1.5 transition-colors flex-1 sm:flex-initial"
              title="Open in full screen reader card"
            >
              <Eye className="w-3.5 h-3.5 text-app-gold" />
              <span>Card Reader</span>
            </button>

            {/* Padh Liya Checkbox Button */}
            <button
              onClick={() => toggleReadDua(d.id)}
              className={cn(
                "h-9 px-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm flex-1 sm:flex-initial",
                read
                  ? "bg-emerald-600 text-white dark:bg-emerald-900/90 dark:text-emerald-200 border border-emerald-500"
                  : "bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-900/60 text-emerald-700 dark:text-app-brightGreen hover:bg-emerald-100 dark:hover:bg-emerald-900/60"
              )}
              title={read ? "Marked as completed (Click to toggle)" : "Click to mark as Padh Liya"}
            >
              <Check className="w-4 h-4" />
              <span>{read ? "Padh Liya ✓" : "Padh Liya"}</span>
            </button>
          </div>
        </div>

        {/* Recitation Instruction Callout Banner (From PDF) */}
        {d.instruction && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-app-textSecondary flex items-start gap-2.5">
            <Info className="w-4 h-4 text-app-gold shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-app-gold font-semibold">Instruction:</strong> {d.instruction}
            </p>
          </div>
        )}

        {/* ── ARABIC CALLIGRAPHY BOX ── */}
        <div className="bg-emerald-50/40 dark:bg-black/40 p-5 rounded-2xl border border-app-border shadow-inner">
          <p
            className={cn(
              "arabic-text text-app-textPrimary text-right leading-[2.4] select-text w-full tracking-wide",
              fontScaleClass
            )}
            dir="rtl"
            lang="ar"
            style={{ fontFamily: '"PDMS Saleem Quran", "IndoPak Quran", "Al Qalam Quran Majeed", "Scheherazade New", "Amiri", serif' }}
          >
            {d.arabic}
          </p>
        </div>

        {/* ── UCCHAARAN (LATIN PRONUNCIATION) ── */}
        <div className="bg-app-cardElevated p-3.5 rounded-xl border border-app-border space-y-1">
          <div className="flex items-center justify-between text-[11px] text-app-gold font-bold uppercase tracking-wider">
            <span>Ucchaaran (Latin Pronunciation)</span>
            <span className="text-[10px] text-app-textMuted normal-case font-normal">Transliteration</span>
          </div>
          <p className="text-xs md:text-sm text-app-textPrimary font-medium leading-relaxed select-text">
            {d.transliteration}
          </p>
        </div>

        {/* ── GUJARATI PRONUNCIATION (ગુજરાતી ઉચ્ચારણ) ── */}
        <div className="bg-app-cardElevated p-3.5 rounded-xl border border-app-border space-y-1">
          <div className="flex items-center justify-between text-[11px] text-app-gold font-bold uppercase tracking-wider">
            <span style={{ fontFamily: '"Noto Sans Gujarati", sans-serif' }}>ઉચ્ચારણ (GUJARATI PRONUNCIATION)</span>
            <span className="text-[10px] text-app-textMuted normal-case font-normal">ગુજરાતી લિપ્યંતરણ</span>
          </div>
          <p 
            className="text-xs md:text-sm text-app-textPrimary font-medium leading-relaxed select-text"
            style={{ fontFamily: '"Noto Sans Gujarati", sans-serif' }}
          >
            {getDuaTransliterationGu(d)}
          </p>
        </div>

        {/* ── MATLAB (MEANING IN SELECTED LANGUAGE) ── */}
        <div className="bg-app-cardElevated p-3.5 rounded-xl border border-app-border space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-app-brightGreen uppercase tracking-wider">
              Matlab (Meaning — {lang === "gu" ? "ગુજરાતી અર્થ" : lang === "hi" ? "हिन्दी अर्थ" : "English Translation"})
            </span>
            <button
              onClick={() => toggleTranslationExpand(d.id)}
              className="text-[11px] text-app-gold hover:underline font-medium"
            >
              {showAll3 ? "Show selected language only" : "Compare all 3 languages (ગુજરાતી, हिन्दी, English)"}
            </button>
          </div>

          {!showAll3 ? (
            <p
              className={cn(
                "text-xs md:text-sm text-app-textSecondary leading-relaxed select-text",
                lang === "gu" && "font-gujarati",
                lang === "hi" && "font-hindi"
              )}
              style={
                lang === "gu"
                  ? { fontFamily: '"Noto Sans Gujarati", sans-serif' }
                  : lang === "hi"
                  ? { fontFamily: '"Noto Sans Devanagari", sans-serif' }
                  : {}
              }
            >
              {d.meaning[lang] || d.meaning.en}
            </p>
          ) : (
            /* Trilingual Comparison: Shows all 3 languages stacked */
            <div className="space-y-2.5 pt-2 border-t border-app-border/50 mt-1">
              <div className="text-xs md:text-sm">
                <span className="text-app-gold font-bold mr-1.5">ગુજરાતી:</span>
                <span className="text-app-textSecondary" style={{ fontFamily: '"Noto Sans Gujarati", sans-serif' }}>
                  {d.meaning.gu}
                </span>
              </div>
              <div className="text-xs md:text-sm">
                <span className="text-app-gold font-bold mr-1.5">हिन्दी:</span>
                <span className="text-app-textSecondary" style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}>
                  {d.meaning.hi}
                </span>
              </div>
              <div className="text-xs md:text-sm">
                <span className="text-app-gold font-bold mr-1.5">English:</span>
                <span className="text-app-textSecondary">{d.meaning.en}</span>
              </div>
            </div>
          )}
        </div>

        {/* Notes if any */}
        {d.notes && (
          <p className="text-[11px] text-app-textMuted italic flex items-center gap-1.5 px-1">
            <Info className="w-3 h-3 text-app-gold shrink-0" />
            <span>{d.notes}</span>
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-full bg-app-bg text-app-textPrimary">
      {/* ── Top Header ───────────────────────────────────────── */}
      <div className="sticky top-0 z-20 border-b border-app-border bg-app-card/95 backdrop-blur-md px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg md:text-xl font-bold text-app-textPrimary flex items-center gap-2">
                <span>Du’as in Umrah</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-app-brightGreen border border-emerald-300 dark:border-emerald-700 font-bold">
                  All 49 Duas
                </span>
              </h2>
            </div>
            <p className="text-xs text-app-gold font-medium mt-0.5">
              Official Trilingual Edition · Arabic · Gujarati · Hindi · English (PDF Pages 3–20)
            </p>
          </div>

          {/* Action buttons: Trilingual PDF link + View mode switcher + Font size controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Direct Link to Trilingual PDF */}
            <a
              href="/quran/umrah_duas_trilingual.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/30 text-xs font-semibold text-emerald-700 dark:text-app-brightGreen hover:bg-emerald-100 dark:hover:bg-emerald-900/60 flex items-center gap-1.5 transition-colors shadow-sm"
              title="Open the official Trilingual PDF in a new tab"
            >
              <FileText className="w-3.5 h-3.5 text-app-brightGreen" />
              <span>Trilingual PDF</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            {/* View Mode Toggle: All 49 List vs Card Reader */}
            <div className="flex items-center bg-app-cardElevated border border-app-border rounded-xl p-1 shadow-inner">
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all",
                  viewMode === "list"
                    ? "bg-app-brightGreen text-white shadow-md shadow-app-brightGreen/30"
                    : "text-app-textMuted hover:text-app-textPrimary"
                )}
                title="View all Duas sequentially in a scrollable list"
              >
                <LayoutList className="w-3.5 h-3.5" />
                <span>All 49 List</span>
              </button>
              <button
                onClick={() => setViewMode("focus")}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all",
                  viewMode === "focus"
                    ? "bg-app-brightGreen text-white shadow-md shadow-app-brightGreen/30"
                    : "text-app-textMuted hover:text-app-textPrimary"
                )}
                title="Single Dua Card Reader for one-by-one recitation"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Card Reader</span>
              </button>
            </div>

            {/* Font scaling controls */}
            <div className="flex items-center bg-app-cardElevated border border-app-border rounded-xl p-0.5">
              <button
                onClick={() => setDuaFontScale(duaState.fontScale - 0.15)}
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-app-textSecondary hover:text-app-textPrimary hover:bg-app-card transition-colors"
                title="Decrease Arabic font size"
              >
                A-
              </button>
              <div className="w-px h-4 bg-app-border" />
              <button
                onClick={() => setDuaFontScale(duaState.fontScale + 0.15)}
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-app-textSecondary hover:text-app-textPrimary hover:bg-app-card transition-colors"
                title="Increase Arabic font size"
              >
                A+
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Subheader Bar: Language Selector & Recited Stats ───── */}
      <div className="border-b border-app-border bg-app-cardElevated/80 px-4 py-2 shrink-0 z-15">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Language Selector (Active across both List & Focus views) */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-app-textMuted font-medium flex items-center gap-1">
              <Languages className="w-3.5 h-3.5 text-app-gold" />
              <span>Language:</span>
            </span>
            <div className="inline-flex items-center bg-app-card border border-app-border rounded-xl p-0.5">
              <button
                onClick={() => setDuaLanguage("gu")}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-bold transition-all",
                  lang === "gu"
                    ? "bg-app-gold text-white shadow-sm font-extrabold"
                    : "text-app-textMuted hover:text-app-textPrimary"
                )}
              >
                ગુજરાતી
              </button>
              <button
                onClick={() => setDuaLanguage("hi")}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-bold transition-all",
                  lang === "hi"
                    ? "bg-app-gold text-white shadow-sm font-extrabold"
                    : "text-app-textMuted hover:text-app-textPrimary"
                )}
              >
                हिन्दी
              </button>
              <button
                onClick={() => setDuaLanguage("en")}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-bold transition-all",
                  lang === "en"
                    ? "bg-app-gold text-white shadow-sm font-extrabold"
                    : "text-app-textMuted hover:text-app-textPrimary"
                )}
              >
                English
              </button>
            </div>
          </div>

          {/* Read progress summary */}
          <div className="flex items-center gap-3 text-xs text-app-textMuted">
            <span>
              Recited: <strong className="text-app-brightGreen font-bold">{totalCompletedCount}</strong> / 49
            </span>
            <div className="w-28 h-2 bg-app-card border border-app-border rounded-full overflow-hidden">
              <div 
                className="h-full bg-app-brightGreen transition-all duration-300" 
                style={{ width: `${Math.round((totalCompletedCount / 49) * 100)}%` }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Category Chips & Search Bar ──────────────────────── */}
      <div className="border-b border-app-border bg-app-card px-4 py-2.5 shrink-0 z-10">
        <div className="max-w-4xl mx-auto space-y-2">
          {/* Category Badges with exact counts */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
            {DUA_GROUPS.map((group) => {
              const count = group === "All" ? DUAS.length : getDuasByGroup(group).length;
              const isActive = activeGroup === group && !search;
              return (
                <button
                  key={group}
                  onClick={() => handleGroupChange(group)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5",
                    isActive
                      ? "bg-app-brightGreen text-white shadow-md shadow-app-brightGreen/30 border border-emerald-500"
                      : "bg-app-cardElevated text-app-textSecondary border border-app-border hover:border-app-borderLight hover:text-app-textPrimary"
                  )}
                >
                  <span>{group}</span>
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.2 rounded-full",
                      isActive ? "bg-black/20 text-white font-extrabold" : "bg-app-card text-app-textMuted"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box & Quick Dua Jump Dropdown */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-app-textMuted" />
              <input
                type="text"
                placeholder="Search across all 49 duas (Arabic, Gujarati, Hindi, English, #number)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-app-cardElevated border border-app-border rounded-xl pl-9 pr-4 py-1.5 text-xs text-app-textPrimary placeholder-app-textMuted focus:outline-none focus:border-app-brightGreen"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-app-textMuted hover:text-app-textPrimary bg-app-card border border-app-border px-1.5 py-0.5 rounded"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Dua Picker Button */}
            <div className="relative">
              <button
                onClick={() => setShowPicker(!showPicker)}
                className="h-8 px-3 rounded-xl bg-app-cardElevated border border-app-border text-xs text-app-gold font-semibold flex items-center gap-1.5 hover:text-app-textPrimary transition-colors"
                title="Jump directly to any dua"
              >
                <span>Jump to #{currentDua?.order}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {/* Dropdown list of all 49 duas */}
              {showPicker && (
                <div className="absolute right-0 top-10 w-80 max-h-96 overflow-y-auto bg-app-card border border-app-border rounded-2xl shadow-2xl p-2 z-50 space-y-1">
                  <div className="p-2 text-xs font-bold text-app-gold border-b border-app-border flex items-center justify-between">
                    <span>Index of all 49 Duas</span>
                    <button
                      onClick={() => setShowPicker(false)}
                      className="text-app-textMuted hover:text-app-textPrimary text-[11px]"
                    >
                      Close
                    </button>
                  </div>
                  {DUAS.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => {
                        setCurrentDuaId(d.id);
                        setShowPicker(false);
                        const el = document.getElementById(`dua-${d.id}`);
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={cn(
                        "w-full text-left p-2 rounded-xl text-xs flex items-center gap-2 transition-colors",
                        d.id === currentDua?.id
                          ? "bg-app-brightGreen text-white font-bold"
                          : "hover:bg-app-cardElevated text-app-textSecondary hover:text-app-textPrimary"
                      )}
                    >
                      <span className="w-6 text-[10px] opacity-70 font-mono">#{d.order}</span>
                      <div className="truncate flex-1 flex items-baseline gap-1.5">
                        <span className="font-semibold truncate">{d.title}</span>
                        {getDuaTitleGu(d) && (
                          <span 
                            className="text-[11px] text-app-gold truncate"
                            style={{ fontFamily: '"Noto Sans Gujarati", sans-serif' }}
                          >
                            · {getDuaTitleGu(d)}
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] opacity-50 shrink-0">{d.group} · p.{d.source_pages}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Body (flows with document scroll, zero stutter) ── */}
      <div className={cn("transition-all", viewMode === "focus" ? "pb-60" : "pb-36 lg:pb-16")}>
        <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-6">

          {/* ══════════════════════════════════════════════════════════════
              MODE A: FULL LIST OF ALL DUAS (ALL 49 VISIBLE ON SCREEN)
              ══════════════════════════════════════════════════════════════ */}
          {viewMode === "list" ? (
            <div className="space-y-6">
              {/* Summary Bar */}
              <div className="flex items-center justify-between text-xs text-app-textMuted px-1 border-b border-app-border/40 pb-2">
                <span>
                  Showing <strong className="text-app-brightGreen font-bold">{displayedDuas.length}</strong> of{" "}
                  <strong className="text-app-textPrimary font-bold">49 Duas</strong> in{" "}
                  <strong className="text-app-gold font-bold">
                    {search ? `Search: "${search}"` : activeGroup === "All" ? "All Topics (Pages 3–20)" : activeGroup}
                  </strong>
                </span>
                <span>Click "Card" on any dua for focus mode</span>
              </div>

              {/* CASE 1: When "All" is selected with NO search — Group by Topic Headings */}
              {groupedSections ? (
                <div className="space-y-10">
                  {groupedSections.map((sec) => (
                    <div key={sec.name} className="space-y-4">
                      {/* Topic Section Header */}
                      <div className="bg-emerald-50/70 dark:bg-emerald-950/25 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/40 flex items-center justify-between gap-3 shadow-sm">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{sec.info.icon}</span>
                          <div>
                            <h3 className="text-base font-bold text-app-textPrimary flex items-center gap-2">
                              <span>{sec.info.title}</span>
                              <span className="text-[11px] px-2 py-0.2 rounded-full bg-emerald-500/15 text-app-brightGreen border border-emerald-500/30 font-semibold">
                                {sec.duas.length} {sec.duas.length === 1 ? "Dua" : "Duas"}
                              </span>
                            </h3>
                            <p className="text-xs text-app-textMuted mt-0.5">{sec.info.desc}</p>
                          </div>
                        </div>
                        <span className="text-xs text-app-gold font-medium bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/30 shrink-0">
                          {sec.info.pages}
                        </span>
                      </div>

                      {/* Duas of this section */}
                      <div className="space-y-4">
                        {sec.duas.map((d) => renderDuaCard(d))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* CASE 2: Category Filter Active (e.g. Journey & Umrah, Tawaf, Sa'ee, etc.) OR Search Active */
                <div className="space-y-4">
                  {/* Category Banner if specific group selected */}
                  {activeGroup !== "All" && !search && SECTION_INFO[activeGroup] && (
                    <div className="bg-emerald-50/70 dark:bg-emerald-950/25 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/40 flex items-center justify-between gap-3 mb-2 shadow-sm">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{SECTION_INFO[activeGroup].icon}</span>
                        <div>
                          <h3 className="text-base font-bold text-app-textPrimary">
                            {SECTION_INFO[activeGroup].title}
                          </h3>
                          <p className="text-xs text-app-textMuted mt-0.5">{SECTION_INFO[activeGroup].desc}</p>
                        </div>
                      </div>
                      <span className="text-xs text-app-gold font-medium bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/30 shrink-0">
                        {SECTION_INFO[activeGroup].pages}
                      </span>
                    </div>
                  )}

                  {/* Render all filtered duas */}
                  {displayedDuas.map((d) => renderDuaCard(d))}
                </div>
              )}

              {displayedDuas.length === 0 && (
                <div className="p-10 rounded-2xl bg-app-card border border-app-border text-center space-y-3">
                  <p className="text-base font-bold text-app-textPrimary">No duas found</p>
                  <p className="text-xs text-app-textMuted">Try another search keyword or switch categories.</p>
                  <button
                    onClick={() => {
                      setSearch("");
                      handleGroupChange("All");
                    }}
                    className="px-4 py-2 rounded-xl bg-app-brightGreen text-white text-xs font-bold"
                  >
                    View All 49 Duas
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* ══════════════════════════════════════════════════════════════
               MODE B: FOCUS READING CARD (SINGLE CARD READER)
               ══════════════════════════════════════════════════════════════ */
            <div className="space-y-5 pb-28">
              {/* Top Banner to switch back to List view */}
              <div className="flex items-center justify-between bg-app-card p-3 rounded-2xl border border-app-border shadow-sm">
                <button
                  onClick={() => setViewMode("list")}
                  className="text-xs font-bold text-app-brightGreen flex items-center gap-1.5 hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to All 49 Duas List</span>
                </button>
                <span className="text-xs text-app-textMuted">
                  Dua <strong className="text-app-textPrimary">{currentIndex + 1}</strong> of{" "}
                  <strong className="text-app-textPrimary">{displayedDuas.length}</strong> in {activeGroup}
                </span>
              </div>

              {/* Header row: Title + Font scale */}
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-app-gold uppercase tracking-wider">
                      {currentDua.group}
                    </span>
                    <span className="text-[11px] font-bold text-app-brightGreen bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      Dua #{currentDua.order} of 49
                    </span>
                    <span className="text-[11px] text-app-textMuted bg-app-cardElevated px-2 py-0.5 rounded-full border border-app-border">
                      PDF Page {currentDua.source_pages}
                    </span>
                    {currentDua.reference && (
                      <span className="text-[11px] font-semibold text-app-gold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                        {currentDua.reference}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 space-y-1">
                    <h3 className="text-xl md:text-2xl font-bold text-app-textPrimary">
                      {currentDua.title}
                    </h3>
                    {getDuaTitleGu(currentDua) && (
                      <p 
                        className="text-sm md:base font-semibold text-app-gold"
                        style={{ fontFamily: '"Noto Sans Gujarati", sans-serif' }}
                      >
                        {getDuaTitleGu(currentDua)}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Instruction banner if present */}
              {currentDua.instruction && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-app-textSecondary flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-app-gold shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-medium">
                    <strong className="text-app-gold">Instruction:</strong> {currentDua.instruction}
                  </p>
                </div>
              )}

              {/* ── MAIN ARABIC CARD ─────────────────────────────────── */}
              <div className="relative bg-app-card border border-app-border rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-xl overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-app-gold/50 to-transparent" />
                <div className="absolute right-4 bottom-2 text-8xl opacity-[0.03] select-none pointer-events-none">
                  ☽
                </div>

                <div className="py-2">
                  <p
                    className={cn(
                      "arabic-text text-app-textPrimary leading-[2.5] text-right select-text w-full tracking-wide",
                      fontScaleClass
                    )}
                    dir="rtl"
                    lang="ar"
                    style={{ fontFamily: '"PDMS Saleem Quran", "IndoPak Quran", "Al Qalam Quran Majeed", "Scheherazade New", "Amiri", serif' }}
                  >
                    {currentDua.arabic}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-app-brightGreen/40 text-app-brightGreen text-xs font-semibold">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Trilingual PDF · Page {currentDua.source_pages}</span>
                </div>
              </div>

              {/* ── Uccharan (Pronunciation / Transliteration) ───────── */}
              <div className="bg-app-card border border-app-border rounded-2xl p-5 space-y-2 shadow-sm">
                <div className="flex items-center justify-between text-xs text-app-gold font-bold uppercase tracking-wider">
                  <span>Uccharan (Latin Pronunciation)</span>
                  <span className="text-[11px] font-normal text-app-textMuted normal-case">
                    Source Transliteration
                  </span>
                </div>
                <p className="text-app-textPrimary font-medium leading-relaxed select-text text-sm md:text-base">
                  {currentDua.transliteration}
                </p>
              </div>

              {/* ── Gujarati Pronunciation (ગુજરાતી ઉચ્ચારણ) ────────── */}
              <div className="bg-app-card border border-app-border rounded-2xl p-5 space-y-2 shadow-sm">
                <div className="flex items-center justify-between text-xs text-app-gold font-bold uppercase tracking-wider">
                  <span style={{ fontFamily: '"Noto Sans Gujarati", sans-serif' }}>ઉચ્ચારણ (GUJARATI PRONUNCIATION)</span>
                  <span className="text-[11px] font-normal text-app-textMuted normal-case">
                    ગુજરાતી લિપ્યંતરણ
                  </span>
                </div>
                <p 
                  className="text-app-textPrimary font-medium leading-relaxed select-text text-sm md:text-base font-gujarati"
                  style={{ fontFamily: '"Noto Sans Gujarati", sans-serif' }}
                >
                  {getDuaTransliterationGu(currentDua)}
                </p>
              </div>

              {/* ── Matlab (Meaning in Selected Language) ───────────── */}
              <div className="bg-app-card border border-app-border rounded-2xl p-5 space-y-2 shadow-sm">
                <div className="flex items-center justify-between text-xs text-app-brightGreen font-bold uppercase tracking-wider">
                  <span>Matlab (Meaning)</span>
                  <span className="text-[11px] font-normal text-app-textMuted normal-case">
                    {lang === "gu" ? "ગુજરાતી અર્થ" : lang === "hi" ? "हिन्दी अर्थ" : "English Translation"}
                  </span>
                </div>
                <p
                  className={cn(
                    "text-app-textSecondary leading-relaxed select-text text-sm md:text-base",
                    lang === "gu" && "font-gujarati",
                    lang === "hi" && "font-hindi"
                  )}
                  style={
                    lang === "gu"
                      ? { fontFamily: '"Noto Sans Gujarati", sans-serif' }
                      : lang === "hi"
                      ? { fontFamily: '"Noto Sans Devanagari", sans-serif' }
                      : {}
                  }
                >
                  {currentDua.meaning[lang] || currentDua.meaning.en}
                </p>
              </div>

              {/* Notes if present */}
              {currentDua.notes && (
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-app-cardElevated/80 border border-app-borderLight text-xs text-app-textSecondary">
                  <Info className="w-4 h-4 text-app-gold shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{currentDua.notes}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Fixed Bottom Actions (Only for Focus Mode) ───────── */}
      {viewMode === "focus" && (
        <div className="fixed bottom-[58px] lg:bottom-0 inset-x-0 border-t border-app-border bg-app-card/95 backdrop-blur-xl px-3 sm:px-4 py-2.5 z-40 shadow-2xl">
          <div className="max-w-2xl mx-auto flex items-center gap-2 sm:gap-3">
            {/* Previous Dua */}
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="h-14 w-14 shrink-0 rounded-2xl border border-app-border bg-app-cardElevated flex items-center justify-center text-app-textSecondary hover:text-app-textPrimary hover:border-app-borderLight disabled:opacity-20 disabled:pointer-events-none transition-all active:scale-95 shadow-sm"
              aria-label="Previous dua"
              title="Previous Dua (Left Arrow)"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Audio Listen */}
            <button
              onClick={() => handleToggleAudio(currentDua)}
              className={cn(
                "h-14 px-3 sm:px-4 shrink-0 rounded-2xl border flex items-center justify-center gap-2 font-semibold text-xs transition-all active:scale-95",
                playingAudioId === currentDua.id
                  ? "bg-amber-500/20 border-app-gold text-app-gold animate-pulse"
                  : "bg-app-cardElevated border-app-border text-app-textSecondary hover:text-app-textPrimary hover:border-app-borderLight"
              )}
              title="Listen to translation / pronunciation"
            >
              {playingAudioId === currentDua.id ? (
                <>
                  <VolumeX className="w-4 h-4 text-app-gold" />
                  <span className="hidden sm:inline">Sun rahe...</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-app-brightGreen" />
                  <span className="hidden sm:inline">Sunao</span>
                </>
              )}
            </button>

            {/* Padh Liya / Mark Read Button */}
            <button
              onClick={() => toggleReadDua(currentDua.id)}
              className={cn(
                "flex-1 h-14 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-98 shadow-lg",
                isRead
                  ? "bg-emerald-600 text-white dark:bg-emerald-950 dark:border-emerald-500 dark:text-emerald-300"
                  : "bg-app-brightGreen hover:bg-emerald-600 text-white shadow-app-brightGreen/30"
              )}
            >
              <Check className="w-5 h-5" />
              <span>{isRead ? "Padh Liya ✓" : "Padh Liya"}</span>
            </button>

            {/* Next Dua */}
            <button
              onClick={goNext}
              disabled={currentIndex >= displayedDuas.length - 1}
              className="h-14 w-14 shrink-0 rounded-2xl border border-app-border bg-app-cardElevated flex items-center justify-center text-app-gold hover:text-app-textPrimary hover:border-app-borderLight disabled:opacity-20 disabled:pointer-events-none transition-all active:scale-95 shadow-sm"
              aria-label="Next dua"
              title="Next Dua (Right Arrow)"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

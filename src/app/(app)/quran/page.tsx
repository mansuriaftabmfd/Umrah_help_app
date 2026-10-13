"use client";

import { useState, useMemo } from "react";
import { BookOpen, Bookmark, Search, ExternalLink, ChevronRight, FileText, Sparkles, Layers, X } from "lucide-react";
import { useLiveQuery } from "dexie-react-hooks";
import { getDB } from "@/lib/db";
import { Card, Button, Badge } from "@/components/ui";
import Link from "next/link";
import { 
  QURAN_SURAHS, 
  QURAN_JUZ, 
  FEATURED_SURAHS, 
  getSurahByPage,
  type SurahItem 
} from "@/data/quranSurahs";

export default function QuranPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"featured" | "all" | "juz">("featured");

  const quranProgress = useLiveQuery(async () => {
    try { return await getDB().quranProgress.get(1); } catch { return null; }
  }, []);

  const bookmarks = useLiveQuery(async () => {
    try { return await getDB().quranBookmarks.orderBy("createdAt").reverse().limit(6).toArray(); } catch { return []; }
  }, []);

  const lastPage = quranProgress?.lastPage ?? 4; // Default to Al-Fatihah (page 4)
  const currentResumeSurah = useMemo(() => getSurahByPage(lastPage), [lastPage]);

  // Filter Surahs
  const filteredSurahs = useMemo(() => {
    const q = search.trim().toLowerCase();
    const sourceList = activeTab === "featured" && !q ? FEATURED_SURAHS : QURAN_SURAHS;
    if (!q) return sourceList;
    return QURAN_SURAHS.filter(
      (s) =>
        s.num.toString() === q ||
        s.name.toLowerCase().includes(q) ||
        s.arabic.includes(q) ||
        s.translation.toLowerCase().includes(q) ||
        `juz ${s.juz}`.includes(q)
    );
  }, [search, activeTab]);

  // Filter Juz
  const filteredJuz = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return QURAN_JUZ;
    return QURAN_JUZ.filter(
      (j) =>
        j.juz.toString() === q ||
        j.name.toLowerCase().includes(q) ||
        j.arabic.includes(q) ||
        `juz ${j.juz}`.includes(q)
    );
  }, [search]);

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6 animate-fade-in pb-36 lg:pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-app-border pb-4">
        <div>
          <h2 className="text-2xl font-bold text-app-textPrimary flex items-center gap-2">
            <span>Holy Quran</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-app-brightGreen border border-emerald-800 font-semibold">
              851 Pages Tajweed
            </span>
          </h2>
          <p className="text-sm text-app-gold font-medium mt-0.5">
            13-Line Color-Coded Tajweed Quran · High-Resolution Offline PDF · Exact Surah & Page Navigation
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/quran/quran-13-line-tajweed.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-app-card border border-app-border text-xs font-semibold text-app-textSecondary hover:text-app-textPrimary flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Full PDF
          </a>
          <a
            href="/quran/umrah-duas-source.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-amber-500/10 dark:bg-[#262118] border border-amber-500/30 text-xs font-semibold text-app-gold hover:text-app-textPrimary flex items-center gap-1.5 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            Dua Source PDF
          </a>
        </div>
      </div>

      {/* Main Resume Hero Card */}
      <div className="bg-gradient-to-br from-emerald-950/20 via-app-card to-amber-950/15 dark:from-[#161d19] dark:via-[#121314] dark:to-[#1a1815] border border-app-border rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-2xl">
        <div className="absolute right-4 -bottom-4 text-8xl opacity-10 select-none pointer-events-none">
          📖
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-app-brightGreen/20 border border-app-brightGreen/40 text-app-brightGreen text-xs font-bold">
              <Sparkles className="w-3 h-3" />
              <span>Resume Recitation</span>
            </div>
            <h3 className="text-2xl font-bold text-app-textPrimary">Continue Reading Quran</h3>
            <p className="text-sm text-app-textSecondary">
              Your last recitation was at <span className="text-app-gold font-bold">Page {lastPage}</span> of 851 ({currentResumeSurah.name} · Juz {currentResumeSurah.juz}).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={`/quran/read?page=${lastPage}`}>
              <button className="h-13 px-6 rounded-2xl bg-app-brightGreen hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-app-brightGreen/30 active:scale-95">
                <BookOpen className="w-5 h-5" />
                <span>Open Page {lastPage}</span>
              </button>
            </Link>
            <Link href="/quran/read?page=4">
              <button className="h-13 px-5 rounded-2xl bg-app-card border border-app-border hover:border-app-borderLight text-app-textSecondary hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all">
                <span>Start Surah Fatihah (p.4)</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Surah & Juz Explorer Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Quran Surahs & Juz</span>
              <span className="text-xs text-app-gold font-medium">13-Line Tajweed Mushaf</span>
            </h3>
            <p className="text-xs text-app-textMuted">
              Tap any Surah or Juz to jump directly to its exact page in the Tajweed Quran
            </p>
          </div>

          {/* View Mode Tabs */}
          <div className="flex items-center bg-app-card border border-app-border rounded-xl p-1 self-start sm:self-auto">
            <button
              onClick={() => { setActiveTab("featured"); setSearch(""); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "featured"
                  ? "bg-app-brightGreen text-white shadow-sm"
                  : "text-app-textMuted hover:text-white"
              }`}
            >
              Featured (8)
            </button>
            <button
              onClick={() => { setActiveTab("all"); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "all"
                  ? "bg-app-brightGreen text-white shadow-sm"
                  : "text-app-textMuted hover:text-white"
              }`}
            >
              All 114 Surahs
            </button>
            <button
              onClick={() => { setActiveTab("juz"); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "juz"
                  ? "bg-app-brightGreen text-white shadow-sm"
                  : "text-app-textMuted hover:text-white"
              }`}
            >
              30 Juz
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-app-textMuted" />
          <input
            type="text"
            placeholder={
              activeTab === "juz"
                ? "Search Juz by number or name (e.g. 15, Subhanallazi)..."
                : "Search any Surah by name, number, or Arabic (e.g. Al-Kahf, 18, Cave, Ya-Sin)..."
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-app-card border border-app-border rounded-xl pl-10 pr-9 py-2.5 text-xs text-app-textPrimary placeholder-app-textMuted focus:outline-none focus:border-app-brightGreen transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="w-6 h-6 absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-app-textMuted hover:text-app-textPrimary"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Surahs / Juz Grid */}
        {activeTab !== "juz" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {filteredSurahs.map((surah) => (
              <Link key={surah.num} href={`/quran/read?page=${surah.page}`}>
                <div className="p-3.5 bg-app-card border border-app-border hover:border-app-brightGreen/60 rounded-2xl transition-all cursor-pointer group flex items-center justify-between hover:bg-app-cardElevated shadow-sm">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-7 h-7 rounded-lg bg-app-cardElevated text-app-gold border border-app-border group-hover:border-app-brightGreen/40 flex items-center justify-center text-xs font-bold shrink-0">
                      {surah.num}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="font-bold text-sm text-app-textPrimary group-hover:text-app-brightGreen transition-colors truncate">
                          {surah.name}
                        </p>
                      </div>
                      <p className="text-[11px] text-app-textMuted truncate">
                        {surah.translation} · Juz {surah.juz}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-base font-bold text-app-gold group-hover:text-app-brightGreen font-arabic" dir="rtl">
                      {surah.arabic}
                    </span>
                    <div>
                      <span className="text-[10px] text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-800/60 font-semibold inline-block mt-0.5">
                        Page {surah.page}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredJuz.map((j) => (
              <Link key={j.juz} href={`/quran/read?page=${j.page}`}>
                <div className="p-3.5 bg-app-card border border-app-border hover:border-app-brightGreen/60 rounded-2xl transition-all cursor-pointer group flex items-center justify-between hover:bg-app-cardElevated shadow-sm">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-8 h-8 rounded-xl bg-app-cardElevated text-app-gold border border-app-border group-hover:border-app-brightGreen/40 flex items-center justify-center text-xs font-bold shrink-0">
                      {j.juz}
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-app-textPrimary group-hover:text-app-brightGreen transition-colors truncate">
                        Juz {j.juz}
                      </p>
                      <p className="text-[11px] text-app-textMuted truncate">
                        {j.name}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-base font-bold text-app-gold group-hover:text-app-brightGreen font-arabic" dir="rtl">
                      {j.arabic}
                    </span>
                    <div>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/60 font-semibold inline-block mt-0.5">
                        Page {j.page}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {filteredSurahs.length === 0 && filteredJuz.length === 0 && (
          <div className="p-8 text-center text-xs text-app-textMuted bg-app-card rounded-2xl border border-app-border">
            No Surah found matching "{search}".
          </div>
        )}
      </div>

      {/* Recent Bookmarks */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-app-textMuted uppercase tracking-wider">
          Saved Bookmarks
        </h3>
        {bookmarks && bookmarks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {bookmarks.map((bm) => (
              <Link key={bm.id} href={`/quran/read?page=${bm.page}`}>
                <div className="flex items-center gap-3 p-3.5 bg-app-card border border-app-border rounded-2xl hover:border-app-borderLight transition-colors cursor-pointer">
                  <Bookmark className="w-4 h-4 text-app-gold shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-app-textPrimary truncate">{bm.label || `Page ${bm.page}`}</p>
                    <p className="text-xs text-app-textMuted">Quran Page {bm.page}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-app-textMuted shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-app-card border border-app-border text-center text-xs text-app-textMuted">
            No bookmarks saved yet. While reading in the Quran Reader, tap the bookmark icon on any page to save it here.
          </div>
        )}
      </div>

      {/* Source PDF Cards info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <Card className="flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-app-brightGreen shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-app-textPrimary">851-Page Tajweed Mushaf</p>
            <p className="text-xs text-app-textMuted mt-1">
              Integrated high-resolution Quran with color-coded Tajweed markings. Works offline with exact 1-to-1 page and Surah navigation.
            </p>
            <Link href="/quran/read?page=4" className="inline-block mt-3 text-xs text-app-brightGreen font-bold hover:underline">
              Launch Reader from Surah Fatihah (Page 4) →
            </Link>
          </div>
        </Card>

        <Card className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-app-gold shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-app-textPrimary">Umrah Duas Source PDF</p>
            <p className="text-xs text-app-textMuted mt-1">
              Complete trilingual PDF guidebook containing authentic supplications for Tawaf, Sa'ee, and sacred places.
            </p>
            <a
              href="/quran/umrah-duas-source.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-xs text-app-gold font-bold hover:underline"
            >
              Open Dua Source PDF →
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}

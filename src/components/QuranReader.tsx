"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { 
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Minimize2,
  ExternalLink, Bookmark, BookmarkCheck, Loader2, RefreshCw, BookOpen,
  Search, X, Sparkles, ChevronDown, Check, SlidersHorizontal, Eye, EyeOff
} from "lucide-react";
import { getDB } from "@/lib/db";
import Link from "next/link";
import { 
  QURAN_SURAHS, 
  QURAN_JUZ, 
  FEATURED_SURAHS, 
  getSurahByPage, 
  getJuzByPage,
  type SurahItem,
  type JuzItem
} from "@/data/quranSurahs";

interface QuranReaderProps {
  initialPage?: number;
  onPageChange?: (page: number) => void;
  compact?: boolean;
}

const TOTAL_PAGES = 851;
const PDF_URL = "/quran/quran-13-line-tajweed.pdf";

export default function QuranReader({ initialPage = 1, onPageChange, compact = false }: QuranReaderProps) {
  const [page, setPage] = useState<number>(Math.max(1, Math.min(TOTAL_PAGES, initialPage)));
  const [pageInput, setPageInput] = useState<string>(initialPage.toString());
  const [totalPages, setTotalPages] = useState<number>(TOTAL_PAGES);
  
  // Fit Mode: "page" guarantees the WHOLE page fits vertically with 0 scrolling
  const [fitMode, setFitMode] = useState<"page" | "width">("page");
  const [manualScale, setManualScale] = useState<number>(1.0);
  const [showControls, setShowControls] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(true);
  const [rendering, setRendering] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"canvas" | "embed">("canvas");

  // Surah & Juz Picker Modal State
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [pickerTab, setPickerTab] = useState<"surahs" | "juz">("surahs");
  const [pickerSearch, setPickerSearch] = useState<string>("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const viewportContainerRef = useRef<HTMLDivElement | null>(null);
  const pdfDocRef = useRef<any>(null);
  const renderTaskRef = useRef<any>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Touch gesture tracking
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const isSwipingRef = useRef<boolean>(false);

  // Sync page state when initialPage changes
  useEffect(() => {
    if (initialPage >= 1 && initialPage <= TOTAL_PAGES) {
      setPage(initialPage);
      setPageInput(initialPage.toString());
    }
  }, [initialPage]);

  // Current active Surah and Juz based on current page
  const currentSurah = useMemo(() => getSurahByPage(page), [page]);
  const currentJuz = useMemo(() => getJuzByPage(page), [page]);

  const currentSurahIdx = useMemo(() => {
    return QURAN_SURAHS.findIndex((s) => s.num === currentSurah.num);
  }, [currentSurah.num]);

  const prevSurah = currentSurahIdx > 0 ? QURAN_SURAHS[currentSurahIdx - 1] : null;
  const nextSurah = currentSurahIdx < QURAN_SURAHS.length - 1 ? QURAN_SURAHS[currentSurahIdx + 1] : null;

  // Filtered lists for picker modal
  const filteredSurahs = useMemo(() => {
    const q = pickerSearch.trim().toLowerCase();
    if (!q) return QURAN_SURAHS;
    return QURAN_SURAHS.filter(
      (s) =>
        s.num.toString() === q ||
        s.name.toLowerCase().includes(q) ||
        s.arabic.includes(q) ||
        s.translation.toLowerCase().includes(q) ||
        `juz ${s.juz}`.includes(q)
    );
  }, [pickerSearch]);

  const filteredJuz = useMemo(() => {
    const q = pickerSearch.trim().toLowerCase();
    if (!q) return QURAN_JUZ;
    return QURAN_JUZ.filter(
      (j) =>
        j.juz.toString() === q ||
        j.name.toLowerCase().includes(q) ||
        j.arabic.includes(q) ||
        `juz ${j.juz}`.includes(q)
    );
  }, [pickerSearch]);

  // Focus search input when modal opens
  useEffect(() => {
    if (isPickerOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 80);
    }
  }, [isPickerOpen]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (isPickerOpen) {
        if (e.key === "Escape") setIsPickerOpen(false);
        return;
      }
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "ArrowRight") {
        goToPage(page + 1);
      } else if (e.key === "ArrowLeft") {
        goToPage(page - 1);
      } else if (e.key === "f" || e.key === "F") {
        setShowControls((s) => !s);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [page, isPickerOpen]);

  // Load PDF document on mount
  useEffect(() => {
    let isCancelled = false;

    async function initPdf() {
      try {
        setLoading(true);
        setError(null);

        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        const loadingTask = pdfjs.getDocument({
          url: PDF_URL,
          cMapUrl: "https://unpkg.com/pdfjs-dist@4.7.76/cmaps/",
          cMapPacked: true,
        });

        const doc = await loadingTask.promise;
        if (isCancelled) return;

        pdfDocRef.current = doc;
        setTotalPages(doc.numPages || TOTAL_PAGES);
        setLoading(false);
      } catch (err: any) {
        console.error("PDF.js loading error:", err);
        if (!isCancelled) {
          setError(err.message || "Failed to load PDF in canvas. You can use the Native PDF viewer below.");
          setLoading(false);
          setViewMode("embed");
        }
      }
    }

    initPdf();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Core Render Page onto Canvas with Dynamic Screen Auto-Fit
  const renderPage = useCallback(async (pageNum: number) => {
    if (!pdfDocRef.current || !canvasRef.current || !viewportContainerRef.current) return;

    try {
      setRendering(true);

      // Cancel any ongoing render task
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {}
      }

      const container = viewportContainerRef.current;
      const canvas = canvasRef.current;
      const pdfPage = await pdfDocRef.current.getPage(pageNum);
      const unscaledViewport = pdfPage.getViewport({ scale: 1.0 });

      // Available container viewport dimensions (with small 6px padding)
      const availW = Math.max(container.clientWidth - 8, 120);
      const availH = Math.max(container.clientHeight - 8, 120);

      let targetScale = 1.0;

      if (fitMode === "page") {
        // Fits BOTH width and height completely inside the viewport with ZERO scrolling!
        const scaleX = availW / unscaledViewport.width;
        const scaleY = availH / unscaledViewport.height;
        targetScale = Math.min(scaleX, scaleY);
      } else if (fitMode === "width") {
        // Fits width to screen, allowing vertical scroll if text is tall
        targetScale = availW / unscaledViewport.width;
      } else {
        targetScale = manualScale;
      }

      const displayW = Math.floor(unscaledViewport.width * targetScale);
      const displayH = Math.floor(unscaledViewport.height * targetScale);

      // High-DPI support: render at 2x or devicePixelRatio for crystal-sharp Arabic calligraphy
      const dpr = Math.min(Math.max(window.devicePixelRatio || 1, 2), 2.5);

      canvas.width = Math.floor(displayW * dpr);
      canvas.height = Math.floor(displayH * dpr);
      canvas.style.width = `${displayW}px`;
      canvas.style.height = `${displayH}px`;

      const context = canvas.getContext("2d", { alpha: false });
      if (!context) return;

      const viewport = pdfPage.getViewport({ scale: targetScale * dpr });
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      const renderTask = pdfPage.render(renderContext);
      renderTaskRef.current = renderTask;
      await renderTask.promise;
      setRendering(false);
    } catch (err: any) {
      if (err?.name !== "RenderingCancelledException") {
        console.error("Render page error:", err);
      }
      setRendering(false);
    }
  }, [fitMode, manualScale]);

  // Trigger render when page, fitMode, viewMode, or loading changes
  useEffect(() => {
    if (viewMode === "canvas" && !loading && pdfDocRef.current) {
      renderPage(page);
    }
  }, [page, fitMode, manualScale, viewMode, loading, renderPage]);

  // Auto-resize observer: whenever viewport size changes (e.g. orientation or toolbar toggle), re-fit page
  useEffect(() => {
    const container = viewportContainerRef.current;
    if (!container) return;

    let timeoutId: NodeJS.Timeout;
    const observer = new ResizeObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (pdfDocRef.current && viewMode === "canvas") {
          renderPage(page);
        }
      }, 100);
    });

    observer.observe(container);
    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [page, viewMode, renderPage]);

  // Persist progress and bookmark
  useEffect(() => {
    getDB().quranProgress.put({ id: 1, lastPage: page, updatedAt: Date.now() }).catch(() => {});
    onPageChange?.(page);

    getDB().quranBookmarks.where("page").equals(page).count()
      .then((c) => setIsBookmarked(c > 0))
      .catch(() => {});
  }, [page, onPageChange]);

  const goToPage = (p: number) => {
    const valid = Math.max(1, Math.min(totalPages, p));
    setPage(valid);
    setPageInput(valid.toString());
  };

  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(pageInput, 10);
    if (!isNaN(val)) {
      goToPage(val);
    } else {
      setPageInput(page.toString());
    }
  };

  const toggleBookmark = async () => {
    const db = getDB();
    if (isBookmarked) {
      const existing = await db.quranBookmarks.where("page").equals(page).first();
      if (existing?.id) await db.quranBookmarks.delete(existing.id);
      setIsBookmarked(false);
    } else {
      await db.quranBookmarks.add({ page, label: `${currentSurah.name} (Page ${page})`, createdAt: Date.now() });
      setIsBookmarked(true);
    }
  };

  const handleSelectSurah = (targetPage: number) => {
    goToPage(targetPage);
    setIsPickerOpen(false);
    setPickerSearch("");
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now(),
      };
      isSwipingRef.current = false;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || e.changedTouches.length === 0) return;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const deltaX = endX - touchStartRef.current.x;
    const deltaY = endY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.time;

    // Detect horizontal swipe
    if (Math.abs(deltaX) > 40 && Math.abs(deltaY) < 55 && deltaTime < 400) {
      isSwipingRef.current = true;
      if (deltaX < 0) {
        // Swiped Left -> Next page
        goToPage(page + 1);
      } else {
        // Swiped Right -> Previous page
        goToPage(page - 1);
      }
    }
    touchStartRef.current = null;
  };

  // Canvas Tap to Toggle Immersive Mode (only if not swiping)
  const handleCanvasContainerClick = (e: React.MouseEvent) => {
    if (isSwipingRef.current) {
      isSwipingRef.current = false;
      return;
    }
    setShowControls((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-full w-full bg-app-bg text-app-textPrimary select-none overflow-hidden relative">
      
      {/* ── Top Header Navigation Bar (Slides away smoothly in immersive mode) ── */}
      <div 
        className={`transition-all duration-300 ease-in-out shrink-0 z-30 bg-app-card/95 backdrop-blur-md border-b border-app-border ${
          showControls ? "max-h-16 opacity-100" : "max-h-0 opacity-0 pointer-events-none overflow-hidden border-b-0"
        }`}
      >
        <div className="flex items-center justify-between gap-2 px-2.5 sm:px-4 py-2">
          {/* Left: Back & Surah Jump Selector */}
          <div className="flex items-center gap-2 min-w-0">
            <Link href="/quran">
              <button 
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-app-card border border-app-border flex items-center justify-center text-app-textSecondary hover:text-app-textPrimary transition-colors shrink-0"
                title="Back to Quran Menu"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </Link>

            {/* Surah Selector Pill */}
            <button
              onClick={() => setIsPickerOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 border border-emerald-300 dark:border-emerald-800/60 transition-all text-left shadow-sm group min-w-0"
              title="Click to select any of 114 Surahs or 30 Juz"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-100 dark:bg-app-brightGreen/20 border border-emerald-300 dark:border-app-brightGreen/40 flex items-center justify-center text-emerald-800 dark:text-app-brightGreen shrink-0 group-hover:scale-105 transition-transform">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-xs sm:text-sm font-bold text-app-textPrimary group-hover:text-app-brightGreen transition-colors truncate">
                    {currentSurah.num}. {currentSurah.name}
                  </span>
                  <span className="text-xs text-app-gold font-arabic hidden sm:inline" dir="rtl">
                    {currentSurah.arabic}
                  </span>
                </div>
                <p className="text-[10px] text-app-textMuted flex items-center gap-1 truncate">
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Juz {currentJuz.juz}</span>
                  <span>·</span>
                  <span>p.{page}/{totalPages}</span>
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-app-brightGreen ml-1 shrink-0 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Right: Fit Mode, Page Go, Zoom, Bookmark, Immersive */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quick Page Jump */}
            <form onSubmit={handlePageInputSubmit} className="flex items-center gap-1">
              <input
                type="number"
                min={1}
                max={totalPages}
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                className="w-12 sm:w-14 h-8 bg-app-card border border-app-border rounded-xl px-1 text-center text-xs font-bold text-app-textPrimary focus:outline-none focus:border-app-brightGreen"
                title="Type page number"
              />
              <button
                type="submit"
                className="h-8 px-2 sm:px-2.5 rounded-xl bg-app-primary hover:bg-app-primaryHover text-white text-[11px] font-semibold transition-all"
              >
                Go
              </button>
            </form>

            {/* Fit Whole Page Toggle (guarantees entire page fits with 0 scrolling) */}
            <button
              onClick={() => setFitMode((m) => (m === "page" ? "width" : "page"))}
              className={`h-8 px-2.5 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 transition-all ${
                fitMode === "page"
                  ? "bg-app-brightGreen text-white border-app-brightGreen shadow-sm shadow-app-brightGreen/20"
                  : "bg-app-card border-app-border text-app-textSecondary hover:text-app-textPrimary"
              }`}
              title={fitMode === "page" ? "Page Fit Active (Full page visible without scrolling)" : "Switch to Full Page Fit"}
            >
              {fitMode === "page" ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Fit Page</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Fit Width</span>
                </>
              )}
            </button>

            {/* Bookmark */}
            <button
              onClick={toggleBookmark}
              className="w-8 h-8 rounded-xl bg-app-card border border-app-border flex items-center justify-center transition-colors"
              title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-app-gold" />
              ) : (
                <Bookmark className="w-4 h-4 text-app-textSecondary hover:text-app-textPrimary" />
              )}
            </button>

            {/* Immersive Mode Button */}
            <button
              onClick={() => setShowControls(false)}
              className="w-8 h-8 rounded-xl bg-app-card border border-app-border flex items-center justify-center text-app-textSecondary hover:text-app-textPrimary transition-colors"
              title="Full-Screen Reading (Tap screen anytime to restore controls)"
            >
              <EyeOff className="w-4 h-4" />
            </button>

            {/* Open full PDF in new tab */}
            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex w-8 h-8 rounded-xl bg-app-card border border-app-border items-center justify-center text-app-textSecondary hover:text-app-textPrimary transition-colors"
              title="Open External PDF"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Immersive Mode Quick Info Badge (Appears when controls are hidden) ── */}
      {!showControls && (
        <div className="absolute top-3 inset-x-0 z-30 flex justify-center pointer-events-none animate-fade-in">
          <button
            onClick={() => setShowControls(true)}
            className="pointer-events-auto px-3.5 py-1.5 rounded-full bg-black/75 hover:bg-black/90 backdrop-blur-md border border-white/15 text-white text-xs font-semibold flex items-center gap-2 shadow-2xl active:scale-95 transition-all group"
            title="Tap to show navigation bars"
          >
            <span className="text-app-brightGreen">{currentSurah.num}. {currentSurah.name}</span>
            <span className="text-white/60">·</span>
            <span className="text-app-gold font-mono">p.{page}/{totalPages}</span>
            <Eye className="w-3.5 h-3.5 text-white/70 group-hover:text-white transition-colors ml-0.5" />
          </button>
        </div>
      )}

      {/* ── Main Viewport Area (100% of remaining space, Zero Wasted Border) ── */}
      <div 
        ref={viewportContainerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleCanvasContainerClick}
        className={`flex-1 min-h-0 w-full flex items-center justify-center p-0.5 sm:p-1 relative cursor-pointer select-none ${
          fitMode === "width" ? "overflow-y-auto overscroll-y-contain" : "overflow-hidden"
        }`}
      >
        {/* Loading Spinner */}
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-app-bg/95 z-20 gap-3">
            <Loader2 className="w-8 h-8 text-app-brightGreen animate-spin" />
            <p className="text-sm font-semibold text-app-textPrimary">Loading 13-Line Tajweed Quran...</p>
            <p className="text-xs text-app-textMuted">851-page high resolution Mushaf</p>
          </div>
        )}

        {/* Rendering Indicator Badge */}
        {rendering && (
          <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium text-app-gold flex items-center gap-1.5 shadow-xl z-20 border border-white/10">
            <Loader2 className="w-3 h-3 animate-spin text-app-brightGreen" />
            <span>Rendering Page {page}...</span>
          </div>
        )}

        {/* Canvas or Native PDF Embed */}
        {viewMode === "canvas" ? (
          <div className="relative max-w-full max-h-full flex items-center justify-center m-auto">
            <canvas
              ref={canvasRef}
              className="block bg-white shadow-[0_4px_30px_rgba(0,0,0,0.85)] border border-[#232328] rounded-md transition-shadow"
              style={{
                maxWidth: "100%",
                maxHeight: fitMode === "page" ? "100%" : "none",
                objectFit: "contain",
              }}
            />

            {error && (
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 p-4 rounded-xl bg-red-950/80 border border-red-800 text-center max-w-md mx-auto z-20">
                <p className="text-xs text-red-300 mb-2">{error}</p>
                <button
                  onClick={() => setViewMode("embed")}
                  className="px-4 py-2 rounded-xl bg-app-primary text-white text-xs font-bold"
                >
                  Switch to Native PDF Viewer
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Native PDF Object Embed fallback */
          <div className="w-full h-full flex flex-col rounded-xl overflow-hidden border border-app-border bg-app-card">
            <object
              data={`${PDF_URL}#page=${page}&toolbar=1&navpanes=0`}
              type="application/pdf"
              className="w-full h-full flex-1"
            >
              <div className="flex flex-col items-center justify-center p-8 text-center h-full gap-4">
                <BookOpen className="w-12 h-12 text-app-gold" />
                <h3 className="text-base font-bold text-app-textPrimary mb-1">Direct PDF Viewing</h3>
                <a
                  href={PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-app-primary hover:bg-app-primaryHover text-white text-xs font-bold shadow-lg"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Quran PDF ({page} of {totalPages})
                </a>
              </div>
            </object>
          </div>
        )}

        {/* Floating Quick Navigation Chevron Buttons (Left & Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPage(page - 1);
          }}
          disabled={page <= 1}
          className="absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-12 rounded-xl bg-black/40 hover:bg-black/80 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white disabled:opacity-0 flex items-center justify-center transition-all z-20 active:scale-95 shadow-lg group"
          title="Previous Page (Swipe right or press Left Arrow)"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPage(page + 1);
          }}
          disabled={page >= totalPages}
          className="absolute right-1.5 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-12 rounded-xl bg-black/40 hover:bg-black/80 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white disabled:opacity-0 flex items-center justify-center transition-all z-20 active:scale-95 shadow-lg group"
          title="Next Page (Swipe left or press Right Arrow)"
        >
          <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* ── Bottom Page Navigation Bar (Zero extra margin, Collapsible) ── */}
      <div 
        className={`transition-all duration-300 ease-in-out shrink-0 z-30 bg-app-card/95 backdrop-blur-md border-t border-app-border ${
          showControls ? "max-h-28 opacity-100" : "max-h-0 opacity-0 pointer-events-none overflow-hidden border-t-0"
        }`}
      >
        {/* Page Scrubber Slider */}
        <div className="flex items-center gap-2 px-3 pt-2 pb-1">
          <span className="text-[10px] text-app-textMuted font-mono shrink-0">1</span>
          <input
            type="range"
            min={1}
            max={totalPages}
            value={page}
            onChange={(e) => goToPage(parseInt(e.target.value, 10))}
            className="flex-1 h-1 bg-app-cardElevated rounded-lg appearance-none cursor-pointer accent-emerald-500"
            title={`Scrub page: ${page} of ${totalPages}`}
          />
          <span className="text-[10px] text-app-textMuted font-mono shrink-0">{totalPages}</span>
        </div>

        {/* Buttons Row */}
        <div className="flex items-center justify-between gap-2 px-3 pb-2 pt-0.5">
          {/* Previous Page Button */}
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page <= 1}
            className="h-9 sm:h-10 px-3 sm:px-4 rounded-xl bg-app-card border border-app-border hover:border-app-brightGreen/40 disabled:opacity-30 disabled:pointer-events-none text-app-textPrimary font-semibold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-4 h-4 text-app-gold" />
            <span className="text-xs">Prev</span>
          </button>

          {/* Center: Surah & Page Pill (Click to open picker) */}
          <button
            onClick={() => setIsPickerOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-app-cardElevated hover:bg-app-card border border-app-border hover:border-app-brightGreen/50 text-xs font-bold text-app-textPrimary flex items-center gap-1.5 sm:gap-2 transition-all shadow-sm group min-w-0"
            title="Click to select any Surah"
          >
            <span className="text-app-brightGreen group-hover:underline truncate">
              {currentSurah.num}. {currentSurah.name}
            </span>
            <span className="text-app-gold text-[11px] px-1.5 py-0.5 rounded bg-app-card border border-app-border shrink-0">
              p.{page}/{totalPages}
            </span>
            <ChevronDown className="w-3 h-3 text-app-textMuted group-hover:text-app-textPrimary shrink-0" />
          </button>

          {/* Next Page Button */}
          <button
            onClick={() => goToPage(page + 1)}
            disabled={page >= totalPages}
            className="h-9 sm:h-10 px-3 sm:px-4 rounded-xl bg-app-primary hover:bg-app-primaryHover disabled:opacity-30 disabled:pointer-events-none text-white font-semibold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-md shadow-app-primary/30"
            aria-label="Next Page"
          >
            <span className="text-xs">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Surah & Juz Navigation Modal ────────────────────────────── */}
      {isPickerOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fade-in"
          onClick={() => setIsPickerOpen(false)}
        >
          <div 
            className="w-full max-w-3xl max-h-[85vh] bg-[#141416] border border-app-border rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-app-border bg-[#18181c]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-800 flex items-center justify-center text-app-brightGreen">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Quran Surah & Juz Navigation</span>
                    <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-app-brightGreen/20 text-app-brightGreen border border-app-brightGreen/30">
                      13-Line Tajweed
                    </span>
                  </h3>
                  <p className="text-xs text-app-gold">
                    Currently reading: Surah {currentSurah.num}. {currentSurah.name} ({currentSurah.arabic}) · Page {page}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsPickerOpen(false)}
                className="w-9 h-9 rounded-xl bg-app-card border border-app-border flex items-center justify-center text-app-textMuted hover:text-white transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Search & Tabs Bar */}
            <div className="p-4 border-b border-app-border bg-[#121214] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-app-textMuted" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search by name, number, meaning (e.g. Al-Kahf, 18, Cave, Juz 15)..."
                    value={pickerSearch}
                    onChange={(e) => setPickerSearch(e.target.value)}
                    className="w-full bg-app-card border border-app-border rounded-xl pl-10 pr-9 py-2.5 text-xs text-white placeholder-app-textMuted focus:outline-none focus:border-app-brightGreen transition-colors"
                  />
                  {pickerSearch && (
                    <button
                      onClick={() => setPickerSearch("")}
                      className="w-6 h-6 absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-app-textMuted hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Tabs Switcher */}
                <div className="flex items-center bg-app-card border border-app-border rounded-xl p-1 shrink-0">
                  <button
                    onClick={() => setPickerTab("surahs")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      pickerTab === "surahs"
                        ? "bg-app-brightGreen text-white shadow-sm"
                        : "text-app-textMuted hover:text-white"
                    }`}
                  >
                    114 Surahs
                  </button>
                  <button
                    onClick={() => setPickerTab("juz")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      pickerTab === "juz"
                        ? "bg-app-brightGreen text-white shadow-sm"
                        : "text-app-textMuted hover:text-white"
                    }`}
                  >
                    30 Juz (Para)
                  </button>
                </div>
              </div>

              {/* Popular Surah Quick Jump Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                <span className="text-[10px] uppercase font-bold text-app-gold tracking-wider shrink-0 mr-1">
                  ⭐ Quick Jump:
                </span>
                {FEATURED_SURAHS.map((s) => (
                  <button
                    key={s.num}
                    onClick={() => handleSelectSurah(s.page)}
                    className={`px-2.5 py-1 rounded-lg border font-semibold shrink-0 transition-all ${
                      currentSurah.num === s.num
                        ? "bg-app-brightGreen text-white border-app-brightGreen shadow-sm"
                        : "bg-app-card hover:bg-emerald-950/60 border-app-border hover:border-app-brightGreen/40 text-app-textSecondary hover:text-white"
                    }`}
                  >
                    {s.name} (p.{s.page})
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Body: Scrollable Grid */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#0d0d0f] scrollbar-thin">
              {pickerTab === "surahs" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {filteredSurahs.map((surah) => {
                    const isCurrent = currentSurah.num === surah.num;
                    return (
                      <div
                        key={surah.num}
                        onClick={() => handleSelectSurah(surah.page)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 group ${
                          isCurrent
                            ? "bg-emerald-950/60 border-app-brightGreen shadow-lg shadow-app-brightGreen/10"
                            : "bg-app-card border-app-border hover:border-app-brightGreen/50 hover:bg-[#1b1c20]"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Number Badge */}
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                              isCurrent
                                ? "bg-app-brightGreen text-white shadow-md shadow-app-brightGreen/30"
                                : "bg-black/40 text-app-gold border border-app-border group-hover:border-app-brightGreen/40"
                            }`}
                          >
                            {surah.num}
                          </div>

                          {/* Info */}
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className={`font-bold text-xs truncate ${isCurrent ? "text-app-brightGreen" : "text-white group-hover:text-app-brightGreen"}`}>
                                {surah.name}
                              </p>
                              {isCurrent && (
                                <span className="w-1.5 h-1.5 rounded-full bg-app-brightGreen shrink-0" />
                              )}
                            </div>
                            <p className="text-[10px] text-app-textMuted truncate">
                              {surah.translation} · {surah.verses} Ayahs
                            </p>
                          </div>
                        </div>

                        {/* Arabic Name & Page Badge */}
                        <div className="text-right shrink-0">
                          <p className="text-sm font-bold text-app-gold font-arabic" dir="rtl">
                            {surah.arabic}
                          </p>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/60 text-emerald-300 border border-emerald-900/60 inline-block mt-0.5">
                            Page {surah.page}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Juz Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {filteredJuz.map((j) => {
                    const isCurrent = currentJuz.juz === j.juz;
                    return (
                      <div
                        key={j.juz}
                        onClick={() => handleSelectSurah(j.page)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 group ${
                          isCurrent
                            ? "bg-emerald-950/60 border-app-brightGreen shadow-lg shadow-app-brightGreen/10"
                            : "bg-app-card border-app-border hover:border-app-brightGreen/50 hover:bg-[#1b1c20]"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                              isCurrent
                                ? "bg-app-brightGreen text-white"
                                : "bg-black/40 text-app-gold border border-app-border"
                            }`}
                          >
                            {j.juz}
                          </div>
                          <div className="min-w-0">
                            <p className={`font-bold text-xs truncate ${isCurrent ? "text-app-brightGreen" : "text-white group-hover:text-app-brightGreen"}`}>
                              Juz {j.juz}
                            </p>
                            <p className="text-[10px] text-app-textMuted truncate">
                              {j.name}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <p className="text-sm font-bold text-app-gold font-arabic" dir="rtl">
                            {j.arabic}
                          </p>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/60 text-emerald-300 border border-emerald-900/60 inline-block mt-0.5">
                            Page {j.page}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {filteredSurahs.length === 0 && filteredJuz.length === 0 && (
                <div className="p-8 text-center text-xs text-app-textMuted">
                  No Surah or Juz found matching "{pickerSearch}". Try searching by Surah name (e.g. Al-Kahf) or number (18).
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-[#18181c] border-t border-app-border flex items-center justify-between text-xs text-app-textMuted px-5">
              <span>Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-app-card border border-app-border text-[10px] text-white">Esc</kbd> to close</span>
              <button
                onClick={() => setIsPickerOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-app-card hover:bg-app-cardHover border border-app-border text-white text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

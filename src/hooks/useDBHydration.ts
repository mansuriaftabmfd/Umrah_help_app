/**
 * Client-side hydration hook.
 * Reads IndexedDB on mount, populates Zustand store, seeds defaults if missing.
 */

"use client";

import { useEffect } from "react";
import {
  getDB,
  DEFAULT_SETTINGS,
  DEFAULT_UMRAH_PROGRESS,
  DEFAULT_CHECKLIST,
} from "@/lib/db";
import { useAppStore } from "@/store/appStore";

export function useDBHydration() {
  const { setHydrated, applySettings, applyProgress, theme } = useAppStore();

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      try {
        const db = getDB();

        // ── Settings ──────────────────────────────────────────────────────
        let settings = await db.userSettings.get(1);
        if (!settings) {
          settings = DEFAULT_SETTINGS;
          await db.userSettings.put(settings);
        }
        if (!cancelled) applySettings(settings);

        // ── Umrah progress ────────────────────────────────────────────────
        let progress = await db.umrahProgress.get(1);
        if (!progress) {
          progress = DEFAULT_UMRAH_PROGRESS;
          await db.umrahProgress.put(progress);
        }
        if (!cancelled) applyProgress(progress);

        // ── Checklist (seed once) ─────────────────────────────────────────
        const existingCount = await db.checklistItems.count();
        if (existingCount === 0) {
          const now = Date.now();
          await db.checklistItems.bulkPut(
            DEFAULT_CHECKLIST.map((item) => ({ ...item, updatedAt: now }))
          );
        }

        // ── Quran progress ────────────────────────────────────────────────
        const qp = await db.quranProgress.get(1);
        if (!qp) {
          await db.quranProgress.put({ id: 1, lastPage: 1, updatedAt: Date.now() });
        }

        if (!cancelled) setHydrated(true);
      } catch (err) {
        console.error("[DBHydration] Failed to hydrate from IndexedDB:", err);
        if (!cancelled) setHydrated(true); // still mark hydrated so UI renders
      }
    }

    hydrate();
    return () => { cancelled = true; };
  }, []); // run once

  // Apply theme class to <html>
  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
      html.classList.remove("light");
    } else {
      html.classList.add("light");
      html.classList.remove("dark");
    }
  }, [theme]);
}

// ─── Online / offline watcher ─────────────────────────────────────────────────
export function useOnlineStatus() {
  const setIsOnline = useAppStore((s) => s.setIsOnline);

  useEffect(() => {
    const on  = () => setIsOnline(true);
    const off = () => setIsOnline(false);
    window.addEventListener("online",  on);
    window.addEventListener("offline", off);
    setIsOnline(navigator.onLine);
    return () => {
      window.removeEventListener("online",  on);
      window.removeEventListener("offline", off);
    };
  }, [setIsOnline]);
}

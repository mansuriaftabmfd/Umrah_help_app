/**
 * Zustand global store.
 * Hydrates from IndexedDB on first client render.
 * All writes go to IndexedDB immediately; UI updates from store.
 */

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import type { UserSettings, UmrahProgress } from "@/lib/db";

// ─── Types ───────────────────────────────────────────────────────────────────

export type Language = "gu" | "hi" | "en";
export type FontSize = "sm" | "md" | "lg" | "xl";
export type Theme = "dark" | "light";

export interface DuaState {
  activeGroup: string;
  currentDuaId: string;
  fontScale: number;    // 0.8 – 1.4
  language: Language;
}

export interface CounterState {
  mode: "tawaf" | "sai";
  tawafLap: number;   // 0-7
  saiLap: number;     // 0-7
}

interface AppStore {
  // Settings
  language: Language;
  fontSize: FontSize;
  theme: Theme;
  setLanguage: (l: Language) => void;
  setFontSize: (s: FontSize) => void;
  setTheme: (t: Theme) => void;

  // Hydration
  hydrated: boolean;
  setHydrated: (v: boolean) => void;

  // Dua reader
  dua: DuaState;
  setDuaGroup: (g: string) => void;
  setCurrentDuaId: (id: string) => void;
  setDuaFontScale: (s: number) => void;
  setDuaLanguage: (l: Language) => void;

  // Counters (lap values — events written separately to DB)
  counter: CounterState;
  setCounterMode: (m: "tawaf" | "sai") => void;
  setTawafLap: (n: number) => void;
  setSaiLap: (n: number) => void;

  // Umrah steps
  currentStep: number;
  setCurrentStep: (n: number) => void;

  // Offline indicator
  isOnline: boolean;
  setIsOnline: (v: boolean) => void;

  // Apply settings loaded from DB
  applySettings: (s: UserSettings) => void;
  applyProgress: (p: UmrahProgress) => void;
}

export const useAppStore = create<AppStore>()(
  subscribeWithSelector((set) => ({
    // Defaults (overwritten on hydration)
    language: "gu",
    fontSize: "lg",
    theme: "dark",
    hydrated: false,

    setLanguage: (language) => set({ language }),
    setFontSize: (fontSize) => set({ fontSize }),
    setTheme: (theme) => set({ theme }),
    setHydrated: (hydrated) => set({ hydrated }),

    dua: {
      activeGroup: "All",
      currentDuaId: "leaving_home",
      fontScale: 1.0,
      language: "gu",
    },
    setDuaGroup: (g) =>
      set((s) => ({ dua: { ...s.dua, activeGroup: g } })),
    setCurrentDuaId: (id) =>
      set((s) => ({ dua: { ...s.dua, currentDuaId: id } })),
    setDuaFontScale: (scale) =>
      set((s) => ({ dua: { ...s.dua, fontScale: Math.min(1.4, Math.max(0.8, scale)) } })),
    setDuaLanguage: (l) =>
      set((s) => ({ dua: { ...s.dua, language: l } })),

    counter: {
      mode: "tawaf",
      tawafLap: 0,
      saiLap: 0,
    },
    setCounterMode: (mode) =>
      set((s) => ({ counter: { ...s.counter, mode } })),
    setTawafLap: (n) =>
      set((s) => ({ counter: { ...s.counter, tawafLap: Math.min(7, Math.max(0, n)) } })),
    setSaiLap: (n) =>
      set((s) => ({ counter: { ...s.counter, saiLap: Math.min(7, Math.max(0, n)) } })),

    currentStep: 0,
    setCurrentStep: (n) => set({ currentStep: n }),

    isOnline: true,
    setIsOnline: (isOnline) => set({ isOnline }),

    applySettings: (s) =>
      set({
        language: s.language,
        fontSize: s.fontSize,
        theme: s.theme,
        dua: {
          activeGroup: "Tawaf",
          currentDuaId: "rabbana-rukn-yamani",
          fontScale: 1.0,
          language: s.language,
        },
      }),

    applyProgress: (p) =>
      set({
        currentStep: p.currentStep,
        counter: {
          mode: "tawaf",
          tawafLap: p.tawafLap,
          saiLap: p.saiLap,
        },
      }),
  }))
);

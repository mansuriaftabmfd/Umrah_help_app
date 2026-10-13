"use client";

import { useCallback } from "react";
import {
  Globe, Moon, Sun, Trash2,
} from "lucide-react";
import { getDB } from "@/lib/db";
import { useAppStore } from "@/store/appStore";
import { Card, SectionHeader, Badge, cn } from "@/components/ui";
import type { Language, FontSize, Theme } from "@/store/appStore";

export default function SettingsPage() {
  const { language, setLanguage, fontSize, setFontSize, theme, setTheme } = useAppStore();

  const saveSettings = useCallback(async (patch: Partial<{ language: Language; fontSize: FontSize; theme: Theme }>) => {
    const cur = useAppStore.getState();
    try {
      await getDB().userSettings.put({
        id: 1,
        language: patch.language ?? cur.language,
        fontSize: patch.fontSize ?? cur.fontSize,
        theme: patch.theme ?? cur.theme,
        updatedAt: Date.now(),
      });
    } catch { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleLanguage = (l: Language) => {
    setLanguage(l);
    saveSettings({ language: l });
  };
  const handleFontSize = (s: FontSize) => {
    setFontSize(s);
    saveSettings({ fontSize: s });
  };
  const handleTheme = (t: Theme) => {
    setTheme(t);
    const html = document.documentElement;
    if (t === "dark") { html.classList.add("dark"); html.classList.remove("light"); }
    else { html.classList.add("light"); html.classList.remove("dark"); }
    saveSettings({ theme: t });
  };

  const clearAllData = async () => {
    if (!confirm("This will delete ALL local data including progress and journals. Are you sure?")) return;
    try {
      const db = getDB();
      await Promise.all([
        db.counterEvents.clear(),
        db.duaReadStatus.clear(),
        db.journalEntries.clear(),
        db.quranBookmarks.clear(),
        db.familyMessages.clear(),
        db.umrahProgress.clear(),
      ]);
      alert("Data cleared. Refreshing…");
      window.location.reload();
    } catch { }
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-6 animate-fade-in pb-36 lg:pb-12">
      <div>
        <h2 className="text-xl font-bold text-app-textPrimary">Settings</h2>
        <p className="text-sm text-app-textMuted mt-0.5">App preferences & accessibility</p>
      </div>

      {/* Language */}
      <div>
        <SectionHeader label="Language" />
        <Card noPad>
          {(["gu", "hi", "en"] as Language[]).map((lang, i, arr) => {
            const labels = { gu: "ગુજરાતી — Gujarati", hi: "हिन्दी — Hindi", en: "English" };
            return (
              <button
                key={lang}
                onClick={() => handleLanguage(lang)}
                className={cn(
                  "w-full flex items-center justify-between px-5 py-4 transition-colors text-sm",
                  i < arr.length - 1 && "border-b border-app-border",
                  language === lang ? "bg-app-primary/10" : "hover:bg-app-cardElevated"
                )}
              >
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-app-textMuted" />
                  <span className={language === lang ? "font-semibold text-app-brightGreen" : "text-app-textSecondary"}>
                    {labels[lang]}
                  </span>
                </div>
                {language === lang && (
                  <span className="w-2.5 h-2.5 rounded-full bg-app-brightGreen" />
                )}
              </button>
            );
          })}
        </Card>
      </div>

      {/* Font size */}
      <div>
        <SectionHeader label="Font Size" />
        <Card className="flex gap-2">
          {(["sm", "md", "lg", "xl"] as FontSize[]).map((s) => {
            const sizeMap = { sm: "Small", md: "Medium", lg: "Large", xl: "XL" };
            return (
              <button
                key={s}
                onClick={() => handleFontSize(s)}
                className={cn(
                  "flex-1 py-3 rounded-xl text-sm font-semibold border transition-all",
                  fontSize === s
                    ? "bg-app-primary border-app-brightGreen text-white shadow-md"
                    : "bg-app-cardElevated border-app-border text-app-textMuted hover:text-app-textPrimary"
                )}
              >
                {sizeMap[s]}
              </button>
            );
          })}
        </Card>
      </div>

      {/* Theme */}
      <div>
        <SectionHeader label="Appearance" />
        <Card noPad>
          {(["dark", "light"] as Theme[]).map((t, i) => (
            <button
              key={t}
              onClick={() => handleTheme(t)}
              className={cn(
                "w-full flex items-center justify-between px-5 py-4 transition-colors",
                i === 0 && "border-b border-app-border",
                theme === t ? "bg-app-primary/10" : "hover:bg-app-cardElevated"
              )}
            >
              <div className="flex items-center gap-3">
                {t === "dark" ? <Moon className="w-4 h-4 text-app-textMuted" /> : <Sun className="w-4 h-4 text-app-textMuted" />}
                <span className={cn("text-sm capitalize", theme === t ? "font-semibold text-app-brightGreen" : "text-app-textSecondary")}>
                  {t === "dark" ? "Dark Mode (default)" : "Light Mode"}
                </span>
              </div>
              {theme === t && <span className="w-2.5 h-2.5 rounded-full bg-app-brightGreen" />}
            </button>
          ))}
        </Card>
      </div>

      {/* App info */}
      <div>
        <SectionHeader label="About" />
        <Card className="space-y-3">
          {[
            { label: "App Version", value: "1.0.0 (Offline-First)" },
            { label: "Data Storage", value: "All data stored locally (IndexedDB)" },
            { label: "Quran PDF", value: "13-Line Tajweed · 851 pages" },
            { label: "Duas Dataset", value: "All 49 Duas from Trilingual Edition (Arabic, Gujarati, Hindi, English)" },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between text-sm">
              <span className="text-app-textMuted">{label}</span>
              <span className="text-app-textSecondary font-medium text-right max-w-[50%]">{value}</span>
            </div>
          ))}
        </Card>
      </div>

      {/* Danger zone */}
      <div>
        <SectionHeader label="Data Management" />
        <button
          onClick={clearAllData}
          className="w-full h-12 rounded-xl border border-app-danger/30 text-app-danger hover:bg-red-500/10 text-sm font-semibold flex items-center justify-center gap-2 transition-all"
        >
          <Trash2 className="w-4 h-4" />
          Clear All Local Data
        </button>
        <p className="text-xs text-app-textMuted mt-2 text-center">
          This cannot be undone. Settings, progress, and journal entries will be deleted.
        </p>
      </div>
    </div>
  );
}

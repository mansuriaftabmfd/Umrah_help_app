"use client";

import { useEffect } from "react";
import { useDBHydration, useOnlineStatus } from "@/hooks/useDBHydration";
import { useAppStore } from "@/store/appStore";

/**
 * AppProviders — client wrapper that:
 * 1. Hydrates IndexedDB → Zustand on first render
 * 2. Watches online/offline status
 * 3. Applies font-size token to <html>
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  useDBHydration();
  useOnlineStatus();

  const fontSize = useAppStore((s) => s.fontSize);
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-fontsize", fontSize);
  }, [fontSize]);

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "light") {
      html.classList.add("light");
      html.classList.remove("dark");
    } else {
      html.classList.add("dark");
      html.classList.remove("light");
    }
  }, [theme]);

  return <>{children}</>;
}

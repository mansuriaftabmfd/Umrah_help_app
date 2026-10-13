"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Map, BookOpen, Book, Languages, Users,
  CheckSquare, Calendar, Settings, Moon, ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/components/ui";
import { useAppStore } from "@/store/appStore";
import { OfflineIndicator } from "@/components/ui";

const NAV_ITEMS = [
  { href: "/home",      label: "Home Dashboard",   icon: Home },
  { href: "/guide",     label: "Umrah Guide",       icon: Map },
  { href: "/duas",      label: "Duas",              icon: BookOpen },
  { href: "/quran",     label: "Quran",             icon: Book },
  { href: "/translate", label: "Translate",         icon: Languages },
  { href: "/family",    label: "Family & Safety",   icon: Users },
  { href: "/checklist", label: "Checklist",         icon: CheckSquare },
  { href: "/journal",   label: "Journey Journal",   icon: Calendar },
] as const;

const MOBILE_NAV = [
  { href: "/home",      label: "Home",      icon: Home },
  { href: "/guide",     label: "Guide",     icon: Map },
  { href: "/duas",      label: "Duas",      icon: BookOpen },
  { href: "/translate", label: "Translate", icon: Languages },
  { href: "/quran",     label: "Quran",     icon: Book },
  { href: "/family",    label: "Family",    icon: Users },
  { href: "/settings",  label: "More",      icon: Settings },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const isQuranReader = pathname.startsWith("/quran/read");
  const isOnline = useAppStore((s) => s.isOnline);

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-app-bg">
      {/* Desktop Sidebar */}
      {!isQuranReader && (
        <aside className="hidden lg:flex w-64 bg-app-card border-r border-app-border flex-col justify-between p-5 shrink-0">
          <div>
            <div className="flex items-center gap-3 pb-6 border-b border-app-border">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-app-primary to-app-brightGreen flex items-center justify-center shadow-lg shadow-app-primary/20">
                <Moon className="w-5 h-5 text-emerald-100" />
              </div>
              <div>
                <h1 className="font-bold text-sm text-app-textPrimary tracking-tight">
                  Umrah Companion
                </h1>
                <p className="text-[11px] text-app-gold font-medium">
                  Your Journey. Our Support.
                </p>
              </div>
            </div>

            <nav className="mt-5 space-y-0.5" aria-label="Main navigation">
              {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                const active = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all",
                      active
                      ? "bg-app-primary/15 border border-app-primary/30 text-app-brightGreen font-semibold"
                      : "text-app-textSecondary hover:bg-app-cardElevated hover:text-app-textPrimary border border-transparent"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className={cn("w-4 h-4 shrink-0", active && "text-app-brightGreen")} />
                  <span>{label}</span>
                  {active && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-app-brightGreen" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-3 pt-5 border-t border-app-border">
          <div className="flex items-center gap-2.5 p-3 bg-app-card rounded-xl border border-app-border">
            <ShieldCheck className={cn("w-4 h-4 shrink-0", isOnline ? "text-app-brightGreen" : "text-app-gold")} />
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-app-textPrimary truncate">
                {isOnline ? "Online · Synced" : "Offline Ready"}
              </p>
              <p className="text-[10px] text-app-textMuted truncate">
                Duas & guide cached locally
              </p>
            </div>
          </div>

          <Link
            href="/settings"
            className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-app-cardElevated text-app-textSecondary hover:text-app-textPrimary transition-colors text-xs font-medium"
          >
            <span className="flex items-center gap-2.5">
              <Settings className="w-4 h-4" />
              Settings & Accessibility
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-app-textMuted" />
          </Link>
        </div>
      </aside>
    )}

    {/* Main content */}
    <main className="flex-1 flex flex-col overflow-hidden h-full">
      {!isQuranReader && (
        <header className="hidden lg:flex h-14 border-b border-app-border px-6 items-center justify-between bg-app-bg/95 backdrop-blur shrink-0">
          <PageTitle pathname={pathname} />
          <div className="flex items-center gap-3">
            <OfflineIndicator online={isOnline} />
            <div className="w-8 h-8 rounded-xl bg-app-card border border-app-border flex items-center justify-center text-app-textMuted">
              <Users className="w-4 h-4" />
            </div>
          </div>
        </header>
      )}

      <div
        className={cn(
          "flex-1",
          isQuranReader
            ? "h-full overflow-hidden flex flex-col"
            : "overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch]"
        )}
      >
        {children}
      </div>
    </main>

    {/* Mobile bottom navigation */}
    {!isQuranReader && (
      <nav
        className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-app-card/95 backdrop-blur-lg border-t border-app-border/80 shadow-2xl pb-safe"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-around px-1 py-1.5">
          {MOBILE_NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 py-1 px-1 rounded-xl transition-all flex-1 min-w-0 active:scale-95",
                  active
                    ? "text-app-brightGreen font-bold"
                    : "text-app-textMuted hover:text-app-textPrimary"
                )}
                aria-current={active ? "page" : undefined}
              >
                <div className={cn(
                  "p-1 rounded-lg transition-all",
                  active && "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-app-brightGreen border border-emerald-300 dark:border-emerald-800/60 shadow-sm",
                  href === "/translate" && !active && "text-app-gold"
                )}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                </div>
                <span className="text-[9px] sm:text-[10px] truncate max-w-full tracking-tight">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    )}
    </div>
  );
}

function PageTitle({ pathname }: { pathname: string }) {
  const map: Record<string, string> = {
    "/home":      "Home Dashboard",
    "/guide":     "Umrah Guide",
    "/duas":      "Duas",
    "/quran":     "Quran",
    "/translate": "Translate",
    "/family":    "Family & Safety",
    "/checklist": "Checklist",
    "/journal":   "Journey Journal",
    "/settings":  "Settings",
    "/profile":   "Profile",
  };
  const match = Object.entries(map).find(([k]) => pathname.startsWith(k));
  return (
    <h2 className="text-base font-bold text-app-textPrimary">
      {match?.[1] ?? "Umrah Companion"}
    </h2>
  );
}

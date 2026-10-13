"use client";

import Link from "next/link";
import {
  Map, BookOpen, Book, Languages, Users, CheckSquare, Calendar,
  Play, RotateCw, ChevronRight, MapPin, CheckCircle, Circle,
} from "lucide-react";
import { useLiveQuery } from "dexie-react-hooks";
import { getDB } from "@/lib/db";
import { useAppStore } from "@/store/appStore";
import { Card, ProgressBar, ProgressRing, Badge, cn } from "@/components/ui";

const UMRAH_STEPS = [
  { id: 0, label: "Ihram",       sublabel: "Intention & garment" },
  { id: 1, label: "Talbiyah",    sublabel: "Recite continuously" },
  { id: 2, label: "Tawaf",       sublabel: "7 rounds of Ka'bah" },
  { id: 3, label: "2 Rakat",     sublabel: "At Maqam Ibrahim" },
  { id: 4, label: "Zamzam",      sublabel: "Drink & make dua" },
  { id: 5, label: "Sa'i",        sublabel: "7 laps Safa–Marwa" },
  { id: 6, label: "Halq/Taqsir", sublabel: "Hair cut — Umrah complete" },
];

const QUICK_ACTIONS = [
  { href: "/guide",     label: "Umrah Guide",   icon: Map,         color: "text-app-brightGreen bg-emerald-500/15" },
  { href: "/duas",      label: "Duas",          icon: BookOpen,    color: "text-app-gold bg-amber-500/15" },
  { href: "/quran",     label: "Quran",         icon: Book,        color: "text-blue-500 bg-blue-500/15" },
  { href: "/translate", label: "Translate",     icon: Languages,   color: "text-purple-500 bg-purple-500/15" },
  { href: "/family",    label: "Family",        icon: Users,       color: "text-red-500 bg-red-500/15" },
  { href: "/checklist", label: "Checklist",     icon: CheckSquare, color: "text-app-brightGreen bg-emerald-500/15" },
  { href: "/journal",   label: "Journal",       icon: Calendar,    color: "text-app-gold bg-amber-500/15" },
] as const;

export default function HomePage() {
  const { currentStep, counter } = useAppStore();

  // Live checklist progress from IndexedDB
  const checklistItems = useLiveQuery(() => {
    try { return getDB().checklistItems.toArray(); } catch { return []; }
  }, []);

  const totalItems   = checklistItems?.length ?? 0;
  const checkedItems = checklistItems?.filter((i) => i.checked).length ?? 0;
  const checkPct     = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

  const tawafPct = Math.round((counter.tawafLap / 7) * 100);
  const saiPct   = Math.round((counter.saiLap   / 7) * 100);
  const stepPct  = Math.round((currentStep / 6) * 100);

  const currentStepInfo = UMRAH_STEPS[currentStep] ?? UMRAH_STEPS[0];

  return (
    <div className="p-5 md:p-7 max-w-5xl mx-auto space-y-7 animate-fade-in pb-36 lg:pb-12">

      {/* ── Greeting ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-app-textPrimary">Assalamu Alaikum</h2>
          <p className="text-sm text-app-gold font-medium mt-0.5">
            May your Umrah be accepted · تقبل الله منا ومنكم
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-app-textMuted bg-app-card px-3 py-1.5 rounded-xl border border-app-border w-fit">
          <MapPin className="w-3.5 h-3.5 text-app-brightGreen" />
          <span>Holy Mosque · Makkah</span>
        </div>
      </div>

      {/* ── Hero + progress grid ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Continue Umrah hero card */}
        <Card className="lg:col-span-2 relative overflow-hidden flex flex-col justify-between min-h-[200px]">
          {/* Decorative Kaaba SVG watermark */}
          <div className="absolute right-4 bottom-2 opacity-[0.07] pointer-events-none select-none">
            <svg width="160" height="160" viewBox="0 0 200 200" fill="none">
              <rect x="40" y="50" width="120" height="110" rx="6" fill="#C8A24A" />
              <rect x="40" y="65" width="120" height="12" fill="#F5F5F2" />
              <rect x="40" y="82" width="120" height="4"  fill="#F5F5F2" />
              <circle cx="100" cy="115" r="8" fill="#F5F5F2" />
            </svg>
          </div>

          <div className="space-y-4">
            <Badge variant="green">
              <span className="w-1.5 h-1.5 rounded-full bg-app-brightGreen pulse-dot" />
              Active Umrah Step
            </Badge>

            <div>
              <h3 className="text-xl font-bold text-app-textPrimary">
                Continue Umrah
              </h3>
              <p className="text-sm text-app-textSecondary mt-1">
                Current step: <span className="text-white font-semibold">{currentStepInfo.label}</span>
                {" — "}{currentStepInfo.sublabel}
              </p>
            </div>

            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-extrabold text-app-brightGreen">
                  Step {currentStep + 1}
                </span>
                <span className="text-sm text-app-textMuted">of 7</span>
              </div>
              <ProgressBar value={stepPct} />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-5">
            <Link href="/duas">
              <button className="h-11 px-5 rounded-xl bg-app-brightGreen hover:bg-emerald-600 text-white font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-app-brightGreen/20 active:scale-[0.98]">
                <Play className="w-4 h-4 fill-white" />
                Continue Duas
              </button>
            </Link>
            <Link href="/guide">
              <button className="h-11 px-4 rounded-xl bg-app-card hover:bg-app-cardElevated border border-app-border text-app-textPrimary font-semibold text-sm flex items-center gap-2 transition-all">
                <RotateCw className="w-4 h-4" />
                Umrah Guide
              </button>
            </Link>
          </div>
        </Card>

        {/* Progress rings card */}
        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-app-border">
            <h4 className="font-bold text-sm text-app-textPrimary">My Progress</h4>
            <Link href="/guide" className="text-xs text-app-brightGreen hover:underline">View all</Link>
          </div>

          <div className="flex justify-around py-2">
            <div className="flex flex-col items-center gap-2">
              <ProgressRing value={tawafPct} size={64} label={`${counter.tawafLap}/7`} sublabel="Tawaf" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <ProgressRing value={saiPct} size={64} label={`${counter.saiLap}/7`} sublabel="Sa'i" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <ProgressRing value={checkPct} size={64} label={`${checkedItems}/${totalItems}`} sublabel="Checklist" />
            </div>
          </div>

          {/* Step list */}
          <div className="space-y-1.5 mt-1">
            {UMRAH_STEPS.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "flex items-center justify-between py-1.5 px-2 rounded-lg text-xs font-medium",
                  step.id < currentStep  && "text-app-brightGreen",
                  step.id === currentStep && "bg-app-primary/10 border border-app-primary/30 text-white",
                  step.id > currentStep  && "text-app-textMuted"
                )}
              >
                <span className="flex items-center gap-2">
                  {step.id < currentStep
                    ? <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                    : step.id === currentStep
                    ? <span className="w-3.5 h-3.5 shrink-0 rounded-full bg-app-brightGreen animate-pulse" />
                    : <Circle className="w-3.5 h-3.5 shrink-0 opacity-40" />
                  }
                  {step.label}
                </span>
                {step.id < currentStep && (
                  <span className="text-[10px] text-app-brightGreen">Done</span>
                )}
                {step.id === currentStep && (
                  <span className="text-[10px] text-app-brightGreen">Active</span>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── Quick actions ─────────────────────────────────────────────────── */}
      <div>
        <h4 className="text-xs font-bold text-app-textMuted uppercase tracking-widest mb-4">
          Companion Tools
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map(({ href, label, icon: Icon, color }) => (
            <Link key={href} href={href}>
              <div className="bg-app-card hover:bg-app-cardElevated border border-app-border hover:border-app-borderLight p-4 rounded-2xl flex flex-col gap-3 transition-all group cursor-pointer min-h-[90px]">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform", color)}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-app-textPrimary">{label}</p>
                </div>
              </div>
            </Link>
          ))}
          <Link href="/guide">
            <div className="bg-app-card hover:bg-app-cardElevated border border-app-border hover:border-app-borderLight p-4 rounded-2xl flex flex-col gap-3 transition-all group cursor-pointer min-h-[90px]">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <RotateCw className="w-5 h-5 text-purple-500" />
                </div>
                <ChevronRight className="w-4 h-4 text-app-textMuted group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-sm font-semibold text-app-textPrimary">Counters</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

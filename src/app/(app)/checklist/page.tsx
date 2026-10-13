"use client";

import { useCallback } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { CheckSquare, Square } from "lucide-react";
import { getDB } from "@/lib/db";
import { Card, ProgressBar, SectionHeader, cn } from "@/components/ui";

const CATEGORY_ORDER = ["Documents", "Ihram", "Medicines", "Bag"];

export default function ChecklistPage() {
  const items = useLiveQuery(async () => {
    try { return await getDB().checklistItems.toArray(); } catch { return []; }
  }, []);

  const toggle = useCallback(async (id: string, current: boolean) => {
    try {
      await getDB().checklistItems.update(id, { checked: !current, updatedAt: Date.now() });
    } catch {}
  }, []);

  const total   = items?.length ?? 0;
  const checked = items?.filter((i) => i.checked).length ?? 0;
  const pct     = total > 0 ? Math.round((checked / total) * 100) : 0;

  const byCategory = CATEGORY_ORDER.reduce<Record<string, typeof items>>((acc, cat) => {
    acc[cat] = items?.filter((i) => i.category === cat) ?? [];
    return acc;
  }, {});

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-6 animate-fade-in pb-36 lg:pb-12">

      <div>
        <h2 className="text-xl font-bold text-app-textPrimary">Umrah Checklist</h2>
        <p className="text-sm text-app-textMuted mt-0.5">{checked} of {total} items packed</p>
        <ProgressBar value={pct} className="mt-3" />
      </div>

      {pct === 100 && (
        <Card className="text-center py-5 border-app-brightGreen">
          <p className="text-2xl mb-2">✅</p>
          <p className="font-bold text-app-brightGreen">All packed! Have a blessed journey.</p>
        </Card>
      )}

      {CATEGORY_ORDER.map((cat) => {
        const catItems = byCategory[cat] ?? [];
        if (catItems.length === 0) return null;
        const catChecked = catItems.filter((i) => i.checked).length;

        return (
          <div key={cat}>
            <SectionHeader
              label={cat}
              action={
                <span className="text-xs text-app-textMuted font-medium">
                  {catChecked}/{catItems.length}
                </span>
              }
            />
            <div className="space-y-2">
              {catItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggle(item.id, item.checked)}
                  className={cn(
                    "w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all",
                    "min-h-[52px]", // 52px touch target
                    item.checked
                      ? "bg-app-primary/10 border-app-primary/30"
                      : "bg-app-card border-app-border hover:border-app-borderLight"
                  )}
                  aria-checked={item.checked}
                  role="checkbox"
                >
                  {item.checked
                    ? <CheckSquare className="w-5 h-5 text-app-brightGreen shrink-0" />
                    : <Square className="w-5 h-5 text-app-textMuted shrink-0" />
                  }
                  <span className={cn(
                    "text-sm font-medium",
                    item.checked ? "text-app-textSecondary line-through" : "text-app-textPrimary"
                  )}>
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

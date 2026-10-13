"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import QuranReader from "@/components/QuranReader";
import { Loader2 } from "lucide-react";

function QuranReadContent() {
  const searchParams = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") ?? "1", 10);
  const initialPage = isNaN(pageParam) ? 1 : Math.max(1, Math.min(851, pageParam));

  return <QuranReader initialPage={initialPage} />;
}

export default function QuranReadPage() {
  return (
    <div className="w-full h-full flex flex-col bg-app-bg text-app-textPrimary overflow-hidden">
      <Suspense
        fallback={
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-app-brightGreen animate-spin" />
            <p className="text-sm text-app-textMuted">Loading Quran Reader...</p>
          </div>
        }
      >
        <QuranReadContent />
      </Suspense>
    </div>
  );
}

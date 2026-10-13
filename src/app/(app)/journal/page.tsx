"use client";

import { useState, useCallback } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Plus, Heart, CalendarDays, Trash2 } from "lucide-react";
import { getDB } from "@/lib/db";
import { Card, Input, Textarea, Modal, EmptyState, Badge } from "@/components/ui";




export default function JournalPage() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  const entries = useLiveQuery(async () => {
    try { return await getDB().journalEntries.orderBy("createdAt").reverse().toArray(); } catch { return []; }
  }, []);

  const saveEntry = useCallback(async () => {
    if (!title.trim()) return;
    setSaving(true);
    try {
      await getDB().journalEntries.add({
        title: title.trim(),
        note: note.trim(),
        date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
        syncStatus: "pending",
        createdAt: Date.now(),
      });
      setTitle("");
      setNote("");
      setShowModal(false);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  }, [title, note]);

  const deleteEntry = useCallback(async (id: number) => {
    try { await getDB().journalEntries.delete(id); } catch {}
  }, []);

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-5 animate-fade-in pb-36 lg:pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-app-textPrimary">Journey Journal</h2>
          <p className="text-sm text-app-textMuted mt-0.5">Your personal Umrah memories</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="h-11 px-4 rounded-xl bg-app-primary hover:bg-app-primaryHover text-white text-sm font-semibold flex items-center gap-2 transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          Add Memory
        </button>
      </div>

      {entries && entries.length > 0 ? (
        <div className="space-y-4">
          {entries.map((entry) => (
            <Card key={entry.id} className="relative group">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-app-primary/20 border border-app-primary/30 flex items-center justify-center text-app-gold shrink-0">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-app-textPrimary">{entry.title}</h3>
                      <span className="text-[11px] text-app-textMuted">{entry.date}</span>
                    </div>
                    {entry.note && (
                      <p className="text-sm text-app-textSecondary mt-1 leading-relaxed">{entry.note}</p>
                    )}
                    {entry.syncStatus === "pending" && (
                      <Badge variant="muted" className="mt-2">
                        Saved locally
                      </Badge>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => entry.id && deleteEntry(entry.id)}
                  className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-lg flex items-center justify-center text-app-textMuted hover:text-app-danger hover:bg-red-500/10 transition-all shrink-0"
                  aria-label="Delete entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<CalendarDays className="w-6 h-6" />}
          title="No memories yet"
          description="Add your first reflection from this blessed journey."
          action={
            <button
              onClick={() => setShowModal(true)}
              className="h-11 px-5 rounded-xl bg-app-primary text-white font-semibold text-sm flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Add First Memory
            </button>
          }
        />
      )}

      {/* Add memory modal */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Add Journey Reflection"
        footer={
          <>
            <button
              onClick={() => setShowModal(false)}
              className="h-10 px-4 rounded-xl border border-app-border text-sm font-medium text-app-textSecondary hover:bg-app-cardElevated"
            >
              Cancel
            </button>
            <button
              onClick={saveEntry}
              disabled={!title.trim() || saving}
              className="h-10 px-5 rounded-xl bg-app-brightGreen hover:bg-emerald-600 text-white text-sm font-semibold disabled:opacity-50 disabled:pointer-events-none"
            >
              {saving ? "Saving…" : "Save Memory"}
            </button>
          </>
        }
      >
        <Input
          id="mem-title"
          label="Title of Memory"
          placeholder="e.g., First sight of the Holy Ka'bah"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          id="mem-note"
          label="Your Reflection / Notes"
          placeholder="Alhamdulillah, my heart felt so serene…"
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </Modal>
    </div>
  );
}

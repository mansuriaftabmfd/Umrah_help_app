/**
 * Dexie (IndexedDB) schema for Umrah Companion.
 * All user data lives here first; sync to server happens later.
 */

import Dexie, { type Table } from "dexie";

// ─── Counter event (append-only, supports undo) ──────────────────────────────
export interface CounterEvent {
  id?: number;          // auto-increment
  type: "tawaf" | "sai";
  action: "increment" | "decrement" | "reset"; // decrement = undo
  lap: number;          // the lap this event brought the count TO
  timestamp: number;    // Date.now()
}

// ─── Dua read status ─────────────────────────────────────────────────────────
export interface DuaReadStatus {
  duaId: string;        // primary key
  read: boolean;
  updatedAt: number;
}

// ─── Quran progress ──────────────────────────────────────────────────────────
export interface QuranProgress {
  id: 1;                // singleton
  lastPage: number;
  updatedAt: number;
}

// ─── Quran bookmark ──────────────────────────────────────────────────────────
export interface QuranBookmark {
  id?: number;
  page: number;
  label: string;
  createdAt: number;
}

// ─── Checklist item ──────────────────────────────────────────────────────────
export interface ChecklistItem {
  id: string;           // stable id
  category: string;
  title: string;
  checked: boolean;
  updatedAt: number;
}

// ─── Journal entry ───────────────────────────────────────────────────────────
export interface JournalEntry {
  id?: number;
  title: string;
  note: string;
  date: string;         // ISO date string
  photoDataUrl?: string; // base64 for local storage
  syncStatus: "pending" | "synced";
  createdAt: number;
}

// ─── User settings ───────────────────────────────────────────────────────────
export interface UserSettings {
  id: 1;
  language: "gu" | "hi" | "en";
  fontSize: "sm" | "md" | "lg" | "xl";
  theme: "dark" | "light";
  updatedAt: number;
}

// ─── Umrah step progress ─────────────────────────────────────────────────────
export interface UmrahProgress {
  id: 1;
  currentStep: number;   // 0-6 (Ihram → Halq)
  tawafLap: number;      // 0-7
  saiLap: number;        // 0-7
  updatedAt: number;
}

// ─── Family mock data (local until backend is added) ─────────────────────────
export interface FamilyMessage {
  id?: number;
  senderId: string;
  senderName: string;
  text: string;
  type: "text" | "quick_reply" | "system";
  isSelf: boolean;
  timestamp: number;
  syncStatus: "pending" | "synced";
}

// ─── Database class ───────────────────────────────────────────────────────────
export class UmrahDB extends Dexie {
  counterEvents!: Table<CounterEvent, number>;
  duaReadStatus!: Table<DuaReadStatus, string>;
  quranProgress!: Table<QuranProgress, number>;
  quranBookmarks!: Table<QuranBookmark, number>;
  checklistItems!: Table<ChecklistItem, string>;
  journalEntries!: Table<JournalEntry, number>;
  userSettings!: Table<UserSettings, number>;
  umrahProgress!: Table<UmrahProgress, number>;
  familyMessages!: Table<FamilyMessage, number>;

  constructor() {
    super("UmrahCompanionDB");
    this.version(1).stores({
      counterEvents:  "++id, type, timestamp",
      duaReadStatus:  "duaId",
      quranProgress:  "id",
      quranBookmarks: "++id, page",
      checklistItems: "id, category",
      journalEntries: "++id, date, syncStatus",
      userSettings:   "id",
      umrahProgress:  "id",
      familyMessages: "++id, timestamp, syncStatus",
    });
  }
}

// Singleton instance
let _db: UmrahDB | null = null;

export function getDB(): UmrahDB {
  if (typeof window === "undefined") {
    // SSR guard — never access Dexie on the server
    throw new Error("IndexedDB is only available in the browser");
  }
  if (!_db) _db = new UmrahDB();
  return _db;
}

// ─── Default data seeds ──────────────────────────────────────────────────────

export const DEFAULT_SETTINGS: UserSettings = {
  id: 1,
  language: "gu",
  fontSize: "lg",
  theme: "dark",
  updatedAt: Date.now(),
};

export const DEFAULT_UMRAH_PROGRESS: UmrahProgress = {
  id: 1,
  currentStep: 0,
  tawafLap: 0,
  saiLap: 0,
  updatedAt: Date.now(),
};

export const DEFAULT_CHECKLIST: Omit<ChecklistItem, "updatedAt">[] = [
  { id: "doc-passport",   category: "Documents", title: "Original Passport & Visa Printouts",         checked: false },
  { id: "doc-tickets",    category: "Documents", title: "Confirmed Flight Tickets & Itinerary",       checked: false },
  { id: "doc-hotel",      category: "Documents", title: "Hotel Booking Confirmation",                 checked: false },
  { id: "doc-nusuk",      category: "Documents", title: "Nusuk App Permit & ID Cards",                checked: false },
  { id: "doc-emergency",  category: "Documents", title: "Emergency Contact Cards in Lanyards",        checked: false },
  { id: "ihram-garments", category: "Ihram",     title: "2 Sets of White Ihram Garments",             checked: false },
  { id: "ihram-belt",     category: "Ihram",     title: "Ihram Belt / Money Pouch with Zipper",       checked: false },
  { id: "ihram-soap",     category: "Ihram",     title: "Fragrance-free Soap & Wet Wipes",            checked: false },
  { id: "ihram-pins",     category: "Ihram",     title: "Safety Pins & Clips",                        checked: false },
  { id: "med-rx",         category: "Medicines", title: "Prescription Daily Medications (15 days)",   checked: false },
  { id: "med-pain",       category: "Medicines", title: "Pain Relief (Paracetamol / Ibuprofen)",      checked: false },
  { id: "med-ors",        category: "Medicines", title: "ORS Rehydration Salts",                      checked: false },
  { id: "med-throat",     category: "Medicines", title: "Throat Lozenges & Cough Drops",              checked: false },
  { id: "med-blister",    category: "Medicines", title: "Blister Bandages & Foot Cream",              checked: false },
  { id: "med-muscle",     category: "Medicines", title: "Muscle Pain Spray / Cream",                  checked: false },
  { id: "bag-shoe",       category: "Bag",       title: "Small Lightweight Drawstring Bag for Shoes", checked: false },
  { id: "bag-quran",      category: "Bag",       title: "Pocket Quran & Dua Booklet",                 checked: false },
  { id: "bag-power",      category: "Bag",       title: "Universal Saudi Power Adapter & Power Bank", checked: false },
  { id: "bag-lip",        category: "Bag",       title: "Unscented Lip Balm & Vaseline",              checked: false },
  { id: "bag-mat",        category: "Bag",       title: "Small Folding Prayer Mat",                   checked: false },
];

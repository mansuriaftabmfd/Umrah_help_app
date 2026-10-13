# Umrah Companion — Next.js App

**"Your Journey. Our Support."**

A professional, offline-first Umrah companion app built with Next.js 14, TypeScript, Tailwind CSS, Dexie (IndexedDB), and Zustand.

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd e:\Umrah\umrah-companion
npm install
```

### 2. Copy PDF Assets

Copy your existing PDFs into `public/quran/`:

```
# Copy from the prototype folder:
copy "e:\Umrah\Umrah-Companion-quran-pdf-integrated\Umrah-Companion-quran-pdf-integrated\assets\quran-13-line-tajweed.pdf" "e:\Umrah\umrah-companion\public\quran\quran-13-line-tajweed.pdf"

copy "e:\Umrah\Umrah-Companion-quran-pdf-integrated\Umrah-Companion-quran-pdf-integrated\assets\umrah-duas-source.pdf" "e:\Umrah\umrah-companion\public\quran\umrah-duas-source.pdf"
```

### 3. Generate PNG Icons (Required for PWA)

The manifest references `icon-192.png` and `icon-512.png`. You can:
- Convert `public/icons/icon.svg` using an online tool like [svg2png.com](https://svgtopng.com/)
- Or install ImageMagick and run: `magick public/icons/icon.svg -resize 192x192 public/icons/icon-192.png`
- Save both 192×192 and 512×512 versions to `public/icons/`

### 4. Run Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Build & Deploy

```bash
npm run build
npm run start
# Or deploy to Vercel: vercel --prod
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (app)/           # All authenticated screens (AppShell layout)
│   │   ├── home/        # Dashboard with progress overview
│   │   ├── guide/       # Step-by-step Umrah guide + Tawaf/Sa'i counters
│   │   ├── duas/        # 47+ Duas reader with multi-language support
│   │   ├── quran/       # Quran PDF reader with bookmarks
│   │   │   └── read/    # Full-screen PDF canvas reader
│   │   ├── checklist/   # Pre-Umrah packing checklist
│   │   ├── journal/     # Journey journal / memories
│   │   ├── family/      # Family chat, safety, meeting point
│   │   ├── translate/   # Text translation (API stub)
│   │   └── settings/    # Language, font size, theme
│   ├── api/
│   │   ├── translate/         # POST stub — TODO: connect to translation API
│   │   └── translate-image/   # POST stub — TODO: Google Vision OCR
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── AppProviders.tsx  # Client hydration wrapper
│   ├── AppShell.tsx      # Sidebar + mobile nav layout
│   └── ui.tsx            # Design system components
├── data/
│   └── duas.ts           # 47 Duas with Arabic, transliteration, translation
├── hooks/
│   └── useDBHydration.ts # IndexedDB → Zustand hydration hook
├── lib/
│   └── db.ts             # Dexie schema (IndexedDB)
└── store/
    └── appStore.ts       # Zustand global state
```

---

## ⚙️ Features by Checkpoint

### ✅ Checkpoint 1 — Foundation
- [x] Next.js 14 App Router + TypeScript
- [x] Tailwind CSS design tokens matching prototype
- [x] Dark/light mode
- [x] Dexie IndexedDB schema
- [x] Zustand store
- [x] App shell (sidebar + mobile nav)

### ✅ Checkpoint 2 — Duas
- [x] All 47+ Duas in `data/duas.ts`
- [x] Arabic text preserved exactly
- [x] Gujarati / Hindi / English transliteration & translation
- [x] Multi-language switcher (Gujarati default)
- [x] Font size controls
- [x] "Padh liya" read-status saved to IndexedDB
- [x] Group navigation (Tawaf, Sa'i, Journey, Makkah, Madinah…)

### ✅ Checkpoint 3 — Counters
- [x] Tawaf (7 rounds) + Sa'i (7 laps) counters
- [x] Counter events stored to IndexedDB (append-only, supports undo)
- [x] Progress rings on home dashboard
- [x] Step advancement saved to DB

### ✅ Checkpoint 4 — Quran Reader
- [x] PDF.js canvas reader (loaded from CDN)
- [x] Page navigation + direct page input
- [x] Last page saved to IndexedDB
- [x] Bookmarks saved to IndexedDB

### ✅ Checkpoint 5 — Checklist
- [x] 20 pre-seeded items across 4 categories
- [x] Live toggle with IndexedDB persistence
- [x] Category grouping + progress bar

### ✅ Checkpoint 6 — Translate UI (stub)
- [x] Language pair selector
- [x] `/api/translate` stub with TODO comments
- [x] `/api/translate-image` stub with TODO comments

### ✅ Checkpoint 7 — Family & Chat UI (mock data)
- [x] Chat tab (messages saved locally to IndexedDB)
- [x] Quick replies
- [x] Emergency alert
- [x] Meeting point + hotel info (read-only, editing needs backend)

---

## 🔌 API Stubs

| Endpoint | Status | Description |
|----------|--------|-------------|
| `POST /api/translate` | **Stub** | Connect to Google Cloud Translation / DeepL / OpenAI |
| `POST /api/translate-image` | **Stub** | Connect to Google Vision OCR then translate |

---

## 🌐 Deployment (Vercel)

1. Push to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Set build command: `npm run build`
4. Set output dir: `.next`
5. Deploy — Vercel auto-detects Next.js

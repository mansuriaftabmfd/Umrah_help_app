# 🕋 Umrah Companion — Your Journey. Our Support.

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel Ready](https://img.shields.io/badge/Vercel-Deployed-000?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![Offline First](https://img.shields.io/badge/Offline--First-Dexie_IndexedDB-success?style=for-the-badge)](https://dexie.org/)

An **offline-first, family-focused Umrah & Hajj companion web application** built with Next.js 14, TypeScript, Tailwind CSS, and Dexie (IndexedDB). Designed to provide effortless spiritual guidance, authentic supplications, live pilgrimage counters, and family safety tracking throughout the sacred journey in Makkah and Madinah.

---

## ✨ Key Features

### 🤲 1. All 49 Official Trilingual Du’as
- **Authentic Indo-Pak Quran Font**: Rendered in the classic 13/16-line Taj Company Mushaf script (`PDMS Saleem Quran` & `IndoPak Nastaleeq`) with clear, sharp Tashkeel (harakat, jazm, shaddah) and zero overlap.
- **English Transliteration**: Clear Latin pronunciation for every supplication.
- **Gujarati Pronunciation (ગુજરાતી ઉચ્ચારણ)**: Dedicated section converting Arabic transliteration into accurate Gujarati script for native Gujarati speakers.
- **Trilingual Meanings**: Gujarati (ગુજરાતી અર્થ), Hindi (हिन्दी अर्थ), and English translations for every Dua with single-tap side-by-side comparison.
- **Two Viewing Modes**: 
  - **All 49 Duas List View**: Instant overview grouped by pilgrimage topics (Journey, Umrah, Makkah, Tawaf, Sa’ee, Any Time, Madinah).
  - **Focus Card Reader View**: Distraction-free full-screen reader with font scaling controls, audio synthesis recitation, and "Padh Liya" progress tracking.

### 📖 2. 13-Line Tajweed Quran Reader
- Integrated PDF reader for the authentic 13-Line Tajweed Mushaf.
- Fast page streaming with HTTP range requests.
- Instant bookmarking, last-read page memory, and surah jump navigation saved locally in IndexedDB.

### 🕋 3. Tawaf & Sa’ee Interactive Counters
- **Tawaf Counter**: Track all 7 circuits around the Ka’bah with circuit-specific Duas, haptic feedback, and anti-accidental tap protection.
- **Sa’ee Counter**: Step-by-step 7-lap counter between Safa and Marwah with green light markers and authentic Sunnah supplications.
- Stored as append-only events in IndexedDB with undo support.

### 👨‍👩‍👧‍👦 4. Family & Safety Hub
- **Group Code System**: Create a unique family group (e.g., `MANS-786`) or join your family's group securely.
- **Pilgrimage Roles**: Family Head, Father, Mother, Son, Daughter, Pilgrim.
- **Real-time Live Chat**: Fast messaging with one-tap quick emergency alerts (e.g., *"Lost near Gate 79"*, *"Waiting at Hotel Lobby"*).
- **Meeting Point & Hotel Tracker**: Shared Ka'bah gate numbers, hotel rooms, and emergency contact details cached locally.

### 🌐 5. Trilingual Translator & Camera OCR
- **Voice & Text Translation**: Instant translation between Arabic, Gujarati, Hindi, and English.
- **Camera / Signboard OCR**: Upload or capture Arabic signs in the Haramain for instant translation into Gujarati, Hindi, or English.
- **Quick Pilgrimage Phrases**: Pre-translated emergency and shopping phrases for Makkah and Madinah.

### 📋 6. Checklist & Journey Journal
- **Pre-Umrah Packing Checklist**: Pre-seeded essentials (Ihram, documents, medication, footwear) with live progress tracking.
- **Journey Memories Journal**: Record spiritual reflections and milestones during your pilgrimage.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with curated Dark & Light themes
- **Client Database**: [Dexie.js](https://dexie.org/) (IndexedDB for 100% offline persistence)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: 
  - Arabic: `PDMS Saleem Quran` & `IndoPak Quran` (Local offline WOFF2/TTF)
  - Gujarati: `Noto Sans Gujarati`
  - Hindi: `Noto Sans Devanagari`
  - English/UI: `Inter`

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/mansuriaftabmfd/Umrah_help_app.git
cd Umrah_help_app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚡ Deployment to Vercel

This project is pre-configured and optimized for 1-click deployment on **Vercel**:

1. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Deploy update"
   git push origin main
   ```
2. Go to [Vercel Dashboard](https://vercel.com/new) and click **"Import"** on `Umrah_help_app`.
3. Framework Preset: **Next.js** (auto-detected).
4. Click **"Deploy"**.

---

## 📄 License

This project is open-source and intended for non-profit spiritual guidance and community benefit.
May Allah accept the pilgrimage of all pilgrims. 🤲

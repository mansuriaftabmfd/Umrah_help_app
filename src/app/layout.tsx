import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProviders } from "@/components/AppProviders";

export const metadata: Metadata = {
  title: "Umrah Companion — Your Journey. Our Support.",
  description:
    "A family-focused offline-first Umrah companion app with Duas, Quran reader, Tawaf & Sa'i counters, checklist, journal, and family safety features.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon.svg",
    apple: "/icons/icon.svg",
  },
  keywords: ["Umrah", "Hajj", "Duas", "Quran", "Islamic", "Muslim", "Makkah"],
  authors: [{ name: "Umrah Companion" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0E0E0F",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Google Fonts via <link> — preconnect first */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Scheherazade+New:wght@400;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Amiri:ital,wght@0,400;0,700;1,400&family=Noto+Sans+Gujarati:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="min-h-screen bg-app-bg text-app-textPrimary antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { ScrollOrchestrator } from "@/providers/ScrollOrchestrator";

export const metadata: Metadata = {
  title: "ABBA — AI Reception for Clinics",
  description:
    "Never miss a patient inquiry again. ABBA captures, qualifies, and books on WhatsApp, Facebook, and Instagram — 24/7.",
  openGraph: {
    title: "ABBA — AI Reception for Clinics",
    description: "The AI that answers while you sleep.",
    url: "https://getabba.info",
    siteName: "ABBA",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://getabba.info/assets/abba-og-image.png",
        width: 1200,
        height: 630,
        alt: "ABBA — AI Reception for Clinics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ABBA — AI Reception for Clinics",
    description: "The AI that answers while you sleep.",
    images: ["https://getabba.info/assets/abba-og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=IBM+Plex+Mono:wght@300;400;600;700&display=swap"
        />
        <link rel="icon" href="/assets/abba-favicon.png" type="image/png" />
      </head>
      <body className="min-h-full antialiased">
        <ScrollOrchestrator>
          {children}
        </ScrollOrchestrator>
      </body>
    </html>
  );
}

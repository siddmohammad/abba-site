import type { Metadata } from "next";
import "./globals.css";
import { ScrollOrchestrator } from "@/providers/ScrollOrchestrator";

export const metadata: Metadata = {
  icons: {
    icon: "/assets/abba-favicon.png",
    shortcut: "/assets/abba-favicon.png",
    apple: "/assets/abba-favicon.png",
  },
  title: "ABBA — AI Decision-Support Systems for Enterprise Bangladesh",
  description:
    "Custom AI systems for FMCG, manufacturing, and enterprise businesses — demand forecasting, operational dashboards, supply chain intelligence. Built on your data.",
  openGraph: {
    title: "ABBA — Always Building Better Automations",
    description: "AI decision-support systems for FMCG, manufacturing, and enterprise businesses in Bangladesh.",
    url: "https://getabba.info",
    siteName: "ABBA",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://getabba.info/assets/abba-og-image.png",
        width: 1200,
        height: 630,
        alt: "ABBA — Always Building Better Automations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ABBA — Always Building Better Automations",
    description: "AI decision-support systems for FMCG, manufacturing, and enterprise businesses in Bangladesh.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "ABBA — Always Building Better Automations",
              "alternateName": "ABBA",
              "url": "https://getabba.info",
              "logo": "https://getabba.info/assets/abba-favicon.png",
              "image": "https://getabba.info/assets/abba-og-image.png",
              "description": "ABBA builds custom AI systems — voice agents, agentic workflows, and backend integrations — for businesses integrating AI into their operations. No off-the-shelf software. Built around how you actually work.",
              "slogan": "Always Building Better Automations",
              "knowsAbout": [
                "AI Automation",
                "Business Process Automation",
                "Voice Agents",
                "Agentic Workflows",
                "AI Integration",
                "Custom AI Systems",
                "n8n Workflows",
                "Supabase",
                "Omnichannel Intake",
                "Operational AI"
              ],
              "serviceType": [
                "AI Voice Agents",
                "Agentic Workflow Automation",
                "Omnichannel Intake Engines",
                "Custom AI System Development",
                "Business AI Integration"
              ],
              "areaServed": "Worldwide",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "AI Automation Services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Voice Agents", "description": "AI-powered voice systems that handle inbound calls, qualify leads, and book appointments 24/7." } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Agentic Workflows", "description": "Multi-step AI agents that execute complex backend operations autonomously." } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Omnichannel Intake Engines", "description": "AI systems that capture, qualify, and respond to inquiries across web, WhatsApp, email, and social." } }
                ]
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Sales",
                "email": "dahamoody@gmail.com"
              }
            }),
          }}
        />
      </head>
      <body className="min-h-full antialiased">
        <ScrollOrchestrator>
          {children}
        </ScrollOrchestrator>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { ScrollOrchestrator } from "@/providers/ScrollOrchestrator";

export const metadata: Metadata = {
  icons: {
    icon: "/assets/abba-favicon.png",
    shortcut: "/assets/abba-favicon.png",
    apple: "/assets/abba-favicon.png",
  },
  title: "ABBA: Websites & AI Integration for Small Business in Bangladesh",
  description:
    "We build websites and AI tools for small and local businesses in Bangladesh. Pet shops, car dealers, retail, and more. Built for you, live in weeks.",
  openGraph: {
    title: "ABBA: Always Building Better Automations",
    description: "Websites and AI integration for small and local businesses in Bangladesh.",
    url: "https://getabba.info",
    siteName: "ABBA",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://getabba.info/assets/abba-og-image.png",
        width: 1200,
        height: 630,
        alt: "ABBA: Always Building Better Automations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ABBA: Always Building Better Automations",
    description: "Websites and AI integration for small and local businesses in Bangladesh.",
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
              "name": "ABBA: Always Building Better Automations",
              "alternateName": "ABBA",
              "url": "https://getabba.info",
              "logo": "https://getabba.info/assets/abba-favicon.png",
              "image": "https://getabba.info/assets/abba-og-image.png",
              "description": "ABBA builds websites and AI powered tools for small and local businesses. No off the shelf templates. Every site is built around how the business actually works.",
              "slogan": "Always Building Better Automations",
              "knowsAbout": [
                "Website Design",
                "Website Development",
                "AI Integration",
                "Business Automation",
                "Chatbots",
                "WhatsApp Automation",
                "Small Business Technology",
                "Local SEO"
              ],
              "serviceType": [
                "Website Design and Development",
                "AI Integration for Small Business",
                "Business Automation",
                "Ongoing Website and AI Support"
              ],
              "areaServed": "Bangladesh",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Website and AI Services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website Design & Build", "description": "A custom website built around your business, live in weeks, not months." } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Integration", "description": "Chatbots, automated booking, and smart tools layered onto your site to save you time." } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ongoing Support", "description": "Updates, fixes, and improvements as your business grows." } }
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

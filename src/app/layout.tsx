import type { Metadata, Viewport } from "next";
import { Syne, Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import BackToTop from "@/components/ui/BackToTop";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f0b90b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kenuleafrica.xyz"),
  title: {
    default: "Kenule Africa | Technology, Ventures & Digital Skills for Africa's Future",
    template: "%s | Kenule Africa",
  },
  description:
    "Kenule Africa (RC: 8380017) builds transformative technology, digital skills programs (LegitLab), fintech infrastructure (DeyPay), and the Jos Tech Expo. Built in Nigeria, designed for Africa.",
  keywords: [
    "Kenule Africa",
    "LegitLab",
    "DeyPay",
    "Jos Tech Expo",
    "African technology company",
    "Nigerian fintech",
    "Jos tech ecosystem",
    "Plateau State technology",
    "digital skills training Nigeria",
    "free tech bootcamp Jos",
    "RC 8380017",
    "African digital economy",
  ],
  authors: [{ name: "Kenule Africa", url: "https://kenuleafrica.xyz" }],
  creator: "Kenule Africa",
  publisher: "Kenule Africa",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kenule Africa - Technology for Africa's Future",
    description:
      "Building products, platforms, and digital talent that move Africa forward. Home to DeyPay, LegitLab, and Jos Tech Expo.",
    url: "https://kenuleafrica.xyz",
    siteName: "Kenule Africa",
    images: [
      {
        url: "/assets/logo.png",
        width: 800,
        height: 800,
        alt: "Kenule Africa - Built in Nigeria, designed for Africa",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenule Africa | Technology for Africa's Future",
    description:
      "Building products, platforms, and talent that move Africa forward. Ventures: DeyPay, LegitLab, Jos Tech Expo.",
    site: "@kenuleafrica",
    creator: "@kenuleafrica",
    images: ["/assets/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/assets/logo.png",
    shortcut: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kenule Africa",
    alternateName: "Kenule Africa Ltd",
    url: "https://kenuleafrica.xyz",
    logo: "https://kenuleafrica.xyz/assets/logo.png",
    description:
      "Kenule Africa builds technology, digital skills programs (LegitLab), fintech (DeyPay), and the Jos Tech Expo.",
    identifier: "RC: 8380017",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jos",
      addressRegion: "Plateau State",
      addressCountry: "Nigeria",
    },
    sameAs: [
      "https://x.com/kenuleafrica",
      "https://twitter.com/kenuleafrica",
      "https://linkedin.com/company/kenuleafrica",
    ],
    knowsAbout: [
      "Financial Technology",
      "Software Development",
      "Digital Skills Education",
      "Tech Conferences",
      "UI/UX Design",
    ],
  };

  return (
    <html
      lang="en"
      className={`${syne.variable} ${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="bg-[#010105] text-[#f5f5fc] font-sans antialiased selection:bg-[#f0b90b]/30 selection:text-[#f0b90b] overflow-x-hidden min-h-screen relative"
        suppressHydrationWarning
      >
        {children}
        <BackToTop />
      </body>
    </html>
  );
}

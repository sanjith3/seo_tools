import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import { Analytics } from "@/components/seo/Analytics";
import { ToastProvider } from "@/components/common/Toast";
import { AdSenseScript } from "@/components/ads/AdSenseScript";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Free SEO & Marketing Tools for Practical Work | Zenvuk",
    template: "%s | Zenvuk"
  },
  description: siteConfig.description,
  keywords: [
    "free SEO tools",
    "FAQ schema generator",
    "meta description generator",
    "product title generator",
    "product name generator",
    "UTM builder",
    "campaign tracking URL generator",
    "JSON-LD FAQ generator"
  ],
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: "Free SEO & Marketing Tools for Practical Work | Zenvuk",
    description: siteConfig.description,
    siteName: siteConfig.name
  },
  twitter: {
    card: "summary_large_image",
    title: "Free SEO & Marketing Tools for Practical Work | Zenvuk",
    description: siteConfig.description
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <AdSenseScript />
      </head>
      <body className="min-h-screen bg-[#07111F] text-[#F5F8FC] antialiased selection:bg-[#5B7CFF]/20 selection:text-[#5B7CFF]">
        <ToastProvider>
          {children}
        </ToastProvider>
        <Analytics />
      </body>
    </html>
  );
}

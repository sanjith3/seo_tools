"use client";

import Script from "next/script";
import { isAdSenseActive, adsenseConfig } from "@/config/adsense";

/**
 * AdSenseScript Component
 * 
 * Asynchronously loads Google AdSense script only when:
 * 1. NEXT_PUBLIC_ADSENSE_ENABLED === "true"
 * 2. NEXT_PUBLIC_ADSENSE_CLIENT is a valid publisher identifier
 * 3. Client is not running on localhost or development environments
 * 
 * When inactive, returns null with zero markup, zero script tags,
 * and zero network requests.
 * 
 * Auto Ads Ready: Once approved, turning on Auto Ads in the AdSense
 * dashboard automatically works across all pages without layout edits.
 */
export function AdSenseScript() {
  if (!isAdSenseActive()) {
    return null;
  }

  return (
    <>
      {/* Google AdSense Account Verification Tag */}
      <meta name="google-adsense-account" content={adsenseConfig.client} />

      {/* Google AdSense Primary Script */}
      <Script
        id="google-adsense-script"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseConfig.client}`}
        strategy="afterInteractive"
        crossOrigin="anonymous"
        async
      />
    </>
  );
}

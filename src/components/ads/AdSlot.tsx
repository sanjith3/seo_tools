"use client";

import { useEffect, useRef } from "react";
import { isAdSenseActive, adsenseConfig, AdPlacement, getSlotIdForPlacement } from "@/config/adsense";

export interface AdSlotProps {
  slot?: string;
  placement?: AdPlacement;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  responsive?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Reusable Google AdSense AdSlot Component
 * 
 * Strict safety rules:
 * - Renders NOTHING (null, 0 DOM nodes, 0 height) if AdSense is disabled.
 * - Renders NOTHING if publisher client ID is missing/invalid.
 * - Renders NOTHING if slot ID is missing for the specified placement.
 * - Initializes adsbygoogle only when required configuration exists.
 * - Prevents duplicate initialization on re-renders.
 * - Fails gracefully with try/catch.
 * - Never causes horizontal overflow or broken layouts.
 */
export function AdSlot({
  slot,
  placement,
  format = "auto",
  responsive = true,
  className = "",
}: AdSlotProps) {
  const isLoaded = useRef(false);

  const active = isAdSenseActive();
  const activeSlot = slot || getSlotIdForPlacement(placement);

  useEffect(() => {
    if (!active || !activeSlot || isLoaded.current) {
      return;
    }

    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isLoaded.current = true;
      }
    } catch (err) {
      console.warn("[AdSense] Failed to initialize ad slot:", err);
    }
  }, [active, activeSlot]);

  // When disabled or missing configuration, render absolutely NOTHING
  if (!active || !activeSlot) {
    return null;
  }

  return (
    <div
      className={`my-8 w-full max-w-full overflow-hidden text-center clear-both ${className}`}
      data-ad-placement={placement}
      aria-label="Advertisement"
    >
      <div className="mb-1 text-[11px] font-medium tracking-wider uppercase text-[#8796AA] select-none">
        Advertisement
      </div>
      <div className="flex justify-center w-full max-w-full overflow-hidden">
        <ins
          className="adsbygoogle block w-full max-w-full"
          style={{ display: "block" }}
          data-ad-client={adsenseConfig.client}
          data-ad-slot={activeSlot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? "true" : "false"}
        />
      </div>
    </div>
  );
}

/**
 * Centralized Google AdSense Configuration
 * 
 * Strict safety rules:
 * 1. Advertising is disabled by default (NEXT_PUBLIC_ADSENSE_ENABLED !== "true").
 * 2. If client ID is missing or does not match a valid publisher format, AdSense remains inactive.
 * 3. Never loads on localhost or development environments unless explicitly forced.
 * 4. Never renders placeholders, fake ads, or blank layout-shifting boxes when disabled.
 */

export type AdPlacement =
  | "tool-after-workspace"
  | "tool-content-middle"
  | "tool-content-end"
  | "blog-after-intro"
  | "blog-middle"
  | "blog-end";

export interface AdSenseConfig {
  enabled: boolean;
  client: string;
  isProduction: boolean;
  slots: Record<AdPlacement, string>;
}

const rawEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";
const rawClient = (process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "").trim();

// Clean client to ensure ca-pub- prefix if user enters only pub-
export function formatPublisherClient(client: string): string {
  if (!client) return "";
  const trimmed = client.trim();
  if (trimmed.startsWith("ca-pub-")) return trimmed;
  if (trimmed.startsWith("pub-")) return `ca-${trimmed}`;
  return trimmed;
}

export const adsenseConfig: AdSenseConfig = {
  enabled: rawEnabled,
  client: formatPublisherClient(rawClient),
  isProduction: process.env.NODE_ENV === "production",
  slots: {
    "tool-after-workspace": (process.env.NEXT_PUBLIC_AD_SLOT_TOOL_AFTER || "").trim(),
    "tool-content-middle": (process.env.NEXT_PUBLIC_AD_SLOT_TOOL_MIDDLE || "").trim(),
    "tool-content-end": (process.env.NEXT_PUBLIC_AD_SLOT_TOOL_END || "").trim(),
    "blog-after-intro": (process.env.NEXT_PUBLIC_AD_SLOT_BLOG_AFTER_INTRO || "").trim(),
    "blog-middle": (process.env.NEXT_PUBLIC_AD_SLOT_BLOG_MIDDLE || "").trim(),
    "blog-end": (process.env.NEXT_PUBLIC_AD_SLOT_BLOG_END || "").trim(),
  },
};

/**
 * Validates if the client string is a genuine Google publisher identifier.
 * Format: ca-pub-XXXXXXXXXXXXXXXX (typically 16 numeric digits).
 */
export function isValidPublisherClient(client: string): boolean {
  if (!client) return false;
  // Reject dummy placeholders or short test strings
  if (client.includes("1234") || client.includes("0000") || client === "ca-pub-") {
    return false;
  }
  // Must match ca-pub- followed by 10 to 20 digits
  return /^ca-pub-\d{10,20}$/.test(client);
}

/**
 * Checks whether AdSense script and units should actively run.
 * 
 * Safety conditions:
 * - NEXT_PUBLIC_ADSENSE_ENABLED must be exactly "true"
 * - NEXT_PUBLIC_ADSENSE_CLIENT must be valid
 * - On client side: checks that window.location is NOT localhost or cms.zenvuk.com
 */
export function isAdSenseActive(): boolean {
  if (!adsenseConfig.enabled) {
    return false;
  }

  if (!isValidPublisherClient(adsenseConfig.client)) {
    return false;
  }

  // Client-side domain safety guard
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    // Disallow AdSense on development environments
    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.endsWith(".local") ||
      hostname === "cms.zenvuk.com"
    ) {
      return false;
    }
  }

  return true;
}

/**
 * Retrieve slot ID for a specific placement.
 */
export function getSlotIdForPlacement(placement?: AdPlacement): string | undefined {
  if (!placement) return undefined;
  const slotId = adsenseConfig.slots[placement];
  return slotId && slotId.length > 0 ? slotId : undefined;
}

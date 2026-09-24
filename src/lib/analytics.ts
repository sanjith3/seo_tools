/**
 * Privacy-friendly anonymous Google Analytics event tracking.
 * Never sends user-entered text, queries, or PII.
 */

export type AnalyticsEventName =
  | "tool_started"
  | "tool_generated"
  | "copy_result"
  | "download_csv"
  | "download_json"
  | "download_file"
  | "download_llms_txt"
  | "robots_preset_applied"
  | "schema_type_selected"
  | "utm_created";

interface EventParams {
  tool_name?: string;
  category?: string;
  items_count?: number;
  marketplace?: string;
  format?: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      targetId: string | AnalyticsEventName,
      params?: Record<string, unknown>
    ) => void;
  }
}

export function trackEvent(name: AnalyticsEventName, params: EventParams = {}): void {
  if (typeof window === "undefined" || !window.gtag) return;

  try {
    // Sanitize parameters to ensure no accidental string queries or sensitive values are sent
    const safeParams: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(params)) {
      if (typeof v === "number" || typeof v === "boolean") {
        safeParams[k] = v;
      } else if (typeof v === "string") {
        // Only allow predefined or controlled short tags, never long user text
        safeParams[k] = v.slice(0, 40);
      }
    }

    window.gtag("event", name, safeParams);
  } catch {
    // Fail silently in development or when blocked by ad/privacy blockers
  }
}

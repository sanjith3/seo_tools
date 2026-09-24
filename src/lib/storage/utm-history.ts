import { downloadCsv } from "@/lib/export/csv";

export interface UtmHistoryItem {
  id: string;
  date: string;
  url: string;
  source: string;
  medium: string;
  campaign: string;
  term?: string;
  content?: string;
  finalUrl: string;
}

const STORAGE_KEY = "zenvuk_utm_history_v1";

export function loadUtmHistory(): UtmHistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveUtmHistoryItem(
  item: Omit<UtmHistoryItem, "id" | "date">
): UtmHistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const history = loadUtmHistory();
    // Don't add duplicate if exact same finalUrl was the most recent entry
    if (history.length > 0 && history[0].finalUrl === item.finalUrl) {
      return history;
    }

    const newItem: UtmHistoryItem = {
      ...item,
      id: `utm-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      date: new Date().toISOString()
    };

    // Keep up to 100 recent entries
    const updated = [newItem, ...history].slice(0, 100);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function deleteUtmHistoryItem(id: string): UtmHistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const history = loadUtmHistory();
    const updated = history.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function clearUtmHistory(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage quota errors
  }
}

export function exportUtmHistoryCsv(history: UtmHistoryItem[]): void {
  const headers = [
    "Date",
    "Destination URL",
    "Source (utm_source)",
    "Medium (utm_medium)",
    "Campaign (utm_campaign)",
    "Term (utm_term)",
    "Content (utm_content)",
    "Complete Tagged URL"
  ];

  const rows = history.map((h) => [
    h.date,
    h.url,
    h.source,
    h.medium,
    h.campaign,
    h.term || "",
    h.content || "",
    h.finalUrl
  ]);

  downloadCsv("zenvuk-campaign-history", headers, rows);
}

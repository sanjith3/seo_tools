export interface HreflangItem {
  id: string;
  language: string; // ISO 639-1 e.g. "en" or "x-default"
  region?: string;   // ISO 3166-1 Alpha 2 e.g. "US", "GB"
  url: string;
}

export interface HreflangValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export const HREFLANG_PRESETS: Array<{ label: string; language: string; region?: string }> = [
  { label: "Default Fallback (x-default)", language: "x-default" },
  { label: "English (Universal - en)", language: "en" },
  { label: "English (United States - en-US)", language: "en", region: "US" },
  { label: "English (United Kingdom - en-GB)", language: "en", region: "GB" },
  { label: "English (Canada - en-CA)", language: "en", region: "CA" },
  { label: "English (Australia - en-AU)", language: "en", region: "AU" },
  { label: "Spanish (Universal - es)", language: "es" },
  { label: "Spanish (Spain - es-ES)", language: "es", region: "ES" },
  { label: "Spanish (Mexico - es-MX)", language: "es", region: "MX" },
  { label: "French (Universal - fr)", language: "fr" },
  { label: "French (France - fr-FR)", language: "fr", region: "FR" },
  { label: "French (Canada - fr-CA)", language: "fr", region: "CA" },
  { label: "German (Germany - de-DE)", language: "de", region: "DE" },
  { label: "German (Universal - de)", language: "de" },
  { label: "Italian (Italy - it-IT)", language: "it", region: "IT" },
  { label: "Portuguese (Brazil - pt-BR)", language: "pt", region: "BR" },
  { label: "Portuguese (Portugal - pt-PT)", language: "pt", region: "PT" },
  { label: "Japanese (Japan - ja-JP)", language: "ja", region: "JP" },
  { label: "Chinese (Simplified - zh-Hans)", language: "zh-Hans" },
  { label: "Chinese (Traditional - zh-Hant)", language: "zh-Hant" }
];

export function getFullHreflangCode(item: HreflangItem): string {
  const lang = item.language.trim();
  if (lang.toLowerCase() === "x-default") return "x-default";
  const reg = item.region?.trim();
  if (reg) {
    return `${lang.toLowerCase()}-${reg.toUpperCase()}`;
  }
  return lang.toLowerCase();
}

export function generateHreflangHtml(items: HreflangItem[]): string {
  const lines: string[] = [];

  for (const item of items) {
    const code = getFullHreflangCode(item);
    const url = item.url.trim();
    if (code && url) {
      lines.push(`<link rel="alternate" hreflang="${code}" href="${url}" />`);
    }
  }

  return lines.join("\n");
}

export function generateHreflangXml(items: HreflangItem[], pageUrl?: string): string {
  const targetUrl = pageUrl?.trim() || items[0]?.url.trim() || "https://example.com/page";
  const lines: string[] = [];

  lines.push(`<url>`);
  lines.push(`  <loc>${targetUrl}</loc>`);

  for (const item of items) {
    const code = getFullHreflangCode(item);
    const url = item.url.trim();
    if (code && url) {
      lines.push(`  <xhtml:link rel="alternate" hreflang="${code}" href="${url}" />`);
    }
  }

  lines.push(`</url>`);
  return lines.join("\n");
}

export function validateHreflang(items: HreflangItem[]): HreflangValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const seenCodes = new Set<string>();
  let hasXDefault = false;

  if (items.length === 0) {
    errors.push("Add at least one hreflang entry.");
    return { isValid: false, errors, warnings };
  }

  for (let idx = 0; idx < items.length; idx++) {
    const item = items[idx];
    const rowNum = idx + 1;
    const lang = item.language.trim();
    const url = item.url.trim();

    if (!lang) {
      errors.push(`Row #${rowNum}: Language code is required.`);
    } else if (lang.toLowerCase() === "x-default") {
      hasXDefault = true;
    } else if (!/^[a-zA-Z]{2,3}(-[a-zA-Z]{4})?$/i.test(lang)) {
      errors.push(`Row #${rowNum}: '${lang}' is not a valid ISO 639-1 language code (e.g. 'en', 'es', 'de').`);
    }

    if (item.region && item.region.trim()) {
      const reg = item.region.trim();
      if (!/^[a-zA-Z]{2}$/i.test(reg)) {
        errors.push(`Row #${rowNum}: '${reg}' is not a valid 2-letter ISO 3166-1 region code (e.g. 'US', 'GB').`);
      }
    }

    if (!url) {
      errors.push(`Row #${rowNum}: Destination URL is required.`);
    } else if (!/^https?:\/\//i.test(url)) {
      errors.push(`Row #${rowNum}: URL must start with http:// or https://`);
    }

    const fullCode = getFullHreflangCode(item);
    if (fullCode) {
      if (seenCodes.has(fullCode.toLowerCase())) {
        errors.push(`Duplicate hreflang code detected: '${fullCode}'. Each language/region target must be unique.`);
      } else {
        seenCodes.add(fullCode.toLowerCase());
      }
    }
  }

  if (!hasXDefault) {
    warnings.push("Recommendation: Include an 'x-default' alternate link for unmatched international visitors.");
  }

  if (items.length === 1) {
    warnings.push("Hreflang is used to specify alternate versions. A single tag by itself serves no international routing purpose.");
  }

  warnings.push("Reciprocal link reminder: Every alternate URL must also link back to all other regional URLs with matching hreflang tags.");

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

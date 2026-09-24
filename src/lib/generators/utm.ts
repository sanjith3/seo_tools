export interface UTMValues {
  url: string;
  source: string;
  medium: string;
  campaign: string;
  term?: string;
  content?: string;
}

export interface UTMBuildResult {
  isValid: boolean;
  finalUrl: string;
  error?: string;
  parametersCount: number;
}

export const UTM_SOURCE_PRESETS = [
  "google",
  "facebook",
  "instagram",
  "linkedin",
  "youtube",
  "twitter",
  "newsletter",
  "email",
  "bing"
] as const;

export const UTM_MEDIUM_PRESETS = [
  "cpc",
  "paid_social",
  "social",
  "email",
  "referral",
  "display",
  "affiliate",
  "organic"
] as const;

/**
 * Normalizes input string for clean URL parameter usage.
 * Preserves unicode while collapsing extra spaces to dashes or hyphens if desired,
 * or leaving clean strings.
 */
function cleanParam(val: string | undefined): string {
  if (!val) return "";
  return val.trim();
}

/**
 * Builds a UTM tagged URL.
 * Handles existing queries, URL fragments (#hash), unicode, and spaces cleanly.
 * Guarantees no "??" or "&&" or malformed strings.
 */
export function buildUtmUrl(values: UTMValues): string {
  const rawUrl = values.url.trim();
  if (!rawUrl) return "";

  try {
    // Add https:// protocol if omitted by user
    const hasProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(rawUrl);
    const urlString = hasProtocol ? rawUrl : `https://${rawUrl}`;

    const parsed = new URL(urlString);

    // Save fragment (hash) to restore after adding search params
    const hash = parsed.hash;

    const source = cleanParam(values.source);
    const medium = cleanParam(values.medium);
    const campaign = cleanParam(values.campaign);
    const term = cleanParam(values.term);
    const content = cleanParam(values.content);

    if (source) parsed.searchParams.set("utm_source", source);
    if (medium) parsed.searchParams.set("utm_medium", medium);
    if (campaign) parsed.searchParams.set("utm_campaign", campaign);
    if (term) parsed.searchParams.set("utm_term", term);
    if (content) parsed.searchParams.set("utm_content", content);

    // Reattach hash if present
    parsed.hash = hash;

    return parsed.toString();
  } catch {
    return "";
  }
}

export function validateAndBuildUtm(values: UTMValues): UTMBuildResult {
  const rawUrl = values.url.trim();
  if (!rawUrl) {
    return {
      isValid: false,
      finalUrl: "",
      error: "Enter a valid website URL.",
      parametersCount: 0
    };
  }

  const finalUrl = buildUtmUrl(values);
  if (!finalUrl) {
    return {
      isValid: false,
      finalUrl: "",
      error: "Enter a valid website URL (e.g. https://example.com/page).",
      parametersCount: 0
    };
  }

  let count = 0;
  if (values.source.trim()) count++;
  if (values.medium.trim()) count++;
  if (values.campaign.trim()) count++;
  if (values.term?.trim()) count++;
  if (values.content?.trim()) count++;

  const hasRequired =
    Boolean(values.source.trim()) &&
    Boolean(values.medium.trim()) &&
    Boolean(values.campaign.trim());

  return {
    isValid: hasRequired,
    finalUrl,
    error: hasRequired
      ? undefined
      : "Complete required campaign fields: Source, Medium, and Campaign Name.",
    parametersCount: count
  };
}

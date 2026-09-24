export interface CanonicalConfig {
  sourceUrl: string;
  preferredCanonicalUrl: string;
  cleanParameters: boolean;
  enforceHttps: boolean;
  enforceTrailingSlash: "preserve" | "add" | "remove";
  enforceLowercase: boolean;
  stripFragments: boolean;
  ignoredParameters?: string[]; // e.g. utm_*, gclid, fbclid, session_id
}

export interface CanonicalAnalysis {
  generatedTag: string;
  httpHeader: string;
  isSelfReferencing: boolean;
  cleanedCanonicalUrl: string;
  issues: {
    type: "error" | "warning" | "info";
    message: string;
  }[];
}

const DEFAULT_TRACKING_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "msclkid",
  "ref",
  "sessionid",
  "phpsessid",
];

export function cleanCanonicalUrl(urlStr: string, config: Partial<CanonicalConfig> = {}): string {
  if (!urlStr || !urlStr.trim()) return "";
  let clean = urlStr.trim();

  // Strip hash fragments
  if (config.stripFragments !== false) {
    clean = clean.split("#")[0];
  }

  // Force HTTPS if requested or if protocol is missing
  if (!/^https?:\/\//i.test(clean)) {
    clean = "https://" + clean;
  } else if (config.enforceHttps && clean.startsWith("http://")) {
    clean = "https://" + clean.slice(7);
  }

  try {
    const parsed = new URL(clean);

    // Hostname lowercase
    parsed.hostname = parsed.hostname.toLowerCase();

    // Enforce lowercase pathname if specified
    if (config.enforceLowercase) {
      parsed.pathname = parsed.pathname.toLowerCase();
    }

    // Trailing slash handling on pathname
    if (config.enforceTrailingSlash === "add") {
      if (!parsed.pathname.endsWith("/") && !parsed.pathname.includes(".")) {
        parsed.pathname += "/";
      }
    } else if (config.enforceTrailingSlash === "remove") {
      if (parsed.pathname.length > 1 && parsed.pathname.endsWith("/")) {
        parsed.pathname = parsed.pathname.slice(0, -1);
      }
    }

    // Clean tracking query parameters
    if (config.cleanParameters) {
      const ignored = config.ignoredParameters || DEFAULT_TRACKING_PARAMS;
      const paramsToDelete: string[] = [];
      parsed.searchParams.forEach((_, key) => {
        const lowerKey = key.toLowerCase();
        if (
          ignored.includes(lowerKey) ||
          lowerKey.startsWith("utm_") ||
          lowerKey.startsWith("mc_")
        ) {
          paramsToDelete.push(key);
        }
      });
      paramsToDelete.forEach((key) => parsed.searchParams.delete(key));
    }

    return parsed.toString();
  } catch {
    return clean;
  }
}

export function analyzeCanonical(config: CanonicalConfig): CanonicalAnalysis {
  const issues: CanonicalAnalysis["issues"] = [];
  const cleaned = cleanCanonicalUrl(config.preferredCanonicalUrl, config);

  // Validate Source URL
  if (!config.sourceUrl || !config.sourceUrl.trim()) {
    issues.push({ type: "error", message: "Source URL is required to evaluate canonical relationship." });
  } else if (!/^https?:\/\//i.test(config.sourceUrl)) {
    issues.push({ type: "warning", message: "Source URL should include http:// or https:// protocol." });
  }

  // Validate Canonical URL
  if (!config.preferredCanonicalUrl || !config.preferredCanonicalUrl.trim()) {
    issues.push({ type: "error", message: "Target Canonical URL is required." });
  } else if (!/^https?:\/\//i.test(config.preferredCanonicalUrl)) {
    issues.push({ type: "error", message: "Canonical tag MUST specify an absolute URL including https:// protocol." });
  }

  // Relative path warning
  if (config.preferredCanonicalUrl.startsWith("/") && !config.preferredCanonicalUrl.startsWith("//")) {
    issues.push({
      type: "error",
      message: "Avoid relative canonical URLs. Search engines strongly recommend fully qualified absolute URLs.",
    });
  }

  // Insecure HTTP check
  if (cleaned.startsWith("http://")) {
    issues.push({
      type: "warning",
      message: "Canonical URL uses unencrypted HTTP. It should target the secure HTTPS equivalent.",
    });
  }

  // Self-referencing check
  const isSelf = config.sourceUrl.trim().toLowerCase() === cleaned.toLowerCase();
  if (isSelf) {
    issues.push({
      type: "info",
      message: "This is a self-referencing canonical tag (recommended best practice for unique indexable URLs).",
    });
  } else {
    issues.push({
      type: "info",
      message: "Cross-domain or cross-URL canonicalization: Signals to search engines that this page is an alternate or duplicate of the canonical target.",
    });
  }

  // Hash fragment check
  if (config.preferredCanonicalUrl.includes("#")) {
    issues.push({
      type: "warning",
      message: "Canonical URLs should never contain URL hash fragments (#). The fragment identifier has been stripped in the cleaned output.",
    });
  }

  // Generate HTML tag & HTTP Header
  const generatedTag = `<link rel="canonical" href="${cleaned}" />`;
  const httpHeader = `Link: <${cleaned}>; rel="canonical"`;

  return {
    generatedTag,
    httpHeader,
    isSelfReferencing: isSelf,
    cleanedCanonicalUrl: cleaned,
    issues,
  };
}

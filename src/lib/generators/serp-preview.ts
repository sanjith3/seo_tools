// SERP Pixel and Character measurement logic
// Standard Google Desktop title container: ~600px max (Arial 20px)
// Standard Google Mobile title container: ~580px max
// Standard Google Desktop description container: ~960px max (Arial 14px)
// Standard Google Mobile description container: ~680px max (Arial 14px)

// Proportional character width estimates for Arial font
const ARIAL_TITLE_WIDTHS: Record<string, number> = {
  // Uppercase
  W: 19, M: 18, Q: 15, O: 15, G: 14, C: 14, D: 14, H: 14, N: 14, U: 14,
  A: 13, B: 13, E: 13, F: 12, K: 13, P: 13, R: 13, S: 13, T: 12, V: 13,
  X: 13, Y: 13, Z: 12,
  // Lowercase
  w: 14, m: 15, a: 11, b: 11, c: 10, d: 11, e: 11, g: 11, h: 11, k: 10,
  n: 11, o: 11, p: 11, q: 11, u: 11, v: 10, x: 10, y: 10, z: 10,
  f: 6, r: 7, s: 10, t: 6, i: 5, j: 5, l: 5,
  // Numbers & Punctuation
  " ": 6, "-": 7, "|": 6, ":": 6, ".": 6, ",": 6, "!": 6, "?": 11,
  "/": 6, "&": 13, "(": 7, ")": 7, "[": 7, "]": 7,
};

const ARIAL_DESC_WIDTHS: Record<string, number> = {
  // Scaled down ~0.7x for 14px body font
  W: 13, M: 12, Q: 10, O: 10, G: 10, C: 10, D: 10, H: 10, N: 10, U: 10,
  A: 9, B: 9, E: 9, F: 8, K: 9, P: 9, R: 9, S: 9, T: 8, V: 9,
  X: 9, Y: 9, Z: 8,
  w: 10, m: 10, a: 8, b: 8, c: 7, d: 8, e: 8, g: 8, h: 8, k: 7,
  n: 8, o: 8, p: 8, q: 8, u: 8, v: 7, x: 7, y: 7, z: 7,
  f: 4, r: 5, s: 7, t: 4, i: 3, j: 3, l: 3,
  " ": 4, "-": 5, "|": 4, ":": 4, ".": 4, ",": 4, "!": 4, "?": 8,
  "/": 4, "&": 9, "(": 5, ")": 5, "[": 5, "]": 5,
};

export function estimatePixelWidth(text: string, type: "title" | "description"): number {
  if (!text) return 0;
  const table = type === "title" ? ARIAL_TITLE_WIDTHS : ARIAL_DESC_WIDTHS;
  const defaultWidth = type === "title" ? 11 : 8;

  let width = 0;
  for (const char of text) {
    width += table[char] ?? defaultWidth;
  }
  return width;
}

export interface SERPConfig {
  title: string;
  url: string;
  description: string;
  brandName?: string;
  faviconUrl?: string;
  date?: string;
  rating?: number;
  reviewCount?: number;
  price?: string;
  availability?: "InStock" | "OutOfStock";
  breadcrumbs?: string[];
}

export interface TruncationResult {
  text: string;
  pixelWidth: number;
  maxPixels: number;
  isTruncated: boolean;
  charCount: number;
  recommendedMaxChars: number;
}

export function analyzeSERP(config: SERPConfig, device: "desktop" | "mobile" = "desktop") {
  const maxTitlePx = device === "desktop" ? 600 : 580;
  const maxDescPx = device === "desktop" ? 960 : 680;

  const titlePx = estimatePixelWidth(config.title, "title");
  const descPx = estimatePixelWidth(config.description, "description");

  const titleTruncated = titlePx > maxTitlePx;
  const descTruncated = descPx > maxDescPx;

  // Compute truncated title display string
  let displayTitle = config.title;
  if (titleTruncated) {
    let acc = "";
    for (const char of config.title) {
      if (estimatePixelWidth(acc + char + " ...", "title") > maxTitlePx) {
        break;
      }
      acc += char;
    }
    displayTitle = acc.trim() + " ...";
  }

  // Compute truncated description display string
  let displayDesc = config.description;
  if (descTruncated) {
    let acc = "";
    for (const char of config.description) {
      if (estimatePixelWidth(acc + char + " ...", "description") > maxDescPx) {
        break;
      }
      acc += char;
    }
    displayDesc = acc.trim() + " ...";
  }

  // URL parsing & breadcrumb display
  let cleanDomain = "example.com";
  let displayUrl = config.url;
  try {
    const parsed = new URL(config.url.startsWith("http") ? config.url : `https://${config.url}`);
    cleanDomain = parsed.hostname.replace(/^www\./, "");
    const pathParts = parsed.pathname.split("/").filter(Boolean);
    if (config.breadcrumbs && config.breadcrumbs.length > 0) {
      displayUrl = `${cleanDomain} > ${config.breadcrumbs.join(" > ")}`;
    } else if (pathParts.length > 0) {
      displayUrl = `${cleanDomain} > ${pathParts.join(" > ")}`;
    } else {
      displayUrl = cleanDomain;
    }
  } catch {
    displayUrl = config.url || "example.com";
  }

  return {
    title: {
      original: config.title,
      display: displayTitle,
      pixelWidth: titlePx,
      maxPixels: maxTitlePx,
      isTruncated: titleTruncated,
      charCount: config.title.length,
      recommendedMaxChars: device === "desktop" ? 60 : 55,
      pixelPercentage: Math.min(100, Math.round((titlePx / maxTitlePx) * 100)),
    },
    description: {
      original: config.description,
      display: displayDesc,
      pixelWidth: descPx,
      maxPixels: maxDescPx,
      isTruncated: descTruncated,
      charCount: config.description.length,
      recommendedMaxChars: device === "desktop" ? 160 : 120,
      pixelPercentage: Math.min(100, Math.round((descPx / maxDescPx) * 100)),
    },
    domain: cleanDomain,
    displayUrl,
  };
}

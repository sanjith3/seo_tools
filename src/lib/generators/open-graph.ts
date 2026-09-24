export interface OpenGraphData {
  title: string;
  description: string;
  url: string;
  siteName: string;
  type: "website" | "article" | "product" | "book" | "profile";
  imageUrl: string;
  imageAlt?: string;
  imageWidth?: string;
  imageHeight?: string;
  locale?: string;
  // Twitter Card specifics
  twitterCard: "summary" | "summary_large_image" | "app" | "player";
  twitterSite?: string;
  twitterCreator?: string;
  // Article specifics
  author?: string;
  publishedTime?: string;
  section?: string;
}

export interface OGValidationResult {
  isValid: boolean;
  warnings: string[];
  errors: string[];
  imageAspectRatioNotice?: string;
}

export function generateOpenGraphHtml(data: OpenGraphData): string {
  const tags: string[] = [];

  // Essential Open Graph
  if (data.title) tags.push(`<meta property="og:title" content="${escapeHtml(data.title)}" />`);
  if (data.description) tags.push(`<meta property="og:description" content="${escapeHtml(data.description)}" />`);
  if (data.url) tags.push(`<meta property="og:url" content="${escapeHtml(data.url)}" />`);
  if (data.type) tags.push(`<meta property="og:type" content="${escapeHtml(data.type)}" />`);
  if (data.siteName) tags.push(`<meta property="og:site_name" content="${escapeHtml(data.siteName)}" />`);
  if (data.locale) tags.push(`<meta property="og:locale" content="${escapeHtml(data.locale)}" />`);

  // OG Image
  if (data.imageUrl) {
    tags.push(`<meta property="og:image" content="${escapeHtml(data.imageUrl)}" />`);
    if (data.imageAlt) tags.push(`<meta property="og:image:alt" content="${escapeHtml(data.imageAlt)}" />`);
    if (data.imageWidth) tags.push(`<meta property="og:image:width" content="${escapeHtml(data.imageWidth)}" />`);
    if (data.imageHeight) tags.push(`<meta property="og:image:height" content="${escapeHtml(data.imageHeight)}" />`);
  }

  // Article extensions
  if (data.type === "article") {
    if (data.publishedTime) tags.push(`<meta property="article:published_time" content="${escapeHtml(data.publishedTime)}" />`);
    if (data.author) tags.push(`<meta property="article:author" content="${escapeHtml(data.author)}" />`);
    if (data.section) tags.push(`<meta property="article:section" content="${escapeHtml(data.section)}" />`);
  }

  // Twitter Cards
  tags.push(`<meta name="twitter:card" content="${data.twitterCard}" />`);
  if (data.twitterSite) tags.push(`<meta name="twitter:site" content="${escapeHtml(data.twitterSite)}" />`);
  if (data.twitterCreator) tags.push(`<meta name="twitter:creator" content="${escapeHtml(data.twitterCreator)}" />`);
  if (data.title) tags.push(`<meta name="twitter:title" content="${escapeHtml(data.title)}" />`);
  if (data.description) tags.push(`<meta name="twitter:description" content="${escapeHtml(data.description)}" />`);
  if (data.imageUrl) tags.push(`<meta name="twitter:image" content="${escapeHtml(data.imageUrl)}" />`);
  if (data.imageAlt) tags.push(`<meta name="twitter:image:alt" content="${escapeHtml(data.imageAlt)}" />`);

  return tags.join("\n");
}

export function validateOpenGraph(data: OpenGraphData): OGValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!data.title?.trim()) {
    errors.push("Missing required og:title.");
  } else if (data.title.length > 90) {
    warnings.push("Title exceeds 90 characters; Facebook & Twitter may truncate it.");
  }

  if (!data.description?.trim()) {
    errors.push("Missing required og:description.");
  } else if (data.description.length > 200) {
    warnings.push("Description exceeds 200 characters; social networks may clip it.");
  }

  if (!data.url?.trim()) {
    errors.push("Missing required og:url.");
  } else if (!/^https?:\/\//i.test(data.url)) {
    errors.push("og:url must include an absolute http:// or https:// protocol.");
  }

  if (!data.imageUrl?.trim()) {
    warnings.push("Missing og:image. Posts shared on social media will display without a rich image card.");
  } else if (!/^https?:\/\//i.test(data.imageUrl)) {
    errors.push("og:image URL must be an absolute URL including protocol.");
  }

  // Image Dimensions advisory
  let imageAspectRatioNotice: string | undefined;
  if (data.imageWidth && data.imageHeight) {
    const w = parseInt(data.imageWidth, 10);
    const h = parseInt(data.imageHeight, 10);
    if (!isNaN(w) && !isNaN(h)) {
      const ratio = w / h;
      if (Math.abs(ratio - 1.91) > 0.1) {
        imageAspectRatioNotice = `Image aspect ratio (${w}x${h} ≈ ${ratio.toFixed(2)}:1) deviates from the recommended 1.91:1 ratio (1200x630px).`;
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    imageAspectRatioNotice,
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

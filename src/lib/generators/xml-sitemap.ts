export interface SitemapUrlEntry {
  loc: string;
  lastmod?: string; // YYYY-MM-DD
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string; // e.g. "0.8" or "1.0"
}

export interface SitemapConfig {
  urls: SitemapUrlEntry[];
  includeLastmod?: boolean;
  includeChangefreq?: boolean;
  includePriority?: boolean;
}

export interface SitemapValidationIssue {
  type: "error" | "warning";
  line?: number;
  message: string;
}

export interface SitemapValidationResult {
  isValid: boolean;
  urlCount: number;
  issues: SitemapValidationIssue[];
  fileSizeBytes: number;
}

export function generateXmlSitemap(config: SitemapConfig): string {
  const lines: string[] = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ];

  for (const entry of config.urls) {
    const loc = entry.loc.trim();
    if (!loc) continue;

    lines.push(`  <url>`);
    lines.push(`    <loc>${escapeXml(loc)}</loc>`);

    if (config.includeLastmod && entry.lastmod) {
      lines.push(`    <lastmod>${entry.lastmod.trim()}</lastmod>`);
    }

    if (config.includeChangefreq && entry.changefreq) {
      lines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
    }

    if (config.includePriority && entry.priority) {
      lines.push(`    <priority>${entry.priority}</priority>`);
    }

    lines.push(`  </url>`);
  }

  lines.push(`</urlset>`);
  return lines.join("\n");
}

export function validateXmlSitemap(xmlString: string): SitemapValidationResult {
  const issues: SitemapValidationIssue[] = [];
  const trimmed = xmlString.trim();
  const fileSizeBytes = new TextEncoder().encode(xmlString).length;

  if (!trimmed) {
    return {
      isValid: false,
      urlCount: 0,
      issues: [{ type: "error", message: "Sitemap XML string is empty." }],
      fileSizeBytes: 0,
    };
  }

  // XML Header Check
  if (!trimmed.startsWith("<?xml")) {
    issues.push({ type: "error", message: "Missing XML declaration <?xml version='1.0' encoding='UTF-8'?> at the start of document." });
  }

  // Root Namespace Check
  if (!trimmed.includes('<urlset') || !trimmed.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
    issues.push({ type: "error", message: "Missing standard root <urlset> tag with sitemaps.org namespace." });
  }

  // Extract <loc> elements
  const locRegex = /<loc>([\s\S]*?)<\/loc>/g;
  const urls: string[] = [];
  let match;
  while ((match = locRegex.exec(trimmed)) !== null) {
    urls.push(match[1].trim());
  }

  const urlCount = urls.length;

  if (urlCount === 0) {
    issues.push({ type: "error", message: "No <url> or <loc> elements found in sitemap." });
  }

  // Sitemaps.org Protocol Limits (50,000 URLs / 50MB uncompressed)
  if (urlCount > 50000) {
    issues.push({
      type: "error",
      message: `Sitemap contains ${urlCount} URLs, exceeding the 50,000 URL limit per sitemap file. Break into a Sitemap Index.`,
    });
  }

  if (fileSizeBytes > 52428800) {
    issues.push({
      type: "error",
      message: `Sitemap size exceeds 50MB (${(fileSizeBytes / 1024 / 1024).toFixed(2)}MB).`,
    });
  }

  // Validate individual URLs
  const seenUrls = new Set<string>();
  for (let i = 0; i < urls.length; i++) {
    const u = urls[i];
    if (!/^https?:\/\//i.test(u)) {
      issues.push({ type: "error", message: `URL #${i + 1} ('${u}') must be an absolute URL starting with http:// or https://.` });
    }
    if (seenUrls.has(u)) {
      issues.push({ type: "warning", message: `Duplicate URL detected: '${u}'.` });
    }
    seenUrls.add(u);
  }

  return {
    isValid: issues.filter((i) => i.type === "error").length === 0,
    urlCount,
    issues,
    fileSizeBytes,
  };
}

export function parseUrlsFromText(rawText: string): SitemapUrlEntry[] {
  if (!rawText) return [];
  const lines = rawText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const now = new Date().toISOString().split("T")[0];

  return lines.map((line, idx) => {
    // Check if line contains comma-separated values (loc, lastmod, priority)
    const parts = line.split(",").map((p) => p.trim());
    return {
      loc: parts[0],
      lastmod: parts[1] || now,
      changefreq: "weekly",
      priority: idx === 0 ? "1.0" : "0.8",
    };
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

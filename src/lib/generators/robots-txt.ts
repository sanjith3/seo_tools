export interface RobotsRuleGroup {
  id: string;
  userAgent: string;
  allow: string[];
  disallow: string[];
}

export interface RobotsTxtData {
  groups: RobotsRuleGroup[];
  sitemaps: string[];
  crawlDelay?: string;
}

export interface RobotsValidationResult {
  isValid: boolean;
  warnings: string[];
  errors: string[];
  hasBlockAllWarning: boolean;
}

export const USER_AGENT_PRESETS = [
  "*",
  "Googlebot",
  "Googlebot-Image",
  "Googlebot-News",
  "Bingbot",
  "Baiduspider",
  "YandexBot",
  "DuckDuckBot"
];

export const ROBOTS_PRESETS: Record<string, RobotsTxtData> = {
  Default: {
    groups: [
      {
        id: "1",
        userAgent: "*",
        allow: ["/"],
        disallow: ["/api/", "/admin/", "/*?*"]
      }
    ],
    sitemaps: ["https://zenvuk.com/sitemap.xml"]
  },
  AllowAll: {
    groups: [
      {
        id: "1",
        userAgent: "*",
        allow: ["/"],
        disallow: []
      }
    ],
    sitemaps: ["https://example.com/sitemap.xml"]
  },
  BlockAll: {
    groups: [
      {
        id: "1",
        userAgent: "*",
        allow: [],
        disallow: ["/"]
      }
    ],
    sitemaps: []
  },
  WordPress: {
    groups: [
      {
        id: "1",
        userAgent: "*",
        allow: ["/wp-admin/admin-ajax.php"],
        disallow: ["/wp-admin/", "/wp-includes/", "/trackback/", "/feed/"]
      }
    ],
    sitemaps: ["https://example.com/wp-sitemap.xml"]
  },
  Ecommerce: {
    groups: [
      {
        id: "1",
        userAgent: "*",
        allow: ["/"],
        disallow: ["/cart", "/checkout", "/account/", "/search", "/*?*sort=", "/*?*filter="]
      }
    ],
    sitemaps: ["https://example.com/sitemap.xml"]
  }
};

export function generateRobotsTxt(data: RobotsTxtData): string {
  const lines: string[] = [];

  for (const group of data.groups) {
    const ua = group.userAgent.trim() || "*";
    lines.push(`User-agent: ${ua}`);

    if (group.allow && group.allow.length > 0) {
      for (const allowPath of group.allow) {
        const p = allowPath.trim();
        if (p) lines.push(`Allow: ${p}`);
      }
    }

    if (group.disallow && group.disallow.length > 0) {
      for (const disallowPath of group.disallow) {
        const p = disallowPath.trim();
        if (p) lines.push(`Disallow: ${p}`);
      }
    } else if (!group.allow || group.allow.length === 0) {
      // Empty disallow directive means "allow all"
      lines.push(`Disallow:`);
    }

    if (data.crawlDelay && data.crawlDelay.trim()) {
      lines.push(`Crawl-delay: ${data.crawlDelay.trim()}`);
    }

    lines.push("");
  }

  // Sitemaps at bottom
  if (data.sitemaps && data.sitemaps.length > 0) {
    for (const sm of data.sitemaps) {
      const s = sm.trim();
      if (s) lines.push(`Sitemap: ${s}`);
    }
  }

  return lines.join("\n").trim() + "\n";
}

export function validateRobotsTxt(data: RobotsTxtData): RobotsValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  let hasBlockAllWarning = false;

  if (!data.groups || data.groups.length === 0) {
    errors.push("At least one User-agent rule group is required.");
    return { isValid: false, errors, warnings, hasBlockAllWarning: false };
  }

  for (let idx = 0; idx < data.groups.length; idx++) {
    const group = data.groups[idx];
    const ua = group.userAgent.trim();
    if (!ua) {
      errors.push(`Rule group #${idx + 1}: Missing User-agent.`);
    }

    // Check for catastrophic Block All
    if (ua === "*" && group.disallow.some((d) => d.trim() === "/")) {
      hasBlockAllWarning = true;
      warnings.push("CRITICAL WARNING: 'Disallow: /' on 'User-agent: *' blocks search engines from crawling your entire website!");
    }

    // Syntax checks on paths
    for (const p of [...(group.allow || []), ...(group.disallow || [])]) {
      const trimmed = p.trim();
      if (trimmed && !trimmed.startsWith("/")) {
        warnings.push(`Directive path '${trimmed}' should start with a forward slash ('/').`);
      }
    }
  }

  // Sitemap validations
  if (data.sitemaps && data.sitemaps.length > 0) {
    for (const sm of data.sitemaps) {
      const trimmed = sm.trim();
      if (trimmed) {
        if (!/^https?:\/\//i.test(trimmed)) {
          errors.push(`Sitemap URL '${trimmed}' must include an absolute http:// or https:// protocol.`);
        }
        if (!trimmed.endsWith(".xml") && !trimmed.includes(".xml?")) {
          warnings.push(`Sitemap URL '${trimmed}' does not end with .xml.`);
        }
      }
    }
  } else {
    warnings.push("Recommendation: Reference your XML sitemap URL at the bottom of robots.txt.");
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    hasBlockAllWarning
  };
}

export interface LLMSTxtResource {
  title: string;
  url: string;
  description?: string;
}

export interface LLMSTxtSection {
  heading: string;
  resources: LLMSTxtResource[];
}

export interface LLMSTxtData {
  siteName: string;
  siteDescription: string;
  canonicalUrl: string;
  documentationUrl?: string;
  sections: LLMSTxtSection[];
}

export interface LLMSValidationResult {
  isValid: boolean;
  warnings: string[];
  errors: string[];
}

export function generateLLMSTxt(data: LLMSTxtData): string {
  const lines: string[] = [];

  // Title & Blockquote Description
  if (data.siteName.trim()) {
    lines.push(`# ${data.siteName.trim()}`);
  } else {
    lines.push(`# Website Resource Index`);
  }

  if (data.siteDescription.trim()) {
    lines.push(`> ${data.siteDescription.trim()}`);
  }

  lines.push("");

  if (data.canonicalUrl.trim()) {
    lines.push(`Website: ${data.canonicalUrl.trim()}`);
  }

  if (data.documentationUrl && data.documentationUrl.trim()) {
    lines.push(`Documentation: ${data.documentationUrl.trim()}`);
  }

  if (data.canonicalUrl.trim() || (data.documentationUrl && data.documentationUrl.trim())) {
    lines.push("");
  }

  // Sections
  for (const section of data.sections) {
    if (!section.heading.trim() && section.resources.length === 0) continue;

    lines.push(`## ${section.heading.trim() || "Resources"}`);

    for (const res of section.resources) {
      const title = res.title.trim() || "Resource Link";
      const url = res.url.trim();
      const desc = res.description?.trim();

      if (url) {
        if (desc) {
          lines.push(`- [${title}](${url}): ${desc}`);
        } else {
          lines.push(`- [${title}](${url})`);
        }
      }
    }
    lines.push("");
  }

  return lines.join("\n").trim() + "\n";
}

export function validateLLMSTxt(data: LLMSTxtData): LLMSValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const seenUrls = new Set<string>();

  if (!data.siteName.trim()) {
    errors.push("Missing website name header.");
  }

  if (!data.siteDescription.trim()) {
    warnings.push("Adding a concise site description blockquote is strongly recommended.");
  }

  if (data.canonicalUrl.trim() && !/^https?:\/\//i.test(data.canonicalUrl.trim())) {
    errors.push("Canonical URL must start with http:// or https://");
  }

  if (data.documentationUrl && data.documentationUrl.trim() && !/^https?:\/\//i.test(data.documentationUrl.trim())) {
    errors.push("Documentation URL must start with http:// or https://");
  }

  if (!data.sections || data.sections.length === 0) {
    warnings.push("No sections added. Add at least one documentation or resource section.");
  }

  for (let sIdx = 0; sIdx < (data.sections || []).length; sIdx++) {
    const section = data.sections[sIdx];
    if (!section.heading.trim()) {
      warnings.push(`Section #${sIdx + 1} has an empty heading.`);
    }

    if (!section.resources || section.resources.length === 0) {
      warnings.push(`Section '${section.heading || `#${sIdx + 1}`}' has no resource links.`);
    }

    for (let rIdx = 0; rIdx < (section.resources || []).length; rIdx++) {
      const res = section.resources[rIdx];
      const trimmedUrl = res.url.trim();

      if (!trimmedUrl) {
        errors.push(`Missing URL in section '${section.heading || `#${sIdx + 1}`}', link #${rIdx + 1}.`);
      } else {
        if (!/^https?:\/\//i.test(trimmedUrl)) {
          errors.push(`Invalid URL protocol in '${res.title || trimmedUrl}': must start with http:// or https://`);
        }
        if (seenUrls.has(trimmedUrl.toLowerCase())) {
          warnings.push(`Duplicate URL detected: ${trimmedUrl}`);
        } else {
          seenUrls.add(trimmedUrl.toLowerCase());
        }
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

export const LLMS_PRESET_TEMPLATES: Record<string, LLMSTxtData> = {
  SaaS: {
    siteName: "Zenvuk",
    siteDescription: "Free browser-based SEO, ecommerce, and digital marketing utilities with zero tracking cookies and no API keys required.",
    canonicalUrl: "https://zenvuk.com",
    documentationUrl: "https://zenvuk.com/methodology/",
    sections: [
      {
        heading: "Core Utilities",
        resources: [
          { title: "Schema Markup Generator", url: "https://zenvuk.com/schema-markup-generator/", description: "Create valid Schema.org JSON-LD structured data for 15 entity types." },
          { title: "Robots.txt Generator", url: "https://zenvuk.com/robots-txt-generator/", description: "Build and validate crawler directives and sitemap references." },
          { title: "XML Sitemap Generator", url: "https://zenvuk.com/xml-sitemap-generator/", description: "Generate Sitemaps.org 0.9 XML with priority and change frequency." }
        ]
      },
      {
        heading: "Documentation & Policies",
        resources: [
          { title: "Scoring Methodology", url: "https://zenvuk.com/methodology/", description: "Technical explanation of client-side deterministic algorithms." },
          { title: "Privacy Policy", url: "https://zenvuk.com/privacy-policy/", description: "In-browser processing standards and zero data transmission." }
        ]
      }
    ]
  },
  Documentation: {
    siteName: "Developer Documentation Hub",
    siteDescription: "Official developer guides, API specifications, and SDK references.",
    canonicalUrl: "https://docs.example.com",
    documentationUrl: "https://docs.example.com/getting-started",
    sections: [
      {
        heading: "Guides",
        resources: [
          { title: "Quickstart Guide", url: "https://docs.example.com/quickstart", description: "Get started in 5 minutes with our CLI and SDK." },
          { title: "Authentication", url: "https://docs.example.com/auth", description: "API key generation, OAuth 2.0 flows, and rate limiting." }
        ]
      },
      {
        heading: "API Reference",
        resources: [
          { title: "REST API Endpoints", url: "https://docs.example.com/api/rest", description: "Complete OpenAPI specification of all endpoints." },
          { title: "Webhooks", url: "https://docs.example.com/api/webhooks", description: "Event triggers, payload schemas, and HMAC signing." }
        ]
      }
    ]
  }
};

import { describe, it, expect } from "vitest";
import {
  generateOpenGraphHtml,
  validateOpenGraph,
  OpenGraphData,
} from "../src/lib/generators/open-graph";

describe("open-graph generator and validator", () => {
  const sampleData: OpenGraphData = {
    title: "SEO Audit Checklist 2026",
    description: "Complete guide to technical search engine optimization.",
    url: "https://zenvuk.com/seo-audit/",
    siteName: "Zenvuk",
    type: "article",
    imageUrl: "https://zenvuk.com/og-image.png",
    imageAlt: "SEO Audit Checklist Preview",
    imageWidth: "1200",
    imageHeight: "630",
    twitterCard: "summary_large_image",
    twitterSite: "@zenvuk",
    author: "Zenvuk SEO Team",
  };

  it("generates valid Open Graph and Twitter Card HTML meta tags", () => {
    const html = generateOpenGraphHtml(sampleData);

    expect(html).toContain('<meta property="og:title" content="SEO Audit Checklist 2026" />');
    expect(html).toContain('<meta property="og:url" content="https://zenvuk.com/seo-audit/" />');
    expect(html).toContain('<meta property="og:type" content="article" />');
    expect(html).toContain('<meta property="og:image" content="https://zenvuk.com/og-image.png" />');
    expect(html).toContain('<meta name="twitter:card" content="summary_large_image" />');
    expect(html).toContain('<meta name="twitter:site" content="@zenvuk" />');
    expect(html).toContain('<meta property="article:author" content="Zenvuk SEO Team" />');
  });

  it("escapes special HTML characters safely", () => {
    const html = generateOpenGraphHtml({
      ...sampleData,
      title: 'Tools <for> "Developers" & Marketers',
    });

    expect(html).toContain('content="Tools &lt;for&gt; &quot;Developers&quot; &amp; Marketers"');
  });

  it("validates required fields and warns on missing image", () => {
    const invalidData: OpenGraphData = {
      title: "",
      description: "",
      url: "invalid-url",
      siteName: "Zenvuk",
      type: "website",
      imageUrl: "",
      twitterCard: "summary",
    };

    const res = validateOpenGraph(invalidData);
    expect(res.isValid).toBe(false);
    expect(res.errors.some((e) => e.includes("Missing required og:title"))).toBe(true);
    expect(res.errors.some((e) => e.includes("protocol"))).toBe(true);
    expect(res.warnings.some((w) => w.includes("Missing og:image"))).toBe(true);
  });

  it("advises when image aspect ratio deviates from 1.91:1", () => {
    const res = validateOpenGraph({
      ...sampleData,
      imageWidth: "800",
      imageHeight: "800", // 1:1 ratio
    });

    expect(res.imageAspectRatioNotice).toBeDefined();
    expect(res.imageAspectRatioNotice).toContain("deviates from the recommended 1.91:1");
  });
});

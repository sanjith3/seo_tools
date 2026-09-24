import { describe, it, expect } from "vitest";
import {
  generateXmlSitemap,
  validateXmlSitemap,
  parseUrlsFromText,
} from "../src/lib/generators/xml-sitemap";

describe("xml-sitemap generator and validator", () => {
  it("generates a valid XML sitemap string conforming to sitemaps.org 0.9", () => {
    const xml = generateXmlSitemap({
      urls: [
        {
          loc: "https://zenvuk.com/",
          lastmod: "2026-09-23",
          changefreq: "daily",
          priority: "1.0",
        },
        {
          loc: "https://zenvuk.com/tools/",
          lastmod: "2026-09-23",
          changefreq: "weekly",
          priority: "0.9",
        },
      ],
      includeLastmod: true,
      includeChangefreq: true,
      includePriority: true,
    });

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml).toContain("<loc>https://zenvuk.com/</loc>");
    expect(xml).toContain("<lastmod>2026-09-23</lastmod>");
    expect(xml).toContain("<priority>1.0</priority>");
  });

  it("validates compliant XML sitemaps accurately", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://zenvuk.com/</loc>
  </url>
</urlset>`;

    const res = validateXmlSitemap(xml);
    expect(res.isValid).toBe(true);
    expect(res.urlCount).toBe(1);
    expect(res.issues.length).toBe(0);
  });

  it("detects relative URLs and duplicate URLs", () => {
    const invalidXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>/relative-page</loc>
  </url>
  <url>
    <loc>https://zenvuk.com/dup</loc>
  </url>
  <url>
    <loc>https://zenvuk.com/dup</loc>
  </url>
</urlset>`;

    const res = validateXmlSitemap(invalidXml);
    expect(res.isValid).toBe(false);
    expect(res.issues.some((i) => i.message.includes("must be an absolute URL"))).toBe(true);
    expect(res.issues.some((i) => i.message.includes("Duplicate URL detected"))).toBe(true);
  });

  it("parses newline-separated text into structured entries", () => {
    const text = `
https://zenvuk.com/
https://zenvuk.com/tools/
https://zenvuk.com/about/
`;
    const entries = parseUrlsFromText(text);
    expect(entries.length).toBe(3);
    expect(entries[0].loc).toBe("https://zenvuk.com/");
    expect(entries[0].priority).toBe("1.0");
    expect(entries[1].priority).toBe("0.8");
  });
});

import { describe, it, expect } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("Robots and Sitemap Production Directives", () => {
  it("generates correct robots.txt directives without global query blocking", () => {
    const robotsData = robots();
    expect(robotsData.rules).toBeDefined();

    const rules = Array.isArray(robotsData.rules) ? robotsData.rules[0] : robotsData.rules;
    expect(rules.userAgent).toBe("*");
    expect(rules.allow).toBe("/");
    expect(rules.disallow).toBe("/api/");

    // Confirm /*?* is removed
    const disallowRules = Array.isArray(rules.disallow) ? rules.disallow : [rules.disallow];
    expect(disallowRules).not.toContain("/*?*");

    expect(robotsData.sitemap).toBe("https://zenvuk.com/sitemap.xml");
  });

  it("generates valid sitemap.xml entries with canonical URLs and truthful lastmod", async () => {
    const sitemapData = await sitemap();
    expect(sitemapData.length).toBeGreaterThanOrEqual(27);

    for (const item of sitemapData) {
      // Must use canonical https://zenvuk.com
      expect(item.url.startsWith("https://zenvuk.com/")).toBe(true);
      expect(item.url).not.toContain("workers.dev");
      expect(item.url).not.toContain("cms.zenvuk.com");
      expect(item.url).not.toContain("?cat=");
      expect(item.url).not.toContain("?");
      expect(item.url).not.toContain("/api/");

      // Trailing slash requirement
      expect(item.url.endsWith("/")).toBe(true);
    }

    const urls = sitemapData.map((s) => s.url);

    // Required core and category pages
    expect(urls).toContain("https://zenvuk.com/");
    expect(urls).toContain("https://zenvuk.com/tools/");
    expect(urls).toContain("https://zenvuk.com/tools/technical-seo/");
    expect(urls).toContain("https://zenvuk.com/tools/structured-data/");
    expect(urls).toContain("https://zenvuk.com/tools/marketing/");
    expect(urls).toContain("https://zenvuk.com/blog/");

    // Key tools
    expect(urls).toContain("https://zenvuk.com/canonical-tag-generator/");
    expect(urls).toContain("https://zenvuk.com/faq-schema-generator/");
    expect(urls).toContain("https://zenvuk.com/utm-builder/");
    expect(urls).toContain("https://zenvuk.com/robots-txt-generator/");
    expect(urls).toContain("https://zenvuk.com/xml-sitemap-generator/");

    // Check that static pages do not fabricate lastmod
    const staticHome = sitemapData.find((s) => s.url === "https://zenvuk.com/");
    expect(staticHome?.lastModified).toBeUndefined();

    const staticTools = sitemapData.find((s) => s.url === "https://zenvuk.com/tools/");
    expect(staticTools?.lastModified).toBeUndefined();
  });
});

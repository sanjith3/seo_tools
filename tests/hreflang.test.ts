import { describe, expect, it } from "vitest";
import {
  generateHreflangHtml,
  generateHreflangXml,
  validateHreflang,
  getFullHreflangCode,
  HreflangItem
} from "@/lib/generators/hreflang";

describe("Hreflang Generator Engine", () => {
  const sampleItems: HreflangItem[] = [
    { id: "1", language: "x-default", url: "https://example.com/" },
    { id: "2", language: "en", region: "US", url: "https://example.com/us/" },
    { id: "3", language: "en", region: "GB", url: "https://example.com/uk/" },
    { id: "4", language: "es", region: "ES", url: "https://example.com/es/" }
  ];

  it("computes full hreflang code accurately", () => {
    expect(getFullHreflangCode({ id: "1", language: "x-default", url: "" })).toBe("x-default");
    expect(getFullHreflangCode({ id: "2", language: "en", region: "us", url: "" })).toBe("en-US");
    expect(getFullHreflangCode({ id: "3", language: "DE", url: "" })).toBe("de");
  });

  it("generates clean HTML <link rel='alternate'> tags", () => {
    const html = generateHreflangHtml(sampleItems);
    expect(html).toContain('<link rel="alternate" hreflang="x-default" href="https://example.com/" />');
    expect(html).toContain('<link rel="alternate" hreflang="en-US" href="https://example.com/us/" />');
    expect(html).toContain('<link rel="alternate" hreflang="en-GB" href="https://example.com/uk/" />');
    expect(html).toContain('<link rel="alternate" hreflang="es-ES" href="https://example.com/es/" />');
  });

  it("generates valid XML sitemap alternate link snippet", () => {
    const xml = generateHreflangXml(sampleItems, "https://example.com/us/");
    expect(xml).toContain("<url>");
    expect(xml).toContain("<loc>https://example.com/us/</loc>");
    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/" />');
    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="en-US" href="https://example.com/us/" />');
    expect(xml).toContain("</url>");
  });

  it("flags duplicate hreflang codes", () => {
    const duplicateItems: HreflangItem[] = [
      { id: "1", language: "en", region: "US", url: "https://example.com/1" },
      { id: "2", language: "en", region: "US", url: "https://example.com/2" }
    ];
    const validation = validateHreflang(duplicateItems);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.some((e) => e.includes("Duplicate hreflang code detected"))).toBe(true);
  });

  it("flags invalid ISO language codes and malformed URLs", () => {
    const invalidItems: HreflangItem[] = [
      { id: "1", language: "english", url: "not-a-valid-url" }
    ];
    const validation = validateHreflang(invalidItems);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.some((e) => e.includes("ISO 639-1"))).toBe(true);
    expect(validation.errors.some((e) => e.includes("http:// or https://"))).toBe(true);
  });
});

import { describe, it, expect } from "vitest";
import { generateSlug } from "../src/lib/generators/url-slug";

describe("url slug generator and cleaner", () => {
  it("converts strings with special characters and spaces to clean hyphenated slugs", () => {
    const input = "10 Best Free SEO Tools & Utilities for 2026!";
    const res = generateSlug(input);

    expect(res.slug).toBe("10-best-free-seo-tools-and-utilities-for-2026");
    expect(res.charCount).toBe(res.slug.length);
  });

  it("normalizes unicode accents and diacritics", () => {
    const input = "Café & Crème Brûlée in München";
    const res = generateSlug(input);

    expect(res.slug).toBe("cafe-and-creme-brulee-in-munchen");
  });

  it("removes English stop words when requested", () => {
    const input = "How to write a blog post in the morning";
    const res = generateSlug(input, { removeStopWords: true });

    expect(res.removedStopWords).toContain("to");
    expect(res.removedStopWords).toContain("a");
    expect(res.removedStopWords).toContain("in");
    expect(res.removedStopWords).toContain("the");
    expect(res.slug).toBe("how-write-blog-post-morning");
  });

  it("truncates at word boundary without breaking words", () => {
    const longTitle = "Comprehensive Guide to Advanced Generative Engine Optimization for Modern Enterprise Websites";
    const res = generateSlug(longTitle, { maxLength: 40 });

    expect(res.slug.length).toBeLessThanOrEqual(40);
    expect(res.slug.endsWith("-")).toBe(false);
  });
});

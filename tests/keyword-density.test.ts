import { describe, it, expect } from "vitest";
import {
  analyzeKeywordDensity,
} from "../src/lib/generators/keyword-density";

describe("keyword density and n-gram analyzer", () => {
  const sampleArticle = `
    Search engine optimization is the art of ranking in search engines.
    Search engine crawlers index search engine pages based on relevance.
    Technical SEO and structured data improve how search engine bots comprehend your digital footprint.
  `;

  it("calculates total words, unique words, and reading time", () => {
    const res = analyzeKeywordDensity(sampleArticle);
    expect(res.totalWords).toBeGreaterThan(20);
    expect(res.uniqueWords).toBeGreaterThan(15);
    expect(res.readingTimeMinutes).toBeGreaterThanOrEqual(1);
  });

  it("detects recurring 1-grams and excludes English stop words", () => {
    const res = analyzeKeywordDensity(sampleArticle, { includeStopWords: false });
    const topKeywords = res.unigrams.map((u) => u.phrase);

    expect(topKeywords).toContain("search");
    expect(topKeywords).toContain("engine");
    // Ensure stop words like 'is', 'the', 'of' are not in unigrams
    expect(topKeywords).not.toContain("the");
    expect(topKeywords).not.toContain("is");
  });

  it("extracts multi-word n-grams (bigrams & trigrams)", () => {
    const res = analyzeKeywordDensity(sampleArticle);

    const bigrams = res.bigrams.map((b) => b.phrase);
    expect(bigrams).toContain("search engine");

    const trigrams = res.trigrams.map((t) => t.phrase);
    expect(trigrams.some((t) => t.includes("search engine"))).toBe(true);
  });
});

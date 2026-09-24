import { describe, expect, it } from "vitest";
import {
  generateProductNames,
  scoreProductName,
  computeProductNameSummary
} from "@/lib/generators/product-name";

describe("Product Name Generator Engine", () => {
  const baseInput = {
    category: "Coffee & Beverage",
    productType: "Cold Brew Maker",
    keyword: "Brew",
    concept: "Pure Energy and Focus",
    targetAudience: "Coffee Enthusiasts",
    style: "Modern" as const,
    lengthFilter: "Any" as const,
    prefix: "Nova",
    suffix: "Lab",
    wordsToAvoid: "cheap, bitter, basic"
  };

  it("generates exactly 30 unique names", () => {
    const results = generateProductNames(baseInput);
    expect(results).toHaveLength(30);

    const names = results.map((r) => r.name.toLowerCase());
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(30);
  });

  it("strictly enforces words-to-avoid exclusions", () => {
    const avoidList = "cheap, bitter, basic";
    const results = generateProductNames({ ...baseInput, wordsToAvoid: avoidList });

    for (const item of results) {
      const lower = item.name.toLowerCase();
      expect(lower).not.toContain("cheap");
      expect(lower).not.toContain("bitter");
      expect(lower).not.toContain("basic");
    }
  });

  it("filters names by Short length when requested", () => {
    const results = generateProductNames({
      category: "Tech",
      productType: "App",
      keyword: "Sync",
      concept: "Fast",
      style: "Minimal",
      lengthFilter: "Short"
    });

    for (const item of results) {
      const cleanLen = item.name.replace(/\s+/g, "").length;
      expect(cleanLen).toBeLessThanOrEqual(14);
    }
  });

  it("scores brandability, length, and memorability", () => {
    const scored = scoreProductName("NexaBrew", "Brew", "Energy", ["cheap"]);
    expect(scored.score).toBeGreaterThan(60);

    const penalized = scoreProductName("CheapBrew", "Brew", "Energy", ["cheap"]);
    expect(penalized.score).toBeLessThanOrEqual(20);
  });
});

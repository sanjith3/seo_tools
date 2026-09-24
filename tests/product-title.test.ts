import { describe, expect, it } from "vitest";
import {
  generateProductTitles,
  scoreProductTitle,
  computeProductTitleSummary
} from "@/lib/generators/product-title";

describe("Product Title Generator Engine", () => {
  const baseInput = {
    productName: "Trail Runner Pro Shoes",
    primaryKeyword: "Trail Running Shoes",
    brand: "ApexGear",
    category: "Footwear",
    feature1: "Gore-Tex Waterproof",
    feature2: "Vibram MegaGrip Sole",
    feature3: "Ultra Lightweight",
    targetAudience: "Marathon Runners",
    marketplace: "Amazon" as const,
    tone: "Professional" as const,
    maxLength: 120
  };

  it("generates exactly 20 unique titles", () => {
    const results = generateProductTitles(baseInput);
    expect(results).toHaveLength(20);

    const titleStrings = results.map((r) => r.title.toLowerCase());
    const uniqueTitles = new Set(titleStrings);
    expect(uniqueTitles.size).toBe(20);
  });

  it("enforces maximum character length constraints cleanly", () => {
    const shortLimit = 75;
    const results = generateProductTitles({ ...baseInput, maxLength: shortLimit });
    for (const item of results) {
      expect(item.characterCount).toBeLessThanOrEqual(shortLimit);
    }
  });

  it("correctly scores keyword positioning and features", () => {
    const scoreFront = scoreProductTitle(
      "Trail Running Shoes – ApexGear Pro Edition",
      "Trail Running Shoes",
      ["Waterproof"],
      120
    );
    expect(scoreFront.keywordIndicator).toBe("Front-Loaded");
    expect(scoreFront.score).toBeGreaterThanOrEqual(70);

    const scoreNone = scoreProductTitle(
      "Generic Footwear with Rubber Soles and Laces",
      "Trail Running Shoes",
      [],
      120
    );
    expect(scoreNone.keywordIndicator).toBe("Not Found");
    expect(scoreNone.score).toBeLessThan(scoreFront.score);
  });

  it("computes accurate generation summary metrics", () => {
    const results = generateProductTitles(baseInput);
    const summary = computeProductTitleSummary(results, baseInput.primaryKeyword);

    expect(summary.totalGenerated).toBe(20);
    expect(summary.bestScore).toBeGreaterThan(0);
    expect(summary.averageLength).toBeGreaterThan(20);
    expect(summary.keywordCoveragePct).toBeGreaterThan(50);
  });

  it("handles eBay marketplace with strict 80-character ceiling", () => {
    const ebayInput = {
      ...baseInput,
      marketplace: "eBay" as const,
      maxLength: 80
    };
    const results = generateProductTitles(ebayInput);
    expect(results).toHaveLength(20);
    for (const item of results) {
      expect(item.characterCount).toBeLessThanOrEqual(80);
    }
  });
});

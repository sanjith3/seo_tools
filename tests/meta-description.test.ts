import { describe, expect, it } from "vitest";
import {
  generateMetaDescriptions,
  scoreMetaDescription,
  computeMetaDescriptionSummary
} from "@/lib/generators/meta-description";

describe("Meta Description Generator Engine", () => {
  const baseInput = {
    pageTitle: "Top Accounting Software for Small Businesses",
    primaryKeyword: "accounting software",
    secondaryKeyword: "invoicing tools",
    businessName: "LedgerPulse",
    pagePurpose: "Product Page" as const,
    mainBenefit: "automate tax filings and streamline invoicing",
    secondaryBenefit: "real-time financial reporting",
    cta: "Start your free 30-day trial",
    tone: "Professional" as const,
    targetLength: 155
  };

  it("generates 10 or more distinct meta descriptions", () => {
    const results = generateMetaDescriptions(baseInput);
    expect(results.length).toBeGreaterThanOrEqual(10);

    const descStrings = results.map((r) => r.description.toLowerCase());
    const uniqueDescs = new Set(descStrings);
    expect(uniqueDescs.size).toBe(results.length);
  });

  it("fits descriptions within the target length boundary", () => {
    const results = generateMetaDescriptions({ ...baseInput, targetLength: 155 });
    for (const item of results) {
      expect(item.characterCount).toBeLessThanOrEqual(160);
    }
  });

  it("accurately detects keywords and calls to action", () => {
    const results = generateMetaDescriptions(baseInput);
    const withKeyword = results.filter((r) => r.hasPrimaryKeyword);
    expect(withKeyword.length).toBeGreaterThan(0);

    const withCta = results.filter((r) => r.hasCta);
    expect(withCta.length).toBeGreaterThan(0);
  });

  it("calculates summary statistics correctly", () => {
    const results = generateMetaDescriptions(baseInput);
    const summary = computeMetaDescriptionSummary(results, baseInput.primaryKeyword);

    expect(summary.totalGenerated).toBeGreaterThanOrEqual(10);
    expect(summary.bestScore).toBeGreaterThan(50);
    expect(summary.averageLength).toBeGreaterThan(80);
    expect(summary.keywordCoveragePct).toBeGreaterThan(0);
  });

  it("generates paired meta titles when generateTitle is enabled", () => {
    const results = generateMetaDescriptions({ ...baseInput, generateTitle: true });
    for (const item of results) {
      expect(item.metaTitle).toBeDefined();
      expect(typeof item.metaTitle).toBe("string");
      expect(item.metaTitle!.length).toBeGreaterThan(0);
      expect(item.titleCharCount).toBeLessThanOrEqual(60);
    }
  });

  it("supports Facebook / Open Graph descriptions", () => {
    const results = generateMetaDescriptions({
      ...baseInput,
      pagePurpose: "Facebook / Open Graph" as const,
      targetLength: 200
    });
    expect(results.length).toBeGreaterThanOrEqual(10);
    for (const item of results) {
      expect(item.description.length).toBeGreaterThan(0);
    }
  });
});

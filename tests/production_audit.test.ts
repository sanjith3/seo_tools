import { describe, it, expect } from "vitest";
import {
  generateFAQSchemaJson,
  validateFAQItems,
  FAQItem
} from "@/lib/generators/faq-schema";
import {
  generateProductTitles,
  computeProductTitleSummary
} from "@/lib/generators/product-title";
import {
  generateMetaDescriptions,
  computeMetaDescriptionSummary
} from "@/lib/generators/meta-description";
import {
  generateProductNames,
  computeProductNameSummary
} from "@/lib/generators/product-name";
import {
  buildUtmUrl,
  validateAndBuildUtm
} from "@/lib/generators/utm";
import { generateCsvString, escapeCsvField } from "@/lib/export/csv";
import { generateQrCodeSvg } from "@/lib/generators/qr-code";

describe("Production Audit - Step 4: FAQ Schema Generator Edge Cases", () => {
  it("handles empty and single FAQs", () => {
    const emptyJson = generateFAQSchemaJson([]);
    const parsedEmpty = JSON.parse(emptyJson);
    expect(parsedEmpty["@type"]).toBe("FAQPage");
    expect(parsedEmpty.mainEntity).toEqual([]);

    const singleItem: FAQItem[] = [
      { id: "1", question: "What is this?", answer: "This is a test." }
    ];
    const singleJson = generateFAQSchemaJson(singleItem);
    const parsedSingle = JSON.parse(singleJson);
    expect(parsedSingle.mainEntity.length).toBe(1);
    expect(parsedSingle.mainEntity[0].name).toBe("What is this?");
  });

  it("safely escapes quotes, apostrophes, ampersands, HTML tags, Unicode, Tamil, and emojis", () => {
    const complexItems: FAQItem[] = [
      {
        id: "1",
        question: "Does it support Tamil text like 'வணக்கம்' & Emojis 🚀?",
        answer: 'Yes! It handles "quotes", apostrophes \' single, & ampersands, <div>HTML tags</div> and newlines:\nLine 2.'
      }
    ];

    const jsonOutput = generateFAQSchemaJson(complexItems, { minified: false });
    // Verify it is strictly valid JSON
    const parsed = JSON.parse(jsonOutput);
    expect(parsed.mainEntity[0].name).toContain("வணக்கம்");
    expect(parsed.mainEntity[0].name).toContain("🚀");
    expect(parsed.mainEntity[0].acceptedAnswer.text).toContain('"quotes"');
    expect(parsed.mainEntity[0].acceptedAnswer.text).toContain("<div>HTML tags</div>");

    // Check script wrapper mode
    const scriptWrapped = generateFAQSchemaJson(complexItems, { includeScriptTag: true });
    expect(scriptWrapped.startsWith('<script type="application/ld+json">')).toBe(true);
    expect(scriptWrapped.endsWith('</script>')).toBe(true);
  });

  it("correctly validates and filters empty items", () => {
    const invalidItems: FAQItem[] = [
      { id: "1", question: "", answer: "Answer with no question" },
      { id: "2", question: "Question with no answer", answer: "" },
      { id: "3", question: "Valid Q", answer: "Valid A" }
    ];
    const validation = validateFAQItems(invalidItems);
    expect(validation.isValid).toBe(false);
    expect(validation.validCount).toBe(1);
    expect(validation.totalCount).toBe(3);
  });
});

describe("Production Audit - Step 5: Product Title Generator", () => {
  it("generates at least 20 unique titles with valid Zenvuk optimization scores", () => {
    const results = generateProductTitles({
      productName: "Trail Runner Shoes",
      primaryKeyword: "waterproof hiking boots",
      brand: "SummitCraft",
      category: "Footwear",
      feature1: "Vibram sole",
      feature2: "breathable mesh",
      feature3: "gore-tex",
      targetAudience: "men",
      marketplace: "Amazon",
      tone: "SEO Focused",
      maxLength: 200
    });

    expect(results.length).toBeGreaterThanOrEqual(20);

    const titleSet = new Set(results.map(r => r.title));
    expect(titleSet.size).toBe(results.length); // No duplicates

    for (const res of results) {
      expect(res.title.length).toBeGreaterThan(10);
      expect(res.score).toBeGreaterThanOrEqual(0);
      expect(res.score).toBeLessThanOrEqual(100);
      expect(typeof res.characterCount).toBe("number");
    }

    const summary = computeProductTitleSummary(results, "waterproof hiking boots");
    expect(summary.totalGenerated).toBeGreaterThanOrEqual(20);
    expect(summary.bestScore).toBeGreaterThanOrEqual(80);
  });
});

describe("Production Audit - Step 6: Meta Description Generator", () => {
  it("generates at least 10 unique descriptions within target character window", () => {
    const results = generateMetaDescriptions({
      pageTitle: "Best Ergonomic Office Chairs for Back Support",
      primaryKeyword: "ergonomic office chairs",
      secondaryKeyword: "lumbar support",
      businessName: "PostureCraft",
      pagePurpose: "Product Page",
      mainBenefit: "reduce back pain and improve sitting posture",
      secondaryBenefit: "breathable mesh",
      cta: "Shop the collection now",
      tone: "Professional",
      targetLength: 155
    });

    expect(results.length).toBeGreaterThanOrEqual(10);

    const descSet = new Set(results.map(r => r.description));
    expect(descSet.size).toBe(results.length);

    for (const res of results) {
      expect(res.characterCount).toBeGreaterThan(50);
      expect(res.characterCount).toBeLessThan(175);
      expect(res.score).toBeGreaterThanOrEqual(0);
      expect(res.score).toBeLessThanOrEqual(100);
    }

    const summary = computeMetaDescriptionSummary(results, "ergonomic office chairs");
    expect(summary.totalGenerated).toBeGreaterThanOrEqual(10);
  });
});

describe("Production Audit - Step 7: Product Name Generator", () => {
  it("generates 30 distinct brandable names and filters out forbidden words", () => {
    const results = generateProductNames({
      category: "Software & SaaS",
      productType: "Analytics Platform",
      keyword: "Cloud",
      concept: "Speed",
      style: "Modern",
      lengthFilter: "Any",
      wordsToAvoid: "cheap, slow, junk"
    });

    expect(results.length).toBe(30);

    // Ensure forbidden words are strictly excluded
    for (const res of results) {
      const lower = res.name.toLowerCase();
      expect(lower).not.toContain("cheap");
      expect(lower).not.toContain("slow");
      expect(lower).not.toContain("junk");
      expect(res.score).toBeGreaterThan(0);
      expect(res.syllables).toBeGreaterThanOrEqual(1);
    }

    const summary = computeProductNameSummary(results, "Modern");
    expect(summary.totalGenerated).toBe(30);
  });
});

describe("Production Audit - Step 8: UTM Builder & RFC 3986 Compliance", () => {
  it("correctly preserves query parameters, hash fragments, and safely encodes characters", () => {
    const result = validateAndBuildUtm({
      url: "https://example.com/shop?discount=SAVE20#reviews",
      source: "newsletter & updates",
      medium: "email",
      campaign: "summer_launch_2025",
      term: "running shoes",
      content: "hero_banner#1"
    });

    expect(result.isValid).toBe(true);
    expect(result.parametersCount).toBe(5);

    const finalUrl = result.finalUrl;
    expect(finalUrl).toContain("discount=SAVE20");
    expect(finalUrl).toContain("utm_source=newsletter+%26+updates");
    expect(finalUrl).toContain("utm_medium=email");
    expect(finalUrl).toContain("utm_campaign=summer_launch_2025");
    expect(finalUrl).toContain("utm_term=running+shoes");
    expect(finalUrl.endsWith("#reviews")).toBe(true);
    // Never produce ?? or &&
    expect(finalUrl).not.toContain("??");
    expect(finalUrl).not.toContain("&&");
  });

  it("handles offline QR code generation cleanly", () => {
    const qrSvg = generateQrCodeSvg("https://example.com/landing?utm_source=test", 200);
    expect(qrSvg.startsWith("<svg")).toBe(true);
    expect(qrSvg.endsWith("</svg>")).toBe(true);
    expect(qrSvg).toContain('width="200"');
  });
});

describe("Production Audit - CSV Export & Security", () => {
  it("escapes quotes, commas, and newlines per RFC 4180", () => {
    const headers = ["Title", "Description"];
    const rows = [
      ['Title with "Quotes"', 'Description with, comma and\nnewline']
    ];
    const csv = generateCsvString(headers, rows);
    expect(csv).toContain('"Title with ""Quotes"""');
    expect(csv).toContain('"Description with, comma and\nnewline"');
  });
});

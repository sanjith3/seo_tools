import { describe, it, expect } from "vitest";
import {
  getAllCategories,
  getCategoryBySlug,
  getCategoryByToolSlug,
  normalizeCategoryQuery,
  CATEGORY_SLUGS,
  isCategorySlug
} from "@/config/categories";
import { toolsRegistry } from "@/config/tools";

describe("Tool Category Architecture & Registry Tests", () => {
  it("defines the exact required canonical category slugs", () => {
    expect(CATEGORY_SLUGS).toEqual(["technical-seo", "structured-data", "marketing"]);
    expect(isCategorySlug("technical-seo")).toBe(true);
    expect(isCategorySlug("structured-data")).toBe(true);
    expect(isCategorySlug("marketing")).toBe(true);
    expect(isCategorySlug("unrelated-category")).toBe(false);
  });

  it("ensures all 15 tools in toolsRegistry belong to a valid canonical category with no orphans", () => {
    const categories = getAllCategories();
    expect(categories.length).toBe(3);

    const allAssignedSlugs = new Set<string>();
    for (const cat of categories) {
      for (const slug of cat.toolSlugs) {
        allAssignedSlugs.add(slug);
      }
    }

    // Every tool in toolsRegistry must be accounted for
    for (const tool of toolsRegistry) {
      expect(allAssignedSlugs.has(tool.slug)).toBe(true);
      const category = getCategoryByToolSlug(tool.slug);
      expect(category).toBeDefined();
      expect(category?.toolSlugs).toContain(tool.slug);
    }

    expect(allAssignedSlugs.size).toBe(toolsRegistry.length);
  });

  it("verifies Technical SEO category contains the required technical utilities", () => {
    const techCategory = getCategoryBySlug("technical-seo");
    expect(techCategory).toBeDefined();
    expect(techCategory?.h1).toBe("Free Technical SEO Tools");
    expect(techCategory?.metaTitle).toContain("Technical SEO Tools");
    expect(techCategory?.metaDescription.length).toBeGreaterThanOrEqual(130);
    expect(techCategory?.metaDescription.length).toBeLessThanOrEqual(165);
    expect(techCategory?.directIntro).toContain("crawl, understand, and index");

    // Key tools
    expect(techCategory?.toolSlugs).toContain("canonical-tag-generator");
    expect(techCategory?.toolSlugs).toContain("hreflang-generator");
    expect(techCategory?.toolSlugs).toContain("robots-txt-generator");
    expect(techCategory?.toolSlugs).toContain("xml-sitemap-generator");
    expect(techCategory?.toolSlugs).toContain("url-slug-generator");
    expect(techCategory?.toolSlugs).toContain("serp-preview-tool");
    expect(techCategory?.toolSlugs).toContain("keyword-density-checker");
  });

  it("verifies Structured Data category contains schema utilities and makes no false ranking guarantees", () => {
    const schemaCategory = getCategoryBySlug("structured-data");
    expect(schemaCategory).toBeDefined();
    expect(schemaCategory?.h1).toBe("Free Structured Data Tools");
    expect(schemaCategory?.toolSlugs).toContain("faq-schema-generator");
    expect(schemaCategory?.toolSlugs).toContain("schema-markup-generator");

    // Check that directIntro & FAQs do not claim ranking or rich snippet guarantees
    const intro = schemaCategory?.directIntro.toLowerCase() || "";
    expect(intro).not.toContain("guarantee");
    expect(intro).not.toContain("#1");

    for (const faq of schemaCategory?.faqs || []) {
      const answer = faq.answer.toLowerCase();
      expect(answer).not.toContain("guarantees ranking");
      expect(answer).not.toContain("guarantees rich results");
    }
  });

  it("verifies Marketing category contains campaign utilities and proper metadata", () => {
    const marketingCategory = getCategoryBySlug("marketing");
    expect(marketingCategory).toBeDefined();
    expect(marketingCategory?.h1).toBe("Free Marketing Tools");
    expect(marketingCategory?.toolSlugs).toContain("utm-builder");
    expect(marketingCategory?.toolSlugs).toContain("open-graph-generator");
    expect(marketingCategory?.toolSlugs).toContain("meta-description-generator");
    expect(marketingCategory?.toolSlugs).toContain("product-title-generator");
    expect(marketingCategory?.toolSlugs).toContain("product-name-generator");
  });

  it("correctly normalizes legacy query parameter variations to clean category slugs", () => {
    // Technical SEO variations
    expect(normalizeCategoryQuery("Technical SEO")).toBe("technical-seo");
    expect(normalizeCategoryQuery("Technical+SEO")).toBe("technical-seo");
    expect(normalizeCategoryQuery("Technical%20SEO")).toBe("technical-seo");
    expect(normalizeCategoryQuery("technical-seo")).toBe("technical-seo");
    expect(normalizeCategoryQuery("technical seo")).toBe("technical-seo");

    // Structured Data variations
    expect(normalizeCategoryQuery("Structured Data")).toBe("structured-data");
    expect(normalizeCategoryQuery("Structured+Data")).toBe("structured-data");
    expect(normalizeCategoryQuery("Structured%20Data")).toBe("structured-data");
    expect(normalizeCategoryQuery("structured-data")).toBe("structured-data");
    expect(normalizeCategoryQuery("structured data")).toBe("structured-data");

    // Marketing & Ecommerce variations
    expect(normalizeCategoryQuery("Marketing")).toBe("marketing");
    expect(normalizeCategoryQuery("Marketing+Tools")).toBe("marketing");
    expect(normalizeCategoryQuery("marketing-tools")).toBe("marketing");
    expect(normalizeCategoryQuery("Ecommerce")).toBe("marketing");
    expect(normalizeCategoryQuery("Ecommerce+Tools")).toBe("marketing");
    expect(normalizeCategoryQuery("Metadata")).toBe("marketing");

    // Empty or unknown
    expect(normalizeCategoryQuery("")).toBeNull();
    expect(normalizeCategoryQuery(null)).toBeNull();
    expect(normalizeCategoryQuery(undefined)).toBeNull();
    expect(normalizeCategoryQuery("unknown-random-query")).toBeNull();
  });
});

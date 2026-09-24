import { describe, expect, it } from "vitest";
import { generateMetaDescriptions, generateProductNames, generateProductTitles } from "@/lib/generator";
import { faqJson } from "@/lib/faq";
import { buildUtmUrl } from "@/lib/utm";

describe("local generation engines", () => {
  it("generates useful title results", () => { const results = generateProductTitles({ keyword: "running shoes", audience: "new runners", features: "lightweight, breathable", tone: "professional" }); expect(results.length).toBeGreaterThan(2); expect(results[0].text.toLowerCase()).toContain("running shoes"); });
  it("keeps descriptions within common snippet length", () => { expect(generateMetaDescriptions({ keyword: "website design services", tone: "friendly" }).every((item) => item.text.length <= 160)).toBe(true); });
  it("returns distinct product names", () => { const results = generateProductNames({ keyword: "water bottle", tone: "minimal" }); expect(new Set(results.map((item) => item.text)).size).toBe(results.length); });
});

describe("formatters", () => {
  it("creates valid FAQ schema JSON", () => { const parsed = JSON.parse(faqJson([{ id: "1", question: "Can I use it?", answer: "Yes." }])); expect(parsed["@type"]).toBe("FAQPage"); expect(parsed.mainEntity[0].acceptedAnswer.text).toBe("Yes."); });
  it("builds encoded UTM URLs", () => { const result = buildUtmUrl({ url: "https://example.com/page", source: "newsletter", medium: "email", campaign: "launch", term: "", content: "hero link" }); expect(result).toContain("utm_source=newsletter"); expect(result).toContain("utm_content=hero+link"); });
});

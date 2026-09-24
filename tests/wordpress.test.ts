import { describe, it, expect } from "vitest";
import {
  stripHtml,
  formatPostDate,
  getFeaturedImageUrl,
  getAuthorName,
  getPostCategories,
  WordPressPost,
} from "@/lib/wordpress";
import { getMatchedTool } from "@/components/blog/RelatedToolCta";

describe("WordPress Helper Functions", () => {
  it("strips HTML tags and unescapes entities properly", () => {
    const raw = "<p>This is a <strong>test</strong> with &amp; ampersand and &quot;quotes&quot;&#8217;s.</p>";
    const cleaned = stripHtml(raw);
    expect(cleaned).toBe("This is a test with & ampersand and \"quotes\"'s.");
  });

  it("handles empty or null HTML gracefully", () => {
    expect(stripHtml("")).toBe("");
  });

  it("formats ISO dates accurately", () => {
    const formatted = formatPostDate("2026-09-24T05:12:00");
    expect(formatted).toBe("September 24, 2026");
  });

  it("extracts featured image, author, and categories from embedded post object", () => {
    const mockPost: WordPressPost = {
      id: 5,
      date: "2026-09-24T05:12:00",
      date_gmt: "2026-09-24T05:12:00",
      modified: "2026-09-24T05:12:01",
      modified_gmt: "2026-09-24T05:12:01",
      slug: "what-is-faq-schema",
      status: "publish",
      type: "post",
      link: "https://cms.zenvuk.com/what-is-faq-schema/",
      title: { rendered: "What Is FAQ Schema?" },
      content: { rendered: "<p>Hello</p>", protected: false },
      excerpt: { rendered: "<p>Excerpt</p>", protected: false },
      author: 1,
      featured_media: 10,
      categories: [1],
      tags: [],
      _embedded: {
        author: [{ id: 1, name: "sanjithmit" }],
        "wp:featuredmedia": [
          {
            id: 10,
            source_url: "https://cms.zenvuk.com/wp-content/uploads/2026/09/faq.png",
          },
        ],
        "wp:term": [
          [
            {
              id: 1,
              name: "Structured Data",
              slug: "structured-data",
              taxonomy: "category",
            },
          ],
        ],
      },
    };

    expect(getFeaturedImageUrl(mockPost)).toBe("https://cms.zenvuk.com/wp-content/uploads/2026/09/faq.png");
    expect(getAuthorName(mockPost)).toBe("sanjithmit");
    expect(getPostCategories(mockPost)).toEqual([
      { id: 1, name: "Structured Data", slug: "structured-data" },
    ]);
  });
});

describe("RelatedToolCta Contextual Mapping", () => {
  it("maps FAQ content to the FAQ Schema Generator", () => {
    const match = getMatchedTool("what-is-faq-schema What Is FAQ Schema? Blog");
    expect(match.name).toBe("FAQ Schema Generator");
    expect(match.href).toBe("/faq-schema-generator/");
    expect(match.headline).toBe("Try the Free FAQ Schema Generator");
  });

  it("maps UTM content to the UTM Parameter Builder", () => {
    const match = getMatchedTool("how-to-track-campaigns UTM Campaign Tracking");
    expect(match.name).toBe("UTM Parameter Builder");
    expect(match.href).toBe("/utm-builder/");
  });

  it("maps robots content to the Robots.txt Generator", () => {
    const match = getMatchedTool("crawl-budget robots-txt disallow");
    expect(match.name).toBe("Robots.txt Generator");
    expect(match.href).toBe("/robots-txt-generator/");
  });

  it("maps canonical content to the Canonical Tag Generator", () => {
    const match = getMatchedTool("duplicate-content canonical-urls");
    expect(match.name).toBe("Canonical Tag Generator");
    expect(match.href).toBe("/canonical-tag-generator/");
  });

  it("maps hreflang content to the Hreflang Generator", () => {
    const match = getMatchedTool("international-seo hreflang x-default");
    expect(match.name).toBe("Hreflang Generator");
    expect(match.href).toBe("/hreflang-generator/");
  });

  it("maps sitemap content to the XML Sitemap Generator", () => {
    const match = getMatchedTool("xml-sitemap indexing search-consoles");
    expect(match.name).toBe("XML Sitemap Generator");
    expect(match.href).toBe("/xml-sitemap-generator/");
  });

  it("maps general schema content to the Schema Markup Generator", () => {
    const match = getMatchedTool("organization-schema structured data json-ld");
    expect(match.name).toBe("Schema Markup Generator");
    expect(match.href).toBe("/schema-markup-generator/");
  });

  it("falls back to all tools directory for unmatched topics", () => {
    const match = getMatchedTool("random topic about general marketing advice");
    expect(match.href).toBe("/tools/");
  });
});

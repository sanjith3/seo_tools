import { describe, expect, it } from "vitest";
import {
  generateLLMSTxt,
  validateLLMSTxt,
  LLMSTxtData
} from "@/lib/generators/llms-txt";

describe("LLMS.txt Generator & Validator", () => {
  const sampleData: LLMSTxtData = {
    siteName: "Acme Cloud",
    siteDescription: "High-performance serverless cloud infrastructure.",
    canonicalUrl: "https://acme.com",
    documentationUrl: "https://acme.com/docs",
    sections: [
      {
        heading: "Core Documentation",
        resources: [
          { title: "Quickstart", url: "https://acme.com/docs/quickstart", description: "Get running in 5 minutes." },
          { title: "CLI Tool", url: "https://acme.com/docs/cli", description: "Command-line tool reference." }
        ]
      }
    ]
  };

  it("generates clean Markdown with H1, blockquote, and resource links", () => {
    const output = generateLLMSTxt(sampleData);
    expect(output).toContain("# Acme Cloud");
    expect(output).toContain("> High-performance serverless cloud infrastructure.");
    expect(output).toContain("Website: https://acme.com");
    expect(output).toContain("Documentation: https://acme.com/docs");
    expect(output).toContain("## Core Documentation");
    expect(output).toContain("- [Quickstart](https://acme.com/docs/quickstart): Get running in 5 minutes.");
    expect(output).toContain("- [CLI Tool](https://acme.com/docs/cli): Command-line tool reference.");
  });

  it("handles resources without description cleanly", () => {
    const data: LLMSTxtData = {
      siteName: "Simple Site",
      siteDescription: "Simple summary",
      canonicalUrl: "https://example.com",
      sections: [
        {
          heading: "Links",
          resources: [{ title: "Blog", url: "https://example.com/blog" }]
        }
      ]
    };
    const output = generateLLMSTxt(data);
    expect(output).toContain("- [Blog](https://example.com/blog)");
    expect(output).not.toContain(": undefined");
  });

  it("validates missing site name and invalid URL protocols", () => {
    const invalid: LLMSTxtData = {
      siteName: "",
      siteDescription: "Test",
      canonicalUrl: "invalid-url-protocol",
      sections: []
    };
    const result = validateLLMSTxt(invalid);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Missing website name header.");
    expect(result.errors.some((e) => e.includes("http:// or https://"))).toBe(true);
  });

  it("flags duplicate URLs across sections", () => {
    const dupData: LLMSTxtData = {
      siteName: "Dup Test",
      siteDescription: "Desc",
      canonicalUrl: "https://dup.com",
      sections: [
        {
          heading: "Section 1",
          resources: [{ title: "Item 1", url: "https://dup.com/page1" }]
        },
        {
          heading: "Section 2",
          resources: [{ title: "Item 2", url: "https://dup.com/page1" }]
        }
      ]
    };
    const result = validateLLMSTxt(dupData);
    expect(result.warnings.some((w) => w.includes("Duplicate URL detected"))).toBe(true);
  });
});

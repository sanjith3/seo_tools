import { describe, it, expect } from "vitest";
import {
  cleanCanonicalUrl,
  analyzeCanonical,
  CanonicalConfig,
} from "../src/lib/generators/canonical";

describe("canonical tag generator and analyzer", () => {
  it("cleans UTM tracking query parameters and strips fragments", () => {
    const raw = "https://zenvuk.com/tools/?utm_source=twitter&utm_medium=social#overview";
    const cleaned = cleanCanonicalUrl(raw, {
      cleanParameters: true,
      stripFragments: true,
    });

    expect(cleaned).toBe("https://zenvuk.com/tools/");
  });

  it("enforces https and trailing slash standardization", () => {
    const raw = "http://zenvuk.com/blog/seo-tips";
    const cleaned = cleanCanonicalUrl(raw, {
      enforceHttps: true,
      enforceTrailingSlash: "add",
    });

    expect(cleaned).toBe("https://zenvuk.com/blog/seo-tips/");
  });

  it("identifies self-referencing canonical URLs", () => {
    const config: CanonicalConfig = {
      sourceUrl: "https://zenvuk.com/about/",
      preferredCanonicalUrl: "https://zenvuk.com/about/",
      cleanParameters: true,
      enforceHttps: true,
      enforceTrailingSlash: "preserve",
      enforceLowercase: true,
      stripFragments: true,
    };

    const analysis = analyzeCanonical(config);
    expect(analysis.isSelfReferencing).toBe(true);
    expect(analysis.generatedTag).toBe('<link rel="canonical" href="https://zenvuk.com/about/" />');
    expect(analysis.httpHeader).toBe('Link: <https://zenvuk.com/about/>; rel="canonical"');
  });

  it("warns about relative URLs and missing protocols", () => {
    const config: CanonicalConfig = {
      sourceUrl: "https://zenvuk.com/page",
      preferredCanonicalUrl: "/page",
      cleanParameters: false,
      enforceHttps: false,
      enforceTrailingSlash: "preserve",
      enforceLowercase: false,
      stripFragments: true,
    };

    const analysis = analyzeCanonical(config);
    const hasRelativeError = analysis.issues.some((i) => i.message.includes("absolute"));
    expect(hasRelativeError).toBe(true);
  });
});

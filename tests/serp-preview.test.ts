import { describe, it, expect } from "vitest";
import {
  estimatePixelWidth,
  analyzeSERP,
} from "../src/lib/generators/serp-preview";

describe("serp-preview logic", () => {
  it("accurately calculates pixel width for wide vs narrow characters", () => {
    // Uppercase 'W' is wide (~19px in Arial 20), lowercase 'i' is narrow (~5px in Arial 20)
    const wideWidth = estimatePixelWidth("WWW", "title");
    const narrowWidth = estimatePixelWidth("iii", "title");

    expect(wideWidth).toBeGreaterThan(narrowWidth);
    expect(wideWidth).toBe(57);
    expect(narrowWidth).toBe(15);
  });

  it("detects desktop title truncation at ~600px", () => {
    // Short title under 600px
    const shortResult = analyzeSERP(
      {
        title: "Best SEO Tools 2026",
        url: "https://zenvuk.com/tools/",
        description: "Explore our collection of 100% free web utilities.",
      },
      "desktop"
    );

    expect(shortResult.title.isTruncated).toBe(false);
    expect(shortResult.title.pixelWidth).toBeLessThan(600);
    expect(shortResult.title.display).toBe("Best SEO Tools 2026");

    // Excessively long title exceeding 600px
    const longTitle =
      "Supercalifragilisticexpialidocious Long Title That Will Exceed Six Hundred Pixels Easily In Google Desktop Search Engine Results";
    const longResult = analyzeSERP(
      {
        title: longTitle,
        url: "https://zenvuk.com/tools/",
        description: "Test description",
      },
      "desktop"
    );

    expect(longResult.title.isTruncated).toBe(true);
    expect(longResult.title.pixelWidth).toBeGreaterThan(600);
    expect(longResult.title.display.endsWith(" ...")).toBe(true);
  });

  it("handles mobile pixel limit (~580px for title, ~680px for description)", () => {
    const mobileResult = analyzeSERP(
      {
        title: "A Somewhat Long Title That Might Fit On Desktop But Sits Right On The Edge For Mobile Viewports",
        url: "https://zenvuk.com/mobile-test",
        description:
          "This is a longer meta description snippet designed to test how mobile pixel boundaries (~680px) truncate text earlier than desktop viewports (~960px).",
      },
      "mobile"
    );

    expect(mobileResult.title.maxPixels).toBe(580);
    expect(mobileResult.description.maxPixels).toBe(680);
  });

  it("correctly generates breadcrumb paths from URL", () => {
    const result = analyzeSERP(
      {
        title: "Test Page",
        url: "https://zenvuk.com/tools/seo/serp-preview/",
        description: "Test",
      },
      "desktop"
    );

    expect(result.domain).toBe("zenvuk.com");
    expect(result.displayUrl).toBe("zenvuk.com > tools > seo > serp-preview");
  });
});

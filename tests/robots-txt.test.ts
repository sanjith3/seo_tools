import { describe, it, expect } from "vitest";
import {
  generateRobotsTxt,
  validateRobotsTxt,
  ROBOTS_PRESETS,
} from "../src/lib/generators/robots-txt";

describe("robots-txt generator", () => {
  it("generates standard default robots.txt for all crawlers", () => {
    const config = ROBOTS_PRESETS.Default;
    const output = generateRobotsTxt(config);

    expect(output).toContain("User-agent: *");
    expect(output).toContain("Disallow: /admin/");
    expect(output).toContain("Disallow: /api/");
    expect(output).toContain("Allow: /");
    expect(output).toContain("Sitemap: https://zenvuk.com/sitemap.xml");
  });

  it("handles empty and custom allow rules", () => {
    const output = generateRobotsTxt({
      groups: [
        {
          id: "1",
          userAgent: "Googlebot",
          allow: ["/api/public/"],
          disallow: ["/api/"],
        },
      ],
      sitemaps: [],
    });

    expect(output).toContain("User-agent: Googlebot");
    expect(output).toContain("Allow: /api/public/");
    expect(output).toContain("Disallow: /api/");
  });

  it("validates dangerous disallow all configuration", () => {
    const validation = validateRobotsTxt({
      groups: [
        {
          id: "1",
          userAgent: "*",
          allow: [],
          disallow: ["/"],
        },
      ],
      sitemaps: [],
    });

    expect(validation.hasBlockAllWarning).toBe(true);
    const dangerWarning = validation.warnings.find((w) => w.includes("blocks search engines"));
    expect(dangerWarning).toBeDefined();
  });

  it("warns about missing leading slashes in path directives", () => {
    const validation = validateRobotsTxt({
      groups: [
        {
          id: "1",
          userAgent: "Bingbot",
          allow: [],
          disallow: ["bad-path/"],
        },
      ],
      sitemaps: [],
    });

    const pathWarning = validation.warnings.find((w) => w.includes("should start with a forward slash"));
    expect(pathWarning).toBeDefined();
  });
});

import { describe, expect, it } from "vitest";
import { buildUtmUrl, validateAndBuildUtm } from "@/lib/generators/utm";

describe("UTM Parameter Builder Engine", () => {
  it("builds basic UTM URLs correctly", () => {
    const url = buildUtmUrl({
      url: "https://example.com/landing",
      source: "google",
      medium: "cpc",
      campaign: "summer_sale",
      term: "running_shoes",
      content: "banner_v1"
    });

    expect(url).toBe(
      "https://example.com/landing?utm_source=google&utm_medium=cpc&utm_campaign=summer_sale&utm_term=running_shoes&utm_content=banner_v1"
    );
  });

  it("handles existing query parameters without duplication or malformed strings", () => {
    const url = buildUtmUrl({
      url: "https://example.com/store?category=shoes&ref=affiliate",
      source: "newsletter",
      medium: "email",
      campaign: "spring2025"
    });

    expect(url).not.toContain("??");
    expect(url).not.toContain("&&");
    expect(url).toContain("category=shoes");
    expect(url).toContain("ref=affiliate");
    expect(url).toContain("utm_source=newsletter");
    expect(url).toContain("utm_medium=email");
  });

  it("correctly restores URL fragments/hashes at the end of the URL", () => {
    const url = buildUtmUrl({
      url: "https://example.com/pricing#enterprise-tier",
      source: "linkedin",
      medium: "paid_social",
      campaign: "q3_b2b"
    });

    expect(url.endsWith("#enterprise-tier")).toBe(true);
    expect(url).toContain("utm_source=linkedin");
    expect(url).toContain("utm_medium=paid_social");
    expect(url).toContain("utm_campaign=q3_b2b");
  });

  it("handles spaces, unicode, and special characters cleanly", () => {
    const url = buildUtmUrl({
      url: "https://example.com/café-menu",
      source: "social share",
      medium: "cpc & ads",
      campaign: "fête-2025"
    });

    expect(url).toContain("caf%C3%A9-menu");
    expect(url).toContain("utm_source=social+share");
    expect(url).toContain("utm_medium=cpc+%26+ads");
  });

  it("validates required parameters and returns clear error messaging", () => {
    const incomplete = validateAndBuildUtm({
      url: "https://example.com",
      source: "google",
      medium: "",
      campaign: ""
    });

    expect(incomplete.isValid).toBe(false);
    expect(incomplete.error).toContain("Complete required campaign fields");

    const complete = validateAndBuildUtm({
      url: "https://example.com",
      source: "google",
      medium: "cpc",
      campaign: "launch"
    });

    expect(complete.isValid).toBe(true);
    expect(complete.error).toBeUndefined();
    expect(complete.parametersCount).toBe(3);
  });
});

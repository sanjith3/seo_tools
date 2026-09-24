import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  isValidPublisherClient,
  formatPublisherClient,
  isAdSenseActive,
  getSlotIdForPlacement,
  adsenseConfig,
} from "@/config/adsense";
import { GET as getAdsTxt } from "@/app/ads.txt/route";

describe("AdSense Configuration & Safety Guards", () => {
  it("strictly validates publisher client IDs", () => {
    // Valid format
    expect(isValidPublisherClient("ca-pub-1234567890123456")).toBe(false); // contains 1234 test sequence
    expect(isValidPublisherClient("ca-pub-9876543210987654")).toBe(true);
    expect(isValidPublisherClient("ca-pub-5555666677778888")).toBe(true);

    // Invalid / Dummy formats
    expect(isValidPublisherClient("")).toBe(false);
    expect(isValidPublisherClient("ca-pub-")).toBe(false);
    expect(isValidPublisherClient("ca-pub-0000000000000000")).toBe(false);
    expect(isValidPublisherClient("pub-123")).toBe(false);
    expect(isValidPublisherClient("not-a-client")).toBe(false);
  });

  it("formats publisher clients correctly with ca-pub prefix", () => {
    expect(formatPublisherClient("pub-9876543210987654")).toBe("ca-pub-9876543210987654");
    expect(formatPublisherClient("ca-pub-9876543210987654")).toBe("ca-pub-9876543210987654");
    expect(formatPublisherClient("")).toBe("");
  });

  it("keeps AdSense disabled by default", () => {
    // Current environment configuration
    expect(adsenseConfig.enabled).toBe(false);
    expect(isAdSenseActive()).toBe(false);
  });

  it("safely returns undefined for unconfigured placements", () => {
    expect(getSlotIdForPlacement(undefined)).toBeUndefined();
    expect(getSlotIdForPlacement("tool-after-workspace")).toBeUndefined();
    expect(getSlotIdForPlacement("blog-after-intro")).toBeUndefined();
  });
});

describe("ads.txt Route Handler Safety", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("returns clean inactive notice without fake publisher IDs when monetization is inactive", async () => {
    process.env.ADSENSE_ADS_TXT = "";
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT = "";

    const response = await getAdsTxt();
    expect(response.status).toBe(200);
    const text = await response.text();

    expect(text).toContain("# Zenvuk ads.txt");
    expect(text).toContain("Advertising monetization is not currently active.");
    // Must NOT contain any fake publisher ID
    expect(text).not.toContain("pub-1234567890123456");
    expect(text).not.toContain("pub-0000000000000000");
  });

  it("outputs valid ads.txt entry when ADSENSE_ADS_TXT is explicitly configured", async () => {
    process.env.ADSENSE_ADS_TXT = "google.com, pub-9876543210987654, DIRECT, f08c47fec0942fa0";

    const response = await getAdsTxt();
    const text = await response.text();

    expect(text.trim()).toBe("google.com, pub-9876543210987654, DIRECT, f08c47fec0942fa0");
  });

  it("outputs valid ads.txt entry when valid publisher client is configured", async () => {
    process.env.ADSENSE_ADS_TXT = "";
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT = "ca-pub-9876543210987654";

    const response = await getAdsTxt();
    const text = await response.text();

    expect(text.trim()).toBe("google.com, pub-9876543210987654, DIRECT, f08c47fec0942fa0");
  });
});

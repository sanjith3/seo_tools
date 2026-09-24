import { describe, expect, it } from "vitest";
import { generateQrCodeSvg } from "@/lib/generators/qr-code";

describe("Client-Side QR Code Generator", () => {
  it("generates a valid SVG string without external requests", () => {
    const svg = generateQrCodeSvg("https://zenvuk.com/utm-builder/?utm_source=test");

    expect(svg).toContain("<svg");
    expect(svg).toContain("</svg>");
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
    expect(svg).toContain("<rect");
  });

  it("handles various URL lengths up to common campaign parameters", () => {
    const longUrl = "https://example.com/landing-page-with-a-very-long-url-path?utm_source=google_ads&utm_medium=paid_search&utm_campaign=black_friday_annual_clearance_sale_2025&utm_content=discount_code_50_off";
    const svg = generateQrCodeSvg(longUrl);

    expect(svg).toContain("<svg");
    expect(svg).toContain("</svg>");
  });
});

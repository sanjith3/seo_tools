import { describe, expect, it } from "vitest";
import {
  generateSchemaJsonLd,
  validateSchema,
  formatSchemaHtmlScript,
  SchemaType
} from "@/lib/generators/schema-markup";

describe("Schema Markup Generator Engine", () => {
  it("generates valid Organization JSON-LD with social links", () => {
    const orgData = {
      name: "Acme Corp",
      url: "https://acme.com",
      logo: "https://acme.com/logo.png",
      email: "contact@acme.com",
      sameAs: "https://twitter.com/acme\nhttps://linkedin.com/company/acme"
    };

    const output = generateSchemaJsonLd("Organization", orgData);
    const parsed = JSON.parse(output);

    expect(parsed["@context"]).toBe("https://schema.org");
    expect(parsed["@type"]).toBe("Organization");
    expect(parsed.name).toBe("Acme Corp");
    expect(parsed.url).toBe("https://acme.com");
    expect(parsed.sameAs).toEqual(["https://twitter.com/acme", "https://linkedin.com/company/acme"]);
  });

  it("generates valid Product JSON-LD with offer pricing", () => {
    const productData = {
      name: "Ergonomic Keyboard",
      price: "129.99",
      priceCurrency: "USD",
      brand: "KeyCraft",
      sku: "KC-ERG-01"
    };

    const output = generateSchemaJsonLd("Product", productData);
    const parsed = JSON.parse(output);

    expect(parsed["@type"]).toBe("Product");
    expect(parsed.name).toBe("Ergonomic Keyboard");
    expect(parsed.brand).toEqual({ "@type": "Brand", name: "KeyCraft" });
    expect(parsed.offers).toEqual({
      "@type": "Offer",
      price: "129.99",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock"
    });
  });

  it("generates minified output without whitespace when requested", () => {
    const minified = generateSchemaJsonLd(
      "WebSite",
      { name: "Zenvuk", url: "https://zenvuk.com" },
      true
    );
    expect(minified).not.toContain("\n");
    expect(JSON.parse(minified)["@type"]).toBe("WebSite");
  });

  it("wraps JSON-LD correctly inside script tags", () => {
    const json = '{"@type":"Organization"}';
    const html = formatSchemaHtmlScript(json);
    expect(html).toBe('<script type="application/ld+json">\n{"@type":"Organization"}\n</script>');
  });

  it("flags missing required fields accurately", () => {
    const invalidOrg = validateSchema("Organization", { name: "" });
    expect(invalidOrg.isValid).toBe(false);
    expect(invalidOrg.missingFields).toContain("Organization Name");
    expect(invalidOrg.missingFields).toContain("Website URL");

    const validOrg = validateSchema("Organization", {
      name: "Test Corp",
      url: "https://test.com"
    });
    expect(validOrg.isValid).toBe(true);
    expect(validOrg.missingFields).toHaveLength(0);
  });

  it("flags malformed URLs without protocol", () => {
    const malformed = validateSchema("Organization", {
      name: "Acme",
      url: "not-a-valid-url"
    });
    expect(malformed.isValid).toBe(false);
    expect(malformed.errors.some((e) => e.includes("http:// or https://"))).toBe(true);
  });
});

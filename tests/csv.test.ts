import { describe, expect, it } from "vitest";
import { escapeCsvField, generateCsvString } from "@/lib/export/csv";

describe("CSV Export Utilities", () => {
  it("escapes fields containing commas, double quotes, and newlines properly", () => {
    expect(escapeCsvField('Hello, World')).toBe('"Hello, World"');
    expect(escapeCsvField('Product with "Quotes" inside')).toBe('"Product with ""Quotes"" inside"');
    expect(escapeCsvField("Multi-line\nText")).toBe('"Multi-line\nText"');
    expect(escapeCsvField("SimpleText")).toBe('"SimpleText"');
    expect(escapeCsvField(null)).toBe('""');
    expect(escapeCsvField(1234)).toBe('"1234"');
  });

  it("generates an RFC 4180 compliant CSV string", () => {
    const headers = ["ID", "Title", "Score"];
    const rows = [
      [1, "Product 1, Edition A", 95],
      [2, 'Product with "Specs"', 88]
    ];

    const csv = generateCsvString(headers, rows);
    const lines = csv.split("\r\n");

    expect(lines).toHaveLength(3);
    expect(lines[0]).toBe('"ID","Title","Score"');
    expect(lines[1]).toBe('"1","Product 1, Edition A","95"');
    expect(lines[2]).toBe('"2","Product with ""Specs""","88"');
  });
});

import { describe, expect, it } from "vitest";
import {
  generateFAQSchemaJson,
  validateFAQItems,
  generateFAQSchemaObject
} from "@/lib/generators/faq-schema";

describe("FAQ Schema Generator Engine", () => {
  it("generates valid Schema.org FAQPage JSON-LD structure", () => {
    const items = [
      { id: "1", question: "How long is shipping?", answer: "2 to 3 days." },
      { id: "2", question: "Can I return an item?", answer: "Yes within 30 days." }
    ];

    const json = generateFAQSchemaJson(items);
    const parsed = JSON.parse(json);

    expect(parsed["@context"]).toBe("https://schema.org");
    expect(parsed["@type"]).toBe("FAQPage");
    expect(parsed.mainEntity).toHaveLength(2);
    expect(parsed.mainEntity[0]["@type"]).toBe("Question");
    expect(parsed.mainEntity[0].name).toBe("How long is shipping?");
    expect(parsed.mainEntity[0].acceptedAnswer["@type"]).toBe("Answer");
    expect(parsed.mainEntity[0].acceptedAnswer.text).toBe("2 to 3 days.");
  });

  it("handles minification and script tag options correctly", () => {
    const items = [{ id: "1", question: "Is this free?", answer: "Yes." }];

    const scriptWrapped = generateFAQSchemaJson(items, { includeScriptTag: true });
    expect(scriptWrapped).toContain('<script type="application/ld+json">');
    expect(scriptWrapped).toContain("</script>");

    const minified = generateFAQSchemaJson(items, { minified: true });
    expect(minified).not.toContain("\n");
  });

  it("safely escapes double quotes and special characters in JSON", () => {
    const items = [
      {
        id: "1",
        question: 'What is the "best" option for 5\'10" users?',
        answer: 'You should choose "Model X" & save.'
      }
    ];

    const json = generateFAQSchemaJson(items);
    expect(() => JSON.parse(json)).not.toThrow();
    const parsed = JSON.parse(json);
    expect(parsed.mainEntity[0].name).toBe('What is the "best" option for 5\'10" users?');
  });

  it("validates empty questions and answers properly", () => {
    const invalidItems = [
      { id: "1", question: "", answer: "" },
      { id: "2", question: "Valid question?", answer: "" },
      { id: "3", question: "", answer: "Answer with no question." }
    ];

    const validation = validateFAQItems(invalidItems);
    expect(validation.isValid).toBe(false);
    expect(validation.errors).toHaveLength(3);
    expect(validation.validCount).toBe(0);

    const mixedItems = [
      { id: "1", question: "Good question?", answer: "Good answer." },
      { id: "2", question: "", answer: "Missing question." }
    ];
    const mixedValidation = validateFAQItems(mixedItems);
    expect(mixedValidation.isValid).toBe(false);
    expect(mixedValidation.validCount).toBe(1);
  });
});

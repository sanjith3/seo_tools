import { z } from "zod";
import {
  generateProductTitles as newGenerateProductTitles,
  GeneratedProductTitle
} from "./generators/product-title";
import {
  generateMetaDescriptions as newGenerateMetaDescriptions,
  GeneratedMetaDescription
} from "./generators/meta-description";
import {
  generateProductNames as newGenerateProductNames,
  GeneratedProductName
} from "./generators/product-name";

export const generatorInputSchema = z.object({
  keyword: z.string().trim().min(2).max(120),
  audience: z.string().trim().max(80).optional().default("shoppers"),
  features: z.string().trim().max(180).optional().default(""),
  tone: z.enum(["professional", "friendly", "bold", "minimal"]).default("professional")
});

export interface GeneratedResult {
  text: string;
  score: number;
  reason: string;
}

export function generateProductTitles(
  input: z.input<typeof generatorInputSchema>
): GeneratedResult[] {
  const data = generatorInputSchema.parse(input);
  const toneMap: Record<string, "Professional" | "Premium" | "Simple" | "Descriptive" | "SEO Focused"> = {
    professional: "Professional",
    friendly: "Simple",
    bold: "Premium",
    minimal: "Simple"
  };

  const titles = newGenerateProductTitles({
    productName: data.keyword,
    primaryKeyword: data.keyword,
    targetAudience: data.audience,
    feature1: data.features.split(",")[0]?.trim(),
    feature2: data.features.split(",")[1]?.trim(),
    marketplace: "General Ecommerce",
    tone: toneMap[data.tone] || "Professional",
    maxLength: 70
  });

  return titles.map((t) => ({
    text: t.title,
    score: t.score,
    reason: t.reason
  }));
}

export function generateMetaDescriptions(
  input: z.input<typeof generatorInputSchema>
): GeneratedResult[] {
  const data = generatorInputSchema.parse(input);
  const descriptions = newGenerateMetaDescriptions({
    pageTitle: data.keyword,
    primaryKeyword: data.keyword,
    pagePurpose: "Product Page",
    mainBenefit: data.features || "quality and practical performance",
    cta: "Learn more today",
    tone: "Professional",
    targetLength: 155
  });

  return descriptions.map((d) => ({
    text: d.description,
    score: d.score,
    reason: d.reason
  }));
}

export function generateProductNames(
  input: z.input<typeof generatorInputSchema>
): GeneratedResult[] {
  const data = generatorInputSchema.parse(input);
  const names = newGenerateProductNames({
    category: "General",
    productType: "Product",
    keyword: data.keyword,
    concept: data.features || data.keyword,
    targetAudience: data.audience,
    style: "Modern",
    lengthFilter: "Any"
  });

  return names.map((n) => ({
    text: n.name,
    score: n.score,
    reason: n.reason
  }));
}

export {
  newGenerateProductTitles,
  newGenerateMetaDescriptions,
  newGenerateProductNames
};
export type { GeneratedProductTitle, GeneratedMetaDescription, GeneratedProductName };

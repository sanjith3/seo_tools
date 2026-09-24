import {
  toolsRegistry,
  getToolBySlug,
  getRelatedTools,
  ToolSlug,
  ToolDefinition,
  ToolCategory
} from "@/config/tools";

export type { ToolSlug, ToolDefinition, ToolCategory };

// Maintain backward compatibility for existing references
export interface ToolInfo {
  slug: ToolSlug;
  name: string;
  short: string;
  description: string;
  icon: string;
  color: string;
  category: ToolCategory;
}

export const tools: ToolInfo[] = toolsRegistry.map((t) => ({
  slug: t.slug,
  name: t.name,
  short: t.short,
  description: t.description,
  icon: t.slug === "faq-schema-generator" ? "?" : t.slug === "product-title-generator" ? "T" : t.slug === "meta-description-generator" ? "M" : t.slug === "product-name-generator" ? "N" : "↗",
  color: t.color,
  category: t.category
}));

export const toolBySlug = (slug: string) => toolsRegistry.find((tool) => tool.slug === slug);
export { toolsRegistry, getToolBySlug, getRelatedTools };

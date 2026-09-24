export type ToolSlug =
  | "faq-schema-generator"
  | "product-title-generator"
  | "meta-description-generator"
  | "product-name-generator"
  | "utm-builder"
  | "schema-markup-generator"
  | "llms-txt-generator"
  | "hreflang-generator"
  | "robots-txt-generator"
  | "serp-preview-tool"
  | "open-graph-generator"
  | "canonical-tag-generator"
  | "keyword-density-checker"
  | "url-slug-generator"
  | "xml-sitemap-generator";

export type ToolCategory =
  | "Technical SEO"
  | "Structured Data"
  | "Metadata & Social"
  | "Ecommerce Tools"
  | "Marketing Tools"
  | "Content Analysis"
  | "AI / Machine Readability";

export interface ToolDefinition {
  slug: ToolSlug;
  name: string;
  h1: string;
  short: string;
  description: string;
  category: ToolCategory;
  iconName:
    | "HelpCircle"
    | "Type"
    | "FileText"
    | "Sparkles"
    | "Compass"
    | "Code2"
    | "Bot"
    | "Globe"
    | "ShieldAlert"
    | "Eye"
    | "Share2"
    | "Link2"
    | "BarChart3"
    | "FileCode"
    | "Network";
  color: string;
  badgeBg: string;
  badgeText: string;
  targetKeyword: string;
  supportingTopics: string[];
  relatedSlugs: ToolSlug[];
  metaTitle: string;
  metaDescription: string;
}

export const toolsRegistry: ToolDefinition[] = [
  {
    slug: "faq-schema-generator",
    name: "FAQ Schema Generator",
    h1: "FAQ Schema Generator",
    short: "Create valid FAQPage JSON-LD",
    description:
      "Turn your questions and answers into clean, copy-ready FAQPage JSON-LD structured data markup.",
    category: "Structured Data",
    iconName: "HelpCircle",
    color: "bg-indigo-50 text-indigo-700 border-indigo-100",
    badgeBg: "bg-indigo-50",
    badgeText: "text-indigo-700",
    targetKeyword: "FAQ Schema Generator",
    supportingTopics: [
      "FAQ schema",
      "FAQ schema markup",
      "FAQ JSON-LD",
      "FAQPage schema",
      "JSON-LD FAQ generator"
    ],
    relatedSlugs: ["schema-markup-generator", "meta-description-generator", "product-title-generator"],
    metaTitle: "FAQ Schema Generator – Free JSON-LD Tool | Zenvuk",
    metaDescription:
      "Generate valid FAQPage JSON-LD structured data markup for Google search. Includes live preview, instant validation, minification, and one-click copy."
  },
  {
    slug: "schema-markup-generator",
    name: "Schema Markup Generator",
    h1: "Schema Markup Generator",
    short: "Multi-schema JSON-LD builder",
    description:
      "Build valid Schema.org JSON-LD structured data for 15 entity types including Organization, Product, Article, and LocalBusiness.",
    category: "Structured Data",
    iconName: "Code2",
    color: "bg-indigo-50 text-indigo-700 border-indigo-100",
    badgeBg: "bg-indigo-50",
    badgeText: "text-indigo-700",
    targetKeyword: "Schema Markup Generator",
    supportingTopics: [
      "schema generator",
      "structured data generator",
      "json ld generator",
      "schema code generator",
      "schema.org generator"
    ],
    relatedSlugs: ["faq-schema-generator", "hreflang-generator", "canonical-tag-generator"],
    metaTitle: "Schema Markup Generator – Free JSON-LD Tool | Zenvuk",
    metaDescription:
      "Generate valid Schema.org JSON-LD structured data for 15 entity types including Organization, LocalBusiness, Article, and Product with live validation."
  },
  {
    slug: "product-title-generator",
    name: "Product Title Generator",
    h1: "Product Title Generator",
    short: "Write search-friendly product titles",
    description:
      "Generate 20 optimized ecommerce product title variations tailored for Amazon, eBay, Shopify, WooCommerce, and Etsy.",
    category: "Ecommerce Tools",
    iconName: "Type",
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    targetKeyword: "Product Title Generator",
    supportingTopics: [
      "ecommerce product title generator",
      "product listing title generator",
      "Amazon title generator",
      "eBay product title generator",
      "Shopify title generator"
    ],
    relatedSlugs: ["product-name-generator", "meta-description-generator", "utm-builder"],
    metaTitle: "Product Title Generator – Free Ecommerce SEO Tool | Zenvuk",
    metaDescription:
      "Generate 20 structured, search-friendly product title variations for Amazon, eBay, Shopify, and Etsy with instant Zenvuk SEO scoring."
  },
  {
    slug: "meta-description-generator",
    name: "Meta Description Generator",
    h1: "Meta Description Generator",
    short: "Create click-worthy search snippets",
    description:
      "Create concise, targeted meta descriptions with real-time character counts, SERP preview, and paired title generation.",
    category: "Metadata & Social",
    iconName: "FileText",
    color: "bg-amber-50 text-amber-700 border-amber-100",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    targetKeyword: "Meta Description Generator",
    supportingTopics: [
      "generate meta description",
      "meta description creator",
      "SEO meta description generator",
      "meta title and description generator"
    ],
    relatedSlugs: ["serp-preview-tool", "open-graph-generator", "product-title-generator"],
    metaTitle: "Meta Description Generator – Free SEO Tool | Zenvuk",
    metaDescription:
      "Generate concise, character-optimized meta descriptions with a live Google SERP preview, CTA integration, and zero keyword stuffing in your browser."
  },
  {
    slug: "serp-preview-tool",
    name: "SERP Preview Tool",
    h1: "SERP Preview Tool",
    short: "Google search snippet simulator",
    description:
      "Simulate how your page title, URL, and meta description render in Google search results across desktop and mobile devices.",
    category: "Metadata & Social",
    iconName: "Eye",
    color: "bg-sky-50 text-sky-700 border-sky-100",
    badgeBg: "bg-sky-50",
    badgeText: "text-sky-700",
    targetKeyword: "SERP Preview Tool",
    supportingTopics: [
      "google serp preview",
      "serp snippet preview",
      "google snippet preview",
      "title tag preview tool",
      "serp pixel checker"
    ],
    relatedSlugs: ["meta-description-generator", "open-graph-generator", "canonical-tag-generator"],
    metaTitle: "SERP Preview Tool – Google Snippet Simulator | Zenvuk",
    metaDescription:
      "Preview Google desktop and mobile search snippets with pixel width checking, character counters, and realistic snippet rendering in your browser."
  },
  {
    slug: "open-graph-generator",
    name: "Open Graph Generator",
    h1: "Open Graph Generator",
    short: "Social media meta tags",
    description:
      "Generate Facebook Open Graph and Twitter/X card meta tags with live visual feed card previews and ready-to-paste HTML.",
    category: "Metadata & Social",
    iconName: "Share2",
    color: "bg-blue-50 text-blue-700 border-blue-100",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-700",
    targetKeyword: "Open Graph Generator",
    supportingTopics: [
      "open graph meta tag generator",
      "og tag generator",
      "facebook open graph generator",
      "twitter card generator",
      "social share meta generator"
    ],
    relatedSlugs: ["serp-preview-tool", "meta-description-generator", "canonical-tag-generator"],
    metaTitle: "Open Graph Generator – OG & Twitter Card Tags | Zenvuk",
    metaDescription:
      "Generate valid Open Graph and Twitter Card HTML meta tags with live visual social feed previews. Fast, free, and browser-based."
  },
  {
    slug: "canonical-tag-generator",
    name: "Canonical Tag Generator",
    h1: "Canonical Tag Generator",
    short: "Rel-canonical tag creator",
    description:
      "Generate and validate rel=\"canonical\" HTML link tags to prevent duplicate content indexing issues across your website.",
    category: "Technical SEO",
    iconName: "Link2",
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    targetKeyword: "Canonical Tag Generator",
    supportingTopics: [
      "canonical url generator",
      "rel canonical generator",
      "canonical tag checker",
      "self referencing canonical generator",
      "canonical html generator"
    ],
    relatedSlugs: ["robots-txt-generator", "xml-sitemap-generator", "hreflang-generator"],
    metaTitle: "Canonical Tag Generator & Checker – Free Tool | Zenvuk",
    metaDescription:
      "Create and check valid rel=\"canonical\" HTML link tags. Detect query string issues, fragment hash bugs, and self-referencing matches instantly."
  },
  {
    slug: "robots-txt-generator",
    name: "Robots.txt Generator",
    h1: "Robots.txt Generator",
    short: "Crawler directive builder",
    description:
      "Create clean, compliant robots.txt directives with multi-agent crawler groups, sitemap linking, and blocking safety warnings.",
    category: "Technical SEO",
    iconName: "ShieldAlert",
    color: "bg-amber-50 text-amber-700 border-amber-100",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    targetKeyword: "Robots.txt Generator",
    supportingTopics: [
      "robots.txt generator",
      "robots.txt validator",
      "robots.txt creator",
      "robots.txt sitemap generator",
      "robots file generator"
    ],
    relatedSlugs: ["xml-sitemap-generator", "canonical-tag-generator", "llms-txt-generator"],
    metaTitle: "Robots.txt Generator & Validator – Free SEO Tool | Zenvuk",
    metaDescription:
      "Create valid robots.txt files with multi-crawler rules, sitemap directives, template presets, and safety warnings to avoid blocking your website."
  },
  {
    slug: "xml-sitemap-generator",
    name: "XML Sitemap Generator",
    h1: "XML Sitemap Generator",
    short: "Sitemaps.org XML creator",
    description:
      "Build and validate standard XML sitemaps from URL lists, bulk paste, or CSV files with lastmod, changefreq, and priority fields.",
    category: "Technical SEO",
    iconName: "Network",
    color: "bg-indigo-50 text-indigo-700 border-indigo-100",
    badgeBg: "bg-indigo-50",
    badgeText: "text-indigo-700",
    targetKeyword: "XML Sitemap Generator",
    supportingTopics: [
      "xml sitemap generator",
      "sitemap xml generator",
      "xml sitemap validator",
      "website sitemap generator",
      "create xml sitemap"
    ],
    relatedSlugs: ["robots-txt-generator", "hreflang-generator", "canonical-tag-generator"],
    metaTitle: "XML Sitemap Generator & Validator – Free Tool | Zenvuk",
    metaDescription:
      "Build valid Sitemaps.org 0.9 XML files from manual URLs, bulk paste, or CSV uploads with priority, lastmod, and instant syntax validation."
  },
  {
    slug: "hreflang-generator",
    name: "Hreflang Generator",
    h1: "Hreflang Generator",
    short: "International SEO tags",
    description:
      "Generate international hreflang alternate link tags for HTML headers and XML sitemaps with ISO language/region validation and x-default support.",
    category: "Technical SEO",
    iconName: "Globe",
    color: "bg-teal-50 text-teal-700 border-teal-100",
    badgeBg: "bg-teal-50",
    badgeText: "text-teal-700",
    targetKeyword: "Hreflang Generator",
    supportingTopics: [
      "hreflang tag generator",
      "hreflang html generator",
      "hreflang xml sitemap generator",
      "hreflang validator",
      "international seo hreflang"
    ],
    relatedSlugs: ["xml-sitemap-generator", "canonical-tag-generator", "schema-markup-generator"],
    metaTitle: "Hreflang Generator – International SEO Tag Tool | Zenvuk",
    metaDescription:
      "Generate valid hreflang link tags for HTML headers and XML sitemaps. Includes language/region code validation, x-default, and duplicate checks."
  },
  {
    slug: "keyword-density-checker",
    name: "Keyword Density Checker",
    h1: "Keyword Density Checker",
    short: "N-gram frequency analyzer",
    description:
      "Analyze unigrams, bigrams, and trigrams in text to audit keyword frequency, stop words, and vocabulary diversity locally in your browser.",
    category: "Content Analysis",
    iconName: "BarChart3",
    color: "bg-violet-50 text-violet-700 border-violet-100",
    badgeBg: "bg-violet-50",
    badgeText: "text-violet-700",
    targetKeyword: "Keyword Density Checker",
    supportingTopics: [
      "keyword density analyzer",
      "keyword frequency checker",
      "n gram analyzer",
      "ngram analyzer",
      "word frequency checker"
    ],
    relatedSlugs: ["meta-description-generator", "product-title-generator", "url-slug-generator"],
    metaTitle: "Keyword Density Checker & N-Gram Analyzer | Zenvuk",
    metaDescription:
      "Analyze 1-word, 2-word, and 3-word phrase frequency, density percentages, and stop-word filtering 100% in your browser. Free and private."
  },
  {
    slug: "url-slug-generator",
    name: "URL Slug Generator",
    h1: "URL Slug Generator",
    short: "SEO-friendly permalink maker",
    description:
      "Convert titles and headlines into clean, URL-friendly slugs with stop-word removal, Unicode transliteration, and separator options.",
    category: "Technical SEO",
    iconName: "FileCode",
    color: "bg-cyan-50 text-cyan-700 border-cyan-100",
    badgeBg: "bg-cyan-50",
    badgeText: "text-cyan-700",
    targetKeyword: "URL Slug Generator",
    supportingTopics: [
      "slug generator",
      "seo slug generator",
      "url slug maker",
      "permalink generator",
      "slugify tool"
    ],
    relatedSlugs: ["canonical-tag-generator", "keyword-density-checker", "meta-description-generator"],
    metaTitle: "URL Slug Generator – SEO-Friendly Permalink Maker | Zenvuk",
    metaDescription:
      "Transform article and product titles into clean, SEO-friendly URL slugs with Unicode normalization, stop-word removal, and alternative styles."
  },
  {
    slug: "llms-txt-generator",
    name: "LLMS.txt Generator",
    h1: "LLMS.txt Generator",
    short: "Machine-readable site index",
    description:
      "Create and validate llms.txt files to provide structured Markdown documentation indexes for AI systems and research crawlers.",
    category: "AI / Machine Readability",
    iconName: "Bot",
    color: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100",
    badgeBg: "bg-fuchsia-50",
    badgeText: "text-fuchsia-700",
    targetKeyword: "LLMS.txt Generator",
    supportingTopics: [
      "llms.txt generator",
      "llms.txt validator",
      "llms.txt creator",
      "llms.txt format",
      "create llms.txt"
    ],
    relatedSlugs: ["robots-txt-generator", "xml-sitemap-generator", "schema-markup-generator"],
    metaTitle: "LLMS.txt Generator & Validator – Free Tool | Zenvuk",
    metaDescription:
      "Generate and validate llms.txt Markdown files to organize your website documentation for AI search crawlers. Fast, free, and browser-based."
  },
  {
    slug: "product-name-generator",
    name: "Product Name Generator",
    h1: "Product Name Generator",
    short: "Discover brandable product name ideas",
    description:
      "Generate 30 brandable, pronounceable product and business name ideas tailored to your industry, concept, and style.",
    category: "Ecommerce Tools",
    iconName: "Sparkles",
    color: "bg-rose-50 text-rose-700 border-rose-100",
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-700",
    targetKeyword: "Product Name Generator",
    supportingTopics: [
      "product name ideas",
      "business product name generator",
      "brandable product names",
      "ecommerce product name generator"
    ],
    relatedSlugs: ["product-title-generator", "meta-description-generator", "utm-builder"],
    metaTitle: "Product Name Generator – Free Name Ideas Tool | Zenvuk",
    metaDescription:
      "Generate 30 brandable, memorable product names with phonetic algorithms, customizable styles, and instant CSV export. Free browser-based utility."
  },
  {
    slug: "utm-builder",
    name: "UTM Parameter Builder",
    h1: "UTM Builder",
    short: "Build clean campaign tracking URLs",
    description:
      "Build error-free campaign URLs with source and medium presets, offline QR codes, and private in-browser campaign history.",
    category: "Marketing Tools",
    iconName: "Compass",
    color: "bg-sky-50 text-sky-700 border-sky-100",
    badgeBg: "bg-sky-50",
    badgeText: "text-sky-700",
    targetKeyword: "UTM Builder",
    supportingTopics: [
      "UTM parameter builder",
      "campaign URL builder",
      "UTM URL generator",
      "campaign tracking URL generator"
    ],
    relatedSlugs: ["meta-description-generator", "product-title-generator", "faq-schema-generator"],
    metaTitle: "UTM Builder – Free Campaign URL Generator | Zenvuk",
    metaDescription:
      "Create consistent campaign tracking URLs with presets, URL fragment protection, offline QR codes, and private in-browser campaign history."
  }
];

export const getToolBySlug = (slug: string): ToolDefinition | undefined => {
  return toolsRegistry.find((tool) => tool.slug === slug);
};

export const getRelatedTools = (slug: string): ToolDefinition[] => {
  const current = getToolBySlug(slug);
  if (!current) return toolsRegistry.slice(0, 3);
  return current.relatedSlugs
    .map((s) => getToolBySlug(s))
    .filter((t): t is ToolDefinition => Boolean(t));
};


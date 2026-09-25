import { ToolSlug } from "./tools";

export type CategorySlug = "technical-seo" | "structured-data" | "marketing";

export interface CategoryFaq {
  question: string;
  answer: string;
}

export interface CategoryDefinition {
  slug: CategorySlug;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  directIntro: string;
  supportingExplanation: string;
  toolSlugs: ToolSlug[];
  faqs: CategoryFaq[];
}

export const categoriesRegistry: Record<CategorySlug, CategoryDefinition> = {
  "technical-seo": {
    slug: "technical-seo",
    name: "Technical SEO",
    h1: "Free Technical SEO Tools",
    metaTitle: "Technical SEO Tools – Free SEO Utilities | Zenvuk",
    metaDescription:
      "Free browser-based technical SEO tools to generate and validate canonical tags, hreflang, robots.txt, XML sitemaps, and URL slugs. Fast and client-side.",
    directIntro:
      "Technical SEO tools help inspect, generate, or validate elements that affect how search engines crawl, understand, and index a website.",
    supportingExplanation:
      "Search engine crawlers rely on explicit signals—such as canonical tags, robots.txt directives, hreflang annotations, and XML sitemaps—to discover, prioritize, and index web content. Zenvuk provides instant, client-side technical tools to generate accurate syntax and eliminate crawling issues without third-party dependencies or logins.",
    toolSlugs: [
      "canonical-tag-generator",
      "hreflang-generator",
      "robots-txt-generator",
      "xml-sitemap-generator",
      "url-slug-generator",
      "serp-preview-tool",
      "keyword-density-checker",
      "llms-txt-generator"
    ],
    faqs: [
      {
        question: "What are technical SEO tools used for?",
        answer:
          "Technical SEO tools assist webmasters and developers in configuring website infrastructure, including crawler directives (robots.txt), duplicate content handling (rel=canonical), multilingual targeting (hreflang), and sitemap indexing."
      },
      {
        question: "Do these technical SEO tools run entirely in the browser?",
        answer:
          "Yes. All Zenvuk technical SEO utilities execute client-side in your browser, ensuring your input data remains private and generation is instantaneous."
      },
      {
        question: "Do technical SEO tools guarantee higher search engine rankings?",
        answer:
          "No. Technical SEO tools ensure search crawlers can discover, interpret, and index your content accurately without errors, but rankings depend on content quality, relevance, and overall authority."
      }
    ]
  },
  "structured-data": {
    slug: "structured-data",
    name: "Structured Data",
    h1: "Free Structured Data Tools",
    metaTitle: "Structured Data Tools & Schema Generators | Zenvuk",
    metaDescription:
      "Generate valid Schema.org JSON-LD structured data for FAQPage, Organization, Product, and LocalBusiness entities. Fast, free, and validated in your browser.",
    directIntro:
      "Structured data tools help create and validate machine-readable Schema.org markup for webpages.",
    supportingExplanation:
      "Search engines consume Schema.org JSON-LD markup to disambiguate page entities, understand contextual relationships, and display enhanced search features when eligible. Zenvuk structured data generators produce syntactically valid JSON-LD that adheres to Google's structured data guidelines without sending your content to external servers.",
    toolSlugs: [
      "faq-schema-generator",
      "schema-markup-generator"
    ],
    faqs: [
      {
        question: "Does adding schema markup guarantee rich results or higher rankings?",
        answer:
          "No. Schema markup makes your page content understandable to search engine algorithms, but rich result display and ranking positions remain at Google's discretion based on relevance and quality."
      },
      {
        question: "Which structured data format is recommended by Google?",
        answer:
          "Google explicitly recommends JSON-LD embedded within a script tag in the HTML head or body for structured data."
      },
      {
        question: "Can I validate the generated JSON-LD markup?",
        answer:
          "Yes. You can copy the generated JSON-LD code directly into Google's Rich Results Test or Schema.org Validator to verify entity compliance."
      }
    ]
  },
  "marketing": {
    slug: "marketing",
    name: "Marketing",
    h1: "Free Marketing Tools",
    metaTitle: "Marketing Tools – Free Campaign Utilities | Zenvuk",
    metaDescription:
      "Build clean UTM tracking parameters, generate Open Graph social cards, and craft search-friendly product titles with free client-side marketing utilities.",
    directIntro:
      "Marketing utilities help digital marketers and web creators build accurate campaign tracking parameters, preview social media share cards, and optimize ecommerce listings.",
    supportingExplanation:
      "Consistent campaign tracking and compelling social share previews ensure marketing efforts deliver measurable attribution and optimal click-through rates. Zenvuk marketing tools streamline URL parameter building, Open Graph tag generation, and ecommerce title formulation with instant browser-based validation.",
    toolSlugs: [
      "utm-builder",
      "open-graph-generator",
      "meta-description-generator",
      "product-title-generator",
      "product-name-generator"
    ],
    faqs: [
      {
        question: "Why are standardized UTM parameters important for digital marketing?",
        answer:
          "Standardized UTM parameters ensure that web analytics platforms like Google Analytics accurately attribute traffic to the correct source, medium, and campaign without fragmented data."
      },
      {
        question: "How do Open Graph tags affect social media sharing?",
        answer:
          "Open Graph meta tags control the title, description, and preview image rendered when your URL is shared on platforms like LinkedIn, Facebook, and Twitter/X."
      },
      {
        question: "Are marketing utility calculations stored on Zenvuk servers?",
        answer:
          "No. All campaign tracking links, QR codes, and metadata card previews are generated client-side in your browser for complete privacy."
      }
    ]
  }
};

export const CATEGORY_SLUGS: CategorySlug[] = [
  "technical-seo",
  "structured-data",
  "marketing"
];

export function isCategorySlug(slug: string): slug is CategorySlug {
  return CATEGORY_SLUGS.includes(slug as CategorySlug);
}

export function getCategoryBySlug(slug: string): CategoryDefinition | undefined {
  if (isCategorySlug(slug)) {
    return categoriesRegistry[slug];
  }
  return undefined;
}

export function getAllCategories(): CategoryDefinition[] {
  return CATEGORY_SLUGS.map((slug) => categoriesRegistry[slug]);
}

export function getCategoryByToolSlug(toolSlug: ToolSlug | string): CategoryDefinition | undefined {
  for (const cat of getAllCategories()) {
    if (cat.toolSlugs.includes(toolSlug as ToolSlug)) {
      return cat;
    }
  }
  return undefined;
}

/**
 * Normalizes query parameter strings into canonical category slugs
 * e.g. "Technical SEO", "Technical+SEO", "Technical%20SEO" -> "technical-seo"
 */
export function normalizeCategoryQuery(query: string | null | undefined): CategorySlug | null {
  if (!query) return null;
  const decoded = decodeURIComponent(query).trim().toLowerCase().replace(/\+/g, " ");
  
  if (decoded === "technical seo" || decoded === "technical-seo") {
    return "technical-seo";
  }
  if (decoded === "structured data" || decoded === "structured-data") {
    return "structured-data";
  }
  if (
    decoded === "marketing" ||
    decoded === "marketing tools" ||
    decoded === "marketing-tools" ||
    decoded === "ecommerce" ||
    decoded === "ecommerce tools" ||
    decoded === "metadata" ||
    decoded === "metadata & social"
  ) {
    return "marketing";
  }
  if (decoded === "content analysis" || decoded === "ai / machine readability") {
    return "technical-seo";
  }

  return null;
}

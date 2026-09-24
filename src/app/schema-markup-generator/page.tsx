import type { Metadata } from "next";
import { SchemaMarkupContainer } from "./SchemaMarkupContainer";
import { WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { RelatedTools } from "@/components/common/RelatedTools";
import { getRelatedTools, getToolBySlug } from "@/config/tools";
import { siteConfig } from "@/config/site";

const tool = getToolBySlug("schema-markup-generator")!;
const related = getRelatedTools("schema-markup-generator");

export const metadata: Metadata = {
  title: {
    absolute: tool.metaTitle
  },
  description: tool.metaDescription,
  alternates: {
    canonical: "/schema-markup-generator/"
  },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    url: `${siteConfig.url}/schema-markup-generator/`,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: tool.metaTitle,
    description: tool.metaDescription
  }
};

export default function SchemaMarkupPage() {
  return (
    <>
      <WebApplicationJsonLd
        name={tool.name}
        description={tool.metaDescription}
        url={`${siteConfig.url}/schema-markup-generator/`}
        category="SEOApplication"
      />

      <SchemaMarkupContainer>
        {/* Supporting Educational Content */}
        <article className="prose-lite mt-16 border-t border-neutral-border pt-12 space-y-12">
          {/* Section 1: AEO Answer Block */}
          <section>
            <h2 className="text-2xl font-bold text-ink">
              What Is a Schema Markup Generator?
            </h2>
            <div className="mt-4 rounded-xl border border-neutral-border bg-surface p-5 border-l-4 border-l-brand">
              <p className="text-sm font-semibold text-ink">
                Quick Answer:
              </p>
              <p className="mt-1 text-sm leading-7 text-neutral-secondary">
                A schema markup generator is a free SEO utility that builds machine-readable structured data in JSON-LD format conforming to Schema.org standards. By selecting an entity type (such as Organization, Product, Article, or LocalBusiness) and filling in required properties, webmasters produce copy-ready code that helps search engines understand page meaning, disambiguate entities, and evaluate eligibility for rich results.
              </p>
            </div>
            <p className="mt-4 text-sm leading-7 text-neutral-secondary">
              Unlike manual JSON coding which is prone to syntax mistakes like trailing commas and unclosed brackets, Zenvuk&apos;s generator validates input properties in real time directly inside your browser. No data is sent to external servers, and the generated output can be exported as raw JSON-LD or pre-wrapped HTML <code className="font-mono text-xs">&lt;script&gt;</code> tags.
            </p>
          </section>

          {/* Section 2: What Is Schema.org? */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              What Is Schema.org?
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Schema.org is an open, collaborative community activity founded in 2011 by Google, Microsoft (Bing), Yahoo, and Yandex. Its mission is to create, maintain, and promote schemas for structured data on the Internet. It defines thousands of hierarchical classes (types) and attributes (properties) that describe entities in the real world—from organizations and local stores to events, creative works, recipes, and software.
            </p>
            <p className="mt-3 text-sm leading-7 text-neutral-secondary">
              By adhering to Schema.org standards, websites provide search engine crawlers with explicit semantic clues rather than forcing algorithms to infer context strictly from unstructured paragraph text.
            </p>
          </section>

          {/* Section 3: What Is JSON-LD? */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              What Is JSON-LD?
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              JSON-LD (JavaScript Object Notation for Linked Data) is a W3C standard format for encoding Linked Data using conventional JSON notation. Google officially recommends JSON-LD for structured data because it separates machine-readable metadata from presentation markup.
            </p>
            <div className="grid gap-4 sm:grid-cols-3 mt-4">
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand">Independent Block</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-secondary">
                  JSON-LD lives in a self-contained <code className="font-mono text-[11px]">&lt;script&gt;</code> block, eliminating the risk of breaking page layouts when updating copy.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand">Google Recommended</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-secondary">
                  Search documentation explicitly favors JSON-LD over Microdata or RDFa due to easier parsing and dynamic injection capabilities.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand">Developer Friendly</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-secondary">
                  Easy to generate programmatically via CMS templates, Next.js components, or tag management systems.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: How to Generate Schema Markup */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              How to Generate Schema Markup
            </h2>
            <ol className="list-decimal space-y-3 pl-5 text-sm leading-7 text-neutral-secondary mt-3">
              <li>
                <strong className="text-ink">Select the Entity Type:</strong> Choose the schema specification that most accurately describes the primary focus of your page (e.g. <em>Product</em> for ecommerce items, <em>Article</em> for blog posts, or <em>Organization</em> for brand homepages).
              </li>
              <li>
                <strong className="text-ink">Complete Required Properties:</strong> Provide core identity fields such as name, URL, headline, price, or author. Missing essential properties will trigger syntax guidance flags.
              </li>
              <li>
                <strong className="text-ink">Review Live JSON-LD Preview:</strong> Inspect the real-time preview to ensure all fields are correctly formatted without unneeded empty attributes.
              </li>
              <li>
                <strong className="text-ink">Choose Output Format:</strong> Copy the pure JSON-LD object for CMS fields, or copy the HTML <code className="font-mono text-xs">&lt;script&gt;</code> tag for manual template injection.
              </li>
              <li>
                <strong className="text-ink">Validate Externally:</strong> Test your rendered URL using Google&apos;s Rich Results Test or Schema.org Validator before deploying sitewide.
              </li>
            </ol>
          </section>

          {/* Section 5: How to Add JSON-LD to HTML */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              How to Add JSON-LD to HTML
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Embedding generated JSON-LD into your web application is straightforward:
            </p>
            <div className="mt-3 rounded-xl border border-[#1B2A3F] bg-[#050B14] p-4 font-mono text-xs text-[#DCE5F1] overflow-x-auto">
              <code>{`<head>\n  <!-- Standard page meta tags -->\n  <title>Your Page Title</title>\n  \n  <!-- Schema.org JSON-LD Structured Data -->\n  <script type="application/ld+json">\n  {\n    "@context": "https://schema.org",\n    "@type": "Organization",\n    "name": "Your Brand",\n    "url": "https://example.com"\n  }\n  </script>\n</head>`}</code>
            </div>
            <p className="mt-3 text-sm leading-7 text-neutral-secondary">
              While Google supports JSON-LD in both the <code className="font-mono text-xs">&lt;head&gt;</code> and <code className="font-mono text-xs">&lt;body&gt;</code> sections of an HTML document, placing it in the <code className="font-mono text-xs">&lt;head&gt;</code> ensures search crawlers parse entity definitions as early as possible during page rendering. For dedicated FAQ pages, you can also use our specialized <a href="/faq-schema-generator/" className="font-semibold text-brand hover:underline">FAQ Schema Generator</a>.
            </p>
          </section>

          {/* Section 6: Schema Markup Types Supported by Zenvuk */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Schema Markup Types Supported by Zenvuk
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Our generator supports 15 core Schema.org specifications covering commercial, organizational, and editorial needs:
            </p>
            <div className="mt-4 overflow-hidden rounded-xl border border-neutral-border bg-surface">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-secondary text-neutral-secondary border-b border-neutral-border">
                  <tr>
                    <th className="py-3 px-4 font-bold">Schema Type</th>
                    <th className="py-3 px-4 font-bold">Best Used On</th>
                    <th className="py-3 px-4 font-bold">Key Properties</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-border/50 text-neutral-secondary">
                  <tr className="hover:bg-surface-secondary/50 transition">
                    <td className="py-3 px-4 font-semibold text-ink">Organization</td>
                    <td className="py-3 px-4">Homepage, About page</td>
                    <td className="py-3 px-4 font-mono text-brand-cyan">name, url, logo, sameAs</td>
                  </tr>
                  <tr className="hover:bg-surface-secondary/50 transition">
                    <td className="py-3 px-4 font-semibold text-ink">LocalBusiness</td>
                    <td className="py-3 px-4">Local storefronts, branches</td>
                    <td className="py-3 px-4 font-mono text-brand-cyan">name, telephone, address, openingHours</td>
                  </tr>
                  <tr className="hover:bg-surface-secondary/50 transition">
                    <td className="py-3 px-4 font-semibold text-ink">Product</td>
                    <td className="py-3 px-4">Individual product detail pages</td>
                    <td className="py-3 px-4 font-mono text-brand-cyan">name, image, sku, brand, offers</td>
                  </tr>
                  <tr className="hover:bg-surface-secondary/50 transition">
                    <td className="py-3 px-4 font-semibold text-ink">Article & BlogPosting</td>
                    <td className="py-3 px-4">News, editorials, guides</td>
                    <td className="py-3 px-4 font-mono text-brand-cyan">headline, author, publisher, datePublished</td>
                  </tr>
                  <tr className="hover:bg-surface-secondary/50 transition">
                    <td className="py-3 px-4 font-semibold text-ink">Service</td>
                    <td className="py-3 px-4">Agency and consulting landing pages</td>
                    <td className="py-3 px-4 font-mono text-brand-cyan">name, provider, areaServed</td>
                  </tr>
                  <tr className="hover:bg-surface-secondary/50 transition">
                    <td className="py-3 px-4 font-semibold text-ink">BreadcrumbList</td>
                    <td className="py-3 px-4">Site-wide hierarchy trails</td>
                    <td className="py-3 px-4 font-mono text-brand-cyan">itemListElement, position, item</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 7: Structured Data vs Schema Markup */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Structured Data vs Schema Markup
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              The terms <em>structured data</em> and <em>schema markup</em> are frequently used synonymously, but they occupy different levels of abstraction:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-neutral-secondary mt-3">
              <li>
                <strong className="text-ink">Structured Data:</strong> The general concept of organizing data in an explicit, standardized format so computers can process relationships without ambiguity (e.g. XML, CSV, Open Graph, or JSON-LD).
              </li>
              <li>
                <strong className="text-ink">Schema Markup:</strong> The specific implementation of structured data that utilizes the <strong>Schema.org vocabulary</strong> to define entities, types, and properties for web search engines.
              </li>
            </ul>
          </section>

          {/* Section 8: Schema Markup Examples */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Schema Markup Examples
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Here is a representative snippet of an <code className="font-mono text-xs">Organization</code> schema object with social entity links:
            </p>
            <div className="mt-3 rounded-xl border border-[#1B2A3F] bg-[#050B14] p-4 font-mono text-xs text-[#86EFAC] leading-relaxed overflow-x-auto">
              <pre>{`{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Zenvuk",
  "url": "https://zenvuk.com",
  "logo": "https://zenvuk.com/icon.svg",
  "sameAs": [
    "https://twitter.com/zenvuk",
    "https://linkedin.com/company/zenvuk"
  ]
}`}</pre>
            </div>
          </section>

          {/* Section 9: How to Validate Structured Data */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              How to Validate Structured Data
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Before publishing structured data, verify your markup through two official testing suites:
            </p>
            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand">Schema.org Validator</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-secondary">
                  Tests general syntax, vocabulary compliance, and property correctness across all standard Schema.org classes, regardless of Google feature eligibility.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand">Google Rich Results Test</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-secondary">
                  Specifically checks whether your structured data meets Google&apos;s technical prerequisites for visual search enhancements and SERP features.
                </p>
              </div>
            </div>
          </section>

          {/* Section 10: Schema Markup and Google Rich Results */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Schema Markup and Google Rich Results
            </h2>
            <div className="rounded-2xl border border-neutral-border bg-surface p-6 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-ink">
                Realistic Search Engine Expectations
              </p>
              <p className="text-xs leading-6 text-neutral-secondary">
                Adding valid schema markup does <strong>not guarantee</strong> that Google will display rich snippets (such as star ratings, breadcrumb paths, or pricing badges) in search results. Google determines rich snippet eligibility algorithmically based on site authority, content accuracy, search query intent, user location, and compliance with Google Search Essentials guidelines.
              </p>
              <p className="text-xs leading-6 text-neutral-secondary">
                Never mark up content that is hidden from human visitors, and never fabricate fictional reviews or ratings. Transparent, truthful implementation establishes algorithmic trust and protects your domain from manual spam actions.
              </p>
            </div>
          </section>

          {/* Section 11: Common Schema Markup Mistakes */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Common Schema Markup Mistakes
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-state-error">Mismatched Content</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-secondary">
                  Declaring properties in JSON-LD (such as price or availability) that do not appear anywhere on the visible webpage violates search quality guidelines.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-state-error">Incorrect Nesting</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-secondary">
                  Failing to nest sub-objects (like <code className="font-mono text-[11px]">PostalAddress</code> inside <code className="font-mono text-[11px]">LocalBusiness</code>) creates syntax validation failures.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-state-error">Multiple Competing Types</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-secondary">
                  Labeling a single URL as both a Product and a LocalBusiness without proper organizational relationships confuses search crawlers.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-state-error">Invalid Date Formats</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-secondary">
                  Schema requires ISO 8601 date formats (e.g. <code className="font-mono text-[11px]">2025-09-20</code>). Writing conversational dates breaks structured data parsing.
                </p>
              </div>
            </div>
          </section>

          {/* Section 12: FAQs */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Schema Markup Generator FAQs
            </h2>
            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">What is schema markup?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-secondary">
                  Schema markup is code (typically in JSON-LD format) placed on a website that uses the Schema.org vocabulary to explain page content directly to search engine crawlers in a structured, unambiguous way.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">Where should JSON-LD schema be placed?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-secondary">
                  JSON-LD can be placed in either the <code className="font-mono text-[11px]">&lt;head&gt;</code> or <code className="font-mono text-[11px]">&lt;body&gt;</code> section of your HTML document enclosed within a <code className="font-mono text-[11px]">&lt;script type=&quot;application/ld+json&quot;&gt;</code> tag. Placing it in the <code className="font-mono text-[11px]">&lt;head&gt;</code> is considered best practice.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">Does schema markup directly improve search rankings?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-secondary">
                  Schema markup is not a direct algorithmic ranking factor by itself. However, it significantly improves how search engines understand entity relationships, disambiguates topics, and enables rich visual search snippets that increase organic click-through rates (CTR).
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">What schema type should I choose for my homepage?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-secondary">
                  For a corporate, brand, or SaaS homepage, use <code className="font-mono text-[11px]">Organization</code> (or <code className="font-mono text-[11px]">WebSite</code>). For a physical brick-and-mortar storefront or local service, use <code className="font-mono text-[11px]">LocalBusiness</code>.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">Is my data sent to any third-party AI or cloud server?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-secondary">
                  No. Zenvuk&apos;s Schema Markup Generator operates entirely client-side inside your browser. None of your business names, URLs, prices, or questions are transmitted to our servers or stored on remote databases.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">How do I pair schema with international SEO?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-secondary">
                  If your website serves international audiences in multiple languages, combine your structured data with accurate hreflang link tags generated by our <a href="/hreflang-generator/" className="font-semibold text-brand hover:underline">Hreflang Generator</a> and verify canonical targets with our <a href="/canonical-tag-generator/" className="font-semibold text-brand hover:underline">Canonical Tag Generator</a>.
                </p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <RelatedTools tools={related} />
        </article>
      </SchemaMarkupContainer>
    </>
  );
}

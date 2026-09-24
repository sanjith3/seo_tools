import type { Metadata } from "next";
import { URLSlugContainer } from "./URLSlugContainer";
import { WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { RelatedTools } from "@/components/common/RelatedTools";
import { getRelatedTools, getToolBySlug } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { FileCode, CheckCircle2, AlertTriangle, Layers, HelpCircle } from "lucide-react";

const tool = getToolBySlug("url-slug-generator")!;
const related = getRelatedTools("url-slug-generator");

export const metadata: Metadata = {
  title: {
    absolute: tool.metaTitle
  },
  description: tool.metaDescription,
  alternates: {
    canonical: "/url-slug-generator/"
  },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    url: `${siteConfig.url}/url-slug-generator/`,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: tool.metaTitle,
    description: tool.metaDescription
  }
};

const faqs = [
  {
    question: "Why does Google recommend hyphens over underscores in URL slugs?",
    answer:
      "Google's indexing algorithms treat hyphens (-) as word separators, splitting 'seo-tools' into the distinct words 'seo' and 'tools'. Conversely, underscores (_) are treated as character joiners, meaning 'seo_tools' is interpreted as a single concatenated term 'seotools'.",
  },
  {
    question: "Should stop words be removed from URL slugs?",
    answer:
      "In general, yes. Removing common stop words ('a', 'the', 'and', 'for') creates shorter, more legible, and keyword-dense URLs that are easier for users to read and share. However, keep stop words if removing them alters the grammatical meaning of the topic.",
  },
  {
    question: "What is the optimal character length for an SEO URL slug?",
    answer:
      "Keep URL slugs concise, ideally between 3 to 5 words and under 60 characters. Shorter URLs enjoy higher click-through rates on search engine result pages and reduce the likelihood of truncation when shared in social messaging apps.",
  },
  {
    question: "How are accented characters and non-English diacritics handled in URLs?",
    answer:
      "Accented characters should be transliterated into their ASCII equivalents (e.g., 'café' becomes 'cafe', 'münchen' becomes 'munchen'). Unconverted Unicode characters result in percent-encoded strings (e.g., '%C3%A9') which look spammy and obscure keyword relevance.",
  },
];

export default function URLSlugPage() {
  return (
    <>
      <WebApplicationJsonLd
        name={tool.name}
        description={tool.metaDescription}
        url={`${siteConfig.url}/url-slug-generator/`}
        category="SEOApplication"
      />

      <URLSlugContainer>
        <article className="prose-lite mt-16 border-t border-neutral-border pt-12 space-y-12">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <FileCode className="w-6 h-6 text-brand" />
              What Is a URL Slug and Why Does Clean Permalink Structure Matter?
            </h2>
            <div className="rounded-xl border border-neutral-border bg-surface p-4 border-l-4 border-l-brand mb-4 text-neutral-secondary text-sm leading-relaxed">
              <strong className="text-ink">Direct Definition:</strong> A URL slug is the final identifying segment of a URL pathname that describes the specific page content 
              using human-readable words separated by hyphens (e.g., <code className="font-mono text-xs">/tools/url-slug-generator/</code>). 
              It provides immediate semantic context to human readers and search engine crawlers alike.
            </div>
            <p className="text-sm leading-relaxed text-neutral-secondary mb-3">
              Cryptic database parameters like <code className="font-mono text-xs">/page?id=83719</code> conceal the subject matter 
              and fail to deliver keyword cues to search algorithms. A clean, descriptive slug reassures users before they click and assists search engine algorithms in topic categorization.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-state-success" />
              Best Practices for Designing Search-Friendly URL Permalinks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-surface border border-neutral-border">
                <h3 className="font-bold text-state-success mb-1">Recommended Practices</h3>
                <ul className="space-y-1.5 text-xs text-neutral-secondary">
                  <li>✓ Use standard hyphens (-) as word delimiters.</li>
                  <li>✓ Keep total slug length under 60 characters (3–5 key words).</li>
                  <li>✓ Include the primary keyword target.</li>
                  <li>✓ Transliterate special accents into plain Latin letters.</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-neutral-border">
                <h3 className="font-bold text-state-error mb-1">Practices to Avoid</h3>
                <ul className="space-y-1.5 text-xs text-neutral-secondary">
                  <li>✗ Do NOT use underscores (_) or whitespace (%20).</li>
                  <li>✗ Avoid dates or years that make evergreen URLs obsolete.</li>
                  <li>✗ Do NOT leave long strings of meaningless stop words.</li>
                  <li>✗ Avoid uppercase characters that cause duplicate URL routing.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-state-warning" />
              When Should You Change an Existing URL Slug?
            </h2>
            <div className="rounded-xl border border-neutral-border bg-surface p-4 border-l-4 border-l-state-warning mb-4 text-neutral-secondary text-sm leading-relaxed">
              <strong className="text-ink">Caution on URL Migrations:</strong> Never alter an established URL slug merely for minor cosmetic reasons without configuring 
              a permanent <code className="font-mono text-xs font-bold text-state-warning">301 Redirect</code> from the old URL to the new slug.
            </div>
            <p className="text-sm leading-relaxed text-neutral-secondary mb-3">
              Modifying an existing slug breaks existing inbound backlinks, social shares, and bookmarked URLs, leading to <code className="font-mono text-xs">404 Not Found</code> errors. 
              If a slug modification is required, immediately establish a server-side 301 redirect and update all internal links.
            </p>
          </section>

          {/* Section 4: FAQ Section */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-brand" />
              Frequently Asked Questions About URL Slugs
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-neutral-border pb-4 last:border-0 last:pb-0">
                  <h3 className="font-semibold text-ink text-sm mb-1">{faq.question}</h3>
                  <p className="text-neutral-secondary text-xs sm:text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </article>

        {related && related.length > 0 && <RelatedTools tools={related} />}
      </URLSlugContainer>
    </>
  );
}

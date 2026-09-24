import type { Metadata } from "next";
import { XMLSitemapContainer } from "./XMLSitemapContainer";
import { WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { RelatedTools } from "@/components/common/RelatedTools";
import { getRelatedTools, getToolBySlug } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { Network, CheckCircle2, AlertTriangle, FileText, HelpCircle } from "lucide-react";

const tool = getToolBySlug("xml-sitemap-generator")!;
const related = getRelatedTools("xml-sitemap-generator");

export const metadata: Metadata = {
  title: {
    absolute: tool.metaTitle
  },
  description: tool.metaDescription,
  alternates: {
    canonical: "/xml-sitemap-generator/"
  },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    url: `${siteConfig.url}/xml-sitemap-generator/`,
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
    question: "What is an XML sitemap and why is it important?",
    answer:
      "An XML sitemap is a structured file conforming to the sitemaps.org protocol that lists all canonical, indexable URLs on a website. It informs search engine crawlers about the site structure, content discovery paths, and when individual pages were last modified.",
  },
  {
    question: "What are the protocol limits for an XML sitemap file?",
    answer:
      "Under the sitemaps.org standard, a single uncompressed XML sitemap file must not exceed 50,000 URLs and must not exceed 50 MB in file size. Websites exceeding these thresholds must divide their URLs across multiple sitemaps and unify them using a Sitemap Index file.",
  },
  {
    question: "Does Google use the priority and changefreq tags?",
    answer:
      "Google representatives have confirmed that Googlebot ignores the <priority> and <changefreq> values in XML sitemaps. However, Google heavily relies on the <lastmod> date, provided the timestamp genuinely reflects substantial content updates rather than arbitrary automated timestamps.",
  },
  {
    question: "Should noindex or redirected URLs be included in an XML sitemap?",
    answer:
      "No. An XML sitemap should exclusively contain 200 OK, self-referencing canonical URLs intended for search engine indexation. Including noindexed URLs, 301 redirects, or 404 pages wastes search crawl budget and triggers Search Console warnings.",
  },
];

export default function XMLSitemapPage() {
  return (
    <>
      <WebApplicationJsonLd
        name={tool.name}
        description={tool.metaDescription}
        url={`${siteConfig.url}/xml-sitemap-generator/`}
        category="SEOApplication"
      />

      <XMLSitemapContainer>
        <article className="prose-lite mt-16 border-t border-neutral-border pt-12 space-y-12">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <Network className="w-6 h-6 text-brand" />
              What Is an XML Sitemap and How Does Google Utilize It?
            </h2>
            <div className="rounded-xl border border-neutral-border bg-surface p-4 border-l-4 border-l-brand mb-4 text-neutral-secondary text-sm leading-relaxed">
              <strong className="text-ink">Direct Definition:</strong> An XML sitemap is a machine-readable document hosted on a web server conforming to the sitemaps.org 0.9 schema. 
              It provides search engine bots with a complete manifest of authoritative, indexable URLs, facilitating efficient crawl prioritization 
              and rapid discovery of newly published or updated content.
            </div>
            <p className="text-sm leading-relaxed text-neutral-secondary mb-3">
              While search crawlers can discover URLs through internal hyperlinks, an XML sitemap serves as an authoritative fallback for deep site architectures, 
              newly launched domains with few inbound links, and extensive ecommerce catalogs where dynamic faceted navigation might otherwise impede crawler discovery.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-state-success" />
              Sitemaps.org Protocol Specifications &amp; File Limits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-surface border border-neutral-border">
                <h3 className="font-semibold text-ink mb-1">Single Sitemap Limits</h3>
                <p className="text-xs text-neutral-secondary leading-relaxed">
                  Maximum of <strong className="text-ink">50,000 URLs</strong> and a file size cap of <strong className="text-ink">50 MB</strong> (uncompressed). UTF-8 encoded with standard namespace.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-neutral-border">
                <h3 className="font-semibold text-ink mb-1">Sitemap Index Architecture</h3>
                <p className="text-xs text-neutral-secondary leading-relaxed">
                  Websites with &gt;50,000 URLs organize sitemaps into sub-files (e.g., <code className="font-mono text-xs">sitemap-products.xml</code>, <code className="font-mono text-xs">sitemap-posts.xml</code>) linked from a parent <code className="font-mono text-xs">sitemap-index.xml</code>.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-state-warning" />
              Common XML Sitemap Mistakes That Waste Crawl Budget
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-secondary">
              <li><strong className="text-ink">Submitting Non-Canonical URLs:</strong> Every URL inside an XML sitemap must be a canonical destination responding with a 200 OK status.</li>
              <li><strong className="text-ink">Faking the &lt;lastmod&gt; Tag:</strong> If you artificially update <code className="font-mono text-xs">&lt;lastmod&gt;</code> to today&apos;s date without modifying content, Google will learn to distrust your timestamps.</li>
              <li><strong className="text-ink">Missing robots.txt Reference:</strong> Declare your sitemap URL at the bottom of your robots.txt file: <code className="font-mono text-xs">Sitemap: https://zenvuk.com/sitemap.xml</code>.</li>
            </ul>
          </section>

          {/* Section 4: FAQ Section */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-brand" />
              Frequently Asked Questions About XML Sitemaps
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
      </XMLSitemapContainer>
    </>
  );
}

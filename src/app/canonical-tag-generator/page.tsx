import type { Metadata } from "next";
import { CanonicalContainer } from "./CanonicalContainer";
import { WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { RelatedTools } from "@/components/common/RelatedTools";
import { getRelatedTools, getToolBySlug } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { Link2, ShieldCheck, CheckCircle2, AlertTriangle, Layers, HelpCircle } from "lucide-react";

const tool = getToolBySlug("canonical-tag-generator")!;
const related = getRelatedTools("canonical-tag-generator");

export const metadata: Metadata = {
  title: {
    absolute: tool.metaTitle
  },
  description: tool.metaDescription,
  alternates: {
    canonical: "/canonical-tag-generator/"
  },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    url: `${siteConfig.url}/canonical-tag-generator/`,
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
    question: "What is a canonical tag and why is it essential for SEO?",
    answer:
      "A canonical tag (rel='canonical') is an HTML element placed in the <head> section of a webpage that designates the master, authoritative URL among multiple duplicate or near-duplicate versions. It signals to search engines like Google which page should be indexed and credited with ranking signals.",
  },
  {
    question: "Is rel='canonical' a directive or a hint to Google?",
    answer:
      "A canonical tag is treated as a strong hint, not an absolute directive. Google analyzes multiple signals (internal links, XML sitemap URLs, redirects, and content equivalence) when selecting the canonical URL. If your canonical tag contradicts internal site links or redirects, Google may ignore your suggestion.",
  },
  {
    question: "Should every indexable page have a self-referencing canonical tag?",
    answer:
      "Yes. Google explicitly recommends that every unique, indexable page include a self-referencing canonical tag pointing directly to its own absolute canonical URL. This prevents unintentional duplicate indexing when URLs are accessed with session IDs, tracking parameters, or trailing slash inconsistencies.",
  },
  {
    question: "Can I use relative paths in canonical tags?",
    answer:
      "While technically valid in HTML, Google strongly discourages relative canonical URLs (such as href='/page/'). Using relative paths frequently leads to accidental crawler errors, domain confusion, and duplicate indexing. Always provide the complete absolute URL including https://.",
  },
  {
    question: "How do I canonicalize non-HTML files like PDFs?",
    answer:
      "Because non-HTML files cannot contain HTML <head> elements, you must emit an HTTP 'Link' header in the web server response: Link: <https://example.com/document.pdf>; rel='canonical'.",
  },
];

export default function CanonicalPage() {
  return (
    <>
      <WebApplicationJsonLd
        name={tool.name}
        description={tool.metaDescription}
        url={`${siteConfig.url}/canonical-tag-generator/`}
        category="SEOApplication"
      />

      <CanonicalContainer>
        <article className="mt-16 border-t border-neutral-border pt-12 space-y-12 max-w-[880px]">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <Link2 className="w-6 h-6 text-brand" />
              What Is a Canonical Tag and Why Is It Vital for SEO?
            </h2>
            <div className="rounded-xl border border-neutral-border bg-surface p-4 border-l-4 border-l-brand mb-4 text-neutral-secondary text-sm leading-relaxed">
              <strong className="text-ink">Direct Definition:</strong> A canonical tag is an HTML link relation (<code className="font-mono text-xs">rel=&quot;canonical&quot;</code>) 
              that informs web search engines that a specific URL represents the authoritative master copy of a page. It prevents duplicate content 
              penalties and consolidates ranking signals, link metrics, and engagement data to a single preferred URL.
            </div>
            <p className="text-sm leading-relaxed text-neutral-secondary mb-3">
              Modern content management systems and ecommerce stores inherently create multiple URLs serving identical or near-identical content. 
              Variations arise from sorting filters (<code className="font-mono text-xs">?sort=price</code>), session identifiers, tracking parameters (<code className="font-mono text-xs">utm_source</code>), 
              and trailing slash variations. Canonical tags ensure search crawlers index only the clean, intended destination.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-state-success" />
              Self-Referencing vs Cross-Domain Canonicalization
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-surface border border-neutral-border">
                <h3 className="font-semibold text-ink mb-1">Self-Referencing Canonical</h3>
                <p className="text-neutral-secondary text-xs leading-relaxed mb-2">
                  When a page points its canonical tag to its own exact URL. This is Google-endorsed best practice for every indexable URL to safeguard against unexpected query string indexing.
                </p>
                <div className="font-mono text-xs bg-[#050B14] border border-[#1B2A3F] text-state-success p-2 rounded-lg">
                  &lt;link rel=&quot;canonical&quot; href=&quot;https://zenvuk.com/tools/&quot; /&gt;
                </div>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-neutral-border">
                <h3 className="font-semibold text-ink mb-1">Cross-Domain Canonical</h3>
                <p className="text-neutral-secondary text-xs leading-relaxed mb-2">
                  Used when republishing syndicated blog posts or distributing content across multiple subsidiary domains to grant 100% ranking attribution to the original author.
                </p>
                <div className="font-mono text-xs bg-[#050B14] border border-[#1B2A3F] text-brand-secondary p-2 rounded-lg">
                  &lt;link rel=&quot;canonical&quot; href=&quot;https://original-site.com/post/&quot; /&gt;
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-state-warning" />
              Critical Canonical Implementation Mistakes to Avoid
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-secondary">
              <li><strong className="text-ink">Multiple Canonical Tags:</strong> Never output more than one <code className="font-mono text-xs bg-surface-secondary px-1.5 py-0.5 rounded border border-neutral-border">rel=&quot;canonical&quot;</code> tag in the HTML head. If Google detects multiple canonical links, it ignores all of them.</li>
              <li><strong className="text-ink">Canonicalizing to a 301 Redirect or 404:</strong> The canonical target URL must always respond with a clean <code className="font-mono text-xs bg-surface-secondary px-1.5 py-0.5 rounded border border-neutral-border">200 OK</code> HTTP status. Canonicalizing to a redirected URL creates an unnecessary resolution loop.</li>
              <li><strong className="text-ink">Canonicalizing Paginated Pages to Page 1:</strong> Each paginated page (<code className="font-mono text-xs bg-surface-secondary px-1.5 py-0.5 rounded border border-neutral-border">/blog?page=2</code>) should have a self-referencing canonical tag to page 2, or canonicalize to a comprehensive &quot;View All&quot; page if one exists.</li>
              <li><strong className="text-ink">Canonicalizing Blocked URLs:</strong> Never specify a URL that is blocked in <code className="font-mono text-xs bg-surface-secondary px-1.5 py-0.5 rounded border border-neutral-border">robots.txt</code> as a canonical destination.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <Layers className="w-6 h-6 text-brand" />
              HTML Tags vs HTTP Response Headers
            </h2>
            <p className="text-sm leading-relaxed text-neutral-secondary mb-3">
              Standard web pages declare canonical relations inside the HTML <code className="font-mono text-xs bg-surface-secondary px-1.5 py-0.5 rounded border border-neutral-border">&lt;head&gt;</code> element. 
              However, for binary and non-HTML assets—such as downloadable PDF reports, whitepapers, or JSON API documents—canonicalization must be executed at the server level via HTTP response headers:
            </p>
            <div className="bg-[#050B14] border border-[#1B2A3F] text-neutral-secondary p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
              HTTP/1.1 200 OK<br />
              Content-Type: application/pdf<br />
              Link: &lt;https://zenvuk.com/whitepaper.pdf&gt;; rel=&quot;canonical&quot;
            </div>
          </section>

          {/* Section 5: FAQ Section */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-brand" />
              Frequently Asked Questions About Canonical Tags
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
      </CanonicalContainer>
    </>
  );
}

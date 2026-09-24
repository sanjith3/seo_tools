import type { Metadata } from "next";
import { SERPPreviewContainer } from "./SERPPreviewContainer";
import { WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { RelatedTools } from "@/components/common/RelatedTools";
import { getRelatedTools, getToolBySlug } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { Eye, CheckCircle2, AlertTriangle, Monitor, Smartphone, HelpCircle } from "lucide-react";

const tool = getToolBySlug("serp-preview-tool")!;
const related = getRelatedTools("serp-preview-tool");

export const metadata: Metadata = {
  title: {
    absolute: tool.metaTitle
  },
  description: tool.metaDescription,
  alternates: {
    canonical: "/serp-preview-tool/"
  },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    url: `${siteConfig.url}/serp-preview-tool/`,
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
    question: "Why does Google measure search titles in pixels rather than character counts?",
    answer:
      "Google renders search snippet titles using the Arial font at 20px, where characters have variable widths. A wide uppercase 'W' consumes approximately 19px, while a lowercase 'i' consumes only 5px. Because character counts ignore letter width, an exact 60-character title composed of wide letters may truncate prematurely at 600 pixels.",
  },
  {
    question: "What is the maximum pixel limit for Google desktop search titles?",
    answer:
      "Google typically caps desktop search snippet titles at 600 pixels (roughly 55 to 60 characters). On mobile devices, the container width is approximately 580 pixels.",
  },
  {
    question: "How long should a meta description be for desktop vs mobile search?",
    answer:
      "For desktop search results, Google displays up to approximately 960 pixels (around 150 to 160 characters). For mobile devices, descriptions are typically capped around 680 pixels (around 110 to 120 characters). Place critical target keywords and click triggers within the first 110 characters.",
  },
  {
    question: "Why does Google sometimes rewrite or replace my title tag?",
    answer:
      "Google rewrites page titles when they are deemed excessively long, keyword-stuffed, irrelevant to the user query, or repetitive across multiple pages. Google may replace the title with the page's <h1> heading, anchor text from inbound links, or Open Graph tags.",
  },
  {
    question: "Does having a rich snippet guarantee higher organic rankings?",
    answer:
      "No. Rich snippets (such as star ratings, breadcrumbs, or review counts) do not directly increase organic keyword ranking positions. However, they significantly enhance visual prominence in SERPs, leading to higher organic Click-Through Rates (CTR).",
  },
];

export default function SERPPreviewPage() {
  return (
    <>
      <WebApplicationJsonLd
        name={tool.name}
        description={tool.metaDescription}
        url={`${siteConfig.url}/serp-preview-tool/`}
        category="SEOApplication"
      />

      <SERPPreviewContainer>
        <article className="prose-lite mt-16 border-t border-neutral-border pt-12 space-y-12">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6 text-brand" />
              What Is a SERP Preview Tool and Why Is Pixel Measurement Essential?
            </h2>
            <div className="rounded-xl border border-neutral-border bg-surface p-4 border-l-4 border-l-brand mb-4 text-neutral-secondary text-sm leading-relaxed">
              <strong className="text-ink">Direct Definition:</strong> A SERP preview tool is a technical SEO utility that renders search engine result page (SERP) snippets 
              identically to how Google formats search listings. It calculates the cumulative typographical pixel width of titles and descriptions 
              using proportional font metrics rather than basic character counts.
            </div>
            <p className="text-sm leading-relaxed text-neutral-secondary mb-3">
              Most novice SEO workflows rely strictly on character counts (e.g., &quot;keep titles under 60 characters&quot;). However, Google allocates a fixed pixel 
              container width (~600px) rather than a rigid character allowance. Titles filled with wide capital letters like &quot;W&quot;, &quot;M&quot;, or &quot;O&quot; 
              exceed 600px in as few as 50 characters, triggering an unsightly truncated ellipsis (...) that degrades organic click-through rates.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <Monitor className="w-6 h-6 text-brand" />
              Google Desktop vs Mobile SERP Container Specifications
            </h2>
            <p className="text-sm leading-relaxed text-neutral-secondary mb-4">
              Google applies differing typography rules and container limits across desktop and mobile search devices:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-surface border border-neutral-border">
                <h3 className="font-semibold text-ink mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wide">
                  <Monitor className="w-4 h-4 text-brand" /> Desktop SERP Viewport
                </h3>
                <ul className="space-y-1.5 text-xs text-neutral-secondary">
                  <li><strong className="text-ink">Title Container:</strong> ~600px maximum (Arial 20px).</li>
                  <li><strong className="text-ink">Title Length:</strong> ~55–60 characters on average.</li>
                  <li><strong className="text-ink">Description Limit:</strong> ~960px maximum (Arial 14px).</li>
                  <li><strong className="text-ink">Description Length:</strong> ~150–160 characters.</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-neutral-border">
                <h3 className="font-semibold text-ink mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wide">
                  <Smartphone className="w-4 h-4 text-brand" /> Mobile SERP Viewport
                </h3>
                <ul className="space-y-1.5 text-xs text-neutral-secondary">
                  <li><strong className="text-ink">Title Container:</strong> ~580px maximum (Arial 18-20px).</li>
                  <li><strong className="text-ink">Title Length:</strong> ~50–55 characters.</li>
                  <li><strong className="text-ink">Description Limit:</strong> ~680px maximum (Arial 14px).</li>
                  <li><strong className="text-ink">Description Length:</strong> ~110–120 characters before mobile truncation.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-state-success" />
              Anatomy of a High-CTR Organic Search Snippet
            </h2>
            <p className="text-sm leading-relaxed text-neutral-secondary mb-3">
              Constructing a snippet that captures top organic traffic requires balancing target search intent, primary keywords, and compelling value propositions:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-neutral-secondary">
              <li><strong className="text-ink">Front-Loaded Primary Keyword:</strong> Position your core target keyword at the beginning of the title tag to ensure visibility even if Google truncates trailing text.</li>
              <li><strong className="text-ink">Brand Anchor:</strong> Conclude title tags with a recognizable brand divider (e.g., <code className="font-mono text-xs">| Brand</code> or <code className="font-mono text-xs">- Brand</code>).</li>
              <li><strong className="text-ink">Distinct Search Intent Clues:</strong> Incorporate year qualifiers (&quot;2026&quot;), scope indicators (&quot;Step-by-Step&quot;, &quot;Free&quot;, &quot;Complete Guide&quot;), or product differentiators.</li>
              <li><strong className="text-ink">Action-Oriented Description:</strong> Draft descriptions with an active verb (Discover, Compare, Learn, Calculate) followed by a clear promise of solution.</li>
            </ol>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-state-warning" />
              Why Does Google Rewrite Page Titles and Meta Descriptions?
            </h2>
            <div className="rounded-xl border border-neutral-border bg-surface p-4 border-l-4 border-l-state-warning mb-4 text-neutral-secondary text-sm leading-relaxed">
              <strong className="text-ink">Algorithm Transparency:</strong> Google states that its search algorithms replace author-written &lt;title&gt; tags in over 30% of search impressions 
              if the written tag fails to accurately convey relevance to the user&apos;s specific query.
            </div>
            <p className="text-sm leading-relaxed text-neutral-secondary mb-3">
              Common triggers for automated title rewriting include:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-neutral-secondary">
              <li>Extreme keyword stuffing or repetitive synonym lists.</li>
              <li>Generic boilerplate titles like &quot;Home&quot;, &quot;Untitled Document&quot;, or &quot;Page 1&quot;.</li>
              <li>Substantial mismatch between the &lt;title&gt; content and the primary &lt;h1&gt; heading on the page.</li>
              <li>Missing or outdated year stamps relative to the current search query context.</li>
            </ul>
          </section>

          {/* Section 5: FAQ Section */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-brand" />
              Frequently Asked Questions About Google SERP Previews
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
      </SERPPreviewContainer>
    </>
  );
}

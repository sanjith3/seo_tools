import type { Metadata } from "next";
import { OpenGraphContainer } from "./OpenGraphContainer";
import { WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { RelatedTools } from "@/components/common/RelatedTools";
import { getRelatedTools, getToolBySlug } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { Share2, Image as ImageIcon, CheckCircle2, AlertTriangle, Layers, HelpCircle } from "lucide-react";

const tool = getToolBySlug("open-graph-generator")!;
const related = getRelatedTools("open-graph-generator");

export const metadata: Metadata = {
  title: {
    absolute: tool.metaTitle
  },
  description: tool.metaDescription,
  alternates: {
    canonical: "/open-graph-generator/"
  },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    url: `${siteConfig.url}/open-graph-generator/`,
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
    question: "What is the recommended Open Graph image size?",
    answer:
      "The universally accepted dimension for Open Graph and Twitter large summary images is 1200 x 630 pixels, representing an aspect ratio of 1.91:1. Images smaller than 600 x 315 pixels will appear as small square thumbnails rather than full-width visual cards.",
  },
  {
    question: "Do Open Graph tags directly impact Google organic search rankings?",
    answer:
      "No. Google does not use Open Graph or Twitter metadata as direct search ranking signals. However, high-quality social previews significantly increase social shares, content visibility, brand mentions, and organic backlinks.",
  },
  {
    question: "Why does my updated Open Graph image not appear on Facebook or Twitter?",
    answer:
      "Social networks cache metadata images for up to 30 days. To force an immediate refresh, use the official platform debuggers: Facebook Sharing Debugger, LinkedIn Post Inspector, and Twitter Card Validator. Alternatively, append a cache-busting version query string to the image URL (e.g. ?v=2).",
  },
  {
    question: "What is the difference between summary and summary_large_image in Twitter Cards?",
    answer:
      "The 'summary' card displays a small square thumbnail positioned to the left of the title and description snippet. The 'summary_large_image' card renders a prominent full-width banner image above the textual summary.",
  },
  {
    question: "Are Open Graph tags required if I already have standard meta tags?",
    answer:
      "Yes. While social platforms will attempt to fall back to standard <title> and <meta name='description'> tags, they cannot infer image banners, custom aspect ratios, or article author metadata without explicit og:image and og:type tags.",
  },
];

export default function OpenGraphPage() {
  return (
    <>
      <WebApplicationJsonLd
        name={tool.name}
        description={tool.metaDescription}
        url={`${siteConfig.url}/open-graph-generator/`}
        category="SEOApplication"
      />

      <OpenGraphContainer>
        <article className="mt-16 border-t border-neutral-border pt-12 space-y-12 max-w-[880px]">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <Share2 className="w-6 h-6 text-brand" />
              What Is the Open Graph Protocol and Why Does It Matter?
            </h2>
            <div className="rounded-xl border border-neutral-border bg-surface p-4 border-l-4 border-l-brand mb-4 text-neutral-secondary text-sm leading-relaxed">
              <strong className="text-ink">Direct Definition:</strong> The Open Graph protocol (OGP) is a metadata standard introduced by Facebook that transforms any web page 
              into a rich social graph object. It enables webmasters to explicitly dictate the preview image, title, description, and canonical URL 
              displayed whenever a link is shared across social messaging platforms.
            </div>
            <p className="text-sm leading-relaxed text-neutral-secondary mb-3">
              Without explicit Open Graph tags, social network crawlers scrape whatever random images and textual headers they find on the page. 
              This frequently leads to low-resolution logos, broken aspect ratios, or irrelevant boilerplate text appearing in users&apos; social feeds.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-brand-secondary" />
              Optimal Social Image Dimensions: The 1.91:1 Golden Ratio
            </h2>
            <p className="text-sm leading-relaxed text-neutral-secondary mb-4">
              To ensure pristine, high-resolution rendering without clipping across high-DPI retina screens:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-surface border border-neutral-border text-center">
                <span className="text-xs font-semibold text-neutral-muted uppercase">Recommended Resolution</span>
                <p className="text-xl font-bold text-ink mt-1">1200 × 630 px</p>
                <p className="text-xs text-neutral-secondary mt-1">Ideal 1.91:1 aspect ratio for edge-to-edge banners.</p>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-neutral-border text-center">
                <span className="text-xs font-semibold text-neutral-muted uppercase">Minimum Resolution</span>
                <p className="text-xl font-bold text-ink mt-1">600 × 315 px</p>
                <p className="text-xs text-neutral-secondary mt-1">Minimum size required for large social display cards.</p>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-neutral-border text-center">
                <span className="text-xs font-semibold text-neutral-muted uppercase">Max File Weight</span>
                <p className="text-xl font-bold text-ink mt-1">&lt; 5.0 MB</p>
                <p className="text-xs text-neutral-secondary mt-1">Formats: JPG, PNG, or WebP with absolute URLs.</p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <Layers className="w-6 h-6 text-state-success" />
              Core Open Graph vs Twitter Card Tags
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-surface border border-neutral-border space-y-2">
                <div className="font-bold text-ink font-sans text-sm mb-2">Open Graph (Facebook, LinkedIn, Slack)</div>
                <div className="text-brand">&lt;meta property=&quot;og:title&quot; content=&quot;...&quot;&gt;</div>
                <div className="text-brand">&lt;meta property=&quot;og:description&quot; content=&quot;...&quot;&gt;</div>
                <div className="text-brand">&lt;meta property=&quot;og:image&quot; content=&quot;https://...&quot;&gt;</div>
                <div className="text-brand">&lt;meta property=&quot;og:url&quot; content=&quot;https://...&quot;&gt;</div>
                <div className="text-brand">&lt;meta property=&quot;og:type&quot; content=&quot;website&quot;&gt;</div>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-neutral-border space-y-2">
                <div className="font-bold text-ink font-sans text-sm mb-2">Twitter Cards (Twitter / X)</div>
                <div className="text-brand-secondary">&lt;meta name=&quot;twitter:card&quot; content=&quot;summary_large_image&quot;&gt;</div>
                <div className="text-brand-secondary">&lt;meta name=&quot;twitter:site&quot; content=&quot;@handle&quot;&gt;</div>
                <div className="text-brand-secondary">&lt;meta name=&quot;twitter:title&quot; content=&quot;...&quot;&gt;</div>
                <div className="text-brand-secondary">&lt;meta name=&quot;twitter:description&quot; content=&quot;...&quot;&gt;</div>
                <div className="text-brand-secondary">&lt;meta name=&quot;twitter:image&quot; content=&quot;https://...&quot;&gt;</div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-state-warning" />
              Common Implementation Pitfalls and How to Debug Them
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-secondary">
              <li><strong className="text-ink">Relative Image URLs:</strong> Always specify complete, absolute URLs with HTTPS protocol (<code className="font-mono text-xs bg-surface-secondary px-1.5 py-0.5 rounded border border-neutral-border">https://example.com/og.png</code>). Relative paths like <code className="font-mono text-xs bg-surface-secondary px-1.5 py-0.5 rounded border border-neutral-border">/og.png</code> fail on all external platforms.</li>
              <li><strong className="text-ink">Aggressive Crawler Caching:</strong> Social scrapers cache previews for days or weeks. If you modify your image, force an invalidation using the platform debuggers or add a query hash like <code className="font-mono text-xs bg-surface-secondary px-1.5 py-0.5 rounded border border-neutral-border">?v=2</code>.</li>
              <li><strong className="text-ink">Blocking Social Crawlers in Robots.txt:</strong> Ensure your robots.txt allows access to user agents like <code className="font-mono text-xs bg-surface-secondary px-1.5 py-0.5 rounded border border-neutral-border">facebookexternalhit</code> and <code className="font-mono text-xs bg-surface-secondary px-1.5 py-0.5 rounded border border-neutral-border">Twitterbot</code>.</li>
            </ul>
          </section>

          {/* Section 5: FAQ Section */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-brand" />
              Frequently Asked Questions About Open Graph
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
      </OpenGraphContainer>
    </>
  );
}

import type { Metadata } from "next";
import { RobotsTxtContainer } from "./RobotsTxtContainer";
import { WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { RelatedTools } from "@/components/common/RelatedTools";
import { getRelatedTools, getToolBySlug } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { ShieldCheck, AlertTriangle, FileText, CheckCircle2, Bot, HelpCircle } from "lucide-react";

const tool = getToolBySlug("robots-txt-generator")!;
const related = getRelatedTools("robots-txt-generator");

export const metadata: Metadata = {
  title: {
    absolute: tool.metaTitle
  },
  description: tool.metaDescription,
  alternates: {
    canonical: "/robots-txt-generator/"
  },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    url: `${siteConfig.url}/robots-txt-generator/`,
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
    question: "Does robots.txt prevent a page from being indexed in Google?",
    answer:
      "No. Robots.txt only governs crawl access, not indexation. If external links point to a disallowed URL, search engines can still index the URL without fetching its content. To definitively prevent indexation, allow crawling and implement a 'noindex' robots meta tag or X-Robots-Tag HTTP header.",
  },
  {
    question: "Where must the robots.txt file be uploaded?",
    answer:
      "The robots.txt file must reside in the exact root directory of your domain: https://example.com/robots.txt. Subdirectory placements such as https://example.com/blog/robots.txt are ignored by standard web crawlers.",
  },
  {
    question: "Is crawl-delay supported by Googlebot?",
    answer:
      "No. Googlebot ignores the Crawl-delay directive. Bingbot and Yandex support crawl-delay in seconds. For Googlebot crawl rate management, configure crawl frequency settings within Google Search Console if necessary.",
  },
  {
    question: "Can I block AI bots without blocking search engine crawlers?",
    answer:
      "Yes. You can declare specific User-agent blocks for AI crawlers like GPTBot, CCBot, ClaudeBot, and Anthropic-ai with Disallow: / while keeping User-agent: Googlebot and User-agent: Bingbot set to Allow: /.",
  },
  {
    question: "What is the difference between Allow and Disallow?",
    answer:
      "Disallow instructs matching crawlers not to request URLs starting with that prefix. Allow overrides a broader disallow rule for specific subdirectories or files. Google and Bing evaluate the most specific matching rule by path character length.",
  },
  {
    question: "How do wildcard patterns (*) work in robots.txt?",
    answer:
      "An asterisk (*) represents any sequence of characters in standard robots.txt extensions. For example, Disallow: /*.pdf blocks all URLs ending with .pdf, while Disallow: /search?* blocks internal search parameter URLs.",
  },
];

export default function RobotsTxtPage() {
  return (
    <>
      <WebApplicationJsonLd
        name={tool.name}
        description={tool.metaDescription}
        url={`${siteConfig.url}/robots-txt-generator/`}
        category="SEOApplication"
      />

      <RobotsTxtContainer>
        <article className="mt-16 border-t border-neutral-border pt-12 space-y-12 max-w-[880px]">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-brand" />
              What Is a Robots.txt File and Why Is It Critical?
            </h2>
            <div className="rounded-xl border border-neutral-border bg-surface p-4 border-l-4 border-l-brand mb-4 text-neutral-secondary text-sm leading-relaxed">
              <strong className="text-ink">Direct Definition:</strong> A robots.txt file is a plaintext configuration stored at the root directory of a web server 
              implementing the Robots Exclusion Protocol (REP). It instructs automated web crawlers which URL paths they are permitted or prohibited 
              from requesting, preserving server crawl bandwidth and preventing duplicate crawl loops.
            </div>
            <p className="text-sm leading-relaxed text-neutral-secondary mb-3">
              Search engine crawlers, archival bots, and automated AI scrapers inspect your server’s robots.txt file before requesting any other resource. 
              Proper configuration ensures search engines focus limited crawling resources on high-value canonical pages rather than administrative backends, 
              checkout funnels, or endless faceted navigation filters.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-state-warning" />
              Crawling vs Indexation: The Most Common SEO Misconception
            </h2>
            <div className="rounded-xl border border-neutral-border bg-surface p-4 border-l-4 border-l-state-warning mb-4 text-neutral-secondary text-sm leading-relaxed">
              <strong className="text-ink">Crucial Distinction:</strong> Disallowing a URL in robots.txt does <em>not</em> prevent it from appearing in search engine results. 
              Robots.txt restricts crawl access, not indexation. If external or internal hyperlinks point to a disallowed URL, Google may still index the 
              URL snippet without crawling page content.
            </div>
            <p className="text-sm leading-relaxed text-neutral-secondary mb-3">
              To guarantee that a private, low-value, or duplicate page is completely excluded from search indices:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-secondary">
              <li>Allow crawling in robots.txt so Googlebot can inspect the HTTP response and HTML payload.</li>
              <li>Include a <code className="bg-surface-secondary border border-neutral-border px-1.5 py-0.5 rounded text-neutral-secondary font-mono text-xs">&lt;meta name=&quot;robots&quot; content=&quot;noindex, follow&quot;&gt;</code> tag in the HTML head.</li>
              <li>Alternatively, emit an <code className="bg-surface-secondary border border-neutral-border px-1.5 py-0.5 rounded text-neutral-secondary font-mono text-xs">X-Robots-Tag: noindex</code> HTTP response header for non-HTML assets like PDF files.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-state-success" />
              Robots Exclusion Protocol Directives Explained
            </h2>
            <p className="text-sm leading-relaxed text-neutral-secondary mb-4">
              Formalized under RFC 9309, the Robots Exclusion Protocol supports a standardized vocabulary of directives:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-surface border border-neutral-border">
                <h3 className="font-semibold text-ink mb-1 font-mono text-xs">User-agent: [name]</h3>
                <p className="text-neutral-secondary text-xs leading-relaxed">
                  Designates the specific bot or spider to which the subsequent rules apply. An asterisk (<code className="font-mono text-brand">*</code>) acts as a universal wildcard matching all crawlers unless a more specific agent block exists.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-neutral-border">
                <h3 className="font-semibold text-ink mb-1 font-mono text-xs">Disallow: [path]</h3>
                <p className="text-neutral-secondary text-xs leading-relaxed">
                  Specifies a path prefix that the matching crawler must not access. Leaving the path empty (<code className="font-mono text-brand">Disallow:</code>) explicitly permits all crawling under that user-agent.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-neutral-border">
                <h3 className="font-semibold text-ink mb-1 font-mono text-xs">Allow: [path]</h3>
                <p className="text-neutral-secondary text-xs leading-relaxed">
                  Overrides a broader disallow rule for a specific child path. Used when a parent directory is blocked but a specific subfolder or resource must remain crawlable.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-neutral-border">
                <h3 className="font-semibold text-ink mb-1 font-mono text-xs">Sitemap: [absolute-url]</h3>
                <p className="text-neutral-secondary text-xs leading-relaxed">
                  Declares the full absolute canonical URL of an XML sitemap or sitemap index. Independent of user-agent blocks and readable by all conforming crawlers.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <Bot className="w-6 h-6 text-brand-secondary" />
              Controlling AI Scrapers, LLM Bots, and Generative Crawlers
            </h2>
            <p className="text-sm leading-relaxed text-neutral-secondary mb-3">
              Modern websites encounter specialized AI bot crawlers collecting content for foundation model training, retrieval-augmented generation (RAG), and live browsing plugins. 
              You can grant full access to search engine discovery crawlers while selectively gating automated AI extractors:
            </p>
            <div className="bg-[#050B14] border border-[#1B2A3F] text-neutral-secondary p-4 rounded-xl font-mono text-xs mb-4 overflow-x-auto leading-relaxed">
              # Permit standard search indexing<br />
              User-agent: Googlebot<br />
              Allow: /<br /><br />
              User-agent: Bingbot<br />
              Allow: /<br /><br />
              # Restrict LLM training and automated scraping<br />
              User-agent: GPTBot<br />
              Disallow: /<br /><br />
              User-agent: CCBot<br />
              Disallow: /<br /><br />
              User-agent: ClaudeBot<br />
              Disallow: /
            </div>
            <p className="text-xs text-neutral-muted italic">
              Note: Respect for robots.txt is voluntary. Major AI platforms honor these exclusions, but malicious or unverified scrapers may ignore robots directives. Sensitive content must be protected behind authentication.
            </p>
          </section>

          {/* Section 5: FAQ Section */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-brand" />
              Frequently Asked Questions About Robots.txt
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
      </RobotsTxtContainer>
    </>
  );
}

import type { Metadata } from "next";
import { LLMSTxtContainer } from "./LLMSTxtContainer";
import { WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { RelatedTools } from "@/components/common/RelatedTools";
import { getRelatedTools, getToolBySlug } from "@/config/tools";
import { siteConfig } from "@/config/site";

const tool = getToolBySlug("llms-txt-generator")!;
const related = getRelatedTools("llms-txt-generator");

export const metadata: Metadata = {
  title: {
    absolute: tool.metaTitle
  },
  description: tool.metaDescription,
  alternates: {
    canonical: "/llms-txt-generator/"
  },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    url: `${siteConfig.url}/llms-txt-generator/`,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: tool.metaTitle,
    description: tool.metaDescription
  }
};

export default function LLMSTxtPage() {
  return (
    <>
      <WebApplicationJsonLd
        name={tool.name}
        description={tool.metaDescription}
        url={`${siteConfig.url}/llms-txt-generator/`}
        category="SEOApplication"
      />

      <LLMSTxtContainer>
        {/* Supporting Educational Content */}
        <article className="mt-16 border-t border-neutral-border pt-12 space-y-12 max-w-[880px]">
          {/* Section 1: AEO Answer Block */}
          <section>
            <h2 className="text-2xl font-bold text-ink">
              What Is llms.txt?
            </h2>
            <div className="mt-4 rounded-xl border border-neutral-border bg-surface p-5 border-l-4 border-l-brand">
              <p className="text-sm font-semibold text-ink">
                Quick Answer:
              </p>
              <p className="mt-1 text-sm leading-7 text-neutral-secondary">
                llms.txt is an emerging, proposed community convention for organizing website documentation into a curated, machine-readable Markdown file. Situated at the root of a domain (<code className="font-mono text-xs">/llms.txt</code>), it provides large language models and AI research agents with a structured index of essential pages, documentation links, and summaries without requiring them to parse complex HTML navigation menus.
              </p>
            </div>
            <p className="mt-4 text-sm leading-7 text-neutral-secondary">
              Unlike web crawler directives like <a href="/robots-txt-generator/" className="font-semibold text-brand hover:underline">robots.txt</a> which define crawl access permissions, an <code className="font-mono text-xs text-neutral-secondary bg-surface-secondary px-1.5 py-0.5 rounded border border-neutral-border">llms.txt</code> file acts as a curated library card. It highlights your highest-value guides, API references, and tools in plain Markdown notation so automated systems can retrieve clean context efficiently.
            </p>
          </section>

          {/* Section 2: How the llms.txt Generator Works */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              How the llms.txt Generator Works
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Our generator lets you assemble a compliant <code className="font-mono text-xs">llms.txt</code> file in minutes. Enter your site name, core value proposition, canonical URL, and optional developer documentation link. Next, organize your key resources into thematic sections (such as Guides, Core Utilities, API Reference, and Policies).
            </p>
            <p className="mt-3 text-sm leading-7 text-neutral-secondary">
              The generator validates your URLs, checks for accidental duplicates, and outputs clean Markdown ready to download or copy directly to your hosting server. Everything runs client-side inside your browser with zero data retention.
            </p>
          </section>

          {/* Section 3: How to Create an llms.txt File */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              How to Create an llms.txt File
            </h2>
            <ol className="list-decimal space-y-3 pl-5 text-sm leading-7 text-neutral-secondary mt-3">
              <li>
                <strong>Define Website Identity:</strong> Enter your official brand or project name as an H1 heading and provide a concise blockquote summary describing your platform&apos;s purpose.
              </li>
              <li>
                <strong>Provide Canonical URLs:</strong> Supply your homepage URL and primary documentation hub link so models have explicit entry points.
              </li>
              <li>
                <strong>Create Curated Sections:</strong> Add H2 markdown headings for key resource groupings (e.g. <em>Documentation</em>, <em>Key Tools</em>, <em>Guides</em>).
              </li>
              <li>
                <strong>Add High-Value Links:</strong> Add markdown hyperlinks with clean descriptive anchor text and a brief explanation of what each linked page contains.
              </li>
              <li>
                <strong>Validate and Export:</strong> Review the live preview, check syntax warnings, and download your <code className="font-mono text-xs">llms.txt</code> file.
              </li>
            </ol>
          </section>

          {/* Section 4: llms.txt Format and Example */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              llms.txt Format and Example
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Below is a standard <code className="font-mono text-xs">llms.txt</code> structure for a modern developer or utility website:
            </p>
            <div className="mt-3 rounded-xl border border-[#1B2A3F] bg-[#050B14] p-4 font-mono text-xs text-neutral-secondary overflow-x-auto rounded-xl border">
              <pre>{`# Zenvuk
> Free browser-based SEO, ecommerce, and digital marketing utilities.

Website: https://zenvuk.com
Documentation: https://zenvuk.com/methodology/

## Core Utilities
- [Schema Markup Generator](https://zenvuk.com/schema-markup-generator/): Build valid Schema.org JSON-LD structured data.
- [Robots.txt Generator](https://zenvuk.com/robots-txt-generator/): Create compliant crawler directives.
- [XML Sitemap Generator](https://zenvuk.com/xml-sitemap-generator/): Generate standard Sitemaps.org 0.9 XML files.

## Documentation
- [Scoring Standards](https://zenvuk.com/methodology/): Technical explanation of client-side algorithms.
- [Privacy Policy](https://zenvuk.com/privacy-policy/): Local browser processing standards.`}</pre>
            </div>
          </section>

          {/* Section 5: Where to Upload llms.txt */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Where to Upload llms.txt
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Just like <code className="font-mono text-xs">robots.txt</code> and <code className="font-mono text-xs">sitemap.xml</code>, the <code className="font-mono text-xs">llms.txt</code> file must reside at the root of your domain:
            </p>
            <div className="mt-3 rounded-xl border border-neutral-border bg-surface p-4 font-mono text-xs text-brand break-all">
              https://yourdomain.com/llms.txt
            </div>
            <p className="mt-3 text-sm leading-7 text-neutral-secondary">
              In Next.js applications, place the file inside your <code className="font-mono text-xs">/public</code> folder or serve it via a Next.js route handler. Ensure your web server returns a <code className="font-mono text-xs">Content-Type: text/plain; charset=utf-8</code> or <code className="font-mono text-xs">text/markdown</code> header with an HTTP 200 status code.
            </p>
          </section>

          {/* Section 6: llms.txt vs robots.txt */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              llms.txt vs robots.txt
            </h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-neutral-border bg-surface">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-secondary text-ink border-b border-neutral-border">
                  <tr>
                    <th className="py-3 px-4 font-bold">Feature</th>
                    <th className="py-3 px-4 font-bold">robots.txt</th>
                    <th className="py-3 px-4 font-bold">llms.txt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-border text-neutral-secondary">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-ink">Primary Purpose</td>
                    <td className="py-3 px-4">Governs crawl permissions (Allow/Disallow) for compliant web bots.</td>
                    <td className="py-3 px-4">Provides an informational index of high-value documentation.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-ink">Official Standard?</td>
                    <td className="py-3 px-4">Yes (IETF RFC 9309). Universally recognized by search engines.</td>
                    <td className="py-3 px-4">No. Proposed community convention with variable adoption.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-ink">Format</td>
                    <td className="py-3 px-4 font-mono">User-agent, Disallow, Allow, Sitemap directives.</td>
                    <td className="py-3 px-4 font-mono">Standard Markdown with H1, blockquotes, and resource lists.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-ink">Search Impact</td>
                    <td className="py-3 px-4">Directly controls crawling and search engine index discovery.</td>
                    <td className="py-3 px-4">Informational resource index for AI agents; zero direct ranking impact.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 7: Does Google Use llms.txt? */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Does Google Use llms.txt?
            </h2>
            <div className="rounded-2xl border border-neutral-border bg-surface p-6 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-ink">
                Factual Search Engine Clarity
              </p>
              <p className="text-xs leading-6 text-neutral-secondary">
                <strong>No.</strong> Google Search does not require, parse, or factor <code className="font-mono text-[11px]">llms.txt</code> into its organic search ranking algorithms. Google relies on standard HTML rendering, HTTP headers, <a href="/robots-txt-generator/" className="font-semibold text-brand hover:underline">robots.txt</a> rules, and <a href="/xml-sitemap-generator/" className="font-semibold text-brand hover:underline">XML sitemaps</a> for crawling and indexing.
              </p>
              <p className="text-xs leading-6 text-neutral-secondary">
                Any tool claiming that adding an <code className="font-mono text-[11px]">llms.txt</code> file will boost your Google rankings or secure Google AI Overview citations is factually inaccurate.
              </p>
            </div>
          </section>

          {/* Section 8: Does llms.txt Improve AI Search Visibility? */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Does llms.txt Improve AI Search Visibility?
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Generative Engine Optimization (GEO) involves making content clear, authoritative, and easily parsable for AI research engines (like Perplexity, ChatGPT search, and Claude). While some autonomous AI agents and developer tools look for an <code className="font-mono text-xs">llms.txt</code> file to rapidly locate API documentation, <strong>adoption is voluntary and varies widely across systems</strong>.
            </p>
            <p className="mt-3 text-sm leading-7 text-neutral-secondary">
              Think of <code className="font-mono text-xs">llms.txt</code> as good developer hygiene rather than a magic growth hack. Having a clean, organized index reduces token waste when developer tools or research agents explore your site.
            </p>
          </section>

          {/* Section 9: How to Validate llms.txt */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              How to Validate llms.txt
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              A valid <code className="font-mono text-xs">llms.txt</code> file should adhere to strict syntax hygiene:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-neutral-secondary mt-3">
              <li>
                <strong>Absolute URLs:</strong> Every link must specify an absolute URL starting with <code className="font-mono text-xs">https://</code> or <code className="font-mono text-xs">http://</code>.
              </li>
              <li>
                <strong>No Duplicate Links:</strong> Avoid linking to the identical URL multiple times across different sections.
              </li>
              <li>
                <strong>Concise Descriptions:</strong> Keep resource descriptions brief (1–2 sentences) to conserve model token context.
              </li>
              <li>
                <strong>Standard Markdown:</strong> Format links strictly as <code className="font-mono text-xs">[Anchor Text](URL): Description</code>.
              </li>
            </ul>
          </section>

          {/* Section 10: Limitations of llms.txt */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Limitations of llms.txt
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-state-error">Not a Crawl Blocker</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  <code className="font-mono text-[11px]">llms.txt</code> cannot block or restrict crawlers. To prevent bots from crawling your site, use <code className="font-mono text-[11px]">robots.txt</code>.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-state-error">No Citation Guarantee</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  Publishing this file does not guarantee that LLMs will cite your website or answer queries with your content.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-state-error">Unofficial Proposal</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  Because this is an emerging convention, parsing behavior may evolve or differ across various AI providers.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-state-error">Manual Maintenance</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  If you rename or remove pages on your site, you must manually update your <code className="font-mono text-[11px]">llms.txt</code> file to avoid dead links.
                </p>
              </div>
            </div>
          </section>

          {/* Section 11: FAQs */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              LLMS.txt FAQs
            </h2>
            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">What is llms.txt?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-muted">
                  llms.txt is a plain-text Markdown file located at <code className="font-mono text-[11px]">/llms.txt</code> that provides large language models and autonomous AI agents with a concise, curated index of a website&apos;s key documentation and resources.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">Is llms.txt an official web standard?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-muted">
                  No. It is an open, proposed community convention (originated by Jeremy Howard and the Answer.AI team in 2024). It has not been standardized by the IETF or W3C.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">Does Google require an llms.txt file?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-muted">
                  No. Google Search does not require or use <code className="font-mono text-[11px]">llms.txt</code>. Google relies on standard HTML markup, XML sitemaps, and robots.txt directives.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">Where should the llms.txt file be hosted?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-muted">
                  The file should be hosted at the root level of your domain (e.g. <code className="font-mono text-[11px]">https://example.com/llms.txt</code>) and served with an HTTP 200 response code in plain text.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">Does Zenvuk store my documentation links?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-muted">
                  No. All parsing and formatting happens directly in your browser using client-side JavaScript. No data is sent to external servers or logged in databases.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">What other technical files should I configure?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-muted">
                  In addition to llms.txt, ensure you have a valid <a href="/robots-txt-generator/" className="font-semibold text-brand hover:underline">robots.txt</a> file for crawler directives and an <a href="/xml-sitemap-generator/" className="font-semibold text-brand hover:underline">XML Sitemap</a> for search engine indexation.
                </p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <RelatedTools tools={related} />
        </article>
      </LLMSTxtContainer>
    </>
  );
}

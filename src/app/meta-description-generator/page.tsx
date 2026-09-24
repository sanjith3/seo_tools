import type { Metadata } from "next";
import { MetaDescriptionToolContainer } from "./MetaDescriptionToolContainer";
import { WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { RelatedTools } from "@/components/common/RelatedTools";
import { getRelatedTools, getToolBySlug } from "@/config/tools";
import { siteConfig } from "@/config/site";

const tool = getToolBySlug("meta-description-generator")!;
const related = getRelatedTools("meta-description-generator");

export const metadata: Metadata = {
  title: {
    absolute: tool.metaTitle
  },
  description: tool.metaDescription,
  alternates: {
    canonical: "/meta-description-generator/"
  },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    url: `${siteConfig.url}/meta-description-generator/`,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: tool.metaTitle,
    description: tool.metaDescription
  }
};

export default function MetaDescriptionPage() {
  return (
    <>
      <WebApplicationJsonLd
        name={tool.name}
        description={tool.metaDescription}
        url={`${siteConfig.url}/meta-description-generator/`}
        category="SEOApplication"
      />

      <MetaDescriptionToolContainer>
        {/* Supporting Educational Content */}
        <article className="mt-16 border-t border-neutral-border pt-12 space-y-12 max-w-[880px]">
          {/* Section 1: AEO Answer Block */}
          <section>
            <h2 className="text-2xl font-bold text-ink">
              What Is a Meta Description Generator?
            </h2>
            <div className="mt-4 rounded-xl border border-neutral-border bg-surface p-5 border-l-4 border-l-brand">
              <p className="text-sm font-semibold text-amber-950">
                Quick Answer:
              </p>
              <p className="mt-1 text-sm leading-7 text-amber-900">
                A meta description generator is a specialized SEO tool that produces concise, persuasive 140–160 character HTML snippet summaries for web pages based on primary keywords, target audience, key benefits, and call-to-action intent. It optimizes organic click-through rates (CTR) in search engine results pages (SERPs) while preventing text truncation across desktop and mobile devices.
              </p>
            </div>
            <p className="mt-4 text-sm leading-7 text-neutral-secondary">
              Rather than relying on unformatted text or costly third-party AI APIs with high latency, our generator runs 100% in your browser. It leverages proven semantic copywriting frameworks tailored for homepages, ecommerce product catalogs, category pages, blog articles, and local businesses. Each variation includes real-time character counts, keyword match verification, and a live Google SERP preview.
            </p>
          </section>

          {/* Section 2: How to Create a Meta Description */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              How to Create a Meta Description
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Crafting a high-performing meta description requires balancing search engine technical guidelines with human persuasion psychology. Follow this 5-step methodology:
            </p>
            <ol className="list-decimal space-y-3 pl-5 text-sm leading-7 text-neutral-secondary mt-3">
              <li>
                <strong>Identify Primary User Intent:</strong> Determine whether the searcher wants to purchase a product (transactional), read a tutorial (informational), or navigate directly to a specific portal (navigational).
              </li>
              <li>
                <strong>Front-Load the Core Keyword:</strong> Place your primary target search phrase near the start of the snippet. When searchers see their query terms in the SERP, search engines bold matching words, immediately drawing visual attention.
              </li>
              <li>
                <strong>Articulate the Primary Benefit:</strong> Clearly explain what makes your page unique or what specific problem it solves. Provide a tangible reason why the user should choose your link over 9 competing listings.
              </li>
              <li>
                <strong>Incorporate an Action-Oriented CTA:</strong> Finish with an active directive such as &quot;Explore our catalog,&quot; &quot;Learn step-by-step,&quot; &quot;Get a free quote,&quot; or &quot;Calculate your savings today.&quot;
              </li>
              <li>
                <strong>Validate Character and Pixel Limits:</strong> Keep snippet length strictly between 140 and 155 characters (under 960 pixels on desktop and 680 pixels on mobile) to eliminate trailing ellipses.
              </li>
            </ol>
          </section>

          {/* Section 3: SEO Meta Description Generator */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              SEO Meta Description Generator
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Google confirmed back in 2009 that the <code className="font-mono text-xs text-neutral-secondary bg-surface-secondary px-1.5 py-0.5 rounded border border-neutral-border">&lt;meta name=&quot;description&quot;&gt;</code> tag is not a direct algorithmic ranking factor. Keywords inside your meta description will not mechanically elevate a page from page two to position one.
            </p>
            <p className="mt-3 text-sm leading-7 text-neutral-secondary">
              However, meta descriptions are the single most critical on-page asset for driving organic <strong>Click-Through Rate (CTR)</strong>. Search engines observe how users interact with search listings. When a well-crafted, highly relevant snippet attracts clicks above historical averages for that ranking position, it drives increased qualified traffic and positive engagement signals. Pair your snippet optimization with structured data using our <a href="/faq-schema-generator/" className="font-semibold text-brand hover:underline">FAQ Schema Generator</a> to capture maximum SERP visibility.
            </p>
          </section>

          {/* Section 4: Free Meta Description Generator */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Free Meta Description Generator
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              The Zenvuk Meta Description Generator is 100% free with zero paywalls, subscription limits, or mandatory email sign-ups. Unlike cloud-based tools that store your copy or throttle generation runs behind credits, Zenvuk runs entirely client-side inside your browser:
            </p>
            <div className="grid gap-4 sm:grid-cols-3 mt-4">
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand">Zero Registration</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  Generate unlimited description variations instantly without providing email addresses, phone numbers, or credit cards.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand">Total Data Privacy</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  Your proprietary marketing copy and keyword lists are processed locally. Nothing is transmitted to external servers or logged in databases.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand">Export Ready</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  Download all generated variations, character counts, and SEO scores directly into a clean CSV spreadsheet with a single click.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Homepage Meta Description Generator */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Homepage Meta Description Generator
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Your homepage meta description represents your entire brand in search results. Unlike specific product or article pages that answer targeted micro-queries, a homepage snippet must communicate your overarching value proposition, primary target audience, and organizational credibility in 150 characters.
            </p>
            <p className="mt-3 text-sm leading-7 text-neutral-secondary">
              When search engines return your brand name or navigational queries, they frequently display expanded sitelinks directly underneath the homepage snippet. Writing a concise, unambiguous summary prevents search engines from picking up disclaimers or cookie banner copy as your primary search identity.
            </p>
          </section>

          {/* Section 6: Website Meta Description Generator */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Website Meta Description Generator
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Different templates across a website demand tailored copywriting architectures. Our generator includes specialized modes for each key page classification:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-neutral-secondary mt-3">
              <li>
                <strong>Ecommerce Product Pages:</strong> Focus on product specifications, materials, sizing, pricing, and fast delivery guarantees. Pair these with our <a href="/product-title-generator/" className="font-semibold text-brand hover:underline">Product Title Generator</a> for full catalog optimization.
              </li>
              <li>
                <strong>Category & Collection Pages:</strong> Emphasize breadth of inventory, curated brands, user filters, and seasonal discounts.
              </li>
              <li>
                <strong>Editorial & Blog Posts:</strong> Tease the definitive answer, outline key takeaways, and establish journalistic or author authority.
              </li>
              <li>
                <strong>Local Business Pages:</strong> Include city, neighborhood, emergency availability, and direct contact invitations.
              </li>
              <li>
                <strong>Facebook & Open Graph:</strong> Social snippets support wider character allocations (up to 200–300 characters) before truncating on feeds.
              </li>
            </ul>
          </section>

          {/* Section 7: Meta Description Creator vs. Meta Description Writer */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Meta Description Creator vs. Meta Description Writer
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Marketers often use the terms <em>meta description creator</em> and <em>meta description writer</em> interchangeably, but they represent two complementary stages of the content workflow:
            </p>
            <div className="mt-4 overflow-hidden rounded-xl border border-neutral-border bg-surface">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-secondary text-ink border-b border-neutral-border">
                  <tr>
                    <th className="py-3 px-4 font-bold">Dimension</th>
                    <th className="py-3 px-4 font-bold">Meta Description Creator (Algorithmic)</th>
                    <th className="py-3 px-4 font-bold">Meta Description Writer (Human Copywriting)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-border text-neutral-secondary">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-ink">Speed & Scale</td>
                    <td className="py-3 px-4">Generates dozens of compliant variations across multiple templates in milliseconds.</td>
                    <td className="py-3 px-4">Requires 5–15 minutes per URL to research, write, and manually count characters.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-ink">Character Precision</td>
                    <td className="py-3 px-4">Guarantees strict 140–155 character boundaries with real-time length counters.</td>
                    <td className="py-3 px-4">Frequently drifts over 160 characters without dedicated testing utilities.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-ink">Brand Voice & Nuance</td>
                    <td className="py-3 px-4">Provides structured frameworks and keyword-aligned scaffolding.</td>
                    <td className="py-3 px-4">Applies bespoke brand humor, unique tone-of-voice, and emotional resonance.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-ink">Best Practice</td>
                    <td className="py-3 px-4 colspan-2">Use the Zenvuk Creator to produce formula-compliant options, then have your writer polish the final selection for emotional appeal.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 8: Meta Title and Description Generator */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Meta Title and Description Generator
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Optimizing meta descriptions in isolation is a common strategic mistake. The page title (<code className="font-mono text-xs text-neutral-secondary bg-surface-secondary px-1.5 py-0.5 rounded border border-neutral-border">&lt;title&gt;</code>) and meta description function as a unified advertising unit in search results:
            </p>
            <div className="mt-3 rounded-xl border border-neutral-border bg-surface p-5 space-y-3">
              <p className="text-xs leading-6 text-neutral-secondary">
                <strong>Why Paired Generation Matters:</strong> If your title promises a comprehensive pricing guide but your description discusses company history, searchers experience cognitive dissonance and skip your listing. Crafting both elements simultaneously ensures harmonious messaging, shared keyword themes, and distinct non-overlapping value propositions.
              </p>
              <p className="text-xs leading-6 text-neutral-secondary">
                Toggle the <strong>&quot;Generate Meta Title + Description&quot;</strong> option inside the tool above. Our engine generates a search-optimized 50–60 character meta title alongside each description variation and renders both directly inside the live SERP preview.
              </p>
            </div>
          </section>

          {/* Section 9: How Long Should a Meta Description Be? */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              How Long Should a Meta Description Be?
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Search engines measure search snippets in <strong>pixels</strong> rather than strict character counts. On desktop monitors, Google allocates approximately 960 pixels of horizontal width. On mobile viewports, the display window is capped at approximately 680 pixels.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-neutral-border bg-surface p-4 border-l-4 border-l-state-error">
                <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">&lt; 120 Characters</span>
                <h4 className="mt-1 text-sm font-bold text-ink">Too Short</h4>
                <p className="mt-1 text-xs leading-5 text-neutral-secondary">
                  Fails to communicate core benefits or provide a persuasive call to action. Leaves valuable SERP real estate empty.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-4 border-l-4 border-l-state-success">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">140 – 155 Characters</span>
                <h4 className="mt-1 text-sm font-bold text-ink">The Sweet Spot</h4>
                <p className="mt-1 text-xs leading-5 text-neutral-secondary">
                  Comfortably displays across both mobile and desktop screens without trailing ellipses (<code className="font-mono text-xs">...</code>) truncation.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-4 border-l-4 border-l-state-warning">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">&gt; 160 Characters</span>
                <h4 className="mt-1 text-sm font-bold text-ink">Truncation Risk</h4>
                <p className="mt-1 text-xs leading-5 text-neutral-secondary">
                  High probability of being cut off mid-sentence by search engines, obscuring critical calls to action or brand names.
                </p>
              </div>
            </div>
          </section>

          {/* Section 10: Why Google Rewrites Meta Descriptions */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Why Google Rewrites Meta Descriptions
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Multiple large-scale SEO industry studies confirm that <strong>Google rewrites meta descriptions for 60% to 70% of search queries</strong>. Understanding why this happens helps you write descriptions that Google actually uses:
            </p>
            <div className="mt-3 space-y-3 text-xs leading-6 text-neutral-secondary">
              <p>
                <strong>1. Query Mismatch:</strong> If a searcher enters a long-tail search query and your provided meta description does not include those specific terms, Google scans your on-page body copy to extract a sentence that directly answers the user&apos;s question.
              </p>
              <p>
                <strong>2. Generic or Duplicate Copy:</strong> If thousands of catalog pages share identical boilerplate text (e.g. &quot;Welcome to our store, browse our products&quot;), Google ignores the tag and extracts unique on-page text instead.
              </p>
              <p>
                <strong>How to Minimize Rewrites:</strong> Keep your meta description focused on the primary keyword cluster of the page, ensure the text summarizes the actual body content, and write natural, grammatically complete sentences.
              </p>
            </div>
          </section>

          {/* Section 11: Real-World Examples */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Meta Description Examples
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Inspect how high-scoring descriptions balance keywords, benefits, and calls to action across diverse industries:
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <div className="flex items-center justify-between text-xs font-bold text-ink">
                  <span>Ecommerce Product Page (151 Chars)</span>
                  <span className="rounded bg-state-success/15 px-2 py-0.5 border border-state-success/30 text-state-success font-semibold">Zenvuk Score: 98/100</span>
                </div>
                <p className="mt-2 font-mono text-xs text-ink">
                  Shop ergonomic office chairs with adjustable lumbar support at PostureCraft. Reduce back stiffness and enjoy free delivery. Browse the collection now.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <div className="flex items-center justify-between text-xs font-bold text-ink">
                  <span>SaaS / Service Landing Page (148 Chars)</span>
                  <span className="rounded bg-state-success/15 px-2 py-0.5 border border-state-success/30 text-state-success font-semibold">Zenvuk Score: 96/100</span>
                </div>
                <p className="mt-2 font-mono text-xs text-ink">
                  Automate your client billing with accurate invoicing software. Save 5+ hours every week and eliminate manual errors. Start your free trial today.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <div className="flex items-center justify-between text-xs font-bold text-ink">
                  <span>Local Service Business (149 Chars)</span>
                  <span className="rounded bg-state-success/15 px-2 py-0.5 border border-state-success/30 text-state-success font-semibold">Zenvuk Score: 95/100</span>
                </div>
                <p className="mt-2 font-mono text-xs text-ink">
                  Need a licensed emergency plumber in Austin? Austin PlumbCraft provides 24/7 leak detection, drain clearing, and repairs. Call for fast service now.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <div className="flex items-center justify-between text-xs font-bold text-ink">
                  <span>Informational Blog Post (153 Chars)</span>
                  <span className="rounded bg-state-success/15 px-2 py-0.5 border border-state-success/30 text-state-success font-semibold">Zenvuk Score: 97/100</span>
                </div>
                <p className="mt-2 font-mono text-xs text-ink">
                  Learn how to fix Core Web Vitals on Next.js websites. Discover practical caching, image optimization, and bundle reduction tips. Read our full guide.
                </p>
              </div>
            </div>
          </section>

          {/* Section 12: Common Mistakes */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Common Meta Description Mistakes
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700">Duplicate Site-Wide Boilerplates</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  Copy-pasting the same description across hundreds of product or category pages confuses search engine crawlers and guarantees automated snippet overrides.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700">Keyword Stuffing & Stacking</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  Listing comma-separated keywords looks spammy to users, severely hurts CTR, and provides zero incentive for searchers to click through.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700">Missing Call to Action</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  Descriptions that only define a concept passively without inviting searchers to explore or buy leave significant organic traffic on the table.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700">Unfulfilled Promises</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  Promising discounts or answers in the snippet that do not exist on the destination page creates immediate bounces and damages search quality metrics.
                </p>
              </div>
            </div>
          </section>

          {/* Section 13: FAQs */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Meta Description Generator FAQs
            </h2>
            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">How do I add a meta description to my HTML page?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-muted">
                  Add a <code className="text-brand font-mono">&lt;meta name=&quot;description&quot; content=&quot;Your generated description text here&quot;&gt;</code> tag inside the <code className="text-brand font-mono">&lt;head&gt;</code> section of your HTML document, or paste it into the SEO snippet field of your CMS plugin (such as Yoast, Rank Math, or Shopify SEO settings).
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">Why is my meta description truncated even when under 160 characters?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-muted">
                  Search engines calculate display boundaries using pixel width rather than raw character counts. Proportional fonts render wide characters (such as uppercase &quot;W&quot;, &quot;M&quot;, or &quot;O&quot;) with more pixels than narrow letters (like &quot;i&quot;, &quot;l&quot;, or &quot;t&quot;). Keeping your copy between 140 and 155 characters ensures safe rendering regardless of letter casing.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">Does Google penalize pages that lack a meta description?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-muted">
                  No algorithmic penalty exists for omitted meta descriptions. If a page lacks a description tag, Google automatically generates an excerpt from on-page text. However, omitting the tag forfeits control over your search presentation and typically results in lower organic click-through rates.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">Can I include emojis in meta descriptions?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-muted">
                  Search engines occasionally display standard Unicode emojis (such as checkmarks or stars) in search snippets, but they frequently strip them out or count them heavily against your pixel width budget. Never rely on an emoji to convey critical contextual meaning.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">How are Zenvuk optimization scores calculated?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-muted">
                  Our transparent scoring engine evaluates snippets across four criteria: length adherence (30 pts), front-loaded keyword placement (30 pts), call-to-action inclusion (20 pts), and repetition balance (20 pts). Review our full breakdown on our <a href="/methodology/" className="font-semibold text-brand hover:underline">scoring methodology page</a>.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">How do I track clicks coming from customized meta descriptions?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-muted">
                  For internal links or external marketing campaigns, use our <a href="/utm-builder/" className="font-semibold text-brand hover:underline">UTM Builder</a> to generate Google Analytics 4 compliant campaign tracking parameters and monitor engagement in real time.
                </p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <RelatedTools tools={related} />
        </article>
      </MetaDescriptionToolContainer>
    </>
  );
}

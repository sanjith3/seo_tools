import type { Metadata } from "next";
import { HreflangContainer } from "./HreflangContainer";
import { WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { RelatedTools } from "@/components/common/RelatedTools";
import { getRelatedTools, getToolBySlug } from "@/config/tools";
import { siteConfig } from "@/config/site";

const tool = getToolBySlug("hreflang-generator")!;
const related = getRelatedTools("hreflang-generator");

export const metadata: Metadata = {
  title: {
    absolute: tool.metaTitle
  },
  description: tool.metaDescription,
  alternates: {
    canonical: "/hreflang-generator/"
  },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    url: `${siteConfig.url}/hreflang-generator/`,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: tool.metaTitle,
    description: tool.metaDescription
  }
};

export default function HreflangPage() {
  return (
    <>
      <WebApplicationJsonLd
        name={tool.name}
        description={tool.metaDescription}
        url={`${siteConfig.url}/hreflang-generator/`}
        category="SEOApplication"
      />

      <HreflangContainer>
        {/* Supporting Educational Content */}
        <article className="mt-16 border-t border-neutral-border pt-12 space-y-12 max-w-[880px]">
          {/* Section 1: AEO Answer Block */}
          <section>
            <h2 className="text-2xl font-bold text-ink">
              What Is Hreflang?
            </h2>
            <div className="mt-4 rounded-xl border border-neutral-border bg-surface p-5 border-l-4 border-l-brand">
              <p className="text-sm font-semibold text-ink">
                Quick Answer:
              </p>
              <p className="mt-1 text-sm leading-7 text-neutral-secondary">
                Hreflang is an HTML link attribute (<code className="font-mono text-xs">rel=&quot;alternate&quot; hreflang=&quot;x&quot;</code>) introduced by Google in 2011 to tell search engines about localized and multi-language variations of a single webpage. By mapping URLs to specific language (ISO 639-1) and regional country (ISO 3166-1) codes, search engines serve the geographically and linguistically appropriate URL to international users.
              </p>
            </div>
            <p className="mt-4 text-sm leading-7 text-neutral-secondary">
              Without accurate hreflang annotations, search engines may treat localized pages as duplicate content or rank the American English version for a user searching in London, Sydney, or Madrid. Zenvuk&apos;s generator creates valid markup for both HTML page headers and XML sitemaps with real-time ISO validation.
            </p>
          </section>

          {/* Section 2: How to Generate Hreflang Tags */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              How to Generate Hreflang Tags
            </h2>
            <ol className="list-decimal space-y-3 pl-5 text-sm leading-7 text-neutral-secondary mt-3">
              <li>
                <strong>Map Regional URLs:</strong> Identify each translated or localized URL version for a specific piece of content (e.g. your English, Spanish, and French editions).
              </li>
              <li>
                <strong>Assign Language & Country Codes:</strong> Use two-letter ISO 639-1 language codes (e.g., <code className="font-mono text-xs">en</code>, <code className="font-mono text-xs">es</code>) and optional ISO 3166-1 Alpha 2 country codes (e.g., <code className="font-mono text-xs">US</code>, <code className="font-mono text-xs">GB</code>).
              </li>
              <li>
                <strong>Designate x-default Fallback:</strong> Choose an unlocalized or global landing URL as your fallback for visitors whose language/region is not explicitly targeted.
              </li>
              <li>
                <strong>Select Output Format:</strong> Choose between HTML <code className="font-mono text-xs">&lt;link&gt;</code> tags for template headers or XML sitemap snippets.
              </li>
              <li>
                <strong>Ensure Reciprocal Links:</strong> Implement identical sets of hreflang tags across <em>all</em> alternate pages so every version links to all sister URLs.
              </li>
            </ol>
          </section>

          {/* Section 3: Hreflang Language Codes */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Hreflang Language Codes
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Search engines strictly require language attributes to follow the <strong>ISO 639-1</strong> format. Common examples include:
            </p>
            <div className="grid gap-4 sm:grid-cols-3 mt-4 text-xs">
              <div className="rounded-xl border border-neutral-border bg-surface p-3.5 text-neutral-secondary">
                <span className="font-mono font-bold text-brand-secondary">en</span> — English
              </div>
              <div className="rounded-xl border border-neutral-border bg-surface p-3.5 text-neutral-secondary">
                <span className="font-mono font-bold text-brand-secondary">es</span> — Spanish
              </div>
              <div className="rounded-xl border border-neutral-border bg-surface p-3.5 text-neutral-secondary">
                <span className="font-mono font-bold text-brand-secondary">fr</span> — French
              </div>
              <div className="rounded-xl border border-neutral-border bg-surface p-3.5 text-neutral-secondary">
                <span className="font-mono font-bold text-brand-secondary">de</span> — German
              </div>
              <div className="rounded-xl border border-neutral-border bg-surface p-3.5 text-neutral-secondary">
                <span className="font-mono font-bold text-brand-secondary">it</span> — Italian
              </div>
              <div className="rounded-xl border border-neutral-border bg-surface p-3.5 text-neutral-secondary">
                <span className="font-mono font-bold text-brand-secondary">pt</span> — Portuguese
              </div>
              <div className="rounded-xl border border-neutral-border bg-surface p-3.5 text-neutral-secondary">
                <span className="font-mono font-bold text-brand-secondary">ja</span> — Japanese
              </div>
              <div className="rounded-xl border border-neutral-border bg-surface p-3.5 text-neutral-secondary">
                <span className="font-mono font-bold text-brand-secondary">zh-Hans</span> — Chinese (Simplified)
              </div>
              <div className="rounded-xl border border-neutral-border bg-surface p-3.5 text-neutral-secondary">
                <span className="font-mono font-bold text-brand-secondary">zh-Hant</span> — Chinese (Traditional)
              </div>
            </div>
          </section>

          {/* Section 4: Language vs Region Targeting */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Language vs Region Targeting
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Understanding the distinction between purely linguistic targeting and regional geographic targeting is essential for international architecture:
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand">Language Only (e.g. &quot;en&quot; or &quot;es&quot;)</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  Matches all speakers of that language worldwide, regardless of whether they are located in the US, Australia, South Africa, or India.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand">Language + Country (e.g. &quot;en-GB&quot; or &quot;es-MX&quot;)</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  Restricts targeting to speakers of that language inside a specific nation. Essential for ecommerce stores with localized pricing, shipping, or currencies.
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs text-neutral-muted">
              <strong>Important Rule:</strong> You cannot specify a country code alone (e.g. <code className="font-mono">hreflang=&quot;GB&quot;</code> is invalid). The language code must always come first.
            </p>
          </section>

          {/* Section 5: What Is x-default? */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              What Is x-default?
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              The <code className="font-mono text-xs text-neutral-secondary bg-surface-secondary px-1.5 py-0.5 rounded border border-neutral-border">hreflang=&quot;x-default&quot;</code> attribute specifies the fallback page served when none of your explicit language-region tags match a user&apos;s browser settings or query intent. It is frequently applied to:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-neutral-secondary mt-3">
              <li>Country-selector or language-picker splash pages.</li>
              <li>Global English homepages serving visitors from non-targeted countries.</li>
              <li>Dynamic redirect portals that route visitors automatically via IP geolocation.</li>
            </ul>
          </section>

          {/* Section 6: Hreflang HTML Example */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Hreflang HTML Example
            </h2>
            <div className="mt-3 rounded-xl border border-[#1B2A3F] bg-[#050B14] p-4 font-mono text-xs text-neutral-secondary overflow-x-auto rounded-xl border">
              <pre>{`<link rel="alternate" hreflang="x-default" href="https://example.com/" />
<link rel="alternate" hreflang="en-US" href="https://example.com/us/" />
<link rel="alternate" hreflang="en-GB" href="https://example.com/uk/" />
<link rel="alternate" hreflang="es-ES" href="https://example.com/es/" />
<link rel="alternate" hreflang="fr-FR" href="https://example.com/fr/" />`}</pre>
            </div>
            <p className="mt-3 text-xs text-neutral-muted">
              Remember: This identical block of 5 tags must appear in the <code className="font-mono">&lt;head&gt;</code> of all five pages.
            </p>
          </section>

          {/* Section 7: Hreflang in XML Sitemaps */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Hreflang in XML Sitemaps
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              For large websites with dozens of regional languages, injecting 30+ link tags into every HTML page can bloat page weight and delay First Contentful Paint. Implementing hreflang via an <a href="/xml-sitemap-generator/" className="font-semibold text-brand hover:underline">XML Sitemap</a> keeps your HTML lean:
            </p>
            <div className="mt-3 rounded-xl border border-neutral-border bg-surface p-4 font-mono text-xs text-brand leading-relaxed overflow-x-auto rounded-xl border">
              <pre>{`<url>
  <loc>https://example.com/us/</loc>
  <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/" />
  <xhtml:link rel="alternate" hreflang="en-US" href="https://example.com/us/" />
  <xhtml:link rel="alternate" hreflang="en-GB" href="https://example.com/uk/" />
</url>`}</pre>
            </div>
          </section>

          {/* Section 8: Common Hreflang Errors */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Common Hreflang Errors
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700">Missing Return Tags</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  If Page A links to Page B, but Page B does not link back to Page A, Google disregards both tags to prevent third-party spoofing.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700">Non-Canonical Targets</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  Pointing hreflang tags to URLs that 301-redirect or canonicalize elsewhere creates indexing conflicts. Pair with our <a href="/canonical-tag-generator/" className="font-semibold text-brand hover:underline">Canonical Tag Generator</a> to ensure targets are self-referencing.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700">Country Codes Used as Languages</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  Using <code className="font-mono text-[11px]">hreflang=&quot;uk&quot;</code> (Ukrainian language) instead of <code className="font-mono text-[11px]">en-GB</code> (English in United Kingdom) is a frequent mistake.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700">Relative URLs</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  Hreflang attributes strictly require absolute URLs with explicit protocols (e.g. <code className="font-mono text-[11px]">https://example.com/fr/</code>).
                </p>
              </div>
            </div>
          </section>

          {/* Section 9: Hreflang and International SEO */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Hreflang and International SEO
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              International SEO is built upon three technical pillars: localized content quality, geographical server or CDN routing, and hreflang tag integrity. When deployed properly, hreflang prevents regional self-cannibalization between US, UK, and Australian stores, consolidates regional ranking equity, and lowers bounce rates by delivering users to their native dialect.
            </p>
          </section>

          {/* Section 10: FAQs */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Hreflang Generator FAQs
            </h2>
            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">What is hreflang used for?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-muted">
                  Hreflang tells search engines which localized URL to show users based on their spoken language and geographic location, preventing regional cannibalization.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">What is the difference between ISO 639-1 and ISO 3166-1?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-muted">
                  ISO 639-1 defines 2-letter language codes (e.g. &quot;en&quot; for English, &quot;de&quot; for German), while ISO 3166-1 defines 2-letter country codes (e.g. &quot;US&quot; for United States, &quot;DE&quot; for Germany).
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">Should a page include an hreflang tag pointing to itself?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-muted">
                  Yes. Every page must include a self-referencing hreflang tag in addition to alternate links pointing to its sister variations.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">Can I combine HTML hreflang tags and XML sitemap hreflang?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-muted">
                  While technically possible, Google recommends choosing one implementation method to avoid discrepancies and synchronization bugs.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">Is my international data sent to remote servers?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-muted">
                  No. Zenvuk&apos;s Hreflang Generator operates 100% locally in your browser. None of your URLs or language configurations are transmitted to our servers.
                </p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <RelatedTools tools={related} />
        </article>
      </HreflangContainer>
    </>
  );
}

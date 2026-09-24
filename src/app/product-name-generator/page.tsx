import type { Metadata } from "next";
import { ProductNameToolContainer } from "./ProductNameToolContainer";
import { WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { RelatedTools } from "@/components/common/RelatedTools";
import { getRelatedTools, getToolBySlug } from "@/config/tools";
import { siteConfig } from "@/config/site";

const tool = getToolBySlug("product-name-generator")!;
const related = getRelatedTools("product-name-generator");

export const metadata: Metadata = {
  title: {
    absolute: tool.metaTitle
  },
  description: tool.metaDescription,
  alternates: {
    canonical: "/product-name-generator/"
  },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    url: `${siteConfig.url}/product-name-generator/`,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: tool.metaTitle,
    description: tool.metaDescription
  }
};

export default function ProductNamePage() {
  return (
    <>
      <WebApplicationJsonLd
        name={tool.name}
        description={tool.metaDescription}
        url={`${siteConfig.url}/product-name-generator/`}
        category="BusinessApplication"
      />

      <ProductNameToolContainer>
        {/* Supporting Educational Content */}
        <article className="mt-16 border-t border-neutral-border pt-12 space-y-10 max-w-[880px]">
          {/* AEO Answer Block */}
          <section>
            <h2 className="text-2xl font-bold text-ink">
              What is a Product Name Generator?
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-secondary">
              A product name generator is a brand naming tool that produces memorable, pronounceable, and category-relevant name concepts for physical goods, digital software, and new business ventures. It synthesizes curated phonetic stems, semantic roots, industry affixes, and tone guidelines to create brandable names rather than random character strings.
            </p>
            <p className="mt-3 text-sm leading-7 text-neutral-secondary">
              Zenvuk generates 30 distinct name ideas locally in your browser across eight customizable styles—ranging from modern and minimal to luxury and technical—enabling founders and marketers to brainstorm brand families with zero subscription fees or API latency.
            </p>
          </section>

          {/* Naming Styles Framework */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              The 8 Naming Styles Explained
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Your product name establishes your primary market positioning. Our generator applies distinct morphological rules according to your chosen naming style:
            </p>

            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700">Modern & Evocative</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  Short, dynamic neologisms with clean vowel endings (e.g. <em>Luma, Nexa, Velo</em>). Ideal for consumer technology, mobile apps, and direct-to-consumer lifestyle brands.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700">Professional & Trust</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  Established corporate roots combined with functional industry descriptors (e.g. <em>Works, Logic, Hub, Lab</em>). Perfect for B2B services, enterprise software, and consulting platforms.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700">Minimal & Functional</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  Monosyllabic and clipped concepts that convey elemental simplicity (e.g. <em>Form, Pure, One, Base</em>). Popular with Scandinavian design, productivity tools, and architecture.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700">Technical & Systems</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  Engineering-driven roots with high-tech affixes (e.g. <em>Syn, Vector, Optic, Nexus</em>). Built for developer infrastructure, robotics, analytics, and industrial hardware.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700">Luxury & Heritage</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  Refined Latinate and classical terms (e.g. <em>Aurelia, Meridian, Sovereign, Privé</em>). Suited for premium cosmetics, bespoke goods, jewelry, and high-end hospitality.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700">Playful & Friendly</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  Warm, rhythmic syllables and affectionate suffixes (e.g. <em>Sprout, Zippy, Bumble, Pop</em>). Ideal for children&apos;s products, pet accessories, and casual games.
                </p>
              </div>
            </div>
          </section>

          {/* Step-by-Step Guide */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              How to Use the Product Name Generator
            </h2>
            <ol className="list-decimal space-y-3 pl-5 text-sm leading-7 text-neutral-secondary mt-3">
              <li>
                <strong>Define Industry & Product Category:</strong> Specify your commercial niche (e.g., <em>Software & SaaS</em>, <em>Apparel</em>, <em>Coffee</em>, or <em>Fitness</em>).
              </li>
              <li>
                <strong>Enter Core Keyword & Concept Vibe:</strong> Input your root functional term (e.g., <em>Search</em>) and desired psychological concept (e.g., <em>Precision</em>).
              </li>
              <li>
                <strong>Choose Naming Style & Length:</strong> Select from 8 distinct linguistic styles (Modern, Professional, Minimal, Technical, Luxury, Playful, Futuristic, or Premium).
              </li>
              <li>
                <strong>Apply Optional Affixes & Negative Filters:</strong> Add preferred prefixes or enter comma-separated terms to avoid in the generation pool.
              </li>
              <li>
                <strong>Evaluate Brand Scores & Syllable Counts:</strong> Review 30 generated names with internal phonetics, rhythm, and memorability scores.
              </li>
              <li>
                <strong>Save Favorites & Export:</strong> Bookmark preferred concepts using the star icon and export your shortlist to CSV for team feedback.
              </li>
            </ol>
          </section>

          {/* Real-World Brand Naming Examples */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Real-World Brand Naming Patterns
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Review how established product categories map to distinct linguistic patterns:
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <div className="flex items-center justify-between text-xs font-bold text-rose-800">
                  <span>Consumer Tech & Apps (Neologism / Evocative)</span>
                  <span className="rounded bg-brand/15 px-2 py-0.5 border border-brand/30 text-brand font-semibold">2 Syllables</span>
                </div>
                <p className="mt-2 text-xs leading-5 text-neutral-secondary">
                  Names like <em>Spotify</em>, <em>Canva</em>, and <em>Figma</em> blend memorable vowel cadences with abstract phonetics to create highly protectable global trademarks.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <div className="flex items-center justify-between text-xs font-bold text-rose-800">
                  <span>B2B Enterprise Software (Functional Compound)</span>
                  <span className="rounded bg-brand/15 px-2 py-0.5 border border-brand/30 text-brand font-semibold">Compound Stems</span>
                </div>
                <p className="mt-2 text-xs leading-5 text-neutral-secondary">
                  Brands like <em>Salesforce</em>, <em>Datadog</em>, and <em>Workday</em> pair an immediate industry anchor with an active noun to communicate authority immediately.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <div className="flex items-center justify-between text-xs font-bold text-rose-800">
                  <span>Direct-to-Consumer Physical Goods (Clean & Minimal)</span>
                  <span className="rounded bg-brand/15 px-2 py-0.5 border border-brand/30 text-brand font-semibold">Monosyllabic / Root</span>
                </div>
                <p className="mt-2 text-xs leading-5 text-neutral-secondary">
                  Modern physical brands like <em>Allbirds</em>, <em>Casper</em>, and <em>Away</em> rely on friendly, conversational vocabulary that projects approachability.
                </p>
              </div>
            </div>
          </section>

          {/* Legal and Trademark Verification Guide */}
          <section className="rounded-2xl border border-neutral-border bg-surface p-6 border-l-4 border-l-state-warning">
            <h2 className="text-base font-bold text-amber-950">
              Crucial Trademark & Domain Verification Protocol
            </h2>
            <p className="mt-2 text-xs leading-6 text-amber-900">
              <strong>Mandatory Legal Notice:</strong> Zenvuk does not check official trademark registers, company name filings, or domain registries. A name being generated does not imply that it is legally available or free of trademark infringement.
            </p>
            <p className="mt-3 text-xs leading-6 text-amber-900 font-semibold">
              Before committing to packaging, marketing spend, or incorporation, execute these four mandatory checks:
            </p>
            <ol className="list-decimal space-y-2 pl-5 text-xs leading-5 text-amber-900 mt-2">
              <li>
                <strong>Federal Trademark Search:</strong> Search the official United States Patent and Trademark Office (USPTO TESS) database or the EUIPO database for identical and phonetically similar names in your Nice goods/services class.
              </li>
              <li>
                <strong>Global Trademark Clearance:</strong> Search the World Intellectual Property Organization (WIPO) Global Brand Database if you plan on international distribution.
              </li>
              <li>
                <strong>Domain Availability:</strong> Use an accredited ICANN registrar to verify top-level domains (.com, .io, .co) and review common social handle registries.
              </li>
              <li>
                <strong>State Business Name Filings:</strong> Verify with your Secretary of State or regional business registry that no local entity operates under the identical business name.
              </li>
            </ol>
          </section>

          {/* Phonetics and Memorability */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Phonetics and Memorability in Brand Naming
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              What makes a product name stick in a customer&apos;s mind? Cognitive linguistics research highlights several key phonetic principles incorporated into our engine:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-neutral-secondary mt-3">
              <li>
                <strong>The 2-to-3 Syllable Rule:</strong> Names with two or three syllables are easy to pronounce across international languages and fit cleanly on retail packaging and mobile navigation bars.
              </li>
              <li>
                <strong>Plosive Consonants:</strong> Letters like P, T, K, B, and D produce distinct acoustic energy that makes brand names more memorable and punchy (e.g. <em>Apple, Tesla, TikTok</em>).
              </li>
              <li>
                <strong>Spelling Simplicity:</strong> If a customer hears your product name on a podcast or in conversation, they should be able to type it into a search engine without asking how it is spelled.
              </li>
            </ul>
          </section>

          {/* Common Mistakes */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Common Product Naming Mistakes
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-neutral-secondary">
              <li>
                <strong>Difficult Spellings:</strong> Replacing vowels with random letters or numbers (e.g. &quot;Searchzmithx&quot;) makes word-of-mouth discovery nearly impossible.
              </li>
              <li>
                <strong>Overly Generic Descriptions:</strong> Naming a product simply &quot;The Best Running Shoe&quot; makes it impossible to trademark or protect against copycats.
              </li>
              <li>
                <strong>Ignoring Negative Language Associations:</strong> Forgetting to test whether the name has unintended or offensive meanings in foreign languages.
              </li>
              <li>
                <strong>Boxed-in Names:</strong> Choosing a name tied strictly to one feature that prevents you from expanding your product catalog in the future.
              </li>
            </ul>
          </section>

          {/* FAQs */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Frequently Asked Questions
            </h2>
            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">Does Zenvuk check domain or social handle availability?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-muted">
                  No. Zenvuk focuses purely on linguistic and phonetic concept generation. Always perform independent WHOIS domain searches and social media availability audits once you have selected your favorite options.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">How does the &quot;Words to Avoid&quot; filter work?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-muted">
                  Enter any comma-separated words (such as competitor names, overused buzzwords like &quot;cheap&quot;, or terms that do not fit your brand tone). The generation algorithm automatically disqualifies any candidate containing those terms.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">Can I copyright or trademark a generated name?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-muted">
                  You can apply to register a trademark for a generated name if it is legally distinctive and does not conflict with existing registered marks in your commercial class. Consult a qualified trademark attorney for formal legal advice.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">Can I export my favorite name ideas to a spreadsheet?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-muted">
                  Yes. Use the star icon to save names to your favorites list, then click &quot;Export CSV&quot; to download your shortlist complete with syllable counts and brand scores.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">Are generated names stored or visible to other users?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-muted">
                  No. All names are generated locally inside your browser session. Your product concept, keywords, and generated shortlists are confidential and are never transmitted to our servers.
                </p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <RelatedTools tools={related} />
        </article>
      </ProductNameToolContainer>
    </>
  );
}

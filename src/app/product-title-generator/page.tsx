import type { Metadata } from "next";
import Link from "next/link";
import { ProductTitleToolContainer } from "./ProductTitleToolContainer";
import { WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { RelatedTools } from "@/components/common/RelatedTools";
import { getRelatedTools, getToolBySlug } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { CheckCircle2, AlertTriangle, ShieldCheck, ShoppingCart, Tag, Store } from "lucide-react";

const tool = getToolBySlug("product-title-generator")!;
const related = getRelatedTools("product-title-generator");

export const metadata: Metadata = {
  title: {
    absolute: tool.metaTitle
  },
  description: tool.metaDescription,
  alternates: {
    canonical: "/product-title-generator/"
  },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    url: `${siteConfig.url}/product-title-generator/`,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: tool.metaTitle,
    description: tool.metaDescription
  }
};

export default function ProductTitlePage() {
  return (
    <>
      <WebApplicationJsonLd
        name={tool.name}
        description={tool.metaDescription}
        url={`${siteConfig.url}/product-title-generator/`}
        category="BusinessApplication"
      />

      <ProductTitleToolContainer>
        {/* Semantic Supporting Sections Optimized for Search Intent, AEO, and GEO */}
        <article className="mt-16 border-t border-neutral-border pt-12 space-y-12 max-w-[880px]">
          
          {/* Section 1: What Is a Product Title Generator? */}
          <section id="what-is-product-title-generator">
            <h2 className="text-2xl font-bold text-ink">
              What Is a Product Title Generator?
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-secondary">
              A <strong>product title generator</strong> is an ecommerce utility that constructs keyword-optimized, high-converting product listing titles based on product attributes, brand names, and marketplace conventions. It ensures product titles balance search engine visibility with human readability across Amazon, eBay, Etsy, Shopify, and Google Shopping.
            </p>
            <p className="mt-3 text-sm leading-7 text-neutral-secondary">
              Rather than relying on generic AI tools that hallucinate unverified technical specifications, Zenvuk uses a deterministic formula engine. It structures user-supplied product specifications into proven listing frameworks without adding unsubstantiated claims or risking algorithmic spam penalties.
            </p>
          </section>

          {/* Section 2: How to Generate SEO-Friendly Product Titles */}
          <section id="how-to-generate-seo-friendly-product-titles">
            <h2 className="text-xl font-bold text-ink">
              How to Generate SEO-Friendly Product Titles
            </h2>
            <p className="mt-2 text-sm leading-7 text-neutral-secondary">
              Writing an effective product title requires balancing search crawler indexation with consumer buying psychology. Follow these foundational principles:
            </p>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-neutral-secondary">
              <li>
                <strong>Front-Load the Core Search Term:</strong> Place your primary keyword in the first 35 to 45 characters. Mobile shoppers scan the left side of listing cards before deciding whether to tap.
              </li>
              <li>
                <strong>Include Brand Name Prominently:</strong> Front-loading the brand builds trust, prevents trademark confusion, and captures valuable branded search volume.
              </li>
              <li>
                <strong>Add Definitive Specifications:</strong> Provide concrete attributes such as model, color, dimensions, pack size, or primary material so buyers know immediately if the item matches their needs.
              </li>
              <li>
                <strong>Eliminate Promotional Jargon:</strong> Never include subjective fluff like <em>&quot;Best Quality&quot;</em>, <em>&quot;Sale&quot;</em>, or <em>&quot;Free Shipping&quot;</em>. These phrases violate marketplace policies and trigger search suppression.
              </li>
              <li>
                <strong>Respect Platform Character Limits:</strong> Different sales channels enforce strict character caps—ranging from 80 characters on eBay to 200 on Amazon.
              </li>
            </ol>
          </section>

          {/* Section 3: Amazon Product Title Generator */}
          <section id="amazon-product-title-generator">
            <h2 className="text-xl font-bold text-ink">
              Amazon Product Title Generator
            </h2>
            <p className="mt-2 text-sm leading-7 text-neutral-secondary">
              Amazon’s A9/A10 search algorithm indexes every individual keyword within your title. The standard Amazon title structure is:
            </p>
            <div className="mt-3 rounded-xl border border-neutral-border bg-surface p-4">
              <p className="font-mono text-xs text-emerald-800 font-semibold">
                [Brand] + [Core Keyword / Product Name] + [Model / Style] + [Key Feature / Material] + [Pack / Color / Size]
              </p>
            </div>
            <p className="mt-3 text-xs leading-6 text-neutral-muted">
              Amazon allows up to 200 characters in most categories (with some categories capped at 150 or 80 on mobile). Keep critical identifying details early to ensure mobile buyers see key specifications before truncation.
            </p>
          </section>

          {/* Section 4: Etsy Listing Title Generator */}
          <section id="etsy-listing-title-generator">
            <h2 className="text-xl font-bold text-ink">
              Etsy Listing Title Generator
            </h2>
            <p className="mt-2 text-sm leading-7 text-neutral-secondary">
              Etsy’s search engine pairs titles with listing tags and customer intent. Etsy shoppers search for occasions, recipients, aesthetic styles, and handcrafted materials.
            </p>
            <div className="mt-3 rounded-xl border border-neutral-border bg-surface p-4">
              <p className="font-mono text-xs text-emerald-800 font-semibold">
                [Primary Keyword], [Product Name], [Handcrafted Style / Material], [Occasion / Gift for Recipient]
              </p>
            </div>
            <p className="mt-3 text-xs leading-6 text-neutral-muted">
              Etsy allows up to 140 characters. Using natural comma-separated phrases allows your title to match varied long-tail search queries while maintaining a warm, artisan tone.
            </p>
          </section>

          {/* Section 5: eBay Listing Title Generator */}
          <section id="ebay-listing-title-generator">
            <h2 className="text-xl font-bold text-ink">
              eBay Listing Title Generator
            </h2>
            <p className="mt-2 text-sm leading-7 text-neutral-secondary">
              eBay enforces a strict <strong>80-character maximum</strong> across all categories. Because character space is scarce, punctuation marks like pipes (|) or bullet points (•) should be minimized:
            </p>
            <div className="mt-3 rounded-xl border border-neutral-border bg-surface p-4">
              <p className="font-mono text-xs text-emerald-800 font-semibold">
                [Brand] [Model / Name] [Primary Keyword] [Item Specifics: Size / Color / Condition / MPN]
              </p>
            </div>
            <p className="mt-3 text-xs leading-6 text-neutral-muted">
              eBay shoppers search using exact item specifics and model numbers. Focus on high-intent search terms, manufacturer numbers, and physical condition without wasting characters on unnecessary punctuation.
            </p>
          </section>

          {/* Section 6: SEO Product Title Generator */}
          <section id="seo-product-title-generator">
            <h2 className="text-xl font-bold text-ink">
              SEO Product Title Generator
            </h2>
            <p className="mt-2 text-sm leading-7 text-neutral-secondary">
              For Google Search and Google Shopping product feeds, titles must align with standard SEO title conventions. Google Shopping feeds typically display approximately 70 characters on mobile shopping grids before cutting off.
            </p>
            <p className="mt-2 text-sm leading-7 text-neutral-secondary">
              Our SEO-focused generation mode places primary commercial keywords at the very front of the title string, followed by the brand and key product attributes, maximizing Google organic click-through rates.
            </p>
          </section>

          {/* Section 7: Product Title Generator for Ecommerce */}
          <section id="product-title-generator-ecommerce">
            <h2 className="text-xl font-bold text-ink">
              Product Title Generator for Ecommerce
            </h2>
            <p className="mt-2 text-sm leading-7 text-neutral-secondary">
              Direct-to-consumer (DTC) storefronts on Shopify, BigCommerce, or WooCommerce require a cleaner, more editorial aesthetic than crowded third-party marketplaces. On your own online store, your title is viewed in the context of your curated brand design:
            </p>
            <div className="mt-3 rounded-xl border border-neutral-border bg-surface p-4">
              <p className="font-mono text-xs text-emerald-800 font-semibold">
                [Product Name] – The [Primary Keyword] [Key Benefit or Fabric]
              </p>
            </div>
            <p className="mt-3 text-xs leading-6 text-neutral-muted">
              DTC titles should remain concise (typically 40 to 70 characters), leaving room for product subtitles and secondary benefit bullets on your product detail page (PDP).
            </p>
          </section>

          {/* Section 8: How Marketplace Product Titles Differ */}
          <section id="how-marketplace-titles-differ">
            <h2 className="text-xl font-bold text-ink">
              How Marketplace Product Titles Differ
            </h2>
            <p className="mt-2 text-sm leading-7 text-neutral-secondary">
              Never copy-paste the exact same product title across every marketplace. Each platform uses distinct algorithms and user expectations:
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs border border-neutral-border rounded-xl overflow-hidden bg-surface">
                <thead className="bg-surface-secondary border-b border-neutral-border text-ink font-bold">
                  <tr>
                    <th className="p-3">Platform</th>
                    <th className="p-3">Character Limit</th>
                    <th className="p-3">Key Focus</th>
                    <th className="p-3">Forbidden Elements</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-border text-neutral-secondary">
                  <tr>
                    <td className="p-3 font-semibold text-ink">Amazon</td>
                    <td className="p-3">Up to 200 chars</td>
                    <td className="p-3">Dense keyword indexation, brand front-loading</td>
                    <td className="p-3">&quot;Best seller&quot;, sale claims, emojis</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-ink">eBay</td>
                    <td className="p-3">Strictly 80 chars</td>
                    <td className="p-3">Item specifics, MPN, model, condition</td>
                    <td className="p-3">Punctuation spam, &quot;L@@K&quot;, fluff words</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-ink">Etsy</td>
                    <td className="p-3">Up to 140 chars</td>
                    <td className="p-3">Occasion, gift recipient, handcrafted style</td>
                    <td className="p-3">Excessive technical jargon, spam tags</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-ink">Google Shopping</td>
                    <td className="p-3">150 max (70 visible)</td>
                    <td className="p-3">Immediate keyword &amp; brand clarity</td>
                    <td className="p-3">Promotional text, all caps, price mentions</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-ink">Shopify / DTC</td>
                    <td className="p-3">Custom (40-70 ideal)</td>
                    <td className="p-3">Brand aesthetics, elegance, customer appeal</td>
                    <td className="p-3">Awkward keyword stuffing</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-neutral-muted italic">
              Platform requirements may change. Verify current marketplace policies directly in seller documentation.
            </p>
          </section>

          {/* Section 9: Product Title Examples */}
          <section id="product-title-examples">
            <h2 className="text-xl font-bold text-ink">
              Product Title Examples
            </h2>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-800">
                  <span>Amazon Title Example (128 Characters)</span>
                  <span className="rounded bg-state-success/15 px-2 py-0.5 border border-state-success/30 text-state-success font-semibold">Zenvuk Score: 96/100</span>
                </div>
                <p className="mt-2 font-mono text-xs text-ink">
                  AuraSound Wireless Noise-Cancelling Headphones – Active Noise Cancelling with 40-Hour Battery, Deep Bass &amp; Travel Case
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-800">
                  <span>eBay Listing Title Example (76 Characters)</span>
                  <span className="rounded bg-state-success/15 px-2 py-0.5 border border-state-success/30 text-state-success font-semibold">Zenvuk Score: 95/100</span>
                </div>
                <p className="mt-2 font-mono text-xs text-ink">
                  AuraSound ANC Wireless Headphones 40-Hour Battery Foldable Travel Case New
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-800">
                  <span>Etsy Artisan Title Example (88 Characters)</span>
                  <span className="rounded bg-state-success/15 px-2 py-0.5 border border-state-success/30 text-state-success font-semibold">Zenvuk Score: 93/100</span>
                </div>
                <p className="mt-2 font-mono text-xs text-ink">
                  Wireless Headphones, Noise-Cancelling Audio Headset, 40-Hour Battery, Gift for Travelers
                </p>
              </div>
            </div>
          </section>

          {/* Section 10: Common Product Title Mistakes */}
          <section id="common-product-title-mistakes">
            <h2 className="text-xl font-bold text-ink">
              Common Product Title Mistakes
            </h2>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-neutral-border bg-surface p-4 text-xs leading-6 text-neutral-secondary">
                <strong className="text-ink block font-semibold">1. Keyword Redundancy &amp; Stacking</strong>
                Writing <em>&quot;Wireless Headphones Bluetooth Wireless Audio Headphones&quot;</em> does not boost rankings; search algorithms penalize redundant repetition and shoppers find it untrustworthy.
              </div>
              <div className="rounded-xl border border-neutral-border bg-surface p-4 text-xs leading-6 text-neutral-secondary">
                <strong className="text-ink block font-semibold">2. Using Subjective Promotional Adjectives</strong>
                Words like &quot;Best&quot;, &quot;Top Rated&quot;, &quot;Cheap&quot;, or &quot;Guaranteed&quot; trigger listing suppression on Amazon and Google Shopping. Stick to verifiable physical specifications.
              </div>
              <div className="rounded-xl border border-neutral-border bg-surface p-4 text-xs leading-6 text-neutral-secondary">
                <strong className="text-ink block font-semibold">3. Exceeding Mobile Visible Viewports</strong>
                Hiding your model number or size past character 70 means mobile shoppers cannot tell whether your product matches their requirements without clicking into the PDP.
              </div>
              <div className="rounded-xl border border-neutral-border bg-surface p-4 text-xs leading-6 text-neutral-secondary">
                <strong className="text-ink block font-semibold">4. ALL CAPS and Symbol Clutter</strong>
                Using all-capitalized words, asterisks, or multiple exclamation marks looks spammy and violates seller conduct policies across most marketplaces.
              </div>
            </div>
          </section>

          {/* Section 11: Product Title Generator FAQs (AEO Answer Blocks) */}
          <section id="product-title-generator-faqs">
            <h2 className="text-xl font-bold text-ink">
              Product Title Generator FAQs
            </h2>
            <div className="mt-5 space-y-4">
              
              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">What is a product title generator?</h3>
                <p className="mt-2 text-xs leading-6 text-neutral-secondary">
                  A product title generator is a specialized software tool that takes your product attributes, primary keywords, brand, and target audience to automatically synthesize search-optimized, policy-compliant listing titles tailored for ecommerce platforms.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">How do I create an SEO product title?</h3>
                <p className="mt-2 text-xs leading-6 text-neutral-secondary">
                  To create an SEO product title, front-load your brand name and primary commercial keyword, follow with essential item specifications like model and color, keep total length within 60 to 80 characters for search engine display, and avoid repetitive keyword stuffing.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">How do I write an Amazon product title?</h3>
                <p className="mt-2 text-xs leading-6 text-neutral-secondary">
                  To write an Amazon product title, follow the formula: Brand + Core Product Title + Key Specifications/Features + Pack Size/Audience. Keep it under 200 characters, avoid promotional words like &quot;Sale&quot; or &quot;Best Seller&quot;, and ensure the first 50 characters identify the item on mobile screens.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">How do I create an Etsy listing title?</h3>
                <p className="mt-2 text-xs leading-6 text-neutral-secondary">
                  To create an Etsy listing title, combine your primary keyword with descriptive artisan phrases, handcrafted materials, and gift recipient or occasion tags separated by commas, keeping within Etsy’s 140-character ceiling.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">How do I generate an eBay listing title?</h3>
                <p className="mt-2 text-xs leading-6 text-neutral-secondary">
                  To generate an eBay listing title, combine Brand, Exact Model, Core Keyword, and key item specifics (size, color, condition, MPN) within eBay’s strict 80-character limit, avoiding punctuation marks that consume character space.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">How long should ecommerce product titles be?</h3>
                <p className="mt-2 text-xs leading-6 text-neutral-secondary">
                  For Google Organic and Google Shopping, 60 to 70 characters is ideal to prevent mobile truncation. On Amazon, 100 to 150 characters is standard; on eBay, the limit is strictly 80 characters; and on Etsy, titles can span up to 140 characters.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">Should I put keywords in product titles?</h3>
                <p className="mt-2 text-xs leading-6 text-neutral-secondary">
                  Yes, product titles are the single most heavily weighted on-page indexing factor in ecommerce search algorithms. Include your primary keyword once near the front of the title in a natural, readable sentence structure.
                </p>
              </div>

            </div>
          </section>

          {/* Important Guidance Disclaimer */}
          <section className="rounded-2xl border border-neutral-border bg-surface p-6 border-l-4 border-l-brand">
            <h2 className="text-base font-bold text-ink">
              Important Guidance &amp; Scoring Notice
            </h2>
            <p className="mt-2 text-xs leading-6 text-neutral-secondary">
              The <strong>Zenvuk Optimization Score</strong> is an internal diagnostic guidance metric evaluating keyword placement, character limits, feature density, and readability. It is NOT an official Google, Amazon, Etsy, or eBay ranking score. Marketplace search algorithms evaluate pricing, sales velocity, reviews, fulfillment speed, and conversion rates. Always verify your titles against the latest official seller policies.
            </p>
          </section>

          {/* Contextual Internal Linking */}
          <section className="rounded-2xl border border-neutral-border bg-surface p-6">
            <h2 className="text-base font-bold text-ink">Related Optimization Utilities</h2>
            <p className="mt-1 text-xs leading-5 text-neutral-muted">
              Strengthen your online store with our complementary browser utilities:
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <Link href="/product-name-generator/" className="rounded-lg bg-surface-secondary border border-neutral-border px-3 py-1.5 font-medium text-neutral-secondary hover:border-brand/40 hover:text-brand transition-colors">
                Product Name Generator →
              </Link>
              <Link href="/meta-description-generator/" className="rounded-lg bg-surface-secondary border border-neutral-border px-3 py-1.5 font-medium text-neutral-secondary hover:border-brand/40 hover:text-brand transition-colors">
                Meta Description Generator →
              </Link>
              <Link href="/utm-builder/" className="rounded-lg bg-surface-secondary border border-neutral-border px-3 py-1.5 font-medium text-neutral-secondary hover:border-brand/40 hover:text-brand transition-colors">
                UTM Parameter Builder →
              </Link>
              <Link href="/methodology/" className="rounded-lg bg-surface-secondary border border-neutral-border px-3 py-1.5 font-medium text-neutral-secondary hover:border-brand/40 hover:text-brand transition-colors">
                Zenvuk Methodology Standards →
              </Link>
            </div>
          </section>

          {/* Related Tools Directory */}
          <RelatedTools tools={related} />
        </article>
      </ProductTitleToolContainer>
    </>
  );
}

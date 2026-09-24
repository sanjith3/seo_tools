import type { Metadata } from "next";
import { UTMBuilderToolContainer } from "./UTMBuilderToolContainer";
import { WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { RelatedTools } from "@/components/common/RelatedTools";
import { getRelatedTools, getToolBySlug } from "@/config/tools";
import { siteConfig } from "@/config/site";

const tool = getToolBySlug("utm-builder")!;
const related = getRelatedTools("utm-builder");

export const metadata: Metadata = {
  title: {
    absolute: tool.metaTitle
  },
  description: tool.metaDescription,
  alternates: {
    canonical: "/utm-builder/"
  },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    url: `${siteConfig.url}/utm-builder/`,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: tool.metaTitle,
    description: tool.metaDescription
  }
};

export default function UTMBuilderPage() {
  return (
    <>
      <WebApplicationJsonLd
        name={tool.name}
        description={tool.metaDescription}
        url={`${siteConfig.url}/utm-builder/`}
        category="MarketingApplication"
      />

      <UTMBuilderToolContainer>
        {/* Supporting Educational Content */}
        <article className="mt-16 border-t border-neutral-border pt-12 space-y-12 max-w-[880px]">
          {/* Section 1: AEO Answer Block */}
          <section>
            <h2 className="text-2xl font-bold text-ink">
              What Is a UTM Builder?
            </h2>
            <div className="mt-4 rounded-xl border border-neutral-border bg-surface p-5 border-l-4 border-l-brand">
              <p className="text-sm font-semibold text-ink">
                Quick Answer:
              </p>
              <p className="mt-1 text-sm leading-7 text-[#C7D3E3]">
                A UTM builder is an essential digital marketing utility that appends Urchin Tracking Module (UTM) query parameters—specifically source, medium, campaign name, term, and content—to destination website URLs. When users click these tagged links, analytics platforms like Google Analytics 4 (GA4) accurately attribute sessions, traffic channels, and ecommerce conversions to specific marketing campaigns.
              </p>
            </div>
            <p className="mt-4 text-sm leading-7 text-neutral-secondary">
              Unlike generic URL taggers that produce syntax errors or compromise privacy, Zenvuk&apos;s UTM Builder runs natively inside your browser. It strictly adheres to RFC 3986 URL encoding specifications, cleanly merges existing query strings, restores hash anchors (<code className="font-mono text-xs text-neutral-secondary bg-surface-secondary px-1.5 py-0.5 rounded border border-neutral-border">#fragment</code>) to the end of the URL, and generates instant vector QR codes without calling third-party APIs.
            </p>
          </section>

          {/* Section 2: How to Build a UTM Tracking Link */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              How to Build a UTM Tracking Link
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Follow this step-by-step process to generate clean, error-free campaign URLs that pass GA4 channel attribution rules:
            </p>
            <ol className="list-decimal space-y-3 pl-5 text-sm leading-7 text-neutral-secondary mt-3">
              <li>
                <strong>Paste Your Destination URL:</strong> Enter the target webpage link (e.g., <code className="font-mono text-xs">https://yourbrand.com/landing-page</code>). Any existing tracking parameters or anchor fragments are automatically preserved.
              </li>
              <li>
                <strong>Define Campaign Source (<code className="font-mono text-xs">utm_source</code>):</strong> Identify the specific platform or referrer originating the visit (e.g., <em>facebook</em>, <em>google</em>, <em>newsletter</em>, or <em>linkedin</em>).
              </li>
              <li>
                <strong>Specify Campaign Medium (<code className="font-mono text-xs">utm_medium</code>):</strong> Select the high-level marketing mechanism (e.g., <em>cpc</em> for paid search, <em>paid_social</em> for social ads, <em>email</em> for broadcasts, or <em>referral</em>).
              </li>
              <li>
                <strong>Name Your Campaign (<code className="font-mono text-xs">utm_campaign</code>):</strong> Assign a descriptive, lowercase name identifying your promotional initiative (e.g., <em>spring_sale_2025</em>).
              </li>
              <li>
                <strong>Add Optional Term & Content:</strong> Use <code className="font-mono text-xs">utm_term</code> to record paid search keywords, and use <code className="font-mono text-xs">utm_content</code> to differentiate A/B test variations or creative placements (e.g., <em>hero_banner_blue</em>).
              </li>
              <li>
                <strong>Copy, Verify, and Share:</strong> Click <em>Copy Campaign URL</em> to save the link to your clipboard and local browser history, or generate an offline QR code for physical collateral.
              </li>
            </ol>
          </section>

          {/* Section 3: UTM Generator: Why Campaign Tracking Matters */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              UTM Generator: Why Campaign Tracking Matters
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Without UTM tracking parameters, web analytics platforms are forced to rely on browser referrer headers to determine where visitors come from. When visitors arrive from email clients, PDF documents, messaging apps (like WhatsApp or Slack), or mobile social feeds, referrer headers are frequently stripped away. Analytics engines then lump this valuable traffic into generic <strong>&quot;Direct / None&quot;</strong> buckets.
            </p>
            <p className="mt-3 text-sm leading-7 text-neutral-secondary">
              Using a structured UTM generator guarantees clean attribution across your marketing funnel. You gain granular visibility into which specific ads, newsletters, influencer collaborations, or promotional buttons yield high return on ad spend (ROAS) and long-term customer lifetime value (LTV). Pair your campaign links with our <a href="/meta-description-generator/" className="font-semibold text-brand hover:underline">Meta Description Generator</a> to maximize organic search CTR before launching paid boosts.
            </p>
          </section>

          {/* Section 4: Google UTM Builder vs. GA4 Requirements */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Google UTM Builder vs. GA4 Requirements
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Google Analytics 4 uses strict, pre-defined <strong>Default Channel Grouping</strong> logic. If your campaign parameters deviate from GA4’s required naming rules, your traffic will be classified as &quot;Unassigned&quot;, breaking executive reports:
            </p>
            <div className="mt-4 overflow-hidden rounded-xl border border-neutral-border bg-surface">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-secondary text-ink border-b border-neutral-border">
                  <tr>
                    <th className="py-3 px-4 font-bold">GA4 Default Channel</th>
                    <th className="py-3 px-4 font-bold">Accepted <code className="font-mono">utm_medium</code> Values</th>
                    <th className="py-3 px-4 font-bold">Accepted <code className="font-mono">utm_source</code> Values</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-border text-neutral-secondary">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-ink">Paid Search</td>
                    <td className="py-3 px-4 font-mono">cpc, ppc, paidsearch</td>
                    <td className="py-3 px-4">google, bing, yahoo, baidu</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-ink">Paid Social</td>
                    <td className="py-3 px-4 font-mono">paid_social, paid-social, cpc</td>
                    <td className="py-3 px-4">facebook, instagram, linkedin, twitter, tiktok</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-ink">Organic Social</td>
                    <td className="py-3 px-4 font-mono">social, social-network, sm</td>
                    <td className="py-3 px-4">facebook, instagram, linkedin, twitter, reddit</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-ink">Email</td>
                    <td className="py-3 px-4 font-mono">email, newsletter</td>
                    <td className="py-3 px-4">Any mailing vendor or list identifier</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-ink">Affiliates</td>
                    <td className="py-3 px-4 font-mono">affiliate, affiliates</td>
                    <td className="py-3 px-4">Partner domain or affiliate ID</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5: Campaign URL Builder Best Practices */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Campaign URL Builder Best Practices
            </h2>
            <div className="grid gap-4 sm:grid-cols-3 mt-4">
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand">Strict Lowercase</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  Always use lowercase for all parameters. Analytics engines treat &quot;Facebook&quot;, &quot;facebook&quot;, and &quot;FACEBOOK&quot; as three completely separate source entities.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand">Hyphens or Underscores</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  Never use space characters. Spaces convert into unsightly <code className="font-mono">%20</code> encodings. Standardize on hyphens or underscores across your entire marketing team.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand">Central Taxonomy</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  Document your campaign naming conventions in a shared company spreadsheet to prevent team members from inventing conflicting source and medium tags.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: UTM Campaign Builder: Anatomy of the 5 Standard Parameters */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              UTM Campaign Builder: Anatomy of the 5 Standard Parameters
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-sky-700">utm_source</h3>
                  <span className="text-[10px] font-bold text-brand uppercase">Required</span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-ink">Example: google, facebook, newsletter</p>
                <p className="mt-2 text-xs leading-5 text-neutral-muted">
                  Identifies the specific platform, vendor, or publication sending traffic to your URL.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-sky-700">utm_medium</h3>
                  <span className="text-[10px] font-bold text-brand uppercase">Required</span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-ink">Example: cpc, paid_social, email, referral</p>
                <p className="mt-2 text-xs leading-5 text-neutral-muted">
                  Identifies the overarching marketing delivery channel that houses the campaign link.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-sky-700">utm_campaign</h3>
                  <span className="text-[10px] font-bold text-brand uppercase">Required</span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-ink">Example: spring_sale, product_launch_q2</p>
                <p className="mt-2 text-xs leading-5 text-neutral-muted">
                  Identifies the unique marketing initiative, product launch, seasonal promotion, or strategic event.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-sky-700">utm_term</h3>
                  <span className="text-[10px] font-semibold text-neutral-muted uppercase">Optional</span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-ink">Example: running_shoes, accounting_software</p>
                <p className="mt-2 text-xs leading-5 text-neutral-muted">
                  Primarily used in paid search campaigns to track the specific target keyword triggering the ad click.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-4 sm:col-span-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-sky-700">utm_content</h3>
                  <span className="text-[10px] font-semibold text-neutral-muted uppercase">Optional</span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-ink">Example: hero_cta_blue, sidebar_banner, footer_link</p>
                <p className="mt-2 text-xs leading-5 text-neutral-muted">
                  Used for A/B testing and differentiating multiple links that point to the exact same destination URL within a single email or landing page.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7: UTM Code Generator: How Parameters Work in URLs */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              UTM Code Generator: How Parameters Work in URLs
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              A standard URL is composed of several architectural parts: the protocol (<code className="font-mono text-xs">https://</code>), domain (<code className="font-mono text-xs">zenvuk.com</code>), path (<code className="font-mono text-xs">/tools/</code>), query string (<code className="font-mono text-xs">?key=val</code>), and hash anchor (<code className="font-mono text-xs">#section</code>).
            </p>
            <div className="mt-3 rounded-xl border border-neutral-border bg-surface p-4 font-mono text-xs leading-relaxed text-brand break-all rounded-xl border">
              https://example.com/page<span className="text-brand font-bold">?</span>utm_source=facebook<span className="text-brand font-bold">&</span>utm_medium=paid_social<span className="text-brand font-bold">&</span>utm_campaign=summer_sale<span className="text-emerald-700 font-bold">#pricing</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-neutral-secondary">
              The query string begins with a single question mark (<code className="font-mono text-xs">?</code>). Subsequent parameters are appended with ampersands (<code className="font-mono text-xs">&</code>). Crucially, the fragment identifier (<code className="font-mono text-xs">#</code>) must always be placed at the very end of the URL string. If UTM parameters are accidentally appended after the hash, web browsers treat them as part of the local page anchor and never transmit them to tracking scripts.
            </p>
          </section>

          {/* Section 8: URL Builder for Paid Ads vs. Organic Channels */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              URL Builder for Paid Ads vs. Organic Channels
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              When managing paid advertising versus organic content, different attribution methods apply:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-neutral-secondary mt-3">
              <li>
                <strong>Google Ads Auto-Tagging:</strong> Google Ads natively injects a Google Click Identifier (<code className="font-mono text-xs">gclid</code>). If your GA4 property is directly linked to Google Ads, manual UTM tagging is optional unless you also need campaign data in third-party CRM systems (like HubSpot or Salesforce).
              </li>
              <li>
                <strong>Paid Social (Meta Ads, LinkedIn Ads, TikTok Ads):</strong> These platforms do not automatically integrate session-level data into GA4 without manual UTM parameters. Always use our URL builder to set <code className="font-mono text-xs">utm_source=facebook</code> and <code className="font-mono text-xs">utm_medium=paid_social</code>.
              </li>
              <li>
                <strong>Organic Social & Influencers:</strong> Tag all links shared in link-in-bio profiles, guest posts, and organic YouTube descriptions with <code className="font-mono text-xs">utm_medium=social</code> to distinguish free viral clicks from paid advertising.
              </li>
            </ul>
          </section>

          {/* Section 9: UTM Link Generator for Social Media */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              UTM Link Generator for Social Media
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Social platforms require distinct configurations to ensure clean GA4 grouping:
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <div className="flex items-center justify-between text-xs font-bold text-ink">
                  <span>Facebook Ads Campaign</span>
                  <span className="rounded bg-brand/15 px-2 py-0.5 border border-brand/30 text-brand font-semibold">Paid Social</span>
                </div>
                <p className="mt-2 font-mono text-xs text-ink break-all">
                  https://example.com/product?utm_source=facebook&utm_medium=paid_social&utm_campaign=summer_promo&utm_content=carousel_ad_v2
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <div className="flex items-center justify-between text-xs font-bold text-ink">
                  <span>LinkedIn B2B Thought Leadership Post</span>
                  <span className="rounded bg-surface-secondary px-2 py-0.5 border border-neutral-border text-neutral-secondary font-semibold">Organic Social</span>
                </div>
                <p className="mt-2 font-mono text-xs text-ink break-all">
                  https://example.com/whitepaper?utm_source=linkedin&utm_medium=social&utm_campaign=founder_insight&utm_content=post_link
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <div className="flex items-center justify-between text-xs font-bold text-ink">
                  <span>YouTube Video Description Link</span>
                  <span className="rounded bg-surface-secondary px-2 py-0.5 border border-neutral-border text-neutral-secondary font-semibold">Video Social</span>
                </div>
                <p className="mt-2 font-mono text-xs text-ink break-all">
                  https://example.com/tutorial?utm_source=youtube&utm_medium=social&utm_campaign=nextjs_seo_course&utm_content=video_desc_link
                </p>
              </div>
            </div>
          </section>

          {/* Section 10: UTM Tracking Link Generator for Email Marketing */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              UTM Tracking Link Generator for Email Marketing
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Email service providers (like Mailchimp, Klaviyo, or ConvertKit) frequently offer automated link tagging. However, automated taggers often use inconsistent medium labels (such as <code className="font-mono text-xs">email-broadcast</code> or <code className="font-mono text-xs">klaviyo</code>) that cause GA4 to categorize visits as unassigned.
            </p>
            <p className="mt-3 text-sm leading-7 text-neutral-secondary">
              Using Zenvuk&apos;s UTM builder to create standardized email links ensures full compliance with GA4&apos;s <code className="font-mono text-xs">utm_medium=email</code> rule. Use <code className="font-mono text-xs">utm_content</code> to compare the performance of header text links versus high-contrast call-to-action buttons inside the same message.
            </p>
          </section>

          {/* Section 11: Offline Marketing & QR Code Campaign Tracking */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Offline Marketing and QR Code Campaign Tracking
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Offline marketing—such as trade show booth banners, direct mail postcards, retail packaging, and print magazines—can be seamlessly tracked in Google Analytics using tagged QR codes:
            </p>
            <div className="mt-4 rounded-xl border border-neutral-border bg-surface p-5 space-y-3">
              <p className="text-xs leading-6 text-neutral-secondary">
                <strong>How to Tag Offline Collateral:</strong> Build a URL with <code className="font-mono text-xs">utm_source=print</code>, <code className="font-mono text-xs">utm_medium=qr_code</code>, and <code className="font-mono text-xs">utm_campaign=expo_2025_chicago</code>. Click the <em>QR Code</em> button in our tool to instantly render an offline SVG code.
              </p>
              <p className="text-xs leading-6 text-neutral-secondary">
                <strong>100% Private Offline Generation:</strong> Many free QR code websites route traffic through their own tracking redirect servers, slowing down load times and creating single-point-of-failure vulnerabilities. Zenvuk generates QR code SVG vectors directly inside your browser memory using pure JavaScript math. No external tracking endpoints are called.
              </p>
            </div>
          </section>

          {/* Section 12: UTM Parameter Reference Table */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              UTM Parameter Reference Table
            </h2>
            <p className="text-sm leading-7 text-neutral-secondary">
              Reference this authoritative cheat sheet when structuring campaign URLs:
            </p>
            <div className="mt-4 overflow-hidden rounded-xl border border-neutral-border bg-surface">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-secondary text-ink border-b border-neutral-border">
                  <tr>
                    <th className="py-3 px-4 font-bold">Parameter</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                    <th className="py-3 px-4 font-bold">GA4 Attribution Purpose</th>
                    <th className="py-3 px-4 font-bold">Recommended Syntax Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-border text-neutral-secondary">
                  <tr>
                    <td className="py-3 px-4 font-mono font-semibold text-sky-700">utm_source</td>
                    <td className="py-3 px-4 font-bold text-brand uppercase">Required</td>
                    <td className="py-3 px-4">Identifies the referrer or originating platform</td>
                    <td className="py-3 px-4 font-mono">google, facebook, newsletter</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono font-semibold text-sky-700">utm_medium</td>
                    <td className="py-3 px-4 font-bold text-brand uppercase">Required</td>
                    <td className="py-3 px-4">Defines the high-level marketing channel</td>
                    <td className="py-3 px-4 font-mono">cpc, paid_social, email, referral</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono font-semibold text-sky-700">utm_campaign</td>
                    <td className="py-3 px-4 font-bold text-brand uppercase">Required</td>
                    <td className="py-3 px-4">Names the strategic initiative or promotion</td>
                    <td className="py-3 px-4 font-mono">black_friday_2025, summer_launch</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono font-semibold text-sky-700">utm_term</td>
                    <td className="py-3 px-4 text-neutral-muted uppercase">Optional</td>
                    <td className="py-3 px-4">Identifies paid search keywords or audience targets</td>
                    <td className="py-3 px-4 font-mono">running_shoes, seo_software</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono font-semibold text-sky-700">utm_content</td>
                    <td className="py-3 px-4 text-neutral-muted uppercase">Optional</td>
                    <td className="py-3 px-4">Differentiates creative variants and A/B test links</td>
                    <td className="py-3 px-4 font-mono">blue_btn, hero_image, sidebar_banner</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 13: Common UTM Tracking Mistakes */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              Common UTM Tracking Mistakes
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700">Tagging Internal Website Links</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  Placing UTM parameters on internal banners or header navigation links completely erases original traffic sources and creates artificial new sessions in Google Analytics.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700">Inconsistent Letter Casing</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  Mixing <code className="text-neutral-secondary font-mono bg-surface-secondary px-1.5 py-0.5 rounded border border-neutral-border">Email</code>, <code className="text-neutral-secondary font-mono bg-surface-secondary px-1.5 py-0.5 rounded border border-neutral-border">email</code>, and <code className="text-neutral-secondary font-mono bg-surface-secondary px-1.5 py-0.5 rounded border border-neutral-border">EMAIL</code> fragments analytics reports into three separate rows.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700">Placing Tags After URL Hash Anchors</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  Adding parameters after hash fragments (<code className="text-neutral-secondary font-mono bg-surface-secondary px-1.5 py-0.5 rounded border border-neutral-border">#pricing?utm_source=...</code>) prevents browsers from sending tags to GA4 scripts.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700">Unencoded Space Characters</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-muted">
                  Using spaces instead of hyphens or underscores results in messy <code className="text-neutral-secondary font-mono bg-surface-secondary px-1.5 py-0.5 rounded border border-neutral-border">%20</code> encodings that can break in email clients.
                </p>
              </div>
            </div>
          </section>

          {/* Section 14: UTM Builder FAQs */}
          <section>
            <h2 className="text-xl font-bold text-ink">
              UTM Builder FAQs
            </h2>
            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">Do UTM parameters affect organic SEO rankings?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-muted">
                  No, UTM parameters do not directly affect search rankings. However, to prevent search engines from indexing parameterized campaign URLs as duplicate content, always ensure your destination pages contain a self-referencing canonical tag (<code className="text-brand font-mono">&lt;link rel=&quot;canonical&quot; href=&quot;https://yoursite.com/page/&quot;&gt;</code>) pointing to the clean URL without query strings.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">How does the offline QR code generator work?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-muted">
                  Our QR code generator runs directly in your browser using pure JavaScript vector math. It converts the tagged URL into an SVG image locally without making requests to third-party QR services, ensuring speed, offline reliability, and privacy.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">What is the difference between source and medium?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-muted">
                  Source answers <em>where</em> the visitor originated (e.g. &quot;google&quot;, &quot;facebook&quot;, or &quot;newsletter&quot;), while medium answers <em>how</em> the visitor reached your site (e.g. &quot;cpc&quot; for paid ads, &quot;paid_social&quot; for sponsored posts, or &quot;email&quot; for newsletters).
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">Can I export my campaign history to Excel or Google Sheets?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-muted">
                  Yes. In the Recent Campaign History section, click &quot;Export All CSV&quot; to download all tagged URLs along with creation timestamps, parameter breakdowns, and destination links in a standard comma-separated format.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">Where is my campaign history stored?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-muted">
                  Campaign history is stored only in this browser using native <code className="text-brand font-mono">localStorage</code>. No campaign names, URLs, or parameter records are ever uploaded to Zenvuk servers. You can clear this data at any time with a single click.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-border bg-surface p-5">
                <h3 className="text-sm font-bold text-ink">Can I shorten UTM links before sharing them on social media?</h3>
                <p className="mt-1 text-xs leading-6 text-neutral-muted">
                  Yes. You can take your generated UTM URL and paste it into link shorteners like Bitly or your custom branded domain shortener. The shortened link will 301-redirect visitors to the full destination URL with all UTM parameters intact.
                </p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <RelatedTools tools={related} />
        </article>
      </UTMBuilderToolContainer>
    </>
  );
}

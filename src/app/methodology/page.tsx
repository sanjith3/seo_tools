import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Methodology & Scoring Standards – Practical SEO Utilities",
  description:
    "Learn how Zenvuk generates outputs, our deterministic client-side engines, scoring standards, and local data handling privacy principles.",
  alternates: {
    canonical: "/methodology/"
  },
  openGraph: {
    title: "Methodology & Scoring Standards – Practical SEO Utilities | Zenvuk",
    description:
      "Learn how Zenvuk generates outputs, our deterministic client-side engines, scoring standards, and local data handling privacy principles.",
    url: `${siteConfig.url}/methodology/`,
    type: "website"
  }
};

export default function MethodologyPage() {
  return (
    <InfoPage
      title="Methodology & Scoring Standards"
      intro="Complete technical transparency regarding our generation algorithms, internal scoring formulas, privacy model, and operational limitations across all 15 utilities."
      category="Standards"
      lastUpdated="September 2026"
      canonicalPath="/methodology/"
    >
      <div className="rounded-2xl border border-brand/20 bg-brand/5 p-5 text-xs leading-6 text-neutral-secondary">
        <strong className="text-brand font-bold uppercase tracking-wider block mb-1">
          Official Guidance Notice
        </strong>
        Zenvuk scores and audits are internal guidance metrics and are not Google scores, Amazon scores, or ranking guarantees. They evaluate structural adherence to public SEO specifications, Schema.org vocabularies, IETF RFC standards, and marketplace best practices.
      </div>

      <h2>1. Deterministic Generation Philosophy</h2>
      <p>
        Most modern web utilities rely on generic cloud AI APIs. While flexible, large language models introduce severe drawbacks for technical utilities: they hallucinate unsupported specifications, suffer from server downtime, introduce latency, and require expensive monthly subscriptions.
      </p>
      <p>
        Zenvuk takes a different architectural path. Our tools are built with <strong>deterministic TypeScript engines</strong> executed locally in your browser. When you generate Schema markup, robots.txt, or XML sitemaps:
      </p>
      <ul>
        <li>Output is calculated in milliseconds without server requests.</li>
        <li>Variations follow strict structural grammar templates and marketplace schemas.</li>
        <li>No unverified specifications (such as false dimensions, materials, or certifications) are ever fabricated.</li>
        <li>Zero data collection or tracking: your inputs never leave your device.</li>
      </ul>

      <h2>2. Technical Standards &amp; Calculation Rules</h2>
      <p>
        Here is how our 10 new technical SEO and metadata utilities compute, validate, and format outputs:
      </p>

      <h3>Schema Markup Generator</h3>
      <p>
        Generates validated JSON-LD scripts conforming to Schema.org vocabulary version 26.0+ across 15 schemas (Organization, LocalBusiness, Article, Product, FAQPage, BreadcrumbList, HowTo, Recipe, VideoObject, Event, JobPosting, SoftwareApplication, WebSite, Person, Service). Isolates user-generated schema to code preview containers and download files to ensure host-page isolation.
      </p>

      <h3>LLMS.txt Generator &amp; Validator</h3>
      <p>
        Constructs standardized <code>/llms.txt</code> markdown manifests following the community specification for machine readability. Validates absolute HTTPS links, flags duplicate entry paths, and provides contextual notices clarifying that llms.txt is an emerging proposal rather than an official W3C standard.
      </p>

      <h3>Hreflang Generator</h3>
      <p>
        Generates dual HTML <code>&lt;link rel=&quot;alternate&quot; hreflang=&quot;...&quot;&gt;</code> tags and XML sitemap hreflang blocks. Validates ISO 639-1 language codes, optional ISO 3166-1 country regions, and enforces mandatory <code>x-default</code> declarations for unmatched geographic locales.
      </p>

      <h3>Robots.txt Generator &amp; Validator</h3>
      <p>
        Constructs standard-compliant crawler control manifests conforming to RFC 9309 (Robots Exclusion Protocol). Validates user agents, allow/disallow paths, and raises high-priority alerts whenever <code>Disallow: /</code> is configured on <code>User-agent: *</code> to prevent accidental de-indexing.
      </p>

      <h3>Google SERP Preview Tool</h3>
      <p>
        Simulates Google desktop (~600px) and mobile (~580px) search snippets. Calculates exact typographical pixel widths using proportional character-width tables based on Arial 20px (titles) and Arial 14px (descriptions) rather than basic, inaccurate character counts.
      </p>

      <h3>Open Graph &amp; Twitter Card Generator</h3>
      <p>
        Creates complete <code>og:</code> and <code>twitter:</code> metadata blocks for Facebook, LinkedIn, and Twitter/X. Validates absolute image URLs, title/description character thresholds, and verifies optimal 1.91:1 aspect ratios (1200x630px).
      </p>

      <h3>Canonical Tag Generator &amp; Checker</h3>
      <p>
        Constructs standardized <code>rel=&quot;canonical&quot;</code> HTML tags and HTTP Link response headers. Cleans dynamic query parameters (<code>utm_*</code>, <code>gclid</code>, <code>fbclid</code>), enforces HTTPS, normalizes trailing slashes, and flags relative URL errors.
      </p>

      <h3>Keyword Density &amp; N-Gram Analyzer</h3>
      <p>
        Calculates exact word and phrase frequencies across unigrams (1-word), bigrams (2-word), trigrams (3-word), and 4-grams. Filters 120+ English stop words, calculates reading times, and audits text for over-optimization without imposing arbitrary keyword quotas.
      </p>

      <h3>URL Slug Generator &amp; Cleaner</h3>
      <p>
        Transliterates non-Latin Unicode diacritics (accents, umlauts), filters common stop words, removes special symbols, and creates clean hyphen-delimited permalinks adhering to Google&apos;s URL design recommendations.
      </p>

      <h3>XML Sitemap Generator &amp; Validator</h3>
      <p>
        Outputs UTF-8 XML manifests conforming to the sitemaps.org 0.9 schema. Supports <code>&lt;lastmod&gt;</code>, <code>&lt;changefreq&gt;</code>, and <code>&lt;priority&gt;</code> tags, and validates the 50,000 URL / 50MB file size limit per document.
      </p>

      <h2>3. Scoring System Breakdown</h2>
      <p>
        Our content and title tools feature real-time quality scores rated from 0 to 100 based on the following metrics:
      </p>

      <h3>Product Title Generator Scoring (0–100)</h3>
      <ul>
        <li>
          <strong>Keyword Placement (up to 45 pts):</strong> Front-loading the exact search query within the first 25 characters earns maximum points, reflecting how mobile shoppers and search spiders prioritize early tokens.
        </li>
        <li>
          <strong>Length Optimization (up to 25 pts):</strong> Titles staying between 40 and 120 characters avoid truncation across desktop and mobile SERPs and marketplace grids.
        </li>
        <li>
          <strong>Feature Relevance (up to 15 pts):</strong> Rewarded for smoothly integrating user-supplied features and benefits without keyword stuffing.
        </li>
        <li>
          <strong>Readability &amp; Repetition Penalty (up to 15 pts):</strong> Deductions occur if words are repeated or separated by erratic punctuation.
        </li>
      </ul>

      <h3>Meta Description Generator Scoring (0–100)</h3>
      <ul>
        <li>
          <strong>Target Character Length (up to 30 pts):</strong> Rewarding descriptions that land comfortably in the 140–155 character window, maximizing snippet real estate while avoiding Google&apos;s 160-character truncation cut-off.
        </li>
        <li>
          <strong>Primary Keyword Usage (up to 30 pts):</strong> Front-loading primary keywords to trigger bolded query matching in search results.
        </li>
        <li>
          <strong>Call to Action (CTA) Clarity (up to 20 pts):</strong> Verifying the presence of active intent verbs (e.g. <em>Shop now, Learn more, Discover, Contact us</em>).
        </li>
        <li>
          <strong>Readability and Flow (up to 20 pts):</strong> Ensuring concise sentence structure and minimal repetitive terms.
        </li>
      </ul>

      <h2>4. Data Handling: What Is Stored vs. Not Stored</h2>
      <div className="grid gap-4 sm:grid-cols-2 mt-4">
        <div className="rounded-xl border border-neutral-border bg-surface p-4 border-l-4 border-l-state-success">
          <h4 className="text-xs font-bold uppercase tracking-wider text-state-success">What Is Never Stored</h4>
          <ul className="mt-2 text-xs space-y-1.5 text-neutral-secondary">
            <li>• Your FAQ questions and answers</li>
            <li>• Your sitemaps, robots.txt rules, or hreflang mappings</li>
            <li>• Generated metadata, schemas, and titles</li>
            <li>• Pasted content drafts and articles</li>
            <li>• We maintain zero remote user databases</li>
          </ul>
        </div>

        <div className="rounded-xl border border-neutral-border bg-surface p-4 border-l-4 border-l-brand">
          <h4 className="text-xs font-bold uppercase tracking-wider text-brand">What You Control Locally</h4>
          <ul className="mt-2 text-xs space-y-1.5 text-neutral-secondary">
            <li>• Recent UTM campaign URLs (stored strictly in your browser&apos;s localStorage)</li>
            <li>• Saved favorites (kept in temporary session memory)</li>
            <li>• You can clear your browser history at any time</li>
          </ul>
        </div>
      </div>

      <h2>5. Testing and Quality Assurance</h2>
      <p>
        All 15 Zenvuk tools undergo automated unit testing via Vitest before every production deployment. We test for RFC 4180 CSV compliance, RFC 3986 URL encoding, RFC 9309 REP compliance, sitemaps.org 0.9 XML validation, Schema.org syntax validity, and boundary condition handling (including unicode characters, deep URL query strings, and hash fragments).
      </p>
    </InfoPage>
  );
}

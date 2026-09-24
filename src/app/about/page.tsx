import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Zenvuk – 15 Practical Technical SEO & Marketing Utilities",
  description:
    "Learn why Zenvuk was built, how our deterministic client-side generation engines operate, and our commitment to 15 free browser utilities without login friction.",
  alternates: {
    canonical: "/about/"
  },
  openGraph: {
    title: "About Zenvuk – 15 Practical Technical SEO & Marketing Utilities | Zenvuk",
    description:
      "Learn why Zenvuk was built, how our deterministic client-side generation engines operate, and our commitment to 15 free browser utilities without login friction.",
    url: `${siteConfig.url}/about/`,
    type: "website"
  }
};

export default function AboutPage() {
  return (
    <InfoPage
      title="About Zenvuk"
      intro="Zenvuk is an independent utility platform providing fast, browser-first tools for SEO specialists, technical developers, ecommerce founders, and digital marketers."
      category="Company"
      lastUpdated="September 2026"
      canonicalPath="/about/"
    >
      <h2>Why Zenvuk Exists</h2>
      <p>
        Modern digital marketing and technical SEO workflows are frequently bogged down by friction: mandatory account registrations, subscription paywalls, slow cloud databases, and opaque AI tools that hallucinate facts.
      </p>
      <p>
        Everyday tasks like generating a validated Schema.org script, configuring a robots.txt manifest, testing SERP snippet pixel boundaries, or generating an XML sitemap should not require a 14-day software trial or an API credit card subscription.
      </p>
      <p>
        Zenvuk was created to solve these targeted operational bottlenecks by delivering 15 lightweight, highly focused utilities that run directly inside your browser session.
      </p>

      <h2>Our Core Technical Philosophy</h2>
      <p>
        We build software around three non-negotiable principles:
      </p>
      <ul>
        <li>
          <strong>Deterministic Quality Over Hype:</strong> We reject the practice of wrapping expensive, black-box AI APIs for tasks that are better solved with transparent linguistic rules, RFC specifications, and Schema.org vocabularies. Our engines use curated formulas tested against real search engine documentation.
        </li>
        <li>
          <strong>Client-Side Processing &amp; Privacy:</strong> Your marketing strategies, keywords, and campaign budgets are confidential. We process your inputs in your local browser memory rather than transmitting them to remote servers.
        </li>
        <li>
          <strong>Zero Friction Access:</strong> No logins, passwords, verification emails, or hidden credit limits. You open the tool, generate your asset, copy or export the result, and get back to your work.
        </li>
      </ul>

      <h2>The 15 Zenvuk Utilities</h2>
      <p>
        Zenvuk utilities are organized across practical technical clusters:
      </p>
      <ul>
        <li>
          <strong>Structured Data:</strong> The <Link href="/schema-markup-generator/" className="text-brand font-semibold underline">Schema Markup Generator</Link> (15 Schema.org types) and <Link href="/faq-schema-generator/" className="text-brand font-semibold underline">FAQ Schema Generator</Link>.
        </li>
        <li>
          <strong>Technical SEO &amp; Crawling:</strong> The <Link href="/robots-txt-generator/" className="text-brand font-semibold underline">Robots.txt Generator &amp; Validator</Link>, <Link href="/xml-sitemap-generator/" className="text-brand font-semibold underline">XML Sitemap Generator &amp; Validator</Link>, <Link href="/hreflang-generator/" className="text-brand font-semibold underline">Hreflang Generator</Link>, and <Link href="/canonical-tag-generator/" className="text-brand font-semibold underline">Canonical Tag Generator</Link>.
        </li>
        <li>
          <strong>Metadata &amp; Search Appearance:</strong> The <Link href="/serp-preview-tool/" className="text-brand font-semibold underline">SERP Preview Tool</Link>, <Link href="/open-graph-generator/" className="text-brand font-semibold underline">Open Graph &amp; Twitter Card Generator</Link>, and <Link href="/meta-description-generator/" className="text-brand font-semibold underline">Meta Description Generator</Link>.
        </li>
        <li>
          <strong>AI &amp; Content Optimization:</strong> The <Link href="/llms-txt-generator/" className="text-brand font-semibold underline">LLMS.txt Generator &amp; Validator</Link>, <Link href="/keyword-density-checker/" className="text-brand font-semibold underline">Keyword Density &amp; N-Gram Analyzer</Link>, and <Link href="/url-slug-generator/" className="text-brand font-semibold underline">URL Slug Generator</Link>.
        </li>
        <li>
          <strong>Ecommerce &amp; Attribution:</strong> The <Link href="/product-title-generator/" className="text-brand font-semibold underline">Product Title Generator</Link>, <Link href="/product-name-generator/" className="text-brand font-semibold underline">Product Name Generator</Link>, and <Link href="/utm-builder/" className="text-brand font-semibold underline">UTM Parameter Builder</Link>.
        </li>
      </ul>

      <h2>Editorial Standards and Transparency</h2>
      <p>
        Zenvuk is maintained by the {siteConfig.creator}. We do not fabricate executive biographies, publish false user testimonials, or claim misleading endorsements. Our guidance is drawn directly from published technical specifications, including the W3C, Schema.org, Google Search Central, and RFC standards.
      </p>
      <p>
        To understand how our generation algorithms calculate scores and enforce constraints, please explore our detailed <Link href="/methodology/" className="text-brand font-semibold underline">Methodology page</Link>. For questions, tool recommendations, or technical feedback, contact our team directly at <a href={`mailto:${siteConfig.email}`} className="text-brand font-semibold underline">{siteConfig.email}</a>.
      </p>
    </InfoPage>
  );
}

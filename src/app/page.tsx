import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  Compass,
  Type,
  Search,
  Code2,
  Share2,
  FileCode,
  Network,
  Check
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { ToolCard } from "@/components/ToolCard";
import { toolsRegistry } from "@/config/tools";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    absolute: "Free SEO & Marketing Tools for Practical Work | Zenvuk"
  },
  description:
    "15 professional browser utilities for technical SEO, structured data, metadata optimization, and marketing attribution. No login, zero API fees.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Free SEO & Marketing Tools for Practical Work | Zenvuk",
    description:
      "15 professional browser utilities for technical SEO, structured data, metadata optimization, and marketing attribution. 100% client-side privacy.",
    url: `${siteConfig.url}/`,
    type: "website"
  }
};

export default function HomePage() {
  const allTools = toolsRegistry;

  return (
    <>
      <Header />
      <main>
        {/* Compact Hero Section */}
        <section
          className="relative border-b border-neutral-border bg-surface py-14 sm:py-20"
          style={{
            backgroundImage: "radial-gradient(circle at top center, rgba(91, 124, 255, 0.10), transparent 50%)"
          }}
        >
          <div className="container max-w-4xl text-center">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-surface-secondary border border-[rgba(91,124,255,0.30)] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#9FB0FF]">
              <Zap size={13} className="text-brand fill-brand" />
              <span>FREE SEO &amp; MARKETING UTILITIES</span>
            </div>

            {/* Compact H1 */}
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-[56px] leading-[1.12]">
              Practical SEO Tools.<br />
              <span className="text-brand">Built for Real Work.</span>
            </h1>

            {/* Supporting Text */}
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-neutral-secondary">
              Generate structured data, optimize metadata, build campaign URLs, analyze content and handle technical SEO directly in your browser.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/tools/"
                className="btn-primary focus-ring px-6 text-sm font-semibold"
              >
                <span>Explore All Tools</span>
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/schema-markup-generator/"
                className="btn-secondary focus-ring px-5 text-sm font-semibold"
              >
                <span>Try Schema Generator</span>
              </Link>
            </div>

            {/* Trust Badges Row */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs font-medium text-neutral-secondary">
              <span className="inline-flex items-center gap-1.5">
                <Check size={14} className="text-state-success stroke-[2.5]" /> No login
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check size={14} className="text-state-success stroke-[2.5]" /> Free tools
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check size={14} className="text-state-success stroke-[2.5]" /> Browser-based
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check size={14} className="text-state-success stroke-[2.5]" /> Privacy focused
              </span>
            </div>
          </div>
        </section>

        {/* Featured Tools Grid */}
        <section id="tools" className="container py-16 sm:py-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand">The Toolkit</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                15 focused utilities. Zero setup required.
              </h2>
            </div>
            <Link
              href="/tools/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
            >
              <span>View full directory</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>

        {/* Why Zenvuk? Value Props */}
        <section className="border-y border-neutral-border bg-surface-secondary py-16 sm:py-20">
          <div className="container">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-wider text-brand">Core Principles</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                Why technical SEOs and founders use Zenvuk
              </h2>
              <p className="mt-2 text-sm text-neutral-secondary">
                Designed to eliminate friction from repetitive technical SEO and campaign formatting tasks.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="rounded-card border border-neutral-border bg-surface p-7">
                <div className="grid h-10 w-10 place-items-center rounded-btn bg-[rgba(91,124,255,0.10)] border border-[rgba(91,124,255,0.20)] text-[#7893FF]">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="mt-4 text-base font-bold text-ink">100% Free Forever</h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-secondary">
                  No subscriptions, credit limits, or mandatory accounts. Every utility runs freely for everyone.
                </p>
              </div>

              <div className="rounded-card border border-neutral-border bg-surface p-7">
                <div className="grid h-10 w-10 place-items-center rounded-btn bg-[rgba(91,124,255,0.10)] border border-[rgba(91,124,255,0.20)] text-[#7893FF]">
                  <Lock size={20} />
                </div>
                <h3 className="mt-4 text-base font-bold text-ink">Client-Side Privacy</h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-secondary">
                  Your URLs, schemas, and content are processed locally in your browser session. No data is stored remotely.
                </p>
              </div>

              <div className="rounded-card border border-neutral-border bg-surface p-7">
                <div className="grid h-10 w-10 place-items-center rounded-btn bg-[rgba(91,124,255,0.10)] border border-[rgba(91,124,255,0.20)] text-[#7893FF]">
                  <Zap size={20} />
                </div>
                <h3 className="mt-4 text-base font-bold text-ink">Deterministic Precision</h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-secondary">
                  Output complies with Schema.org specifications, RFC 9309, and standard sitemaps.org protocols without AI hallucinations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Topic Clusters */}
        <section className="container py-16 sm:py-20">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold uppercase tracking-wider text-brand">Topic Clusters</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              Organized by technical discipline
            </h2>
            <p className="mt-2 text-sm text-neutral-secondary">
              Everything is structured logically into focused clusters for real day-to-day work.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Cluster 1: Structured Data */}
            <div className="rounded-card border border-neutral-border bg-surface p-6 shadow-sm">
              <div className="flex items-center gap-2 text-[#7893FF] mb-2">
                <Code2 size={18} />
                <h3 className="text-sm font-bold text-ink">Structured Data</h3>
              </div>
              <ul className="space-y-2 text-xs pt-2 border-t border-neutral-border">
                <li>
                  <Link href="/schema-markup-generator/" className="text-neutral-secondary hover:text-brand transition-colors">
                    • Schema Markup Generator
                  </Link>
                </li>
                <li>
                  <Link href="/faq-schema-generator/" className="text-neutral-secondary hover:text-brand transition-colors">
                    • FAQ Schema Generator
                  </Link>
                </li>
              </ul>
            </div>

            {/* Cluster 2: Technical SEO */}
            <div className="rounded-card border border-neutral-border bg-surface p-6 shadow-sm">
              <div className="flex items-center gap-2 text-[#7893FF] mb-2">
                <Network size={18} />
                <h3 className="text-sm font-bold text-ink">Technical SEO</h3>
              </div>
              <ul className="space-y-2 text-xs pt-2 border-t border-neutral-border">
                <li>
                  <Link href="/robots-txt-generator/" className="text-neutral-secondary hover:text-brand transition-colors">
                    • Robots.txt Generator
                  </Link>
                </li>
                <li>
                  <Link href="/xml-sitemap-generator/" className="text-neutral-secondary hover:text-brand transition-colors">
                    • XML Sitemap Generator
                  </Link>
                </li>
                <li>
                  <Link href="/hreflang-generator/" className="text-neutral-secondary hover:text-brand transition-colors">
                    • Hreflang Generator
                  </Link>
                </li>
                <li>
                  <Link href="/canonical-tag-generator/" className="text-neutral-secondary hover:text-brand transition-colors">
                    • Canonical Tag Generator
                  </Link>
                </li>
              </ul>
            </div>

            {/* Cluster 3: Metadata & SERP */}
            <div className="rounded-card border border-neutral-border bg-surface p-6 shadow-sm">
              <div className="flex items-center gap-2 text-[#38BDF8] mb-2">
                <Share2 size={18} />
                <h3 className="text-sm font-bold text-ink">Metadata &amp; Social</h3>
              </div>
              <ul className="space-y-2 text-xs pt-2 border-t border-neutral-border">
                <li>
                  <Link href="/serp-preview-tool/" className="text-neutral-secondary hover:text-brand transition-colors">
                    • SERP Preview Tool
                  </Link>
                </li>
                <li>
                  <Link href="/open-graph-generator/" className="text-neutral-secondary hover:text-brand transition-colors">
                    • Open Graph Generator
                  </Link>
                </li>
                <li>
                  <Link href="/meta-description-generator/" className="text-neutral-secondary hover:text-brand transition-colors">
                    • Meta Description Generator
                  </Link>
                </li>
              </ul>
            </div>

            {/* Cluster 4: Content & AI */}
            <div className="rounded-card border border-neutral-border bg-surface p-6 shadow-sm">
              <div className="flex items-center gap-2 text-[#2DD4A7] mb-2">
                <FileCode size={18} />
                <h3 className="text-sm font-bold text-ink">Content &amp; AI</h3>
              </div>
              <ul className="space-y-2 text-xs pt-2 border-t border-neutral-border">
                <li>
                  <Link href="/llms-txt-generator/" className="text-neutral-secondary hover:text-brand transition-colors">
                    • LLMS.txt Generator
                  </Link>
                </li>
                <li>
                  <Link href="/keyword-density-checker/" className="text-neutral-secondary hover:text-brand transition-colors">
                    • Keyword Density &amp; N-Grams
                  </Link>
                </li>
                <li>
                  <Link href="/url-slug-generator/" className="text-neutral-secondary hover:text-brand transition-colors">
                    • URL Slug Generator
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Platform FAQ */}
        <section className="container py-16 sm:py-20 border-t border-neutral-border">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-wider text-brand">FAQ</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              <div className="rounded-card border border-neutral-border bg-surface p-6 shadow-sm">
                <h3 className="text-sm font-bold text-ink">Is Zenvuk really 100% free?</h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-secondary">
                  Yes. All 15 utilities across technical SEO, Schema markup, crawler controls, ecommerce, and marketing attribution are completely free with zero usage caps, mandatory accounts, or credit card requirements.
                </p>
              </div>

              <div className="rounded-card border border-neutral-border bg-surface p-6 shadow-sm">
                <h3 className="text-sm font-bold text-ink">How do the tools operate without paid third-party APIs?</h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-secondary">
                  Zenvuk runs native TypeScript calculation engines directly in your browser. Calculations rely on W3C specifications, Schema.org vocabularies, IETF RFC standards, and font-metrics models for instant, deterministic results.
                </p>
              </div>

              <div className="rounded-card border border-neutral-border bg-surface p-6 shadow-sm">
                <h3 className="text-sm font-bold text-ink">Is my confidential data saved or tracked?</h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-secondary">
                  No. All computations occur client-side in your web browser. We do not store your schema inputs, sitemaps, robots configurations, or content drafts on external databases.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

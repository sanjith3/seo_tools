import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, HelpCircle, Layers, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { BreadcrumbJsonLd, CollectionPageJsonLd, FAQPageJsonLd } from "@/components/seo/JsonLd";
import { ToolCard } from "@/components/ToolCard";
import { siteConfig } from "@/config/site";
import { toolsRegistry } from "@/config/tools";
import {
  CategorySlug,
  getCategoryBySlug,
  getAllCategories
} from "@/config/categories";

export function CategoryLandingPage({ categorySlug }: { categorySlug: CategorySlug }) {
  const categoryDef = getCategoryBySlug(categorySlug);

  if (!categoryDef) {
    notFound();
  }

  // Get tools belonging to this category in defined order
  const categoryTools = categoryDef.toolSlugs
    .map((slug) => toolsRegistry.find((t) => t.slug === slug))
    .filter((t): t is typeof toolsRegistry[number] => Boolean(t));

  const allCategories = getAllCategories();
  const otherCategories = allCategories.filter((c) => c.slug !== categoryDef.slug);

  const breadcrumbItems = [
    { name: "Home", url: `${siteConfig.url}/` },
    { name: "Tools", url: `${siteConfig.url}/tools/` },
    { name: categoryDef.name, url: `${siteConfig.url}/tools/${categoryDef.slug}/` }
  ];

  const collectionItems = categoryTools.map((t) => ({
    name: t.name,
    url: `${siteConfig.url}/${t.slug}/`,
    description: t.description
  }));

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <CollectionPageJsonLd
        name={categoryDef.h1}
        description={categoryDef.metaDescription}
        url={`${siteConfig.url}/tools/${categoryDef.slug}/`}
        items={collectionItems}
      />
      {categoryDef.faqs && categoryDef.faqs.length > 0 && (
        <FAQPageJsonLd faqs={categoryDef.faqs} />
      )}

      <Header />

      <main className="w-full min-w-0 max-w-full overflow-hidden bg-[#07111F] text-[#F5F8FC]">
        <div className="container py-8 sm:py-12">
          {/* Breadcrumbs */}
          <Breadcrumbs
            hideJsonLd
            crumbs={[
              { name: "All Tools", href: "/tools/" },
              { name: categoryDef.name }
            ]}
          />

          {/* Category Hero / Header */}
          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(91,124,255,0.12)] border border-[rgba(91,124,255,0.25)] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#5B7CFF]">
              <Layers size={13} />
              <span>Category Toolkit</span>
            </div>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#F5F8FC] sm:text-4xl lg:text-5xl">
              {categoryDef.h1}
            </h1>

            {/* Direct Answer Paragraph (AEO / GEO optimized) */}
            <p className="mt-4 text-base font-medium leading-relaxed text-[#CBD5E1] sm:text-lg">
              {categoryDef.directIntro}
            </p>

            {/* Supporting Explanation */}
            <p className="mt-3 text-sm leading-relaxed text-[#9BAAC0]">
              {categoryDef.supportingExplanation}
            </p>

            {/* Feature Badges */}
            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#111F32] border border-[#22344C] px-3 py-1 text-[#2DD4A7]">
                <CheckCircle2 size={13} className="stroke-[2.5]" /> 100% Free
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#111F32] border border-[#22344C] px-3 py-1 text-[#5B7CFF]">
                <CheckCircle2 size={13} className="stroke-[2.5]" /> Client-Side Execution
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#111F32] border border-[#22344C] px-3 py-1 text-[#38BDF8]">
                <CheckCircle2 size={13} className="stroke-[2.5]" /> No Login Required
              </span>
            </div>
          </div>

          {/* Tools Grid */}
          <section className="mt-12 sm:mt-14" aria-label={`${categoryDef.name} Utilities`}>
            <div className="flex items-center justify-between pb-4 border-b border-[#22344C]">
              <h2 className="text-lg font-bold text-[#F5F8FC]">
                Available Utilities ({categoryTools.length})
              </h2>
              <Link
                href="/tools/"
                className="text-xs font-semibold text-[#5B7CFF] hover:text-[#7893FF] transition-colors inline-flex items-center gap-1"
              >
                <span>View All 15 Tools</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categoryTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>

          {/* Category Navigation Links */}
          <section className="mt-16 rounded-[16px] border border-[#22344C] bg-[#0D1A2B] p-6 sm:p-8">
            <h2 className="text-base font-bold text-[#F5F8FC]">
              Explore Other Categories
            </h2>
            <p className="mt-1 text-xs text-[#9BAAC0]">
              Browse other specialized suites across technical SEO, structured data, and marketing.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/tools/"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#22344C] bg-[#111F32] px-4 py-2 text-xs font-semibold text-[#F5F8FC] hover:border-[#5B7CFF] hover:text-[#5B7CFF] transition-all"
              >
                <span>All Tools Directory</span>
                <ArrowRight size={12} />
              </Link>
              {otherCategories.map((other) => (
                <Link
                  key={other.slug}
                  href={`/tools/${other.slug}/`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#22344C] bg-[#111F32] px-4 py-2 text-xs font-semibold text-[#9BAAC0] hover:border-[#5B7CFF] hover:text-[#F5F8FC] transition-all"
                >
                  <span>{other.name}</span>
                  <ArrowRight size={12} />
                </Link>
              ))}
            </div>
          </section>

          {/* Category FAQs */}
          {categoryDef.faqs && categoryDef.faqs.length > 0 && (
            <section className="mt-16 border-t border-[#22344C] pt-12" aria-label="Frequently Asked Questions">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5B7CFF]">
                  <HelpCircle size={14} />
                  <span>Frequently Asked Questions</span>
                </div>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#F5F8FC]">
                  Common Questions About {categoryDef.name} Tools
                </h2>

                <div className="mt-6 space-y-4">
                  {categoryDef.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="rounded-[14px] border border-[#22344C] bg-[#0D1A2B] p-5 shadow-sm"
                    >
                      <h3 className="text-sm font-bold text-[#F5F8FC]">
                        {faq.question}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#9BAAC0]">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

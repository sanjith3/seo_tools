import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getToolBySlug } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { ShieldCheck, Lock, Check } from "lucide-react";
import { AdSlot } from "@/components/ads/AdSlot";

import { getCategoryByToolSlug } from "@/config/categories";

interface ToolLayoutProps {
  slug: string;
  toolNode?: React.ReactNode;
  children: React.ReactNode;
  sidebarSummary?: React.ReactNode;
}

export function ToolLayout({ slug, toolNode, children, sidebarSummary }: ToolLayoutProps) {
  const tool = getToolBySlug(slug);
  const categoryDef = getCategoryByToolSlug(slug);

  const breadcrumbItems = [
    { name: "Home", url: `${siteConfig.url}/` },
    { name: "All Tools", url: `${siteConfig.url}/tools/` },
    ...(categoryDef ? [{ name: categoryDef.name, url: `${siteConfig.url}/tools/${categoryDef.slug}/` }] : []),
    { name: tool?.name || "Utility", url: `${siteConfig.url}/${slug}/` }
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <Header />
      <main className="w-full min-w-0 max-w-full overflow-hidden bg-[#07111F] text-[#F5F8FC]">
        {/* Standard Container (max-width: 1280px) */}
        <div className="container py-8 sm:py-10">
          {/* Breadcrumb Navigation */}
          <Breadcrumbs
            hideJsonLd
            crumbs={[
              { name: "All Tools", href: "/tools/" },
              ...(categoryDef
                ? [{ name: categoryDef.name, href: `/tools/${categoryDef.slug}/` }]
                : [{ name: tool?.category || "Tools", href: "/tools/" }]),
              { name: tool?.name || "Utility" }
            ]}
          />

          {/* Unified Tool Page Header */}
          <div className="mt-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(91,124,255,0.12)] border border-[rgba(91,124,255,0.25)] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#5B7CFF]">
              {tool?.category || "Free Utility"}
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#F5F8FC] sm:text-4xl lg:text-5xl">
              {tool?.h1 || tool?.name}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-[#B5C1D1]">
              {tool?.description}
            </p>

            {/* Compact feature / trust row */}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#111F32] border border-[#22344C] px-3 py-1 text-[#2DD4A7]">
                <Check size={13} className="stroke-[2.5]" /> FREE
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#111F32] border border-[#22344C] px-3 py-1 text-[#5B7CFF]">
                <Check size={13} className="stroke-[2.5]" /> NO LOGIN
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#111F32] border border-[#22344C] px-3 py-1 text-[#38BDF8]">
                <Check size={13} className="stroke-[2.5]" /> BROWSER BASED
              </span>
            </div>
          </div>

          {/* Core Workspace & Dynamic Sidebar Grid */}
          <div className="mt-8 sm:mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px] items-start w-full min-w-0 max-w-full">
            {/* Main Tool Area: min-w-0 to prevent flex/grid blowout */}
            <div className="min-w-0 max-w-full">
              {toolNode || children}
            </div>

            {/* Sidebar Area: sticky desktop, stacked mobile */}
            <aside className="min-w-0 w-full space-y-6 xl:sticky xl:top-24 xl:self-start">
              {sidebarSummary ? (
                <div className="space-y-6">
                  {sidebarSummary}
                  <DefaultSidebarFeatures />
                </div>
              ) : (
                <DefaultSidebarFeatures />
              )}
            </aside>
          </div>

          {/* Prepared Safe Ad Placement: After Tool Workspace */}
          <div className="max-w-4xl min-w-0">
            <AdSlot placement="tool-after-workspace" />
          </div>

          {/* SEO / Educational Content below tool workspace & sidebar */}
          {toolNode && children && (
            <div className="mt-12 sm:mt-16 max-w-4xl min-w-0">
              {children}
              {/* Prepared Safe Ad Placement: End of Content */}
              <AdSlot placement="tool-content-end" />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function DefaultSidebarFeatures() {
  return (
    <div className="rounded-[16px] border border-[#22344C] bg-[#0D1A2B] p-6 shadow-card w-full min-w-0 max-w-full overflow-hidden">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-[rgba(91,124,255,0.12)] text-[#5B7CFF] shrink-0">
          <ShieldCheck size={16} />
        </span>
        <h3 className="text-sm font-bold text-[#F5F8FC]">About this tool</h3>
      </div>
      <ul className="mt-4 space-y-2.5 text-xs leading-relaxed text-[#B5C1D1]">
        <li className="flex items-start gap-2">
          <span className="text-[#2DD4A7] font-bold shrink-0">✓</span>
          <span><strong>No login required:</strong> Instant generation with zero sign-up or verification.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#2DD4A7] font-bold shrink-0">✓</span>
          <span><strong>Runs locally:</strong> Pure browser-based execution with zero third-party tracking.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#2DD4A7] font-bold shrink-0">✓</span>
          <span><strong>Free to use:</strong> Unrestricted utilities designed for marketing &amp; SEO work.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#2DD4A7] font-bold shrink-0">✓</span>
          <span><strong>Export supported:</strong> One-click clipboard copy and file downloads.</span>
        </li>
      </ul>
      <div className="mt-4 border-t border-[#22344C] pt-3.5 flex items-center gap-2 text-[11px] text-[#7F8DA3]">
        <Lock size={12} className="shrink-0" />
        <span>Privacy-focused client execution</span>
      </div>
    </div>
  );
}

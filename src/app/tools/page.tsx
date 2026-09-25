import type { Metadata } from "next";
import { redirect, RedirectType } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/seo/JsonLd";
import { ToolsDirectoryClient } from "@/components/tools/ToolsDirectoryClient";
import { siteConfig } from "@/config/site";
import { toolsRegistry } from "@/config/tools";
import { normalizeCategoryQuery } from "@/config/categories";

export const metadata: Metadata = {
  title: "Free SEO & Marketing Tools – All Utilities | Zenvuk",
  description:
    "Explore Zenvuk's complete collection of free browser-based SEO, ecommerce, and marketing utilities. Zero login friction and no API keys required.",
  alternates: {
    canonical: "/tools/"
  },
  openGraph: {
    title: "Free SEO & Marketing Tools – All Utilities | Zenvuk",
    description:
      "Explore Zenvuk's complete collection of free browser-based SEO, ecommerce, and marketing utilities. Zero login friction and no API keys required.",
    url: `${siteConfig.url}/tools/`,
    type: "website"
  }
};

interface ToolsPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const catParam =
    typeof resolvedParams.cat === "string"
      ? resolvedParams.cat
      : Array.isArray(resolvedParams.cat)
      ? resolvedParams.cat[0]
      : undefined;

  if (catParam) {
    const targetSlug = normalizeCategoryQuery(catParam);
    if (targetSlug) {
      redirect(`/tools/${targetSlug}/`, RedirectType.replace);
    }
  }

  const breadcrumbItems = [
    { name: "Home", url: `${siteConfig.url}/` },
    { name: "All Tools", url: `${siteConfig.url}/tools/` }
  ];

  const collectionItems = toolsRegistry.map((t) => ({
    name: t.name,
    url: `${siteConfig.url}/${t.slug}/`,
    description: t.description
  }));

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <CollectionPageJsonLd
        name="Free SEO & Marketing Tools"
        description="Focused, browser-first tools designed to remove friction from metadata creation, schema markup, product naming, and campaign URL tracking."
        url={`${siteConfig.url}/tools/`}
        items={collectionItems}
      />
      <Header />
      <main className="w-full min-w-0 max-w-full overflow-hidden bg-[#07111F] text-[#F5F8FC]">
        <div className="container py-8 sm:py-14">
          <Breadcrumbs
            hideJsonLd
            crumbs={[
              {
                name: "All Tools",
                canonicalUrl: `${siteConfig.url}/tools/`
              }
            ]}
          />

          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#5B7CFF]">
              Utility Directory
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#F5F8FC] sm:text-5xl">
              Free SEO &amp; Marketing Tools
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#CBD5E1] sm:text-lg">
              Focused, browser-first tools designed to remove friction from metadata creation, schema markup, product naming, and campaign URL tracking.
            </p>
          </div>

          <div className="mt-12">
            <ToolsDirectoryClient />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

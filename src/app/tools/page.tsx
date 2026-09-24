import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ToolsDirectoryClient } from "@/components/tools/ToolsDirectoryClient";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Free SEO & Marketing Tools – All Utilities",
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

export default function ToolsPage() {
  return (
    <>
      <Header />
      <main className="container py-8 sm:py-14">
        <Breadcrumbs
          crumbs={[
            {
              name: "All Tools",
              canonicalUrl: `${siteConfig.url}/tools/`
            }
          ]}
        />

        <div className="mt-8 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-brand">
            Utility Directory
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Free SEO & Marketing Tools
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-secondary sm:text-lg">
            Focused, browser-first tools designed to remove friction from metadata creation, schema markup, product naming, and campaign URL tracking.
          </p>
        </div>

        <div className="mt-12">
          <ToolsDirectoryClient />
        </div>
      </main>
      <Footer />
    </>
  );
}

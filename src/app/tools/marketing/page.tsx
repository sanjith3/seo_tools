import type { Metadata } from "next";
import { CategoryLandingPage } from "@/components/tools/CategoryLandingPage";
import { getCategoryBySlug } from "@/config/categories";
import { siteConfig } from "@/config/site";

const categoryDef = getCategoryBySlug("marketing")!;

export const metadata: Metadata = {
  title: {
    absolute: categoryDef.metaTitle
  },
  description: categoryDef.metaDescription,
  alternates: {
    canonical: `/tools/${categoryDef.slug}/`
  },
  openGraph: {
    title: categoryDef.metaTitle,
    description: categoryDef.metaDescription,
    url: `${siteConfig.url}/tools/${categoryDef.slug}/`,
    type: "website"
  }
};

export default function MarketingPage() {
  return <CategoryLandingPage categorySlug="marketing" />;
}

import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllPostSlugs } from "@/lib/wordpress";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date("2026-09-24");

  const staticRoutes: Array<{
    path: string;
    changeFrequency: "daily" | "weekly" | "monthly";
    priority: number;
  }> = [
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/tools/", changeFrequency: "weekly", priority: 0.9 },
    { path: "/tools/technical-seo/", changeFrequency: "weekly", priority: 0.9 },
    { path: "/tools/structured-data/", changeFrequency: "weekly", priority: 0.9 },
    { path: "/tools/marketing/", changeFrequency: "weekly", priority: 0.9 },
    { path: "/blog/", changeFrequency: "daily", priority: 0.85 },
    { path: "/faq-schema-generator/", changeFrequency: "monthly", priority: 0.85 },
    { path: "/schema-markup-generator/", changeFrequency: "monthly", priority: 0.85 },
    { path: "/product-title-generator/", changeFrequency: "monthly", priority: 0.85 },
    { path: "/meta-description-generator/", changeFrequency: "monthly", priority: 0.85 },
    { path: "/serp-preview-tool/", changeFrequency: "monthly", priority: 0.85 },
    { path: "/open-graph-generator/", changeFrequency: "monthly", priority: 0.85 },
    { path: "/canonical-tag-generator/", changeFrequency: "monthly", priority: 0.85 },
    { path: "/robots-txt-generator/", changeFrequency: "monthly", priority: 0.85 },
    { path: "/xml-sitemap-generator/", changeFrequency: "monthly", priority: 0.85 },
    { path: "/hreflang-generator/", changeFrequency: "monthly", priority: 0.85 },
    { path: "/keyword-density-checker/", changeFrequency: "monthly", priority: 0.85 },
    { path: "/url-slug-generator/", changeFrequency: "monthly", priority: 0.85 },
    { path: "/llms-txt-generator/", changeFrequency: "monthly", priority: 0.85 },
    { path: "/product-name-generator/", changeFrequency: "monthly", priority: 0.85 },
    { path: "/utm-builder/", changeFrequency: "monthly", priority: 0.85 },
    { path: "/about/", changeFrequency: "monthly", priority: 0.6 },
    { path: "/contact/", changeFrequency: "monthly", priority: 0.6 },
    { path: "/methodology/", changeFrequency: "monthly", priority: 0.7 },
    { path: "/privacy-policy/", changeFrequency: "monthly", priority: 0.4 },
    { path: "/terms/", changeFrequency: "monthly", priority: 0.4 },
    { path: "/disclaimer/", changeFrequency: "monthly", priority: 0.4 }
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));

  // Append published WordPress articles dynamically
  try {
    const wpPosts = await getAllPostSlugs();
    for (const post of wpPosts) {
      if (!post.slug) continue;
      let postModifiedDate = lastModified;
      if (post.modified) {
        const parsed = new Date(post.modified);
        if (!isNaN(parsed.getTime())) {
          postModifiedDate = parsed;
        }
      }

      entries.push({
        url: `${siteConfig.url}/blog/${post.slug}/`,
        lastModified: postModifiedDate,
        changeFrequency: "weekly",
        priority: 0.75
      });
    }
  } catch (error) {
    console.warn("[Sitemap] Failed to fetch WordPress posts for sitemap:", error);
  }

  return entries;
}

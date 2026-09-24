import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/*?*"] // Block raw query parameter variations from creating duplicate indexation
    },
    sitemap: `${siteConfig.url}/sitemap.xml`
  };
}

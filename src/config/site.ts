export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  businessEmail: string;
  ogImage: string;
  creator: string;
  organization: {
    name: string;
    url: string;
    logo: string;
    description: string;
    email: string;
  };
  navigation: Array<{ name: string; href: string }>;
  legalNavigation: Array<{ name: string; href: string }>;
  companyNavigation: Array<{ name: string; href: string }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zenvuk.com";

export const siteConfig: SiteConfig = {
  name: "Zenvuk",
  shortName: "Zenvuk",
  tagline: "Free SEO & Marketing Tools Built for Practical Work",
  description:
    "Free browser-based utilities for FAQ schema generation, ecommerce product titles, meta descriptions, brandable product names, and UTM campaign tracking. No login or API keys required.",
  url: siteUrl,
  email: "info@zenvuk.com",
  businessEmail: "info@zenvuk.com",
  ogImage: "/opengraph-image",
  creator: "Zenvuk Editorial Team",
  organization: {
    name: "Zenvuk",
    url: `${siteUrl}/`,
    logo: `${siteUrl}/opengraph-image`,
    description:
      "Zenvuk is a free SEO and marketing utility platform that provides browser-based generators and tracking utilities for marketers, founders, and ecommerce operators.",
    email: "info@zenvuk.com"
  },
  navigation: [
    { name: "All Tools", href: "/tools/" },
    { name: "Blog", href: "/blog/" },
    { name: "About", href: "/about/" },
    { name: "Contact", href: "/contact/" }
  ],
  companyNavigation: [
    { name: "About", href: "/about/" },
    { name: "Blog", href: "/blog/" },
    { name: "Contact", href: "/contact/" },
    { name: "Methodology", href: "/methodology/" }
  ],
  legalNavigation: [
    { name: "Privacy Policy", href: "/privacy-policy/" },
    { name: "Terms of Service", href: "/terms/" },
    { name: "Disclaimer", href: "/disclaimer/" }
  ]
};


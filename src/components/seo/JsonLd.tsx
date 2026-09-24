import { siteConfig } from "@/config/site";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.organization.name,
    url: `${siteConfig.url}/`,
    logo: siteConfig.organization.logo,
    description: siteConfig.organization.description,
    email: siteConfig.email,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: siteConfig.email
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: `${siteConfig.url}/`,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.organization.name
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface WebAppSchemaProps {
  name: string;
  description: string;
  url: string;
  category?: string;
}

export function WebApplicationJsonLd({ name, description, url, category = "BusinessApplication" }: WebAppSchemaProps) {
  const normalizedUrl = url.endsWith("/") ? url : `${url}/`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${normalizedUrl}#webapp`,
    name,
    url: normalizedUrl,
    description,
    applicationCategory: category,
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    provider: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.organization.name,
      url: `${siteConfig.url}/`
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.organization.name,
      url: `${siteConfig.url}/`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const lastItemUrl = items[items.length - 1]?.url || siteConfig.url;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${lastItemUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface BlogPostingSchemaProps {
  url: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  imageUrl?: string | null;
  authorName?: string;
}

export function BlogPostingJsonLd({
  url,
  headline,
  description,
  datePublished,
  dateModified,
  imageUrl,
  authorName
}: BlogPostingSchemaProps) {
  const normalizedUrl = url.endsWith("/") ? url : `${url}/`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${normalizedUrl}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": normalizedUrl
    },
    headline,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    ...(imageUrl ? { image: [imageUrl] } : {}),
    author: {
      "@type": "Person",
      name: authorName || "Zenvuk Editorial Team"
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.organization.name,
      url: `${siteConfig.url}/`,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/opengraph-image`
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}


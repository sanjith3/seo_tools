export type SchemaType =
  | "Organization"
  | "LocalBusiness"
  | "Service"
  | "Product"
  | "Article"
  | "BlogPosting"
  | "Person"
  | "FAQPage"
  | "BreadcrumbList"
  | "Event"
  | "VideoObject"
  | "WebSite"
  | "WebPage"
  | "SoftwareApplication"
  | "WebApplication";

export interface SchemaValidationResult {
  isValid: boolean;
  errors: string[];
  missingFields: string[];
}

export const SCHEMA_TYPES: Array<{ type: SchemaType; label: string; description: string }> = [
  { type: "Organization", label: "Organization", description: "Companies, brands, NGOs, or institutional entities" },
  { type: "LocalBusiness", label: "Local Business", description: "Physical stores, restaurants, offices, local providers" },
  { type: "Product", label: "Product & Offer", description: "Physical or digital products with SKU, brand, and pricing" },
  { type: "Article", label: "Article / News", description: "General journalistic, editorial, or research articles" },
  { type: "BlogPosting", label: "Blog Posting", description: "Blog posts, essays, and editorial guides" },
  { type: "Service", label: "Service", description: "Professional, technical, financial, or consulting services" },
  { type: "Person", label: "Person", description: "Public figures, authors, founders, and specialists" },
  { type: "FAQPage", label: "FAQPage", description: "Frequently asked questions and direct answers" },
  { type: "BreadcrumbList", label: "BreadcrumbList", description: "Hierarchical page breadcrumb navigation trails" },
  { type: "Event", label: "Event", description: "Concerts, webinars, workshops, or physical conferences" },
  { type: "VideoObject", label: "Video Object", description: "Embedded videos, tutorials, and recorded media" },
  { type: "WebSite", label: "WebSite", description: "Top-level site identity with optional Sitelinks searchbox" },
  { type: "WebPage", label: "WebPage", description: "General web pages, landing pages, and resource hubs" },
  { type: "SoftwareApplication", label: "Software Application", description: "Desktop or mobile software programs" },
  { type: "WebApplication", label: "Web Application", description: "Browser-based SaaS tools and web apps" }
];

export function generateSchemaJsonLd(type: SchemaType, values: Record<string, any>, minified = false): string {
  let schemaObj: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": type
  };

  switch (type) {
    case "Organization":
      if (values.name) schemaObj.name = values.name;
      if (values.url) schemaObj.url = values.url;
      if (values.logo) schemaObj.logo = values.logo;
      if (values.email) schemaObj.email = values.email;
      if (values.sameAs) {
        const links = values.sameAs.split("\n").map((s: string) => s.trim()).filter(Boolean);
        if (links.length) schemaObj.sameAs = links;
      }
      break;

    case "LocalBusiness":
      if (values.name) schemaObj.name = values.name;
      if (values.url) schemaObj.url = values.url;
      if (values.image) schemaObj.image = values.image;
      if (values.telephone) schemaObj.telephone = values.telephone;
      if (values.priceRange) schemaObj.priceRange = values.priceRange;
      if (values.streetAddress || values.addressLocality || values.postalCode) {
        schemaObj.address = {
          "@type": "PostalAddress",
          streetAddress: values.streetAddress || undefined,
          addressLocality: values.addressLocality || undefined,
          addressRegion: values.addressRegion || undefined,
          postalCode: values.postalCode || undefined,
          addressCountry: values.addressCountry || undefined
        };
      }
      if (values.openingHours) {
        schemaObj.openingHours = values.openingHours.split("\n").map((s: string) => s.trim()).filter(Boolean);
      }
      break;

    case "Service":
      if (values.name) schemaObj.name = values.name;
      if (values.description) schemaObj.description = values.description;
      if (values.serviceType) schemaObj.serviceType = values.serviceType;
      if (values.providerName || values.providerUrl) {
        schemaObj.provider = {
          "@type": "Organization",
          name: values.providerName || undefined,
          url: values.providerUrl || undefined
        };
      }
      if (values.areaServed) schemaObj.areaServed = values.areaServed;
      break;

    case "Product":
      if (values.name) schemaObj.name = values.name;
      if (values.description) schemaObj.description = values.description;
      if (values.image) schemaObj.image = values.image;
      if (values.sku) schemaObj.sku = values.sku;
      if (values.brand) {
        schemaObj.brand = {
          "@type": "Brand",
          name: values.brand
        };
      }
      if (values.price) {
        schemaObj.offers = {
          "@type": "Offer",
          price: values.price,
          priceCurrency: values.priceCurrency || "USD",
          availability: values.availability || "https://schema.org/InStock"
        };
      }
      break;

    case "Article":
    case "BlogPosting":
      if (values.headline) schemaObj.headline = values.headline;
      if (values.description) schemaObj.description = values.description;
      if (values.image) schemaObj.image = values.image;
      if (values.datePublished) schemaObj.datePublished = values.datePublished;
      if (values.dateModified) schemaObj.dateModified = values.dateModified;
      if (values.authorName) {
        schemaObj.author = {
          "@type": "Person",
          name: values.authorName
        };
      }
      if (values.publisherName) {
        schemaObj.publisher = {
          "@type": "Organization",
          name: values.publisherName,
          logo: values.publisherLogo ? { "@type": "ImageObject", url: values.publisherLogo } : undefined
        };
      }
      break;

    case "Person":
      if (values.name) schemaObj.name = values.name;
      if (values.url) schemaObj.url = values.url;
      if (values.image) schemaObj.image = values.image;
      if (values.jobTitle) schemaObj.jobTitle = values.jobTitle;
      if (values.worksFor) {
        schemaObj.worksFor = {
          "@type": "Organization",
          name: values.worksFor
        };
      }
      if (values.sameAs) {
        const links = values.sameAs.split("\n").map((s: string) => s.trim()).filter(Boolean);
        if (links.length) schemaObj.sameAs = links;
      }
      break;

    case "FAQPage":
      if (Array.isArray(values.items) && values.items.length) {
        schemaObj.mainEntity = values.items.map((item: { question: string; answer: string }) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer
          }
        }));
      }
      break;

    case "BreadcrumbList":
      if (Array.isArray(values.items) && values.items.length) {
        schemaObj.itemListElement = values.items.map((item: { name: string; url: string }, idx: number) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: item.name,
          item: item.url
        }));
      }
      break;

    case "Event":
      if (values.name) schemaObj.name = values.name;
      if (values.description) schemaObj.description = values.description;
      if (values.startDate) schemaObj.startDate = values.startDate;
      if (values.endDate) schemaObj.endDate = values.endDate;
      if (values.locationName || values.locationAddress) {
        schemaObj.location = {
          "@type": "Place",
          name: values.locationName || undefined,
          address: values.locationAddress || undefined
        };
      }
      if (values.eventStatus) schemaObj.eventStatus = values.eventStatus;
      if (values.eventAttendanceMode) schemaObj.eventAttendanceMode = values.eventAttendanceMode;
      break;

    case "VideoObject":
      if (values.name) schemaObj.name = values.name;
      if (values.description) schemaObj.description = values.description;
      if (values.thumbnailUrl) schemaObj.thumbnailUrl = values.thumbnailUrl;
      if (values.uploadDate) schemaObj.uploadDate = values.uploadDate;
      if (values.contentUrl) schemaObj.contentUrl = values.contentUrl;
      if (values.embedUrl) schemaObj.embedUrl = values.embedUrl;
      break;

    case "WebSite":
      if (values.name) schemaObj.name = values.name;
      if (values.url) schemaObj.url = values.url;
      if (values.searchUrl) {
        schemaObj.potentialAction = {
          "@type": "SearchAction",
          target: `${values.searchUrl}?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        };
      }
      break;

    case "WebPage":
      if (values.name) schemaObj.name = values.name;
      if (values.description) schemaObj.description = values.description;
      if (values.url) schemaObj.url = values.url;
      break;

    case "SoftwareApplication":
    case "WebApplication":
      if (values.name) schemaObj.name = values.name;
      if (values.applicationCategory) schemaObj.applicationCategory = values.applicationCategory;
      if (values.operatingSystem) schemaObj.operatingSystem = values.operatingSystem;
      if (values.browserRequirements) schemaObj.browserRequirements = values.browserRequirements;
      if (values.price !== undefined && values.price !== "") {
        schemaObj.offers = {
          "@type": "Offer",
          price: values.price,
          priceCurrency: values.priceCurrency || "USD"
        };
      }
      break;
  }

  return minified ? JSON.stringify(schemaObj) : JSON.stringify(schemaObj, null, 2);
}

export function validateSchema(type: SchemaType, values: Record<string, any>): SchemaValidationResult {
  const missing: string[] = [];
  const errors: string[] = [];

  switch (type) {
    case "Organization":
      if (!values.name?.trim()) missing.push("Organization Name");
      if (!values.url?.trim()) missing.push("Website URL");
      break;

    case "LocalBusiness":
      if (!values.name?.trim()) missing.push("Business Name");
      if (!values.telephone?.trim()) missing.push("Telephone Number");
      if (!values.streetAddress?.trim() && !values.addressLocality?.trim()) missing.push("Street or City Address");
      break;

    case "Service":
      if (!values.name?.trim()) missing.push("Service Name");
      if (!values.providerName?.trim()) missing.push("Provider Organization");
      break;

    case "Product":
      if (!values.name?.trim()) missing.push("Product Name");
      if (!values.price?.toString().trim()) missing.push("Price");
      break;

    case "Article":
    case "BlogPosting":
      if (!values.headline?.trim()) missing.push("Headline");
      if (!values.authorName?.trim()) missing.push("Author Name");
      if (!values.datePublished?.trim()) missing.push("Date Published");
      break;

    case "Person":
      if (!values.name?.trim()) missing.push("Person's Name");
      break;

    case "FAQPage":
      if (!Array.isArray(values.items) || values.items.length === 0) {
        missing.push("At least one Question and Answer");
      } else {
        const hasEmpty = values.items.some((i: any) => !i.question?.trim() || !i.answer?.trim());
        if (hasEmpty) errors.push("All questions and answers must have content.");
      }
      break;

    case "BreadcrumbList":
      if (!Array.isArray(values.items) || values.items.length === 0) {
        missing.push("At least one Breadcrumb step");
      }
      break;

    case "Event":
      if (!values.name?.trim()) missing.push("Event Name");
      if (!values.startDate?.trim()) missing.push("Start Date");
      break;

    case "VideoObject":
      if (!values.name?.trim()) missing.push("Video Title");
      if (!values.thumbnailUrl?.trim()) missing.push("Thumbnail URL");
      if (!values.uploadDate?.trim()) missing.push("Upload Date");
      break;

    case "WebSite":
      if (!values.name?.trim()) missing.push("WebSite Name");
      if (!values.url?.trim()) missing.push("WebSite URL");
      break;

    case "WebPage":
      if (!values.name?.trim()) missing.push("Page Name");
      if (!values.url?.trim()) missing.push("Page URL");
      break;

    case "SoftwareApplication":
    case "WebApplication":
      if (!values.name?.trim()) missing.push("Application Name");
      break;
  }

  // URL validations
  const urlFields = ["url", "logo", "image", "thumbnailUrl", "searchUrl", "contentUrl", "providerUrl"];
  for (const field of urlFields) {
    const val = values[field];
    if (val && typeof val === "string" && val.trim()) {
      if (!/^https?:\/\//i.test(val.trim())) {
        errors.push(`Field '${field}' should start with http:// or https://`);
      }
    }
  }

  return {
    isValid: missing.length === 0 && errors.length === 0,
    missingFields: missing,
    errors
  };
}

export function formatSchemaHtmlScript(jsonLd: string): string {
  return `<script type="application/ld+json">\n${jsonLd}\n</script>`;
}

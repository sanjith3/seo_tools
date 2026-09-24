"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Code2,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Plus,
  Trash2,
  FileCode,
  Download
} from "lucide-react";
import {
  SchemaType,
  SCHEMA_TYPES,
  generateSchemaJsonLd,
  validateSchema,
  formatSchemaHtmlScript
} from "@/lib/generators/schema-markup";
import { CodePreview } from "@/components/common/CodePreview";
import { useToast } from "@/components/common/Toast";
import { trackEvent } from "@/lib/analytics";

const DEFAULT_VALUES: Record<SchemaType, Record<string, any>> = {
  Organization: {
    name: "Zenvuk",
    url: "https://zenvuk.com",
    logo: "https://zenvuk.com/icon.svg",
    email: "info@zenvuk.com",
    sameAs: "https://twitter.com/zenvuk\nhttps://github.com/zenvuk"
  },
  LocalBusiness: {
    name: "Downtown Coffee Roasters",
    url: "https://example.com",
    image: "https://example.com/store.jpg",
    telephone: "+1-555-0199",
    priceRange: "$$",
    streetAddress: "123 Main Street",
    addressLocality: "Austin",
    addressRegion: "TX",
    postalCode: "78701",
    addressCountry: "US",
    openingHours: "Mo-Fr 07:00-18:00\nSa-Su 08:00-16:00"
  },
  Service: {
    name: "Technical SEO Audit",
    description: "In-depth crawlability, indexing, Core Web Vitals, and structured data analysis.",
    serviceType: "SEO Consulting",
    providerName: "Zenvuk Services",
    providerUrl: "https://zenvuk.com",
    areaServed: "Worldwide"
  },
  Product: {
    name: "Ergonomic Office Chair",
    description: "High-density mesh ergonomic office chair with adjustable 3D armrests and lumbar support.",
    image: "https://example.com/chair.jpg",
    sku: "CHAIR-ERG-01",
    brand: "PostureCraft",
    price: "299.99",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock"
  },
  Article: {
    headline: "How to Build Valid Structured Data with JSON-LD",
    description: "A comprehensive guide to implementing Schema.org structured data for modern search engines.",
    image: "https://example.com/article-cover.jpg",
    authorName: "Sarah Chen",
    publisherName: "Tech Publisher Inc",
    publisherLogo: "https://example.com/logo.png",
    datePublished: "2025-09-01",
    dateModified: "2025-09-20"
  },
  BlogPosting: {
    headline: "10 Core Web Vitals Fixes for Next.js",
    description: "Practical steps to optimize LCP, CLS, and INP metrics in production Next.js apps.",
    image: "https://example.com/blog-hero.jpg",
    authorName: "Alex Rivera",
    publisherName: "Zenvuk Insights",
    datePublished: "2025-09-15",
    dateModified: "2025-09-21"
  },
  Person: {
    name: "Elena Rostova",
    url: "https://example.com/elena",
    image: "https://example.com/elena.jpg",
    jobTitle: "Senior SEO Architect",
    worksFor: "Global Search Agency",
    sameAs: "https://linkedin.com/in/elena-rostova"
  },
  FAQPage: {
    items: [
      { question: "What is JSON-LD?", answer: "JSON-LD is a lightweight Linked Data format using standard JavaScript Object Notation to express structured data." },
      { question: "Where should JSON-LD be placed?", answer: "JSON-LD can be placed in either the head or body of an HTML document inside a script tag." }
    ]
  },
  BreadcrumbList: {
    items: [
      { name: "Home", url: "https://example.com/" },
      { name: "Electronics", url: "https://example.com/electronics/" },
      { name: "Headphones", url: "https://example.com/electronics/headphones/" }
    ]
  },
  Event: {
    name: "Global SEO Summit 2026",
    description: "Annual conference exploring generative search, entity SEO, and web architecture.",
    startDate: "2026-04-15T09:00:00Z",
    endDate: "2026-04-17T17:00:00Z",
    locationName: "Metropolitan Convention Center",
    locationAddress: "789 Conference Way, San Francisco, CA",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode"
  },
  VideoObject: {
    name: "Understanding Technical SEO in 10 Minutes",
    description: "An overview of crawl budget, status codes, and canonicalization.",
    thumbnailUrl: "https://example.com/thumb.jpg",
    uploadDate: "2025-08-10",
    contentUrl: "https://example.com/video.mp4",
    embedUrl: "https://example.com/embed/123"
  },
  WebSite: {
    name: "Zenvuk",
    url: "https://zenvuk.com",
    searchUrl: "https://zenvuk.com/search"
  },
  WebPage: {
    name: "SEO Tools & Utilities",
    description: "Comprehensive suite of client-side SEO and digital marketing generators.",
    url: "https://zenvuk.com/tools/"
  },
  SoftwareApplication: {
    name: "ImageOptimizer Pro",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Windows, macOS, Linux",
    price: "0",
    priceCurrency: "USD"
  },
  WebApplication: {
    name: "Schema Markup Generator",
    applicationCategory: "BusinessApplication",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    price: "0",
    priceCurrency: "USD"
  }
};

export function SchemaMarkupTool({
  onSummaryChange
}: {
  onSummaryChange?: (schemaType: SchemaType, isValid: boolean) => void;
}) {
  const [selectedType, setSelectedType] = useState<SchemaType>("Organization");
  const [formValues, setFormValues] = useState<Record<string, any>>(DEFAULT_VALUES.Organization);
  const [minified, setMinified] = useState(false);
  const [includeScriptTag, setIncludeScriptTag] = useState(false);
  const { showToast } = useToast();

  const handleTypeChange = (type: SchemaType) => {
    setSelectedType(type);
    setFormValues(DEFAULT_VALUES[type] || {});
    trackEvent("schema_type_selected", { tool_name: "schema-markup-generator", schema_type: type });
  };

  const updateField = (field: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const validation = useMemo(() => {
    return validateSchema(selectedType, formValues);
  }, [selectedType, formValues]);

  const jsonOutput = useMemo(() => {
    return generateSchemaJsonLd(selectedType, formValues, minified);
  }, [selectedType, formValues, minified]);

  const htmlOutput = useMemo(() => {
    return formatSchemaHtmlScript(jsonOutput);
  }, [jsonOutput]);

  const displayedCode = includeScriptTag ? htmlOutput : jsonOutput;

  useEffect(() => {
    if (onSummaryChange) {
      onSummaryChange(selectedType, validation.isValid);
    }
  }, [selectedType, validation.isValid, onSummaryChange]);

  const handleReset = () => {
    setFormValues(DEFAULT_VALUES[selectedType] || {});
    showToast("Reset form to default template");
  };

  const handleDownloadHtml = () => {
    try {
      const blob = new Blob([htmlOutput], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${selectedType.toLowerCase()}-schema.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast(`Downloaded ${selectedType.toLowerCase()}-schema.html`);
    } catch {
      showToast("Download failed", "error");
    }
  };

  // Specific helpers for FAQ and Breadcrumbs
  const addFaqItem = () => {
    const current = Array.isArray(formValues.items) ? formValues.items : [];
    updateField("items", [...current, { question: "", answer: "" }]);
  };

  const removeFaqItem = (idx: number) => {
    const current = Array.isArray(formValues.items) ? [...formValues.items] : [];
    current.splice(idx, 1);
    updateField("items", current);
  };

  const updateFaqItem = (idx: number, key: "question" | "answer", val: string) => {
    const current = Array.isArray(formValues.items) ? [...formValues.items] : [];
    if (current[idx]) {
      current[idx][key] = val;
      updateField("items", current);
    }
  };

  const addBreadcrumbItem = () => {
    const current = Array.isArray(formValues.items) ? formValues.items : [];
    updateField("items", [...current, { name: "", url: "" }]);
  };

  const removeBreadcrumbItem = (idx: number) => {
    const current = Array.isArray(formValues.items) ? [...formValues.items] : [];
    current.splice(idx, 1);
    updateField("items", current);
  };

  const updateBreadcrumbItem = (idx: number, key: "name" | "url", val: string) => {
    const current = Array.isArray(formValues.items) ? [...formValues.items] : [];
    if (current[idx]) {
      current[idx][key] = val;
      updateField("items", current);
    }
  };

  return (
    <div className="w-full min-w-0 max-w-full space-y-8">
      {/* Schema Type Selector Card */}
      <section
        aria-label="Schema Type Selector"
        className="w-full min-w-0 max-w-full rounded-2xl border border-neutral-border bg-surface p-5 shadow-sm sm:p-7 space-y-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-border pb-4">
          <div>
            <h2 className="text-base font-bold text-ink">Select Schema.org Entity Type</h2>
            <p className="text-xs text-neutral-secondary mt-0.5">
              Choose from 15 search-standard structured data specifications.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {validation.isValid ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-state-success-bg px-2.5 py-1 text-xs font-semibold text-state-success border border-[rgba(45,212,167,0.25)]">
                <CheckCircle2 size={13} /> Syntax Valid
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-state-warning-bg px-2.5 py-1 text-xs font-semibold text-state-warning border border-[rgba(251,191,36,0.25)]">
                <AlertCircle size={13} /> Fix Required Fields
              </span>
            )}
          </div>
        </div>

        {/* Dropdown & Quick Badges */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="schema-type-select" className="field-label">
              <span>Schema Type</span>
            </label>
            <select
              id="schema-type-select"
              value={selectedType}
              onChange={(e) => handleTypeChange(e.target.value as SchemaType)}
              className="field font-semibold text-ink"
            >
              {SCHEMA_TYPES.map((st) => (
                <option key={st.type} value={st.type}>
                  {st.label} ({st.type})
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-xs text-neutral-secondary bg-surface-secondary p-3 rounded-xl border border-neutral-border">
              <strong className="text-ink">Context:</strong>{" "}
              {SCHEMA_TYPES.find((s) => s.type === selectedType)?.description}
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic Form Inputs */}
      <section
        aria-label="Schema Form Fields"
        className="w-full min-w-0 max-w-full rounded-2xl border border-neutral-border bg-surface p-5 shadow-sm sm:p-7 space-y-6"
      >
        <div className="flex items-center justify-between border-b border-neutral-border pb-3">
          <h3 className="text-base font-bold text-ink">{selectedType} Properties</h3>
          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary inline-flex items-center gap-1.5"
          >
            <RotateCcw size={12} /> Reset to Example
          </button>
        </div>

        {/* Validation Errors banner if any */}
        {!validation.isValid && (
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <AlertCircle size={14} className="text-amber-700" />
              Please provide required properties:
            </p>
            <ul className="list-disc pl-5 space-y-0.5 text-amber-800">
              {validation.missingFields.map((f) => (
                <li key={f}>Missing required: <strong>{f}</strong></li>
              ))}
              {validation.errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Conditional Forms */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Organization */}
          {selectedType === "Organization" && (
            <>
              <div>
                <label className="field-label"><span>Organization Name <span className="text-brand">*</span></span></label>
                <input
                  type="text"
                  value={formValues.name || ""}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="e.g. Acme Corporation"
                  className="field"
                />
              </div>
              <div>
                <label className="field-label"><span>Website URL <span className="text-brand">*</span></span></label>
                <input
                  type="url"
                  value={formValues.url || ""}
                  onChange={(e) => updateField("url", e.target.value)}
                  placeholder="https://example.com"
                  className="field font-mono text-xs"
                />
              </div>
              <div>
                <label className="field-label"><span>Logo Image URL</span></label>
                <input
                  type="url"
                  value={formValues.logo || ""}
                  onChange={(e) => updateField("logo", e.target.value)}
                  placeholder="https://example.com/logo.png"
                  className="field font-mono text-xs"
                />
              </div>
              <div>
                <label className="field-label"><span>Contact Email</span></label>
                <input
                  type="email"
                  value={formValues.email || ""}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="info@example.com"
                  className="field"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="field-label"><span>Social Profiles (sameAs - one per line)</span></label>
                <textarea
                  rows={2}
                  value={formValues.sameAs || ""}
                  onChange={(e) => updateField("sameAs", e.target.value)}
                  placeholder="https://twitter.com/brand&#10;https://linkedin.com/company/brand"
                  className="field font-mono text-xs"
                />
              </div>
            </>
          )}

          {/* LocalBusiness */}
          {selectedType === "LocalBusiness" && (
            <>
              <div>
                <label className="field-label"><span>Business Name <span className="text-brand">*</span></span></label>
                <input
                  type="text"
                  value={formValues.name || ""}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="e.g. Austin PlumbCraft"
                  className="field"
                />
              </div>
              <div>
                <label className="field-label"><span>Telephone <span className="text-brand">*</span></span></label>
                <input
                  type="tel"
                  value={formValues.telephone || ""}
                  onChange={(e) => updateField("telephone", e.target.value)}
                  placeholder="+1-512-555-0144"
                  className="field"
                />
              </div>
              <div>
                <label className="field-label"><span>Website URL</span></label>
                <input
                  type="url"
                  value={formValues.url || ""}
                  onChange={(e) => updateField("url", e.target.value)}
                  placeholder="https://example.com"
                  className="field font-mono text-xs"
                />
              </div>
              <div>
                <label className="field-label"><span>Street Address</span></label>
                <input
                  type="text"
                  value={formValues.streetAddress || ""}
                  onChange={(e) => updateField("streetAddress", e.target.value)}
                  placeholder="404 Congress Ave"
                  className="field"
                />
              </div>
              <div>
                <label className="field-label"><span>City / Locality</span></label>
                <input
                  type="text"
                  value={formValues.addressLocality || ""}
                  onChange={(e) => updateField("addressLocality", e.target.value)}
                  placeholder="Austin"
                  className="field"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="field-label"><span>State/Region</span></label>
                  <input
                    type="text"
                    value={formValues.addressRegion || ""}
                    onChange={(e) => updateField("addressRegion", e.target.value)}
                    placeholder="TX"
                    className="field"
                  />
                </div>
                <div>
                  <label className="field-label"><span>Postal Code</span></label>
                  <input
                    type="text"
                    value={formValues.postalCode || ""}
                    onChange={(e) => updateField("postalCode", e.target.value)}
                    placeholder="78701"
                    className="field font-mono text-xs"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="field-label"><span>Opening Hours (e.g. Mo-Fr 08:00-18:00 - one per line)</span></label>
                <textarea
                  rows={2}
                  value={formValues.openingHours || ""}
                  onChange={(e) => updateField("openingHours", e.target.value)}
                  placeholder="Mo-Fr 08:00-18:00&#10;Sa 09:00-14:00"
                  className="field font-mono text-xs"
                />
              </div>
            </>
          )}

          {/* Product */}
          {selectedType === "Product" && (
            <>
              <div>
                <label className="field-label"><span>Product Name <span className="text-brand">*</span></span></label>
                <input
                  type="text"
                  value={formValues.name || ""}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="e.g. Ultra Lightweight Trail Shoes"
                  className="field"
                />
              </div>
              <div>
                <label className="field-label"><span>Price <span className="text-brand">*</span></span></label>
                <input
                  type="number"
                  step="0.01"
                  value={formValues.price || ""}
                  onChange={(e) => updateField("price", e.target.value)}
                  placeholder="149.99"
                  className="field font-mono text-xs"
                />
              </div>
              <div>
                <label className="field-label"><span>Brand Name</span></label>
                <input
                  type="text"
                  value={formValues.brand || ""}
                  onChange={(e) => updateField("brand", e.target.value)}
                  placeholder="e.g. ApexGear"
                  className="field"
                />
              </div>
              <div>
                <label className="field-label"><span>SKU / Identifier</span></label>
                <input
                  type="text"
                  value={formValues.sku || ""}
                  onChange={(e) => updateField("sku", e.target.value)}
                  placeholder="AG-TR-2026"
                  className="field font-mono text-xs"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="field-label"><span>Description</span></label>
                <textarea
                  rows={2}
                  value={formValues.description || ""}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Detailed product specifications and benefits..."
                  className="field text-xs"
                />
              </div>
            </>
          )}

          {/* Article & BlogPosting */}
          {(selectedType === "Article" || selectedType === "BlogPosting") && (
            <>
              <div className="sm:col-span-2">
                <label className="field-label"><span>Headline <span className="text-brand">*</span></span></label>
                <input
                  type="text"
                  value={formValues.headline || ""}
                  onChange={(e) => updateField("headline", e.target.value)}
                  placeholder="Article or Blog Title"
                  className="field"
                />
              </div>
              <div>
                <label className="field-label"><span>Author Name <span className="text-brand">*</span></span></label>
                <input
                  type="text"
                  value={formValues.authorName || ""}
                  onChange={(e) => updateField("authorName", e.target.value)}
                  placeholder="Author Full Name"
                  className="field"
                />
              </div>
              <div>
                <label className="field-label"><span>Publisher Name</span></label>
                <input
                  type="text"
                  value={formValues.publisherName || ""}
                  onChange={(e) => updateField("publisherName", e.target.value)}
                  placeholder="Publishing Company or Brand"
                  className="field"
                />
              </div>
              <div>
                <label className="field-label"><span>Date Published <span className="text-brand">*</span></span></label>
                <input
                  type="date"
                  value={formValues.datePublished || ""}
                  onChange={(e) => updateField("datePublished", e.target.value)}
                  className="field"
                />
              </div>
              <div>
                <label className="field-label"><span>Date Modified</span></label>
                <input
                  type="date"
                  value={formValues.dateModified || ""}
                  onChange={(e) => updateField("dateModified", e.target.value)}
                  className="field"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="field-label"><span>Article Summary</span></label>
                <textarea
                  rows={2}
                  value={formValues.description || ""}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Concise abstract of the article..."
                  className="field text-xs"
                />
              </div>
            </>
          )}

          {/* Service */}
          {selectedType === "Service" && (
            <>
              <div>
                <label className="field-label"><span>Service Name <span className="text-brand">*</span></span></label>
                <input
                  type="text"
                  value={formValues.name || ""}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="e.g. Website Speed Optimization"
                  className="field"
                />
              </div>
              <div>
                <label className="field-label"><span>Provider Name <span className="text-brand">*</span></span></label>
                <input
                  type="text"
                  value={formValues.providerName || ""}
                  onChange={(e) => updateField("providerName", e.target.value)}
                  placeholder="e.g. Zenvuk Agency"
                  className="field"
                />
              </div>
              <div>
                <label className="field-label"><span>Provider URL</span></label>
                <input
                  type="url"
                  value={formValues.providerUrl || ""}
                  onChange={(e) => updateField("providerUrl", e.target.value)}
                  placeholder="https://example.com"
                  className="field font-mono text-xs"
                />
              </div>
              <div>
                <label className="field-label"><span>Area Served</span></label>
                <input
                  type="text"
                  value={formValues.areaServed || ""}
                  onChange={(e) => updateField("areaServed", e.target.value)}
                  placeholder="e.g. United States or Global"
                  className="field"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="field-label"><span>Description</span></label>
                <textarea
                  rows={2}
                  value={formValues.description || ""}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Detailed scope of the service provided..."
                  className="field text-xs"
                />
              </div>
            </>
          )}

          {/* Person */}
          {selectedType === "Person" && (
            <>
              <div>
                <label className="field-label"><span>Full Name <span className="text-brand">*</span></span></label>
                <input
                  type="text"
                  value={formValues.name || ""}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className="field"
                />
              </div>
              <div>
                <label className="field-label"><span>Job Title</span></label>
                <input
                  type="text"
                  value={formValues.jobTitle || ""}
                  onChange={(e) => updateField("jobTitle", e.target.value)}
                  placeholder="e.g. Chief Marketing Officer"
                  className="field"
                />
              </div>
              <div>
                <label className="field-label"><span>Personal or Bio URL</span></label>
                <input
                  type="url"
                  value={formValues.url || ""}
                  onChange={(e) => updateField("url", e.target.value)}
                  placeholder="https://example.com/author"
                  className="field font-mono text-xs"
                />
              </div>
              <div>
                <label className="field-label"><span>Works For (Organization)</span></label>
                <input
                  type="text"
                  value={formValues.worksFor || ""}
                  onChange={(e) => updateField("worksFor", e.target.value)}
                  placeholder="Company Name"
                  className="field"
                />
              </div>
            </>
          )}

          {/* FAQPage */}
          {selectedType === "FAQPage" && (
            <div className="sm:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-ink">Question & Answer Pairs</span>
                <button
                  type="button"
                  onClick={addFaqItem}
                  className="btn-secondary inline-flex items-center gap-1 text-xs"
                >
                  <Plus size={13} /> Add Question
                </button>
              </div>

              {Array.isArray(formValues.items) && formValues.items.map((item: any, idx: number) => (
                <div key={idx} className="rounded-xl border border-neutral-border bg-surface-secondary/70 p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-secondary">Question #{idx + 1}</span>
                    {formValues.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFaqItem(idx)}
                        className="text-neutral-muted hover:text-state-error"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={item.question || ""}
                    onChange={(e) => updateFaqItem(idx, "question", e.target.value)}
                    placeholder="Enter question..."
                    className="field text-xs"
                  />
                  <textarea
                    rows={2}
                    value={item.answer || ""}
                    onChange={(e) => updateFaqItem(idx, "answer", e.target.value)}
                    placeholder="Enter direct answer..."
                    className="field text-xs"
                  />
                </div>
              ))}
            </div>
          )}

          {/* BreadcrumbList */}
          {selectedType === "BreadcrumbList" && (
            <div className="sm:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-ink">Breadcrumb Trail Items</span>
                <button
                  type="button"
                  onClick={addBreadcrumbItem}
                  className="btn-secondary inline-flex items-center gap-1 text-xs"
                >
                  <Plus size={13} /> Add Step
                </button>
              </div>

              {Array.isArray(formValues.items) && formValues.items.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface-secondary border border-neutral-border text-xs font-bold text-neutral-secondary">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={item.name || ""}
                    onChange={(e) => updateBreadcrumbItem(idx, "name", e.target.value)}
                    placeholder="Page Name (e.g. Products)"
                    className="field text-xs w-1/3"
                  />
                  <input
                    type="url"
                    value={item.url || ""}
                    onChange={(e) => updateBreadcrumbItem(idx, "url", e.target.value)}
                    placeholder="https://example.com/products"
                    className="field text-xs font-mono flex-1"
                  />
                  {formValues.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBreadcrumbItem(idx)}
                      className="p-1 text-neutral-muted hover:text-state-error shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* WebSite, WebPage, Event, VideoObject, Applications */}
          {selectedType === "WebSite" && (
            <>
              <div>
                <label className="field-label"><span>WebSite Name <span className="text-brand">*</span></span></label>
                <input
                  type="text"
                  value={formValues.name || ""}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="e.g. Zenvuk"
                  className="field"
                />
              </div>
              <div>
                <label className="field-label"><span>WebSite URL <span className="text-brand">*</span></span></label>
                <input
                  type="url"
                  value={formValues.url || ""}
                  onChange={(e) => updateField("url", e.target.value)}
                  placeholder="https://zenvuk.com"
                  className="field font-mono text-xs"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="field-label"><span>Internal Search URL (Optional for Sitelinks Searchbox)</span></label>
                <input
                  type="url"
                  value={formValues.searchUrl || ""}
                  onChange={(e) => updateField("searchUrl", e.target.value)}
                  placeholder="https://zenvuk.com/search"
                  className="field font-mono text-xs"
                />
              </div>
            </>
          )}

          {selectedType === "WebPage" && (
            <>
              <div>
                <label className="field-label"><span>Page Name <span className="text-brand">*</span></span></label>
                <input
                  type="text"
                  value={formValues.name || ""}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="e.g. About Us"
                  className="field"
                />
              </div>
              <div>
                <label className="field-label"><span>Page URL <span className="text-brand">*</span></span></label>
                <input
                  type="url"
                  value={formValues.url || ""}
                  onChange={(e) => updateField("url", e.target.value)}
                  placeholder="https://example.com/about"
                  className="field font-mono text-xs"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="field-label"><span>Description</span></label>
                <textarea
                  rows={2}
                  value={formValues.description || ""}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Summary of this webpage..."
                  className="field text-xs"
                />
              </div>
            </>
          )}

          {(selectedType === "SoftwareApplication" || selectedType === "WebApplication") && (
            <>
              <div>
                <label className="field-label"><span>Application Name <span className="text-brand">*</span></span></label>
                <input
                  type="text"
                  value={formValues.name || ""}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="e.g. Zenvuk Schema Generator"
                  className="field"
                />
              </div>
              <div>
                <label className="field-label"><span>Category</span></label>
                <input
                  type="text"
                  value={formValues.applicationCategory || ""}
                  onChange={(e) => updateField("applicationCategory", e.target.value)}
                  placeholder="BusinessApplication"
                  className="field"
                />
              </div>
              <div>
                <label className="field-label"><span>Operating System / Browser</span></label>
                <input
                  type="text"
                  value={formValues.operatingSystem || formValues.browserRequirements || ""}
                  onChange={(e) => updateField(selectedType === "WebApplication" ? "browserRequirements" : "operatingSystem", e.target.value)}
                  placeholder="Web, Windows, macOS"
                  className="field"
                />
              </div>
              <div>
                <label className="field-label"><span>Price (0 if Free)</span></label>
                <input
                  type="number"
                  value={formValues.price ?? "0"}
                  onChange={(e) => updateField("price", e.target.value)}
                  placeholder="0"
                  className="field font-mono text-xs"
                />
              </div>
            </>
          )}

          {selectedType === "Event" && (
            <>
              <div className="sm:col-span-2">
                <label className="field-label"><span>Event Name <span className="text-brand">*</span></span></label>
                <input
                  type="text"
                  value={formValues.name || ""}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="e.g. SEO Masterclass 2026"
                  className="field"
                />
              </div>
              <div>
                <label className="field-label"><span>Start Date (ISO 8601) <span className="text-brand">*</span></span></label>
                <input
                  type="text"
                  value={formValues.startDate || ""}
                  onChange={(e) => updateField("startDate", e.target.value)}
                  placeholder="2026-05-10T10:00:00Z"
                  className="field font-mono text-xs"
                />
              </div>
              <div>
                <label className="field-label"><span>End Date (ISO 8601)</span></label>
                <input
                  type="text"
                  value={formValues.endDate || ""}
                  onChange={(e) => updateField("endDate", e.target.value)}
                  placeholder="2026-05-10T18:00:00Z"
                  className="field font-mono text-xs"
                />
              </div>
              <div>
                <label className="field-label"><span>Location Name</span></label>
                <input
                  type="text"
                  value={formValues.locationName || ""}
                  onChange={(e) => updateField("locationName", e.target.value)}
                  placeholder="Grand Ballroom"
                  className="field"
                />
              </div>
              <div>
                <label className="field-label"><span>Address or Virtual URL</span></label>
                <input
                  type="text"
                  value={formValues.locationAddress || ""}
                  onChange={(e) => updateField("locationAddress", e.target.value)}
                  placeholder="100 Convention Center Blvd"
                  className="field"
                />
              </div>
            </>
          )}

          {selectedType === "VideoObject" && (
            <>
              <div className="sm:col-span-2">
                <label className="field-label"><span>Video Title <span className="text-brand">*</span></span></label>
                <input
                  type="text"
                  value={formValues.name || ""}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="e.g. How to Validate Schema Markup"
                  className="field"
                />
              </div>
              <div>
                <label className="field-label"><span>Thumbnail URL <span className="text-brand">*</span></span></label>
                <input
                  type="url"
                  value={formValues.thumbnailUrl || ""}
                  onChange={(e) => updateField("thumbnailUrl", e.target.value)}
                  placeholder="https://example.com/thumb.jpg"
                  className="field font-mono text-xs"
                />
              </div>
              <div>
                <label className="field-label"><span>Upload Date <span className="text-brand">*</span></span></label>
                <input
                  type="date"
                  value={formValues.uploadDate || ""}
                  onChange={(e) => updateField("uploadDate", e.target.value)}
                  className="field"
                />
              </div>
              <div>
                <label className="field-label"><span>Direct Video Content URL</span></label>
                <input
                  type="url"
                  value={formValues.contentUrl || ""}
                  onChange={(e) => updateField("contentUrl", e.target.value)}
                  placeholder="https://example.com/video.mp4"
                  className="field font-mono text-xs"
                />
              </div>
              <div>
                <label className="field-label"><span>Embed Player URL</span></label>
                <input
                  type="url"
                  value={formValues.embedUrl || ""}
                  onChange={(e) => updateField("embedUrl", e.target.value)}
                  placeholder="https://example.com/embed/123"
                  className="field font-mono text-xs"
                />
              </div>
            </>
          )}
        </div>
      </section>

      {/* Code Preview Component with Minify & Script Wrapper */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-2">
            <FileCode size={16} className="text-brand" />
            <span className="text-xs font-bold uppercase tracking-wider text-ink">
              Output Format Controls
            </span>
          </div>
          <button
            type="button"
            onClick={handleDownloadHtml}
            className="btn-secondary inline-flex items-center gap-1.5"
          >
            <Download size={13} /> Download .HTML
          </button>
        </div>

        <CodePreview
          code={displayedCode}
          htmlCode={htmlOutput}
          title={`${selectedType} JSON-LD Markup`}
          minified={minified}
          onMinifiedChange={setMinified}
          includeScriptTag={includeScriptTag}
          onIncludeScriptTagChange={setIncludeScriptTag}
          downloadFilename={`${selectedType.toLowerCase()}-schema.json`}
          toolName="schema-markup-generator"
          note="Valid Schema.org structured data markup ready to paste into your website's <head> section."
        />
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowRight, Wrench, Sparkles, HelpCircle, Code2, Link2, ShieldAlert, Globe, Network, FileCode } from "lucide-react";

interface RelatedToolCtaProps {
  slug?: string;
  title?: string;
  category?: string;
  content?: string;
  className?: string;
}

interface ToolMatch {
  name: string;
  headline: string;
  description: string;
  href: string;
  buttonText: string;
  icon: typeof Wrench;
}

export function getMatchedTool(textToInspect: string): ToolMatch {
  const lower = textToInspect.toLowerCase();

  if (lower.includes("faq")) {
    return {
      name: "FAQ Schema Generator",
      headline: "Try the Free FAQ Schema Generator",
      description:
        "Generate valid, copy-ready FAQPage JSON-LD structured data for Google Search. Real-time validation, minification, and one-click export.",
      href: "/faq-schema-generator/",
      buttonText: "Open FAQ Schema Generator",
      icon: HelpCircle,
    };
  }

  if (lower.includes("utm") || lower.includes("campaign") || lower.includes("tracking")) {
    return {
      name: "UTM Parameter Builder",
      headline: "Try the Free UTM Parameter Builder",
      description:
        "Build, validate, and organize campaign attribution URLs for Google Analytics 4 (GA4) with instant vector QR code export.",
      href: "/utm-builder/",
      buttonText: "Open UTM Builder",
      icon: Link2,
    };
  }

  if (lower.includes("robots") || lower.includes("crawl") || lower.includes("disallow")) {
    return {
      name: "Robots.txt Generator",
      headline: "Try the Free Robots.txt Generator",
      description:
        "Construct search crawler directives, protect sensitive paths, and ensure your XML sitemap is properly referenced.",
      href: "/robots-txt-generator/",
      buttonText: "Open Robots.txt Generator",
      icon: ShieldAlert,
    };
  }

  if (lower.includes("canonical")) {
    return {
      name: "Canonical Tag Generator",
      headline: "Try the Free Canonical Tag Generator",
      description:
        "Prevent duplicate content penalties and consolidate link equity across URL variations with verified canonical links.",
      href: "/canonical-tag-generator/",
      buttonText: "Open Canonical Generator",
      icon: Network,
    };
  }

  if (lower.includes("hreflang") || lower.includes("multilingual") || lower.includes("x-default")) {
    return {
      name: "Hreflang Generator",
      headline: "Try the Free Hreflang Tag Generator",
      description:
        "Generate accurate multi-language and regional alternate annotations adhering to ISO 639-1 language and ISO 3166-1 country standards.",
      href: "/hreflang-generator/",
      buttonText: "Open Hreflang Generator",
      icon: Globe,
    };
  }

  if (lower.includes("sitemap")) {
    return {
      name: "XML Sitemap Generator",
      headline: "Try the Free XML Sitemap Generator",
      description:
        "Build search-compliant sitemaps for Google, Bing, and web crawlers with customizable priority and change frequency settings.",
      href: "/xml-sitemap-generator/",
      buttonText: "Open XML Sitemap Generator",
      icon: FileCode,
    };
  }

  if (lower.includes("schema") || lower.includes("structured data") || lower.includes("json-ld")) {
    return {
      name: "Schema Markup Generator",
      headline: "Try the Free Schema Markup Generator",
      description:
        "Create Google-compliant structured data for Organizations, Local Businesses, Articles, Products, and breadcrumbs in seconds.",
      href: "/schema-markup-generator/",
      buttonText: "Open Schema Generator",
      icon: Code2,
    };
  }

  // Default fallback
  return {
    name: "Zenvuk Developer SEO Suite",
    headline: "Explore Free SEO & Marketing Utilities",
    description:
      "All 15 Zenvuk utilities are 100% browser-based, privacy-focused, and free forever. Zero logins, zero paywalls.",
    href: "/tools/",
    buttonText: "Explore All 15 Tools",
    icon: Sparkles,
  };
}

export function RelatedToolCta({
  slug = "",
  title = "",
  category = "",
  content = "",
  className = "",
}: RelatedToolCtaProps) {
  const combinedText = `${slug} ${title} ${category} ${content.slice(0, 500)}`;
  const tool = getMatchedTool(combinedText);
  const Icon = tool.icon;

  return (
    <aside
      aria-label="Related Tool Recommendation"
      className={`my-10 rounded-2xl border border-[#22344C] border-l-[3px] border-l-[#5B7CFF] bg-[#0D1A2B] p-6 sm:p-7 shadow-card transition-all ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7893FF]">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-[rgba(91,124,255,0.12)] text-[#5B7CFF]">
              <Icon size={14} />
            </span>
            <span>Recommended Zenvuk Utility</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#F5F8FC]">
            {tool.headline}
          </h3>
          <p className="text-sm leading-relaxed text-[#B5C1D1] max-w-2xl">
            {tool.description}
          </p>
        </div>

        <div className="shrink-0">
          <Link
            href={tool.href}
            className="inline-flex items-center gap-2 rounded-xl bg-[#5B7CFF] hover:bg-[#6B88FF] text-white px-5 py-3 text-sm font-semibold shadow-[0_4px_14px_rgba(91,124,255,0.18)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{tool.buttonText}</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </aside>
  );
}

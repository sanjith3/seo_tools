import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";

export interface BreadcrumbCrumb {
  name: string;
  href?: string;
  canonicalUrl?: string;
}

export function Breadcrumbs({
  crumbs,
  hideJsonLd = false
}: {
  crumbs: BreadcrumbCrumb[];
  hideJsonLd?: boolean;
}) {
  const schemaItems = [
    { name: "Home", url: `${siteConfig.url}/` },
    ...crumbs.map((c) => {
      let itemUrl = `${siteConfig.url}/`;
      if (c.canonicalUrl) {
        itemUrl = c.canonicalUrl;
      } else if (c.href) {
        const normalizedHref = c.href.startsWith("/") ? c.href : `/${c.href}`;
        itemUrl = `${siteConfig.url}${normalizedHref.endsWith("/") ? normalizedHref : `${normalizedHref}/`}`;
      }
      return {
        name: c.name,
        url: itemUrl
      };
    })
  ];

  return (
    <>
      {!hideJsonLd && <BreadcrumbJsonLd items={schemaItems} />}
      <nav aria-label="Breadcrumb" className="flex items-center text-xs font-medium text-[#7F8DA3]">
        <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-[#7F8DA3] hover:text-[#7893FF] transition-colors"
            >
              <Home size={13} className="shrink-0" />
              <span>Home</span>
            </Link>
          </li>
          {crumbs.map((crumb, idx) => {
            const isLast = idx === crumbs.length - 1;
            return (
              <li key={`${crumb.name}-${idx}`} className="inline-flex items-center gap-1.5 sm:gap-2">
                <ChevronRight size={12} className="text-[#64748B] shrink-0" />
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="text-[#7F8DA3] hover:text-[#7893FF] transition-colors"
                  >
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-[#CBD5E1] font-semibold" aria-current="page">
                    {crumb.name}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

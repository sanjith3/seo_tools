import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Calendar, UserCheck } from "lucide-react";
import { siteConfig } from "@/config/site";

interface InfoPageProps {
  title: string;
  intro: string;
  category?: string;
  lastUpdated?: string;
  canonicalPath?: string;
  children: React.ReactNode;
}

export function InfoPage({
  title,
  intro,
  category = "Zenvuk",
  lastUpdated = "September 2025",
  canonicalPath,
  children
}: InfoPageProps) {
  const pageCanonicalUrl = canonicalPath
    ? `${siteConfig.url}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}`
    : undefined;

  return (
    <>
      <Header />
      <main className="container py-8 sm:py-14">
        <Breadcrumbs crumbs={[{ name: title, canonicalUrl: pageCanonicalUrl }]} />

        <div className="mt-8 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-brand">
            {category}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-secondary sm:text-lg">
            {intro}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-neutral-border pb-6 text-xs text-neutral-muted">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={13} className="text-neutral-muted" />
              <span>Last updated: <strong className="text-ink">{lastUpdated}</strong></span>
            </span>
            <span className="text-neutral-border">•</span>
            <span className="inline-flex items-center gap-1.5">
              <UserCheck size={13} className="text-neutral-muted" />
              <span>Published by: <strong className="text-ink">{siteConfig.creator}</strong></span>
            </span>
          </div>

          <article className="prose-lite mt-8 text-sm leading-relaxed text-neutral-secondary space-y-6">
            {children}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}

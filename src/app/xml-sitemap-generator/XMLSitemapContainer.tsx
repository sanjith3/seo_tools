"use client";

import { ToolLayout } from "@/components/ToolLayout";
import { XMLSitemapTool } from "@/components/tools/XMLSitemapTool";
import { Network } from "lucide-react";

export function XMLSitemapContainer({ children }: { children?: React.ReactNode }) {
  const sidebarNode = (
    <div className="rounded-2xl border border-neutral-border bg-surface p-6 shadow-card">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-[rgba(91,124,255,0.12)] text-brand">
          <Network size={16} />
        </span>
        <h3 className="text-sm font-bold text-ink">Sitemap Protocol</h3>
      </div>

      <div className="mt-4 space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Max URLs / File</span>
          <span className="font-mono text-ink font-bold">50,000 URLs</span>
        </div>

        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Max Payload</span>
          <span className="font-mono text-neutral-secondary font-medium">50.0 MB</span>
        </div>

        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Format Schema</span>
          <span className="font-medium text-state-success">sitemaps.org 0.9</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-muted">Crawler Compatibility</span>
          <span className="font-semibold text-ink">Google, Bing, Yandex</span>
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      slug="xml-sitemap-generator"
      sidebarSummary={sidebarNode}
      toolNode={<XMLSitemapTool />}
    >
      {children}
    </ToolLayout>
  );
}

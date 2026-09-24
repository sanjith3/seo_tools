"use client";

import { ToolLayout } from "@/components/ToolLayout";
import { KeywordDensityTool } from "@/components/tools/KeywordDensityTool";
import { BarChart3 } from "lucide-react";

export function KeywordDensityContainer({ children }: { children?: React.ReactNode }) {
  const sidebarNode = (
    <div className="rounded-2xl border border-neutral-border bg-surface p-6 shadow-card">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-[rgba(91,124,255,0.12)] text-brand">
          <BarChart3 size={16} />
        </span>
        <h3 className="text-sm font-bold text-ink">Content Audit Summary</h3>
      </div>

      <div className="mt-4 space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">N-Gram Coverage</span>
          <span className="font-mono text-neutral-secondary font-medium">1-gram to 4-gram</span>
        </div>

        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Stop Word Filter</span>
          <span className="font-medium text-state-success">120+ English Words</span>
        </div>

        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Target Threshold</span>
          <span className="font-medium text-ink">&lt;3.5% Natural Range</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-muted">Reading Engine</span>
          <span className="font-semibold text-ink">200 WPM Standard</span>
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      slug="keyword-density-checker"
      sidebarSummary={sidebarNode}
      toolNode={<KeywordDensityTool />}
    >
      {children}
    </ToolLayout>
  );
}

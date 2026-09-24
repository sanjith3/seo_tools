"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { ProductTitleTool } from "@/components/tools/ProductTitleTool";
import { ProductTitleSummary } from "@/lib/generators/product-title";
import { BarChart3, Award } from "lucide-react";

export function ProductTitleToolContainer({ children }: { children?: React.ReactNode }) {
  const [summary, setSummary] = useState<ProductTitleSummary | null>(null);

  const handleSummaryChange = useCallback((newSummary: ProductTitleSummary | null) => {
    setSummary((prev) => {
      if (!newSummary && !prev) return prev;
      if (
        prev &&
        newSummary &&
        prev.totalGenerated === newSummary.totalGenerated &&
        prev.bestScore === newSummary.bestScore &&
        prev.averageLength === newSummary.averageLength &&
        prev.keywordCoveragePct === newSummary.keywordCoveragePct
      ) {
        return prev;
      }
      return newSummary;
    });
  }, []);

  const sidebarNode = summary ? (
    <div className="rounded-2xl border border-neutral-border bg-surface p-6 shadow-card">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-[rgba(91,124,255,0.12)] text-brand">
          <BarChart3 size={16} />
        </span>
        <h3 className="text-sm font-bold text-ink">SEO Title Summary</h3>
      </div>

      <div className="mt-4 space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Titles Generated</span>
          <span className="font-bold text-ink">{summary.totalGenerated}</span>
        </div>

        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Top Zenvuk Score</span>
          <span className="font-bold text-state-success flex items-center gap-1">
            <Award size={13} /> {summary.bestScore}/100
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Average Length</span>
          <span className="font-bold text-ink">{summary.averageLength} chars</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-muted">Keyword Coverage</span>
          <span className="font-bold text-brand">{summary.keywordCoveragePct}% match</span>
        </div>
      </div>
    </div>
  ) : undefined;

  return (
    <ToolLayout
      slug="product-title-generator"
      sidebarSummary={sidebarNode}
      toolNode={<ProductTitleTool onSummaryChange={handleSummaryChange} />}
    >
      {children}
    </ToolLayout>
  );
}

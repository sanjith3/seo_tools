"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { MetaDescriptionTool } from "@/components/tools/MetaDescriptionTool";
import { MetaDescriptionSummary } from "@/lib/generators/meta-description";
import { FileText, Award } from "lucide-react";

export function MetaDescriptionToolContainer({ children }: { children?: React.ReactNode }) {
  const [summary, setSummary] = useState<MetaDescriptionSummary | null>(null);

  const handleSummaryChange = useCallback((newSummary: MetaDescriptionSummary | null) => {
    setSummary((prev) => {
      if (!newSummary && !prev) return prev;
      if (
        prev &&
        newSummary &&
        prev.totalGenerated === newSummary.totalGenerated &&
        prev.bestScore === newSummary.bestScore &&
        prev.averageLength === newSummary.averageLength &&
        prev.keywordCoveragePct === newSummary.keywordCoveragePct &&
        prev.ctaCoveragePct === newSummary.ctaCoveragePct
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
          <FileText size={16} />
        </span>
        <h3 className="text-sm font-bold text-ink">Snippet Summary</h3>
      </div>

      <div className="mt-4 space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Descriptions Created</span>
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

        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Keyword Presence</span>
          <span className="font-bold text-brand">{summary.keywordCoveragePct}%</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-muted">CTA Coverage</span>
          <span className="font-bold text-state-success">{summary.ctaCoveragePct}%</span>
        </div>
      </div>
    </div>
  ) : undefined;

  return (
    <ToolLayout
      slug="meta-description-generator"
      sidebarSummary={sidebarNode}
      toolNode={<MetaDescriptionTool onSummaryChange={handleSummaryChange} />}
    >
      {children}
    </ToolLayout>
  );
}

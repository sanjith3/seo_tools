"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { RobotsTxtTool } from "@/components/tools/RobotsTxtTool";
import { ShieldAlert, CheckCircle2, AlertTriangle } from "lucide-react";

export function RobotsTxtContainer({ children }: { children?: React.ReactNode }) {
  const [summary, setSummary] = useState<{
    groupCount: number;
    sitemapCount: number;
    hasWarning: boolean;
  }>({
    groupCount: 1,
    sitemapCount: 1,
    hasWarning: false
  });

  const handleSummaryChange = useCallback((groupCount: number, sitemapCount: number, hasWarning: boolean) => {
    setSummary((prev) => {
      if (prev.groupCount === groupCount && prev.sitemapCount === sitemapCount && prev.hasWarning === hasWarning) {
        return prev;
      }
      return { groupCount, sitemapCount, hasWarning };
    });
  }, []);

  const sidebarNode = (
    <div className="rounded-2xl border border-neutral-border bg-surface p-6 shadow-card">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-[rgba(91,124,255,0.12)] text-brand">
          <ShieldAlert size={16} />
        </span>
        <h3 className="text-sm font-bold text-ink">robots.txt Summary</h3>
      </div>

      <div className="mt-4 space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Blocking Status</span>
          {summary.hasWarning ? (
            <span className="font-bold text-state-error flex items-center gap-1">
              <AlertTriangle size={13} /> Site Blocked!
            </span>
          ) : (
            <span className="font-bold text-state-success flex items-center gap-1">
              <CheckCircle2 size={13} /> Safe Directives
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Crawler Groups</span>
          <span className="font-bold text-ink">{summary.groupCount}</span>
        </div>

        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Sitemap Directives</span>
          <span className="font-bold text-ink">{summary.sitemapCount}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-muted">Specification</span>
          <span className="font-mono text-neutral-secondary font-medium">IETF RFC 9309</span>
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      slug="robots-txt-generator"
      sidebarSummary={sidebarNode}
      toolNode={<RobotsTxtTool onSummaryChange={handleSummaryChange} />}
    >
      {children}
    </ToolLayout>
  );
}

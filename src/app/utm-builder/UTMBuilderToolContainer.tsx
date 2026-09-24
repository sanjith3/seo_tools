"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { UTMBuilderTool } from "@/components/tools/UTMBuilderTool";
import { Compass, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";

export function UTMBuilderToolContainer({ children }: { children?: React.ReactNode }) {
  const [summary, setSummary] = useState<{
    configuredCount: number;
    isValid: boolean;
  } | null>(null);

  // Memoized callback with functional state update and equality check to prevent infinite render loops
  const handleSummaryChange = useCallback((configuredCount: number, isValid: boolean) => {
    setSummary((prev) => {
      if (prev && prev.configuredCount === configuredCount && prev.isValid === isValid) {
        return prev;
      }
      return { configuredCount, isValid };
    });
  }, []);

  const sidebarNode = summary ? (
    <div className="rounded-2xl border border-neutral-border bg-surface p-6 shadow-card">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-[rgba(91,124,255,0.12)] text-brand">
          <Compass size={16} />
        </span>
        <h3 className="text-sm font-bold text-ink">Campaign Summary</h3>
      </div>

      <div className="mt-4 space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Validation Status</span>
          {summary.isValid ? (
            <span className="font-bold text-state-success flex items-center gap-1">
              <CheckCircle2 size={13} /> Ready to Track
            </span>
          ) : (
            <span className="font-bold text-state-warning flex items-center gap-1">
              <AlertCircle size={13} /> Incomplete URL
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Parameters Set</span>
          <span className="font-bold text-ink">{summary.configuredCount} of 5</span>
        </div>

        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Target Standard</span>
          <span className="font-mono text-neutral-secondary font-medium">GA4 / RFC 3986</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-muted">Privacy Status</span>
          <span className="text-state-success font-semibold flex items-center gap-1">
            <ShieldCheck size={12} /> Local History
          </span>
        </div>
      </div>
    </div>
  ) : undefined;

  return (
    <ToolLayout
      slug="utm-builder"
      sidebarSummary={sidebarNode}
      toolNode={<UTMBuilderTool onSummaryChange={handleSummaryChange} />}
    >
      {children}
    </ToolLayout>
  );
}

"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { FAQSchemaTool } from "@/components/tools/FAQSchemaTool";
import { CheckCircle2, AlertCircle, FileCode } from "lucide-react";

export function FAQToolContainer({ children }: { children?: React.ReactNode }) {
  const [summary, setSummary] = useState<{
    validCount: number;
    totalCount: number;
    hasErrors: boolean;
  } | null>(null);

  const handleSummaryUpdate = useCallback(
    (validCount: number, totalCount: number, hasErrors: boolean) => {
      setSummary((prev) => {
        if (
          prev &&
          prev.validCount === validCount &&
          prev.totalCount === totalCount &&
          prev.hasErrors === hasErrors
        ) {
          return prev;
        }
        return { validCount, totalCount, hasErrors };
      });
    },
    []
  );

  const sidebarNode = summary ? (
    <div className="rounded-2xl border border-neutral-border bg-surface p-6 shadow-card">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-[rgba(91,124,255,0.12)] text-brand">
          <FileCode size={16} />
        </span>
        <h3 className="text-sm font-bold text-ink">Validation Summary</h3>
      </div>

      <div className="mt-4 space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Status</span>
          {!summary.hasErrors && summary.validCount > 0 ? (
            <span className="font-bold text-state-success flex items-center gap-1">
              <CheckCircle2 size={13} /> Valid Schema.org
            </span>
          ) : (
            <span className="font-bold text-state-error flex items-center gap-1">
              <AlertCircle size={13} /> Action Needed
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Valid FAQ Items</span>
          <span className="font-bold text-ink">{summary.validCount}</span>
        </div>

        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Total Entries</span>
          <span className="font-bold text-ink">{summary.totalCount}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-muted">Format Target</span>
          <span className="font-mono text-neutral-secondary font-medium">FAQPage (JSON-LD)</span>
        </div>
      </div>
    </div>
  ) : undefined;

  return (
    <ToolLayout
      slug="faq-schema-generator"
      sidebarSummary={sidebarNode}
      toolNode={<FAQSchemaTool onSummaryUpdate={handleSummaryUpdate} />}
    >
      {children}
    </ToolLayout>
  );
}

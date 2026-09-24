"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { HreflangTool } from "@/components/tools/HreflangTool";
import { Globe, CheckCircle2, AlertTriangle } from "lucide-react";

export function HreflangContainer({ children }: { children?: React.ReactNode }) {
  const [summary, setSummary] = useState<{
    rowCount: number;
    isValid: boolean;
  }>({
    rowCount: 5,
    isValid: true
  });

  const handleSummaryChange = useCallback((rowCount: number, isValid: boolean) => {
    setSummary((prev) => {
      if (prev.rowCount === rowCount && prev.isValid === isValid) return prev;
      return { rowCount, isValid };
    });
  }, []);

  const sidebarNode = (
    <div className="rounded-2xl border border-neutral-border bg-surface p-6 shadow-card">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-[rgba(91,124,255,0.12)] text-brand">
          <Globe size={16} />
        </span>
        <h3 className="text-sm font-bold text-ink">Hreflang Summary</h3>
      </div>

      <div className="mt-4 space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Validation Status</span>
          {summary.isValid ? (
            <span className="font-bold text-state-success flex items-center gap-1">
              <CheckCircle2 size={13} /> Syntax Valid
            </span>
          ) : (
            <span className="font-bold text-state-warning flex items-center gap-1">
              <AlertTriangle size={13} /> Issues Found
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Language Targets</span>
          <span className="font-bold text-ink">{summary.rowCount}</span>
        </div>

        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Standards</span>
          <span className="font-mono text-neutral-secondary font-medium">ISO 639-1 / 3166-1</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-muted">Output Modes</span>
          <span className="font-medium text-ink">HTML & XML</span>
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      slug="hreflang-generator"
      sidebarSummary={sidebarNode}
      toolNode={<HreflangTool onSummaryChange={handleSummaryChange} />}
    >
      {children}
    </ToolLayout>
  );
}

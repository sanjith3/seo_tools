"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { LLMSTxtTool } from "@/components/tools/LLMSTxtTool";
import { Bot, CheckCircle2, AlertTriangle } from "lucide-react";

export function LLMSTxtContainer({ children }: { children?: React.ReactNode }) {
  const [summary, setSummary] = useState<{
    sectionCount: number;
    linkCount: number;
    isValid: boolean;
  }>({
    sectionCount: 2,
    linkCount: 5,
    isValid: true
  });

  const handleSummaryChange = useCallback((sectionCount: number, linkCount: number, isValid: boolean) => {
    setSummary((prev) => {
      if (prev.sectionCount === sectionCount && prev.linkCount === linkCount && prev.isValid === isValid) {
        return prev;
      }
      return { sectionCount, linkCount, isValid };
    });
  }, []);

  const sidebarNode = (
    <div className="rounded-2xl border border-neutral-border bg-surface p-6 shadow-card">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-[rgba(91,124,255,0.12)] text-brand">
          <Bot size={16} />
        </span>
        <h3 className="text-sm font-bold text-ink">llms.txt Summary</h3>
      </div>

      <div className="mt-4 space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Syntax Status</span>
          {summary.isValid ? (
            <span className="font-bold text-state-success flex items-center gap-1">
              <CheckCircle2 size={13} /> Valid Markdown
            </span>
          ) : (
            <span className="font-bold text-state-warning flex items-center gap-1">
              <AlertTriangle size={13} /> Check Warnings
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Sections</span>
          <span className="font-bold text-ink">{summary.sectionCount}</span>
        </div>

        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Resource Links</span>
          <span className="font-bold text-ink">{summary.linkCount}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-muted">Target Path</span>
          <span className="font-mono text-brand font-medium">/llms.txt</span>
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      slug="llms-txt-generator"
      sidebarSummary={sidebarNode}
      toolNode={<LLMSTxtTool onSummaryChange={handleSummaryChange} />}
    >
      {children}
    </ToolLayout>
  );
}

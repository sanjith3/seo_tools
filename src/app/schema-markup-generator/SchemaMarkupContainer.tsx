"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { SchemaMarkupTool } from "@/components/tools/SchemaMarkupTool";
import { SchemaType } from "@/lib/generators/schema-markup";
import { Code2, CheckCircle2, AlertCircle } from "lucide-react";

export function SchemaMarkupContainer({ children }: { children?: React.ReactNode }) {
  const [summary, setSummary] = useState<{
    schemaType: SchemaType;
    isValid: boolean;
  }>({
    schemaType: "Organization",
    isValid: true
  });

  const handleSummaryChange = useCallback((schemaType: SchemaType, isValid: boolean) => {
    setSummary((prev) => {
      if (prev.schemaType === schemaType && prev.isValid === isValid) return prev;
      return { schemaType, isValid };
    });
  }, []);

  const sidebarNode = (
    <div className="rounded-2xl border border-neutral-border bg-surface p-6 shadow-card">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-[rgba(91,124,255,0.12)] text-brand">
          <Code2 size={16} />
        </span>
        <h3 className="text-sm font-bold text-ink">Schema Summary</h3>
      </div>

      <div className="mt-4 space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Selected Type</span>
          <span className="font-bold text-ink">{summary.schemaType}</span>
        </div>

        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Syntax Status</span>
          {summary.isValid ? (
            <span className="font-bold text-state-success flex items-center gap-1">
              <CheckCircle2 size={13} /> Syntax Valid
            </span>
          ) : (
            <span className="font-bold text-state-warning flex items-center gap-1">
              <AlertCircle size={13} /> Missing Fields
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Format Standard</span>
          <span className="font-mono text-neutral-secondary font-medium">JSON-LD 1.1</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-muted">Vocabulary</span>
          <span className="font-mono text-neutral-secondary font-medium">Schema.org</span>
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      slug="schema-markup-generator"
      sidebarSummary={sidebarNode}
      toolNode={<SchemaMarkupTool onSummaryChange={handleSummaryChange} />}
    >
      {children}
    </ToolLayout>
  );
}

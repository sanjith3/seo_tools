"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { SERPPreviewTool } from "@/components/tools/SERPPreviewTool";
import { Eye, CheckCircle2, Monitor } from "lucide-react";

export function SERPPreviewContainer({ children }: { children?: React.ReactNode }) {
  const sidebarNode = (
    <div className="rounded-2xl border border-neutral-border bg-surface p-6 shadow-card">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-[rgba(91,124,255,0.12)] text-brand">
          <Eye size={16} />
        </span>
        <h3 className="text-sm font-bold text-ink">SERP Simulation</h3>
      </div>

      <div className="mt-4 space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Desktop Title Limit</span>
          <span className="font-mono text-neutral-secondary font-medium">~600px (Arial 20px)</span>
        </div>

        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Mobile Title Limit</span>
          <span className="font-mono text-neutral-secondary font-medium">~580px (Arial 18px)</span>
        </div>

        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Desktop Description</span>
          <span className="font-mono text-neutral-secondary font-medium">~960px (~160 ch)</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-muted">Font Metrics Engine</span>
          <span className="font-bold text-state-success">Proportional Arial</span>
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      slug="serp-preview-tool"
      sidebarSummary={sidebarNode}
      toolNode={<SERPPreviewTool />}
    >
      {children}
    </ToolLayout>
  );
}

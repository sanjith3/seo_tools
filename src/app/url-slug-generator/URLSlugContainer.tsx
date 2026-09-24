"use client";

import { ToolLayout } from "@/components/ToolLayout";
import { URLSlugTool } from "@/components/tools/URLSlugTool";
import { FileCode } from "lucide-react";

export function URLSlugContainer({ children }: { children?: React.ReactNode }) {
  const sidebarNode = (
    <div className="rounded-2xl border border-neutral-border bg-surface p-6 shadow-card">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-[rgba(91,124,255,0.12)] text-brand">
          <FileCode size={16} />
        </span>
        <h3 className="text-sm font-bold text-ink">Slug Rules</h3>
      </div>

      <div className="mt-4 space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Delimiters</span>
          <span className="font-mono text-state-success font-bold">Hyphens (-) Only</span>
        </div>

        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Unicode Handling</span>
          <span className="font-medium text-ink">Transliterated ASCII</span>
        </div>

        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Recommended Max</span>
          <span className="font-mono text-neutral-secondary font-medium">&lt; 60 characters</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-muted">Trailing Slashes</span>
          <span className="font-semibold text-ink">Cleaned &amp; Normalized</span>
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      slug="url-slug-generator"
      sidebarSummary={sidebarNode}
      toolNode={<URLSlugTool />}
    >
      {children}
    </ToolLayout>
  );
}

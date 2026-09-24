"use client";

import { ToolLayout } from "@/components/ToolLayout";
import { OpenGraphTool } from "@/components/tools/OpenGraphTool";
import { Share2, Image as ImageIcon } from "lucide-react";

export function OpenGraphContainer({ children }: { children?: React.ReactNode }) {
  const sidebarNode = (
    <div className="rounded-2xl border border-neutral-border bg-surface p-6 shadow-card">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-[rgba(91,124,255,0.12)] text-brand">
          <Share2 size={16} />
        </span>
        <h3 className="text-sm font-bold text-ink">Social Metadata</h3>
      </div>

      <div className="mt-4 space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Image Ratio</span>
          <span className="font-mono text-neutral-secondary font-medium">1.91:1 (1200×630px)</span>
        </div>

        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Facebook / LinkedIn</span>
          <span className="font-mono text-state-success font-medium">og: tags</span>
        </div>

        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Twitter / X</span>
          <span className="font-mono text-brand font-medium">twitter: cards</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-muted">Protocol Spec</span>
          <span className="font-semibold text-ink">The Open Graph Protocol</span>
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      slug="open-graph-generator"
      sidebarSummary={sidebarNode}
      toolNode={<OpenGraphTool />}
    >
      {children}
    </ToolLayout>
  );
}

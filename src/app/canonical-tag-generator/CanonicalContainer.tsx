"use client";

import { ToolLayout } from "@/components/ToolLayout";
import { CanonicalTool } from "@/components/tools/CanonicalTool";
import { Link2, ShieldCheck } from "lucide-react";

export function CanonicalContainer({ children }: { children?: React.ReactNode }) {
  const sidebarNode = (
    <div className="rounded-2xl border border-neutral-border bg-surface p-6 shadow-card">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-[rgba(91,124,255,0.12)] text-brand">
          <Link2 size={16} />
        </span>
        <h3 className="text-sm font-bold text-ink">Canonical Tag Summary</h3>
      </div>

      <div className="mt-4 space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">HTML Element</span>
          <span className="font-mono text-state-success font-medium">&lt;link rel=&quot;canonical&quot;&gt;</span>
        </div>

        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">HTTP Response Header</span>
          <span className="font-mono text-brand font-medium">Link: rel=&quot;canonical&quot;</span>
        </div>

        <div className="flex items-center justify-between border-b border-neutral-border pb-2">
          <span className="text-neutral-muted">Cleaned Parameters</span>
          <span className="font-medium text-ink">utm_*, gclid, fbclid</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-muted">Specification</span>
          <span className="font-semibold text-ink">IETF RFC 6596</span>
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      slug="canonical-tag-generator"
      sidebarSummary={sidebarNode}
      toolNode={<CanonicalTool />}
    >
      {children}
    </ToolLayout>
  );
}

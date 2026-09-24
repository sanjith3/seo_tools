"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useToast } from "@/components/common/Toast";
import { trackEvent } from "@/lib/analytics";

interface CopyButtonProps {
  value: string;
  label?: string;
  className?: string;
  toastMessage?: string;
  toolName?: string;
}

export function CopyButton({
  value,
  label = "Copy",
  className = "",
  toastMessage = "Copied to clipboard!",
  toolName
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      showToast(toastMessage, "success");
      trackEvent("copy_result", { tool_name: toolName || "unknown" });
      setTimeout(() => setCopied(false), 1800);
    } catch {
      showToast("Unable to copy to clipboard", "error");
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`${label} to clipboard`}
      className={`focus-ring inline-flex items-center gap-2 rounded-btn border border-neutral-border bg-surface-secondary px-3.5 py-2 text-xs font-semibold text-neutral-secondary transition-all hover:border-neutral-border-strong hover:bg-surface-elevated hover:text-ink active:scale-95 ${className}`}
    >
      {copied ? (
        <Check size={14} className="text-state-success shrink-0" />
      ) : (
        <Copy size={14} className="text-neutral-muted shrink-0" />
      )}
      <span>{copied ? "Copied" : label}</span>
    </button>
  );
}

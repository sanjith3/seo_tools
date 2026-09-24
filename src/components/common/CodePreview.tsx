"use client";

import { Code2, Download, Check } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import { useToast } from "@/components/common/Toast";
import { trackEvent } from "@/lib/analytics";

interface CodePreviewProps {
  code: string;
  htmlCode?: string;
  title?: string;
  minified?: boolean;
  onMinifiedChange?: (minified: boolean) => void;
  includeScriptTag?: boolean;
  onIncludeScriptTagChange?: (includeScriptTag: boolean) => void;
  downloadFilename?: string;
  downloadMimeType?: string;
  toolName?: string;
  note?: string;
  className?: string;
}

export function CodePreview({
  code,
  htmlCode,
  title = "Generated Output",
  minified,
  onMinifiedChange,
  includeScriptTag,
  onIncludeScriptTagChange,
  downloadFilename = "output.txt",
  downloadMimeType = "text/plain;charset=utf-8",
  toolName = "utility",
  note,
  className = ""
}: CodePreviewProps) {
  const { showToast } = useToast();

  const handleDownload = () => {
    try {
      const blob = new Blob([code], { type: downloadMimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = downloadFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast(`Downloaded ${downloadFilename}`);
      trackEvent("download_file", { tool_name: toolName });
    } catch {
      showToast("Download failed", "error");
    }
  };

  return (
    <section
      aria-label={title}
      className={`flex flex-col justify-between w-full min-w-0 max-w-full overflow-hidden rounded-[14px] border border-[#1B2A3F] bg-[#050B14] text-[#DCE5F1] shadow-card ${className}`}
    >
      <div className="w-full min-w-0 max-w-full overflow-hidden">
        {/* Header code toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1B2A3F] p-4 sm:px-5 sm:py-3.5 bg-[#0B1727]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="grid h-6 w-6 place-items-center rounded bg-[#5B7CFF]/15 text-[#5B7CFF] shrink-0">
              <Code2 size={14} />
            </span>
            <h2 className="text-xs sm:text-sm font-semibold text-[#F5F8FC] truncate">{title}</h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {htmlCode && (
              <CopyButton
                value={htmlCode}
                label="Copy HTML"
                toolName={toolName}
                className="btn-secondary !h-8 !px-2.5 !py-1 text-xs"
              />
            )}
            <CopyButton
              value={code}
              label="Copy"
              toolName={toolName}
              className="btn-secondary !h-8 !px-2.5 !py-1 text-xs"
            />
            <button
              type="button"
              onClick={handleDownload}
              className="btn-secondary !h-8 !px-2.5 !py-1 text-xs inline-flex items-center gap-1.5"
            >
              <Download size={13} />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Formatting Toggles toolbar */}
        {(onMinifiedChange || onIncludeScriptTagChange) && (
          <div className="flex flex-wrap items-center gap-4 px-5 py-2.5 border-b border-[#1B2A3F] bg-[#07111F] text-[11px] text-[#7F8DA3]">
            {onMinifiedChange && typeof minified === "boolean" && (
              <div className="inline-flex rounded-md p-0.5 bg-[#0D1A2B] border border-[#22344C]">
                <button
                  type="button"
                  onClick={() => onMinifiedChange(false)}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition ${
                    !minified ? "bg-[#5B7CFF] text-white shadow-sm" : "text-[#B5C1D1] hover:text-white"
                  }`}
                >
                  Formatted
                </button>
                <button
                  type="button"
                  onClick={() => onMinifiedChange(true)}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition ${
                    minified ? "bg-[#5B7CFF] text-white shadow-sm" : "text-[#B5C1D1] hover:text-white"
                  }`}
                >
                  Minified
                </button>
              </div>
            )}

            {onIncludeScriptTagChange && typeof includeScriptTag === "boolean" && (
              <label className="inline-flex items-center gap-1.5 cursor-pointer select-none text-[#B5C1D1]">
                <input
                  type="checkbox"
                  checked={includeScriptTag}
                  onChange={(e) => onIncludeScriptTagChange(e.target.checked)}
                  className="rounded border-[#304762] bg-[#091525] text-[#5B7CFF] focus:ring-0 focus:ring-offset-0 h-3.5 w-3.5"
                />
                <span>Include &lt;script&gt; wrapper tag</span>
              </label>
            )}
          </div>
        )}

        {/* Code Content Area */}
        <div className="p-4 sm:p-5 overflow-x-auto max-h-[500px] max-w-full min-w-0">
          <pre className="font-mono text-[13px] sm:text-[14px] text-[#DCE5F1] leading-[1.6] tab-size-2 max-w-full min-w-0">
            <code>{code}</code>
          </pre>
        </div>
      </div>

      {note && (
        <div className="border-t border-[#1B2A3F] bg-[#07111F] px-5 py-2.5 text-[11px] text-[#7F8DA3]">
          {note}
        </div>
      )}
    </section>
  );
}

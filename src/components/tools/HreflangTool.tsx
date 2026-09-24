"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Globe,
  Plus,
  Trash2,
  Copy,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Copy as CopyIcon,
  Check,
  FileCode,
  Info
} from "lucide-react";
import {
  HreflangItem,
  HREFLANG_PRESETS,
  generateHreflangHtml,
  generateHreflangXml,
  validateHreflang,
  getFullHreflangCode
} from "@/lib/generators/hreflang";
import { useToast } from "@/components/common/Toast";
import { trackEvent } from "@/lib/analytics";

const INITIAL_ITEMS: HreflangItem[] = [
  { id: "1", language: "x-default", url: "https://example.com/" },
  { id: "2", language: "en", region: "US", url: "https://example.com/en-us/" },
  { id: "3", language: "en", region: "GB", url: "https://example.com/en-gb/" },
  { id: "4", language: "es", region: "ES", url: "https://example.com/es-es/" },
  { id: "5", language: "fr", region: "FR", url: "https://example.com/fr-fr/" }
];

export function HreflangTool({
  onSummaryChange
}: {
  onSummaryChange?: (rowCount: number, isValid: boolean) => void;
}) {
  const [items, setItems] = useState<HreflangItem[]>(INITIAL_ITEMS);
  const [outputMode, setOutputMode] = useState<"html" | "xml">("html");
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const validation = useMemo(() => validateHreflang(items), [items]);

  const outputCode = useMemo(() => {
    return outputMode === "html" ? generateHreflangHtml(items) : generateHreflangXml(items);
  }, [items, outputMode]);

  useEffect(() => {
    if (onSummaryChange) {
      onSummaryChange(items.length, validation.isValid);
    }
  }, [items.length, validation.isValid, onSummaryChange]);

  const addRow = () => {
    const newItem: HreflangItem = {
      id: Math.random().toString(36).substring(2, 9),
      language: "en",
      region: "",
      url: "https://example.com/"
    };
    setItems((prev) => [...prev, newItem]);
    showToast("Added new language row");
  };

  const removeRow = (id: string) => {
    if (items.length <= 1) {
      showToast("Must have at least one row", "error");
      return;
    }
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const duplicateRow = (item: HreflangItem) => {
    const duplicate: HreflangItem = {
      ...item,
      id: Math.random().toString(36).substring(2, 9)
    };
    setItems((prev) => [...prev, duplicate]);
    showToast("Duplicated row");
  };

  const updateItem = (id: string, field: keyof HreflangItem, val: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: val } : item))
    );
  };

  const applyPreset = (id: string, presetLang: string, presetReg?: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, language: presetLang, region: presetReg || "" } : item
      )
    );
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(outputCode);
    setCopied(true);
    showToast(`Copied ${outputMode.toUpperCase()} hreflang markup!`);
    trackEvent("copy_result", { tool_name: "hreflang-generator", format: outputMode });
    setTimeout(() => setCopied(false), 1600);
  };

  const handleDownload = () => {
    try {
      const mime = outputMode === "html" ? "text/html;charset=utf-8" : "application/xml;charset=utf-8";
      const filename = outputMode === "html" ? "hreflang-tags.html" : "hreflang-sitemap.xml";
      const blob = new Blob([outputCode], { type: mime });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast(`Downloaded ${filename}`);
      trackEvent("download_file", { tool_name: "hreflang-generator", format: outputMode });
    } catch {
      showToast("Download failed", "error");
    }
  };

  const handleReset = () => {
    setItems(INITIAL_ITEMS);
    showToast("Reset to default configuration");
  };

  return (
    <div className="w-full min-w-0 max-w-full space-y-8">
      {/* Configuration Header Card */}
      <section
        aria-label="Hreflang Language Rows"
        className="w-full min-w-0 max-w-full rounded-2xl border border-neutral-border bg-surface p-5 shadow-sm sm:p-7 space-y-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-border pb-4">
          <div>
            <h2 className="text-base font-bold text-ink">Language &amp; Regional Alternate URLs</h2>
            <p className="text-xs text-neutral-secondary mt-0.5">
              Specify language (ISO 639-1) and optional country (ISO 3166-1) codes for each regional version.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="btn-secondary inline-flex items-center gap-1.5"
            >
              <RotateCcw size={12} /> Reset
            </button>
            <button
              type="button"
              onClick={addRow}
              className="btn-primary inline-flex items-center gap-1.5"
            >
              <Plus size={13} /> Add Language Row
            </button>
          </div>
        </div>

        {/* Rows table */}
        <div className="space-y-3">
          {items.map((item, idx) => {
            return (
              <div
                key={item.id}
                className="grid gap-3 sm:grid-cols-12 items-center bg-surface-secondary p-3.5 rounded-xl border border-neutral-border transition-colors hover:border-[#3A5272]"
              >
                <div className="sm:col-span-1 text-center font-bold text-xs text-neutral-muted">
                  #{idx + 1}
                </div>

                {/* Preset dropdown */}
                <div className="sm:col-span-3">
                  <select
                    value={item.language === "x-default" ? "x-default" : `${item.language}${item.region ? `-${item.region}` : ""}`}
                    onChange={(e) => {
                      const found = HREFLANG_PRESETS.find(
                        (p) => (p.language === "x-default" ? "x-default" : `${p.language}${p.region ? `-${p.region}` : ""}`) === e.target.value
                      );
                      if (found) {
                        applyPreset(item.id, found.language, found.region);
                      }
                    }}
                    className="field py-1 text-xs"
                  >
                    <option value="">Custom Code...</option>
                    {HREFLANG_PRESETS.map((p) => {
                      const val = p.language === "x-default" ? "x-default" : `${p.language}${p.region ? `-${p.region}` : ""}`;
                      return (
                        <option key={val} value={val}>
                          {p.label}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Language Code Input */}
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={item.language}
                    onChange={(e) => updateItem(item.id, "language", e.target.value)}
                    placeholder="Lang (e.g. en)"
                    className="field py-1 text-xs font-mono"
                  />
                </div>

                {/* Region Code Input */}
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={item.region || ""}
                    onChange={(e) => updateItem(item.id, "region", e.target.value)}
                    placeholder="Region (US)"
                    disabled={item.language.toLowerCase() === "x-default"}
                    className="field py-1 text-xs font-mono disabled:opacity-40"
                  />
                </div>

                {/* Alternate URL Input */}
                <div className="sm:col-span-3">
                  <input
                    type="url"
                    value={item.url}
                    onChange={(e) => updateItem(item.id, "url", e.target.value)}
                    placeholder="https://example.com/page/"
                    className="field py-1 text-xs font-mono"
                  />
                </div>

                {/* Action buttons */}
                <div className="sm:col-span-1 flex items-center justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => duplicateRow(item)}
                    title="Duplicate Row"
                    className="p-1 text-neutral-muted hover:text-ink transition-colors"
                  >
                    <CopyIcon size={13} />
                  </button>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRow(item.id)}
                      title="Remove Row"
                      className="p-1 text-neutral-muted hover:text-state-error transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Validation Panel */}
      <section
        aria-label="Hreflang Validation"
        className="rounded-2xl border border-[rgba(251,191,36,0.35)] bg-state-warning-bg p-5 shadow-sm space-y-2 text-xs"
      >
        <div className="flex items-center justify-between border-b border-[rgba(251,191,36,0.20)] pb-2">
          <span className="font-bold uppercase tracking-wider text-state-warning flex items-center gap-1.5">
            {validation.isValid ? (
              <CheckCircle2 size={14} className="text-state-success" />
            ) : (
              <AlertTriangle size={14} className="text-state-warning" />
            )}
            Hreflang Syntax &amp; Integrity Verification
          </span>
          <span className="text-[11px] text-neutral-secondary">ISO 639-1 &amp; ISO 3166-1 Alpha 2</span>
        </div>

        {validation.errors.map((err, i) => (
          <p key={i} className="text-state-error font-medium">• {err}</p>
        ))}

        {validation.warnings.map((warn, i) => (
          <p key={i} className="text-state-warning">• {warn}</p>
        ))}
      </section>

      {/* Output Format Tabs & Code Box */}
      <section
        aria-label="Generated Hreflang Output"
        className="w-full min-w-0 max-w-full rounded-2xl border border-[#1B2A3F] bg-[#050B14] p-5 shadow-sm text-white space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1B2A3F] pb-3">
          <div className="flex items-center gap-2">
            <Globe size={18} className="text-brand" />
            <div className="flex rounded-btn bg-surface-secondary border border-neutral-border p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setOutputMode("html")}
                className={`rounded-btn px-3 py-1 transition-colors ${
                  outputMode === "html" ? "bg-brand text-white" : "text-neutral-secondary hover:text-white"
                }`}
              >
                HTML &lt;link&gt; Tags
              </button>
              <button
                type="button"
                onClick={() => setOutputMode("xml")}
                className={`rounded-btn px-3 py-1 transition-colors ${
                  outputMode === "xml" ? "bg-brand text-white" : "text-neutral-secondary hover:text-white"
                }`}
              >
                XML Sitemap Snippet
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="btn-secondary inline-flex items-center gap-1.5 text-xs"
            >
              {copied ? <Check size={13} className="text-state-success" /> : <Copy size={13} />}
              <span>{copied ? "Copied!" : "Copy Markup"}</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="btn-primary inline-flex items-center gap-1.5 text-xs"
            >
              <Download size={13} />
              <span>Download {outputMode.toUpperCase()}</span>
            </button>
          </div>
        </div>

        <div className="w-full min-w-0 max-w-full rounded-xl bg-[#091525] border border-[#273A53] p-4 font-mono text-xs leading-relaxed text-[#DCE5F1] overflow-x-auto select-all">
          <pre>{outputCode}</pre>
        </div>

        <p className="text-[11px] text-neutral-muted">
          {outputMode === "html"
            ? "Paste these tags inside the <head> element on all localized variations of this page."
            : "Include this <url> block inside your sitemap.xml file under the standard xmlns:xhtml namespace."}
        </p>
      </section>
    </div>
  );
}

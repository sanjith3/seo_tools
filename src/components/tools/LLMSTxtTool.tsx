"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Bot,
  Plus,
  Trash2,
  Copy,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Info,
  Check,
  Sparkles
} from "lucide-react";
import {
  LLMSTxtData,
  generateLLMSTxt,
  validateLLMSTxt,
  LLMS_PRESET_TEMPLATES
} from "@/lib/generators/llms-txt";
import { useToast } from "@/components/common/Toast";
import { trackEvent } from "@/lib/analytics";

export function LLMSTxtTool({
  onSummaryChange
}: {
  onSummaryChange?: (sectionCount: number, linkCount: number, isValid: boolean) => void;
}) {
  const [data, setData] = useState<LLMSTxtData>(LLMS_PRESET_TEMPLATES.SaaS);
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const validation = useMemo(() => validateLLMSTxt(data), [data]);
  const markdownOutput = useMemo(() => generateLLMSTxt(data), [data]);

  const totalLinks = useMemo(() => {
    return data.sections.reduce((acc, s) => acc + s.resources.length, 0);
  }, [data.sections]);

  useEffect(() => {
    if (onSummaryChange) {
      onSummaryChange(data.sections.length, totalLinks, validation.isValid);
    }
  }, [data.sections.length, totalLinks, validation.isValid, onSummaryChange]);

  const updateRootField = (field: keyof LLMSTxtData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const addSection = (heading = "New Section") => {
    setData((prev) => ({
      ...prev,
      sections: [...prev.sections, { heading, resources: [{ title: "", url: "", description: "" }] }]
    }));
    showToast("Added new section");
  };

  const removeSection = (sIdx: number) => {
    setData((prev) => {
      const next = [...prev.sections];
      next.splice(sIdx, 1);
      return { ...prev, sections: next };
    });
  };

  const updateSectionHeading = (sIdx: number, heading: string) => {
    setData((prev) => {
      const next = [...prev.sections];
      if (next[sIdx]) next[sIdx] = { ...next[sIdx], heading };
      return { ...prev, sections: next };
    });
  };

  const addResource = (sIdx: number) => {
    setData((prev) => {
      const next = [...prev.sections];
      if (next[sIdx]) {
        next[sIdx] = {
          ...next[sIdx],
          resources: [...next[sIdx].resources, { title: "", url: "", description: "" }]
        };
      }
      return { ...prev, sections: next };
    });
  };

  const removeResource = (sIdx: number, rIdx: number) => {
    setData((prev) => {
      const next = [...prev.sections];
      if (next[sIdx]) {
        const nextRes = [...next[sIdx].resources];
        nextRes.splice(rIdx, 1);
        next[sIdx] = { ...next[sIdx], resources: nextRes };
      }
      return { ...prev, sections: next };
    });
  };

  const updateResource = (sIdx: number, rIdx: number, field: "title" | "url" | "description", val: string) => {
    setData((prev) => {
      const next = [...prev.sections];
      if (next[sIdx] && next[sIdx].resources[rIdx]) {
        const nextRes = [...next[sIdx].resources];
        nextRes[rIdx] = { ...nextRes[rIdx], [field]: val };
        next[sIdx] = { ...next[sIdx], resources: nextRes };
      }
      return { ...prev, sections: next };
    });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdownOutput);
    setCopied(true);
    showToast("Copied llms.txt Markdown to clipboard!");
    trackEvent("copy_result", { tool_name: "llms-txt-generator" });
    setTimeout(() => setCopied(false), 1600);
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([markdownOutput], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "llms.txt";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast("Downloaded llms.txt");
      trackEvent("download_llms_txt", { tool_name: "llms-txt-generator" });
    } catch {
      showToast("Download failed", "error");
    }
  };

  const applyPreset = (key: "SaaS" | "Documentation") => {
    setData(LLMS_PRESET_TEMPLATES[key]);
    showToast(`Loaded ${key} template`);
  };

  const handleReset = () => {
    setData({
      siteName: "",
      siteDescription: "",
      canonicalUrl: "",
      documentationUrl: "",
      sections: [{ heading: "Documentation", resources: [{ title: "", url: "", description: "" }] }]
    });
    showToast("Cleared form");
  };

  return (
    <div className="w-full min-w-0 max-w-full space-y-8">
      {/* Scope and Emerging Standard Notice */}
      <div className="rounded-2xl border border-[rgba(91,124,255,0.25)] bg-[rgba(91,124,255,0.10)] p-5 text-xs text-neutral-secondary flex items-start gap-3">
        <Info size={16} className="text-brand shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold uppercase tracking-wider text-[11px] text-brand">
            Emerging Convention Guidance Notice
          </p>
          <p className="leading-5 text-neutral-secondary">
            <strong>llms.txt is an emerging convention and is not required by major search engines.</strong> It is a proposed community file convention for organizing website documentation for AI search crawlers. It is <strong>not</strong> an official web standard, is <strong>not required by Google</strong>, and does <strong>not guarantee</strong> AI citations or inclusion in Generative Engine responses.
          </p>
        </div>
      </div>

      {/* Basic Website Info Form */}
      <section
        aria-label="Website Information"
        className="w-full min-w-0 max-w-full rounded-2xl border border-neutral-border bg-surface p-5 shadow-sm sm:p-7 space-y-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-border pb-4">
          <div>
            <h2 className="text-base font-bold text-ink">1. Website Header & Identity</h2>
            <p className="text-xs text-neutral-muted mt-0.5">Top-level site metadata rendered at the start of your llms.txt file.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => applyPreset("SaaS")}
              className="btn-secondary inline-flex items-center text-xs py-1.5 px-3"
            >
              Load SaaS Preset
            </button>
            <button
              type="button"
              onClick={() => applyPreset("Documentation")}
              className="btn-secondary inline-flex items-center text-xs py-1.5 px-3"
            >
              Load Docs Preset
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="field-label"><span>Website Name <span className="text-brand">*</span></span></label>
            <input
              type="text"
              value={data.siteName}
              onChange={(e) => updateRootField("siteName", e.target.value)}
              placeholder="e.g. Zenvuk"
              className="field"
            />
          </div>
          <div>
            <label className="field-label"><span>Canonical Website URL</span></label>
            <input
              type="url"
              value={data.canonicalUrl}
              onChange={(e) => updateRootField("canonicalUrl", e.target.value)}
              placeholder="https://zenvuk.com"
              className="field font-mono text-xs"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="field-label"><span>Documentation URL (Optional)</span></label>
            <input
              type="url"
              value={data.documentationUrl || ""}
              onChange={(e) => updateRootField("documentationUrl", e.target.value)}
              placeholder="https://zenvuk.com/methodology/"
              className="field font-mono text-xs"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="field-label"><span>Site Summary (Blockquote)</span></label>
            <textarea
              rows={2}
              value={data.siteDescription}
              onChange={(e) => updateRootField("siteDescription", e.target.value)}
              placeholder="Concise overview of what your website provides and primary resources..."
              className="field-textarea text-xs"
            />
          </div>
        </div>
      </section>

      {/* Sections and Resource Links Builder */}
      <section
        aria-label="Sections and Resources"
        className="w-full min-w-0 max-w-full rounded-2xl border border-neutral-border bg-surface p-5 shadow-sm sm:p-7 space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-border pb-4">
          <div>
            <h2 className="text-base font-bold text-ink">2. Documentation & Resource Sections</h2>
            <p className="text-xs text-neutral-muted mt-0.5">Group related documentation, core tools, and API guides under H2 markdown headings.</p>
          </div>
          <button
            type="button"
            onClick={() => addSection()}
            className="btn-primary inline-flex items-center gap-1.5 py-1.5 px-3 text-xs"
          >
            <Plus size={13} /> Add Section
          </button>
        </div>

        {data.sections.map((section, sIdx) => (
          <div key={sIdx} className="rounded-xl border border-neutral-border bg-surface-secondary p-4 space-y-4">
            <div className="flex items-center justify-between gap-3 border-b border-neutral-border pb-3">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-xs font-bold text-brand font-mono">##</span>
                <input
                  type="text"
                  value={section.heading}
                  onChange={(e) => updateSectionHeading(sIdx, e.target.value)}
                  placeholder="Section Heading (e.g. Core Tools, Guides)"
                  className="field py-1 text-xs font-bold"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => addResource(sIdx)}
                  className="btn-secondary inline-flex items-center gap-1 text-xs py-1 px-2.5"
                >
                  <Plus size={12} /> Add Link
                </button>
                {data.sections.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSection(sIdx)}
                    className="p-1.5 text-neutral-muted hover:text-state-error rounded-lg transition"
                    aria-label="Delete section"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Links in this section */}
            <div className="space-y-3">
              {section.resources.map((res, rIdx) => (
                <div key={rIdx} className="grid gap-2 sm:grid-cols-12 items-center bg-canvas p-3 rounded-lg border border-neutral-border">
                  <div className="sm:col-span-4">
                    <input
                      type="text"
                      value={res.title}
                      onChange={(e) => updateResource(sIdx, rIdx, "title", e.target.value)}
                      placeholder="Title: e.g. Quickstart"
                      className="field py-1 text-xs"
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <input
                      type="url"
                      value={res.url}
                      onChange={(e) => updateResource(sIdx, rIdx, "url", e.target.value)}
                      placeholder="https://example.com/guide"
                      className="field py-1 text-xs font-mono"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <input
                      type="text"
                      value={res.description || ""}
                      onChange={(e) => updateResource(sIdx, rIdx, "description", e.target.value)}
                      placeholder="Short description (optional)"
                      className="field py-1 text-xs"
                    />
                  </div>
                  <div className="sm:col-span-1 flex justify-end">
                    {section.resources.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeResource(sIdx, rIdx)}
                        className="p-1 text-neutral-muted hover:text-state-error transition"
                        aria-label="Delete resource link"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Validation Feedback */}
      {(!validation.isValid || validation.warnings.length > 0) && (
        <section
          aria-label="Validation Status"
          className="rounded-2xl border border-neutral-border bg-surface p-5 shadow-sm space-y-2 text-xs"
        >
          <h3 className="text-xs font-bold uppercase tracking-wider text-ink flex items-center gap-1.5">
            {validation.isValid ? (
              <CheckCircle2 size={14} className="text-state-success" />
            ) : (
              <AlertTriangle size={14} className="text-state-warning" />
            )}
            Syntax & Formatting Check
          </h3>
          {validation.errors.map((err, i) => (
            <p key={i} className="text-state-error font-medium">• {err}</p>
          ))}
          {validation.warnings.map((warn, i) => (
            <p key={i} className="text-state-warning">• {warn}</p>
          ))}
        </section>
      )}

      {/* Live Preview & Action Toolbar */}
      <section
        aria-label="Generated llms.txt Markdown"
        className="w-full min-w-0 max-w-full rounded-2xl border border-[#1B2A3F] bg-[#050B14] p-5 text-ink space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-border/50 pb-3">
          <div className="flex items-center gap-2">
            <Bot size={18} className="text-brand" />
            <h3 className="text-sm font-bold text-ink">llms.txt Output Preview</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="btn-secondary py-1.5 px-3 text-xs inline-flex items-center gap-1.5"
            >
              {copied ? <Check size={13} className="text-state-success" /> : <Copy size={13} />}
              <span>{copied ? "Copied!" : "Copy llms.txt"}</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="btn-primary py-1.5 px-3 text-xs inline-flex items-center gap-1.5"
            >
              <Download size={13} />
              <span>Download llms.txt</span>
            </button>
          </div>
        </div>

        <div className="w-full min-w-0 max-w-full rounded-xl bg-canvas-deep p-4 font-mono text-xs leading-relaxed text-[#DCE5F1] overflow-x-auto select-all">
          <pre>{markdownOutput}</pre>
        </div>

        <p className="text-[11px] text-neutral-muted">
          Upload this file to the root of your domain at <code className="text-brand-cyan">https://yourdomain.com/llms.txt</code>.
        </p>
      </section>
    </div>
  );
}

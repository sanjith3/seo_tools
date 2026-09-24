"use client";

import { useState } from "react";
import {
  SitemapConfig,
  generateXmlSitemap,
  validateXmlSitemap,
  parseUrlsFromText,
} from "@/lib/generators/xml-sitemap";
import { Copy, Check, Download, Network, RefreshCw, AlertTriangle, CheckCircle2, FileCode } from "lucide-react";

const SAMPLE_URLS = `https://zenvuk.com/
https://zenvuk.com/tools/
https://zenvuk.com/about/
https://zenvuk.com/methodology/
https://zenvuk.com/schema-markup-generator/
https://zenvuk.com/llms-txt-generator/
https://zenvuk.com/hreflang-generator/
https://zenvuk.com/robots-txt-generator/
https://zenvuk.com/serp-preview-tool/
https://zenvuk.com/open-graph-generator/
https://zenvuk.com/canonical-tag-generator/
https://zenvuk.com/keyword-density-checker/
https://zenvuk.com/url-slug-generator/
https://zenvuk.com/xml-sitemap-generator/`;

export function XMLSitemapTool() {
  const [rawText, setRawText] = useState(SAMPLE_URLS);
  const [includeLastmod, setIncludeLastmod] = useState(true);
  const [includeChangefreq, setIncludeChangefreq] = useState(true);
  const [includePriority, setIncludePriority] = useState(true);
  const [activeTab, setActiveTab] = useState<"generator" | "validator">("generator");
  const [xmlToValidate, setXmlToValidate] = useState("");
  const [copied, setCopied] = useState(false);

  const parsedUrls = parseUrlsFromText(rawText);

  const config: SitemapConfig = {
    urls: parsedUrls,
    includeLastmod,
    includeChangefreq,
    includePriority,
  };

  const xmlOutput = generateXmlSitemap(config);
  const validationResult = validateXmlSitemap(activeTab === "validator" && xmlToValidate ? xmlToValidate : xmlOutput);

  const handleCopy = () => {
    navigator.clipboard.writeText(xmlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([xmlOutput], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap.xml";
    a.click();
    URL.revokeObjectURL(url);
  };

  const warningCount = validationResult.issues.filter(i => i.type === "warning").length;
  const errorCount = validationResult.issues.filter(i => i.type === "error").length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Configuration & Inputs (Left Column) */}
      <div className="lg:col-span-6 bg-surface p-6 rounded-2xl border border-neutral-border space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-border">
          <div className="inline-flex rounded-lg bg-canvas p-1 border border-neutral-border">
            <button
              onClick={() => setActiveTab("generator")}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                activeTab === "generator"
                  ? "bg-brand text-white shadow-sm"
                  : "text-neutral-muted hover:text-ink"
              }`}
            >
              Sitemap Generator
            </button>
            <button
              onClick={() => {
                setActiveTab("validator");
                if (!xmlToValidate) setXmlToValidate(xmlOutput);
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                activeTab === "validator"
                  ? "bg-brand text-white shadow-sm"
                  : "text-neutral-muted hover:text-ink"
              }`}
            >
              XML Linter / Validator
            </button>
          </div>
          <button
            onClick={() => setRawText(SAMPLE_URLS)}
            className="btn-secondary inline-flex items-center gap-1.5 text-xs py-1.5 px-3"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        {activeTab === "generator" ? (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-neutral-secondary uppercase tracking-wider">
                  List of Absolute URLs (One Per Line)
                </label>
                <span className="text-xs font-mono text-neutral-muted">
                  {parsedUrls.length} URLs detected
                </span>
              </div>
              <textarea
                rows={10}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                className="field-textarea w-full text-xs font-mono py-2.5"
                placeholder="https://example.com/&#10;https://example.com/about&#10;https://example.com/products"
              />
            </div>

            <div className="pt-3 border-t border-neutral-border space-y-3">
              <h3 className="text-xs font-bold text-ink uppercase tracking-wider">
                Include XML Directives
              </h3>
              <div className="grid grid-cols-3 gap-2 text-xs text-neutral-secondary">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeLastmod}
                    onChange={(e) => setIncludeLastmod(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-strong bg-canvas text-brand focus:ring-brand focus:ring-offset-canvas"
                  />
                  <span>&lt;lastmod&gt;</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeChangefreq}
                    onChange={(e) => setIncludeChangefreq(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-strong bg-canvas text-brand focus:ring-brand focus:ring-offset-canvas"
                  />
                  <span>&lt;changefreq&gt;</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includePriority}
                    onChange={(e) => setIncludePriority(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-strong bg-canvas text-brand focus:ring-brand focus:ring-offset-canvas"
                  />
                  <span>&lt;priority&gt;</span>
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-secondary uppercase tracking-wider mb-2">
                Paste Raw XML Sitemap to Validate
              </label>
              <textarea
                rows={12}
                value={xmlToValidate}
                onChange={(e) => setXmlToValidate(e.target.value)}
                className="field-textarea w-full text-xs font-mono py-2.5"
                placeholder="Paste XML sitemap content here..."
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleCopy}
            className="btn-secondary flex-1 inline-flex items-center justify-center gap-2 py-2.5 text-xs font-semibold"
          >
            {copied ? <Check className="w-4 h-4 text-state-success" /> : <Copy className="w-4 h-4 text-neutral-muted" />}
            <span>{copied ? "Copied XML!" : "Copy XML Sitemap"}</span>
          </button>
          <button
            onClick={handleDownload}
            className="btn-primary inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold"
          >
            <Download className="w-4 h-4" />
            <span>Download sitemap.xml</span>
          </button>
        </div>
      </div>

      {/* Output & Audit (Right Column) */}
      <div className="lg:col-span-6 space-y-6">
        {/* Real-time Protocol Validation Card */}
        <div className="bg-surface p-5 rounded-2xl border border-neutral-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-2">
              <Network className="w-4 h-4 text-brand" />
              Sitemaps.org Protocol Compliance
            </h3>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                validationResult.isValid
                  ? "bg-[rgba(45,212,167,0.10)] text-[#5EE0BA] border-[rgba(45,212,167,0.25)]"
                  : "bg-[rgba(251,113,133,0.10)] text-[#FDA4AF] border-[rgba(251,113,133,0.25)]"
              }`}
            >
              {validationResult.isValid ? "100% Compliant" : "Validation Errors"}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            <div className="p-3 bg-surface-secondary rounded-xl border border-neutral-border text-xs">
              <span className="text-neutral-muted block text-[11px]">Total URLs</span>
              <span className="text-sm font-bold text-ink font-mono mt-0.5 block">
                {validationResult.urlCount}
              </span>
            </div>
            <div className="p-3 bg-surface-secondary rounded-xl border border-neutral-border text-xs">
              <span className="text-neutral-muted block text-[11px]">Payload Size</span>
              <span className="text-sm font-bold text-ink font-mono mt-0.5 block">
                {(validationResult.fileSizeBytes / 1024).toFixed(1)} KB
              </span>
            </div>
            <div className="p-3 bg-surface-secondary rounded-xl border border-neutral-border text-xs">
              <span className="text-neutral-muted block text-[11px]">Warnings</span>
              <span className={`text-sm font-bold font-mono mt-0.5 block ${warningCount > 0 ? "text-state-warning" : "text-neutral-secondary"}`}>
                {warningCount}
              </span>
            </div>
            <div className="p-3 bg-surface-secondary rounded-xl border border-neutral-border text-xs">
              <span className="text-neutral-muted block text-[11px]">Errors</span>
              <span className={`text-sm font-bold font-mono mt-0.5 block ${errorCount > 0 ? "text-state-error" : "text-neutral-secondary"}`}>
                {errorCount}
              </span>
            </div>
          </div>

          {validationResult.issues.length > 0 && (
            <div className="space-y-1.5 pt-2">
              {validationResult.issues.map((issue, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-lg text-xs flex items-start gap-2 border ${
                    issue.type === "error"
                      ? "bg-[rgba(251,113,133,0.10)] text-[#FDA4AF] border-[rgba(251,113,133,0.25)]"
                      : "bg-[rgba(251,191,36,0.10)] text-[#FCD34D] border-[rgba(251,191,36,0.25)]"
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{issue.message}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* XML Preview Window */}
        <div className="bg-[#050B14] rounded-2xl p-5 border border-[#1B2A3F] space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-border/50">
            <span className="text-xs font-mono font-medium text-neutral-secondary">
              Live XML Code Preview
            </span>
            <span className="text-[11px] font-mono text-state-success">
              UTF-8 XML 0.9
            </span>
          </div>
          <pre className="text-xs font-mono overflow-x-auto text-[#86EFAC] whitespace-pre p-3 bg-canvas-deep rounded-lg max-h-72 leading-relaxed min-w-0 max-w-full">
            {xmlOutput}
          </pre>
        </div>
      </div>
    </div>
  );
}

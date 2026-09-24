"use client";

import { useState } from "react";
import {
  CanonicalConfig,
  analyzeCanonical,
} from "@/lib/generators/canonical";
import { Copy, Check, Link2, RefreshCw, AlertTriangle, Info, CheckCircle2 } from "lucide-react";

export function CanonicalTool() {
  const [config, setConfig] = useState<CanonicalConfig>({
    sourceUrl: "https://zenvuk.com/tools/?utm_source=twitter&utm_medium=social#features",
    preferredCanonicalUrl: "https://zenvuk.com/tools/",
    cleanParameters: true,
    enforceHttps: true,
    enforceTrailingSlash: "add",
    enforceLowercase: true,
    stripFragments: true,
  });

  const [copiedTag, setCopiedTag] = useState(false);
  const [copiedHeader, setCopiedHeader] = useState(false);

  const analysis = analyzeCanonical(config);

  const handleCopyTag = () => {
    navigator.clipboard.writeText(analysis.generatedTag);
    setCopiedTag(true);
    setTimeout(() => setCopiedTag(false), 2000);
  };

  const handleCopyHeader = () => {
    navigator.clipboard.writeText(analysis.httpHeader);
    setCopiedHeader(true);
    setTimeout(() => setCopiedHeader(false), 2000);
  };

  const handleReset = () => {
    setConfig({
      sourceUrl: "https://zenvuk.com/tools/?utm_source=twitter&utm_medium=social#features",
      preferredCanonicalUrl: "https://zenvuk.com/tools/",
      cleanParameters: true,
      enforceHttps: true,
      enforceTrailingSlash: "add",
      enforceLowercase: true,
      stripFragments: true,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Configuration Column (Left) */}
      <div className="lg:col-span-6 bg-surface p-6 rounded-2xl border border-neutral-border shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-border">
          <h2 className="text-lg font-bold text-ink">URL Canonicalization Settings</h2>
          <button
            onClick={handleReset}
            className="btn-secondary inline-flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        {/* URLs input */}
        <div className="space-y-4">
          <div>
            <label className="field-label">
              Current / Source URL (Where Tag Is Placed)
            </label>
            <input
              type="text"
              value={config.sourceUrl}
              onChange={(e) => setConfig({ ...config, sourceUrl: e.target.value })}
              className="field font-mono text-xs"
              placeholder="e.g. https://example.com/shoes?color=blue"
            />
          </div>

          <div>
            <label className="field-label">
              Preferred Canonical URL (Master Indexable URL)
            </label>
            <input
              type="text"
              value={config.preferredCanonicalUrl}
              onChange={(e) => setConfig({ ...config, preferredCanonicalUrl: e.target.value })}
              className="field font-mono text-xs"
              placeholder="e.g. https://example.com/shoes/"
            />
          </div>
        </div>

        {/* Normalization Toggles */}
        <div className="pt-4 border-t border-neutral-border space-y-3">
          <h3 className="text-xs font-bold text-ink uppercase tracking-wider">
            Normalization Rules
          </h3>
          <div className="space-y-2.5 text-xs text-neutral-secondary">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={config.cleanParameters}
                onChange={(e) => setConfig({ ...config, cleanParameters: e.target.checked })}
                className="w-4 h-4 text-brand rounded border-neutral-border-strong bg-surface-secondary focus:ring-brand"
              />
              <span>Strip tracking parameters (<code className="font-mono text-[#7DD3FC]">utm_*</code>, <code className="font-mono text-[#7DD3FC]">gclid</code>, <code className="font-mono text-[#7DD3FC]">fbclid</code>)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={config.enforceHttps}
                onChange={(e) => setConfig({ ...config, enforceHttps: e.target.checked })}
                className="w-4 h-4 text-brand rounded border-neutral-border-strong bg-surface-secondary focus:ring-brand"
              />
              <span>Enforce secure HTTPS protocol</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={config.stripFragments}
                onChange={(e) => setConfig({ ...config, stripFragments: e.target.checked })}
                className="w-4 h-4 text-brand rounded border-neutral-border-strong bg-surface-secondary focus:ring-brand"
              />
              <span>Strip URL hash fragments (<code className="font-mono text-[#7DD3FC]">#section</code>)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={config.enforceLowercase}
                onChange={(e) => setConfig({ ...config, enforceLowercase: e.target.checked })}
                className="w-4 h-4 text-brand rounded border-neutral-border-strong bg-surface-secondary focus:ring-brand"
              />
              <span>Enforce lowercase URL paths</span>
            </label>
          </div>

          <div className="pt-2">
            <label className="field-label">
              Trailing Slash Standardization
            </label>
            <select
              value={config.enforceTrailingSlash}
              onChange={(e) =>
                setConfig({ ...config, enforceTrailingSlash: e.target.value as CanonicalConfig["enforceTrailingSlash"] })
              }
              className="field text-xs"
            >
              <option value="add">Always Add Trailing Slash (e.g. /category/)</option>
              <option value="remove">Always Remove Trailing Slash (e.g. /category)</option>
              <option value="preserve">Preserve As Entered</option>
            </select>
          </div>
        </div>
      </div>

      {/* Output & Audit Column (Right) */}
      <div className="lg:col-span-6 space-y-6">
        {/* HTML Tag Output Card */}
        <div className="bg-[#050B14] border border-[#1B2A3F] rounded-2xl p-5 text-[#DCE5F1] shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1B2A3F]">
            <span className="text-xs font-mono font-medium text-neutral-muted">
              HTML &lt;head&gt; Canonical Tag
            </span>
            <button
              onClick={handleCopyTag}
              className="btn-secondary inline-flex items-center gap-1.5 text-xs"
            >
              {copiedTag ? <Check className="w-3.5 h-3.5 text-state-success" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedTag ? "Copied Tag!" : "Copy Tag"}</span>
            </button>
          </div>
          <pre className="text-xs font-mono overflow-x-auto text-[#7DD3FC] whitespace-pre p-3 bg-[#091525] border border-[#273A53] rounded-lg">
            {analysis.generatedTag}
          </pre>
        </div>

        {/* HTTP Header Output Card (for PDFs / non-HTML) */}
        <div className="bg-[#050B14] border border-[#1B2A3F] rounded-2xl p-5 text-[#DCE5F1] shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1B2A3F]">
            <span className="text-xs font-mono font-medium text-neutral-muted">
              HTTP Response Header (PDFs &amp; APIs)
            </span>
            <button
              onClick={handleCopyHeader}
              className="btn-secondary inline-flex items-center gap-1.5 text-xs"
            >
              {copiedHeader ? <Check className="w-3.5 h-3.5 text-state-success" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedHeader ? "Copied Header!" : "Copy Header"}</span>
            </button>
          </div>
          <pre className="text-xs font-mono overflow-x-auto text-[#38BDF8] whitespace-pre p-3 bg-[#091525] border border-[#273A53] rounded-lg">
            {analysis.httpHeader}
          </pre>
        </div>

        {/* Audit & Diagnostic Findings */}
        <div className="bg-surface p-5 rounded-2xl border border-neutral-border shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-2">
            <Link2 className="w-4 h-4 text-brand" />
            Canonical Audit Findings
          </h3>
          <div className="space-y-2">
            {analysis.issues.map((issue, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg text-xs flex items-start gap-2 ${
                  issue.type === "error"
                    ? "bg-state-error-bg text-state-error border border-[rgba(251,113,133,0.25)]"
                    : issue.type === "warning"
                    ? "bg-state-warning-bg text-state-warning border border-[rgba(251,191,36,0.25)]"
                    : "bg-[rgba(91,124,255,0.10)] text-[#7893FF] border border-[rgba(91,124,255,0.25)]"
                }`}
              >
                {issue.type === "error" ? (
                  <AlertTriangle className="w-4 h-4 text-state-error flex-shrink-0 mt-0.5" />
                ) : issue.type === "warning" ? (
                  <AlertTriangle className="w-4 h-4 text-state-warning flex-shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                )}
                <span className="leading-relaxed">{issue.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

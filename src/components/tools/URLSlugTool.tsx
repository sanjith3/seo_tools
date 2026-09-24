"use client";

import { useState } from "react";
import { generateSlug, SlugOptions } from "@/lib/generators/url-slug";
import { Copy, Check, RefreshCw, Sparkles, ExternalLink } from "lucide-react";

export function URLSlugTool() {
  const [input, setInput] = useState("15 Best Free SEO Tools & Utilities for 2026!");
  const [options, setOptions] = useState<SlugOptions>({
    separator: "-",
    removeStopWords: true,
    stripNumbers: false,
    maxLength: 60,
    preserveCase: false,
    prefix: "",
    suffix: "",
  });

  const [copiedMain, setCopiedMain] = useState(false);
  const [copiedAlt, setCopiedAlt] = useState<string | null>(null);

  const analysis = generateSlug(input, options);

  // Compute alternative variations
  const alternatives = [
    {
      label: "Compact & Minimal",
      slug: generateSlug(input, { ...options, removeStopWords: true, maxLength: 35 }).slug,
      desc: "Shortened for maximum punch and low character count",
    },
    {
      label: "Literal / Unaltered",
      slug: generateSlug(input, { ...options, removeStopWords: false, stripNumbers: false }).slug,
      desc: "Preserves every stop word and number exactly as written",
    },
    {
      label: "Underscore Format",
      slug: generateSlug(input, { ...options, separator: "_" }).slug,
      desc: "Python / database variable and legacy system friendly",
    },
  ];

  const handleCopyMain = () => {
    navigator.clipboard.writeText(analysis.slug);
    setCopiedMain(true);
    setTimeout(() => setCopiedMain(false), 2000);
  };

  const handleCopyAlt = (slug: string) => {
    navigator.clipboard.writeText(slug);
    setCopiedAlt(slug);
    setTimeout(() => setCopiedAlt(null), 2000);
  };

  const handleReset = () => {
    setInput("15 Best Free SEO Tools & Utilities for 2026!");
    setOptions({
      separator: "-",
      removeStopWords: true,
      stripNumbers: false,
      maxLength: 60,
      preserveCase: false,
      prefix: "",
      suffix: "",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Editor & Parameters Column (Left) */}
      <div className="lg:col-span-6 bg-surface p-6 rounded-2xl border border-neutral-border space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-border">
          <h2 className="text-base font-bold text-ink">Enter Title or Text</h2>
          <button
            onClick={handleReset}
            className="btn-secondary inline-flex items-center gap-1.5 text-xs py-1.5 px-3"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
        </div>

        {/* Input Text Field */}
        <div>
          <label className="block text-xs font-semibold text-neutral-secondary uppercase tracking-wider mb-2">
            Page Title, Headline, or Article Topic
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="field text-sm w-full"
            placeholder="e.g. 10 Best Running Shoes for Marathon Beginners"
          />
        </div>

        {/* Compact Options Row */}
        <div className="pt-4 border-t border-neutral-border space-y-4">
          <h3 className="text-xs font-bold text-ink uppercase tracking-wider">
            Slug Transformation Options
          </h3>

          {/* Compact Checkbox Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-secondary">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={options.removeStopWords}
                onChange={(e) => setOptions({ ...options, removeStopWords: e.target.checked })}
                className="w-4 h-4 rounded border-neutral-strong bg-canvas text-brand focus:ring-brand focus:ring-offset-canvas"
              />
              <span>Remove Stop Words</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={options.stripNumbers}
                onChange={(e) => setOptions({ ...options, stripNumbers: e.target.checked })}
                className="w-4 h-4 rounded border-neutral-strong bg-canvas text-brand focus:ring-brand focus:ring-offset-canvas"
              />
              <span>Strip Numbers</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={options.preserveCase}
                onChange={(e) => setOptions({ ...options, preserveCase: e.target.checked })}
                className="w-4 h-4 rounded border-neutral-strong bg-canvas text-brand focus:ring-brand focus:ring-offset-canvas"
              />
              <span>Preserve Case</span>
            </label>
          </div>

          {/* Separator and Max Length Row */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-neutral-secondary mb-1.5">
                Word Separator
              </label>
              <select
                value={options.separator}
                onChange={(e) => setOptions({ ...options, separator: e.target.value as "-" | "_" })}
                className="field text-xs w-full py-2"
              >
                <option value="-">Hyphen (-) (Google Standard)</option>
                <option value="_">Underscore (_)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-secondary mb-1.5">
                Max Length (Chars)
              </label>
              <input
                type="number"
                min="20"
                max="120"
                value={options.maxLength || 60}
                onChange={(e) => setOptions({ ...options, maxLength: parseInt(e.target.value, 10) || 60 })}
                className="field text-xs w-full py-2 font-mono"
              />
            </div>
          </div>

          {/* Optional Prefix / Suffix Row */}
          <div className="grid grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block text-xs text-neutral-muted mb-1.5">Prefix (Optional)</label>
              <input
                type="text"
                value={options.prefix || ""}
                onChange={(e) => setOptions({ ...options, prefix: e.target.value })}
                className="field text-xs w-full py-2 font-mono"
                placeholder="e.g. blog"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-muted mb-1.5">Suffix (Optional)</label>
              <input
                type="text"
                value={options.suffix || ""}
                onChange={(e) => setOptions({ ...options, suffix: e.target.value })}
                className="field text-xs w-full py-2 font-mono"
                placeholder="e.g. guide"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Output & URL Preview Column (Right) */}
      <div className="lg:col-span-6 space-y-6">
        {/* Generated Slug Banner */}
        <div className="bg-[#050B14] rounded-2xl p-6 border border-[#1B2A3F] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-border/50">
            <span className="text-xs font-mono font-semibold text-brand uppercase tracking-wider">
              Primary Generated Slug
            </span>
            <button
              onClick={handleCopyMain}
              className="btn-primary py-1.5 px-3.5 text-xs inline-flex items-center gap-1.5"
            >
              {copiedMain ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedMain ? "Copied!" : "Copy Slug"}</span>
            </button>
          </div>

          <div className="font-mono text-lg sm:text-xl text-brand-cyan break-all select-all py-2 font-bold tracking-tight">
            {analysis.slug ? `${analysis.slug}` : "enter-title-above"}
          </div>

          {/* Metrics Footer */}
          <div className="flex items-center gap-4 text-xs text-neutral-secondary font-mono pt-3 border-t border-neutral-border/50">
            <span>Length: <strong className="text-ink">{analysis.charCount}</strong> chars</span>
            <span className="text-neutral-muted">•</span>
            <span>Words: <strong className="text-ink">{analysis.wordCount}</strong></span>
            <span className="text-neutral-muted">•</span>
            <span>Separator: <strong className="text-ink">{options.separator}</strong></span>
          </div>
        </div>

        {/* Live URL Simulation */}
        <div className="bg-surface p-5 rounded-2xl border border-neutral-border space-y-3">
          <h3 className="text-xs font-bold text-ink uppercase tracking-wider">
            Canonical URL Preview
          </h3>
          <div className="p-3 bg-canvas rounded-lg border border-neutral-border font-mono text-xs text-brand-cyan break-all">
            https://zenvuk.com/{analysis.slug ? `${analysis.slug}/` : ""}
          </div>
        </div>

        {/* Alternative Slugs */}
        <div className="bg-surface p-5 rounded-2xl border border-neutral-border space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand" />
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">
              Alternative Slugs
            </h3>
          </div>

          <div className="space-y-2.5">
            {alternatives.map((alt, idx) => (
              <div
                key={idx}
                className="bg-surface-secondary border border-neutral-border rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:border-neutral-strong transition"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-semibold text-ink">{alt.label}</span>
                    <span className="text-[10px] text-neutral-muted">({alt.slug.length} chars)</span>
                  </div>
                  <div className="font-mono text-xs text-brand-cyan break-all">
                    {alt.slug || "n/a"}
                  </div>
                </div>
                <button
                  onClick={() => handleCopyAlt(alt.slug)}
                  className="btn-secondary py-1 px-2.5 text-xs inline-flex items-center gap-1 self-start sm:self-center flex-shrink-0"
                >
                  {copiedAlt === alt.slug ? (
                    <>
                      <Check className="w-3 h-3 text-state-success" />
                      <span className="text-state-success">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-neutral-muted" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Stop Word Removals & Issues */}
        {analysis.removedStopWords.length > 0 && (
          <div className="bg-surface p-4 rounded-xl border border-neutral-border text-xs">
            <span className="font-semibold text-ink block mb-2">
              Filtered Stop Words ({analysis.removedStopWords.length}):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {analysis.removedStopWords.map((word, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-surface-secondary border border-neutral-border text-neutral-secondary font-mono text-[11px]"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

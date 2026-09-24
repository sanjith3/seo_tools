"use client";

import { useState } from "react";
import { SERPConfig, analyzeSERP } from "@/lib/generators/serp-preview";
import { Monitor, Smartphone, Copy, Check, Star, RefreshCw } from "lucide-react";

export function SERPPreviewTool() {
  const [config, setConfig] = useState<SERPConfig>({
    title: "15 Best Free SEO Tools (100% Client-Side & Private) | Zenvuk",
    url: "https://zenvuk.com/tools/",
    description:
      "Explore Zenvuk's suite of free developer and SEO tools. Build Schema markup, validate robots.txt, preview SERP snippets, generate hreflang tags, and more.",
    brandName: "Zenvuk",
    faviconUrl: "https://zenvuk.com/favicon.ico",
    date: "Sep 23, 2026",
    rating: 4.9,
    reviewCount: 128,
  });

  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [previewTheme, setPreviewTheme] = useState<"dark" | "light">("dark");
  const [showRichSnippet, setShowRichSnippet] = useState(true);
  const [copied, setCopied] = useState(false);

  const analysis = analyzeSERP(config, device);

  const handleCopyHtml = () => {
    const metaTags = `<!-- Recommended Meta Tags -->
<title>${config.title}</title>
<meta name="description" content="${config.description}">
<link rel="canonical" href="${config.url}">`;
    navigator.clipboard.writeText(metaTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setConfig({
      title: "15 Best Free SEO Tools (100% Client-Side & Private) | Zenvuk",
      url: "https://zenvuk.com/tools/",
      description:
        "Explore Zenvuk's suite of free developer and SEO tools. Build Schema markup, validate robots.txt, preview SERP snippets, generate hreflang tags, and more.",
      brandName: "Zenvuk",
      faviconUrl: "https://zenvuk.com/favicon.ico",
      date: "Sep 23, 2026",
      rating: 4.9,
      reviewCount: 128,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Configuration Form (Left Column) */}
      <div className="lg:col-span-6 bg-surface p-6 rounded-2xl border border-neutral-border shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-border">
          <h2 className="text-lg font-bold text-ink">SERP Parameters</h2>
          <button
            onClick={handleReset}
            className="btn-secondary inline-flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
        </div>

        {/* Title Input */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="field-label !mb-0">
              Page Title (&lt;title&gt;)
            </label>
            <span
              className={`text-xs font-mono font-medium ${
                analysis.title.isTruncated ? "text-state-warning font-bold" : "text-neutral-muted"
              }`}
            >
              {analysis.title.pixelWidth}px / {analysis.title.maxPixels}px ({config.title.length} chars)
            </span>
          </div>
          <input
            type="text"
            value={config.title}
            onChange={(e) => setConfig({ ...config, title: e.target.value })}
            className={`field ${
              analysis.title.isTruncated
                ? "border-state-warning focus:border-state-warning focus:ring-state-warning/20"
                : ""
            }`}
            placeholder="Enter search-optimized page title..."
          />
          {/* Pixel progress bar */}
          <div className="w-full bg-surface-secondary h-1.5 rounded-full mt-2 overflow-hidden border border-neutral-border">
            <div
              className={`h-full transition-all duration-300 ${
                analysis.title.isTruncated ? "bg-state-warning" : "bg-brand"
              }`}
              style={{ width: `${analysis.title.pixelPercentage}%` }}
            />
          </div>
          {analysis.title.isTruncated && (
            <p className="text-xs text-state-warning mt-1.5 font-medium">
              ⚠️ Title exceeds {analysis.title.maxPixels}px in {device} view and will likely be truncated with an ellipsis.
            </p>
          )}
        </div>

        {/* Canonical URL Input */}
        <div>
          <label className="field-label">
            Canonical Target URL
          </label>
          <input
            type="text"
            value={config.url}
            onChange={(e) => setConfig({ ...config, url: e.target.value })}
            className="field font-mono text-xs"
            placeholder="https://example.com/category/page"
          />
        </div>

        {/* Meta Description Input */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="field-label !mb-0">
              Meta Description
            </label>
            <span
              className={`text-xs font-mono font-medium ${
                analysis.description.isTruncated ? "text-state-warning font-bold" : "text-neutral-muted"
              }`}
            >
              {analysis.description.pixelWidth}px / {analysis.description.maxPixels}px ({config.description.length} chars)
            </span>
          </div>
          <textarea
            rows={3}
            value={config.description}
            onChange={(e) => setConfig({ ...config, description: e.target.value })}
            className={`field-textarea ${
              analysis.description.isTruncated
                ? "border-state-warning focus:border-state-warning focus:ring-state-warning/20"
                : ""
            }`}
            placeholder="Compelling summary snippet encouraging high search click-through rates..."
          />
          {/* Pixel progress bar */}
          <div className="w-full bg-surface-secondary h-1.5 rounded-full mt-2 overflow-hidden border border-neutral-border">
            <div
              className={`h-full transition-all duration-300 ${
                analysis.description.isTruncated ? "bg-state-warning" : "bg-brand"
              }`}
              style={{ width: `${analysis.description.pixelPercentage}%` }}
            />
          </div>
          {analysis.description.isTruncated && (
            <p className="text-xs text-state-warning mt-1.5 font-medium">
              ⚠️ Description exceeds {analysis.description.maxPixels}px in {device} view and will be truncated by Google.
            </p>
          )}
        </div>

        {/* Brand & Rich Snippet Details */}
        <div className="pt-2 border-t border-neutral-border space-y-4">
          <div className="flex items-center justify-between">
            <label className="field-label !mb-0">
              Simulate Rich Snippets (Rating &amp; Date)
            </label>
            <input
              type="checkbox"
              checked={showRichSnippet}
              onChange={(e) => setShowRichSnippet(e.target.checked)}
              className="w-4 h-4 text-brand rounded border-neutral-border-strong bg-surface-secondary focus:ring-brand"
            />
          </div>

          {showRichSnippet && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="field-label">Snippet Date</label>
                <input
                  type="text"
                  value={config.date || ""}
                  onChange={(e) => setConfig({ ...config, date: e.target.value })}
                  className="field py-1 text-xs"
                  placeholder="e.g. Sep 23, 2026"
                />
              </div>
              <div>
                <label className="field-label">Review Rating (1-5)</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={config.rating || 5}
                  onChange={(e) => setConfig({ ...config, rating: parseFloat(e.target.value) || 5 })}
                  className="field py-1 text-xs"
                />
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleCopyHtml}
          className="btn-primary w-full inline-flex items-center justify-center gap-2"
        >
          {copied ? <Check className="w-4 h-4 text-state-success" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? "Copied HTML to Clipboard!" : "Copy Meta Tags"}</span>
        </button>
      </div>

      {/* Live SERP Simulator (Right Column) */}
      <div className="lg:col-span-6 space-y-6">
        {/* Device & Theme Switcher Header */}
        <div className="bg-surface p-4 rounded-2xl border border-neutral-border shadow-sm flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm font-bold text-ink">Google SERP Preview</span>

          <div className="flex flex-wrap items-center gap-2">
            {/* Theme switcher */}
            <div className="inline-flex rounded-btn bg-surface-secondary p-1 border border-neutral-border text-xs">
              <button
                type="button"
                onClick={() => setPreviewTheme("dark")}
                className={`px-2.5 py-1 rounded-btn font-semibold transition ${
                  previewTheme === "dark"
                    ? "bg-brand text-white shadow-sm"
                    : "text-neutral-secondary hover:text-white"
                }`}
              >
                Dark
              </button>
              <button
                type="button"
                onClick={() => setPreviewTheme("light")}
                className={`px-2.5 py-1 rounded-btn font-semibold transition ${
                  previewTheme === "light"
                    ? "bg-brand text-white shadow-sm"
                    : "text-neutral-secondary hover:text-white"
                }`}
              >
                Light
              </button>
            </div>

            {/* Device switcher */}
            <div className="inline-flex rounded-btn bg-surface-secondary p-1 border border-neutral-border">
              <button
                type="button"
                onClick={() => setDevice("desktop")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn text-xs font-semibold transition ${
                  device === "desktop"
                    ? "bg-brand text-white shadow-sm"
                    : "text-neutral-secondary hover:text-white"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                Desktop
              </button>
              <button
                type="button"
                onClick={() => setDevice("mobile")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn text-xs font-semibold transition ${
                  device === "mobile"
                    ? "bg-brand text-white shadow-sm"
                    : "text-neutral-secondary hover:text-white"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                Mobile
              </button>
            </div>
          </div>
        </div>

        {/* Google SERP Simulated Result Container */}
        <div
          className={`rounded-2xl border shadow-sm overflow-hidden p-6 transition-all ${
            previewTheme === "dark"
              ? "bg-[#1f1f1f] border-[#3c4043] text-[#e8eaed]"
              : "bg-white border-slate-200 text-[#202124]"
          } ${device === "mobile" ? "max-w-[420px] mx-auto" : "w-full"}`}
        >
          <div className="font-sans antialiased text-left space-y-1.5">
            {/* Header: Favicon + Domain + Breadcrumb */}
            <div className="flex items-center gap-3 mb-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold uppercase flex-shrink-0 ${
                  previewTheme === "dark"
                    ? "bg-[#303134] text-[#e8eaed] border border-[#3c4043]"
                    : "bg-slate-100 text-slate-800 border border-slate-200"
                }`}
              >
                {analysis.domain.charAt(0)}
              </div>
              <div className="leading-tight overflow-hidden">
                <div
                  className={`text-xs font-medium truncate ${
                    previewTheme === "dark" ? "text-[#e8eaed]" : "text-slate-900"
                  }`}
                >
                  {config.brandName || analysis.domain}
                </div>
                <div
                  className={`text-[11px] font-mono truncate ${
                    previewTheme === "dark" ? "text-[#9aa0a6]" : "text-slate-500"
                  }`}
                >
                  {analysis.displayUrl}
                </div>
              </div>
            </div>

            {/* Title Link */}
            <h3
              className={`hover:underline cursor-pointer leading-[1.3] font-normal ${
                previewTheme === "dark" ? "text-[#8ab4f8]" : "text-[#1a0dab]"
              }`}
              style={{
                fontSize: device === "desktop" ? "20px" : "18px",
                fontFamily: "arial, sans-serif",
                maxWidth: device === "desktop" ? "600px" : "100%",
                wordWrap: "break-word",
              }}
            >
              {analysis.title.display}
            </h3>

            {/* Rich Snippets / Stars */}
            {showRichSnippet && (
              <div
                className={`flex items-center gap-1.5 text-xs py-0.5 ${
                  previewTheme === "dark" ? "text-[#bdc1c6]" : "text-[#70757a]"
                }`}
              >
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(config.rating || 5)
                          ? "fill-amber-400 text-amber-400"
                          : previewTheme === "dark"
                          ? "text-neutral-600"
                          : "text-slate-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">
                  Rating: {config.rating?.toFixed(1) || "5.0"} · ‎{config.reviewCount || 100} reviews
                </span>
              </div>
            )}

            {/* Snippet Description */}
            <div
              className={`leading-[1.58] ${
                previewTheme === "dark" ? "text-[#bdc1c6]" : "text-[#4d5156]"
              }`}
              style={{
                fontSize: "14px",
                fontFamily: "arial, sans-serif",
                maxWidth: device === "desktop" ? "960px" : "100%",
              }}
            >
              {showRichSnippet && config.date && (
                <span className={`mr-1.5 ${previewTheme === "dark" ? "text-[#9aa0a6]" : "text-[#70757a]"}`}>
                  {config.date} —
                </span>
              )}
              {analysis.description.display}
            </div>
          </div>
        </div>

        {/* Real-time Diagnostics Card */}
        <div className="bg-surface-secondary p-5 rounded-2xl border border-neutral-border">
          <h3 className="text-xs font-bold text-ink uppercase tracking-wider mb-3">
            Search Visibility Audit
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-surface-elevated rounded-btn border border-neutral-border">
              <span className="text-neutral-muted block mb-1">Title Pixel Status</span>
              <span
                className={`font-semibold ${
                  analysis.title.isTruncated ? "text-state-warning" : "text-state-success"
                }`}
              >
                {analysis.title.isTruncated ? "Truncated in Search" : "100% Fully Visible"}
              </span>
            </div>
            <div className="p-3 bg-surface-elevated rounded-btn border border-neutral-border">
              <span className="text-neutral-muted block mb-1">Description Status</span>
              <span
                className={`font-semibold ${
                  analysis.description.isTruncated ? "text-state-warning" : "text-state-success"
                }`}
              >
                {analysis.description.isTruncated ? "Truncated in Search" : "100% Fully Visible"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

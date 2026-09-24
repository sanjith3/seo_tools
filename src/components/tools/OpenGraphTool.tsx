"use client";

import { useState } from "react";
import {
  OpenGraphData,
  generateOpenGraphHtml,
  validateOpenGraph,
} from "@/lib/generators/open-graph";
import { Copy, Check, Share2, AlertCircle, RefreshCw } from "lucide-react";

export function OpenGraphTool() {
  const [data, setData] = useState<OpenGraphData>({
    title: "Zenvuk | Free Developer & Technical SEO Tools",
    description:
      "A fast, privacy-focused collection of free SEO, schema markup, crawler control, and marketing utilities. Zero logins, 100% browser-based.",
    url: "https://zenvuk.com/",
    siteName: "Zenvuk",
    type: "website",
    imageUrl: "https://zenvuk.com/og-image.png",
    imageAlt: "Zenvuk Free SEO Tools Platform Preview",
    imageWidth: "1200",
    imageHeight: "630",
    locale: "en_US",
    twitterCard: "summary_large_image",
    twitterSite: "@zenvuk",
    twitterCreator: "@zenvuk",
    author: "Zenvuk Team",
  });

  const [activeTab, setActiveTab] = useState<"facebook" | "twitter">("facebook");
  const [copied, setCopied] = useState(false);

  const htmlOutput = generateOpenGraphHtml(data);
  const validation = validateOpenGraph(data);

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setData({
      title: "Zenvuk | Free Developer & Technical SEO Tools",
      description:
        "A fast, privacy-focused collection of free SEO, schema markup, crawler control, and marketing utilities. Zero logins, 100% browser-based.",
      url: "https://zenvuk.com/",
      siteName: "Zenvuk",
      type: "website",
      imageUrl: "https://zenvuk.com/og-image.png",
      imageAlt: "Zenvuk Free SEO Tools Platform Preview",
      imageWidth: "1200",
      imageHeight: "630",
      locale: "en_US",
      twitterCard: "summary_large_image",
      twitterSite: "@zenvuk",
      twitterCreator: "@zenvuk",
      author: "Zenvuk Team",
    });
  };

  let cleanDomain = "zenvuk.com";
  try {
    const parsed = new URL(data.url.startsWith("http") ? data.url : `https://${data.url}`);
    cleanDomain = parsed.hostname.replace(/^www\./, "");
  } catch {
    cleanDomain = "zenvuk.com";
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Editor Column (Left) */}
      <div className="lg:col-span-6 bg-surface p-6 rounded-2xl border border-neutral-border shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-border">
          <h2 className="text-lg font-bold text-ink">Metadata Properties</h2>
          <button
            onClick={handleReset}
            className="btn-secondary inline-flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
        </div>

        {/* Basic Metadata */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="field-label !mb-0">
                Title (og:title)
              </label>
              <span className={`text-xs font-mono ${data.title.length > 90 ? "text-state-warning font-bold" : "text-neutral-muted"}`}>
                {data.title.length}/90 chars
              </span>
            </div>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="field"
              placeholder="Catchy social sharing title..."
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="field-label !mb-0">
                Description (og:description)
              </label>
              <span className={`text-xs font-mono ${data.description.length > 200 ? "text-state-warning font-bold" : "text-neutral-muted"}`}>
                {data.description.length}/200 chars
              </span>
            </div>
            <textarea
              rows={3}
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              className="field-textarea"
              placeholder="Engaging overview that prompts social clicks..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="field-label">
                Canonical URL (og:url)
              </label>
              <input
                type="text"
                value={data.url}
                onChange={(e) => setData({ ...data, url: e.target.value })}
                className="field font-mono text-xs"
                placeholder="https://example.com/post"
              />
            </div>
            <div>
              <label className="field-label">
                Site Name (og:site_name)
              </label>
              <input
                type="text"
                value={data.siteName}
                onChange={(e) => setData({ ...data, siteName: e.target.value })}
                className="field text-sm"
                placeholder="Brand or website name"
              />
            </div>
          </div>
        </div>

        {/* Media & Type Settings */}
        <div className="pt-4 border-t border-neutral-border space-y-4">
          <h3 className="text-xs font-bold text-ink uppercase tracking-wider">
            Media &amp; Card Type
          </h3>
          <div>
            <label className="field-label">
              Social Image URL (og:image)
            </label>
            <input
              type="text"
              value={data.imageUrl}
              onChange={(e) => setData({ ...data, imageUrl: e.target.value })}
              className="field text-sm"
              placeholder="https://example.com/images/hero-1200x630.jpg"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="field-label">Image Alt Text</label>
              <input
                type="text"
                value={data.imageAlt || ""}
                onChange={(e) => setData({ ...data, imageAlt: e.target.value })}
                className="field text-xs"
                placeholder="Alt description"
              />
            </div>
            <div>
              <label className="field-label">Width (px)</label>
              <input
                type="text"
                value={data.imageWidth || "1200"}
                onChange={(e) => setData({ ...data, imageWidth: e.target.value })}
                className="field text-xs font-mono"
              />
            </div>
            <div>
              <label className="field-label">Height (px)</label>
              <input
                type="text"
                value={data.imageHeight || "630"}
                onChange={(e) => setData({ ...data, imageHeight: e.target.value })}
                className="field text-xs font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="field-label">Open Graph Type</label>
              <select
                value={data.type}
                onChange={(e) => setData({ ...data, type: e.target.value as OpenGraphData["type"] })}
                className="field text-xs bg-surface text-ink"
              >
                <option value="website">website</option>
                <option value="article">article</option>
                <option value="product">product</option>
                <option value="book">book</option>
                <option value="profile">profile</option>
              </select>
            </div>
            <div>
              <label className="field-label">Twitter Card Format</label>
              <select
                value={data.twitterCard}
                onChange={(e) => setData({ ...data, twitterCard: e.target.value as OpenGraphData["twitterCard"] })}
                className="field text-xs bg-surface text-ink"
              >
                <option value="summary_large_image">summary_large_image (1200x630)</option>
                <option value="summary">summary (square thumbnail)</option>
                <option value="app">app</option>
                <option value="player">player (video/audio)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Validation Notices */}
        {validation.warnings.length > 0 && (
          <div className="p-3 bg-amber-950/30 border border-amber-800/50 rounded-lg text-xs text-amber-200 space-y-1">
            <div className="font-semibold flex items-center gap-1 text-amber-100">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" /> Validation Recommendations:
            </div>
            {validation.warnings.map((w, i) => (
              <p key={i}>• {w}</p>
            ))}
          </div>
        )}
      </div>

      {/* Simulator & Code Output Column (Right) */}
      <div className="lg:col-span-6 space-y-6">
        {/* Preview Platform Tabs */}
        <div className="bg-surface p-4 rounded-2xl border border-neutral-border shadow-sm flex items-center justify-between">
          <span className="text-sm font-bold text-ink">Social Card Simulator</span>
          <div className="inline-flex rounded-btn bg-surface-secondary p-1 border border-neutral-border">
            <button
              onClick={() => setActiveTab("facebook")}
              className={`px-3 py-1.5 rounded-btn text-xs font-semibold transition ${
                activeTab === "facebook"
                  ? "bg-brand text-white shadow-sm"
                  : "text-neutral-secondary hover:text-white"
              }`}
            >
              Facebook / LinkedIn
            </button>
            <button
              onClick={() => setActiveTab("twitter")}
              className={`px-3 py-1.5 rounded-btn text-xs font-semibold transition ${
                activeTab === "twitter"
                  ? "bg-brand text-white shadow-sm"
                  : "text-neutral-secondary hover:text-white"
              }`}
            >
              Twitter / X Card
            </button>
          </div>
        </div>

        {/* Interactive Social Card Preview: #111F32 */}
        <div className="bg-surface-secondary p-4 sm:p-6 rounded-2xl border border-neutral-border">
          <div className="bg-[#111F32] rounded-xl border border-neutral-border-strong overflow-hidden shadow-sm max-w-lg mx-auto">
            {/* Image Preview Box */}
            <div className="relative aspect-[1.91/1] bg-surface-elevated flex items-center justify-center text-neutral-muted overflow-hidden">
              {data.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.imageUrl}
                  alt={data.imageAlt || data.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='315' viewBox='0 0 600 315'><rect width='600' height='315' fill='%2314243A'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%237F8DA3' font-family='sans-serif' font-size='20'>Image Not Reachable</text></svg>";
                  }}
                />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Share2 className="w-8 h-8 opacity-40 text-brand" />
                  <span className="text-xs text-neutral-muted">No image URL specified</span>
                </div>
              )}
            </div>

            {/* Content Details Box */}
            <div className="p-4 space-y-1.5 text-left">
              <span className="text-[11px] font-mono text-[#38BDF8] uppercase tracking-wider block">
                {cleanDomain}
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white leading-snug line-clamp-2">
                {data.title || "Page Title"}
              </h4>
              <p className="text-xs text-[#B5C1D1] line-clamp-2 leading-relaxed">
                {data.description || "Page summary will appear here when shared on social networks."}
              </p>
            </div>
          </div>
        </div>

        {/* HTML Meta Code Output */}
        <div className="bg-[#050B14] border border-[#1B2A3F] rounded-2xl p-5 text-[#DCE5F1] shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1B2A3F]">
            <span className="text-xs font-mono font-medium text-neutral-muted">
              HTML &lt;head&gt; Meta Directives
            </span>
            <button
              onClick={handleCopy}
              className="btn-secondary inline-flex items-center gap-1.5 text-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-state-success" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy Code"}</span>
            </button>
          </div>
          <pre className="text-xs font-mono overflow-x-auto text-[#7DD3FC] whitespace-pre leading-relaxed max-h-56">
            {htmlOutput}
          </pre>
        </div>
      </div>
    </div>
  );
}

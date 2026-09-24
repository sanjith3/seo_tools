"use client";

import { useState } from "react";
import {
  Sparkles,
  RefreshCw,
  Download,
  Copy,
  Star,
  Check,
  Tag,
  Sliders,
  BarChart3,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import {
  generateProductTitles,
  GeneratedProductTitle,
  MarketplaceType,
  ProductTitleTone,
  computeProductTitleSummary,
  ProductTitleSummary
} from "@/lib/generators/product-title";
import { downloadCsv } from "@/lib/export/csv";
import { useToast } from "@/components/common/Toast";
import { trackEvent } from "@/lib/analytics";

const MARKETPLACES: MarketplaceType[] = [
  "General Ecommerce",
  "Amazon",
  "eBay",
  "Etsy",
  "Shopify",
  "WooCommerce"
];

const TONES: ProductTitleTone[] = [
  "Professional",
  "Premium",
  "Simple",
  "Descriptive",
  "SEO Focused"
];

export function ProductTitleTool({
  onSummaryChange
}: {
  onSummaryChange?: (summary: ProductTitleSummary | null) => void;
}) {
  const [productName, setProductName] = useState("Wireless Noise-Cancelling Headphones");
  const [primaryKeyword, setPrimaryKeyword] = useState("Wireless Headphones");
  const [brand, setBrand] = useState("AuraSound");
  const [category, setCategory] = useState("Consumer Electronics");
  const [feature1, setFeature1] = useState("40-Hour Battery");
  const [feature2, setFeature2] = useState("Deep Bass & ANC");
  const [feature3, setFeature3] = useState("Foldable Travel Case");
  const [targetAudience, setTargetAudience] = useState("Commuters & Travelers");
  const [marketplace, setMarketplace] = useState<MarketplaceType>("Amazon");
  const [tone, setTone] = useState<ProductTitleTone>("Professional");
  const [maxLength, setMaxLength] = useState<number>(120);

  const [results, setResults] = useState<GeneratedProductTitle[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const { showToast } = useToast();

  const handleGenerate = () => {
    if (!productName.trim() || !primaryKeyword.trim()) {
      setError("Please enter both a Product Name/Type and a Primary Keyword.");
      showToast("Missing required fields", "error");
      return;
    }

    setError("");
    const generated = generateProductTitles({
      productName,
      primaryKeyword,
      brand: brand.trim() || undefined,
      category: category.trim() || undefined,
      feature1: feature1.trim() || undefined,
      feature2: feature2.trim() || undefined,
      feature3: feature3.trim() || undefined,
      targetAudience: targetAudience.trim() || undefined,
      marketplace,
      tone,
      maxLength: Number(maxLength) || 120
    });

    setResults(generated);
    const summary = computeProductTitleSummary(generated, primaryKeyword);
    if (onSummaryChange) onSummaryChange(summary);

    showToast(`Generated ${generated.length} optimized titles!`);
    trackEvent("tool_generated", {
      tool_name: "product-title-generator",
      marketplace,
      items_count: generated.length
    });
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast("Removed from favorites");
      } else {
        next.add(id);
        showToast("Saved to favorites!");
      }
      return next;
    });
  };

  const copySingle = async (item: GeneratedProductTitle) => {
    await navigator.clipboard.writeText(item.title);
    setCopiedId(item.id);
    showToast("Title copied to clipboard!");
    trackEvent("copy_result", { tool_name: "product-title-generator" });
    setTimeout(() => setCopiedId(null), 1500);
  };

  const copyAllTitles = async () => {
    const listToCopy = onlyFavorites
      ? results.filter((r) => favorites.has(r.id))
      : results;
    if (listToCopy.length === 0) return;
    const text = listToCopy.map((r, i) => `${i + 1}. ${r.title}`).join("\n");
    await navigator.clipboard.writeText(text);
    showToast(`Copied all ${listToCopy.length} titles to clipboard!`);
    trackEvent("copy_result", { tool_name: "product-title-generator" });
  };

  const exportCsv = () => {
    const listToExport = onlyFavorites
      ? results.filter((r) => favorites.has(r.id))
      : results;
    if (listToExport.length === 0) return;

    const headers = [
      "Title",
      "SEO Score",
      "Length (chars)",
      "Keyword Placement",
      "Marketplace",
      "Optimization Note"
    ];
    const rows = listToExport.map((r) => [
      r.title,
      r.score,
      r.characterCount,
      r.keywordIndicator,
      r.marketplace,
      r.reason
    ]);

    downloadCsv(`product-titles-${primaryKeyword.slice(0, 15)}`, headers, rows);
    showToast("Exported titles CSV file!");
    trackEvent("download_csv", { tool_name: "product-title-generator" });
  };

  const displayedResults = onlyFavorites
    ? results.filter((r) => favorites.has(r.id))
    : results;

  const currentSummary = results.length > 0 ? computeProductTitleSummary(results, primaryKeyword) : null;

  return (
    <div className="w-full min-w-0 max-w-full space-y-8">
      {/* Configuration Form Card */}
      <section
        aria-label="Product Title Inputs"
        className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-neutral-border bg-surface p-5 shadow-sm sm:p-7 space-y-6"
      >
        <div className="flex items-center justify-between border-b border-neutral-border pb-4">
          <div className="flex items-center gap-2">
            <Sliders size={18} className="text-brand" />
            <h2 className="text-base font-bold text-ink">Product Parameters</h2>
          </div>
          <span className="text-xs text-neutral-muted">Generates 20 variations</span>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-btn bg-state-error-bg border border-[rgba(251,113,133,0.30)] p-3 text-xs font-semibold text-state-error">
            <AlertCircle size={15} />
            <span>{error}</span>
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Primary Keyword */}
          <div>
            <label htmlFor="title-kw" className="field-label">
              <span>Primary Keyword <span className="text-brand font-bold">*</span></span>
            </label>
            <input
              id="title-kw"
              type="text"
              value={primaryKeyword}
              onChange={(e) => setPrimaryKeyword(e.target.value)}
              placeholder="e.g. Wireless Headphones"
              className="field"
              required
            />
          </div>

          {/* Product Name / Type */}
          <div>
            <label htmlFor="title-name" className="field-label">
              <span>Product Name / Type <span className="text-brand font-bold">*</span></span>
            </label>
            <input
              id="title-name"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. Pro Noise-Cancelling Over-Ear"
              className="field"
              required
            />
          </div>

          {/* Brand */}
          <div>
            <label htmlFor="title-brand" className="field-label">
              <span>Brand Name <span className="text-neutral-muted font-normal">(optional)</span></span>
            </label>
            <input
              id="title-brand"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="e.g. Sony, Anker, or Your Brand"
              className="field"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="title-category" className="field-label">
              <span>Product Category <span className="text-neutral-muted font-normal">(optional)</span></span>
            </label>
            <input
              id="title-category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Audio, Apparel, Home & Kitchen"
              className="field"
            />
          </div>

          {/* Feature 1 */}
          <div>
            <label htmlFor="title-f1" className="field-label">
              <span>Feature 1 <span className="text-neutral-muted font-normal">(spec, material, or key benefit)</span></span>
            </label>
            <input
              id="title-f1"
              type="text"
              value={feature1}
              onChange={(e) => setFeature1(e.target.value)}
              placeholder="e.g. 40-Hour Battery Life"
              className="field"
            />
          </div>

          {/* Feature 2 */}
          <div>
            <label htmlFor="title-f2" className="field-label">
              <span>Feature 2 <span className="text-neutral-muted font-normal">(optional)</span></span>
            </label>
            <input
              id="title-f2"
              type="text"
              value={feature2}
              onChange={(e) => setFeature2(e.target.value)}
              placeholder="e.g. Active Noise Cancellation"
              className="field"
            />
          </div>

          {/* Feature 3 */}
          <div>
            <label htmlFor="title-f3" className="field-label">
              <span>Feature 3 <span className="text-neutral-muted font-normal">(optional)</span></span>
            </label>
            <input
              id="title-f3"
              type="text"
              value={feature3}
              onChange={(e) => setFeature3(e.target.value)}
              placeholder="e.g. Travel Carrying Case"
              className="field"
            />
          </div>

          {/* Target Audience */}
          <div>
            <label htmlFor="title-aud" className="field-label">
              <span>Target Audience <span className="text-neutral-muted font-normal">(optional)</span></span>
            </label>
            <input
              id="title-aud"
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Commuters, Runners, Office"
              className="field"
            />
          </div>

          {/* Marketplace */}
          <div>
            <label htmlFor="title-marketplace" className="field-label">
              <span>Target Marketplace</span>
            </label>
            <select
              id="title-marketplace"
              value={marketplace}
              onChange={(e) => {
                const val = e.target.value as MarketplaceType;
                setMarketplace(val);
                if (val === "eBay") {
                  setMaxLength(80);
                } else if (val === "Amazon" && maxLength < 150) {
                  setMaxLength(200);
                } else if (val === "Etsy" && maxLength < 100) {
                  setMaxLength(140);
                }
              }}
              className="field"
            >
              {MARKETPLACES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Tone */}
          <div>
            <label htmlFor="title-tone" className="field-label">
              <span>Tone of Voice</span>
            </label>
            <select
              id="title-tone"
              value={tone}
              onChange={(e) => setTone(e.target.value as ProductTitleTone)}
              className="field"
            >
              {TONES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Max Length */}
          <div className="sm:col-span-2">
            <label htmlFor="title-len" className="field-label">
              <span>Maximum Title Length</span>
              <span className="text-neutral-muted font-bold">{maxLength} characters</span>
            </label>
            <div className="flex items-center gap-4">
              <input
                id="title-len"
                type="range"
                min={40}
                max={200}
                step={5}
                value={maxLength}
                onChange={(e) => setMaxLength(Number(e.target.value))}
                className="w-full accent-brand cursor-pointer"
              />
              <div className="flex gap-1.5 shrink-0 text-xs">
                {[60, 80, 120, 150].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setMaxLength(preset)}
                    className={`rounded-lg px-2 py-1 border transition-colors ${
                      maxLength === preset
                        ? "bg-brand text-white border-brand font-bold"
                        : "bg-surface-secondary text-neutral-secondary border-neutral-border hover:bg-surface-elevated hover:text-white"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-neutral-border flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-neutral-muted">
            Uses deterministic e-commerce title structures. No fabricated specifications.
          </p>

          <button
            type="button"
            onClick={handleGenerate}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Sparkles size={16} />
            <span>Generate 20 Product Titles</span>
          </button>
        </div>
      </section>

      {/* Generation Results Section or Empty State */}
      {results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-border bg-surface p-8 text-center sm:p-12">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand-light text-brand">
            <Sparkles size={20} />
          </div>
          <h3 className="mt-3 text-base font-bold text-navy">No product titles generated yet</h3>
          <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-neutral-secondary">
            Provide your primary keyword and product details above, then click &ldquo;Generate 20 Product Titles&rdquo; to build high-converting variations.
          </p>
        </div>
      ) : (
        <section
          aria-label="Generated Product Titles"
          className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-neutral-border bg-surface p-5 shadow-sm sm:p-7 space-y-6"
        >
          {/* Summary Dashboard Banner */}
          {currentSummary && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-xl border border-neutral-border bg-surface-secondary p-4 text-center">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-muted">Generated</p>
                <p className="mt-1 text-xl font-bold text-ink">{currentSummary.totalGenerated}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-muted">Top Zenvuk Score</p>
                <p className="mt-1 text-xl font-bold text-state-success">{currentSummary.bestScore}/100</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-muted">Avg Length</p>
                <p className="mt-1 text-xl font-bold text-ink">{currentSummary.averageLength} chars</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-muted">Keyword Match</p>
                <p className="mt-1 text-xl font-bold text-brand">{currentSummary.keywordCoveragePct}%</p>
              </div>
            </div>
          )}

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-border pb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-ink">
                Results ({displayedResults.length})
              </h3>
              {favorites.size > 0 && (
                <button
                  type="button"
                  onClick={() => setOnlyFavorites(!onlyFavorites)}
                  className={`inline-flex items-center gap-1 rounded-btn px-2.5 py-1 text-xs font-semibold border transition-colors ${
                    onlyFavorites
                      ? "bg-amber-400/10 text-amber-400 border-amber-400/30"
                      : "bg-surface-secondary text-neutral-secondary border-neutral-border hover:bg-surface-elevated hover:text-ink"
                  }`}
                >
                  <Star size={12} className={onlyFavorites ? "fill-amber-400 text-amber-400" : ""} />
                  <span>Favorites ({favorites.size})</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleGenerate}
                className="btn-secondary inline-flex items-center gap-1.5"
              >
                <RefreshCw size={13} /> Regenerate
              </button>

              <button
                type="button"
                onClick={copyAllTitles}
                className="btn-secondary inline-flex items-center gap-1.5"
              >
                <Copy size={13} /> Copy All
              </button>

              <button
                type="button"
                onClick={exportCsv}
                className="btn-secondary inline-flex items-center gap-1.5"
              >
                <Download size={13} /> Export CSV
              </button>
            </div>
          </div>

          {/* Title Cards Grid */}
          <div className="grid gap-3.5">
            {displayedResults.map((item, index) => {
              const isFav = favorites.has(item.id);
              const isCopied = copiedId === item.id;

              return (
                <div
                  key={item.id}
                  className="group relative rounded-xl border border-neutral-border bg-surface-secondary p-4 transition-all hover:border-[#3A5272] hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-bold text-neutral-muted">#{index + 1}</span>
                        {/* Keyword Indicator Badge */}
                        <span
                          className={`rounded-full px-2 py-0.5 font-semibold text-[11px] ${
                            item.keywordIndicator === "Front-Loaded"
                              ? "bg-state-success-bg text-state-success border border-[rgba(45,212,167,0.25)]"
                              : item.keywordIndicator === "Early Position"
                              ? "bg-[rgba(56,189,248,0.10)] text-[#38BDF8] border border-[rgba(56,189,248,0.25)]"
                              : "bg-surface-elevated text-neutral-secondary border border-neutral-border"
                          }`}
                        >
                          {item.keywordIndicator}
                        </span>

                        <span className="text-neutral-muted">•</span>
                        <span className="text-neutral-secondary">{item.characterCount} chars</span>
                        <span className="text-neutral-muted">•</span>
                        <span className="font-semibold text-state-success">
                          Zenvuk Score: {item.score}/100
                        </span>
                      </div>

                      <p className="mt-2 text-sm font-semibold leading-6 text-white break-words">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs text-neutral-muted">
                        {item.reason}
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => toggleFavorite(item.id)}
                        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                        className={`rounded-btn p-2 transition-colors ${
                          isFav
                            ? "text-amber-400 bg-amber-400/10"
                            : "text-neutral-muted hover:bg-surface-elevated hover:text-ink"
                        }`}
                      >
                        <Star size={16} className={isFav ? "fill-amber-400" : ""} />
                      </button>

                      <button
                        type="button"
                        onClick={() => copySingle(item)}
                        aria-label="Copy title"
                        className="focus-ring inline-flex items-center gap-1 rounded-btn border border-neutral-border bg-surface-elevated px-3 py-1.5 text-xs font-semibold text-neutral-secondary hover:text-ink hover:border-neutral-border-strong transition-all"
                      >
                        {isCopied ? (
                          <>
                            <Check size={13} className="text-state-success" />
                            <span className="text-state-success">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} className="text-neutral-muted" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

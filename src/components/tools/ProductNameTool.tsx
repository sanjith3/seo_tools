"use client";

import { useState } from "react";
import {
  Sparkles,
  RefreshCw,
  Download,
  Copy,
  Star,
  Check,
  ShieldAlert,
  Sliders,
  AlertCircle
} from "lucide-react";
import {
  generateProductNames,
  GeneratedProductName,
  NamingStyle,
  NameLengthFilter,
  computeProductNameSummary,
  ProductNameSummary
} from "@/lib/generators/product-name";
import { downloadCsv } from "@/lib/export/csv";
import { useToast } from "@/components/common/Toast";
import { trackEvent } from "@/lib/analytics";

const STYLES: NamingStyle[] = [
  "Modern",
  "Professional",
  "Premium",
  "Minimal",
  "Technical",
  "Playful",
  "Futuristic",
  "Luxury"
];

export function ProductNameTool({
  onSummaryChange
}: {
  onSummaryChange?: (summary: ProductNameSummary | null) => void;
}) {
  const [category, setCategory] = useState("Software & SaaS");
  const [productType] = useState("Analytics Platform");
  const [keyword, setKeyword] = useState("Search");
  const [concept, setConcept] = useState("Clarity & Precision");
  const [targetAudience, setTargetAudience] = useState("Growth Marketers");
  const [style, setStyle] = useState<NamingStyle>("Modern");
  const [lengthFilter, setLengthFilter] = useState<NameLengthFilter>("Any");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [wordsToAvoid, setWordsToAvoid] = useState("cheap, easy, simple");

  const [results, setResults] = useState<GeneratedProductName[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const { showToast } = useToast();

  const handleGenerate = () => {
    if (!category.trim() || !keyword.trim() || !concept.trim()) {
      setError("Please fill Category, Main Keyword, and Main Concept.");
      showToast("Missing required fields", "error");
      return;
    }

    setError("");
    const generated = generateProductNames({
      category,
      productType: "Product",
      keyword,
      concept,
      targetAudience: targetAudience.trim() || undefined,
      style,
      lengthFilter,
      prefix: prefix.trim() || undefined,
      suffix: suffix.trim() || undefined,
      wordsToAvoid: wordsToAvoid.trim() || undefined
    });

    setResults(generated);
    const summary = computeProductNameSummary(generated, style);
    if (onSummaryChange) onSummaryChange(summary);

    showToast(`Generated ${generated.length} brandable name ideas!`);
    trackEvent("tool_generated", {
      tool_name: "product-name-generator",
      style,
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

  const copySingle = async (item: GeneratedProductName) => {
    await navigator.clipboard.writeText(item.name);
    setCopiedId(item.id);
    showToast("Name copied to clipboard!");
    trackEvent("copy_result", { tool_name: "product-name-generator" });
    setTimeout(() => setCopiedId(null), 1500);
  };

  const copyAll = async () => {
    const listToCopy = onlyFavorites
      ? results.filter((r) => favorites.has(r.id))
      : results;
    if (listToCopy.length === 0) return;
    const text = listToCopy.map((r, i) => `${i + 1}. ${r.name}`).join("\n");
    await navigator.clipboard.writeText(text);
    showToast(`Copied ${listToCopy.length} names to clipboard!`);
    trackEvent("copy_result", { tool_name: "product-name-generator" });
  };

  const exportCsv = () => {
    const listToExport = onlyFavorites
      ? results.filter((r) => favorites.has(r.id))
      : results;
    if (listToExport.length === 0) return;

    const headers = [
      "Generated Name",
      "Brand Score",
      "Syllables",
      "Style",
      "Category Tag",
      "Phonetic & Brand Note"
    ];
    const rows = listToExport.map((r) => [
      r.name,
      r.score,
      r.syllables,
      r.style,
      r.categoryTag,
      r.reason
    ]);

    downloadCsv(`product-names-${keyword.slice(0, 15)}`, headers, rows);
    showToast("Exported product names CSV!");
    trackEvent("download_csv", { tool_name: "product-name-generator" });
  };

  const displayedResults = onlyFavorites
    ? results.filter((r) => favorites.has(r.id))
    : results;

  return (
    <div className="w-full min-w-0 max-w-full space-y-8">
      {/* Trademark Disclaimer Alert Banner */}
      <div className="w-full min-w-0 max-w-full flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-xs leading-relaxed text-amber-900 shadow-sm">
        <ShieldAlert size={18} className="text-amber-600 shrink-0 mt-0.5" />
        <div className="min-w-0 flex-1">
          <p className="font-bold">Trademark & Availability Notice</p>
          <p className="mt-0.5 text-amber-800">
            Always verify trademarks, domains, and business-name availability independently before using a generated name. Zenvuk does not check registry databases or guarantee naming rights.
          </p>
        </div>
      </div>

      {/* Input Form */}
      <section
        aria-label="Product Name Parameters"
        className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-neutral-border bg-surface p-5 shadow-sm sm:p-7 space-y-6"
      >
        <div className="flex items-center justify-between border-b border-neutral-border pb-4">
          <div className="flex items-center gap-2">
            <Sliders size={18} className="text-brand" />
            <h2 className="text-base font-bold text-ink">Name Criteria</h2>
          </div>
          <span className="text-xs text-neutral-muted">Generates 30 brandable names</span>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-btn bg-state-error-bg border border-[rgba(251,113,133,0.30)] p-3 text-xs font-semibold text-state-error">
            <AlertCircle size={15} />
            <span>{error}</span>
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Category */}
          <div>
            <label htmlFor="name-cat" className="field-label">
              <span>Product Category <span className="text-brand font-bold">*</span></span>
            </label>
            <input
              id="name-cat"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Software, Apparel, Coffee, Fitness"
              className="field"
              required
            />
          </div>

          {/* Main Keyword */}
          <div>
            <label htmlFor="name-kw" className="field-label">
              <span>Main Keyword / Root <span className="text-brand font-bold">*</span></span>
            </label>
            <input
              id="name-kw"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g. Search, Brew, Pulse, Cloud"
              className="field"
              required
            />
          </div>

          {/* Concept / Theme */}
          <div>
            <label htmlFor="name-concept" className="field-label">
              <span>Core Concept or Vibe <span className="text-brand font-bold">*</span></span>
            </label>
            <input
              id="name-concept"
              type="text"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="e.g. Precision, Natural, Energy, Trust"
              className="field"
              required
            />
          </div>

          {/* Target Audience */}
          <div>
            <label htmlFor="name-aud" className="field-label">
              <span>Target Audience <span className="text-neutral-muted font-normal">(optional)</span></span>
            </label>
            <input
              id="name-aud"
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Marketers, Athletes, Students"
              className="field"
            />
          </div>

          {/* Naming Style */}
          <div>
            <label htmlFor="name-style" className="field-label">
              <span>Naming Style</span>
            </label>
            <select
              id="name-style"
              value={style}
              onChange={(e) => setStyle(e.target.value as NamingStyle)}
              className="field"
            >
              {STYLES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Name Length Filter */}
          <div>
            <label htmlFor="name-len-filter" className="field-label">
              <span>Name Length Preference</span>
            </label>
            <select
              id="name-len-filter"
              value={lengthFilter}
              onChange={(e) => setLengthFilter(e.target.value as NameLengthFilter)}
              className="field"
            >
              <option value="Any">Any Length</option>
              <option value="Short">Short (under 9 characters)</option>
              <option value="Medium">Medium (8–15 characters)</option>
            </select>
          </div>

          {/* Prefix */}
          <div>
            <label htmlFor="name-prefix" className="field-label">
              <span>Optional Prefix</span>
            </label>
            <input
              id="name-prefix"
              type="text"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              placeholder="e.g. Nova, Go, The"
              className="field"
            />
          </div>

          {/* Suffix */}
          <div>
            <label htmlFor="name-suffix" className="field-label">
              <span>Optional Suffix</span>
            </label>
            <input
              id="name-suffix"
              type="text"
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              placeholder="e.g. Labs, HQ, Co"
              className="field"
            />
          </div>

          {/* Words to Avoid */}
          <div className="sm:col-span-2">
            <label htmlFor="name-avoid" className="field-label">
              <span>Words to Avoid <span className="text-neutral-muted font-normal">(comma-separated)</span></span>
            </label>
            <input
              id="name-avoid"
              type="text"
              value={wordsToAvoid}
              onChange={(e) => setWordsToAvoid(e.target.value)}
              placeholder="e.g. cheap, ultra, generic"
              className="field"
            />
          </div>
        </div>

        <div className="pt-2 border-t border-neutral-border flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-neutral-muted">
            Generates pronounceable syllable combinations and industry affixes.
          </p>

          <button
            type="button"
            onClick={handleGenerate}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Sparkles size={16} />
            <span>Generate 30 Product Names</span>
          </button>
        </div>
      </section>

      {/* Results Section or Empty State */}
      {results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-border bg-surface p-8 text-center sm:p-12">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand-light text-brand">
            <Sparkles size={20} />
          </div>
          <h3 className="mt-3 text-base font-bold text-navy">No brand names generated yet</h3>
          <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-neutral-secondary">
            Set your product category, main keyword, and concept theme above, then click &ldquo;Generate 30 Product Names&rdquo; to build brandable ideas.
          </p>
        </div>
      ) : (
        <section
          aria-label="Generated Names List"
          className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-neutral-border bg-surface p-5 shadow-soft sm:p-7 space-y-6"
        >
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
                onClick={copyAll}
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

          {/* Cards Grid */}
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {displayedResults.map((item, idx) => {
              const isFav = favorites.has(item.id);
              const isCopied = copiedId === item.id;

              return (
                <div
                  key={item.id}
                  className="flex flex-col justify-between rounded-xl border border-neutral-border bg-surface-secondary p-4 transition-all hover:border-[#3A5272] hover:shadow-sm min-w-0"
                >
                  <div className="min-w-0">
                    <div className="flex items-center justify-between text-xs text-neutral-muted">
                      <span>#{idx + 1}</span>
                      <span className="font-semibold text-state-success">
                        Score {item.score}/100
                      </span>
                    </div>

                    <h4 className="mt-2 text-lg font-bold text-white tracking-tight break-words">
                      {item.name}
                    </h4>

                    <div className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
                      <span className="rounded-full bg-surface-elevated px-2 py-0.5 font-medium text-neutral-secondary border border-neutral-border">
                        {item.style}
                      </span>
                      <span className="rounded-full bg-surface-elevated px-2 py-0.5 text-neutral-muted border border-neutral-border">
                        {item.syllables} syllable{item.syllables === 1 ? "" : "s"}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-neutral-muted line-clamp-2">
                      {item.reason}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-neutral-border pt-3">
                    <button
                      type="button"
                      onClick={() => toggleFavorite(item.id)}
                      aria-label={isFav ? "Remove from favorites" : "Save to favorites"}
                      className={`rounded-btn p-1.5 transition-colors ${
                        isFav
                          ? "text-amber-400 bg-amber-400/10"
                          : "text-neutral-muted hover:bg-surface-elevated hover:text-ink"
                      }`}
                    >
                      <Star size={15} className={isFav ? "fill-amber-400" : ""} />
                    </button>

                    <button
                      type="button"
                      onClick={() => copySingle(item)}
                      className="focus-ring inline-flex items-center gap-1 rounded-btn border border-neutral-border bg-surface-elevated px-2.5 py-1 text-xs font-semibold text-neutral-secondary hover:text-ink hover:border-neutral-border-strong transition-all"
                    >
                      {isCopied ? (
                        <>
                          <Check size={12} className="text-state-success" />
                          <span className="text-state-success">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} className="text-neutral-muted" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
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

"use client";

import { useState } from "react";
import {
  Sparkles,
  RefreshCw,
  Download,
  Copy,
  Star,
  Check,
  Search,
  Eye,
  Sliders,
  AlertCircle,
  Info
} from "lucide-react";
import {
  generateMetaDescriptions,
  GeneratedMetaDescription,
  MetaDescriptionTone,
  MetaDescriptionPagePurpose,
  computeMetaDescriptionSummary,
  MetaDescriptionSummary
} from "@/lib/generators/meta-description";
import { downloadCsv } from "@/lib/export/csv";
import { useToast } from "@/components/common/Toast";
import { trackEvent } from "@/lib/analytics";

const PAGE_PURPOSES: MetaDescriptionPagePurpose[] = [
  "Web Page",
  "Homepage",
  "Product / Ecommerce",
  "Category Page",
  "Blog / Article",
  "Local Business",
  "Facebook / Open Graph"
];

const CTA_OPTIONS = [
  "Learn more today",
  "Get started now",
  "Discover more",
  "Shop the collection now",
  "Contact our team today",
  "Request a free quote"
];

const TONES: MetaDescriptionTone[] = [
  "Professional",
  "Informative",
  "Persuasive",
  "Simple",
  "Local Business",
  "Ecommerce"
];

export function MetaDescriptionTool({
  onSummaryChange
}: {
  onSummaryChange?: (summary: MetaDescriptionSummary | null) => void;
}) {
  const [pageTitle, setPageTitle] = useState("Best Ergonomic Office Chairs for Lower Back Pain");
  const [primaryKeyword, setPrimaryKeyword] = useState("ergonomic office chairs");
  const [secondaryKeyword, setSecondaryKeyword] = useState("lumbar support");
  const [businessName, setBusinessName] = useState("PostureCraft");
  const [pagePurpose, setPagePurpose] = useState<MetaDescriptionPagePurpose>("Product / Ecommerce");
  const [mainBenefit, setMainBenefit] = useState("reduce spinal pressure and improve daily posture");
  const [secondaryBenefit, setSecondaryBenefit] = useState("adjustable 4D armrests");
  const [cta, setCta] = useState("Shop the collection now");
  const [tone, setTone] = useState<MetaDescriptionTone>("Professional");
  const [targetLength, setTargetLength] = useState<number>(155);
  const [generateTitle, setGenerateTitle] = useState(false);

  const [results, setResults] = useState<GeneratedMetaDescription[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const { showToast } = useToast();

  const handleGenerate = () => {
    if (!pageTitle.trim() || !primaryKeyword.trim() || !mainBenefit.trim()) {
      setError("Please provide Page Title, Primary Keyword, and Main Benefit.");
      showToast("Missing required fields", "error");
      return;
    }

    setError("");
    const generated = generateMetaDescriptions({
      pageTitle,
      primaryKeyword,
      secondaryKeyword: secondaryKeyword.trim() || undefined,
      businessName: businessName.trim() || undefined,
      pagePurpose,
      mainBenefit,
      secondaryBenefit: secondaryBenefit.trim() || undefined,
      cta,
      tone,
      targetLength: Number(targetLength) || 155,
      generateTitle
    });

    setResults(generated);
    if (generated.length > 0) {
      setActivePreviewId(generated[0].id);
    }

    const summary = computeMetaDescriptionSummary(generated, primaryKeyword);
    if (onSummaryChange) onSummaryChange(summary);

    showToast(`Generated ${generated.length} meta descriptions!`);
    trackEvent("tool_generated", {
      tool_name: "meta-description-generator",
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

  const copySingle = async (item: GeneratedMetaDescription) => {
    await navigator.clipboard.writeText(item.description);
    setCopiedId(item.id);
    showToast("Meta description copied!");
    trackEvent("copy_result", { tool_name: "meta-description-generator" });
    setTimeout(() => setCopiedId(null), 1500);
  };

  const copyAll = async () => {
    const listToCopy = onlyFavorites
      ? results.filter((r) => favorites.has(r.id))
      : results;
    if (listToCopy.length === 0) return;
    const text = listToCopy.map((r, i) => `${i + 1}. [${r.characterCount}c] ${r.description}`).join("\n\n");
    await navigator.clipboard.writeText(text);
    showToast(`Copied ${listToCopy.length} descriptions to clipboard!`);
    trackEvent("copy_result", { tool_name: "meta-description-generator" });
  };

  const exportCsv = () => {
    const listToExport = onlyFavorites
      ? results.filter((r) => favorites.has(r.id))
      : results;
    if (listToExport.length === 0) return;

    const headers = [
      ...(generateTitle ? ["Meta Title", "Title Chars"] : []),
      "Description",
      "Character Count",
      "Zenvuk Optimization Score",
      "Primary Keyword Included",
      "CTA Included",
      "Optimization Note"
    ];
    const rows = listToExport.map((r) => [
      ...(generateTitle ? [r.metaTitle || "", r.titleCharCount || ""] : []),
      r.description,
      r.characterCount,
      r.score,
      r.hasPrimaryKeyword ? "Yes" : "No",
      r.hasCta ? "Yes" : "No",
      r.reason
    ]);

    downloadCsv(`meta-descriptions-${primaryKeyword.slice(0, 15)}`, headers, rows);
    showToast("Exported descriptions CSV!");
    trackEvent("download_csv", { tool_name: "meta-description-generator" });
  };

  const displayedResults = onlyFavorites
    ? results.filter((r) => favorites.has(r.id))
    : results;

  const activeItem =
    results.find((r) => r.id === activePreviewId) || results[0] || null;

  return (
    <div className="w-full min-w-0 max-w-full space-y-8">
      {/* Configuration Input Form */}
      <section
        aria-label="Meta Description Inputs"
        className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-neutral-border bg-surface p-5 shadow-sm sm:p-7 space-y-6"
      >
        <div className="flex items-center justify-between border-b border-neutral-border pb-4">
          <div className="flex items-center gap-2">
            <Sliders size={18} className="text-brand" />
            <h2 className="text-base font-bold text-ink">Page & Content Details</h2>
          </div>
          <span className="text-xs text-neutral-muted">Generates 10+ descriptions</span>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-btn bg-state-error-bg border border-[rgba(251,113,133,0.30)] p-3 text-xs font-semibold text-state-error">
            <AlertCircle size={15} />
            <span>{error}</span>
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Page Title */}
          <div className="sm:col-span-2">
            <label htmlFor="meta-title" className="field-label">
              <span>Page Title <span className="text-brand font-bold">*</span></span>
              <span className="font-normal text-neutral-muted">{pageTitle.length} chars</span>
            </label>
            <input
              id="meta-title"
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              placeholder="e.g. Best Ergonomic Office Chairs"
              className="field"
              required
            />
          </div>

          {/* Primary Keyword */}
          <div>
            <label htmlFor="meta-kw" className="field-label">
              <span>Primary Target Keyword <span className="text-brand font-bold">*</span></span>
            </label>
            <input
              id="meta-kw"
              type="text"
              value={primaryKeyword}
              onChange={(e) => setPrimaryKeyword(e.target.value)}
              placeholder="e.g. ergonomic office chairs"
              className="field"
              required
            />
          </div>

          {/* Secondary Keyword */}
          <div>
            <label htmlFor="meta-sec-kw" className="field-label">
              <span>Secondary Keyword <span className="text-neutral-muted font-normal">(optional)</span></span>
            </label>
            <input
              id="meta-sec-kw"
              type="text"
              value={secondaryKeyword}
              onChange={(e) => setSecondaryKeyword(e.target.value)}
              placeholder="e.g. lumbar support"
              className="field"
            />
          </div>

          {/* Business / Product Name */}
          <div>
            <label htmlFor="meta-brand" className="field-label">
              <span>Brand or Business Name <span className="text-neutral-muted font-normal">(optional)</span></span>
            </label>
            <input
              id="meta-brand"
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. PostureCraft"
              className="field"
            />
          </div>

          {/* Page Purpose */}
          <div>
            <label htmlFor="meta-purpose" className="field-label">
              <span>Page Purpose / Type</span>
            </label>
            <select
              id="meta-purpose"
              value={pagePurpose}
              onChange={(e) => setPagePurpose(e.target.value as MetaDescriptionPagePurpose)}
              className="field"
            >
              {PAGE_PURPOSES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Main Benefit */}
          <div>
            <label htmlFor="meta-b1" className="field-label">
              <span>Main Benefit or Value <span className="text-brand font-bold">*</span></span>
            </label>
            <input
              id="meta-b1"
              type="text"
              value={mainBenefit}
              onChange={(e) => setMainBenefit(e.target.value)}
              placeholder="e.g. relieve back stiffness and improve work focus"
              className="field"
              required
            />
          </div>

          {/* Secondary Benefit */}
          <div>
            <label htmlFor="meta-b2" className="field-label">
              <span>Secondary Benefit <span className="text-neutral-muted font-normal">(optional)</span></span>
            </label>
            <input
              id="meta-b2"
              type="text"
              value={secondaryBenefit}
              onChange={(e) => setSecondaryBenefit(e.target.value)}
              placeholder="e.g. breathable mesh and free returns"
              className="field"
            />
          </div>

          {/* Call to Action */}
          <div>
            <label htmlFor="meta-cta" className="field-label">
              <span>Call to Action (CTA)</span>
            </label>
            <input
              id="meta-cta"
              type="text"
              list="cta-suggestions"
              value={cta}
              onChange={(e) => setCta(e.target.value)}
              placeholder="e.g. Shop now or Learn more"
              className="field"
            />
            <datalist id="cta-suggestions">
              {CTA_OPTIONS.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>

          {/* Tone */}
          <div>
            <label htmlFor="meta-tone" className="field-label">
              <span>Tone of Voice</span>
            </label>
            <select
              id="meta-tone"
              value={tone}
              onChange={(e) => setTone(e.target.value as MetaDescriptionTone)}
              className="field"
            >
              {TONES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Target Length */}
          <div className="sm:col-span-2">
            <div className="flex items-center justify-between mb-1.5">
              <span className="field-label mb-0">Target Length Target</span>
              <span className="text-xs font-bold text-neutral-muted">{targetLength} characters</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {[140, 150, 155, 160].map((len) => (
                <button
                  key={len}
                  type="button"
                  onClick={() => setTargetLength(len)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-semibold border transition-colors ${
                    targetLength === len
                      ? "bg-brand text-white border-brand font-bold"
                      : "bg-surface-secondary text-neutral-secondary border-neutral-border hover:bg-surface-elevated hover:text-white"
                  }`}
                >
                  {len} chars {len === 155 ? "(Recommended)" : ""}
                </button>
              ))}
            </div>
          </div>
          {/* Generate Meta Title + Description Mode Toggle */}
          <div className="sm:col-span-2 rounded-xl border border-neutral-border bg-surface-secondary/70 p-3.5">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={generateTitle}
                onChange={(e) => setGenerateTitle(e.target.checked)}
                className="mt-0.5 rounded border-neutral-border text-brand focus:ring-brand bg-surface"
              />
              <div>
                <span className="text-xs font-bold text-ink">Generate Meta Title + Description Mode</span>
                <p className="mt-0.5 text-xs text-neutral-muted">
                  Simultaneously generates paired search titles and meta descriptions with synchronized SERP previews.
                </p>
              </div>
            </label>
          </div>
        </div>

        <div className="pt-2 border-t border-neutral-border flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-neutral-muted">
            Never keyword stuffed. Optimized for search snippets and click relevance.
          </p>

          <button
            type="button"
            onClick={handleGenerate}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Sparkles size={16} />
            <span>Generate 10+ Meta Descriptions</span>
          </button>
        </div>
      </section>

      {/* Empty State when no results */}
      {results.length === 0 && (
        <div className="rounded-2xl border border-dashed border-neutral-border bg-surface p-8 text-center sm:p-12">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand-light text-brand">
            <Eye size={20} />
          </div>
          <h3 className="mt-3 text-base font-bold text-navy">No meta descriptions generated yet</h3>
          <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-neutral-secondary">
            Fill in your page title, primary keyword, and core benefits above, then click &ldquo;Generate 10+ Meta Descriptions&rdquo; to view preview snippets.
          </p>
        </div>
      )}

      {/* Live SERP Snippet Preview Card */}
      {activeItem && (
        <section
          aria-label="Live Google SERP Preview"
          className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-neutral-border bg-surface p-5 shadow-sm sm:p-7 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-neutral-border pb-3">
            <div className="flex items-center gap-2">
              <Eye size={18} className="text-brand" />
              <h2 className="text-base font-bold text-ink">Live Google SERP Preview</h2>
            </div>
            <span className="text-xs text-neutral-muted">Desktop &amp; Mobile snippet view</span>
          </div>

          {/* SERP Mockup Box */}
          <div className="w-full min-w-0 max-w-2xl rounded-xl border border-neutral-border-strong bg-surface-secondary p-5 font-sans shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 text-xs text-neutral-secondary min-w-0">
              <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand text-[10px] font-bold text-white">
                Z
              </span>
              <span className="text-neutral-secondary font-medium shrink-0">example.com</span>
              <span className="text-neutral-muted truncate">› {pageTitle.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 25)}</span>
            </div>

            <h3 className="mt-1 text-lg font-medium text-[#7893FF] hover:underline cursor-pointer leading-snug break-words">
              {generateTitle && activeItem.metaTitle ? activeItem.metaTitle : `${pageTitle} | ${businessName || "Zenvuk"}`}
            </h3>

            <p className="mt-1 text-sm leading-relaxed text-[#B5C1D1] break-words">
              {activeItem.description}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-neutral-muted border-t border-neutral-border pt-2.5">
              <span>Snippet Length: <strong className="text-ink">{activeItem.characterCount}</strong> chars</span>
              {generateTitle && activeItem.metaTitle && (
                <>
                  <span>•</span>
                  <span>Title Length: <strong className="text-ink">{activeItem.titleCharCount}</strong> chars</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-muted">
            <Info size={14} className="shrink-0 text-brand" />
            <p>
              <strong className="text-ink">Note:</strong> Google may use the submitted meta description or may generate a different snippet depending on the search query and page content.
            </p>
          </div>
        </section>
      )}

      {/* Results List */}
      {results.length > 0 && (
        <section
          aria-label="Generated Meta Descriptions"
          className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-neutral-border bg-surface p-5 shadow-sm sm:p-7 space-y-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-border pb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-ink">
                Generated Descriptions ({displayedResults.length})
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

          <div className="grid gap-4">
            {displayedResults.map((item, idx) => {
              const isFav = favorites.has(item.id);
              const isCopied = copiedId === item.id;
              const isSelected = activePreviewId === item.id;

              return (
                <div
                  key={item.id}
                  className={`group relative rounded-xl border p-4 transition-all ${
                    isSelected
                      ? "border-brand bg-brand/[0.08] shadow-sm"
                      : "border-neutral-border bg-surface-secondary hover:border-[#3A5272]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-bold text-neutral-muted">#{idx + 1}</span>

                        <span
                          className={`rounded-full px-2 py-0.5 font-semibold text-[11px] ${
                            item.characterCount <= targetLength
                              ? "bg-state-success-bg text-state-success border border-[rgba(45,212,167,0.25)]"
                              : "bg-state-warning-bg text-state-warning border border-[rgba(251,191,36,0.25)]"
                          }`}
                        >
                          {item.characterCount} chars
                        </span>

                        {item.hasPrimaryKeyword && (
                          <span className="rounded-full bg-[rgba(56,189,248,0.10)] text-[#38BDF8] border border-[rgba(56,189,248,0.25)] px-2 py-0.5 font-semibold text-[11px]">
                            Keyword Match
                          </span>
                        )}

                        {item.hasCta && (
                          <span className="rounded-full bg-surface-elevated text-neutral-secondary border border-neutral-border px-2 py-0.5 font-semibold text-[11px]">
                            CTA Active
                          </span>
                        )}

                        <span className="text-neutral-muted">•</span>
                        <span className="font-semibold text-state-success">
                          Zenvuk Score: {item.score}/100
                        </span>
                      </div>

                      {item.metaTitle && (
                        <div className="mt-2 rounded-lg border border-neutral-border bg-surface-elevated p-2.5 text-xs">
                          <span className="font-bold text-[#7DD3FC] uppercase tracking-wider text-[10px] block mb-0.5">
                            Paired Meta Title ({item.titleCharCount} chars):
                          </span>
                          <span className="font-semibold text-white">{item.metaTitle}</span>
                        </div>
                      )}

                      <p className="mt-2 text-sm leading-relaxed text-[#F5F8FC] break-words">
                        {item.description}
                      </p>

                      <p className="mt-1 text-xs text-neutral-muted">
                        {item.reason}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => setActivePreviewId(item.id)}
                        className={`rounded-btn px-2.5 py-1 text-xs font-semibold border transition-colors ${
                          isSelected
                            ? "bg-brand text-white border-brand"
                            : "bg-surface-elevated text-neutral-secondary border-neutral-border hover:bg-surface hover:text-ink"
                        }`}
                        title="Preview in SERP snippet simulator"
                      >
                        Preview
                      </button>

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
                        aria-label="Copy description"
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

"use client";

import { useMemo, useState, useEffect } from "react";
import {
  Link2,
  Copy,
  ExternalLink,
  RotateCcw,
  Download,
  QrCode,
  History,
  Trash2,
  Search,
  Check,
  CheckCircle2,
  AlertCircle,
  Sliders,
  ShieldCheck
} from "lucide-react";
import {
  buildUtmUrl,
  validateAndBuildUtm,
  UTMValues,
  UTM_SOURCE_PRESETS,
  UTM_MEDIUM_PRESETS
} from "@/lib/generators/utm";
import { generateQrCodeSvg } from "@/lib/generators/qr-code";
import {
  loadUtmHistory,
  saveUtmHistoryItem,
  deleteUtmHistoryItem,
  clearUtmHistory,
  exportUtmHistoryCsv,
  UtmHistoryItem
} from "@/lib/storage/utm-history";
import { downloadCsv } from "@/lib/export/csv";
import { useToast } from "@/components/common/Toast";
import { trackEvent } from "@/lib/analytics";

const INITIAL_VALUES: UTMValues = {
  url: "https://example.com/landing-page",
  source: "newsletter",
  medium: "email",
  campaign: "spring-launch",
  term: "",
  content: "hero-cta-button"
};

export function UTMBuilderTool({
  onSummaryChange
}: {
  onSummaryChange?: (configuredCount: number, isValid: boolean) => void;
}) {
  const [values, setValues] = useState<UTMValues>(INITIAL_VALUES);
  const [history, setHistory] = useState<UtmHistoryItem[]>([]);
  const [historySearch, setHistorySearch] = useState("");
  const [showQrModal, setShowQrModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [historyCopiedId, setHistoryCopiedId] = useState<string | null>(null);
  const { showToast } = useToast();

  // Load history from localStorage on mount
  useEffect(() => {
    setHistory(loadUtmHistory());
  }, []);

  const validation = useMemo(() => validateAndBuildUtm(values), [values]);
  const finalUrl = validation.finalUrl;
  const configuredCount = validation.parametersCount;
  const isValid = validation.isValid;

  // Notify parent of summary info using primitive dependencies only
  useEffect(() => {
    if (onSummaryChange) {
      onSummaryChange(configuredCount, isValid);
    }
  }, [configuredCount, isValid, onSummaryChange]);

  const updateField = (field: keyof UTMValues, val: string) => {
    setValues((prev) => ({ ...prev, [field]: val }));
  };

  const handleCopy = async () => {
    if (!finalUrl) return;
    await navigator.clipboard.writeText(finalUrl);
    setCopied(true);
    showToast("Tagged campaign URL copied!");
    trackEvent("copy_result", { tool_name: "utm-builder" });

    // Save to browser history if valid
    if (validation.isValid) {
      const updated = saveUtmHistoryItem({
        url: values.url,
        source: values.source,
        medium: values.medium,
        campaign: values.campaign,
        term: values.term,
        content: values.content,
        finalUrl
      });
      setHistory(updated);
      trackEvent("utm_created", { tool_name: "utm-builder" });
    }

    setTimeout(() => setCopied(false), 1600);
  };

  const handleReset = () => {
    setValues({
      url: "",
      source: "",
      medium: "",
      campaign: "",
      term: "",
      content: ""
    });
    showToast("UTM builder reset");
  };

  const handleHistoryDelete = (id: string) => {
    const updated = deleteUtmHistoryItem(id);
    setHistory(updated);
    showToast("History item removed");
  };

  const handleHistoryClear = () => {
    clearUtmHistory();
    setHistory([]);
    showToast("Campaign history cleared");
  };

  const handleHistoryCopy = async (item: UtmHistoryItem) => {
    await navigator.clipboard.writeText(item.finalUrl);
    setHistoryCopiedId(item.id);
    showToast("Copied historical URL");
    setTimeout(() => setHistoryCopiedId(null), 1400);
  };

  const exportCurrentCsv = () => {
    if (!finalUrl) return;
    const headers = [
      "Target URL",
      "Source",
      "Medium",
      "Campaign",
      "Term",
      "Content",
      "Final Tagged URL"
    ];
    const rows = [
      [
        values.url,
        values.source,
        values.medium,
        values.campaign,
        values.term || "",
        values.content || "",
        finalUrl
      ]
    ];
    downloadCsv("campaign-tracking-url", headers, rows);
    showToast("Exported campaign CSV");
    trackEvent("download_csv", { tool_name: "utm-builder" });
  };

  const filteredHistory = history.filter((h) => {
    if (!historySearch.trim()) return true;
    const query = historySearch.toLowerCase();
    return (
      h.finalUrl.toLowerCase().includes(query) ||
      h.campaign.toLowerCase().includes(query) ||
      h.source.toLowerCase().includes(query)
    );
  });

  const qrSvg = useMemo(() => {
    if (!finalUrl) return "";
    return generateQrCodeSvg(finalUrl, 220);
  }, [finalUrl]);

  return (
    <div className="w-full min-w-0 max-w-full space-y-8">
      {/* Parameter Configuration Form */}
      <section
        aria-label="UTM Builder Inputs"
        className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-neutral-border bg-surface p-5 shadow-sm sm:p-7 space-y-6"
      >
        <div className="flex items-center justify-between border-b border-neutral-border pb-4">
          <div className="flex items-center gap-2">
            <Sliders size={18} className="text-brand" />
            <h2 className="text-base font-bold text-ink">Campaign Parameters</h2>
          </div>
          <span className="text-xs text-neutral-muted">Google Analytics 4 compatible</span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Target Website URL */}
          <div className="sm:col-span-2">
            <label htmlFor="utm-url" className="field-label">
              <span>Website Destination URL <span className="text-brand font-bold">*</span></span>
            </label>
            <input
              id="utm-url"
              type="url"
              value={values.url}
              onChange={(e) => updateField("url", e.target.value)}
              placeholder="https://yourwebsite.com/landing-page"
              className="field font-mono text-xs"
              required
            />
          </div>

          {/* Campaign Source */}
          <div>
            <div className="field-label">
              <span>Campaign Source (utm_source) <span className="text-brand font-bold">*</span></span>
              <span className="font-normal text-neutral-muted">Referrer</span>
            </div>
            <input
              id="utm-source"
              type="text"
              value={values.source}
              onChange={(e) => updateField("source", e.target.value)}
              placeholder="e.g. google, newsletter, linkedin"
              className="field"
              required
            />
            {/* Quick Presets */}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {UTM_SOURCE_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => updateField("source", preset)}
                  className={`rounded-btn px-2.5 py-1 text-[11px] font-medium border transition-colors ${
                    values.source === preset
                      ? "bg-brand text-white border-brand"
                      : "bg-surface-secondary text-neutral-secondary border-neutral-border hover:bg-surface-elevated hover:text-ink"
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Campaign Medium */}
          <div>
            <div className="field-label">
              <span>Campaign Medium (utm_medium) <span className="text-brand font-bold">*</span></span>
              <span className="font-normal text-neutral-muted">Channel</span>
            </div>
            <input
              id="utm-medium"
              type="text"
              value={values.medium}
              onChange={(e) => updateField("medium", e.target.value)}
              placeholder="e.g. cpc, email, social, referral"
              className="field"
              required
            />
            {/* Quick Presets */}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {UTM_MEDIUM_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => updateField("medium", preset)}
                  className={`rounded-btn px-2.5 py-1 text-[11px] font-medium border transition-colors ${
                    values.medium === preset
                      ? "bg-brand text-white border-brand"
                      : "bg-surface-secondary text-neutral-secondary border-neutral-border hover:bg-surface-elevated hover:text-ink"
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Campaign Name */}
          <div>
            <label htmlFor="utm-campaign" className="field-label">
              <span>Campaign Name (utm_campaign) <span className="text-brand font-bold">*</span></span>
            </label>
            <input
              id="utm-campaign"
              type="text"
              value={values.campaign}
              onChange={(e) => updateField("campaign", e.target.value)}
              placeholder="e.g. spring_sale, black_friday, product_launch"
              className="field"
              required
            />
          </div>

          {/* Campaign Term */}
          <div>
            <label htmlFor="utm-term" className="field-label">
              <span>Campaign Term (utm_term) <span className="text-neutral-muted font-normal">(optional keywords)</span></span>
            </label>
            <input
              id="utm-term"
              type="text"
              value={values.term || ""}
              onChange={(e) => updateField("term", e.target.value)}
              placeholder="e.g. running_shoes, accounting_software"
              className="field"
            />
          </div>

          {/* Campaign Content */}
          <div className="sm:col-span-2">
            <label htmlFor="utm-content" className="field-label">
              <span>Campaign Content (utm_content) <span className="text-neutral-muted font-normal">(optional A/B test or link placement)</span></span>
            </label>
            <input
              id="utm-content"
              type="text"
              value={values.content || ""}
              onChange={(e) => updateField("content", e.target.value)}
              placeholder="e.g. sidebar_banner, hero_button, blue_cta"
              className="field"
            />
          </div>
        </div>

        {/* Reset Action */}
        <div className="pt-2 border-t border-neutral-border flex items-center justify-between">
          <p className="text-xs text-neutral-muted">
            Maintains existing URL parameters and preserves hash fragments (#) at the end.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary inline-flex items-center gap-1.5"
          >
            <RotateCcw size={13} /> Reset Form
          </button>
        </div>
      </section>

      {/* Generated Live URL Card */}
      <section
        aria-label="Generated Campaign URL"
        className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-neutral-border bg-surface p-5 shadow-sm sm:p-7 space-y-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-border pb-3">
          <div className="flex items-center gap-2">
            <Link2 size={18} className="text-brand" />
            <h3 className="text-base font-bold text-ink">Generated Campaign URL</h3>
          </div>

          <div className="flex items-center gap-2">
            {validation.isValid ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-state-success-bg px-2.5 py-0.5 text-xs font-semibold text-state-success border border-[rgba(45,212,167,0.25)]">
                <CheckCircle2 size={13} /> Ready to Share
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-state-warning-bg px-2.5 py-0.5 text-xs font-semibold text-state-warning border border-[rgba(251,191,36,0.25)]">
                <AlertCircle size={13} /> Missing Required Fields
              </span>
            )}
          </div>
        </div>

        {/* Live URL Display Box: High contrast output card */}
        <div className="w-full min-w-0 max-w-full rounded-xl border border-[#1B2A3F] bg-[#050B14] p-4 font-mono text-xs leading-relaxed text-[#DCE5F1] break-all select-all overflow-x-auto">
          {finalUrl || "Enter a valid destination URL and parameters above..."}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!finalUrl}
              className="btn-primary inline-flex items-center gap-1.5"
            >
              {copied ? <Check size={14} className="text-state-success" /> : <Copy size={14} />}
              <span>{copied ? "Copied URL!" : "Copy Campaign URL"}</span>
            </button>

            {finalUrl && (
              <a
                href={finalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-1.5"
              >
                <ExternalLink size={13} />
                <span>Test Link</span>
              </a>
            )}

            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              disabled={!finalUrl}
              className="btn-secondary inline-flex items-center gap-1.5"
            >
              <QrCode size={13} />
              <span>QR Code</span>
            </button>
          </div>

          <button
            type="button"
            onClick={exportCurrentCsv}
            disabled={!finalUrl}
            className="btn-secondary inline-flex items-center gap-1.5"
          >
            <Download size={13} /> Export Single CSV
          </button>
        </div>
      </section>

      {/* QR Code Modal Dialog */}
      {showQrModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Campaign QR Code"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in"
        >
          <div className="relative w-full max-w-sm rounded-2xl bg-surface border border-neutral-border p-6 shadow-2xl text-center space-y-4">
            <h4 className="text-base font-bold text-ink">Campaign QR Code</h4>
            <p className="text-xs text-neutral-secondary">
              Generated offline in your browser. No external API was called.
            </p>

            <div
              className="flex justify-center p-3 bg-white rounded-xl mx-auto max-w-[220px]"
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="btn-primary flex-1 py-2.5 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* In-Browser Campaign History Section */}
      <section
        aria-label="Browser Campaign History"
        className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-neutral-border bg-surface p-5 shadow-sm sm:p-7 space-y-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-border pb-4">
          <div className="flex items-center gap-2">
            <History size={18} className="text-neutral-secondary" />
            <h3 className="text-base font-bold text-ink">
              Recent Campaign History ({history.length})
            </h3>
          </div>

          {history.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => exportUtmHistoryCsv(history)}
                className="btn-secondary inline-flex items-center gap-1 text-xs"
              >
                <Download size={12} /> Export All CSV
              </button>
              <button
                type="button"
                onClick={handleHistoryClear}
                className="btn-destructive inline-flex items-center gap-1 text-xs"
              >
                <Trash2 size={12} /> Clear All
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-neutral-secondary">
          <ShieldCheck size={14} className="text-state-success shrink-0" />
          <span>Campaign history is stored only in this browser and never sent to our servers.</span>
        </div>

        {history.length > 0 && (
          <div className="relative">
            <Search size={14} className="absolute left-3 top-3 text-neutral-muted" />
            <input
              type="text"
              value={historySearch}
              onChange={(e) => setHistorySearch(e.target.value)}
              placeholder="Search history by campaign or source..."
              className="field pl-9 text-xs"
            />
          </div>
        )}

        {filteredHistory.length === 0 ? (
          <p className="py-6 text-center text-xs text-neutral-muted">
            {history.length === 0
              ? "No saved campaign URLs yet. Copying a valid URL will record it here automatically."
              : "No historical campaigns match your search."}
          </p>
        ) : (
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {filteredHistory.map((item) => {
              const isCopied = historyCopiedId === item.id;
              return (
                <div
                  key={item.id}
                  className="w-full min-w-0 max-w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-neutral-border bg-surface-secondary p-3 text-xs"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-white">{item.campaign}</span>
                      <span className="rounded bg-surface-elevated px-1.5 py-0.5 border border-neutral-border text-[10px] text-neutral-secondary">
                        {item.source} / {item.medium}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-[11px] text-[#7DD3FC] truncate break-all">
                      {item.finalUrl}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleHistoryCopy(item)}
                      className="rounded-btn border border-neutral-border bg-surface-elevated px-2.5 py-1 text-xs font-semibold text-neutral-secondary hover:text-ink hover:border-neutral-border-strong transition-colors"
                    >
                      {isCopied ? "Copied" : "Copy"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHistoryDelete(item.id)}
                      aria-label="Delete entry"
                      className="rounded-btn p-1.5 text-neutral-muted hover:text-state-error hover:bg-state-error-bg transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

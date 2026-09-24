"use client";

import { useState, useMemo, useEffect } from "react";
import {
  ShieldAlert,
  Plus,
  Trash2,
  Copy,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Check,
  ShieldCheck,
  HelpCircle,
  FileCode
} from "lucide-react";
import {
  RobotsTxtData,
  RobotsRuleGroup,
  USER_AGENT_PRESETS,
  ROBOTS_PRESETS,
  generateRobotsTxt,
  validateRobotsTxt
} from "@/lib/generators/robots-txt";
import { useToast } from "@/components/common/Toast";
import { trackEvent } from "@/lib/analytics";

export function RobotsTxtTool({
  onSummaryChange
}: {
  onSummaryChange?: (groupCount: number, sitemapCount: number, hasWarning: boolean) => void;
}) {
  const [data, setData] = useState<RobotsTxtData>(ROBOTS_PRESETS.Default);
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const validation = useMemo(() => validateRobotsTxt(data), [data]);
  const robotsOutput = useMemo(() => generateRobotsTxt(data), [data]);

  useEffect(() => {
    if (onSummaryChange) {
      onSummaryChange(data.groups.length, data.sitemaps.length, validation.hasBlockAllWarning);
    }
  }, [data.groups.length, data.sitemaps.length, validation.hasBlockAllWarning, onSummaryChange]);

  const applyPreset = (key: keyof typeof ROBOTS_PRESETS) => {
    setData(ROBOTS_PRESETS[key]);
    showToast(`Loaded ${key} robots.txt template`);
    trackEvent("robots_preset_applied", { tool_name: "robots-txt-generator", preset: key });
  };

  const addGroup = () => {
    const newGroup: RobotsRuleGroup = {
      id: Math.random().toString(36).substring(2, 9),
      userAgent: "Googlebot",
      allow: ["/"],
      disallow: []
    };
    setData((prev) => ({ ...prev, groups: [...prev.groups, newGroup] }));
    showToast("Added new crawler group");
  };

  const removeGroup = (gIdx: number) => {
    if (data.groups.length <= 1) {
      showToast("Must have at least one user-agent rule group", "error");
      return;
    }
    setData((prev) => {
      const next = [...prev.groups];
      next.splice(gIdx, 1);
      return { ...prev, groups: next };
    });
  };

  const updateGroupUa = (gIdx: number, userAgent: string) => {
    setData((prev) => {
      const next = [...prev.groups];
      if (next[gIdx]) next[gIdx] = { ...next[gIdx], userAgent };
      return { ...prev, groups: next };
    });
  };

  const updateGroupPaths = (gIdx: number, field: "allow" | "disallow", textValue: string) => {
    const paths = textValue.split("\n").map((p) => p.trim()).filter(Boolean);
    setData((prev) => {
      const next = [...prev.groups];
      if (next[gIdx]) next[gIdx] = { ...next[gIdx], [field]: paths };
      return { ...prev, groups: next };
    });
  };

  const updateSitemaps = (textValue: string) => {
    const sitemaps = textValue.split("\n").map((s) => s.trim()).filter(Boolean);
    setData((prev) => ({ ...prev, sitemaps }));
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(robotsOutput);
    setCopied(true);
    showToast("Copied robots.txt to clipboard!");
    trackEvent("copy_result", { tool_name: "robots-txt-generator" });
    setTimeout(() => setCopied(false), 1600);
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([robotsOutput], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "robots.txt";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast("Downloaded robots.txt");
      trackEvent("download_file", { tool_name: "robots-txt-generator" });
    } catch {
      showToast("Download failed", "error");
    }
  };

  const handleReset = () => {
    setData(ROBOTS_PRESETS.Default);
    showToast("Reset to default configuration");
  };

  return (
    <div className="w-full min-w-0 max-w-full space-y-8">
      {/* Catastrophic Block Warning if Disallow: / on * */}
      {validation.hasBlockAllWarning && (
        <div className="rounded-2xl border-2 border-rose-500 bg-rose-50 p-5 text-rose-950 flex items-start gap-3 shadow-md animate-pulse">
          <AlertTriangle size={24} className="text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-rose-900">
              CRITICAL: Your Entire Site Is Blocked From Search Engines
            </h3>
            <p className="text-xs leading-relaxed text-rose-800">
              Setting <code className="font-mono bg-rose-100 px-1 py-0.5 rounded font-bold">Disallow: /</code> under <code className="font-mono bg-rose-100 px-1 py-0.5 rounded font-bold">User-agent: *</code> commands all compliant search engine bots (including Googlebot and Bingbot) not to crawl any page on your website. Only use this for private staging environments!
            </p>
          </div>
        </div>
      )}

      {/* Preset Selector Banner */}
      <section
        aria-label="Preset Selector"
        className="w-full min-w-0 max-w-full rounded-2xl border border-neutral-border bg-surface p-5 shadow-sm sm:p-7 space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-border pb-3">
          <div>
            <h2 className="text-base font-bold text-ink">Configuration Presets</h2>
            <p className="text-xs text-neutral-secondary">Fast-start templates for standard web architectures.</p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary inline-flex items-center gap-1"
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(["Default", "WordPress", "Ecommerce", "AllowAll", "BlockAll"] as const).map((presetKey) => (
            <button
              key={presetKey}
              type="button"
              onClick={() => applyPreset(presetKey)}
              className={`rounded-btn px-3.5 py-1.5 text-xs font-semibold border transition-all ${
                presetKey === "BlockAll"
                  ? "bg-state-error-bg text-state-error border-[rgba(251,113,133,0.35)] hover:bg-[rgba(251,113,133,0.20)]"
                  : "bg-surface-secondary text-neutral-secondary border-neutral-border hover:bg-surface-elevated hover:text-ink"
              }`}
            >
              {presetKey === "AllowAll"
                ? "Allow All Bots"
                : presetKey === "BlockAll"
                ? "Block All (Staging)"
                : `${presetKey} Standard`}
            </button>
          ))}
        </div>
      </section>

      {/* Crawler Rule Groups */}
      <section
        aria-label="Crawler Groups"
        className="w-full min-w-0 max-w-full rounded-2xl border border-neutral-border bg-surface p-5 shadow-sm sm:p-7 space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-border pb-4">
          <div>
            <h2 className="text-base font-bold text-ink">Crawler Directives (User-Agent Groups)</h2>
            <p className="text-xs text-neutral-secondary mt-0.5">Control which directories search bots may or may not crawl.</p>
          </div>
          <button
            type="button"
            onClick={addGroup}
            className="btn-primary inline-flex items-center gap-1.5"
          >
            <Plus size={13} /> Add Crawler Rule
          </button>
        </div>

        <div className="space-y-5">
          {data.groups.map((group, gIdx) => (
            <div
              key={group.id}
              className="rounded-xl border border-neutral-border bg-surface-secondary p-4 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-border pb-3">
                <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                  <span className="text-xs font-bold text-neutral-secondary shrink-0">User-agent:</span>
                  <input
                    type="text"
                    value={group.userAgent}
                    onChange={(e) => updateGroupUa(gIdx, e.target.value)}
                    placeholder="e.g. * or Googlebot"
                    className="field py-1 text-xs font-mono font-bold"
                  />
                  {/* Preset quick buttons */}
                  <div className="hidden sm:flex items-center gap-1 shrink-0">
                    {USER_AGENT_PRESETS.slice(0, 4).map((ua) => (
                      <button
                        key={ua}
                        type="button"
                        onClick={() => updateGroupUa(gIdx, ua)}
                        className={`rounded px-1.5 py-0.5 text-[10px] font-mono border ${
                          group.userAgent === ua ? "bg-brand text-white border-brand" : "bg-surface-elevated text-neutral-secondary border-neutral-border hover:text-ink"
                        }`}
                      >
                        {ua}
                      </button>
                    ))}
                  </div>
                </div>

                {data.groups.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeGroup(gIdx)}
                    className="text-neutral-muted hover:text-state-error p-1"
                    title="Delete Crawler Group"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>

              {/* Allow and Disallow paths side-by-side */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="field-label">
                    <span className="text-emerald-700 font-bold">Allow Paths (one per line)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={group.allow.join("\n")}
                    onChange={(e) => updateGroupPaths(gIdx, "allow", e.target.value)}
                    placeholder="/&#10;/public/&#10;/wp-admin/admin-ajax.php"
                    className="field font-mono text-xs"
                  />
                  <p className="mt-1 text-[11px] text-neutral-muted">Explicitly permitted paths or subdirectories.</p>
                </div>

                <div>
                  <label className="field-label">
                    <span className="text-rose-400 font-bold">Disallow Paths (one per line)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={group.disallow.join("\n")}
                    onChange={(e) => updateGroupPaths(gIdx, "disallow", e.target.value)}
                    placeholder="/admin/&#10;/checkout&#10;/*?*sort="
                    className="field font-mono text-xs"
                  />
                  <p className="mt-1 text-[11px] text-neutral-muted">Restricted paths excluded from crawling.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sitemaps Configuration */}
      <section
        aria-label="Sitemaps"
        className="w-full min-w-0 max-w-full rounded-2xl border border-neutral-border bg-surface p-5 shadow-sm sm:p-7 space-y-3"
      >
        <div className="flex items-center justify-between border-b border-neutral-border pb-3">
          <h2 className="text-base font-bold text-ink">XML Sitemap Directives</h2>
          <span className="text-xs text-neutral-muted">Appended to the bottom of robots.txt</span>
        </div>

        <label className="field-label"><span>Sitemap URLs (one per line)</span></label>
        <textarea
          rows={2}
          value={data.sitemaps.join("\n")}
          onChange={(e) => updateSitemaps(e.target.value)}
          placeholder="https://zenvuk.com/sitemap.xml&#10;https://zenvuk.com/sitemap-news.xml"
          className="field font-mono text-xs"
        />
        <p className="text-[11px] text-neutral-muted">
          Search engines use these directives to discover your site hierarchy without third-party pinging.
        </p>
      </section>

      {/* Validation Panel */}
      {(!validation.isValid || validation.warnings.length > 0) && (
        <section
          aria-label="Robots.txt Validation"
          className="rounded-2xl border border-[rgba(251,191,36,0.35)] bg-state-warning-bg p-5 shadow-sm space-y-2 text-xs"
        >
          <div className="flex items-center justify-between border-b border-[rgba(251,191,36,0.20)] pb-2">
            <span className="font-bold uppercase tracking-wider text-state-warning flex items-center gap-1.5">
              {validation.isValid ? (
                <CheckCircle2 size={14} className="text-state-success" />
              ) : (
                <AlertTriangle size={14} className="text-state-warning" />
              )}
              Syntax &amp; Safety Checks
            </span>
          </div>

          {validation.errors.map((err, i) => (
            <p key={i} className="text-state-error font-medium">• {err}</p>
          ))}
          {validation.warnings.map((warn, i) => (
            <p key={i} className="text-state-warning">• {warn}</p>
          ))}
        </section>
      )}

      {/* Live Preview Box */}
      <section
        aria-label="Generated robots.txt"
        className="w-full min-w-0 max-w-full rounded-2xl border border-[#1B2A3F] bg-[#050B14] p-5 shadow-sm text-white space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1B2A3F] pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-brand" />
            <h3 className="text-sm font-bold text-white">robots.txt Live Output</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="btn-secondary inline-flex items-center gap-1.5 text-xs"
            >
              {copied ? <Check size={13} className="text-state-success" /> : <Copy size={13} />}
              <span>{copied ? "Copied!" : "Copy robots.txt"}</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="btn-primary inline-flex items-center gap-1.5 text-xs"
            >
              <Download size={13} />
              <span>Download robots.txt</span>
            </button>
          </div>
        </div>

        <div className="w-full min-w-0 max-w-full rounded-xl bg-[#091525] border border-[#273A53] p-4 font-mono text-xs leading-relaxed text-[#DCE5F1] overflow-x-auto select-all">
          <pre>{robotsOutput}</pre>
        </div>

        <p className="text-[11px] text-neutral-muted">
          Upload this file to the root of your domain at <code className="text-[#7DD3FC]">https://yourdomain.com/robots.txt</code>.
        </p>
      </section>
    </div>
  );
}

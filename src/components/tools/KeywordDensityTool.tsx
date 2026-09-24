"use client";

import { useState } from "react";
import {
  analyzeKeywordDensity,
  KeywordDensityResult,
} from "@/lib/generators/keyword-density";
import { BarChart3, Filter, Clock, BookOpen, Hash, RefreshCw, AlertTriangle } from "lucide-react";

const SAMPLE_TEXT = `Modern search engine optimization requires balancing content depth, topical authority, and technical performance. Search engines evaluate keyword frequency, contextual synonyms, and user intent rather than archaic exact-match keyword quotas. When optimizing web pages, analyze n-gram phrase patterns to identify natural keyword distributions and prevent over-optimization penalties. Technical SEO, structured data markup, and page speed form the foundation of organic search visibility.`;

export function KeywordDensityTool() {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [includeStopWords, setIncludeStopWords] = useState(false);
  const [minWordLength, setMinWordLength] = useState(3);
  const [activeTab, setActiveTab] = useState<"1-gram" | "2-gram" | "3-gram" | "4-gram">("1-gram");

  const result: KeywordDensityResult = analyzeKeywordDensity(text, {
    includeStopWords,
    minWordLength,
    topLimit: 15,
  });

  const getActiveList = () => {
    switch (activeTab) {
      case "1-gram":
        return result.unigrams;
      case "2-gram":
        return result.bigrams;
      case "3-gram":
        return result.trigrams;
      case "4-gram":
        return result.fourgrams;
    }
  };

  const activeList = getActiveList();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Editor & Configuration Column (Left) */}
      <div className="lg:col-span-6 bg-surface p-6 rounded-2xl border border-neutral-border shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-border">
          <h2 className="text-lg font-bold text-ink">Text Content &amp; Filters</h2>
          <button
            onClick={() => setText(SAMPLE_TEXT)}
            className="btn-secondary inline-flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Load Sample
          </button>
        </div>

        {/* Text Input */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="field-label !mb-0">
              Paste Copy / Article Text
            </label>
            <span className="text-xs font-mono text-neutral-muted">
              {result.totalWords} words ({text.length} chars)
            </span>
          </div>
          <textarea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="field-textarea"
            placeholder="Paste your blog post, product copy, or article text here..."
          />
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-neutral-border">
          <div>
            <label className="field-label">
              Minimum Word Length
            </label>
            <select
              value={minWordLength}
              onChange={(e) => setMinWordLength(parseInt(e.target.value, 10))}
              className="field text-xs"
            >
              <option value="2">2 characters</option>
              <option value="3">3 characters (recommended)</option>
              <option value="4">4 characters</option>
              <option value="5">5 characters</option>
            </select>
          </div>

          <div className="flex flex-col justify-end">
            <label className="flex items-center gap-2 cursor-pointer pb-2">
              <input
                type="checkbox"
                checked={includeStopWords}
                onChange={(e) => setIncludeStopWords(e.target.checked)}
                className="w-4 h-4 text-brand rounded border-neutral-border-strong bg-surface-secondary focus:ring-brand"
              />
              <span className="text-xs text-neutral-secondary font-medium">Include Stop Words</span>
            </label>
          </div>
        </div>

        {/* Overview Stats Badges */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="p-3 bg-surface-secondary rounded-xl border border-neutral-border text-center">
            <span className="text-[11px] text-neutral-muted block uppercase font-medium">Total Words</span>
            <span className="text-lg font-bold text-ink">{result.totalWords}</span>
          </div>
          <div className="p-3 bg-surface-secondary rounded-xl border border-neutral-border text-center">
            <span className="text-[11px] text-neutral-muted block uppercase font-medium">Unique Words</span>
            <span className="text-lg font-bold text-ink">{result.uniqueWords}</span>
          </div>
          <div className="p-3 bg-surface-secondary rounded-xl border border-neutral-border text-center">
            <span className="text-[11px] text-neutral-muted block uppercase font-medium">Reading Time</span>
            <span className="text-lg font-bold text-ink">~{result.readingTimeMinutes}m</span>
          </div>
        </div>
      </div>

      {/* N-Gram Analysis Results (Right Column) */}
      <div className="lg:col-span-6 space-y-6">
        {/* N-Gram Selector Tabs */}
        <div className="bg-surface p-4 rounded-2xl border border-neutral-border flex items-center justify-between">
          <span className="text-sm font-bold text-ink">N-Gram Frequency Breakdown</span>
          <div className="inline-flex rounded-lg bg-canvas p-1 border border-neutral-border">
            {(["1-gram", "2-gram", "3-gram", "4-gram"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition ${
                  activeTab === tab
                    ? "bg-brand text-white shadow-sm"
                    : "text-neutral-muted hover:text-ink"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Density Table */}
        <div className="bg-surface rounded-2xl border border-neutral-border overflow-hidden">
          {activeList.length === 0 ? (
            <div className="p-8 text-center text-neutral-muted text-sm">
              No matching {activeTab} phrases detected. Add more text to analyze.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-secondary text-neutral-secondary border-b border-neutral-border">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Phrase ({activeTab})</th>
                    <th className="py-3 px-3 font-semibold text-center">Count</th>
                    <th className="py-3 px-4 font-semibold text-right">Density (%)</th>
                    <th className="py-3 px-4 font-semibold text-center">Density Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-border/50">
                  {activeList.map((item, idx) => {
                    const isHigh = item.density > 3.0;
                    return (
                      <tr key={idx} className="hover:bg-surface-secondary/60 transition">
                        <td className="py-2.5 px-4 font-medium text-ink font-mono text-xs">
                          {item.phrase}
                        </td>
                        <td className="py-2.5 px-3 text-center text-neutral-secondary font-mono">
                          {item.count}
                        </td>
                        <td className="py-2.5 px-4 text-right font-mono font-semibold text-brand-cyan">
                          {item.density}%
                        </td>
                        <td className="py-2.5 px-4 text-center">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                              isHigh
                                ? "bg-[rgba(251,191,36,0.10)] text-[#FCD34D] border-[rgba(251,191,36,0.25)]"
                                : "bg-[rgba(45,212,167,0.10)] text-[#5EE0BA] border-[rgba(45,212,167,0.25)]"
                            }`}
                          >
                            {isHigh ? "Elevated" : "Natural"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quality Advisory Callout */}
        <div className="bg-[rgba(91,124,255,0.08)] border border-[rgba(91,124,255,0.20)] rounded-2xl p-4 text-xs text-neutral-secondary flex items-start gap-2.5">
          <BookOpen className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-ink font-semibold">SEO Recommendation:</strong> There is no official &quot;target keyword density&quot; required by Google. Modern search algorithms prioritize comprehensive topical coverage and semantic relevance. If an individual keyword exceeds 3.5% density, review your text to ensure natural readability.
          </div>
        </div>
      </div>
    </div>
  );
}

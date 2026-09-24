"use client";

import { useMemo, useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  CopyPlus,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import {
  FAQItem,
  validateFAQItems,
  generateFAQSchemaJson
} from "@/lib/generators/faq-schema";
import { CodePreview } from "@/components/common/CodePreview";
import { useToast } from "@/components/common/Toast";
import { trackEvent } from "@/lib/analytics";

const createFreshItem = (): FAQItem => ({
  id: `faq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
  question: "",
  answer: ""
});

const DEFAULT_SAMPLE_ITEMS: FAQItem[] = [
  {
    id: "sample-1",
    question: "What is FAQ schema markup?",
    answer:
      "FAQ schema is a specialized Schema.org structured data format (FAQPage) that tells search engines your page contains a list of frequently asked questions and their corresponding answers."
  },
  {
    id: "sample-2",
    question: "Does FAQ schema guarantee rich results on Google?",
    answer:
      "No. Structured data helps search engines understand your content, but Google and other search engines algorithmically decide whether to display rich result snippets based on authority, query intent, and site quality."
  }
];

export function FAQSchemaTool({
  onSummaryUpdate
}: {
  onSummaryUpdate?: (validCount: number, totalCount: number, hasErrors: boolean) => void;
}) {
  const [items, setItems] = useState<FAQItem[]>(DEFAULT_SAMPLE_ITEMS);
  const [minified, setMinified] = useState(false);
  const [includeScriptTag, setIncludeScriptTag] = useState(true);
  const [touched, setTouched] = useState(false);
  const { showToast } = useToast();

  const validation = useMemo(() => validateFAQItems(items), [items]);

  // Safely notify parent summary using primitive dependencies only
  const { validCount, totalCount, isValid } = validation;
  const hasErrors = !isValid && touched;

  useEffect(() => {
    if (onSummaryUpdate) {
      onSummaryUpdate(validCount, totalCount, hasErrors);
    }
  }, [validCount, totalCount, hasErrors, onSummaryUpdate]);

  const jsonOutput = useMemo(() => {
    return generateFAQSchemaJson(items, { minified, includeScriptTag });
  }, [items, minified, includeScriptTag]);

  const htmlOutput = useMemo(() => {
    return generateFAQSchemaJson(items, { minified: false, includeScriptTag: true });
  }, [items]);

  // Update item field
  const updateItem = (id: string, field: "question" | "answer", val: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: val } : it))
    );
  };

  // Add new item
  const addItem = () => {
    const fresh = createFreshItem();
    setItems((prev) => [...prev, fresh]);
    showToast("Added new FAQ entry");
    trackEvent("tool_started", { tool_name: "faq-schema-generator" });
  };

  // Duplicate item
  const duplicateItem = (index: number) => {
    const target = items[index];
    if (!target) return;
    const duplicated: FAQItem = {
      ...target,
      id: `faq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
    };
    const updated = [...items];
    updated.splice(index + 1, 0, duplicated);
    setItems(updated);
    showToast("FAQ entry duplicated");
  };

  // Move item up
  const moveUp = (index: number) => {
    if (index === 0) return;
    setItems((prev) => {
      const next = [...prev];
      const temp = next[index - 1];
      next[index - 1] = next[index];
      next[index] = temp;
      return next;
    });
  };

  // Move item down
  const moveDown = (index: number) => {
    if (index === items.length - 1) return;
    setItems((prev) => {
      const next = [...prev];
      const temp = next[index + 1];
      next[index + 1] = next[index];
      next[index] = temp;
      return next;
    });
  };

  // Remove item
  const removeItem = (id: string) => {
    if (items.length === 1) {
      setItems([createFreshItem()]);
    } else {
      setItems((prev) => prev.filter((it) => it.id !== id));
    }
    showToast("FAQ item removed");
  };

  // Clear all
  const clearAll = () => {
    setItems([createFreshItem()]);
    setTouched(false);
    showToast("All FAQ items cleared");
  };

  return (
    <div className="w-full min-w-0 max-w-full space-y-6">
      {/* Visual Validation Status Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-neutral-border bg-surface p-4 shadow-sm w-full min-w-0 max-w-full">
        <div className="flex items-center gap-3 min-w-0">
          {validation.isValid ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-state-success-bg px-3 py-1 text-xs font-bold text-state-success border border-[rgba(45,212,167,0.25)] shrink-0">
              <CheckCircle2 size={14} /> Valid Schema
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-state-error-bg px-3 py-1 text-xs font-bold text-state-error border border-[rgba(251,113,133,0.25)] shrink-0">
              <AlertCircle size={14} /> Fix Errors
            </span>
          )}
          <span className="text-xs text-neutral-secondary truncate">
            {validation.validCount} of {validation.totalCount} question{items.length === 1 ? "" : "s"} ready
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={addItem}
            className="btn-secondary inline-flex items-center gap-1.5"
          >
            <Plus size={14} /> Add FAQ
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="btn-secondary inline-flex items-center gap-1.5"
          >
            <RotateCcw size={13} /> Reset
          </button>
        </div>
      </div>

      {/* Editor & Preview Grid: Desktop approximately 35% / 65% ratio, Mobile stacked */}
      <div className="grid gap-6 lg:grid-cols-[minmax(300px,0.7fr)_minmax(0,1.3fr)] w-full min-w-0 max-w-full items-start">
        {/* Left: Input Form (FAQ editor: 38%) */}
        <section
          aria-label="FAQ Questions and Answers Editor"
          className="w-full min-w-0 max-w-full rounded-2xl border border-neutral-border bg-surface p-4 sm:p-6 shadow-sm space-y-5"
        >
          <div className="flex items-center justify-between border-b border-neutral-border pb-3">
            <h2 className="text-sm sm:text-base font-bold text-ink">Questions and Answers</h2>
            <span className="text-xs text-neutral-muted">{items.length} question{items.length === 1 ? "" : "s"}</span>
          </div>

          <div className="space-y-4 w-full min-w-0 max-w-full">
            {items.map((item, index) => {
              const qLen = item.question.length;
              const aLen = item.answer.length;
              const isInvalid = touched && (!item.question.trim() || !item.answer.trim());

              return (
                <div
                  key={item.id}
                  className={`w-full min-w-0 max-w-full rounded-xl border p-4 transition-all ${
                    isInvalid
                      ? "border-[rgba(251,113,133,0.35)] bg-state-error-bg"
                      : "border-neutral-border bg-surface-secondary hover:border-[#3A5272]"
                  }`}
                >
                  {/* Top Bar for each item */}
                  <div className="mb-3 flex items-center justify-between border-b border-neutral-border pb-2 text-xs text-neutral-secondary">
                    <span className="font-bold text-ink">FAQ #{index + 1}</span>

                    <div className="flex items-center gap-1">
                      {/* Reorder Buttons */}
                      <button
                        type="button"
                        onClick={() => moveUp(index)}
                        disabled={index === 0}
                        aria-label={`Move FAQ ${index + 1} up`}
                        className="rounded-btn p-1 text-neutral-muted hover:bg-surface-elevated hover:text-ink disabled:opacity-30 transition-colors"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveDown(index)}
                        disabled={index === items.length - 1}
                        aria-label={`Move FAQ ${index + 1} down`}
                        className="rounded-btn p-1 text-neutral-muted hover:bg-surface-elevated hover:text-ink disabled:opacity-30 transition-colors"
                      >
                        <ArrowDown size={14} />
                      </button>

                      {/* Duplicate */}
                      <button
                        type="button"
                        onClick={() => duplicateItem(index)}
                        aria-label={`Duplicate FAQ ${index + 1}`}
                        className="rounded-btn p-1 text-neutral-muted hover:bg-surface-elevated hover:text-ink transition-colors"
                        title="Duplicate"
                      >
                        <CopyPlus size={14} />
                      </button>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove FAQ ${index + 1}`}
                        className="rounded-btn p-1 text-state-error hover:bg-state-error-bg transition-colors"
                        title="Remove"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Question Input: full card width */}
                  <div className="w-full min-w-0">
                    <label
                      htmlFor={`faq-question-${item.id}`}
                      className="field-label"
                    >
                      <span>Question</span>
                      <span className="font-normal text-neutral-muted">{qLen}/180</span>
                    </label>
                    <input
                      id={`faq-question-${item.id}`}
                      type="text"
                      maxLength={180}
                      value={item.question}
                      onChange={(e) => updateItem(item.id, "question", e.target.value)}
                      placeholder="e.g. How long does standard delivery take?"
                      className="field w-full min-w-0"
                    />
                  </div>

                  {/* Answer Input: full card width, normal wrapping */}
                  <div className="mt-3 w-full min-w-0">
                    <label
                      htmlFor={`faq-answer-${item.id}`}
                      className="field-label"
                    >
                      <span>Answer</span>
                      <span className="font-normal text-neutral-muted">{aLen}/1500</span>
                    </label>
                    <textarea
                      id={`faq-answer-${item.id}`}
                      maxLength={1500}
                      rows={3}
                      value={item.answer}
                      onChange={(e) => updateItem(item.id, "answer", e.target.value)}
                      placeholder="e.g. Orders typically ship within 1-2 business days with full online tracking."
                      className="field w-full min-w-0 min-h-24 resize-y leading-relaxed whitespace-normal break-words"
                    />
                  </div>

                  {isInvalid && (
                    <p className="mt-2 text-xs font-medium text-state-error flex items-center gap-1">
                      <AlertCircle size={12} className="shrink-0" />
                      <span>Please enter both question and answer.</span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-border">
            <button
              type="button"
              onClick={addItem}
              className="btn-secondary inline-flex items-center gap-1.5"
            >
              <Plus size={14} /> Add Another Question
            </button>

            <button
              type="button"
              onClick={() => {
                setTouched(true);
                showToast(
                  validation.isValid
                    ? "Schema verified successfully!"
                    : "Please fix required fields",
                  validation.isValid ? "success" : "error"
                );
              }}
              className="btn-primary inline-flex items-center gap-2"
            >
              <CheckCircle2 size={14} /> Verify Schema
            </button>
          </div>
        </section>

        {/* Right: Code Preview & Output (Uses contained CodePreview component) */}
        <div className="w-full min-w-0 max-w-full overflow-hidden">
          <CodePreview
            code={jsonOutput}
            htmlCode={htmlOutput}
            title="Live JSON-LD Preview"
            minified={minified}
            onMinifiedChange={setMinified}
            includeScriptTag={includeScriptTag}
            onIncludeScriptTagChange={setIncludeScriptTag}
            downloadFilename="faq-schema.json"
            toolName="faq-schema-generator"
            note="Paste the generated snippet into the <head> of your HTML, or paste the pure JSON object into your CMS SEO plugin. Search engines evaluate markup per page intent."
          />
        </div>
      </div>
    </div>
  );
}

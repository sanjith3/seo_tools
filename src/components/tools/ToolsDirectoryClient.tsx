"use client";

import { useState, useMemo } from "react";
import { Search, Filter, X } from "lucide-react";
import { toolsRegistry, ToolCategory, ToolDefinition } from "@/config/tools";
import { ToolCard } from "@/components/ToolCard";

export type FilterCategory =
  | "All"
  | "Technical SEO"
  | "Structured Data"
  | "Metadata"
  | "Ecommerce"
  | "Marketing"
  | "Content Analysis"
  | "AI / Machine Readability";

const CATEGORIES: FilterCategory[] = [
  "All",
  "Technical SEO",
  "Structured Data",
  "Metadata",
  "Ecommerce",
  "Marketing",
  "Content Analysis",
  "AI / Machine Readability"
];

export function ToolsDirectoryClient() {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = useMemo(() => {
    return toolsRegistry.filter((tool) => {
      let matchesCategory = false;
      if (selectedCategory === "All") {
        matchesCategory = true;
      } else if (selectedCategory === "Technical SEO") {
        matchesCategory = tool.category === "Technical SEO";
      } else if (selectedCategory === "Structured Data") {
        matchesCategory = tool.category === "Structured Data";
      } else if (selectedCategory === "Metadata") {
        matchesCategory = tool.category === "Metadata & Social";
      } else if (selectedCategory === "Ecommerce") {
        matchesCategory = tool.category === "Ecommerce Tools";
      } else if (selectedCategory === "Marketing") {
        matchesCategory = tool.category === "Marketing Tools";
      } else if (selectedCategory === "Content Analysis") {
        matchesCategory = tool.category === "Content Analysis";
      } else if (selectedCategory === "AI / Machine Readability") {
        matchesCategory = tool.category === "AI / Machine Readability";
      }

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.targetKeyword.toLowerCase().includes(q) ||
        tool.supportingTopics.some((topic) => topic.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-border pb-6">
        {/* Category filter chips */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-btn px-3.5 py-1.5 text-xs font-semibold border transition-all ${
                selectedCategory === cat
                  ? "bg-brand text-white border-brand shadow-sm"
                  : "bg-surface-secondary text-neutral-secondary border-neutral-border hover:border-neutral-border-strong hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input with clear button */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search size={14} className="absolute left-3.5 top-3 text-neutral-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools or topics..."
            className="field pl-9 pr-8 text-xs h-[40px] rounded-btn"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-2.5 text-neutral-muted hover:text-ink transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Results Count & Current Filter */}
      <div className="flex items-center justify-between text-xs text-neutral-muted">
        <span>
          Showing <strong className="text-navy">{filteredTools.length}</strong> of{" "}
          {toolsRegistry.length} utilities
        </span>
        {selectedCategory !== "All" && (
          <button
            onClick={() => setSelectedCategory("All")}
            className="text-brand hover:underline font-semibold"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* Responsive Tools Grid: 3 cols desktop, 2 cols tablet, 1 col mobile */}
      {filteredTools.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="rounded-card border border-neutral-border bg-surface p-12 text-center">
          <p className="text-sm font-bold text-navy">No utilities match your search</p>
          <p className="mt-1 text-xs text-neutral-secondary">
            Try adjusting your search query or reset the category filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="btn-secondary mt-4 h-9 text-xs"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

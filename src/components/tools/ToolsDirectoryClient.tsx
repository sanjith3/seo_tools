"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X, Layers, ArrowRight } from "lucide-react";
import { toolsRegistry } from "@/config/tools";
import { ToolCard } from "@/components/ToolCard";
import { getAllCategories } from "@/config/categories";

export function ToolsDirectoryClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const categories = getAllCategories();

  const filteredTools = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return toolsRegistry;

    return toolsRegistry.filter((tool) => {
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.targetKeyword.toLowerCase().includes(q) ||
        tool.supportingTopics.some((topic) => topic.toLowerCase().includes(q))
      );
    });
  }, [searchQuery]);

  return (
    <div className="space-y-8">
      {/* Category Links & Search Bar */}
      <div className="flex flex-col gap-6 border-b border-[#22344C] pb-6">
        {/* Canonical category navigation buttons (actual HTML links for SEO and accessibility) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-btn px-4 py-2 text-xs font-semibold bg-[#5B7CFF] text-white shadow-sm border border-[#5B7CFF]">
              All Tools ({toolsRegistry.length})
            </span>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/tools/${cat.slug}/`}
                className="rounded-btn px-4 py-2 text-xs font-medium bg-[#111F32] text-[#B5C1D1] border border-[#22344C] hover:border-[#5B7CFF] hover:text-[#F5F8FC] transition-all inline-flex items-center gap-1.5"
              >
                <span>{cat.name}</span>
                <span className="text-[10px] text-[#7F8DA3]">({cat.toolSlugs.length})</span>
              </Link>
            ))}
          </div>

          {/* Search input with clear button */}
          <div className="relative w-full sm:w-72 shrink-0">
            <Search size={14} className="absolute left-3.5 top-3 text-[#7F8DA3]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter utilities or keywords..."
              className="field pl-9 pr-8 text-xs h-[40px] rounded-btn w-full bg-[#0D1A2B] border-[#22344C] text-[#F5F8FC] focus:border-[#5B7CFF]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2.5 text-[#7F8DA3] hover:text-[#F5F8FC] transition-colors"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-[#7F8DA3]">
        <span>
          Showing <strong className="text-[#F5F8FC]">{filteredTools.length}</strong> of{" "}
          {toolsRegistry.length} utilities
        </span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-[#5B7CFF] hover:underline font-semibold"
          >
            Clear search
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
        <div className="rounded-card border border-[#22344C] bg-[#0D1A2B] p-12 text-center">
          <p className="text-sm font-bold text-[#F5F8FC]">No utilities match your search</p>
          <p className="mt-1 text-xs text-[#B5C1D1]">
            Try adjusting your search query or reset the search field.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="btn-secondary mt-4 h-9 text-xs px-4"
          >
            Reset Search
          </button>
        </div>
      )}
    </div>
  );
}

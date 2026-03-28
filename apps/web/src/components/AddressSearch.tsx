"use client";

import { useState } from "react";
import type { Category, IncentivesResponse } from "@/lib/types";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/types";
import { IncentiveCard } from "./IncentiveCard";

const ALL_CATEGORIES: Category[] = [
  "ENERGY_EFFICIENCY",
  "DISASTER_RESILIENCE",
  "WATER_CONSERVATION",
  "SAFETY_AND_HEALTH",
  "CLEAN_TRANSPORTATION",
  "LAND_AND_ECOSYSTEM",
];

export function AddressSearch() {
  const [address, setAddress] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Set<Category>>(
    new Set(ALL_CATEGORIES)
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IncentivesResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  function toggleCategory(category: Category) {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!address.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const params = new URLSearchParams({ address });
      if (selectedCategories.size < ALL_CATEGORIES.length) {
        params.set("categories", Array.from(selectedCategories).join(","));
      }

      const res = await fetch(`/api/incentives?${params}`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to fetch incentives");
      }
      const data: IncentivesResponse = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Search form */}
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Main St, Portland, OR 97201"
            className="flex-1 px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 placeholder-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            required
          />
          <button
            type="submit"
            disabled={loading || !address.trim()}
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-xl shadow-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm whitespace-nowrap"
          >
            {loading ? "Searching…" : "Find Incentives"}
          </button>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          {ALL_CATEGORIES.map((cat) => {
            const colors = CATEGORY_COLORS[cat];
            const selected = selectedCategories.has(cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  selected
                    ? `${colors.bg} ${colors.text} ${colors.border}`
                    : "bg-white text-stone-400 border-stone-200 hover:border-stone-300"
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            );
          })}
        </div>
      </form>

      {/* Error */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-stone-900">
              {result.programs.length > 0
                ? `${result.programs.length} incentive${result.programs.length === 1 ? "" : "s"} found`
                : "No incentives found"}
            </h2>
            {result.region.state && (
              <span className="text-sm text-stone-500">
                {[result.region.city, result.region.state].filter(Boolean).join(", ")}
              </span>
            )}
          </div>

          {result.programs.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              <p className="text-base">No matching programs found for this address.</p>
              <p className="text-sm mt-1">Try selecting more categories or checking a different address.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-1">
              {result.programs.map((program) => (
                <IncentiveCard key={program.id} program={program} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { StatCard } from "@/components/StatCard";
import { SourceCitation } from "@/components/SourceCitation";
import { CARRIERS, PAGE_SOURCES } from "@/lib/data/carrier-status";
import type { CarrierWritingStatus } from "@/lib/types";

const STATUS_LABELS: Record<CarrierWritingStatus, string> = {
  writing: "Writing",
  reduced: "Reduced",
  paused:  "Paused",
  exited:  "Exited",
};

const STATUS_STYLES: Record<CarrierWritingStatus, string> = {
  writing: "bg-green-100 text-green-800",
  reduced: "bg-amber-100 text-amber-800",
  paused:  "bg-orange-100 text-orange-800",
  exited:  "bg-red-100 text-red-800",
};

const STATUS_ROW: Record<CarrierWritingStatus, string> = {
  writing: "border-l-green-400",
  reduced: "border-l-amber-400",
  paused:  "border-l-orange-400",
  exited:  "border-l-red-400",
};

type FilterValue = "all" | CarrierWritingStatus;

const FILTER_OPTIONS: { label: string; value: FilterValue }[] = [
  { label: "All",     value: "all"     },
  { label: "Writing", value: "writing" },
  { label: "Reduced", value: "reduced" },
  { label: "Paused",  value: "paused"  },
  { label: "Exited",  value: "exited"  },
];

const exitedCount  = CARRIERS.filter((c) => c.status === "exited").length;
const pausedCount  = CARRIERS.filter((c) => c.status === "paused").length;
const reducedCount = CARRIERS.filter((c) => c.status === "reduced").length;
const writingCount = CARRIERS.filter((c) => c.status === "writing").length;

export default function CarrierStatusPage() {
  const [filter, setFilter] = useState<FilterValue>("all");

  const visible = filter === "all" ? CARRIERS : CARRIERS.filter((c) => c.status === filter);

  // Sort: exited → paused → reduced → writing
  const ORDER: CarrierWritingStatus[] = ["exited", "paused", "reduced", "writing"];
  const sorted = [...visible].sort(
    (a, b) => ORDER.indexOf(a.status) - ORDER.indexOf(b.status)
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <SectionHeader
        title="Carrier Status — Who's Writing, Who Dropped Out"
        subtitle="Tracks which California homeowners insurance carriers are actively writing new policies, which have stopped accepting new applications, and which have exited the state entirely. Status reflects best available public information as of early 2026."
        badge="Updated March 2026"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard label="Exited Market"   value={String(exitedCount)}  accent="red"   subtext="Fully non-renewed CA book" />
        <StatCard label="Paused Writing"  value={String(pausedCount)}  accent="amber" subtext="No new applications" />
        <StatCard label="Reduced Volume"  value={String(reducedCount)} accent="amber" subtext="Caps or restrictions in place" />
        <StatCard label="Still Writing"   value={String(writingCount)} accent="green" subtext="Accepting new policies" />
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTER_OPTIONS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
              filter === value
                ? "bg-stone-800 text-white border-stone-800"
                : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {sorted.map((carrier) => (
          <div
            key={carrier.carrier}
            className={`bg-white rounded-xl border border-stone-200 border-l-4 ${STATUS_ROW[carrier.status]} p-4 shadow-sm`}
          >
            <div className="flex flex-wrap items-start gap-3 mb-2">
              <span className="font-semibold text-stone-900">{carrier.carrier}</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[carrier.status]}`}>
                {STATUS_LABELS[carrier.status]}
              </span>
              <span className="text-xs text-stone-500 ml-auto">{carrier.date}</span>
            </div>
            <p className="text-sm text-stone-700 mb-1">
              <span className="font-medium">Action:</span> {carrier.action}
            </p>
            <p className="text-sm text-stone-500 leading-relaxed mb-2">{carrier.notes}</p>
            {carrier.sources.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {carrier.sources.map((s) => (
                  <a
                    key={s.url}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-green-700 hover:text-green-800 underline underline-offset-2"
                  >
                    {s.label} →
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 text-xs text-stone-500 leading-relaxed mt-6">
        <strong>Data note:</strong> Carrier status is compiled from CDI press releases, carrier
        announcements, and industry press. &quot;Paused&quot; means the carrier has stopped accepting new
        applications but has not necessarily non-renewed existing policies. &quot;Exited&quot; means the
        carrier has substantially non-renewed its California homeowners book. Status can change
        rapidly — verify directly with the carrier or CDI&apos;s Home Insurance Finder before advising
        consumers.{" "}
        <a
          href="https://homeinsurancefinder.insurance.ca.gov/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-700 hover:text-green-800 underline underline-offset-2"
        >
          CDI Home Insurance Finder →
        </a>
      </div>

      <SourceCitation sources={PAGE_SOURCES} dataAsOf="Early 2026 · verify with sources before use" />
    </div>
  );
}

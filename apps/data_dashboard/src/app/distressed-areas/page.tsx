import { SectionHeader } from "@/components/SectionHeader";
import { StatCard } from "@/components/StatCard";
import { SourceCitation } from "@/components/SourceCitation";
import { CaliforniaMapWrapper } from "@/components/CaliforniaMapWrapper";
import {
  DISTRESSED_COUNTIES,
  DISTRESSED_FIPS,
  UNDERMARKETED_ZIPS,
  UNDERMARKETED_ZIP_COUNT,
  REGIONS,
  RULE_EXPLANATION,
  SOURCES,
} from "@/lib/data/distressed-areas";

export const metadata = { title: "Distressed Areas — CA Insurance Dashboard" };

export default function DistressedAreasPage() {
  const byRegion = REGIONS.map((region) => ({
    region,
    counties: DISTRESSED_COUNTIES.filter((c) => c.region === region).sort((a, b) =>
      a.county.localeCompare(b.county)
    ),
  }));

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <SectionHeader
        title="CDI Distressed Counties & Undermarketed ZIP Codes"
        subtitle="California's Sustainable Insurance Strategy officially designates counties and ZIP codes where the admitted market has failed to provide adequate coverage. Carriers using catastrophe modeling in their rate filings must commit to writing policies in these areas."
        badge="March 2025 · CDI Regulatory Designation"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
        <StatCard
          label="Distressed Counties"
          value={String(DISTRESSED_COUNTIES.length)}
          subtext="Out of 58 total CA counties"
          accent="red"
        />
        <StatCard
          label="Undermarketed ZIP Codes"
          value={`~${UNDERMARKETED_ZIP_COUNT.toLocaleString()}`}
          subtext="≥15% FAIR Plan penetration or affordability trigger"
          accent="amber"
        />
        <StatCard
          label="Writing Requirement"
          value="85%"
          subtext="Of statewide market share must be offered in distressed areas"
          accent="green"
        />
      </div>

      {/* Map */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 mb-8">
        <h2 className="text-base font-semibold text-stone-800 mb-1">
          California — Distressed Counties
        </h2>
        <p className="text-xs text-stone-400 mb-5">
          Hover over a county for its name and designation. Boundaries from US Census Bureau (public domain).
        </p>
        <CaliforniaMapWrapper
          distressedFips={DISTRESSED_FIPS}
          undermarketedZips={UNDERMARKETED_ZIPS}
        />
      </div>

      {/* Rule explanation */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8">
        <h3 className="font-semibold text-green-900 mb-2">The 85% Writing Rule</h3>
        <p className="text-sm text-green-800 leading-relaxed">{RULE_EXPLANATION}</p>
      </div>


      {/* ZIP code context */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 mb-6">
        <h3 className="font-semibold text-stone-800 mb-2">
          ~{UNDERMARKETED_ZIP_COUNT} Undermarketed ZIP Codes
        </h3>
        <p className="text-sm text-stone-600 leading-relaxed mb-3">
          In addition to the county-level designations, CDI has identified approximately{" "}
          {UNDERMARKETED_ZIP_COUNT} individual ZIP codes as &quot;undermarketed.&quot; A ZIP code qualifies if:
        </p>
        <ul className="text-sm text-stone-600 space-y-1 ml-4 list-disc">
          <li>It at least partially overlaps a High or Very High Cal Fire Hazard Severity Zone, AND</li>
          <li>
            15% or more of residential properties in the ZIP are insured by the FAIR Plan, OR the
            area meets an affordability threshold (premiums exceeding $4 per $1,000 of coverage
            value relative to local income levels)
          </li>
        </ul>
        <p className="text-sm text-stone-500 mt-3">
          The full list of undermarketed ZIP codes is in the CDI PDF linked below. CDI updates this
          list annually under the Sustainable Insurance Strategy.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-700 leading-relaxed">
        <strong>Verify before use:</strong> The county list above reflects best available public
        reporting as of March 2026. CDI publishes the authoritative list in the PDF linked below;
        confirm the exact county composition before using this data for policy or business decisions.
      </div>

      <SourceCitation sources={SOURCES} dataAsOf="March 2025 CDI regulatory determination" />
    </div>
  );
}

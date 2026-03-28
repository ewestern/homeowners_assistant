import { SectionHeader } from "@/components/SectionHeader";
import { StatCard } from "@/components/StatCard";
import { SourceCitation } from "@/components/SourceCitation";
import { FairPlanChartWrapper as FairPlanChart } from "@/components/charts/FairPlanChartWrapper";
import { FAIR_PLAN_DATA, STATS, SOURCES } from "@/lib/data/fair-plan";

export const metadata = { title: "FAIR Plan Growth — CA Insurance Dashboard" };

export default function FairPlanPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <SectionHeader
        title="California FAIR Plan — Growth as Admitted Market Retreated"
        subtitle="The California FAIR Plan Association is the state's insurer of last resort — required to offer basic fire coverage when no admitted carrier will. Its explosive growth tracks directly with how many homes the standard market has abandoned."
        badge="Q4 2025 · Quarterly data"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <StatCard
          label="Policies in Force"
          value="668,609"
          subtext="Q4 2025"
          accent="red"
        />
        <StatCard
          label="Written Premium"
          value="$1.98B"
          subtext="Annualized Q4 2025"
          accent="red"
        />
        <StatCard
          label="Growth Since 2018"
          value={`+${STATS.growthPct}%`}
          subtext={`${STATS.baselinePolicies.toLocaleString()} → ${STATS.currentPolicies.toLocaleString()} policies`}
          accent="amber"
        />
        <StatCard
          label="Premium Growth Since 2018"
          value={`+${STATS.premiumGrowthPct.toLocaleString()}%`}
          subtext="$87M → $1,980M"
          accent="amber"
        />
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 mb-6">
        <h2 className="text-base font-semibold text-stone-800 mb-1">
          FAIR Plan Policies in Force & Written Premium · 2018–2025
        </h2>
        <p className="text-xs text-stone-400 mb-4">
          Green bars = policies in force (left axis) · Amber line = written premium in $M (right axis)
        </p>
        <FairPlanChart data={FAIR_PLAN_DATA} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h3 className="font-semibold text-amber-900 mb-2">What is the FAIR Plan?</h3>
          <p className="text-sm text-amber-800 leading-relaxed">
            The CA FAIR Plan is a pool of insurers mandated to provide basic fire and liability
            coverage when no voluntary carrier will. Coverage is typically more limited and
            significantly more expensive than standard homeowners policies. As of Q4 2025, one
            in roughly 14 insured California homes is on the FAIR Plan.
          </p>
        </div>
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-5">
          <h3 className="font-semibold text-stone-800 mb-2">Why this matters</h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            FAIR Plan growth is the best available proxy for admitted market retreat. Because
            FAIR Plan data is published quarterly at the ZIP code level, it provides more current
            and geographic granularity than any other public dataset — even though it only reflects
            the last-resort pool, not the full voluntary market.
          </p>
        </div>
      </div>

      <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 text-xs text-stone-500 leading-relaxed">
        <strong>Data note:</strong> Annual policy counts for 2019–2021 are interpolated between
        published anchor points. Exact figures are available in CFPNET&apos;s annual statistical
        reports. Q4 2025 (668,609 policies, $1.98B premium) is the most recent quarterly data
        published. The FAIR Plan publishes ZIP-code and county-level breakdowns in its quarterly
        PDF reports — see source link below for downloadable files.
      </div>

      <SourceCitation sources={SOURCES} dataAsOf="Q4 2025 (Oct–Dec 2025)" />
    </div>
  );
}

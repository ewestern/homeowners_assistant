import { SectionHeader } from "@/components/SectionHeader";
import { StatCard } from "@/components/StatCard";
import { SourceCitation } from "@/components/SourceCitation";
import { ESMarketChartWrapper as ESMarketChart } from "@/components/charts/ESMarketChartWrapper";
import { ES_MARKET_DATA, STATS, AVG_PREMIUM_NOTE, SOURCES } from "@/lib/data/es-market";

export const metadata = { title: "E&S Market Surge — CA Insurance Dashboard" };

export default function ESMarketPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <SectionHeader
        title="Surplus Lines (E&S) Market — The Admitted Market's Overflow Valve"
        subtitle="When admitted carriers stopped writing California homeowners policies, many homes shifted to the non-admitted (Excess & Surplus lines) market — carriers not licensed in California who can write policies without CDI rate approval. The E&S market tripled in a single year."
        badge="2024 Annual Data · SLAC"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <StatCard
          label="2024 Transactions"
          value="164,930"
          subtext="Up from 50,372 in 2023"
          accent="blue"
        />
        <StatCard
          label="Transaction Growth"
          value={`+${STATS.transactionGrowthPct}%`}
          subtext="Year over year"
          accent="red"
        />
        <StatCard
          label="Active E&S Carriers"
          value="159"
          subtext={`Up from 102 in 2023 (+${STATS.carrierGrowthPct}%)`}
          accent="green"
        />
        <StatCard
          label="Total E&S HO Premium"
          value={`$${STATS.totalPremium2024Millions}M`}
          subtext="2024 CA homeowners E&S"
          accent="stone"
        />
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 mb-6">
        <h2 className="text-base font-semibold text-stone-800 mb-1">
          2023 vs. 2024 — E&S Homeowners Market Comparison
        </h2>
        <p className="text-xs text-stone-400 mb-6">
          Stone = 2023 · Green = 2024
        </p>
        <ESMarketChart data={ES_MARKET_DATA} />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-4">
        <h3 className="font-semibold text-blue-900 mb-2">Why did average premium drop?</h3>
        <p className="text-sm text-blue-800 leading-relaxed">{AVG_PREMIUM_NOTE}</p>
        <p className="text-sm text-blue-800 leading-relaxed mt-2">
          In 2023, E&S CA homeowners skewed toward high-value homes ($1.7M average assessed value)
          that could afford specialty coverage. By 2024, middle-market homes ($900K average) flooded
          in as their admitted policies were non-renewed — the absolute per-policy premium fell even
          as the total market premium nearly doubled to $962M.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-5">
          <h3 className="font-semibold text-stone-800 mb-2">What is the E&S market?</h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            Excess and Surplus (E&S) lines carriers are not licensed by CDI and are not subject
            to California&apos;s rate approval process. They can price risk more freely and write
            coverage that admitted carriers won&apos;t. E&S policies typically cost more, offer
            fewer consumer protections, and are not backed by the CA Insurance Guarantee
            Association if the carrier becomes insolvent.
          </p>
        </div>
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-5">
          <h3 className="font-semibold text-stone-800 mb-2">Data limitations</h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            The Surplus Lines Association of California (SLAC) reports aggregate E&S homeowners
            transactions and premium but does not break out data by individual carrier or by ZIP
            code in public reports. Individual carrier identities in the E&S market are available
            through AM Best (paywalled). Geographic breakdowns are not available publicly.
          </p>
        </div>
      </div>

      <SourceCitation sources={SOURCES} dataAsOf="2024 annual (SLAC 2024 report)" />
    </div>
  );
}

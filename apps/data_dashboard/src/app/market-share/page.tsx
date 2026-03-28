import { SectionHeader } from "@/components/SectionHeader";
import { StatCard } from "@/components/StatCard";
import { SourceCitation } from "@/components/SourceCitation";
import { MarketShareChartWrapper as MarketShareChart } from "@/components/charts/MarketShareChartWrapper";
import { CARRIER_SHARES, MARKET_SHARE_YEAR, SOURCES } from "@/lib/data/market-share";

export const metadata = { title: "CDI Market Share — CA Insurance Dashboard" };

const topTwo = CARRIER_SHARES.filter((c) => c.rank <= 2);
const topTwoShare = topTwo.reduce((sum, c) => sum + c.marketSharePct, 0);
const totalPremium = CARRIER_SHARES.reduce((sum, c) => sum + c.premiumBillions, 0);

export default function MarketSharePage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <SectionHeader
        title="CDI Market Share — California Homeowners"
        subtitle={`California Department of Insurance annual P&C market share report. Covers all admitted carriers writing homeowners (HO) policies statewide. Geographic breakdown by ZIP or county is not published — this is statewide aggregate data only.`}
        badge={`${MARKET_SHARE_YEAR} Annual Data · 2024 data not yet published`}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <StatCard
          label="Top 2 Carriers' Share"
          value={`${topTwoShare.toFixed(1)}%`}
          subtext="State Farm + Farmers"
        />
        <StatCard
          label="Total CA HO Premium"
          value={`~$${totalPremium.toFixed(1)}B`}
          subtext={`${MARKET_SHARE_YEAR} written premium`}
        />
        <StatCard
          label="Market Leader"
          value="State Farm"
          subtext="19.9% share · $2.7B"
        />
        <StatCard
          label="Data Vintage"
          value="2023"
          subtext="CDI publishes 12 months after year-end"
          accent="stone"
        />
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 mb-6">
        <h2 className="text-base font-semibold text-stone-800 mb-4">
          Market Share by Carrier — % of CA Homeowners Written Premium
        </h2>
        <MarketShareChart data={CARRIER_SHARES} />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden mb-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200 text-left">
              <th className="px-4 py-3 font-semibold text-stone-600 w-10">#</th>
              <th className="px-4 py-3 font-semibold text-stone-600">Carrier</th>
              <th className="px-4 py-3 font-semibold text-stone-600 text-right">Written Premium</th>
              <th className="px-4 py-3 font-semibold text-stone-600 text-right">Market Share</th>
            </tr>
          </thead>
          <tbody>
            {CARRIER_SHARES.sort((a, b) => a.rank - b.rank).map((c, i) => (
              <tr
                key={c.carrier}
                className={`border-b border-stone-100 ${i % 2 === 0 ? "bg-white" : "bg-stone-50/50"} ${
                  c.carrier === "All Others" ? "text-stone-400 italic" : ""
                }`}
              >
                <td className="px-4 py-2.5 text-stone-400">{c.rank}</td>
                <td className="px-4 py-2.5 font-medium text-stone-800">{c.carrier}</td>
                <td className="px-4 py-2.5 text-right text-stone-700">
                  {c.premiumBillions >= 1
                    ? `$${c.premiumBillions.toFixed(2)}B`
                    : `$${(c.premiumBillions * 1000).toFixed(0)}M`}
                </td>
                <td className="px-4 py-2.5 text-right">
                  <span className="inline-block bg-green-50 text-green-800 font-semibold px-2 py-0.5 rounded text-xs">
                    {c.marketSharePct.toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 text-xs text-stone-500 leading-relaxed mb-4">
        <strong>Methodology note:</strong> CDI&apos;s market share report uses direct written premium as reported
        by admitted carriers under NAIC line-of-business code 04 (Homeowners Multiple Peril).
        &quot;All Others&quot; represents the combined share of carriers ranked 11 and below; the exact count
        and individual shares are in the downloadable Excel file linked below. Per-carrier ZIP-code
        breakdowns are not publicly available — the NAIC collects this data but holds it confidentially.
      </div>

      <SourceCitation sources={SOURCES} dataAsOf="2023 annual (CDI 2024 report cycle)" />
    </div>
  );
}

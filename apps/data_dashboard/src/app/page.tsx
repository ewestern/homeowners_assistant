import Link from "next/link";

const PAGES = [
  {
    href: "/market-share",
    title: "CDI Market Share",
    description:
      "Who holds how much of California's homeowners market. State Farm and Farmers together account for 35% of all written premium.",
    stat: "Top 2 carriers = 35% share",
    accent: "border-green-400",
    bg: "bg-green-50",
  },
  {
    href: "/carrier-status",
    title: "Carrier Status",
    description:
      "Which carriers have stopped writing new policies, which have exited entirely, and which are still actively covering California homes.",
    stat: "9+ carriers reduced or exited",
    accent: "border-red-400",
    bg: "bg-red-50",
  },
  {
    href: "/fair-plan",
    title: "FAIR Plan Growth",
    description:
      "The California FAIR Plan is the insurer of last resort. Its explosive growth is the clearest signal of how much the admitted market has retreated.",
    stat: "668K policies · up 339% since 2018",
    accent: "border-amber-400",
    bg: "bg-amber-50",
  },
  {
    href: "/es-market",
    title: "E&S Market Surge",
    description:
      "As admitted carriers withdrew, the surplus lines (non-admitted) market tripled in one year — absorbing homes that can no longer get standard coverage.",
    stat: "165K transactions in 2024 · up 227%",
    accent: "border-blue-400",
    bg: "bg-blue-50",
  },
  {
    href: "/distressed-areas",
    title: "Distressed Areas",
    description:
      "CDI's official map of counties and ZIP codes where the admitted market has effectively failed, triggering mandatory writing commitments.",
    stat: "29 counties · ~662 ZIP codes",
    accent: "border-purple-400",
    bg: "bg-purple-50",
  },
];

export default function OverviewPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-10">
        <span className="inline-block text-xs font-medium bg-red-100 text-red-700 px-2.5 py-1 rounded-full mb-3">
          California · Homeowners Insurance Crisis
        </span>
        <h1 className="text-3xl font-bold text-stone-900 mb-3">
          CA Insurance Market — Public Data Dashboard
        </h1>
        <p className="text-stone-600 leading-relaxed max-w-3xl">
          California's homeowners insurance market is in crisis. Major carriers have stopped writing
          new policies or exited the state entirely, the FAIR Plan (insurer of last resort) has
          surged 339% since 2018, and the surplus lines market tripled in a single year. This
          dashboard collects the best publicly available data to track the situation.
        </p>
        <p className="text-xs text-stone-400 mt-3">
          All data is sourced from public agencies (CDI, FAIR Plan, SLAC) with direct links to
          original documents. No proprietary data is used.
        </p>
      </div>

      {/* Data limitation callout */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
        <p className="text-sm font-semibold text-amber-800 mb-1">A note on data granularity</p>
        <p className="text-sm text-amber-700 leading-relaxed">
          No public dataset exists with per-carrier, per-ZIP-code policy counts. The NAIC collects
          this data but holds it confidentially. The best available proxies are: FAIR Plan data
          (ZIP-level, quarterly), CDI market share (carrier-level, statewide), and CDI's distressed
          area designations (county/ZIP level). The FIO/Treasury dataset had ZIP-level aggregate
          data for 2018–2022 but was removed from the Treasury website and is only available via
          archived mirrors.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PAGES.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className={`rounded-xl border-l-4 border border-stone-200 ${page.accent} ${page.bg} p-5 hover:shadow-md transition-shadow group`}
          >
            <h2 className="font-semibold text-stone-900 mb-1 group-hover:text-green-800 transition-colors">
              {page.title} →
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed mb-3">{page.description}</p>
            <p className="text-xs font-medium text-stone-500 bg-white/60 inline-block px-2 py-0.5 rounded">
              {page.stat}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

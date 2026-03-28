import { AddressSearch } from "@/components/AddressSearch";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-green-50 to-stone-50 border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-600 inline-block" />
            Federal, state, local &amp; utility programs
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight mb-4 text-balance">
            Find every incentive available to your home
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-10 text-balance">
            Enter your address to discover grants, rebates, and tax credits for energy efficiency,
            disaster resilience, water conservation, clean transportation, and more.
          </p>

          <div className="bg-white rounded-2xl border border-stone-200 shadow-md p-6">
            <AddressSearch />
          </div>
        </div>
      </section>

      {/* Category overview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-stone-900 text-center mb-10">
          Six categories of homeowner support
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {CATEGORY_TILES.map((tile) => (
            <div
              key={tile.label}
              className={`rounded-xl p-5 border ${tile.bg} ${tile.border}`}
            >
              <div className="text-2xl mb-2">{tile.icon}</div>
              <h3 className={`font-semibold text-sm ${tile.text}`}>{tile.label}</h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">{tile.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-stone-100 border-y border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-stone-900 text-center mb-10">How it works</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Enter your address",
                description:
                  "We use your location to match federal, state, county, city, and utility programs that apply to you.",
              },
              {
                step: "2",
                title: "Browse your incentives",
                description:
                  "See every active program with eligibility details, maximum benefit amounts, and deadlines.",
              },
              {
                step: "3",
                title: "Follow the action plan",
                description:
                  "Each program includes a step-by-step guide — what to do, what documents you need, and how long it takes.",
              },
            ].map(({ step, title, description }) => (
              <div key={step} className="text-center">
                <div className="w-10 h-10 rounded-full bg-green-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">
                  {step}
                </div>
                <h3 className="font-semibold text-stone-900 mb-1">{title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const CATEGORY_TILES = [
  {
    label: "Energy Efficiency",
    icon: "⚡",
    description: "Solar panels, heat pumps, insulation, windows, weatherization.",
    bg: "bg-amber-50",
    text: "text-amber-900",
    border: "border-amber-200",
  },
  {
    label: "Disaster Resilience",
    icon: "🛡️",
    description: "Wildfire hardening, flood mitigation, earthquake retrofits, backup power.",
    bg: "bg-red-50",
    text: "text-red-900",
    border: "border-red-200",
  },
  {
    label: "Water Conservation",
    icon: "💧",
    description: "Low-flow fixtures, greywater systems, drought-tolerant landscaping.",
    bg: "bg-blue-50",
    text: "text-blue-900",
    border: "border-blue-200",
  },
  {
    label: "Safety & Health",
    icon: "🏥",
    description: "Lead paint removal, radon mitigation, air quality, accessibility upgrades.",
    bg: "bg-purple-50",
    text: "text-purple-900",
    border: "border-purple-200",
  },
  {
    label: "Clean Transportation",
    icon: "🚗",
    description: "EV purchase credits, home EV charger installation, e-bike rebates.",
    bg: "bg-green-50",
    text: "text-green-900",
    border: "border-green-200",
  },
  {
    label: "Land & Ecosystem",
    icon: "🌱",
    description: "Tree planting, native landscaping, soil health, urban agriculture.",
    bg: "bg-emerald-50",
    text: "text-emerald-900",
    border: "border-emerald-200",
  },
];

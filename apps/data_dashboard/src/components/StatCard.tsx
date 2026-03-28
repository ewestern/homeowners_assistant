type Accent = "green" | "red" | "amber" | "stone" | "blue";

interface Props {
  label: string;
  value: string;
  subtext?: string;
  accent?: Accent;
}

const accentClasses: Record<Accent, string> = {
  green: "border-l-green-500",
  red:   "border-l-red-500",
  amber: "border-l-amber-500",
  stone: "border-l-stone-400",
  blue:  "border-l-blue-500",
};

export function StatCard({ label, value, subtext, accent = "green" }: Props) {
  return (
    <div className={`bg-white rounded-xl border border-stone-200 border-l-4 ${accentClasses[accent]} p-5 shadow-sm`}>
      <p className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-2xl font-bold text-stone-900">{value}</p>
      {subtext && <p className="text-xs text-stone-500 mt-1">{subtext}</p>}
    </div>
  );
}

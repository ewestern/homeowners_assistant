"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import type { CarrierShare } from "@/lib/types";

interface Props {
  data: CarrierShare[];
}

const formatPremium = (v: number) =>
  v >= 1 ? `$${v.toFixed(1)}B` : `$${(v * 1000).toFixed(0)}M`;

const formatShare = (v: number) => `${v}%`;

interface TooltipPayloadItem {
  value: number;
  name: string;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const carrier = label as string;
  const shareItem = payload.find((p) => p.name === "marketSharePct");
  return (
    <div className="bg-white border border-stone-200 rounded-lg shadow-md px-3 py-2 text-sm">
      <p className="font-semibold text-stone-900 mb-1">{carrier}</p>
      {shareItem && (
        <p className="text-stone-600">
          Market share: <span className="font-medium">{shareItem.value}%</span>
        </p>
      )}
    </div>
  );
}

export function MarketShareChart({ data }: Props) {
  // Sort descending by market share for display
  const sorted = [...data].sort((a, b) => b.marketSharePct - a.marketSharePct);

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={420}>
        <BarChart
          data={sorted}
          layout="vertical"
          margin={{ top: 4, right: 40, left: 8, bottom: 4 }}
        >
          <XAxis
            type="number"
            tickFormatter={formatShare}
            tick={{ fontSize: 12, fill: "#78716c" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="carrier"
            width={110}
            tick={{ fontSize: 12, fill: "#44403c" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f5f5f4" }} />
          <Bar dataKey="marketSharePct" name="marketSharePct" radius={[0, 4, 4, 0]}>
            {sorted.map((entry) => (
              <Cell
                key={entry.carrier}
                fill={entry.carrier === "All Others" ? "#a8a29e" : "#16a34a"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-xs text-stone-400 mt-2 text-center">
        Market share % of CA homeowners written premium · premium shown in $B / $M
      </p>
    </div>
  );
}

"use client";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { FairPlanDataPoint } from "@/lib/types";

interface Props {
  data: FairPlanDataPoint[];
}

function xLabel(d: FairPlanDataPoint) {
  return d.quarter ? `${d.year} ${d.quarter}` : String(d.year);
}

interface TooltipPayloadItem {
  value: number;
  name: string;
  color: string;
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
  return (
    <div className="bg-white border border-stone-200 rounded-lg shadow-md px-3 py-2 text-sm">
      <p className="font-semibold text-stone-900 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name === "policiesInForce"
            ? `Policies: ${(p.value / 1000).toFixed(0)}K`
            : `Premium: $${p.value.toLocaleString()}M`}
        </p>
      ))}
    </div>
  );
}

export function FairPlanChart({ data }: Props) {
  const chartData = data.map((d) => ({ ...d, label: xLabel(d) }));

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={380}>
        <ComposedChart data={chartData} margin={{ top: 8, right: 48, left: 8, bottom: 4 }}>
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12, fill: "#78716c" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            yAxisId="policies"
            orientation="left"
            tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`}
            tick={{ fontSize: 11, fill: "#78716c" }}
            axisLine={false}
            tickLine={false}
            label={{
              value: "Policies in Force",
              angle: -90,
              position: "insideLeft",
              offset: 12,
              style: { fontSize: 11, fill: "#a8a29e" },
            }}
          />
          <YAxis
            yAxisId="premium"
            orientation="right"
            tickFormatter={(v: number) => `$${v}M`}
            tick={{ fontSize: 11, fill: "#78716c" }}
            axisLine={false}
            tickLine={false}
            label={{
              value: "Written Premium ($M)",
              angle: 90,
              position: "insideRight",
              offset: 16,
              style: { fontSize: 11, fill: "#a8a29e" },
            }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f5f5f4" }} />
          <Legend
            formatter={(value) =>
              value === "policiesInForce" ? "Policies in Force" : "Written Premium ($M)"
            }
            wrapperStyle={{ fontSize: 12 }}
          />
          <Bar
            yAxisId="policies"
            dataKey="policiesInForce"
            name="policiesInForce"
            fill="#16a34a"
            radius={[4, 4, 0, 0]}
            opacity={0.85}
          />
          <Line
            yAxisId="premium"
            dataKey="writtenPremiumMillions"
            name="writtenPremiumMillions"
            stroke="#ca8a04"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#ca8a04" }}
            activeDot={{ r: 6 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <p className="text-xs text-stone-400 mt-2 text-center">
        2019–2021 policies are interpolated estimates · Q4 2025 is a partial-year figure
      </p>
    </div>
  );
}

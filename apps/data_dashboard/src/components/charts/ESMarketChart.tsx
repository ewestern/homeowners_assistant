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
import type { ESMarketYear } from "@/lib/types";

interface Props {
  data: ESMarketYear[];
}

const COLORS = ["#a8a29e", "#16a34a"]; // 2023 = stone, 2024 = green

interface PanelProps {
  data: ESMarketYear[];
  dataKey: keyof ESMarketYear;
  title: string;
  formatter: (v: number) => string;
}

function Panel({ data, dataKey, title, formatter }: PanelProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm font-semibold text-stone-700">{title}</p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 4 }}>
          <XAxis
            dataKey="year"
            tick={{ fontSize: 12, fill: "#78716c" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatter}
            tick={{ fontSize: 11, fill: "#78716c" }}
            axisLine={false}
            tickLine={false}
            width={60}
          />
          <Tooltip
            formatter={(value: number) => formatter(value)}
            cursor={{ fill: "#f5f5f4" }}
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e7e5e4" }}
          />
          <Bar dataKey={dataKey} radius={[4, 4, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ESMarketChart({ data }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      <Panel
        data={data}
        dataKey="transactions"
        title="Transactions"
        formatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)}
      />
      <Panel
        data={data}
        dataKey="avgPremium"
        title="Avg. Premium / Policy"
        formatter={(v) => `$${v.toLocaleString()}`}
      />
      <Panel
        data={data}
        dataKey="carrierCount"
        title="Active E&S Carriers"
        formatter={(v) => String(v)}
      />
    </div>
  );
}

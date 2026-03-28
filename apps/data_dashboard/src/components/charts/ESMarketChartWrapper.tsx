"use client";

import dynamic from "next/dynamic";
import type { ESMarketYear } from "@/lib/types";

const ESMarketChart = dynamic(
  () => import("./ESMarketChart").then((m) => m.ESMarketChart),
  { ssr: false, loading: () => <div className="h-64 bg-stone-100 animate-pulse rounded-xl" /> }
);

export function ESMarketChartWrapper({ data }: { data: ESMarketYear[] }) {
  return <ESMarketChart data={data} />;
}

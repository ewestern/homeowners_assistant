"use client";

import dynamic from "next/dynamic";
import type { CarrierShare } from "@/lib/types";

const MarketShareChart = dynamic(
  () => import("./MarketShareChart").then((m) => m.MarketShareChart),
  { ssr: false, loading: () => <div className="h-96 bg-stone-100 animate-pulse rounded-xl" /> }
);

export function MarketShareChartWrapper({ data }: { data: CarrierShare[] }) {
  return <MarketShareChart data={data} />;
}

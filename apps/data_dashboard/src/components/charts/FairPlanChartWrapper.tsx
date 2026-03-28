"use client";

import dynamic from "next/dynamic";
import type { FairPlanDataPoint } from "@/lib/types";

const FairPlanChart = dynamic(
  () => import("./FairPlanChart").then((m) => m.FairPlanChart),
  { ssr: false, loading: () => <div className="h-96 bg-stone-100 animate-pulse rounded-xl" /> }
);

export function FairPlanChartWrapper({ data }: { data: FairPlanDataPoint[] }) {
  return <FairPlanChart data={data} />;
}

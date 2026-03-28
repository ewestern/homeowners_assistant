import type { ESMarketYear, SourceLink } from "../types";

// Surplus Lines Association of California (SLAC) — 2024 Annual Report
// E&S = Excess & Surplus Lines (non-admitted / surplus lines market)
// Source: https://slaannualreport.com/2024/
export const ES_MARKET_DATA: ESMarketYear[] = [
  { year: 2023, transactions: 50_372,  avgPremium: 9_556, carrierCount: 102 },
  { year: 2024, transactions: 164_930, avgPremium: 4_476, carrierCount: 159 },
];

export const STATS = {
  transactionGrowthPct: Math.round(((164_930 - 50_372) / 50_372) * 100), // ~227%
  carrierGrowthPct: Math.round(((159 - 102) / 102) * 100), // ~56%
  totalPremium2024Millions: 962, // $962M total E&S homeowners premium in 2024
} as const;

// The average premium DROPPED because the mix shifted: as admitted carriers retreated,
// lower-value mid-market homes (avg $900K assessed value, down from $1.7M in 2023)
// flooded into E&S, pulling the per-policy average down even as total volume surged.
export const AVG_PREMIUM_NOTE =
  "Average premium fell as mid-market homes (avg $900K, down from $1.7M in 2023) flooded the E&S market — a mix shift, not a rate decrease.";

export const SOURCES: SourceLink[] = [
  {
    label: "Surplus Lines Association of CA — 2024 Annual Report",
    url: "https://slaannualreport.com/2024/",
  },
];

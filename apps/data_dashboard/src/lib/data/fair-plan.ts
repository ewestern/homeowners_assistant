import type { FairPlanDataPoint, SourceLink } from "../types";

// California FAIR Plan Association — Key Statistics & Data
// Source: https://www.cfpnet.com/key-statistics-data/
// policiesInForce = actual count; writtenPremiumMillions = written premium in $M
// Note: 2019–2021 values are interpolated from published anchor points;
// verify exact figures from CFPNET annual tables before publishing.
export const FAIR_PLAN_DATA: FairPlanDataPoint[] = [
  { year: 2018, policiesInForce: 152_000, writtenPremiumMillions: 87   },
  { year: 2019, policiesInForce: 165_000, writtenPremiumMillions: 110  }, // interpolated
  { year: 2020, policiesInForce: 178_000, writtenPremiumMillions: 140  }, // interpolated
  { year: 2021, policiesInForce: 190_000, writtenPremiumMillions: 170  }, // interpolated
  { year: 2022, policiesInForce: 200_000, writtenPremiumMillions: 210  },
  { year: 2023, policiesInForce: 246_000, writtenPremiumMillions: 460  },
  { year: 2024, policiesInForce: 452_000, writtenPremiumMillions: 1_400 },
  { year: 2025, quarter: "Q4", policiesInForce: 668_609, writtenPremiumMillions: 1_980 },
];

export const STATS = {
  currentPolicies: 668_609,
  currentPremiumMillions: 1_980,
  baselinePolicies: 152_000,
  baselineYear: 2018,
  growthPct: Math.round(((668_609 - 152_000) / 152_000) * 100), // ~339%
  premiumGrowthPct: Math.round(((1_980 - 87) / 87) * 100), // ~2,175%
} as const;

export const SOURCES: SourceLink[] = [
  {
    label: "CA FAIR Plan — Key Statistics & Data (quarterly reports)",
    url: "https://www.cfpnet.com/key-statistics-data/",
  },
  {
    label: "CDI — Residential Insurance Policy Count Fact Sheet (Jan 2025)",
    url: "https://www.insurance.ca.gov/01-consumers/200-wrr/upload/CDI-Fact-Sheet-Summary-on-Residential-Insurance-Policies-and-the-FAIR-Plan-v-011325-2.pdf",
  },
];

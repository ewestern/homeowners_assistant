import type { DistressedCounty, SourceLink } from "../types";

// CDI Sustainable Insurance Strategy — Undermarketed Areas Determination (March 2025)
// 29 counties designated as "distressed" under the 85% writing rule
// Source: CDI March 2025 regulatory document
// Note: Verify the exact list against the CDI PDF; CDI updates this list annually.
export const DISTRESSED_COUNTIES: DistressedCounty[] = [
  // Northern CA
  { county: "Butte",     region: "Northern CA" },
  { county: "El Dorado", region: "Northern CA" },
  { county: "Lassen",    region: "Northern CA" },
  { county: "Modoc",     region: "Northern CA" },
  { county: "Nevada",    region: "Northern CA" },
  { county: "Placer",    region: "Northern CA" },
  { county: "Plumas",    region: "Northern CA" },
  { county: "Shasta",    region: "Northern CA" },
  { county: "Sierra",    region: "Northern CA" },
  { county: "Siskiyou",  region: "Northern CA" },
  { county: "Tehama",    region: "Northern CA" },
  { county: "Trinity",   region: "Northern CA" },
  { county: "Tuolumne",  region: "Northern CA" },
  // Bay Area / Coastal
  { county: "Marin",      region: "Bay Area / Coastal" },
  { county: "Napa",       region: "Bay Area / Coastal" },
  { county: "Sonoma",     region: "Bay Area / Coastal" },
  { county: "Santa Cruz", region: "Bay Area / Coastal" },
  // Central CA
  { county: "Alpine",           region: "Central CA" },
  { county: "Amador",           region: "Central CA" },
  { county: "Calaveras",        region: "Central CA" },
  { county: "Mariposa",         region: "Central CA" },
  { county: "Mono",             region: "Central CA" },
  { county: "San Luis Obispo",  region: "Central CA" },
  // Southern CA
  { county: "Los Angeles",    region: "Southern CA" },
  { county: "Mendocino",      region: "Southern CA" },
  { county: "Monterey",       region: "Southern CA" },
  { county: "Santa Barbara",  region: "Southern CA" },
  { county: "Ventura",        region: "Southern CA" },
  { county: "Del Norte",      region: "Northern CA" },
];

export const UNDERMARKETED_ZIP_COUNT = 662;

export const REGIONS = ["Northern CA", "Bay Area / Coastal", "Central CA", "Southern CA"] as const;

export const RULE_EXPLANATION =
  "Under California's Sustainable Insurance Strategy (effective January 2025), any insurer that uses catastrophe modeling or reinsurance costs in its rate filings must write at least 85% of its statewide market share in wildfire-distressed areas. The threshold increases by 5 percentage points every two years until met. Counties are designated as distressed when the FAIR Plan provides coverage to 15% or more of residential properties, or where premiums exceed affordability thresholds relative to income.";

export const SOURCES: SourceLink[] = [
  {
    label: "CDI — Distressed Counties & Undermarketed ZIP Codes List (March 2025)",
    url: "https://www.insurance.ca.gov/01-consumers/180-climate-change/upload/catastrophe-modeling-and-ratemaking-insurer-commitments-to-increase-writing-of-policies-in-high-risk-wildfire-areas-list-of-distressed-counties-and-undermarketed-zip-codes-residential-property-insurance-commitments.pdf",
  },
  {
    label: "CDI — Sustainable Insurance Strategy",
    url: "https://www.insurance.ca.gov/01-consumers/180-climate-change/Sustainable-Insurance-Strategy.cfm",
  },
  {
    label: "CDI — FAQ: Insurance Commitments in Wildfire Distressed Areas",
    url: "https://www.insurance.ca.gov/01-consumers/180-climate-change/upload/California-Department-of-Insurance-FAQ-for-Insurance-Commitments-in-Wildfire-Distressed-Areas.pdf",
  },
];

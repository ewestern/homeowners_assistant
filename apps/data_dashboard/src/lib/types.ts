export interface CarrierShare {
  carrier: string;
  premiumBillions: number;
  marketSharePct: number;
  rank: number;
}

export type CarrierWritingStatus = "writing" | "paused" | "exited" | "reduced";

export interface CarrierStatusEntry {
  carrier: string;
  status: CarrierWritingStatus;
  action: string;
  date: string;
  notes: string;
  sources: SourceLink[];
}

export interface FairPlanDataPoint {
  year: number;
  quarter?: string;
  policiesInForce: number;
  writtenPremiumMillions: number;
}

export interface ESMarketYear {
  year: number;
  transactions: number;
  avgPremium: number;
  carrierCount: number;
}

export interface DistressedCounty {
  county: string;
  region: string;
  /** 5-digit US Census FIPS code, e.g. "06007" for Butte County */
  fips: string;
}

export interface SourceLink {
  label: string;
  url: string;
}

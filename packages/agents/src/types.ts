export type Category =
  | "ENERGY_EFFICIENCY"
  | "DISASTER_RESILIENCE"
  | "WATER_CONSERVATION"
  | "SAFETY_AND_HEALTH"
  | "CLEAN_TRANSPORTATION"
  | "LAND_AND_ECOSYSTEM";

export type Provider = "FEDERAL" | "STATE" | "LOCAL" | "UTILITY" | "INSURER";

export type Delivery =
  | "FEDERAL_TAX_CREDITS"
  | "STATE_TAX_DEDUCTIONS"
  | "UTILITY_REBATES"
  | "MUNICIPAL_GRANTS"
  | "INSURANCE_PREMIUM_DISCOUNTS"
  | "PACE_FINANCING"
  | "LOW_INTEREST_LOANS"
  | "PROPERTY_TAX_EXEMPTIONS"
  | "CASH_REBATE_PROGRAMS"
  | "FREE_SUBSIDIZED_INSTALLATION";

export interface ActionStepData {
  stepNumber: number;
  title: string;
  description: string;
  estimatedTime?: string;
  documents?: string[];
}

export interface ProgramData {
  name: string;
  description: string;
  category: Category;
  subcategory?: string;
  provider: Provider;
  delivery: Delivery;
  providerName: string;
  url?: string;
  maxAmount?: number;
  amountDescription?: string;
  incomeRestricted?: boolean;
  deadline?: string; // ISO date string
  regions: Array<{
    state: string; // "US" for federal
    county?: string;
    city?: string;
    zipCode?: string;
    utilityDistrict?: string;
  }>;
  actionSteps: ActionStepData[];
}

export interface DiscoveryResult {
  programs: ProgramData[];
  state: string;
  categories: Category[];
  discoveredAt: string;
  notes?: string;
}

export interface MonitoringResult {
  programName: string;
  url?: string;
  status: "ACTIVE" | "INACTIVE" | "EXPIRED" | "UNVERIFIED";
  checkedAt: string;
  notes?: string;
  changes?: string[];
}

export interface AgentConfig {
  apiKey?: string;
  model?: string;
}

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

export interface ActionStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  estimatedTime: string | null;
  documents: string[];
}

export interface Program {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: Category;
  subcategory: string | null;
  provider: Provider;
  delivery: Delivery;
  providerName: string;
  url: string | null;
  maxAmount: number | null;
  amountDescription: string | null;
  incomeRestricted: boolean;
  deadline: string | null;
  isActive: boolean;
  actionSteps: ActionStep[];
}

export interface IncentivesResponse {
  programs: Program[];
  address: string;
  region: {
    state: string | null;
    city: string | null;
    zipCode: string | null;
  };
}

export const CATEGORY_LABELS: Record<Category, string> = {
  ENERGY_EFFICIENCY: "Energy Efficiency",
  DISASTER_RESILIENCE: "Disaster Resilience",
  WATER_CONSERVATION: "Water Conservation",
  SAFETY_AND_HEALTH: "Safety & Health",
  CLEAN_TRANSPORTATION: "Clean Transportation",
  LAND_AND_ECOSYSTEM: "Land & Ecosystem",
};

export const CATEGORY_COLORS: Record<Category, { bg: string; text: string; border: string }> = {
  ENERGY_EFFICIENCY: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-200" },
  DISASTER_RESILIENCE: { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" },
  WATER_CONSERVATION: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
  SAFETY_AND_HEALTH: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200" },
  CLEAN_TRANSPORTATION: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
  LAND_AND_ECOSYSTEM: { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-200" },
};

export const PROVIDER_LABELS: Record<Provider, string> = {
  FEDERAL: "Federal",
  STATE: "State",
  LOCAL: "Local",
  UTILITY: "Utility",
  INSURER: "Insurer",
};

export const DELIVERY_LABELS: Record<Delivery, string> = {
  FEDERAL_TAX_CREDITS: "Federal Tax Credit",
  STATE_TAX_DEDUCTIONS: "State Tax Deduction",
  UTILITY_REBATES: "Utility Rebate",
  MUNICIPAL_GRANTS: "Municipal Grant",
  INSURANCE_PREMIUM_DISCOUNTS: "Insurance Discount",
  PACE_FINANCING: "PACE Financing",
  LOW_INTEREST_LOANS: "Low-Interest Loan",
  PROPERTY_TAX_EXEMPTIONS: "Property Tax Exemption",
  CASH_REBATE_PROGRAMS: "Cash Rebate",
  FREE_SUBSIDIZED_INSTALLATION: "Free / Subsidized Install",
};

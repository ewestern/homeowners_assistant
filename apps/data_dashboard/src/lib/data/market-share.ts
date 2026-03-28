import type { CarrierShare, SourceLink } from "../types";

export const MARKET_SHARE_YEAR = 2023;

// CA homeowners (HO) line — CDI P&C Annual Market Share Report 2024 (covering 2023 data)
// Premiums in billions; market share rounded to one decimal as published by CDI
export const CARRIER_SHARES: CarrierShare[] = [
  { rank: 1,  carrier: "State Farm",     premiumBillions: 2.70,  marketSharePct: 19.9 },
  { rank: 2,  carrier: "Farmers",        premiumBillions: 2.00,  marketSharePct: 14.9 },
  { rank: 3,  carrier: "Liberty Mutual", premiumBillions: 0.908, marketSharePct: 6.5  },
  { rank: 4,  carrier: "CSAA",           premiumBillions: 0.895, marketSharePct: 6.5  },
  { rank: 5,  carrier: "Mercury",        premiumBillions: 0.839, marketSharePct: 6.1  },
  { rank: 6,  carrier: "Allstate",       premiumBillions: 0.792, marketSharePct: 5.8  },
  { rank: 7,  carrier: "USAA",           premiumBillions: 0.742, marketSharePct: 5.4  },
  { rank: 8,  carrier: "Auto Club",      premiumBillions: 0.720, marketSharePct: 5.3  },
  { rank: 9,  carrier: "Nationwide",     premiumBillions: 0.650, marketSharePct: 4.7  },
  { rank: 10, carrier: "Travelers",      premiumBillions: 0.380, marketSharePct: 2.8  },
  // Remaining ~22% distributed among smaller carriers not individually listed
  { rank: 11, carrier: "All Others",     premiumBillions: 2.75,  marketSharePct: 22.1 },
];

export const SOURCES: SourceLink[] = [
  {
    label: "CDI 2024 P&C Market Share Report (2023 data)",
    url: "https://www.insurance.ca.gov/01-consumers/120-company/04-mrktshare/2024/",
  },
  {
    label: "CDI Market Share Excel Data File",
    url: "https://www.insurance.ca.gov/01-consumers/120-company/04-mrktshare/2024/upload/MktShrDataPC2024RevSep0825.xlsx",
  },
];

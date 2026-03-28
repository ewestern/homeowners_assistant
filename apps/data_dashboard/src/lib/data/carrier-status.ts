import type { CarrierStatusEntry, SourceLink } from "../types";

export const CARRIERS: CarrierStatusEntry[] = [
  // ── Exited / Paused / Reduced ──────────────────────────────────────────────
  {
    carrier: "State Farm",
    status: "paused",
    action: "Stopped accepting new homeowners applications",
    date: "May 2023",
    notes:
      "Cited wildfire risk and reinsurance costs. Existing policyholders retained but ~72,000 policies later non-renewed. Received emergency 17% rate increase approval.",
    sources: [
      {
        label: "State Farm Press Release (May 2023)",
        url: "https://newsroom.statefarm.com/state-farm-general-insurance-company-california/",
      },
      {
        label: "CDI — State Farm Non-Renewal Action",
        url: "https://www.insurance.ca.gov/0400-news/0100-press-releases/2024/release016-2024.cfm",
      },
    ],
  },
  {
    carrier: "Allstate",
    status: "paused",
    action: "Halted new homeowners and commercial policies",
    date: "Late 2022",
    notes:
      "Quietly stopped writing new CA policies in late 2022; confirmed publicly June 2023. Has not announced a timeline for re-entry.",
    sources: [
      {
        label: "LA Times — Allstate Stops Writing CA Policies",
        url: "https://www.latimes.com/business/story/2023-06-02/allstate-state-farm-california-home-insurance",
      },
    ],
  },
  {
    carrier: "Farmers",
    status: "reduced",
    action: "Capped new policies; later removed cap (Nov 2025)",
    date: "July 2023 → Nov 2025",
    notes:
      "CDI approved a 7% new-business cap in July 2023. Also non-renewed ~100,000 policies. Cap removed November 2025; seeking 6.99% rate increase.",
    sources: [
      {
        label: "CDI Press Release — Farmers Cap",
        url: "https://www.insurance.ca.gov/0400-news/0100-press-releases/2023/release088-2023.cfm",
      },
      {
        label: "Insurance Journal — Farmers Cap Removal",
        url: "https://www.insurancejournal.com/news/west/2025/11/24/848825.htm",
      },
    ],
  },
  {
    carrier: "Nationwide",
    status: "exited",
    action: "Exited CA homeowners market entirely",
    date: "March 2023",
    notes:
      "Stopped writing new policies and non-renewed existing book over 12 months. Still operates other lines in CA.",
    sources: [
      {
        label: "Insurance Journal — Nationwide CA Exit",
        url: "https://www.insurancejournal.com/news/west/2023/03/22/712818.htm",
      },
    ],
  },
  {
    carrier: "The Hartford",
    status: "exited",
    action: "Exited CA personal lines including homeowners",
    date: "2023",
    notes:
      "Pivoted entirely to commercial lines in California. No longer writing personal auto or homeowners.",
    sources: [
      {
        label: "Bankrate — Carriers That Exited CA",
        url: "https://www.bankrate.com/insurance/homeowners-insurance/carriers-exit-california-home-insurance/",
      },
    ],
  },
  {
    carrier: "Tokio Marine (Trans Pacific)",
    status: "exited",
    action: "Filed exit notices; shifted exposure to E&S",
    date: "April 2024",
    notes:
      "Filed non-renewal notices for admitted CA homeowners book. Continued writing some CA homes through surplus lines market.",
    sources: [
      {
        label: "Bankrate — Carriers That Exited CA",
        url: "https://www.bankrate.com/insurance/homeowners-insurance/carriers-exit-california-home-insurance/",
      },
    ],
  },
  {
    carrier: "AIG / Lexington Insurance",
    status: "exited",
    action: "Non-renewed all CA homeowners policies",
    date: "Early 2022",
    notes:
      "One of the earliest mass non-renewals. Approximately 30,000 high-value policies affected.",
    sources: [
      {
        label: "Insurance Journal — AIG CA Exit",
        url: "https://www.insurancejournal.com/news/west/2022/06/30/672942.htm",
      },
    ],
  },
  {
    carrier: "GUARD Insurance (Berkshire Hathaway)",
    status: "exited",
    action: "Stopped writing CA homeowners",
    date: "2023",
    notes: "Exited the CA personal lines homeowners market.",
    sources: [
      {
        label: "Bankrate — Carriers That Exited CA",
        url: "https://www.bankrate.com/insurance/homeowners-insurance/carriers-exit-california-home-insurance/",
      },
    ],
  },
  {
    carrier: "American National",
    status: "exited",
    action: "Stopped writing CA homeowners policies",
    date: "2023",
    notes: "Exited the California homeowners market.",
    sources: [
      {
        label: "Coverage Cat — Companies Still Insuring in CA",
        url: "https://www.coveragecat.com/blog/companies-still-insuring-homes-in-california-2025",
      },
    ],
  },
  {
    carrier: "Chubb",
    status: "reduced",
    action: "Substantially reduced new high-value homeowners policies in wildfire zones",
    date: "2022–2023",
    notes:
      "Continued writing for long-tenured clients; tightened underwriting significantly. Implemented stringent defensible space requirements.",
    sources: [],
  },

  // ── Still Writing ──────────────────────────────────────────────────────────
  {
    carrier: "Mercury Insurance",
    status: "writing",
    action: "Actively writing statewide; committed to distressed areas",
    date: "Current",
    notes:
      "First carrier to file rates under California's Sustainable Insurance Strategy. Committed to 6,000+ new policies in wildfire-distressed areas.",
    sources: [
      {
        label: "CDI — Mercury Expansion Announcement",
        url: "https://www.insurance.ca.gov/0400-news/0102-alerts/2025/Mercury-Insurance-and-CSAA-Expand-Homeow.cfm",
      },
    ],
  },
  {
    carrier: "CSAA (AAA NorCal)",
    status: "writing",
    action: "Continuing to write; committed to FAIR Plan depopulation",
    date: "Current",
    notes:
      "Implementing tighter wildfire underwriting standards (defensible space, construction class). Committed to taking policies out of the FAIR Plan.",
    sources: [
      {
        label: "CDI — CSAA Expansion Announcement",
        url: "https://www.insurance.ca.gov/0400-news/0102-alerts/2025/Mercury-Insurance-and-CSAA-Expand-Homeow.cfm",
      },
    ],
  },
  {
    carrier: "Auto Club of Southern CA (AAA SoCal)",
    status: "writing",
    action: "Writing for AAA members statewide",
    date: "Current",
    notes: "Membership-based insurer; restricted to AAA members only.",
    sources: [],
  },
  {
    carrier: "USAA",
    status: "writing",
    action: "Writing for active military, veterans, and families",
    date: "Current",
    notes: "Restricted to military community. Has maintained CA presence throughout the crisis.",
    sources: [],
  },
  {
    carrier: "ICW Group",
    status: "writing",
    action: "Actively writing CA homeowners",
    date: "Current",
    notes:
      "California-domiciled carrier. Expanded market share as national carriers retreated.",
    sources: [],
  },
  {
    carrier: "Pacific Specialty",
    status: "writing",
    action: "Writing admitted policies including wildfire-adjacent areas",
    date: "Current",
    notes: "Committed to growth under the Sustainable Insurance Strategy.",
    sources: [],
  },
  {
    carrier: "California Casualty",
    status: "writing",
    action: "Writing admitted policies statewide",
    date: "Current",
    notes:
      "Affinity-group carrier (educators, firefighters, nurses). Committed to growth in distressed areas.",
    sources: [],
  },
  {
    carrier: "Wawanesa",
    status: "writing",
    action: "Writing admitted homeowners in CA",
    date: "Current",
    notes: "Canadian-owned carrier with long CA presence. Still writing but volume unclear.",
    sources: [],
  },
  {
    carrier: "Lemonade",
    status: "writing",
    action: "Writing in select CA markets via digital platform",
    date: "Current",
    notes: "Insurtech; focused on lower-risk areas. Limited wildfire-zone appetite.",
    sources: [
      {
        label: "Coverage Cat — Companies Still Insuring in CA",
        url: "https://www.coveragecat.com/blog/companies-still-insuring-homes-in-california-2025",
      },
    ],
  },
  {
    carrier: "Bamboo Insurance",
    status: "writing",
    action: "Writing admitted CA policies including some wildfire areas",
    date: "Current",
    notes:
      "CA-focused MGA writing through admitted carriers. Uses technology-driven underwriting to price wildfire risk.",
    sources: [],
  },
];

export const PAGE_SOURCES: SourceLink[] = [
  {
    label: "CDI — Press Releases & Market Actions",
    url: "https://www.insurance.ca.gov/0400-news/0100-press-releases/",
  },
  {
    label: "Bankrate — Carriers That Exited CA Home Insurance",
    url: "https://www.bankrate.com/insurance/homeowners-insurance/carriers-exit-california-home-insurance/",
  },
  {
    label: "Coverage Cat — Companies Still Insuring in CA (2025)",
    url: "https://www.coveragecat.com/blog/companies-still-insuring-homes-in-california-2025",
  },
];

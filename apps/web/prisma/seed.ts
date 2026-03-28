import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function getOrCreateStateRegion(state: string) {
  const existing = await prisma.region.findFirst({
    where: { state, county: null, city: null, zipCode: null },
  });
  if (existing) return existing;
  return prisma.region.create({ data: { state } });
}

async function main() {
  // Regions
  const usRegion = await getOrCreateStateRegion("US");
  const caRegion = await getOrCreateStateRegion("CA");

  // Seed programs
  const programs = [
    {
      name: "Residential Clean Energy Credit",
      slug: "federal-residential-clean-energy-credit",
      delivery: "FEDERAL_TAX_CREDITS" as const,
      description:
        "A federal tax credit of 30% of the costs of new, qualified clean energy property for your home, including solar panels, solar water heaters, wind turbines, geothermal heat pumps, and battery storage.",
      category: "ENERGY_EFFICIENCY" as const,
      subcategory: "Solar & Renewables",
      provider: "FEDERAL" as const,
      providerName: "IRS / U.S. Department of Energy",
      url: "https://www.irs.gov/credits-deductions/residential-clean-energy-credit",
      maxAmount: null,
      amountDescription: "30% tax credit on qualifying costs (no cap)",
      incomeRestricted: false,
      regions: [usRegion.id],
      actionSteps: [
        {
          stepNumber: 1,
          title: "Install qualifying clean energy equipment",
          description:
            "Purchase and install eligible equipment such as solar panels, solar water heaters, small wind turbines, geothermal heat pumps, or battery storage systems.",
          estimatedTime: "Varies by project",
          documents: ["Installation contract", "Product specifications confirming eligibility"],
        },
        {
          stepNumber: 2,
          title: "Collect documentation from installer",
          description:
            "Get a detailed receipt or invoice showing the full cost of equipment and labor. Ask your installer for a certification statement if available.",
          estimatedTime: "1-2 days",
          documents: ["Itemized invoice", "Installer certification letter"],
        },
        {
          stepNumber: 3,
          title: "Complete IRS Form 5695",
          description:
            "File IRS Form 5695 (Residential Energy Credits) with your federal tax return. Enter your qualifying costs and calculate your 30% credit.",
          estimatedTime: "1-2 hours",
          documents: ["IRS Form 5695", "Tax return (Form 1040)"],
        },
      ],
    },
    {
      name: "Energy Efficient Home Improvement Credit",
      slug: "federal-energy-efficient-home-improvement-credit",
      delivery: "FEDERAL_TAX_CREDITS" as const,
      description:
        "Federal tax credit of up to $3,200 per year for home energy efficiency improvements including insulation, windows, doors, heat pumps, water heaters, and home energy audits.",
      category: "ENERGY_EFFICIENCY" as const,
      subcategory: "Home Efficiency",
      provider: "FEDERAL" as const,
      providerName: "IRS / U.S. Department of Energy",
      url: "https://www.irs.gov/credits-deductions/energy-efficient-home-improvement-credit",
      maxAmount: 3200,
      amountDescription: "Up to $3,200/year (30% of costs, sub-limits apply per category)",
      incomeRestricted: false,
      regions: [usRegion.id],
      actionSteps: [
        {
          stepNumber: 1,
          title: "Identify qualifying improvements",
          description:
            "Eligible items include exterior doors ($250/door, $500 total), windows ($600), insulation (30%), heat pumps ($2,000), and energy audits ($150).",
          estimatedTime: "30 minutes",
          documents: [],
        },
        {
          stepNumber: 2,
          title: "Get a home energy audit (optional but recommended)",
          description:
            "Hire an eligible auditor to identify the best improvements for your home. The audit itself qualifies for a $150 credit.",
          estimatedTime: "2-4 hours",
          documents: ["Auditor certification", "Audit report"],
        },
        {
          stepNumber: 3,
          title: "Purchase and install qualifying products",
          description:
            "Ensure products meet energy efficiency requirements. Ask retailers for the Manufacturer's Certification Statement confirming eligibility.",
          estimatedTime: "Varies",
          documents: ["Receipts", "Manufacturer's Certification Statement"],
        },
        {
          stepNumber: 4,
          title: "File IRS Form 5695 with your tax return",
          description: "Claim the credit on Form 5695, Section II. Note the annual $3,200 cap.",
          estimatedTime: "1 hour",
          documents: ["IRS Form 5695"],
        },
      ],
    },
    {
      name: "California Solar Initiative — Thermal Program",
      slug: "ca-solar-initiative-thermal",
      delivery: "CASH_REBATE_PROGRAMS" as const,
      description:
        "California rebate program for solar water heating systems for single-family and multi-family homes. Reduces upfront costs of solar thermal installations.",
      category: "ENERGY_EFFICIENCY" as const,
      subcategory: "Solar Thermal",
      provider: "STATE" as const,
      providerName: "California Public Utilities Commission",
      url: "https://www.californiasolarstatistics.ca.gov/csi-thermal/",
      maxAmount: 1500,
      amountDescription: "Rebate varies by system size and type",
      incomeRestricted: false,
      regions: [caRegion.id],
      actionSteps: [
        {
          stepNumber: 1,
          title: "Confirm eligibility",
          description:
            "Your home must be in a PG&E, SCE, or SoCalGas service territory. The solar thermal system must meet OG-300 certification requirements.",
          estimatedTime: "30 minutes",
          documents: [],
        },
        {
          stepNumber: 2,
          title: "Get quotes from eligible contractors",
          description:
            "Use a contractor registered with the CSI-Thermal program. They will typically handle the reservation application on your behalf.",
          estimatedTime: "1-2 weeks",
          documents: ["Contractor quotes"],
        },
        {
          stepNumber: 3,
          title: "Contractor submits reservation application",
          description:
            "Your contractor submits a reservation application to the program before installation begins.",
          estimatedTime: "1-2 weeks for approval",
          documents: [],
        },
        {
          stepNumber: 4,
          title: "Install the system and receive rebate",
          description:
            "After installation, your contractor submits the incentive claim. You receive the rebate check once the application is approved.",
          estimatedTime: "4-8 weeks",
          documents: ["Installation completion certificate", "Proof of purchase"],
        },
      ],
    },
    {
      name: "Federal EV Tax Credit (Clean Vehicle Credit)",
      slug: "federal-clean-vehicle-credit",
      delivery: "FEDERAL_TAX_CREDITS" as const,
      description:
        "Up to $7,500 federal tax credit for new electric vehicles and $4,000 for used EVs purchased from a dealer. Income and vehicle price limits apply.",
      category: "CLEAN_TRANSPORTATION" as const,
      provider: "FEDERAL" as const,
      providerName: "IRS / U.S. Department of Treasury",
      url: "https://www.irs.gov/credits-deductions/credits-for-new-clean-vehicles-purchased-in-2023-or-after",
      maxAmount: 7500,
      amountDescription: "Up to $7,500 for new EVs; up to $4,000 for used EVs",
      incomeRestricted: true,
      regions: [usRegion.id],
      actionSteps: [
        {
          stepNumber: 1,
          title: "Check income eligibility",
          description:
            "For new EVs: MAGI must be under $150,000 (single), $225,000 (head of household), or $300,000 (married filing jointly). For used EVs: limits are lower.",
          estimatedTime: "15 minutes",
          documents: ["Prior year tax return for MAGI calculation"],
        },
        {
          stepNumber: 2,
          title: "Choose an eligible vehicle",
          description:
            "The vehicle must meet final assembly and critical mineral requirements. Check the IRS or fueleconomy.gov for the current list of eligible models.",
          estimatedTime: "1-2 hours research",
          documents: [],
        },
        {
          stepNumber: 3,
          title: "Transfer credit at point of sale (recommended)",
          description:
            "You can transfer the credit to the dealership at time of purchase, reducing your vehicle price directly. The dealer must be registered with the IRS.",
          estimatedTime: "At purchase",
          documents: ["Income attestation form", "Government ID", "VIN"],
        },
        {
          stepNumber: 4,
          title: "Or claim on your tax return",
          description:
            "Alternatively, claim the credit on IRS Form 8936 with your federal tax return for the year of purchase.",
          estimatedTime: "1 hour",
          documents: ["IRS Form 8936", "Vehicle purchase documentation"],
        },
      ],
    },
  ];

  for (const program of programs) {
    const { regions, actionSteps, ...programData } = program;

    const upserted = await prisma.program.upsert({
      where: { slug: programData.slug },
      update: {},
      create: {
        ...programData,
        regions: {
          create: regions.map((regionId) => ({ regionId })),
        },
        actionSteps: {
          create: actionSteps,
        },
      },
    });

    console.log(`Seeded: ${upserted.name}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

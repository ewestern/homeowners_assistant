import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import type { Category, IncentivesResponse } from "@/lib/types";

// Lightweight address parser — extracts state abbreviation and zip code.
// Replace with a real geocoding API (e.g. Google Maps, Geocodio) in production.
function parseAddress(address: string): {
  state: string | null;
  city: string | null;
  zipCode: string | null;
} {
  const zipMatch = address.match(/\b(\d{5})\b/);
  const zipCode = zipMatch ? zipMatch[1] : null;

  // Match 2-letter state abbreviations preceded by a comma or space
  const stateMatch = address.match(/,\s*([A-Z]{2})\s*(\d{5})?$/i);
  const state = stateMatch ? stateMatch[1].toUpperCase() : null;

  // Rough city extraction: last word before the state
  const cityMatch = address.match(/,\s*([^,]+),\s*[A-Z]{2}/i);
  const city = cityMatch ? cityMatch[1].trim() : null;

  return { state, city, zipCode };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  const categoriesParam = searchParams.get("categories");

  if (!address) {
    return NextResponse.json({ error: "address is required" }, { status: 400 });
  }

  const { state, city, zipCode } = parseAddress(address);

  const categories = categoriesParam
    ? (categoriesParam.split(",").map((c) => c.trim().toUpperCase()) as Category[])
    : undefined;

  // Find regions matching the address (broadest match first — state, then city/zip)
  const matchingRegions = await prisma.region.findMany({
    where: {
      OR: [
        { state: state ?? undefined },
        { zipCode: zipCode ?? undefined },
        { city: city ?? undefined },
        // Federal programs stored with state = "US"
        { state: "US" },
      ],
    },
    select: { id: true },
  });

  const regionIds = matchingRegions.map((r) => r.id);

  const programs = await prisma.program.findMany({
    where: {
      isActive: true,
      ...(categories ? { category: { in: categories } } : {}),
      regions: {
        some: {
          regionId: { in: regionIds },
        },
      },
    },
    include: {
      actionSteps: {
        orderBy: { stepNumber: "asc" },
      },
    },
    orderBy: [{ category: "asc" }, { maxAmount: "desc" }],
  });

  const response: IncentivesResponse = {
    programs: programs.map((p) => ({
      ...p,
      deadline: p.deadline?.toISOString() ?? null,
    })),
    address,
    region: { state, city, zipCode },
  };

  return NextResponse.json(response);
}

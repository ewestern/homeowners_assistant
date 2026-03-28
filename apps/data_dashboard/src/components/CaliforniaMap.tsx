"use client";

import { useState, useRef, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// US Census county boundaries (us-atlas v3, public domain)
const COUNTY_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";
// California ZCTA boundaries (OpenDataDE, derived from US Census TIGER/Line, public domain)
const ZIP_URL =
  "https://raw.githubusercontent.com/OpenDataDE/State-zip-code-GeoJSON/master/ca_california_zip_codes_geo.min.json";

type View = "counties" | "zips";

interface TooltipState {
  label: string;
  x: number;
  y: number;
}

interface Props {
  distressedFips: Set<string>;
  undermarketedZips: Set<string>;
}

function getZipCode(properties: Record<string, unknown>): string {
  // Census TIGER property names vary by vintage; try all known variants
  return String(
    properties.ZCTA5CE20 ??
    properties.ZCTA5CE10 ??
    properties.GEOID20 ??
    properties.GEOID10 ??
    properties.ZIP ??
    properties.zip ??
    ""
  );
}

export function CaliforniaMap({ distressedFips, undermarketedZips }: Props) {
  const [view, setView] = useState<View>("counties");
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [zipGeoData, setZipGeoData] = useState<object | null>(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch ZIP boundaries once when the user first switches to zip view
  useEffect(() => {
    if (view !== "zips" || zipGeoData !== null || showSpinner) return;
    setShowSpinner(true);
    fetch(ZIP_URL)
      .then((r) => r.json())
      .then((data) => setZipGeoData(data))
      .catch(() => setShowSpinner(false));
  }, [view, zipGeoData, showSpinner]);

  // Hide spinner only after the browser has painted the SVG paths.
  // Double rAF: first fires after React commits to the DOM, second after paint.
  useEffect(() => {
    if (!zipGeoData || !showSpinner) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setShowSpinner(false));
    });
    return () => cancelAnimationFrame(id);
  }, [zipGeoData, showSpinner]);

  function onMouseMove(e: React.MouseEvent) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setTooltip((prev) =>
      prev ? { ...prev, x: e.clientX - rect.left, y: e.clientY - rect.top } : null
    );
  }

  const projectionConfig = { center: [-119.6, 37.3] as [number, number], scale: 2700 };

  return (
    <div>
      {/* Toggle */}
      <div className="flex gap-2 mb-5">
        {(["counties", "zips"] as View[]).map((v) => (
          <button
            key={v}
            onClick={() => { setView(v); setTooltip(null); }}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
              view === v
                ? "bg-stone-800 text-white border-stone-800"
                : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
            }`}
          >
            {v === "counties"
              ? `Distressed Counties (${distressedFips.size})`
              : `Undermarketed ZIPs (${undermarketedZips.size})`}
          </button>
        ))}
      </div>

      <div
        ref={containerRef}
        className="relative w-full select-none"
        onMouseMove={onMouseMove}
        onMouseLeave={() => setTooltip(null)}
      >
        {/* Spinner overlay — shown during fetch AND while SVG paths are rendering */}
        {showSpinner && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 rounded-xl gap-3">
            <svg
              className="h-8 w-8 animate-spin text-stone-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <p className="text-sm text-stone-500">Loading ZIP code boundaries…</p>
          </div>
        )}

        <ComposableMap
          projection="geoMercator"
          projectionConfig={projectionConfig}
          width={520}
          height={620}
          style={{ width: "100%", height: "auto" }}
        >
          {view === "counties" ? (
            <Geographies geography={COUNTY_URL}>
              {({ geographies }) =>
                geographies
                  .filter((geo) => String(geo.id).padStart(5, "0").startsWith("06"))
                  .map((geo) => {
                    const fips = String(geo.id).padStart(5, "0");
                    const isDistressed = distressedFips.has(fips);
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={isDistressed ? "#ef4444" : "#e2e0dc"}
                        stroke="#fff"
                        strokeWidth={0.6}
                        style={{
                          default: { outline: "none" },
                          hover: { fill: isDistressed ? "#dc2626" : "#c4c0bb", outline: "none" },
                          pressed: { outline: "none" },
                        }}
                        onMouseEnter={(e: React.MouseEvent) => {
                          if (!containerRef.current) return;
                          const rect = containerRef.current.getBoundingClientRect();
                          setTooltip({
                            label: `${geo.properties.name as string} County${isDistressed ? " · Distressed" : ""}`,
                            x: e.clientX - rect.left,
                            y: e.clientY - rect.top,
                          });
                        }}
                        onMouseLeave={() => setTooltip(null)}
                      />
                    );
                  })
              }
            </Geographies>
          ) : zipGeoData ? (
            <Geographies geography={zipGeoData}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const zip = getZipCode(geo.properties as Record<string, unknown>);
                  const isUndermarketed = undermarketedZips.has(zip);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={isUndermarketed ? "#ef4444" : "#e2e0dc"}
                      stroke={isUndermarketed ? "#fff" : "#d4d0cb"}
                      strokeWidth={isUndermarketed ? 0.4 : 0.2}
                      style={{
                        default: { outline: "none" },
                        hover: {
                          fill: isUndermarketed ? "#dc2626" : "#c4c0bb",
                          outline: "none",
                        },
                        pressed: { outline: "none" },
                      }}
                      onMouseEnter={(e: React.MouseEvent) => {
                        if (!containerRef.current || !zip) return;
                        const rect = containerRef.current.getBoundingClientRect();
                        setTooltip({
                          label: `ZIP ${zip}${isUndermarketed ? " · Undermarketed" : ""}`,
                          x: e.clientX - rect.left,
                          y: e.clientY - rect.top,
                        });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  );
                })
              }
            </Geographies>
          ) : null}
        </ComposableMap>

        {/* Floating tooltip */}
        {tooltip && (
          <div
            className="pointer-events-none absolute z-10 rounded-lg bg-stone-900 px-2.5 py-1.5 text-xs text-white shadow-lg whitespace-nowrap"
            style={{ left: tooltip.x + 12, top: tooltip.y - 32 }}
          >
            {tooltip.label}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-stone-500">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-4 rounded-sm bg-red-500" />
          {view === "counties" ? "Distressed county" : "Undermarketed ZIP"}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-4 rounded-sm bg-[#e2e0dc] border border-stone-300" />
          Other CA {view === "counties" ? "county" : "ZIP code"}
        </span>
        <span className="ml-auto">
          <a
            href="https://www.insurance.ca.gov/01-consumers/180-climate-change/upload/catastrophe-modeling-and-ratemaking-insurer-commitments-to-increase-writing-of-policies-in-high-risk-wildfire-areas-list-of-distressed-counties-and-undermarketed-zip-codes-residential-property-insurance-commitments.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 underline underline-offset-2 hover:text-green-800"
          >
            Source: CDI March 2025 PDF →
          </a>
        </span>
      </div>
    </div>
  );
}

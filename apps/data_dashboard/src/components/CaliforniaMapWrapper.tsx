"use client";

import dynamic from "next/dynamic";

const CaliforniaMap = dynamic(
  () => import("./CaliforniaMap").then((m) => m.CaliforniaMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-[520/660] bg-stone-100 animate-pulse rounded-xl" />
    ),
  }
);

interface Props {
  distressedFips: string[];
  undermarketedZips: string[];
}

export function CaliforniaMapWrapper({ distressedFips, undermarketedZips }: Props) {
  return (
    <CaliforniaMap
      distressedFips={new Set(distressedFips)}
      undermarketedZips={new Set(undermarketedZips)}
    />
  );
}

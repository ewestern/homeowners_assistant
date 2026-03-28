"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Overview",         href: "/"                  },
  { label: "CDI Market Share", href: "/market-share"      },
  { label: "Carrier Status",   href: "/carrier-status"    },
  { label: "FAIR Plan Growth", href: "/fair-plan"         },
  { label: "E&S Market Surge", href: "/es-market"         },
  { label: "Distressed Areas", href: "/distressed-areas"  },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 mt-6">
      {NAV_ITEMS.map(({ label, href }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              active
                ? "bg-green-50 text-green-800 font-semibold"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

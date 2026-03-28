import type { Metadata } from "next";
import "./globals.css";
import { NavLinks } from "@/components/NavLinks";

export const metadata: Metadata = {
  title: "CA Insurance Crisis Dashboard",
  description:
    "Public data on the California homeowners insurance market — market share, carrier status, FAIR Plan growth, E&S market, and distressed areas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-stone-50 text-stone-900 antialiased">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-56 shrink-0 bg-white border-r border-stone-200 flex flex-col px-4 py-6 sticky top-0 h-screen overflow-y-auto">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 bg-green-600 rounded-md flex items-center justify-center shrink-0">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold text-stone-900 leading-tight">
                CA Insurance<br />Dashboard
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-1 mb-2">Public data only</p>
            <NavLinks />
            <div className="mt-auto pt-6 border-t border-stone-100">
              <p className="text-xs text-stone-400 leading-relaxed">
                Data from CDI, FAIR Plan, SLAC, and other public sources. Verify figures directly with source agencies.
              </p>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Homeowners Assistant — Find Incentives & Rebates",
  description:
    "Discover federal, state, and local incentive programs for energy efficiency, disaster resilience, water conservation, and more. Tailored to your home and location.",
  keywords: [
    "homeowner incentives",
    "energy rebates",
    "home improvement grants",
    "solar incentives",
    "disaster resilience",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-stone-50 text-stone-900 antialiased">
        <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <span className="text-lg font-semibold text-stone-900">
                Homeowners Assistant
              </span>
            </div>
            <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-stone-600">
              <a href="#" className="hover:text-green-700 transition-colors">
                How It Works
              </a>
              <a href="#" className="hover:text-green-700 transition-colors">
                About
              </a>
              <a
                href="#"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Get Started
              </a>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="bg-stone-900 text-stone-400 mt-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
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
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <span className="text-white font-semibold">
                    Homeowners Assistant
                  </span>
                </div>
                <p className="text-sm leading-relaxed">
                  Helping homeowners discover and access incentive programs for a
                  better, more resilient home.
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-3">Categories</h3>
                <ul className="space-y-1 text-sm">
                  <li>Energy Efficiency</li>
                  <li>Disaster Resilience</li>
                  <li>Water Conservation</li>
                  <li>Safety &amp; Health</li>
                  <li>Clean Transportation</li>
                  <li>Land &amp; Ecosystem</li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-3">Resources</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Federal Programs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      State Programs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Utility Rebates
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-stone-700 pt-6 text-sm text-center">
              &copy; {new Date().getFullYear()} Homeowners Assistant. Information
              provided for educational purposes only. Verify eligibility directly
              with program providers.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

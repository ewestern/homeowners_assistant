"use client";

import { useState } from "react";
import type { Program } from "@/lib/types";
import { CATEGORY_LABELS, CATEGORY_COLORS, PROVIDER_LABELS, DELIVERY_LABELS } from "@/lib/types";

export function IncentiveCard({ program }: { program: Program }) {
  const [expanded, setExpanded] = useState(false);
  const colors = CATEGORY_COLORS[program.category];

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors.bg} ${colors.text} ${colors.border}`}
            >
              {CATEGORY_LABELS[program.category]}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-600 border border-stone-200">
              {PROVIDER_LABELS[program.provider]}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-700 border border-sky-200">
              {DELIVERY_LABELS[program.delivery]}
            </span>
            {program.incomeRestricted && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200">
                Income Restricted
              </span>
            )}
          </div>
          {program.maxAmount !== null && (
            <div className="text-right shrink-0">
              <div className="text-lg font-bold text-green-700">
                ${program.maxAmount.toLocaleString()}
              </div>
              <div className="text-xs text-stone-500">max benefit</div>
            </div>
          )}
        </div>

        <h3 className="text-base font-semibold text-stone-900 mb-1">{program.name}</h3>
        <p className="text-sm text-stone-500 mb-1">{program.providerName}</p>

        {program.amountDescription && (
          <p className="text-sm text-stone-600 mb-2">{program.amountDescription}</p>
        )}

        <p className="text-sm text-stone-700 leading-relaxed">{program.description}</p>

        {program.deadline && (
          <p className="mt-2 text-xs text-red-600 font-medium">
            Deadline: {new Date(program.deadline).toLocaleDateString()}
          </p>
        )}

        {/* Links & expand */}
        <div className="mt-4 flex items-center gap-3">
          {program.url && (
            <a
              href={program.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-green-700 hover:text-green-800 underline underline-offset-2"
            >
              Official Program Page →
            </a>
          )}
          {program.actionSteps.length > 0 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="ml-auto text-sm font-medium text-stone-600 hover:text-stone-900 flex items-center gap-1"
            >
              {expanded ? "Hide" : "Show"} Action Plan
              <svg
                className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Action Steps */}
      {expanded && program.actionSteps.length > 0 && (
        <div className="border-t border-stone-100 bg-stone-50 p-5">
          <h4 className="text-sm font-semibold text-stone-800 mb-3">Action Plan</h4>
          <ol className="space-y-4">
            {program.actionSteps.map((step) => (
              <li key={step.id} className="flex gap-3">
                <div className="shrink-0 w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                  {step.stepNumber}
                </div>
                <div>
                  <div className="text-sm font-medium text-stone-900">{step.title}</div>
                  <div className="text-sm text-stone-600 mt-0.5">{step.description}</div>
                  {step.estimatedTime && (
                    <div className="text-xs text-stone-400 mt-1">⏱ {step.estimatedTime}</div>
                  )}
                  {step.documents.length > 0 && (
                    <div className="mt-1.5">
                      <span className="text-xs font-medium text-stone-500">Documents needed: </span>
                      <span className="text-xs text-stone-600">{step.documents.join(", ")}</span>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

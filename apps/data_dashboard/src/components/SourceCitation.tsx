import type { SourceLink } from "@/lib/types";

interface Props {
  sources: SourceLink[];
  dataAsOf?: string;
}

export function SourceCitation({ sources, dataAsOf }: Props) {
  return (
    <div className="mt-10 pt-6 border-t border-stone-200">
      <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">
        Data Sources
      </p>
      {dataAsOf && (
        <p className="text-xs text-stone-400 mb-2">Data as of: {dataAsOf}</p>
      )}
      <ul className="space-y-1">
        {sources.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-green-700 hover:text-green-800 underline underline-offset-2"
            >
              {s.label} →
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

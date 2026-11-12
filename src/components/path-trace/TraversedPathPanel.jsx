// src/components/path-trace/TraversedPathPanel.jsx
import AutomateConfigurationChip from "./AutomateConfigurationChip";
import WordAcceptanceBadge from "./WordAcceptanceBadge";

export default function TraversedPathPanel({ testResult }) {
  const { accepted, path, explanation } = testResult;
  const lastIndex = path.length - 1;

  // Seule la dernière configuration est colorée : verte si accepté, rouge sinon.
  function statusOf(index) {
    if (index !== lastIndex) return "normal";
    return accepted ? "accepted" : "rejected";
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white">
      <header className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-900">Chemin parcouru</h2>
        <WordAcceptanceBadge accepted={accepted} />
      </header>
      <div className="p-4">
        <ol className="flex flex-wrap items-center gap-2">
          {path.map(({ state, remaining }, index) => (
            <li
              key={`${index}-${state}-${remaining}`}
              className="flex items-center gap-2"
            >
              {index > 0 && (
                <span aria-hidden="true" className="text-slate-400">
                  ⊢
                </span>
              )}
              <AutomateConfigurationChip
                state={state}
                remaining={remaining}
                status={statusOf(index)}
              />
            </li>
          ))}
        </ol>
        <p className="mt-3 text-xs text-slate-500">{explanation}</p>
      </div>
    </section>
  );
}
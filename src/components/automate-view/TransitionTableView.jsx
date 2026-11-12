// src/components/automate-view/TransitionTableView.jsx
export default function TransitionTableView({ automate }) {
  const symbols = [...new Set(automate.transitions.map((t) => t.symbol))].sort();

  function targetsOf(stateId, symbol) {
    return automate.transitions
      .filter((t) => t.from === stateId && t.symbol === symbol)
      .map((t) => t.to);
  }

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">
              État
            </th>
            {symbols.map((symbol) => (
              <th
                key={symbol}
                className="border border-slate-200 bg-slate-50 px-3 py-2 font-mono"
              >
                {symbol}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {automate.states.map((state) => (
            <tr key={state.id}>
              <th
                scope="row"
                className="border border-slate-200 px-3 py-2 text-left font-mono"
              >
                {state.initial && "→ "}
                {state.final && "* "}
                {state.id}
              </th>
              {symbols.map((symbol) => {
                const targets = targetsOf(state.id, symbol);
                return (
                  <td
                    key={symbol}
                    className="border border-slate-200 px-3 py-2 text-center font-mono"
                  >
                    {targets.length > 0 ? targets.join(", ") : "—"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-xs text-slate-500">→ état initial · * état final</p>
    </div>
  );
}
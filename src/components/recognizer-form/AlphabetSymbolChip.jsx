// src/components/recognizer-form/AlphabetSymbolChip.jsx
export default function AlphabetSymbolChip({ symbol }) {
  return (
    <span className="rounded border border-slate-300 bg-white px-2 py-0.5 font-mono text-sm text-slate-900">
      {symbol}
    </span>
  );
}
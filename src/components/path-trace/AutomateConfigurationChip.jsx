// src/components/path-trace/AutomateConfigurationChip.jsx
const statusClasses = {
  normal: "border-slate-300 bg-slate-50 text-slate-900",
  accepted: "border-green-600 bg-green-50 text-green-800",
  rejected: "border-red-600 bg-red-50 text-red-800",
};

export default function AutomateConfigurationChip({
  state,
  remaining,
  status = "normal",
}) {
  return (
    <span
      className={`rounded border px-2 py-1 font-serif text-sm ${statusClasses[status]}`}
    >
      ({state}, {remaining === "" ? "ε" : remaining})
    </span>
  );
}
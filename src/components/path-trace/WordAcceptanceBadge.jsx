// src/components/path-trace/WordAcceptanceBadge.jsx
export default function WordAcceptanceBadge({ accepted }) {
  const colors = accepted
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${colors}`}>
      {accepted ? "Mot accepté" : "Mot refusé"}
    </span>
  );
}
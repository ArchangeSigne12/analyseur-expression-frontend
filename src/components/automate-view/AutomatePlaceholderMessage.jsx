// src/components/automate-view/AutomatePlaceholderMessage.jsx
export default function AutomatePlaceholderMessage({ title, message }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-6 py-14 text-center">
      <p className="font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-slate-500">{message}</p>
    </div>
  );
}
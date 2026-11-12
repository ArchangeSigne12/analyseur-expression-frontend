// src/components/automate-view/AutomateViewTabs.jsx
export default function AutomateViewTabs({ tabs, activeTabId, onChange }) {
  return (
    <div role="tablist" className="flex flex-wrap gap-1">
      {tabs.map(({ id, label }) => {
        const isActive = id === activeTabId;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(id)}
            className={`rounded px-3 py-1.5 text-sm ${
              isActive
                ? "bg-slate-100 font-semibold text-slate-900"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
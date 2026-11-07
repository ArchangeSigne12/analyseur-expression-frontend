import { NavLink } from "react-router-dom";

const tabs = [
  { to: "/", label: "Reconnaisseur" },
  { to: "/jeu-d-essai", label: "Jeu d'essai" },
];

export default function PageNavigationTabs() {
  return (
    <nav className="flex gap-2">
      {tabs.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          end
          className={({ isActive }) =>
            `rounded-t border-b-2 px-4 py-2 text-sm ${
              isActive
                ? "border-blue-700 bg-slate-100 font-semibold text-slate-900"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
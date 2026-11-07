import PageNavigationTabs from "./PageNavigationTabs";

export default function ApplicationHeader() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">
          Reconnaisseur de langage régulier
        </h1>
        <p className="text-xs text-slate-500">
          Expression régulière → automate → mot
        </p>
      </div>
      <PageNavigationTabs />
    </header>
  );
}
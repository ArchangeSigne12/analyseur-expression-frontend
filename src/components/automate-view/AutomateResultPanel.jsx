// src/components/automate-view/AutomateResultPanel.jsx
import { useState } from "react";
import AutomateDiagram from "./AutomateDiagram";
import AutomatePlaceholderMessage from "./AutomatePlaceholderMessage";
import AutomateViewTabs from "./AutomateViewTabs";
import TransitionTableView from "./TransitionTableView";

const TABS = [
  { id: "afdMinimal", label: "AFD minimal" },
  { id: "afd", label: "AFD" },
  { id: "afn", label: "AFN (Thompson)" },
  { id: "table", label: "Table de transitions" },
];

export default function AutomateResultPanel({ recognizer }) {
  const { automate, testResult, expressionErrors } = recognizer;
  const [activeTabId, setActiveTabId] = useState("afdMinimal");

  if (!automate) {
    const errorCount = expressionErrors.length;
    const placeholder =
      errorCount > 0
        ? {
            title: "Expression à corriger",
            message:
              errorCount === 1
                ? "Corrigez l'erreur à gauche pour construire l'automate."
                : `Corrigez les ${errorCount} erreurs à gauche pour construire l'automate.`,
          }
        : {
            title: "Aucun automate pour le moment",
            message:
              "Saisissez un alphabet et une expression, puis construisez l'automate.",
          };

    return (
      <section className="bg-slate-100 p-6">
        <AutomatePlaceholderMessage {...placeholder} />
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4 bg-slate-100 p-6">
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <header className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-900">Automate</h2>
          <AutomateViewTabs
            tabs={TABS}
            activeTabId={activeTabId}
            onChange={setActiveTabId}
          />
        </header>

        <p className="border-b border-slate-200 px-4 py-2 text-xs text-slate-500">
          Notation postfixée :{" "}
          <span className="font-mono text-slate-900">{automate.postfix}</span>
        </p>

        {activeTabId === "afdMinimal" && (
          <AutomateDiagram automate={automate.afdMinimal} testResult={testResult} />
        )}
        {activeTabId === "afd" && <AutomateDiagram automate={automate.afd} />}
        {activeTabId === "afn" && <AutomateDiagram automate={automate.afn} />}
        {activeTabId === "table" && (
          <TransitionTableView automate={automate.afdMinimal} />
        )}
      </div>
    </section>
  );
}
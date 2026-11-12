// src/components/automate-view/AutomateDiagram.jsx
import { useEffect, useRef, useState } from "react";
import { instance } from "@viz-js/viz";
import { automateToDot } from "../../utils/automateToDot";

// L'instance de Graphviz est créée une seule fois, puis réutilisée.
let vizPromise = null;
function getViz() {
  vizPromise ??= instance();
  return vizPromise;
}

const gridStyle = {
  backgroundImage:
    "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

export default function AutomateDiagram({ automate, testResult = null }) {
  const containerRef = useRef(null);
  const [hasRenderError, setHasRenderError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    let isCancelled = false;

    getViz()
      .then((viz) => {
        if (isCancelled) return;
        const svg = viz.renderSVGElement(automateToDot(automate, testResult));
        container.replaceChildren(svg);
        setHasRenderError(false);
      })
      .catch(() => {
        if (!isCancelled) setHasRenderError(true);
      });

    // Si les données changent avant la fin du dessin, on ignore l'ancien résultat.
    return () => {
      isCancelled = true;
    };
  }, [automate, testResult]);

  return (
    <div className="overflow-x-auto bg-white" style={gridStyle}>
      <div
        ref={containerRef}
        className="flex min-h-64 items-center p-4 [&>svg]:mx-auto"
      />
      {hasRenderError && (
        <p className="px-4 pb-4 text-sm text-red-700">
          Impossible de dessiner l'automate.
        </p>
      )}
    </div>
  );
}
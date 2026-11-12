// src/utils/automateToDot.js
const BLUE = "#2952cc";
const GREEN = "#15803d";
const RED = "#b91c1c";
const INK = "#0f172a";
const MUTED = "#94a3b8";

// Protège les caractères spéciaux (guillemets, antislash) dans un texte DOT.
function quote(text) {
  return `"${String(text).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

// Résume le résultat d'un test pour savoir quoi surligner.
function analyzeTest(testResult) {
  if (!testResult || testResult.path.length === 0) return null;

  const { path, accepted, takenTransitions } = testResult;
  const last = path[path.length - 1];

  return {
    // Les transitions empruntées, fournies par le backend
    edgePairs: new Set(takenTransitions.map(({ from, to }) => `${from}->${to}`)),
    accepted,
    lastState: last.state,
    // Mot refusé alors qu'il reste des symboles : le parcours est bloqué
    stuckSymbol: !accepted && last.remaining !== "" ? [...last.remaining][0] : null,
  };
}

export function automateToDot(automate, testResult = null) {
  const analysis = analyzeTest(testResult);
  const initialState = automate.states.find((state) => state.initial);

  const lines = [
    "digraph automate {",
    "  rankdir=LR;",
    "  ranksep=0.8;",
    '  bgcolor="transparent";',
    `  node [shape=circle fontname="Times-Roman" fontsize=14 color="${INK}" fontcolor="${INK}"];`,
    `  edge [fontname="Times-Italic" fontsize=14 color="${BLUE}" fontcolor="${BLUE}" penwidth=1.5];`,
  ];

  // Flèche d'entrée vers l'état initial
  if (initialState) {
    lines.push('  "__start" [shape=point style=invis width=0];');
    lines.push(`  "__start" -> ${quote(initialState.id)};`);
  }

  // États : cercle double si final, coloré là où le parcours s'arrête
  automate.states.forEach((state) => {
    const attributes = [`shape=${state.final ? "doublecircle" : "circle"}`];
    if (analysis && analysis.lastState === state.id) {
      const color = analysis.accepted ? GREEN : RED;
      const fill = analysis.accepted ? "#dcfce7" : "#fee2e2";
      attributes.push(
        `color="${color}"`,
        `fontcolor="${color}"`,
        "style=filled",
        `fillcolor="${fill}"`,
        "penwidth=2"
      );
    }
    lines.push(`  ${quote(state.id)} [${attributes.join(" ")}];`);
  });

  // Transitions : celles qui relient les mêmes états sont regroupées (« a, b »)
  const groups = new Map();
  automate.transitions.forEach(({ from, to, symbol }) => {
    const key = `${from}->${to}`;
    const group = groups.get(key) ?? { from, to, symbols: [] };
    group.symbols.push(symbol);
    groups.set(key, group);
  });

  groups.forEach(({ from, to, symbols }, key) => {
    const attributes = [`label=${quote(symbols.join(", "))}`];
    if (analysis) {
      if (analysis.edgePairs.has(key)) {
        attributes.push("penwidth=2.5");
      } else {
        attributes.push(`color="${MUTED}"`, `fontcolor="${MUTED}"`);
      }
    }
    lines.push(`  ${quote(from)} -> ${quote(to)} [${attributes.join(" ")}];`);
  });

  // Flèche rouge en pointillés : la transition qui n'existe pas
  if (analysis?.stuckSymbol) {
    lines.push('  "__stuck" [shape=point style=invis width=0];');
    lines.push(
      `  ${quote(analysis.lastState)} -> "__stuck" [label=${quote(
        `${analysis.stuckSymbol} ✕`
      )} style=dashed color="${RED}" fontcolor="${RED}"];`
    );
  }

  lines.push("}");
  return lines.join("\n");
}


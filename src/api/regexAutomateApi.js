// src/api/regexAutomateApi.js
import { post } from "./httpClient";

// ---------- Traduction du vocabulaire du backend vers celui du front ----------

// Le backend dit « regex » et « mot », le front dit « expression » et « word ».
const FIELD_BY_BACKEND_NAME = {
  alphabet: "alphabet",
  regex: "expression",
  mot: "word",
};

function fromBackendError({ champ, message, position }) {
  return {
    field: FIELD_BY_BACKEND_NAME[champ] ?? "expression",
    message,
    position,
  };
}

function fromBackendTransition({ de, symbole, vers }) {
  return { from: de, symbol: symbole, to: vers };
}

// Backend : { etats: ["q0", ...], initial: "q0", finaux: ["q1"], transitions: [{ de, symbole, vers }] }
// Front   : { states: [{ id, initial, final }], transitions: [{ from, to, symbol }] }
function fromBackendAutomate(dto) {
  return {
    states: dto.etats.map((id) => ({
      id,
      initial: id === dto.initial,
      final: dto.finaux.includes(id),
    })),
    transitions: dto.transitions.map(fromBackendTransition),
  };
}

// ---------- Les trois appels ----------

export async function validateExpression(alphabetSymbols, expression) {
  const response = await post("/api/valider", {
    alphabet: alphabetSymbols,
    regex: expression,
  });

  return {
    isValid: response.valide,
    errors: response.erreurs.map(fromBackendError),
  };
}

export async function buildAutomate(alphabetSymbols, expression) {
  const response = await post("/api/automate", {
    alphabet: alphabetSymbols,
    regex: expression,
  });

  return {
    postfix: response.postfixe,
    afn: fromBackendAutomate(response.afn),
    afd: fromBackendAutomate(response.afd),
    afdMinimal: fromBackendAutomate(response.afdMinimal),
  };
}

export async function testWord(alphabetSymbols, expression, word) {
  const response = await post("/api/reconnaitre", {
    alphabet: alphabetSymbols,
    regex: expression,
    mot: word,
  });

  return {
    accepted: response.accepte,
    explanation: response.message,
    // Le backend l'appelle « afd » ici, mais c'est l'AFD minimal (à confirmer avec ta collègue).
    afdMinimal: fromBackendAutomate(response.afd),
    path: response.chemin.map(({ etat, reste }) => ({
      state: etat,
      remaining: reste,
    })),
    takenTransitions: response.transitionsEmpruntees.map(fromBackendTransition),
  };
}
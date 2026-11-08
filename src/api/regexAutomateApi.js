// src/api/regexAutomateApi.js
import { post } from "./httpClient";

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
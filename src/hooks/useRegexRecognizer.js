// src/hooks/useRegexRecognizer.js

import { useRef, useState } from "react";
import { ApiError } from "../api/httpClient";
import { validateExpression as requestValidation } from "../api/regexAutomateApi";
import { parseAlphabetSymbols } from "../utils/parseAlphabetSymbols";
import { validateAlphabetSymbols } from "../utils/validateAlphabetSymbols";

function describeRequestFailure(error) {
  if (error instanceof ApiError) {
    return `Le serveur a refusé la requête (erreur ${error.status}).`;
  }
  return "Le serveur est injoignable : vérifiez que le backend est lancé.";
}

export default function useRegexRecognizer() {
  const [alphabetText, setAlphabetText] = useState("");
  const [expression, setExpression] = useState("");
  const [word, setWord] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [isExpressionValid, setIsExpressionValid] = useState(false);
  const [isAutomateBuilt, setIsAutomateBuilt] = useState(false);
  const validationRequestId = useRef(0);

  // Valeurs dérivées : calculées à chaque affichage, jamais stockées.
  const alphabetSymbols = parseAlphabetSymbols(alphabetText);
  const localAlphabetErrors = validateAlphabetSymbols(alphabetSymbols);
  const isAlphabetValid =
    alphabetSymbols.length > 0 && localAlphabetErrors.length === 0;

  // Les erreurs du backend sont réparties selon le champ concerné.
  const alphabetErrors = [
    ...localAlphabetErrors,
    ...validationErrors.filter((error) => error.field === "alphabet"),
  ];
  const expressionErrors = validationErrors.filter(
    (error) => error.field !== "alphabet"
  );

  const canValidateExpression = isAlphabetValid;
  const canBuildAutomate = isExpressionValid && isAlphabetValid;
  const canTestWord = isAutomateBuilt;

  // Si la saisie change, tous les résultats deviennent obsolètes.
  function resetResults() {
    validationRequestId.current += 1; // invalide une requête encore en cours
    setValidationErrors([]);
    setIsExpressionValid(false);
    setIsAutomateBuilt(false);
  }

  function changeAlphabet(text) {
    setAlphabetText(text);
    resetResults();
  }

  function changeExpression(text) {
    setExpression(text);
    resetResults();
  }

  async function validateExpression() {
    if (!canValidateExpression) return;

    if (expression.trim() === "") {
      setValidationErrors([{ field: "expression", message: "L'expression est vide." }]);
      setIsExpressionValid(false);
      return;
    }

    validationRequestId.current += 1;
    const requestId = validationRequestId.current;

    let errors = [];
    let isValid = false;
    try {
      const result = await requestValidation(alphabetSymbols, expression);
      errors = result.errors;
      isValid = result.isValid;
    } catch (error) {
      errors = [{ field: "expression", message: describeRequestFailure(error) }];
    }

    // Si la saisie a changé pendant l'attente, cette réponse est périmée : on l'ignore.
    if (requestId !== validationRequestId.current) return;

    setValidationErrors(errors);
    setIsExpressionValid(isValid);
  }

  function buildAutomate() {
    if (!canBuildAutomate) return;
    // TODO : appeler POST /api/automate.
    setIsAutomateBuilt(true);
  }

  function testWord() {
    // TODO : appeler POST /api/reconnaitre.
  }

  return {
    alphabetText,
    alphabetSymbols,
    alphabetErrors,
    expression,
    word,
    expressionErrors,
    isExpressionValid,
    canValidateExpression,
    canBuildAutomate,
    canTestWord,
    changeAlphabet,
    changeExpression,
    changeWord: setWord,
    validateExpression,
    buildAutomate,
    testWord,
  };
}
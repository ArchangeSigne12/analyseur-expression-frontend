// src/hooks/useRegexRecognizer.js
import { useRef, useState } from "react";
import { ApiError } from "../api/httpClient";
import {
  buildAutomate as requestAutomate,
  testWord as requestWordTest,
  validateExpression as requestValidation,
} from "../api/regexAutomateApi";
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
  const [automate, setAutomate] = useState(null);
  const [testResult, setTestResult] = useState(null);
  const [actionError, setActionError] = useState(null);

  // Numéros de requête : servent à ignorer une réponse devenue périmée.
  const setupRequestId = useRef(0); // validation et construction
  const testRequestId = useRef(0); // test d'un mot

  // Valeurs dérivées : calculées à chaque affichage, jamais stockées.
  const alphabetSymbols = parseAlphabetSymbols(alphabetText);
  const localAlphabetErrors = validateAlphabetSymbols(alphabetSymbols);
  const isAlphabetValid =
    alphabetSymbols.length > 0 && localAlphabetErrors.length === 0;

  const alphabetErrors = [
    ...localAlphabetErrors,
    ...validationErrors.filter((error) => error.field === "alphabet"),
  ];
  const expressionErrors = validationErrors.filter(
    (error) => error.field !== "alphabet"
  );

  const canValidateExpression = isAlphabetValid;
  const canBuildAutomate = isExpressionValid && isAlphabetValid;
  const canTestWord = automate !== null;

  // Si l'alphabet ou l'expression change, tous les résultats deviennent obsolètes.
  function resetResults() {
    setupRequestId.current += 1;
    testRequestId.current += 1;
    setValidationErrors([]);
    setIsExpressionValid(false);
    setAutomate(null);
    setTestResult(null);
    setActionError(null);
  }

  function changeAlphabet(text) {
    setAlphabetText(text);
    resetResults();
  }

  function changeExpression(text) {
    setExpression(text);
    resetResults();
  }

  // Si le mot change, seul l'ancien résultat du test devient obsolète.
  function changeWord(text) {
    testRequestId.current += 1;
    setWord(text);
    setTestResult(null);
    setActionError(null);
  }

  async function validateExpression() {
    if (!canValidateExpression) return;

    if (expression.trim() === "") {
      setValidationErrors([{ field: "expression", message: "L'expression est vide." }]);
      setIsExpressionValid(false);
      return;
    }

    setupRequestId.current += 1;
    const requestId = setupRequestId.current;

    let errors = [];
    let isValid = false;
    try {
      const result = await requestValidation(alphabetSymbols, expression);
      errors = result.errors;
      isValid = result.isValid;
    } catch (error) {
      errors = [{ field: "expression", message: describeRequestFailure(error) }];
    }

    if (requestId !== setupRequestId.current) return;

    setValidationErrors(errors);
    setIsExpressionValid(isValid);
  }

  async function buildAutomate() {
    if (!canBuildAutomate) return;

    setupRequestId.current += 1;
    const requestId = setupRequestId.current;
    setActionError(null);

    let result = null;
    let failure = null;
    try {
      result = await requestAutomate(alphabetSymbols, expression);
    } catch (error) {
      failure = describeRequestFailure(error);
    }

    if (requestId !== setupRequestId.current) return;

    
    setAutomate(result);
    setTestResult(null);
    setActionError(failure);
  }

  async function testWord() {
    if (!canTestWord) return;

    testRequestId.current += 1;
    const requestId = testRequestId.current;
    setActionError(null);

    let result = null;
    let failure = null;
    try {
      result = await requestWordTest(alphabetSymbols, expression, word);
    } catch (error) {
      failure = describeRequestFailure(error);
    }

    if (requestId !== testRequestId.current) return;

    setTestResult(result);
    setActionError(failure);
  }

  return {
    alphabetText,
    alphabetSymbols,
    alphabetErrors,
    expression,
    word,
    expressionErrors,
    isExpressionValid,
    automate,
    testResult,
    actionError,
    canValidateExpression,
    canBuildAutomate,
    canTestWord,
    changeAlphabet,
    changeExpression,
    changeWord,
    validateExpression,
    buildAutomate,
    testWord,
  };
}
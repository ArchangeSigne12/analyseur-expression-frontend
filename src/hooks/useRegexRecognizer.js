// src/hooks/useRegexRecognizer.js

import { useState } from "react";
import { parseAlphabetSymbols } from "../utils/parseAlphabetSymbols";
import { validateAlphabetSymbols } from "../utils/validateAlphabetSymbols";
import { REGEX_OPERATORS } from "../utils/regexSyntax";

export default function useRegexRecognizer() {
  const [alphabetText, setAlphabetText] = useState("");
  const [expression, setExpression] = useState("");
  const [word, setWord] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [isExpressionValid, setIsExpressionValid] = useState(false);
  const [isAutomateBuilt, setIsAutomateBuilt] = useState(false);

  // Valeurs dérivées : calculées à chaque affichage, jamais stockées.
  const alphabetSymbols = parseAlphabetSymbols(alphabetText);
  const alphabetErrors = validateAlphabetSymbols(alphabetSymbols);
  const isAlphabetValid =
    alphabetSymbols.length > 0 && alphabetErrors.length === 0;
  const canValidateExpression = isAlphabetValid;
  const canBuildAutomate = isExpressionValid && isAlphabetValid;
  const canTestWord = isAutomateBuilt;

  // Si l'alphabet ou l'expression change, l'ancienne validation n'est plus fiable.
  function resetResults() {
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

  function validateExpression() {
    // PROVISOIRE : cette vérification sera faite par l'API Spring Boot.
    if (!canValidateExpression) return;

    if (expression.trim() === "") {
      setValidationErrors([{ message: "L'expression est vide" }]);
      setIsExpressionValid(false);
      return;
    }

    const errors = [];
    [...expression].forEach((character, index) => {
      const isKnown =
        REGEX_OPERATORS.includes(character) ||
        alphabetSymbols.includes(character);
      if (!isKnown) {
        errors.push({
          message: `Le symbole « ${character} » n'appartient pas à l'alphabet`,
          position: index + 1,
        });
      }
    });

    setValidationErrors(errors);
    setIsExpressionValid(errors.length === 0);
  }

  function buildAutomate() {
    if (!canBuildAutomate) return;
    // TODO : appeler l'API pour construire l'automate.
    setIsAutomateBuilt(true);
  }

  function testWord() {
    // TODO : appeler l'API pour tester le mot.
  }

  return {
    alphabetText,
    alphabetSymbols,
    alphabetErrors,
    expression,
    word,
    validationErrors,
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
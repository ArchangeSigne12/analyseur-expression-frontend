// src/utils/validateAlphabetSymbols.js

import { RESERVED_SYMBOLS } from "./regexSyntax";

export function validateAlphabetSymbols(symbols) {
  const errors = [];

  symbols.forEach((symbol) => {
    // [...symbol] compte les vrais caractères (un emoji compte pour 1)
    if ([...symbol].length !== 1) {
      errors.push({ message: `« ${symbol} » doit contenir un seul caractère` });
    } else if (RESERVED_SYMBOLS.includes(symbol)) {
      errors.push({
        message: `« ${symbol} » est réservé par la syntaxe des expressions`,
      });
    }
  });

  return errors;
}
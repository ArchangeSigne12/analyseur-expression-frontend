// src/utils/parseAlphabetSymbols.js

export function parseAlphabetSymbols(text) {
  const symbols = text
    .split(",")
    .map((symbol) => symbol.trim())
    .filter(Boolean);
  return [...new Set(symbols)];
}
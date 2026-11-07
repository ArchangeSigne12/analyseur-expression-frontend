// src/components/recognizer-form/AlphabetInputField.jsx
import AlphabetSymbolChip from "./AlphabetSymbolChip";
import ValidationErrorList from "./ValidationErrorList";
import { inputClasses, labelClasses } from "./formFieldStyles";

export default function AlphabetInputField({ value, onChange, symbols, errors }) {
  const hasErrors = errors.length > 0;
  const plural = symbols.length > 1 ? "s" : "";

  return (
    <div>
      <label htmlFor="alphabet" className={labelClasses}>
        Alphabet
      </label>
      <input
        id="alphabet"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ex. : a, b"
        autoComplete="off"
        aria-invalid={hasErrors}
        className={`${inputClasses} ${
          hasErrors ? "border-red-500" : "border-slate-300"
        }`}
      />

      {symbols.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {symbols.map((symbol) => (
            <AlphabetSymbolChip key={symbol} symbol={symbol} />
          ))}
        </div>
      )}

      {hasErrors && <ValidationErrorList errors={errors} />}
      {!hasErrors && symbols.length > 0 && (
        <p className="mt-1.5 text-xs text-green-700">
          {symbols.length} symbole{plural} valide{plural}
        </p>
      )}
      {!hasErrors && symbols.length === 0 && (
        <p className="mt-1.5 text-xs text-slate-500">
          Séparez les symboles par une virgule (un caractère chacun).
        </p>
      )}
    </div>
  );
}
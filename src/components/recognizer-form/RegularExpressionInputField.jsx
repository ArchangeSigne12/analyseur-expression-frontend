// src/components/recognizer-form/RegularExpressionInputField.jsx
import ValidationErrorList from "./ValidationErrorList";
import { inputClasses, labelClasses } from "./formFieldStyles";

export default function RegularExpressionInputField({
  value,
  onChange,
  errors,
  isValid,
}) {
  const hasErrors = errors.length > 0;

  return (
    <div>
      <label htmlFor="regular-expression" className={labelClasses}>
        Expression régulière
      </label>
      <input
        id="regular-expression"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ex. : a*b"
        spellCheck={false}
        autoComplete="off"
        aria-invalid={hasErrors}
        className={`${inputClasses} font-mono ${
          hasErrors ? "border-red-500" : "border-slate-300"
        }`}
      />
      {hasErrors && <ValidationErrorList errors={errors} />}
      {!hasErrors && isValid && (
        <p className="mt-1.5 text-xs text-green-700">Expression valide</p>
      )}
      {!hasErrors && !isValid && (
        <p className="mt-1.5 text-xs text-slate-500">
          Opérateurs : | union, * étoile, + une fois ou plus, ( ) groupes.
        </p>
      )}
    </div>
  );
}
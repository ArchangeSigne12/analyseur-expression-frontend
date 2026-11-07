// src/components/recognizer-form/WordToTestInputField.jsx
import { inputClasses, labelClasses } from "./formFieldStyles";

export default function WordToTestInputField({ value, onChange }) {
  return (
    <div>
      <label htmlFor="word-to-test" className={labelClasses}>
        Mot à tester
      </label>
      <input
        id="word-to-test"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ex. : aab"
        spellCheck={false}
        autoComplete="off"
        className={`${inputClasses} border-slate-300 font-mono`}
      />
    </div>
  );
}
// src/components/recognizer-form/RegexRecognizerForm.jsx
import AlphabetInputField from "./AlphabetInputField";
import RegularExpressionInputField from "./RegularExpressionInputField";
import WordToTestInputField from "./WordToTestInputField";
import FormActionButton from "./FormActionButton";

export default function RegexRecognizerForm({ recognizer }) {
  const {
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
    changeWord,
    validateExpression,
    buildAutomate,
    testWord,
    actionError,
  } = recognizer;

  return (
    <aside className="border-b border-slate-200 bg-white p-6 md:border-b-0 md:border-r">
      <form
        className="flex flex-col gap-5"
        onSubmit={(event) => event.preventDefault()}
      >
        <AlphabetInputField
          value={alphabetText}
          onChange={changeAlphabet}
          symbols={alphabetSymbols}
          errors={alphabetErrors}
        />

        <RegularExpressionInputField
          value={expression}
          onChange={changeExpression}
          errors={expressionErrors}
          isValid={isExpressionValid}
        />

        <div className="flex flex-col gap-3">
          <FormActionButton
            variant="secondary"
            onClick={validateExpression}
            disabled={!canValidateExpression}
          >
            Valider l'expression
          </FormActionButton>
          <FormActionButton onClick={buildAutomate} disabled={!canBuildAutomate}>
            Construire l'automate
          </FormActionButton>
        </div>

        <hr className="border-slate-200" />

        <WordToTestInputField value={word} onChange={changeWord} />

        <FormActionButton onClick={testWord} disabled={!canTestWord}>
          Tester le mot
        </FormActionButton>

         {actionError && (
          <p role="alert" className="text-xs text-red-700">
            ✕ {actionError}
          </p>
        )}
      </form>
    </aside>
  );
}
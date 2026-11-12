// src/pages/RecognizerPage.jsx
import ApplicationHeader from "../components/layout/ApplicationHeader";
import RegexRecognizerForm from "../components/recognizer-form/RegexRecognizerForm";
import AutomateResultPanel from "../components/automate-view/AutomateResultPanel";
import useRegexRecognizer from "../hooks/useRegexRecognizer";

export default function RecognizerPage() {
  const recognizer = useRegexRecognizer();

  return (
    <div className="flex min-h-screen flex-col">
      <ApplicationHeader />
      <main className="grid flex-1 grid-cols-1 md:grid-cols-[330px_1fr]">
        <RegexRecognizerForm recognizer={recognizer} />
        <AutomateResultPanel recognizer={recognizer} />
      </main>
    </div>
  );
}
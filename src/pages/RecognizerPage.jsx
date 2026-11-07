import ApplicationHeader from "../components/layout/ApplicationHeader";
import RegexRecognizerForm from "../components/recognizer-form/RegexRecognizerForm";
import AutomateResultPanel from "../components/automate-view/AutomateResultPanel";

export default function RecognizerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <ApplicationHeader />
      <main className="grid flex-1 grid-cols-1 md:grid-cols-[330px_1fr]">
        <RegexRecognizerForm />
        <AutomateResultPanel />
      </main>
    </div>
  );
}
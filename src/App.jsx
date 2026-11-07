import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecognizerPage from "./pages/RecognizerPage";
import TestSuitePage from "./pages/TestSuitePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecognizerPage />} />
        <Route path="/jeu-d-essai" element={<TestSuitePage />} />
      </Routes>
    </BrowserRouter>
  );
}
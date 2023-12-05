import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuggestionPage from "./pages/SuggestionPage";
import HistoryPage from "./pages/HistoryPage";
import ProgressPage from "./pages/AcademicProgressPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Profile" element={<ProfilePage />} />
        <Route path="/AcademicProgress" element={<ProgressPage />} />
        <Route path="/Dashboard" element={<DashboardPage />} />
        <Route path="/Suggestion" element={<SuggestionPage />} />
        <Route path="/History" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SuggestionPage from "./pages/SuggestionPage";
import HistoryPage from "./pages/HistoryPage";
import ProgressPage from "./pages/AcademicProgressPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext()

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={!user ? <LoginPage /> : <Navigate to="Dashboard" />} />
          <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="Dashboard" />} />
          <Route path="/Profile" element={user? <ProfilePage /> : <Navigate to="/"/>} />
          <Route path="/AcademicProgress" element={user? <ProgressPage /> : <Navigate to="/"/>} />
          <Route path="/Dashboard" element={user? <DashboardPage /> : <Navigate to="/"/>} />
          <Route path="/Suggestion" element={user? <SuggestionPage /> : <Navigate to="/"/>} />
          <Route path="/History" element={user? <HistoryPage /> : <Navigate to="/"/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;

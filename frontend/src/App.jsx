import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile"; // Added Profile Page
import MatchProfile from "./pages/MatchProfile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAnalytics from "./pages/AdminAnalytics";
import Commits from "./pages/Commits";
import ProtectedRoute from "./components/ProtectedRoute";



const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header /> {/* Added Header for navigation */}
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} /> {/* New Profile Route */}
          <Route path="/commits" element={<Commits />} />
          <Route path="/match-profile" element={<MatchProfile />} />
          <Route path="/admin" element={<ProtectedRoute adminOnly element={<AdminDashboard />} />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/profile/:githubId" element={<Profile />} /> 
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

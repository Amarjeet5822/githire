import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginButton from "../components/LoginButton";

const Home = () => {

  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCommits = async () => {
    if (!user) {
      alert("Please log in first.");
      return;
    }

    setLoading(true);
    try {
      await axios.get(`http://localhost:5000/api/commits/${user.username}`);
      alert("Commits fetched successfully!");
      navigate("/profile"); // Redirect to Profile page
    } catch (error) {
      console.error(error);
      alert("Error fetching commits.");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">GitRoll Matcher</h1>
      {
      user ? (
        <>
          <p>Welcome, {user.username}!</p>
          <button
            onClick={fetchCommits}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            disabled={loading}
          >
            {loading ? "Fetching..." : "Fetch Commits"}
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded mt-4"
          >
            Go to Dashboard
          </button>
        </>
      ) : (
        <LoginButton />
      )}

      <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">GitHub Matching App</h2>
      <a
        href="http://localhost:5000/api/auth/github"
        className="bg-black text-white px-4 py-2 rounded"
      >
        Login with GitHub
      </a>
    </div>
    </div>
  );
};

export default Home;

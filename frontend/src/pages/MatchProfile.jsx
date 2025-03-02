import { useState } from "react";
import axios from "axios";

const MatchProfile = () => {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState(null);

  const handleCheck = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/github/match-profile?username=${username}`);
      setResult(res.data);
    } catch (error) {
      console.error("Error fetching match result", error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Candidate Matching</h2>
      <input
        type="text"
        placeholder="GitHub Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2"
      />
      <button onClick={handleCheck} className="bg-blue-500 text-white px-4 py-2 ml-2">
        Check Match
      </button>

      {result && (
        <div className="mt-4">
          <p><strong>Score:</strong> {result.score.toFixed(2)}</p>
          <p><strong>Decision:</strong> {result.decision}</p>
        </div>
      )}
    </div>
  );
};

export default MatchProfile;

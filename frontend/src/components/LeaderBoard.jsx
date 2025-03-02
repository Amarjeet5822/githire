import { useState, useEffect } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/stats/leaderboard")
      .then(res => setCandidates(res.data))
      .catch(err => console.error("Error fetching leaderboard:", err));
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">🏆 Leaderboard</h2>
      <ul className="divide-y">
        {candidates.map((candidate, index) => (
          <li key={index} className="py-2 flex justify-between">
            <span>{candidate._id}</span>
            <span className="text-blue-500 font-semibold">{candidate.totalCommits} Commits</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;

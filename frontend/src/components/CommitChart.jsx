import { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const CommitChart = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/stats/stats")
      .then(res => setStats(res.data.map(s => ({ month: `Month ${s._id}`, commits: s.totalCommits }))))
      .catch(err => console.error("Error fetching stats:", err));
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">📊 Monthly Commit Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={stats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="commits" stroke="#82ca9d" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CommitChart;

import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const Commits = () => {
  const [commits, setCommits] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/github/stored-commits");
        setCommits(res.data);

        const repoCounts = res.data.reduce((acc, commit) => {
          acc[commit.repoName] = (acc[commit.repoName] || 0) + 1;
          return acc;
        }, {});

        setChartData({
          labels: Object.keys(repoCounts),
          datasets: [
            {
              label: "Commits per Repo",
              data: Object.values(repoCounts),
              backgroundColor: "rgba(75,192,192,0.6)",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching commits", error);
      }
    };

    fetchCommits();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Commit History</h2>

      {chartData && <Bar data={chartData} />}

      <ul className="mt-4">
        {commits.map((commit, index) => (
          <li key={index} className="border-b py-2">
            <strong>{commit.repoName}</strong>: {commit.message} <span className="text-gray-500">{new Date(commit.date).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Commits;

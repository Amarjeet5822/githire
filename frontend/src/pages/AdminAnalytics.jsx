import { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  // get token then you put it in Bearer token
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/analytics", { headers: { Authorization: "Bearer token" } })
      .then((res) => setAnalytics(res.data))
      .catch((err) => console.error("Error fetching analytics:", err));
  }, []);

  if (!analytics) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">📊 Job Analytics Dashboard</h2>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-blue-100 rounded">
          <h3 className="text-lg font-semibold">Total Jobs</h3>
          <p className="text-2xl font-bold">{analytics.totalJobs}</p>
        </div>
        <div className="p-4 bg-green-100 rounded">
          <h3 className="text-lg font-semibold">Total Applications</h3>
          <p className="text-2xl font-bold">{analytics.totalApplications}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold">{analytics.totalUsers}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold">📊 Applications per Job</h3>
          <Bar
            data={{
              labels: analytics.jobApplicationCount.map((item) => item.jobTitle),
              datasets: [
                {
                  label: "Applications",
                  data: analytics.jobApplicationCount.map((item) => item.count),
                  backgroundColor: "rgba(75,192,192,0.6)",
                },
              ],
            }}
          />
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold">📌 Application Status Breakdown</h3>
          <Pie
            data={{
              labels: analytics.applicationStatusCount.map((item) => item._id),
              datasets: [
                {
                  data: analytics.applicationStatusCount.map((item) => item.count),
                  backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;

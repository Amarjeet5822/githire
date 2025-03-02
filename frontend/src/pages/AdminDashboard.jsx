import { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/users/ranked", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching ranked users:", err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/jobs", { headers: { Authorization: "Bearer token" } })
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error fetching jobs:", err));

    axios
      .get("http://localhost:5000/api/admin/applications", { headers: { Authorization: "Bearer token" } })
      .then((res) => setApplications(res.data))
      .catch((err) => console.error("Error fetching applications:", err));

    axios
      .get("http://localhost:5000/api/admin/users", { headers: { Authorization: "Bearer token" } })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const approveUser = (id) => {
    axios
      .put(`http://localhost:5000/api/admin/users/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => setUsers(users.map(user => user._id === id ? { ...user, isApproved: true } : user)))
      .catch((err) => console.error("Error approving user:", err));
  };

    const rankUser = (id) => {
    axios
      .put(`http://localhost:5000/api/admin/users/${id}/rank`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => window.location.reload())
      .catch((err) => console.error("Error ranking user:", err));
  };

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => setUsers(users.filter(user => user._id !== id)))
      .catch((err) => console.error("Error deleting user:", err));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">🛠️ Admin Dashboard</h1>
      <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">⚙️ Admin Dashboard</h2>

      <section>
        <h3 className="text-lg font-semibold">📌 Jobs</h3>
        <ul>
          {jobs.map((job) => (
            <li key={job._id} className="border p-2 rounded">{job.title}</li>
          ))}
        </ul>
      </section>

      <section className="mt-4">
        <h3 className="text-lg font-semibold">📌 Applications</h3>
        <ul>
          {applications.map((app) => (
            <li key={app._id} className="border p-2 rounded">
              {app.candidateId.name} → {app.jobId.title} ({app.status})
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4">
        <h3 className="text-lg font-semibold">📌 Users</h3>
        <ul>
          {users.map((user) => (
            <li key={user._id} className="border p-2 rounded">
              {user.name} ({user.role})
            </li>
          ))}
        </ul>
      </section>
    </div>
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">👥 User Management</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">GitHub ID</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Approved</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border">
                <td className="border p-2">{user.githubId}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.isApproved ? "✅ Yes" : "❌ No"}</td>
                <td className="border p-2">
                  {!user.isApproved && (
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => approveUser(user._id)}
                    >
                      Approve
                    </button>
                  )}
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => deleteUser(user._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">🏆 Candidate Ranking</h1>
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">🔢 Candidate Scores</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">GitHub ID</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Rank Score</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border">
                <td className="border p-2">{user.githubId}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.rankScore}</td>
                <td className="border p-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => rankUser(user._id)}
                  >
                    Rank Candidate
                  </button>
                </td>
                <td className="border p-2">
                <a href={`/profile/${user.githubId}`} className="text-blue-600">
                    View Profile
                </a>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default AdminDashboard;

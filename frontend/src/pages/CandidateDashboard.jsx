import { useEffect, useState } from "react";
import axios from "axios";

const CandidateDashboard = ({ candidateId }) => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/applications/${candidateId}`)
      .then((res) => setApplications(res.data))
      .catch((err) => console.error("Error fetching applications:", err));
  }, [candidateId]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">📊 Candidate Dashboard</h2>

      {applications.length === 0 ? (
        <p>No job applications found.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app._id} className="p-4 border rounded-lg shadow">
              <h3 className="text-lg font-semibold">{app.jobId.title}</h3>
              <p>Status: <span className="font-bold">{app.status}</span></p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded h-4 mt-2">
                <div
                  className={`h-full ${
                    app.status === "Applied"
                      ? "bg-blue-500 w-1/5"
                      : app.status === "Shortlisted"
                      ? "bg-yellow-500 w-2/5"
                      : app.status === "Interview Scheduled"
                      ? "bg-orange-500 w-3/5"
                      : app.status === "Offer Given"
                      ? "bg-green-500 w-4/5"
                      : "bg-red-500 w-full"
                  } rounded`}
                ></div>
              </div>

              {/* Interview Date */}
              {app.interviewDate && (
                <p className="mt-2">📅 Interview Date: {new Date(app.interviewDate).toLocaleDateString()}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidateDashboard;

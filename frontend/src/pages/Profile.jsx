import { useEffect, useState } from "react";
import axios from "axios";
import CommitList from "../components/CommitList";
import HireDecision from "../components/HireDecision";
import { useParams } from "react-router-dom";
import Chat from "../components/Chat";
import CandidateDashboard from "./CandidateDashboard";

const Profile = () => {
  const [commits, setCommits] = useState([]);
  const [decision, setDecision] = useState(null);
  const username = "test_user"; // Replace with logged-in user's GitHub username
  const { githubId } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commitRes = await axios.get(
          `http://localhost:5000/api/commits/${username}`
        );
        setCommits(commitRes.data.commits);

        const decisionRes = await axios.get(
          `http://localhost:5000/api/match/${username}`
        );
        setDecision(decisionRes.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/profile/${githubId}`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, [githubId]);

  if (!profile) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Commit History</h2>
      <CommitList commits={commits} />
      <HireDecision decision={decision} />
      <Chat userId="recruiter123" receiverId={githubId} />
      {/* Candidate Dashboard */}
      <CandidateDashboard candidateId="candidate123" />

      <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded shadow-md mt-10">
        <div className="text-center">
          <img
            src={profile.avatar}
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full"
          />
          <h1 className="text-2xl font-bold mt-4">{profile.name}</h1>
          <p className="text-gray-600">{profile.bio}</p>
          <div className="mt-4">
            <span className="px-3 py-1 bg-blue-500 text-white rounded">
              Followers: {profile.followers}
            </span>
            <span className="ml-2 px-3 py-1 bg-green-500 text-white rounded">
              Public Repos: {profile.publicRepos}
            </span>
            <span className="ml-2 px-3 py-1 bg-purple-500 text-white rounded">
              Rank Score: {profile.rankScore}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-3">🚀 Repositories</h2>
          {profile.repos.map((repo) => (
            <div
              key={repo.name}
              className="bg-white p-3 shadow-md rounded mb-2"
            >
              <a
                href={repo.url}
                target="_blank"
                className="text-blue-600 font-bold"
              >
                {repo.name}
              </a>
              <p className="text-gray-500">
                ⭐ Stars: {repo.stars} | 🍴 Forks: {repo.forks}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <h2 className="text-lg font-bold">🎯 Hiring Recommendation</h2>
          <p className="text-xl font-bold text-green-600">
            {profile.rankScore > 50
              ? "✅ Recommended for Hiring"
              : "❌ Needs Improvement"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

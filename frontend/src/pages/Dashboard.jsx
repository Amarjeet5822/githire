import { useAuth } from "../context/AuthContext";
import LogoutButton from "../components/LogoutButton";
import Leaderboard from "../components/LeaderBoard";
import CommitChart from "../components/CommitChart";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome {user.username}!</h1>
      <img src={user.avatarUrl} alt="Avatar" width="100" />
      <LogoutButton />
      <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📈 Candidate Insights Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Leaderboard />
        <CommitChart />
      </div>
    </div>
    </div>
  );
};

export default Dashboard;

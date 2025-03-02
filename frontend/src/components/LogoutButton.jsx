import { useAuth } from "../context/AuthContext";

const LogoutButton = () => {
  const { setUser } = useAuth();

  const handleLogout = async () => {
    await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <button onClick={handleLogout} className="btn">
      Logout
    </button>
  );
};

export default LogoutButton;

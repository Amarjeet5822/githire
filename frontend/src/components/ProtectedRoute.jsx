import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, adminOnly }) => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (!token) return <Navigate to="/" />;
  if (adminOnly && !isAdmin) return <Navigate to="/" />;
  return element;
};

export default ProtectedRoute;

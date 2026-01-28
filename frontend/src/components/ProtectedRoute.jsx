import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "2rem" }}>
      Loading...
    </div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
if (user.role !== "user"){
  return <Navigate to="/admin" replace />
}
  return <Outlet />;
}

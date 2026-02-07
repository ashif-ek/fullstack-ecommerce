import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  // 1️ Wait for auth to resolve
  if (loading) {
    return null; // or spinner
  }

  // 2️ Only redirect AFTER loading
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3️ Allow access
  return <Outlet />;
}



import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import Api from "./api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const res = await Api.post("/api/auth/login/", {
      username: email,
      password: password,
    });

    const { access, refresh, user } = res.data;

    // Store tokens and user info
    login(user, access, refresh);

    // Navigate based on user role
    if (user.is_staff) {
      navigate("/admin", { replace: true });
    } else {
      navigate("/", { replace: true });
    }

    toast.success(`Logged in as ${user.username}`);
  } catch (err) {
    console.error("Login error:", err);
    toast.error(
      err.response?.data?.detail || "Invalid email or password. Please try again."
    );
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-black text-white">
      <div className="relative w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="relative z-10 p-8 space-y-8 bg-black/70 border border-white/10 rounded-lg shadow-xl backdrop-blur-sm"
        >
          <div className="text-center">
            <h1 className="text-3xl tracking-wider font-light font-playfair">
              Sign In
            </h1>
            <div className="w-20 h-px mx-auto mt-4 bg-white/30"></div>
            <p className="mt-3 text-sm text-gray-400 tracking-wide uppercase">
              Welcome Back
            </p>
          </div>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 text-white bg-white/5 border border-white/10 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white/50"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 text-white bg-white/5 border border-white/10 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white/50"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 text-sm font-semibold tracking-wide text-black uppercase transition duration-300 bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <div className="pt-4 text-center border-t border-white/10 space-y-2">
            <Link
              to="/register"
              className="block text-sm text-gray-400 hover:text-white transition"
            >
              Create an Account
            </Link>
            <Link
              to="/"
              className="block text-sm text-gray-500 hover:text-white transition"
            >
              Continue Without Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}















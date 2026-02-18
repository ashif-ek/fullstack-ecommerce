import { useState } from "react";
// Removed toast import
import { useNavigate, Link } from "react-router-dom";
import Api, { setAccessToken } from "../services/api";
import { useAuth } from "../context/AuthContext";
import InlineFeedback from "../components/InlineFeedback"; // Import InlineFeedback

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "", isVisible: false });

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback({ isVisible: false, message: "", type: "" });

    try {
      // 1️ Login → get access token
      const res = await Api.post("/auth/login/", {
        email,
        password,
      });

      const { access } = res.data;
      setAccessToken(access);

      // 2️ Fetch user info
      const meRes = await Api.get("/auth/me/");
      setUser(meRes.data);

      setFeedback({ type: "success", message: "Logged in successfully", isVisible: true });
      
      const { is_staff, is_superuser } = meRes.data;
      setTimeout(() => {
          if (is_staff || is_superuser) {
            navigate("/admin", { replace: true });
          } else {
            navigate("/", { replace: true });
          }
      }, 500); 
    } catch (err) {
      console.error("Login error:", err);
      setFeedback({ 
          type: "error", 
          message: err.response?.data?.detail || "Invalid email or password", 
          isVisible: true 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-black text-white">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-6 bg-black/70 border border-white/10 rounded-lg"
        >
          <h1 className="text-3xl text-center">Sign In</h1>

          <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-white/30 transition-colors"
                disabled={isLoading}
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-white/30 transition-colors"
                disabled={isLoading}
              />
          </div>

          <div className="space-y-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-white text-black font-semibold disabled:opacity-50 hover:bg-gray-200 transition-colors"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
              
              <InlineFeedback 
                  {...feedback} 
                  onClose={() => setFeedback(prev => ({ ...prev, isVisible: false }))} 
              />
          </div>

          <div className="text-center text-sm text-gray-400">
            <Link to="/register" className="hover:text-white transition-colors">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

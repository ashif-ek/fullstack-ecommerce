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
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1623742310401-d8057c3c43c8?q=80&w=1920&auto=format&fit=crop"
          alt="Luxury Perfume Background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-6 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl"
        >
          <div className="text-center mb-6">
             <h1 className="text-3xl font-playfair tracking-wider mb-2">Sign In</h1>
             <p className="text-sm text-gray-400 uppercase tracking-widest">Welcome Back</p>
          </div>

          <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-white/30 transition-colors text-white placeholder-gray-500"
                disabled={isLoading}
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-white/30 transition-colors text-white placeholder-gray-500"
                disabled={isLoading}
              />
          </div>

          <div className="space-y-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-white text-black font-semibold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
              
              <InlineFeedback 
                  {...feedback} 
                  onClose={() => setFeedback(prev => ({ ...prev, isVisible: false }))} 
              />
          </div>

          <div className="text-center text-xs text-gray-400 mt-6">
            <p>Don't have an account?</p>
            <Link to="/register" className="text-white hover:text-gray-300 transition-colors uppercase tracking-wider mt-2 inline-block border-b border-transparent hover:border-white pb-0.5">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

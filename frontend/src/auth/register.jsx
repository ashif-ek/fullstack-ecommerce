import { useState } from "react";
// Removed toast import
import { useNavigate, Link } from "react-router-dom";
import Api from "../services/api";
import InlineFeedback from "../components/InlineFeedback"; // Import InlineFeedback

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedback] = useState({ type: "", message: "", isVisible: false });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ isVisible: false, message: "", type: "" });

    if (!username || !email || !password) {
      setFeedback({ type: "error", message: "All fields are required", isVisible: true });
      return;
    }

    if (password !== confirmPassword) {
      setFeedback({ type: "error", message: "Passwords do not match", isVisible: true });
      return;
    }

    setIsLoading(true);

    try {
      await Api.post("/auth/register/", {
        username,
        email,
        password,
      });

      setFeedback({ type: "success", message: "Account created. Redirecting to login...", isVisible: true });
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);

    } catch (err) {
      console.error("Register error:", err);
      
      let errorMessage = "Registration failed";
      
      if (err.response && err.response.data) {
        const data = err.response.data;
        if (typeof data === "string") {
            errorMessage = data;
        } else if (typeof data === "object") {
             // If validation errors (e.g., { username: ["Exists"], email: ["Invalid"] })
             // Join them into a readable string
             const messages = Object.entries(data).map(([key, val]) => {
                const msg = Array.isArray(val) ? val.join(" ") : val;
                // If the key is 'detail' or 'non_field_errors', don't show the key
                if (key === 'detail' || key === 'non_field_errors') return msg;
                return `${key}: ${msg}`; // e.g., "username: A user with that username already exists."
             });
             errorMessage = messages.join("\n");
        }
      }

      setFeedback({ type: "error", message: errorMessage, isVisible: true });
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
          <h1 className="text-3xl text-center">Create Account</h1>

          <div className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-white/30 transition-colors"
                disabled={isLoading}
              />

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

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-white/30 transition-colors"
                disabled={isLoading}
              />
          </div>

          <div className="space-y-4">
              <button
                type="submit"
                className="w-full py-3 bg-white text-black font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Register"}
              </button>
              
              <InlineFeedback 
                  {...feedback} 
                  onClose={() => setFeedback(prev => ({ ...prev, isVisible: false }))} 
              />
          </div>

          <div className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="hover:text-white transition-colors">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

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
             <h1 className="text-3xl font-playfair tracking-wider mb-2">Create Account</h1>
             <p className="text-sm text-gray-400 uppercase tracking-widest">Join the Experience</p>
          </div>

          <div className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-white/30 transition-colors text-white placeholder-gray-500"
                disabled={isLoading}
              />

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

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-white/30 transition-colors text-white placeholder-gray-500"
                disabled={isLoading}
              />
          </div>

          <div className="space-y-4">
              <button
                type="submit"
                className="w-full py-3 bg-white text-black font-semibold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Register"}
              </button>
              
              <InlineFeedback 
                  {...feedback} 
                  onClose={() => setFeedback(prev => ({ ...prev, isVisible: false }))} 
              />
          </div>

          <div className="text-center text-xs text-gray-400 mt-6">
            <p>Already have an account?</p>
            <Link to="/login" className="text-white hover:text-gray-300 transition-colors uppercase tracking-wider mt-2 inline-block border-b border-transparent hover:border-white pb-0.5">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

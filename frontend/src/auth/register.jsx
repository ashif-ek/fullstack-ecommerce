import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Api from "../services/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.warn("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.warn("Passwords do not match");
      return;
    }

    try {
      await Api.post("/auth/register/", {
        username,
        email,
        password,
      });

      toast.success("Account created. Please login.");
      navigate("/login", { replace: true });
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

      toast.error(errorMessage, { autoClose: 5000 });
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

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded"
          />

          <button
            type="submit"
            className="w-full py-3 bg-white text-black font-semibold"
          >
            Register
          </button>

          <div className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="hover:text-white">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

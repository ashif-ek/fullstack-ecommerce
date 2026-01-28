
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Api from "./api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

if (!name.trim() || !email.trim() || !password.trim()) {
  toast.warn("fill all field");
  return;
}

// const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
// if (!passwordRegex.test(password)) {
//   toast.warn("Password must be 8+ chars, include uppercase & number");
//   return;
// }

if (password !== confirmPassword) {
  toast.warn("Passwords do not match");
  return;
}
    const res = await Api.get("/users", { params: { email } });
    if (res.data.length > 0) {
      toast.warn("Email already registered");
      return;
    }

    const newUser = {
      name,
      email,
      password,
      role: "user",
      isBlocked: false,
      cart: [],
      wishlist: [],
      orders: [],
      createdAt: new Date().toISOString(),
    };

    await Api.post("/users", newUser);

    toast.success("Registered successfully");
    toast.info("please login with username")
    navigate("/login", {replace:true});
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-black text-white">
      <div className="relative w-full max-w-md">
        {/* <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://cdn.mos.cms.futurecdn.net/VzUqgr8pfbNcfXrpzeVBPE.jpg')",
          }}
        ></div> */}

        <form
          onSubmit={handleSubmit}
          className="relative z-10 p-8 space-y-8 bg-black/70 border border-white/10 rounded-lg shadow-xl backdrop-blur-sm"
        >
          <div className="text-center">
            <h1 className="text-3xl tracking-wider font-light font-playfair">
              Create Account
            </h1>
            <div className="w-20 h-px mx-auto mt-4 bg-white/30"></div>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              required
              className="w-full px-4 py-3 text-white bg-white/5 border border-white/10 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white/50"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="w-full px-4 py-3 text-white bg-white/5 border border-white/10 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white/50"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-3 text-white bg-white/5 border border-white/10 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white/50"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              className="w-full px-4 py-3 text-white bg-white/5 border border-white/10 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white/50"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-sm font-semibold tracking-wide text-black uppercase transition duration-300 bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
          >
            Register
          </button>

          <div className="pt-4 text-center border-t border-white/10">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-white transition hover:underline"
              >
                Sign In
              </Link>
            </p>
            <br />
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













































// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Api from "./api";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert("Password not match");
//       return;
//     }

//     const res = await Api.get("/users", { params: { email } });
//     if (res.data.length > 0) {
//       alert("Email already registered");
//       return;
//     }

//     const newUser = {
//       name,
//       email,
//       password,
//       cart: [],
//       wishlist: [],
//       orders: [],
//     };

//     await Api.post("/users", newUser);


//     alert("registerd sucessfully, now plz loggin");
//     navigate("/login");
//   };

//   return (
//     <div >
//       <form
//         onSubmit={handleSubmit}
//       >
//         <h2 className="text-xl font-bold text-center">Register</h2>

//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Name"
//           required
//         />

//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//         />

//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         />

//         <input
//           type="password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           placeholder="Confirm Password"
//           required
//         />

//         <button
//           type="submit"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }

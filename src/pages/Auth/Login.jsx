import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import navlogo from "../../assets/navLogo.png";
import producthero from "../../assets/producthero1.1.jpg";
import Header from "../../componet/Header";
import Footer from "../../componet/Footer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Check for admin credentials
      if (email === "admin@gmail.com" && password === "admin123") {
        navigate("/auth/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("❌ Invalid email or password",err);
    }
  };

  return (
    <>
    <Header />
      {/* Hero Section */}
      <div
        className="relative h-[40vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${producthero})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white">
          <div className="flex justify-center mb-4">
            <img src={navlogo} alt="Funiro" className="w-16 h-16 rounded-full" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
            Welcome Back
          </h1>
          <p className="mt-2 text-gray-200">
            <Link to="/" className="hover:text-[#e0c869]">
              Home
            </Link>{" "}
            / Login
          </p>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex items-center justify-center py-16 bg-gradient-to-b from-white to-gray-100 px-4">
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Login to Your Account</h2>
            <p className="text-gray-600 mt-2">
              Welcome back to{" "}
              <span className="text-[#e0c869] font-semibold">Funiro</span>
            </p>
          </div>

          {error && (
            <p className="bg-red-100 border border-red-300 text-red-600 rounded-md py-2 px-3 mb-4 text-sm text-center animate-pulse">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0c869] focus:border-[#e0c869] outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0c869] focus:border-[#e0c869] outline-none transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-6 text-white font-semibold text-lg bg-[#e0c869] rounded-lg hover:bg-[#c7b15b] transition-transform transform hover:scale-[1.02]"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-700 mt-5 text-sm">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/auth/signup")}
              className="text-[#e0c869] hover:underline font-medium"
            >
              Sign Up Here
            </button>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;

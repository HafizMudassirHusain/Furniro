import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import navlogo from "../../assets/navLogo.png";
import producthero from "../../assets/producthero1.1.jpg";
import Header from "../../componet/Header";
import Footer from "../../componet/Footer";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: userName });
      navigate("/auth/login");
    } catch (err) {
      setError("⚠️ Error signing up. Please try again.", err);
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
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide">Create Account</h1>
          <p className="mt-2 text-gray-200">
            <Link to="/" className="hover:text-[#e0c869]">
              Home
            </Link>{" "}
            / Sign Up
          </p>
        </div>
      </div>

      {/* Sign Up Form */}
      <div className="flex items-center justify-center py-16 bg-gradient-to-b from-white to-gray-100 px-4">
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Create Your Account</h2>
            <p className="text-gray-600 mt-2">
              Join <span className="text-[#e0c869] font-semibold">Funiro</span> today
            </p>
          </div>

          {error && (
            <p className="bg-red-100 border border-red-300 text-red-600 rounded-md py-2 px-3 mb-4 text-sm text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0c869] focus:border-[#e0c869] outline-none transition-all"
                required
              />
            </div>

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
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-700 mt-5 text-sm">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/auth/login")}
              className="text-[#e0c869] hover:underline font-medium"
            >
              Login Here
            </button>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default SignUp;

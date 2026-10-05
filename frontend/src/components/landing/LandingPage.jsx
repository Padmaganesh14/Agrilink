import React, { useState } from "react";
import axios from "axios";
import { useAgri } from "../../context/AgriContext";
import { Sprout, LogIn, UserPlus } from "lucide-react";

export const LandingPage = () => {
  const { setCurrentView, setUserRole, setUser, t, lang, user, userRole } =
    useAgri();

  // Auto-redirect if already logged in
  React.useEffect(() => {
    if (user) {
      const activeRole = user.role || userRole;
      if (activeRole === "farmer") {
        setCurrentView("command-center");
      } else {
        setCurrentView("buyer-marketplace");
      }
    }
  }, [user, userRole, setCurrentView]);

  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("farmer"); // 'farmer' or 'buyer'
  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
    name: "", // only for signup
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const res = await axios.post(`${import.meta.env.VITE_API_URL || "https://agrilink-backend.onrender.com"}${endpoint}`, {
        ...formData,
        role,
      });
      const loggedInRole = res.data.user.role;

      setUser(res.data.user);
      setUserRole(loggedInRole);

      setTimeout(() => {
        setLoading(false);
        if (loggedInRole === "farmer") {
          setCurrentView("command-center");
        } else {
          setCurrentView("buyer-marketplace");
        }
      }, 500);
    } catch (error) {
      console.error("Auth failed", error);
      alert(error.response?.data?.message || "Authentication Failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Minimal Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-4 shadow-sm">
        <div className="max-w-md mx-auto flex items-center justify-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-emerald-600 text-white flex items-center justify-center">
            <Sprout className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">AgriLink</h1>
        </div>
      </header>

      {/* Auth Container */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-4 text-sm font-semibold text-center transition-colors ${
                isLogin
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <LogIn className="w-4 h-4" />
                <span>{"Log In"}</span>
              </div>
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-4 text-sm font-semibold text-center transition-colors ${
                !isLogin
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <UserPlus className="w-4 h-4" />
                <span>{"Sign Up"}</span>
              </div>
            </button>
          </div>

          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-1">
                {isLogin
                  ? "Welcome back"
                  : "Create an account"}
              </h2>
              <p className="text-sm text-slate-500">
                {"Enter your details to continue"}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              {/* Role Selection */}
              <div className="grid grid-cols-2 gap-3 mb-2">
                <button
                  type="button"
                  onClick={() => setRole("farmer")}
                  className={`py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${
                    role === "farmer"
                      ? "bg-emerald-50 border-emerald-600 text-emerald-700"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {"Farmer"}
                </button>
                <button
                  type="button"
                  onClick={() => setRole("buyer")}
                  className={`py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${
                    role === "buyer"
                      ? "bg-slate-900 border-slate-900 text-white"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {"Buyer"}
                </button>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow text-sm"
                    placeholder="Enter your name"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow text-sm"
                  placeholder="10-digit mobile number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow text-sm"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-sm transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Processing..."
                  : isLogin
                    ? "Log In"
                    : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

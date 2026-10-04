import React, { useState } from "react";
import { useAgri } from "../../context/AgriContext";
import { Sprout, ArrowRight, Globe, ArrowLeft, Loader2 } from "lucide-react";
import axios from "axios";

export const FarmerLoginView = () => {
  const { t, lang, toggleLang, setCurrentView, authenticateUser } = useAgri();

  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      const endpoint = isRegistering ? "register" : "login";
      const payload = isRegistering
        ? { name, mobile: mobileNumber, password, role: "farmer" }
        : { mobile: mobileNumber, password, role: "farmer" };

      const res = await axios.post(
        `http://localhost:8000/api/auth/${endpoint}`,
        payload,
      );

      if (res.data.success) {
        authenticateUser(res.data.user, "farmer");
      }
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message ||
          "Authentication failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7F6] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Top bar */}
      <div className="max-w-md mx-auto w-full px-4 flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentView("landing")}
          className="flex items-center space-x-1.5 text-base font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing</span>
        </button>

        <button
          onClick={toggleLang}
          className="flex items-center space-x-1 px-2.5 py-1 rounded-lg border border-slate-300 text-base font-bold text-slate-700 hover:bg-white transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-agri-500" />
          <span>{lang === "en" ? "தமிழ்" : "English"}</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-lg border border-slate-200/90 shadow-xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-1.5">
            <div className="w-12 h-12 rounded-lg bg-agri-500 text-white flex items-center justify-center mx-auto shadow-md shadow-md">
              <Sprout className="w-6 h-6" />
            </div>

            <div className="text-lg font-black st text-agri-600">
              AGRILINK AI
            </div>

            <h2 className="text-2xl font-black text-[#0F172A] tracking-tight ">
              {isRegistering
                ? lang === "ta"
                  ? "புதிய கணக்கை உருவாக்க"
                  : "Create Farmer Account"
                : t.farmerLoginHeader}
            </h2>

            <p className="text-base text-slate-500 font-medium">
              {isRegistering
                ? lang === "ta"
                  ? "விவசாயியாக பதிவு செய்யவும்"
                  : "Join the network today"
                : `"${t.farmerLoginSubtitle}"`}
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-bold border border-red-200 text-center">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <div>
                <label className="block text-base font-bold text-slate-600 mb-1.5">
                  {lang === "ta" ? "முழு பெயர்" : "Full Name"}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ramanathan"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 font-bold text-slate-800 text-lg focus:outline-none focus:ring-2 focus:ring-agri-500"
                />
              </div>
            )}

            <div>
              <label className="block text-base font-bold text-slate-600 mb-1.5">
                {t.mobileNumberLabel}
              </label>
              <input
                type="tel"
                required
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="9876543210"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 font-bold text-slate-800 text-lg focus:outline-none focus:ring-2 focus:ring-agri-500"
              />
            </div>

            <div>
              <label className="block text-base font-bold text-slate-600 mb-1.5">
                {lang === "ta" ? "கடவுச்சொல்" : "Password"}
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 font-bold text-slate-800 text-lg focus:outline-none focus:ring-2 focus:ring-agri-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-base shadow-md flex items-center justify-center space-x-2 transition-all disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>
                    {isRegistering
                      ? lang === "ta"
                        ? "பதிவு செய்"
                        : "Register"
                      : t.sendOtpBtn}
                  </span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setErrorMsg("");
              }}
              className="text-base font-bold text-agri-600 hover:text-agri-700"
            >
              {isRegistering
                ? lang === "ta"
                  ? "ஏற்கனவே கணக்கு உள்ளதா? உள்நுழைய"
                  : "Already have an account? Login"
                : lang === "ta"
                  ? "புதிய விவசாயியா? பதிவு செய்ய"
                  : "New Farmer? Register here"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { useAgri } from "../../context/AgriContext";
import { Save, UserCircle, Phone, Lock, CheckCircle2, AlertCircle } from "lucide-react";

export const SettingsView = () => {
  const { user, setUser, lang, t } = useAgri();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    mobile: user?.mobile || "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const res = await fetch("http://localhost:8000/api/auth/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          name: formData.name,
          mobile: formData.mobile,
          ...(formData.password && { password: formData.password }),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setFormData((prev) => ({ ...prev, password: "" })); // Clear password field
      } else {
        setMessage({ type: "error", text: data.message || "Failed to update profile." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 pb-24">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-900 p-6 text-white border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
              <UserCircle className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Profile Settings</h1>
              <p className="text-sm text-slate-400">Update your account information</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {message && (
            <div
              className={`p-4 rounded-lg flex items-center space-x-3 text-sm font-medium ${
                message.type === "success"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Full Name / Business Name
              </label>
              <div className="relative">
                <UserCircle className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                New Password (Optional)
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Leave blank to keep current password"
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-sm flex items-center space-x-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              <span>{isLoading ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

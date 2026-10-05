import React, { useState } from "react";
import axios from "axios";
import { useAgri } from "../../context/AgriContext";
import { Settings, Save, ArrowLeft, Store } from "lucide-react";

export const SettingsView = () => {
  const { user, setUser, setCurrentView, t } = useAgri();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    farmName: user?.farmName || "",
    mobile: user?.mobile || "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      const res = await axios.put(
        `http://localhost:8000/api/users/${user.id}`,
        formData,
      );
      if (res.data.success) {
        setUser(res.data.user);
        setMessage("Settings updated successfully!");
      }
    } catch (error) {
      console.error(error);
      setMessage(
        "Failed to update settings. Make sure you added the 'farmName' column to the 'users' table in Supabase.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 pb-28 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => setCurrentView("command-center")}
          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
            <Settings className="w-6 h-6 text-emerald-600" />
            <span>Settings & Profile</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your farm and personal details
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center space-x-1.5">
              <span>Personal Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="e.g. Ramanathan"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center space-x-1.5">
              <Store className="w-4 h-4 text-emerald-600" />
              <span>Farm / Business Name</span>
            </label>
            <input
              type="text"
              name="farmName"
              value={formData.farmName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="e.g. Green Valley Farms"
            />
            <p className="text-xs text-slate-500 mt-1.5">
              This will be displayed to buyers during logistics tracking.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50 text-slate-500 cursor-not-allowed"
              readOnly
            />
          </div>

          {message && (
            <div
              className={`p-3 rounded-md text-sm font-medium ${message.includes("success") ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}
            >
              {message}
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-70"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

"use client";

import { useState, useTransition } from "react";
import { useTheme } from "next-themes";
import { Bell, Eye, Save, Loader2, Sliders, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { saveUserSettings } from "@/lib/actions/notifications";
import ResetDataModal from "@/components/ResetDataModal";

export default function SettingsClientView({ initialSettings, userEmail }) {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState(
    initialSettings || {
      budgetAlerts: true,
    },
  );
  const [isPending, startTransition] = useTransition();
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const router = useRouter();

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveSettings = () => {
    startTransition(async () => {
      const res = await saveUserSettings(userEmail, settings);
      if (res?.success) {
        router.refresh();
        alert("Settings saved successfully! 🎉");
      } else {
        alert("Something went wrong!");
      }
    });
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* ১. Appearance Section */}
      <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/40 bg-sidebar-bg p-6 space-y-4 shadow-xs transition-colors duration-300">
        <div className="flex items-center gap-2 border-b border-slate-200/60 dark:border-slate-800/40 pb-3">
          <Eye size={18} className="text-brand-purple" />
          <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">
            Appearance
          </h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200">
              Dark Mode
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Switch between light and dark themes
            </p>
          </div>
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-10 h-5 bg-slate-300 dark:bg-slate-700 rounded-full appearance-none checked:bg-brand-purple relative before:content-[''] before:absolute before:h-4 before:w-4 before:bg-white before:rounded-full before:top-0.5 before:left-0.5 checked:before:translate-x-5 before:transition-all cursor-pointer shadow-inner"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/40 bg-sidebar-bg p-6 space-y-4 shadow-xs transition-colors duration-300">
        <div className="flex items-center gap-2 border-b border-slate-200/60 dark:border-slate-800/40 pb-3">
          <Bell size={18} className="text-brand-purple" />
          <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">
            Notifications
          </h2>
        </div>

        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/50 pb-3">
          <div>
            <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200">
              Budget Alerts
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Get notified when you approach budget limits
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.budgetAlerts}
            onChange={() => handleToggle("budgetAlerts")}
            className="w-10 h-5 bg-slate-300 dark:bg-slate-700 rounded-full appearance-none checked:bg-brand-purple relative before:content-[''] before:absolute before:h-4 before:w-4 before:bg-white before:rounded-full before:top-0.5 before:left-0.5 checked:before:translate-x-5 before:transition-all cursor-pointer shadow-inner"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/2 p-6 space-y-4 shadow-xs transition-colors duration-300">
        <div className="flex items-center gap-2 border-b border-amber-500/20 pb-3">
          <Sliders size={18} className="text-amber-500" />
          <h2 className="text-base font-semibold text-amber-500">
            App Maintenance
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200">
              Reset Financial Data
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Clear all income and expense records to start fresh
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsResetModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-500 hover:bg-amber-600 rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap shadow-xs"
          >
            <RefreshCw size={14} />
            Reset Data
          </button>
        </div>
      </div>

      {/* Save Settings Button */}
      <div className="pt-2">
        <button
          onClick={handleSaveSettings}
          disabled={isPending}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold tracking-wide shadow-md transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Save size={14} />
          )}
          Save Settings
        </button>
      </div>

      <ResetDataModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        userEmail={userEmail}
      />
    </div>
  );
}

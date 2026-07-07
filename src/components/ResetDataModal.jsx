"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { resetUserData } from "@/lib/actions/notifications";

export default function ResetDataModal({ isOpen, onClose, userEmail }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleReset = async () => {
    if (!userEmail) return;
    try {
      setLoading(true);
      const res = await resetUserData(userEmail);
      if (res?.success) {
        onClose();
        router.refresh();

        setTimeout(() => window.location.reload(), 100);
      } else {
        alert("Failed to reset data. Try again.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-[#121424] border border-gray-800 text-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative p-6 text-center flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white"
        >
          ✕
        </button>

        <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500 mt-2">
          <RefreshCw className={`w-6 h-6 ${loading ? "animate-spin" : ""}`} />
        </div>

        <div>
          <h3 className="text-lg font-bold">Reset All Records?</h3>
          <p className="text-gray-400 text-sm mt-1">
            This will permanently delete all your income and expense entries.
            Your profile and settings will remain safe.
          </p>
        </div>

        <div className="flex justify-center gap-3 w-full mt-2">
          <Button
            type="button"
            onPress={onClose}
            className="bg-transparent border border-gray-700 text-gray-400 rounded-xl py-2.5 flex-1"
          >
            Cancel
          </Button>
          <Button
            isLoading={loading}
            onPress={handleReset}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl py-2.5 flex-1"
          >
            Reset Now
          </Button>
        </div>
      </div>
    </div>
  );
}

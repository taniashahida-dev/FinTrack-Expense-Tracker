"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { AlertCircle } from "lucide-react";
import { deleteExpense } from "@/lib/actions/expenses";
import { useRouter } from "next/navigation";

export default function DeleteExpenseModal({ isOpen, onClose, expense, userEmail }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!expense) return;
    try {
      setLoading(true);
      await deleteExpense(expense._id || expense.id, userEmail);
      onClose();
      router.refresh();
      setTimeout(() => window.location.reload(), 100);
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
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">✕</button>
        <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mt-2">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold">Are you sure?</h3>
          <p className="text-gray-400 text-sm mt-1">This expense record will be permanently deleted.</p>
        </div>
        <div className="flex justify-center gap-3 w-full mt-2">
          <Button type="button" onPress={onClose} className="bg-transparent border border-gray-700 text-gray-400 rounded-xl py-2.5">Cancel</Button>
          <Button isLoading={loading} onPress={handleDelete} className="bg-[#F43F5E] text-white font-semibold rounded-xl py-2.5">Delete</Button>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import {
  Form,
  Button,
  Select,
  ListBox,
  Input,
  TextField,
  FieldError,
} from "@heroui/react";
import { setBudget } from "@/lib/api/budget";
import { useRouter } from "next/navigation";

export default function SetBudgetModal({
  isOpen,
  onClose,
  userEmail,
  monthYear,
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const categories = [
    "Food",
    "Shopping",
    "Transportation",
    "Education",
    "Entertainment",
    "Health",
    "Bills",
    "Travel",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const selectedCategory = formData.get("category");
    const amount = formData.get("amount");

    if (!selectedCategory || !amount) return;
    setLoading(true);

    try {
      const response = await setBudget({
        userEmail,
        category: selectedCategory,
        amount: parseFloat(amount),
        monthYear,
      });

      if (response.success) {
        onClose();
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to set budget", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 animate-appearance-in">
      <div className="bg-white dark:bg-sidebar-bg w-full max-w-sm p-6 rounded-2xl border border-slate-200 dark:border-slate-800/40 shadow-2xl relative text-slate-800 dark:text-white mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-slate-600 dark:hover:text-white transition-colors text-lg"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-6 font-agbalumo tracking-wide text-slate-900 dark:text-white">
          Set Category Budget
        </h2>

        <Form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
          <div className="w-full relative">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1.5">
              Category
            </label>

            <Select name="category" className="w-full">
              <Select.Trigger className="w-full bg-slate-50 dark:bg-dashboard-bg border border-slate-200 dark:border-slate-800/30 rounded-xl h-11 flex justify-between items-center px-3 text-sm text-slate-700 dark:text-gray-200 focus:outline-none hover:border-slate-300 dark:hover:border-slate-700/50 transition-colors">
                <Select.Value placeholder="Select Category" />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover className="bg-white dark:bg-sidebar-bg border border-slate-200 dark:border-slate-800/40 rounded-xl shadow-2xl overflow-hidden mt-1 w-[--trigger-width] z-50">
                <ListBox className="p-1 outline-none w-full">
                  {categories.map((cat) => (
                    <ListBox.Item
                      key={cat}
                      id={cat}
                      textValue={cat}
                      className="p-2.5 text-sm rounded-lg cursor-pointer text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-dashboard-bg focus:bg-slate-100 dark:focus:bg-dashboard-bg transition-colors block font-medium"
                    >
                      {cat}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          <TextField isRequired name="amount" type="number" className="w-full">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1.5">
              Monthly Budget Amount (৳)
            </label>

            <Input
              placeholder="e.g. 5000"
              className="w-full bg-slate-50 dark:bg-dashboard-bg border border-slate-200 dark:border-slate-800/30 rounded-xl h-11 text-slate-900 dark:text-white focus:outline-none px-3 text-sm focus-within:border-brand-purple transition-colors"
            />
            <FieldError className="text-red-500 text-xs mt-1" />
          </TextField>

          <div className="flex gap-3 w-full pt-2">
            <Button
              type="button"
              onPress={onClose}
              className="w-1/2 bg-transparent border border-slate-200 dark:border-slate-800 text-gray-500 dark:text-gray-400 font-semibold h-11 rounded-xl hover:bg-slate-50 dark:hover:bg-dashboard-bg transition-all"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={loading}
              className="w-1/2 bg-brand-purple hover:bg-brand-purple-hover text-white font-semibold h-11 rounded-xl transition-all shadow-lg shadow-brand-purple/20"
            >
              Set Budget
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

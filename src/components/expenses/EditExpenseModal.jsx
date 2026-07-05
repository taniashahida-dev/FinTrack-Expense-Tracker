"use client";

import { useState, useEffect } from "react";
import {
  Form,
  Button,
  Select,
  Label,
  ListBox,
  TextField,
  Input,
} from "@heroui/react";
import { updateExpense } from "@/lib/actions/expenses";
import { useRouter } from "next/navigation";

export default function EditExpenseModal({
  isOpen,
  onClose,
  expense,
  userEmail,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState("");
  const [method, setMethod] = useState("");

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
  const paymentMethods = ["Cash", "Card", "Bank Transfer", "Mobile Banking"];

  useEffect(() => {
    if (expense && isOpen) {
      setCategory(expense.category || "");
      setMethod(expense.method || "");
    }
  }, [expense, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      setLoading(true);
      const updatedData = {
        title: formData.get("title"),
        amount: parseFloat(formData.get("amount")) || 0,
        category: category,
        method: method,
        date: formData.get("date"),
        description: formData.get("description"),
        userEmail,
      };

      const res = await updateExpense(expense._id || expense.id, updatedData);
      if (res) {
        alert("Expense Updated Successfully! 🎉");
        onClose();
        router.refresh();
        setTimeout(() => window.location.reload(), 100);
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
      <div className="bg-[#121424] w-full max-w-md p-6 rounded-2xl border border-gray-800 shadow-2xl relative text-white">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-6">Edit Expense</h2>

        <Form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <TextField
            isRequired
            name="title"
            defaultValue={expense?.title || ""}
            className="w-full"
          >
            <Label className="text-sm text-gray-400 mb-1 block">Title</Label>
            <Input className="w-full bg-[#1A1D33] border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none" />
          </TextField>

          <TextField
            isRequired
            name="amount"
            type="number"
            defaultValue={expense?.amount?.toString() || ""}
            className="w-full"
          >
            <Label className="text-sm text-gray-400 mb-1 block">
              Amount (৳)
            </Label>
            <Input className="w-full bg-[#1A1D33] border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none" />
          </TextField>

          <div className="grid grid-cols-2 gap-3 w-full">
            <div>
              <Select
                name="category"
                className="w-full"
                defaultSelectedKeys={
                  expense?.category ? [expense.category] : undefined
                }
                selectedKeys={category ? new Set([category]) : new Set()}
                onSelectionChange={(keys) => {
                  const val = Array.from(keys)[0];
                  if (val) setCategory(String(val));
                }}
              >
                <Label className="text-sm text-gray-400 mb-1 block">
                  Category
                </Label>
                <Select.Trigger className="w-full bg-[#1A1D33] border border-gray-700 rounded-lg p-2.5 flex justify-between items-center text-white focus:outline-none">
                  <Select.Value placeholder="Select Category" />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover
                  placement="bottom start"
                  className="bg-[#1A1D33] border border-gray-700 rounded-lg text-white w-[--trigger-width] shadow-2xl z-50 overflow-hidden"
                >
                  <ListBox
                    className="p-1 outline-none w-full"
                    selectionMode="single"
                  >
                    {categories.map((item) => (
                      <ListBox.Item
                        key={item}
                        id={item}
                        textValue={item}
                        className="p-2.5 hover:bg-[#222642] focus:bg-[#222642] cursor-pointer rounded outline-none block text-white font-medium data-[selected=true]:bg-[#6D31ED]"
                      >
                        {item}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <div>
              <Select
                name="method"
                className="w-full"
                defaultSelectedKeys={
                  expense?.method ? [expense.method] : undefined
                }
                selectedKeys={method ? new Set([method]) : new Set()}
                onSelectionChange={(keys) => {
                  const val = Array.from(keys)[0];
                  if (val) setMethod(String(val));
                }}
              >
                <Label className="text-sm text-gray-400 mb-1 block">
                  Payment Method
                </Label>
                <Select.Trigger className="w-full bg-[#1A1D33] border border-gray-700 rounded-lg p-2.5 flex justify-between items-center text-white focus:outline-none">
                  <Select.Value placeholder="Select Method" />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover
                  placement="bottom start"
                  className="bg-[#1A1D33] border border-gray-700 rounded-lg text-white w-[--trigger-width] shadow-2xl z-50 overflow-hidden"
                >
                  <ListBox
                    className="p-1 outline-none w-full"
                    selectionMode="single"
                  >
                    {paymentMethods.map((item) => (
                      <ListBox.Item
                        key={item}
                        id={item}
                        textValue={item}
                        className="p-2.5 hover:bg-[#222642] focus:bg-[#222642] cursor-pointer rounded outline-none block text-white font-medium data-[selected=true]:bg-[#6D31ED]"
                      >
                        {item}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>
          </div>

          <TextField
            isRequired
            name="date"
            type="date"
            defaultValue={expense?.date || ""}
            className="w-full"
          >
            <Label className="text-sm text-gray-400 mb-1 block">Date</Label>
            <Input className="w-full bg-[#1A1D33] border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none" />
          </TextField>

          <TextField
            name="description"
            defaultValue={expense?.description || ""}
            className="w-full"
          >
            <Label className="text-sm text-gray-400 mb-1 block">
              Description
            </Label>
            <textarea
              name="description"
              rows={3}
              className="w-full bg-[#1A1D33] border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none resize-none"
            />
          </TextField>

          <div className="flex gap-2 w-full pt-2">
            <Button
              type="submit"
              isLoading={loading}
              className="w-1/2 bg-[#6D31ED] text-white py-2.5 rounded-lg font-medium"
            >
              Save Changes
            </Button>
            <Button
              type="button"
              onPress={onClose}
              className="w-1/2 bg-transparent border border-gray-700 text-white py-2.5 rounded-lg"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

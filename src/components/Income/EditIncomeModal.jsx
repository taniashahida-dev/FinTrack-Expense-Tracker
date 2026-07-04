"use client";

import { useState, useEffect } from "react";
import { updateIncome } from "@/lib/actions/incomes";
import { useRouter } from "next/navigation";
import {
  Form,
  Button,
  Select,
  Label,
  ListBox,
  TextField,
  Input,
  FieldError,
} from "@heroui/react";

export default function EditIncomeModal({
  isOpen,
  onClose,
  income,
  userEmail,
  onUpdateSuccess,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [selectedSource, setSelectedSource] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (income && isOpen) {
      setSelectedSource(income.source || "");
      setAmount(income.amount?.toString() || "");
      setDate(income.date || "");
      setDescription(income.description || "");
    }
  }, [income, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!income) return;
    if (!userEmail) {
      console.error("Error: userEmail prop is missing in EditIncomeModal!");
      alert("User session not found. Please refresh the page.");
      return;
    }
    try {
      setLoading(true);

      const updatedData = {
        source: selectedSource,
        amount: parseFloat(amount) || 0,
        date: date,
        description: description,
        userEmail: userEmail,
      };

      const incomeId = income._id || income.id;
      const result = await updateIncome(incomeId, updatedData);

      if (result?.success || result?.modifiedCount > 0 || result) {
        onClose();
        if (onUpdateSuccess) {
          onUpdateSuccess();
        } else {
          router.refresh();
        }
      }
    } catch (error) {
      console.error("Failed to update income:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#121424] w-full max-w-md p-6 rounded-xl border border-gray-800 shadow-2xl relative text-white">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-6">Edit Income</h2>

        <Form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <div className="w-full relative">
            <Select
              name="source"
              className="w-full"
              selectedKeys={selectedSource ? [selectedSource] : []}
              onSelectionChange={(keys) =>
                setSelectedSource(Array.from(keys)[0])
              }
            >
              <Label className="text-sm text-gray-400 mb-1 block">Source</Label>

              <Select.Trigger className="w-full bg-[#1A1D33] border border-gray-700 rounded-lg p-2.5 flex justify-between items-center text-white focus:outline-none">
                <Select.Value placeholder="Select Source">
                  {selectedSource || "Select Source"}
                </Select.Value>
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover
                placement="bottom start"
                className="bg-[#1A1D33] border border-gray-700 rounded-lg text-white w-[--trigger-width] shadow-2xl z-50 overflow-hidden"
              >
                <ListBox className="p-1 outline-none w-full">
                  {[
                    "Salary",
                    "Freelancing",
                    "Investment",
                    "Business",
                    "Rental",
                    "Others",
                  ].map((item) => (
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

          <TextField isRequired name="amount" type="number" className="w-full">
            <Label className="text-sm text-gray-400 mb-1 block">
              Amount (৳)
            </Label>
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full bg-[#1A1D33] border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none"
            />
            <FieldError className="text-red-500 text-xs mt-1" />
          </TextField>

          <TextField isRequired name="date" type="date" className="w-full">
            <Label className="text-sm text-gray-400 mb-1 block">Date</Label>
            <Input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[#1A1D33] border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none"
            />
            <FieldError className="text-red-500 text-xs mt-1" />
          </TextField>

          <TextField name="description" className="w-full">
            <Label className="text-sm text-gray-400 mb-1 block">
              Description
            </Label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional notes..."
              rows={3}
              className="w-full bg-[#1A1D33] border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none resize-none"
            />
            <FieldError className="text-red-500 text-xs mt-1" />
          </TextField>

          <div className="flex gap-2 w-full pt-2">
            <Button
              type="submit"
              isLoading={loading}
              className="w-1/2 bg-[#6D31ED] text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2"
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

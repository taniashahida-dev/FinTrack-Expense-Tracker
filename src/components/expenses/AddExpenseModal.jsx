"use client";

import { useState } from "react";
import {
  Form,
  Button,
  Select,
  Label,
  ListBox,
  TextField,
  Input,
} from "@heroui/react";
import { Plus } from "lucide-react";
import { createExpense } from "@/lib/actions/expenses";
import { useRouter } from "next/navigation";

export default function AddExpenseModal({ userEmail }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      setLoading(true);
      const payload = {
        title: formData.get("title"),
        amount: parseFloat(formData.get("amount")) || 0,
        category: formData.get("category"),
        method: formData.get("method"),
        date: formData.get("date"),
        description: formData.get("description"),
        userEmail: userEmail,
      };

      const res = await createExpense(payload);
      if (res) {
        alert("Expense Added Successfully! 🎉");
        setIsOpen(false);
        router.refresh();
        setTimeout(() => window.location.reload(), 100);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onPress={() => setIsOpen(true)}
        className="bg-[#6D31ED] hover:opacity-90 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium shadow-lg text-sm"
      >
        <Plus className="w-4 h-4" /> Add Expense
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-[#121424] w-full max-w-md p-6 rounded-2xl border border-gray-800 shadow-2xl relative text-white">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-6">Add Expense</h2>

            <Form
              className="flex flex-col gap-4 w-full"
              onSubmit={handleSubmit}
            >
              <TextField isRequired name="title" className="w-full">
                <Label className="text-sm text-gray-400 mb-1 block">
                  Title
                </Label>
                <Input
                  placeholder="Grocery Shopping"
                  className="w-full bg-[#1A1D33] border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none"
                />
              </TextField>

              <TextField
                isRequired
                name="amount"
                type="number"
                className="w-full"
              >
                <Label className="text-sm text-gray-400 mb-1 block">
                  Amount (৳)
                </Label>
                <Input
                  placeholder="0"
                  className="w-full bg-[#1A1D33] border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none"
                />
              </TextField>

              <div className="grid grid-cols-2 gap-3 w-full">
                <div>
                  <Select name="category" className="w-full">
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
                      <ListBox className="p-1 outline-none w-full">
                        <ListBox.Item
                          id="Food"
                          textValue="Food"
                          className="p-2.5 hover:bg-[#222642] focus:bg-[#222642] cursor-pointer rounded outline-none block text-white font-medium"
                        >
                          Food
                        </ListBox.Item>
                        <ListBox.Item
                          id="Shopping"
                          textValue="Shopping"
                          className="p-2.5 hover:bg-[#222642] focus:bg-[#222642] cursor-pointer rounded outline-none block text-white font-medium"
                        >
                          Shopping
                        </ListBox.Item>
                        <ListBox.Item
                          id="Transportation"
                          textValue="Transportation"
                          className="p-2.5 hover:bg-[#222642] focus:bg-[#222642] cursor-pointer rounded outline-none block text-white font-medium"
                        >
                          Transportation
                        </ListBox.Item>
                        <ListBox.Item
                          id="Education"
                          textValue="Education"
                          className="p-2.5 hover:bg-[#222642] focus:bg-[#222642] cursor-pointer rounded outline-none block text-white font-medium"
                        >
                          Education
                        </ListBox.Item>
                        <ListBox.Item
                          id="Entertainment"
                          textValue="Entertainment"
                          className="p-2.5 hover:bg-[#222642] focus:bg-[#222642] cursor-pointer rounded outline-none block text-white font-medium"
                        >
                          Entertainment
                        </ListBox.Item>
                        <ListBox.Item
                          id="Health"
                          textValue="Health"
                          className="p-2.5 hover:bg-[#222642] focus:bg-[#222642] cursor-pointer rounded outline-none block text-white font-medium"
                        >
                          Health
                        </ListBox.Item>
                        <ListBox.Item
                          id="Bills"
                          textValue="Bills"
                          className="p-2.5 hover:bg-[#222642] focus:bg-[#222642] cursor-pointer rounded outline-none block text-white font-medium"
                        >
                          Bills
                        </ListBox.Item>
                        <ListBox.Item
                          id="Travel"
                          textValue="Travel"
                          className="p-2.5 hover:bg-[#222642] focus:bg-[#222642] cursor-pointer rounded outline-none block text-white font-medium"
                        >
                          Travel
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                <div>
                  <Select name="method" className="w-full">
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
                      <ListBox className="p-1 outline-none w-full">
                        <ListBox.Item
                          id="Cash"
                          textValue="Cash"
                          className="p-2.5 hover:bg-[#222642] focus:bg-[#222642] cursor-pointer rounded outline-none block text-white font-medium"
                        >
                          Cash
                        </ListBox.Item>
                        <ListBox.Item
                          id="Card"
                          textValue="Card"
                          className="p-2.5 hover:bg-[#222642] focus:bg-[#222642] cursor-pointer rounded outline-none block text-white font-medium"
                        >
                          Card
                        </ListBox.Item>
                        <ListBox.Item
                          id="Bank Transfer"
                          textValue="Bank Transfer"
                          className="p-2.5 hover:bg-[#222642] focus:bg-[#222642] cursor-pointer rounded outline-none block text-white font-medium"
                        >
                          Bank Transfer
                        </ListBox.Item>
                        <ListBox.Item
                          id="Mobile Banking"
                          textValue="Mobile Banking"
                          className="p-2.5 hover:bg-[#222642] focus:bg-[#222642] cursor-pointer rounded outline-none block text-white font-medium"
                        >
                          Mobile Banking
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>
              </div>

              <TextField isRequired name="date" type="date" className="w-full">
                <Label className="text-sm text-gray-400 mb-1 block">Date</Label>
                <Input className="w-full bg-[#1A1D33] border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none" />
              </TextField>

              <TextField name="description" className="w-full">
                <Label className="text-sm text-gray-400 mb-1 block">
                  Description
                </Label>
                <textarea
                  name="description"
                  placeholder="Optional notes..."
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
                  Add Expense
                </Button>
                <Button
                  type="button"
                  onPress={() => setIsOpen(false)}
                  className="w-1/2 bg-transparent border border-gray-700 text-white py-2.5 rounded-lg"
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import { createIncome } from "@/lib/actions/incomes";
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

export default function AddIncomeModal({ userEmail }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const incomeData = {
      source: formData.get("source"),
      amount: parseFloat(formData.get("amount")),
      date: formData.get("date"),
      description: formData.get("description"),
      userEmail: userEmail,
    };

    const result = await createIncome(incomeData);

    if (result?.insertedId) {
      alert("Income Added Successfully! 🎉");
      setIsOpen(false);
      window.location.reload();
    }
  };

  return (
    <div>
      <Button
        onPress={() => setIsOpen(true)}
        className="bg-[#6D31ED] text-white font-medium px-4 py-2 rounded-lg"
      >
        + Add Income
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-[#121424] w-full max-w-md p-6 rounded-xl border border-gray-800 shadow-2xl relative text-white">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-6">Add Income</h2>

            <Form
              className="flex flex-col gap-4 w-full"
              onSubmit={handleSubmit}
            >
              <div className="w-full relative">
                <Select name="source" className="w-full">
                  <Label className="text-sm text-gray-400 mb-1 block">
                    Source
                  </Label>

                  <Select.Trigger className="w-full bg-[#1A1D33] border border-gray-700 rounded-lg p-2.5 flex justify-between items-center text-white focus:outline-none">
                    <Select.Value placeholder="Select Source" />
                    <Select.Indicator />
                  </Select.Trigger>

                  <Select.Popover
                    placement="bottom start"
                    className="bg-[#1A1D33] border border-gray-700 rounded-lg text-white w-[--trigger-width] shadow-2xl z-50 overflow-hidden"
                  >
                    <ListBox className="p-1 outline-none w-full">
                      <ListBox.Item
                        id="Salary"
                        textValue="Salary"
                        className="p-2.5 hover:bg-[#222642] focus:bg-[#222642] cursor-pointer rounded outline-none block text-white font-medium"
                      >
                        Salary
                      </ListBox.Item>
                      <ListBox.Item
                        id="Freelancing"
                        textValue="Freelancing"
                        className="p-2.5 hover:bg-[#222642] focus:bg-[#222642] cursor-pointer rounded outline-none block text-white font-medium"
                      >
                        Freelancing
                      </ListBox.Item>
                      <ListBox.Item
                        id="Investment"
                        textValue="Investment"
                        className="p-2.5 hover:bg-[#222642] focus:bg-[#222642] cursor-pointer rounded outline-none block text-white font-medium"
                      >
                        Investment
                      </ListBox.Item>
                      <ListBox.Item
                        id="Business"
                        textValue="Business"
                        className="p-2.5 hover:bg-[#222642] focus:bg-[#222642] cursor-pointer rounded outline-none block text-white font-medium"
                      >
                        Business
                      </ListBox.Item>
                      <ListBox.Item
                        id="Rental"
                        textValue="Rental"
                        className="p-2.5 hover:bg-[#222642] focus:bg-[#222642] cursor-pointer rounded outline-none block text-white font-medium"
                      >
                        Rental
                      </ListBox.Item>
                      <ListBox.Item
                        id="Others"
                        textValue="Others"
                        className="p-2.5 hover:bg-[#222642] focus:bg-[#222642] cursor-pointer rounded outline-none block text-white font-medium"
                      >
                        Others
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

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
                <FieldError className="text-red-500 text-xs mt-1" />
              </TextField>

              <TextField isRequired name="date" type="date" className="w-full">
                <Label className="text-sm text-gray-400 mb-1 block">Date</Label>
                <Input className="w-full bg-[#1A1D33] border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none" />
                <FieldError className="text-red-500 text-xs mt-1" />
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
                <FieldError className="text-red-500 text-xs mt-1" />
              </TextField>

              <div className="flex gap-2 w-full pt-2">
                <Button
                  type="submit"
                  className="w-1/2 bg-[#6D31ED] text-white py-2.5 rounded-lg font-medium"
                >
                  Add Income
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
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Table } from "@heroui/react";
import {
  Pencil,
  Trash2,
  Search,
  Utensils,
  ShoppingBag,
  Car,
  GraduationCap,
  Clapperboard,
  HeartPulse,
  Receipt,
  Plane,
  FileText,
} from "lucide-react";
import EditExpenseModal from "./EditExpenseModal";
import DeleteExpenseModal from "./DeleteExpenseModal";

export default function ExpenseTable({
  expenses = [],
  userEmail,
  currentSearch,
  currentCategory,
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const [searchQuery, setSearchQuery] = useState(currentSearch);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categories = [
    "All",
    "Food",
    "Shopping",
    "Transportation",
    "Education",
    "Entertainment",
    "Health",
    "Bills",
    "Travel",
  ];

  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "All") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleFilterChange("search", searchQuery);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const getCategoryStyles = (category) => {
    switch (category?.toLowerCase()) {
      case "food":
        return {
          bg: "bg-[#FFF4E5] dark:bg-[#F59E0B]/10",
          text: "text-[#F59E0B]",
          IconComponent: Utensils,
        };
      case "shopping":
        return {
          bg: "bg-[#FFEAF0] dark:bg-[#EC4899]/10",
          text: "text-[#EC4899]",
          IconComponent: ShoppingBag,
        };
      case "transportation":
        return {
          bg: "bg-[#EBF1FF] dark:bg-[#3B82F6]/10",
          text: "text-[#3B82F6]",
          IconComponent: Car,
        };
      case "education":
        return {
          bg: "bg-[#EFEAFF] dark:bg-[#8B5CF6]/10",
          text: "text-[#8B5CF6]",
          IconComponent: GraduationCap,
        };
      case "entertainment":
        return {
          bg: "bg-[#E2F8FA] dark:bg-[#06B6D4]/10",
          text: "text-[#06B6D4]",
          IconComponent: Clapperboard,
        };
      case "health":
        return {
          bg: "bg-[#FEE2E2] dark:bg-[#EF4444]/10",
          text: "text-[#EF4444]",
          IconComponent: HeartPulse,
        };
      case "bills":
        return {
          bg: "bg-[#ECEFF1] dark:bg-[#78909C]/10",
          text: "text-[#607D8B]",
          IconComponent: Receipt,
        };
      case "travel":
        return {
          bg: "bg-[#E8F5E9] dark:bg-[#4CAF50]/10",
          text: "text-[#4CAF50]",
          IconComponent: Plane,
        };
      default:
        return {
          bg: "bg-gray-100 dark:bg-gray-500/10",
          text: "text-gray-600 dark:text-gray-400",
          IconComponent: FileText,
        };
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-[#0F1122]/40 p-3 rounded-2xl border border-slate-200 dark:border-gray-800/60 shadow-sm dark:shadow-none">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F3F4F6] dark:bg-[#161930] pl-9 pr-4 py-2.5 rounded-xl border border-transparent dark:border-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange("category", cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                currentCategory === cat
                  ? "bg-[#6D31ED] text-white"
                  : "bg-[#F3F4F6] dark:bg-[#161930] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 border border-transparent dark:border-gray-800/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <Table className="p-0 bg-transparent shadow-none border-none">
        <Table.ScrollContainer>
          <Table.Content aria-label="Expenses transactions table">
            <Table.Header>
              <Table.Column
                isRowHeader
                className="bg-transparent text-gray-500 text-sm font-medium py-4 pl-6 border-b border-slate-200 dark:border-gray-800/40"
              >
                Title
              </Table.Column>
              <Table.Column className="bg-transparent text-gray-500 text-sm font-medium py-4 border-b border-slate-200 dark:border-gray-800/40">
                Category
              </Table.Column>
              <Table.Column className="bg-transparent text-gray-500 text-sm font-medium py-4 border-b border-slate-200 dark:border-gray-800/40">
                Date
              </Table.Column>
              <Table.Column className="bg-transparent text-gray-500 text-sm font-medium py-4 border-b border-slate-200 dark:border-gray-800/40">
                Method
              </Table.Column>
              <Table.Column className="bg-transparent text-gray-500 text-sm font-medium py-4 text-right border-b border-slate-200 dark:border-gray-800/40">
                Amount
              </Table.Column>
              <Table.Column className="bg-transparent text-gray-500 text-sm font-medium py-4 text-right pr-6 border-b border-slate-200 dark:border-gray-800/40">
                Actions
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {expenses.map((expense) => {
                const styles = getCategoryStyles(expense.category);
                const Icon = styles.IconComponent;

                return (
                  <Table.Row
                    key={expense._id || expense.id}
                    className="border-b border-slate-100 dark:border-gray-800/20 hover:bg-gray-50 dark:hover:bg-[#0d111d]/30 transition-colors"
                  >
                    <Table.Cell className="py-4 pl-6">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-8 h-8 flex items-center justify-center rounded-full ${styles.bg} ${styles.text}`}
                        >
                          <Icon className="w-4 h-4" />
                        </span>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">
                            {expense.title}
                          </p>
                          {expense.description && (
                            <span className="text-xs text-gray-400 dark:text-gray-500 font-normal block max-w-45 truncate">
                              {expense.description}
                            </span>
                          )}
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="py-4">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${styles.bg} ${styles.text}`}
                      >
                        {expense.category}
                      </span>
                    </Table.Cell>
                    <Table.Cell className="py-4 text-gray-600 dark:text-gray-400 text-sm font-medium">
                      {expense.date}
                    </Table.Cell>
                    <Table.Cell className="py-4 text-gray-600 dark:text-gray-400 text-sm font-medium">
                      {expense.method || "Cash"}
                    </Table.Cell>
                    <Table.Cell className="py-4 text-right font-bold text-red-500 text-base">
                      -৳{expense.amount?.toLocaleString()}
                    </Table.Cell>
                    <Table.Cell className="py-4 text-right pr-6">
                      <div className="inline-flex items-center gap-4 text-gray-400 dark:text-gray-500">
                        <button
                          onClick={() => {
                            setSelectedExpense(expense);
                            setIsEditOpen(true);
                          }}
                          className="hover:text-amber-500 p-1 transition"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedExpense(expense);
                            setIsDeleteOpen(true);
                          }}
                          className="hover:text-red-500 p-1 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      {expenses.length === 0 && (
        <div className="py-12 text-center text-gray-400 dark:text-gray-500 font-medium border-b border-slate-100 dark:border-gray-800/20">
          No expense records found.
        </div>
      )}

      <EditExpenseModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        expense={selectedExpense}
        userEmail={userEmail}
      />
      <DeleteExpenseModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        expense={selectedExpense}
        userEmail={userEmail}
      />
    </div>
  );
}

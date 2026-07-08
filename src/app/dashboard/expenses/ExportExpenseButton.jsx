"use client";

import { Download } from "lucide-react";

export default function ExportExpenseButton({ expenses }) {
  const handleExport = () => {
    if (!expenses.length) {
      alert("No expense data found");
      return;
    }

    const headers = [
      "Date",
      "Title",
      "Category",
      "Amount",
      "Description",
    ];

    const rows = expenses.map((expense) => [
      `="${expense.date}"`, // Excel date format fix
      expense.title || "",
      expense.category || "",
      expense.amount,
      expense.description || "",
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "expense-history.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 border border-gray-200 dark:border-gray-800/80 bg-white dark:bg-[#0f1322] hover:bg-gray-50 dark:hover:bg-[#151b30] text-gray-700 dark:text-gray-300 text-sm font-medium px-4 py-2 rounded-xl shadow-sm transition-all duration-200 active:scale-95"
    >
      <Download className="w-4 h-4" />
      Export
    </button>
  );
}
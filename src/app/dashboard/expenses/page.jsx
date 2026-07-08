import AddExpenseModal from "@/components/expenses/AddExpenseModal";
import ExpenseStats from "@/components/expenses/ExpenseStats";
import ExpenseTable from "@/components/expenses/ExpenseTable";
import { getExpenses } from "@/lib/api/expense";
import { getUserSession } from "@/lib/core/session";
import { Download } from "lucide-react";
import ExportExpenseButton from "./ExportExpenseButton";

export default async function ExpensesPage({ searchParams }) {
  const user = await getUserSession();
  const userEmail = user?.email;

  const params = await searchParams;
  const search = params?.search || "";
  const category = params?.category || "All";

  const expenses = (await getExpenses(userEmail, { search, category })) || [];

  return (
    <div className="p-6 min-h-screen flex flex-col gap-6 text-gray-900 dark:text-gray-100 bg-dashboard-bg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Expenses</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
            {expenses.length} transactions recorded
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <ExportExpenseButton expenses={expenses} />

          <AddExpenseModal userEmail={userEmail} />
        </div>
      </div>

      <ExpenseStats expenses={expenses} />

      <ExpenseTable
        expenses={expenses}
        userEmail={userEmail}
        currentSearch={search}
        currentCategory={category}
      />
    </div>
  );
}

import { getUserSession } from "@/lib/core/session";
import { getBudgetOverview } from "@/lib/api/budget";
import BudgetClientView from "@/components/budget/BudgetClientView";

export default async function BudgetPage() {
  const user = await getUserSession();
  const userEmail = user?.email;

  const currentDate = new Date();
  const year = currentDate.getFullYear();

  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const currentMonthYear = `${year}-${month}`;

  const displayMonthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  let budgetData = {
    totalBudget: 0,
    totalSpent: 0,
    remaining: 0,
    categoryBreakdown: [],
  };

  try {
    const data = await getBudgetOverview(userEmail, currentMonthYear);
    if (data) {
      budgetData = data;
    }
  } catch (error) {
    console.error("❌ Budget API Fetching Error:", error.message);
  }

  return (
    <div className="p-6 min-h-screen bg-dashboard-bg flex flex-col gap-6">
      <BudgetClientView
        initialData={budgetData}
        userEmail={userEmail}
        monthYear={currentMonthYear}
        displayMonthYear={displayMonthYear}
      />
    </div>
  );
}

import { TrendingDown, AlertTriangle, Activity } from "lucide-react";

export default function ExpenseStats({ expenses = [] }) {
  const totalSpent = expenses.reduce(
    (sum, item) => sum + (parseFloat(item.amount) || 0),
    0,
  );

  const largestExpense =
    expenses.length > 0
      ? Math.max(...expenses.map((item) => parseFloat(item.amount) || 0))
      : 0;

  const averageExpense =
    expenses.length > 0 ? Math.round(totalSpent / expenses.length) : 0;

  const cards = [
    {
      title: "Total Spent",
      value: `৳${totalSpent.toLocaleString()}`,
      icon: <TrendingDown className="w-5 h-5 text-pink-500" />,
      bg: "bg-card-expense",
      iconBg: "bg-pink-500/10",
    },
    {
      title: "Largest Expense",
      value: `৳${largestExpense.toLocaleString()}`,
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,

      bg: "bg-[#FFF4E5] dark:bg-[#241B19]/40",
      iconBg: "bg-amber-500/10",
    },
    {
      title: "Average Expense",
      value: `৳${averageExpense.toLocaleString()}`,
      icon: <Activity className="w-5 h-5 text-purple-500" />,
      bg: "bg-card-balance",
      iconBg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`rounded-2xl p-6 border border-slate-200/60 dark:border-slate-800/20 flex justify-between items-center ${card.bg}`}
        >
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">
              {card.title}
            </p>
            <h3 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
              {card.value}
            </h3>
          </div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${card.iconBg}`}
          >
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}

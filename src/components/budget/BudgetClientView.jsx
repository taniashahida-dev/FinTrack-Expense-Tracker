"use client";

import { useState, useEffect } from "react";
import {
  Target,
  Activity,
  Wallet,
  Utensils,
  ShoppingBag,
  Car,
  GraduationCap,
  Clapperboard,
  Heart,
  Receipt,
  Plane,
  FileText,
  AlertTriangle,
} from "lucide-react";
import SetBudgetModal from "./SetBudgetModal";

export default function BudgetClientView({
  initialData,
  userEmail,
  monthYear,
  displayMonthYear,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
 const emptyBudget = {
  totalBudget: 0,
  totalSpent: 0,
  remaining: 0,
  categoryBreakdown: [],
};

const [budgetData, setBudgetData] = useState(
  initialData || emptyBudget
);

useEffect(() => {
  setBudgetData(initialData || emptyBudget);
}, [initialData]);
  const totalPercentUsed =
    budgetData.totalBudget > 0
      ? Math.round((budgetData.totalSpent / budgetData.totalBudget) * 100)
      : 0;

  const exceededCategories =
    budgetData.categoryBreakdown
      ?.filter((item) => item.isExceeded)
      ?.map((item) => item.category) || [];

  const stats = [
    {
      title: "Total Budget",
      value: `৳${budgetData.totalBudget?.toLocaleString() || 0}`,
      icon: <Target className="w-5 h-5 text-purple-500" />,
      bg: "bg-card-balance",
      iconBg: "bg-purple-500/10",
    },
    {
      title: "Total Spent",
      value: `৳${budgetData.totalSpent?.toLocaleString() || 0}`,
      subText: `${totalPercentUsed}% of budget`, // 💡 ফিগমা ডিজাইন অনুযায়ী
      icon: <Activity className="w-5 h-5 text-amber-500" />,
      bg: "bg-card-expense",
      iconBg: "bg-amber-500/10",
    },
    {
      title: "Remaining",
      value: `৳${budgetData.remaining?.toLocaleString() || 0}`,
      icon: <Wallet className="w-5 h-5 text-emerald-500" />,
      bg: "bg-card-savings",
      iconBg: "bg-emerald-500/10",
      textColor: budgetData.remaining < 0 ? "text-red-500" : "text-emerald-500",
    },
  ];

  const categoryStyles = {
    food: {
      icon: Utensils,
      iconColor: "text-orange-500",
      bgStyle: "bg-orange-500/10",
    },
    shopping: {
      icon: ShoppingBag,
      iconColor: "text-pink-500",
      bgStyle: "bg-pink-500/10",
    },
    transportation: {
      icon: Car,
      iconColor: "text-blue-500",
      bgStyle: "bg-blue-500/10",
    },
    education: {
      icon: GraduationCap,
      iconColor: "text-cyan-500",
      bgStyle: "bg-cyan-500/10",
    },
    entertainment: {
      icon: Clapperboard,
      iconColor: "text-purple-500",
      bgStyle: "bg-purple-500/10",
    },
    health: {
      icon: Heart,
      iconColor: "text-red-500",
      bgStyle: "bg-red-500/10",
    },
    bills: {
      icon: Receipt,
      iconColor: "text-amber-500",
      bgStyle: "bg-amber-500/10",
    },
    travel: {
      icon: Plane,
      iconColor: "text-indigo-500",
      bgStyle: "bg-indigo-500/10",
    },
    default: {
      icon: FileText,
      iconColor: "text-gray-500",
      bgStyle: "bg-gray-500/10",
    },
  };

  const getCategoryConfig = (category) => {
    const key = category?.toLowerCase();
    return categoryStyles[key] || categoryStyles.default;
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Budget Planning
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
            {displayMonthYear}
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-purple hover:bg-brand-purple-hover text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all active:scale-95 shadow-sm"
        >
          + Set Budget
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-2xl p-6 border border-slate-200/60 dark:border-slate-800/20 flex justify-between items-center ${stat.bg}`}
          >
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">
                {stat.title}
              </p>
              <h3
                className={`text-2xl font-bold mt-2 ${stat.textColor || "text-gray-900 dark:text-white"}`}
              >
                {stat.value}
              </h3>

              {stat.subText && (
                <p className="text-xs text-gray-400 mt-1 font-medium">
                  {stat.subText}
                </p>
              )}
            </div>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.iconBg}`}
            >
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {exceededCategories.length > 0 && (
        <div className="w-full bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-500 text-sm font-medium">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <span>Budget exceeded in {exceededCategories.join(", ")}!</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {budgetData.categoryBreakdown?.map((item) => {
          const {
            icon: Icon,
            iconColor,
            bgStyle,
          } = getCategoryConfig(item.category);

          return (
            <div
              key={item.category}
              className="bg-white dark:bg-[#0f1322] p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/40 flex flex-col gap-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 ${bgStyle} rounded-xl flex items-center justify-center`}
                  >
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-base leading-none">
                      {item.category}
                    </h4>

                    <span className="text-xs text-gray-400 font-medium mt-1.5 block">
                      Budget: ৳{item.budgetAmount?.toLocaleString() || 0}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                    item.isExceeded
                      ? "bg-red-500/10 text-red-500"
                      : "bg-emerald-500/10 text-emerald-500"
                  }`}
                >
                  {item.isExceeded ? "Exceeded" : "On Track"}
                </span>
              </div>

              <div className="flex justify-between items-end mt-2">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Spent:{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    ৳{item.spent?.toLocaleString() || 0}
                  </span>
                </span>

                <span
                  className={`text-xs font-bold ${item.isExceeded ? "text-red-500" : "text-emerald-500"}`}
                >
                  {item.isExceeded
                    ? `৳${Math.abs(item.remaining)?.toLocaleString()} over`
                    : `৳${item.remaining?.toLocaleString()} left`}
                </span>
              </div>

              <div className="space-y-2">
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${item.isExceeded ? "bg-red-500" : "bg-emerald-500"}`}
                    style={{ width: `${Math.min(item.percentUsed, 100)}%` }}
                  />
                </div>

                <div className="flex justify-end">
                  <span className="text-[11px] font-medium text-gray-400">
                    {item.percentUsed}% used
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <SetBudgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userEmail={userEmail}
        monthYear={monthYear}
      />
    </div>
  );
}

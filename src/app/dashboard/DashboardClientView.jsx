"use client";

import { useState } from "react";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  Plus,
  ArrowRight,
  TrendingUp,
  ShoppingBag,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart as RePieChart,
  Pie,
  Cell,
} from "recharts";
import Link from "next/link";

export default function DashboardClientView({ user, initialData }) {
  const [data] = useState(initialData);

  const cards = initialData?.cards || {
    totalBalance: 0,
    monthlyIncome: 0,
    incomeChange: 0,
    totalExpense: 0,
    expenseChange: 0,
    savingsRate: 0,
  };
  const chartData = initialData?.chartData || [];
  const categoryData = initialData?.categoryData || [];
  const recentTransactions = initialData?.recentTransactions || [];
  const budgetProgress = initialData?.budgetProgress || [];
  const meta = initialData?.user || {
    currentMonthName: "this month",
    prevMonthName: "last month",
  };

  const COLORS = [
    "#f97316",
    "#ef4444",
    "#06b6d4",
    "#3b82f6",
    "#6366f1",
    "#a855f7",
  ];
  const totalCategoryValue = categoryData.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  return (
    <div className="min-h-screen pb-12 text-slate-800 dark:text-slate-100 p-1">
      {/* হেডার পার্ট */}
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Dashboard
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Welcome back, {user?.name || "User"}! Here is your{" "}
          {meta.currentMonthName} overview.
        </p>
      </div>

      <main className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <div className="bg-card-balance border border-blue-200/30 dark:border-blue-900/20 p-5 rounded-2xl flex justify-between items-start shadow-xs">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-500 dark:text-slate-400">
                Total Balance
              </p>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                ৳{cards.totalBalance?.toLocaleString()}
              </h3>
              <p className="text-[11px] font-bold text-txt-success flex items-center gap-0.5 pt-1">
                As of today
              </p>
            </div>
            <span className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Wallet size={20} />
            </span>
          </div>

          <div className="bg-card-income border border-emerald-200/30 dark:border-emerald-900/20 p-5 rounded-2xl flex justify-between items-start shadow-xs">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-500 dark:text-slate-400">
                Monthly Income
              </p>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                ৳{cards.monthlyIncome?.toLocaleString()}
              </h3>
              <p
                className={`text-[11px] font-bold flex items-center gap-0.5 pt-1 ${cards.incomeChange >= 0 ? "text-txt-success" : "text-txt-danger"}`}
              >
                {cards.incomeChange >= 0 ? (
                  <ArrowUpRight size={14} />
                ) : (
                  <ArrowDownRight size={14} />
                )}
                {Math.abs(cards.incomeChange)}%{" "}
                <span className="text-slate-400 font-normal">
                  from {meta.prevMonthName}
                </span>
              </p>
            </div>
            <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight size={20} />
            </span>
          </div>

          <div className="bg-card-expense border border-purple-200/30 dark:border-purple-900/20 p-5 rounded-2xl flex justify-between items-start shadow-xs">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-500 dark:text-slate-400">
                Total Expense
              </p>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                ৳{cards.totalExpense?.toLocaleString()}
              </h3>
              <p
                className={`text-[11px] font-bold flex items-center gap-0.5 pt-1 ${cards.expenseChange <= 0 ? "text-txt-success" : "text-txt-danger"}`}
              >
                {cards.expenseChange > 0 ? (
                  <ArrowUpRight size={14} />
                ) : (
                  <ArrowDownRight size={14} />
                )}
                {cards.expenseChange}%{" "}
                <span className="text-slate-400 font-normal">
                  from {meta.prevMonthName}
                </span>
              </p>
            </div>
            <span className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <ArrowDownRight size={20} />
            </span>
          </div>

          <div className="bg-card-savings border border-cyan-200/30 dark:border-cyan-900/20 p-5 rounded-2xl flex justify-between items-start shadow-xs">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-500 dark:text-slate-400">
                Savings Rate
              </p>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                {cards.savingsRate}%
              </h3>
              <p
                className={`text-[11px] font-bold pt-1 ${cards.savingsRate >= 70 ? "text-emerald-500" : "text-blue-500"}`}
              >
                {cards.savingsRate >= 70
                  ? "Above 70% target"
                  : "Income vs. Savings"}
              </p>
            </div>
            <span className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <PieChart size={20} />
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-sidebar-bg border border-slate-200/60 dark:border-slate-800/40 rounded-2xl p-5 flex flex-col gap-4 shadow-xs">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold tracking-wide">
                Income vs. Expense
              </h4>
              <span className="text-[10px] text-gray-400 uppercase font-semibold">
                Last 6 months
              </span>
            </div>
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorIncome"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorExpense"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(148, 163, 184, 0.08)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#64748b", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#64748b", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111625",
                      borderRadius: "12px",
                      border: "none",
                      fontSize: "12px",
                      color: "#fff",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="Income"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorIncome)"
                  />
                  <Area
                    type="monotone"
                    dataKey="Expense"
                    stroke="#ef4444"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorExpense)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-sidebar-bg border border-slate-200/60 dark:border-slate-800/40 rounded-2xl p-5 flex flex-col gap-4 shadow-xs">
            <h4 className="text-sm font-bold tracking-wide">
              Expense Breakdown
            </h4>
            {categoryData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-gray-400">
                No expenses this month
              </div>
            ) : (
              <div className="flex flex-col justify-between h-full gap-4">
                <div className="w-full h-40 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Tooltip
                        formatter={(value) => `৳${value.toLocaleString()}`}
                        contentStyle={{
                          backgroundColor: "#111625",
                          borderRadius: "12px",
                          border: "none",
                          fontSize: "12px",
                          color: "#fff",
                        }}
                      />
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={42}
                        outerRadius={65}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
                {/* ক্যাটাগরি লিস্ট */}
                <div className="space-y-2 max-h-36 overflow-y-auto custom-scrollbar pr-1">
                  {categoryData.map((item, index) => (
                    <div
                      key={item.name}
                      className="flex justify-between text-xs font-medium"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                        <span className="text-gray-500 dark:text-gray-300">
                          {item.name}
                        </span>
                      </div>
                      <span className="font-bold">
                        ৳{item.value.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-sidebar-bg border border-slate-200/60 dark:border-slate-800/40 rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold tracking-wide">
                Recent Transactions
              </h4>
              <Link
                href="/dashboard/expenses"
                className="text-xs font-bold text-brand-purple flex items-center gap-1 hover:underline"
              >
                View All <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-3">
              {recentTransactions.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-6">
                  No recent transactions found.
                </p>
              ) : (
                recentTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex justify-between items-center p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-9 h-9 flex items-center justify-center rounded-full ${tx.type === "income" ? "bg-emerald-500/10 text-emerald-500" : "bg-orange-500/10 text-orange-500"}`}
                      >
                        {tx.type === "income" ? (
                          <TrendingUp size={16} />
                        ) : (
                          <ShoppingBag size={16} />
                        )}
                      </span>
                      <div>
                        <p className="text-xs font-bold max-w-[180px] sm:max-w-xs truncate">
                          {tx.title}
                        </p>
                        <p className="text-[10px] text-gray-400 capitalize">
                          {tx.category} • {tx.date}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-sm font-bold ${tx.type === "income" ? "text-txt-success" : "text-txt-danger"}`}
                    >
                      {tx.type === "income"
                        ? `+৳${tx.amount.toLocaleString()}`
                        : `-৳${tx.amount.toLocaleString()}`}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-sidebar-bg border border-slate-200/60 dark:border-slate-800/40 rounded-2xl p-5 space-y-3 shadow-xs">
              <h4 className="text-sm font-bold tracking-wide">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/dashboard/expenses"
                  className="flex flex-col items-center justify-center p-3 rounded-xl border border-dashed border-purple-300 dark:border-purple-900/40 hover:bg-purple-500/5 transition text-center gap-1.5"
                >
                  <Plus size={16} className="text-purple-500" />
                  <span className="text-[11px] font-bold">Add Expense</span>
                </Link>
                <Link
                  href="/dashboard/income"
                  className="flex flex-col items-center justify-center p-3 rounded-xl border border-dashed border-emerald-300 dark:border-emerald-900/40 hover:bg-emerald-500/5 transition text-center gap-1.5"
                >
                  <Plus size={16} className="text-emerald-500" />
                  <span className="text-[11px] font-bold">Add Income</span>
                </Link>
              </div>
            </div>

            <div className="bg-sidebar-bg border border-slate-200/60 dark:border-slate-800/40 rounded-2xl p-5 space-y-4 shadow-xs">
              <h4 className="text-sm font-bold tracking-wide">
                Budget Progress
              </h4>
              <div className="space-y-3.5">
                {budgetProgress.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-2">
                    No active budgets for this month.
                  </p>
                ) : (
                  budgetProgress.map((bg) => {
                    const percent =
                      bg.limit > 0
                        ? Math.min(Math.round((bg.spent / bg.limit) * 100), 100)
                        : 0;
                    return (
                      <div key={bg.category} className="space-y-1">
                        <div className="flex justify-between text-[11px] font-semibold">
                          <span className="text-gray-500 dark:text-gray-400">
                            {bg.category}
                          </span>
                          <span>
                            ৳{bg.spent.toLocaleString()} /{" "}
                            <span className="text-gray-400">
                              ৳{bg.limit.toLocaleString()}
                            </span>
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${percent >= 90 ? "bg-rose-500" : percent >= 70 ? "bg-amber-500" : "bg-emerald-500"}`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { BarChart3, PieChart, LineChart } from "lucide-react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RePieChart,
  Pie,
  Cell,
} from "recharts";

export default function AnalyticsClientView({ initialData, userEmail }) {
  const [analyticsData, setAnalyticsData] = useState(initialData);

  useEffect(() => {
    setAnalyticsData(initialData);
  }, [initialData]);

  const hasValidData =
    analyticsData &&
    analyticsData.chartData &&
    analyticsData.chartData.some((d) => d.Income > 0 || d.Expense > 0);

  if (!analyticsData || !hasValidData) {
    return (
      <div className="fixed inset-0 md:left-64 flex items-center justify-center p-4 z-0 pointer-events-none">
        <div className="bg-sidebar-bg border border-slate-200/60 dark:border-slate-800/40 max-w-sm w-full text-center p-8 pointer-events-auto rounded-2xl shadow-xl">
          <p className="text-gray-400 font-medium text-base">
            No analytics data available at the moment.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Please add some income or expense entries first.
          </p>
        </div>
      </div>
    );
  }

  const { summary, chartData, categoryData } = analyticsData;

  const COLORS = [
    "#f97316",
    "#ef4444",
    "#06b6d4",
    "#3b82f6",
    "#6366f1",
    "#a855f7",
    "#ec4899",
    "#10b981",
  ];

  const totalCategoryValue = categoryData.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#111625] dark:bg-[#090a16] border border-slate-200/80 dark:border-slate-800/80 p-3 rounded-xl shadow-2xl backdrop-blur-md">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">
            {label || payload[0].name}
          </p>
          <div className="flex flex-col gap-1">
            {payload.map((entry, index) => (
              <p
                key={index}
                className="text-xs font-bold"
                style={{
                  color: entry.color || entry.payload.fill || "#10b981",
                }}
              >
                {entry.name}: ৳{entry.value?.toLocaleString()}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const isNegativeSavings = (summary.netSavings || 0) < 0;

  return (
    <div className="w-full flex flex-col gap-6 text-slate-800 dark:text-slate-100 animate-fade-in p-1">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
          Financial insights and trend trackers
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-sidebar-bg dark:bg-card-expense border border-slate-200/60 dark:border-slate-800/40 rounded-2xl p-5 flex flex-col justify-between h-28 shadow-sm">
          <span className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
            Top Spending
          </span>
          <h3 className="text-lg font-bold truncate">
            {summary.topSpendingCategory || "N/A"}
          </h3>
          <span className="text-xs font-bold text-rose-500">
            ৳{summary.topSpendingAmount?.toLocaleString() || 0}
          </span>
        </div>
        <div className="bg-sidebar-bg dark:bg-card-savings border border-slate-200/60 dark:border-slate-800/40 rounded-2xl p-5 flex flex-col justify-between h-28 shadow-sm">
          <span className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
            Savings Rate
          </span>
          <h3 className="text-2xl font-black">{summary.savingsRate || 0}%</h3>
          <span
            className={`text-xs font-bold ${isNegativeSavings ? "text-rose-500" : "text-emerald-500"}`}
          >
            ৳{Math.abs(summary.netSavings || 0).toLocaleString()}{" "}
            {isNegativeSavings ? "overspent" : "saved"}
          </span>
        </div>

        <div className="bg-sidebar-bg dark:bg-card-balance border border-slate-200/60 dark:border-slate-800/40 rounded-2xl p-5 flex flex-col justify-between h-28 shadow-sm">
          <span className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
            Avg. Daily Spend
          </span>
          <h3 className="text-2xl font-black">
            ৳{summary.avgDailySpend?.toLocaleString() || 0}
          </h3>
          <span className="text-xs text-gray-400">per day</span>
        </div>

        <div className="bg-sidebar-bg dark:bg-card-income border border-slate-200/60 dark:border-slate-800/40 rounded-2xl p-5 flex flex-col justify-between h-28 shadow-sm">
          <span className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
            Highest Expense
          </span>
          <h3 className="text-2xl font-black">
            ৳{summary.highestExpenseAmount?.toLocaleString() || 0}
          </h3>
          <span className="text-xs text-gray-400 truncate max-w-[170px]">
            {summary.highestExpenseTitle}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-sidebar-bg border border-slate-200/60 dark:border-slate-800/40 rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
          <div className="flex items-center gap-2 font-bold text-sm tracking-wide">
            <BarChart3 className="w-4 h-4 text-emerald-500" />
            <span>Income vs. Expense (6 Months)</span>
          </div>
          <div className="w-full h-72 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={chartData}
                margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(148, 163, 184, 0.12)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="rect"
                  iconSize={12}
                  wrapperStyle={{ fontSize: "12px", fontWeight: 500 }}
                />
                <Bar
                  dataKey="Income"
                  name="Income"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                  barSize={32}
                />
                <Bar
                  dataKey="Expense"
                  name="Expense"
                  fill="#ef4444"
                  radius={[4, 4, 0, 0]}
                  barSize={32}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-sidebar-bg border border-slate-200/60 dark:border-slate-800/40 rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
          <div className="flex items-center gap-2 font-bold text-sm tracking-wide">
            <PieChart className="w-4 h-4 text-orange-500" />
            <span>Expense by Category</span>
          </div>

          {categoryData.length === 0 ? (
            <div className="h-full min-h-[200px] flex items-center justify-center text-sm text-gray-400">
              No category insights available
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row lg:flex-col items-center justify-between gap-4 h-full">
              <div className="w-44 h-44 relative flex items-center justify-center flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
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
                    <Tooltip content={<CustomTooltip />} />
                  </RePieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-col gap-2.5 w-full max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                {categoryData.map((item, index) => {
                  const percentage =
                    totalCategoryValue > 0
                      ? ((item.value / totalCategoryValue) * 100).toFixed(0)
                      : 0;
                  return (
                    <div
                      key={item.name}
                      className="flex justify-between items-center text-xs w-full"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                        <span className="font-medium text-gray-600 dark:text-gray-300">
                          {item.name}
                        </span>
                      </div>
                      <span className="font-bold text-gray-500 dark:text-gray-400">
                        {percentage}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full bg-sidebar-bg border border-slate-200/60 dark:border-slate-800/40 rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
        <div className="flex items-center gap-2 font-bold text-sm tracking-wide">
          <LineChart className="w-4 h-4 text-indigo-500" />
          <span>Savings Trend</span>
        </div>
        <div className="w-full h-60 mt-1">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 15, right: 15, left: -20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148, 163, 184, 0.12)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={["auto", "auto"]}
                tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="plain"
                wrapperStyle={{ fontSize: "12px", fontWeight: 500 }}
              />

              <Line
                type="monotone"
                dataKey="Income"
                name="Income"
                stroke="#10b981"
                strokeWidth={2.5}
                strokeDasharray="6 4"
                connectNulls={true}
                dot={{ fill: "#10b981", r: 4, strokeWidth: 1 }}
                activeDot={{ r: 6 }}
              />

              <Line
                type="monotone"
                dataKey="Savings"
                name="Savings"
                stroke="#6366f1"
                strokeWidth={3}
                connectNulls={true}
                dot={{ fill: "#6366f1", r: 4.5, strokeWidth: 1.5 }}
                activeDot={{ r: 7 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

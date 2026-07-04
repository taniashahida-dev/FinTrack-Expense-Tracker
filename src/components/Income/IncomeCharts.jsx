"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function IncomeCharts({ incomes = [] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="h-48 flex items-center justify-center text-gray-400">
        Loading Charts...
      </div>
    );

  const processMonthlyData = () => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyMap = {};
    monthNames.forEach((month) => {
      monthlyMap[month] = 0;
    });

    incomes.forEach((item) => {
      if (item.date && item.amount) {
        const dateObj = new Date(item.date);

        let monthIdx = dateObj.getMonth();

        if (isNaN(monthIdx)) {
          const parts = item.date.split("-");
          if (parts.length >= 2) {
            monthIdx = parseInt(parts[1], 10) - 1;
          }
        }

        if (monthIdx >= 0 && monthIdx < 12) {
          const monthName = monthNames[monthIdx];
          monthlyMap[monthName] += Number(item.amount);
        }
      }
    });

    return monthNames.map((month) => ({
      name: month,
      amount: monthlyMap[month],
    }));
  };

  const monthlyData = processMonthlyData();

  const sourceMap = {};
  incomes.forEach((item) => {
    if (item.source) {
      sourceMap[item.source] =
        (sourceMap[item.source] || 0) + (item.amount || 0);
    }
  });

  let pieData = Object.keys(sourceMap).map((key) => ({
    name: key,
    value: sourceMap[key],
  }));

  if (pieData.length === 0) {
    pieData = [{ name: "No Income Added", value: 1 }];
  }

  const COLORS = ["#10B981", "#8B5CF6", "#06B6D4", "#F59E0B"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full">
      {/* Dynamic Monthly Income Trend Card */}
      <div className="lg:col-span-2 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-[#fbfbfb] dark:bg-[#0f1322] shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm mb-6">
          Monthly Income Trend
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#88888820"
              />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                stroke="#888888"
                className="font-medium"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                stroke="#888888"
                tickFormatter={(v) => (v >= 1000 ? `৳${v / 1000}k` : `৳${v}`)}
              />
              <Tooltip
                cursor={{ fill: "rgba(16, 185, 129, 0.05)" }}
                formatter={(value) => [`৳${value.toLocaleString()}`, "Amount"]}
              />
              <Bar
                dataKey="amount"
                fill="#10B981"
                radius={[6, 6, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Dynamic By Source Card */}
      <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-[#fbfbfb] dark:bg-[#0f1322] shadow-sm flex flex-col justify-between">
        <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm mb-2">
          By Source
        </h3>

        <div className="h-44 w-full flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      incomes.length > 0
                        ? COLORS[index % COLORS.length]
                        : "#e5e7eb"
                    }
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) =>
                  incomes.length > 0 ? `৳${value.toLocaleString()}` : 0
                }
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute text-center flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
              Distribution
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div className="text-xs flex flex-col gap-2.5 mt-4 max-h-32 overflow-y-auto pr-1">
          {incomes.length > 0 ? (
            pieData.map((item, index) => (
              <div
                key={item.name}
                className="flex justify-between items-center"
              >
                <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium truncate max-w-37.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></span>
                  {item.name}
                </span>
                <span className="font-bold text-gray-800 dark:text-gray-200">
                  ৳{item.value.toLocaleString()}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-2">
              No category breakdown available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

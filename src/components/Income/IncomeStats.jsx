"use client";

import { TrendingUp, Briefcase, BarChart3 } from "lucide-react";

export default function IncomeStats({ incomes = [] }) {
  const totalIncome = incomes.reduce((sum, item) => sum + (item.amount || 0), 0);
  
  const sourceMap = {};
  incomes.forEach(item => {
    if (item.source) {
      sourceMap[item.source] = (sourceMap[item.source] || 0) + (item.amount || 0);
    }
  });

  const hasData = incomes.length > 0;
  const topSource = hasData 
    ? Object.keys(sourceMap).reduce((a, b) => sourceMap[a] > sourceMap[b] ? a : b) 
    : "Salary";
  
  const topSourceAmount = hasData ? sourceMap[topSource] : 0;
  const uniqueSourcesCount = Object.keys(sourceMap).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
  
      {/* 1. Total Income Card */}
      <div className="p-6 rounded-2xl border border-emerald-200 dark:border-emerald-500/20 bg-linear-to-br from-[#ccf2e8] via-[#f4fdfa] to-white dark:from-[#0a1e1a]/80 dark:via-[#090d16] dark:to-[#090d16] flex justify-between items-center shadow-sm">
        <div>
          <p className="text-gray-500 dark:text-emerald-400/70 text-xs font-bold tracking-wider uppercase">Total Income</p>
          <h2 className="text-3xl font-black mt-2 text-gray-900 dark:text-emerald-400 tracking-tight">
            ৳{totalIncome.toLocaleString()}
          </h2>
        </div>
        <div className="bg-txt-success/10 dark:bg-txt-success/20 p-3 rounded-xl text-txt-success">
          <TrendingUp className="w-6 h-6" />
        </div>
      </div>

      {/* 2. Top Source Card */}
      <div className="p-6 rounded-2xl border border-purple-200 dark:border-purple-500/20 bg-linear-to-br from-[#e3daff] via-[#f9f8ff] to-white dark:from-[#130f26]/80 dark:via-[#090d16] dark:to-[#090d16] flex justify-between items-center shadow-sm">
        <div>
          <p className="text-gray-500 dark:text-purple-400/70 text-xs font-bold tracking-wider uppercase">Top Source</p>
          <h2 className="text-2xl font-black mt-2 text-[#8B5CF6] dark:text-purple-400 tracking-tight truncate max-w-40 sm:max-w-50">
            {topSource}
          </h2>
          <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold mt-1">
            ৳{topSourceAmount.toLocaleString()}
          </p>
        </div>
        <div className="bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/20 p-3 rounded-xl text-[#8B5CF6]">
          <Briefcase className="w-6 h-6" />
        </div>
      </div>

      {/* 3. Income Sources Card */}
      <div className="p-6 rounded-2xl border border-cyan-200 dark:border-cyan-500/20 bg-linear-to-br from-[#cffafe] via-[#f5feff] to-white dark:from-[#0b1c28]/80 dark:via-[#090d16] dark:to-[#090d16] flex justify-between items-center shadow-sm">
        <div>
          <p className="text-gray-500 dark:text-cyan-400/70 text-xs font-bold tracking-wider uppercase">Income Sources</p>
          <h2 className="text-3xl font-black mt-2 text-gray-900 dark:text-cyan-400 tracking-tight">
            {uniqueSourcesCount}
          </h2>
        </div>
        <div className="bg-[#06B6D4]/10 dark:bg-[#06B6D4]/20 p-3 rounded-xl text-[#06B6D4]">
          <BarChart3 className="w-6 h-6" />
        </div>
      </div>

    </div>
  );
}
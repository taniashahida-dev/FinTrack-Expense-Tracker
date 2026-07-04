export default function IncomeStats({ incomes }) {
  const totalIncome = incomes.reduce((sum, item) => sum + (item.amount || 0), 0);
  
  const sourceMap = {};
  incomes.forEach(item => {
    sourceMap[item.source] = (sourceMap[item.source] || 0) + (item.amount || 0);
  });
  const topSource = Object.keys(sourceMap).reduce((a, b) => sourceMap[a] > sourceMap[b] ? a : b, "Salary");
  const topSourceAmount = sourceMap[topSource] || 60000;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
  
      <div className="p-6 rounded-2xl border border-emerald-200/50 dark:border-emerald-950/40 bg-gradient-to-br from-[#e6f7f3] to-white dark:from-[#0a1e1a] dark:to-[#0f1322] flex justify-between items-center shadow-sm">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-xs font-bold tracking-wider uppercase">Total Income</p>
          <h2 className="text-3xl font-black mt-2 text-gray-900 dark:text-white tracking-tight">
            ৳{totalIncome > 0 ? totalIncome.toLocaleString() : "82,000"}
          </h2>
        </div>
        <div className="bg-[#10B981]/10 dark:bg-[#10B981]/20 p-3 rounded-xl text-[#10B981] font-bold text-lg">↗</div>
      </div>

      {/* Top Source - ফিক্সড পার্পল ভাইব ব্যাকগ্রাউন্ড */}
      <div className="p-6 rounded-2xl border border-purple-200/50 dark:border-purple-950/40 bg-gradient-to-br from-[#f3f0ff] to-white dark:from-[#130f26] dark:to-[#0f1322] flex justify-between items-center shadow-sm">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-xs font-bold tracking-wider uppercase">Top Source</p>
          <h2 className="text-3xl font-black mt-2 text-[#8B5CF6] tracking-tight">{topSource}</h2>
          <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold mt-1">৳{topSourceAmount.toLocaleString()}</p>
        </div>
        <div className="bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/20 p-3 rounded-xl text-[#8B5CF6] text-lg">💼</div>
      </div>

      <div className="p-6 rounded-2xl border border-cyan-200/50 dark:border-cyan-950/40 bg-gradient-to-br from-[#ecfeff] to-white dark:from-[#0b1c28] dark:to-[#0f1322] flex justify-between items-center shadow-sm">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-xs font-bold tracking-wider uppercase">Income Sources</p>
          <h2 className="text-3xl font-black mt-2 text-gray-900 dark:text-white tracking-tight">
            {Object.keys(sourceMap).length > 0 ? Object.keys(sourceMap).length : "4"}
          </h2>
        </div>
        <div className="bg-[#06B6D4]/10 dark:bg-[#06B6D4]/20 p-3 rounded-xl text-[#06B6D4] text-lg">📊</div>
      </div>
    </div>
  );
}
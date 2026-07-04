export default function IncomeTable({ incomes }) {
  return (
    <div className="w-full flex flex-col gap-4 mt-2">
      {incomes.length === 0 ? (
        <div className="p-12 text-center text-gray-400 font-medium rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1322]">
          No income records found for this user.
        </div>
      ) : (
        incomes.map((income) => (
          <div
            key={income._id || income.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 px-6 rounded-2xl border border-gray-200/70 dark:border-gray-800/80 bg-white dark:bg-[#0f1322] hover:bg-gray-50 dark:hover:bg-[#151b30] transition-all duration-200 gap-4 shadow-sm"
          >
    
            <div className="flex items-center gap-4 min-w-[200px]">
              <span className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#10B981]/10 text-[#10B981] font-bold text-sm shadow-inner">
                ↗
              </span>
              <span className="font-bold text-gray-900 dark:text-gray-100 text-base">
                {income.source}
              </span>
            </div>

            <div className="flex-1 text-gray-600 dark:text-gray-300 text-sm max-w-xs truncate font-medium">
              {income.description || "No description provided"}
            </div>

           
            <div className="text-gray-500 dark:text-gray-400 text-sm font-semibold min-w-[120px]">
              {income.date}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-10 w-full sm:w-auto">
              <span className="font-black text-[#10B981] text-base whitespace-nowrap tracking-wide">
                +৳{income.amount?.toLocaleString()}
              </span>
              
              <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
                <button className="hover:text-yellow-500 transition text-base p-1">
                  ✏️
                </button>
                <button className="hover:text-red-500 transition text-base p-1">
                  🗑️
                </button>
              </div>
            </div>

          </div>
        ))
      )}
    </div>
  );
}
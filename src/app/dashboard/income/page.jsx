import AddIncomeModal from "@/components/Income/AddIncomeModal";
import IncomeStats from "@/components/Income/IncomeStats";
import IncomeCharts from "@/components/Income/IncomeCharts";
import IncomeTable from "@/components/Income/IncomeTable";
import { getUserSession } from "@/lib/core/session";
import { getIncomes } from "@/lib/api/income";

export default async function IncomePage() {
  const user = await getUserSession();
  const userEmail = user?.email;
  const incomes = (await getIncomes(userEmail)) || [];

  return (
    <div className="p-6 min-h-screen text-white bg-[#060814] flex flex-col gap-6">
    
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Income</h1>
          <p className="text-gray-400 text-sm mt-0.5">Track all your income sources</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-[#111322] border border-gray-800/80 text-sm font-medium px-4 py-2 rounded-xl text-gray-300 hover:bg-[#181b30] transition">
            📥 Export
          </button>
          <AddIncomeModal userEmail={userEmail} />
        </div>
      </div>

  
      <IncomeStats incomes={incomes} />
      <IncomeCharts incomes={incomes} />
      <IncomeTable incomes={incomes} />
    </div>
  );
}
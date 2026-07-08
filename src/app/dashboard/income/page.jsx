import AddIncomeModal from "@/components/Income/AddIncomeModal";
import IncomeStats from "@/components/Income/IncomeStats";
import IncomeCharts from "@/components/Income/IncomeCharts";
import IncomeTable from "@/components/Income/IncomeTable";
import { getUserSession } from "@/lib/core/session";
import { getIncomes } from "@/lib/api/income";
import { Download } from "lucide-react"; 
import ExportIncomeButton from "./ExportIncomeButton";

export default async function IncomePage() {
  const user = await getUserSession();
  const userEmail = user?.email;
  const incomes = (await getIncomes(userEmail)) || [];

  return (
    <div className="p-6 min-h-screen flex flex-col gap-6 text-gray-900 dark:text-gray-100">
   
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Income</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
            Track all your income sources
          </p>
        </div>
   
        <div className="flex items-center gap-3 w-full sm:w-auto">
         
        <ExportIncomeButton incomes={incomes} />
          
          <AddIncomeModal userEmail={userEmail} />
        </div>
      </div>

      <IncomeStats incomes={incomes} />
      <IncomeCharts incomes={incomes} />
      <IncomeTable incomes={incomes} userEmail={userEmail}/>
    </div>
  );
}
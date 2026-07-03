import { getUserSession } from "@/lib/core/session";
import { Wallet, ArrowUpRight, ArrowDownRight, PieChart } from "lucide-react";

export default async function Dashboard() {
  const user = await getUserSession();
  
  const getAvatarInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen pb-12">
      
      <header className="py-5 border-b border-slate-200/50 dark:border-slate-800/50 flex flex-col sm:flex-row gap-4 sm:items-center justify-between transition-colors">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Dashboard</h2>
          <p className="text-xs text-slate-400">Welcome back, {user?.name}! Here is your overview.</p>
        </div>
        
        {/* ইউজার প্রোফাইল ইন্ডিকেটর */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="w-9 h-9 rounded-full bg-blue-500 text-white font-semibold flex items-center justify-center text-xs shadow-md">
            {getAvatarInitials()}
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{user?.name}</span>
        </div>
      </header>

      <main className="py-6 sm:py-8 space-y-6 sm:space-y-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* ১. Total Balance Card */}
          <div className="bg-card-balance-light dark:bg-card-balance-dark border border-blue-200/30 dark:border-blue-900/20 p-5 rounded-2xl flex justify-between items-start shadow-sm">
            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-400">Total Balance</p>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">৳ 59,250</h3>
              <p className="text-[11px] sm:text-xs font-semibold text-txt-success flex items-center gap-1 pt-1">
                <ArrowUpRight size={14} /> +12.5% <span className="text-slate-400 dark:text-slate-500 font-normal">from last month</span>
              </p>
            </div>
            <span className="p-2.5 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
              <Wallet size={20} />
            </span>
          </div>

          {/* ২. Monthly Income Card */}
          <div className="bg-card-income-light dark:bg-card-income-dark border border-emerald-200/30 dark:border-emerald-900/20 p-5 rounded-2xl flex justify-between items-start shadow-sm">
            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-400">Monthly Income</p>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">৳ 82,000</h3>
              <p className="text-[11px] sm:text-xs font-semibold text-txt-success flex items-center gap-1 pt-1">
                <ArrowUpRight size={14} /> +8.2% <span className="text-slate-400 dark:text-slate-500 font-normal">from November</span>
              </p>
            </div>
            <span className="p-2.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight size={20} />
            </span>
          </div>

          {/* ৩. Total Expense Card */}
          <div className="bg-card-expense-light dark:bg-card-expense-dark border border-purple-200/30 dark:border-purple-900/20 p-5 rounded-2xl flex justify-between items-start shadow-sm">
            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-400">Total Expense</p>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">৳ 22,750</h3>
              <p className="text-[11px] sm:text-xs font-semibold text-txt-danger flex items-center gap-1 pt-1">
                <ArrowDownRight size={14} /> -22% <span className="text-slate-400 dark:text-slate-500 font-normal">from November</span>
              </p>
            </div>
            <span className="p-2.5 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400">
              <ArrowDownRight size={20} />
            </span>
          </div>

          {/* ৪. Savings Rate Card */}
          <div className="bg-card-savings-light dark:bg-card-savings-dark border border-cyan-200/30 dark:border-cyan-900/20 p-5 rounded-2xl flex justify-between items-start shadow-sm">
            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-400">Savings Rate</p>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">72.3%</h3>
              <p className="text-[11px] sm:text-xs font-semibold text-blue-500 flex items-center gap-1 pt-1">
                Above 70% target
              </p>
            </div>
            <span className="p-2.5 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400">
              <PieChart size={20} />
            </span>
          </div>

        </div>

        <div className="bg-sidebar-bg border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-5 sm:p-6 min-h-[300px] shadow-xs">
          <h4 className="text-base font-bold text-slate-800 dark:text-white mb-2">Income vs. Expense</h4>
          <p className="text-xs text-slate-400">Chart rendering area using recharts / chart.js</p>
        </div>

      </main>
    </div>
  );
}
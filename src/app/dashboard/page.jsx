import { Wallet, ArrowUpRight, ArrowDownRight, PieChart } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      
      
      <header className="h-20 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between  bg-sidebar-bg-light dark:bg-sidebar-bg-dark transition-colors">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Dashboard</h2>
          <p className="text-xs text-slate-400">Welcome back, Rafiqul! Here is your December overview.</p>
        </div>
        
     
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-500 text-white font-semibold flex items-center justify-center text-sm">
            R
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Rafiqul</span>
        </div>
      </header>

      {/* মেইন ড্যাশবোর্ড বডি গ্রিড কন্টেন্ট */}
      <main className="p-8 space-y-8">
        
        {/* ৪টি মেইন কার্ডের ৩ কলাম গ্রিড স্ট্রাকচার */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* ১. Total Balance Card */}
          <div className="bg-card-balance-light dark:bg-card-balance-dark border-blue-200/30 dark:border-blue-900/20 dashboard-card flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-400 dark:text-slate-400">Total Balance</p>
              <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">৳ 59,250</h3>
              <p className="text-xs font-semibold text-txt-success flex items-center gap-1 pt-1">
                <ArrowUpRight size={14} /> +12.5% <span className="text-slate-400 dark:text-slate-500 font-normal">from last month</span>
              </p>
            </div>
            <span className="p-2.5 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
              <Wallet size={20} />
            </span>
          </div>

          {/* ২. Monthly Income Card */}
          <div className="bg-card-income-light dark:bg-card-income-dark border-emerald-200/30 dark:border-emerald-900/20 dashboard-card flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-400 dark:text-slate-400">Monthly Income</p>
              <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">৳ 82,000</h3>
              <p className="text-xs font-semibold text-txt-success flex items-center gap-1 pt-1">
                <ArrowUpRight size={14} /> +8.2% <span className="text-slate-400 dark:text-slate-500 font-normal">from November</span>
              </p>
            </div>
            <span className="p-2.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight size={20} />
            </span>
          </div>

          {/* ৩. Total Expense Card */}
          <div className="bg-card-expense-light dark:bg-card-expense-dark border-purple-200/30 dark:border-purple-900/20 dashboard-card flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-400 dark:text-slate-400">Total Expense</p>
              <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">৳ 22,750</h3>
              <p className="text-xs font-semibold text-txt-danger flex items-center gap-1 pt-1">
                <ArrowDownRight size={14} /> -22% <span className="text-slate-400 dark:text-slate-500 font-normal">from November</span>
              </p>
            </div>
            <span className="p-2.5 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400">
              <ArrowDownRight size={20} />
            </span>
          </div>

          {/* ৪. Savings Rate Card */}
          <div className="bg-card-savings-light dark:bg-card-savings-dark border-cyan-200/30 dark:border-cyan-900/20 dashboard-card flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-400 dark:text-slate-400">Savings Rate</p>
              <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">72.3%</h3>
              <p className="text-xs font-semibold text-blue-500 flex items-center gap-1 pt-1">
                Above 70% target
              </p>
            </div>
            <span className="p-2.5 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400">
              <PieChart size={20} />
            </span>
          </div>

        </div>

        {/* Income vs Expense চার্ট সেকশন এরিয়া (নিচের বড় কার্ড) */}
        <div className="bg-sidebar-bg-light dark:bg-sidebar-bg-dark border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 min-h-[300px]">
          <h4 className="text-base font-bold text-slate-800 dark:text-white mb-2">Income vs. Expense</h4>
          <p className="text-xs text-slate-400">Chart rendering area using recharts / chart.js</p>
          {/* আপনার পছন্দের চার্ট লাইব্রেরি দিয়ে এখানে লাইন বা এরিয়া চার্ট বসিয়ে নিতে পারবেন */}
        </div>

      </main>
    </div>
  );
}
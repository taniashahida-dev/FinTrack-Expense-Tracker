'use client'
import { useState, useEffect } from "react";
import { useTheme } from "next-themes"; // 👈 next-themes ইম্পোর্ট করুন
import { 
  LayoutDashboard, Wallet, ArrowDownCircle, ArrowUpCircle, 
  Layers, Receipt, BarChart3, Bell, User, Settings, Sun, Moon, LogOut 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme(); // 👈 থিম কন্ট্রোল করার হুক
  const [mounted, setMounted] = useState(false);

  // 👈 Hydration Error এড়াতে পেজ সম্পূর্ণ মাউন্ট হওয়া পর্যন্ত অপেক্ষা করবে
  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Expenses", href: "/expenses", icon: ArrowDownCircle },
    { title: "Income", href: "/income", icon: ArrowUpCircle },
    { title: "Categories", href: "/categories", icon: Layers },
    { title: "Budget", href: "/budget", icon: Receipt },
    { title: "Analytics", href: "/analytics", icon: BarChart3 },
    { title: "Notifications", href: "/notifications", icon: Bell },
  ];

  const bottomItems = [
    { title: "Profile", href: "/profile", icon: User },
    { title: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    // 👈 bg-sidebar-bg-light/dark পরিবর্তন করে শুধু ডাইনামিক 'bg-sidebar-bg' করা হয়েছে
    <aside className="w-64 h-screen fixed left-0 top-0 border-r border-slate-200/50 dark:border-slate-800/50 bg-sidebar-bg flex flex-col justify-between p-4 transition-colors duration-300">
      
      {/* টপ লোগো এরিয়া */}
      <div>
        <div className="flex items-center gap-3 px-3 py-4 mb-4">
          <span className="bg-gradient-to-tr from-blue-500 to-purple-500 p-2 rounded-xl text-white flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Wallet size={20} />
          </span>
          <span className="text-xl font-bold tracking-wide text-slate-900 dark:text-white">FinTrack</span>
        </div>

        {/* মেইন নেভিগেশন লিঙ্কের তালিকা */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-brand-purple text-white shadow-lg shadow-purple-500/20 font-semibold"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon size={18} className={isActive ? "text-white" : "text-slate-400 dark:text-slate-500"} />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* বটম মেনু এরিয়া (Profile, Settings, Light/Dark Mode, Logout) */}
      <div className="border-t border-slate-200/60 dark:border-slate-800/60 pt-4 space-y-1">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-brand-purple text-white"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <Icon size={18} />
              {item.title}
            </Link>
          );
        })}

        {/* ⚙️ ডাইনামিক থিম টগল বাটন (অফিসিয়াল গাইডলাইন অনুযায়ী ফিক্সড) */}
        {mounted ? (
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")} // 👈 থিম টগল লজিক
            className="w-full flex items-center gap-4 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 text-left transition-all"
          >
            {theme === "dark" ? (
              <>
                <Sun size={18} className="text-yellow-500" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon size={18} className="text-indigo-600" />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        ) : (
          /* মাউন্ট হওয়ার আগে লেআউট শিফটিং এড়াতে একটি ডামি বাটন স্পেস */
          <div className="h-10 w-full" />
        )}

        {/* লগআউট বাটন */}
        <button className="w-full flex items-center gap-4 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50/50 dark:hover:bg-red-950/20 text-left transition-all">
          <LogOut size={18} />
          Logout
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;
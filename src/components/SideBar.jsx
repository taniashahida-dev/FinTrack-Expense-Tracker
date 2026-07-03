'use client'
import { useState, useEffect } from "react";
import { useTheme } from "next-themes"; 
import { 
  LayoutDashboard, Wallet, ArrowDownCircle, ArrowUpCircle, 
  Layers, Receipt, BarChart3, Bell, User, Settings, Sun, Moon, LogOut, Menu
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Drawer } from "@heroui/react";

const Sidebar = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme(); 
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // 

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

  const SidebarContent = () => (
    <div className="h-full flex flex-col justify-between p-4 bg-sidebar-bg">
      <div>
        <Link href={'/'} className="flex items-center gap-3 px-3 py-4 mb-4" onClick={() => setIsOpen(false)}>
          <span className="bg-linear-to-tr from-blue-500 to-purple-500 p-2 rounded-xl text-white flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Wallet size={20} />
          </span>
          <span className="text-xl font-bold tracking-wide text-slate-900 dark:text-white">FinTrack</span>
        </Link>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
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

      <div className="border-t border-slate-200/60 dark:border-slate-800/60 pt-4 space-y-1">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
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

        {mounted ? (
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
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
          <div className="h-10 w-full" />
        )}

        <button className="w-full flex items-center gap-4 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50/50 dark:hover:bg-red-950/20 text-left transition-all">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
     
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-sidebar-bg border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-3">
          <span className="bg-linear-to-tr from-blue-500 to-purple-500 p-1.5 rounded-lg text-white flex items-center justify-center">
            <Wallet size={16} />
          </span>
          <span className="text-lg font-bold tracking-wide text-slate-900 dark:text-white">FinTrack</span>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Menu size={22} />
        </button>
      </div>

  
      <aside className="hidden lg:flex w-64 h-screen fixed left-0 top-0 border-r border-slate-200/50 dark:border-slate-800/50 bg-sidebar-bg flex flex-col justify-between transition-colors duration-300 z-30">
        <SidebarContent />
      </aside>

  
      <Drawer isOpen={isOpen} onOpenChange={setIsOpen} placement="left" className="p-0 max-w-[280px]">
        <Drawer.Backdrop>
          <Drawer.Content className="bg-sidebar-bg h-full">
            <Drawer.Dialog className="h-full focus:outline-hidden">
              <Drawer.CloseTrigger className="absolute right-4 top-5 z-50 text-slate-500 dark:text-slate-400" />
              <Drawer.Body className="p-0 h-full overflow-y-auto">
                <SidebarContent />
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
};

export default Sidebar;
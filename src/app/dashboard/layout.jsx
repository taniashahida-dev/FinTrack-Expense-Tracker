import { getUserSession } from "@/lib/core/session";
import Sidebar from "@/components/SideBar";

const DashboardLayOut = async ({ children }) => {
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
    <div
      style={{ "--sidebar-width": "16rem" }}
      className="flex min-h-screen w-full bg-dashboard-bg transition-colors duration-300"
    >
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 relative lg:ml-64">
        <header className="sticky top-0 z-50 w-full flex items-center justify-end px-4 md:px-6 h-16 bg-dashboard-bg/70 backdrop-blur-md border-b border-slate-200/40 dark:border-slate-800/40 transition-all shadow">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white font-semibold flex items-center justify-center text-xs shadow-sm">
              {getAvatarInitials()}
            </div>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 hidden sm:inline">
              {user?.name}
            </span>
          </div>
        </header>

        <main className="flex-1 w-full overflow-x-hidden px-4 md:px-6 py-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayOut;

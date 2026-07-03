import Sidebar from "@/components/SideBar";

const DashboardLayOut = ({ children }) => {
  return (
   <div
      style={{ "--sidebar-width": "16rem" }}
      className="flex min-h-screen w-full bg-dashboard-bg transition-colors duration-300"
    >
      {/* রেস্পন্সিভ সাইডবার */}
      <Sidebar />

      {/* কন্টেন্ট র‍্যাপার: মোবাইলের জন্য pt-16 এবং বড় স্ক্রিনে ml-64 */}
      <div className="flex-1 flex flex-col min-w-0 relative pt-16 lg:pt-0 lg:ml-64">
        <main className="flex-1 w-full overflow-x-hidden px-4 md:px-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayOut;
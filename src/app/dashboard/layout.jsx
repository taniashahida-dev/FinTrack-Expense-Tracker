import Sidebar from "@/components/SideBar";


const DashboardLayOut = ({ children }) => {
  return (
  
   <div
  style={{ "--sidebar-width": "16rem" }}
  className="flex min-h-screen w-full"
>
      
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 relative lg:ml-64">
        
    
    
      <main className="flex-1 w-full overflow-x-hidden px-2 ">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayOut;
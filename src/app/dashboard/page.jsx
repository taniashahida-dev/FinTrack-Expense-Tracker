import { getUserSession } from "@/lib/core/session";
import DashboardClientView from "./DashboardClientView";
import { getDashoardData } from "@/lib/api/dashboardData";

export default async function Dashboard() {
  const user = await getUserSession();
  
 const email = user?.email
 
  const dashboardData =await getDashoardData(email)
console.log(dashboardData)
  return (
    <DashboardClientView 
      user={user} 
      initialData={dashboardData} 
    />
  );
}
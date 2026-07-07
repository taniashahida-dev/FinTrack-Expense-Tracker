import { getNotifications } from "@/lib/api/notification";
import NotificationsClientView from "./NotificationsClientView";
import { getUserSession } from "@/lib/core/session";

export const dynamic = "force-dynamic";

export default async function NotificationsPage() {
 const user = await getUserSession()
 const userEmail = user?.email
  
  const  initialNotifications = await getNotifications(userEmail);
 

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <NotificationsClientView
        initialNotifications={initialNotifications} 
        userEmail={userEmail} 
      />
    </div>
  );
}
import { getUserSettings } from "@/lib/api/notification";
import { getUserSession } from "@/lib/core/session";
import SettingsClientView from "./SettingsClientView";


export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const user = await getUserSession();
  const userEmail = user?.email;

  const savedData = await getUserSettings(userEmail);
  const initialSettings = savedData?.settings || {
    budgetAlerts: true,
   
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <SettingsClientView initialSettings={initialSettings} userEmail={userEmail} />
    </div>
  );
}
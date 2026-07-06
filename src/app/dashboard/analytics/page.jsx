import { getUserSession } from "@/lib/core/session";
import AnalyticsClientView from "./AnalyticsClientView";
import { getAnalyticsData } from "@/lib/api/analytics";

export default async function AnalyticsPage() {
  const user = await getUserSession();
  const userEmail = user?.email;

  const initialAnalyticsData = await getAnalyticsData(userEmail);

  return (
    <AnalyticsClientView
      initialData={initialAnalyticsData}
      userEmail={userEmail}
    />
  );
}

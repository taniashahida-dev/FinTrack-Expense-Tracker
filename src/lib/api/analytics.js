import { serverFetch } from "../core/server";

export async function getAnalyticsData(email) {
  if (!email) return null;

  try {
    return await serverFetch(
      `/api/analytics-overview?email=${encodeURIComponent(email)}`,
      {
        cache: "no-store",
      },
    );
  } catch (err) {
    console.error(err);
    return null;
  }
}

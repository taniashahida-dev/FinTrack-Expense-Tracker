import { serverFetch } from "../core/server";

export const getDashoardData = async (email) => {
  try {
    const data = await serverFetch(
      `/api/dashboard-overview?email=${encodeURIComponent(email)}`,
      { cache: "no-store" }
    );

    console.log(data);

    return data;
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return null;
  }
};
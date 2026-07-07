import { serverFetch } from "../core/server";

export const getNotifications = async (email) => {
  return serverFetch(`/api/notifications?email=${email}`);
};



export async function getUserSettings(email) {
  try {
    const result = await serverFetch(`/api/user-settings?email=${email}`, {
      cache: "no-store",
    });
    return result
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
}


"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const createNotifications = async (notification) => {
  try {
    console.log("Submitting notification Data:", notification);
    const result = await serverMutation("/api/notifications", notification);
    return result;
  } catch (error) {
    console.error("createNotification Error:", error);
    return { success: false, error: error.message };
  }
};

export const updateNotifications = async (id, userEmail) => {
  try {
    const result = await serverMutation(
      `/api/notifications/${id}`,
      { userEmail },
      "PATCH",
    );
    revalidatePath("/dashboard", "layout");
    return result;
  } catch (error) {
    console.error("updateNotification Action Error:", error);
    return { success: false, error: error.message };
  }
};

export const markAllNotificationsAsRead = async (userEmail) => {
  try {
    const result = await serverMutation(
      `/api/notifications/mark-all-read`,
      { userEmail },
      "PATCH",
    );
    revalidatePath("/dashboard", "layout");
    return result;
  } catch (error) {
    console.error("markAllNotificationsAsRead Action Error:", error);
    return { success: false, error: error.message };
  }
};

export const deleteNotification = async (id, userEmail) => {
  try {
    const result = await serverMutation(
      `/api/notifications/${id}?userEmail=${userEmail}`,
      {},
      "DELETE",
    );
    return result;
  } catch (error) {
    console.error("deleteNotification Action Error:", error);
    return { success: false, error: error.message };
  }
};

export async function saveUserSettings(email, settings) {
  try {
    const result = await serverMutation(`/api/user-settings`, {email, settings},"PATCH",);

    return result
  } catch (error) {
    console.error("Error saving settings:", error);
    return { success: false };
  }
}

export async function resetUserData(email) {
  try {
    const result = await serverMutation(`/api/reset-data?email=${email}`, {},"DELETE")
    return result
  } catch (error) {
    console.error("Error resetting data:", error);
    return { success: false };
  }
}
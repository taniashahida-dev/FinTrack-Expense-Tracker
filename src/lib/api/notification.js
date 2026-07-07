import { serverFetch } from "../core/server";

export const getNotifications = async (email) => {
  return serverFetch(`/api/notifications?email=${email}`);
};
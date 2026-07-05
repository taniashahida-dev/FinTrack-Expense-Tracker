import { serverFetch } from "../core/server"



export const getExpenses = async (email, filters = {}) => {
  const { search = "", category = "all" } = filters;
  const queryString = `&search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}`;
  
  return serverFetch(`/api/expenses?email=${email}${queryString}`);
};
import { serverFetch, serverMutation } from "../core/server";

export const setBudget = async (budgetData) => {
  try {
    console.log("Submitting budget Data:", budgetData);
    const result = await serverMutation("/api/budgets", budgetData);
    return result;
  } catch (error) {
    console.error("createBudget Error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const getBudgetOverview = async (email, monthYear) => {
  return serverFetch(`/api/budget-overview?email=${email}&monthYear=${monthYear}`);
};
"use server";

import { serverMutation } from "../core/server";

export const createExpense = async (expenseData) => {
  try {
    console.log("Submitting expense Data:", expenseData);

    const result = await serverMutation("/api/expenses", expenseData);

    return result;
  } catch (error) {
    console.error("createExpense Error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const updateExpense = async (id, expenseData) => {
  try {
    const result = await serverMutation(
      `/api/expenses/${id}`,
      expenseData,
      "PATCH",
    );
    return result;
  } catch (error) {
    console.error("updateExpense Action Error:", error);
    return { success: false, error: error.message };
  }
};

export const deleteExpense = async (id, userEmail) => {
  try {
    const headers = { "Content-Type": "application/json" };
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

    const res = await fetch(
      `${baseUrl}/api/expenses/${id}?userEmail=${userEmail}`,
      {
        method: "DELETE",
        headers,
      },
    );

    if (!res.ok) throw new Error(`API Error ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("deleteExpense Action Error:", error);
    return { success: false, error: error.message };
  }
};

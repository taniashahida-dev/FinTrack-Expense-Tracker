'use server';

import { serverMutation } from "../core/server";

export const createIncome = async (incomeData) => {
  try {
    console.log("Submitting expense Data:", incomeData);

    const result = await serverMutation(
      "/api/incomes",
      incomeData,
    );

    return result;
  } catch (error) {
    console.error("createIncome Error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};


export const updateIncome = async (id, incomeData) => {
  try {
  
    const result = await serverMutation(`/api/incomes/${id}`, incomeData, "PATCH");
    return result;
  } catch (error) {
    console.error("updateIncome Action Error:", error);
    return { success: false, error: error.message };
  }
};


export const deleteIncome = async (id, userEmail) => {
  try {
    const headers = { "Content-Type": "application/json" };
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
    
    const res = await fetch(`${baseUrl}/api/incomes/${id}?userEmail=${userEmail}`, {
      method: "DELETE",
      headers,
    });

    if (!res.ok) throw new Error(`API Error ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("deleteIncome Action Error:", error);
    return { success: false, error: error.message };
  }
};
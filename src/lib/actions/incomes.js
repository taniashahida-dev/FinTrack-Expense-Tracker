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
    
    const result = await serverMutation(`/api/incomes/${id}?userEmail=${userEmail}`, {}, "DELETE" );
    
    return result
  } catch (error) {
    console.error("deleteIncome Action Error:", error);
    return { success: false, error: error.message };
  }
};


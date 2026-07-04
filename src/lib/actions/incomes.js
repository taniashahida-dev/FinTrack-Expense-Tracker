'use server';

import { serverMutation } from "../core/server";

export const createIncome = async (incomeData) => {
  try {
    console.log("Submitting Ebook Payload Data:", incomeData);

    const result = await serverMutation(
      "/api/incomes",
      incomeData,
    //   token
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
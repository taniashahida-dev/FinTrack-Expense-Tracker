"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

export const serverFetch = async (path, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new Error(`API Error ${res.status}`);
  }

  return res.json();
};

export const serverMutation = async (path, data = {}, method = "POST") => {
  const headers = {
    "Content-Type": "application/json",
  };

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: JSON.stringify(data),
  });

  const text = await res.text();

  console.log("Status:", res.status);
  console.log("Raw Response:", text);

  return JSON.parse(text);
};

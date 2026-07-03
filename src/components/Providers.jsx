"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }) {
  return (
    // 'attribute="class"' দেওয়ার কারণে এটি html ট্যাগে '.dark' ক্লাস টগল করবে
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
    </ThemeProvider>
  );
}
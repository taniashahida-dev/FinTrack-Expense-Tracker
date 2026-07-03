"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";


export default function LayoutConditionalWrapper({ children }) {
  const pathname = usePathname();

 
  const isAuthPage = 
    pathname.startsWith("/login") || 
    pathname.startsWith("/signup"); 
    const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      
     {!isAuthPage && !isDashboard && <Navbar />}
      
      <main className="flex-1">
        {children}
      </main>
      
   
     {!isAuthPage && !isDashboard && <Footer />}
    </>
  );
}
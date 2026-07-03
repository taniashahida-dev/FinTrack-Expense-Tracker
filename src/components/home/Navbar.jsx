'use client'
import { useState } from "react";
import { Wallet, Menu, X } from "lucide-react"; 
import Navlink from "./Navlink";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const { data } = useSession();
  const user = data?.user;
console.log(data)
  const links = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-[#FAF6E9] border-b border-gray-200 dark:bg-[#0D0E1F] dark:border-gray-800 transition-colors duration-300 relative z-50">
      <div className="flex items-center justify-between h-20 w-11/12 mx-auto">
        
        <Link href={"/"} className="flex gap-3 items-center z-50">
          <span className="bg-linear-to-tr from-[#3B82F6] to-[#8B5CF6] p-2.5 rounded-full text-white flex items-center justify-center">
            <Wallet size={22} />
          </span>
          <h1 className="font-bold text-2xl text-gray-900 dark:text-white tracking-wide font-agbalumo">
            FinTrack
          </h1>
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <Navlink key={link.href} href={link.href}>
              {link.title}
            </Navlink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <h1 className="text-gray-900 dark:text-white font-medium">Hello, {user?.name}</h1>
          ) : (
            <Link href={"/login"} className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-medium transition-colors">
              Login
            </Link>
          )}
          
          <Link href={`${user ? "/dashboard" : "/signup"}`}>
            <Button className="bg-[#6366F1] hover:bg-[#4F46E5] text-white font-medium px-6 py-2.5 rounded-full transition-all shadow-md shadow-indigo-500/10 dark:shadow-indigo-500/20">
              {user ? "Dashboard" : "Get Started"}
            </Button>
          </Link>
        </div>

        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-gray-700 dark:text-white focus:outline-none"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <div 
        className={`absolute top-20 left-0 w-full bg-[#FAF6E9] dark:bg-[#0D0E1F] border-b border-gray-200 dark:border-gray-800 p-6 space-y-6 md:hidden transition-all duration-300 ease-in-out shadow-xl ${
          isOpen ? "opacity-100 transform translate-y-0 visible" : "opacity-0 transform -translate-y-5 invisible pointer-events-none"
        }`}
      >

        <div className="flex flex-col gap-4">
          {links.map((link) => (
            <div key={link.href} onClick={() => setIsOpen(false)}>
              <Navlink href={link.href}>
                {link.title}
              </Navlink>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          {user ? (
            <h1 className="text-gray-900 dark:text-white font-medium text-lg">Hello, {user?.name}</h1>
          ) : (
            <Link 
              href={"/login"} 
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-medium text-lg transition-colors"
            >
              Login
            </Link>
          )}
          
          <Link href={`${user ? "/dashboard" : "/signup"}`} onClick={() => setIsOpen(false)}>
            <Button className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white font-medium py-3 rounded-full transition-all shadow-md">
              {user ? "Dashboard" : "Get Started"}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
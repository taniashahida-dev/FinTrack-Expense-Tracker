'use client'
import { Wallet } from "lucide-react";
import Navlink from "./Navlink";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";


const Navbar = () => {
  const links = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ];
  const {data} = useSession()
  const user = data?.user
  console.log(data)

  return (
   
    <nav className="bg-[#FAF6E9] border-b border-gray-200 dark:bg-[#0D0E1F] dark:border-gray-800 transition-colors duration-300">
      <div className="flex items-center justify-between h-20 w-11/12 mx-auto">
        
        {/* Logo Section */}
        <Link href={"/"} className="flex gap-3 items-center">
          <span className="bg-linear-to-tr from-[#3B82F6] to-[#8B5CF6] p-2.5 rounded-full text-white flex items-center justify-center">
            <Wallet size={22} />
          </span>
          <h1 className="font-bold text-2xl text-gray-900 dark:text-white tracking-wide font-agbalumo">
            FinTrack
          </h1>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-8 items-center">
          {links.map((link) => (
            <Navlink key={link.href} href={link.href}>
              {link.title}
            </Navlink>
          ))}
        </div>

        {/* Buttons Section */}
        <div className="flex items-center gap-6">
          {/* Login text link */}
          <Link href={"/login"} className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-medium transition-colors">
            Login
          </Link>
          
          {/* Get Started Button */}
          <Link href={"/signup"}>
            <Button className="bg-[#6366F1] hover:bg-[#4F46E5] text-white font-medium px-6 py-2.5 rounded-full transition-all shadow-md shadow-indigo-500/10 dark:shadow-indigo-500/20">
              Get Started
            </Button>
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
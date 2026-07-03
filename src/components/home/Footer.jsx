"use client";

import Link from "next/link";
import { Wallet, Mail, Globe } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    
    <footer className="bg-[#0B132B] text-slate-400 text-sm pt-16 pb-8 transition-colors duration-300 relative">
   
      <div className="absolute top-0 left-0 w-full h-[1px] bg-slate-800/80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 📦 Upper Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12">
          
          {/* Brand/Logo Column */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center text-white">
                <Wallet size={18} className="stroke-[2.5]" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                FinTrack
              </span>
            </div>
            <p className="text-slate-500 max-w-xs leading-relaxed font-medium">
              Smart expense tracking for smarter financial decisions.
            </p>
          </div>

          {/* Spacer column to push links neatly to the right */}
          <div className="hidden md:block md:col-span-1" />

          {/* Product Links Column */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-white font-semibold tracking-wide text-sm">Product</h4>
            <ul className="space-y-2.5 font-medium text-slate-500">
              <li>
                <Link href="/" className="hover:text-purple-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-purple-400 transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-purple-400 transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links Column */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-white font-semibold tracking-wide text-sm">Legal</h4>
            <ul className="space-y-2.5 font-medium text-slate-500">
              <li>
                <Link href="/privacy" className="hover:text-purple-400 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-purple-400 transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect/Contact Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white font-semibold tracking-wide text-sm">Connect</h4>
            <ul className="space-y-3 font-medium text-slate-500">
              <li className="flex items-center gap-2 group">
                <Mail size={16} className="text-slate-600 group-hover:text-purple-400 transition-colors" />
                <a 
                  href="taniia.webdev@gmail.com" 
                  className="hover:text-purple-400 transition-colors duration-200 break-all"
                >
                 taniia.webdev@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 group">
                <Globe size={16} className="text-slate-600 group-hover:text-purple-400 transition-colors" />
                <Link 
                  href="https://github.com/taniashahida-dev/FinTrack-Expense-Tracker" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-purple-400 transition-colors duration-200"
                >
                  fintrack.app
                </Link>
              </li>
            </ul>
          </div>

        </div>

    
        <div className="w-full h-[1px] bg-slate-800/80" />

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-600">
          <div>
            &copy; {currentYear} FinTrack. All rights reserved.
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">
              Terms
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
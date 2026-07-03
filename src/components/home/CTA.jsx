"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const CTA = () => {
  return (
  
    <section className="bg-linear-to-br from-indigo-50 via-white to-purple-50 dark:bg-none dark:bg-[#0B132B] relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300 border-y border-slate-200 dark:border-transparent">
      
      
      <div className="hidden dark:block absolute top-1/2 -left-1/4 -translate-y-1/2 w-150 h-150 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-[44px] font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Ready to Transform Your Finances?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto font-normal opacity-85">
            Join thousands of users who have taken control of their money with FinTrack.
          </p>
        </div>

        <div className="flex justify-center pt-2">
          <Link href={'/dashboard'}>
            <motion.button
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 15px 30px -10px rgba(139, 92, 246, 0.4)" 
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="group px-8 py-3.5 bg-linear-to-r from-brand-purple to-[#6366F1] text-white font-medium text-sm sm:text-base rounded-xl flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-500/20 transition-all"
            >
              <span>Claim Your Free Account Now</span>
              <ArrowRight 
                size={16} 
                className="stroke-[2.5] group-hover:translate-x-1 transition-transform duration-200" 
              />
            </motion.button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default CTA;
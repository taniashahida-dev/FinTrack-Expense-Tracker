"use client";

import { Target, ShieldCheck, Heart } from "lucide-react";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
   
    <main className="bg-slate-50 dark:bg-[#05070C] min-h-screen py-20 sm:py-28 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
      

      <div className="hidden dark:block absolute top-0 right-0 w-125 h-125 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="hidden dark:block absolute bottom-0 left-0 w-125 h-125 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <h1 className="text-4xl sm:text-[48px] font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            About FinTrack
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg font-normal opacity-90">
            Our mission is to make financial clarity accessible to everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800/40 shadow-sm dark:shadow-none space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Target size={24} className="stroke-2" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Our Mission
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed font-normal opacity-95">
              We believe everyone deserves clarity about their finances. FinTrack was built to remove the friction from personal finance management — no complex spreadsheets, no unnecessary overhead, just straightforward insights.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800/40 shadow-sm dark:shadow-none space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-950/50 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <ShieldCheck size={24} className="stroke-2" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Our Core Focus
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed font-normal opacity-95">
              Privacy first, absolute utility always. FinTrack is a completely free tool designed entirely for personal ease of use. No premium tiers, no forced subscription paywalls, no aggressive ads, and absolutely zero third-party data tracking.
            </p>
          </motion.div>

        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-2xl p-8 sm:p-10 bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800/40 shadow-sm dark:shadow-none text-center max-w-4xl mx-auto space-y-4"
        >
          <div className="inline-flex w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-950/50 items-center justify-center text-rose-600 dark:text-rose-400 mx-auto">
            <Heart size={24} className="stroke-2 fill-current" />
          </div>
          
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Built with Absolute Simplicity
          </h3>
          
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal opacity-95">
            FinTrack is crafted by independent developers passionate about helping people make better daily spending choices. By centering the dashboard around a dedicated local currency system, we eliminate regional confusion so you can manage budgets smoothly and securely.
          </p>
        </motion.div>

      </div>
    </main>
  );
};

export default AboutPage;
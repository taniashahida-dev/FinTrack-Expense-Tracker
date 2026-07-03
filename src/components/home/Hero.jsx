"use client";

import { ArrowRight, Eye, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  const typeText = "smarter, not harder";

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, 
        delayChildren: 0.5, 
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <section className="min-h-[85vh] bg-dashboard-bg flex flex-col items-center justify-center px-4 py-10 text-center transition-colors duration-300 relative overflow-hidden">
      
  
      <motion.div 
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute -top-20 -left-20 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-brand-purple/20 dark:bg-brand-purple/25 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none -z-10" 
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
        className="absolute top-1/4 left-1/3 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-[90px] sm:blur-[130px] pointer-events-none -z-10" 
      />
      
      <div className="space-y-6 sm:space-y-8 w-full max-w-3xl mx-auto z-10">
   
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-brand-purple/20 text-brand-purple text-xs font-semibold tracking-wide backdrop-blur-xs mx-auto"
        >
          <Sparkles size={14} className="text-purple-500" />
          <span>Smart Financial Management</span>
        </motion.div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.1] sm:leading-[1.15]">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="block"
          >
            Track your money
          </motion.span>
          
          <motion.span 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-gradient-to-r from-brand-purple via-purple-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-xs inline-block mt-2"
          >
            {typeText.split("").map((char, index) => (
              <motion.span key={index} variants={letterVariants}>
                {char}
              </motion.span>
            ))}
          </motion.span>
        </h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }} 
          className="text-slate-500 dark:text-slate-400 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-medium"
        >
          Manage income, expenses, and savings from one clean dashboard. Know where every taka goes — effortlessly.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.5 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4"
        >
          <Link href="/signup" className="w-full sm:w-auto">
            <button className="w-full flex gap-2 items-center justify-center font-semibold bg-brand-purple hover:bg-brand-purple-hover text-white p-4 px-7 rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-200 text-sm sm:text-base group">
              Start tracking -it`s free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          
          <Link href="/dashboard" className="w-full sm:w-auto">
            <button className="w-full flex gap-2 items-center justify-center font-semibold text-slate-700 dark:text-slate-300 p-4 px-7 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-900/40 dark:hover:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800/60 transition-all duration-200 text-sm sm:text-base">
              <Eye size={18} />
              See Demo
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
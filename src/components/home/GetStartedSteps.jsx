"use client";

import { UserPlus, Plus, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const GetStartedSteps = () => {

  const steps = [
    {
      stepNumber: "01",
      title: "Create Account",

      description: "You can use it completely free forever without any credit card. Just create an account and login.",
      icon: UserPlus,
      gradientClass: "from-[#8B5CF6] via-[#6366F1] to-[#3B82F6]", 
    },
    {
      stepNumber: "02",
      title: "Add Transactions",
      description: "Log expenses and income manually or import from your bank statements via CSV.",
      icon: Plus,
      gradientClass: "from-[#6366F1] via-[#3B82F6] to-[#0EA5E9]", 
    },
    {
      stepNumber: "03",
      title: "Gain Insights",
      description: "Watch interactive charts update in real time and take control of your finances.",
      icon: BarChart3,
      gradientClass: "from-[#8B5CF6] via-[#3B82F6] to-[#0EA5E9]",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
 
    <section className="bg-[#0B132B] py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      <div className="max-w-3xl mx-auto text-center space-y-3 mb-16 sm:mb-20">
        <h2 className="text-3xl sm:text-[42px] font-bold tracking-tight text-white leading-tight">
          Get Started in 3 Simple Steps
        </h2>
        <p className="text-slate-400 text-sm sm:text-base font-normal tracking-wide opacity-80">
          Up and running in under 5 minutes.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
      >
        {steps.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center text-center relative group"
            >
              
              <div className="absolute -top-10 text-7xl sm:text-8xl font-extrabold text-slate-700/20 select-none pointer-events-none group-hover:scale-105 transition-transform duration-300">
                {item.stepNumber}
              </div>

              <div className={`w-16 h-16 rounded-[22px] bg-gradient-to-br ${item.gradientClass} text-white flex items-center justify-center shadow-[0_8px_24px_rgba(99,102,241,0.2)] z-10 relative`}>
                <Icon size={22} className="stroke-[2.5]" />
              </div>

              <div className="space-y-2 max-w-xs z-10 pt-4">
                <h3 className="text-lg font-semibold text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal opacity-90">
                  {item.description}
                </p>
              </div>

            </motion.div>
          );
        })}
      </motion.div>

    </section>
  );
};

export default GetStartedSteps;
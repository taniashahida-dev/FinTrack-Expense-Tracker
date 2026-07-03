"use client";

import { 
  BarChart3, 
  Target, 
  TrendingUp, 
  Bell, 
  Download, 
  ShieldCheck 
} from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
  // Pure structural features data matrix without static highlight flags
  const featuresData = [
    {
      title: "Smart Analytics",
      description: "Visualize spending patterns with interactive charts and AI-powered insights.",
      icon: BarChart3,
    },
    {
      title: "Budget Planning",
      description: "Set monthly budgets by category and get alerts before you overspend.",
      icon: Target,
    },
    {
      title: "Income Tracking",
      description: "Track all income sources — salary, freelance, investments, and more.",
      icon: TrendingUp,
    },
    {
      title: "Smart Alerts",
      description: "Get real-time notifications for large expenses, budget limits, and monthly summaries.",
      icon: Bell,
    },
    {
      title: "Export Reports",
      description: "Download detailed PDF and CSV reports for personal or business use.",
      icon: Download,
    },
    {
      title: "Bank-Level Security",
      description: "256-bit encryption and two-factor authentication keep your data safe.",
      icon: ShieldCheck,
    },
  ];

  // Framer motion animation variants for grid layout entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  // Card fade-up transition profile configs
  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  return (
    <section className="bg-dashboard-bg py-16 sm:py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
      
      {/* 🎯 Header Typography Container */}
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white">
          Everything You Need to Manage Money
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
          Powerful features designed to give you complete visibility and control over your financial life.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {featuresData.map((feature, index) => {
          const Icon = feature.icon;
          
          return (
            <motion.div
              key={index}
              variants={cardVariants}
             
              whileHover={{ 
                y: -6,
                borderColor: "var(--color-brand-purple, #8B5CF6)",
                backgroundColor: "#111A36",
                boxShadow: "0 20px 40px -15px rgba(139, 92, 246, 0.15)",
              }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
             
              className="p-6 sm:p-8 rounded-2xl bg-[#0B132B] border border-slate-800/60 flex flex-col items-start space-y-4 cursor-pointer"
            >
              {/* Scalable Icon Wrapper Block */}
              <span className="p-3 rounded-xl bg-purple-500/10 text-brand-purple flex items-center justify-center">
                <Icon size={22} className="stroke-[2.2]" />
              </span>

              {/* Text Meta Content Elements */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium opacity-90">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

    </section>
  );
};

export default Features;
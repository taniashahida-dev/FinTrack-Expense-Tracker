"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "Is FinTrack free to use?",
      answer: "Yes, FinTrack offers a highly generous free plan that includes baseline transaction logging, budget tracking, and basic visual analytics without requiring any credit card information.",
    },
    {
      question: "How secure is my financial data?",
      answer: "Security is our highest priority. We safeguard your financial logs with bank-level 256-bit AES encryption alongside protocol multi-factor authentication systems.",
    },
    {
      question: "Can I export my data?",
      answer: "Absolutely. You can cleanly export your financial reports, breakdown data, income statements, and expense categories directly into tabular CSV or comprehensive PDF formats at any time.",
    },
    {
      question: "Can I track my recurring monthly bills automatically?",
      answer: "Yes, you can easily set up recurring workflows for automated monthly overhead tracking like rent, Netflix, utilities, or insurance commitments so they get added without manual intervention.",
    },
    {
      question: "Is there a mobile app?",
      answer: "Our web app is fully responsive and works on all devices. Native mobile apps for iOS and Android are coming soon.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-slate-50 dark:bg-[#05070C] py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      
      <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-[42px] font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map((faq, index) => {
          const isOpen = activeIndex === index;

          return (
            <div
              key={index}
            
              className="rounded-xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800/40 shadow-sm hover:shadow-md dark:shadow-none overflow-hidden transition-all duration-300 hover:bg-slate-50/50 dark:hover:bg-[#111B38]"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-5 text-left text-slate-800 dark:text-white font-medium text-sm sm:text-base cursor-pointer group select-none"
              >
                <span className="pr-4 tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="text-slate-400 dark:text-slate-500 shrink-0"
                >
                  <ChevronDown size={18} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5 pt-1 text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-normal opacity-90 border-t border-slate-100 dark:border-slate-800/30">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

    </section>
  );
};

export default FAQ;
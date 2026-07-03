"use client";

import { useState, useRef } from "react";
import { Mail, Globe, Send, Loader2, Clock, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const ContactPage = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    const SERVICE_ID = process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID; 
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY;

    try {
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        PUBLIC_KEY
      );
      
      setStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully.",
      });
      formRef.current.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-slate-50 dark:bg-[#05070C] min-h-screen py-20 sm:py-28 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
      

      <div className="hidden dark:block absolute top-1/4 -right-1/4 w-150 h-150 bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="hidden dark:block absolute bottom-0 -left-1/4 w-150 h-150 bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
       
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 space-y-4">
          <h1 className="text-4xl sm:text-[46px] font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Get in Touch
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-normal opacity-85">
            Have a question? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">

              <div className="rounded-xl p-5 bg-purple-50/50 dark:bg-purple-950/10 border border-purple-100 dark:border-purple-900/20 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">We respond quickly!</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      Our support team typically reviews and replies to all inquiries within 24 hours.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl p-5 bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800/40 shadow-sm dark:shadow-none flex items-center gap-4">
                <div className="w-11 h-11 rounded-lg bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</p>
                  <a href="mailto:taniia.webdev@gmail.com" className="text-sm sm:text-base font-medium text-slate-800 dark:text-white hover:text-purple-500 transition-colors">
                    taniia.webdev@gmail.com
                  </a>
                </div>
              </div>

              <div className="rounded-xl p-5 bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800/40 shadow-sm dark:shadow-none flex items-center gap-4">
                <div className="w-11 h-11 rounded-lg bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Globe size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Website</p>
                  <a href="https://fintrack.app" target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base font-medium text-slate-800 dark:text-white hover:text-blue-500 transition-colors">
                    fintrack.app
                  </a>
                </div>
              </div>
            </div>

            <div className="hidden lg:block rounded-xl p-6 bg-linear-to-br from-slate-900 to-[#111827] dark:from-[#0B132B]/60 dark:to-[#111C44]/40 border border-slate-800/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10 text-white">
                <MessageSquare size={120} />
              </div>
              <div className="relative z-10 space-y-2">
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-2 py-0.5 rounded-full">
                  Smart Investing
                </span>
                <p className="text-sm font-medium text-slate-200 italic leading-relaxed pt-1">
                  {`"Track your expenses, build your wealth, and reach financial freedom with FinTrack."`}
                </p>
                <p className="text-xs text-slate-500 font-normal">
                  — Your personal finance companion.
                </p>
              </div>
            </div>

          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800/40 shadow-sm dark:shadow-none space-y-6 h-full flex flex-col justify-center">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Send us a Message
              </h3>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                {/* Row: Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Name</label>
                    <input
                      type="text"
                      name="from_name"
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-[#131C38]/40 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800/60 rounded-xl focus:outline-none focus:border-purple-500 transition-colors placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Email</label>
                    <input
                      type="email"
                      name="from_email"
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-[#131C38]/40 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800/60 rounded-xl focus:outline-none focus:border-purple-500 transition-colors placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-[#131C38]/40 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800/60 rounded-xl focus:outline-none focus:border-purple-500 transition-colors placeholder:text-slate-400"
                  />
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Message</label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    placeholder="Tell us more..."
                    className="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-[#131C38]/40 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800/60 rounded-xl focus:outline-none focus:border-purple-500 transition-colors placeholder:text-slate-400 resize-none"
                  />
                </div>

                {/* Alert Toast States */}
                {status.message && (
                  <div className={`p-4 rounded-xl text-xs sm:text-sm font-medium ${
                    status.type === "success" 
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/30" 
                      : "bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400 border border-rose-200/50 dark:border-rose-800/30"
                  }`}>
                    {status.message}
                  </div>
                )}

                {/* Action Submit Button */}
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-6 py-3 bg-linear-to-r from-brand-purple to-[#6366F1] disabled:from-slate-600 disabled:to-slate-700 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-purple-500/20 transition-all select-none"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </motion.button>
                </div>

              </form>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
};

export default ContactPage;
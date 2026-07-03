"use client";

import Link from "next/link";
import { Card, Button, Checkbox } from "@heroui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiMail, FiLock } from "react-icons/fi";
import { RiEyeCloseLine } from "react-icons/ri";
import { Wallet } from "lucide-react";
import { FcGoogle } from "react-icons/fc"; // গুগল আইকন
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [viewPass, setViewpass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    const { data: res, error } = await authClient.signIn.email({
      ...data,
      callbackURL: "/",
      rememberMe: true,
    });
    console.log(res, error);
    if (error) {
      toast.error(error.message);
      return;
    } else {
      toast.success("Login Successful!!!");
    }
  };

  return (
    // গ্লোবাল থিম টোকেন (bg-dashboard-bg) ব্যবহার করা হয়েছে যাতে লাইট/ডার্ক উভয় মোডেই দারুণ লাগে
    <div className="min-h-screen bg-dashboard-bg flex flex-col items-center justify-center px-4 py-12 transition-colors duration-300">
      
      {/* টপ লোগো ও ওয়েলকাম হেডার (Figma image_ce8b0a.jpg অনুযায়ী) */}
      <div className="flex flex-col items-center mb-8 text-center space-y-3">
        <span className="bg-gradient-to-tr from-blue-500 to-purple-500 p-3.5 rounded-2xl text-white flex items-center justify-center shadow-xl shadow-purple-500/20">
          <Wallet size={28} />
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Welcome Back
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Sign in to your FinTrack account
        </p>
      </div>

      {/* মেইন ফর্ম কার্ড */}
      <Card className="w-full max-w-md p-6 sm:p-8 bg-sidebar-bg border border-slate-200/60 dark:border-slate-800/50 shadow-xl rounded-2xl transition-all">
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          
          {/* ইমেইল ইনপুট */}
          <fieldset className="fieldset flex flex-col gap-1.5">
            <legend className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</legend>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400"><FiMail size={18} /></span>
              <input
                type="email"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-purple text-slate-900 dark:text-white transition-all"
                placeholder="you@example.com"
                {...register("email", { required: "Email is required**" })}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </fieldset>

          {/* পাসওয়ার্ড ইনপুট */}
          <fieldset className="fieldset flex flex-col gap-1.5 relative">
            <legend className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</legend>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400"><FiLock size={18} /></span>
              <input
                type={viewPass ? "text" : "password"}
                className="w-full pl-11 pr-12 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-purple text-slate-900 dark:text-white transition-all"
                placeholder="••••••••"
                {...register("password", { required: "Please enter password**" })}
              />
              <span 
                className="cursor-pointer text-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 absolute right-4" 
                onClick={() => setViewpass(!viewPass)}
              >
                {viewPass ? <FiEye /> : <RiEyeCloseLine />}
              </span>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
          </fieldset>

          {/* রিমেম্বার মি ও ফরগট পাসওয়ার্ড */}
          <div className="flex items-center justify-between text-sm pt-1">
            <Checkbox size="sm" classNames={{ label: "text-slate-500 dark:text-slate-400 select-none" }}>
              Remember me
            </Checkbox>
            <button type="button" className="text-brand-purple hover:underline font-medium text-xs sm:text-sm">
              Forgot password?
            </button>
          </div>

          {/* সাবমিট বাটন - আপনার থিমের ব্রান্ড কালার ও হোভার ইফেক্টসহ */}
          <Button
            fullWidth
            size="lg"
            type="submit"
            className="bg-brand-purple hover:bg-brand-purple-hover text-white font-medium rounded-xl shadow-lg shadow-purple-500/10 dark:shadow-purple-500/20 py-6 text-sm"
          >
            Sign In
          </Button>

          {/* ডিভাইডার */}
          <div className="relative flex py-2 items-center text-xs text-slate-400 dark:text-slate-600">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="flex-shrink mx-4 uppercase tracking-wider font-semibold">Or continue with</span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          {/* 🌐 গুগল সোশাল বাটন (আপনার রিকোয়েস্ট অনুযায়ী ফিউচার ইউজের জন্য স্ট্রাকচার রেডি) */}
          <Button
            fullWidth
            variant="flat"
            type="button"
            onClick={() => console.log("Google Login Clicked")}
            className="bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/40 dark:hover:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl font-medium py-6 text-sm text-slate-700 dark:text-slate-300"
          >
            <FcGoogle size={20} className="mr-2" />
            Continue with Google
          </Button>
        </form>

        {/* বটম লিঙ্ক */}
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-brand-purple font-semibold hover:underline">
            Create one
          </Link>
        </p>
      </Card>

      {/* ব্যাক টু হোম লিঙ্ক */}
      <Link href="/" className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mt-8 transition-colors">
        &larr; Back to home
      </Link>
    </div>
  );
}
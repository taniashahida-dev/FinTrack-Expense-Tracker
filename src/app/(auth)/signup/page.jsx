"use client";

import Link from "next/link";
import { Card, Button } from "@heroui/react";
import { FiEye, FiMail, FiLock, FiUser } from "react-icons/fi";
import { RiEyeCloseLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Wallet } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [viewPass, setViewpass] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleReg = async (data) => {
    const { data: res, error } = await authClient.signUp.email({
      ...data,
    });
    console.log(res, error);
    if (error) {
      toast.error(error.message);
      return;
    } else {
      toast.success("Signup Successful!!");
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-bg flex flex-col items-center justify-center px-4 py-12 transition-colors duration-300">
      <div className="flex flex-col items-center mb-8 text-center space-y-3">
        <span className="bg-linear-to-tr from-blue-500 to-purple-500 p-3.5 rounded-2xl text-white flex items-center justify-center shadow-xl shadow-purple-500/20">
          <Wallet size={28} />
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Create Account
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Get started with your FinTrack account
        </p>
      </div>

      <Card className="w-full max-w-md p-6 sm:p-8 bg-sidebar-bg border border-slate-200/60 dark:border-slate-800/50 shadow-xl rounded-2xl transition-all">
        <form onSubmit={handleSubmit(handleReg)} className="space-y-5">
          <fieldset className="fieldset flex flex-col gap-1.5">
            <legend className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Full Name
            </legend>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400">
                <FiUser size={18} />
              </span>
              <input
                type="text"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-purple text-slate-900 dark:text-white transition-all"
                placeholder="John Doe"
                {...register("name", { required: "Name is required**" })}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </fieldset>

          <fieldset className="fieldset flex flex-col gap-1.5">
            <legend className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Email Address
            </legend>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400">
                <FiMail size={18} />
              </span>
              <input
                type="email"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-purple text-slate-900 dark:text-white transition-all"
                placeholder="you@example.com"
                {...register("email", { required: "Email is required**" })}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </fieldset>

          <fieldset className="fieldset flex flex-col gap-1.5 relative">
            <legend className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Password
            </legend>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400">
                <FiLock size={18} />
              </span>
              <input
                type={viewPass ? "text" : "password"}
                className="w-full pl-11 pr-12 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-purple text-slate-900 dark:text-white transition-all"
                placeholder="••••••••"
                {...register("password", {
                  required: "Please enter password**",
                })}
              />
              <span
                className="cursor-pointer text-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 absolute right-4"
                onClick={() => setViewpass(!viewPass)}
              >
                {viewPass ? <FiEye /> : <RiEyeCloseLine />}
              </span>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </fieldset>

          <div className="flex items-center gap-2 py-2">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 rounded-md border-gray-300 text-[#7c5dfa] focus:ring-violet-100 cursor-pointer"
            />

            <label
              htmlFor="agreeTerms"
              className="text-xs font-medium text-slate-600 dark:text-slate-400 cursor-pointer select-none"
            >
              I agree to the terms and conditions
            </label>
          </div>

          <Button
            fullWidth
            size="lg"
            type="submit"
            className="bg-brand-purple hover:bg-brand-purple-hover text-white font-medium rounded-xl shadow-lg shadow-purple-500/10 dark:shadow-purple-500/20 py-6 text-sm"
          >
            Create Account
          </Button>

          <div className="relative flex py-2 items-center text-xs text-slate-400 dark:text-slate-600">
            <div className="grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="shrink mx-4 uppercase tracking-wider font-semibold">
              Or signup with
            </span>
            <div className="grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          <Button
            fullWidth
            variant="flat"
            type="button"
            onClick={() => console.log("Google Signup Clicked")}
            className="bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/40 dark:hover:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl font-medium py-6 text-sm text-slate-700 dark:text-slate-300"
          >
            <FcGoogle size={20} className="mr-2" />
            Sign up with Google
          </Button>
        </form>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-brand-purple font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}

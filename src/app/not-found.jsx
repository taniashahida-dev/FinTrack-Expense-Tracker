"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home, FileQuestion } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F8FAFC] dark:bg-[#090A15] p-6 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 sm:w-125 sm:h-125 bg-[#6D31ED]/10 dark:bg-[#6D31ED]/5 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-md w-full text-center flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 bg-white dark:bg-[#0F1122]/50 rounded-3xl border border-slate-200 dark:border-gray-800/60 shadow-md dark:shadow-none mb-2">
          <FileQuestion className="w-12 h-12 sm:w-16 sm:h-16 text-[#6D31ED] dark:text-[#8B5CF6] animate-pulse" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
            404
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-sm mx-auto font-medium">
            Oops! The page you are looking for doesn`t exist or has been moved
            to another URL.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 border border-slate-200 dark:border-gray-800/80 bg-white dark:bg-[#0F1122] hover:bg-slate-50 dark:hover:bg-[#151830] text-gray-700 dark:text-gray-300 text-sm font-semibold px-5 py-3 rounded-xl shadow-sm transition-all duration-200 active:scale-[0.98] w-full"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-[#6D31ED] hover:bg-[#5924CC] text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-md hover:shadow-[#6D31ED]/20 dark:shadow-none transition-all duration-200 active:scale-[0.98] w-full"
          >
            <Home className="w-4 h-4" />
            Go to Home
          </Link>
        </div>

        <span className="text-xs text-gray-400 dark:text-gray-500 font-medium mt-6">
          If you think this is a bug, please contact support.
        </span>
      </div>
    </div>
  );
}

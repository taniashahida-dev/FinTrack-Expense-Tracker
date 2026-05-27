"use client";

import Link from "next/link";
import {
  Card,
  Input,
  Button,
  Checkbox,
} from "@heroui/react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF6] flex items-center justify-center px-4 py-10">

      <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl overflow-hidden rounded-3xl shadow-2xl border border-[#DDEB9D] bg-white">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center bg-[#1A3636] p-12 text-white relative overflow-hidden">

          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#40534C] opacity-40"></div>

          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-[#A0C878] opacity-30"></div>

          <div className="relative z-10 space-y-6">

            <h1 className="text-6xl font-black text-[#DDEB9D]">
              Finora
            </h1>

            <h2 className="text-4xl font-bold leading-snug">
              Start managing your money smarter.
            </h2>

            <p className="text-[#FAF6E9] text-lg leading-relaxed">
              Create your account and take control of your personal finance.
            </p>

          </div>

        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-6 md:p-12 bg-[#FAF6E9]">

          <Card className="w-full max-w-md p-8 shadow-none bg-transparent">

            <div className="space-y-6">

              <div className="space-y-2 text-center">

                <h2 className="text-4xl font-bold text-[#1A3636]">
                  Sign up
                </h2>

                <p className="text-[#677D6A]">
                  Create your Finora account
                </p>

              </div>

              <form className="space-y-5">

                <Input
                  type="text"
                  label="Full Name"
                  placeholder="Enter your name"
                  variant="bordered"
                  className={{
                    inputWrapper:
                      "border-[#A0C878] hover:border-[#40534C] bg-white",
                  }}
                />

                <Input
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  className={{
                    inputWrapper:
                      "border-[#A0C878] hover:border-[#40534C] bg-white",
                  }}
                />

                <Input
                  type="password"
                  label="Password"
                  placeholder="Create a password"
                  variant="bordered"
                  className={{
                    inputWrapper:
                      "border-[#A0C878] hover:border-[#40534C] bg-white",
                  }}
                />

                <Checkbox size="sm">
                  I agree to the terms and conditions
                </Checkbox>

                <Button
                  fullWidth
                  size="lg"
                  className="bg-[#40534C] text-[#FFFDF6] font-semibold hover:bg-[#1A3636]"
                >
                  Create Account
                </Button>

              </form>

              <p className="text-center text-[#677D6A]">
                Already have an account?{" "}

                <Link
                  href="/login"
                  className="text-[#1A3636] font-bold hover:text-[#40534C]"
                >
                  Login
                </Link>

              </p>

            </div>

          </Card>

        </div>

      </div>

    </div>
  );
}
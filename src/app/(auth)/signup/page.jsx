"use client";

import Link from "next/link";
import {
  Card,
  Input,
  Button,
  Checkbox,
} from "@heroui/react";
import { FiEye } from "react-icons/fi";
import { RiEyeCloseLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function RegisterPage() {
 const router = useRouter();
  const [viewPass,setViewpass] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

    const handleReg = async (data) => {


    const { data:res, error } = await authClient.signUp.email({
   ...data  }); 
        console.log(res,error)
       if (error)
         { 
         
           toast.error(error.message)
           return  }
        else { 
         toast.success("Signin Successfull!!")
          router.push("/login")
           
         }
         
  };


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

              <form onSubmit={handleSubmit(handleReg)} className="space-y-5">

              <fieldset className="fieldset">
            <legend className="fieldset-legend">Name</legend>
            <input
              type="text"
              className="input w-full focus:ring-2 focus:ring-[#40534C]"
              placeholder="Enter Your Name"
              {...register("name", { required: "Name is required**" })}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </fieldset>

         

          {/* Email */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="email"
              className="input w-full focus:ring-2 focus:ring-[#40534C]"
              placeholder="Enter Your Email"
              {...register("email", { required: "Email is required**" })}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </fieldset>

          {/* Password */}
          <fieldset className="fieldset relative">
            <legend className="fieldset-legend">Password</legend>
            <input
              type={viewPass?"text": "password"}
              className="input w-full focus:ring-2 focus:ring-[#40534C]"
              placeholder="Enter Your Password"
              {...register("password", {
                required: "Please enter password**",
              })}
            />
              <span className="cursor-pointer text-xl text-[#40534C] absolute top-2 right-2" onClick={()=>setViewpass(!viewPass)}>
                          {
                            viewPass?<FiEye />:<RiEyeCloseLine />
                          }
                        </span>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </fieldset>


                <Checkbox size="sm">
                  I agree to the terms and conditions
                </Checkbox>

                <Button
                type="submit"
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
import React from "react";
import Link from "next/link";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { otpSchema } from "@/lib/zodschema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function OtpVerificationPage({ email, onSubmit, loading }) {
  const formSchema = otpSchema.pick({
    otp: true,
    email: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      email: email,
    },
  });





  return (
    <section className="bg-zinc-50 dark:bg-zinc-950 min-h-screen flex items-center justify-center p-4 md:p-6 font-sans antialiased pt-[100px] transition-colors duration-200">
      <div className="w-full max-w-[450px] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-xs hover:shadow-md transition-all">
        {/* Back to Login Button */}
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 mb-6 transition-colors cursor-pointer"
        >
          <FiArrowLeft size={14} /> Back to Login
        </Link>

        <div className="text-center mb-8">
          <div className="inline-block mb-3">
            <span className="text-2xl font-extrabold text-[#006633] dark:text-emerald-500 tracking-tight">
              Drone-Shop-BD
            </span>
          </div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Verify Your Email
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1.5 font-medium max-w-xs mx-auto">
            We have sent a 6-digit security code to your email address
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* 6 Digit OTP Inputs Display */}
          <div className="flex justify-between gap-2 max-w-sm mx-auto">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="number"
                maxLength={1}
                placeholder="•"
                className="w-12 h-14 text-center text-xl font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 rounded-xl text-zinc-800 dark:text-zinc-100 outline-none transition-all"
              />
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#f06236] hover:bg-[#de5328] dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg text-sm sm:text-base tracking-wide cursor-pointer active:scale-[0.99]"
          >
            Verify OTP <FiArrowRight size={16} />
          </button>
        </form>

        <div className="text-center mt-6 text-sm font-medium">
          <p className="text-zinc-500 dark:text-zinc-400">
            Don&apos;t receive the code?{" "}
            <button
              type="button"
              className="text-[#006633] dark:text-emerald-400 font-bold hover:underline cursor-pointer bg-transparent border-none p-0"
            >
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}

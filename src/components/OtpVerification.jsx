"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { otpSchema } from "@/lib/zodschema";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./ui/input-otp";
import axios from "axios";
import { toast } from "react-toastify";

export default function OtpVerificationPage({ email, onSubmit, loading }) {
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [isResendOtp, setIsResendOtp] = useState(false);

  const handleOtpChange = (value) => {
    setOtp(value);
    if (errors.otp) {
      setErrors((prev) => ({ ...prev, otp: "" }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // ✅ স্কিমা থেকে শুধুমাত্র otp অংশটুকু pick করা হলো যেন ফ্রন্টএন্ড ভ্যালিডেশন ঠিক থাকে
    const singleOtpSchema = otpSchema.pick({ otp: true });
    const result = singleOtpSchema.safeParse({ otp });

    if (!result.success) {
      const formattedErrors = {};
      result.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0]] = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }

    onSubmit(otp);
  };

  const resendOtp = async () => {
    try {
      setIsResendOtp(true);
      // ✅ স্পষ্ট করে অবজেক্ট আকারে ইমেইল পাঠানো হলো
      const { data: registerResponse } = await axios.post(
        "/api/auth/resend-otp",
        { email: email },
      );
      if (!registerResponse.success) {
        throw new Error(registerResponse.message);
      }
      toast.success(registerResponse.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsResendOtp(false);
    }
  };

  return (
    <div className="w-full max-w-[450px] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-xs hover:shadow-md transition-all">
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
          We have sent a 6-digit security code to{" "}
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
            {email}
          </span>
        </p>
      </div>

      <form
        onSubmit={handleFormSubmit}
        className="space-y-6 flex flex-col items-center"
      >
        {/* Shadcn Input OTP Container */}
        <div className="w-full flex flex-col items-center gap-2">
          <InputOTP maxLength={6} value={otp} onChange={handleOtpChange}>
            <InputOTPGroup>
              <InputOTPSlot
                index={0}
                className="w-12 h-14 text-lg font-bold border-zinc-200 dark:border-zinc-800"
              />
              <InputOTPSlot
                index={1}
                className="w-12 h-14 text-lg font-bold border-zinc-200 dark:border-zinc-800"
              />
              <InputOTPSlot
                index={2}
                className="w-12 h-14 text-lg font-bold border-zinc-200 dark:border-zinc-800"
              />
            </InputOTPGroup>

            <InputOTPSeparator className="text-zinc-300 dark:text-zinc-700 mx-1" />

            <InputOTPGroup>
              <InputOTPSlot
                index={3}
                className="w-12 h-14 text-lg font-bold border-zinc-200 dark:border-zinc-800"
              />
              <InputOTPSlot
                index={4}
                className="w-12 h-14 text-lg font-bold border-zinc-200 dark:border-zinc-800"
              />
              <InputOTPSlot
                index={5}
                className="w-12 h-14 text-lg font-bold border-zinc-200 dark:border-zinc-800"
              />
            </InputOTPGroup>
          </InputOTP>

          {errors.otp && (
            <p className="text-red-500 text-xs font-medium mt-1.5 self-start pl-4">
              {errors.otp}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#f06236] hover:bg-[#de5328] dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg text-sm sm:text-base tracking-wide cursor-pointer active:scale-[0.99] disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              Verify OTP <FiArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      {/* Resend Section */}
      <div className="text-center mt-6 text-sm font-medium">
        <p className="text-zinc-500 dark:text-zinc-400">
          Don&apos;t receive the code?{" "}
          {!isResendOtp ? (
            <button
              onClick={resendOtp}
              type="button"
              className="text-[#006633] dark:text-emerald-400 font-bold hover:underline cursor-pointer bg-transparent border-none p-0"
            >
              Resend OTP
            </button>
          ) : (
            <span className="font-bold text-[#006633] dark:text-emerald-400">
              Resending....
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

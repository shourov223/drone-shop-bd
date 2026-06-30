"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { loginSchema } from "@/lib/zodschema";
import { WEBSITE_REGESTER } from "@/routes/WebsiteRoute";


export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors = {};
      result.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0]] = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }

    setIsLoading(true);
    try {
      console.log("Validated Login Data:", result.data);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Login Successful!");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-zinc-50 dark:bg-zinc-950 min-h-screen flex items-center justify-center p-4 md:p-6 font-sans antialiased pt-[100px] transition-colors duration-200">
      <div className="w-full max-w-[450px] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-xs hover:shadow-md transition-all">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-3">
            <span className="text-2xl font-extrabold text-[#006633] dark:text-emerald-500 tracking-tight cursor-pointer">
              Drone-Shop-BD
            </span>
          </Link>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1.5 font-medium">
            Enter your credentials to access your account
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 text-sm font-bold text-zinc-700 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <FcGoogle size={18} /> Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 text-sm font-bold text-zinc-700 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <FaGithub size={18} className="text-zinc-900 dark:text-white" />{" "}
            GitHub
          </button>
        </div>

        <div className="flex items-center my-6 opacity-40">
          <div className="flex-1 border-t border-zinc-300 dark:border-zinc-700"></div>
          <span className="px-3 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            Or continue with
          </span>
          <div className="flex-1 border-t border-zinc-300 dark:border-zinc-700"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm font-bold mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-950 border ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600"
                } rounded-xl text-sm font-semibold text-zinc-800 dark:text-zinc-100 outline-none transition-all`}
                placeholder="name@example.com"
              />
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 text-base" />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs font-medium mt-1.5">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm font-bold">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-bold text-[#006633] dark:text-emerald-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-11 pr-11 py-3 bg-zinc-50 dark:bg-zinc-950 border ${
                  errors.password
                    ? "border-red-500 focus:border-red-500"
                    : "border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600"
                } rounded-xl text-sm font-semibold text-zinc-800 dark:text-zinc-100 outline-none transition-all`}
                placeholder="••••••••"
              />
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 text-base" />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs font-medium mt-1.5">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#f06236] hover:bg-[#de5328] dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg text-sm sm:text-base tracking-wide cursor-pointer active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                Sign In <FiArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-zinc-500 dark:text-zinc-400 text-sm mt-6 font-medium">
          Don&apos;t have an account?{" "}
          <Link
            href={WEBSITE_REGESTER}
            className="text-[#006633] dark:text-emerald-400 font-bold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}

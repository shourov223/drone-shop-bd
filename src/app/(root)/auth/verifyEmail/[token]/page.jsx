"use client";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import Link from "next/link";

const EmailVerifyPage = ({ params }) => {
  const { token } = use(params);
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const verify = async () => {
      try {
        const { data: verificationResponse } = await axios.post(
          "/api/auth/verifyEmail",
          { token },
        );
        if (verificationResponse.success) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (error) {
        setStatus("error");
      }
    };
    if (token) verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center transition-all duration-300">
        {/* 1. Verifying / Loading State */}
        {status === "verifying" && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">
                Verifying Email...
              </h2>
              <p className="text-gray-500 text-sm">
                Please wait while we validate your secure token.
              </p>
            </div>
          </div>
        )}

        {/* 2. Success State */}
        {status === "success" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-inner">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">
                Email Verified!
              </h2>
              <p className="text-gray-500 text-sm">
                Your email has been successfully verified. You can now access
                your account.
              </p>
            </div>
            <Link
              href="/auth/register"
              className="block w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition duration-200 shadow-md hover:shadow-indigo-200"
            >    
              Go to Login
            </Link>
          </div>
        )}

        {/* 3. Error State */}
        {status === "error" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center shadow-inner">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">
                Verification Failed
              </h2>
              <p className="text-gray-500 text-sm">
                The link is invalid or may have expired. Please try registering
                or requesting a new link again.
              </p>
            </div>
            <Link
              href="/register"
              className="block w-full py-3 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-xl transition duration-200 shadow-md"
            >
              Back to Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerifyPage;

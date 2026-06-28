"use client";

import React, { useState } from "react";
import { ChevronDown, Rocket, ShieldCheck, RefreshCw } from "lucide-react";

const OrderSummary = ({ subtotal, totalItems }) => {
  const [promoCode, setPromoCode] = useState("FLYDRONE20");

  // ✅ ১. শিপিং ডাইনামিক লজিক (কার্ট খালি থাকলে ০, প্রোডাক্ট থাকলে FREE)
  const shipping = 0.0;

  // ✅ ২. ডাইনামিক ট্যাক্স ক্যালকুলেশন (যেমন: সাবটোটালের ৫% ট্যাক্স, কার্ট খালি থাকলে ০)
  const TAX_RATE = 0.05; // আপনার প্রয়োজন অনুযায়ী পার্সেন্টেজ চেঞ্জ করতে পারেন (০.০৫ = ৫%)
  const estimatedTax = subtotal > 0 ? subtotal * TAX_RATE : 0.0;

  // ✅ ৩. সম্পূর্ণ ডাইনামিক টোটাল প্রাইস
  const total = subtotal + shipping + estimatedTax;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    console.log(`Promo code "${promoCode}" applied successfully.`);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 p-6 md:p-8 shadow-xs transition-colors duration-200">
      <h2 className="font-bold text-zinc-900 dark:text-zinc-50 text-lg sm:text-xl mb-6">
        Order Summary
      </h2>

      {/* সাবটোটাল সেকশন */}
      <div className="space-y-4 pb-6 border-b border-zinc-100 dark:border-zinc-800/80 text-sm font-medium text-zinc-500 dark:text-zinc-400">
        <div className="flex justify-between items-center">
          <span>Subtotal ({totalItems} items)</span>
          <span className="text-zinc-900 dark:text-zinc-50 font-semibold">
            $
            {subtotal.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span>Shipping (Standard)</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-[11px] bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-sm">
            {totalItems > 0 ? "FREE" : "$0.00"}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span>Estimated Tax ({TAX_RATE * 100}%)</span>
          <span className="text-zinc-900 dark:text-zinc-50 font-semibold">
            $
            {estimatedTax.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>

      {/* Promo Code Input Block */}
      <form onSubmit={handleApplyPromo} className="mt-6">
        <label className="block text-zinc-400 dark:text-zinc-500 uppercase text-[10px] tracking-widest font-bold mb-2">
          Promo Code
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm font-bold text-zinc-800 dark:text-zinc-100 uppercase tracking-wide focus:outline-hidden focus:border-zinc-400 dark:focus:border-zinc-600 focus:bg-white dark:focus:bg-zinc-900 transition-all"
            placeholder="ENTER CODE"
          />
          <button
            type="submit"
            className="bg-[#006633] dark:bg-emerald-600 hover:bg-[#005229] dark:hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors shadow-xs shrink-0 cursor-pointer"
          >
            Apply
          </button>
        </div>
      </form>

      <button
        type="button"
        className="flex items-center justify-between w-full mt-5 text-xs font-bold text-[#006633] dark:text-emerald-400 hover:underline cursor-pointer"
      >
        <span>Estimate Shipping & Tax</span>
        <ChevronDown size={14} />
      </button>

      {/* Total Section */}
      <div className="flex items-baseline justify-between mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800/80">
        <span className="font-bold text-zinc-900 dark:text-zinc-50 text-lg sm:text-xl">
          Total
        </span>
        <span className="font-extrabold text-[#006633] dark:text-emerald-400 text-2xl sm:text-3xl tracking-tight">
          $
          {total.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>

      {/* Primary Checkout Button */}
      <button
        type="button"
        disabled={totalItems === 0}
        className="w-full bg-[#f06236] dark:bg-orange-600 hover:bg-[#de5328] dark:hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg mt-6 text-sm sm:text-base tracking-wide cursor-pointer active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Proceed to Checkout <Rocket size={16} className="animate-pulse" />
      </button>

      {/* Secure badges and policies info */}
      <div className="mt-6 flex flex-col items-center gap-2.5 border-t border-zinc-50 dark:border-zinc-800/50 pt-5">
        <div className="flex gap-1.5 mb-1 opacity-40 dark:opacity-20">
          <div className="w-7 h-4 bg-zinc-600 rounded-xs"></div>
          <div className="w-7 h-4 bg-zinc-400 rounded-xs"></div>
          <div className="w-7 h-4 bg-zinc-500 rounded-xs"></div>
          <div className="w-7 h-4 bg-zinc-300 rounded-xs"></div>
        </div>

        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs font-semibold">
          <ShieldCheck
            size={14}
            className="text-zinc-400 dark:text-zinc-500 shrink-0"
          />
          <span>256-bit SSL Secure Payment</span>
        </div>

        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs font-semibold">
          <RefreshCw
            size={12}
            className="text-zinc-400 dark:text-zinc-500 shrink-0"
          />
          <span>30-Day Easy Returns Policy</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

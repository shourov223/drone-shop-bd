"use client";

import React, { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import CartItem from "./CartItem";
import EmptySlot from "./EmptySlot";
import OrderSummary from "./OrderSummary";

// ✅ Redux Hooks এবং আপনার কার্টের slice থেকে Actions ইমপোর্ট
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "@/redux/cartSlice";

const CartClient = () => {
  const dispatch = useDispatch();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const cartItemsFromStore = useSelector((state) => state.cart.items || []);
  const cartItems = mounted ? cartItemsFromStore : [];

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0,
  );
  const totalItems = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0,
  );

  return (
    // ✅ সেকশন ব্যাকগ্রাউন্ড এবং টেক্সট কালার ডার্ক মোডের জন্য আপডেট করা হয়েছে
    <section className="bg-[#fcfcfc] dark:bg-zinc-950 min-h-screen pt-12 pb-24 font-sans text-zinc-800 dark:text-zinc-200 antialiased pt-[100px] transition-colors duration-200">
      <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
        {/* Header Block */}
        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Your Shopping Cart
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1.5 font-medium">
            Review your items before checkout. Secure payment is just a step
            away.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* কার্ট আইটেম লিস্ট */}
          <div className="lg:col-span-7 xl:col-span-8">
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))}
                <EmptySlot />
              </>
            ) : (
              // ✅ এম্পটি কার্ট মেসেজের ব্যাকগ্রাউন্ড ও বর্ডার ডার্ক করা হয়েছে
              <div className="text-center py-16 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 rounded-2xl shadow-xs">
                <p className="text-zinc-400 dark:text-zinc-500 font-medium">
                  Your cart is empty.
                </p>
              </div>
            )}
          </div>

          {/* অর্ডার সামারি ও অ্যাসিস্ট্যান্স ব্লক */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-6">
            <OrderSummary subtotal={subtotal} totalItems={totalItems} />

            {/* ✅ অ্যাসিস্ট্যান্স বক্সটি ডার্ক মোডে সুন্দর দেখানোর জন্য কালার রি-অ্যাডজাস্ট করা হয়েছে */}
            <div className="mt-4 bg-[#eff6f2] dark:bg-emerald-950/20 border border-[#e2e9e5] dark:border-emerald-900/30 rounded-xl p-4 flex gap-3 items-start">
              <div className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-900 flex items-center justify-center text-[#006633] dark:text-emerald-400 shadow-xs shrink-0 mt-0.5">
                <MessageSquare size={16} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-50">
                  Expert Assistance
                </h4>
                <p className="text-zinc-500 dark:text-zinc-400 text-[11px] sm:text-xs mt-0.5 leading-relaxed">
                  Our team is ready to help with your product specifications.
                </p>
                <button className="text-[#006633] dark:text-emerald-400 text-xs font-bold underline mt-2 block hover:text-[#005229] dark:hover:text-emerald-300 cursor-pointer">
                  Chat with us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartClient;

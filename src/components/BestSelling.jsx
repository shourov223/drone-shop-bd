import React from "react";
import Image from "next/image";
import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { BiGitCompare } from "react-icons/bi";

// স্যাম্পল বেস্ট সেলিং প্রোডাক্টস ডেটা
const bestSellingProducts = [
  {
    id: 1,
    name: "Flyx Max 2 Toy Drone",
    image:
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=400&auto=format&fit=crop",
    price: 4850,
    oldPrice: 6500,
    rating: 5,
    tag: "Hot Deal",
    features: ["4K Dual Camera", "Flying Time: 20mins"],
  },
  {
    id: 2,
    name: "E99 Pro 2 4K Dual Camera WiFi Mini",
    image:
      "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=400&auto=format&fit=crop",
    price: 5900,
    oldPrice: 7500,
    rating: 4,
    tag: "Save 1,600৳",
    features: ["Foldable Design", "Distance: Up to 100m"],
  },
  {
    id: 3,
    name: "K2 Intelligent Aerial Toy Drone",
    image:
      "https://images.unsplash.com/photo-1504890001746-a9a68edd36e5?q=80&w=400&auto=format&fit=crop",
    price: 7800,
    oldPrice: 10000,
    rating: 5,
    tag: "Save 2,200৳",
    features: ["4K UHD Camera", "3D Flip Function"],
  },
  {
    id: 4,
    name: "DJI Action 5 Pro Camera Ultra",
    image:
      "https://images.unsplash.com/photo-1619114170366-0dbdf7c584a6?q=80&w=400&auto=format&fit=crop",
    price: 45500,
    oldPrice: 48000,
    rating: 5,
    tag: "Top Choice",
    features: ["Dual Touchscreen", "4K/120fps Clarity"],
  },
  {
    id: 5,
    name: "DJI Action 5 Pro Camera Ultra",
    image:
      "https://images.unsplash.com/photo-1619114170366-0dbdf7c584a6?q=80&w=400&auto=format&fit=crop",
    price: 45500,
    oldPrice: 48000,
    rating: 5,
    tag: "Top Choice",
    features: ["Dual Touchscreen", "4K/120fps Clarity"],
  },
];

const BestSelling = () => {
  return (
    <section className="w-full bg-[#f8f9fa] dark:bg-zinc-950 py-12 md:py-16 transition-colors duration-300">
      <div className="container sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-12 gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Best Selling Products
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
              Check out our most popular items based on daily sales volume
            </p>
          </div>
          <button className="self-center sm:self-auto px-6 py-2.5 rounded-full border border-zinc-300 dark:border-zinc-700 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-[#006633] hover:text-white dark:hover:bg-[#006633] dark:hover:text-white transition-all duration-300 cursor-pointer">
            View All Products
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 justify-items-center">
          {bestSellingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSelling;

/* ==========================================================================
   ProductCard Component
   ========================================================================== */
const ProductCard = ({ product }) => {
  const { name, image, price, oldPrice, rating, tag, features } = product;

  return (
    <div className="group relative w-full max-w-[310px] bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.4)] overflow-hidden">
      <div className="relative w-full h-48 sm:h-52 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 p-3 flex items-center justify-center overflow-hidden">
        {tag && (
          <span className="absolute top-3 left-3 bg-[#b33600] text-white text-[11px] font-bold px-2.5 py-1 rounded-md z-10 shadow-sm">
            {tag}
          </span>
        )}

        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button
            className="w-9 h-9 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-full flex items-center justify-center shadow-md hover:bg-[#006633] hover:text-white dark:hover:bg-[#006633] transition-colors cursor-pointer"
            title="Add to Wishlist"
          >
            <FiHeart size={16} />
          </button>
          <button
            className="w-9 h-9 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-full flex items-center justify-center shadow-md hover:bg-[#006633] hover:text-white dark:hover:bg-[#006633] transition-colors cursor-pointer"
            title="Compare"
          >
            <BiGitCompare size={18} />
          </button>
          <button
            className="w-9 h-9 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-full flex items-center justify-center shadow-md hover:bg-[#006633] hover:text-white dark:hover:bg-[#006633] transition-colors cursor-pointer"
            title="Quick View"
          >
            <FiEye size={16} />
          </button>
        </div>

        <div className="w-full h-full relative p-2 transition-transform duration-500 group-hover:scale-105">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain drop-shadow-[0_8px_15px_rgba(0,0,0,0.05)]"
          />
        </div>
      </div>

      <div className="pt-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                size={13}
                className={
                  i < rating
                    ? "text-amber-400"
                    : "text-zinc-200 dark:text-zinc-700"
                }
              />
            ))}
          </div>

          <h3 className="text-[15px] font-bold text-zinc-800 dark:text-zinc-100 line-clamp-2 leading-snug group-hover:text-[#006633] dark:group-hover:text-emerald-400 transition-colors duration-200 cursor-pointer">
            {name}
          </h3>

          <ul className="space-y-1 pt-1">
            {features.map((feature, index) => (
              <li
                key={index}
                className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 font-medium"
              >
                <span className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 mt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-lg font-black text-[#b33600] dark:text-[#ff5500] leading-none">
              {price.toLocaleString()}৳
            </span>
            {oldPrice && (
              <span className="text-xs text-zinc-400 dark:text-zinc-500 line-through mt-1">
                {oldPrice.toLocaleString()}৳
              </span>
            )}
          </div>

          <button className="px-4 py-2.5 bg-[#006633] hover:bg-[#005229] dark:bg-[#006633] dark:hover:bg-[#007a3d] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md shadow-green-900/5 active:scale-95 transition-all cursor-pointer">
            <FiShoppingCart size={14} />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

"use client";

import React, { useEffect, useState } from "react";
import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { BiGitCompare } from "react-icons/bi";
import useProduct from "@/hooks/useProducts";
import Link from "next/link";

const BestSelling = () => {
  const [products, setProducts] = useState([]);
  const { data, loading, error } = useProduct();

  useEffect(() => {
    if (data && data.products) {
      const topRatedProducts = data.products.filter((item) => item.rating > 4);
      setProducts(topRatedProducts);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 bg-[#f8f9fa] dark:bg-zinc-950">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#006633]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 bg-[#f8f9fa] dark:bg-zinc-950">
        Failed to load products!
      </div>
    );
  }

  return (
    <section className="w-full bg-[#f8f9fa] dark:bg-zinc-950 py-12 md:py-16 transition-colors duration-300 px-[10px]">
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

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-8 justify-items-center">
          {products?.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSelling;

const ProductCard = ({ product }) => {
  const { title, thumbnail, price, rating, tags, discountPercentage, id } =
    product;

  const discount = discountPercentage || 0;
  const originalPrice = discount > 0 ? price / (1 - discount / 100) : null;

  const displayTag =
    tags && tags.length > 0
      ? tags[0]
      : discount > 0
        ? `Save ${discount}%`
        : null;

  return (
    <div className="group relative w-full max-w-[310px] bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.4)] overflow-hidden">
      <div className="relative w-full h-48 sm:h-52 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 p-3 flex items-center justify-center overflow-hidden">
        {displayTag && (
          <span className="absolute top-3 left-3 bg-[#b33600] text-white text-[11px] font-bold px-2.5 py-1 rounded-md z-10 shadow-sm capitalize">
            {displayTag}
          </span>
        )}

        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button
            className="w-9 h-9 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-full flex items-center justify-center shadow-md hover:bg-[#006633] hover:text-white dark:hover:bg-[#006633] transition-colors cursor-pointer"
            title="Add to Wishlist"
          >
            <FiHeart size={16} />
          </button>

          <Link href={`/details/${id}`}>
            <button
              className="w-9 h-9 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-full flex items-center justify-center shadow-md hover:bg-[#006633] hover:text-white dark:hover:bg-[#006633] transition-colors cursor-pointer"
              title="Quick View"
            >
              <FiEye size={16} />
            </button>
          </Link>
        </div>

        <div className="w-full h-full relative p-2 transition-transform duration-500 group-hover:scale-105">
          <img
            src={thumbnail}
            alt={title}
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
                  i < Math.floor(rating || 5)
                    ? "text-amber-400"
                    : "text-zinc-200 dark:text-zinc-700"
                }
              />
            ))}
          </div>
          <Link href={`/details/${id}`}>
            <h3 className="text-[15px] font-bold text-zinc-800 dark:text-zinc-100 line-clamp-2 leading-snug group-hover:text-[#006633] dark:group-hover:text-emerald-400 transition-colors duration-200 cursor-pointer">
              {title}
            </h3>
          </Link>
        </div>

        <div className="pt-4 mt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-lg font-black text-[#b33600] dark:text-[#ff5500] leading-none">
              {price?.toLocaleString()}৳
            </span>
            {originalPrice && (
              <span className="text-xs text-zinc-400 dark:text-zinc-500 line-through mt-1">
                {originalPrice.toFixed(0).toLocaleString()}৳
              </span>
            )}
          </div>

          <button className="px-3 py-2.5 bg-[#006633] hover:bg-[#005229] dark:bg-[#006633] dark:hover:bg-[#007a3d] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md shadow-green-900/5 active:scale-95 transition-all cursor-pointer">
            <FiShoppingCart size={14} />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

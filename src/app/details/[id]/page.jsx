"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  IoStar,
  IoCartOutline,
  IoHeartOutline,
  IoCheckmarkCircleSharp,
  IoChevronDown,
  IoChevronUp,
} from "react-icons/io5";
import { FiTruck } from "react-icons/fi";
import { ShieldCheck, ArrowLeftRight } from "lucide-react";
import useProduct from "@/hooks/useProducts";

const ProductDetailsPage = ({ productId = 1 }) => {
  const [activeImage, setActiveImage] = useState("");
  const [activeTab, setActiveTab] = useState("Product Features");
  const [openFaq, setOpenFaq] = useState(null);

  const { data: product, loading, error } = useProduct(productId);

  // যখনই API থেকে product ডেটা আসবে, তখনই activeImage সেট হবে
  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setActiveImage(product.images[0]);
    }
  }, [product]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#006633]" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-20 text-red-500 font-semibold">
        Product not found or failed to load!
      </div>
    );
  }

  const dynamicFeatures = [
    product.description,
    `Category: ${product.category?.toUpperCase()}`,
    `Brand: ${product.brand}`,
    `Return Policy: ${product.returnPolicy || "No return policy"}`,
  ].filter(Boolean);

  const dynamicSpecifications = [
    { label: "SKU", value: product.sku },
    { label: "Brand", value: product.brand },
    { label: "Weight", value: `${product.weight}g` },
    { label: "Warranty", value: product.warrantyInformation },
    { label: "Minimum Order Qty", value: product.minimumOrderQuantity },
    {
      label: "Dimensions",
      value: product.dimensions
        ? `W: ${product.dimensions.width} x H: ${product.dimensions.height} x D: ${product.dimensions.depth}`
        : "N/A",
    },
  ];

  const dynamicFaqs = [
    {
      question: "What is the return policy for this item?",
      answer:
        product.returnPolicy || "No return policy available for this product.",
    },
    {
      question: "How long does shipping take?",
      answer:
        product.shippingInformation || "Shipping details vary by location.",
    },
  ];

  const discountPercentage = product.discountPercentage || 0;
  const originalPrice =
    discountPercentage > 0
      ? product.price / (1 - discountPercentage / 100)
      : null;

  return (
    <section className="bg-white min-h-screen pt-6 pb-20 font-sans text-zinc-800 antialiased">
      <div className="container mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="flex items-center gap-2 text-xs md:text-sm text-zinc-400 mb-6 font-medium capitalize">
          <Link href="/" className="hover:text-zinc-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/${product.category}`}
            className="hover:text-zinc-600 transition-colors"
          >
            {product.category || "Shop"}
          </Link>
          <span>/</span>
          <span className="text-zinc-900 font-semibold">{product.title}</span>
        </div>

        {/* 1. Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-14">
          {/* Left: Interactive Image Gallery */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="w-full aspect-square relative bg-[#f7f7f7] rounded-3xl overflow-hidden flex items-center justify-center border border-zinc-100">
              {discountPercentage > 0 && (
                <span className="absolute top-4 left-4 bg-[#f8ecea] text-[#d9381e] font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md z-10">
                  Save {discountPercentage}%
                </span>
              )}
              
              {activeImage && (
                <img
                  src={activeImage}
                  alt={product.title}
                  className="object-contain w-full h-full p-4 transition-transform duration-300 hover:scale-105"
                />
              )}
            </div>

            {/* Horizontal Thumbnail Slider */}
            <div className="grid grid-cols-5 gap-2 md:gap-3">
              {product.images?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 bg-[#f7f7f7] p-1 transition-all ${
                    activeImage === img
                      ? "border-[#006633] scale-95"
                      : "border-zinc-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`thumbnail-${idx}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Pricing, Info & CTA Actions */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 mb-2 leading-tight">
                {product.title}
              </h1>

              {/* Star Rating & Review Badge */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex items-center text-orange-500 text-xs gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <IoStar
                      key={i}
                      className={
                        i < Math.floor(product.rating || 0)
                          ? "fill-current"
                          : "opacity-30"
                      }
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-zinc-500">
                  {product.rating || "No Rating"} (
                  {product.reviews?.length || 0} Reviews)
                </span>
              </div>

              {/* Price Tags Line */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl md:text-3xl font-extrabold text-zinc-900">
                  $ {product.price?.toLocaleString()}
                </span>
                {originalPrice && (
                  <span className="text-sm md:text-base text-zinc-400 line-through font-medium">
                    $ {originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Bullet Features Point List */}
              <ul className="space-y-3 mb-8">
                {dynamicFeatures.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm md:text-[15px] text-zinc-600 leading-relaxed"
                  >
                    <IoCheckmarkCircleSharp className="text-[#006633] text-xl shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons Block */}
            <div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button className="bg-[#006633] hover:bg-[#005229] text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm">
                  <IoCartOutline className="text-xl" /> Add to Cart
                </button>
                <button className="bg-[#f06236] hover:bg-[#de5328] text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center transition-all shadow-sm">
                  Buy Now
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <button className="border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  <IoHeartOutline className="text-sm" /> Wishlist
                </button>
                <button className="border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  <ArrowLeftRight size={14} /> Compare
                </button>
              </div>

              {/* Delivery and Warranty Info Badges */}
              <div className="space-y-3 border-t border-zinc-100 pt-5">
                <div className="flex items-start gap-3 bg-zinc-50/50 p-3 rounded-2xl border border-zinc-100">
                  <div className="w-9 h-9 rounded-xl bg-[#e6f3eb] flex items-center justify-center text-[#006633] shrink-0">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900">
                      Warranty Information
                    </p>
                    <p className="text-zinc-400 text-xs mt-0.5">
                      {product.warrantyInformation ||
                        "Standard manufacturer warranty applies."}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-zinc-50/50 p-3 rounded-2xl border border-zinc-100">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-[#f06236] shrink-0">
                    <FiTruck size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900">
                      Shipping & Delivery
                    </p>
                    <p className="text-zinc-400 text-xs mt-0.5">
                      {product.shippingInformation ||
                        "Fast delivery across the country."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Navigation Tab Menu */}
        <div className="border-b border-zinc-100 mb-8 flex gap-8 overflow-x-auto scrollbar-none">
          {["Product Description", "Specifications", "Customer Reviews"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm md:text-base font-bold border-b-2 whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? "border-b-2 border-[#006633] text-[#006633]"
                    : "border-transparent text-zinc-400 hover:text-zinc-600"
                }`}
              >
                {tab}
              </button>
            ),
          )}
        </div>

        {/* 3. Tab Contents Layout Grid */}
        <div className="mb-14">
          {activeTab === "Product Description" && (
            <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-100">
              <h4 className="text-lg font-bold text-zinc-900 mb-2">
                About the Product
              </h4>
              <p className="text-sm text-zinc-600 leading-relaxed max-w-3xl">
                {product.description}
              </p>
            </div>
          )}

          {/* Specifications Table */}
          {activeTab === "Specifications" && (
            <div className="border border-zinc-100 rounded-2xl overflow-hidden shadow-xs">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100">
                    <th className="px-6 py-3.5 font-bold text-zinc-400 text-xs uppercase tracking-wider">
                      Features
                    </th>
                    <th className="px-6 py-3.5 font-bold text-zinc-400 text-xs uppercase tracking-wider">
                      Specifications
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dynamicSpecifications.map((spec, i) => (
                    <tr
                      key={i}
                      className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-bold text-zinc-500 w-1/3">
                        {spec.label}
                      </td>
                      <td className="px-6 py-4 text-zinc-900 font-medium">
                        {spec.value || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Customer Reviews Section */}
          {activeTab === "Customer Reviews" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((rev, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-2xl border border-zinc-100 flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="flex items-center text-orange-500 mb-3 text-xs gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <IoStar
                            key={i}
                            className={
                              i < (rev.rating || 5)
                                ? "opacity-100"
                                : "opacity-20"
                            }
                          />
                        ))}
                      </div>
                      <p className="text-sm italic text-zinc-600 leading-relaxed mb-5">
                        "{rev.comment}"
                      </p>
                    </div>
                    <div className="flex items-center gap-3 pt-3 border-t border-zinc-50">
                      <div className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-sm text-[#006633]">
                        {rev.reviewerName ? rev.reviewerName[0] : "U"}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-zinc-900">
                          {rev.reviewerName || "Verified Buyer"}
                        </p>
                        <p className="text-xs text-zinc-400 font-medium">
                          {rev.date
                            ? new Date(rev.date).toLocaleDateString()
                            : "Recent"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-zinc-400 text-sm italic col-span-2">
                  No reviews yet for this product.
                </p>
              )}
            </div>
          )}
        </div>

        {/* 4. Common Questions Accordion Component */}
        {dynamicFaqs.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 pt-4 border-t border-zinc-100">
            <div className="lg:col-span-4">
              <h3 className="text-xl font-bold text-zinc-900">
                Common Questions
              </h3>
              <p className="text-sm text-zinc-400 mt-1">
                Frequently asked operational questions from experts.
              </p>
            </div>
            <div className="lg:col-span-8 space-y-2">
              {dynamicFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-zinc-100 rounded-xl overflow-hidden bg-white"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left text-sm font-bold text-zinc-800 hover:bg-zinc-50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    {openFaq === index ? (
                      <IoChevronUp className="text-zinc-400" />
                    ) : (
                      <IoChevronDown className="text-zinc-400" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-5 pb-4 text-xs md:text-sm text-zinc-500 border-t border-zinc-50 pt-2 leading-relaxed bg-zinc-50/30">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetailsPage;

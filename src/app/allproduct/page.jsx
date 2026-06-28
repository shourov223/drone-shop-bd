"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IoChevronDown, IoMenu, IoClose } from "react-icons/io5";
import { FiCheck } from "react-icons/fi";
import useProduct from "@/hooks/useProducts";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("beauty");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [price, setPrice] = useState(2500);
  const [warrantyInfo, setWarrantyInfo] = useState("Any warranty");
  const [inStockOnly, setInStockOnly] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const { data } = useProduct();

  useEffect(() => {
    if (data) {
      let actualData = [];
      if (Array.isArray(data)) {
        actualData = data;
      } else if (data && typeof data === "object") {
        actualData = data.products || data.data || data.items || [];
      }
      setProducts(actualData);
      setFilteredProducts(actualData);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (!Array.isArray(products)) return;

    let result = [...products];

    if (selectedCategory) {
      result = result.filter(
        (product) => product?.category === selectedCategory,
      );
    }

    if (selectedBrands.length > 0) {
      result = result.filter((product) =>
        selectedBrands.includes(product?.brand),
      );
    }

    result = result.filter((product) => (product?.price ?? 0) <= price);

    if (warrantyInfo !== "Any warranty") {
      result = result.filter(
        (product) => product?.warrantyInformation === warrantyInfo,
      );
    }

    if (inStockOnly) {
      result = result.filter(
        (product) =>
          product?.availabilityStatus === "In Stock" ||
          (product?.stock ?? 0) > 0,
      );
    }

    setFilteredProducts(result);
  }, [
    selectedCategory,
    selectedBrands,
    price,
    warrantyInfo,
    inStockOnly,
    products,
  ]);

  const handleBrandChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleClearAll = () => {
    setSelectedCategory("");
    setSelectedBrands([]);
    setPrice(2500);
    setWarrantyInfo("Any warranty");
    setInStockOnly(false);
  };

  const FilterContent = () => (
    <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] font-sans text-zinc-800 dark:text-zinc-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-white">
          Filters
        </h2>
        <button
          onClick={handleClearAll}
          className="text-[#006633] hover:text-[#004d26] text-sm font-medium transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-bold tracking-wider text-zinc-400 uppercase mb-3">
          Category
        </h3>
        <div className="space-y-3">
          {["beauty", "fragrances", "furniture"].map((category) => (
            <label
              key={category}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={selectedCategory === category}
                  onChange={() => setSelectedCategory(category)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-md border transition-all flex items-center justify-center ${
                    selectedCategory === category
                      ? "bg-[#006633] border-[#006633]"
                      : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 group-hover:border-zinc-400"
                  }`}
                >
                  {selectedCategory === category && (
                    <FiCheck className="w-3.5 h-3.5 text-white stroke-[3]" />
                  )}
                </div>
              </div>
              <span className="text-[15px] font-normal capitalize text-zinc-700 dark:text-zinc-300">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-bold tracking-wider text-zinc-400 uppercase mb-3">
          Brand
        </h3>
        <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
          {[
            "Essence",
            "Glamour Beauty",
            "Velvet Touch",
            "Chic Cosmetics",
            "Nail Couture",
            "Calvin Klein",
            "Chanel",
            "Dior",
            "Dolce & Gabbana",
            "Gucci",
            "Annibale Colombo",
            "Furniture Co.",
            "Knoll",
            "Bath Trends",
          ].map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-md border transition-all flex items-center justify-center ${
                    selectedBrands.includes(brand)
                      ? "bg-[#006633] border-[#006633]"
                      : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 group-hover:border-zinc-400"
                  }`}
                >
                  {selectedBrands.includes(brand) && (
                    <FiCheck className="w-3.5 h-3.5 text-white stroke-[3]" />
                  )}
                </div>
              </div>
              <span className="text-[15px] font-normal text-zinc-700 dark:text-zinc-300">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-bold tracking-wider text-zinc-400 uppercase mb-3">
          Price Range
        </h3>
        <div className="px-1">
          <input
            type="range"
            min="0"
            max="2500"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full h-[6px] bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-[#006633] relative z-10"
            style={{
              background: `linear-gradient(to right, #006633 0%, #006633 ${(price / 2500) * 100}%, #e4e4e7 ${(price / 2500) * 100}%, #e4e4e7 100%)`,
            }}
          />
          <div className="flex justify-between items-center mt-3 text-[15px] text-zinc-600 dark:text-zinc-400 font-normal">
            <span>$0</span>
            <span>${price.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-bold tracking-wider text-zinc-400 uppercase mb-3">
          Warranty Information
        </h3>
        <div className="relative">
          <select
            value={warrantyInfo}
            onChange={(e) => setWarrantyInfo(e.target.value)}
            className="w-full bg-[#f1f3f5] dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[15px] font-normal rounded-xl px-4 py-3 appearance-none cursor-pointer focus:outline-none border border-transparent focus:border-zinc-300 transition-all"
          >
            <option>Any warranty</option>
            <option>1 week warranty</option>
            <option>1 month warranty</option>
            <option>3 months warranty</option>
            <option>6 months warranty</option>
            <option>1 year warranty</option>
            <option>2 year warranty</option>
            <option>3 year warranty</option>
            <option>5 year warranty</option>
            <option>Lifetime warranty</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
            <IoChevronDown className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <span className="text-[15px] font-medium text-zinc-900 dark:text-white">
          In Stock Only
        </span>
        <button
          onClick={() => setInStockOnly(!inStockOnly)}
          className={`w-[50px] h-[28px] rounded-full p-0.5 transition-colors duration-300 focus:outline-none flex items-center ${
            inStockOnly ? "bg-[#006633]" : "bg-zinc-200 dark:bg-zinc-700"
          }`}
        >
          <div
            className={`w-[24px] h-[24px] rounded-full bg-white shadow-sm transition-transform duration-300 ${
              inStockOnly ? "translate-x-[22px]" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
  );

  return (
    <section className="pt-[100px] bg-white dark:bg-zinc-950 min-h-screen text-zinc-800 dark:text-zinc-200 transition-colors duration-300 px-[10px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="flex items-center gap-[10px] text-sm text-zinc-500 dark:text-zinc-400">
            <Link
              href={"/"}
              className="hover:text-zinc-800 dark:hover:text-white transition-colors"
            >
              Home
            </Link>
            <span>{">"}</span>
            <span className="text-zinc-800 dark:text-white font-medium">
              All Product
            </span>
          </div>
        </div>

        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors"
          >
            <IoMenu className="text-xl" />
            Show Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <aside className="hidden lg:block w-[280px] shrink-0 sticky top-[120px]">
            <FilterContent />
          </aside>

          {isMobileOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setIsMobileOpen(false)}
              />
              <div className="absolute left-0 top-0 bottom-0 w-[300px] bg-white dark:bg-zinc-900 p-4 overflow-y-auto shadow-2xl flex flex-col transition-transform duration-300">
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-2 text-2xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white"
                  >
                    <IoClose />
                  </button>
                </div>
                <FilterContent />
              </div>
            </div>
          )}

          <div className="flex-1 w-full">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#006633]" />
              </div>
            ) : !Array.isArray(filteredProducts) ||
              filteredProducts.length === 0 ? (
              <div className="text-center py-16 text-zinc-500">
                No products found matching the criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product?.id || product?._id || Math.random()}
                    className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-4 shadow-sm flex flex-col justify-between h-full"
                  >
                    <div>
                      {product?.thumbnail && (
                        <div className="w-full h-48 relative overflow-hidden rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center mb-4">
                          <img
                            src={product.thumbnail}
                            alt={product.title || "Product image"}
                            className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                          {product?.brand || "Generic"}
                        </span>
                        <h3 className="text-base font-semibold text-zinc-900 dark:text-white line-clamp-1 mt-0.5">
                          {product?.title || "Untitled Product"}
                        </h3>
                      </div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-4">
                        {product?.description}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-xl font-bold text-zinc-900 dark:text-white">
                          ${product?.price}
                        </span>
                        {product?.discountPercentage > 0 && (
                          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded">
                            {product.discountPercentage}% OFF
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-xs text-zinc-400 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                        <span>
                          {product?.warrantyInformation || "No warranty"}
                        </span>
                        <span
                          className={`${product?.stock > 0 ? "text-zinc-500" : "text-red-500"}`}
                        >
                          {product?.stock > 0
                            ? `${product.stock} left`
                            : "Out of Stock"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllProduct;

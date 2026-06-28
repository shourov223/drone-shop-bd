"use client";

import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiHeart,
  FiUser,
  FiShoppingCart,
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
} from "react-icons/fi";

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false); // Next.js hydration error এড়ানোর জন্য
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const currentTheme = savedTheme || systemTheme;

    setTheme(currentTheme);

    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav className="px-[10px] w-full border-b transition-colors duration-300 bg-[#f8f9fa] border-zinc-200 text-zinc-800 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-100 fixed w-full z-10">
      {/* Container */}
      <div className="container mx-auto sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex-shrink-0">
          <span className="text-xl font-bold text-[#006633] cursor-pointer tracking-tight">
            Drone Shop BD
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-8 font-medium text-[15px]">
          <a
            href="#"
            className="text-[#006633] border-b-2 border-[#006633] pb-1 font-semibold"
          >
            Drones
          </a>
          <a href="#" className="hover:text-[#006633] transition-colors pb-1">
            Cameras
          </a>
          <a href="#" className="hover:text-[#006633] transition-colors pb-1">
            Gimbal
          </a>
          <a href="#" className="hover:text-[#006633] transition-colors pb-1">
            Parts
          </a>
          <a href="#" className="hover:text-[#006633] transition-colors pb-1">
            Accessories
          </a>
          <a href="#" className="hover:text-[#006633] transition-colors pb-1">
            Service
          </a>
        </div>

        <div className="hidden md:flex items-center gap-4 lg:gap-6 flex-1 max-w-md justify-end">
          <div className="relative w-full max-w-[280px]">
            <input
              type="text"
              placeholder="Search drones..."
              className="w-full pl-10 pr-4 py-2 rounded-full text-sm outline-none transition-all bg-[#eeeeee] text-zinc-700 placeholder-zinc-500 focus:bg-zinc-100 dark:bg-zinc-900 dark:border dark:border-zinc-800 dark:focus:border-zinc-700 dark:text-zinc-200 dark:placeholder-zinc-500"
            />
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ff4f00] text-lg pointer-events-none" />
          </div>

          <div className="flex items-center gap-4 text-xl">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors h-9 w-9 flex items-center justify-center"
              title="Toggle Theme"
            >
              {mounted &&
                (theme === "dark" ? (
                  <FiSun className="text-amber-400" />
                ) : (
                  <FiMoon className="text-zinc-600" />
                ))}
            </button>

            <button className="hover:text-[#006633] transition-colors">
              <FiHeart />
            </button>

            <button className="hover:text-[#006633] transition-colors">
              <FiUser />
            </button>

            <button className="relative hover:text-[#006633] transition-colors">
              <FiShoppingCart />
              <span className="absolute -top-2 -right-2 bg-[#b33600] text-white text-[11px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                2
              </span>
            </button>
          </div>
        </div>

        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors text-xl h-9 w-9 flex items-center justify-center"
          >
            {mounted &&
              (theme === "dark" ? (
                <FiSun className="text-amber-400" />
              ) : (
                <FiMoon className="text-zinc-600" />
              ))}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-2xl focus:outline-none"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 space-y-3 border-t bg-white border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800">
          {/* Mobile Search */}
          <div className="relative w-full my-3">
            <input
              type="text"
              placeholder="Search drones..."
              className="w-full pl-10 pr-4 py-2 rounded-full text-sm outline-none bg-[#f1f1f1] text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
            />
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ff4f00] text-lg" />
          </div>

          <div className="flex flex-col space-y-3 font-medium text-base">
            <a href="#" className="text-[#006633] font-semibold">
              Drones
            </a>
            <a href="#" className="hover:text-[#006633]">
              Cameras
            </a>
            <a href="#" className="hover:text-[#006633]">
              Gimbal
            </a>
            <a href="#" className="hover:text-[#006633]">
              Parts
            </a>
            <a href="#" className="hover:text-[#006633]">
              Accessories
            </a>
            <a href="#" className="hover:text-[#006633]">
              Service
            </a>
          </div>

          <div className="flex items-center gap-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 text-xl justify-around">
            <button className="flex items-center gap-1 text-sm">
              <FiHeart /> Wishlist
            </button>
            <button className="flex items-center gap-1 text-sm">
              <FiUser /> Account
            </button>
            <button className="relative flex items-center gap-1 text-sm">
              <FiShoppingCart /> Cart (2)
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

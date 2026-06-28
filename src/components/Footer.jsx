import React from "react";
import Link from "next/link";
import { FiGlobe, FiThumbsUp, FiAtSign } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-[10px] w-full bg-[#f8f9fa] dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 border-t border-zinc-200/60 dark:border-zinc-900 transition-colors duration-300">
      <div className="container sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-zinc-200 dark:border-zinc-900">
          <div className="lg:col-span-4 space-y-5">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
              Drone Shop BD
            </h2>
            <p className="text-sm font-medium leading-relaxed max-w-sm text-zinc-500 dark:text-zinc-400">
              Precision engineering for the skies. Bangladesh's most trusted
              partner for DJI and high-end drone technology.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-zinc-300 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-[#006633] hover:text-white dark:hover:bg-[#006633] dark:hover:text-white hover:border-[#006633] dark:hover:border-[#006633] transition-all duration-300 cursor-pointer"
              >
                <FiGlobe size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-zinc-300 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-[#006633] hover:text-white dark:hover:bg-[#006633] dark:hover:text-white hover:border-[#006633] dark:hover:border-[#006633] transition-all duration-300 cursor-pointer"
              >
                <FiThumbsUp size={15} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-zinc-300 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-[#006633] hover:text-white dark:hover:bg-[#006633] dark:hover:text-white hover:border-[#006633] dark:hover:border-[#006633] transition-all duration-300 cursor-pointer"
              >
                <FiAtSign size={16} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
              Products
            </h3>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#006633] dark:hover:text-emerald-400 transition-colors"
                >
                  Professional Drones
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#006633] dark:hover:text-emerald-400 transition-colors"
                >
                  Consumer Drones
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#006633] dark:hover:text-emerald-400 transition-colors"
                >
                  Camera Gimbals
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#006633] dark:hover:text-emerald-400 transition-colors"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
              Support
            </h3>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#006633] dark:hover:text-emerald-400 transition-colors"
                >
                  Repair Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#006633] dark:hover:text-emerald-400 transition-colors"
                >
                  Warranty Info
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#006633] dark:hover:text-emerald-400 transition-colors"
                >
                  Store Locator
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#006633] dark:hover:text-emerald-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
              Policies
            </h3>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#006633] dark:hover:text-emerald-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#006633] dark:hover:text-emerald-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#006633] dark:hover:text-emerald-400 transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#006633] dark:hover:text-emerald-400 transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 text-center text-xs font-semibold text-zinc-400 dark:text-zinc-600 tracking-wide">
          © {currentYear} Drone Shop BD. Precision Engineering for the Skies.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

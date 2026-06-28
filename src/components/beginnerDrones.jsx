import React from "react";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { FaChevronRight } from "react-icons/fa";

const beginnerDrones = [
  {
    id: 1,
    name: "Flyx Max 2 Toy Drone",
    badge: "Easy to Fly",
    price: "4,850৳",
    image:
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=400&auto=format&fit=crop",
    features: ["One-Key Takeoff", "Altitude Hold", "4K Dual Camera"],
  },
  {
    id: 2,
    name: "E99 Pro 2 WiFi Mini Drone",
    badge: "Top Rated",
    price: "5,900৳",
    image:
      "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=400&auto=format&fit=crop",
    features: ["Foldable Design", "6-Axis Gyro Control", "Headless Mode"],
  },
  {
    id: 3,
    name: "K2 Intelligent Aerial Drone",
    badge: "Smart Control",
    price: "7,800৳",
    image:
      "https://images.unsplash.com/photo-1504890001746-a9a68edd36e5?q=80&w=400&auto=format&fit=crop",
    features: ["Obstacle Avoidance", "3D Flip Function", "Stable Hovering"],
  },
];

const BeginnerDroneSection = () => {
  return (
    <section className="w-full bg-white dark:bg-zinc-900 py-12 md:py-20 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-4">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs font-bold text-[#006633] dark:text-emerald-400 uppercase tracking-widest bg-green-50 dark:bg-green-950/40 px-3 py-1 rounded-full">
              Perfect For Starters
            </span>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-zinc-900 dark:text-white mt-3">
              Beginner Friendly Drones
            </h2>
            <p className="mt-3 text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
              Easy to control, durable built quality, and packed with smart
              safety features to make your first flight unforgettable.
            </p>
          </div>
          <button className="group self-center md:self-auto flex items-center gap-2 text-sm font-bold text-[#006633] dark:text-emerald-400 hover:text-[#004d26] dark:hover:text-emerald-300 transition-colors cursor-pointer">
            View All Beginner Drones
            <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-4 bg-gradient-to-br from-[#006633] to-[#004d26] rounded-3xl p-8 md:p-10 text-white flex flex-col justify-between shadow-xl shadow-green-950/10 relative overflow-hidden min-h-[320px]">
            <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-extrabold leading-tight">
                Why Choose a Beginner Drone?
              </h3>
              <p className="text-sm text-green-100/80 leading-relaxed font-medium">
                These models include features like crash protection guard,
                auto-hover, and simplified controls designed specifically for
                new pilots.
              </p>
            </div>

            <div className="space-y-3 pt-6 lg:pt-0">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <FiCheckCircle className="text-emerald-300 flex-shrink-0" /> No
                Pilot License Required
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <FiCheckCircle className="text-emerald-300 flex-shrink-0" />{" "}
                Crash Resistant Materials
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <FiCheckCircle className="text-emerald-300 flex-shrink-0" />{" "}
                Budget Friendly Pricing
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {beginnerDrones.map((drone) => (
              <div
                key={drone.id}
                className="group bg-[#f8f9fa] dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 hover:bg-white dark:hover:bg-zinc-900 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]"
              >
                <div>
                  <div className="w-full h-40 bg-white dark:bg-zinc-900/50 rounded-2xl p-4 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300 border border-zinc-100 dark:border-zinc-800/40">
                    <span className="absolute top-2.5 left-2.5 bg-[#006633]/10 dark:bg-emerald-500/10 text-[#006633] dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {drone.badge}
                    </span>
                    <img
                      src={drone.image}
                      alt={drone.name}
                      className="max-w-[85%] max-h-full object-contain drop-shadow-md"
                    />
                  </div>

                  <div className="mt-4 space-y-1">
                    <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 line-clamp-1 group-hover:text-[#006633] dark:group-hover:text-emerald-400 transition-colors">
                      {drone.name}
                    </h4>
                    <p className="text-base font-black text-[#b33600] dark:text-[#ff5500]">
                      {drone.price}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 space-y-1.5">
                    {drone.features.map((feature, index) => (
                      <span
                        key={index}
                        className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 block bg-zinc-200/40 dark:bg-zinc-800/40 px-2 py-1 rounded-md w-fit"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <button className="w-full py-2.5 bg-white dark:bg-zinc-900 group-hover:bg-[#006633] text-zinc-700 dark:text-zinc-300 group-hover:text-white border border-zinc-200 dark:border-zinc-800 group-hover:border-[#006633] text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-all duration-300 shadow-xs cursor-pointer">
                    Get Started
                    <FaChevronRight
                      size={10}
                      className="transform group-hover:translate-x-0.5 transition-transform"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeginnerDroneSection;

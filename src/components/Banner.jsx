"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import banner_1 from "@/assets/banner_1.png";
import banner_2 from "@/assets/banner_2.png";
import banner_3 from "@/assets/banner_3.png";
import Image from "next/image";

export default function Banner() {
  const bannerData = [
    {
      id: 1,
      title: "DJI Action 5 Pro",
      subtitle: "Action Cameras",
      description:
        "Capture your adventures in stunning 4K clarity with advanced stabilization and dual touchscreen controls.",
      price: "45,500৳",
      tag: "New Arrival",
      image: banner_1,
      bgGradient: "from-amber-500/10 to-transparent",
    },
    {
      id: 2,
      title: "Flyx Max 2 Toy Drone",
      subtitle: "Professional Drones",
      description:
        "Experience ultimate stability with a 4K Dual Camera, high flying speeds of 7m/s, and intuitive 6-axis gyro controls.",
      price: "4,850৳",
      tag: "Best Seller",
      image: banner_2,
      bgGradient: "from-[#006633]/10 to-transparent",
    },
    {
      id: 3,
      title: "K2 Intelligent Aerial Drone",
      subtitle: "Gimbal & Accessories",
      description:
        "Take cinematic aerial shots with 3D flip functionality, intelligent obstacle avoidance, and robust flight times.",
      price: "7,800৳",
      tag: "Save 2,200৳",
      image: banner_3,
      bgGradient: "from-blue-500/10 to-transparent",
    },
  ];

  return (
    <section className="w-full bg-[#f8f9fa] dark:bg-zinc-950 transition-colors duration-300 overflow-hidden pt-[100px] lg:h-[600px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 h-full">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect={"fade"}
          grabCursor={true}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletActiveClass:
              "swiper-pagination-bullet-active !bg-[#006633] !w-6",
            bulletClass:
              "swiper-pagination-bullet !bg-zinc-400 dark:!bg-zinc-600 transition-all duration-300 rounded-full !h-2 !w-2 inline-block mx-1 cursor-pointer",
          }}
          className="rounded-3xl border border-zinc-200/60 dark:border-zinc-800/50 overflow-hidden shadow-sm h-full"
        >
          {bannerData.map((slide) => (
            <SwiperSlide key={slide.id} className="h-full">
              <Image
                src={slide.image}
                alt="banner_image"
                className="w-full h-full object-cover"
                priority
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

import Image from "next/image";
import React from "react";
import dji from "@/assets/dji.png";
import drone from "@/assets/drone.png";
import xbox from "@/assets/xbox.png";
import potensic from "@/assets/potensic.png";
import sony from "@/assets/sony.png";
import fimi from "@/assets/fimi.png";

const brandInfo = [
  { id: 1, image: dji, name: "DJI" },
  { id: 2, image: drone, name: "Drones" },
  { id: 3, image: xbox, name: "XBOX" },
  { id: 4, image: potensic, name: "Potensic" },
  { id: 5, image: fimi, name: "Fimi" },
  { id: 6, image: sony, name: "Sony" },
];

const PopularBrands = () => {
  return (
    <section className="w-full bg-[#f8f9fa] dark:bg-zinc-950 py-12 md:py-16 transition-colors duration-300 px-[10px]">
      <div className="container sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-10 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Popular Brands
          </h2>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            Top tier tech brands trusted by professionals worldwide
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {brandInfo?.map((brand) => (
            <BrandCard logo={brand.image} name={brand.name} key={brand.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBrands;

const BrandCard = ({ logo, name }) => {
  return (
    <div className="group relative bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-4 flex flex-col items-center justify-center transition-all duration-300 hover:border-[#006633] dark:hover:border-[#006633] hover:shadow-[0_12px_30px_-10px_rgba(0,102,51,0.12)] cursor-pointer overflow-hidden">
      <div className="w-full h-24 sm:h-28 flex items-center justify-center relative p-2">
        <Image
          src={logo}
          alt={name}
          className="max-w-full max-h-full object-contain grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"
        />
      </div>

      <div className="mt-4 text-center">
        <h3 className="text-sm font-semibold tracking-wide text-zinc-700 dark:text-zinc-300 group-hover:text-[#006633] dark:group-hover:text-emerald-400 transition-colors duration-300">
          {name}
        </h3>
      </div>
    </div>
  );
};

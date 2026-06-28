import Banner from "@/components/Banner";
import BeginnerDroneSection from "@/components/beginnerDrones";
import BestSelling from "@/components/BestSelling";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PopularBrands from "@/components/PopularBrands";
import Image from "next/image";

export default function Home() {
  return (
    <main>

      <Banner />
      <PopularBrands />
      <BestSelling />
      <BeginnerDroneSection />
    </main>
  );
}

import React from "react";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const EmptySlot = () => {
  return (
    <div className="border-2 border-dashed border-zinc-200 hover:border-zinc-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer bg-zinc-50/20 transition-colors mt-6">
      <PlusCircle size={28} className="text-zinc-400 mb-2" />
      <p className="text-zinc-500 text-xs sm:text-sm font-medium">
        Need extra propellers or a landing pad?{" "}
        <Link href={"/allproduct"} className="text-[#006633] font-semibold underline decoration-2 decoration-[#006633]/30 hover:decoration-[#006633]">
          Go to Shop
        </Link>
        .
      </p>
    </div>
  );
};

export default EmptySlot;

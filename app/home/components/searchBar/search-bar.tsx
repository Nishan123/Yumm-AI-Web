import React from "react";
import { SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import Pizza from "@/public/pizza_icon.svg";

const SearchBar = () => {
  return (
    <div className="pt-34">
      <div className="relative w-160 h-14 group">
        <input
          className="w-full h-full bg-[#E4E4E4] hover:bg-white focus:bg-white rounded-full text-center px-14 text-[18px]
          border-2 border-gray-200 focus:border-[#6F8B15] focus:ring-4 focus:ring-[#6F8B15]/20
          outline-none focus:shadow-xl transition-all duration-300 ease-out
          placeholder:text-gray-500 text-gray-800"
          placeholder="What do you want to eat?"
        />

        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-transform duration-300 group-focus-within:scale-110 group-focus-within:rotate-12">
          <Image src={Pizza} alt="pizza" width={40} height={40} />
        </span>

        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10.5 h-10.5 bg-white 
          flex justify-center items-center rounded-full shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 text-gray-700 hover:text-[#6F8B15]"
        >
          <SlidersHorizontal size={22} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;


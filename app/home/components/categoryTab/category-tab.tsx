"use client";
import React from "react";

const CategoryTab = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("Anything");

  const categories = [
    "Anything",
    "Breakfast",
    "Dinner",
    "Main Course",
    "Snacks",
    "Dessert",
    "Hard drinks",
    "Soft drinks",
  ];

  return (
    <div className="mt-15 flex justify-between w-340 h-6.75 ">
      <ul className="flex gap-6.5 font-pop font-normal items-center">
        {categories.map((category) => (
          <li
            key={category}
            className={`cursor-pointer transition-colors ${
              selectedCategory === category
                ? "font-bold text-[#6F8A15]"
                : "text-black hover:text-[#6F8A15]/70"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
      <button className="font-bold font-pop text-[#000AFF]">
        Explore More
      </button>
    </div>
  );
};

export default CategoryTab;

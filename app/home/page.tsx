"use client";

import { useState } from "react";
import CardSection from "./components/cardSection/card-section";
import CategoryTab from "./components/categoryTab/category-tab";
import Hero from "./components/hero/hero";
import Navbar from "./components/navBar/nav-bar";
import SearchBar from "./components/searchBar/search-bar";

const Home = () => {
  const [selectedMealType, setSelectedMealType] = useState<string | undefined>(
    undefined,
  );

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Navbar />
      <SearchBar />
      <Hero />
      <CategoryTab
        selectedMealType={selectedMealType}
        onMealTypeChange={setSelectedMealType}
      />
      <CardSection mealType={selectedMealType} />
    </div>
  );
};

export default Home;

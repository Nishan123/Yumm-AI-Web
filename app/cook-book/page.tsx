"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/auth-context";
import { getCookbookAction } from "@/lib/actions/cookbook-action";
import { UserRecipe } from "@/lib/types/cookbook.type";
import Navbar from "../home/components/navBar/nav-bar";
import { CookbookGrid } from "./_components/CookbookGrid";
import { Search } from "lucide-react";

const CookBook = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [recipes, setRecipes] = useState<UserRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCookbook = async (search?: string) => {
    // Wait for auth to finish loading
    if (authLoading) {
      return;
    }

    if (!user?.uid) {
      setLoading(false);
      setError("Please log in to view your cookbook");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { recipes: cookbookRecipes } = await getCookbookAction(
        user.uid,
        undefined,
        undefined,
        search || undefined,
      );
      setRecipes(cookbookRecipes);
    } catch (err: any) {
      console.error("Error fetching cookbook:", err);
      setError(err.message || "Failed to load your cookbook");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchCookbook();
  }, [user?.uid, authLoading]);

  const handleSearch = () => {
    fetchCookbook(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="w-340 mx-auto pt-30">
        {/* Header with Title and Search */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Your Cookbook
          </h1>

          {/* Search Bar */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search in your cookbook"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-72 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                         placeholder:text-gray-500 dark:placeholder:text-gray-400
                         focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                         transition-all duration-200"
            />
            <button
              onClick={handleSearch}
              className="p-2.5 bg-black dark:bg-white rounded-md
                         hover:bg-gray-800 dark:hover:bg-gray-100
                         transition-colors duration-200"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-white dark:text-black" />
            </button>
          </div>
        </div>

        {/* Grid */}
        <CookbookGrid
          recipes={recipes}
          loading={loading}
          error={error}
          onRetry={() => fetchCookbook(searchTerm)}
        />
      </div>
    </div>
  );
};

export default CookBook;

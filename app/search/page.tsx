"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  Suspense,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSearch } from "@/hooks/useSearch";
import Navbar from "../home/components/navBar/nav-bar";
import Card from "../home/components/cardSection/card";
import SearchFiltersPanel from "./_components/SearchFilters";
import { motion } from "framer-motion";
import {
  ChefHat,
  Flame,
  Heart,
  Loader2,
  Search,
  SlidersHorizontal,
  SearchX,
  User,
  Clock,
  Users,
  X,
} from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  const openFilters = searchParams.get("openFilters") === "true";

  const {
    recipes,
    loading,
    loadingMore,
    error,
    hasMore,
    searchQuery,
    filters,
    search,
    loadNextPage,
    setFilters,
    clearFilters,
  } = useSearch();

  const [inputValue, setInputValue] = useState(initialQuery);
  const [filtersOpen, setFiltersOpen] = useState(openFilters);
  const observer = useRef<IntersectionObserver | null>(null);
  const hasSearched = useRef(false);

  // Trigger initial search from URL param
  useEffect(() => {
    if (initialQuery && !hasSearched.current) {
      hasSearched.current = true;
      search(initialQuery);
    }
  }, [initialQuery, search]);

  const handleSearch = useCallback(
    (query: string) => {
      if (!query.trim()) return;
      setInputValue(query);
      router.replace(`/search?q=${encodeURIComponent(query)}`);
      search(query);
    },
    [router, search],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(inputValue);
    }
  };

  // Infinite scroll observer
  const lastCardRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading || loadingMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, loadingMore, hasMore, loadNextPage],
  );

  const activeFilterCount = [
    filters.experienceLevel,
    filters.mealType,
    (filters.minCalorie ?? 0) > 0 || (filters.maxCalorie ?? 2000) < 2000,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />

      <div className="w-340 mx-auto pt-28 pb-12">
        {/* Search header */}
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Find Your Perfect Recipe
          </h1>
          <div className="flex items-center justify-center gap-3 w-full max-w-2xl">
            <motion.div layoutId="search-bar" className="relative flex-1">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                autoFocus
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search recipes..."
                className="w-full h-12 pl-11 pr-4 bg-white border border-gray-200 rounded-full text-[16px]
                  focus:border-[#6F8B15] focus:ring-2 focus:ring-[#6F8B15]/20 outline-none
                  transition-all duration-200 placeholder:text-gray-400 text-gray-800 shadow-sm"
              />
            </motion.div>
            <button
              onClick={() => handleSearch(inputValue)}
              className="h-12 px-6 bg-[#6F8B15] text-white rounded-full font-medium
                hover:bg-[#5d7512] transition-colors shadow-md hover:shadow-lg active:scale-95 duration-200"
            >
              Search
            </button>
            <button
              onClick={() => setFiltersOpen((prev) => !prev)}
              className={`relative h-12 w-12 flex items-center justify-center rounded-full border transition-all duration-200 shadow-sm
                ${
                  filtersOpen || activeFilterCount > 0
                    ? "bg-[#6F8B15] border-[#6F8B15] text-white"
                    : "bg-white border-gray-200 text-gray-600 hover:border-[#6F8B15] hover:text-[#6F8B15]"
                }`}
            >
              <SlidersHorizontal size={20} />
              {activeFilterCount > 0 && !filtersOpen && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm border border-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Active Filters Summary (Optional enhancement for UX since modal is hidden) */}
          {activeFilterCount > 0 && (
            <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
              <span className="font-medium">Active Filters:</span>
              <div className="flex gap-2">
                {filters.experienceLevel && (
                  <span className="px-2 py-0.5 bg-[#6F8B15]/10 text-[#6F8B15] rounded-md capitalize">
                    {filters.experienceLevel}
                  </span>
                )}
                {filters.mealType && (
                  <span className="px-2 py-0.5 bg-[#6F8B15]/10 text-[#6F8B15] rounded-md capitalize">
                    {filters.mealType}
                  </span>
                )}
                {((filters.minCalorie ?? 0) > 0 ||
                  (filters.maxCalorie ?? 2000) < 2000) && (
                  <span className="px-2 py-0.5 bg-[#6F8B15]/10 text-[#6F8B15] rounded-md">
                    {filters.minCalorie ?? 0}-{filters.maxCalorie ?? 2000} kcal
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-xs text-red-500 hover:underline ml-1"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filter Modal */}
        <SearchFiltersPanel
          filters={filters}
          onApply={setFilters}
          onClear={clearFilters}
          isOpen={filtersOpen}
          onToggle={() => setFiltersOpen(false)}
        />

        {/* Results area */}
        <div className="w-full">
          {/* Search results info */}
          {searchQuery && !loading && recipes.length > 0 && (
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing results for{" "}
                <span className="font-bold text-gray-900">
                  &quot;{searchQuery}&quot;
                </span>
              </p>
              <span className="text-sm text-gray-500 font-medium">
                {recipes.length} recipes found
              </span>
            </div>
          )}

          {/* Loading state */}
          {loading && recipes.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24">
              <Loader2 className="w-10 h-10 animate-spin text-[#6F8B15] mb-3" />
              <p className="text-gray-500 text-sm">Searching recipes...</p>
            </div>
          )}

          {/* Error state */}
          {error && recipes.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center py-24">
              <p className="text-red-500 text-lg mb-3">⚠️ {error}</p>
              <button
                onClick={() => search(searchQuery)}
                className="px-5 py-2 bg-[#6F8B15] text-white rounded-lg hover:bg-[#5d7512] transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && searchQuery && recipes.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24">
              <SearchX size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-600 text-lg font-medium mb-1">
                No recipes found
              </p>
              <p className="text-gray-400 text-sm text-center">
                Try resetting filters or searching with different keywords
              </p>
            </div>
          )}

          {/* Initial empty state (no search yet) */}
          {!loading && !error && !searchQuery && recipes.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 opacity-60">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Search size={40} className="text-gray-300" />
              </div>
              <p className="text-gray-600 text-lg font-medium mb-1">
                Ready to find something delicious?
              </p>
              <p className="text-gray-400 text-sm">
                Enter a keyword above to start searching
              </p>
            </div>
          )}

          {/* Results grid */}
          {recipes.length > 0 && (
            <div className="grid gap-6 grid-cols-4">
              {recipes.map((recipe, index) => {
                if (index === recipes.length - 1) {
                  return (
                    <div ref={lastCardRef} key={recipe.recipeId}>
                      <Card recipe={recipe} />
                    </div>
                  );
                }
                return <Card key={recipe.recipeId} recipe={recipe} />;
              })}
            </div>
          )}

          {/* Loading more */}
          {loadingMore && (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-[#6F8B15]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const SearchPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-[#6F8B15]" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
};

export default SearchPage;

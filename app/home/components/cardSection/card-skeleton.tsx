"use client";

import React from "react";

const CardSkeleton = () => {
  return (
    <div className="w-full border border-gray-100 dark:border-zinc-800 rounded-4xl p-2 animate-pulse">
      {/* Image skeleton */}
      <div className="rounded-3xl w-full h-48 sm:h-56 lg:h-64 bg-gray-200 dark:bg-zinc-800" />

      <div className="flex flex-col gap-1.5 pt-2">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded-lg w-3/4" />
        {/* Description skeleton */}
        <div className="h-4 bg-gray-100 dark:bg-zinc-800/60 rounded-lg w-full" />
        <div className="h-4 bg-gray-100 dark:bg-zinc-800/60 rounded-lg w-2/3" />

        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          <div className="h-6 w-16 bg-orange-50 dark:bg-orange-950/20 rounded-full" />
          <div className="h-6 w-16 bg-blue-50 dark:bg-blue-950/20 rounded-full" />
          <div className="h-6 w-16 bg-green-50 dark:bg-green-950/20 rounded-full" />
          <div className="h-6 w-20 bg-purple-50 dark:bg-purple-950/20 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export const CardSectionSkeleton = () => {
  return (
    <div className="w-full max-w-[1360px] px-4 lg:px-0 mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default CardSkeleton;

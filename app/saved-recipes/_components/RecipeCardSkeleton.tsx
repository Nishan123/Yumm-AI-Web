export const RecipeCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 border-2 border-gray-100 dark:border-zinc-800 rounded-[32px] overflow-hidden w-full">
      {/* Image Skeleton */}
      <div className="relative w-[calc(100%-24px)] aspect-[4/3] m-3 mb-0 rounded-[24px] overflow-hidden bg-gray-200 dark:bg-zinc-800 animate-pulse" />

      {/* Content Skeleton */}
      <div className="p-5">
        {/* Title */}
        <div className="h-7 bg-gray-200 dark:bg-zinc-800 rounded w-3/4 mb-2 animate-pulse" />

        {/* Description */}
        <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-full mb-1 animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-5/6 mb-4 animate-pulse" />

        {/* Chips */}
        <div className="flex gap-2">
          <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded-full w-20 animate-pulse" />
          <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded-full w-24 animate-pulse" />
          <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded-full w-20 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

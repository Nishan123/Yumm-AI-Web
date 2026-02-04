"use client";

import Image from "next/image";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface ChefCardProps {
  title: string;
  description: string;
  backgroundImage: string;
  suffixImage: string;
  isLocked?: boolean;
  isSuffixCropped?: boolean;
  href: string;
  onClick?: () => void;
}

export const ChefCard = ({
  title,
  description,
  backgroundImage,
  suffixImage,
  isLocked = false,
  isSuffixCropped = false,
  href,
  onClick,
}: ChefCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (isLocked) return;
    if (onClick) {
      onClick();
    } else {
      router.push(href);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative w-full h-32 md:h-40 rounded-[24px] overflow-hidden shadow-md active:scale-[0.98] transition-transform duration-200 border border-gray-100 hover:shadow-lg bg-gray-50/50 ${isLocked ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={`${title} background`}
          fill
          className="object-cover"
        />
        {/* Overlay for better text readability if needed (optional, flutter didn't seem to have strong overlay but maybe image has it) */}
        <div className="absolute inset-0 bg-black/5" />
      </div>

      <div className="relative h-full flex items-center justify-between pl-5 pr-2 py-2">
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center z-10 max-w-[65%]">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg md:text-xl font-bold text-gray-900">
              {title}
            </h3>
            {isLocked && (
              <div className="bg-red-500 rounded px-1.5 py-0.5 flex items-center justify-center">
                <Lock className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <p className="text-xs md:text-sm text-gray-700 leading-tight font-medium opacity-90">
            {description}
          </p>
        </div>

        {/* Right Image (Suffix) */}
        <div
          className={cn(
            "relative h-full w-28 md:w-32 flex items-center justify-center",
            isSuffixCropped ? "-mb-4" : "",
          )}
        >
          <Image
            src={suffixImage}
            alt={title}
            width={120}
            height={120}
            className={cn(
              "object-contain drop-shadow-lg transform transition-transform duration-300 hover:scale-105",
              isSuffixCropped ? "translate-y-2 scale-110" : "",
            )}
          />
        </div>
      </div>
    </div>
  );
};

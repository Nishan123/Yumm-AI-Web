"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export interface ItemCardData {
  name: string;
  subtitle: string;
  href: string;
  image: string;
  bgColor: string;
}

interface ItemCardProps {
  card: ItemCardData;
}

export const ItemCard = ({ card }: ItemCardProps) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(card.href)}
      className="flex flex-col text-left active:scale-[0.97] transition-transform"
    >
      {/* Image Container */}
      <div
        className={`w-full aspect-square rounded-3xl ${card.bgColor} border border-gray-100 dark:border-zinc-700 flex items-center justify-center p-5 shadow-sm hover:shadow-md transition-shadow`}
      >
        <Image
          src={card.image}
          alt={card.name}
          width={120}
          height={120}
          className="object-contain w-full h-full"
        />
      </div>

      {/* Text */}
      <h3 className="font-bold text-[15px] text-gray-900 dark:text-gray-100 mt-2.5 leading-tight">
        {card.name}
      </h3>
      <p className="text-[12px] text-gray-400 dark:text-gray-500 mt-0.5 leading-tight">
        {card.subtitle}
      </p>
    </button>
  );
};

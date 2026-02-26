"use client";

import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const Hero = () => {
  const router = useRouter();
  const [hoveredWord, setHoveredWord] = useState<number | null>(null);

  const words = [
    { text: "Your", delay: 0 },
    { text: "Personal", delay: 0.1 },
    { text: "Chef,", delay: 0.2 },
    { text: "Anytime,", delay: 0.3 },
    { text: "Anywhere", delay: 0.4 },
  ];

  return (
    <div className="text-center w-full max-w-4xl flex flex-col justify-center items-center gap-4 md:gap-6 mt-8 md:mt-12 px-4">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-[28px] md:text-[34px] lg:text-[40px] font-bold leading-tight relative cursor-default"
        style={{
          fontFamily: "var(--font-outfit)",
          perspective: "1000px",
        }}
      >
        {words.map((word, wordIndex) => (
          <motion.span
            key={wordIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: word.delay,
              ease: "easeOut",
            }}
            onHoverStart={() => setHoveredWord(wordIndex)}
            onHoverEnd={() => setHoveredWord(null)}
            className="inline-block mr-2 md:mr-3 relative"
            style={{ transformStyle: "preserve-3d" }}
          >
            {word.text.split("").map((letter, letterIndex) => (
              <motion.span
                key={letterIndex}
                className="inline-block bg-gradient-to-r from-[#6F8A15] via-[#8BA61E] to-[#6F8A15] bg-clip-text text-transparent"
                animate={{
                  rotateY: hoveredWord === wordIndex ? [0, 360] : 0,
                  y: hoveredWord === wordIndex ? [0, -8, 0] : 0,
                  scale: hoveredWord === wordIndex ? [1, 1.15, 1] : 1,
                }}
                transition={{
                  duration: 0.6,
                  delay: hoveredWord === wordIndex ? letterIndex * 0.05 : 0,
                  ease: "easeInOut",
                }}
                whileHover={{
                  textShadow: [
                    "0 0 8px rgba(111, 138, 21, 0.3)",
                    "0 0 20px rgba(111, 138, 21, 0.6)",
                    "0 0 8px rgba(111, 138, 21, 0.3)",
                  ],
                }}
                style={{
                  display: "inline-block",
                  transformStyle: "preserve-3d",
                }}
              >
                {letter}
              </motion.span>
            ))}

            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#6F8A15] via-[#A8C820] to-[#6F8A15] blur-xl rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredWord === wordIndex ? 0.4 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ zIndex: -1 }}
            />
          </motion.span>
        ))}
      </motion.h1>
      <p className="w-full max-w-[691px] text-[15px] md:text-[16px] lg:text-[18px] font-pop font-medium text-[#000000E5] dark:text-gray-300 leading-relaxed">
        Get custom recipes, step by step cooking guidance, and smart tips
        tailored to your taste, all right at your fingertips making every meal
        easier, faster, and more delicious than ever.
      </p>

      <button
        onClick={() => router.push("/chef")}
        className="flex items-center gap-2 bg-[#6F8A15] text-white px-6 py-3 rounded-full font-bold text-base lg:text-lg shadow-lg hover:shadow-xl hover:bg-[#5a7011] hover:scale-105 active:scale-95 transition-all duration-300 group mt-2"
      >
        <Sparkles size={20} className="group-hover:animate-pulse" />
        <span>Generate Recipes</span>
      </button>
    </div>
  );
};

export default Hero;

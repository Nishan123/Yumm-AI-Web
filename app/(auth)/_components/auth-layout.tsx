"use client";

import Image from "next/image";
import Logo from "@/public/app_icon.svg";

interface AuthLayoutProps {
  children: React.ReactNode;
  headerTitle: string;
  headerSubtitle: string;
  visualTitle: React.ReactNode;
  visualSubtitle: React.ReactNode;
}

const AuthLayout = ({
  children,
  headerTitle,
  headerSubtitle,
  visualTitle,
  visualSubtitle,
}: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full bg-gray-50 dark:bg-zinc-900">
      {/* Left Side - Brand/Gradient Visual */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center items-center relative bg-gradient-to-br from-[#9cc43b] via-[#7da829] to-[#3d5213] overflow-hidden">
        {/* Abstract Shapes for Glassmorphism feel */}
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-white/20 blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-black/10 blur-[100px]" />

        {/* Abstract Background Logo */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <Image
            src={Logo}
            alt="Abstract Background Logo"
            className="w-[120%] h-[120%] opacity-[0.25] -rotate-[15deg] object-contain cursor-default select-none mix-blend-overlay"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center p-8 max-w-xl">
          <h1 className="text-8xl font-black text-white mb-1 tracking-tight drop-shadow-lg font-sans">
            {visualTitle}
          </h1>
          <p className="text-2xl text-white/90 font-normal leading-relaxed tracking-wide drop-shadow-md">
            Your pocket cooking assistant
          </p>
        </div>
      </div>

      {/* Right Side - Form Container */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 animate-in fade-in duration-500 slide-in-from-bottom-4">
        <div className="w-full max-w-[480px] space-y-8">
          <div className="text-center space-y-2 mb-10">
            <div className="lg:hidden flex justify-center mb-6">
              <div className="w-20 h-20 bg-[#819932]/10 rounded-2xl flex items-center justify-center">
                <Image src={Logo} alt="Yumm AI Logo" width={50} height={50} />
              </div>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white font-sans">
              {headerTitle}
            </h2>
            <p className="text-base text-gray-500 dark:text-gray-400">
              {headerSubtitle}
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-950 p-8 sm:p-10 rounded-3xl border border-gray-200 dark:border-zinc-800">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

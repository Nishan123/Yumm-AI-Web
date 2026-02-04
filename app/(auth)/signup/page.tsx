"use client";
import Image from "next/image";
import Logo from "@/public/app_icon.svg";
import SignupForm from "../_components/signup-form";

const Signup = () => {
  return (
    <div className="flex min-h-screen w-full bg-gray-50 dark:bg-zinc-900">
      {/* Left Side - Brand/Gradient Visual */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center items-center relative bg-gradient-to-br from-[#819932] via-[#607422] to-[#3a490d] overflow-hidden">
        {/* Abstract Shapes for Glassmorphism feel */}
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-white/10 blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-black/10 blur-[100px]" />

        <div className="relative z-10 flex flex-col items-center text-center p-12">
          <div className="w-32 h-32 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-8 shadow-2xl border border-white/20 transition-transform hover:scale-105 duration-500">
            <Image
              src={Logo}
              alt="Yumm AI Logo"
              width={80}
              height={80}
              className="object-contain drop-shadow-lg"
            />
          </div>
          <h1 className="text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-md font-sans">
            Join Yumm AI
          </h1>
          <p className="text-xl text-white/90 max-w-md font-light leading-relaxed tracking-wide">
            Start your culinary adventure today. <br />
            <span className="font-medium text-white">
              Create. Share. Inspire.
            </span>
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
              Create an account
            </h2>
            <p className="text-base text-gray-500 dark:text-gray-400">
              Enter your details to get started
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-950 p-8 sm:p-10 rounded-3xl border border-gray-200 dark:border-zinc-800">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

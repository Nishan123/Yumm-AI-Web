"use client";

import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "@/public/app_icon.svg";
import UserProfileWidget from "./user-profile-widget";

const navItems = [
  { name: "Home", path: "/home" },
  { name: "Every Items", path: "/every-item" },
  { name: "Cook Book", path: "/cook-book" },
  { name: "Saved Recipes", path: "/saved-recipes" },
  { name: "Plans", path: "/plans" },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div
      className={`fixed top-0 w-full z-50 flex flex-col items-center transition-all duration-300 bg-white dark:bg-zinc-950 ${
        isScrolled
          ? "border-b border-gray-100 dark:border-zinc-800 py-2"
          : "py-3 lg:py-6"
      }`}
    >
      <div className="flex justify-between h-12 w-full max-w-[1358px] px-4 lg:px-6 items-center">
        <div className="flex gap-3 lg:gap-5.5 items-center">
          {/* Hamburger button — visible on mobile/tablet only */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div>
            <Image src={Logo} alt={"Yummy AI Logo"} className="h-13" />
          </div>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex gap-5.5 items-center">
            {navItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => router.push(item.path)}
                  className={`${
                    pathname === item.path
                      ? "bg-[#6F8B15] rounded-lg text-white px-3 py-1 flex items-center justify-center whitespace-nowrap"
                      : "hover:text-[#6F8B15] transition-colors whitespace-nowrap"
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <UserProfileWidget />
      </div>

      {/* Mobile/Tablet slide-down menu */}
      <div
        className={`lg:hidden w-full overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-4 pb-4 pt-2 gap-1 border-t border-gray-100 dark:border-zinc-800 mt-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => {
                  router.push(item.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200 text-[15px] font-medium ${
                  pathname === item.path
                    ? "bg-[#6F8B15] text-white"
                    : "hover:bg-gray-50 dark:hover:bg-zinc-800/50 text-gray-700 dark:text-gray-300"
                }`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

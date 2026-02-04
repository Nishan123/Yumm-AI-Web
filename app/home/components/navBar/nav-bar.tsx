"use client";

import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/public/app_icon.svg";
import UserProfileWidget from "./user-profile-widget";

const navItems = [
  { name: "Home", path: "/home" },
  { name: "Every Items", path: "/every-item" },
  { name: "Cook Book", path: "/cook-book" },
  { name: "Saved Recipes", path: "/saved-recipes" },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = React.useState(false);

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

  return (
    <div
      className={`fixed top-0 w-full z-50 flex justify-center transition-all duration-300 bg-white ${
        isScrolled ? "border-b border-gray-100 py-2" : "py-6"
      }`}
    >
      <div className="flex justify-between h-12 w-339.5 items-center">
        <div className="flex gap-5.5 items-center">
          <div>
            <Image src={Logo} alt={"Yummy AI Logo"} className="h-13" />
          </div>
          <ul className="flex gap-5.5 items-center">
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
    </div>
  );
};

export default Navbar;

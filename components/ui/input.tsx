import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  type: string;
  error?: string;
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, type, error, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === "password";
    const inputType = isPasswordType
      ? showPassword
        ? "text"
        : "password"
      : type;

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className={`flex flex-col gap-1 ${className ?? ""}`}>
        <div className="relative w-full h-13.5">
          <input
            ref={ref}
            placeholder={placeholder}
            type={inputType}
            className={`bg-[#EBEBEB] w-full h-full rounded-[40px] flex items-center 
          pl-4 outline-0 font-inter focus:outline-1 ${
            error ? "focus:outline-red-500" : "focus:outline-black"
          }
          focus:bg-[#F8F8F8] transition-all delay-75 ease-in ${
            error ? "border border-red-500" : ""
          } ${isPasswordType ? "pr-12" : ""}`}
            {...props}
          />
          {isPasswordType && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;

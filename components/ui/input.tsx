import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  type: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, type, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <input
          ref={ref}
          placeholder={placeholder}
          type={type}
          className={`bg-[#EBEBEB] w-92.5 h-13.5 rounded-[40px] flex items-center 
          pl-4 outline-0 font-inter focus:outline-1 ${
            error ? "focus:outline-red-500" : "focus:outline-black"
          }
          focus:bg-[#F8F8F8] transition-all delay-75 ease-in ${
            error ? "border border-red-500" : ""
          }`}
          {...props}
        />
        {error && (
          <span className="text-red-500 text-xs px-4 font-inter">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

import React from "react";

interface PasswordInputProps {
  password: string;
  setPassword: (value: string) => void;
  passwordError: string;
  setPasswordError: (value: string) => void;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  setPassword,
  passwordError,
  setPasswordError,
}) => {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-3">
        Enter your password to delete your account.
      </p>
      <div>
        <input
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) setPasswordError("");
          }}
          className={`w-full px-4 py-3 rounded-xl border bg-white text-sm outline-none transition-colors
                        ${
                          passwordError
                            ? "border-red-400 focus:border-red-500"
                            : "border-gray-200 focus:border-gray-400"
                        }`}
        />
        {passwordError && (
          <p className="text-red-500 text-xs mt-1.5 ml-1">{passwordError}</p>
        )}
      </div>
    </div>
  );
};

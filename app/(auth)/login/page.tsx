"use client";
import Image from "next/image";
import Logo from "../../../public/yumm_ai_logo.png";

import LoginForm from "../_components/login-form";

const Login = () => {
  return (
    <div className="flex justify-center w-full items-center h-[calc(100vh-40px)] my-5">
      <div
        className="flex flex-col h-full w-107.5 bg-white pt-8 pr-7.5 pb-8 pl-7.5 
      rounded-[30px] border border-[#666666] gap-10"
      >
        <div className="flex items-center gap-3">
          <div>
            <Image src={Logo} alt="Yumm AI Logo" />
          </div>
          <div className="text-[#819932] font-pop font-bold text-[42px]">
            Yumm AI
          </div>
        </div>
        <div className="flex flex-col gap-2 min-h-19.5">
          <div className="font-pop font-bold text-[36px]">Welcome, Login</div>
          <div className="text-[16px] font-inter">Login To continue.</div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
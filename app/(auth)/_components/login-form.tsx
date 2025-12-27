"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Input from "@/components/ui/input";
import PrimaryBtn from "@/components/ui/primary-btn";
import SecondaryBtn from "@/components/ui/secondary-btn";
import loginSchema from "@/lib/validations/login-schema";

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Email:", data.email);
    console.log("login completed!");
    router.push("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-10 flex-1 py-5"
    >
      <div className="flex flex-col min-h-30.5 gap-5 ">
        <Input
          placeholder={"Email"}
          type={"email"}
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          placeholder={"Password"}
          type={"password"}
          {...register("password")}
          error={errors.password?.message}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4.5">
        <PrimaryBtn buttonName={"Log in"} type="submit" />
        <div className="flex items-center gap-1 w-full">
          <span className="w-full h-px bg-[#1616169a]" />
          <p className="text-[10px]">OR</p>
          <span className="w-full h-px bg-[#1616169a]" />
        </div>
        <SecondaryBtn buttonName={"Login with Google"} />
        <span className="w-full h-px bg-[#1616169a]" />
        <div className="flex gap-2">
          <p>Don’t have an account ?</p>
          <Link href="/signup">
            <button className="relative text-black font-bold cursor-pointer -top-1">
              Create One
              <span className="absolute w-full bottom-0 right-0 bg-black/80 h-px"></span>
            </button>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
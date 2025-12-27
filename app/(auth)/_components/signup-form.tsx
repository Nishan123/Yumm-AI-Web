"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Input from "@/components/ui/input";
import PrimaryBtn from "@/components/ui/primary-btn";
import SecondaryBtn from "@/components/ui/secondary-btn";
import signupSchema from "@/lib/validations/signup-schema";

type SignupFormData = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: SignupFormData) => {
    console.log("Email:", data.email);
    console.log("Signup completed!");
    router.push("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-121.25 flex flex-col gap-10"
    >
      <div className="flex flex-col min-h-50.5 gap-5 ">
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
        <Input
          placeholder={"Confirm Password"}
          type={"password"}
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4.5">
        <PrimaryBtn buttonName={"Sign up"} type="submit" />
        <div className="flex items-center gap-1 w-full">
          <span className="w-full h-px bg-[#1616169a]" />
          <p className="text-[10px]">OR</p>
          <span className="w-full h-px bg-[#1616169a]" />
        </div>
        <SecondaryBtn buttonName={"Sign up with Google"} />
        <span className="w-full h-px bg-[#1616169a]" />
        <div className="flex gap-2">
          <p>Already have an account ?</p>
          <Link href="/login">
            <button className="relative text-black font-bold cursor-pointer -top-1">
              Log in
              <span className="absolute w-full bottom-0 right-0 bg-black/80 h-px"></span>
            </button>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;

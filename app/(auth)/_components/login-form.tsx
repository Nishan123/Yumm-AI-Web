"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useRouter } from "next/navigation";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { AxiosError } from "axios";
import { toast } from "sonner";

import Input from "@/components/ui/input";
import PrimaryBtn from "@/components/ui/primary-btn";
import loginSchema from "@/lib/validations/login-schema";
import { useAuth } from "@/lib/context/auth-context";

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const { login, googleLogin, isLoading: loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onInvalid = (errors: any) => {
    Object.values(errors).forEach((error: any) => {
      if (error.message) {
        toast.error(error.message);
      }
    });
  };

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);

    try {
      await login({
        email: data.email,
        password: data.password,
      });
      router.push("/home");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(
          err.response?.data?.message ||
            "Login failed. Please check your credentials.",
        );
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse,
  ) => {
    try {
      if (credentialResponse.credential) {
        await googleLogin(credentialResponse.credential);
        router.push("/home");
      } else {
        toast.error("Google login failed. No credential received.");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(
          err.response?.data?.message ||
            "Google login failed. Please try again.",
        );
      } else {
        toast.error("Google login failed. Please try again.");
      }
    }
  };

  const handleGoogleError = () => {
    toast.error("Google login was cancelled or failed.");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="flex flex-col items-center gap-10 flex-1 py-5"
    >
      <div className="flex flex-col min-h-30.5 gap-5 w-full max-w-[420px]">
        <Input
          placeholder={"Email"}
          type={"email"}
          {...register("email")}
          error={errors.email?.message}
          className="w-full"
        />
        <Input
          placeholder={"Password"}
          type={"password"}
          {...register("password")}
          error={errors.password?.message}
          className="w-full"
        />
        <div className="flex justify-end -mt-3">
          <button
            type="button"
            onClick={() => router.push("/forgot-password")}
            className="text-xs font-semibold text-gray-500 hover:text-[#819932] transition-colors"
          >
            Forgot Password?
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4.5 w-full max-w-[420px]">
        <PrimaryBtn
          buttonName={"Log in"}
          type="submit"
          loading={isSubmitting}
          className="w-full"
        />
        <div className="flex items-center gap-1 w-full">
          <span className="w-full h-px bg-[#1616169a]" />
          <p className="text-[10px]">OR</p>
          <span className="w-full h-px bg-[#1616169a]" />
        </div>

        <div className="w-full flex justify-center transform scale-110 origin-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="outline"
            size="large"
            width="336px"
            text="signin_with"
            shape="pill"
          />
        </div>

        <span className="w-full h-px bg-[#1616169a]" />
        <div className="flex gap-2">
          <p>Don't have an account ?</p>
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="relative text-black font-bold cursor-pointer -top-1"
          >
            Create One
            <span className="absolute w-full bottom-0 right-0 bg-black/80 h-px"></span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;

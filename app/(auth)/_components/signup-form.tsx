"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useRouter } from "next/navigation";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import Input from "@/components/ui/input";
import PrimaryBtn from "@/components/ui/primary-btn";
import signupSchema from "@/lib/validations/signup-schema";
import { useAuth } from "@/lib/context/auth-context";

type SignupFormData = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const router = useRouter();
  const { signup, googleLogin } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const onInvalid = (errors: any) => {
    Object.values(errors).forEach((error: any) => {
      if (error.message) {
        toast.error(error.message);
      }
    });
  };

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);

    try {
      // Derive fullName from email (part before @)
      const fullName = data.email.split("@")[0];
      await signup({
        uid: uuidv4(),
        fullName: fullName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        allergenicIngredients: [],
        authProvider: "email",
        profilePic: "",
      });
      router.push("/home");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(
          err.response?.data?.message || "Signup failed. Please try again.",
        );
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
        // For ID Token flow, we pass the credential directly to the backend
        await googleLogin(credentialResponse.credential);
        router.push("/home");
      } else {
        toast.error("Google signup failed. No credential received.");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(
          err.response?.data?.message ||
            "Google signup failed. Please try again.",
        );
      } else {
        toast.error("Google signup failed. Please try again.");
      }
    }
  };

  const handleGoogleError = () => {
    toast.error("Google signup was cancelled or failed.");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="min-h-121.25 flex flex-col gap-10"
    >
      <div className="flex flex-col min-h-50.5 gap-5">
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
        <PrimaryBtn
          buttonName={"Sign up"}
          type="submit"
          loading={isSubmitting}
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
            text="signup_with"
            shape="pill"
          />
        </div>

        <span className="w-full h-px bg-[#1616169a]" />
        <div className="flex gap-2">
          <p>Already have an account ?</p>
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="relative text-black font-bold cursor-pointer -top-1"
          >
            Log in
            <span className="absolute w-full bottom-0 right-0 bg-black/80 h-px"></span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;

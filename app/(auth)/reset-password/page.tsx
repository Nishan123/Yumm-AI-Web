"use client";

import { Suspense } from "react";
import AuthLayout from "../_components/auth-layout";
import ResetPasswordForm from "../_components/reset-password-form";

const ResetPassword = () => {
  return (
    <AuthLayout
      visualTitle="Yumm AI"
      visualSubtitle={
        <>
          Ready to cook again? <br />
          <span className="font-medium text-white">Set your new password.</span>
        </>
      }
      headerTitle="Reset Password"
      headerSubtitle="Create a new password for your account"
    >
      <Suspense
        fallback={
          <div className="flex justify-center items-center p-8">Loading...</div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </AuthLayout>
  );
};

export default ResetPassword;

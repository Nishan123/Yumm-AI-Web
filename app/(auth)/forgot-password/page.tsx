"use client";

import AuthLayout from "../_components/auth-layout";
import ForgotPasswordForm from "../_components/forgot-password-form";

const ForgotPassword = () => {
  return (
    <AuthLayout
      visualTitle="Yumm AI"
      visualSubtitle={
        <>
          Don&apos;t worry, even master chefs <br />
          <span className="font-medium text-white">
            forget things sometimes.
          </span>
        </>
      }
      headerTitle="Forgot Password?"
      headerSubtitle="Enter your email to receive a password reset link"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPassword;

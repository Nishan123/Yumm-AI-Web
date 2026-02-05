"use client";
import AuthLayout from "../_components/auth-layout";
import SignupForm from "../_components/signup-form";

const Signup = () => {
  return (
    <AuthLayout
      visualTitle="Join Yumm AI"
      visualSubtitle={
        <>
          Start your culinary adventure today. <br />
          <span className="font-medium text-white">
            Create. Share. Inspire.
          </span>
        </>
      }
      headerTitle="Create an account"
      headerSubtitle="Enter your details to get started"
    >
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;

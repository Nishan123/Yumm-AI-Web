"use client";
import AuthLayout from "../_components/auth-layout";
import LoginForm from "../_components/login-form";

const Login = () => {
  return (
    <AuthLayout
      visualTitle="Yumm AI"
      visualSubtitle={
        <>
          Your intelligent culinary companion. <br />
          <span className="font-medium text-white">Discover. Cook. Enjoy.</span>
        </>
      }
      headerTitle="Welcome to Yumm"
      headerSubtitle="Please sign in to continue your journey"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;

import React from "react";
import { useSession } from "@/store/session.store";
import { Navigate } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
}
export default function AuthLayout({ children }: AuthLayoutProps) {
  const { user } = useSession();
  if (user?.id) {
    return <Navigate to="/admin" replace />;
  }
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="mb-6 flex w-full items-center justify-center">
          <img
            src="/images/amce_logo.png"
            alt="Logo"
            className="h-20 w-auto md:h-12 lg:h-16"
          />
        </div>
        <div className="flex flex-col gap-6">
          {children}
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}

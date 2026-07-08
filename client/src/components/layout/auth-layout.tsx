import React from "react";
import { useSession } from "@/store/session.store";
import { Link, Navigate } from "react-router-dom";
import { Terminal, Check } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const HIGHLIGHTS = [
  "React 19, Tailwind v4 & shadcn/ui",
  "Type-safe end to end with Prisma & Zod",
  "JWT auth with roles and protected routes",
  "Compact, enterprise-grade UI system",
];

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { user } = useSession();
  if (user?.id) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left — form */}
      <div className="flex flex-col gap-6 p-6 md:p-10">
        <div className="flex justify-center lg:justify-start">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Terminal className="h-4 w-4" />
            </span>
            <span className="text-base tracking-tight">Acme Inc</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            {children}
            <p className="mt-6 text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-foreground">
              By continuing, you agree to our{" "}
              <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Right — branded panel */}
      <div className="relative hidden overflow-hidden bg-primary text-primary-foreground lg:block">
        {/* Decorative pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "white" }}
        />

        <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/70">
              Acme Platform
            </p>
            <h2 className="mt-4 max-w-md text-3xl font-bold leading-tight tracking-tight xl:text-4xl">
              Build faster on an enterprise-ready foundation.
            </h2>
            <p className="mt-4 max-w-md text-sm text-primary-foreground/80">
              A modern React + Node starter with authentication, a compact admin
              dashboard, and a design system that scales with your team.
            </p>
          </div>

          {/* Image */}
          <div className="my-8 flex justify-center">
            <div className="w-full max-w-sm rounded-xl border border-primary-foreground/15 bg-primary-foreground/10 p-6 backdrop-blur">
              <img
                src="/images/login_side_img.svg"
                alt="Product illustration"
                className="mx-auto h-44 w-auto"
              />
            </div>
          </div>

          {/* Highlights */}
          <ul className="space-y-3">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-primary-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

import {
  Github,
  Code2,
  Package,
  Zap,
  ShieldCheck,
  Moon,
  GitBranch,
  Download,
  ArrowRight,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

const REPO_URL = "https://github.com/ankitarima/stater-template-nodejs-react";

const FEATURES = [
  {
    icon: Zap,
    title: "TypeScript First",
    description:
      "Strict TypeScript across client and server for type safety and a better DX.",
  },
  {
    icon: Package,
    title: "Modern Stack",
    description:
      "React 19, Vite, Tailwind v4, shadcn/ui, Express 5 and Prisma pre-wired.",
  },
  {
    icon: ShieldCheck,
    title: "Auth Ready",
    description:
      "JWT auth with login and registration flows and protected admin routes.",
  },
  {
    icon: Moon,
    title: "Dark Mode",
    description:
      "System-aware theming with a token-driven design system out of the box.",
  },
  {
    icon: Code2,
    title: "Best Practices",
    description:
      "Opinionated folder structure, ESLint, and reusable component patterns.",
  },
  {
    icon: GitBranch,
    title: "CI/CD Ready",
    description:
      "GitHub Actions workflows for continuous integration and deployment.",
  },
];

const PRODUCTIVITY = [
  "Pre-configured build tools",
  "Component library structure",
  "Routing & state patterns",
  "Enterprise UI system",
];

const PRACTICES = [
  "Strict TypeScript config",
  "Accessible components",
  "Performance optimizations",
  "Consistent theming",
];

const STEPS = [
  { label: "Clone the repository", code: `git clone ${REPO_URL}.git` },
  { label: "Install dependencies", code: "cd client && npm install" },
  { label: "Start the dev server", code: "npm run dev" },
];

const APP_SNIPPET = `import { ThemeProvider } from "@/components/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { Router } from "@/Router";

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </ThemeProvider>
  );
}`;

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, var(--primary) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="mx-auto max-w-screen-xl px-4 pb-16 pt-28 text-center md:pb-24 md:pt-36">
          <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            v1.0.0 — React 19 · Tailwind v4 · Express 5
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            The enterprise React + Node{" "}
            <span className="text-primary">TypeScript</span> starter
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            A modern, opinionated foundation for building scalable applications
            with a Node.js backend, TypeScript, and a compact enterprise UI
            system baked in.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link to="#get-started">
                <Download className="h-4 w-4" />
                Get Started
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </Button>
          </div>

          {/* Code preview */}
          <div className="mx-auto mt-14 max-w-2xl overflow-hidden rounded-lg border border-border bg-card text-left shadow-sm">
            <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-chart-4/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-chart-2/70" />
              <span className="ml-2 text-xs text-muted-foreground">App.tsx</span>
            </div>
            <pre className="overflow-x-auto p-4 text-xs leading-relaxed">
              <code className="text-muted-foreground">{APP_SNIPPET}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-b border-border/60 py-16 md:py-20">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Everything you need to ship
            </h2>
            <p className="mt-3 text-muted-foreground">
              Batteries included, without the configuration headaches.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/40"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Use */}
      <section id="why-use" className="border-b border-border/60 bg-muted/30 py-16 md:py-20">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Why use this starter?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Save time and avoid common pitfalls when starting a new project.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl gap-8 md:grid-cols-2">
            {[
              { n: "01", title: "Productivity boost", items: PRODUCTIVITY },
              { n: "02", title: "Best practices built-in", items: PRACTICES },
            ].map((col) => (
              <div key={col.n} className="rounded-lg border border-border bg-card p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <span className="text-primary">{col.n}.</span> {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source */}
      <section id="opensource" className="border-b border-border/60 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="rounded-lg border border-border bg-card p-6 md:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Github className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold">Free & open source</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Completely free for personal and commercial projects under the
                  MIT license. Contribute, report issues, or suggest features.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["MIT License", "Regular Updates", "Community Support"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
                <Button asChild variant="outline" size="sm" className="mt-5 gap-2">
                  <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    Star on GitHub
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started */}
      <section id="get-started" className="border-b border-border/60 bg-muted/30 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Get started in seconds
            </h2>
            <p className="mt-3 text-muted-foreground">
              Clone the repository and start building right away.
            </p>
          </div>
          <div className="mt-8 space-y-3">
            {STEPS.map((step, i) => (
              <div
                key={step.label}
                className="overflow-hidden rounded-lg border border-border bg-card"
              >
                <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2 text-xs text-muted-foreground">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/15 text-[10px] font-semibold text-primary">
                    {i + 1}
                  </span>
                  {step.label}
                </div>
                <pre className="overflow-x-auto px-4 py-3 text-xs">
                  <code className="text-muted-foreground">{step.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-8 text-center md:p-12">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Ready to build something great?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Start your next project on a solid, enterprise-ready foundation.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link to="/auth/register">
                  Create an account
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

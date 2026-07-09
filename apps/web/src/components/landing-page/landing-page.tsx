import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import {
  Github,
  Check,
  Boxes,
  Zap,
  ShieldCheck,
  Lock,
  Database,
  Palette,
  FolderTree,
  Server,
  Component,
  Wrench,
  Terminal,
  Rocket,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { Reveal } from "./reveal";
import { CopyButton } from "./copy-button";

const REPO_URL = "https://github.com/ankitarima/stater-template-nodejs-react";

/* ------------------------------------------------------------------ data */

const FEATURES = [
  {
    icon: Zap,
    title: "Turborepo caching",
    description:
      "Task pipelines with incremental, content-hashed caching. Only rebuild what actually changed.",
  },
  {
    icon: Palette,
    title: "Shared design system",
    description:
      "A single @workspace/ui package — shadcn components + a Tailwind v4 theme every app inherits.",
  },
  {
    icon: ShieldCheck,
    title: "Type-safe end to end",
    description:
      "Strict TypeScript across web and api, with Zod validation on both the client and the server.",
  },
  {
    icon: Lock,
    title: "Auth built in",
    description:
      "JWT (RS256) auth with login, registration, password reset, and protected admin routes.",
  },
  {
    icon: Database,
    title: "Prisma 7 + MySQL",
    description:
      "Rust-free Prisma with the driver-adapter setup, ready for db push and migrations.",
  },
  {
    icon: Boxes,
    title: "Scales to many apps",
    description:
      "Drop new apps and microsites under apps/* — they share the UI, config, and tooling instantly.",
  },
];

const STACK = [
  "React 19",
  "Tailwind v4",
  "Vite 6",
  "Express 5",
  "Prisma 7",
  "Turborepo",
  "shadcn/ui",
  "TypeScript",
  "Zod 4",
  "TanStack Query",
  "React Router 7",
  "npm workspaces",
];

type ArchNode = {
  id: string;
  path: string;
  label: string;
  kind: "app" | "package";
  icon: typeof Server;
  description: string;
  tags: string[];
};

const ARCH_NODES: ArchNode[] = [
  {
    id: "web",
    path: "apps/web",
    label: "web",
    kind: "app",
    icon: Component,
    description:
      "The React 19 single-page app — landing page, authentication flows, and a compact enterprise admin dashboard. Built with Vite and styled entirely from the shared UI package.",
    tags: ["React 19", "Vite", "Tailwind v4", "React Router"],
  },
  {
    id: "api",
    path: "apps/api",
    label: "api",
    kind: "app",
    icon: Server,
    description:
      "The Express 5 REST API. JWT auth, bcrypt hashing, Zod validation, and Prisma 7 over MySQL through the driver adapter. Serves /api/v1 with a clean controller/route structure.",
    tags: ["Express 5", "Prisma 7", "JWT", "Zod 4"],
  },
  {
    id: "ui",
    path: "packages/ui",
    label: "ui",
    kind: "package",
    icon: Palette,
    description:
      "@workspace/ui — the shared design system. shadcn/ui components, the cn() helper, hooks, and the Tailwind v4 theme (globals.css). Consumed as source, so every app gets full HMR.",
    tags: ["shadcn/ui", "Radix", "theme tokens", "HMR"],
  },
  {
    id: "eslint",
    path: "packages/eslint-config",
    label: "eslint-config",
    kind: "package",
    icon: Wrench,
    description:
      "@workspace/eslint-config — a shared flat ESLint configuration (base + React) so every app and package lints against the exact same rules.",
    tags: ["ESLint", "flat config", "shared"],
  },
  {
    id: "tsconfig",
    path: "packages/typescript-config",
    label: "typescript-config",
    kind: "package",
    icon: Wrench,
    description:
      "@workspace/typescript-config — shared tsconfig bases (Vite app, React library, Node app) so TypeScript settings stay consistent everywhere.",
    tags: ["tsconfig", "bases", "shared"],
  },
];

const STATS = [
  { to: 5, suffix: "", label: "Workspaces" },
  { to: 56, suffix: "", label: "UI components" },
  { to: 10, suffix: "×", label: "Faster rebuilds" },
  { to: 100, suffix: "%", label: "TypeScript" },
];

const STEPS = [
  { label: "Clone the repository", code: `git clone ${REPO_URL}.git` },
  { label: "Install every workspace", code: "npm install" },
  { label: "Run web + api together", code: "npm run dev" },
];

/* ------------------------------------------------------- small components */

function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      onMouseMove={onMove}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(280px circle at var(--x) var(--y), color-mix(in oklch, var(--primary) 16%, transparent), transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

function Counter({ to, suffix, duration = 1400 }: { to: number; suffix: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(eased * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div
      className="relative overflow-hidden py-2"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="flex w-max items-center gap-3 animate-marquee">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="whitespace-nowrap rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ArchitectureExplorer() {
  const [selected, setSelected] = useState<ArchNode>(ARCH_NODES[0]!);
  const groups = [
    { name: "apps", nodes: ARCH_NODES.filter((n) => n.kind === "app") },
    { name: "packages", nodes: ARCH_NODES.filter((n) => n.kind === "package") },
  ];

  return (
    <div className="grid gap-4 rounded-2xl border border-border bg-card/60 p-3 backdrop-blur md:grid-cols-5 md:p-4">
      {/* File tree */}
      <div className="rounded-xl border border-border bg-background/60 p-3 font-mono text-sm md:col-span-2">
        <div className="mb-2 flex items-center gap-2 px-1 text-xs text-muted-foreground">
          <FolderTree className="h-3.5 w-3.5" />
          starter-monorepo
        </div>
        {groups.map((group) => (
          <div key={group.name} className="mb-1">
            <div className="flex items-center gap-1.5 px-1 py-1 text-muted-foreground">
              <FolderTree className="h-3.5 w-3.5 text-primary/70" />
              {group.name}/
            </div>
            <div className="ml-3 border-l border-border pl-2">
              {group.nodes.map((node) => {
                const active = selected.id === node.id;
                const Icon = node.icon;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setSelected(node)}
                    className={cn(
                      "flex w-full items-center gap-1.5 rounded-md px-2 py-1 text-left transition-colors",
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    {node.label}/
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        <div className="mt-1 space-y-0.5 px-1 text-xs text-muted-foreground/70">
          <div>turbo.json</div>
          <div>package.json</div>
        </div>
      </div>

      {/* Details */}
      <div className="relative overflow-hidden rounded-xl border border-border bg-background/60 p-5 md:col-span-3">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl"
          aria-hidden
        />
        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <selected.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-mono text-sm font-medium">{selected.path}</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {selected.kind === "app" ? "Application" : "Shared package"}
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {selected.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {selected.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-card px-2.5 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- sections */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ===================== Hero ===================== */}
      <section
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
          e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
        }}
        className="group relative overflow-hidden"
      >
        {/* animated background */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-indigo-500/10 to-cyan-400/10" />
          <div className="absolute left-1/2 top-[-12%] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[130px] animate-aurora" />
          <div className="absolute right-[4%] top-[18%] h-72 w-72 rounded-full bg-indigo-500/20 blur-[110px] animate-float-slow" />
          <div className="absolute left-[6%] top-[42%] h-64 w-64 rounded-full bg-cyan-400/20 blur-[110px] animate-float" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, color-mix(in oklch, var(--foreground) 7%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 7%, transparent) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              maskImage:
                "radial-gradient(ellipse 75% 80% at 50% 45%, black, transparent)",
              WebkitMaskImage:
                "radial-gradient(ellipse 75% 80% at 50% 45%, black, transparent)",
            }}
          />
          {/* cursor spotlight — matches the CTA band */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(600px circle at var(--x) var(--y), color-mix(in oklch, var(--primary) 14%, transparent), transparent 60%)",
            }}
          />
        </div>
        {/* bottom shimmer line — matches the CTA band */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="mx-auto max-w-6xl px-4 pb-16 pt-36 md:pb-24 md:pt-44">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* copy */}
            <div>
              <Reveal>
                <a
                  href="#architecture"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Turborepo · npm workspaces · shared UI
                </a>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
                  Ship products from{" "}
                  <span
                    className="bg-gradient-to-r from-primary via-indigo-500 to-cyan-400 bg-clip-text text-transparent animate-gradient"
                    style={{ backgroundSize: "200% auto" }}
                  >
                    one monorepo
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
                  A modern React + Node starter, restructured as a Turborepo. Apps
                  share a design system, config, and tooling — so new dashboards and
                  landing sites take minutes, not days.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="gap-2 bg-gradient-to-r from-primary to-indigo-500 shadow-md shadow-primary/30 transition-shadow hover:shadow-lg hover:shadow-primary/40"
                  >
                    <Link to="/auth/register">
                      <Rocket className="h-4 w-4" />
                      Try it
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="gap-2">
                    <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      View on GitHub
                    </a>
                  </Button>
                </div>
              </Reveal>
              <Reveal delay={320}>
                <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                  {["React 19", "Tailwind v4", "Express 5", "Prisma 7"].map((t) => (
                    <span key={t} className="inline-flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-primary" />
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* floating monorepo tree card */}
            <Reveal delay={200} className="hidden lg:block">
              <div className="relative animate-float">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 to-indigo-500/10 blur-2xl" />
                <div className="relative overflow-hidden rounded-xl border border-border bg-card/90 shadow-2xl backdrop-blur">
                  <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-chart-4/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-chart-2/70" />
                    <span className="ml-2 font-mono text-xs text-muted-foreground">
                      starter-monorepo
                    </span>
                  </div>
                  <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
                    <code>
                      <span className="text-muted-foreground">.</span>
                      {"\n"}
                      <span className="text-primary">├─ apps/</span>
                      {"\n"}
                      <span className="text-muted-foreground">│  ├─ </span>
                      <span className="text-foreground">web/</span>
                      <span className="text-muted-foreground">      React 19 · Vite</span>
                      {"\n"}
                      <span className="text-muted-foreground">│  └─ </span>
                      <span className="text-foreground">api/</span>
                      <span className="text-muted-foreground">      Express · Prisma</span>
                      {"\n"}
                      <span className="text-indigo-400">├─ packages/</span>
                      {"\n"}
                      <span className="text-muted-foreground">│  ├─ </span>
                      <span className="text-foreground">ui/</span>
                      <span className="text-muted-foreground">       @workspace/ui</span>
                      {"\n"}
                      <span className="text-muted-foreground">│  ├─ </span>
                      <span className="text-foreground">eslint-config/</span>
                      {"\n"}
                      <span className="text-muted-foreground">│  └─ </span>
                      <span className="text-foreground">typescript-config/</span>
                      {"\n"}
                      <span className="text-muted-foreground">├─ turbo.json</span>
                      {"\n"}
                      <span className="text-muted-foreground">└─ package.json</span>
                    </code>
                  </pre>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== Stack marquee ===================== */}
      <section id="stack" className="border-y border-border/60 bg-muted/30 py-6">
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Powered by a modern, fully-typed stack
          </p>
          <Marquee items={STACK} />
        </div>
      </section>

      {/* ===================== Features ===================== */}
      <section id="features" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Everything wired, nothing in your way
            </h2>
            <p className="mt-3 text-muted-foreground">
              Batteries included across the whole workspace — from caching to auth.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, description }, i) => (
              <Reveal key={title} delay={i * 60}>
                <SpotlightCard className="h-full">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-indigo-500/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-semibold">{title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== Architecture ===================== */}
      <section id="architecture" className="border-t border-border/60 bg-muted/30 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Boxes className="h-3.5 w-3.5 text-primary" />
              Monorepo architecture
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Explore the workspace
            </h2>
            <p className="mt-3 text-muted-foreground">
              Two apps, three shared packages, one Turborepo pipeline. Click a folder to
              see what lives inside.
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <ArchitectureExplorer />
          </Reveal>

          {/* stats */}
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80}>
                <div className="rounded-xl border border-border bg-card p-5 text-center">
                  <div className="bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-3xl font-bold tabular-nums text-transparent">
                    <Counter to={stat.to} suffix={stat.suffix} />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== Get Started ===================== */}
      <section id="get-started" className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4">
          <Reveal className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Up and running in three commands
            </h2>
            <p className="mt-3 text-muted-foreground">
              Clone it, install once, and Turborepo starts every app together.
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-8">
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              {STEPS.map((step, i) => (
                <div
                  key={step.label}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3",
                    i !== 0 && "border-t border-border"
                  )}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">{step.label}</p>
                    <code className="block truncate font-mono text-sm">
                      <span className="text-primary">$</span> {step.code}
                    </code>
                  </div>
                  <CopyButton value={step.code} />
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={200} className="mt-6 flex justify-center">
            <Button asChild variant="outline" className="gap-2">
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                <Terminal className="h-4 w-4" />
                Read the docs
              </a>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ===================== CTA (full-bleed, interactive) ===================== */}
      <section
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
          e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
        }}
        className="group relative isolate overflow-hidden border-t border-primary/20 py-24 md:py-36"
      >
        {/* top shimmer line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        {/* gradient wash */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-indigo-500/10 to-cyan-400/10" />
        {/* grid */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklch, var(--foreground) 6%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 6%, transparent) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)",
          }}
        />
        {/* floating orbs */}
        <div className="pointer-events-none absolute left-[14%] top-[12%] -z-10 h-64 w-64 rounded-full bg-primary/25 blur-[110px] animate-float" />
        <div className="pointer-events-none absolute bottom-[6%] right-[12%] -z-10 h-72 w-72 rounded-full bg-indigo-500/20 blur-[120px] animate-float-slow" />
        {/* cursor spotlight */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(520px circle at var(--x) var(--y), color-mix(in oklch, var(--primary) 14%, transparent), transparent 60%)",
          }}
        />

        <div className="mx-auto max-w-3xl px-4 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Ready when you are
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Build your next big thing
              <br />
              in{" "}
              <span
                className="bg-gradient-to-r from-primary via-indigo-500 to-cyan-400 bg-clip-text text-transparent animate-gradient"
                style={{ backgroundSize: "200% auto" }}
              >
                one monorepo
              </span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
              A shared design system, type-safe APIs, and Turborepo tooling — with room for
              every dashboard, landing page, and microsite you'll add next.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="gap-2 bg-gradient-to-r from-primary to-indigo-500 shadow-lg shadow-primary/30 transition-transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40"
              >
                <Link to="/auth/register">
                  <Rocket className="h-4 w-4" />
                  Try it now
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2 bg-card/50 backdrop-blur transition-transform hover:-translate-y-0.5"
              >
                <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  Star on GitHub
                </a>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              {["MIT licensed", "No config needed", "Deploy anywhere"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-primary" />
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

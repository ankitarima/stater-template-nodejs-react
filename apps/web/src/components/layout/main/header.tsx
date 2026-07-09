import { useEffect, useState } from "react";
import { Github, Menu, X, ArrowRight, Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@workspace/ui/components/button";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@workspace/ui/lib/utils";

const REPO_URL = "https://github.com/ankitarima/stater-template-nodejs-react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Architecture", href: "#architecture" },
  { label: "Stack", href: "#stack" },
  { label: "Quickstart", href: "#get-started" },
];

function LogoMark() {
  return (
    <span className="relative grid h-8 w-8 grid-cols-2 gap-0.5 rounded-lg bg-gradient-to-br from-primary to-indigo-500 p-1.5 shadow-sm shadow-primary/30">
      <span className="rounded-[2px] bg-primary-foreground/90" />
      <span className="rounded-[2px] bg-primary-foreground/50" />
      <span className="rounded-[2px] bg-primary-foreground/50" />
      <span className="animate-pulse rounded-[2px] bg-primary-foreground/90" />
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Announcement bar */}
      <div className="flex items-center justify-center gap-2 border-b border-primary/15 bg-primary/10 px-4 py-1.5 text-xs backdrop-blur-xl">
        <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 font-semibold text-primary-foreground">
          <Sparkles className="h-3 w-3" />
          New
        </span>
        <span className="text-muted-foreground">
          Now a Turborepo monorepo with a shared UI package
        </span>
        <a
          href="#architecture"
          className="hidden items-center gap-0.5 font-medium text-foreground hover:underline sm:inline-flex"
        >
          Explore <ArrowRight className="h-3 w-3" />
        </a>
      </div>

      {/* Nav */}
      <nav
        className={cn(
          "border-b bg-background/85 backdrop-blur-xl transition-all duration-300",
          scrolled ? "border-border/60 shadow-sm" : "border-transparent"
        )}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="group flex items-center gap-2">
            <LogoMark />
            <span className="text-sm font-semibold tracking-tight">
              Starter<span className="text-primary">Kit</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                  <span className="absolute inset-x-3 -bottom-px h-px scale-x-0 bg-gradient-to-r from-primary to-indigo-500 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="hidden gap-1.5 lg:inline-flex"
            >
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                <Star className="h-3.5 w-3.5" />
                Star
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="hidden sm:inline-flex">
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <ModeToggle className="hidden sm:inline-flex" />
            <Button
              asChild
              size="sm"
              className="hidden gap-1.5 bg-gradient-to-r from-primary to-indigo-500 shadow-sm shadow-primary/30 transition-shadow hover:shadow-md hover:shadow-primary/40 sm:inline-flex"
            >
              <Link to="/auth/register">
                Try it <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={cn("border-t border-border/60 md:hidden", open ? "block" : "hidden")}>
          <ul className="space-y-1 bg-background/95 px-4 py-3 backdrop-blur">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-2 pt-2">
              <Button asChild size="sm" className="flex-1">
                <Link to="/auth/register" onClick={() => setOpen(false)}>
                  Try it
                </Link>
              </Button>
              <ModeToggle />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

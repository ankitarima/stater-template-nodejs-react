import { useState } from "react";
import { Github, Terminal, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

const REPO_URL = "https://github.com/ankitarima/stater-template-nodejs-react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Why Use", href: "#why-use" },
  { label: "Open Source", href: "#opensource" },
  { label: "Get Started", href: "#get-started" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Terminal className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold tracking-tight">
            TS React+Node
          </span>
        </Link>

        <ul className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <ModeToggle className="hidden sm:inline-flex" />
          <Button asChild variant="ghost" size="icon" className="hidden sm:inline-flex">
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/auth/login">Sign in</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </nav>

      <div
        className={cn(
          "border-t border-border/60 lg:hidden",
          open ? "block" : "hidden"
        )}
      >
        <ul className="space-y-1 px-4 py-3">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="flex items-center gap-2 pt-2">
            <Button asChild size="sm" className="flex-1">
              <Link to="/auth/login" onClick={() => setOpen(false)}>
                Sign in
              </Link>
            </Button>
            <ModeToggle />
          </li>
        </ul>
      </div>
    </header>
  );
}

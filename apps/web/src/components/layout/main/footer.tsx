import { Terminal, Github } from "lucide-react";
import { Link } from "react-router-dom";

const REPO_URL = "https://github.com/ankitarima/stater-template-nodejs-react";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "Why Use", href: "#why-use" },
  { label: "Open Source", href: "#opensource" },
  { label: "Get Started", href: "#get-started" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background py-10">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Terminal className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold">TS React+Node Starter</span>
          </Link>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </nav>
        </div>
        <div className="mt-8 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} TS React+Node Starter. Released under
            the MIT License.
          </p>
          <p className="mt-1">
            Made with{" "}
            <span role="img" aria-label="love">
              ❤️
            </span>{" "}
            by{" "}
            <a
              href="https://github.com/ankitarima"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              ankitarima
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

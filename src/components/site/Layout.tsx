import { Link, useLocation } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import logo from "@/assets/indos-logo.png";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/features", label: "Features" },
  { to: "/security", label: "Security" },
  { to: "/download", label: "Download" },
  { to: "/docs", label: "Docs" },
  { to: "/troubleshooting", label: "Help" },
  { to: "/press", label: "Press" },
  { to: "/community", label: "Community" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="h-1 bg-tricolor" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logo} alt="IndOS" width={36} height={36} className="w-9 h-9" />
            <span className="font-display text-xl font-semibold tracking-tight">
              Ind<span className="text-accent">OS</span>
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((n) => {
              const active = loc.pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                    active ? "text-accent" : "text-foreground/75 hover:text-foreground"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://github.com/iiamankumar/indos-india-s-secure-os"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-foreground/75 hover:text-foreground"
            >
              GitHub
            </a>
            <Link
              to="/download"
              className="px-4 py-2 rounded-md bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition"
            >
              Download
            </Link>
          </div>
          <button
            className="lg:hidden p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {open && (
          <div className="lg:hidden border-t border-border bg-background">
            <div className="px-5 py-3 flex flex-col gap-1">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 rounded-md text-sm font-medium hover:bg-muted"
                >
                  {n.label}
                </Link>
              ))}
              <Link
                to="/download"
                onClick={() => setOpen(false)}
                className="mt-2 px-4 py-2.5 rounded-md bg-accent text-accent-foreground text-center text-sm font-semibold"
              >
                Download ISO
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-24 border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src={logo} alt="" width={28} height={28} className="w-7 h-7" />
              <span className="font-display text-lg font-semibold">IndOS</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A free, secure, Ubuntu LTS–based operating system, built in India for India.
            </p>
          </div>
          <FooterCol title="Product" links={[
            ["Features", "/features"],
            ["Download", "/download"],
            ["System Requirements", "/download"],
            ["Roadmap", "/community"],
          ]} />
          <FooterCol title="Resources" links={[
            ["Documentation", "/docs"],
            ["Install Guide", "/docs"],
            ["Language Packs", "/features"],
            ["Report a bug", "/contact"],
          ]} />
          <div>
            <h4 className="font-semibold text-sm mb-3">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a className="text-muted-foreground hover:text-accent" href="https://github.com/iiamankumar/indos-india-s-secure-os" target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a className="text-muted-foreground hover:text-accent" href="https://t.me/" target="_blank" rel="noreferrer">Telegram</a></li>
              <li><Link className="text-muted-foreground hover:text-accent" to="/community">Community Forum</Link></li>
              <li><Link className="text-muted-foreground hover:text-accent" to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} IndOS Project</p>
            <p className="flex items-center gap-3">
              <span className="font-semibold text-foreground">IndOS</span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-[oklch(0.74_0.17_50)]" />
                <span className="inline-block w-2 h-2 rounded-full bg-white border border-border" />
                <span className="inline-block w-2 h-2 rounded-full bg-[oklch(0.5_0.13_150)]" />
              </span>
              <span>Made in Bharat</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="font-semibold text-sm mb-3">{title}</h4>
      <ul className="space-y-2 text-sm">
        {links.map(([label, to]) => (
          <li key={to + label}>
            <Link to={to} className="text-muted-foreground hover:text-accent">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Download, Copy } from "lucide-react";
import logo from "@/assets/indos-logo.png";
import desktop from "@/assets/indos-desktop.jpg";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "Press Kit — IndOS" },
      { name: "description", content: "Logos, brand colors, screenshots, boilerplate copy and media contacts for IndOS. Everything press, partners and contributors need." },
      { property: "og:title", content: "IndOS Press Kit" },
      { property: "og:description", content: "Logos, colors, screenshots and boilerplate copy for IndOS." },
      { property: "og:url", content: "/press" },
    ],
    links: [{ rel: "canonical", href: "/press" }],
  }),
  component: PressKit,
});

const SHORT_BOILERPLATE = `IndOS is a free, secure, Ubuntu LTS–based desktop operating system, built in India for the world. It ships with 22 Indian languages, on-device AI, India-Stack integrations (UPI, DigiLocker, Aarogya Setu), full-disk encryption and zero telemetry — and runs on hardware as old as a 2-GB-RAM laptop. IndOS is 100% open source under GPL v3.`;

const LONG_BOILERPLATE = `IndOS is a free and open-source desktop operating system based on Ubuntu LTS, designed to bring a modern, secure and private computing experience to every Indian — students, schools, governments, small businesses and homes. Released as version 1.0 “Bharat” on 18 May 2026, IndOS ships in two editions: a polished GNOME edition for newer hardware and a featherweight XFCE edition that flies on 2-GB-RAM machines.

Out of the box, IndOS includes 22 Indian languages, the Ollama AI runtime with TinyLlama for fully offline AI, and curated integrations for UPI, DigiLocker and Aarogya Setu. Security is built in from the kernel up: full-disk encryption with LUKS2, mandatory access control with AppArmor, a default-deny firewall, signed reproducible builds, SBOM and SLSA build attestations, and zero telemetry of any kind.

IndOS is released under GPL v3 and developed in the open at github.com/iiamankumar/indos-india-s-secure-os.`;

const COLORS = [
  { name: "Saffron", hex: "#E8853A", token: "--saffron", role: "Primary accent" },
  { name: "Cream", hex: "#FCF8EE", token: "--cream", role: "Background" },
  { name: "India Green", hex: "#3F8A56", token: "--india-green", role: "Success / nature" },
  { name: "Navy", hex: "#1F2A4A", token: "--navy", role: "Foreground / text" },
];

function PressKit() {
  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-10">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Press kit</p>
        <h1 className="font-display text-5xl sm:text-6xl font-semibold tracking-tight">Media & brand assets</h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
          Everything press, partners and contributors need to write about IndOS: logos, colors, screenshots and ready-to-paste boilerplate. Free to use, attribution appreciated.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/press/indos-press-kit.zip" download className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-saffron-gradient text-accent-foreground font-semibold shadow-saffron hover:opacity-95">
            <Download size={16} /> Download full kit (.zip)
          </a>
          <a href="mailto:press@indos.org" className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-border bg-card font-semibold hover:bg-muted">
            press@indos.org
          </a>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
        <h2 className="text-2xl font-semibold mb-5">Logos</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <LogoTile bg="bg-card" border title="Primary · light" src={logo} download="indos-logo.png" />
          <LogoTile bg="bg-foreground" title="Primary · dark" src={logo} download="indos-logo.png" />
          <LogoTile bg="bg-tricolor" title="On tricolor" src={logo} download="indos-logo.png" />
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Maintain at least 16 px clear space around the logo. Don’t rotate, recolor or add effects.
          Vector source: <a className="text-accent hover:underline" href="https://github.com/iiamankumar/indos-india-s-secure-os/tree/main/brand" target="_blank" rel="noreferrer">/brand on GitHub</a>.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
        <h2 className="text-2xl font-semibold mb-5">Brand colors</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {COLORS.map((c) => (
            <div key={c.name} className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="h-28" style={{ background: c.hex }} aria-hidden />
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{c.name}</h3>
                  <CopyButton value={c.hex} />
                </div>
                <p className="font-mono text-xs text-muted-foreground mt-1">{c.hex}</p>
                <p className="text-xs text-muted-foreground mt-2">{c.role}</p>
                <p className="font-mono text-[11px] text-muted-foreground/80 mt-1">{c.token}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
        <h2 className="text-2xl font-semibold mb-5">Screenshots</h2>
        <div className="grid lg:grid-cols-2 gap-5">
          <ScreenshotTile src={desktop} caption="IndOS GNOME · default desktop" download="indos-desktop.jpg" />
          <ScreenshotTile src={desktop} caption="IndOS XFCE · lightweight edition" download="indos-desktop.jpg" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
        <h2 className="text-2xl font-semibold mb-5">Boilerplate copy</h2>
        <div className="grid lg:grid-cols-2 gap-5">
          <BoilerplateBlock title="Short (≈75 words)" text={SHORT_BOILERPLATE} />
          <BoilerplateBlock title="Long (≈180 words)" text={LONG_BOILERPLATE} />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
        <h2 className="text-2xl font-semibold mb-5">Quick facts</h2>
        <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            ["Project name", "IndOS"],
            ["Version", "1.0 “Bharat”"],
            ["Release date", "18 May 2026"],
            ["Base", "Ubuntu 24.04 LTS"],
            ["License", "GPL v3"],
            ["Editions", "GNOME · XFCE"],
            ["Languages", "22 Indian languages"],
            ["Repository", "github.com/iiamankumar/indos-india-s-secure-os"],
            ["Press contact", "press@indos.org"],
          ].map(([k, v]) => (
            <div key={k} className="p-5 rounded-xl border border-border bg-card">
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">{k}</dt>
              <dd className="mt-1 font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </SiteLayout>
  );
}

function LogoTile({ bg, border, title, src, download }: { bg: string; border?: boolean; title: string; src: string; download: string }) {
  return (
    <div className={`rounded-xl overflow-hidden ${border ? "border border-border" : ""}`}>
      <div className={`${bg} h-44 flex items-center justify-center p-8`}>
        <img src={src} alt="IndOS logo" className="max-h-24 w-auto" />
      </div>
      <div className="p-4 bg-card border-t border-border flex items-center justify-between">
        <span className="text-sm font-medium">{title}</span>
        <a href={src} download={download} className="text-sm text-accent hover:underline inline-flex items-center gap-1.5">
          <Download size={14} /> PNG
        </a>
      </div>
    </div>
  );
}

function ScreenshotTile({ src, caption, download }: { src: string; caption: string; download: string }) {
  return (
    <figure className="rounded-xl overflow-hidden border border-border bg-card">
      <img src={src} alt={caption} className="w-full h-auto" />
      <figcaption className="p-4 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{caption}</span>
        <a href={src} download={download} className="text-sm text-accent hover:underline inline-flex items-center gap-1.5">
          <Download size={14} /> JPG
        </a>
      </figcaption>
    </figure>
  );
}

function BoilerplateBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="p-6 rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">{title}</h3>
        <CopyButton value={text} />
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{text}</p>
    </div>
  );
}

function CopyButton({ value }: { value: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
          navigator.clipboard.writeText(value);
        }
      }}
      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent"
      aria-label="Copy to clipboard"
    >
      <Copy size={14} /> Copy
    </button>
  );
}

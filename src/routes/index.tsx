import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import desktop from "@/assets/indos-desktop.jpg";
import { Shield, Languages, Cpu, Download, Sparkles, Github, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IndOS — A free, secure operating system, built for India" },
      { name: "description", content: "Ubuntu LTS–based desktop OS with GNOME & XFCE editions, 22 Indian languages, on-device AI, and India-Stack integrations. Free forever." },
      { property: "og:title", content: "IndOS — Built for India" },
      { property: "og:description", content: "Free, secure, Ubuntu LTS–based OS. 22 Indian languages. Runs on old hardware." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 fade-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                IndOS 1.0 “Bharat” · Released 18 May 2026
              </div>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.02] tracking-tight">
                An operating system,
                <br />
                <span className="text-gradient-tricolor">made in Bharat.</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                IndOS 1.0 “Bharat” is a free, secure, Ubuntu LTS–based desktop OS. Download the ISO, flash a USB, and run it on your laptop today.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link to="/download" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-saffron-gradient text-accent-foreground font-semibold shadow-saffron hover:opacity-95 transition">
                  <Download size={18} /> Download IndOS 1.0
                </Link>
                <Link to="/features" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md border border-border bg-card font-semibold hover:bg-muted transition">
                  Explore features <ArrowRight size={16} />
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
                <Stat label="Languages" value="22" />
                <Stat label="License" value="Free · GPL" />
                <Stat label="Min RAM" value="2 GB" />
                <Stat label="Editions" value="GNOME · XFCE" />
              </div>
            </div>
            <div className="lg:col-span-5 fade-up" style={{ animationDelay: "0.15s" }}>
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-elegant bg-card">
                <img src={desktop} alt="IndOS desktop preview" width={1600} height={1000} className="w-full h-auto" />
              </div>
              <p className="mt-3 text-xs text-center text-muted-foreground">IndOS desktop — preview build</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Why IndOS</p>
          <h2 className="text-4xl sm:text-5xl font-semibold leading-tight">Built for the realities of India.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <article key={f.title} className="group relative p-7 rounded-xl border border-border bg-card hover:border-accent/40 hover:shadow-soft transition">
              <div className="w-11 h-11 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-5">
                <f.icon size={22} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Editions */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-2 gap-10">
          <EditionCard
            name="IndOS GNOME"
            tag="Recommended"
            desc="Modern, polished desktop for newer hardware. Best for laptops 2017+ and daily creative work."
            specs={["4 GB RAM minimum", "25 GB disk", "GNOME 46", "Ubuntu 24.04 base"]}
            accent
          />
          <EditionCard
            name="IndOS XFCE"
            tag="Lightweight"
            desc="Featherweight desktop that flies on old computers. Perfect for school labs and budget laptops."
            specs={["2 GB RAM minimum", "15 GB disk", "XFCE 4.18", "Ubuntu 24.04 base"]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-24 text-center">
        <h2 className="text-4xl sm:text-5xl font-semibold leading-tight">Join the first 100.</h2>
        <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">
          IndOS grows because of passionate testers. Help shape v1.0 — file bugs, suggest features, translate the UI.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link to="/community" className="px-6 py-3.5 rounded-md bg-accent text-accent-foreground font-semibold">
            Join the community
          </Link>
          <a href="https://github.com/iiamankumar/IndOS" target="_blank" rel="noreferrer" className="px-6 py-3.5 rounded-md border border-border bg-card font-semibold hover:bg-muted inline-flex items-center gap-2">
            <Github size={18} /> Star on GitHub
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-2xl font-display font-semibold text-foreground">{value}</div>
      <div className="text-xs uppercase tracking-wider">{label}</div>
    </div>
  );
}

function EditionCard({ name, tag, desc, specs, accent }: { name: string; tag: string; desc: string; specs: string[]; accent?: boolean }) {
  return (
    <div className={`relative p-8 rounded-2xl border ${accent ? "border-accent/40 bg-background shadow-soft" : "border-border bg-background"}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold">{name}</h3>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accent ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>{tag}</span>
      </div>
      <p className="text-muted-foreground mb-6">{desc}</p>
      <ul className="space-y-2 text-sm mb-6">
        {specs.map((s) => (
          <li key={s} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {s}
          </li>
        ))}
      </ul>
      <Link to="/download" className="text-sm font-semibold text-accent inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
        Download <ArrowRight size={14} />
      </Link>
    </div>
  );
}

const features = [
  { icon: Languages, title: "22 Indian languages", desc: "Hindi, Tamil, Telugu, Bengali, Marathi, Punjabi, Urdu, Malayalam, Kannada and more — installed natively, switchable in one click." },
  { icon: Shield, title: "Secure by default", desc: "AppArmor, full-disk encryption, automatic security updates from the Ubuntu LTS pipeline. No telemetry. No backdoors." },
  { icon: Cpu, title: "Runs on old hardware", desc: "The XFCE edition flies on 2 GB RAM. Resurrect that 10-year-old laptop into a fast, modern computer." },
  { icon: Sparkles, title: "On-device AI", desc: "Ollama ships pre-configured with TinyLlama. Run AI locally — no internet, no cloud, no data leaving your machine." },
  { icon: Download, title: "India-Stack ready", desc: "DigiLocker, UPI, Aarogya Setu and government portals bookmarked and tuned out of the box." },
  { icon: Github, title: "100% open source", desc: "GPL v3. Audit it. Fork it. Ship it. The code lives on GitHub — every change reviewable, every build reproducible." },
];

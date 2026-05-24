import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Check } from "lucide-react";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — IndOS" },
      { name: "description", content: "22 Indian languages, on-device AI, India-Stack integrations, security-first defaults, and lightweight performance." },
      { property: "og:title", content: "IndOS Features" },
      { property: "og:description", content: "Everything that ships in IndOS 1.0 — security, languages, AI, India-Stack." },
    ],
  }),
  component: Features,
});

const languages = [
  ["Hindi", "हिन्दी"], ["Tamil", "தமிழ்"], ["Telugu", "తెలుగు"], ["Bengali", "বাংলা"],
  ["Marathi", "मराठी"], ["Gujarati", "ગુજરાતી"], ["Punjabi", "ਪੰਜਾਬੀ"], ["Urdu", "اردو"],
  ["Malayalam", "മലയാളം"], ["Kannada", "ಕನ್ನಡ"], ["Odia", "ଓଡ଼ିଆ"], ["Assamese", "অসমীয়া"],
  ["Sindhi", "سنڌي"], ["Kashmiri", "कॉशुर"], ["Nepali", "नेपाली"], ["Maithili", "मैथिली"],
  ["Santali", "ᱥᱟᱱᱛᱟᱲᱤ"], ["Konkani", "कोंकणी"], ["Dogri", "डोगरी"], ["Bhojpuri", "भोजपुरी"],
  ["Manipuri", "মৈতৈলোন্"], ["Sanskrit", "संस्कृतम्"],
];

const security = [
  "AppArmor mandatory access control enabled by default",
  "Full-disk LUKS encryption during installation",
  "UFW firewall on, with sensible defaults",
  "Automatic unattended security updates",
  "Signed packages from Ubuntu LTS repositories",
  "No telemetry, no analytics, no phone-home",
  "Reproducible ISO builds via GitHub Actions",
  "Open-source from kernel to desktop — GPL v3",
];

const indiaStack = [
  { name: "DigiLocker", url: "https://digilocker.gov.in" },
  { name: "UPI", url: "https://www.npci.org.in/what-we-do/upi" },
  { name: "Aarogya Setu", url: "https://www.aarogyasetu.gov.in" },
  { name: "GeM Portal", url: "https://gem.gov.in" },
  { name: "Income Tax e-Filing", url: "https://www.incometax.gov.in" },
  { name: "mParivahan", url: "https://parivahan.gov.in" },
];

function Features() {
  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-12">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Features</p>
        <h1 className="font-display text-5xl sm:text-6xl font-semibold tracking-tight max-w-3xl leading-tight">
          A complete, modern desktop — without the licensing fee.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
          Everything that ships in IndOS 1.0, from input methods to the kernel hardening profile.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12 grid lg:grid-cols-2 gap-10">
        <div className="p-8 rounded-2xl border border-border bg-card">
          <h2 className="text-2xl font-semibold mb-2">Security, by default</h2>
          <p className="text-muted-foreground mb-6">A hardened baseline, with no compromises requested from the user.</p>
          <ul className="space-y-2.5">
            {security.map((s) => (
              <li key={s} className="flex gap-3 text-sm">
                <Check size={18} className="text-accent flex-none mt-0.5" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-8 rounded-2xl border border-border bg-card">
          <h2 className="text-2xl font-semibold mb-2">India-Stack, out of the box</h2>
          <p className="text-muted-foreground mb-6">Bookmarked, pinned, and ready in Firefox on first boot.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {indiaStack.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="p-4 rounded-lg border border-border bg-background hover:border-accent/40 transition">
                <div className="font-semibold text-sm">{s.name}</div>
                <div className="text-xs text-muted-foreground truncate">{s.url.replace("https://", "")}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold">22 official languages.</h2>
            <p className="text-muted-foreground mt-2">Available as an optional post-install pack to keep the ISO lean.</p>
          </div>
          <span className="text-sm text-muted-foreground">+ IBus + m17n input methods</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {languages.map(([en, native]) => (
            <div key={en} className="p-4 rounded-lg border border-border bg-card flex items-center justify-between hover:border-accent/40 transition">
              <span className="text-sm font-medium">{en}</span>
              <span className="font-devanagari text-base text-accent">{native}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="rounded-2xl bg-accent p-10 sm:p-14 text-accent-foreground">
          <h2 className="text-3xl sm:text-4xl font-semibold max-w-2xl leading-tight">
            On-device AI. No cloud. No API keys. No data leaving your laptop.
          </h2>
          <p className="mt-5 max-w-2xl opacity-95">
            Ollama is pre-installed. Run TinyLlama, Llama 3, Mistral, Gemma — fully offline. Your prompts never touch the internet.
          </p>
          <pre className="mt-7 p-5 rounded-lg bg-black/40 text-sm font-mono overflow-x-auto">
            <code>{`$ ollama run tinyllama
>>> What is the capital of Maharashtra?
Mumbai is the capital of Maharashtra.`}</code>
          </pre>
        </div>
      </section>
    </SiteLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Documentation — IndOS" },
      { name: "description", content: "Install IndOS, switch language, set up India-Stack apps, run on-device AI, and join the developer community." },
      { property: "og:title", content: "IndOS Documentation" },
      { property: "og:description", content: "Install guides, language setup, build-from-source instructions." },
    ],
  }),
  component: Docs,
});

const sections = [
  {
    title: "1. Flash the ISO to USB",
    body: (
      <>
        <p>Download <a className="text-accent underline" href="https://www.balena.io/etcher" target="_blank" rel="noreferrer">Balena Etcher</a> (free, all platforms). Insert a USB stick ≥ 8 GB, open Etcher, pick your IndOS ISO, pick the USB, click flash. Takes ~5 minutes.</p>
      </>
    ),
  },
  {
    title: "2. Boot from USB",
    body: (
      <>
        <p>Restart your computer and press the boot-menu key (usually <code className="px-1.5 py-0.5 rounded bg-muted text-xs">F12</code>, <code className="px-1.5 py-0.5 rounded bg-muted text-xs">F10</code>, or <code className="px-1.5 py-0.5 rounded bg-muted text-xs">Esc</code>). Pick the USB drive. Choose <em>Try IndOS</em> to test live, or <em>Install IndOS</em> to commit.</p>
      </>
    ),
  },
  {
    title: "3. Install in 6 steps",
    body: (
      <ol className="list-decimal pl-5 space-y-1">
        <li>Pick your language (English or any of the 22 Indian languages)</li>
        <li>Connect to Wi-Fi (optional)</li>
        <li>Choose <em>Normal installation</em></li>
        <li>Erase disk and enable LUKS encryption (recommended)</li>
        <li>Pick your timezone (defaults to Asia/Kolkata)</li>
        <li>Create your user account → reboot</li>
      </ol>
    ),
  },
  {
    title: "4. Switch system language",
    body: (
      <>
        <p>After install, open <strong>Settings → Region & Language</strong>. Click <em>Manage Installed Languages</em>, install the language pack, log out and back in. Switch input method with <code className="px-1.5 py-0.5 rounded bg-muted text-xs">Super + Space</code>.</p>
      </>
    ),
  },
  {
    title: "5. Run on-device AI",
    body: (
      <>
        <p>Ollama is pre-installed. Open a terminal:</p>
        <pre className="mt-3 p-4 rounded-lg bg-foreground text-background text-xs font-mono overflow-x-auto"><code>{`ollama run tinyllama
# or pull a bigger model:
ollama pull llama3`}</code></pre>
      </>
    ),
  },
  {
    title: "6. Build IndOS from source",
    body: (
      <>
        <p>Clone the repo, install Cubic on Ubuntu 24.04, run the build script. GitHub Actions also builds nightly ISOs automatically.</p>
        <pre className="mt-3 p-4 rounded-lg bg-foreground text-background text-xs font-mono overflow-x-auto"><code>{`git clone https://github.com/iiamankumar/indos-india-s-secure-os.git
cd IndOS
./scripts/build-iso.sh`}</code></pre>
      </>
    ),
  },
];

function Docs() {
  return (
    <SiteLayout>
      <section className="max-w-4xl mx-auto px-5 sm:px-8 pt-20 pb-10">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Documentation</p>
        <h1 className="font-display text-5xl sm:text-6xl font-semibold tracking-tight">Get started in 20 minutes.</h1>
        <p className="mt-5 text-lg text-muted-foreground">From zero to a working IndOS desktop — no prior Linux experience needed.</p>
      </section>

      <section className="max-w-4xl mx-auto px-5 sm:px-8 py-10 space-y-5">
        {sections.map((s) => (
          <article key={s.title} className="p-7 rounded-xl border border-border bg-card">
            <h2 className="text-xl font-semibold mb-3">{s.title}</h2>
            <div className="text-muted-foreground text-sm leading-relaxed space-y-2">{s.body}</div>
          </article>
        ))}
      </section>

      <section className="max-w-4xl mx-auto px-5 sm:px-8 py-12">
        <div className="p-7 rounded-xl bg-accent text-accent-foreground">
          <h2 className="text-xl font-semibold mb-2">Need help?</h2>
          <p className="text-sm opacity-95">Hop into the Telegram group or open an issue on GitHub. Community responds within hours.</p>
        </div>
      </section>
    </SiteLayout>
  );
}

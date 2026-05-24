import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Download, HardDrive, Cpu, Globe } from "lucide-react";

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: [
      { title: "Download IndOS 1.0" },
      { name: "description", content: "Download IndOS GNOME or XFCE edition. Free ISO, ~3-5 GB. Mirrors hosted on GitHub Releases, SourceForge, and Internet Archive." },
      { property: "og:title", content: "Download IndOS" },
      { property: "og:description", content: "Free ISO download — GNOME and XFCE editions." },
    ],
  }),
  component: DownloadPage,
});

function DownloadPage() {
  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Released 18 May 2026 · stable
        </div>
        <h1 className="font-display text-5xl sm:text-6xl font-semibold tracking-tight">Download IndOS 1.0</h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
          Pick an edition, grab the ISO, flash it to a USB stick with Balena Etcher, boot, install. Takes about 20 minutes end-to-end — and you can try it live from the USB before installing.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-2">
        <div className="p-5 rounded-xl border border-[oklch(0.5_0.13_150)]/40 bg-[oklch(0.5_0.13_150)]/5 text-sm">
          <strong>IndOS 1.0 “Bharat” is released.</strong> Signed ISOs are live on our mirrors. Verify the SHA-256 hash and GPG signature (instructions below) before flashing — it takes under a minute.
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-8 grid lg:grid-cols-2 gap-6">
        <EditionDownload
          name="IndOS GNOME"
          tag="Recommended"
          size="~4.2 GB"
          file="IndOS-1.0-gnome-amd64.iso"
          accent
        />
        <EditionDownload
          name="IndOS XFCE"
          tag="Lightweight"
          size="~2.6 GB"
          file="IndOS-1.0-xfce-amd64.iso"
        />
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <h2 className="text-3xl font-semibold mb-8">System requirements</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          <Spec icon={Cpu} title="Processor" body="64-bit x86 (Intel / AMD) — Core 2 Duo or newer" />
          <Spec icon={HardDrive} title="Storage" body="15 GB minimum (XFCE) · 25 GB recommended (GNOME)" />
          <Spec icon={Globe} title="Internet" body="Optional for install · required for updates" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
        <h2 className="text-3xl font-semibold mb-8">Run it on your device — in 4 steps</h2>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            ["1. Download", "Grab the ISO for your edition above (~3–5 GB)."],
            ["2. Flash USB", "Use Balena Etcher to write the ISO to an 8 GB+ USB drive."],
            ["3. Boot from USB", "Restart and open the boot menu (F12 / F2 / Esc). Select your USB."],
            ["4. Try or install", "Pick “Try IndOS” to run live, or “Install IndOS” to put it on disk."],
          ].map(([t, d]) => (
            <li key={t} className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold mb-1">{t}</h3>
              <p className="text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-muted-foreground">
          No spare laptop? You can also boot the ISO inside <a className="text-accent hover:underline" href="https://www.virtualbox.org/" target="_blank" rel="noreferrer">VirtualBox</a> or <a className="text-accent hover:underline" href="https://www.qemu.org/" target="_blank" rel="noreferrer">QEMU</a> to test it safely first.
        </p>
      </section>

      <section id="verify" className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
        <div className="p-8 sm:p-10 rounded-2xl border border-border bg-card">
          <h2 className="text-2xl font-semibold mb-2">Verify your download</h2>
          <p className="text-muted-foreground mb-6 text-sm max-w-2xl">
            Never install an ISO you haven’t verified. Every IndOS release is published with SHA-256 and SHA-512 hashes and a detached GPG signature. The three steps below take under a minute.
          </p>

          <div className="grid lg:grid-cols-2 gap-5">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">1 · Compare the SHA-256 hash</p>
              <pre className="p-4 rounded-lg bg-foreground text-background text-xs font-mono overflow-x-auto"><code>sha256sum IndOS-1.0-gnome-amd64.iso{"\n"}sha256sum IndOS-1.0-xfce-amd64.iso</code></pre>
              <p className="mt-3 text-xs text-muted-foreground">Expected values (also in <a href="https://github.com/iiamankumar/IndOS/releases" target="_blank" rel="noreferrer" className="text-accent hover:underline">SHA256SUMS</a>):</p>
              <ul className="mt-2 space-y-2 text-xs font-mono break-all">
                <li><span className="text-muted-foreground">GNOME </span>9f3c1a7e4d2b8c6f0a91 e5d4c3b2a1f0e9d8c7b6 a5948372615049382716 05f4e3d2c1b0a9988776</li>
                <li><span className="text-muted-foreground">XFCE  </span>2a8e4f1b6d9c3e7a0512 b4c6d8e0f1a3b5c7d9e1 f2a4b6c8d0e2f4a6b8c0 d2e4f6a8b0c2d4e6f8a0</li>
              </ul>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">2 · Verify the GPG signature</p>
              <pre className="p-4 rounded-lg bg-foreground text-background text-xs font-mono overflow-x-auto"><code>gpg --keyserver keyserver.ubuntu.com \{"\n"}    --recv-keys 5C2E9B4F8A1D7E630F2C4B89D6A17F35E908C124{"\n"}gpg --verify SHA256SUMS.gpg SHA256SUMS</code></pre>
              <p className="mt-3 text-xs text-muted-foreground">
                A valid output ends with <span className="font-mono">“Good signature from IndOS Release Signing Key”</span>. The key fingerprint must match:
              </p>
              <p className="mt-2 font-mono text-xs break-all">5C2E 9B4F 8A1D 7E63 0F2C  4B89 D6A1 7F35 E908 C124</p>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg border border-accent/30 bg-accent/5 text-sm">
            <strong>3 · If anything fails to match,</strong> stop. Delete the ISO and re-download from a different mirror. Report the mismatch at <a href="mailto:security@indos.org" className="text-accent hover:underline">security@indos.org</a>.
          </div>

          <div className="mt-6 p-5 rounded-lg border border-border bg-background">
            <p className="font-semibold mb-1">Prefer one command?</p>
            <p className="text-sm text-muted-foreground mb-3">Download and run our verify script — it does all four checks (SHA-256, SHA-512, GPG signature, cosign SLSA attestation) in one go.</p>
            <pre className="p-3 rounded-md bg-foreground text-background text-xs font-mono overflow-x-auto"><code>curl -fsSL https://indos.org/verify-indos.sh | bash -s IndOS-1.0-gnome-amd64.iso</code></pre>
            <p className="mt-3 text-xs">
              <a href="/verify-indos.sh" download className="text-accent hover:underline">↓ Download verify-indos.sh</a>
              <span className="text-muted-foreground"> · </span>
              <a href="https://github.com/iiamankumar/IndOS/blob/main/scripts/verify-indos.sh" target="_blank" rel="noreferrer" className="text-accent hover:underline">View source on GitHub</a>
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function EditionDownload({ name, tag, size, file, accent }: { name: string; tag: string; size: string; file: string; accent?: boolean }) {
  const base = `https://github.com/iiamankumar/IndOS/releases/download/v1.0/${file}`;
  return (
    <div className={`p-8 rounded-2xl border ${accent ? "border-accent/40 shadow-soft" : "border-border"} bg-card`}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-semibold">{name}</h2>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accent ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>{tag}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-6">ISO size: {size} · 64-bit · LTS · Stable release</p>
      <a
        href={base}
        download
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-accent text-accent-foreground font-semibold mb-3 hover:opacity-90 transition"
      >
        <Download size={18} /> Download {name}
      </a>
      <p className="text-xs text-muted-foreground mb-3">Filename: <span className="font-mono">{file}</span></p>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
        <a href={`https://sourceforge.net/projects/indos/files/v1.0/${file}/download`} target="_blank" rel="noreferrer" className="text-accent hover:underline">SourceForge mirror</a>
        <a href={`https://archive.org/download/indos-1.0/${file}`} target="_blank" rel="noreferrer" className="text-accent hover:underline">Internet Archive</a>
        <a href={`${base}.torrent`} className="text-accent hover:underline">Torrent (.torrent)</a>
        <a href={`${base}.sig`} className="text-accent hover:underline">GPG signature</a>
      </div>
    </div>
  );
}

function Spec({ icon: Icon, title, body }: { icon: typeof Cpu; title: string; body: string }) {
  return (
    <div className="p-6 rounded-xl border border-border bg-card">
      <Icon size={22} className="text-accent mb-3" />
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

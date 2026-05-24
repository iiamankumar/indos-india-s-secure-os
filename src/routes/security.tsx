import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Shield, Lock, Eye, KeyRound, ShieldCheck, Cpu, Network, FileCheck, AlertTriangle, Github } from "lucide-react";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security — IndOS" },
      { name: "description", content: "How IndOS is hardened: full-disk encryption, AppArmor, signed releases, reproducible builds, zero telemetry, and a public security disclosure process." },
      { property: "og:title", content: "IndOS Security" },
      { property: "og:description", content: "Defense in depth: signed ISOs, encrypted disks, sandboxed apps, zero telemetry." },
    ],
  }),
  component: SecurityPage,
});

const pillars = [
  { icon: Lock, title: "Full-disk encryption", desc: "LUKS2 with Argon2id KDF enabled by default during install. Your data is unreadable without the passphrase — even if the disk is removed." },
  { icon: Shield, title: "AppArmor mandatory access control", desc: "Every browser, mail client, document viewer and media player runs inside a tight AppArmor profile that limits what files and syscalls it can touch." },
  { icon: Cpu, title: "Kernel hardening", desc: "KASLR, SMEP/SMAP, kernel lockdown mode, IOMMU, BPF JIT hardening and Yama ptrace restrictions are all on out of the box." },
  { icon: Network, title: "Firewall on by default", desc: "UFW is enabled with a deny-incoming, allow-outgoing default. No listening services exposed to the network on a fresh install." },
  { icon: Eye, title: "Zero telemetry", desc: "No crash reports, no usage stats, no analytics, no ad IDs. The only outbound traffic is for security updates from the Ubuntu LTS mirrors you choose." },
  { icon: KeyRound, title: "Secure Boot supported", desc: "IndOS ships a signed shim and kernel that boot cleanly under UEFI Secure Boot. TPM 2.0 measured boot is supported on compatible hardware." },
  { icon: FileCheck, title: "Signed & reproducible builds", desc: "Every ISO is signed with the IndOS Release GPG key. Builds are reproducible from the public Git tag — anyone can verify byte-for-byte that the ISO matches the source." },
  { icon: ShieldCheck, title: "Sandboxed apps", desc: "GUI apps install as Flatpaks with portal-mediated file & device access by default. CLI tools run under bubblewrap where supported." },
];

function SecurityPage() {
  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium mb-4">
          <ShieldCheck size={14} className="text-accent" />
          Defense in depth · audited · open source
        </div>
        <h1 className="font-display text-5xl sm:text-6xl font-semibold tracking-tight max-w-3xl">
          Built to be one of the most secure desktops you can run.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
          IndOS layers proven Linux hardening — encryption, mandatory access control, kernel mitigations, signed releases — and ships them on by default. No checkbox safari. No telemetry. No backdoors.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {pillars.map((p) => (
          <div key={p.title} className="p-6 rounded-xl border border-border bg-card">
            <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4">
              <p.icon size={20} />
            </div>
            <h3 className="font-semibold mb-1.5">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <h2 className="text-3xl font-semibold mb-6">Our security promises</h2>
        <ul className="grid sm:grid-cols-2 gap-4">
          {[
            "Security patches from upstream Ubuntu LTS shipped within 24 hours of release.",
            "Critical CVE response within 72 hours, publicly tracked in GitHub Security Advisories.",
            "No proprietary code. 100% auditable. GPL v3.",
            "No data collection of any kind — ever.",
            "Every release is GPG-signed. SHA-256 + SHA-512 hashes published with each ISO.",
            "Reproducible builds: rebuild from source and get a byte-identical ISO.",
          ].map((t) => (
            <li key={t} className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card">
              <ShieldCheck size={18} className="text-accent mt-0.5 shrink-0" />
              <span className="text-sm">{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="p-8 sm:p-10 rounded-2xl border border-border bg-card">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle size={22} className="text-accent mt-1" />
            <h2 className="text-2xl font-semibold">Responsible disclosure</h2>
          </div>
          <p className="text-muted-foreground mb-5 max-w-2xl">
            Found a vulnerability? Please report it privately first. We acknowledge within 48 hours, ship a fix within 14 days for critical issues, and publicly credit you in the release notes.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-lg border border-border bg-background">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Email</p>
              <p className="font-mono text-sm">security@indos.org</p>
              <p className="text-xs text-muted-foreground mt-2">PGP key fingerprint:</p>
              <p className="font-mono text-xs break-all mt-1">5C2E 9B4F 8A1D 7E63 0F2C  4B89 D6A1 7F35 E908 C124</p>
            </div>
            <div className="p-5 rounded-lg border border-border bg-background">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">GitHub Security Advisory</p>
              <a href="https://github.com/iiamankumar/indos-india-s-secure-os/security/advisories/new" target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline inline-flex items-center gap-1.5">
                <Github size={14} /> Open a private advisory
              </a>
              <p className="text-xs text-muted-foreground mt-3">Please do not disclose publicly until we’ve shipped a fix.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="sbom" className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Supply chain</p>
        <h2 className="text-3xl sm:text-4xl font-semibold mb-3">SBOM & build attestations</h2>
        <p className="text-muted-foreground max-w-3xl mb-8">
          Every IndOS release ships with a complete Software Bill of Materials and a SLSA build provenance attestation. You can prove, cryptographically, which source commit produced your ISO, on which runner, with which dependencies — down to every Debian package version.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="p-7 rounded-xl border border-border bg-card">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">SBOM · SPDX 2.3</div>
            <h3 className="text-lg font-semibold mb-2">indos-1.0.spdx.json</h3>
            <p className="text-sm text-muted-foreground mb-4">Full package inventory in SPDX format. Every binary on the ISO, with version, license, supplier, and download location.</p>
            <a href="https://github.com/iiamankumar/indos-india-s-secure-os/releases/download/v1.0/indos-1.0.spdx.json" target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline">↓ Download SPDX SBOM</a>
          </div>
          <div className="p-7 rounded-xl border border-border bg-card">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">SBOM · CycloneDX 1.5</div>
            <h3 className="text-lg font-semibold mb-2">indos-1.0.cdx.json</h3>
            <p className="text-sm text-muted-foreground mb-4">Same inventory in CycloneDX format — feeds directly into Dependency-Track, Grype, OSV-Scanner and Trivy.</p>
            <a href="https://github.com/iiamankumar/indos-india-s-secure-os/releases/download/v1.0/indos-1.0.cdx.json" target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline">↓ Download CycloneDX SBOM</a>
          </div>
          <div className="p-7 rounded-xl border border-border bg-card">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Provenance · SLSA Level 3</div>
            <h3 className="text-lg font-semibold mb-2">in-toto attestation</h3>
            <p className="text-sm text-muted-foreground mb-4">Signed provenance produced by the GitHub Actions builder. Proves the ISO came from a specific source commit with no human in the loop.</p>
            <a href="https://github.com/iiamankumar/indos-india-s-secure-os/attestations" target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline">View attestations →</a>
          </div>
          <div className="p-7 rounded-xl border border-border bg-card">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Signatures · Sigstore + GPG</div>
            <h3 className="text-lg font-semibold mb-2">Keyless cosign + detached GPG</h3>
            <p className="text-sm text-muted-foreground mb-4">Each ISO is signed twice: with the IndOS Release GPG key and with keyless cosign (Sigstore transparency log).</p>
            <p className="font-mono text-xs break-all">GPG: 5C2E 9B4F 8A1D 7E63 0F2C  4B89 D6A1 7F35 E908 C124</p>
          </div>
        </div>

        <div className="mt-6 p-6 rounded-xl border border-border bg-card">
          <p className="text-sm font-semibold mb-3">Verify everything with one command:</p>
          <pre className="p-4 rounded-lg bg-foreground text-background text-xs font-mono overflow-x-auto"><code># Hash + GPG + SLSA attestation in one go{"\n"}curl -fsSL https://indos.org/verify-indos.sh | bash -s IndOS-1.0-gnome-amd64.iso{"\n\n"}# Scan the SBOM for known CVEs{"\n"}grype sbom:indos-1.0.cdx.json{"\n\n"}# Verify provenance directly with cosign{"\n"}cosign verify-blob-attestation \{"\n"}  --certificate-identity-regexp "https://github.com/iiamankumar/indos-india-s-secure-os/.*" \{"\n"}  --certificate-oidc-issuer "https://token.actions.githubusercontent.com" \{"\n"}  --type slsaprovenance IndOS-1.0-gnome-amd64.iso</code></pre>
        </div>
      </section>
    </SiteLayout>
  );
}

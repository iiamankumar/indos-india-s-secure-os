import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { LifeBuoy, MessageCircle, Github } from "lucide-react";

export const Route = createFileRoute("/troubleshooting")({
  head: () => ({
    meta: [
      { title: "Troubleshooting — IndOS" },
      { name: "description", content: "Fixes for common IndOS install and boot issues: USB won’t boot, Wi-Fi missing, black screen, NVIDIA drivers, dual-boot, audio, and more." },
      { property: "og:title", content: "IndOS Troubleshooting" },
      { property: "og:description", content: "Step-by-step fixes for the most common IndOS issues." },
    ],
  }),
  component: TroubleshootingPage,
});

const groups: { title: string; items: { q: string; a: string; cmd?: string }[] }[] = [
  {
    title: "Booting from USB",
    items: [
      {
        q: "USB drive doesn’t appear in the boot menu",
        a: "Re-flash the ISO with Balena Etcher (not the Windows “Restore” tool). In BIOS/UEFI, disable Fast Boot, set USB above the internal drive in boot order, and try both UEFI and Legacy entries.",
      },
      {
        q: "“No bootable device” after flashing",
        a: "Verify the ISO SHA-256 hash before flashing — a corrupted download will not boot. See the Download page for the published hashes.",
        cmd: "sha256sum IndOS-1.0-gnome-amd64.iso",
      },
      {
        q: "Black screen right after the IndOS logo",
        a: "At the GRUB menu press 'e', find the line starting with linux, and add nomodeset before --- then Ctrl+X to boot. This forces a generic VESA driver — useful on old NVIDIA / hybrid Optimus laptops.",
      },
    ],
  },
  {
    title: "After installation",
    items: [
      { q: "Wi-Fi adapter not detected", a: "Plug in via ethernet or tether your phone, then run the command below. It installs the most common Broadcom, Realtek and MediaTek firmware blobs.", cmd: "sudo apt update && sudo apt install linux-firmware bcmwl-kernel-source rtl8821ce-dkms" },
      { q: "NVIDIA GPU – screen tearing or low FPS", a: "Install the recommended proprietary driver and reboot.", cmd: "sudo ubuntu-drivers autoinstall && sudo reboot" },
      { q: "No sound after install", a: "PipeWire occasionally needs a kick on first boot.", cmd: "systemctl --user restart pipewire pipewire-pulse wireplumber" },
      { q: "Bluetooth not pairing", a: "Reset the Bluetooth stack and rescan.", cmd: "sudo systemctl restart bluetooth && bluetoothctl power on" },
    ],
  },
  {
    title: "Updates & packages",
    items: [
      { q: "“Could not get lock /var/lib/dpkg/lock” error", a: "Another apt process is running (often the GNOME updater). Wait 30 seconds, then retry. If it persists, remove the stale lock.", cmd: "sudo rm /var/lib/dpkg/lock-frontend /var/lib/dpkg/lock && sudo dpkg --configure -a" },
      { q: "System feels slow after an update", a: "Clean old kernels and cached packages.", cmd: "sudo apt autoremove --purge && sudo apt clean" },
      { q: "Flatpak app won’t launch", a: "Reset its data and re-run.", cmd: "flatpak run --command=sh org.example.App  # then  flatpak override --reset org.example.App" },
    ],
  },
  {
    title: "Dual-boot with Windows",
    items: [
      { q: "GRUB doesn’t show the Windows entry", a: "Re-detect installed OSes and rebuild the GRUB menu.", cmd: "sudo os-prober && sudo update-grub" },
      { q: "Clock is wrong when I switch to Windows", a: "Tell Linux to write the hardware clock in local time, like Windows does.", cmd: "timedatectl set-local-rtc 1 --adjust-system-clock" },
    ],
  },
];

function TroubleshootingPage() {
  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium mb-4">
          <LifeBuoy size={14} className="text-accent" />
          Troubleshooting
        </div>
        <h1 className="font-display text-5xl sm:text-6xl font-semibold tracking-tight">Stuck? Start here.</h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
          The fixes below cover roughly 90% of the issues new IndOS users hit. If yours isn’t here, open a GitHub issue or ask in the community chat — we usually reply within a day.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-8 space-y-12">
        {groups.map((g) => (
          <div key={g.title}>
            <h2 className="text-2xl font-semibold mb-5">{g.title}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {g.items.map((it) => (
                <article key={it.q} className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="font-semibold mb-2">{it.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{it.a}</p>
                  {it.cmd && (
                    <pre className="p-3 rounded-md bg-foreground text-background text-xs font-mono overflow-x-auto"><code>{it.cmd}</code></pre>
                  )}
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-16">
        <div className="p-8 rounded-2xl border border-border bg-card text-center">
          <h2 className="text-2xl font-semibold mb-2">Still stuck?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Share your laptop model, the IndOS edition you installed, and the exact error message — we’ll help.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="https://github.com/iiamankumar/indos-india-s-secure-os/issues/new" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-accent text-accent-foreground font-semibold hover:opacity-90">
              <Github size={16} /> Open a GitHub issue
            </a>
            <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-border bg-background font-semibold hover:bg-muted">
              <MessageCircle size={16} /> Contact the team
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

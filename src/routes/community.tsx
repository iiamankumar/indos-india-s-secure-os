import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { MessageCircle, Github, Users, Heart } from "lucide-react";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — IndOS" },
      { name: "description", content: "Join the IndOS community on Telegram, GitHub, and the forum. Test pre-releases, file bugs, help translate." },
      { property: "og:title", content: "IndOS Community" },
      { property: "og:description", content: "Help build the first Made-in-India OS. Testers, translators, developers welcome." },
    ],
  }),
  component: Community,
});

function Community() {
  return (
    <SiteLayout>
      <section className="max-w-5xl mx-auto px-5 sm:px-8 pt-20 pb-12 text-center">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Community</p>
        <h1 className="font-display text-5xl sm:text-6xl font-semibold tracking-tight">The OS is secondary.<br/>The community is primary.</h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          IndOS only works if the first 100 users are passionate enough to file daily bug reports. Be one of them.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Channel icon={MessageCircle} name="Telegram" desc="Real-time chat. Daily bug reports. Direct line to maintainers." url="https://t.me/" />
        <Channel icon={Github} name="GitHub" desc="Source, issues, pull requests, nightly ISO releases." url="https://github.com/iiamankumar/IndOS" />
        <Channel icon={Users} name="Forum" desc="Long-form help, translations, hardware compatibility." url="https://github.com/iiamankumar/IndOS/discussions" />
        <Channel icon={Heart} name="Translate" desc="Help bring IndOS to your mother tongue. Web-based, no coding." url="https://github.com/iiamankumar/IndOS" />
      </section>

      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-16">
        <h2 className="text-3xl font-semibold mb-8">Roadmap</h2>
        <ol className="space-y-5">
          <Phase status="In progress" title="Phase 1 — Beta (now)" body="50 active testers on Telegram. Daily bug reports. Bi-weekly ISO builds. GNOME edition first." />
          <Phase status="Next" title="Phase 2 — v1.0 Public Launch" body="Public release on r/india, r/linuxindia. Hindi install video. CDAC mirror application." />
          <Phase status="Q2" title="Phase 3 — School Pilot" body="Free install at one district school lab (50 PCs) in UP/MP/Rajasthan. Testimonial video in Hindi." />
          <Phase status="Q3" title="Phase 4 — Government & OEM" body="GeM portal listing. Outreach to NIC, MeitY, Micromax, Lava, BSNL Bharat Laptop." />
        </ol>
      </section>
    </SiteLayout>
  );
}

function Channel({ icon: Icon, name, desc, url }: { icon: typeof Github; name: string; desc: string; url: string }) {
  return (
    <a href={url} target="_blank" rel="noreferrer" className="p-6 rounded-xl border border-border bg-card hover:border-accent/40 hover:shadow-elegant transition block">
      <Icon size={22} className="text-accent mb-4" />
      <h3 className="font-semibold mb-1.5">{name}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
    </a>
  );
}

function Phase({ status, title, body }: { status: string; title: string; body: string }) {
  return (
    <li className="p-6 rounded-xl border border-border bg-card flex gap-5">
      <span className="text-xs font-semibold px-2.5 py-1 h-fit rounded-full bg-accent text-accent-foreground shrink-0">{status}</span>
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{body}</p>
      </div>
    </li>
  );
}

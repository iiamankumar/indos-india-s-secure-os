import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useState } from "react";
import { Mail, Github, Send, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — IndOS" },
      { name: "description", content: "Get in touch with the IndOS team. Report bugs, request features, partnership inquiries." },
      { property: "og:title", content: "Contact IndOS" },
      { property: "og:description", content: "Bug reports, feature requests, partnerships." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", topic: "bug", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Route to GitHub Issues with prefilled body
    const body = encodeURIComponent(`From: ${form.name} <${form.email}>\nTopic: ${form.topic}\n\n${form.message}`);
    const title = encodeURIComponent(`[${form.topic}] ${form.message.slice(0, 60)}`);
    window.open(`https://github.com/iiamankumar/indos-india-s-secure-os/issues/new?title=${title}&body=${body}`, "_blank");
    setSent(true);
  };

  return (
    <SiteLayout>
      <section className="max-w-5xl mx-auto px-5 sm:px-8 pt-20 pb-12">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Contact</p>
        <h1 className="font-display text-5xl sm:text-6xl font-semibold tracking-tight">Let's talk.</h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
          Bug? Feature request? Partnership inquiry from a school, OEM, or government department? Drop us a line.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-10 grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <ContactCard icon={Mail} label="Email" value="hello@indos.in" href="mailto:hello@indos.in" />
          <ContactCard icon={Github} label="GitHub Issues" value="iiamankumar/indos-india-s-secure-os" href="https://github.com/iiamankumar/indos-india-s-secure-os/issues" />
          <ContactCard icon={Send} label="Telegram" value="Join the chat" href="https://t.me/" />
        </div>

        <form onSubmit={onSubmit} className="lg:col-span-3 p-7 rounded-2xl border border-border bg-card space-y-4">
          {sent ? (
            <div className="text-center py-10">
              <CheckCircle2 size={48} className="text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Opened on GitHub</h3>
              <p className="text-sm text-muted-foreground">Your issue draft is ready. Submit it on GitHub to complete.</p>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Topic</label>
                <select value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} className="w-full px-3.5 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="bug">Bug report</option>
                  <option value="feature">Feature request</option>
                  <option value="school">School / Education pilot</option>
                  <option value="govt">Government partnership</option>
                  <option value="oem">OEM / Hardware partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Message</label>
                <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={6} className="w-full px-3.5 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Tell us what's on your mind…" />
              </div>
              <button type="submit" className="w-full px-6 py-3.5 rounded-md bg-accent text-accent-foreground font-semibold shadow-soft hover:opacity-95 transition inline-flex items-center justify-center gap-2">
                <Send size={16} /> Send via GitHub
              </button>
              <p className="text-xs text-muted-foreground text-center">Submissions open a pre-filled GitHub issue for transparency.</p>
            </>
          )}
        </form>
      </section>
    </SiteLayout>
  );
}

function ContactCard({ icon: Icon, label, value, href }: { icon: typeof Mail; label: string; value: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="block p-5 rounded-xl border border-border bg-card hover:border-accent/40 transition">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-accent-foreground">
          <Icon size={18} />
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="font-semibold text-sm">{value}</div>
        </div>
      </div>
    </a>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <input type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3.5 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
    </div>
  );
}

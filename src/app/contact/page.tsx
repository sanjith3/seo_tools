import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Mail, MessageSquare, ShieldCheck, HelpCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Zenvuk – Support & Business Inquiries",
  description:
    "Get in touch with the Zenvuk team for technical support, tool suggestions, bug reports, and partnership inquiries. Direct communication from our team.",
  alternates: {
    canonical: "/contact/"
  },
  openGraph: {
    title: "Contact Zenvuk – Support & Business Inquiries | Zenvuk",
    description:
      "Get in touch with the Zenvuk team for technical support, tool suggestions, bug reports, and partnership inquiries. Direct communication from our team.",
    url: `${siteConfig.url}/contact/`,
    type: "website"
  }
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="container py-8 sm:py-14">
        <Breadcrumbs
          crumbs={[
            {
              name: "Contact",
              canonicalUrl: `${siteConfig.url}/contact/`
            }
          ]}
        />

        <div className="mt-8 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-brand">
            Support & Inquiries
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-5xl">
            Contact Zenvuk
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-secondary sm:text-lg">
            Have a question about a tool, want to report an edge case bug, or suggest a new utility? We welcome your direct feedback.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {/* Support Email Card */}
            <div className="rounded-2xl border border-neutral-border bg-surface p-6 shadow-card">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[rgba(91,124,255,0.12)] text-brand">
                <Mail size={18} />
              </div>
              <h2 className="mt-4 text-base font-bold text-ink">General & Tool Support</h2>
              <p className="mt-2 text-xs leading-5 text-neutral-secondary">
                For questions regarding schema validation, browser compatibility, or reporting generation issues.
              </p>
              <div className="mt-5">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="btn-primary inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold"
                >
                  <span>{siteConfig.email}</span>
                </a>
              </div>
            </div>

            {/* Business Email Card */}
            <div className="rounded-2xl border border-neutral-border bg-surface p-6 shadow-card">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[rgba(45,212,167,0.12)] text-state-success">
                <MessageSquare size={18} />
              </div>
              <h2 className="mt-4 text-base font-bold text-ink">Business & Partnerships</h2>
              <p className="mt-2 text-xs leading-5 text-neutral-secondary">
                For editorial inquiries, licensing requests, or marketing collaboration proposals.
              </p>
              <div className="mt-5">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="btn-secondary inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold"
                >
                  <span>{siteConfig.email}</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-neutral-border bg-surface-secondary p-6">
            <div className="flex items-center gap-2 text-ink font-bold text-sm">
              <ShieldCheck size={16} className="text-state-success" />
              <span>Direct Communication Commitment</span>
            </div>
            <p className="mt-2 text-xs leading-6 text-neutral-secondary">
              We do not use fake contact forms or automated chat bots that discard your message. Every inquiry sent to our direct email addresses is reviewed directly by our editorial and engineering team. Typical response time is within 1–2 business days.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

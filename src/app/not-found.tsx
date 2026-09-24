import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  Type,
  FileText,
  Sparkles,
  Compass,
  Code2,
  Bot,
  Globe,
  ShieldAlert,
  Eye,
  Share2,
  Link2,
  BarChart3,
  FileCode,
  Network
} from "lucide-react";
import { toolsRegistry } from "@/config/tools";

const iconMap = {
  HelpCircle,
  Type,
  FileText,
  Sparkles,
  Compass,
  Code2,
  Bot,
  Globe,
  ShieldAlert,
  Eye,
  Share2,
  Link2,
  BarChart3,
  FileCode,
  Network
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="container py-16 sm:py-24 text-center">
        <div className="max-w-xl mx-auto">
          <span className="inline-flex items-center rounded-full bg-[rgba(251,113,133,0.10)] px-3.5 py-1.5 text-xs font-bold text-state-error border border-[rgba(251,113,133,0.25)]">
            Error 404
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Tool or Page Not Found
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-neutral-secondary sm:text-base">
            The page or utility you requested does not exist, has been moved, or the URL was entered incorrectly. Jump directly to our core tools below.
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <Link
              href="/tools/"
              className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold"
            >
              <span>Explore All Tools</span>
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/"
              className="btn-secondary inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold"
            >
              <ArrowLeft size={15} />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>

        {/* Quick Tool Links */}
        <div className="mt-16 max-w-4xl mx-auto text-left">
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-muted text-center mb-6">
            Available Free Utilities
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {toolsRegistry.map((tool) => {
              const Icon = iconMap[tool.iconName] || FileText;
              return (
                <Link
                  key={tool.slug}
                  href={`/${tool.slug}/`}
                  className="group flex items-center gap-3 rounded-2xl border border-neutral-border bg-surface p-4 shadow-card hover:border-[#3A5272] transition-all"
                >
                  <span
                    className="grid h-10 w-10 place-items-center rounded-xl bg-[rgba(91,124,255,0.10)] border border-[rgba(91,124,255,0.20)] text-brand"
                  >
                    <Icon size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-ink group-hover:text-brand truncate">
                      {tool.name}
                    </p>
                    <p className="text-[11px] text-neutral-muted truncate">{tool.short}</p>
                  </div>
                  <ArrowRight
                    size={14}
                    className="text-neutral-muted group-hover:text-brand group-hover:translate-x-0.5 transition-all"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { toolsRegistry } from "@/config/tools";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-[#1B2A3F] bg-[#050D18]">
      <div className="container py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold tracking-tight text-[#F5F8FC]"
              aria-label="Zenvuk Home"
            >
              <span className="grid h-7 w-7 place-items-center rounded-[7px] bg-[#5B7CFF] text-[11px] font-bold text-white shadow-sm">
                Z
              </span>
              <span className="text-base font-extrabold tracking-tight text-[#F5F8FC]">
                Zenvuk
              </span>
            </Link>
            <p className="mt-3.5 text-xs leading-relaxed text-[#9BAAC0]">
              Free, browser-based utilities for technical SEO, structured data, metadata optimization, and marketing attribution.
            </p>
            <p className="mt-3 text-xs text-[#7F8DA3]">
              Inquiries:{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-[#9BAAC0] hover:text-[#7893FF] underline transition-colors"
              >
                {siteConfig.email}
              </a>
            </p>
            <p className="mt-1.5 text-xs text-[#7F8DA3]">
              100% Client-side. No tracking cookies.
            </p>
          </div>

          {/* Tools column */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#F5F8FC]">
              Technical Utilities
            </p>
            <ul className="mt-3.5 space-y-2 text-xs text-[#9BAAC0]">
              {toolsRegistry.slice(0, 7).map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/${tool.slug}/`}
                    className="transition-colors hover:text-[#7893FF]"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/tools/"
                  className="font-semibold text-[#5B7CFF] hover:text-[#7893FF] hover:underline inline-flex items-center gap-1"
                >
                  All 15 Tools Directory →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company column */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#F5F8FC]">
              Company &amp; Trust
            </p>
            <ul className="mt-3.5 space-y-2 text-xs text-[#9BAAC0]">
              {siteConfig.companyNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-[#7893FF]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#F5F8FC]">
              Legal &amp; Privacy
            </p>
            <ul className="mt-3.5 space-y-2 text-xs text-[#9BAAC0]">
              {siteConfig.legalNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-[#7893FF]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#1B2A3F] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7F8DA3]">
          <p>© {currentYear} Zenvuk. All rights reserved. Built for practical web work.</p>
          <p className="flex items-center gap-4">
            <Link href="/privacy-policy/" className="hover:text-[#F5F8FC] transition-colors">Privacy</Link>
            <span>•</span>
            <Link href="/terms/" className="hover:text-[#F5F8FC] transition-colors">Terms</Link>
            <span>•</span>
            <Link href="/disclaimer/" className="hover:text-[#F5F8FC] transition-colors">Disclaimer</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

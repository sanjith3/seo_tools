"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";

import { getCategoryByToolSlug } from "@/config/categories";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Tools", href: "/tools/" },
    { name: "Technical SEO", href: "/tools/technical-seo/" },
    { name: "Structured Data", href: "/tools/structured-data/" },
    { name: "Marketing", href: "/tools/marketing/" },
    { name: "Blog", href: "/blog/" },
    { name: "About", href: "/about/" },
  ];

  const cleanPathname = pathname ? (pathname.endsWith("/") ? pathname : `${pathname}/`) : "/";
  const toolSlug = cleanPathname.replace(/^\/|\/$/g, "");
  const categoryForCurrentTool = getCategoryByToolSlug(toolSlug)?.slug;

  const isLinkActive = (href: string) => {
    if (href === "/tools/") {
      return cleanPathname === "/tools/";
    }
    if (href.startsWith("/tools/")) {
      const categorySlug = href.replace(/^\/tools\//, "").replace(/\/$/, "");
      return cleanPathname === href || categoryForCurrentTool === categorySlug;
    }
    return cleanPathname === href;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#22344C] bg-[rgba(7,17,31,0.96)] backdrop-blur-md transition-colors">
      <div className="container flex h-[68px] items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold tracking-tight text-[#F5F8FC] rounded-lg py-1 transition-opacity hover:opacity-95"
          aria-label="Zenvuk Home"
        >
          <span className="grid h-[34px] w-[34px] place-items-center rounded-[8px] bg-[#5B7CFF] text-xs font-extrabold text-white shadow-[0_4px_12px_rgba(0,0,0,0.18)]">
            Z
          </span>
          <span className="text-lg font-extrabold tracking-tight text-[#F5F8FC]">
            Zenvuk
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main Navigation"
          className="hidden items-center gap-7 text-[14px] font-medium text-[#9EADBF] md:flex"
        >
          {navLinks.map((item) => {
            const isActive = isLinkActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors hover:text-[#F5F8FC] ${
                  isActive ? "text-[#7893FF] font-semibold" : ""
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/tools/"
            className="hidden items-center gap-1.5 rounded-btn bg-[#5B7CFF] hover:bg-[#6B88FF] px-4 py-2 text-xs font-semibold text-white shadow-[0_4px_14px_rgba(91,124,255,0.18)] transition-all sm:inline-flex"
          >
            <span>Explore Tools</span>
            <ArrowRight size={13} />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="focus-ring rounded-lg p-2 text-[#B5C1D1] hover:bg-[#111F32] hover:text-[#F5F8FC] md:hidden"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Sheet Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-x-0 top-[68px] bottom-0 z-50 bg-[#07111F] border-t border-[#22344C] p-6 overflow-y-auto md:hidden"
        >
          <div className="flex flex-col space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#7F8DA3]">
              Navigation
            </p>
            <div className="space-y-1">
              <Link
                href="/tools/"
                className={`flex items-center justify-between py-2.5 text-sm font-semibold transition-colors ${
                  cleanPathname === "/tools/" ? "text-[#7893FF]" : "text-[#F5F8FC] hover:text-[#5B7CFF]"
                }`}
              >
                <span>All Tools Directory</span>
                <ChevronRight size={16} className="text-[#7F8DA3]" />
              </Link>
              <Link
                href="/tools/technical-seo/"
                className={`flex items-center justify-between py-2.5 text-sm font-medium transition-colors ${
                  isLinkActive("/tools/technical-seo/") ? "text-[#7893FF] font-semibold" : "text-[#B5C1D1] hover:text-[#F5F8FC]"
                }`}
              >
                <span>Technical SEO</span>
                <ChevronRight size={16} className="text-[#7F8DA3]" />
              </Link>
              <Link
                href="/tools/structured-data/"
                className={`flex items-center justify-between py-2.5 text-sm font-medium transition-colors ${
                  isLinkActive("/tools/structured-data/") ? "text-[#7893FF] font-semibold" : "text-[#B5C1D1] hover:text-[#F5F8FC]"
                }`}
              >
                <span>Structured Data</span>
                <ChevronRight size={16} className="text-[#7F8DA3]" />
              </Link>
              <Link
                href="/tools/marketing/"
                className={`flex items-center justify-between py-2.5 text-sm font-medium transition-colors ${
                  isLinkActive("/tools/marketing/") ? "text-[#7893FF] font-semibold" : "text-[#B5C1D1] hover:text-[#F5F8FC]"
                }`}
              >
                <span>Marketing</span>
                <ChevronRight size={16} className="text-[#7F8DA3]" />
              </Link>
              <Link
                href="/blog/"
                className={`flex items-center justify-between py-2.5 text-sm font-medium transition-colors ${
                  cleanPathname === "/blog/" ? "text-[#7893FF] font-semibold" : "text-[#B5C1D1] hover:text-[#F5F8FC]"
                }`}
              >
                <span>Blog</span>
                <ChevronRight size={16} className="text-[#7F8DA3]" />
              </Link>
            </div>

            <div className="pt-4 border-t border-[#22344C] space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#7F8DA3]">
                Company
              </p>
              <Link
                href="/about/"
                className="block py-1.5 text-sm font-medium text-[#B5C1D1] hover:text-[#F5F8FC]"
              >
                About Zenvuk
              </Link>
              <Link
                href="/methodology/"
                className="block py-1.5 text-sm font-medium text-[#B5C1D1] hover:text-[#F5F8FC]"
              >
                Methodology &amp; Standards
              </Link>
              <Link
                href="/contact/"
                className="block py-1.5 text-sm font-medium text-[#B5C1D1] hover:text-[#F5F8FC]"
              >
                Contact
              </Link>
            </div>

            <div className="pt-4">
              <Link
                href="/tools/"
                className="w-full inline-flex items-center justify-center gap-2 rounded-btn bg-[#5B7CFF] hover:bg-[#6B88FF] py-3 text-xs font-semibold text-white shadow-sm"
              >
                <span>Explore All 15 Tools</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

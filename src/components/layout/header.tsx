"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full bg-paper border-b border-line transition-all duration-200 z-40 ${
        isScrolled ? "sticky top-0 shadow-level1 h-[60px]" : "relative h-[72px]"
      }`}
    >
      <div className="max-w-container mx-auto px-6 h-full flex items-center justify-between">
        {/* Left: Logo Lockup */}
        <Link href="/" className="flex items-center gap-3 group focus-visible:outline-none">
          {/* PSF Emblem Crest */}
          <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white border border-green-800 shadow-sm shrink-0">
            <span className="font-serif font-bold text-sm tracking-tighter" style={{ color: "var(--logo-gold)" }}>
              PSF
            </span>
          </div>
          {/* Wordmark */}
          {!isScrolled && (
            <div className="flex flex-col">
              <span className="font-serif font-bold text-[18px] leading-tight text-ink-900 group-hover:text-green-700 transition-colors">
                Pakistan Strategic Forum
              </span>
              <span className="font-sans text-[11px] uppercase tracking-wider text-ink-500 font-medium">
                Defence & Security Think Tank
              </span>
            </div>
          )}
        </Link>

        {/* Centre: Primary Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8 h-full font-sans text-[15px] font-medium text-ink-700">
          <Link
            href="/topics"
            className="h-full flex items-center gap-1 hover:text-green-700 transition-colors border-b-2 border-transparent hover:border-green-700"
          >
            <span>Topics</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </Link>

          <Link
            href="/reports"
            className="h-full flex items-center gap-1 hover:text-green-700 transition-colors border-b-2 border-transparent hover:border-green-700"
          >
            <span>Reports</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </Link>

          <Link
            href="/research"
            className="h-full flex items-center gap-1 hover:text-green-700 transition-colors border-b-2 border-transparent hover:border-green-700"
          >
            <span>Research</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </Link>

          <Link
            href="/global-watch"
            className="h-full flex items-center hover:text-green-700 transition-colors border-b-2 border-transparent hover:border-green-700"
          >
            Global Watch
          </Link>

          <Link
            href="/newsroom"
            className="h-full flex items-center gap-2 hover:text-green-700 transition-colors border-b-2 border-transparent hover:border-green-700"
          >
            <span>Newsroom</span>
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </Link>

          <Link
            href="/about"
            className="h-full flex items-center gap-1 hover:text-green-700 transition-colors border-b-2 border-transparent hover:border-green-700"
          >
            <span>About</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </Link>
        </nav>

        {/* Right: Search + Auth Actions */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="p-2 text-ink-700 hover:text-green-700 hover:bg-ivory-100 rounded-button transition-colors focus-visible:outline-none"
            aria-label="Search"
            title="Search (/)"
          >
            <Search className="w-4 h-4 stroke-[1.75]" />
          </button>

          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/sign-in"
              className="font-sans text-sm font-medium text-ink-700 hover:text-green-700 px-2 py-1 transition-colors"
            >
              Sign in
            </Link>
            <Link href="/join">
              <Button variant="primary" size="sm">
                Write for PSF
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-ink-700 hover:text-green-700 focus-visible:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[72px] bg-paper border-b border-line shadow-level2 py-4 px-6 flex flex-col gap-4 font-sans text-base z-50">
          <Link href="/topics" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-line">
            Topics
          </Link>
          <Link href="/reports" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-line">
            Reports
          </Link>
          <Link href="/research" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-line">
            Research
          </Link>
          <Link href="/global-watch" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-line">
            Global Watch
          </Link>
          <Link href="/newsroom" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-line flex items-center justify-between">
            <span>Newsroom</span>
            <span className="w-2 h-2 rounded-full bg-green-500" />
          </Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-line">
            About PSF
          </Link>
          <div className="pt-2 flex flex-col gap-2">
            <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="secondary" className="w-full">
                Sign in
              </Button>
            </Link>
            <Link href="/join" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full">
                Write for PSF
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

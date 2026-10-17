"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-green-900 text-white/85 font-sans border-t border-green-800 select-none">
      <div className="max-w-container mx-auto px-6 py-16">
        {/* Top Row: Brand & Mission */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-white/10">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <span className="font-serif font-bold text-xs" style={{ color: "var(--logo-gold)" }}>
                  PSF
                </span>
              </div>
              <span className="font-serif font-bold text-xl text-white">
                Pakistan Strategic Forum
              </span>
            </div>
            <p className="font-serif text-sm text-white/70 italic">
              Independent analysis of the forces shaping Pakistan&apos;s security and the region around it.
            </p>
          </div>

          <Link href="/join">
            <Button variant="secondary-dark" size="sm">
              Write for PSF
            </Button>
          </Link>
        </div>

        {/* 5 Link Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 py-12 text-sm">
          {/* Col 1: Topics */}
          <div className="flex flex-col gap-3">
            <span className="font-serif font-semibold text-white tracking-wide">Topics</span>
            <Link href="/topics/defence" className="hover:text-white transition-colors">
              Defence
            </Link>
            <Link href="/topics/geopolitics" className="hover:text-white transition-colors">
              Geopolitics
            </Link>
            <Link href="/topics/national-affairs" className="hover:text-white transition-colors">
              National Affairs
            </Link>
            <Link href="/topics/history" className="hover:text-white transition-colors">
              Military History
            </Link>
            <Link href="/topics" className="text-white/60 hover:text-white transition-colors">
              Browse all topics →
            </Link>
          </div>

          {/* Col 2: Publications */}
          <div className="flex flex-col gap-3">
            <span className="font-serif font-semibold text-white tracking-wide">Publications</span>
            <Link href="/reports" className="hover:text-white transition-colors">
              Reports
            </Link>
            <Link href="/research" className="hover:text-white transition-colors">
              PSF Research
            </Link>
            <Link href="/newsroom" className="hover:text-white transition-colors">
              Newsroom
            </Link>
            <Link href="/global-watch" className="hover:text-white transition-colors">
              Global Watch
            </Link>
            <Link href="/videos" className="hover:text-white transition-colors">
              Videos
            </Link>
            <Link href="/rss.xml" className="text-white/60 hover:text-white transition-colors">
              RSS Feeds
            </Link>
          </div>

          {/* Col 3: About PSF */}
          <div className="flex flex-col gap-3">
            <span className="font-serif font-semibold text-white tracking-wide">About PSF</span>
            <Link href="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/editorial-policy" className="hover:text-white transition-colors">
              Editorial Policy
            </Link>
            <Link href="/corrections" className="hover:text-white transition-colors">
              Corrections Log
            </Link>
            <Link href="/contributor-agreement" className="hover:text-white transition-colors">
              Contributor Agreement
            </Link>
            <Link href="/publish-with-us" className="hover:text-white transition-colors">
              Publish With Us
            </Link>
            <Link href="/where-we-are" className="hover:text-white transition-colors">
              Official Channels
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact Us
            </Link>
          </div>

          {/* Col 4: Work With Us */}
          <div className="flex flex-col gap-3">
            <span className="font-serif font-semibold text-white tracking-wide">Work With Us</span>
            <Link href="/advertise" className="hover:text-white transition-colors">
              Advertise With Us
            </Link>
            <Link href="/research/submit" className="hover:text-white transition-colors">
              Submit a Paper
            </Link>
            <Link href="/join/article" className="hover:text-white transition-colors">
              Write an Article
            </Link>
            <Link href="/research/peer-review" className="hover:text-white transition-colors">
              How Peer Review Works
            </Link>
          </div>

          {/* Col 5: Legal */}
          <div className="flex flex-col gap-3">
            <span className="font-serif font-semibold text-white tracking-wide">Legal</span>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">
              Disclaimer
            </Link>
            <Link href="/copyright" className="hover:text-white transition-colors">
              Copyright & Takedown
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Cookies, Back to Top */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            © 2019–{currentYear} Pakistan Strategic Forum. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookie settings
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Globe } from "lucide-react";

export function UtilityBar() {
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    // Format current date in PKT (UTC+5)
    const now = new Date();
    const formatted = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Karachi",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(now);
    setCurrentDate(formatted);
  }, []);

  return (
    <div className="hidden md:block w-full bg-ivory-100 border-b border-line text-xs font-sans text-ink-500 h-9 select-none">
      <div className="max-w-container mx-auto px-6 h-full flex items-center justify-between">
        {/* Left: Date + Global Watch link */}
        <div className="flex items-center gap-6">
          <span>{currentDate || "Pakistan Strategic Forum"}</span>
          <span className="text-line">|</span>
          <Link
            href="/global-watch"
            className="flex items-center gap-1.5 hover:text-green-700 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-green-700" />
            <span>Global Watch</span>
            <span className="text-ink-400 font-medium">(212 locations covered)</span>
          </Link>
        </div>

        {/* Right: Text size + Social + Advertise */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-ink-400">Text size</span>
            <div className="inline-flex border border-line bg-white rounded-sm overflow-hidden">
              <button
                type="button"
                className="px-1.5 py-0.5 hover:bg-ivory-50 text-[11px] font-serif border-r border-line"
                title="Smaller text"
              >
                A−
              </button>
              <button
                type="button"
                className="px-1.5 py-0.5 hover:bg-ivory-50 text-xs font-serif border-r border-line font-bold text-green-700"
                title="Default text"
              >
                A
              </button>
              <button
                type="button"
                className="px-1.5 py-0.5 hover:bg-ivory-50 text-sm font-serif"
                title="Larger text"
              >
                A+
              </button>
            </div>
          </div>

          <span className="text-line">|</span>

          <div className="flex items-center gap-3">
            <a
              href="https://twitter.com/ForumStrategic"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink-900 transition-colors"
              aria-label="PSF on X"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink-900 transition-colors"
              aria-label="PSF on YouTube"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>

          <span className="text-line">|</span>

          <Link href="/advertise" className="hover:text-green-700 font-medium transition-colors">
            Advertise
          </Link>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AuthShellProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  maxWidth?: "default" | "wide";
  className?: string;
}

export function AuthShell({
  children,
  title,
  subtitle,
  maxWidth = "default",
  className,
}: AuthShellProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen w-full bg-ivory-50 flex flex-col justify-between py-12 px-4 sm:px-6">
      {/* Top Logo Lockup (Centered) */}
      <div className="flex flex-col items-center text-center">
        <Link href="/" className="group flex flex-col items-center gap-2.5 focus-visible:outline-none">
          <div className="w-12 h-12 rounded-full bg-green-700 flex items-center justify-center text-white border border-green-800 shadow-sm transition-transform duration-200 group-hover:scale-105">
            <span className="font-serif font-bold text-base" style={{ color: "var(--logo-gold)" }}>
              PSF
            </span>
          </div>
          <div>
            <span className="font-serif font-bold text-xl text-ink-900 group-hover:text-green-700 transition-colors block">
              Pakistan Strategic Forum
            </span>
            <span className="font-sans text-xs uppercase tracking-wider text-ink-500 font-medium">
              Defence & Security Think Tank
            </span>
          </div>
        </Link>
      </div>

      {/* Centered Auth Card Shell */}
      <div
        className={cn(
          "w-full mx-auto my-8 bg-white border border-line rounded-card shadow-level1 p-8 sm:p-12",
          maxWidth === "wide" ? "max-w-3xl" : "max-w-xl",
          className
        )}
      >
        {title && (
          <div className="mb-6 text-center">
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-ink-900">{title}</h1>
            {subtitle && <p className="font-serif text-sm text-ink-500 mt-1">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>

      {/* Minimal Footer */}
      <div className="text-center text-xs font-sans text-ink-400">
        © 2019–{currentYear} Pakistan Strategic Forum. All rights reserved.
      </div>
    </div>
  );
}

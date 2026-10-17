"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  FileSpreadsheet,
  GraduationCap,
  ClipboardCheck,
  Bell,
  User,
  Settings,
  ExternalLink,
  Shield,
  LogOut,
  PenTool,
  ChevronDown,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PortalShellProps {
  children: React.ReactNode;
  title: string;
}

export function PortalShell({ children, title }: PortalShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [createMenuOpen, setCreateMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory-50 flex font-sans">
      {/* ========================================================
          PORTAL SIDEBAR (240px or 64px collapsed)
          ======================================================== */}
      <aside
        className={`fixed inset-y-0 left-0 bg-white border-r border-line z-30 transition-all duration-200 flex flex-col justify-between ${
          sidebarCollapsed ? "w-16" : "w-60"
        }`}
      >
        <div>
          {/* Logo */}
          <div className="h-16 px-4 border-b border-line flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 focus:outline-none">
              <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white shrink-0 font-serif font-bold text-xs">
                PSF
              </div>
              {!sidebarCollapsed && (
                <span className="font-serif font-bold text-sm text-ink-900 truncate">
                  Contributor Portal
                </span>
              )}
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 text-sm font-medium text-ink-700">
            <Link
              href="/portal"
              className="flex items-center gap-3 px-3 py-2 rounded-sm bg-green-50 text-green-700 font-semibold"
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Overview</span>}
            </Link>

            <Link
              href="/portal/articles"
              className="flex items-center gap-3 px-3 py-2 rounded-sm hover:bg-ivory-100 transition-colors"
            >
              <FileText className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>My Articles</span>}
            </Link>

            <Link
              href="/portal/reports"
              className="flex items-center gap-3 px-3 py-2 rounded-sm hover:bg-ivory-100 transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>My Reports</span>}
            </Link>

            <Link
              href="/portal/research"
              className="flex items-center gap-3 px-3 py-2 rounded-sm hover:bg-ivory-100 transition-colors"
            >
              <GraduationCap className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>My Research</span>}
            </Link>

            <Link
              href="/portal/reviews"
              className="flex items-center gap-3 px-3 py-2 rounded-sm hover:bg-ivory-100 transition-colors"
            >
              <ClipboardCheck className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && (
                <div className="flex items-center justify-between flex-1">
                  <span>Reviews</span>
                  <span className="px-1.5 py-0.2 bg-warning-50 text-warning-700 rounded-chip text-[10px] font-bold">
                    2
                  </span>
                </div>
              )}
            </Link>

            <div className="pt-3 my-2 border-t border-line" />

            <Link
              href="/portal/notifications"
              className="flex items-center gap-3 px-3 py-2 rounded-sm hover:bg-ivory-100 transition-colors"
            >
              <Bell className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Notifications</span>}
            </Link>

            <Link
              href="/portal/profile"
              className="flex items-center gap-3 px-3 py-2 rounded-sm hover:bg-ivory-100 transition-colors"
            >
              <User className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Author Profile</span>}
            </Link>

            <Link
              href="/portal/account"
              className="flex items-center gap-3 px-3 py-2 rounded-sm hover:bg-ivory-100 transition-colors"
            >
              <Settings className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Account & 2FA</span>}
            </Link>
          </nav>
        </div>

        {/* Bottom Switchers & Sign out */}
        <div className="p-3 border-t border-line space-y-1 text-xs">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-ink-500 hover:text-ink-900 rounded-sm hover:bg-ivory-100"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {!sidebarCollapsed && <span>View Public Site</span>}
          </Link>

          <Link
            href="/admin"
            className="flex items-center gap-2 px-3 py-2 text-green-700 font-semibold hover:bg-green-50 rounded-sm"
          >
            <Shield className="w-3.5 h-3.5" />
            {!sidebarCollapsed && <span>Admin Dashboard</span>}
          </Link>

          <Link
            href="/sign-in"
            className="flex items-center gap-2 px-3 py-2 text-danger-700 hover:bg-danger-50 rounded-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            {!sidebarCollapsed && <span>Sign Out</span>}
          </Link>
        </div>
      </aside>

      {/* ========================================================
          PORTAL MAIN AREA
          ======================================================== */}
      <div className={`flex-1 flex flex-col transition-all duration-200 ${sidebarCollapsed ? "ml-16" : "ml-60"}`}>
        {/* Top Bar (64px) */}
        <header className="h-16 bg-white border-b border-line px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-ink-500 hover:text-ink-900 focus:outline-none"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-serif font-bold text-xl text-ink-900">{title}</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Split Action Button */}
            <div className="relative">
              <div className="inline-flex rounded-button shadow-sm">
                <Link href="/portal/articles/new">
                  <Button variant="primary" size="sm" className="rounded-r-none gap-1.5">
                    <PenTool className="w-3.5 h-3.5" />
                    <span>Write Article</span>
                  </Button>
                </Link>
                <button
                  type="button"
                  onClick={() => setCreateMenuOpen(!createMenuOpen)}
                  className="bg-green-800 hover:bg-green-900 text-white px-2 rounded-r-button border-l border-green-900 focus:outline-none"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {createMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-line rounded-card shadow-level2 py-1 z-30 text-xs font-sans">
                  <Link
                    href="/portal/reports/new"
                    onClick={() => setCreateMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-ivory-50 text-ink-700"
                  >
                    Write Special Report
                  </Link>
                  <Link
                    href="/portal/research/new"
                    onClick={() => setCreateMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-ivory-50 text-ink-700"
                  >
                    Submit Research Paper
                  </Link>
                </div>
              )}
            </div>

            <Link href="/portal/notifications" className="relative p-2 text-ink-500 hover:text-ink-900">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-700 rounded-full" />
            </Link>

            <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-xs border border-green-200">
              TM
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}

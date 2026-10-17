"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  KeyRound,
  FileText,
  FileSpreadsheet,
  GraduationCap,
  Flame,
  Star,
  Tags,
  Globe,
  Megaphone,
  Inbox,
  CreditCard,
  Layers,
  History,
  Settings,
  Search,
  Plus,
  Bell,
  Menu,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminShellProps {
  children: React.ReactNode;
  title: string;
}

export function AdminShell({ children, title }: AdminShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [quickCreateOpen, setQuickCreateOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory-50 flex font-sans">
      {/* ========================================================
          ADMIN SIDEBAR (264px)
          ======================================================== */}
      <aside
        className={`fixed inset-y-0 left-0 bg-white border-r border-line z-30 transition-all duration-200 flex flex-col justify-between ${
          sidebarCollapsed ? "w-16" : "w-[264px]"
        }`}
      >
        <div className="overflow-y-auto flex-1">
          {/* Logo Header */}
          <div className="h-16 px-4 border-b border-line flex items-center justify-between sticky top-0 bg-white z-10">
            <Link href="/" className="flex items-center gap-2.5 focus:outline-none">
              <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white shrink-0 font-serif font-bold text-xs">
                PSF
              </div>
              {!sidebarCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="font-serif font-bold text-sm text-ink-900 truncate">
                    PSF Administration
                  </span>
                  <span className="text-[10px] uppercase font-sans text-green-700 font-semibold tracking-wider">
                    Super Admin Console
                  </span>
                </div>
              )}
            </Link>
          </div>

          {/* Grouped Admin Navigation Links */}
          <nav className="p-3 space-y-4 text-xs font-medium text-ink-700">
            {/* Core Overview */}
            <div className="space-y-1">
              <Link
                href="/admin"
                className="flex items-center gap-2.5 px-3 py-2 rounded-sm bg-green-50 text-green-700 font-semibold"
              >
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && <span>Overview</span>}
              </Link>
              <Link
                href="/admin/analytics"
                className="flex items-center gap-2.5 px-3 py-2 rounded-sm hover:bg-ivory-100 transition-colors"
              >
                <BarChart3 className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && <span>Analytics</span>}
              </Link>
            </div>

            {/* User & Access Management */}
            <div>
              {!sidebarCollapsed && (
                <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">
                  Access & People
                </span>
              )}
              <div className="space-y-1">
                <Link
                  href="/admin/users"
                  className="flex items-center justify-between px-3 py-1.5 rounded-sm hover:bg-ivory-100 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 shrink-0" />
                    {!sidebarCollapsed && <span>Users & Authors</span>}
                  </div>
                </Link>
                <Link
                  href="/admin/applications"
                  className="flex items-center justify-between px-3 py-1.5 rounded-sm hover:bg-ivory-100 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 shrink-0" />
                    {!sidebarCollapsed && <span>Applications</span>}
                  </div>
                  {!sidebarCollapsed && (
                    <span className="px-1.5 py-0.2 bg-warning-50 text-warning-700 rounded-chip text-[10px] font-bold">
                      3
                    </span>
                  )}
                </Link>
                <Link
                  href="/admin/roles"
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-sm hover:bg-ivory-100 transition-colors"
                >
                  <KeyRound className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && <span>Roles & Permissions</span>}
                </Link>
              </div>
            </div>

            {/* Editorial Queues */}
            <div>
              {!sidebarCollapsed && (
                <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">
                  Editorial Queues
                </span>
              )}
              <div className="space-y-1">
                <Link
                  href="/admin/articles"
                  className="flex items-center justify-between px-3 py-1.5 rounded-sm hover:bg-ivory-100 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 shrink-0" />
                    {!sidebarCollapsed && <span>Articles</span>}
                  </div>
                  {!sidebarCollapsed && (
                    <span className="px-1.5 py-0.2 bg-green-100 text-green-700 rounded-chip text-[10px] font-bold">
                      2
                    </span>
                  )}
                </Link>
                <Link
                  href="/admin/reports"
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-sm hover:bg-ivory-100 transition-colors"
                >
                  <FileSpreadsheet className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && <span>Special Reports</span>}
                </Link>
                <Link
                  href="/admin/research"
                  className="flex items-center justify-between px-3 py-1.5 rounded-sm hover:bg-ivory-100 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4 shrink-0" />
                    {!sidebarCollapsed && <span>Research Papers</span>}
                  </div>
                  {!sidebarCollapsed && (
                    <span className="px-1.5 py-0.2 bg-warning-50 text-warning-700 rounded-chip text-[10px] font-bold">
                      1
                    </span>
                  )}
                </Link>
                <Link
                  href="/admin/newsroom"
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-sm hover:bg-ivory-100 transition-colors"
                >
                  <Flame className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && <span>Newsroom Wire</span>}
                </Link>
                <Link
                  href="/admin/featured"
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-sm hover:bg-ivory-100 transition-colors"
                >
                  <Star className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && <span>Featured Slots</span>}
                </Link>
              </div>
            </div>

            {/* Publishing Engines */}
            <div>
              {!sidebarCollapsed && (
                <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">
                  Engines & Intelligence
                </span>
              )}
              <div className="space-y-1">
                <Link
                  href="/admin/taxonomy"
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-sm hover:bg-ivory-100 transition-colors"
                >
                  <Tags className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && <span>Taxonomy Desks</span>}
                </Link>
                <Link
                  href="/admin/global-watch"
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-sm hover:bg-ivory-100 transition-colors"
                >
                  <Globe className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && <span>Global Watch Admin</span>}
                </Link>
                <Link
                  href="/admin/ads"
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-sm hover:bg-ivory-100 transition-colors"
                >
                  <Megaphone className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && <span>Ad Campaigns</span>}
                </Link>
                <Link
                  href="/admin/inbox"
                  className="flex items-center justify-between px-3 py-1.5 rounded-sm hover:bg-ivory-100 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Inbox className="w-4 h-4 shrink-0" />
                    {!sidebarCollapsed && <span>Unified Inbox</span>}
                  </div>
                  {!sidebarCollapsed && (
                    <span className="px-1.5 py-0.2 bg-info-50 text-info-700 rounded-chip text-[10px] font-bold">
                      5
                    </span>
                  )}
                </Link>
                <Link
                  href="/admin/id-cards"
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-sm hover:bg-ivory-100 transition-colors"
                >
                  <CreditCard className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && <span>Staff ID Cards</span>}
                </Link>
                <Link
                  href="/admin/cms"
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-sm hover:bg-ivory-100 transition-colors"
                >
                  <Layers className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && <span>CMS Templates</span>}
                </Link>
              </div>
            </div>

            {/* Audit & Settings */}
            <div>
              {!sidebarCollapsed && (
                <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">
                  Security & Audit
                </span>
              )}
              <div className="space-y-1">
                <Link
                  href="/admin/activity-logs"
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-sm hover:bg-ivory-100 transition-colors"
                >
                  <History className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && <span>Activity Logs</span>}
                </Link>
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-sm hover:bg-ivory-100 transition-colors"
                >
                  <Settings className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && <span>System Settings</span>}
                </Link>
              </div>
            </div>
          </nav>
        </div>

        {/* Bottom Switcher */}
        <div className="p-3 border-t border-line text-xs">
          <Link
            href="/portal"
            className="flex items-center gap-2 px-3 py-2 text-ink-700 hover:text-green-700 rounded-sm hover:bg-ivory-100"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {!sidebarCollapsed && <span>Switch to Contributor Portal</span>}
          </Link>
        </div>
      </aside>

      {/* ========================================================
          ADMIN CONTENT AREA
          ======================================================== */}
      <div
        className={`flex-1 flex flex-col transition-all duration-200 ${
          sidebarCollapsed ? "ml-16" : "ml-[264px]"
        }`}
      >
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
            {/* Global Admin Search */}
            <div className="relative hidden md:block w-72">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-ink-400" />
              <input
                type="text"
                placeholder="Search users, articles, cards, IDs..."
                className="w-full h-9 pl-9 pr-3 text-xs font-sans border border-line rounded-input bg-ivory-50 focus:bg-white focus:border-green-700 focus:outline-none"
              />
            </div>

            {/* Quick Action Button */}
            <div className="relative">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setQuickCreateOpen(!quickCreateOpen)}
                className="gap-1.5 text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create</span>
                <ChevronDown className="w-3 h-3" />
              </Button>

              {quickCreateOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-line rounded-card shadow-level2 py-1 z-30 text-xs font-sans">
                  <Link
                    href="/admin/newsroom/new"
                    onClick={() => setQuickCreateOpen(false)}
                    className="block px-4 py-2 hover:bg-ivory-50 text-ink-700"
                  >
                    Newsroom Wire Post
                  </Link>
                  <Link
                    href="/admin/users/new"
                    onClick={() => setQuickCreateOpen(false)}
                    className="block px-4 py-2 hover:bg-ivory-50 text-ink-700"
                  >
                    Invite User / Approver
                  </Link>
                  <Link
                    href="/admin/ads/new"
                    onClick={() => setQuickCreateOpen(false)}
                    className="block px-4 py-2 hover:bg-ivory-50 text-ink-700"
                  >
                    New Ad Campaign
                  </Link>
                  <Link
                    href="/admin/id-cards"
                    onClick={() => setQuickCreateOpen(false)}
                    className="block px-4 py-2 hover:bg-ivory-50 text-ink-700"
                  >
                    Issue Staff ID Card
                  </Link>
                </div>
              )}
            </div>

            <Link href="/admin/inbox" className="relative p-2 text-ink-500 hover:text-ink-900">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-700 rounded-full" />
            </Link>

            <div className="w-8 h-8 rounded-full bg-green-900 text-white font-serif font-bold text-xs flex items-center justify-center">
              SA
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}

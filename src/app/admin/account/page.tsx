"use client";

import React, { useState } from "react";
import { AdminShell } from "@/components/layout/admin-shell";
import {
  User,
  Shield,
  Key,
  Smartphone,
  Laptop,
  Bell,
  Bookmark,
  CheckCircle2,
  Save,
  LogOut,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminAccountPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "sessions" | "notifications" | "views">("profile");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states
  const [profile, setProfile] = useState({
    displayName: "Dr. Tariq Niazi",
    email: "t.niazi@forumstrategic.com",
    designation: "Executive Director & Senior Strategic Fellow",
    institution: "Pakistan Strategic Forum",
    bio: "Specialising in nuclear deterrence, aerospace strategy, and Indian Ocean security architectures.",
  });

  const [notifications, setNotifications] = useState({
    notifyNewSubmissions: true,
    notifyReviewDecisions: true,
    notifyBreakingNews: true,
    notifySecurityAlerts: true,
    digestFrequency: "Immediate",
  });

  const [savedViews, setSavedViews] = useState([
    { id: "1", name: "High-Priority Pending Review (Air & Defence)", path: "/admin/articles?topic=defence&status=IN_REVIEW" },
    { id: "2", name: "Active Commercial Campaigns (October)", path: "/admin/ads?status=LIVE" },
    { id: "3", name: "Failed Sign-In Security Audits", path: "/admin/activity-logs?result=FAILED" },
  ]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <AdminShell title="My Admin Account">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
          <div>
            <div className="flex items-center gap-2 text-xs text-ink-500 mb-1">
              <span>Admin Console</span>
              <span>/</span>
              <span className="text-ink-900 font-semibold">Account & Security</span>
            </div>
            <h1 className="text-2xl font-bold font-serif text-ink-900 tracking-tight">
              Administrator Profile & Security
            </h1>
            <p className="text-xs text-ink-600 mt-1 max-w-2xl">
              Manage cryptographic credentials, two-factor authentication, active sessions, and personalised saved views.
            </p>
          </div>

          {saveSuccess && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 text-green-800 text-xs font-semibold rounded-sm">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Account settings saved</span>
            </div>
          )}
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 border-b border-line text-xs pb-px">
          {[
            { id: "profile", label: "Profile & Identity", icon: User },
            { id: "security", label: "Password & 2FA", icon: Shield },
            { id: "sessions", label: "Active Sessions", icon: Laptop },
            { id: "notifications", label: "Notification Rules", icon: Bell },
            { id: "views", label: "My Saved Views", icon: Bookmark },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 font-semibold transition-colors border-b-2 whitespace-nowrap ${
                  isActive
                    ? "border-green-700 text-green-700 bg-white"
                    : "border-transparent text-ink-600 hover:text-ink-900 hover:bg-ivory-50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PROFILE */}
        {activeTab === "profile" && (
          <form onSubmit={handleSave} className="bg-white border border-line rounded-sm p-6 space-y-4 text-xs">
            <h3 className="font-serif font-bold text-sm text-ink-900 pb-2 border-b border-line">
              Administrative Identity
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-ink-700 font-semibold mb-1">
                  Full Name / Display Identity
                </label>
                <input
                  type="text"
                  value={profile.displayName}
                  onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                  className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label className="block text-ink-700 font-semibold mb-1">
                  Institutional Email (Username)
                </label>
                <input
                  type="email"
                  disabled
                  value={profile.email}
                  className="w-full px-3 py-2 border border-line rounded-sm bg-ivory-100 text-ink-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-ink-700 font-semibold mb-1">
                  Designation / Editorial Title
                </label>
                <input
                  type="text"
                  value={profile.designation}
                  onChange={(e) => setProfile({ ...profile, designation: e.target.value })}
                  className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label className="block text-ink-700 font-semibold mb-1">
                  Affiliation
                </label>
                <input
                  type="text"
                  value={profile.institution}
                  onChange={(e) => setProfile({ ...profile, institution: e.target.value })}
                  className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-ink-700 font-semibold mb-1">
                  Short Biographical Note
                </label>
                <textarea
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full p-3 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700 text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-line">
              <Button variant="primary" type="submit">
                <Save className="w-3.5 h-3.5 mr-1.5" />
                <span>Save Profile Changes</span>
              </Button>
            </div>
          </form>
        )}

        {/* TAB 2: SECURITY & 2FA */}
        {activeTab === "security" && (
          <div className="space-y-6 text-xs">
            {/* 2FA Card */}
            <div className="bg-white border border-line rounded-sm p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-serif font-bold text-sm text-ink-900">
                    Two-Factor Authentication (TOTP)
                  </h3>
                  <p className="text-ink-500">
                    Mandatory for Super Administrator accounts. Protects your account with an authenticator app (Google Authenticator, 1Password, Aegis).
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-green-100 text-green-800 rounded-sm font-bold text-[10px] uppercase">
                  Active & Enforced
                </span>
              </div>

              <div className="p-3 bg-ivory-50 border border-line rounded-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-green-700" />
                  <div>
                    <span className="font-bold text-ink-900 block">Authenticator App Verified</span>
                    <span className="text-[11px] text-ink-500">Last challenge verified: 18 October 2026, 01:30 PKT</span>
                  </div>
                </div>
                <Button variant="outline" type="button">
                  Regenerate Backup Codes
                </Button>
              </div>
            </div>

            {/* Change Password Card */}
            <form onSubmit={handleSave} className="bg-white border border-line rounded-sm p-6 space-y-4">
              <h3 className="font-serif font-bold text-sm text-ink-900 pb-2 border-b border-line">
                Change Password (Argon2id)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-ink-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-ink-700 mb-1">
                    New Password (Min. 10 chars)
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-ink-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-line">
                <Button variant="primary" type="submit">
                  <Key className="w-3.5 h-3.5 mr-1.5" />
                  <span>Update Password</span>
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: ACTIVE SESSIONS */}
        {activeTab === "sessions" && (
          <div className="bg-white border border-line rounded-sm p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <div>
                <h3 className="font-serif font-bold text-sm text-ink-900">
                  Active Admin Sessions
                </h3>
                <p className="text-ink-500">
                  Devices and geographic locations currently authorised to access your administrator profile.
                </p>
              </div>
              <Button variant="outline" type="button">
                <LogOut className="w-3.5 h-3.5 mr-1" />
                <span>Revoke All Other Sessions</span>
              </Button>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-green-50/40 border border-green-200 rounded-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Laptop className="w-5 h-5 text-green-700" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-ink-900">Chrome 128 on macOS 14.5</span>
                      <span className="px-1.5 py-0.2 bg-green-100 text-green-800 rounded-sm font-bold text-[9px] uppercase">
                        Current Session
                      </span>
                    </div>
                    <span className="text-[11px] text-ink-500 font-mono block mt-0.5">
                      IP: 182.188.10.45 • Islamabad, Pakistan • Active now
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white border border-line rounded-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-ink-500" />
                  <div>
                    <span className="font-bold text-ink-800">Safari on iOS 17.5</span>
                    <span className="text-[11px] text-ink-500 font-mono block mt-0.5">
                      IP: 182.188.10.45 • Islamabad, Pakistan • Last active 4 hours ago
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Revoke
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: NOTIFICATIONS */}
        {activeTab === "notifications" && (
          <form onSubmit={handleSave} className="bg-white border border-line rounded-sm p-6 space-y-4 text-xs">
            <h3 className="font-serif font-bold text-sm text-ink-900 pb-2 border-b border-line">
              Editorial & Security Notification Preferences
            </h3>

            <div className="space-y-3">
              {[
                { key: "notifyNewSubmissions", label: "New Manuscript Submissions", desc: "Receive immediate notification when an article or report is submitted for desk review." },
                { key: "notifyReviewDecisions", label: "Peer Review Referee Feedback", desc: "Notify when an independent approver completes blind peer review evaluation." },
                { key: "notifyBreakingNews", label: "Breaking Newsroom Wire Alerts", desc: "Alert when a 6-hour breaking alert is broadcast to public channels." },
                { key: "notifySecurityAlerts", label: "Security & Lockout Notifications", desc: "Receive immediate dispatch upon 5 failed sign-in attempts or IP blocks." },
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-start gap-3 p-3 bg-ivory-50 border border-line rounded-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={(notifications as any)[item.key]}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        [item.key]: e.target.checked,
                      })
                    }
                    className="mt-0.5 rounded-sm border-line text-green-700 focus:ring-green-700"
                  />
                  <div>
                    <span className="font-bold text-ink-900 block">{item.label}</span>
                    <span className="text-[11px] text-ink-500">{item.desc}</span>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex justify-end pt-3 border-t border-line">
              <Button variant="primary" type="submit">
                <Save className="w-3.5 h-3.5 mr-1.5" />
                <span>Save Notification Rules</span>
              </Button>
            </div>
          </form>
        )}

        {/* TAB 5: MY SAVED VIEWS */}
        {activeTab === "views" && (
          <div className="bg-white border border-line rounded-sm p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <div>
                <h3 className="font-serif font-bold text-sm text-ink-900">
                  Custom Saved Views (FRD Section 12.19)
                </h3>
                <p className="text-ink-500">
                  Quick-access filtered queues across Articles, Campaigns, and Activity Logs.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {savedViews.map((v) => (
                <div
                  key={v.id}
                  className="p-3 bg-ivory-50 border border-line rounded-sm flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-ink-900 block">{v.name}</span>
                    <span className="font-mono text-[10px] text-ink-500">{v.path}</span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = v.path}
                  >
                    Open View →
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}

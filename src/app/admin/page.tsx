"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Globe,
  FileText,
  Users,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { AdminShell } from "@/components/layout/admin-shell";
import { KpiTile } from "@/components/ui/kpi-tile";
import { Button } from "@/components/ui/button";

const actionCentreCards = [
  { label: "Pending Contributor Applications", count: 3, href: "/admin/applications", urgent: true },
  { label: "Articles & Reports Pending Review", count: 2, href: "/admin/articles", urgent: true },
  { label: "Research Editor Decisions Needed", count: 1, href: "/admin/research", urgent: true },
  { label: "Overdue Peer Reviews (Approvers)", count: 1, href: "/admin/research", urgent: true },
  { label: "Unread Unified Inbox Messages", count: 5, href: "/admin/inbox", urgent: false },
  { label: "Featured Slots Holding Expired Content", count: 1, href: "/admin/featured", urgent: false },
  { label: "Ad Campaigns Ending in 7 Days", count: 2, href: "/admin/ads", urgent: false },
  { label: "Globe Status Entries Past Review", count: 0, href: "/admin/global-watch", urgent: false },
];

const recentSubmissions = [
  { id: "1", title: "Electronic Warfare Countermeasures in Trans-Himalayan Border Patrols", type: "Article", author: "Dr. Ayesha Siddiqui", submittedAt: "18 Oct 2026, 11:20 PKT", status: "IN_REVIEW", country: "Pakistan" },
  { id: "2", title: "Naval Chokepoints: Arabian Sea Sea Lines of Communication", type: "Report", author: "Commodore (Retd) Bilal Zafar", submittedAt: "17 Oct 2026, 16:40 PKT", status: "IN_REVIEW", country: "Pakistan" },
  { id: "3", title: "Algorithmic Escalation Thresholds in Sensor-to-Shooter Missile Networks", type: "Research", author: "Dr. Tariq Mahmud", submittedAt: "15 Oct 2026, 09:10 PKT", status: "SCREENING", country: "Pakistan" },
  { id: "4", title: "Rare-Earth Mineral Vulnerabilities in High-Altitude Aerospace Actuators", type: "Research", author: "Prof. Khalid Mehmood", submittedAt: "14 Oct 2026, 18:30 PKT", status: "UNDER_REVIEW", country: "Pakistan" },
];

export default function AdminOverviewPage() {
  const [trafficPeriod, setTrafficPeriod] = useState<"today" | "30d">("today");

  return (
    <AdminShell title="System Overview & Operations">
      <div className="space-y-8">
        {/* ========================================================
            1. ACTION CENTRE (4 PER ROW)
            ======================================================== */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-ink-900">Action Centre</h3>
            <span className="text-xs font-sans text-ink-400">Items requiring administrative decision or review</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {actionCentreCards.map((card) => (
              <Link
                key={card.label}
                href={card.href}
                className={`p-4 border rounded-card transition-all hover:shadow-sm ${
                  card.count > 0 && card.urgent
                    ? "bg-warning-50/50 border-warning-700/30 hover:border-warning-700"
                    : "bg-white border-line hover:border-green-700"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`font-mono text-2xl font-bold tabular-nums ${
                      card.count > 0 && card.urgent ? "text-warning-700" : "text-ink-900"
                    }`}
                  >
                    {card.count}
                  </span>
                  {card.count > 0 && card.urgent && (
                    <span className="w-2 h-2 rounded-full bg-warning-700 animate-pulse" />
                  )}
                </div>
                <h5 className="font-serif font-semibold text-xs text-ink-700 leading-snug">
                  {card.label}
                </h5>
              </Link>
            ))}
          </div>
        </div>

        {/* ========================================================
            2. TRAFFIC KPIS (TODAY, PKT)
            ======================================================== */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-serif font-bold text-lg text-ink-900">Traffic & Engagement</h3>
            <span className="text-xs font-sans text-ink-400">Real-time metrics (PKT)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <KpiTile
              value="4,820"
              label="Unique Visitors"
              delta={{ value: "+12.4%", positive: true, period: "prev week" }}
            />
            <KpiTile
              value="18,490"
              label="Page Views"
              delta={{ value: "+8.1%", positive: true, period: "prev week" }}
            />
            <KpiTile
              value="9,240"
              label="Verified Reads"
              delta={{ value: "+15.3%", positive: true, period: "prev week" }}
            />
            <KpiTile value="4m 12s" label="Avg. Time on Page" />
          </div>
        </div>

        {/* ========================================================
            3. 30-DAY VISITOR ACTIVITY & HEATMAP
            ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 30-Day Visitors Trend (Cols 1-8) */}
          <div className="lg:col-span-8 bg-white border border-line rounded-card p-6 shadow-level1">
            <div className="flex items-center justify-between pb-4 border-b border-line mb-6">
              <div>
                <h4 className="font-serif font-bold text-base text-ink-900">
                  Visitor Volume (Last 30 Days)
                </h4>
                <p className="font-serif text-xs text-ink-500">
                  Daily visitors and page views across public domain
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-sans">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-700" />
                  <span>Visitors</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-info-700" />
                  <span>Views</span>
                </span>
              </div>
            </div>

            {/* Visual Trend Bars */}
            <div className="h-56 w-full flex items-end gap-1.5 pt-8 pb-2 border-b border-line">
              {[35, 42, 50, 48, 62, 70, 65, 80, 85, 78, 92, 95, 88, 102, 115, 110, 125, 130, 120, 142, 138, 150, 160, 155].map(
                (v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-green-700/80 hover:bg-green-700 rounded-t-sm transition-all"
                      style={{ height: `${(v / 180) * 100}%` }}
                    />
                  </div>
                )
              )}
            </div>
            <div className="flex justify-between text-[11px] font-sans text-ink-400 pt-2">
              <span>18 Sep 2026</span>
              <span>02 Oct 2026</span>
              <span>18 Oct 2026</span>
            </div>
          </div>

          {/* Live Now & Peak Hours Heatmap (Cols 9-12) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Live Now Card */}
            <div className="bg-white border border-line rounded-card p-6 shadow-level1">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-green-700">
                  Live Right Now
                </span>
              </div>
              <div className="font-mono text-4xl font-bold text-ink-900 mb-2">84</div>
              <p className="text-xs font-sans text-ink-500 mb-4">Active concurrent visitors on forumstrategic.com</p>

              <div className="border-t border-line pt-3 space-y-1.5 text-xs font-sans">
                <span className="font-semibold text-ink-900 block mb-1">Top Active URLs:</span>
                <div className="flex justify-between text-ink-700">
                  <span className="truncate max-w-[200px]">/articles/pakistan-integrated-air-defence</span>
                  <span className="font-mono font-bold text-green-700">32</span>
                </div>
                <div className="flex justify-between text-ink-700">
                  <span className="truncate max-w-[200px]">/global-watch</span>
                  <span className="font-mono font-bold text-green-700">21</span>
                </div>
                <div className="flex justify-between text-ink-700">
                  <span className="truncate max-w-[200px]">/reports/south-asia-strategic-balance-2026</span>
                  <span className="font-mono font-bold text-green-700">14</span>
                </div>
              </div>
            </div>

            {/* Geographical Audience summary */}
            <div className="bg-white border border-line rounded-card p-6 shadow-level1">
              <h4 className="font-serif font-bold text-sm text-ink-900 pb-2 border-b border-line mb-3">
                Top Reader Nations (Today)
              </h4>
              <div className="space-y-2 text-xs font-sans">
                <div className="flex justify-between">
                  <span>1. Pakistan</span>
                  <span className="font-mono font-bold text-ink-900">2,640</span>
                </div>
                <div className="flex justify-between">
                  <span>2. United States</span>
                  <span className="font-mono font-bold text-ink-900">780</span>
                </div>
                <div className="flex justify-between">
                  <span>3. United Kingdom</span>
                  <span className="font-mono font-bold text-ink-900">420</span>
                </div>
                <div className="flex justify-between">
                  <span>4. Saudi Arabia</span>
                  <span className="font-mono font-bold text-ink-900">310</span>
                </div>
                <div className="flex justify-between">
                  <span>5. Turkey</span>
                  <span className="font-mono font-bold text-ink-900">260</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            4. RECENT SUBMISSIONS QUEUE
            ======================================================== */}
        <div className="bg-white border border-line rounded-card p-6 shadow-level1">
          <div className="flex items-center justify-between pb-4 border-b border-line mb-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-ink-900">Recent Content Submissions</h3>
              <p className="font-serif text-xs text-ink-500">Cross-type editorial submissions awaiting screening or decision</p>
            </div>
            <Link href="/admin/articles" className="text-xs font-sans font-medium text-green-700 hover:underline flex items-center">
              <span>View all editorial queues</span>
              <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="bg-ivory-50 border-b border-line text-ink-500 uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-4">Title</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Author</th>
                  <th className="py-2.5 px-3">Submitted (PKT)</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {recentSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-ivory-50">
                    <td className="py-3 px-4 font-serif font-semibold text-ink-900 max-w-md truncate">
                      {sub.title}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-chip text-[10px] font-semibold bg-ivory-100 text-ink-700 border border-line">
                        {sub.type}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-ink-700">{sub.author}</td>
                    <td className="py-3 px-3 text-ink-500">{sub.submittedAt}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-chip text-[10px] font-semibold bg-warning-50 text-warning-700 border border-warning-700/20">
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link href={`/admin/${sub.type.toLowerCase()}s/${sub.id}`}>
                        <Button variant="ghost" size="sm" className="text-green-700 font-medium">
                          Review →
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

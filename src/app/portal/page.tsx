"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowUpRight, Clock, FileText, ChevronRight } from "lucide-react";
import { PortalShell } from "@/components/layout/portal-shell";
import { KpiTile } from "@/components/ui/kpi-tile";
import { Button } from "@/components/ui/button";

const userArticles = [
  { id: "1", title: "Modernising the Shield: Evaluating Pakistan's Integrated Air Defence Architecture", type: "Article", publishedAt: "16 Oct 2026", reads: "12,480" },
  { id: "2", title: "Second-Strike Endurance: Sea-Based Deterrence and Pakistan's Evolving Nuclear Triad", type: "Article", publishedAt: "28 Sep 2026", reads: "18,920" },
  { id: "3", title: "Hypersonic Trajectories and Compressed Reaction Times in South Asian Crisis Scenarios", type: "Article", publishedAt: "15 Aug 2026", reads: "9,640" },
  { id: "4", title: "The South Asian Military Balance (2026-2030)", type: "Report", publishedAt: "01 Jul 2026", reads: "5,120" },
  { id: "5", title: "Algorithmic Escalation Risks in Tactical C4ISR", type: "Research", publishedAt: "12 May 2026", reads: "2,130" },
];

const topReaderCountries = [
  { country: "Pakistan", percentage: 55, reads: "26,500" },
  { country: "United States", percentage: 16, reads: "7,800" },
  { country: "United Kingdom", percentage: 11, reads: "5,300" },
  { country: "Saudi Arabia", percentage: 8, reads: "3,800" },
  { country: "Turkey", percentage: 6, reads: "2,900" },
];

export default function PortalOverviewPage() {
  const [readsPeriod, setReadsPeriod] = useState<"30d" | "90d">("30d");

  return (
    <PortalShell title="Contributor Dashboard">
      <div className="space-y-8">
        {/* ========================================================
            1. WELCOME & ROLE BADGES
            ======================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white border border-line rounded-card shadow-level1">
          <div>
            <h2 className="font-serif font-bold text-2xl text-ink-900">
              Welcome back, Dr. Tariq Mahmud
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 rounded-chip text-xs font-semibold bg-green-100 text-green-700">
                Article Writer
              </span>
              <span className="px-2 py-0.5 rounded-chip text-xs font-semibold bg-green-100 text-green-700">
                Research Scholar
              </span>
              <span className="px-2 py-0.5 rounded-chip text-xs font-semibold bg-ivory-100 text-ink-700 border border-line">
                PSF Expert
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/portal/articles/new">
              <Button variant="primary" size="sm">
                New Submission
              </Button>
            </Link>
          </div>
        </div>

        {/* ========================================================
            2. 5 KPI TILES ROW
            ======================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <KpiTile value="12" label="Published" />
          <KpiTile value="2" label="In Review" />
          <KpiTile value="3" label="Drafts" />
          <KpiTile value="1" label="Needs Revision" />
          <KpiTile
            value="48.2k"
            label="Total Reads"
            delta={{ value: "+14.2%", positive: true, period: "prev 30d" }}
          />
        </div>

        {/* ========================================================
            3. ACTION NEEDED CALLOUT BANNER
            ======================================================== */}
        <div className="p-4 bg-warning-50 border border-warning-700/30 rounded-card flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-warning-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif font-bold text-sm text-warning-700">
                Editorial Revisions Requested on 1 Item
              </h4>
              <p className="font-serif text-xs text-ink-700 mt-0.5">
                Article: &ldquo;Air Defence Radars in Saturated Dense Jamming Environments&rdquo; requires clarification on sensor fusion metrics.
              </p>
            </div>
          </div>
          <Link href="/portal/articles/123/edit">
            <Button variant="secondary" size="sm" className="shrink-0 text-xs">
              View Comments & Edit
            </Button>
          </Link>
        </div>

        {/* ========================================================
            4. READS ENGAGEMENT & TOP CONTENT
            ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Daily Reads Activity Visual (Cols 1-8) */}
          <div className="lg:col-span-8 bg-white border border-line rounded-card p-6 shadow-level1">
            <div className="flex items-center justify-between pb-4 border-b border-line mb-6">
              <div>
                <h3 className="font-serif font-bold text-lg text-ink-900">
                  Readership Engagement
                </h3>
                <p className="font-serif text-xs text-ink-500">
                  Daily verified reads across your published articles, reports and papers (PKT)
                </p>
              </div>

              <div className="flex items-center border border-line rounded-button overflow-hidden text-xs font-sans">
                <button
                  type="button"
                  onClick={() => setReadsPeriod("30d")}
                  className={`px-3 py-1 ${
                    readsPeriod === "30d"
                      ? "bg-green-700 text-white font-semibold"
                      : "bg-white text-ink-700 hover:bg-ivory-50"
                  }`}
                >
                  30 Days
                </button>
                <button
                  type="button"
                  onClick={() => setReadsPeriod("90d")}
                  className={`px-3 py-1 border-l border-line ${
                    readsPeriod === "90d"
                      ? "bg-green-700 text-white font-semibold"
                      : "bg-white text-ink-700 hover:bg-ivory-50"
                  }`}
                >
                  90 Days
                </button>
              </div>
            </div>

            {/* Chart Graphic Area */}
            <div className="h-56 w-full flex items-end gap-2 pt-8 pb-2 border-b border-line">
              {[40, 55, 32, 68, 74, 60, 85, 92, 78, 64, 88, 110, 95, 120, 105, 140, 130, 155, 145, 170, 160, 185, 175, 190].map(
                (h, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center group relative">
                    <div
                      className="w-full bg-green-700/80 group-hover:bg-green-700 rounded-t-sm transition-all"
                      style={{ height: `${(h / 200) * 100}%` }}
                    />
                  </div>
                )
              )}
            </div>
            <div className="flex justify-between text-[11px] font-sans text-ink-400 pt-2">
              <span>18 Sep 2026</span>
              <span>02 Oct 2026</span>
              <span>18 Oct 2026 (Today)</span>
            </div>
          </div>

          {/* Top Reader Geography (Cols 9-12) */}
          <div className="lg:col-span-4 bg-white border border-line rounded-card p-6 shadow-level1">
            <h3 className="font-serif font-bold text-lg text-ink-900 pb-3 border-b border-line mb-4">
              Where Your Readers Are
            </h3>

            <div className="space-y-4">
              {topReaderCountries.map((c) => (
                <div key={c.country} className="space-y-1">
                  <div className="flex justify-between text-xs font-sans">
                    <span className="font-medium text-ink-900">{c.country}</span>
                    <span className="font-mono text-ink-500">{c.reads}</span>
                  </div>
                  <div className="w-full h-1.5 bg-line rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-700 rounded-full"
                      style={{ width: `${c.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================
            5. TOP CONTENT TABLE
            ======================================================== */}
        <div className="bg-white border border-line rounded-card p-6 shadow-level1">
          <div className="flex items-center justify-between pb-4 border-b border-line mb-4">
            <h3 className="font-serif font-bold text-lg text-ink-900">
              Top Published Content by Reads
            </h3>
            <Link
              href="/portal/articles"
              className="text-xs font-sans font-medium text-green-700 hover:underline flex items-center"
            >
              <span>View all published items</span>
              <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-line text-ink-500 uppercase tracking-wider">
                  <th className="py-2.5 font-semibold">Title</th>
                  <th className="py-2.5 font-semibold">Format</th>
                  <th className="py-2.5 font-semibold">Published</th>
                  <th className="py-2.5 text-right font-semibold">Reads</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {userArticles.map((art) => (
                  <tr key={art.id} className="hover:bg-ivory-50">
                    <td className="py-3 font-serif font-semibold text-ink-900 max-w-lg truncate">
                      {art.title}
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-chip text-[10px] font-semibold bg-ivory-100 text-ink-700 border border-line">
                        {art.type}
                      </span>
                    </td>
                    <td className="py-3 text-ink-500">{art.publishedAt}</td>
                    <td className="py-3 text-right font-mono font-bold text-green-700">
                      {art.reads}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

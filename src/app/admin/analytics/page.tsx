"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/layout/admin-shell";
import {
  BarChart3,
  Users,
  Eye,
  Clock,
  Globe,
  Share2,
  TrendingUp,
  Download,
  Calendar,
  Layers,
  BookOpen,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAnalyticsData } from "@/app/actions/analytics-actions";

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "AUDIENCE" | "CONTENT" | "ACQUISITION" | "GEOGRAPHY" | "CONTRIBUTORS" | "ENGAGEMENT"
  >("AUDIENCE");
  const [range, setRange] = useState<"7d" | "30d" | "90d">("30d");

  useEffect(() => {
    setLoading(true);
    getAnalyticsData(range).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [range]);

  const tabs = [
    { key: "AUDIENCE", label: "Audience" },
    { key: "CONTENT", label: "Content Performance" },
    { key: "ACQUISITION", label: "Acquisition" },
    { key: "GEOGRAPHY", label: "Geography" },
    { key: "CONTRIBUTORS", label: "Contributors" },
    { key: "ENGAGEMENT", label: "Engagement" },
  ];

  return (
    <AdminShell title="Analytics & Editorial Intelligence">
      <div className="space-y-6 font-sans">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded-chip">
                Section 12.3 • Editorial Intelligence
              </span>
              <h1 className="text-xl font-serif font-bold text-ink-900">
                Platform Analytics & Audience Telemetry
              </h1>
            </div>
            <p className="text-xs text-ink-500 mt-1">
              Privacy-preserving first-party telemetry with zero external trackers (FR-CONS-01).
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {/* Range Presets */}
            <div className="flex items-center border border-line rounded-sm overflow-hidden bg-white">
              {(["7d", "30d", "90d"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRange(r)}
                  className={`px-3 py-1.5 font-medium transition-colors ${
                    range === r
                      ? "bg-green-700 text-white font-bold"
                      : "text-ink-600 hover:bg-ivory-100"
                  }`}
                >
                  {r === "7d" ? "7 Days" : r === "30d" ? "30 Days" : "90 Days"}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => alert("Exporting CSV telemetry dataset...")}
              className="flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </Button>
          </div>
        </div>

        {/* 6 Tabs */}
        <div className="flex items-center gap-2 border-b border-line pb-px overflow-x-auto text-xs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 font-medium border-b-2 transition-all shrink-0 ${
                activeTab === tab.key
                  ? "border-green-700 text-green-800 font-bold bg-white"
                  : "border-transparent text-ink-500 hover:text-ink-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading || !data ? (
          <div className="p-12 text-center text-xs text-ink-400 bg-white border border-line rounded-sm">
            Calculating aggregate reader telemetry and traffic distributions...
          </div>
        ) : (
          <div className="space-y-6">
            {/* 4-Up Top Metric Tiles */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-line rounded-sm p-4 space-y-1 shadow-2xs">
                <div className="flex items-center justify-between text-ink-500 text-xs">
                  <span>Unique Visitors</span>
                  <Users className="w-4 h-4 text-ink-400" />
                </div>
                <div className="text-2xl font-serif font-bold text-ink-900">
                  {data.kpi.totalVisitors.toLocaleString()}
                </div>
                <div className="text-[10px] text-green-700 font-semibold flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>+18.4% vs previous {range}</span>
                </div>
              </div>

              <div className="bg-white border border-line rounded-sm p-4 space-y-1 shadow-2xs">
                <div className="flex items-center justify-between text-ink-500 text-xs">
                  <span>Total Page Views</span>
                  <Eye className="w-4 h-4 text-ink-400" />
                </div>
                <div className="text-2xl font-serif font-bold text-ink-900">
                  {data.kpi.totalPageViews.toLocaleString()}
                </div>
                <div className="text-[10px] text-ink-500">
                  2.96 pages / session
                </div>
              </div>

              <div className="bg-white border border-line rounded-sm p-4 space-y-1 shadow-2xs">
                <div className="flex items-center justify-between text-ink-500 text-xs">
                  <span>Verified Reads</span>
                  <BookOpen className="w-4 h-4 text-ink-400" />
                </div>
                <div className="text-2xl font-serif font-bold text-green-800">
                  {data.kpi.totalReads.toLocaleString()}
                </div>
                <div className="text-[10px] text-green-700 font-semibold">
                  67.5% completion rate
                </div>
              </div>

              <div className="bg-white border border-line rounded-sm p-4 space-y-1 shadow-2xs">
                <div className="flex items-center justify-between text-ink-500 text-xs">
                  <span>Avg. Time on Page</span>
                  <Clock className="w-4 h-4 text-ink-400" />
                </div>
                <div className="text-2xl font-serif font-bold text-ink-900">
                  {data.kpi.avgReadTime}
                </div>
                <div className="text-[10px] text-ink-500">
                  Deep engagement benchmark
                </div>
              </div>
            </div>

            {/* TAB 1: AUDIENCE */}
            {activeTab === "AUDIENCE" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* 7-Day Trend Chart */}
                <div className="lg:col-span-8 bg-white border border-line rounded-sm p-6 shadow-2xs space-y-4">
                  <div className="border-b border-line pb-2 flex items-center justify-between">
                    <h3 className="font-serif font-bold text-sm text-ink-900">
                      Daily Visitor & Page View Velocity
                    </h3>
                    <span className="text-xs text-ink-400 font-mono">
                      Pakistan Standard Time (PKT)
                    </span>
                  </div>

                  <div className="space-y-3 pt-2">
                    {data.audienceTrends.map((row: any) => (
                      <div key={row.day} className="space-y-1 text-xs">
                        <div className="flex justify-between text-ink-700">
                          <span className="font-bold w-12">{row.day}</span>
                          <span className="text-ink-500">
                            <strong>{row.visitors.toLocaleString()}</strong> visitors •{" "}
                            {row.pageViews.toLocaleString()} views
                          </span>
                        </div>
                        <div className="h-2 w-full bg-ivory-100 rounded-xs overflow-hidden flex">
                          <div
                            style={{
                              width: `${(row.visitors / 10000) * 100}%`,
                            }}
                            className="bg-green-700 h-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hourly Heatmap Distribution */}
                <div className="lg:col-span-4 bg-white border border-line rounded-sm p-6 shadow-2xs space-y-4">
                  <div className="border-b border-line pb-2">
                    <h3 className="font-serif font-bold text-sm text-ink-900">
                      Hourly Traffic Concentration
                    </h3>
                    <p className="text-[11px] text-ink-500">
                      Peak reading intervals across 24-hour cycle
                    </p>
                  </div>

                  <div className="space-y-2 text-xs">
                    {data.hourlyDistribution.map((h: any) => (
                      <div
                        key={h.hour}
                        className="flex items-center justify-between py-1.5 border-b border-line/60 last:border-b-0"
                      >
                        <span className="font-mono text-ink-700">{h.hour}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-ivory-100 rounded-xs overflow-hidden">
                            <div
                              style={{ width: `${(h.value / 5000) * 100}%` }}
                              className="bg-green-700 h-full"
                            />
                          </div>
                          <span className="font-mono font-bold text-ink-900 w-12 text-right">
                            {h.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CONTENT PERFORMANCE */}
            {activeTab === "CONTENT" && (
              <div className="space-y-6">
                {/* Content Type Breakdown */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {data.contentBreakdown.map((c: any) => (
                    <div
                      key={c.type}
                      className="bg-white border border-line rounded-sm p-4 space-y-1 shadow-2xs"
                    >
                      <span className="text-xs text-ink-500 font-medium">
                        {c.type}
                      </span>
                      <div className="text-xl font-serif font-bold text-ink-900">
                        {c.reads.toLocaleString()} reads
                      </div>
                      <div className="text-[10px] text-ink-500">
                        {c.count} publications • {c.share} volume
                      </div>
                    </div>
                  ))}
                </div>

                {/* Top 10 Published Items Table */}
                <div className="bg-white border border-line rounded-sm overflow-hidden shadow-2xs">
                  <div className="p-4 bg-ivory-50 border-b border-line flex items-center justify-between">
                    <h3 className="font-serif font-bold text-sm text-ink-900">
                      Top 10 High-Impact Publications
                    </h3>
                    <span className="text-xs text-ink-500">
                      Ranked by verified complete reads
                    </span>
                  </div>

                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-ivory-50/50 border-b border-line text-[11px] font-bold uppercase tracking-wider text-ink-600">
                        <th className="py-3 px-4">Ref ID</th>
                        <th className="py-3 px-4">Title</th>
                        <th className="py-3 px-4">Type</th>
                        <th className="py-3 px-4">Author</th>
                        <th className="py-3 px-4 text-right">Total Reads</th>
                        <th className="py-3 px-4 text-right">Avg. Read Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {data.topItems.map((item: any) => (
                        <tr
                          key={item.id}
                          className="hover:bg-ivory-50 transition-colors"
                        >
                          <td className="py-3 px-4 font-mono font-bold text-ink-700 whitespace-nowrap">
                            {item.refId}
                          </td>
                          <td className="py-3 px-4 font-serif font-bold text-ink-900 max-w-md truncate">
                            {item.title}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="text-[10px] uppercase font-bold text-green-800 bg-green-50 px-2 py-0.5 rounded-chip">
                              {item.type}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-ink-600 whitespace-nowrap">
                            {item.author}
                          </td>
                          <td className="py-3 px-4 text-right font-mono font-bold text-ink-900">
                            {item.reads.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-right font-mono text-ink-600">
                            {item.avgReadTime}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: ACQUISITION */}
            {activeTab === "ACQUISITION" && (
              <div className="bg-white border border-line rounded-sm p-6 shadow-2xs space-y-4">
                <div className="border-b border-line pb-2 flex items-center justify-between">
                  <h3 className="font-serif font-bold text-sm text-ink-900">
                    Inbound Traffic Channels & Acquisition Corridors
                  </h3>
                  <span className="text-xs text-ink-500 font-mono">
                    FRD §12.3 Table
                  </span>
                </div>

                <div className="space-y-3">
                  {data.acquisition.map((ch: any) => (
                    <div
                      key={ch.channel}
                      className="p-3 bg-ivory-50 border border-line rounded-xs flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-semibold text-ink-900">
                          {ch.channel}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-ink-900">
                          {ch.sessions.toLocaleString()} sessions
                        </span>
                        <span className="text-ink-500 block text-[10px]">
                          {ch.share} of total platform traffic
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: GEOGRAPHY */}
            {activeTab === "GEOGRAPHY" && (
              <div className="bg-white border border-line rounded-sm p-6 shadow-2xs space-y-4">
                <div className="border-b border-line pb-2 flex items-center justify-between">
                  <h3 className="font-serif font-bold text-sm text-ink-900">
                    Geographic Reader Distribution
                  </h3>
                  <span className="text-xs text-ink-500 font-mono">
                    Global Inbound
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.geography.map((g: any) => (
                    <div
                      key={g.country}
                      className="p-3 border border-line rounded-xs bg-ivory-50 flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-ink-900">
                        {g.country}
                      </span>
                      <div className="text-right">
                        <span className="font-mono font-bold text-ink-900">
                          {g.reads.toLocaleString()} reads
                        </span>
                        <span className="text-[10px] text-ink-500 block">
                          {g.share} share
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: CONTRIBUTORS */}
            {activeTab === "CONTRIBUTORS" && (
              <div className="bg-white border border-line rounded-sm p-6 shadow-2xs space-y-4">
                <div className="border-b border-line pb-2 flex items-center justify-between">
                  <h3 className="font-serif font-bold text-sm text-ink-900">
                    Author & Contributor Editorial Throughput
                  </h3>
                  <span className="text-xs text-ink-500 font-mono">
                    Editorial Board Metrics
                  </span>
                </div>

                <div className="space-y-3">
                  {data.contributors.map((c: any) => (
                    <div
                      key={c.name}
                      className="p-3.5 bg-ivory-50 border border-line rounded-xs flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-semibold text-ink-900">
                          {c.name}
                        </span>
                        <div className="text-[11px] text-ink-500 mt-0.5">
                          {c.submissions} items submitted • {c.approved} published
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-green-800">
                          {c.avgReviewDays} days
                        </span>
                        <span className="text-[10px] text-ink-500 block">
                          Average review turnaround
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: ENGAGEMENT */}
            {activeTab === "ENGAGEMENT" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-line rounded-sm p-5 shadow-2xs space-y-2">
                  <span className="text-xs font-semibold text-ink-700">
                    Average Scroll Depth
                  </span>
                  <div className="text-2xl font-serif font-bold text-green-800">
                    78.4%
                  </div>
                  <p className="text-[11px] text-ink-500">
                    Percentage of readers reaching conclusion and footnotes
                  </p>
                </div>

                <div className="bg-white border border-line rounded-sm p-5 shadow-2xs space-y-2">
                  <span className="text-xs font-semibold text-ink-700">
                    PDF Monograph Downloads
                  </span>
                  <div className="text-2xl font-serif font-bold text-ink-900">
                    3,840
                  </div>
                  <p className="text-[11px] text-ink-500">
                    Offline white papers and research manuscript downloads
                  </p>
                </div>

                <div className="bg-white border border-line rounded-sm p-5 shadow-2xs space-y-2">
                  <span className="text-xs font-semibold text-ink-700">
                    Social & Academic Citations
                  </span>
                  <div className="text-2xl font-serif font-bold text-ink-900">
                    1,290
                  </div>
                  <p className="text-[11px] text-ink-500">
                    BibTeX exports, APA citations, and verified link shares
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminShell>
  );
}

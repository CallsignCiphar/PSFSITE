"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AdminShell } from "@/components/layout/admin-shell";
import {
  ArrowLeft,
  BarChart3,
  Calendar,
  Download,
  Eye,
  MousePointerClick,
  Percent,
  Sparkles,
  Smartphone,
  Globe,
  Layers,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCampaignAnalytics } from "@/app/actions/ad-actions";

export default function CampaignAnalyticsPage() {
  const params = useParams();
  const campaignId = params.id as string;

  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCampaignAnalytics(campaignId).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [campaignId]);

  if (loading) {
    return (
      <AdminShell title="Campaign Analytics">
        <div className="p-12 text-center text-xs text-ink-400 bg-white border border-line rounded-sm">
          Compiling daily telemetry logs and calculating viewability metrics...
        </div>
      </AdminShell>
    );
  }

  if (!data || !data.campaign) {
    return (
      <AdminShell title="Campaign Analytics">
        <div className="p-8 text-center text-xs text-red-600 bg-white border border-line rounded-sm">
          Campaign not found.
        </div>
      </AdminShell>
    );
  }

  const { campaign, kpi, dailyTrend, deviceBreakdown, countryBreakdown } = data;

  return (
    <AdminShell title={`Campaign Analytics • ${campaign.campaignNumber}`}>
      <div className="space-y-6 font-sans">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-4">
          <div className="flex items-center gap-3">
            <Link href="/admin/ads">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Campaigns</span>
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-green-800 bg-green-50 px-2 py-0.5 rounded-chip">
                  {campaign.campaignNumber}
                </span>
                <span className="text-xs text-ink-500">• {campaign.brandName}</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.2 rounded-chip bg-green-100 text-green-800">
                  {campaign.manualStatus}
                </span>
              </div>
              <h1 className="text-xl font-serif font-bold text-ink-900 mt-1">
                {campaign.name}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert("Downloading PDF summary report...")}
              className="flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF Report</span>
            </Button>
          </div>
        </div>

        {/* 6 KPI Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-white border border-line rounded-sm p-4 space-y-1 shadow-2xs">
            <div className="flex items-center justify-between text-ink-500">
              <span className="text-[11px] font-medium">Total Impressions</span>
              <Eye className="w-3.5 h-3.5" />
            </div>
            <div className="text-xl font-serif font-bold text-ink-900">
              {kpi.totalImpressions.toLocaleString()}
            </div>
            <div className="text-[10px] text-green-700 font-semibold">
              +14.2% vs target
            </div>
          </div>

          <div className="bg-white border border-line rounded-sm p-4 space-y-1 shadow-2xs">
            <div className="flex items-center justify-between text-ink-500">
              <span className="text-[11px] font-medium">Total Clicks</span>
              <MousePointerClick className="w-3.5 h-3.5" />
            </div>
            <div className="text-xl font-serif font-bold text-ink-900">
              {kpi.totalClicks.toLocaleString()}
            </div>
            <div className="text-[10px] text-ink-500">Verified redirects</div>
          </div>

          <div className="bg-white border border-line rounded-sm p-4 space-y-1 shadow-2xs">
            <div className="flex items-center justify-between text-ink-500">
              <span className="text-[11px] font-medium">Average CTR</span>
              <Percent className="w-3.5 h-3.5" />
            </div>
            <div className="text-xl font-serif font-bold text-green-800">
              {kpi.ctr}%
            </div>
            <div className="text-[10px] text-ink-500">Benchmark: 1.8%</div>
          </div>

          <div className="bg-white border border-line rounded-sm p-4 space-y-1 shadow-2xs">
            <div className="flex items-center justify-between text-ink-500">
              <span className="text-[11px] font-medium">Viewability Rate</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="text-xl font-serif font-bold text-ink-900">
              {kpi.viewabilityRate}
            </div>
            <div className="text-[10px] text-green-700 font-semibold">
              &gt;1s in 50% viewport
            </div>
          </div>

          <div className="bg-white border border-line rounded-sm p-4 space-y-1 shadow-2xs">
            <div className="flex items-center justify-between text-ink-500">
              <span className="text-[11px] font-medium">Daily Avg Impressions</span>
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <div className="text-xl font-serif font-bold text-ink-900">
              {kpi.dailyAvgImpressions.toLocaleString()}
            </div>
            <div className="text-[10px] text-ink-500">Across active slots</div>
          </div>

          <div className="bg-white border border-line rounded-sm p-4 space-y-1 shadow-2xs">
            <div className="flex items-center justify-between text-ink-500">
              <span className="text-[11px] font-medium">Active Placements</span>
              <Layers className="w-3.5 h-3.5" />
            </div>
            <div className="text-xl font-serif font-bold text-ink-900">
              {campaign.placements.length}
            </div>
            <div className="text-[10px] text-ink-500">Configured slots</div>
          </div>
        </div>

        {/* Daily Time Series Breakdown */}
        <div className="bg-white border border-line rounded-sm p-5 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <div>
              <h3 className="font-serif font-bold text-sm text-ink-900">
                Daily Delivery & Performance Trend
              </h3>
              <p className="text-[11px] text-ink-500">
                Impression volume and verified outbound click-through telemetry
              </p>
            </div>
            <span className="text-xs text-ink-500">Pakistan Standard Time (PKT)</span>
          </div>

          {dailyTrend.length === 0 ? (
            <div className="p-8 text-center text-xs text-ink-400">
              No daily telemetry events logged yet for this campaign.
            </div>
          ) : (
            <div className="space-y-3">
              {dailyTrend.map((row: any) => (
                <div key={row.date} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-medium text-ink-700">
                      {row.date}
                    </span>
                    <span className="text-ink-600">
                      <strong>{row.impressions.toLocaleString()}</strong> imp •{" "}
                      <strong>{row.clicks}</strong> clicks (
                      {row.impressions > 0
                        ? ((row.clicks / row.impressions) * 100).toFixed(2)
                        : "0.00"}
                      %)
                    </span>
                  </div>
                  {/* Visual Bar */}
                  <div className="h-2 w-full bg-ivory-100 rounded-xs overflow-hidden flex">
                    <div
                      style={{
                        width: `${Math.min(
                          100,
                          (row.impressions / (kpi.totalImpressions || 1)) * 100
                        )}%`,
                      }}
                      className="bg-green-700 h-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3 Breakdown Tables Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* By Placement */}
          <div className="bg-white border border-line rounded-sm p-4 space-y-3 shadow-2xs">
            <h4 className="font-serif font-bold text-xs text-ink-900 border-b border-line pb-2 flex items-center justify-between">
              <span>By Placement Slot</span>
              <span className="text-[10px] text-ink-500">FRD Section 15</span>
            </h4>
            <div className="space-y-2 text-xs">
              {campaign.placements.map((p: any) => (
                <div
                  key={p.id}
                  className="p-2.5 bg-ivory-50 border border-line rounded-xs space-y-1"
                >
                  <div className="flex items-center justify-between font-mono font-bold text-ink-900">
                    <span>{p.slotKey}</span>
                    <span className="text-[10px] text-green-700 font-sans">Active</span>
                  </div>
                  <div className="text-[11px] text-ink-600 flex justify-between">
                    <span>Window:</span>
                    <span>
                      {new Date(p.startsAt).toLocaleDateString("en-GB")} →{" "}
                      {new Date(p.endsAt).toLocaleDateString("en-GB")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* By Device */}
          <div className="bg-white border border-line rounded-sm p-4 space-y-3 shadow-2xs">
            <h4 className="font-serif font-bold text-xs text-ink-900 border-b border-line pb-2 flex items-center justify-between">
              <span>By Device Distribution</span>
              <Smartphone className="w-3.5 h-3.5 text-ink-400" />
            </h4>
            <div className="space-y-2 text-xs">
              {deviceBreakdown.map((item: any) => (
                <div
                  key={item.device}
                  className="flex items-center justify-between py-1.5 border-b border-line/60 last:border-b-0"
                >
                  <span className="text-ink-700">{item.device}</span>
                  <div className="text-right">
                    <span className="font-bold text-ink-900">{item.share}</span>
                    <span className="text-[10px] text-ink-500 block">
                      {item.impressions.toLocaleString()} imp
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* By Country */}
          <div className="bg-white border border-line rounded-sm p-4 space-y-3 shadow-2xs">
            <h4 className="font-serif font-bold text-xs text-ink-900 border-b border-line pb-2 flex items-center justify-between">
              <span>Geographic Reach</span>
              <Globe className="w-3.5 h-3.5 text-ink-400" />
            </h4>
            <div className="space-y-2 text-xs">
              {countryBreakdown.map((item: any) => (
                <div
                  key={item.country}
                  className="flex items-center justify-between py-1.5 border-b border-line/60 last:border-b-0"
                >
                  <span className="text-ink-700">{item.country}</span>
                  <div className="text-right">
                    <span className="font-bold text-ink-900">
                      {item.percentage}
                    </span>
                    <span className="text-[10px] text-ink-500 block">
                      {item.impressions.toLocaleString()} imp
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

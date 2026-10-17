"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/layout/admin-shell";
import {
  Megaphone,
  Calendar,
  BarChart3,
  Plus,
  Search,
  Filter,
  Play,
  Pause,
  Archive,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getCampaignsList,
  toggleCampaignStatus,
} from "@/app/actions/ad-actions";

export default function AdCampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchBrand, setSearchBrand] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const list = await getCampaignsList({
        status: statusFilter,
        brand: searchBrand,
      });
      setCampaigns(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter, searchBrand]);

  const handleTogglePause = async (campaign: any) => {
    const nextStatus =
      campaign.manualStatus === "PAUSED" ? "SCHEDULED" : "PAUSED";
    try {
      await toggleCampaignStatus(campaign.id, nextStatus);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  const handleArchive = async (campaignId: string) => {
    if (!confirm("Are you sure you want to archive this campaign?")) return;
    try {
      await toggleCampaignStatus(campaignId, "ARCHIVED");
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to archive.");
    }
  };

  const statusFilters = [
    "ALL",
    "LIVE",
    "SCHEDULED",
    "PAUSED",
    "ENDED",
    "ARCHIVED",
  ];

  return (
    <AdminShell title="Ad Campaigns Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded-chip">
                Section 12.13 • Monetisation & Commercial
              </span>
              <h1 className="text-xl font-serif font-bold text-ink-900">
                Ad Campaigns & Slot Management
              </h1>
            </div>
            <p className="text-xs text-ink-600 mt-1">
              Manage non-intrusive institutional sponsorships and banner placements with zero-conflict guarantees (FR-ADS-01).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/admin/ads/calendar">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Slot Calendar</span>
              </Button>
            </Link>

            <Link href="/admin/ads/campaigns/new">
              <Button
                variant="primary"
                size="sm"
                className="flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>New Campaign</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-3 border border-line rounded-sm">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto text-xs">
            {statusFilters.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xs font-medium transition-colors ${
                  statusFilter === st
                    ? "bg-green-700 text-white font-bold"
                    : "text-ink-600 hover:bg-ivory-100"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-ink-400" />
            <input
              type="text"
              placeholder="Search by brand name..."
              value={searchBrand}
              onChange={(e) => setSearchBrand(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-line rounded-sm focus:border-green-700 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="bg-white border border-line rounded-sm overflow-hidden shadow-2xs font-sans">
          {loading ? (
            <div className="p-12 text-center text-xs text-ink-400">
              Loading campaign registry and calculating impression telemetry...
            </div>
          ) : campaigns.length === 0 ? (
            <div className="p-12 text-center text-xs text-ink-500">
              No advertising campaigns match the selected filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-ivory-50 border-b border-line text-[11px] font-bold uppercase tracking-wider text-ink-600">
                    <th className="py-3 px-4">Campaign #</th>
                    <th className="py-3 px-4">Brand</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-center">Placements</th>
                    <th className="py-3 px-4">Flight Window</th>
                    <th className="py-3 px-4 text-right">Impressions</th>
                    <th className="py-3 px-4 text-right">Clicks</th>
                    <th className="py-3 px-4 text-right">CTR</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {campaigns.map((c) => {
                    let statusBadge = "bg-ivory-200 text-ink-700";
                    if (c.status === "LIVE") {
                      statusBadge = "bg-green-100 text-green-800 font-bold";
                    } else if (c.status === "SCHEDULED") {
                      statusBadge = "bg-blue-100 text-blue-800";
                    } else if (c.status === "PAUSED") {
                      statusBadge = "bg-warning-100 text-warning-800";
                    } else if (c.status === "ENDED") {
                      statusBadge = "bg-ink-100 text-ink-600";
                    } else if (c.status === "ARCHIVED") {
                      statusBadge = "bg-red-50 text-red-600";
                    }

                    return (
                      <tr
                        key={c.id}
                        className="hover:bg-ivory-50/70 transition-colors"
                      >
                        <td className="py-3 px-4 font-mono font-bold text-ink-900">
                          {c.campaignNumber}
                        </td>
                        <td className="py-3 px-4 font-semibold text-ink-900">
                          {c.brandName}
                        </td>
                        <td className="py-3 px-4 text-ink-700 max-w-xs truncate">
                          {c.name}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-chip ${statusBadge}`}
                          >
                            {c.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center font-mono">
                          {c.placementsCount}
                        </td>
                        <td className="py-3 px-4 text-[11px] text-ink-600">
                          {c.startsAt && c.endsAt ? (
                            <span>
                              {new Date(c.startsAt).toLocaleDateString("en-GB")} →{" "}
                              {new Date(c.endsAt).toLocaleDateString("en-GB")}
                            </span>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-medium">
                          {c.impressions.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-medium">
                          {c.clicks.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-green-800">
                          {c.ctr}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link href={`/admin/ads/campaigns/${c.id}/analytics`}>
                              <button
                                type="button"
                                title="View Performance Analytics"
                                className="p-1 text-ink-500 hover:text-green-700 hover:bg-ivory-200 rounded-xs"
                              >
                                <BarChart3 className="w-4 h-4" />
                              </button>
                            </Link>

                            <button
                              type="button"
                              onClick={() => handleTogglePause(c)}
                              title={
                                c.manualStatus === "PAUSED"
                                  ? "Resume Campaign"
                                  : "Pause Campaign"
                              }
                              className="p-1 text-ink-500 hover:text-ink-900 hover:bg-ivory-200 rounded-xs"
                            >
                              {c.manualStatus === "PAUSED" ? (
                                <Play className="w-4 h-4 text-green-700" />
                              ) : (
                                <Pause className="w-4 h-4 text-warning-700" />
                              )}
                            </button>

                            {c.status !== "ARCHIVED" && (
                              <button
                                type="button"
                                onClick={() => handleArchive(c.id)}
                                title="Archive Campaign"
                                className="p-1 text-ink-400 hover:text-red-700 hover:bg-red-50 rounded-xs"
                              >
                                <Archive className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}

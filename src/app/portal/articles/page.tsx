"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
} from "lucide-react";
import { PortalShell } from "@/components/layout/portal-shell";
import { Button } from "@/components/ui/button";

const articlesList = [
  {
    id: "art-1",
    title: "Modernising the Shield: Evaluating Pakistan's Integrated Air Defence Architecture",
    topic: "Defence",
    subtopic: "Air",
    status: "LIVE",
    lastUpdated: "16 Oct 2026, 14:30 PKT",
    publishedAt: "16 Oct 2026",
    reads: "12,480",
    slug: "pakistan-integrated-air-defence-modernisation-multi-tier-shield",
  },
  {
    id: "art-2",
    title: "Second-Strike Endurance: Sea-Based Deterrence and Pakistan's Evolving Nuclear Triad",
    topic: "Strategic Systems",
    subtopic: "Naval",
    status: "LIVE",
    lastUpdated: "28 Sep 2026, 11:15 PKT",
    publishedAt: "28 Sep 2026",
    reads: "18,920",
    slug: "nuclear-triad-advancements-second-strike-endurance",
  },
  {
    id: "art-3",
    title: "Air Defence Radars in Saturated Dense Jamming Environments",
    topic: "Defence",
    subtopic: "Air",
    status: "CHANGES_REQUESTED",
    lastUpdated: "15 Oct 2026, 09:40 PKT",
    publishedAt: "—",
    reads: "—",
    slug: "air-defence-radars-jamming",
  },
  {
    id: "art-4",
    title: "Hypersonic Trajectories and Compressed Reaction Times in South Asian Crisis Scenarios",
    topic: "Strategic Systems",
    subtopic: "Missiles",
    status: "LIVE",
    lastUpdated: "15 Aug 2026, 16:00 PKT",
    publishedAt: "15 Aug 2026",
    reads: "9,640",
    slug: "hypersonic-glide-vehicles-regional-crisis-stability",
  },
  {
    id: "art-5",
    title: "Electronic Warfare Countermeasures in Trans-Himalayan Border Patrols",
    topic: "Defence",
    subtopic: "Land",
    status: "IN_REVIEW",
    lastUpdated: "14 Oct 2026, 18:20 PKT",
    publishedAt: "—",
    reads: "—",
    slug: "electronic-warfare-countermeasures-border",
  },
  {
    id: "art-6",
    title: "Draft Tactical Analysis: LoC Artillery Duel Dynamics 2024–2026",
    topic: "National Affairs",
    subtopic: "Security",
    status: "DRAFT",
    lastUpdated: "12 Oct 2026, 21:10 PKT",
    publishedAt: "—",
    reads: "—",
    slug: "loc-artillery-dynamics",
  },
];

export default function MyArticlesPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articlesList.filter((art) => {
    if (activeTab === "LIVE" && art.status !== "LIVE") return false;
    if (activeTab === "IN_REVIEW" && art.status !== "IN_REVIEW") return false;
    if (activeTab === "CHANGES_REQUESTED" && art.status !== "CHANGES_REQUESTED") return false;
    if (activeTab === "DRAFTS" && art.status !== "DRAFT") return false;

    if (searchQuery && !art.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <PortalShell title="My Articles">
      <div className="space-y-6">
        {/* Header Bar with Action Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif font-bold text-2xl text-ink-900">Articles & Analysis</h2>
            <p className="font-serif text-xs text-ink-500">
              Manage your published commentaries, active review submissions, and ongoing drafts.
            </p>
          </div>

          <Link href="/portal/articles/new">
            <Button variant="primary" size="default" className="gap-2">
              <Plus className="w-4 h-4" />
              <span>Write New Article</span>
            </Button>
          </Link>
        </div>

        {/* Tab Filters with Counts */}
        <div className="flex border-b border-line overflow-x-auto text-xs font-sans font-medium">
          {[
            { id: "ALL", label: "All Items", count: articlesList.length },
            { id: "LIVE", label: "Live", count: 3 },
            { id: "IN_REVIEW", label: "In Review", count: 1 },
            { id: "CHANGES_REQUESTED", label: "Changes Requested", count: 1 },
            { id: "DRAFTS", label: "Drafts", count: 1 },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-green-700 text-green-700 font-semibold"
                  : "border-transparent text-ink-500 hover:text-ink-900"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeTab === tab.id ? "bg-green-100 text-green-700" : "bg-ivory-100 text-ink-500"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-ink-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by article title..."
              className="w-full h-9 pl-9 pr-3 text-xs font-sans border border-line rounded-input bg-white focus:border-green-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Articles Table */}
        <div className="bg-white border border-line rounded-card shadow-level1 overflow-hidden">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="bg-ivory-50 border-b border-line text-ink-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-5">Title</th>
                <th className="py-3 px-4">Topic / Subtopic</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4">Published</th>
                <th className="py-3 px-4 text-right">Reads</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((art) => (
                  <tr key={art.id} className="hover:bg-ivory-50 transition-colors">
                    <td className="py-3.5 px-5 font-serif font-semibold text-ink-900 max-w-md">
                      <Link
                        href={`/portal/articles/${art.id}`}
                        className="hover:text-green-700 line-clamp-1"
                        title={art.title}
                      >
                        {art.title}
                      </Link>
                    </td>

                    <td className="py-3.5 px-4 text-ink-700">
                      {art.topic} <span className="text-ink-400">/ {art.subtopic}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      {art.status === "LIVE" && (
                        <span className="px-2 py-0.5 rounded-chip text-[10px] font-semibold bg-green-100 text-green-700">
                          Live
                        </span>
                      )}
                      {art.status === "IN_REVIEW" && (
                        <span className="px-2 py-0.5 rounded-chip text-[10px] font-semibold bg-warning-50 text-warning-700 border border-warning-700/20">
                          In Review
                        </span>
                      )}
                      {art.status === "CHANGES_REQUESTED" && (
                        <span className="px-2 py-0.5 rounded-chip text-[10px] font-semibold bg-warning-50 text-warning-700 border border-warning-700">
                          Changes Requested
                        </span>
                      )}
                      {art.status === "DRAFT" && (
                        <span className="px-2 py-0.5 rounded-chip text-[10px] font-medium bg-ivory-100 text-ink-500 border border-line">
                          Draft
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-ink-500">{art.lastUpdated}</td>
                    <td className="py-3.5 px-4 text-ink-500">{art.publishedAt}</td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-green-700">
                      {art.reads}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {art.status === "LIVE" && (
                          <Link
                            href={`/articles/${art.slug}`}
                            target="_blank"
                            className="p-1 text-ink-500 hover:text-green-700"
                            title="View on public site"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        )}
                        {art.status === "CHANGES_REQUESTED" && (
                          <Link
                            href={`/portal/articles/${art.id}/edit`}
                            className="p-1 text-warning-700 hover:text-warning-800"
                            title="Edit revisions"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>
                        )}
                        {art.status === "DRAFT" && (
                          <Link
                            href={`/portal/articles/${art.id}/edit`}
                            className="p-1 text-ink-500 hover:text-green-700"
                            title="Edit draft"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-ink-400 font-serif text-sm">
                    No articles found matching this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PortalShell>
  );
}

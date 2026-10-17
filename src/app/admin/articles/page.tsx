"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Filter, ExternalLink, Eye, CheckCircle2, Clock, Edit, MoreVertical } from "lucide-react";
import { AdminShell } from "@/components/layout/admin-shell";
import { Button } from "@/components/ui/button";
import { ContentLabel } from "@/components/ui/content-label";

const sampleArticles = [
  {
    id: "art-1",
    refId: "ART-2026-00481",
    title: "Electronic Warfare Countermeasures in Trans-Himalayan Border Patrols",
    label: "ANALYSIS",
    author: "Dr. Ayesha Siddiqui",
    role: "Research Scholar",
    topic: "Defence",
    subtopic: "Land",
    location: "Skardu, Pakistan",
    status: "IN_REVIEW",
    submittedAt: "18 Oct 2026, 11:20 PKT",
    publishedAt: "—",
    reads: "—",
    slug: "electronic-warfare-countermeasures-border",
  },
  {
    id: "art-2",
    refId: "ART-2026-00480",
    title: "Modernising the Shield: Evaluating Pakistan's Integrated Air Defence Architecture",
    label: "ANALYSIS",
    author: "Dr. Tariq Mahmud",
    role: "PSF Expert",
    topic: "Defence",
    subtopic: "Air",
    location: "Rawalpindi, Pakistan",
    status: "PUBLISHED",
    submittedAt: "15 Oct 2026",
    publishedAt: "16 Oct 2026, 14:30 PKT",
    reads: "12,480",
    slug: "pakistan-integrated-air-defence-modernisation-multi-tier-shield",
  },
  {
    id: "art-3",
    refId: "ART-2026-00478",
    title: "Air Defence Radars in Saturated Dense Jamming Environments",
    label: "EXPLAINER",
    author: "Dr. Tariq Mahmud",
    role: "PSF Expert",
    topic: "Defence",
    subtopic: "Air",
    location: "Islamabad, Pakistan",
    status: "CHANGES_REQUESTED",
    submittedAt: "14 Oct 2026",
    publishedAt: "—",
    reads: "—",
    slug: "air-defence-radars-jamming",
  },
  {
    id: "art-4",
    refId: "ART-2026-00472",
    title: "Second-Strike Endurance: Sea-Based Deterrence and Pakistan's Evolving Nuclear Triad",
    label: "ANALYSIS",
    author: "Commodore (Retd) Bilal Zafar",
    role: "Article Writer",
    topic: "Strategic Systems",
    subtopic: "Naval",
    location: "Karachi, Pakistan",
    status: "PUBLISHED",
    submittedAt: "26 Sep 2026",
    publishedAt: "28 Sep 2026, 11:15 PKT",
    reads: "18,920",
    slug: "nuclear-triad-advancements-second-strike-endurance",
  },
];

export default function AdminArticlesListingPage() {
  const [activeTab, setActiveTab] = useState("PENDING");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = sampleArticles.filter((item) => {
    if (activeTab === "PENDING" && item.status !== "IN_REVIEW") return false;
    if (activeTab === "PUBLISHED" && item.status !== "PUBLISHED") return false;
    if (activeTab === "CHANGES_REQUESTED" && item.status !== "CHANGES_REQUESTED") return false;

    if (
      searchQuery &&
      !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.author.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <AdminShell title="Articles Editorial Moderation">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif font-bold text-2xl text-ink-900">Articles & Commentary Queue</h2>
            <p className="font-serif text-xs text-ink-500">
              Review, schedule, approve, or request revisions on strategic articles and commentaries.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex border-b border-line overflow-x-auto text-xs font-sans font-medium">
          {[
            { id: "PENDING", label: "Pending Review", count: 1 },
            { id: "PUBLISHED", label: "Live / Published", count: 2 },
            { id: "CHANGES_REQUESTED", label: "Changes Requested", count: 1 },
            { id: "ALL", label: "All Items", count: 4 },
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
                  activeTab === tab.id ? "bg-green-100 text-green-700 font-bold" : "bg-ivory-100 text-ink-500"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-ink-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by article title or author..."
              className="w-full h-9 pl-9 pr-3 text-xs font-sans border border-line rounded-input bg-white focus:border-green-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-line rounded-card shadow-level1 overflow-hidden">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="bg-ivory-50 border-b border-line text-ink-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-5">Ref ID & Title</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Desk</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Submitted</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-ivory-50 transition-colors">
                  <td className="py-3.5 px-5 max-w-md">
                    <span className="font-mono text-[11px] text-green-700 font-semibold block">
                      {item.refId}
                    </span>
                    <Link
                      href={`/admin/articles/${item.id}`}
                      className="font-serif font-bold text-sm text-ink-900 hover:text-green-700 line-clamp-1"
                    >
                      {item.title}
                    </Link>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-medium text-ink-900 block">{item.author}</span>
                    <span className="text-[10px] text-ink-400">{item.role}</span>
                  </td>

                  <td className="py-3.5 px-4 text-ink-700">
                    {item.topic} <span className="text-ink-400">/ {item.subtopic}</span>
                  </td>

                  <td className="py-3.5 px-4 text-ink-500 whitespace-nowrap">
                    {item.location}
                  </td>

                  <td className="py-3.5 px-4">
                    {item.status === "IN_REVIEW" && (
                      <span className="px-2 py-0.5 rounded-chip text-[10px] font-semibold bg-warning-50 text-warning-700 border border-warning-700/20">
                        In Review
                      </span>
                    )}
                    {item.status === "PUBLISHED" && (
                      <span className="px-2 py-0.5 rounded-chip text-[10px] font-semibold bg-green-100 text-green-700">
                        Live ({item.reads} reads)
                      </span>
                    )}
                    {item.status === "CHANGES_REQUESTED" && (
                      <span className="px-2 py-0.5 rounded-chip text-[10px] font-semibold bg-warning-50 text-warning-700 border border-warning-700">
                        Changes Requested
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-ink-500 whitespace-nowrap">
                    {item.submittedAt}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <Link href={`/admin/articles/${item.id}`}>
                      <Button variant="primary" size="sm" className="text-xs">
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
    </AdminShell>
  );
}

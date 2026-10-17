"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Filter, ShieldCheck, GraduationCap, Clock, ChevronRight } from "lucide-react";
import { AdminShell } from "@/components/layout/admin-shell";
import { Button } from "@/components/ui/button";

const sampleResearchPapers = [
  {
    id: "res-1",
    refId: "RES-2026-00048",
    title: "Algorithmic Escalation Risks: AI-Assisted Target Recognition in High-Intensity Air Operations",
    author: "Dr. Ayesha Siddiqui",
    institution: "National Defence University",
    type: "Research Article",
    category: "Strategic Systems",
    round: 1,
    approvers: [
      { name: "Prof. Khalid Mehmood", status: "ACCEPTED" },
      { name: "Dr. Naveed Akhtar", status: "INVITED" },
    ],
    status: "UNDER_REVIEW",
    submittedAt: "12 Oct 2026",
    daysInStage: 6,
  },
  {
    id: "res-2",
    refId: "RES-2026-00049",
    title: "Rare-Earth Mineral Vulnerabilities in High-Altitude Aerospace Actuators",
    author: "Prof. Khalid Mehmood",
    institution: "Air University",
    type: "Policy Brief",
    category: "Defence Logistics",
    round: 1,
    approvers: [],
    status: "SUBMITTED",
    submittedAt: "17 Oct 2026",
    daysInStage: 1,
  },
  {
    id: "res-3",
    refId: "RES-2026-00042",
    title: "Penetration Aids and Decoy Trajectories: Penetrating Layered Anti-Ballistic Shields",
    author: "Dr. Naveed Akhtar",
    institution: "Air University",
    type: "Research Article",
    category: "Deterrence",
    round: 2,
    approvers: [
      { name: "Dr. Tariq Mahmud", status: "SUBMITTED" },
      { name: "Dr. Ayesha Siddiqui", status: "SUBMITTED" },
    ],
    status: "AWAITING_FINAL_APPROVAL",
    submittedAt: "01 Oct 2026",
    daysInStage: 2,
  },
];

export default function AdminResearchListingPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = sampleResearchPapers.filter((item) => {
    if (activeTab === "NEW" && item.status !== "SUBMITTED") return false;
    if (activeTab === "UNDER_REVIEW" && item.status !== "UNDER_REVIEW") return false;
    if (activeTab === "DECISION" && item.status !== "AWAITING_FINAL_APPROVAL") return false;

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
    <AdminShell title="Research Manuscripts & Peer Review Queue">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif font-bold text-2xl text-ink-900">
              Academic Peer Review Queue
            </h2>
            <p className="font-serif text-xs text-ink-500">
              Double-blind peer review screening, approver assignment, and academic publishing decisions.
            </p>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex border-b border-line overflow-x-auto text-xs font-sans font-medium">
          {[
            { id: "ALL", label: "All Papers", count: 3 },
            { id: "NEW", label: "New Submissions (Screening)", count: 1 },
            { id: "UNDER_REVIEW", label: "Under Review", count: 1 },
            { id: "DECISION", label: "Awaiting Final Decision", count: 1 },
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
              placeholder="Search by manuscript title, ID, or author..."
              className="w-full h-9 pl-9 pr-3 text-xs font-sans border border-line rounded-input bg-white focus:border-green-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-line rounded-card shadow-level1 overflow-hidden">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="bg-ivory-50 border-b border-line text-ink-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-5">Ref ID & Manuscript Title</th>
                <th className="py-3 px-4">Author (Private)</th>
                <th className="py-3 px-4">Format / Category</th>
                <th className="py-3 px-4">Round</th>
                <th className="py-3 px-4">Reviewers Assigned</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((paper) => (
                <tr key={paper.id} className="hover:bg-ivory-50 transition-colors">
                  <td className="py-3.5 px-5 max-w-md">
                    <span className="font-mono text-[11px] text-green-700 font-semibold block">
                      {paper.refId}
                    </span>
                    <Link
                      href={`/admin/research/${paper.id}`}
                      className="font-serif font-bold text-sm text-ink-900 hover:text-green-700 line-clamp-1"
                    >
                      {paper.title}
                    </Link>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-medium text-ink-900 block">{paper.author}</span>
                    <span className="text-[10px] text-ink-400">{paper.institution}</span>
                  </td>

                  <td className="py-3.5 px-4 text-ink-700">
                    <span>{paper.type}</span>
                    <span className="block text-[10px] text-ink-400">{paper.category}</span>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-semibold text-ink-700">
                    R{paper.round}
                  </td>

                  <td className="py-3.5 px-4">
                    {paper.approvers.length > 0 ? (
                      <div className="space-y-1">
                        {paper.approvers.map((app, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[11px]">
                            <span className="text-ink-700">{app.name}</span>
                            <span
                              className={`px-1 py-0.2 rounded text-[9px] font-bold ${
                                app.status === "SUBMITTED"
                                  ? "bg-green-100 text-green-700"
                                  : app.status === "ACCEPTED"
                                  ? "bg-info-50 text-info-700"
                                  : "bg-warning-50 text-warning-700"
                              }`}
                            >
                              {app.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-ink-400 italic">None assigned</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    {paper.status === "SUBMITTED" && (
                      <span className="px-2 py-0.5 rounded-chip text-[10px] font-semibold bg-warning-50 text-warning-700 border border-warning-700/20">
                        Screening Needed
                      </span>
                    )}
                    {paper.status === "UNDER_REVIEW" && (
                      <span className="px-2 py-0.5 rounded-chip text-[10px] font-semibold bg-info-50 text-info-700 border border-info-700/20">
                        Under Review
                      </span>
                    )}
                    {paper.status === "AWAITING_FINAL_APPROVAL" && (
                      <span className="px-2 py-0.5 rounded-chip text-[10px] font-semibold bg-green-100 text-green-700 border border-green-700/20">
                        Reviews Complete
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <Link href={`/admin/research/${paper.id}`}>
                      <Button variant="primary" size="sm" className="text-xs">
                        Manage →
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

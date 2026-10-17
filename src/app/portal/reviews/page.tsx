"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { PortalShell } from "@/components/layout/portal-shell";
import { Button } from "@/components/ui/button";

const reviewAssignments = [
  {
    id: "rev-1",
    refId: "RES-2026-00048",
    title: "Algorithmic Escalation Thresholds in Sensor-to-Shooter Missile Networks",
    type: "Research Article",
    category: "Strategic Systems",
    round: 1,
    assignedAt: "12 Oct 2026",
    dueAt: "02 Nov 2026",
    dueChip: "Due in 15 days",
    status: "TO_REVIEW",
  },
  {
    id: "rev-2",
    refId: "RES-2026-00045",
    title: "Rare-Earth Mineral Vulnerabilities in High-Altitude Aerospace Actuators",
    type: "Policy Brief",
    category: "Defence Logistics",
    round: 1,
    assignedAt: "15 Oct 2026",
    dueAt: "20 Oct 2026",
    dueChip: "Due in 2 days",
    isUrgent: true,
    status: "INVITATION",
  },
  {
    id: "rev-3",
    refId: "RES-2026-00039",
    title: "Kinematic Decoy Maneuvers Under Layered Terminal Phase Intercepts",
    type: "Research Article",
    category: "Deterrence",
    round: 2,
    assignedAt: "18 Sep 2026",
    dueAt: "08 Oct 2026",
    dueChip: "Completed",
    status: "APPROVED",
  },
];

export default function ApproverReviewsQueuePage() {
  const [activeTab, setActiveTab] = useState("ALL");

  return (
    <PortalShell title="Peer Review Assignments">
      <div className="space-y-6">
        {/* Double-Blind Anonymity Banner */}
        <div className="p-4 bg-green-50 border border-green-700/20 rounded-card flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
          <div className="text-xs font-sans text-ink-700 leading-relaxed">
            <span className="font-semibold text-green-900 block mb-0.5">
              Strict Double-Blind Anonymity Enforced (FRD Section 11 & FR-REV-01)
            </span>
            Author identities, emails, universities, and title page documents are withheld by the API.
            Review evaluations are strictly confined to originality, methodological rigour, evidence, clarity, and relevance.
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex border-b border-line overflow-x-auto text-xs font-sans font-medium">
          {[
            { id: "ALL", label: "All Papers", count: 3 },
            { id: "INVITATIONS", label: "Invitations", count: 1 },
            { id: "TO_REVIEW", label: "To Review", count: 1 },
            { id: "COMPLETED", label: "Completed", count: 1 },
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

        {/* Reviews Table */}
        <div className="bg-white border border-line rounded-card shadow-level1 overflow-hidden">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="bg-ivory-50 border-b border-line text-ink-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-5">Reference ID</th>
                <th className="py-3 px-4">Anonymised Manuscript Title</th>
                <th className="py-3 px-4">Format</th>
                <th className="py-3 px-4">Round</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4 text-right">Review Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {reviewAssignments.map((rev) => (
                <tr key={rev.id} className="hover:bg-ivory-50 transition-colors">
                  <td className="py-3.5 px-5 font-mono font-semibold text-green-700 whitespace-nowrap">
                    {rev.refId}
                  </td>

                  <td className="py-3.5 px-4 font-serif font-semibold text-ink-900 max-w-md">
                    {rev.title}
                  </td>

                  <td className="py-3.5 px-4 text-ink-700">
                    <span>{rev.type}</span>
                    <span className="block text-[10px] text-ink-400">{rev.category}</span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-ink-700">
                    Round {rev.round}
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-chip text-[10px] font-semibold ${
                        rev.isUrgent
                          ? "bg-warning-50 text-warning-700 border border-warning-700/30"
                          : rev.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : "bg-ivory-100 text-ink-700"
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      {rev.dueChip}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    {rev.status === "INVITATION" ? (
                      <div className="inline-flex gap-2">
                        <Button variant="secondary" size="sm" className="text-xs">
                          Decline
                        </Button>
                        <Button variant="primary" size="sm" className="text-xs">
                          Accept
                        </Button>
                      </div>
                    ) : (
                      <Link href={`/portal/reviews/${rev.id}`}>
                        <Button variant="primary" size="sm" className="text-xs gap-1">
                          <span>Open Workspace</span>
                          <ChevronRight className="w-3 h-3" />
                        </Button>
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PortalShell>
  );
}

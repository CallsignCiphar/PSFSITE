"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  ShieldCheck,
  UserCheck,
  Clock,
  Send,
  Plus,
  Eye,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { AdminShell } from "@/components/layout/admin-shell";
import { Button } from "@/components/ui/button";
import { ContentLabel } from "@/components/ui/content-label";
import { screenResearchPaper } from "@/app/actions/admin-actions";

const availableApprovers = [
  { id: "appr-1", name: "Prof. Khalid Mehmood", institution: "Air University", expertise: ["Aerospace", "Strategic Systems"], activeReviews: 1, avgTurnaroundDays: 14 },
  { id: "appr-2", name: "Dr. Naveed Akhtar", institution: "Air University", expertise: ["Deterrence", "Missile Defence"], activeReviews: 2, avgTurnaroundDays: 18 },
  { id: "appr-3", name: "Commodore (Retd) Bilal Zafar", institution: "Bahria University", expertise: ["Naval Warfare", "Nuclear Triad"], activeReviews: 0, avgTurnaroundDays: 12 },
  { id: "appr-4", name: "Dr. Tariq Mahmud", institution: "CASS", expertise: ["Air Defence", "Strategic Balance"], activeReviews: 3, avgTurnaroundDays: 16 },
];

export default function ResearchManagementAdminPage() {
  const router = useRouter();

  // Manuscript Tabs
  const [activeTab, setActiveTab] = useState<"MANUSCRIPT" | "ANON_PDF" | "TITLE_PAGE" | "SUPPLEMENTARY">("MANUSCRIPT");

  // Screening Checklist
  const [screeningChecks, setScreeningChecks] = useState({
    inScope: true,
    anonymised: true,
    formattingOk: true,
    referencesPresent: true,
    wordCountValid: true,
  });

  // Assign Approver Modal State
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedApproverIds, setSelectedApproverIds] = useState<string[]>(["appr-1"]);
  const [dueDays, setDueDays] = useState(21);
  const [isLoading, setIsLoading] = useState(false);

  // Final Approval Modal
  const [finalApprovalOpen, setFinalApprovalOpen] = useState(false);
  const [doiInput, setDoiInput] = useState("10.5842/psf.2026.04.02");
  const [volumeInput, setVolumeInput] = useState("Vol. 8");
  const [issueInput, setIssueInput] = useState("Iss. 4");

  const paper = {
    id: "res-1",
    refId: "RES-2026-00048",
    title: "Algorithmic Escalation Risks: AI-Assisted Target Recognition in High-Intensity Air Operations",
    author: {
      name: "Dr. Ayesha Siddiqui",
      email: "a.siddiqui@ndu.edu.pk",
      institution: "National Defence University, Islamabad",
      orcid: "0000-0002-1825-0097",
    },
    paperType: "Research Article",
    category: "Strategic Systems & C4ISR",
    topic: "Defence",
    subtopic: "Air",
    round: 1,
    status: "UNDER_REVIEW", // SUBMITTED, UNDER_REVIEW, AWAITING_FINAL_APPROVAL
    submittedAt: "12 Oct 2026, 16:30 PKT",
    wordCount: 8450,
    referencesCount: 28,
    activeApprovers: [
      {
        id: "appr-1",
        name: "Prof. Khalid Mehmood",
        status: "ACCEPTED",
        dueAt: "02 Nov 2026 (15 days remaining)",
        scores: null,
      },
      {
        id: "appr-2",
        name: "Dr. Naveed Akhtar",
        status: "INVITED",
        dueAt: "Pending response (3 days left)",
        scores: null,
      },
    ],
  };

  const handleScreeningDecision = async (action: "SEND_TO_REVIEW" | "RETURN_FORMATTING" | "DESK_REJECT") => {
    setIsLoading(true);
    await screenResearchPaper({
      paperId: paper.id,
      action,
    });
    setIsLoading(false);
    if (action === "SEND_TO_REVIEW") {
      setAssignModalOpen(true);
    } else {
      router.push("/admin/research");
    }
  };

  const handleToggleApprover = (id: string) => {
    if (selectedApproverIds.includes(id)) {
      setSelectedApproverIds(selectedApproverIds.filter((item) => item !== id));
    } else {
      if (selectedApproverIds.length < 2) {
        setSelectedApproverIds([...selectedApproverIds, id]);
      }
    }
  };

  return (
    <AdminShell title={`Research Paper: ${paper.refId}`}>
      <div className="space-y-8 pb-24 font-sans">
        {/* Back Link */}
        <Link
          href="/admin/research"
          className="inline-flex items-center gap-1.5 text-xs text-ink-500 hover:text-green-700"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Research Queue
        </Link>

        {/* Header Bar */}
        <div className="p-6 bg-white border border-line rounded-card shadow-level1 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs">
              <span className="font-mono font-bold text-green-700">{paper.refId}</span>
              <span className="text-line">·</span>
              <span className="font-semibold text-ink-900">{paper.paperType}</span>
              <span className="text-line">·</span>
              <span className="text-ink-500">{paper.category}</span>
            </div>
            <h2 className="font-serif font-bold text-2xl text-ink-900">{paper.title}</h2>
            <div className="flex items-center gap-3 text-xs text-ink-500 mt-1">
              <span>Author: <strong className="text-ink-900">{paper.author.name}</strong> ({paper.author.institution})</span>
              <span>·</span>
              <span>Round {paper.round}</span>
              <span>·</span>
              <span>{paper.wordCount} Words ({paper.referencesCount} References)</span>
            </div>
          </div>

          <div className="text-right text-xs">
            <span className="text-ink-400 block mb-1">Peer Review Stage</span>
            <span className="px-2.5 py-1 rounded-chip font-bold uppercase bg-info-50 text-info-700 border border-info-700/20">
              Under Review (2 Approvers)
            </span>
          </div>
        </div>

        {/* Two-Column Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Manuscript Viewer (Cols 1-7 / ~60%) */}
          <div className="lg:col-span-7 bg-white border border-line rounded-card shadow-level1 overflow-hidden">
            {/* Tabs */}
            <div className="bg-ivory-50 border-b border-line px-4 flex gap-4 text-xs font-sans font-medium">
              {[
                { id: "MANUSCRIPT", label: "Rendered Text" },
                { id: "ANON_PDF", label: "Anonymised PDF" },
                { id: "TITLE_PAGE", label: "Title Page (Confidential)" },
                { id: "SUPPLEMENTARY", label: "Supplementary Files (2)" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id as any)}
                  className={`py-3 border-b-2 transition-colors ${
                    activeTab === t.id
                      ? "border-green-700 text-green-700 font-bold"
                      : "border-transparent text-ink-500 hover:text-ink-900"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Rendered Text */}
            {activeTab === "MANUSCRIPT" && (
              <div className="p-8 max-h-[640px] overflow-y-auto space-y-6 font-serif text-sm leading-[1.65] text-ink-900">
                <div className="p-4 bg-ivory-50 border border-line rounded-card">
                  <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-ink-900 mb-1">
                    Abstract
                  </h4>
                  <p className="italic text-ink-700 text-xs leading-relaxed">
                    This study examines sensor-to-shooter latencies and automated threat prioritization algorithms within tactical command nodes, evaluating false-positive thresholds under intense electronic jamming conditions.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-lg text-ink-900 pt-2 border-t border-line">
                    1. Introduction
                  </h3>
                  <p>
                    In high-tempo aerial theaters, the sensor-to-shooter loop has increasingly shifted toward automated prioritization architectures. With air combat speeds compressing human reaction intervals below cognitive response thresholds, military commanders frequently rely on neural network classifiers...
                  </p>
                  <h3 className="font-serif font-bold text-lg text-ink-900 pt-2 border-t border-line">
                    2. Methodological Formulations
                  </h3>
                  <p>
                    Using probabilistic kinematic simulation models, we evaluate algorithmic confidence metrics when radar cross-section (RCS) data is degraded by stand-off noise jamming...
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: Anonymised PDF Viewer */}
            {activeTab === "ANON_PDF" && (
              <div className="p-8 max-h-[640px] overflow-y-auto bg-ivory-100 flex flex-col items-center justify-center min-h-[480px] text-center">
                <FileText className="w-12 h-12 text-ink-400 mb-2" />
                <span className="font-serif font-bold text-sm text-ink-900">
                  Anonymised Manuscript (anonymised_manuscript_v1.pdf)
                </span>
                <span className="text-xs font-sans text-ink-500 mt-1">
                  Metadata Verified: Author names and institutional references purged.
                </span>
                <Button variant="secondary" size="sm" className="mt-4 gap-1.5 text-xs">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Open PDF in High-Res Viewer</span>
                </Button>
              </div>
            )}

            {/* Tab 3: Title Page (Confidential) */}
            {activeTab === "TITLE_PAGE" && (
              <div className="p-8 space-y-4 text-xs font-sans">
                <div className="p-3 bg-warning-50 border border-warning-700/20 text-warning-700 rounded-sm">
                  Confidential: This title page is visible solely to editorial admins and is withheld from peer reviewers to preserve double-blind integrity.
                </div>
                <div className="space-y-2 border border-line rounded-card p-4 bg-ivory-50">
                  <div><strong>Author:</strong> Dr. Ayesha Siddiqui</div>
                  <div><strong>Email:</strong> a.siddiqui@ndu.edu.pk</div>
                  <div><strong>Affiliation:</strong> National Defence University, Islamabad</div>
                  <div><strong>ORCID:</strong> 0000-0002-1825-0097</div>
                </div>
              </div>
            )}

            {/* Tab 4: Supplementary Files */}
            {activeTab === "SUPPLEMENTARY" && (
              <div className="p-8 space-y-3 text-xs font-sans">
                <div className="p-3 bg-white border border-line rounded-card flex items-center justify-between">
                  <span>kinematic_simulation_code.py (120 KB)</span>
                  <Button variant="ghost" size="sm" className="text-green-700">Download</Button>
                </div>
                <div className="p-3 bg-white border border-line rounded-card flex items-center justify-between">
                  <span>radar_rcs_dataset.csv (1.4 MB)</span>
                  <Button variant="ghost" size="sm" className="text-green-700">Download</Button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Progressive Disclosure Panels (Cols 8-12 / ~40%) */}
          <aside className="lg:col-span-5 space-y-6">
            {/* Panel 1: Editorial Screening Stage */}
            <div className="bg-white border border-line rounded-card p-6 shadow-level1 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-line">
                <h4 className="font-serif font-bold text-sm text-ink-900">
                  Phase 1: Editorial Screening
                </h4>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-chip bg-green-100 text-green-700">
                  Completed
                </span>
              </div>

              <div className="space-y-2 text-xs font-sans text-ink-700">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={screeningChecks.inScope} readOnly className="rounded-sm text-green-700" />
                  <span>Subject falls within defense/strategic scope</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={screeningChecks.anonymised} readOnly className="rounded-sm text-green-700" />
                  <span>Manuscript successfully anonymised</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={screeningChecks.formattingOk} readOnly className="rounded-sm text-green-700" />
                  <span>Formatting & academic style verified</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={screeningChecks.referencesPresent} readOnly className="rounded-sm text-green-700" />
                  <span>Structured references present (APA 7)</span>
                </label>
              </div>
            </div>

            {/* Panel 2: Active Approver Tracker */}
            <div className="bg-white border border-line rounded-card p-6 shadow-level1 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-line">
                <h4 className="font-serif font-bold text-sm text-ink-900">
                  Phase 2: Reviewers & Tracker
                </h4>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setAssignModalOpen(true)}
                  className="text-xs gap-1"
                >
                  <Plus className="w-3 h-3" /> Assign Reviewer
                </Button>
              </div>

              <div className="space-y-3">
                {paper.activeApprovers.map((appr) => (
                  <div key={appr.id} className="p-3.5 border border-line rounded-card bg-ivory-50/50 space-y-1.5 text-xs font-sans">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-ink-900">{appr.name}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                          appr.status === "ACCEPTED" ? "bg-info-50 text-info-700" : "bg-warning-50 text-warning-700"
                        }`}
                      >
                        {appr.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-ink-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{appr.dueAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel 3: Final Decision & DOI Assignment */}
            <div className="bg-white border border-line rounded-card p-6 shadow-level1 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-line">
                <h4 className="font-serif font-bold text-sm text-ink-900">
                  Phase 3: Final Approval & Indexing
                </h4>
              </div>

              <p className="text-xs font-serif text-ink-700 leading-relaxed">
                Once all approvers recommend publication, assign the DOI, volume, and issue coordinates to release to open access.
              </p>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setFinalApprovalOpen(true)}
                className="w-full gap-2 text-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Publish Paper to PSF Research</span>
              </Button>
            </div>
          </aside>
        </div>

        {/* ========================================================
            ASSIGN APPROVER MODAL
            ======================================================== */}
        {assignModalOpen && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white border border-line rounded-card p-6 shadow-level3 space-y-4 font-sans">
              <h3 className="font-serif font-bold text-lg text-ink-900">
                Assign Certified Peer Reviewers (1 or 2)
              </h3>
              <p className="text-xs text-ink-700">
                Approvers matched based on subject expertise ({paper.category}). Conflict check automatically excludes co-authors and self-review.
              </p>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {availableApprovers.map((appr) => {
                  const isSelected = selectedApproverIds.includes(appr.id);
                  return (
                    <div
                      key={appr.id}
                      onClick={() => handleToggleApprover(appr.id)}
                      className={`p-3 border rounded-card cursor-pointer transition-colors flex items-center justify-between text-xs ${
                        isSelected ? "border-green-700 bg-green-50/50" : "border-line hover:border-ink-500"
                      }`}
                    >
                      <div>
                        <span className="font-semibold text-ink-900 block">{appr.name}</span>
                        <span className="text-ink-500 text-[11px]">{appr.institution}</span>
                        <div className="flex gap-1 mt-1">
                          {appr.expertise.map((e) => (
                            <span key={e} className="px-1.5 py-0.2 bg-ivory-100 rounded text-[10px]">
                              {e}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-right text-[11px]">
                        <span className="text-ink-500 block">Active reviews: {appr.activeReviews}</span>
                        <span className="text-green-700 font-medium">Avg: {appr.avgTurnaroundDays} days</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-900 mb-1">
                  Review Window Due Days (Default 21 Days)
                </label>
                <input
                  type="number"
                  value={dueDays}
                  onChange={(e) => setDueDays(parseInt(e.target.value, 10))}
                  className="w-32 h-9 px-3 text-xs border border-line rounded-input"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button variant="secondary" size="sm" onClick={() => setAssignModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setAssignModalOpen(false);
                    alert("Invitations dispatched to selected reviewers.");
                  }}
                  disabled={selectedApproverIds.length === 0}
                >
                  Send Review Invitations ({selectedApproverIds.length})
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Final Approval Modal */}
        {finalApprovalOpen && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white border border-line rounded-card p-6 shadow-level3 space-y-4 font-sans">
              <h3 className="font-serif font-bold text-lg text-ink-900">
                Final Approval & Publication
              </h3>
              <p className="text-xs text-ink-700">
                Confirm digital object identifier (DOI) and journal citation coordinates.
              </p>

              <div>
                <label className="block text-xs font-medium text-ink-900 mb-1">DOI Suffix</label>
                <input
                  type="text"
                  value={doiInput}
                  onChange={(e) => setDoiInput(e.target.value)}
                  className="w-full h-9 px-3 font-mono text-xs border border-line rounded-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-medium text-ink-900 mb-1">Volume</label>
                  <input
                    type="text"
                    value={volumeInput}
                    onChange={(e) => setVolumeInput(e.target.value)}
                    className="w-full h-9 px-3 border border-line rounded-input"
                  />
                </div>
                <div>
                  <label className="block font-medium text-ink-900 mb-1">Issue</label>
                  <input
                    type="text"
                    value={issueInput}
                    onChange={(e) => setIssueInput(e.target.value)}
                    className="w-full h-9 px-3 border border-line rounded-input"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button variant="secondary" size="sm" onClick={() => setFinalApprovalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setFinalApprovalOpen(false);
                    router.push("/admin/research");
                  }}
                >
                  Publish & Register DOI
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}

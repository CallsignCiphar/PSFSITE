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
  ShieldAlert,
  ExternalLink,
  Laptop,
  MapPin,
  Clock,
  RotateCw,
  ZoomIn,
} from "lucide-react";
import { AdminShell } from "@/components/layout/admin-shell";
import { Button } from "@/components/ui/button";
import { decideApplication } from "@/app/actions/admin-actions";

export default function ApplicationReviewPage() {
  const router = useRouter();

  // Dialog states
  const [approveOpen, setApproveOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);
  const [rejectPermanentOpen, setRejectPermanentOpen] = useState(false);

  // Form states for decisions
  const [welcomeNote, setWelcomeNote] = useState("Welcome to Pakistan Strategic Forum. Your writing account has been granted full access.");
  const [returnComment, setReturnComment] = useState("");
  const [permanentReason, setPermanentReason] = useState("FAKE_OR_MISLEADING_INFO");
  const [confirmEmailInput, setConfirmEmailInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Sample application under review
  const app = {
    id: "app-1",
    applicantName: "Dr. Hamza Shafqat",
    email: "h.shafqat@qau.edu.pk",
    track: "RESEARCH_WRITER",
    trackLabel: "Research Scholar Track",
    attempt: 1,
    submittedAt: "17 Oct 2026, 11:20 PKT",
    status: "PENDING",
    institution: "Quaid-i-Azam University, Islamabad",
    designation: "Assistant Professor",
    department: "Department of Strategic & Nuclear Studies",
    programme: "Faculty / Senior Academic",
    graduationStatus: "NOT_APPLICABLE",
    orcid: "0000-0002-1825-0097",
    expertise: ["Strategic Systems", "Deterrence", "Hypersonics", "Nuclear Escalation"],
    researchInterests:
      "Hypersonic glide trajectories, compressed sensor-to-shooter loops in South Asian deterrence, and BMD penetration countermeasures.",
    purpose:
      "To publish peer-reviewed scholarly research in PSF Research, offering policy-relevant strategic insights to defense planners and academic researchers.",
    previousPublications:
      "Shafqat, H. (2025). 'Kinematic Decoy Models in South Asian Air Defence.' Journal of Strategic Studies, 42(3), 112–134.",
    submissionContext: {
      ip: "182.185.142.10",
      country: "Pakistan",
      city: "Islamabad",
      device: "macOS 15.1 · Chrome 130",
      domainMatch: true, // @qau.edu.pk matches Quaid-i-Azam University
    },
  };

  const handleApprove = async () => {
    setIsLoading(true);
    await decideApplication({
      applicationId: app.id,
      decision: "APPROVE",
      commentToApplicant: welcomeNote,
    });
    setIsLoading(false);
    setApproveOpen(false);
    router.push("/admin/applications");
  };

  const handleReturn = async () => {
    if (returnComment.length < 20) {
      alert("Comment must be at least 20 characters.");
      return;
    }
    setIsLoading(true);
    await decideApplication({
      applicationId: app.id,
      decision: "REJECT_WITH_COMMENTS",
      commentToApplicant: returnComment,
    });
    setIsLoading(false);
    setReturnOpen(false);
    router.push("/admin/applications");
  };

  const handlePermanentReject = async () => {
    if (confirmEmailInput.trim().toLowerCase() !== app.email.toLowerCase()) {
      alert("Please type the applicant's exact email address to confirm permanent rejection.");
      return;
    }
    setIsLoading(true);
    await decideApplication({
      applicationId: app.id,
      decision: "REJECT_PERMANENTLY",
      permanentReason,
      commentToApplicant: "After careful review, the editorial board is unable to accept your contributor application.",
    });
    setIsLoading(false);
    setRejectPermanentOpen(false);
    router.push("/admin/applications");
  };

  return (
    <AdminShell title={`Review Application: ${app.applicantName}`}>
      <div className="space-y-8 pb-24 font-sans">
        {/* Back Link */}
        <Link
          href="/admin/applications"
          className="inline-flex items-center gap-1.5 text-xs text-ink-500 hover:text-green-700"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Applications Queue
        </Link>

        {/* Header Summary Card */}
        <div className="p-6 bg-white border border-line rounded-card shadow-level1 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-chip text-xs font-semibold bg-green-100 text-green-700">
                {app.trackLabel}
              </span>
              <span className="text-line text-xs">·</span>
              <span className="text-xs font-mono text-ink-500">Attempt #{app.attempt}</span>
            </div>
            <h2 className="font-serif font-bold text-2xl text-ink-900">{app.applicantName}</h2>
            <div className="flex items-center gap-3 text-xs text-ink-500 mt-1">
              <span className="font-mono text-ink-700 font-medium">{app.email}</span>
              <span className="px-1.5 py-0.2 bg-green-50 text-green-700 rounded-chip text-[10px] font-bold">
                Email Verified
              </span>
              <span>·</span>
              <span>Submitted: {app.submittedAt}</span>
            </div>
          </div>

          <div className="text-right text-xs">
            <span className="text-ink-400 block mb-1">Current State</span>
            <span className="px-2.5 py-1 rounded-chip font-bold uppercase bg-warning-50 text-warning-700 border border-warning-700/20">
              Pending Editorial Decision
            </span>
          </div>
        </div>

        {/* Two-Column Review Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Credentials (Cols 1-8) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Academic Credentials */}
            <div className="bg-white border border-line rounded-card p-6 shadow-level1 space-y-4">
              <h3 className="font-serif font-bold text-base text-ink-900 pb-2 border-b border-line">
                Academic & Institutional Credentials
              </h3>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-ink-400 block mb-0.5">Institution / University</span>
                  <span className="font-semibold text-ink-900 text-sm">{app.institution}</span>
                </div>
                <div>
                  <span className="text-ink-400 block mb-0.5">Designation</span>
                  <span className="font-semibold text-ink-900 text-sm">{app.designation}</span>
                </div>
                <div>
                  <span className="text-ink-400 block mb-0.5">Department / Faculty</span>
                  <span className="text-ink-900">{app.department}</span>
                </div>
                <div>
                  <span className="text-ink-400 block mb-0.5">Programme / Status</span>
                  <span className="text-ink-900">{app.programme}</span>
                </div>
              </div>

              {app.orcid && (
                <div className="pt-2 border-t border-line text-xs">
                  <span className="text-ink-400 mr-2">ORCID iD:</span>
                  <a
                    href={`https://orcid.org/${app.orcid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-green-700 hover:underline inline-flex items-center gap-1"
                  >
                    <span>{app.orcid}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {/* Research Focus & Statements */}
            <div className="bg-white border border-line rounded-card p-6 shadow-level1 space-y-4">
              <h3 className="font-serif font-bold text-base text-ink-900 pb-2 border-b border-line">
                Research Focus & Submission Rationale
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-semibold text-ink-900 block mb-1">Areas of Expertise:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {app.expertise.map((exp) => (
                      <span
                        key={exp}
                        className="px-2 py-0.5 rounded-chip text-xs font-medium bg-ivory-100 text-ink-900 border border-line"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-ink-900 block mb-1">Research Interests:</span>
                  <p className="font-serif text-sm text-ink-700 leading-relaxed bg-ivory-50 p-3 rounded border border-line">
                    {app.researchInterests}
                  </p>
                </div>

                <div>
                  <span className="font-semibold text-ink-900 block mb-1">Purpose for Registering with PSF:</span>
                  <p className="font-serif text-sm text-ink-700 leading-relaxed bg-ivory-50 p-3 rounded border border-line">
                    {app.purpose}
                  </p>
                </div>

                <div>
                  <span className="font-semibold text-ink-900 block mb-1">Prior Publications:</span>
                  <p className="font-serif text-xs text-ink-700 bg-ivory-50 p-3 rounded border border-line">
                    {app.previousPublications}
                  </p>
                </div>
              </div>
            </div>

            {/* Secure Institutional ID Document Viewer */}
            <div className="bg-white border border-line rounded-card p-6 shadow-level1 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-line">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-green-700" />
                  <h3 className="font-serif font-bold text-base text-ink-900">
                    Institutional ID Document Viewer
                  </h3>
                </div>
                <span className="text-[11px] font-sans text-ink-400">
                  Stored in private bucket (auto-purged 30 days post-decision)
                </span>
              </div>

              <div className="relative aspect-[16/9] max-h-72 bg-ivory-100 border border-line rounded-card flex flex-col items-center justify-center p-6 text-center">
                <ShieldAlert className="w-10 h-10 text-green-700/40 mb-2" />
                <span className="text-xs font-sans font-semibold text-ink-900">
                  Faculty ID Card: Quaid-i-Azam University
                </span>
                <span className="text-[11px] font-sans text-ink-400 mt-1">
                  File: faculty_id_shafqat.pdf (Encrypted storage key: psf-private/ids/app-1-card.pdf)
                </span>
                <div className="flex items-center gap-2 mt-4">
                  <Button variant="secondary" size="sm" className="gap-1 text-xs">
                    <ZoomIn className="w-3.5 h-3.5" /> Zoom In
                  </Button>
                  <Button variant="secondary" size="sm" className="gap-1 text-xs">
                    <RotateCw className="w-3.5 h-3.5" /> Rotate
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Submission Context & Integrity Verification (Cols 9-12) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-line rounded-card p-6 shadow-level1 space-y-4">
              <h4 className="font-serif font-bold text-sm text-ink-900 pb-2 border-b border-line">
                Submission Telemetry & Security
              </h4>

              <div className="space-y-3 text-xs">
                {/* Domain Match Flag */}
                <div className="p-3 bg-green-50 border border-green-700/20 rounded flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-green-900 block">Domain Match Verified</span>
                    <span className="text-ink-700 text-[11px]">
                      Email domain <code className="font-mono">qau.edu.pk</code> matches Quaid-i-Azam University records.
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-line">
                  <span className="text-ink-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Submitter IP & Geo
                  </span>
                  <span className="font-mono text-ink-900 font-medium">
                    {app.submissionContext.ip} ({app.submissionContext.city})
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-line">
                  <span className="text-ink-400 flex items-center gap-1">
                    <Laptop className="w-3 h-3" /> Device / Client
                  </span>
                  <span className="text-ink-900">{app.submissionContext.device}</span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-ink-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Previous Attempts
                  </span>
                  <span className="font-semibold text-green-700">None (First Submission)</span>
                </div>
              </div>
            </div>

            {/* Admin Notes Thread */}
            <div className="bg-white border border-line rounded-card p-6 shadow-level1 space-y-3">
              <h4 className="font-serif font-bold text-sm text-ink-900 pb-2 border-b border-line">
                Internal Administrative Notes
              </h4>
              <p className="text-xs font-serif text-ink-500 italic">
                No internal notes posted yet for this candidate.
              </p>
              <textarea
                rows={2}
                placeholder="Add confidential internal note..."
                className="w-full p-2 text-xs font-sans border border-line rounded-input bg-ivory-50 focus:bg-white focus:outline-none"
              />
            </div>
          </aside>
        </div>

        {/* ========================================================
            STICKY BOTTOM DECISION PANEL (VIEWPORT FIXED)
            ======================================================== */}
        <div className="fixed bottom-0 left-0 lg:left-[264px] right-0 bg-white border-t border-line p-4 z-30 shadow-level3">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-sans text-ink-700">
              Evaluating candidate <strong className="text-ink-900">{app.applicantName}</strong> for{" "}
              <span className="text-green-700 font-semibold">{app.trackLabel}</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setRejectPermanentOpen(true)}
                className="text-xs"
              >
                Reject Permanently
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => setReturnOpen(true)}
                className="text-xs text-warning-700 border-warning-700/40 hover:bg-warning-50"
              >
                Return with Comments
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setApproveOpen(true)}
                className="text-xs gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Approve & Activate Account</span>
              </Button>
            </div>
          </div>
        </div>

        {/* ========================================================
            1. APPROVE CONFIRMATION DIALOG
            ======================================================== */}
        {approveOpen && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white border border-line rounded-card p-6 shadow-level3 space-y-4">
              <h3 className="font-serif font-bold text-lg text-ink-900">
                Approve Contributor Application
              </h3>
              <p className="text-xs font-sans text-ink-700 leading-relaxed">
                Approving this candidate will grant the <strong className="text-green-700">Research Writer</strong> role, activate their dashboard, and send an automated welcome email.
              </p>

              <div>
                <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
                  Optional Welcome Note for Applicant
                </label>
                <textarea
                  rows={3}
                  value={welcomeNote}
                  onChange={(e) => setWelcomeNote(e.target.value)}
                  className="w-full p-2.5 text-xs font-sans border border-line rounded-input focus:border-green-700 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button variant="secondary" size="sm" onClick={() => setApproveOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleApprove} isLoading={isLoading}>
                  Confirm Approval
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            2. RETURN WITH COMMENTS MODAL
            ======================================================== */}
        {returnOpen && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white border border-line rounded-card p-6 shadow-level3 space-y-4">
              <h3 className="font-serif font-bold text-lg text-ink-900">
                Return Application with Revision Comments
              </h3>
              <p className="text-xs font-sans text-ink-700 leading-relaxed">
                The applicant will receive your comments by email and their status will switch to <strong>Returned</strong>. They will be able to edit and resubmit their form (Attempt + 1).
              </p>

              <div>
                <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
                  Revision Comments to Applicant (Minimum 20 characters) <span className="text-danger-700">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={returnComment}
                  onChange={(e) => setReturnComment(e.target.value)}
                  placeholder="Clearly explain what details or sample credentials need clarification..."
                  className="w-full p-3 text-xs font-sans border border-line rounded-input focus:border-green-700 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button variant="secondary" size="sm" onClick={() => setReturnOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleReturn}
                  isLoading={isLoading}
                  className="bg-warning-700 hover:bg-warning-700/90"
                >
                  Send Revisions Request
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            3. PERMANENT REJECT (TYPE-TO-CONFIRM DESTRUCTIVE MODAL)
            ======================================================== */}
        {rejectPermanentOpen && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white border border-danger-700/30 rounded-card p-6 shadow-level3 space-y-4">
              <div className="flex items-center gap-2 text-danger-700">
                <XCircle className="w-5 h-5" />
                <h3 className="font-serif font-bold text-lg">
                  Permanent Rejection & Email Blocklist
                </h3>
              </div>

              <div className="p-3 bg-danger-50 border border-danger-700/20 text-xs font-sans text-danger-700 rounded-sm leading-relaxed">
                <strong>Warning (Irreversible):</strong> This candidate will be permanently rejected. Their email (<code>{app.email}</code>) and its canonical variations will be placed on the permanent blocklist, blocking all future signups.
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
                  Reason for Permanent Rejection
                </label>
                <select
                  value={permanentReason}
                  onChange={(e) => setPermanentReason(e.target.value)}
                  className="w-full h-9 px-2 text-xs font-sans border border-line rounded-input bg-white focus:outline-none"
                >
                  <option value="FAKE_OR_MISLEADING_INFO">Fake or Misleading Institutional Credentials</option>
                  <option value="IMPERSONATION">Impersonation of an Academic / Military Officer</option>
                  <option value="PLAGIARISED_SAMPLES">Plagiarised Writing Samples</option>
                  <option value="ABUSIVE_CONTENT">Abusive or Malicious Submission</option>
                  <option value="SPAM">Automated Spam Submission</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
                  Type <span className="font-mono font-bold text-danger-700">{app.email}</span> to confirm:
                </label>
                <input
                  type="text"
                  value={confirmEmailInput}
                  onChange={(e) => setConfirmEmailInput(e.target.value)}
                  placeholder="Type email address exactly..."
                  className="w-full h-9 px-3 text-xs font-mono border border-line rounded-input focus:border-danger-700 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button variant="secondary" size="sm" onClick={() => setRejectPermanentOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handlePermanentReject}
                  isLoading={isLoading}
                  disabled={confirmEmailInput.trim().toLowerCase() !== app.email.toLowerCase()}
                >
                  Block & Permanently Reject
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}

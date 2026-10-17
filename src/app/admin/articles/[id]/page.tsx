"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  XCircle,
  ExternalLink,
  Smartphone,
  Monitor,
  Eye,
  Edit,
  ShieldCheck,
  MapPin,
  Check,
} from "lucide-react";
import { AdminShell } from "@/components/layout/admin-shell";
import { Button } from "@/components/ui/button";
import { ContentLabel } from "@/components/ui/content-label";
import { decideArticle } from "@/app/actions/admin-actions";

export default function ArticleReviewAdminPage() {
  const router = useRouter();
  const [deviceView, setDeviceView] = useState<"desktop" | "mobile">("desktop");
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [revisionsModalOpen, setRevisionsModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [scheduledDateTime, setScheduledDateTime] = useState("2026-10-20T10:00");
  const [editorialComment, setEditorialComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const article = {
    id: "art-1",
    refId: "ART-2026-00481",
    title: "Electronic Warfare Countermeasures in Trans-Himalayan Border Patrols",
    standfirst:
      "A technical evaluation of portable jamming suites, frequency-hopping handheld radios, and drone interdiction protocols operating along high-altitude patrol lines.",
    label: "ANALYSIS",
    topic: "Defence",
    subtopic: "Land",
    location: "Skardu, Pakistan",
    author: {
      name: "Dr. Ayesha Siddiqui",
      email: "a.siddiqui@ndu.edu.pk",
      role: "Research Scholar",
      publishedCount: 14,
      approvalRate: "92%",
    },
    wordCount: 1420,
    readMinutes: 7,
    submittedAt: "18 Oct 2026, 11:20 PKT",
    status: "IN_REVIEW",
    submissionIp: "182.185.92.44",
    submissionCountry: "Pakistan",
    checks: {
      wordCountOk: true,
      altTextProvided: true,
      linksVerified: true,
      plagiarismSimilarityScore: "2.1% (Low)",
    },
  };

  const handlePublishNow = async () => {
    setIsLoading(true);
    await decideArticle({
      articleId: article.id,
      decision: "PUBLISH_NOW",
    });
    setIsLoading(false);
    router.push("/admin/articles");
  };

  const handleSchedule = async () => {
    setIsLoading(true);
    await decideArticle({
      articleId: article.id,
      decision: "SCHEDULE",
      scheduledFor: scheduledDateTime,
    });
    setIsLoading(false);
    setScheduleModalOpen(false);
    router.push("/admin/articles");
  };

  const handleRequestChanges = async () => {
    if (!editorialComment.trim()) {
      alert("Please provide specific revision instructions for the author.");
      return;
    }
    setIsLoading(true);
    await decideArticle({
      articleId: article.id,
      decision: "CHANGES_REQUESTED",
      comment: editorialComment,
    });
    setIsLoading(false);
    setRevisionsModalOpen(false);
    router.push("/admin/articles");
  };

  const handleReject = async () => {
    if (!editorialComment.trim()) {
      alert("Please state the reason for rejecting this article.");
      return;
    }
    setIsLoading(true);
    await decideArticle({
      articleId: article.id,
      decision: "REJECT",
      comment: editorialComment,
    });
    setIsLoading(false);
    setRejectModalOpen(false);
    router.push("/admin/articles");
  };

  return (
    <AdminShell title={`Review Article: ${article.refId}`}>
      <div className="space-y-8 pb-24 font-sans">
        {/* Back Link */}
        <Link
          href="/admin/articles"
          className="inline-flex items-center gap-1.5 text-xs text-ink-500 hover:text-green-700"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Articles Queue
        </Link>

        {/* Header Bar */}
        <div className="p-6 bg-white border border-line rounded-card shadow-level1 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-green-700">{article.refId}</span>
              <span className="text-line text-xs">·</span>
              <ContentLabel type={article.label} />
              <span className="text-line text-xs">·</span>
              <span className="text-xs text-ink-700 font-semibold">{article.topic} / {article.subtopic}</span>
            </div>
            <h2 className="font-serif font-bold text-2xl text-ink-900">{article.title}</h2>
            <div className="flex items-center gap-3 text-xs text-ink-500 mt-1">
              <span>Author: <strong className="text-ink-900">{article.author.name}</strong></span>
              <span>·</span>
              <span>Submitted: {article.submittedAt}</span>
              <span>·</span>
              <span>{article.wordCount} Words ({article.readMinutes} min read)</span>
            </div>
          </div>

          {/* Viewport Device Toggle */}
          <div className="flex items-center border border-line rounded-button bg-ivory-50 p-1">
            <button
              type="button"
              onClick={() => setDeviceView("desktop")}
              className={`p-1.5 rounded-sm flex items-center gap-1 text-xs font-medium transition-colors ${
                deviceView === "desktop" ? "bg-white text-green-700 shadow-sm" : "text-ink-500 hover:text-ink-900"
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => setDeviceView("mobile")}
              className={`p-1.5 rounded-sm flex items-center gap-1 text-xs font-medium transition-colors ${
                deviceView === "mobile" ? "bg-white text-green-700 shadow-sm" : "text-ink-500 hover:text-ink-900"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Mobile</span>
            </button>
          </div>
        </div>

        {/* Two-Column Review Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Rendered Article Preview (Cols 1-8) */}
          <div className="lg:col-span-8 flex justify-center">
            <div
              className={`bg-white border border-line rounded-card p-8 md:p-12 shadow-level1 transition-all ${
                deviceView === "mobile" ? "max-w-sm" : "w-full"
              }`}
            >
              <ContentLabel type={article.label} className="mb-2" />
              <h1 className="font-serif font-bold text-3xl leading-snug text-ink-900 mb-4">
                {article.title}
              </h1>
              <p className="font-serif text-lg text-ink-700 italic leading-relaxed mb-6">
                {article.standfirst}
              </p>

              <div className="py-3 border-y border-line text-xs font-sans text-ink-500 flex items-center justify-between mb-6">
                <span>By {article.author.name}</span>
                <span>{article.location}</span>
              </div>

              {/* Sample Body Prose */}
              <div className="font-serif text-base text-ink-900 leading-[1.65] space-y-4">
                <p>
                  High-altitude operational sectors impose extreme constraints on wireless command architectures. At elevations exceeding 4,500 meters, terrain masking, atmospheric refraction, and severe sub-zero temperatures exacerbate electronic countermeasure vulnerabilities.
                </p>
                <p>
                  Tactical field evaluations along patrol sectors demonstrate that frequency-hopping spread-spectrum (FHSS) transceivers operating in UHF bands preserve telemetry survivability even under proximity broadband noise jamming.
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Context, Telemetry & Automated Checks (Cols 9-12) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Automated Editorial Checks */}
            <div className="bg-white border border-line rounded-card p-6 shadow-level1 space-y-3">
              <h4 className="font-serif font-bold text-sm text-ink-900 pb-2 border-b border-line">
                Automated Editorial Checks
              </h4>
              <div className="space-y-2 text-xs font-sans">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-ink-700">
                    <Check className="w-3.5 h-3.5 text-green-700" /> Word count within threshold
                  </span>
                  <span className="font-mono text-green-700 font-bold">PASS ({article.wordCount})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-ink-700">
                    <Check className="w-3.5 h-3.5 text-green-700" /> Image alt text verified
                  </span>
                  <span className="font-mono text-green-700 font-bold">PASS</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-ink-700">
                    <Check className="w-3.5 h-3.5 text-green-700" /> External links status
                  </span>
                  <span className="font-mono text-green-700 font-bold">PASS (3/3)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-ink-700">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-700" /> Similarity index
                  </span>
                  <span className="font-mono text-green-700 font-bold">{article.checks.plagiarismSimilarityScore}</span>
                </div>
              </div>
            </div>

            {/* Author Snapshot */}
            <div className="bg-white border border-line rounded-card p-6 shadow-level1 space-y-3">
              <h4 className="font-serif font-bold text-sm text-ink-900 pb-2 border-b border-line">
                Author Track Record
              </h4>
              <div className="text-xs font-sans space-y-1.5">
                <div className="font-semibold text-ink-900">{article.author.name}</div>
                <div className="text-ink-500">{article.author.email}</div>
                <div className="flex justify-between pt-2 border-t border-line text-ink-700">
                  <span>Published Pieces</span>
                  <span className="font-mono font-bold text-ink-900">{article.author.publishedCount}</span>
                </div>
                <div className="flex justify-between text-ink-700">
                  <span>Approval Ratio</span>
                  <span className="font-mono font-bold text-green-700">{article.author.approvalRate}</span>
                </div>
              </div>
            </div>

            {/* Submission Telemetry */}
            <div className="bg-white border border-line rounded-card p-6 shadow-level1 space-y-2 text-xs font-sans">
              <h4 className="font-serif font-bold text-sm text-ink-900 pb-2 border-b border-line">
                Submission Context
              </h4>
              <div className="flex justify-between">
                <span className="text-ink-400">IP Address</span>
                <span className="font-mono text-ink-900">{article.submissionIp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-400">Geographic Origin</span>
                <span className="text-ink-900">{article.submissionCountry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-400">Target Geocode</span>
                <span className="text-green-700 font-medium">{article.location}</span>
              </div>
            </div>
          </aside>
        </div>

        {/* ========================================================
            STICKY BOTTOM DECISION BAR
            ======================================================== */}
        <div className="fixed bottom-0 left-0 lg:left-[264px] right-0 bg-white border-t border-line p-4 z-30 shadow-level3">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-sans text-ink-700">
              Editorial Status: <strong className="text-warning-700">Awaiting Decision ({article.refId})</strong>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setRejectModalOpen(true)}
                className="text-xs"
              >
                Reject Article
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => setRevisionsModalOpen(true)}
                className="text-xs text-warning-700 border-warning-700/40 hover:bg-warning-50"
              >
                Request Revisions
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => setScheduleModalOpen(true)}
                className="text-xs gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Schedule Publish</span>
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={handlePublishNow}
                isLoading={isLoading}
                className="text-xs gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Approve & Publish Now</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Schedule Modal */}
        {scheduleModalOpen && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white border border-line rounded-card p-6 shadow-level3 space-y-4">
              <h3 className="font-serif font-bold text-lg text-ink-900">Schedule Publication</h3>
              <p className="text-xs font-sans text-ink-700">
                Select target publication date and time in Pakistan Standard Time (PKT).
              </p>
              <div>
                <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
                  Publish Time (PKT)
                </label>
                <input
                  type="datetime-local"
                  value={scheduledDateTime}
                  onChange={(e) => setScheduledDateTime(e.target.value)}
                  className="w-full h-10 px-3 text-sm font-sans border border-line rounded-input bg-white focus:border-green-700 focus:outline-none"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <Button variant="secondary" size="sm" onClick={() => setScheduleModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleSchedule} isLoading={isLoading}>
                  Confirm Schedule
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Revisions Request Modal */}
        {revisionsModalOpen && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white border border-line rounded-card p-6 shadow-level3 space-y-4">
              <h3 className="font-serif font-bold text-lg text-ink-900">Request Editorial Revisions</h3>
              <p className="text-xs font-sans text-ink-700">
                Provide specific guidance on what arguments, sources, or terminology need adjustment. The author will be notified by email and the item unlocked for edits.
              </p>
              <div>
                <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
                  Instructions to Author <span className="text-danger-700">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={editorialComment}
                  onChange={(e) => setEditorialComment(e.target.value)}
                  placeholder="Detail required factual additions or structural changes..."
                  className="w-full p-3 text-xs font-sans border border-line rounded-input focus:border-green-700 focus:outline-none"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <Button variant="secondary" size="sm" onClick={() => setRevisionsModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleRequestChanges}
                  isLoading={isLoading}
                  className="bg-warning-700 hover:bg-warning-700/90"
                >
                  Send Revisions Request
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Reject Modal */}
        {rejectModalOpen && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white border border-danger-700/30 rounded-card p-6 shadow-level3 space-y-4">
              <h3 className="font-serif font-bold text-lg text-danger-700">Reject Article Submission</h3>
              <p className="text-xs font-sans text-ink-700">
                Are you sure you wish to reject this article? The piece will be locked and cannot be resubmitted under the same reference ID.
              </p>
              <div>
                <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
                  Reason for Rejection <span className="text-danger-700">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={editorialComment}
                  onChange={(e) => setEditorialComment(e.target.value)}
                  placeholder="Explain why this piece cannot be published..."
                  className="w-full p-3 text-xs font-sans border border-line rounded-input focus:border-danger-700 focus:outline-none"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <Button variant="secondary" size="sm" onClick={() => setRejectModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" size="sm" onClick={handleReject} isLoading={isLoading}>
                  Confirm Rejection
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}

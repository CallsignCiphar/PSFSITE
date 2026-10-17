"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AdminShell } from "@/components/layout/admin-shell";
import {
  ArrowLeft,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Download,
  ExternalLink,
  Clock,
  Sparkles,
  BookOpen,
  Send,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getAdminReportById,
  decideReport,
} from "@/app/actions/report-actions";

export default function ReportReviewPage() {
  const params = useParams();
  const router = useRouter();
  const reportId = params.id as string;

  const [report, setReport] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState("");
  const [decisionInProgress, setDecisionInProgress] = useState(false);

  useEffect(() => {
    getAdminReportById(reportId).then((res) => {
      setReport(res);
      setLoading(false);
    });
  }, [reportId]);

  const handleDecision = async (
    decision: "APPROVE" | "REQUEST_CHANGES" | "REJECT"
  ) => {
    if (decision !== "APPROVE" && !comments.trim()) {
      alert("Please provide editorial comments explaining your decision.");
      return;
    }

    if (
      !confirm(
        `Are you sure you want to execute decision: ${decision} for this special report?`
      )
    ) {
      return;
    }

    setDecisionInProgress(true);
    try {
      await decideReport(reportId, decision, comments);
      alert(`Decision ${decision} recorded successfully.`);
      router.push("/admin/reports");
    } catch (err) {
      console.error(err);
      alert("Failed to record editorial decision.");
    } finally {
      setDecisionInProgress(false);
    }
  };

  if (loading) {
    return (
      <AdminShell title="Review Special Report">
        <div className="p-12 text-center text-xs text-ink-400 bg-white border border-line rounded-sm">
          Loading report manuscript and verifying key findings payload...
        </div>
      </AdminShell>
    );
  }

  if (!report) {
    return (
      <AdminShell title="Review Special Report">
        <div className="p-8 text-center text-xs text-red-600 bg-white border border-line rounded-sm">
          Report not found.
        </div>
      </AdminShell>
    );
  }

  const rd = report.reportDetails;
  const keyFindings: string[] = Array.isArray(rd?.keyFindings)
    ? rd.keyFindings
    : [];

  return (
    <AdminShell title={`Review • ${rd?.reportNumber || report.refId}`}>
      <div className="space-y-6 font-sans">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-4">
          <div className="flex items-center gap-3">
            <Link href="/admin/reports">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Reports Queue</span>
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-green-800 bg-green-50 px-2 py-0.5 rounded-chip">
                  {rd?.reportNumber || report.refId}
                </span>
                <span className="text-xs text-ink-500">• Special Report</span>
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.2 rounded-chip ${
                    report.status === "PUBLISHED"
                      ? "bg-green-100 text-green-800"
                      : "bg-warning-50 text-warning-800"
                  }`}
                >
                  {report.status}
                </span>
              </div>
              <h1 className="text-xl font-serif font-bold text-ink-900 mt-1">
                {report.title}
              </h1>
            </div>
          </div>

          {report.status === "PUBLISHED" && (
            <Link href={`/reports/${report.slug}`} target="_blank">
              <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                <span>View on Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </Link>
          )}
        </div>

        {/* 2-Column Review Layout (Cols 1-7 Left, Cols 8-12 Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN: Manuscript & Findings Preview */}
          <div className="lg:col-span-8 space-y-6">
            {/* Cover & Executive Standfirst */}
            <div className="bg-white border border-line rounded-sm p-6 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-32 h-44 bg-ivory-100 border border-line rounded-xs overflow-hidden shrink-0 shadow-xs flex items-center justify-center">
                  {rd?.portraitCoverUrl || report.cardImageUrl ? (
                    <img
                      src={rd?.portraitCoverUrl || report.cardImageUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-3 text-xs text-ink-400 font-serif">
                      PSF Monograph
                    </div>
                  )}
                </div>

                <div className="space-y-3 flex-1 min-w-0 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-green-700">
                      Executive Standfirst
                    </span>
                    <p className="font-serif text-sm font-medium text-ink-900 leading-relaxed mt-1">
                      {report.standfirst}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-line flex items-center gap-4 text-ink-600">
                    <span>
                      Length: <strong>{rd?.pages || 1} pages</strong>
                    </span>
                    <span>•</span>
                    <span>
                      PDF:{" "}
                      {rd?.pdfUrl ? (
                        <a
                          href={rd.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-green-700 hover:underline font-semibold"
                        >
                          Verified Document Attachment
                        </a>
                      ) : (
                        <span className="text-red-600">Missing PDF Attachment</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="bg-white border border-line rounded-sm p-6 shadow-2xs space-y-3">
              <div className="border-b border-line pb-2 flex items-center justify-between">
                <h3 className="font-serif font-bold text-sm text-ink-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-green-700" />
                  <span>Executive Summary</span>
                </h3>
                <span className="text-[10px] text-ink-500 font-mono">
                  FRD §7.6 Required
                </span>
              </div>
              <p className="text-xs text-ink-800 leading-relaxed whitespace-pre-wrap">
                {rd?.executiveSummary || "No executive summary provided."}
              </p>
            </div>

            {/* Key Findings List */}
            <div className="bg-white border border-line rounded-sm p-6 shadow-2xs space-y-3">
              <div className="border-b border-line pb-2 flex items-center justify-between">
                <h3 className="font-serif font-bold text-sm text-ink-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-700" />
                  <span>Key Policy & Strategic Findings ({keyFindings.length})</span>
                </h3>
                <span className="text-[10px] text-ink-500 font-mono">
                  Minimum 3 Findings
                </span>
              </div>

              {keyFindings.length === 0 ? (
                <div className="p-4 bg-warning-50 border border-warning-200 text-warning-800 rounded-sm text-xs">
                  No structured key findings supplied. Special reports must feature at least 3 bullet points.
                </div>
              ) : (
                <div className="space-y-2 text-xs">
                  {keyFindings.map((finding, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-ivory-50 border border-line rounded-xs flex items-start gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-ink-800 flex-1 leading-relaxed">
                        {finding}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Compliance, Metadata & 3-Way Decision Bar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Compliance Verification Panel */}
            <div className="bg-white border border-line rounded-sm p-5 shadow-2xs space-y-3 text-xs">
              <h4 className="font-serif font-bold text-xs text-ink-900 border-b border-line pb-2">
                Automated Standards Check
              </h4>

              <div className="space-y-2">
                <div className="flex items-center justify-between py-1 border-b border-line/60">
                  <span className="text-ink-600">Executive Summary</span>
                  {rd?.executiveSummary ? (
                    <span className="text-green-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Valid
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Missing
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between py-1 border-b border-line/60">
                  <span className="text-ink-600">Key Findings Count</span>
                  {keyFindings.length >= 3 ? (
                    <span className="text-green-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {keyFindings.length} (Pass)
                    </span>
                  ) : (
                    <span className="text-warning-700 font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> {keyFindings.length} (&lt;3)
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between py-1 border-b border-line/60">
                  <span className="text-ink-600">PDF Monograph Attached</span>
                  {rd?.pdfUrl ? (
                    <span className="text-green-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Attached
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Missing
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-ink-600">Portrait Cover Asset</span>
                  {rd?.portraitCoverUrl ? (
                    <span className="text-green-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Present
                    </span>
                  ) : (
                    <span className="text-warning-700 font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Optional
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Metadata Card */}
            <div className="bg-white border border-line rounded-sm p-5 shadow-2xs space-y-2 text-xs">
              <h4 className="font-serif font-bold text-xs text-ink-900 border-b border-line pb-2">
                Report Metadata
              </h4>

              <div className="flex justify-between py-1 border-b border-line/60">
                <span className="text-ink-500">Report Number:</span>
                <span className="font-mono font-bold text-ink-900">
                  {rd?.reportNumber || report.refId}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-line/60">
                <span className="text-ink-500">Author / Group:</span>
                <span className="font-semibold text-ink-900">
                  {report.authors?.[0]?.user?.profile?.displayName || "PSF Strategic Group"}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-line/60">
                <span className="text-ink-500">Thematic Topic:</span>
                <span className="text-ink-900">
                  {report.topic?.name || "Defence"}
                </span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-ink-500">Submitted:</span>
                <span>
                  {new Date(report.submittedAt || report.createdAt).toLocaleDateString("en-GB")}
                </span>
              </div>
            </div>

            {/* 3-Way Editorial Decision Bar */}
            <div className="bg-white border border-line rounded-sm p-5 shadow-2xs space-y-4 text-xs">
              <h4 className="font-serif font-bold text-xs text-ink-900 border-b border-line pb-2">
                Editorial Decision Bar
              </h4>

              <div>
                <label className="block font-semibold text-ink-700 mb-1">
                  Editorial Remarks / Feedback to Author
                </label>
                <textarea
                  rows={3}
                  placeholder="Required if requesting modifications or rejecting..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-line rounded-sm focus:border-green-700 focus:outline-hidden resize-none"
                />
              </div>

              <div className="space-y-2 pt-1">
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => handleDecision("APPROVE")}
                  disabled={decisionInProgress}
                  className="w-full flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approve & Publish Monograph</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDecision("REQUEST_CHANGES")}
                  disabled={decisionInProgress}
                  className="w-full flex items-center justify-center gap-1.5 text-blue-700 border-blue-200 hover:bg-blue-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Revisions</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDecision("REJECT")}
                  disabled={decisionInProgress}
                  className="w-full flex items-center justify-center gap-1.5 text-red-700 border-red-200 hover:bg-red-50"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject Monograph</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

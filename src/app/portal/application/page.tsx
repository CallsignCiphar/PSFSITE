"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, AlertTriangle, ArrowRight, FileCheck, CheckCircle2 } from "lucide-react";
import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";

export default function ApplicationStatusPage() {
  // Demonstration state for applicant status
  const [status, setStatus] = useState<"PENDING" | "RETURNED" | "APPROVED">("PENDING");
  const [comments] = useState(
    "Please provide more detail regarding your prior strategic publications or commentary in the defense sector, and specify your primary research methodologies."
  );

  return (
    <AuthShell
      title="Application Status"
      subtitle="Review the real-time status of your contributor application."
    >
      {/* State 1: PENDING */}
      {status === "PENDING" && (
        <div className="space-y-6">
          <div className="p-4 bg-warning-50 border border-warning-700/20 rounded-card flex items-start gap-3">
            <Clock className="w-5 h-5 text-warning-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif font-bold text-base text-warning-700">
                Application Under Editorial Review
              </h4>
              <p className="font-serif text-xs text-ink-700 mt-1 leading-relaxed">
                Your credentials and sample submissions are currently being evaluated by the PSF Editorial Board.
              </p>
            </div>
          </div>

          <div className="border border-line rounded-card p-5 bg-ivory-50/50 space-y-3 text-xs font-sans">
            <div className="flex justify-between py-1.5 border-b border-line">
              <span className="text-ink-500">Track Applied</span>
              <span className="font-semibold text-ink-900">Articles & Strategic Commentary</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-line">
              <span className="text-ink-500">Submitted At</span>
              <span className="font-medium text-ink-900">16 Oct 2026, 14:30 PKT</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-line">
              <span className="text-ink-500">Expected Decision</span>
              <span className="font-medium text-green-700">3 to 5 working days</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-ink-500">Application Reference</span>
              <span className="font-mono text-ink-900 font-semibold">APP-2026-00412</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => alert("Withdraw application dialog would open.")}
              className="text-xs font-sans text-danger-700 hover:underline"
            >
              Withdraw application
            </button>

            <Link href="/">
              <Button variant="secondary" size="sm">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* State 2: RETURNED WITH COMMENTS */}
      {status === "RETURNED" && (
        <div className="space-y-6">
          <div className="p-4 bg-warning-50 border border-warning-700/30 rounded-card flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif font-bold text-base text-warning-700">
                Application Needs Revision
              </h4>
              <p className="font-serif text-xs text-ink-700 mt-1 leading-relaxed">
                The editorial board has reviewed your submission and requested the following clarifications before granting active writing access:
              </p>
            </div>
          </div>

          {/* Quoted Editor Comment */}
          <div className="p-4 bg-ivory-100 border-l-4 border-warning-700 rounded-sm font-serif text-sm italic text-ink-900">
            &ldquo;{comments}&rdquo;
          </div>

          <div className="space-y-3">
            <Button
              type="button"
              variant="primary"
              size="default"
              className="w-full gap-2"
              onClick={() => alert("Prefilled edit form opens for re-submission.")}
            >
              <span>Edit Details & Resubmit</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* State 3: APPROVED */}
      {status === "APPROVED" && (
        <div className="space-y-6 text-center">
          <div className="w-14 h-14 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 stroke-[1.75]" />
          </div>

          <div>
            <h3 className="font-serif font-bold text-xl text-ink-900">
              Welcome to Pakistan Strategic Forum!
            </h3>
            <p className="font-serif text-sm text-ink-700 mt-1">
              Your application has been approved. Your contributor portal is now fully activated.
            </p>
          </div>

          <Link href="/portal" className="block">
            <Button variant="primary" size="default" className="w-full gap-2">
              <span>Go to Contributor Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      )}
    </AuthShell>
  );
}

import React from "react";
import Link from "next/link";
import { PenTool, GraduationCap, ArrowRight } from "lucide-react";
import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Write for PSF | Pakistan Strategic Forum",
  description: "Apply to become a contributor or submit peer-reviewed research for Pakistan Strategic Forum.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function JoinChooserPage() {
  return (
    <AuthShell
      title="Write for Pakistan Strategic Forum"
      subtitle="Select the publishing track that matches your background and research objectives."
      maxWidth="wide"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
        {/* Track 1: Article Writer */}
        <div className="flex flex-col justify-between p-6 border border-line rounded-card bg-ivory-50/50 hover:border-green-700 transition-colors group">
          <div>
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center mb-4">
              <PenTool className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-xl text-ink-900 group-hover:text-green-700 transition-colors mb-2">
              Articles & Strategic Commentary
            </h3>
            <p className="font-serif text-sm text-ink-700 leading-relaxed mb-4">
              For security analysts, defense journalists, practitioners, and commentators. Write timely analyses, explainers, and strategic assessments evaluated by PSF editors.
            </p>
            <div className="text-xs font-sans text-ink-500 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span>Editorial decision within 3–5 working days</span>
            </div>
          </div>

          <Link href="/join/article" className="w-full">
            <Button variant="primary" size="default" className="w-full gap-2">
              <span>Apply as a Writer</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Track 2: Research Scholar */}
        <div className="flex flex-col justify-between p-6 border border-line rounded-card bg-ivory-50/50 hover:border-green-700 transition-colors group">
          <div>
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center mb-4">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-xl text-ink-900 group-hover:text-green-700 transition-colors mb-2">
              PSF Research & Peer Review
            </h3>
            <p className="font-serif text-sm text-ink-700 leading-relaxed mb-4">
              For academics, professors, research associates, and postgraduate scholars. Submit manuscripts for double-blind peer review. Retain copyright under open-access CC BY 4.0 with DOI indexing.
            </p>
            <div className="text-xs font-sans text-ink-500 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span>Two-approver double-blind review</span>
            </div>
          </div>

          <Link href="/join/research" className="w-full">
            <Button variant="secondary" size="default" className="w-full gap-2">
              <span>Apply as a Researcher</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Advisory Notice */}
      <div className="mt-8 pt-6 border-t border-line text-center text-xs font-sans text-ink-500 space-y-3">
        <p>
          Note: Approvers (certified peer reviewers) and PSF Experts are appointed by invitation only.
        </p>
        <p>
          Already have an approved contributor account?{" "}
          <Link href="/sign-in" className="text-green-700 font-medium hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}

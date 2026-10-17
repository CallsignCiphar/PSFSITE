import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  ShieldCheck,
  EyeOff,
  Scale,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "How Double-Blind Peer Review Works | PSF Research",
  description: "Detailed protocols governing the independent double-blind peer review process at Pakistan Strategic Forum Research Journal.",
};

const STEPS = [
  {
    step: "01",
    title: "Editorial Desk Screening",
    description: "The Managing Editor screens the initial manuscript for scope compliance, plagiarism verification (turnaround within 48h), formatting integrity, and baseline analytical rigour.",
  },
  {
    step: "02",
    title: "Double-Blind Anonymisation",
    description: "All author identities, institutional headers, self-identifying citations, and document metadata are stripped via automated pipeline. Anonymised manuscripts receive a unique Tracking ID.",
  },
  {
    step: "03",
    title: "Referee Assignment",
    description: "Two certified subject-matter approvers from academic or strategic institutions are assigned. Referees evaluate methodology, empirical grounding, and strategic validity over a strict 21-day review window.",
  },
  {
    step: "04",
    title: "Evaluation & Revisions",
    description: "Referees submit structured scoring across 5 criteria. Authors receive anonymised referee remarks and may submit revised drafts within 14 days if revisions are requested.",
  },
  {
    step: "05",
    title: "Final Editorial Decision & DOI Assignment",
    description: "Upon final referee sign-off, the Editorial Board confirms publication, assigns a persistent Crossref DOI, Volume & Issue designations, and indexes the paper in Google Scholar.",
  },
];

export default function HowPeerReviewWorksPage() {
  return (
    <div className="w-full bg-paper py-12 font-sans">
      <div className="max-w-container mx-auto px-6 space-y-10">
        <div className="max-w-3xl pb-6 border-b border-line">
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-green-700 block mb-1">
            Academic Integrity Protocols
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-ink-900 mb-3">
            How Double-Blind Peer Review Works
          </h1>
          <p className="font-serif text-base text-ink-600 leading-relaxed">
            PSF Research enforces strict double-blind standards to guarantee objective evaluation,
            prevent bias, and uphold scholarly independence in strategic and military studies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-white border border-line rounded-sm space-y-2">
            <EyeOff className="w-6 h-6 text-green-700" />
            <h3 className="font-serif font-bold text-base text-ink-900">Total Anonymity</h3>
            <p className="text-xs text-ink-600 leading-relaxed">
              Neither authors nor referees know each other&apos;s identities at any point in the editorial evaluation lifecycle.
            </p>
          </div>

          <div className="p-5 bg-white border border-line rounded-sm space-y-2">
            <Scale className="w-6 h-6 text-green-700" />
            <h3 className="font-serif font-bold text-base text-ink-900">Two Certified Referees</h3>
            <p className="text-xs text-ink-600 leading-relaxed">
              Every paper is independently scrutinized by at least two credentialed fellows holding doctoral or senior military command qualifications.
            </p>
          </div>

          <div className="p-5 bg-white border border-line rounded-sm space-y-2">
            <ShieldCheck className="w-6 h-6 text-green-700" />
            <h3 className="font-serif font-bold text-base text-ink-900">Zero Commercial Influence</h3>
            <p className="text-xs text-ink-600 leading-relaxed">
              No sponsor, government entity, or private advertiser has authority to influence, delay, or modify peer-review outcomes.
            </p>
          </div>
        </div>

        {/* 5-Step Pipeline */}
        <div className="space-y-4">
          <h2 className="font-serif font-bold text-2xl text-ink-900">
            The 5-Step Evaluation Lifecycle
          </h2>

          <div className="space-y-4">
            {STEPS.map((s) => (
              <div
                key={s.step}
                className="p-6 bg-white border border-line rounded-sm flex flex-col md:flex-row md:items-center gap-6 shadow-xs"
              >
                <div className="w-12 h-12 rounded-sm bg-green-50 border border-green-200 flex items-center justify-center font-mono font-bold text-lg text-green-800 shrink-0">
                  {s.step}
                </div>
                <div className="space-y-1 flex-1">
                  <h3 className="font-serif font-bold text-lg text-ink-900">{s.title}</h3>
                  <p className="text-xs text-ink-600 leading-relaxed max-w-3xl">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-line flex items-center justify-between">
          <Link href="/editorial-policy" className="text-xs text-ink-600 hover:text-green-700">
            ← Read Full Editorial Policy
          </Link>
          <Link href="/join/research">
            <Button variant="primary">
              <span>Submit Manuscript for Review</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

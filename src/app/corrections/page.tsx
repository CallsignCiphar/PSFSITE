import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ExternalLink,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Public Corrections Log | Pakistan Strategic Forum",
  description: "Official record of verified factual corrections and editorial amendments published by Pakistan Strategic Forum.",
};

const CORRECTIONS = [
  {
    id: "CORR-2026-014",
    dateCorrected: "16 October 2026",
    articleTitle: "Modernising the Shield: Evaluating Pakistan's Integrated Air Defence Architecture",
    articleUrl: "/articles/pakistan-integrated-air-defence-modernisation-multi-tier-shield",
    type: "Factual Clarification",
    correctionText: "An earlier version of this analysis stated that the HQ-9/P surface-to-air missile battery uses passive optical tracking exclusively for terminal guidance. The analysis has been amended to accurately clarify that track-via-missile (TVM) semi-active radar homing functions in tandem with radio command uplink.",
  },
  {
    id: "CORR-2026-013",
    dateCorrected: "02 October 2026",
    articleTitle: "Second-Strike Endurance: Sea-Based Deterrence and Pakistan's Evolving Nuclear Triad",
    articleUrl: "/articles/second-strike-endurance-naval-triad",
    type: "Typographical & Nomenclature",
    correctionText: "An earlier draft referenced the displacement tonnage of the Hangor-class submarine as 3,800 tons submerged. The figure has been corrected to approximately 2,800 tons submerged in line with official naval technical releases.",
  },
  {
    id: "CORR-2026-012",
    dateCorrected: "18 September 2026",
    articleTitle: "SCO Defence Ministers Conclude Strategic Exercises in Central Asia",
    articleUrl: "/newsroom",
    type: "Attribution",
    correctionText: "An initial wire dispatch misattributed remarks on regional counter-terrorism cooperation to the Deputy Defence Minister. The statement was delivered by the Secretary General of the SCO Secretariat.",
  },
];

export default function CorrectionsLogPage() {
  return (
    <div className="w-full bg-paper py-12 font-sans">
      <div className="max-w-container mx-auto px-6 space-y-10">
        {/* Header */}
        <div className="max-w-3xl pb-6 border-b border-line">
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-green-700 block mb-1">
            Editorial Transparency & Accountability
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-ink-900 mb-3">
            Public Corrections Log (Section 7.18)
          </h1>
          <p className="font-serif text-base text-ink-600 leading-relaxed">
            Pakistan Strategic Forum upholds uncompromising standards of factual accuracy. When a significant
            error is confirmed, it is corrected promptly on the article itself and permanently recorded in this public log.
          </p>
        </div>

        {/* Submit Correction Callout */}
        <div className="p-5 bg-white border border-line rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-ink-900 block text-sm">
              Spot a Factual Inaccuracy?
            </span>
            <p className="text-ink-600 max-w-2xl">
              Readers and institutional reviewers may flag factual discrepancies directly to the Senior Editorial Board.
              Please include citations and document references.
            </p>
          </div>
          <Link href="/contact" className="shrink-0">
            <Button variant="outline">
              <span>Submit a Correction Request</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>

        {/* Corrections Listing */}
        <div className="space-y-6">
          <h2 className="font-serif font-bold text-xl text-ink-900">
            Published Editorial Corrections
          </h2>

          <div className="space-y-4">
            {CORRECTIONS.map((c) => (
              <div
                key={c.id}
                className="bg-white border border-line rounded-sm p-6 space-y-3 shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-2.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-ink-900">
                      {c.id}
                    </span>
                    <span className="px-1.5 py-0.2 bg-ivory-100 text-ink-700 rounded-sm font-semibold text-[10px]">
                      {c.type}
                    </span>
                  </div>
                  <span className="text-ink-500 font-mono text-[11px]">
                    Amended on {c.dateCorrected} PKT
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-ink-400 tracking-wider block mb-0.5">
                    Target Article:
                  </span>
                  <Link
                    href={c.articleUrl}
                    className="font-serif font-bold text-base text-ink-900 hover:text-green-700 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{c.articleTitle}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-ink-400" />
                  </Link>
                </div>

                <div className="p-3.5 bg-ivory-50 border border-line rounded-sm text-xs text-ink-800 leading-relaxed font-serif">
                  <strong className="font-sans text-[11px] uppercase tracking-wider text-green-800 block mb-1">
                    Editorial Amendment:
                  </strong>
                  "{c.correctionText}"
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

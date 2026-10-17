"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, Quote, FileText, ChevronRight, Clock, MapPin, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CitationModal } from "@/components/content/citation-modal";

export default function ReportDetailPage() {
  const [citationOpen, setCitationOpen] = useState(false);

  const reportData = {
    title: "The South Asian Military Balance: Conventional Disparity and Asymmetric Countermeasures (2026-2030)",
    reportNumber: "PSF-R-2026-004",
    category: "Strategic Assessments",
    pages: 64,
    publishedAt: "15 October 2026",
    pdfSize: "14.2 MB",
    pdfUrl: "#",
    authors: ["PSF Strategic Studies Group", "Dr. Tariq Mahmud"],
    year: "2026",
  };

  return (
    <div className="w-full bg-paper py-8 font-sans">
      <div className="max-w-container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Column (Cols 1-8) */}
          <article className="lg:col-span-8 flex flex-col">
            {/* Breadcrumb */}
            <nav className="text-xs font-sans text-ink-500 mb-4 flex items-center gap-1.5">
              <Link href="/" className="hover:text-green-700">Home</Link>
              <span>/</span>
              <Link href="/reports" className="hover:text-green-700">Reports</Link>
              <span>/</span>
              <span className="text-ink-700 font-medium">PSF-R-2026-004</span>
            </nav>

            {/* Header Meta Strip */}
            <div className="flex flex-wrap items-center gap-3 mb-3 text-xs font-sans">
              <span className="px-2 py-0.5 rounded-chip bg-green-700 text-white font-bold uppercase tracking-wider">
                PSF Special Report
              </span>
              <span className="font-mono font-bold text-ink-700">{reportData.reportNumber}</span>
              <span className="text-line">·</span>
              <span className="text-ink-500">{reportData.category}</span>
              <span className="text-line">·</span>
              <span className="text-ink-500">{reportData.pages} Pages ({reportData.pdfSize})</span>
            </div>

            <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl leading-[1.12] text-ink-900 tracking-tight mb-4">
              {reportData.title}
            </h1>

            <div className="flex items-center gap-4 text-xs font-sans text-ink-500 pb-6 border-b border-line mb-6">
              <span>Published {reportData.publishedAt}</span>
              <span>·</span>
              <span>Prepared by {reportData.authors[0]}</span>
            </div>

            {/* Download & Cite Action Row */}
            <div className="flex flex-wrap items-center gap-4 p-4 bg-ivory-50 border border-line rounded-card mb-8">
              <a href={reportData.pdfUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="default" className="gap-2">
                  <Download className="w-4 h-4" />
                  <span>Download Full Report (PDF, 14.2 MB)</span>
                </Button>
              </a>

              <Button
                variant="secondary"
                size="default"
                onClick={() => setCitationOpen(true)}
                className="gap-2"
              >
                <Quote className="w-4 h-4 text-green-700" />
                <span>Cite this Report</span>
              </Button>
            </div>

            {/* Executive Summary Box */}
            <div className="p-6 bg-ivory-100 border-l-4 border-green-700 rounded-r-card mb-8">
              <h3 className="font-serif font-bold text-base uppercase tracking-wider text-green-900 mb-2">
                Executive Summary
              </h3>
              <p className="font-serif text-base text-ink-900 leading-relaxed">
                This comprehensive annual assessment investigates conventional force modernization across land, air, and naval branches in South Asia. Analyzing open-source defense procurement databases, satellite imagery of hardened aircraft shelters, and multi-layered surface-to-air missile deployments, the report highlights emerging asymmetric force multipliers that preserve full-spectrum deterrence stability despite conventional budgetary asymmetries.
              </p>
            </div>

            {/* Key Findings Numbered Box (3-7 items) */}
            <div className="p-6 bg-white border border-line rounded-card shadow-level1 mb-10 space-y-4">
              <h3 className="font-serif font-bold text-base text-ink-900">
                Key Strategic Findings
              </h3>
              <ol className="space-y-3 text-sm font-serif text-ink-900 leading-relaxed list-none">
                <li className="flex items-start gap-3">
                  <span className="font-mono font-bold text-green-700 text-base">01.</span>
                  <div>
                    <strong>Precision Strike Latency:</strong> Indigenous cruise missile developments with terrain-contour matching and terminal optical guidance significantly neutralize fixed enemy radar sites within 400 km.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-mono font-bold text-green-700 text-base">02.</span>
                  <div>
                    <strong>Sub-Surface AIP Endurance:</strong> The operationalization of Hangor-class AIP submarines triples submerged loiter times, creating sustained sea denial across northern Arabian Sea chokepoints.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-mono font-bold text-green-700 text-base">03.</span>
                  <div>
                    <strong>Unmanned Reconnaissance & EW:</strong> Loitering munitions and medium-altitude long-endurance (MALE) UAV integration compress kill-chains from minutes to seconds in counter-battery operations.
                  </div>
                </li>
              </ol>
            </div>

            {/* Report Body */}
            <div className="font-serif text-[19px] leading-[1.65] text-ink-900 space-y-6 max-w-[720px]">
              <h2 id="conventional-balance" className="font-serif font-bold text-2xl md:text-3xl text-ink-900 pt-4 border-t border-line">
                1. Conventional Asymmetries and Force Postures
              </h2>
              <p>
                Defense expenditures in the South Asian subcontinent have continued an aggressive upward trajectory. While conventional hardware ratios favor eastern adversaries in sheer raw numbers, doctrine shifts emphasizing distributed lethality, tactical maneuverability, and layered air denial continue to balance total combat power.
              </p>

              {/* Numbered Figure with Source Line */}
              <figure className="my-8 p-4 bg-ivory-50 border border-line rounded-card text-center">
                <div className="h-48 w-full bg-ivory-100 border border-line rounded-sm flex items-center justify-center font-sans text-xs text-ink-400">
                  [Figure 1: Comparative Orders of Battle and Air Defence Intercept Ranges]
                </div>
                <figcaption className="mt-2 text-xs font-serif text-ink-700 text-left">
                  <strong>Figure 1.</strong> Surface-to-Air Missile intercept envelopes along frontline sectors.
                </figcaption>
                <div className="text-[11px] font-sans text-ink-400 text-left mt-0.5">
                  Source: PSF Defence Analytics & SIPRI 2026 Datasets.
                </div>
              </figure>

              <h2 id="naval-endurance" className="font-serif font-bold text-2xl md:text-3xl text-ink-900 pt-4 border-t border-line">
                2. Maritime Security and the Arabian Sea Littoral
              </h2>
              <p>
                The modernization of the naval fleet through the induction of Type 054A/P multi-role frigates and stealth fast-attack craft equipped with supersonic anti-ship missiles represents a pivotal shift toward blue-water deterrent escort capabilities.
              </p>
            </div>
          </article>

          {/* Sticky Table of Contents (Cols 9-12) */}
          <aside className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="bg-white border border-line rounded-card p-6 shadow-level1">
              <h4 className="font-serif font-bold text-sm text-ink-900 pb-2 border-b border-line mb-3">
                Table of Contents
              </h4>
              <nav className="space-y-2 text-xs font-sans">
                <a href="#conventional-balance" className="block text-green-700 font-semibold hover:underline">
                  1. Conventional Asymmetries & Force Postures
                </a>
                <a href="#naval-endurance" className="block text-ink-700 hover:text-green-700">
                  2. Maritime Security & Arabian Sea Littoral
                </a>
                <a href="#air-defence-synthesis" className="block text-ink-700 hover:text-green-700">
                  3. Air Defence Synthesis & Sensor Networks
                </a>
                <a href="#policy-recommendations" className="block text-ink-700 hover:text-green-700">
                  4. Strategic Doctrine & Recommendations
                </a>
              </nav>
            </div>

            <div className="p-4 bg-ivory-50 border border-line rounded-card text-xs font-sans text-ink-500">
              <span className="font-semibold text-ink-900 block mb-1">Citation Information</span>
              <p>
                To reference this document in academic, military or policy publications, use the standard PSF-R citation apparatus.
              </p>
              <button
                type="button"
                onClick={() => setCitationOpen(true)}
                className="mt-2 text-green-700 font-semibold hover:underline flex items-center gap-1"
              >
                Open Citation Formats →
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* Citation Modal */}
      <CitationModal
        isOpen={citationOpen}
        onClose={() => setCitationOpen(false)}
        title={reportData.title}
        authors={reportData.authors}
        year={reportData.year}
        reportNumber={reportData.reportNumber}
        url="https://forumstrategic.com/reports/south-asia-strategic-balance-2026"
        isReport
      />
    </div>
  );
}

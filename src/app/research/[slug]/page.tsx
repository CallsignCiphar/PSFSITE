"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Download,
  Quote,
  ShieldCheck,
  FileText,
  ExternalLink,
  CheckCircle,
  FileCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentLabel } from "@/components/ui/content-label";
import { TagChip } from "@/components/ui/tag-chip";
import { CitationModal } from "@/components/content/citation-modal";

export default function ResearchPaperDetailPage() {
  const [citationOpen, setCitationOpen] = useState(false);

  const paper = {
    title: "Algorithmic Escalation Risks: AI-Assisted Target Recognition in High-Intensity Air Operations",
    paperType: "Research Article",
    category: "Strategic Systems & C4ISR",
    authors: [
      {
        name: "Dr. Ayesha Siddiqui",
        institution: "National Defence University, Islamabad",
        orcid: "0000-0002-1825-0097",
      },
      {
        name: "Prof. Khalid Mehmood",
        institution: "Air University, Department of Aerospace Sciences",
        orcid: "0000-0001-9234-8812",
      },
    ],
    receivedDate: "14 July 2026",
    acceptedDate: "28 September 2026",
    publishedDate: "12 October 2026",
    doi: "10.5842/psf.2026.04.01",
    volume: "Vol. 8",
    issue: "Iss. 4",
    issn: "2789-4123",
    abstract:
      "This study examines sensor-to-shooter latencies and automated threat prioritization algorithms within tactical air operations command nodes, evaluating false-positive thresholds under intense electronic jamming conditions. Using probabilistic kinetic simulation models, we demonstrate that unconstrained algorithmic targeting introduces acute escalation instability during cross-border skirmishes.",
    keywords: [
      "Artificial Intelligence",
      "Air Operations",
      "C4ISR",
      "Deterrence Stability",
      "Target Recognition",
      "Electronic Warfare",
    ],
  };

  return (
    <div className="w-full bg-paper py-8 font-sans">
      <div className="max-w-container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Academic Column (Cols 1-8 / 720px max text measure) */}
          <article className="lg:col-span-8 flex flex-col">
            {/* Breadcrumb */}
            <nav className="text-xs font-sans text-ink-500 mb-4 flex items-center gap-1.5">
              <Link href="/" className="hover:text-green-700">Home</Link>
              <span>/</span>
              <Link href="/research" className="hover:text-green-700">Research</Link>
              <span>/</span>
              <span className="text-ink-700 font-medium">Papers</span>
            </nav>

            {/* Header: Peer Reviewed Badge & Metadata */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <ContentLabel type="PEER_REVIEWED" />
                <span className="text-line text-xs">·</span>
                <span className="text-xs font-sans font-semibold text-ink-700">{paper.paperType}</span>
                <span className="text-line text-xs">·</span>
                <span className="text-xs font-sans text-ink-500">{paper.category}</span>
              </div>

              <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl leading-[1.12] text-ink-900 tracking-tight mb-4">
                {paper.title}
              </h1>

              {/* Authors Row with ORCID Links */}
              <div className="space-y-1.5 py-4 border-y border-line text-xs font-sans">
                {paper.authors.map((author, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="font-semibold text-ink-900">{author.name}</span>
                    <span className="text-ink-500">({author.institution})</span>
                    <a
                      href={`https://orcid.org/${author.orcid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-0.5 text-green-700 hover:underline font-mono"
                      title="ORCID Profile"
                    >
                      <span>[ORCID]</span>
                    </a>
                  </div>
                ))}

                <div className="flex flex-wrap items-center gap-3 pt-2 text-ink-400 text-[11px]">
                  <span>Received: {paper.receivedDate}</span>
                  <span>·</span>
                  <span>Accepted: {paper.acceptedDate}</span>
                  <span>·</span>
                  <span className="text-ink-700 font-medium">Published: {paper.publishedDate}</span>
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-ivory-50 border border-line rounded-card mb-8">
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  <span>Download Manuscript (PDF)</span>
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCitationOpen(true)}
                  className="gap-2"
                >
                  <Quote className="w-4 h-4 text-green-700" />
                  <span>Cite this Paper</span>
                </Button>
              </div>

              <div className="text-xs font-mono text-ink-500">
                DOI: <a href={`https://doi.org/${paper.doi}`} className="text-green-700 hover:underline">{paper.doi}</a>
              </div>
            </div>

            {/* Abstract Box */}
            <div className="p-6 bg-ivory-100 border border-line rounded-card mb-8">
              <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-ink-900 mb-2">
                Abstract
              </h3>
              <p className="font-serif text-base text-ink-900 leading-relaxed italic">
                {paper.abstract}
              </p>

              {/* Keywords */}
              <div className="mt-4 pt-4 border-t border-line flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-sans font-semibold text-ink-700 mr-1">Keywords:</span>
                {paper.keywords.map((kw) => (
                  <TagChip key={kw} label={kw} />
                ))}
              </div>
            </div>

            {/* Main Academic Body */}
            <div className="font-serif text-[19px] leading-[1.65] text-ink-900 space-y-6 max-w-[720px]">
              <h2 id="section-1" className="font-serif font-bold text-2xl md:text-3xl text-ink-900 pt-4 border-t border-line">
                1. Introduction & Problem Formulation
              </h2>
              <p>
                In high-tempo aerial theaters, the sensor-to-shooter loop has increasingly shifted toward automated prioritization architectures. With air combat speeds compressing human reaction intervals below cognitive response thresholds, military commanders frequently rely on neural network classifiers to differentiate decoy signatures from hostile frontline interceptors.
              </p>

              <h2 id="section-2" className="font-serif font-bold text-2xl md:text-3xl text-ink-900 pt-4 border-t border-line">
                2. Algorithmic Uncertainty Under Electronic Jamming
              </h2>
              <p>
                Our testing models evaluated algorithmic confidence thresholds when radar cross-section (RCS) data is degraded by stand-off noise jamming. At signal-to-noise ratios below 12 dB, classifier ambiguity rises exponentially, producing false positive classifications that risk triggering unintended cross-border retaliatory strikes.
              </p>
            </div>

            {/* References Section */}
            <div className="mt-12 pt-6 border-t border-line">
              <h4 className="font-serif font-bold text-base text-ink-900 mb-3">References</h4>
              <ol className="list-decimal list-inside text-xs font-serif text-ink-700 space-y-2 leading-relaxed">
                <li>
                  Akhtar, N. (2025). &ldquo;Kinematic Decoy Models in South Asian Air Defence.&rdquo; <em>Journal of Strategic Studies</em>, 42(3), 112–134.
                </li>
                <li>
                  Siddiqui, A., &amp; Mehmood, K. (2024). &ldquo;Sensor Fusion Latency in C4ISR.&rdquo; <em>PSF Research</em>, 6(2), 45–67. https://doi.org/10.5842/psf.2024.02.04.
                </li>
                <li>
                  United Nations Institute for Disarmament Research (2023). <em>Algorithmic Automation in Military Command Systems</em>. Geneva: UNIDIR.
                </li>
              </ol>
            </div>

            {/* Mandatory Declarations Block */}
            <div className="mt-8 p-6 bg-ivory-50 border border-line rounded-card text-xs font-sans text-ink-700 space-y-3">
              <h4 className="font-serif font-bold text-sm text-ink-900">Statements & Declarations</h4>
              <p><strong>Funding:</strong> This research was supported by the Higher Education Commission of Pakistan under Grant No. HEC-DEF-2025-08.</p>
              <p><strong>Conflict of Interest:</strong> The authors declare no competing financial or institutional conflicts of interest.</p>
              <p><strong>Data Availability:</strong> Simulation code and dataset parameters are archived in the PSF Supplementary Repository.</p>
            </div>

            {/* Open Access & Peer Review Assurance */}
            <div className="mt-6 p-4 bg-green-50 border border-green-700/20 rounded-card flex items-start gap-3 text-xs font-sans text-ink-700">
              <CheckCircle className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-green-900 block mb-0.5">
                  Independent Double-Blind Peer Review
                </span>
                This manuscript underwent rigorous, independent double-blind evaluation by two certified defense scholars. Published open-access under Creative Commons Attribution 4.0 International (CC BY 4.0).
              </div>
            </div>
          </article>

          {/* Sticky Academic Apparatus Sidebar (Cols 9-12) */}
          <aside className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="bg-white border border-line rounded-card p-6 shadow-level1">
              <h4 className="font-serif font-bold text-sm text-ink-900 pb-2 border-b border-line mb-3">
                Article Outline
              </h4>
              <nav className="space-y-2 text-xs font-sans">
                <a href="#section-1" className="block text-green-700 font-semibold hover:underline">
                  1. Introduction & Formulation
                </a>
                <a href="#section-2" className="block text-ink-700 hover:text-green-700">
                  2. Jamming & Algorithmic Uncertainty
                </a>
                <a href="#section-3" className="block text-ink-700 hover:text-green-700">
                  3. Simulation Architecture
                </a>
                <a href="#section-4" className="block text-ink-700 hover:text-green-700">
                  4. Escalation Stability & Conclusions
                </a>
              </nav>
            </div>

            {/* Supplementary Materials */}
            <div className="bg-white border border-line rounded-card p-6 shadow-level1 space-y-3">
              <h4 className="font-serif font-bold text-sm text-ink-900 pb-2 border-b border-line">
                Supplementary Files
              </h4>
              <div className="space-y-2 text-xs font-sans">
                <a
                  href="#"
                  className="flex items-center justify-between p-2 rounded bg-ivory-50 border border-line hover:border-green-700"
                >
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-green-700" />
                    <span>Kinematic Simulation Code (.py)</span>
                  </div>
                  <span className="font-mono text-[10px] text-ink-400">120 KB</span>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-between p-2 rounded bg-ivory-50 border border-line hover:border-green-700"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-green-700" />
                    <span>Sensor Threshold Dataset (.csv)</span>
                  </div>
                  <span className="font-mono text-[10px] text-ink-400">1.4 MB</span>
                </a>
              </div>
            </div>

            {/* Journal Metadata */}
            <div className="p-4 bg-ivory-50 border border-line rounded-card text-xs font-sans text-ink-500 space-y-1.5">
              <div className="flex justify-between">
                <span>Journal</span>
                <span className="font-medium text-ink-900">PSF Research</span>
              </div>
              <div className="flex justify-between">
                <span>ISSN</span>
                <span className="font-mono text-ink-900">{paper.issn}</span>
              </div>
              <div className="flex justify-between">
                <span>Volume / Issue</span>
                <span className="text-ink-900">{paper.volume}, {paper.issue}</span>
              </div>
              <div className="flex justify-between">
                <span>Copyright</span>
                <span className="text-ink-900">Authors (CC BY 4.0)</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Citation Modal */}
      <CitationModal
        isOpen={citationOpen}
        onClose={() => setCitationOpen(false)}
        title={paper.title}
        authors={paper.authors.map((a) => a.name)}
        year="2026"
        doi={paper.doi}
        url={`https://forumstrategic.com/research/${paper.doi}`}
        isReport={false}
      />
    </div>
  );
}

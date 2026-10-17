"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileSpreadsheet,
  Download,
  Filter,
  Search,
  ChevronRight,
  BookOpen,
  Calendar,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const REPORTS_LIST = [
  {
    id: "rep-004",
    slug: "south-asian-military-balance-conventional-disparity-2026-2030",
    reportNumber: "PSF-R-2026-004",
    title: "The South Asian Military Balance: Conventional Disparity and Asymmetric Countermeasures (2026–2030)",
    standfirst: "An authoritative analysis of force modernisation vectors, sensor fusion disparity, and strategic stability along the Line of Control.",
    category: "Strategic Assessments",
    pages: 64,
    publishedAt: "15 October 2026",
    pdfSize: "14.2 MB",
    leadAuthor: "PSF Strategic Studies Group & Dr. Tariq Mahmud",
  },
  {
    id: "rep-003",
    slug: "maritime-doctrine-indian-ocean-subsurface-deterrence",
    reportNumber: "PSF-R-2026-003",
    title: "Maritime Doctrine and Subsurface Deterrence: Assessing Hangor-Class AIP Submarine Inductions",
    standfirst: "Operational assessment of Pakistan Navy's AIP submarine fleet architecture, sea denial strategies, and maritime nuclear second-strike survivability.",
    category: "Maritime Security",
    pages: 52,
    publishedAt: "28 September 2026",
    pdfSize: "11.8 MB",
    leadAuthor: "Commodore (Retd) Bilal Zafar",
  },
  {
    id: "rep-002",
    slug: "air-defence-modernisation-multi-tier-shield-assessment",
    reportNumber: "PSF-R-2026-002",
    title: "Integrated Airspace Denial: Pakistan's Evolving Multi-Tier Surface-to-Air Missile Shield",
    standfirst: "Evaluating long-range HQ-9/P, medium-range HQ-16FE, and short-range automated point defense systems against saturated standoff cruise missile threats.",
    category: "Force Modernisation",
    pages: 48,
    publishedAt: "12 September 2026",
    pdfSize: "9.5 MB",
    leadAuthor: "Air Commodore (Retd) Kaiser Tufail",
  },
  {
    id: "rep-001",
    slug: "cpec-phase-2-security-architecture-corridor-integrity",
    reportNumber: "PSF-R-2026-001",
    title: "Corridor Security Architecture: Threat Mitigation Protocols for CPEC Western Route and Gwadar",
    standfirst: "Comprehensive review of Special Security Division deployments, hybrid warfare vulnerabilities, and trans-border proxy containment.",
    category: "Strategic Assessments",
    pages: 40,
    publishedAt: "18 August 2026",
    pdfSize: "8.1 MB",
    leadAuthor: "Ambassador (Retd) Jalil Jilani",
  },
];

export default function ReportsHubPage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = REPORTS_LIST.filter((r) => {
    const matchesCategory =
      selectedCategory === "ALL" || r.category === selectedCategory;
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reportNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.leadAuthor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-paper py-12 font-sans">
      <div className="max-w-container mx-auto px-6 space-y-10">
        {/* Header */}
        <div className="max-w-3xl pb-6 border-b border-line">
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-green-700 block mb-1">
            Policy Monographs & Strategic Inquiries
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-ink-900 mb-3">
            Special Reports & Monographs
          </h1>
          <p className="font-serif text-base text-ink-600 leading-relaxed">
            Exhaustive, data-grounded monographs authored by PSF research fellows and working groups.
            Each report includes technical appendices, complete citation packages, and verified PDF editions.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white border border-line rounded-sm p-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="w-4 h-4 text-ink-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search reports by title, number (PSF-R-YYYY-NNN), or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-line rounded-sm bg-white text-xs text-ink-900 focus:outline-none focus:border-green-700"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 border border-line rounded-sm bg-white text-xs text-ink-700 focus:outline-none focus:border-green-700"
            >
              <option value="ALL">All Report Categories</option>
              <option value="Strategic Assessments">Strategic Assessments</option>
              <option value="Force Modernisation">Force Modernisation</option>
              <option value="Maritime Security">Maritime Security</option>
            </select>
          </div>
        </div>

        {/* Reports Listing Cards */}
        <div className="space-y-6">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white border border-line rounded-sm p-6 sm:p-8 hover:border-green-700 transition-colors shadow-xs"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5 text-xs">
                    <span className="px-2 py-0.5 bg-green-50 text-green-800 border border-green-200 rounded-sm font-bold text-[10px] uppercase tracking-wider">
                      Special Monograph
                    </span>
                    <span className="font-mono font-bold text-ink-900">
                      {report.reportNumber}
                    </span>
                    <span className="text-line">•</span>
                    <span className="text-ink-500">{report.category}</span>
                    <span className="text-line">•</span>
                    <span className="text-ink-500">{report.pages} Pages ({report.pdfSize})</span>
                  </div>

                  <Link href={`/reports/${report.slug}`}>
                    <h2 className="font-serif font-bold text-2xl sm:text-3xl text-ink-900 hover:text-green-700 transition-colors leading-tight">
                      {report.title}
                    </h2>
                  </Link>

                  <p className="font-serif text-base text-ink-700 leading-relaxed max-w-3xl">
                    {report.standfirst}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-ink-500 pt-2">
                    <span>Published: <strong>{report.publishedAt}</strong></span>
                    <span>•</span>
                    <span>Lead: <strong>{report.leadAuthor}</strong></span>
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col items-center gap-2.5 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-line">
                  <Link href={`/reports/${report.slug}`} className="w-full">
                    <Button variant="primary" className="w-full">
                      <BookOpen className="w-4 h-4 mr-1.5" />
                      <span>Read Online</span>
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => alert(`Starting download for ${report.reportNumber} (${report.pdfSize})`)}
                  >
                    <Download className="w-4 h-4 mr-1.5" />
                    <span>Download PDF</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

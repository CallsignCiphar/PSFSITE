"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Download,
  Quote,
  CheckCircle2,
  Search,
  BookOpen,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const RESEARCH_PAPERS = [
  {
    id: "rp-001",
    slug: "sensor-fusion-beyond-visual-range-air-combat-simulations",
    title: "Algorithmic Sensor Fusion in Saturated Beyond-Visual-Range Air Combat: A Monte Carlo Engagement Simulation",
    abstract: "This paper develops an empirical agent-based simulation evaluating multi-spectral sensor fusion (AESA, IRST, passive ESM) under heavy electronic warfare jamming environments along contested airspace vectors.",
    authors: [
      { name: "Dr. Tariq Mahmud", institution: "Centre for Aerospace & Security Studies (CASS)" },
      { name: "Engr. Salman Raza", institution: "Institute of Space Technology" },
    ],
    doi: "10.5555/psf.2026.04.01",
    volume: "Vol. 8, Issue 3 (Autumn 2026)",
    discipline: "Aerospace Systems & Electronic Warfare",
    publishedAt: "10 October 2026",
    citationsCount: 14,
  },
  {
    id: "rp-002",
    slug: "nuclear-triad-resilience-indian-ocean-littoral-dynamics",
    title: "Second-Strike Credibility and Naval Asymmetry: Stochastic Modeling of Subsurface Deterrence in the Northern Indian Ocean",
    abstract: "Employing operational patrol radius analysis and acoustic propagation modeling across the Arabian Sea, this study assesses the stabilizing threshold of Air-Independent Propulsion (AIP) conventional attack submarines armed with land-attack cruise missiles.",
    authors: [
      { name: "Commodore (Retd) Bilal Zafar", institution: "National Institute of Maritime Affairs" },
    ],
    doi: "10.5555/psf.2026.04.02",
    volume: "Vol. 8, Issue 3 (Autumn 2026)",
    discipline: "Maritime Security & Strategic Deterrence",
    publishedAt: "24 September 2026",
    citationsCount: 22,
  },
  {
    id: "rp-003",
    slug: "counter-drone-directed-energy-low-altitude-air-defence",
    title: "Directed Energy Weapons Against Loitering Munition Swarms: Tactical Feasibility in Mountainous Terrain",
    abstract: "A quantitative assessment of high-energy laser (HEL) and high-power microwave (HPM) systems deployed for point defence against low-radar-cross-section suicide drone swarms across high-altitude border posts.",
    authors: [
      { name: "Dr. Farooq Malik", institution: "National University of Sciences & Technology (NUST)" },
      { name: "Maj (Retd) Haris Khan", institution: "PSF Strategic Technology Wing" },
    ],
    doi: "10.5555/psf.2026.04.03",
    volume: "Vol. 8, Issue 2 (Summer 2026)",
    discipline: "Emerging Military Technologies",
    publishedAt: "15 August 2026",
    citationsCount: 31,
  },
];

export default function ResearchHubPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPapers = RESEARCH_PAPERS.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.discipline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.authors.some((a) => a.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-full bg-paper py-12 font-sans">
      <div className="max-w-container mx-auto px-6 space-y-10">
        {/* Academic Journal Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-line">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-green-700 uppercase tracking-wider mb-1">
              <GraduationCap className="w-4 h-4" />
              <span>Peer-Reviewed Academic Journal</span>
            </div>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl text-ink-900 tracking-tight">
              PSF Research Journal
            </h1>
            <p className="font-serif text-sm text-ink-600 mt-1 max-w-2xl">
              Quarterly academic journal of strategic studies, aerospace engineering, and military deterrence dynamics.
              Every published paper has undergone verified double-blind peer review.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-ink-500 mt-2">
              <span>ISSN: 2790-8844 (Online)</span>
              <span>•</span>
              <span>Indexed: Google Scholar, Highwire Press</span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/join/research">
              <Button variant="primary">
                <span>Submit a Manuscript</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-ink-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search academic papers by title, discipline, or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-line rounded-sm bg-white text-xs text-ink-900 focus:outline-none focus:border-green-700"
          />
        </div>

        {/* Papers Listing */}
        <div className="space-y-6">
          {filteredPapers.map((paper) => (
            <div
              key={paper.id}
              className="bg-white border border-line rounded-sm p-6 sm:p-8 hover:border-green-700 transition-colors shadow-xs"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 bg-green-50 text-green-800 border border-green-200 rounded-sm font-semibold text-[10px] uppercase flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-green-700" />
                      <span>Double-Blind Peer Reviewed</span>
                    </span>
                    <span className="font-mono text-ink-500">{paper.volume}</span>
                    <span className="text-line">•</span>
                    <span className="text-ink-600 font-medium">{paper.discipline}</span>
                  </div>

                  <Link href={`/research/${paper.slug}`}>
                    <h2 className="font-serif font-bold text-xl sm:text-2xl text-ink-900 hover:text-green-700 transition-colors leading-tight">
                      {paper.title}
                    </h2>
                  </Link>

                  <p className="font-serif text-sm text-ink-700 leading-relaxed max-w-3xl">
                    {paper.abstract}
                  </p>

                  <div className="pt-2 text-xs text-ink-700">
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {paper.authors.map((author) => (
                        <span key={author.name} className="inline-block">
                          <strong>{author.name}</strong> ({author.institution})
                        </span>
                      ))}
                    </div>
                    <div className="font-mono text-[11px] text-ink-500 mt-1">
                      DOI: <a href={`https://doi.org/${paper.doi}`} className="underline hover:text-green-700">{paper.doi}</a>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col items-center gap-2.5 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-line">
                  <Link href={`/research/${paper.slug}`} className="w-full">
                    <Button variant="primary" className="w-full">
                      <BookOpen className="w-4 h-4 mr-1.5" />
                      <span>Read Full Paper</span>
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => alert(`Citing: ${paper.title} (${paper.doi})`)}
                  >
                    <Quote className="w-4 h-4 mr-1.5" />
                    <span>Cite Paper</span>
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

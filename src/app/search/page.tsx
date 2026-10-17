"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  FileText,
  FileSpreadsheet,
  GraduationCap,
  Flame,
  ArrowRight,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCK_SEARCH_RESULTS = [
  {
    id: "res-1",
    type: "Article",
    title: "Modernising the Shield: Evaluating Pakistan's Integrated Air Defence Architecture",
    snippet: "An exhaustive technical assessment of multi-tier airspace denial along the eastern border, evaluating HQ-9/P long-range SAMs and sensor fusion networks.",
    author: "Dr. Tariq Mahmud",
    date: "16 Oct 2026",
    url: "/articles/pakistan-integrated-air-defence-modernisation-multi-tier-shield",
    topic: "Defence",
  },
  {
    id: "res-2",
    type: "Special Report",
    title: "The South Asian Military Balance: Conventional Disparity and Asymmetric Countermeasures (2026–2030)",
    snippet: "Monograph PSF-R-2026-004 evaluating conventional military balance, missile inventories, and force posture adjustments across South Asia.",
    author: "PSF Strategic Studies Group",
    date: "15 Oct 2026",
    url: "/reports/south-asian-military-balance-conventional-disparity-2026-2030",
    topic: "Strategic Assessments",
  },
  {
    id: "res-3",
    type: "Research Paper",
    title: "Algorithmic Sensor Fusion in Saturated Beyond-Visual-Range Air Combat: A Monte Carlo Engagement Simulation",
    snippet: "Academic simulation paper published in PSF Research (DOI: 10.5555/psf.2026.04.01) evaluating electronic warfare and radar detection envelopes.",
    author: "Dr. Tariq Mahmud & Engr. Salman Raza",
    date: "10 Oct 2026",
    url: "/research/sensor-fusion-beyond-visual-range-air-combat-simulations",
    topic: "Aerospace Systems",
  },
  {
    id: "res-4",
    type: "Newsroom Wire",
    title: "SCO Defence Ministers Conclude Strategic Exercises in Central Asia",
    snippet: "Dispatched breaking briefing covering multi-national joint counter-terrorism drills and logistics integration agreements signed in Tashkent.",
    author: "PSF Strategic Wire",
    date: "18 Oct 2026",
    url: "/newsroom",
    topic: "Newsroom",
  },
];

export default function SearchPage() {
  const [query, setQuery] = useState("Air Defence");
  const [filterType, setFilterType] = useState("ALL");

  const results = MOCK_SEARCH_RESULTS.filter((r) => {
    if (filterType !== "ALL" && r.type !== filterType) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      r.title.toLowerCase().includes(q) ||
      r.snippet.toLowerCase().includes(q) ||
      r.author.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full bg-paper py-12 font-sans">
      <div className="max-w-container mx-auto px-6 space-y-8">
        {/* Header */}
        <div className="max-w-3xl pb-4 border-b border-line">
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-green-700 block mb-1">
            Global Knowledge Base
          </span>
          <h1 className="font-serif font-bold text-3xl text-ink-900 mb-2">
            Search Strategic Intelligence & Archives
          </h1>
          <p className="font-serif text-sm text-ink-600">
            Query over 400+ published analyses, special monographs, peer-reviewed academic papers, and wire dispatches.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white border border-line rounded-sm p-4 space-y-3">
          <div className="relative">
            <Search className="w-5 h-5 text-ink-400 absolute left-3 top-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search across all analyses, reports, papers, authors..."
              className="w-full pl-10 pr-4 py-2.5 border border-line rounded-sm bg-white text-sm text-ink-900 focus:outline-none focus:border-green-700"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto text-xs pt-1">
            <span className="text-[10px] uppercase font-bold text-ink-400 tracking-wider mr-1">
              Filter By Type:
            </span>
            {["ALL", "Article", "Special Report", "Research Paper", "Newsroom Wire"].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1 rounded-sm text-xs font-semibold whitespace-nowrap border transition-colors ${
                  filterType === t
                    ? "bg-green-700 text-white border-green-700"
                    : "bg-white text-ink-700 border-line hover:bg-ivory-50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="text-xs text-ink-500 font-mono">
          Found {results.length} result(s) for &quot;{query}&quot;
        </div>

        {/* Results Listing */}
        <div className="space-y-4">
          {results.length === 0 ? (
            <div className="p-12 text-center text-xs text-ink-400 bg-white border border-line rounded-sm">
              No results found matching &quot;{query}&quot;. Try broadening your keywords.
            </div>
          ) : (
            results.map((res) => (
              <div
                key={res.id}
                className="bg-white border border-line rounded-sm p-6 hover:border-green-700 transition-colors shadow-xs"
              >
                <div className="flex items-center gap-2 text-xs mb-1.5">
                  <span className="px-2 py-0.5 bg-green-50 text-green-800 border border-green-200 rounded-sm font-bold text-[10px] uppercase tracking-wider">
                    {res.type}
                  </span>
                  <span className="text-ink-500 font-medium">{res.topic}</span>
                  <span className="text-line">•</span>
                  <span className="text-ink-500">{res.date}</span>
                </div>

                <Link href={res.url}>
                  <h2 className="font-serif font-bold text-xl text-ink-900 hover:text-green-700 transition-colors leading-snug">
                    {res.title}
                  </h2>
                </Link>

                <p className="font-serif text-sm text-ink-700 leading-relaxed mt-2 max-w-3xl">
                  {res.snippet}
                </p>

                <div className="pt-3 border-t border-line mt-3 flex items-center justify-between text-xs text-ink-500">
                  <span>Author: <strong>{res.author}</strong></span>
                  <Link
                    href={res.url}
                    className="inline-flex items-center gap-1 font-semibold text-green-700 hover:underline"
                  >
                    <span>Read Publication</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

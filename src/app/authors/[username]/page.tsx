"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  BookOpen,
  FileSpreadsheet,
  GraduationCap,
  Globe,
  Share2,
} from "lucide-react";
import { StandardCard, ContentItemProps } from "@/components/ui/card";
import { TagChip } from "@/components/ui/tag-chip";

const authorArticles: ContentItemProps[] = [
  {
    id: "a-1",
    slug: "pakistan-integrated-air-defence-modernisation-multi-tier-shield",
    title: "Modernising the Shield: Evaluating Pakistan's Integrated Air Defence Architecture",
    standfirst: "An exhaustive technical assessment of multi-tier airspace denial along the eastern border.",
    label: "ANALYSIS",
    topic: "Defence",
    subtopic: "Air",
    author: { name: "Dr. Tariq Mahmud" },
    publishedAt: "16 Oct 2026",
    readMinutes: 9,
    imageUrl: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "a-2",
    slug: "jf-17-block-3-aesa-pl15-integration",
    title: "JF-17 Block III AESA Radar and PL-15 Missile Integration: Flight Test Results",
    label: "NEWS_ANALYSIS",
    topic: "Defence",
    subtopic: "Air",
    author: { name: "Dr. Tariq Mahmud" },
    publishedAt: "10 Oct 2026",
    readMinutes: 6,
    imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "a-3",
    slug: "hypersonic-trajectories-crisis-stability",
    title: "Hypersonic Trajectories and Compressed Reaction Times in South Asian Crisis Scenarios",
    standfirst: "How hypersonic glide bodies undermine traditional pre-launch crisis communication windows.",
    label: "ANALYSIS",
    topic: "Strategic Systems",
    author: { name: "Dr. Tariq Mahmud" },
    publishedAt: "15 Aug 2026",
    readMinutes: 8,
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
  },
];

export default function AuthorProfilePage() {
  const [activeTab, setActiveTab] = useState("ALL");

  return (
    <div className="w-full bg-paper py-10 font-sans">
      <div className="max-w-container mx-auto px-6">
        {/* ========================================================
            AUTHOR PROFILE HEADER
            ======================================================== */}
        <div className="p-8 bg-ivory-50 border border-line rounded-card mb-12 shadow-level1">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* 160px Avatar */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-green-700 text-white font-serif font-bold text-4xl md:text-5xl flex items-center justify-center shrink-0 border-4 border-white shadow-md">
              TM
            </div>

            {/* Author Information */}
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-serif font-bold text-3xl md:text-4xl text-ink-900">
                  Dr. Tariq Mahmud
                </h1>
                <span className="px-2 py-0.5 rounded-chip text-xs font-bold uppercase tracking-wider bg-green-100 text-green-700">
                  PSF Expert
                </span>
                <span className="px-2 py-0.5 rounded-chip text-xs font-semibold bg-ivory-100 text-ink-700 border border-line">
                  Senior Fellow
                </span>
              </div>

              <p className="text-sm font-sans font-medium text-ink-700">
                Senior Strategic Fellow, Centre for Aerospace & Security Studies (CASS), Islamabad
              </p>

              <p className="font-serif text-sm text-ink-700 max-w-3xl leading-relaxed">
                Dr. Tariq Mahmud specializes in South Asian strategic balance, nuclear escalation dynamics, air defense modernization, and hypersonic strike kinetics. He has advised parliamentary defense committees and authored over thirty analytical monographs.
              </p>

              {/* Expertise Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <TagChip label="Air Warfare" />
                <TagChip label="Strategic Deterrence" />
                <TagChip label="C4ISR" />
                <TagChip label="Radar Networks" />
              </div>

              {/* External Links */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-sans text-green-700 font-medium">
                <a href="https://orcid.org" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                  <span>ORCID Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span>·</span>
                <a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                  <span>Google Scholar</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span>·</span>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                  <span>X (@TariqMahmud)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-line text-center text-xs font-sans">
            <div>
              <span className="font-mono text-2xl font-bold text-ink-900 block">14</span>
              <span className="text-ink-500">Articles Published</span>
            </div>
            <div>
              <span className="font-mono text-2xl font-bold text-green-700 block">3</span>
              <span className="text-ink-500">Special Reports</span>
            </div>
            <div>
              <span className="font-mono text-2xl font-bold text-ink-900 block">6</span>
              <span className="text-ink-500">Peer-Reviewed Papers</span>
            </div>
          </div>
        </div>

        {/* ========================================================
            PUBLISHED WORK TABS & GRID
            ======================================================== */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-line">
            <div className="flex gap-4 text-xs font-sans font-medium">
              {["ALL", "ARTICLES", "REPORTS", "RESEARCH"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 -mb-3 border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-green-700 text-green-700 font-bold"
                      : "border-transparent text-ink-500 hover:text-ink-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <span className="text-xs font-sans text-ink-400">Showing published dispatches</span>
          </div>

          {/* 3-Column Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {authorArticles.map((item) => (
              <StandardCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

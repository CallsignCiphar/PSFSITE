"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Globe, Filter, ChevronRight, Shield, Plane, Anchor, Crosshair, Cpu } from "lucide-react";
import { StandardCard, ContentItemProps } from "@/components/ui/card";
import { TagChip } from "@/components/ui/tag-chip";
import { Button } from "@/components/ui/button";

const topicArticles: ContentItemProps[] = [
  {
    id: "ta-1",
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
    id: "ta-2",
    slug: "second-strike-endurance-naval-triad",
    title: "Second-Strike Endurance: Sea-Based Deterrence and Pakistan's Evolving Nuclear Triad",
    standfirst: "Evaluating Hangor-class submarine AIP endurance and deterrence stabilization in the Indian Ocean.",
    label: "ANALYSIS",
    topic: "Defence",
    subtopic: "Sea",
    author: { name: "Commodore (Retd) Bilal Zafar" },
    publishedAt: "28 Sep 2026",
    readMinutes: 12,
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ta-3",
    slug: "operation-swift-retort-aerial-tactics",
    title: "Operation Swift Retort Revisited: Sensor Fusion and Beyond-Visual-Range Air Warfare Lessons",
    standfirst: "Analyzing tactical radar networks and electronic countermeasures deployed during the 2019 aerial engagement.",
    label: "ANALYSIS",
    topic: "Defence",
    subtopic: "Air",
    author: { name: "Air Commodore (Retd) Kaiser Tufail" },
    publishedAt: "14 Oct 2026",
    readMinutes: 8,
    imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ta-4",
    slug: "jf-17-block-3-aesa-pl15-integration",
    title: "JF-17 Block III AESA Radar and PL-15 Missile Integration: Flight Test Results",
    label: "NEWS_ANALYSIS",
    topic: "Defence",
    subtopic: "Air",
    author: { name: "Hamza Shafqat" },
    publishedAt: "10 Oct 2026",
    readMinutes: 6,
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
  },
];

const subtopicsList = [
  { name: "Air", icon: Plane, count: 68, href: "/topics/defence/air" },
  { name: "Land", icon: Shield, count: 54, href: "/topics/defence/land" },
  { name: "Sea", icon: Anchor, count: 32, href: "/topics/defence/sea" },
  { name: "Strategic Systems", icon: Crosshair, count: 20, href: "/topics/defence/strategic-systems" },
  { name: "Cyber & EW", icon: Cpu, count: 10, href: "/topics/defence/cyber" },
];

export default function TopicPage() {
  const [selectedSubtopic, setSelectedSubtopic] = useState("All");

  return (
    <div className="w-full bg-paper font-sans">
      {/* ========================================================
          1. TOPIC HERO (280px)
          ======================================================== */}
      <section className="relative w-full min-h-[280px] bg-green-900 text-white flex flex-col justify-end p-8 md:p-12 overflow-hidden border-b border-green-800">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-green-900/60 to-transparent" />

        <div className="relative z-10 max-w-container mx-auto w-full">
          {/* Breadcrumb */}
          <nav className="text-xs font-sans text-white/70 mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/topics" className="hover:text-white">Topics</Link>
            <span>/</span>
            <span className="text-white font-semibold">Defence</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif font-bold text-4xl md:text-5xl text-white tracking-tight">
                Defence Desk
              </h1>
              <p className="font-serif text-sm md:text-base text-white/80 max-w-2xl mt-2 leading-relaxed">
                Comprehensive reporting, technical assessments, and doctrinal analysis of land, air, and naval capabilities, strategic deterrence, and defense industry procurement.
              </p>
            </div>

            <div className="text-xs font-sans text-white/70">
              <span className="font-mono text-xl font-bold text-white block">184</span>
              <span>Published Items</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. SUBTOPIC CTAs ROW
          ======================================================== */}
      <section className="w-full bg-ivory-50 border-b border-line py-4">
        <div className="max-w-container mx-auto px-6 overflow-x-auto">
          <div className="flex items-center gap-3">
            <span className="text-xs font-sans font-semibold text-ink-500 uppercase tracking-wider shrink-0 mr-2">
              Subtopics:
            </span>
            {subtopicsList.map((st) => {
              const Icon = st.icon;
              return (
                <button
                  key={st.name}
                  type="button"
                  onClick={() => setSelectedSubtopic(st.name)}
                  className={`flex items-center gap-2 h-9 px-4 rounded-card border text-xs font-sans font-medium transition-colors shrink-0 ${
                    selectedSubtopic === st.name
                      ? "bg-green-700 text-white border-green-700 shadow-sm"
                      : "bg-white text-ink-700 border-line hover:border-ink-500"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{st.name}</span>
                  <span className={`text-[10px] ${selectedSubtopic === st.name ? "text-green-200" : "text-ink-400"}`}>
                    ({st.count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          3. MAIN CONTENT GRID (Cols 1-8) & SIDEBAR (Cols 9-12)
          ======================================================== */}
      <section className="w-full py-12">
        <div className="max-w-container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Content Listing */}
            <div className="lg:col-span-8 space-y-8">
              <div className="section-rule flex items-center justify-between pt-2">
                <span className="font-sans text-xs font-bold uppercase tracking-[0.1em] text-ink-900">
                  Latest Defence Coverage
                </span>
                <span className="font-sans text-xs text-ink-500">Sorted by Newest</span>
              </div>

              {/* 2-Column Grid of Articles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {topicArticles.map((art) => (
                  <StandardCard key={art.id} item={art} />
                ))}
              </div>

              {/* Pagination */}
              <div className="pt-6 border-t border-line flex items-center justify-center gap-2 text-xs font-sans">
                <span className="px-3 py-1.5 bg-green-700 text-white font-bold rounded-button">1</span>
                <button type="button" className="px-3 py-1.5 border border-line rounded-button hover:bg-ivory-50">2</button>
                <button type="button" className="px-3 py-1.5 border border-line rounded-button hover:bg-ivory-50">3</button>
                <button type="button" className="px-3 py-1.5 border border-line rounded-button hover:bg-ivory-50">Next →</button>
              </div>
            </div>

            {/* Right Sticky Sidebar */}
            <aside className="lg:col-span-4 space-y-6 sticky top-24">
              {/* Coverage Map Mini Card */}
              <div className="p-6 bg-ivory-50 border border-line rounded-card shadow-level1">
                <h4 className="font-serif font-bold text-base text-ink-900 mb-1">
                  Global Watch: Defence Theaters
                </h4>
                <p className="font-serif text-xs text-ink-700 leading-relaxed mb-4">
                  View all 184 defense dispatches plotted across regional operational sectors.
                </p>
                <Link href="/global-watch?topic=defence">
                  <Button variant="primary" size="sm" className="w-full gap-2">
                    <Globe className="w-3.5 h-3.5" />
                    <span>View on Global Watch</span>
                  </Button>
                </Link>
              </div>

              {/* Most Read in Topic */}
              <div className="bg-white border border-line rounded-card p-6 shadow-level1">
                <h4 className="font-serif font-bold text-base text-ink-900 pb-3 border-b border-line mb-4">
                  Most Read in Defence
                </h4>
                <div className="space-y-4">
                  {topicArticles.map((art, idx) => (
                    <div key={art.id} className="group">
                      <span className="font-serif font-bold text-base text-green-700 mr-2">0{idx + 1}</span>
                      <h5 className="font-serif font-semibold text-xs leading-snug text-ink-900 group-hover:text-green-700 transition-colors inline">
                        <Link href={`/articles/${art.slug}`}>{art.title}</Link>
                      </h5>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

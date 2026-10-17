"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Pin,
  Clock,
  MapPin,
  Share2,
  ExternalLink,
  Filter,
  Flame,
  ChevronRight,
} from "lucide-react";
import { ContentLabel } from "@/components/ui/content-label";
import { TagChip } from "@/components/ui/tag-chip";
import { Button } from "@/components/ui/button";

const newsroomPosts = [
  {
    id: "n1",
    slug: "jshq-bilateral-defence-dialogue",
    time: "14:45 PKT",
    dateGroup: "Today (18 Oct 2026)",
    region: "South Asia",
    country: "Pakistan",
    city: "Islamabad",
    topic: "Defence",
    isPinned: true,
    isBreaking: true,
    headline: "Joint Staff Headquarters concludes high-level bilateral defence dialogue with Turkish delegation",
    summary:
      "Chairman Joint Chiefs of Staff Committee met with Turkish military leadership in Rawalpindi. Discussions focused on joint aerospace manufacturing protocols, kinetic UAV subsystems, and intelligence coordination in counter-terrorism theaters.",
    sourceName: "ISPR Official",
    sourceUrl: "https://ispr.gov.pk",
  },
  {
    id: "n2",
    slug: "regional-counter-terrorism-coordination-council",
    time: "13:20 PKT",
    dateGroup: "Today (18 Oct 2026)",
    region: "Central Asia",
    country: "Tajikistan",
    city: "Dushanbe",
    topic: "Geopolitics",
    isPinned: true,
    isBreaking: false,
    headline: "Regional counter-terrorism coordination council issues joint protocol on border surveillance",
    summary:
      "Security chiefs from Pakistan, China, and Central Asian republics signed an updated border monitoring framework aimed at interdicting transnational narcotics corridors and non-state militant movement across rugged mountain corridors.",
    sourceName: "Central Asian News Wire",
    sourceUrl: "#",
  },
  {
    id: "n3",
    slug: "sea-guardians-4-drills-commence",
    time: "11:10 PKT",
    dateGroup: "Today (18 Oct 2026)",
    region: "Middle East",
    country: "Saudi Arabia",
    city: "Riyadh",
    topic: "Defence",
    isPinned: false,
    isBreaking: false,
    headline: "Naval drills 'Sea Guardians IV' commence in northern Arabian Sea",
    summary:
      "Combined surface fleets and maritime patrol aircraft have begun operational exercises focusing on anti-submarine warfare (ASW), surface interdiction, and sea lines of communication (SLOC) escort maneuvers.",
    sourceName: "Maritime Command",
    sourceUrl: "#",
  },
  {
    id: "n4",
    slug: "fourth-babur-class-corvette-commissioned",
    time: "16:30 PKT",
    dateGroup: "Yesterday (17 Oct 2026)",
    region: "South Asia",
    country: "Pakistan",
    city: "Karachi",
    topic: "Defence",
    isPinned: false,
    isBreaking: false,
    headline: "Pakistan Navy commissions fourth Babur-class corvette at Karachi Shipyard",
    summary:
      "The MILGEM project corvette PNS Tariq was officially inducted into active service. Equipped with vertical launch surface-to-air missiles and indigenous Harbah cruise missiles, the platform significantly bolsters offshore defense strike capability.",
    sourceName: "Naval Staff Directorate",
    sourceUrl: "#",
  },
  {
    id: "n5",
    slug: "dod-annual-regional-security-report",
    time: "10:15 PKT",
    dateGroup: "16 Oct 2026",
    region: "Americas",
    country: "United States",
    city: "Washington",
    topic: "Geopolitics",
    isPinned: false,
    isBreaking: false,
    headline: "DoD annual regional security posture report references South Asian deterrence stability",
    summary:
      "The Pentagon's annual unclassified assessment highlighted the robust survivability of regional strategic systems and emphasized the critical stabilization role of bilateral crisis communication protocols.",
    sourceName: "US Department of Defense",
    sourceUrl: "#",
  },
];

export default function NewsroomPage() {
  const [breakingOnly, setBreakingOnly] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("All");

  const filteredPosts = newsroomPosts.filter((post) => {
    if (breakingOnly && !post.isBreaking) return false;
    if (selectedTopic !== "All" && post.topic !== selectedTopic) return false;
    return true;
  });

  return (
    <div className="w-full bg-paper py-8 font-sans">
      <div className="max-w-container mx-auto px-6">
        {/* ========================================================
            HEADER
            ======================================================== */}
        <div className="pb-6 border-b border-line mb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <h1 className="font-serif font-bold text-3xl md:text-4xl text-ink-900">Newsroom Wire</h1>
          </div>
          <p className="font-serif text-sm text-ink-700">
            Real-time, verified operational briefings on strategic and defense developments. Last updated 14:45 PKT.
          </p>
        </div>

        {/* ========================================================
            FILTERS BAR
            ======================================================== */}
        <div className="p-4 bg-ivory-50 border border-line rounded-card flex flex-wrap items-center justify-between gap-4 mb-8 text-xs font-sans">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 font-medium text-ink-700">
              <Filter className="w-3.5 h-3.5 text-green-700" />
              <span>Filter Desk:</span>
            </div>

            {["All", "Defence", "Geopolitics", "National Affairs"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedTopic(t)}
                className={`h-7 px-3 rounded-chip border transition-colors ${
                  selectedTopic === t
                    ? "bg-green-700 text-white border-green-700 font-semibold"
                    : "bg-white text-ink-700 border-line hover:border-ink-500"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 cursor-pointer font-medium text-ink-900 select-none">
            <input
              type="checkbox"
              checked={breakingOnly}
              onChange={(e) => setBreakingOnly(e.target.checked)}
              className="rounded-sm text-danger-700"
            />
            <span className="flex items-center gap-1 text-danger-700">
              <Flame className="w-3.5 h-3.5" />
              <span>Breaking Alerts Only</span>
            </span>
          </label>
        </div>

        {/* ========================================================
            MAIN LAYOUT: STREAM (Cols 1-8) + SIDEBAR (Cols 9-12)
            ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Stream Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Pinned Section */}
            {filteredPosts.filter((p) => p.isPinned).length > 0 && (
              <div className="space-y-4">
                <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-green-700 flex items-center gap-1">
                  <Pin className="w-3.5 h-3.5" /> Pinned Wire Dispatches
                </span>

                <div className="space-y-3">
                  {filteredPosts
                    .filter((p) => p.isPinned)
                    .map((post) => (
                      <article
                        key={post.id}
                        className="p-5 bg-white border-l-4 border-l-green-500 border border-line rounded-r-card shadow-sm group hover:border-green-700 transition-colors"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-sans text-ink-500 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-ink-900">{post.time}</span>
                            <span>·</span>
                            <span className="text-green-700 font-medium">
                              {post.city}, {post.country}
                            </span>
                            <span>·</span>
                            <span className="text-ink-400">{post.topic}</span>
                          </div>

                          {post.isBreaking && (
                            <span className="px-1.5 py-0.2 bg-danger-700 text-white rounded-[2px] font-bold uppercase text-[9px]">
                              Breaking
                            </span>
                          )}
                        </div>

                        <h3 className="font-serif font-bold text-lg text-ink-900 group-hover:text-green-700 transition-colors mb-2 leading-snug">
                          <Link href={`/newsroom/${post.slug}`}>{post.headline}</Link>
                        </h3>

                        <p className="font-serif text-sm text-ink-700 leading-relaxed mb-4">
                          {post.summary}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-line text-xs font-sans">
                          {post.sourceUrl && (
                            <a
                              href={post.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-ink-500 hover:text-green-700 flex items-center gap-1"
                            >
                              <span>Source: {post.sourceName}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() => alert("Link copied to clipboard!")}
                            className="p-1 text-ink-400 hover:text-ink-700"
                            title="Share"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </article>
                    ))}
                </div>
              </div>
            )}

            {/* Standard Stream List */}
            <div className="space-y-6 pt-4">
              <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-ink-500 block">
                Chronological Wire Stream
              </span>

              <div className="space-y-4">
                {filteredPosts
                  .filter((p) => !p.isPinned)
                  .map((post) => (
                    <article
                      key={post.id}
                      className="p-5 bg-white border border-line rounded-card hover:border-green-700 transition-colors group"
                    >
                      <div className="flex items-center gap-2 text-xs font-sans text-ink-500 mb-2">
                        <span className="font-mono font-semibold text-ink-900">{post.time}</span>
                        <span>·</span>
                        <span className="text-green-700 font-medium">
                          {post.city}, {post.country}
                        </span>
                        <span>·</span>
                        <span className="text-ink-400">{post.topic}</span>
                      </div>

                      <h3 className="font-serif font-bold text-base md:text-lg text-ink-900 group-hover:text-green-700 transition-colors mb-2 leading-snug">
                        <Link href={`/newsroom/${post.slug}`}>{post.headline}</Link>
                      </h3>

                      <p className="font-serif text-sm text-ink-700 leading-relaxed mb-3">
                        {post.summary}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-line text-xs font-sans">
                        <span className="text-ink-400">Verified by PSF News Desk</span>
                        <Link
                          href={`/newsroom/${post.slug}`}
                          className="text-green-700 font-medium hover:underline flex items-center gap-0.5"
                        >
                          <span>Full dispatch</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </article>
                  ))}
              </div>
            </div>

            <div className="pt-4 text-center">
              <Button variant="secondary" size="default">
                Load More Dispatches (20 per page)
              </Button>
            </div>
          </div>

          {/* Sidebar Column (Cols 9-12) */}
          <aside className="lg:col-span-4 space-y-6 sticky top-24">
            {/* Global Watch Mini Card */}
            <div className="p-6 bg-ivory-50 border border-line rounded-card shadow-level1">
              <h4 className="font-serif font-bold text-base text-ink-900 mb-2">
                Spatial Coverage Map
              </h4>
              <p className="font-serif text-xs text-ink-700 leading-relaxed mb-4">
                Track each live news wire item mapped to its geographical point on the 3D globe.
              </p>
              <Link href="/global-watch">
                <Button variant="primary" size="sm" className="w-full">
                  Open Global Watch
                </Button>
              </Link>
            </div>

            {/* Sidebar Ad Slot (300x250) */}
            <div className="bg-ivory-50 border border-line rounded-card p-4 text-center">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-ink-400 block mb-2">
                Advertisement
              </span>
              <div className="w-[300px] h-[250px] mx-auto bg-ivory-100 border border-dashed border-line rounded-sm flex items-center justify-center text-xs font-sans text-ink-400">
                300×250 Newsroom Ad Creative
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

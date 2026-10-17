"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Play,
  Clock,
  Share2,
  ExternalLink,
  Search,
  Film,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const VIDEOS = [
  {
    id: "vid-01",
    title: "Air Superiority in the Subcontinent: Tactical Evolution from 1965 to Swift Retort",
    duration: "28:45",
    publishedAt: "14 October 2026",
    speaker: "Air Commodore (Retd) Kaiser Tufail",
    topic: "Aerospace & Military History",
    youtubeId: "dQw4w9WgXcQ",
    description: "An operational retrospective dissecting combat doctrine, radar interception tactics, and beyond-visual-range missile engagements across five decades of aerial warfare.",
  },
  {
    id: "vid-02",
    title: "Subsurface Deterrence: Pakistan's Naval Triad and Indian Ocean Dynamics",
    duration: "34:12",
    publishedAt: "26 September 2026",
    speaker: "Commodore (Retd) Bilal Zafar",
    topic: "Maritime Security",
    youtubeId: "dQw4w9WgXcQ",
    description: "Detailed briefing on Air-Independent Propulsion (AIP) submarines, acoustic stealth in warm littoral waters, and sea-based nuclear deterrence stabilizing mechanisms.",
  },
  {
    id: "vid-03",
    title: "Integrated Air Defence: Network-Centric Sensor Fusion & Multi-Tier Missile Networks",
    duration: "22:18",
    publishedAt: "10 September 2026",
    speaker: "Dr. Tariq Mahmud & PSF Technical Team",
    topic: "Defence Technology",
    youtubeId: "dQw4w9WgXcQ",
    description: "Technical simulation breakdown of how long-range, medium-range, and short-range surface-to-air missiles interface with passive radar arrays and electronic countermeasures.",
  },
];

export default function VideosPage() {
  const [activeVideo, setActiveVideo] = useState(VIDEOS[0]);

  return (
    <div className="w-full bg-paper py-12 font-sans">
      <div className="max-w-container mx-auto px-6 space-y-10">
        {/* Header */}
        <div className="max-w-3xl pb-6 border-b border-line">
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-green-700 block mb-1">
            Multimedia Briefings & Lectures
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-ink-900 mb-3">
            Strategic Video Analyses
          </h1>
          <p className="font-serif text-base text-ink-600 leading-relaxed">
            In-depth visual documentaries, military doctrine briefings, and recorded symposia featuring
            PSF research fellows and veteran military strategists.
          </p>
        </div>

        {/* Featured Video Player */}
        <div className="bg-white border border-line rounded-sm overflow-hidden shadow-sm">
          <div className="aspect-video bg-ink-950 relative flex items-center justify-center text-white">
            <div className="text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-green-700/90 text-white flex items-center justify-center mx-auto hover:scale-105 transition-transform cursor-pointer shadow-lg">
                <Play className="w-7 h-7 ml-1" />
              </div>
              <h2 className="font-serif font-bold text-xl sm:text-2xl max-w-2xl text-white">
                {activeVideo.title}
              </h2>
              <span className="font-mono text-xs text-white/70 block">
                {activeVideo.speaker} • {activeVideo.duration} • {activeVideo.topic}
              </span>
            </div>
          </div>

          <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-line text-xs">
            <div className="space-y-1">
              <span className="font-bold text-ink-900 block text-sm">
                {activeVideo.title}
              </span>
              <p className="text-ink-600 max-w-3xl">{activeVideo.description}</p>
            </div>
            <a
              href={`https://youtube.com/watch?v=${activeVideo.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <Button variant="outline">
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                <span>Watch on YouTube</span>
              </Button>
            </a>
          </div>
        </div>

        {/* Video Playlist Grid */}
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-xl text-ink-900">
            Recent Strategic Documentaries & Lectures
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VIDEOS.map((vid) => (
              <div
                key={vid.id}
                onClick={() => setActiveVideo(vid)}
                className={`p-4 bg-white border rounded-sm cursor-pointer transition-all ${
                  activeVideo.id === vid.id
                    ? "border-green-700 ring-1 ring-green-700 bg-green-50/20"
                    : "border-line hover:border-ink-400"
                }`}
              >
                <div className="aspect-video bg-ivory-100 border border-line rounded-sm flex items-center justify-center relative mb-3">
                  <Play className="w-8 h-8 text-ink-400" />
                  <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white rounded-sm font-mono text-[10px]">
                    {vid.duration}
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold text-green-700 tracking-wider block mb-1">
                  {vid.topic}
                </span>
                <h4 className="font-serif font-bold text-sm text-ink-900 line-clamp-2 mb-1">
                  {vid.title}
                </h4>
                <span className="text-[11px] text-ink-500 block">{vid.speaker}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

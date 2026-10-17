import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  GraduationCap,
  Flame,
  Globe,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { KpiTile } from "@/components/ui/kpi-tile";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About Us | Pakistan Strategic Forum",
  description: "Independent analysis of the forces shaping Pakistan's security and the region around it.",
};

const timelineMilestones = [
  { year: "2019", title: "PSF Founded", copy: "Pakistan Strategic Forum begins as an independent platform for defence and strategic commentary." },
  { year: "2020", title: "First Analysis Desk", copy: "Regular analysis on land, air and naval developments begins, establishing the foundational research archive." },
  { year: "2021", title: "Geopolitics Coverage Expands", copy: "Coverage broadens to Afghanistan, the Middle East, Central Asia, and great-power competition in South Asia." },
  { year: "2022", title: "Strategic Investigations", copy: "PSF publishes in-depth investigative reports on regional non-state militant recruitment networks." },
  { year: "2023", title: "Military History Desk", copy: "The History desk launches with operational battle studies and biographical profiles of decorated military leaders." },
  { year: "2024", title: "New Digital Home", copy: "PSF transitions to forumstrategic.com, expanding regional readership across decision-makers and defense scholars." },
  { year: "2026", title: "Platform Revamp & Research Series", copy: "Relaunch with PSF Research, double-blind peer review, contributor portal, and the 3D Global Watch coverage globe." },
];

export default function AboutPage() {
  return (
    <div className="w-full bg-paper font-sans">
      {/* ========================================================
          1. HERO
          ======================================================== */}
      <section className="relative w-full min-h-[360px] bg-green-900 text-white flex items-center justify-center py-16 px-6 border-b border-green-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-green-900/80 to-transparent z-10" />
        <div className="relative z-20 max-w-4xl mx-auto text-center space-y-4">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.1em] text-green-200">
            About Pakistan Strategic Forum
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
            Independent analysis of the forces shaping Pakistan&apos;s security and the region around it.
          </h1>
          <p className="font-serif text-base text-white/80 max-w-2xl mx-auto leading-relaxed italic">
            A military and defense think tank evaluating how wars are fought, how states prepare for them, and how they are deterred.
          </p>
        </div>
      </section>

      {/* ========================================================
          2. WHO WE ARE
          ======================================================== */}
      <section className="w-full py-16 border-b border-line">
        <div className="max-w-container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5 font-serif text-base md:text-lg text-ink-900 leading-[1.65]">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-green-700 block">
                Who We Are
              </span>
              <p>
                Pakistan Strategic Forum (PSF) is an independent defense and military think tank. We analyze the armed forces, defense industry modernization, national security strategy, regional geopolitics, and the operational military history that explains the present.
              </p>
              <p>
                We publish for decision-makers, strategic analysts, scholars, military officers, journalists, and informed citizens who demand rigorous evidence rather than noise. Every item published on PSF is transparently categorized: reporting, analysis, commentary, special reports, or peer-reviewed academic research.
              </p>
            </div>

            <div className="lg:col-span-5 relative aspect-[4/3] rounded-card overflow-hidden border border-line bg-ivory-100 shadow-level1">
              <div className="w-full h-full p-8 flex flex-col justify-between bg-ivory-50">
                <div className="w-12 h-12 rounded-full bg-green-700 text-white font-serif font-bold flex items-center justify-center text-lg">
                  PSF
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-xl text-ink-900">
                    Institutional Independence
                  </h4>
                  <p className="font-serif text-xs text-ink-700 leading-relaxed">
                    PSF is editorially independent. Our editors make all publishing decisions without commercial or political interference.
                  </p>
                </div>
                <div className="text-[11px] font-sans text-ink-400">
                  Established 2019 · Islamabad, Pakistan
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. WHAT WE DO: THE FOUR PILLARS
          ======================================================== */}
      <section className="w-full py-16 bg-ivory-50 border-b border-line">
        <div className="max-w-container mx-auto px-6">
          <div className="section-rule flex items-center justify-between pt-2">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.1em] text-ink-900">
              The Four Pillars of PSF
            </span>
            <span className="font-sans text-xs text-ink-500">Core Capabilities</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white border border-line rounded-card space-y-3">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-lg text-ink-900">Analysis & Strategy</h4>
              <p className="font-serif text-xs text-ink-700 leading-relaxed">
                Timely, deeply sourced assessments of defense technology, operational doctrines, and military modernization.
              </p>
            </div>

            <div className="p-6 bg-white border border-line rounded-card space-y-3">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-lg text-ink-900">PSF Research</h4>
              <p className="font-serif text-xs text-ink-700 leading-relaxed">
                Scholarly manuscripts and policy briefs evaluated double-blind by senior professors, published open access under CC BY 4.0.
              </p>
            </div>

            <div className="p-6 bg-white border border-line rounded-card space-y-3">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-lg text-ink-900">Live Newsroom</h4>
              <p className="font-serif text-xs text-ink-700 leading-relaxed">
                Verified wire updates covering breaking security maneuvers, diplomatic defense summits, and operational exercises.
              </p>
            </div>

            <div className="p-6 bg-white border border-line rounded-card space-y-3">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-lg text-ink-900">Global Watch</h4>
              <p className="font-serif text-xs text-ink-700 leading-relaxed">
                An interactive spatial coverage globe plotting every story and military assessment directly to where it transpired.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. BY THE NUMBERS
          ======================================================== */}
      <section className="w-full py-16 border-b border-line">
        <div className="max-w-container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <KpiTile value="650+" label="Published Dispatches" />
            <KpiTile value="42" label="Peer-Reviewed Papers" />
            <KpiTile value="212" label="Locations Covered" />
            <KpiTile value="85+" label="Certified Contributors" />
          </div>
        </div>
      </section>

      {/* ========================================================
          5. OUR JOURNEY (TIMELINE)
          ======================================================== */}
      <section className="w-full py-16 bg-ivory-50 border-b border-line">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-green-700 block mb-1">
              Historical Trajectory
            </span>
            <h2 className="font-serif font-bold text-3xl text-ink-900">Our Journey (2019–Present)</h2>
          </div>

          <div className="relative border-l-2 border-line ml-4 md:ml-6 space-y-10 pl-6 md:pl-8">
            {timelineMilestones.map((m) => (
              <div key={m.year} className="relative group">
                {/* Dot */}
                <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-green-700 group-hover:bg-green-700 transition-colors" />

                <span className="font-mono text-xs font-bold text-green-700 block mb-1">
                  {m.year}
                </span>
                <h4 className="font-serif font-bold text-lg text-ink-900 mb-1">
                  {m.title}
                </h4>
                <p className="font-serif text-sm text-ink-700 leading-relaxed">
                  {m.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          6. WORK WITH US
          ======================================================== */}
      <section className="w-full py-16 bg-paper">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-10">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-green-700 block mb-1">
              Join the Forum
            </span>
            <h2 className="font-serif font-bold text-3xl text-ink-900">Work With Us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-line rounded-card flex flex-col justify-between bg-ivory-50/50">
              <div>
                <h4 className="font-serif font-bold text-lg text-ink-900 mb-2">Write for PSF</h4>
                <p className="font-serif text-xs text-ink-700 leading-relaxed mb-4">
                  For military analysts and practitioners wanting to publish strategic commentary evaluated by our editorial board.
                </p>
              </div>
              <Link href="/join/article">
                <Button variant="primary" size="sm" className="w-full">
                  Apply as a Writer
                </Button>
              </Link>
            </div>

            <div className="p-6 border border-line rounded-card flex flex-col justify-between bg-ivory-50/50">
              <div>
                <h4 className="font-serif font-bold text-lg text-ink-900 mb-2">Publish Research</h4>
                <p className="font-serif text-xs text-ink-700 leading-relaxed mb-4">
                  For scholars submitting academic manuscripts for rigorous double-blind evaluation under CC BY 4.0.
                </p>
              </div>
              <Link href="/join/research">
                <Button variant="secondary" size="sm" className="w-full">
                  Submit a Paper
                </Button>
              </Link>
            </div>

            <div className="p-6 border border-line rounded-card flex flex-col justify-between bg-ivory-50/50">
              <div>
                <h4 className="font-serif font-bold text-lg text-ink-900 mb-2">Advertise With Us</h4>
                <p className="font-serif text-xs text-ink-700 leading-relaxed mb-4">
                  Position your brand alongside credible strategic briefings read by defense industry executives and policy leaders.
                </p>
              </div>
              <Link href="/advertise">
                <Button variant="secondary" size="sm" className="w-full">
                  View Media Kit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

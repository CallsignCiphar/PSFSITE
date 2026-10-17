import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Globe, Shield, Compass, Landmark, History, Play } from "lucide-react";
import { ContentLabel } from "@/components/ui/content-label";
import { TagChip } from "@/components/ui/tag-chip";
import { Button } from "@/components/ui/button";
import { KpiTile } from "@/components/ui/kpi-tile";
import {
  StandardCard,
  CompactRuledCard,
  HorizontalCard,
  ResearchCard,
  ReportCard,
  ContentItemProps,
} from "@/components/ui/card";

// Seeded / Sample editorial content grounded in authentic PSF think-tank topics
const leadStory: ContentItemProps = {
  id: "lead-1",
  slug: "pakistan-integrated-air-defence-modernisation-multi-tier-shield",
  title: "Modernising the Shield: Evaluating Pakistan's Integrated Air Defence Architecture",
  standfirst:
    "An exhaustive technical assessment of the HQ-9/P, HQ-16FE, and indigenous radar acquisitions transforming multi-tier airspace denial along the eastern border.",
  label: "ANALYSIS",
  topic: "Defence",
  subtopic: "Air",
  author: {
    name: "Dr. Tariq Mahmud",
    designation: "Senior Strategic Fellow",
    institution: "Centre for Aerospace & Security Studies",
    isExpert: true,
  },
  publishedAt: "16 Oct 2026",
  readMinutes: 9,
  imageUrl: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1600&q=80",
  imageAlt: "Radar dome and aerospace tracking array",
};

const tickerItems = [
  { id: "t1", time: "14:45 PKT", region: "South Asia", country: "Pakistan", city: "Islamabad", headline: "Joint Staff Headquarters concludes high-level bilateral defence dialogue with Turkish delegation", isBreaking: true },
  { id: "t2", time: "13:20 PKT", region: "Central Asia", country: "Tajikistan", city: "Dushanbe", headline: "Regional counter-terrorism coordination council issues joint protocol on border surveillance", isBreaking: false },
  { id: "t3", time: "11:10 PKT", region: "Middle East", country: "Saudi Arabia", city: "Riyadh", headline: "Naval drills 'Sea Guardians IV' commence in northern Arabian Sea", isBreaking: false },
  { id: "t4", time: "09:30 PKT", region: "South Asia", country: "Pakistan", city: "Karachi", headline: "Pakistan Navy commissions fourth Babur-class corvette at Karachi Shipyard", isBreaking: false },
  { id: "t5", time: "Yesterday", region: "Americas", country: "United States", city: "Washington", headline: "DoD annual regional security posture report references South Asian deterrence stability", isBreaking: false },
];

const topStories: ContentItemProps[] = [
  {
    id: "ts-1",
    slug: "nuclear-triad-advancements-second-strike-endurance",
    title: "Second-Strike Endurance: Sea-Based Deterrence and Pakistan's Evolving Nuclear Triad",
    standfirst: "How the Hangor-class AIP submarine acquisition re-anchors strategic stability in the Indian Ocean littoral.",
    label: "ANALYSIS",
    topic: "Strategic Systems",
    author: { name: "Commodore (Retd) Bilal Zafar" },
    publishedAt: "15 Oct 2026",
    readMinutes: 12,
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ts-2",
    slug: "afghanistan-border-security-torkham-chaman-mechanisms",
    title: "Border Fortification & Kinetic Protocols: Stability Across the Durand Line",
    label: "EXPLAINER",
    topic: "National Affairs",
    author: { name: "Zainab Raza" },
    publishedAt: "14 Oct 2026",
    readMinutes: 6,
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ts-3",
    slug: "hypersonic-glide-vehicles-regional-crisis-stability",
    title: "Hypersonic Trajectories and Compressed Reaction Times in South Asian Crisis Scenarios",
    label: "ANALYSIS",
    topic: "Strategic Systems",
    author: { name: "Hamza Shafqat" },
    publishedAt: "13 Oct 2026",
    readMinutes: 8,
    imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
  },
];

const featuredReport: ContentItemProps = {
  id: "rep-1",
  slug: "south-asia-strategic-balance-2026",
  reportNumber: "PSF-R-2026-004",
  title: "The South Asian Military Balance: Conventional Disparity and Asymmetric Countermeasures (2026-2030)",
  standfirst:
    "A 64-page exhaustive quantitative report evaluating orders of battle, doctrine shifts, electronic warfare procurement, and defence budget trajectories across the subcontinental theatre.",
  label: "REPORT",
  author: { name: "PSF Strategic Studies Group" },
  publishedAt: "October 2026",
  pages: 64,
  pdfUrl: "#",
};

const compactReports: ContentItemProps[] = [
  {
    id: "rep-2",
    slug: "cyber-warfare-critical-infrastructure-resilience",
    reportNumber: "PSF-R-2026-003",
    title: "Fortifying Critical Infrastructure: Assessing Cyber Threat Vectors Against Power and Command Grids",
    label: "REPORT",
    author: { name: "Cyber Intelligence Desk" },
    publishedAt: "September 2026",
    pages: 38,
  },
  {
    id: "rep-3",
    slug: "gwadar-maritime-chokepoints-security-review",
    reportNumber: "PSF-R-2026-002",
    title: "Maritime Chokepoints and Coastal Security: Protecting Sea Lines of Communication in the Western Littoral",
    label: "REPORT",
    author: { name: "Maritime Affairs Desk" },
    publishedAt: "August 2026",
    pages: 42,
  },
];

const researchPapers: ContentItemProps[] = [
  {
    id: "res-1",
    slug: "ai-enabled-decision-support-systems-c4isr",
    title: "Algorithmic Escalation Risks: AI-Assisted Target Recognition in High-Intensity Air Operations",
    category: "Research Papers",
    label: "PEER_REVIEWED",
    abstract:
      "This study examines sensor-to-shooter latencies and automated threat prioritization algorithms within tactical command nodes, evaluating false-positive thresholds under electronic jamming conditions.",
    author: { name: "Dr. Ayesha Siddiqui", institution: "National Defence University" },
    publishedAt: "12 Oct 2026",
    doi: "10.5842/psf.2026.04.01",
  },
  {
    id: "res-2",
    slug: "rare-earth-supply-chains-defence-electronics",
    title: "Securing Strategic Mineral Supply Chains for Indigenous Aerospace Manufacturing",
    category: "Policy Briefs",
    label: "PEER_REVIEWED",
    abstract:
      "Assessing vulnerable dependencies on refined titanium and rare-earth magnets essential for avionics, radar assemblies, and precision-guided missile actuators.",
    author: { name: "Prof. Khalid Mehmood", institution: "Institute of Strategic Studies" },
    publishedAt: "08 Oct 2026",
    doi: "10.5842/psf.2026.03.04",
  },
  {
    id: "res-3",
    slug: "ballistic-missile-defence-countermeasures-mirv",
    title: "Penetration Aids and Decoy Trajectories: Penetrating Layered Anti-Ballistic Shields",
    category: "Research Papers",
    label: "PEER_REVIEWED",
    abstract:
      "Quantitative kinematic simulation of exo-atmospheric decoy deployment and fractional orbital maneuvering capabilities under BMD intercept trajectories.",
    author: { name: "Dr. Naveed Akhtar", institution: "Air University" },
    publishedAt: "01 Oct 2026",
    doi: "10.5842/psf.2026.03.02",
  },
];

const mostReadItems = [
  { id: "mr-1", title: "Operation Swift Retort Revisited: Aerial Tactics and Sensor Fusion Lessons", label: "ANALYSIS", slug: "operation-swift-retort-revisited" },
  { id: "mr-2", title: "Pakistan Navy's Jinnah-Class Frigate Programme: Technical Specifications & Weapons Fit", label: "EXPLAINER", slug: "jinnah-class-frigate-programme" },
  { id: "mr-3", title: "Evaluating the S-400 Triumf Performance Against Hypersonic Stand-Off Munitions", label: "INVESTIGATION", slug: "evaluating-s400-performance-standoff" },
  { id: "mr-4", title: "JF-17 Block III AESA Radar and PL-15 Missile Integration: Flight Test Results", label: "NEWS_ANALYSIS", slug: "jf-17-block-3-aesa-pl15-integration" },
  { id: "mr-5", title: "The Battle of Chawinda: Armoured Maneuver Analysis and Lessons for Modern Mechanised Warfare", label: "HISTORY", slug: "battle-of-chawinda-armoured-maneuver" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* ========================================================
          H1. HERO SECTION & NEWSROOM TICKER
          ======================================================== */}
      <section className="relative w-full bg-paper border-b border-line">
        <div className="max-w-container mx-auto px-6 py-6 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Lead Story (Cols 1-8) */}
            <div className="lg:col-span-8 relative min-h-[480px] lg:min-h-[580px] rounded-card overflow-hidden flex flex-col justify-end p-6 md:p-10 border border-green-900 group">
              {/* Cover Image Background */}
              {leadStory.imageUrl && (
                <Image
                  src={leadStory.imageUrl}
                  alt={leadStory.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              )}
              {/* Scrim Overlay: --green-900 0% to 85% at bottom 60% */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(2, 44, 21, 0) 30%, rgba(2, 44, 21, 0.7) 65%, rgba(2, 44, 21, 0.95) 100%)",
                }}
              />

              {/* Lead Content */}
              <div className="relative z-10 text-white max-w-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded-chip text-xs font-semibold uppercase tracking-wider bg-green-500 text-white font-sans">
                    {leadStory.label}
                  </span>
                  <span className="text-white/60 text-xs">·</span>
                  <span className="text-xs font-sans text-white/80 font-medium">
                    {leadStory.topic} / {leadStory.subtopic}
                  </span>
                </div>

                <h1 className="font-serif font-bold text-2xl md:text-4xl lg:text-[40px] leading-[1.15] tracking-tight mb-4 text-white">
                  <Link href={`/articles/${leadStory.slug}`} className="hover:underline">
                    {leadStory.title}
                  </Link>
                </h1>

                <p className="font-serif text-sm md:text-base text-white/85 line-clamp-2 mb-6 leading-relaxed">
                  {leadStory.standfirst}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/20 text-xs font-sans text-white/80">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-white">{leadStory.author.name}</span>
                    <span>·</span>
                    <span>{leadStory.publishedAt}</span>
                    <span>·</span>
                    <span>{leadStory.readMinutes} min read</span>
                  </div>

                  <Link href={`/articles/${leadStory.slug}`}>
                    <Button variant="secondary-dark" size="sm" className="gap-1.5">
                      <span>Read the analysis</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Photo Credit Bottom-Right */}
              <div className="absolute top-4 right-4 z-10 text-[11px] font-sans text-white/60 bg-black/40 px-2 py-0.5 rounded-sm">
                Photo: ISPR / CASS
              </div>
            </div>

            {/* Newsroom Ticker Panel (Cols 9-12) */}
            <div className="lg:col-span-4 bg-white border border-line rounded-card p-6 flex flex-col justify-between shadow-level1">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-line mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <h3 className="font-serif font-bold text-lg text-ink-900">Newsroom</h3>
                  </div>
                  <Link
                    href="/newsroom"
                    className="font-sans text-xs font-medium text-green-700 hover:underline flex items-center gap-0.5"
                  >
                    View all <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Vertical Stream List */}
                <div className="flex flex-col divide-y divide-line">
                  {tickerItems.map((item) => (
                    <article key={item.id} className="py-3 group cursor-pointer">
                      <div className="flex items-center gap-2 text-[11px] font-sans text-ink-500 mb-1">
                        <span className="font-mono text-ink-700 font-semibold">{item.time}</span>
                        <span>·</span>
                        <span className="text-green-700 font-medium">
                          {item.city}, {item.country}
                        </span>
                        {item.isBreaking && (
                          <span className="px-1.5 py-0.2 bg-danger-700 text-white rounded-[2px] font-bold uppercase text-[9px]">
                            Breaking
                          </span>
                        )}
                      </div>
                      <h5 className="font-serif font-semibold text-sm leading-snug text-ink-900 group-hover:text-green-700 transition-colors">
                        <Link href={`/newsroom/${item.id}`} className="no-underline">
                          {item.headline}
                        </Link>
                      </h5>
                    </article>
                  ))}
                </div>
              </div>

              {/* Footer status notice */}
              <div className="pt-3 border-t border-line flex items-center justify-between text-xs font-sans text-ink-400">
                <span>Auto-refreshing live desk</span>
                <span>PKT (UTC+5)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          H2. TOPIC QUICK ACCESS BAR
          ======================================================== */}
      <section className="w-full bg-ivory-50 border-b border-line py-6">
        <div className="max-w-container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Tile 1: Defence */}
            <div className="p-4 bg-white border border-line rounded-card hover:border-green-700 transition-colors">
              <div className="flex items-center gap-2 mb-1.5">
                <Shield className="w-5 h-5 text-green-700" />
                <h4 className="font-serif font-bold text-base text-ink-900">
                  <Link href="/topics/defence">Defence</Link>
                </h4>
              </div>
              <p className="text-xs font-sans text-ink-500 mb-3">184 published items</p>
              <div className="flex flex-wrap gap-1.5">
                <TagChip label="Land" href="/topics/defence/land" />
                <TagChip label="Air" href="/topics/defence/air" />
                <TagChip label="Sea" href="/topics/defence/sea" />
                <TagChip label="Strategic" href="/topics/defence/strategic-systems" />
              </div>
            </div>

            {/* Tile 2: Geopolitics */}
            <div className="p-4 bg-white border border-line rounded-card hover:border-green-700 transition-colors">
              <div className="flex items-center gap-2 mb-1.5">
                <Compass className="w-5 h-5 text-green-700" />
                <h4 className="font-serif font-bold text-base text-ink-900">
                  <Link href="/topics/geopolitics">Geopolitics</Link>
                </h4>
              </div>
              <p className="text-xs font-sans text-ink-500 mb-3">142 published items</p>
              <div className="flex flex-wrap gap-1.5">
                <TagChip label="South Asia" href="/topics/geopolitics/south-asia" />
                <TagChip label="Middle East" href="/topics/geopolitics/middle-east" />
                <TagChip label="Americas" href="/topics/geopolitics/americas" />
                <TagChip label="Afghanistan" href="/topics/geopolitics/afghanistan" />
              </div>
            </div>

            {/* Tile 3: National Affairs */}
            <div className="p-4 bg-white border border-line rounded-card hover:border-green-700 transition-colors">
              <div className="flex items-center gap-2 mb-1.5">
                <Landmark className="w-5 h-5 text-green-700" />
                <h4 className="font-serif font-bold text-base text-ink-900">
                  <Link href="/topics/national-affairs">National Affairs</Link>
                </h4>
              </div>
              <p className="text-xs font-sans text-ink-500 mb-3">96 published items</p>
              <div className="flex flex-wrap gap-1.5">
                <TagChip label="Security" href="/topics/national-affairs/security" />
                <TagChip label="Economy" href="/topics/national-affairs/economy" />
                <TagChip label="Policy" href="/topics/national-affairs/policy" />
              </div>
            </div>

            {/* Tile 4: History */}
            <div className="p-4 bg-white border border-line rounded-card hover:border-green-700 transition-colors">
              <div className="flex items-center gap-2 mb-1.5">
                <History className="w-5 h-5 text-green-700" />
                <h4 className="font-serif font-bold text-base text-ink-900">
                  <Link href="/topics/history">Military History</Link>
                </h4>
              </div>
              <p className="text-xs font-sans text-ink-500 mb-3">78 published items</p>
              <div className="flex flex-wrap gap-1.5">
                <TagChip label="Battles" href="/topics/history/battles-and-operations" />
                <TagChip label="Profiles" href="/topics/history/profiles" />
                <TagChip label="1965 War" href="/topics/history/1965-war" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          H3. TOP STORIES
          ======================================================== */}
      <section className="w-full py-12 bg-paper">
        <div className="max-w-container mx-auto px-6">
          {/* Newspaper 2px ink section rule */}
          <div className="section-rule flex items-center justify-between pt-2">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.1em] text-ink-900">
              Top Stories
            </span>
            <span className="font-sans text-xs text-ink-500">Curated Strategic Briefings</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Large Card (Cols 1-6) */}
            <div className="md:col-span-6">
              <StandardCard item={topStories[0]} className="h-full" />
            </div>

            {/* Standard Cards (Cols 7-12) */}
            <div className="md:col-span-6 flex flex-col gap-6">
              <HorizontalCard item={topStories[1]} />
              <HorizontalCard item={topStories[2]} />
              <div className="p-4 bg-ivory-50 border border-line rounded-card flex items-center justify-between">
                <div>
                  <h5 className="font-serif font-bold text-sm text-ink-900">Explore comprehensive analysis</h5>
                  <p className="text-xs font-sans text-ink-500">Filter through our indexed database of strategic assessments</p>
                </div>
                <Link href="/search?sort=latest">
                  <Button variant="secondary" size="sm">
                    View Archive
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          H6. PSF COVERAGE GLOBE (GLOBAL WATCH PREVIEW)
          ======================================================== */}
      <section className="w-full bg-ivory-50 border-y border-line py-16">
        <div className="max-w-container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Globe Visual Stage (Cols 1-7) */}
            <div className="lg:col-span-7 bg-white border border-line rounded-card p-8 flex flex-col items-center justify-center min-h-[420px] shadow-level1 relative overflow-hidden">
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="font-sans text-xs font-semibold text-ink-700 uppercase tracking-wider">
                  PSF Coverage Globe · Live Spatial Plot
                </span>
              </div>

              {/* Cartographic Graphic Placeholder */}
              <div className="relative w-64 h-64 rounded-full border-2 border-line flex items-center justify-center bg-ivory-50/50 shadow-inner">
                <Globe className="w-44 h-44 text-green-700/30 stroke-[1]" />
                <div className="absolute w-3 h-3 rounded-full bg-danger-700 animate-ping" style={{ top: "35%", left: "62%" }} />
                <div className="absolute w-2.5 h-2.5 rounded-full bg-green-700" style={{ top: "35%", left: "62%" }} />
                <div className="absolute w-2 h-2 rounded-full bg-green-500" style={{ top: "32%", left: "45%" }} />
                <div className="absolute w-2 h-2 rounded-full bg-green-500" style={{ top: "42%", left: "55%" }} />
              </div>

              <div className="mt-6 text-center">
                <p className="font-sans text-xs text-ink-500 max-w-sm">
                  Interactive Three.js cartographic projection mapping 212 reporting locations across South Asia, Central Asia, and the Gulf.
                </p>
              </div>
            </div>

            {/* Right: Stats & Top Locations (Cols 8-12) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="font-sans text-xs font-bold uppercase tracking-[0.08em] text-green-700">
                  Global Watch
                </span>
                <h2 className="font-serif font-bold text-3xl text-ink-900 mt-1 mb-3">
                  Where We Are Reporting
                </h2>
                <p className="font-serif text-sm text-ink-700 leading-relaxed mb-6">
                  Every article, special report, research paper, and newsroom briefing is geocoded to its primary operational theater.
                </p>

                {/* 3 KPI Tiles */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <KpiTile value="212" label="Locations" />
                  <KpiTile value="48" label="This Month" />
                  <KpiTile value="14" label="Countries" />
                </div>

                {/* Top Locations List */}
                <div className="border border-line rounded-card bg-white p-4 mb-6">
                  <span className="text-xs font-sans font-semibold text-ink-900 block mb-2 uppercase tracking-wider">
                    Most Active Reporting Theaters (Last 30 Days)
                  </span>
                  <ul className="text-xs font-sans text-ink-700 divide-y divide-line">
                    <li className="py-2 flex items-center justify-between">
                      <span className="font-medium">Rawalpindi / Islamabad (GHQ)</span>
                      <span className="font-mono text-ink-500">24 items</span>
                    </li>
                    <li className="py-2 flex items-center justify-between">
                      <span className="font-medium">Karachi Littoral & Naval Dockyard</span>
                      <span className="font-mono text-ink-500">18 items</span>
                    </li>
                    <li className="py-2 flex items-center justify-between">
                      <span className="font-medium">Line of Control (Chamb / Kotli)</span>
                      <span className="font-mono text-ink-500">14 items</span>
                    </li>
                    <li className="py-2 flex items-center justify-between">
                      <span className="font-medium">Kabul & Durand Line Crossings</span>
                      <span className="font-mono text-ink-500">11 items</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link href="/global-watch">
                <Button variant="primary" size="default" className="w-full gap-2">
                  <Globe className="w-4 h-4" />
                  <span>Launch Interactive Global Watch</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          H8. REPORTS SECTION
          ======================================================== */}
      <section className="w-full py-16 bg-paper border-b border-line">
        <div className="max-w-container mx-auto px-6">
          <div className="section-rule flex items-center justify-between pt-2">
            <div>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.1em] text-ink-900">
                Special Reports
              </span>
              <p className="font-serif text-sm text-ink-500 italic mt-0.5">
                In-depth strategic assessments from PSF research fellows and defense analysts
              </p>
            </div>
            <Link href="/reports" className="font-sans text-xs font-medium text-green-700 hover:underline">
              All Reports →
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Featured Report (Cols 1-8) */}
            <div className="lg:col-span-8">
              <ReportCard item={featuredReport} isFeatured />
            </div>

            {/* Compact Stack (Cols 9-12) */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <span className="font-sans text-xs font-semibold text-ink-900 uppercase tracking-wider">
                Recent Publications
              </span>
              {compactReports.map((rep) => (
                <ReportCard key={rep.id} item={rep} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          H9. PSF RESEARCH & ACADEMIA
          ======================================================== */}
      <section className="w-full py-16 bg-ivory-50 border-b border-line">
        <div className="max-w-container mx-auto px-6">
          <div className="section-rule flex items-center justify-between pt-2">
            <div>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.1em] text-green-700">
                PSF Research & Peer Review
              </span>
              <p className="font-serif text-sm text-ink-500 italic mt-0.5">
                Scholarly contributions double-blind reviewed by senior defense academics
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/research/peer-review" className="font-sans text-xs font-medium text-ink-700 hover:underline">
                Review Standards
              </Link>
              <span className="text-line">·</span>
              <Link href="/research/submit" className="font-sans text-xs font-medium text-green-700 hover:underline">
                Submit a Manuscript →
              </Link>
            </div>
          </div>

          {/* 3 Research Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {researchPapers.map((paper) => (
              <ResearchCard key={paper.id} item={paper} />
            ))}
          </div>

          {/* 4-Step Academic Publishing Workflow Banner */}
          <div className="bg-white border border-line rounded-card p-8">
            <h4 className="font-serif font-bold text-xl text-ink-900 mb-2">
              Publish Your Strategic Research with PSF
            </h4>
            <p className="font-serif text-sm text-ink-700 mb-6 max-w-3xl leading-relaxed">
              PSF Research operates a rigorous, double-blind peer-review mechanism evaluated by verified professors and defense specialists. All published papers receive digital object identifiers (DOIs) and full open-access distribution under CC BY 4.0.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-line text-xs font-sans">
              <div>
                <span className="font-mono text-green-700 font-bold text-sm block mb-1">01 / SUBMIT</span>
                <p className="text-ink-700 font-medium">Anonymised manuscript upload with structured references</p>
              </div>
              <div>
                <span className="font-mono text-green-700 font-bold text-sm block mb-1">02 / SCREEN</span>
                <p className="text-ink-700 font-medium">Editorial board compliance and formatting review within 7 days</p>
              </div>
              <div>
                <span className="font-mono text-green-700 font-bold text-sm block mb-1">03 / DOUBLE-BLIND</span>
                <p className="text-ink-700 font-medium">Two certified approvers evaluate rigour, evidence and clarity</p>
              </div>
              <div>
                <span className="font-mono text-green-700 font-bold text-sm block mb-1">04 / PUBLISH</span>
                <p className="text-ink-700 font-medium">Open-access distribution, citation indexing, and archive logging</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          H11. MOST READ & EDITORIAL SELECTION
          ======================================================== */}
      <section className="w-full py-16 bg-paper border-b border-line">
        <div className="max-w-container mx-auto px-6">
          <div className="section-rule flex items-center justify-between pt-2">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.1em] text-ink-900">
              Most Read This Week
            </span>
            <span className="font-sans text-xs text-ink-400">Ranked by reader engagement</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {mostReadItems.map((item, index) => (
              <div key={item.id} className="p-4 border-l-2 border-line hover:border-green-700 transition-colors">
                <span className="font-serif font-bold text-3xl text-green-700/80 block mb-2">
                  0{index + 1}
                </span>
                <ContentLabel type={item.label} className="mb-1" />
                <h5 className="font-serif font-semibold text-sm leading-snug text-ink-900 hover:text-green-700 transition-colors">
                  <Link href={`/articles/${item.slug}`}>{item.title}</Link>
                </h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          H14. WRITE FOR PSF BAND
          ======================================================== */}
      <section className="w-full bg-green-900 text-white py-16">
        <div className="max-w-container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Track 1: Article Writer */}
            <div className="p-8 border border-white/20 rounded-card bg-white/5">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-green-200 block mb-2">
                Editorial Contributor Track
              </span>
              <h3 className="font-serif font-bold text-2xl text-white mb-3">
                Write Articles & Strategic Commentary
              </h3>
              <p className="font-serif text-sm text-white/80 leading-relaxed mb-6">
                Contribute analysis, tactical explainers, opinion and military assessments to a readership of defense professionals, policymakers, and strategic analysts.
              </p>
              <Link href="/join/article">
                <Button variant="secondary-dark" size="default">
                  Apply as an Article Writer
                </Button>
              </Link>
            </div>

            {/* Track 2: Research Scholar */}
            <div className="p-8 border border-white/20 rounded-card bg-white/5">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-green-200 block mb-2">
                Academic Research Track
              </span>
              <h3 className="font-serif font-bold text-2xl text-white mb-3">
                Publish Peer-Reviewed Research
              </h3>
              <p className="font-serif text-sm text-white/80 leading-relaxed mb-6">
                Submit academic manuscripts and policy briefs for double-blind peer review. Retain your copyright under open-access CC BY 4.0 terms with dedicated DOI indexing.
              </p>
              <Link href="/join/research">
                <Button variant="secondary-dark" size="default">
                  Apply as a Research Scholar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

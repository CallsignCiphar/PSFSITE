import React from "react";
import Link from "next/link";
import {
  Shield,
  Globe,
  Landmark,
  Clock,
  Plane,
  Anchor,
  Cpu,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Strategic Desks & Topics Hub | Pakistan Strategic Forum",
  description: "Browse specialised strategic research desks, military domains, geopolitics, and defence intelligence at Pakistan Strategic Forum.",
};

const TOPIC_DESKS = [
  {
    slug: "defence",
    name: "Defence & Strategic Forces",
    icon: Shield,
    articleCount: 142,
    leadEditor: "Dr. Tariq Niazi",
    description: "Multi-domain warfare doctrine, nuclear deterrence stability, force posture assessments, and ballistic missile architecture.",
    subtopics: ["Air Defence", "Nuclear Triad", "Armoured Warfare", "Deterrence Dynamics"],
  },
  {
    slug: "geopolitics",
    name: "Regional Geopolitics & Grand Strategy",
    icon: Globe,
    articleCount: 98,
    leadEditor: "Ambassador (Retd) Jalil Jilani",
    description: "South Asian balance of power, China-Pakistan Strategic Partnership, Middle Eastern diplomatic realignments, and Central Asian connectivity.",
    subtopics: ["Indo-Pacific", "CPEC & BRI", "Iran-Gulf Relations", "Central Asia"],
  },
  {
    slug: "national-affairs",
    name: "National Security & Governance",
    icon: Landmark,
    articleCount: 76,
    leadEditor: "Ayesha Siddiqui",
    description: "Counter-terrorism operations, border management mechanisms, internal stability, constitutional security law, and civil-military relations.",
    subtopics: ["Counter-Terrorism", "Border Security", "Internal Stability", "Policy Briefs"],
  },
  {
    slug: "history",
    name: "Military & Strategic History",
    icon: Clock,
    articleCount: 64,
    leadEditor: "Air Commodore (Retd) Kaiser Tufail",
    description: "Tactical and operational analyses of 1965, 1971, Kargil, and 2019 aerial engagements, drawing upon declassified records and oral histories.",
    subtopics: ["1965 Air War", "1971 Maritime Battles", "Kargil Operations", "Operation Swift Retort"],
  },
  {
    slug: "aerospace",
    name: "Aerospace Systems & Air Power",
    icon: Plane,
    articleCount: 88,
    leadEditor: "Hamza Ali",
    description: "Combat aircraft avionics, beyond-visual-range air warfare, unmanned aerial combat systems (UCAVs), and space-based remote sensing.",
    subtopics: ["JF-17 Block III", "J-10CE Operations", "Drone Swarms", "Electronic Warfare"],
  },
  {
    slug: "maritime",
    name: "Maritime Security & Naval Warfare",
    icon: Anchor,
    articleCount: 52,
    leadEditor: "Commodore (Retd) Bilal Zafar",
    description: "Indian Ocean naval balance, subsurface AIP submarine capabilities, maritime anti-access/area-denial (A2/AD), and Gwadar port security.",
    subtopics: ["Hangor-Class Subs", "Type 054A/P Frigates", "Gwadar Defense", "A2/AD Warfare"],
  },
  {
    slug: "cyber",
    name: "Cyber, Space & Emerging Technologies",
    icon: Cpu,
    articleCount: 45,
    leadEditor: "Dr. Farooq Malik",
    description: "Artificial intelligence in command-and-control, space situational awareness, algorithmic surveillance, and offensive/defensive cyber operations.",
    subtopics: ["AI C4ISR", "Satellite Imagery", "Cyber Warfare", "Quantum Cryptography"],
  },
];

export default function TopicsHubPage() {
  return (
    <div className="w-full bg-paper py-12 font-sans">
      <div className="max-w-container mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="max-w-3xl pb-6 border-b border-line">
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-green-700 block mb-1">
            Taxonomy & Editorial Desks
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-ink-900 mb-3">
            Strategic Research Desks
          </h1>
          <p className="font-serif text-base text-ink-600 leading-relaxed">
            PSF research is structured across seven dedicated analytical desks. Each desk is led by accredited
            military analysts, academic fellows, and former diplomatic practitioners.
          </p>
        </div>

        {/* Desks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOPIC_DESKS.map((desk) => {
            const Icon = desk.icon;
            return (
              <div
                key={desk.slug}
                className="bg-white border border-line rounded-sm p-6 flex flex-col justify-between hover:border-green-700 transition-colors shadow-xs group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-sm bg-green-50 border border-green-200 flex items-center justify-center text-green-800">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-ink-500 font-semibold">
                      {desk.articleCount} Monographs
                    </span>
                  </div>

                  <h2 className="font-serif font-bold text-xl text-ink-900 group-hover:text-green-700 transition-colors mb-2">
                    {desk.name}
                  </h2>
                  <p className="text-xs text-ink-600 leading-relaxed mb-4">
                    {desk.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <span className="text-[10px] uppercase font-bold text-ink-400 tracking-wider block">
                      Active Sub-Desks:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {desk.subtopics.map((sub) => (
                        <span
                          key={sub}
                          className="px-2 py-0.5 bg-ivory-100 border border-line rounded-sm text-[11px] text-ink-700 font-medium"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-line flex items-center justify-between">
                  <span className="text-[11px] text-ink-500">
                    Lead: <strong>{desk.leadEditor}</strong>
                  </span>
                  <Link href={`/topics/${desk.slug}`}>
                    <Button variant="outline" size="sm">
                      <span>Explore Desk</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

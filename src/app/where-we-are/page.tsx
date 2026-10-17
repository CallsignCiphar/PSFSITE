import React from "react";
import Link from "next/link";
import {
  Globe,
  MapPin,
  Mail,
  Share2,
  ExternalLink,
  Shield,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Where We Are & Official Channels | Pakistan Strategic Forum",
  description: "Official institutional presence, research liaison desks, and verified broadcast channels of Pakistan Strategic Forum.",
};

const channels = [
  { platform: "X (Twitter)", handle: "@PakStratForum", url: "https://x.com/PakStratForum", followers: "145K+", note: "Primary real-time strategic wire and publication announcements" },
  { platform: "YouTube", handle: "Pakistan Strategic Forum", url: "https://youtube.com/@PakStratForum", followers: "92K+", note: "Documentary deep-dives, defence analysis video lectures" },
  { platform: "Telegram", handle: "t.me/PSF_Intelligence", url: "https://t.me/PSF_Intelligence", followers: "28K+", note: "Encrypted intelligence wire for breaking alerts" },
  { platform: "LinkedIn", handle: "Pakistan Strategic Forum", url: "https://linkedin.com/company/pakstrategic", followers: "34K+", note: "Academic recruitment and corporate strategic partnerships" },
  { platform: "WhatsApp Channel", handle: "PSF Strategic Wire", url: "https://whatsapp.com/channel/psf", followers: "18K+", note: "Direct daily dispatch of featured monographs" },
];

const locations = [
  {
    city: "Islamabad (Headquarters)",
    address: "Strategic Studies Complex, Constitution Avenue, G-5/1",
    focus: "Executive Directorate, Strategic Policy & Research Journal Board",
    email: "hq@forumstrategic.com",
  },
  {
    city: "Rawalpindi",
    address: "Aerospace & Defence Liaison Desk, Westridge",
    focus: "Military Technology, Air Power & Sensor Fusion Research",
    email: "defence@forumstrategic.com",
  },
  {
    city: "Karachi",
    address: "Maritime Security Center, Clifton Block 4",
    focus: "Indian Ocean Littoral Studies & Naval Doctrine",
    email: "maritime@forumstrategic.com",
  },
  {
    city: "Lahore",
    address: "Geopolitical & Economic Research Wing, Gulberg III",
    focus: "Central Asia, CPEC & Strategic Infrastructure",
    email: "geopolitics@forumstrategic.com",
  },
];

export default function WhereWeArePage() {
  return (
    <div className="w-full bg-paper py-12 font-sans">
      <div className="max-w-container mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="max-w-3xl pb-6 border-b border-line">
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-green-700 block mb-1">
            Global Footprint & Broadcast Wire
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-ink-900 mb-2">
            Where We Are & Official Presences
          </h1>
          <p className="font-serif text-base text-ink-600 leading-relaxed">
            Pakistan Strategic Forum maintains active research desks across major strategic hubs in Pakistan
            alongside verified real-time digital communication channels.
          </p>
        </div>

        {/* Official Channels Grid */}
        <div className="space-y-4">
          <h2 className="font-serif font-bold text-2xl text-ink-900">
            Verified Digital Channels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {channels.map((c) => (
              <div
                key={c.platform}
                className="p-5 bg-white border border-line rounded-sm flex flex-col justify-between space-y-3 hover:border-green-700 transition-colors shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-ink-900 text-sm">{c.platform}</span>
                    <span className="px-2 py-0.5 bg-green-50 text-green-800 rounded-sm font-mono text-[10px] font-bold">
                      {c.followers}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-ink-500 block mb-2">{c.handle}</span>
                  <p className="text-xs text-ink-600 leading-relaxed">{c.note}</p>
                </div>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 hover:text-green-800 pt-2 border-t border-line"
                >
                  <span>Connect to Channel</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Physical Research Desks */}
        <div className="space-y-4 pt-6 border-t border-line">
          <h2 className="font-serif font-bold text-2xl text-ink-900">
            Research Liaison Offices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {locations.map((loc) => (
              <div
                key={loc.city}
                className="p-5 bg-white border border-line rounded-sm space-y-2"
              >
                <div className="flex items-center gap-2 text-ink-900">
                  <MapPin className="w-4 h-4 text-green-700 shrink-0" />
                  <h3 className="font-serif font-bold text-base">{loc.city}</h3>
                </div>
                <p className="text-xs text-ink-700">{loc.address}</p>
                <p className="text-xs text-ink-500 italic">Mandate: {loc.focus}</p>
                <div className="pt-2 border-t border-line flex items-center gap-1.5 text-xs text-ink-600">
                  <Mail className="w-3.5 h-3.5 text-ink-400" />
                  <a href={`mailto:${loc.email}`} className="font-mono hover:text-green-700">
                    {loc.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

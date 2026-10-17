"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Globe as GlobeIcon,
  Filter,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Play,
  Pause,
  List,
  Search,
  X,
  ChevronRight,
  Share2,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentLabel } from "@/components/ui/content-label";
import { TagChip } from "@/components/ui/tag-chip";

// Sample locations data for demonstration
interface LocationPoint {
  id: string;
  city: string;
  country: string;
  region: string;
  lat: number;
  lng: number;
  itemsCount: number;
  recency: "BREAKING" | "RECENT" | "OLDER";
  statusLayer?: "ACTIVE_CONFLICT" | "HIGH_TENSION" | "WATCH";
  statusNote?: string;
  latestItem: {
    title: string;
    label: string;
    date: string;
    slug: string;
    type: string;
  };
}

const sampleLocations: LocationPoint[] = [
  {
    id: "loc-1",
    city: "Islamabad",
    country: "Pakistan",
    region: "South Asia",
    lat: 33.6844,
    lng: 73.0479,
    itemsCount: 42,
    recency: "RECENT",
    latestItem: {
      title: "Modernising the Shield: Evaluating Pakistan's Integrated Air Defence Architecture",
      label: "ANALYSIS",
      date: "16 Oct 2026",
      slug: "pakistan-integrated-air-defence-modernisation-multi-tier-shield",
      type: "Article",
    },
  },
  {
    id: "loc-2",
    city: "Rawalpindi",
    country: "Pakistan",
    region: "South Asia",
    lat: 33.5651,
    lng: 73.0169,
    itemsCount: 28,
    recency: "BREAKING",
    latestItem: {
      title: "Joint Staff Headquarters concludes high-level bilateral defence dialogue",
      label: "BREAKING",
      date: "16 Oct 2026",
      slug: "jshq-bilateral-defence-dialogue",
      type: "Newsroom",
    },
  },
  {
    id: "loc-3",
    city: "Karachi",
    country: "Pakistan",
    region: "South Asia",
    lat: 24.8607,
    lng: 67.0011,
    itemsCount: 22,
    recency: "RECENT",
    latestItem: {
      title: "Pakistan Navy commissions fourth Babur-class corvette at Karachi Shipyard",
      label: "NEWS",
      date: "16 Oct 2026",
      slug: "fourth-babur-class-corvette-commissioned",
      type: "Newsroom",
    },
  },
  {
    id: "loc-4",
    city: "Kabul",
    country: "Afghanistan",
    region: "South Asia",
    lat: 34.5553,
    lng: 69.2075,
    itemsCount: 16,
    recency: "RECENT",
    statusLayer: "HIGH_TENSION",
    statusNote: "Elevated border security monitoring along Durand Line crossing corridors.",
    latestItem: {
      title: "Border Fortification & Kinetic Protocols: Stability Across the Durand Line",
      label: "EXPLAINER",
      date: "14 Oct 2026",
      slug: "afghanistan-border-security-torkham-chaman-mechanisms",
      type: "Article",
    },
  },
  {
    id: "loc-5",
    city: "Riyadh",
    country: "Saudi Arabia",
    region: "Middle East",
    lat: 24.7136,
    lng: 46.6753,
    itemsCount: 9,
    recency: "RECENT",
    latestItem: {
      title: "Naval drills 'Sea Guardians IV' commence in northern Arabian Sea",
      label: "NEWS",
      date: "15 Oct 2026",
      slug: "sea-guardians-4-drills-commence",
      type: "Newsroom",
    },
  },
];

const topCountries = [
  { name: "Pakistan", count: 184, percentage: 80 },
  { name: "Afghanistan", count: 48, percentage: 40 },
  { name: "Saudi Arabia", count: 26, percentage: 22 },
  { name: "Turkey", count: 21, percentage: 18 },
  { name: "China", count: 19, percentage: 16 },
  { name: "Iran", count: 15, percentage: 12 },
  { name: "Azerbaijan", count: 12, percentage: 10 },
  { name: "United States", count: 11, percentage: 9 },
  { name: "Tajikistan", count: 8, percentage: 7 },
  { name: "Qatar", count: 6, percentage: 5 },
];

export default function GlobalWatchPage() {
  const [filterPanelOpen, setFilterPanelOpen] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<LocationPoint | null>(null);
  const [activeDatePreset, setActiveDatePreset] = useState("90d");
  const [viewAsList, setViewAsList] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("All");

  return (
    <div className="w-full flex flex-col bg-paper">
      {/* ========================================================
          1. HEADER STRIP
          ======================================================== */}
      <section className="w-full bg-ivory-50 border-b border-line py-8">
        <div className="max-w-container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <h1 className="font-serif font-bold text-3xl md:text-4xl text-ink-900">Global Watch</h1>
              </div>
              <p className="font-serif text-sm text-ink-700">
                Spatial defense intelligence mapping every PSF article, report, paper, and news briefing to its operational theater.
              </p>
            </div>

            {/* Live Stats Row */}
            <div className="flex items-center gap-6 border-l border-line pl-6 text-xs font-sans">
              <div>
                <span className="font-mono text-2xl font-bold text-ink-900 block tabular-nums">212</span>
                <span className="text-ink-500">Locations Mapped</span>
              </div>
              <div>
                <span className="font-mono text-2xl font-bold text-green-700 block tabular-nums">14</span>
                <span className="text-ink-500">Strategic Regions</span>
              </div>
              <div>
                <span className="font-mono text-2xl font-bold text-ink-900 block tabular-nums">48</span>
                <span className="text-ink-500">Items (30d)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. GLOBE STAGE (DESKTOP)
          ======================================================== */}
      <section className="relative w-full h-[72vh] min-h-[580px] bg-paper border-b border-line overflow-hidden flex">
        {/* Left Filter Panel (Collapsible, Cols 1-3) */}
        {filterPanelOpen ? (
          <aside className="w-80 h-full border-r border-line bg-white p-5 flex flex-col justify-between shrink-0 overflow-y-auto z-20">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-green-700" />
                  <span className="font-sans font-semibold text-xs uppercase tracking-wider text-ink-900">
                    Filters & Layers
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setFilterPanelOpen(false)}
                  className="text-ink-400 hover:text-ink-700"
                  title="Collapse panel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Date Presets */}
              <div>
                <label className="block text-xs font-sans font-medium text-ink-700 mb-2">
                  Date Range
                </label>
                <div className="grid grid-cols-3 gap-1 text-xs font-sans">
                  {["7d", "30d", "90d", "12m", "All"].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setActiveDatePreset(preset)}
                      className={`h-7 rounded-sm border transition-colors ${
                        activeDatePreset === preset
                          ? "bg-green-700 text-white border-green-700 font-semibold"
                          : "bg-ivory-50 text-ink-700 border-line hover:border-ink-500"
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Type Toggles */}
              <div>
                <label className="block text-xs font-sans font-medium text-ink-700 mb-2">
                  Content Types
                </label>
                <div className="space-y-2 text-xs font-sans text-ink-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded-sm text-green-700" />
                    <span>Articles & Analysis</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded-sm text-green-700" />
                    <span>Special Reports</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded-sm text-green-700" />
                    <span>Peer-Reviewed Research</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded-sm text-green-700" />
                    <span>Newsroom Wire</span>
                  </label>
                </div>
              </div>

              {/* Layer Toggles */}
              <div className="pt-2 border-t border-line">
                <label className="block text-xs font-sans font-medium text-ink-700 mb-2">
                  Spatial Layers
                </label>
                <div className="space-y-2 text-xs font-sans text-ink-700">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>PSF Coverage Points</span>
                    <input type="checkbox" defaultChecked className="rounded-sm text-green-700" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Tension & Conflict Layer</span>
                    <input type="checkbox" defaultChecked className="rounded-sm text-green-700" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Country Borders</span>
                    <input type="checkbox" defaultChecked className="rounded-sm text-green-700" />
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-line text-xs font-sans text-ink-500">
              <button
                type="button"
                onClick={() => {
                  setActiveDatePreset("90d");
                }}
                className="text-green-700 hover:underline"
              >
                Reset all filters
              </button>
            </div>
          </aside>
        ) : (
          <button
            type="button"
            onClick={() => setFilterPanelOpen(true)}
            className="absolute top-4 left-4 z-20 h-9 px-3 bg-white border border-line rounded-button shadow-level1 flex items-center gap-2 text-xs font-sans font-medium text-ink-700 hover:text-green-700"
          >
            <Filter className="w-3.5 h-3.5 text-green-700" />
            <span>Open Filters</span>
          </button>
        )}

        {/* Center: Globe Viewport or Accessible List */}
        <div className="flex-1 relative bg-ivory-50/40 flex items-center justify-center">
          {!viewAsList ? (
            /* Cartographic Globe Stage */
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Globe Rendering Canvas representation */}
              <div className="relative w-[480px] h-[480px] rounded-full border-2 border-line bg-paper shadow-level2 flex items-center justify-center overflow-hidden">
                <GlobeIcon className="w-96 h-96 text-green-700/20 stroke-[0.8]" />

                {/* Plot Sample Locations */}
                {sampleLocations.map((loc, i) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setSelectedLocation(loc)}
                    className="absolute group focus:outline-none"
                    style={{
                      top: `${35 + (i * 12) - (i === 4 ? 20 : 0)}%`,
                      left: `${45 + (i * 8)}%`,
                    }}
                    title={`${loc.city}, ${loc.country} (${loc.itemsCount} items)`}
                  >
                    <div className="relative flex items-center justify-center">
                      {loc.recency === "BREAKING" ? (
                        <>
                          <span className="absolute w-4 h-4 rounded-full bg-danger-700/40 animate-ping" />
                          <span className="w-3 h-3 rounded-full bg-danger-700 border border-white shadow-sm" />
                        </>
                      ) : (
                        <span className="w-3 h-3 rounded-full bg-green-700 border border-white shadow-sm transition-transform group-hover:scale-125" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Overlaid Globe Controls Bottom-Right */}
              <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-white border border-line rounded-button p-1 shadow-level1 z-10">
                <button
                  type="button"
                  className="p-2 text-ink-700 hover:bg-ivory-100 rounded-sm"
                  title="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-2 text-ink-700 hover:bg-ivory-100 rounded-sm"
                  title="Zoom out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-2 text-ink-700 hover:bg-ivory-100 rounded-sm"
                  title="Reset camera view"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <div className="h-4 w-[1px] bg-line mx-1" />
                <button
                  type="button"
                  onClick={() => setViewAsList(true)}
                  className="px-2.5 py-1 text-xs font-sans font-medium text-ink-700 hover:bg-ivory-100 rounded-sm flex items-center gap-1.5"
                  title="Accessible table list view"
                >
                  <List className="w-3.5 h-3.5" />
                  <span>List View</span>
                </button>
              </div>
            </div>
          ) : (
            /* Accessible Table View Alternative (FRD FR-GLB-08) */
            <div className="w-full h-full p-8 overflow-y-auto bg-white">
              <div className="flex items-center justify-between pb-4 border-b border-line mb-6">
                <div>
                  <h3 className="font-serif font-bold text-xl text-ink-900">
                    Location Coverage Index
                  </h3>
                  <p className="font-serif text-xs text-ink-500">
                    Accessible tabular index of all published locations.
                  </p>
                </div>
                <Button variant="secondary" size="sm" onClick={() => setViewAsList(false)}>
                  Switch to 3D Globe
                </Button>
              </div>

              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-line text-ink-500 uppercase tracking-wider">
                    <th className="py-2.5 font-semibold">City & Region</th>
                    <th className="py-2.5 font-semibold">Country</th>
                    <th className="py-2.5 font-semibold">Items</th>
                    <th className="py-2.5 font-semibold">Latest Headline</th>
                    <th className="py-2.5 text-right font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {sampleLocations.map((loc) => (
                    <tr key={loc.id} className="hover:bg-ivory-50">
                      <td className="py-3 font-semibold text-ink-900">{loc.city}</td>
                      <td className="py-3 text-ink-700">{loc.country}</td>
                      <td className="py-3 font-mono font-bold text-green-700">{loc.itemsCount}</td>
                      <td className="py-3 text-ink-900 max-w-md truncate">
                        {loc.latestItem.title}
                      </td>
                      <td className="py-3 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedLocation(loc)}
                          className="text-green-700"
                        >
                          View Coverage
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Right Location Drawer (480px) */}
          {selectedLocation && (
            <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[460px] bg-white border-l border-line shadow-level3 p-6 flex flex-col justify-between z-30 overflow-y-auto">
              <div>
                {/* Header */}
                <div className="flex items-start justify-between pb-4 border-b border-line mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-sans text-ink-500 font-medium">
                        {selectedLocation.region}
                      </span>
                      {selectedLocation.statusLayer && (
                        <span className="px-1.5 py-0.5 rounded-chip text-[10px] font-bold uppercase bg-warning-50 text-warning-700 border border-warning-700/20">
                          {selectedLocation.statusLayer.replace("_", " ")}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif font-bold text-2xl text-ink-900">
                      {selectedLocation.city}, {selectedLocation.country}
                    </h3>
                    <p className="font-sans text-xs text-green-700 font-semibold mt-0.5">
                      {selectedLocation.itemsCount} items published from this operational theater
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedLocation(null)}
                    className="p-1 text-ink-400 hover:text-ink-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Status Layer Note (if any) */}
                {selectedLocation.statusNote && (
                  <div className="p-3 bg-warning-50 border border-warning-700/20 rounded-card mb-4 text-xs font-serif text-ink-700 flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-warning-700 shrink-0 mt-0.5" />
                    <span>{selectedLocation.statusNote}</span>
                  </div>
                )}

                {/* Latest Item Card */}
                <div className="mb-4">
                  <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-ink-500 block mb-2">
                    Featured Dispatch
                  </span>
                  <div className="p-4 bg-ivory-50 border border-line rounded-card">
                    <ContentLabel type={selectedLocation.latestItem.label} className="mb-1" />
                    <h4 className="font-serif font-bold text-base text-ink-900 mb-2 leading-snug">
                      <Link
                        href={`/articles/${selectedLocation.latestItem.slug}`}
                        className="hover:text-green-700"
                      >
                        {selectedLocation.latestItem.title}
                      </Link>
                    </h4>
                    <div className="flex items-center justify-between text-xs font-sans text-ink-500 pt-2 border-t border-line">
                      <span>{selectedLocation.latestItem.date}</span>
                      <span className="text-green-700 font-medium">Read Article →</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="pt-4 border-t border-line flex items-center justify-between text-xs font-sans">
                <Link
                  href={`/topics?country=${encodeURIComponent(selectedLocation.country)}`}
                  className="font-medium text-green-700 hover:underline flex items-center gap-1"
                >
                  <span>All coverage in {selectedLocation.country}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={() => alert("Link copied to clipboard!")}
                  className="p-2 text-ink-500 hover:text-ink-900 rounded-sm flex items-center gap-1"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          3. LEGEND & BORDERS DISCLAIMER
          ======================================================== */}
      <section className="w-full bg-ivory-100 border-b border-line py-4 text-xs font-sans text-ink-500">
        <div className="max-w-container mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Legend */}
          <div className="flex items-center gap-6">
            <span className="font-semibold text-ink-900">Map Legend:</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-700" />
              <span>≤ 7 Days</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span>8–30 Days</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-danger-700 animate-pulse" />
              <span>Breaking (Last 48h)</span>
            </div>
          </div>

          {/* Borders Disclaimer (FRD Appendix A.17) */}
          <div className="text-[11px] font-serif text-ink-400 italic max-w-xl">
            Boundaries, names and designations on PSF maps are illustrative and do not imply endorsement. Jammu and Kashmir is a disputed territory whose final status is to be determined in accordance with relevant UN Security Council resolutions.
          </div>
        </div>
      </section>

      {/* ========================================================
          4. REGION-WISE COVERAGE & TOP COUNTRIES
          ======================================================== */}
      <section className="w-full py-16 bg-paper">
        <div className="max-w-container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Region Theaters (Cols 1-8) */}
            <div className="lg:col-span-8">
              <div className="section-rule flex items-center justify-between pt-2">
                <span className="font-sans text-xs font-bold uppercase tracking-[0.1em] text-ink-900">
                  Regional Coverage Theaters
                </span>
                <span className="font-sans text-xs text-ink-500">10 Analytical Desks</span>
              </div>

              {/* Region Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {["All", "South Asia", "Middle East", "Central Asia", "East Asia", "Americas"].map((reg) => (
                  <button
                    key={reg}
                    type="button"
                    onClick={() => setSelectedRegion(reg)}
                    className={`h-7 px-3 text-xs font-sans rounded-chip border transition-colors ${
                      selectedRegion === reg
                        ? "bg-green-700 text-white border-green-700 font-semibold"
                        : "bg-ivory-50 text-ink-700 border-line hover:border-ink-500"
                    }`}
                  >
                    {reg}
                  </button>
                ))}
              </div>

              {/* Region Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sampleLocations.map((loc) => (
                  <div
                    key={loc.id}
                    className="p-5 border border-line rounded-card bg-white hover:border-green-700 transition-colors cursor-pointer"
                    onClick={() => setSelectedLocation(loc)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif font-bold text-base text-ink-900">{loc.city}</span>
                      <span className="font-mono text-xs text-green-700 font-bold">{loc.itemsCount} items</span>
                    </div>
                    <p className="font-serif text-xs text-ink-700 line-clamp-2 leading-relaxed mb-3">
                      {loc.latestItem.title}
                    </p>
                    <div className="flex items-center justify-between text-[11px] font-sans text-ink-400 pt-2 border-t border-line">
                      <span>{loc.country}</span>
                      <span className="text-green-700 font-medium">Inspect Location →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top 10 Countries Ranked (Cols 9-12) */}
            <div className="lg:col-span-4">
              <div className="section-rule flex items-center justify-between pt-2">
                <span className="font-sans text-xs font-bold uppercase tracking-[0.1em] text-ink-900">
                  Most Covered Nations
                </span>
                <span className="font-sans text-xs text-ink-400">All-time</span>
              </div>

              <div className="space-y-3.5 bg-ivory-50 border border-line rounded-card p-5">
                {topCountries.map((c, idx) => (
                  <div key={c.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-sans">
                      <span className="font-medium text-ink-900">
                        {idx + 1}. {c.name}
                      </span>
                      <span className="font-mono text-ink-500 font-semibold">{c.count}</span>
                    </div>
                    {/* Horizontal Bar (House Chart Style) */}
                    <div className="w-full h-1.5 bg-line rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-700 rounded-full"
                        style={{ width: `${c.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

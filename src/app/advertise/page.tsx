"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Megaphone,
  BarChart3,
  Users,
  Target,
  Shield,
  Send,
  CheckCircle2,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdvertisePage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    brandName: "",
    contactName: "",
    contactEmail: "",
    organizationType: "Defence Industry Contractor",
    targetSlot: "HOME_TOP_LEADERBOARD",
    estimatedFlightDuration: "1 Month (30 Days)",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate booking RFP dispatch into Unified Inbox
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="w-full bg-paper py-12 font-sans">
      <div className="max-w-container mx-auto px-6 space-y-12">
        {/* Hero Section */}
        <div className="max-w-3xl pb-6 border-b border-line">
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-green-700 block mb-1">
            Commercial & Institutional Sponsorship
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-ink-900 mb-3">
            Partner With Pakistan Strategic Forum
          </h1>
          <p className="font-serif text-base text-ink-600 leading-relaxed">
            Reach key decision-makers across national security, defence procurement, aerospace engineering,
            diplomatic missions, and military academic institutions across South Asia and beyond.
          </p>
        </div>

        {/* Audience Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 bg-white border border-line rounded-sm">
            <span className="text-[10px] uppercase font-bold tracking-wider text-ink-400 block mb-1">
              Monthly Verified Readers
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-serif font-bold text-ink-900">180K+</span>
              <Users className="w-4 h-4 text-green-700" />
            </div>
            <span className="text-[11px] text-ink-500 mt-1 block">
              74% Desktop / Professional Research
            </span>
          </div>

          <div className="p-5 bg-white border border-line rounded-sm">
            <span className="text-[10px] uppercase font-bold tracking-wider text-ink-400 block mb-1">
              Defence Leadership Reach
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-serif font-bold text-ink-900">42%</span>
              <Shield className="w-4 h-4 text-green-700" />
            </div>
            <span className="text-[11px] text-ink-500 mt-1 block">
              Tri-services, MoDP & Attachés
            </span>
          </div>

          <div className="p-5 bg-white border border-line rounded-sm">
            <span className="text-[10px] uppercase font-bold tracking-wider text-ink-400 block mb-1">
              Avg. Time Per Article
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-serif font-bold text-ink-900">4m 18s</span>
              <BarChart3 className="w-4 h-4 text-green-700" />
            </div>
            <span className="text-[11px] text-ink-500 mt-1 block">
              High-engagement monograph reading
            </span>
          </div>

          <div className="p-5 bg-white border border-line rounded-sm">
            <span className="text-[10px] uppercase font-bold tracking-wider text-ink-400 block mb-1">
              Global Geographies
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-serif font-bold text-ink-900">45+</span>
              <Target className="w-4 h-4 text-green-700" />
            </div>
            <span className="text-[11px] text-ink-500 mt-1 block">
              Pakistan, GCC, China, UK, USA
            </span>
          </div>
        </div>

        {/* RFP / Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white border border-line rounded-sm p-6 space-y-4 text-xs">
            <div className="border-b border-line pb-3">
              <h2 className="font-serif font-bold text-lg text-ink-900">
                Commercial Sponsorship Inquiry (RFP)
              </h2>
              <p className="text-ink-500">
                Submit campaign specifications to our Partnerships Desk for custom placement flight scheduling.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-green-50 border border-green-200 text-green-900 rounded-sm text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-green-700 mx-auto" />
                <h3 className="font-serif font-bold text-base">Inquiry Submitted Successfully</h3>
                <p className="text-xs text-green-800 max-w-md mx-auto">
                  Thank you. Your RFP has been logged in our Commercial Partnerships queue.
                  Our team will reach out within 24 hours with rate cards and available flight dates.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-ink-700 font-semibold mb-1">
                      Brand / Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.brandName}
                      onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                      placeholder="e.g. PAC Kamra / Global Aerospace"
                      className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700"
                    />
                  </div>

                  <div>
                    <label className="block text-ink-700 font-semibold mb-1">
                      Organization Type *
                    </label>
                    <select
                      value={formData.organizationType}
                      onChange={(e) => setFormData({ ...formData, organizationType: e.target.value })}
                      className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700"
                    >
                      <option>Defence Industry Contractor</option>
                      <option>Aerospace & Avionics Manufacturer</option>
                      <option>Academic or Strategic Think Tank</option>
                      <option>Cybersecurity & Telecommunications</option>
                      <option>Logistics & Maritime Enterprise</option>
                      <option>Other Institutional Sponsor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-ink-700 font-semibold mb-1">
                      Contact Representative Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700"
                    />
                  </div>

                  <div>
                    <label className="block text-ink-700 font-semibold mb-1">
                      Corporate / Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 font-mono focus:outline-none focus:border-green-700"
                    />
                  </div>

                  <div>
                    <label className="block text-ink-700 font-semibold mb-1">
                      Target Placement Slot
                    </label>
                    <select
                      value={formData.targetSlot}
                      onChange={(e) => setFormData({ ...formData, targetSlot: e.target.value })}
                      className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700 font-mono text-xs"
                    >
                      <option value="HOME_TOP_LEADERBOARD">Home Top Leaderboard (728×90 / 300×250)</option>
                      <option value="ARTICLE_MID_INLINE">Article Inline Sponsor (728×90)</option>
                      <option value="REPORTS_SIDEBAR_STICKY">Reports Sidebar Sticky (300×600)</option>
                      <option value="NEWSROOM_TOP_RIBBON">Newsroom Wire Ribbon (970×90)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-ink-700 font-semibold mb-1">
                      Estimated Flight Duration
                    </label>
                    <select
                      value={formData.estimatedFlightDuration}
                      onChange={(e) => setFormData({ ...formData, estimatedFlightDuration: e.target.value })}
                      className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700"
                    >
                      <option>1 Week (7 Days)</option>
                      <option>2 Weeks (14 Days)</option>
                      <option>1 Month (30 Days)</option>
                      <option>Quarterly Partnership (90 Days)</option>
                      <option>Annual Retainer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-ink-700 font-semibold mb-1">
                    Campaign Scope & Objectives
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your desired dates, target audience segments, and creative requirements..."
                    className="w-full p-3 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700 text-xs"
                  />
                </div>

                <div className="flex justify-end pt-2 border-t border-line">
                  <Button variant="primary" type="submit" disabled={submitting}>
                    <Send className="w-3.5 h-3.5 mr-1.5" />
                    <span>{submitting ? "Submitting Inquiry..." : "Submit Sponsorship RFP"}</span>
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Guidelines Sidebar */}
          <div className="lg:col-span-5 space-y-4 text-xs">
            <div className="p-5 bg-white border border-line rounded-sm space-y-3">
              <h3 className="font-serif font-bold text-sm text-ink-900">
                Advertising Guidelines & Integrity
              </h3>
              <p className="text-ink-600 leading-relaxed">
                Pakistan Strategic Forum maintains strict editorial firewall independence. Commercial placements
                are clearly annotated with "SPONSORED" or "COMMERCIAL PLACEMENT" tags and undergo technical pre-flight verification.
              </p>
              <ul className="space-y-1.5 text-ink-700 list-disc list-inside">
                <li>No political campaign advertising.</li>
                <li>No animated flashing or intrusive audio creatives.</li>
                <li>Maximum binary payload: 300 KB per slide.</li>
                <li>Verified external HTTPS landing pages required.</li>
              </ul>
            </div>

            <div className="p-4 bg-ivory-100 border border-line rounded-sm flex items-center justify-between">
              <div>
                <span className="font-bold text-ink-900 block">Download Media Kit 2026</span>
                <span className="text-[11px] text-ink-500">PDF • 14 Pages • Specifications</span>
              </div>
              <Button variant="outline" type="button">
                <Download className="w-3.5 h-3.5 mr-1" />
                <span>PDF Kit</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import {
  X,
  Megaphone,
  Calendar,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Monitor,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { checkAdSlotConflict } from "@/app/actions/ad-actions";

const AD_SLOTS = [
  {
    key: "home_leaderboard_1",
    name: "Home Leaderboard 1",
    page: "Home",
    desktopSize: "970x250",
    mobileSize: "320x100",
    maxSlides: 1,
    description: "Full-bleed position after Top Stories",
  },
  {
    key: "home_sponsor_carousel",
    name: "Home Sponsor Carousel",
    page: "Home",
    desktopSize: "1200x300",
    mobileSize: "600x300",
    maxSlides: 5,
    description: "Interactive brand showcase after Research (up to 5 slides)",
  },
  {
    key: "topic_banner",
    name: "Topic Hub Banner",
    page: "Topics",
    desktopSize: "970x90",
    mobileSize: "320x100",
    maxSlides: 1,
    description: "Leaderboard on Topic and Subtopic pages after Featured",
  },
  {
    key: "article_inline",
    name: "Article Inline Banner",
    page: "Articles & Reports",
    desktopSize: "728x90",
    mobileSize: "300x250",
    maxSlides: 1,
    description: "In-content ad rendered after 4th paragraph",
  },
  {
    key: "article_sidebar",
    name: "Article Sticky Half-Page",
    page: "Articles & Reports",
    desktopSize: "300x600",
    mobileSize: "None",
    maxSlides: 1,
    description: "Sticky half-page sidebar on screens >= 1280px",
  },
  {
    key: "newsroom_sidebar",
    name: "Newsroom Sidebar / Inline",
    page: "Newsroom",
    desktopSize: "300x250",
    mobileSize: "300x250",
    maxSlides: 1,
    description: "Newsroom wire sidebar (inline on mobile after 5th post)",
  },
  {
    key: "reports_banner",
    name: "Reports Hub Banner",
    page: "Reports",
    desktopSize: "970x250",
    mobileSize: "320x100",
    maxSlides: 1,
    description: "Leaderboard banner below report categories",
  },
  {
    key: "global_watch_banner",
    name: "Global Watch Banner",
    page: "Global Watch",
    desktopSize: "970x250",
    mobileSize: "320x100",
    maxSlides: 1,
    description: "Map stage banner below region status cards",
  },
];

interface AddAdPlacementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlacement: (placement: {
    slotKey: string;
    startsAt: string;
    endsAt: string;
    creatives: Array<{
      desktopUrl: string;
      mobileUrl: string;
      altText: string;
      clickUrl?: string;
    }>;
  }) => void;
}

export function AddAdPlacementModal({
  isOpen,
  onClose,
  onAddPlacement,
}: AddAdPlacementModalProps) {
  const [step, setStep] = useState(1);
  const [selectedSlotKey, setSelectedSlotKey] = useState("home_leaderboard_1");

  // Dates PKT
  const [startsAt, setStartsAt] = useState(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  });
  const [endsAt, setEndsAt] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  });

  // Creatives
  const [desktopUrl, setDesktopUrl] = useState(
    "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=1200"
  );
  const [mobileUrl, setMobileUrl] = useState(
    "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=600"
  );
  const [altText, setAltText] = useState("");
  const [clickUrl, setClickUrl] = useState("https://");

  const [conflictError, setConflictError] = useState("");
  const [validating, setValidating] = useState(false);

  if (!isOpen) return null;

  const currentSlot = AD_SLOTS.find((s) => s.key === selectedSlotKey) || AD_SLOTS[0];

  const handleNext = async () => {
    setConflictError("");

    if (step === 2) {
      setValidating(true);
      try {
        const res = await checkAdSlotConflict({
          slotKey: selectedSlotKey,
          startsAt,
          endsAt,
        });

        if (res.conflict) {
          setConflictError(res.message || "Conflict detected.");
          setValidating(false);
          return;
        }
      } catch (err: any) {
        setConflictError(err.message || "Error checking conflict.");
        setValidating(false);
        return;
      }
      setValidating(false);
    }

    if (step === 3) {
      if (!altText.trim()) {
        setConflictError("Alt text is required for accessibility.");
        return;
      }
      if (!clickUrl.startsWith("https://")) {
        setConflictError("Click-through URL must begin with https://");
        return;
      }
    }

    setStep((prev) => Math.min(4, prev + 1));
  };

  const handleBack = () => {
    setConflictError("");
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleConfirm = () => {
    onAddPlacement({
      slotKey: selectedSlotKey,
      startsAt,
      endsAt,
      creatives: [
        {
          desktopUrl,
          mobileUrl,
          altText: altText.trim(),
          clickUrl: clickUrl.trim(),
        },
      ],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in font-sans">
      <div className="bg-white border border-line rounded-xs shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-line flex items-center justify-between bg-ivory-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded-chip">
                Modal 35 • Step {step} of 4
              </span>
              <h2 className="text-base font-serif font-bold text-ink-900">
                Add Ad Placement
              </h2>
            </div>
            <p className="text-xs text-ink-500 mt-0.5">
              Strict dimensions & booking conflict verification (FR-ADS-01)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-ink-400 hover:text-ink-700 rounded-sm hover:bg-ivory-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress */}
        <div className="grid grid-cols-4 border-b border-line bg-white text-[11px] font-medium text-ink-500">
          {["1. Slot", "2. Dates (PKT)", "3. Creatives", "4. Confirm"].map(
            (label, idx) => (
              <div
                key={label}
                className={`py-2 px-3 text-center border-r border-line last:border-r-0 ${
                  step === idx + 1
                    ? "bg-green-50 text-green-800 font-semibold border-b-2 border-b-green-700"
                    : step > idx + 1
                    ? "text-ink-900 bg-ivory-50"
                    : "text-ink-400"
                }`}
              >
                {label}
              </div>
            )
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 text-sm">
          {conflictError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-sm text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{conflictError}</span>
            </div>
          )}

          {/* STEP 1: SLOT SELECTION */}
          {step === 1 && (
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-700">
                Choose Advertising Slot
              </label>
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {AD_SLOTS.map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setSelectedSlotKey(s.key)}
                    className={`w-full p-3 border text-left rounded-sm transition-all flex items-center justify-between ${
                      selectedSlotKey === s.key
                        ? "border-green-700 bg-green-50 text-green-900 ring-1 ring-green-700"
                        : "border-line bg-white hover:border-ink-400 text-ink-800"
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-xs text-ink-900">
                        {s.name}
                      </div>
                      <div className="text-[11px] text-ink-500 mt-0.5">
                        {s.page} • Desktop: <strong>{s.desktopSize}</strong> | Mobile:{" "}
                        <strong>{s.mobileSize}</strong>
                      </div>
                      <div className="text-[10px] text-ink-400 mt-0.5">
                        {s.description}
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-ink-600 bg-ivory-200 px-2 py-0.5 rounded-chip">
                      {s.key}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: DATES (PKT) & CONFLICT CHECK */}
          {step === 2 && (
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-700">
                Placement Flight Dates (Pakistan Standard Time)
              </label>

              <div className="p-3 bg-ivory-50 border border-line rounded-sm text-xs text-ink-600">
                Selected Slot: <strong>{currentSlot.name}</strong> ({currentSlot.key})
                <br />
                Dimensions: Desktop {currentSlot.desktopSize} | Mobile {currentSlot.mobileSize}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-ink-700 mb-1">
                    Flight Start Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={startsAt}
                    onChange={(e) => setStartsAt(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-line rounded-sm focus:border-green-700 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-700 mb-1">
                    Flight End Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={endsAt}
                    onChange={(e) => setEndsAt(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-line rounded-sm focus:border-green-700 focus:outline-hidden"
                  />
                </div>
              </div>

              <p className="text-[11px] text-ink-500">
                Rule <strong>FR-ADS-01:</strong> Overlap check runs against all scheduled and live campaigns in the system. Bookings cannot share the same slot and flight interval.
              </p>
            </div>
          )}

          {/* STEP 3: CREATIVES */}
          {step === 3 && (
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-700">
                Creative Assets & Targeting
              </label>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-ink-700 mb-1 flex items-center justify-between">
                    <span>Desktop Creative URL ({currentSlot.desktopSize})</span>
                    <span className="text-[10px] text-ink-400">JPG/PNG/WebP, max 300KB</span>
                  </label>
                  <input
                    type="url"
                    value={desktopUrl}
                    onChange={(e) => setDesktopUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-line rounded-sm focus:border-green-700 focus:outline-hidden font-mono"
                    placeholder="https://domain.com/ad-desktop.png"
                  />
                </div>

                {currentSlot.mobileSize !== "None" && (
                  <div>
                    <label className="block text-xs font-medium text-ink-700 mb-1 flex items-center justify-between">
                      <span>Mobile Creative URL ({currentSlot.mobileSize})</span>
                      <span className="text-[10px] text-ink-400">JPG/PNG/WebP, max 300KB</span>
                    </label>
                    <input
                      type="url"
                      value={mobileUrl}
                      onChange={(e) => setMobileUrl(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-line rounded-sm focus:border-green-700 focus:outline-hidden font-mono"
                      placeholder="https://domain.com/ad-mobile.png"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-ink-700 mb-1">
                    Alt Text (Required for accessibility)
                  </label>
                  <input
                    type="text"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-line rounded-sm focus:border-green-700 focus:outline-hidden"
                    placeholder="e.g. IDEAS 2026 Defence Exhibition Registration"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-ink-700 mb-1">
                    Click-Through URL (https only)
                  </label>
                  <input
                    type="url"
                    value={clickUrl}
                    onChange={(e) => setClickUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-line rounded-sm focus:border-green-700 focus:outline-hidden font-mono"
                    placeholder="https://partner.com/landing-page"
                  />
                  <p className="text-[10px] text-ink-400 mt-1">
                    All clicks are tracked via <code>/api/ads/click/[placementId]</code> with <code>rel=&quot;sponsored noopener&quot;</code>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CONFIRM & PREVIEW */}
          {step === 4 && (
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-700">
                Confirm Placement Configuration
              </label>

              <div className="border border-line rounded-sm p-4 bg-ivory-50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-ink-900">
                    {currentSlot.name}
                  </span>
                  <span className="font-mono text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-chip">
                    {currentSlot.key}
                  </span>
                </div>
                <div className="text-xs text-ink-700 grid grid-cols-2 gap-2">
                  <div>
                    <strong>Flight Window:</strong>
                    <br />
                    {new Date(startsAt).toLocaleDateString("en-GB")} →{" "}
                    {new Date(endsAt).toLocaleDateString("en-GB")}
                  </div>
                  <div>
                    <strong>Target URL:</strong>
                    <br />
                    <span className="truncate block font-mono text-[11px] text-ink-500">
                      {clickUrl}
                    </span>
                  </div>
                </div>

                {/* Creative Preview */}
                <div className="pt-3 border-t border-line space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400">
                    Creative Preview
                  </span>
                  <div className="border border-line rounded-xs overflow-hidden bg-white max-h-36 flex items-center justify-center p-2">
                    <img
                      src={desktopUrl}
                      alt={altText}
                      className="max-h-32 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-3 border-t border-line bg-ivory-50 flex items-center justify-between">
          {step > 1 ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleBack}
              disabled={validating}
              className="flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </Button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={validating}
            >
              Cancel
            </Button>

            {step < 4 ? (
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleNext}
                disabled={validating}
                className="flex items-center gap-1.5"
              >
                <span>{validating ? "Verifying..." : "Continue"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleConfirm}
                className="flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Add Placement to Campaign</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

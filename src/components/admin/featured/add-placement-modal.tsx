"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Layers,
  FileText,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Clock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  searchContentForFeaturing,
  checkPlacementConflict,
  createFeaturedPlacement,
} from "@/app/actions/featured-actions";

interface AddPlacementModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedSlotKey?: string;
  preselectedPosition?: number;
  allSlots: Array<{
    id: string;
    key: string;
    page: string;
    positions: number;
    allowedTypes: any;
  }>;
  onSuccess: () => void;
}

export function AddPlacementModal({
  isOpen,
  onClose,
  preselectedSlotKey,
  preselectedPosition = 1,
  allSlots,
  onSuccess,
}: AddPlacementModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [page, setPage] = useState("Home");
  const [selectedSlotKey, setSelectedSlotKey] = useState(preselectedSlotKey || "home_hero_lead");
  const [position, setPosition] = useState(preselectedPosition);

  // Content search
  const [searchQuery, setSearchQuery] = useState("");
  const [contentResults, setContentResults] = useState<any[]>([]);
  const [selectedContent, setSelectedContent] = useState<any | null>(null);
  const [searching, setSearching] = useState(false);

  // Timing
  const [startsAt, setStartsAt] = useState(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  });
  const [noEndDate, setNoEndDate] = useState(false);
  const [endsAt, setEndsAt] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  });

  // Conflict and replace
  const [conflictData, setConflictData] = useState<any | null>(null);
  const [replaceConflicts, setReplaceConflicts] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (preselectedSlotKey) {
      setSelectedSlotKey(preselectedSlotKey);
      const matched = allSlots.find((s) => s.key === preselectedSlotKey);
      if (matched) {
        setPage(matched.page);
        setPosition(preselectedPosition || 1);
      }
    }
  }, [preselectedSlotKey, preselectedPosition, allSlots]);

  // Load content when slot or step 4 is reached
  useEffect(() => {
    if (currentStep === 4) {
      loadContent();
    }
  }, [currentStep, searchQuery, selectedSlotKey]);

  const activeSlot = allSlots.find((s) => s.key === selectedSlotKey) || allSlots[0];

  const loadContent = async () => {
    setSearching(true);
    const allowed = Array.isArray(activeSlot?.allowedTypes)
      ? (activeSlot.allowedTypes as string[])
      : [];
    try {
      const items = await searchContentForFeaturing(searchQuery, allowed);
      setContentResults(items);
    } catch (err) {
      console.error(err);
    } finally {
      setSearching(false);
    }
  };

  const handleNext = async () => {
    setErrorMessage("");

    if (currentStep === 4 && !selectedContent) {
      setErrorMessage("Please select an item to feature.");
      return;
    }

    if (currentStep === 5) {
      // Validate conflict before review step
      const res = await checkPlacementConflict({
        slotKey: selectedSlotKey,
        position,
        startsAt,
        endsAt: noEndDate ? null : endsAt,
      });

      if (res.conflict) {
        setConflictData(res.conflictingPlacements);
      } else {
        setConflictData(null);
      }
    }

    setCurrentStep((prev) => Math.min(6, prev + 1));
  };

  const handleBack = () => {
    setErrorMessage("");
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async () => {
    if (!selectedContent) return;

    setSubmitting(true);
    setErrorMessage("");

    try {
      const res = await createFeaturedPlacement({
        slotKey: selectedSlotKey,
        position,
        contentId: selectedContent.id,
        startsAt,
        endsAt: noEndDate ? null : endsAt,
        replaceConflicts,
      });

      if (!res.success) {
        setErrorMessage(res.error || "Failed to create placement.");
        if (res.conflict) {
          setConflictData(res.conflictingPlacements);
        }
      } else {
        onSuccess();
        onClose();
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const pages = ["Home", "Topics", "Reports", "Research", "Mega menu"];
  const availableSlotsForPage = allSlots.filter((s) => s.page === page);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white border border-line rounded-xs shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-line flex items-center justify-between bg-ivory-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded-chip">
                Modal 32 • Step {currentStep} of 6
              </span>
              <h2 className="text-base font-serif font-bold text-ink-900">
                Add Featured Placement
              </h2>
            </div>
            <p className="text-xs text-ink-500 mt-0.5">
              Strict editorial scheduling with conflict protection (FR-FEAT-01/04)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-ink-400 hover:text-ink-700 rounded-sm hover:bg-ivory-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="grid grid-cols-6 border-b border-line bg-white text-[11px] font-medium text-ink-500">
          {[
            "1. Page",
            "2. Category",
            "3. Section",
            "4. Content",
            "5. Schedule",
            "6. Review",
          ].map((label, idx) => (
            <div
              key={label}
              className={`py-2 px-3 text-center border-r border-line last:border-r-0 ${
                currentStep === idx + 1
                  ? "bg-green-50 text-green-800 font-semibold border-b-2 border-b-green-700"
                  : currentStep > idx + 1
                  ? "text-ink-900 bg-ivory-50"
                  : "text-ink-400"
              }`}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 text-sm font-sans">
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-sm text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: PAGE */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-700">
                Target Publication Page
              </label>
              <div className="grid grid-cols-2 gap-3">
                {pages.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setPage(p);
                      const matching = allSlots.filter((s) => s.page === p);
                      if (matching.length > 0) {
                        setSelectedSlotKey(matching[0].key);
                        setPosition(1);
                      }
                    }}
                    className={`p-4 border text-left rounded-sm transition-all ${
                      page === p
                        ? "border-green-700 bg-green-50/50 text-green-900 ring-1 ring-green-700"
                        : "border-line bg-white hover:border-ink-400 text-ink-800"
                    }`}
                  >
                    <div className="font-serif font-bold text-sm">{p}</div>
                    <div className="text-xs text-ink-500 mt-1">
                      {allSlots.filter((s) => s.page === p).length} predefined slot families
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: TOPIC / CATEGORY */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-700">
                Category Scope & Desk
              </label>
              <p className="text-xs text-ink-600">
                Slots on {page} apply across general coverage or can be targeted to specific thematic desks.
              </p>
              <div className="p-4 border border-line rounded-sm bg-ivory-50 space-y-3">
                <div className="text-xs font-semibold text-ink-800">
                  Active Page Scope: <span className="text-green-800 font-bold">{page}</span>
                </div>
                <div className="text-xs text-ink-600">
                  {page === "Topics"
                    ? "Targeting: All Topic Hubs & Subtopics"
                    : page === "Reports"
                    ? "Targeting: All Special Reports and Policy Briefs"
                    : page === "Research"
                    ? "Targeting: Peer-Reviewed Scientific Archive"
                    : "Targeting: Global Home Front Page"}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SECTION & POSITION */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-700 mb-2">
                  Select Predefined Slot
                </label>
                <div className="space-y-2">
                  {availableSlotsForPage.map((s) => (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => {
                        setSelectedSlotKey(s.key);
                        setPosition(1);
                      }}
                      className={`w-full p-3 border text-left rounded-sm transition-all flex items-center justify-between ${
                        selectedSlotKey === s.key
                          ? "border-green-700 bg-green-50 text-green-900"
                          : "border-line bg-white hover:border-ink-400 text-ink-800"
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-xs font-mono">{s.key}</div>
                        <div className="text-[11px] text-ink-500 mt-0.5">
                          Allowed types:{" "}
                          {Array.isArray(s.allowedTypes)
                            ? s.allowedTypes.join(", ")
                            : "All"}
                        </div>
                      </div>
                      <span className="text-xs font-mono text-ink-600 bg-ivory-200 px-2 py-0.5 rounded-chip">
                        {s.positions} position{s.positions > 1 ? "s" : ""}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {activeSlot && activeSlot.positions > 1 && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-700 mb-2">
                    Slot Position (1 to {activeSlot.positions})
                  </label>
                  <div className="flex gap-2">
                    {Array.from({ length: activeSlot.positions }, (_, i) => i + 1).map(
                      (pos) => (
                        <button
                          key={pos}
                          type="button"
                          onClick={() => setPosition(pos)}
                          className={`w-12 h-10 border rounded-sm font-bold text-xs ${
                            position === pos
                              ? "border-green-700 bg-green-700 text-white"
                              : "border-line bg-white text-ink-700 hover:border-ink-400"
                          }`}
                        >
                          Pos {pos}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: CONTENT ITEM */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-700">
                  Select Published Content
                </label>
                <span className="text-[11px] text-ink-500">
                  Showing published items allowed in {selectedSlotKey}
                </span>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-ink-400" />
                <input
                  type="text"
                  placeholder="Search by headline or reference ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-line rounded-sm focus:border-green-700 focus:outline-hidden"
                />
              </div>

              {/* Results list */}
              <div className="border border-line rounded-sm max-h-64 overflow-y-auto divide-y divide-line">
                {searching ? (
                  <div className="p-4 text-center text-xs text-ink-500">
                    Loading content items...
                  </div>
                ) : contentResults.length === 0 ? (
                  <div className="p-4 text-center text-xs text-ink-500">
                    No matching published items found.
                  </div>
                ) : (
                  contentResults.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedContent(item)}
                      className={`w-full p-3 text-left flex items-start gap-3 transition-colors ${
                        selectedContent?.id === item.id
                          ? "bg-green-50 text-green-900"
                          : "hover:bg-ivory-50 text-ink-800"
                      }`}
                    >
                      <div className="w-12 h-10 bg-ivory-200 shrink-0 border border-line rounded-xs overflow-hidden">
                        {item.cardImageUrl || item.coverImageUrl ? (
                          <img
                            src={item.cardImageUrl || item.coverImageUrl}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-ink-400">
                            PSF
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-ink-500">
                            {item.refId}
                          </span>
                          <span className="text-[10px] uppercase font-bold text-green-700">
                            {item.type}
                          </span>
                        </div>
                        <h4 className="text-xs font-serif font-bold text-ink-900 truncate mt-0.5">
                          {item.title}
                        </h4>
                        <div className="text-[11px] text-ink-500 mt-0.5">
                          {item.authors?.[0]?.user?.profile?.displayName ||
                            item.authors?.[0]?.user?.email ||
                            "PSF Editorial Board"}{" "}
                          •{" "}
                          {item.publishedAt
                            ? new Date(item.publishedAt).toLocaleDateString("en-GB")
                            : "Draft"}
                        </div>
                      </div>
                      {selectedContent?.id === item.id && (
                        <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0 mt-1" />
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          {/* STEP 5: SCHEDULE (START & END) */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-700">
                Placement Window (PKT Time)
              </label>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-ink-700 mb-1">
                    Starts At (PKT)
                  </label>
                  <input
                    type="datetime-local"
                    value={startsAt}
                    onChange={(e) => setStartsAt(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-line rounded-sm focus:border-green-700 focus:outline-hidden"
                  />
                  <p className="text-[11px] text-ink-500 mt-1">
                    Defaults to now. Starts immediately if start time is past or current.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-ink-700">
                      Ends At (PKT)
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-ink-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={noEndDate}
                        onChange={(e) => setNoEndDate(e.target.checked)}
                        className="rounded-xs border-line text-green-700 focus:ring-green-700"
                      />
                      <span>No end date (FR-FEAT-07)</span>
                    </label>
                  </div>
                  {!noEndDate && (
                    <input
                      type="datetime-local"
                      value={endsAt}
                      onChange={(e) => setEndsAt(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-line rounded-sm focus:border-green-700 focus:outline-hidden"
                    />
                  )}
                  <p className="text-[11px] text-ink-500 mt-1">
                    {noEndDate
                      ? "Stays active indefinitely until replaced by a newer placement."
                      : "When expired without next scheduled item, enters HOLDING status (FR-FEAT-04)."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: REVIEW & CONFLICT RESOLUTION */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-700">
                Review & Confirm Placement
              </label>

              {/* Slot & Content Preview Card */}
              <div className="p-4 border border-line rounded-sm bg-ivory-50 flex items-start gap-4">
                <div className="w-24 h-16 bg-white border border-line rounded-xs overflow-hidden shrink-0">
                  {selectedContent?.cardImageUrl || selectedContent?.coverImageUrl ? (
                    <img
                      src={selectedContent.cardImageUrl || selectedContent.coverImageUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-ink-400 font-serif">
                      PSF
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 bg-green-100 text-green-800 rounded-chip font-bold">
                      {selectedSlotKey} • Pos {position}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-ink-500">
                      {selectedContent?.type}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-sm text-ink-900 mt-1 truncate">
                    {selectedContent?.title}
                  </h3>
                  <div className="text-xs text-ink-600 mt-1 flex items-center gap-3">
                    <span>
                      <strong>Window:</strong> {new Date(startsAt).toLocaleString("en-GB")}{" "}
                      →{" "}
                      {noEndDate
                        ? "Indefinite (No end date)"
                        : new Date(endsAt).toLocaleString("en-GB")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Conflict handling panel (FR-FEAT-01) */}
              {conflictData && conflictData.length > 0 && (
                <div className="p-4 bg-warning-50 border border-warning-200 rounded-sm space-y-3">
                  <div className="flex items-center gap-2 text-warning-800 font-bold text-xs">
                    <AlertTriangle className="w-4 h-4 text-warning-700 shrink-0" />
                    <span>Scheduling Conflict Detected (FR-FEAT-01)</span>
                  </div>
                  <p className="text-xs text-warning-800">
                    The following item is currently active or scheduled in this position during your chosen window:
                  </p>
                  <ul className="text-xs space-y-1 list-disc list-inside text-warning-900 font-mono">
                    {conflictData.map((c: any) => (
                      <li key={c.id}>
                        {c.refId}: {c.title} ({c.status})
                      </li>
                    ))}
                  </ul>

                  <label className="flex items-center gap-2 p-2.5 bg-white border border-warning-300 rounded-sm cursor-pointer mt-2">
                    <input
                      type="checkbox"
                      checked={replaceConflicts}
                      onChange={(e) => setReplaceConflicts(e.target.checked)}
                      className="rounded-xs text-green-700 focus:ring-green-700"
                    />
                    <span className="text-xs font-semibold text-ink-900">
                      Replace current placement from {new Date(startsAt).toLocaleTimeString("en-GB")} (ends previous placement at new start)
                    </span>
                  </label>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-3 border-t border-line bg-ivory-50 flex items-center justify-between">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleBack}
              disabled={submitting}
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
              disabled={submitting}
            >
              Cancel
            </Button>

            {currentStep < 6 ? (
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleNext}
                className="flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleSubmit}
                disabled={submitting || (conflictData && !replaceConflicts)}
                className="flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{submitting ? "Featuring..." : "Feature Content"}</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

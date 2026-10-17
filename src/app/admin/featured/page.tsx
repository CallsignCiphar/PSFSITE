"use client";

import React, { useState, useEffect } from "react";
import { AdminShell } from "@/components/layout/admin-shell";
import {
  Star,
  Layers,
  Calendar,
  AlertTriangle,
  Clock,
  Plus,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getFeaturedSlotsOverview,
  getSlotTimeline,
} from "@/app/actions/featured-actions";
import { AddPlacementModal } from "@/components/admin/featured/add-placement-modal";
import { SlotTimeline } from "@/components/admin/featured/slot-timeline";

export default function FeaturedSlotsPage() {
  const [data, setData] = useState<{
    grouped: Record<string, any[]>;
    allSlots: any[];
    totalSlots: number;
    holdingCount: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSlotKey, setModalSlotKey] = useState<string | undefined>();
  const [modalPosition, setModalPosition] = useState(1);

  // Timeline view state
  const [activeTimelineSlot, setActiveTimelineSlot] = useState<any | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getFeaturedSlotsOverview();
      setData(res);
      // If timeline is open, refresh it as well
      if (activeTimelineSlot) {
        const refreshedSlot = await getSlotTimeline(activeTimelineSlot.key);
        setActiveTimelineSlot(refreshedSlot);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddModal = (slotKey?: string, position: number = 1) => {
    setModalSlotKey(slotKey);
    setModalPosition(position);
    setIsModalOpen(true);
  };

  const openTimeline = async (slot: any) => {
    const fullSlot = await getSlotTimeline(slot.key);
    setActiveTimelineSlot(fullSlot);
  };

  const pages = ["All", "Home", "Topics", "Reports", "Research", "Mega menu"];

  const filteredSlots =
    !data || activeTab === "All"
      ? data?.allSlots || []
      : data.grouped[activeTab] || [];

  return (
    <AdminShell title="Featured & Top Stories Engine">
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded-chip">
                Section 14 • Featured Engine
              </span>
              <h1 className="text-xl font-serif font-bold text-ink-900">
                Featured Slots & Stories Engine
              </h1>
            </div>
            <p className="text-xs text-ink-600 mt-1">
              Curate lead stories, category highlights, and editorial showcases across 11 slot families with strict conflict protection.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {activeTimelineSlot ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTimelineSlot(null)}
              >
                ← Back to Slots Overview
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => openAddModal()}
                className="flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Feature Content (Modal 32)</span>
              </Button>
            )}
          </div>
        </div>

        {/* Action Centre Warning: Holding slots rule (FR-FEAT-04) */}
        {data && data.holdingCount > 0 && (
          <div className="p-4 bg-warning-50 border border-warning-200 rounded-sm flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning-700 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-serif font-bold text-warning-900">
                Action Centre: {data.holdingCount} Slot{data.holdingCount > 1 ? "s" : ""} in Holding Status
              </h4>
              <p className="text-xs text-warning-800 mt-0.5">
                Per rule <strong>FR-FEAT-04</strong>, expired items remain visible in holding state until an editor schedules fresh replacements, ensuring no empty gaps appear on public pages.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const holdingSlot = data.allSlots.find((s) =>
                  s.placements.some((p: any) => p.status === "HOLDING")
                );
                if (holdingSlot) openAddModal(holdingSlot.key, 1);
              }}
              className="border-warning-300 text-warning-900 hover:bg-warning-100 shrink-0 text-xs"
            >
              Resolve Holding
            </Button>
          </div>
        )}

        {/* View Switch: Timeline Gantt View vs Slots Overview */}
        {activeTimelineSlot ? (
          <SlotTimeline
            slot={activeTimelineSlot}
            onAddPlacement={(pos) => openAddModal(activeTimelineSlot.key, pos)}
            onRefresh={loadData}
          />
        ) : (
          <div className="space-y-6">
            {/* Filter Tabs by Page */}
            <div className="flex items-center gap-2 border-b border-line pb-px overflow-x-auto text-xs font-sans">
              {pages.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setActiveTab(p)}
                  className={`px-3.5 py-2 font-medium border-b-2 transition-all shrink-0 ${
                    activeTab === p
                      ? "border-green-700 text-green-800 font-bold bg-white"
                      : "border-transparent text-ink-500 hover:text-ink-800"
                  }`}
                >
                  {p}
                  {p !== "All" && data?.grouped[p] && (
                    <span className="ml-1.5 text-[10px] px-1.5 py-0.2 bg-ivory-200 text-ink-600 rounded-chip">
                      {data.grouped[p].length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Slots Cards Grid */}
            {loading ? (
              <div className="p-12 text-center text-xs text-ink-400 bg-white border border-line rounded-sm">
                Loading slot registries and evaluating active placements...
              </div>
            ) : filteredSlots.length === 0 ? (
              <div className="p-12 text-center text-xs text-ink-500 bg-white border border-line rounded-sm">
                No slots found for this category.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSlots.map((slot: any) => {
                  const activePlacements = slot.placements.filter(
                    (p: any) => p.status === "ACTIVE"
                  );
                  const holdingPlacements = slot.placements.filter(
                    (p: any) => p.status === "HOLDING"
                  );
                  const scheduledPlacements = slot.placements.filter(
                    (p: any) => p.status === "SCHEDULED"
                  );

                  // Primary state badge
                  let stateLabel = "Fallback / automatic";
                  let stateStyle = "bg-ivory-200 text-ink-600 border-line";

                  if (holdingPlacements.length > 0) {
                    stateLabel = "Holding after expiry";
                    stateStyle = "bg-warning-50 text-warning-800 border-warning-200";
                  } else if (activePlacements.length > 0) {
                    stateLabel = `Active (${activePlacements.length}/${slot.positions})`;
                    stateStyle = "bg-green-50 text-green-800 border-green-200";
                  } else if (scheduledPlacements.length > 0) {
                    stateLabel = `Scheduled (${scheduledPlacements.length})`;
                    stateStyle = "bg-blue-50 text-blue-800 border-blue-200";
                  }

                  const leadItem =
                    activePlacements[0]?.content || holdingPlacements[0]?.content;

                  return (
                    <div
                      key={slot.id}
                      className="bg-white border border-line rounded-sm flex flex-col justify-between hover:border-ink-300 transition-all shadow-2xs"
                    >
                      <div className="p-4 space-y-3">
                        {/* Slot Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-ink-400 tracking-wider">
                              {slot.page} Page
                            </span>
                            <h3 className="font-mono font-bold text-xs text-ink-900 mt-0.5">
                              {slot.key}
                            </h3>
                          </div>
                          <span
                            className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-chip border ${stateStyle}`}
                          >
                            {stateLabel}
                          </span>
                        </div>

                        {/* Thumbnail / Current Story Preview */}
                        <div className="pt-2 border-t border-line/50">
                          {leadItem ? (
                            <div className="flex gap-3 items-start">
                              <div className="w-16 h-12 bg-ivory-200 rounded-xs overflow-hidden shrink-0 border border-line">
                                {leadItem.cardImageUrl || leadItem.coverImageUrl ? (
                                  <img
                                    src={leadItem.cardImageUrl || leadItem.coverImageUrl}
                                    alt=""
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-[10px] text-ink-400 font-serif">
                                    PSF
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <span className="text-[10px] font-mono text-ink-500">
                                  {leadItem.refId}
                                </span>
                                <h4 className="font-serif font-bold text-xs text-ink-900 line-clamp-2">
                                  {leadItem.title}
                                </h4>
                              </div>
                            </div>
                          ) : (
                            <div className="p-3 bg-ivory-50 border border-dashed border-line rounded-xs text-[11px] text-ink-500 text-center">
                              No manual placement active. Displaying latest published article as fallback.
                            </div>
                          )}
                        </div>

                        {/* Next Scheduled Preview */}
                        {scheduledPlacements.length > 0 && (
                          <div className="pt-2 border-t border-line/40 flex items-center gap-1.5 text-[11px] text-blue-700">
                            <Clock className="w-3 h-3 shrink-0" />
                            <span className="truncate">
                              Next: {scheduledPlacements[0].content.title}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Card Footer Actions */}
                      <div className="px-4 py-2.5 bg-ivory-50 border-t border-line flex items-center justify-between text-xs">
                        <button
                          type="button"
                          onClick={() => openTimeline(slot)}
                          className="font-medium text-green-700 hover:text-green-800 hover:underline flex items-center gap-1"
                        >
                          <span>Manage Timeline</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => openAddModal(slot.key, 1)}
                          className="font-medium text-ink-600 hover:text-ink-900 flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Feature</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 6-Step Feature Placement Modal (Modal 32) */}
      {data && (
        <AddPlacementModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          preselectedSlotKey={modalSlotKey}
          preselectedPosition={modalPosition}
          allSlots={data.allSlots}
          onSuccess={loadData}
        />
      )}
    </AdminShell>
  );
}

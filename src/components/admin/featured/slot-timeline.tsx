"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  ExternalLink,
  ChevronRight,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { removeFeaturedPlacement } from "@/app/actions/featured-actions";

interface SlotTimelineProps {
  slot: {
    id: string;
    key: string;
    page: string;
    positions: number;
    placements: Array<any>;
  };
  onAddPlacement: (position: number) => void;
  onRefresh: () => void;
}

export function SlotTimeline({ slot, onAddPlacement, onRefresh }: SlotTimelineProps) {
  const [selectedPlacement, setSelectedPlacement] = useState<any | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleRemove = async (placementId: string) => {
    if (!confirm("Are you sure you want to end/cancel this featured placement?")) {
      return;
    }
    setDeletingId(placementId);
    try {
      await removeFeaturedPlacement(placementId);
      onRefresh();
      setSelectedPlacement(null);
    } catch (err) {
      console.error(err);
      alert("Failed to remove placement");
    } finally {
      setDeletingId(null);
    }
  };

  // Group placements by position
  const positionsArray = Array.from({ length: slot.positions }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex items-center justify-between bg-white p-4 border border-line rounded-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-green-800 bg-green-50 px-2 py-0.5 rounded-chip">
              {slot.key}
            </span>
            <span className="text-xs text-ink-500">• {slot.page} Page</span>
          </div>
          <p className="text-xs text-ink-600 mt-1">
            Gantt timeline across {slot.positions} position{slot.positions > 1 ? "s" : ""}. Showing active, scheduled, and past 30 days.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => onAddPlacement(1)}
          className="flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Placement</span>
        </Button>
      </div>

      {/* Per-Position Timeline Rows */}
      <div className="space-y-4">
        {positionsArray.map((pos) => {
          const posPlacements = slot.placements.filter((p) => p.position === pos);
          const activePlacement = posPlacements.find(
            (p) => p.status === "ACTIVE" || p.status === "HOLDING"
          );
          const upcomingPlacements = posPlacements.filter(
            (p) => p.status === "SCHEDULED"
          );
          const pastPlacements = posPlacements.filter((p) => p.status === "ENDED");

          return (
            <div
              key={pos}
              className="bg-white border border-line rounded-sm p-4 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-line pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-xs bg-ink-900 text-white flex items-center justify-center font-mono font-bold text-xs">
                    {pos}
                  </span>
                  <span className="font-serif font-bold text-sm text-ink-900">
                    Position {pos}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onAddPlacement(pos)}
                  className="text-xs font-medium text-green-700 hover:text-green-800 hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Schedule for Pos {pos}</span>
                </button>
              </div>

              {/* Gantt Bar representation */}
              <div className="space-y-2">
                {posPlacements.length === 0 ? (
                  <div className="p-4 border border-dashed border-line rounded-sm text-center text-xs text-ink-400 bg-ivory-50">
                    No placements scheduled. Using automatic fallback item.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {posPlacements.map((p) => {
                      const isHolding = p.status === "HOLDING";
                      const isActive = p.status === "ACTIVE";
                      const isScheduled = p.status === "SCHEDULED";

                      return (
                        <div
                          key={p.id}
                          onClick={() => setSelectedPlacement(p)}
                          className={`p-3 border rounded-sm cursor-pointer transition-all flex flex-col justify-between ${
                            isActive
                              ? "border-green-600 bg-green-50/40 hover:bg-green-50"
                              : isHolding
                              ? "border-warning-500 bg-warning-50/40 hover:bg-warning-50"
                              : isScheduled
                              ? "border-blue-400 bg-blue-50/40 hover:bg-blue-50"
                              : "border-line bg-ivory-50/60 opacity-70 hover:opacity-100"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <span
                                className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-chip ${
                                  isActive
                                    ? "bg-green-700 text-white"
                                    : isHolding
                                    ? "bg-warning-700 text-white"
                                    : isScheduled
                                    ? "bg-blue-700 text-white"
                                    : "bg-ink-400 text-white"
                                }`}
                              >
                                {isHolding ? "HOLDING (EXPIRED)" : p.status}
                              </span>
                              <span className="text-[10px] font-mono text-ink-500">
                                {p.content.refId}
                              </span>
                            </div>

                            <h4 className="font-serif font-bold text-xs text-ink-900 line-clamp-2">
                              {p.content.title}
                            </h4>
                          </div>

                          <div className="mt-3 pt-2 border-t border-line/60 flex items-center justify-between text-[10px] text-ink-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-ink-400" />
                              {new Date(p.startsAt).toLocaleDateString("en-GB")}
                            </span>
                            <span>
                              {p.endsAt
                                ? new Date(p.endsAt).toLocaleDateString("en-GB")
                                : "Indefinite"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Placement Detail Modal / Drawer */}
      {selectedPlacement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white border border-line rounded-sm p-6 max-w-lg w-full space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-green-700">
                  Placement Details
                </span>
                <h3 className="font-serif font-bold text-base text-ink-900">
                  {selectedPlacement.content.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPlacement(null)}
                className="text-ink-400 hover:text-ink-700 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-ink-700">
              <div className="flex justify-between py-1 border-b border-line">
                <span className="text-ink-500">Slot Key:</span>
                <span className="font-mono font-semibold">{slot.key}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-line">
                <span className="text-ink-500">Position:</span>
                <span className="font-semibold">Pos {selectedPlacement.position}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-line">
                <span className="text-ink-500">Status:</span>
                <span className="font-bold">{selectedPlacement.status}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-line">
                <span className="text-ink-500">Starts At (PKT):</span>
                <span>{new Date(selectedPlacement.startsAt).toLocaleString("en-GB")}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-line">
                <span className="text-ink-500">Ends At (PKT):</span>
                <span>
                  {selectedPlacement.endsAt
                    ? new Date(selectedPlacement.endsAt).toLocaleString("en-GB")
                    : "Indefinite (No end date)"}
                </span>
              </div>
              {selectedPlacement.status === "HOLDING" && (
                <div className="p-3 bg-warning-50 border border-warning-200 text-warning-900 rounded-sm mt-2 text-xs">
                  <strong>FR-FEAT-04 Rule:</strong> This item has passed its end date, but remains visible to public readers because no replacement has been scheduled. Once an editor schedules or features a new item, this item will immediately transition to ENDED.
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-line">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedPlacement(null)}
              >
                Close
              </Button>
              {selectedPlacement.status !== "ENDED" && selectedPlacement.status !== "CANCELLED" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemove(selectedPlacement.id)}
                  disabled={deletingId === selectedPlacement.id}
                  className="text-red-700 border-red-200 hover:bg-red-50 flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>
                    {deletingId === selectedPlacement.id ? "Ending..." : "End Placement"}
                  </span>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

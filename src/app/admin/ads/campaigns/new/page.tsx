"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminShell } from "@/components/layout/admin-shell";
import {
  ArrowLeft,
  Megaphone,
  Plus,
  Trash2,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  generateNextCampaignNumber,
  saveCampaign,
} from "@/app/actions/ad-actions";
import { AddAdPlacementModal } from "@/components/admin/ads/add-ad-placement-modal";

export default function NewCampaignPage() {
  const router = useRouter();

  // Campaign Form State
  const [campaignNumber, setCampaignNumber] = useState("");
  const [brandName, setBrandName] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  // Placements Repeater
  const [placements, setPlacements] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    generateNextCampaignNumber().then((num) => {
      setCampaignNumber(num);
    });
  }, []);

  const handleAddPlacement = (newPlacement: any) => {
    setPlacements((prev) => [...prev, newPlacement]);
  };

  const handleRemovePlacement = (index: number) => {
    setPlacements((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!brandName.trim()) {
      setErrorMessage("Brand name is required.");
      return;
    }
    if (!name.trim()) {
      setErrorMessage("Campaign name is required.");
      return;
    }
    if (placements.length === 0) {
      setErrorMessage("At least one ad placement must be added to this campaign.");
      return;
    }

    setSaving(true);
    try {
      const res = await saveCampaign({
        campaignNumber: campaignNumber.trim(),
        brandName: brandName.trim(),
        name: name.trim(),
        description: description.trim() || undefined,
        contactName: contactName.trim() || undefined,
        contactEmail: contactEmail.trim() || undefined,
        placements,
      });

      if (!res.success) {
        setErrorMessage(res.error || "Failed to save campaign.");
      } else {
        router.push("/admin/ads");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminShell title="Create Ad Campaign">
      <div className="max-w-4xl mx-auto space-y-6 font-sans">
        {/* Back and Title */}
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-3">
            <Link href="/admin/ads">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-serif font-bold text-ink-900">
                Create Ad Campaign
              </h1>
              <p className="text-xs text-ink-500">
                Single-page booking form with multi-slot flight schedule
              </p>
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-sm text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Campaign Identity */}
          <div className="bg-white border border-line rounded-sm p-6 space-y-4 shadow-2xs">
            <div className="border-b border-line pb-2 flex items-center justify-between">
              <h3 className="font-serif font-bold text-sm text-ink-900">
                1. Campaign Identity (Internal Only)
              </h3>
              <span className="text-[11px] font-mono text-ink-500">
                FRD §12.13 Table
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">
                  Brand / Advertiser Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Heavy Industries Taxila"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-line rounded-sm focus:border-green-700 focus:outline-hidden"
                />
                <p className="text-[10px] text-ink-400 mt-0.5">
                  Internal only; never exposed on public pages.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">
                  Campaign Number *
                </label>
                <input
                  type="text"
                  required
                  value={campaignNumber}
                  onChange={(e) => setCampaignNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-line rounded-sm focus:border-green-700 focus:outline-hidden font-mono"
                />
                <p className="text-[10px] text-ink-400 mt-0.5">
                  Auto-suggested sequence CMP-YYYY-NNNN.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">
                Campaign Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Al-Khalid-I Upgrade Public Outreach Q4"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-line rounded-sm focus:border-green-700 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">
                Description / Internal Notes
              </label>
              <textarea
                rows={2}
                placeholder="Institutional sponsorship scope, commercial contact details, or MoU reference..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-line rounded-sm focus:border-green-700 focus:outline-hidden resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-line">
              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">
                  Advertiser Contact Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Brig. Tariq Mehmood"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-line rounded-sm focus:border-green-700 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">
                  Advertiser Contact Email
                </label>
                <input
                  type="email"
                  placeholder="e.g. contact@hit.gov.pk"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-line rounded-sm focus:border-green-700 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Placements Repeater */}
          <div className="bg-white border border-line rounded-sm p-6 space-y-4 shadow-2xs">
            <div className="border-b border-line pb-2 flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-sm text-ink-900">
                  2. Campaign Placements ({placements.length})
                </h3>
                <p className="text-[11px] text-ink-500">
                  Each placement books a verified window on an official ad slot (Modal 35)
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Placement (Modal 35)</span>
              </Button>
            </div>

            {placements.length === 0 ? (
              <div className="p-8 border border-dashed border-line rounded-sm text-center space-y-3 bg-ivory-50">
                <Megaphone className="w-8 h-8 text-ink-400 mx-auto" />
                <div className="text-xs text-ink-600">
                  No ad placements added yet. Click &quot;Add Placement&quot; to configure a slot window and upload creatives.
                </div>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Configure First Placement</span>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {placements.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-4 border border-line rounded-sm bg-ivory-50 flex items-start justify-between gap-4"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="w-20 h-14 bg-white border border-line rounded-xs overflow-hidden shrink-0 flex items-center justify-center p-1">
                        {p.creatives?.[0]?.desktopUrl ? (
                          <img
                            src={p.creatives[0].desktopUrl}
                            alt=""
                            className="max-h-full object-contain"
                          />
                        ) : (
                          <span className="text-[10px] text-ink-400">Ad</span>
                        )}
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-green-800 bg-green-50 px-2 py-0.5 rounded-chip">
                            {p.slotKey}
                          </span>
                          <span className="text-ink-500">•</span>
                          <span className="font-semibold text-ink-800">
                            {new Date(p.startsAt).toLocaleDateString("en-GB")} →{" "}
                            {new Date(p.endsAt).toLocaleDateString("en-GB")}
                          </span>
                        </div>
                        <div className="text-[11px] text-ink-600">
                          Target:{" "}
                          <span className="font-mono text-ink-500">
                            {p.creatives?.[0]?.clickUrl || "None"}
                          </span>
                        </div>
                        <div className="text-[10px] text-ink-400">
                          Alt: {p.creatives?.[0]?.altText || "No alt text"}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemovePlacement(idx)}
                      className="p-1.5 text-ink-400 hover:text-red-700 hover:bg-red-50 rounded-xs"
                      title="Remove placement"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-line">
            <Link href="/admin/ads">
              <Button type="button" variant="outline" size="sm">
                Cancel
              </Button>
            </Link>

            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={saving}
              className="flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{saving ? "Saving Campaign..." : "Save & Schedule Campaign"}</span>
            </Button>
          </div>
        </form>

        {/* Modal 35 */}
        <AddAdPlacementModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddPlacement={handleAddPlacement}
        />
      </div>
    </AdminShell>
  );
}

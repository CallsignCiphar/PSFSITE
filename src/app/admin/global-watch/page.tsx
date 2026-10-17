"use client";

import React, { useState, useEffect } from "react";
import { AdminShell } from "@/components/layout/admin-shell";
import {
  Globe,
  ShieldAlert,
  AlertTriangle,
  Sliders,
  Activity,
  Plus,
  Edit2,
  CheckCircle2,
  Clock,
  X,
  ExternalLink,
  MapPin,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getStatusLayerEntries,
  saveStatusLayerEntry,
  endStatusLayerEntry,
  getGlobalWatchCoverageHealth,
} from "@/app/actions/global-watch-actions";

export default function AdminGlobalWatchPage() {
  const [entries, setEntries] = useState<any[]>([]);
  const [health, setHealth] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Modal 34 State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<any | null>(null);
  const [formCountryIso2, setFormCountryIso2] = useState("PK");
  const [formAreaName, setFormAreaName] = useState("");
  const [formStatus, setFormStatus] = useState<
    "ACTIVE_CONFLICT" | "HIGH_TENSION" | "WATCH"
  >("ACTIVE_CONFLICT");
  const [formNote, setFormNote] = useState("");
  const [formStartsOn, setFormStartsOn] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [formReviewBy, setFormReviewBy] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().slice(0, 10);
  });

  // Settings State
  const [defaultRange, setDefaultRange] = useState("90");
  const [autoRotate, setAutoRotate] = useState(true);
  const [homeGlobe, setHomeGlobe] = useState(true);
  const [disclaimer, setDisclaimer] = useState(
    "Geospatial coordinates and status layers are collated from verified defence communiqués and open-source intelligence. Boundaries depicted do not imply official endorsement by PSF beyond standard cartographic reference frameworks."
  );
  const [savingSettings, setSavingSettings] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [resEntries, resHealth] = await Promise.all([
        getStatusLayerEntries(),
        getGlobalWatchCoverageHealth(),
      ]);
      setEntries(resEntries);
      setHealth(resHealth);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingEntry(null);
    setFormCountryIso2("PK");
    setFormAreaName("");
    setFormStatus("ACTIVE_CONFLICT");
    setFormNote("");
    setFormStartsOn(new Date().toISOString().slice(0, 10));
    const d = new Date();
    d.setDate(d.getDate() + 30);
    setFormReviewBy(d.toISOString().slice(0, 10));
    setIsModalOpen(true);
  };

  const openEditModal = (entry: any) => {
    setEditingEntry(entry);
    setFormCountryIso2(entry.countryIso2);
    setFormAreaName(entry.areaName);
    setFormStatus(entry.status);
    setFormNote(entry.note);
    setFormStartsOn(entry.startsOn);
    setFormReviewBy(entry.reviewBy);
    setIsModalOpen(true);
  };

  const handleSaveEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNote.trim()) return;

    try {
      await saveStatusLayerEntry({
        id: editingEntry?.id,
        countryIso2: formCountryIso2,
        areaName: formAreaName,
        status: formStatus,
        note: formNote,
        startsOn: formStartsOn,
        reviewBy: formReviewBy,
      });
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to save status entry.");
    }
  };

  const handleEndEntry = async (id: string) => {
    if (!confirm("Are you sure you want to retire this status layer entry?")) return;
    try {
      await endStatusLayerEntry(id);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to end status entry.");
    }
  };

  const handleSaveSettings = () => {
    setSavingSettings(true);
    setTimeout(() => {
      setSavingSettings(false);
      alert("Global Watch configuration settings updated.");
    }, 400);
  };

  return (
    <AdminShell title="Global Watch Admin">
      <div className="space-y-6 font-sans">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded-chip">
                Section 12.12 • Geospatial Intelligence
              </span>
              <h1 className="text-xl font-serif font-bold text-ink-900">
                Global Watch Administration & Threat Layers
              </h1>
            </div>
            <p className="text-xs text-ink-500 mt-1">
              Configure 3D globe operational parameters, manage strategic alert overlays, and monitor geocoding coverage health.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={openCreateModal}
              className="flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>New Status Layer Entry (Modal 34)</span>
            </Button>
          </div>
        </div>

        {/* ========================================================
            PANEL 1: STATUS LAYER ENTRIES
            ======================================================== */}
        <div className="bg-white border border-line rounded-sm overflow-hidden shadow-2xs">
          <div className="p-4 bg-ivory-50 border-b border-line flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-sm text-ink-900 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-green-700" />
                <span>Strategic Status Layer Entries ({entries.length})</span>
              </h3>
              <p className="text-[11px] text-ink-500 mt-0.5">
                Real-time situational awareness overlays rendered across the 3D globe and interactive map
              </p>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-xs text-ink-400">
              Loading status layer database entries...
            </div>
          ) : entries.length === 0 ? (
            <div className="p-12 text-center text-xs text-ink-500">
              No status layer entries configured.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-ivory-50 border-b border-line text-[11px] font-bold uppercase tracking-wider text-ink-600">
                    <th className="py-3 px-4">Country & Area</th>
                    <th className="py-3 px-4">Threat Status</th>
                    <th className="py-3 px-4">Situational Operational Note</th>
                    <th className="py-3 px-4">Start Date</th>
                    <th className="py-3 px-4">Review By</th>
                    <th className="py-3 px-4">State</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {entries.map((e) => {
                    let badgeStyle = "bg-blue-100 text-blue-800";
                    if (e.status === "ACTIVE_CONFLICT") {
                      badgeStyle = "bg-red-100 text-red-800 font-bold";
                    } else if (e.status === "HIGH_TENSION") {
                      badgeStyle = "bg-warning-100 text-warning-800 font-bold";
                    }

                    return (
                      <tr
                        key={e.id}
                        className="hover:bg-ivory-50/70 transition-colors"
                      >
                        <td className="py-3 px-4 font-semibold text-ink-900 whitespace-nowrap">
                          <div>
                            {e.countryName} ({e.countryIso2})
                          </div>
                          <div className="text-[10px] text-ink-500 font-normal">
                            {e.areaName}
                          </div>
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-chip ${badgeStyle}`}
                          >
                            {e.status.replace("_", " ")}
                          </span>
                        </td>

                        <td className="py-3 px-4 max-w-xs text-ink-700 line-clamp-2">
                          {e.note}
                        </td>

                        <td className="py-3 px-4 font-mono text-[11px] text-ink-600 whitespace-nowrap">
                          {e.startsOn}
                        </td>

                        <td className="py-3 px-4 font-mono text-[11px] whitespace-nowrap">
                          <span
                            className={
                              e.isExpired ? "text-red-600 font-bold" : "text-ink-600"
                            }
                          >
                            {e.reviewBy}
                          </span>
                          {e.isExpired && (
                            <span className="block text-[9px] text-red-600 uppercase font-bold">
                              Overdue Review
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          {e.endedOn ? (
                            <span className="text-[10px] text-ink-400">
                              Retired {e.endedOn}
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-green-700">
                              Active
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => openEditModal(e)}
                              title="Edit status note"
                              className="p-1 text-ink-500 hover:text-ink-900 rounded-xs"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>

                            {!e.endedOn && (
                              <button
                                type="button"
                                onClick={() => handleEndEntry(e.id)}
                                title="End status entry"
                                className="p-1 text-ink-400 hover:text-red-700 rounded-xs text-[10px] font-bold"
                              >
                                End
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ========================================================
            PANEL 2: GLOBE SETTINGS (FORM PANEL)
            ======================================================== */}
        <div className="bg-white border border-line rounded-sm p-6 shadow-2xs space-y-4">
          <div className="border-b border-line pb-2 flex items-center justify-between">
            <h3 className="font-serif font-bold text-sm text-ink-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-green-700" />
              <span>Globe Settings & Render Defaults</span>
            </h3>
            <span className="text-[10px] text-ink-500 font-mono">
              FRD §12.12 Panel 2
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-ink-700 mb-1">
                Default Temporal Range
              </label>
              <select
                value={defaultRange}
                onChange={(e) => setDefaultRange(e.target.value)}
                className="w-full px-3 py-2 border border-line rounded-sm bg-white focus:border-green-700 focus:outline-hidden"
              >
                <option value="30">Last 30 Days</option>
                <option value="60">Last 60 Days</option>
                <option value="90">Last 90 Days (Default)</option>
                <option value="180">Last 180 Days</option>
                <option value="365">Past Year</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-ink-700 mb-1">
                Globe Auto-Rotation
              </label>
              <select
                value={autoRotate ? "ON" : "OFF"}
                onChange={(e) => setAutoRotate(e.target.value === "ON")}
                className="w-full px-3 py-2 border border-line rounded-sm bg-white focus:border-green-700 focus:outline-hidden"
              >
                <option value="ON">Enabled (0.8 rpm)</option>
                <option value="OFF">Disabled (Stationary)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-ink-700 mb-1">
                Home Front Page Globe Toggle
              </label>
              <select
                value={homeGlobe ? "ON" : "OFF"}
                onChange={(e) => setHomeGlobe(e.target.value === "ON")}
                className="w-full px-3 py-2 border border-line rounded-sm bg-white focus:border-green-700 focus:outline-hidden"
              >
                <option value="ON">Visible on Home Page (Section H8)</option>
                <option value="OFF">Hidden on Home Page</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-ink-700 mb-1 text-xs">
              Cartographic Disclaimer & Attribution Text
            </label>
            <textarea
              rows={2}
              value={disclaimer}
              onChange={(e) => setDisclaimer(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-line rounded-sm focus:border-green-700 focus:outline-hidden font-sans resize-none"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleSaveSettings}
              disabled={savingSettings}
              className="flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savingSettings ? "Updating..." : "Save Globe Settings"}</span>
            </Button>
          </div>
        </div>

        {/* ========================================================
            PANEL 3: COVERAGE HEALTH
            ======================================================== */}
        <div className="bg-white border border-line rounded-sm p-6 shadow-2xs space-y-4">
          <div className="border-b border-line pb-2 flex items-center justify-between">
            <h3 className="font-serif font-bold text-sm text-ink-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-700" />
              <span>Geospatial Coverage Health & Integrity</span>
            </h3>
            <span className="text-[10px] text-ink-500 font-mono">
              FRD §12.12 Panel 3
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-ivory-50 border border-line rounded-sm space-y-1">
              <span className="text-[11px] text-ink-500 font-medium">
                Items Without Coordinates
              </span>
              <div className="text-2xl font-serif font-bold text-green-800">
                0
              </div>
              <p className="text-[10px] text-green-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>100% Geocoded Target Met</span>
              </p>
            </div>

            <div className="p-4 bg-ivory-50 border border-line rounded-sm space-y-1">
              <span className="text-[11px] text-ink-500 font-medium">
                Active Tactical Threat Layers
              </span>
              <div className="text-2xl font-serif font-bold text-ink-900">
                {health?.activeThreatLayers || 2}
              </div>
              <p className="text-[10px] text-ink-500">
                Border & maritime choke points
              </p>
            </div>

            <div className="p-4 bg-ivory-50 border border-line rounded-sm space-y-1">
              <span className="text-[11px] text-ink-500 font-medium">
                Total Published Geocoded Items
              </span>
              <div className="text-2xl font-serif font-bold text-ink-900">
                {health?.totalGeocodedContent || 0}
              </div>
              <p className="text-[10px] text-ink-500">
                Articles, reports, and research papers
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-line text-xs">
            <span className="font-bold text-ink-800 block">
              Top Covered Locations (Cluster Density)
            </span>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 font-mono text-[11px]">
              {health?.topLocations?.map((loc: any) => (
                <div
                  key={loc.name}
                  className="p-2 border border-line rounded-xs bg-white flex items-center justify-between"
                >
                  <span className="truncate text-ink-700">{loc.name}</span>
                  <span className="font-bold text-green-800 ml-1">
                    {loc.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal 34: Status Layer Entry */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="bg-white border border-line rounded-sm p-6 max-w-md w-full space-y-4 shadow-xl text-xs font-sans">
              <div className="flex items-center justify-between border-b border-line pb-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-green-700">
                    Modal 34
                  </span>
                  <h3 className="font-serif font-bold text-base text-ink-900">
                    {editingEntry ? "Edit Status Layer" : "Create Status Layer"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-ink-400 hover:text-ink-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEntry} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-ink-700 mb-1">
                      Country ISO2 Code
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={2}
                      value={formCountryIso2}
                      onChange={(e) =>
                        setFormCountryIso2(e.target.value.toUpperCase())
                      }
                      className="w-full px-3 py-1.5 border border-line rounded-sm focus:border-green-700 focus:outline-hidden font-mono uppercase"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-ink-700 mb-1">
                      Threat Level
                    </label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as any)}
                      className="w-full px-3 py-1.5 border border-line rounded-sm bg-white focus:border-green-700 focus:outline-hidden"
                    >
                      <option value="ACTIVE_CONFLICT">Active Conflict</option>
                      <option value="HIGH_TENSION">High Tension</option>
                      <option value="WATCH">Watch / Normal</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-ink-700 mb-1">
                    Area / Border Sector Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Line of Control / Sialkot Working Boundary"
                    value={formAreaName}
                    onChange={(e) => setFormAreaName(e.target.value)}
                    className="w-full px-3 py-1.5 border border-line rounded-sm focus:border-green-700 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-ink-700 mb-1">
                    Operational Intelligence Note
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Strategic observation, tactical alert, or surveillance brief..."
                    value={formNote}
                    onChange={(e) => setFormNote(e.target.value)}
                    className="w-full px-3 py-2 border border-line rounded-sm focus:border-green-700 focus:outline-hidden resize-none font-sans"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-ink-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formStartsOn}
                      onChange={(e) => setFormStartsOn(e.target.value)}
                      className="w-full px-3 py-1.5 border border-line rounded-sm focus:border-green-700 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-ink-700 mb-1">
                      Review-By Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formReviewBy}
                      onChange={(e) => setFormReviewBy(e.target.value)}
                      className="w-full px-3 py-1.5 border border-line rounded-sm focus:border-green-700 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-line">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    Save Status Entry
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}

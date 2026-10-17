"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Shield,
  ShieldAlert,
  Check,
  Search,
  Lock,
  Copy,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveRole } from "@/app/actions/role-actions";
import { PERMISSION_GROUPS } from "@/lib/constants/rbac";

interface RoleEditorModalProps {
  isOpen: boolean;
  role: any | null;
  onClose: () => void;
  onSaved: () => void;
}

const COLOR_OPTIONS = [
  { key: "green", label: "Brand Green", bg: "bg-green-700", text: "text-white" },
  { key: "gold", label: "Crest Gold", bg: "bg-[#B3801A]", text: "text-white" },
  { key: "navy", label: "Navy Blue", bg: "bg-[#1E3A8A]", text: "text-white" },
  { key: "steel", label: "Tactical Steel", bg: "bg-[#475569]", text: "text-white" },
  { key: "slate", label: "Muted Slate", bg: "bg-[#64748B]", text: "text-white" },
  { key: "amber", label: "Watch Amber", bg: "bg-[#D97706]", text: "text-white" },
];

export function RoleEditorModal({
  isOpen,
  role,
  onClose,
  onSaved,
}: RoleEditorModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [chipColour, setChipColour] = useState("green");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isSuperAdmin = role?.name === "SUPER_ADMIN";
  const isSystemRole = Boolean(role?.isSystem);

  useEffect(() => {
    if (role) {
      setName(role.name);
      setDescription(role.description || "");
      setChipColour(role.chipColour || "green");
      setSelectedPermissions(role.permissionKeys || []);
    } else {
      setName("");
      setDescription("");
      setChipColour("green");
      setSelectedPermissions(["articles.submit"]);
    }
    setErrorMsg(null);

    // Expand all groups by default
    const exp: Record<string, boolean> = {};
    PERMISSION_GROUPS.forEach((g) => {
      exp[g.name] = true;
    });
    setExpandedGroups(exp);
  }, [role, isOpen]);

  if (!isOpen) return null;

  const togglePermission = (key: string) => {
    if (isSuperAdmin) return;
    setSelectedPermissions((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const toggleGroup = (groupPermissions: { key: string }[]) => {
    if (isSuperAdmin) return;
    const keys = groupPermissions.map((p) => p.key);
    const allSelected = keys.every((k) => selectedPermissions.includes(k));

    if (allSelected) {
      setSelectedPermissions((prev) => prev.filter((k) => !keys.includes(k)));
    } else {
      const union = Array.from(new Set([...selectedPermissions, ...keys]));
      setSelectedPermissions(union);
    }
  };

  const toggleGroupAccordion = (groupName: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  const handleSave = async () => {
    if (!name.trim()) {
      setErrorMsg("Role identifier name is required.");
      return;
    }
    if (!description.trim()) {
      setErrorMsg("Role operational description is required.");
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await saveRole({
        id: role?.id,
        name,
        description,
        chipColour,
        permissionKeys: selectedPermissions,
      });

      if (res.success) {
        onSaved();
      } else {
        setErrorMsg(res.error || "Failed to save role.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  // Generate live capability summary
  const getSummary = () => {
    const parts: string[] = [];
    if (selectedPermissions.includes("dashboard.view")) parts.push("view admin overview");
    if (selectedPermissions.includes("articles.decide") || selectedPermissions.includes("reports.decide")) parts.push("approve editorial manuscripts");
    if (selectedPermissions.includes("research.review")) parts.push("conduct blind peer review");
    if (selectedPermissions.includes("research.final_decide")) parts.push("make final research decisions");
    if (selectedPermissions.includes("newsroom.manage")) parts.push("publish breaking newsroom wire");
    if (selectedPermissions.includes("featured.manage")) parts.push("manage top story placements");
    if (selectedPermissions.includes("ads.manage")) parts.push("manage commercial ad campaigns");
    if (selectedPermissions.includes("users.assign_roles")) parts.push("assign user roles");
    if (selectedPermissions.includes("logs.view")) parts.push("audit immutable activity logs");
    if (selectedPermissions.includes("settings.manage")) parts.push("modify governance settings");

    if (parts.length === 0) return "Basic submission access only.";
    return `Can ${parts.slice(0, 4).join(", ")}${parts.length > 4 ? ` and ${parts.length - 4} more capabilities.` : "."}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto">
      <div className="bg-white border border-line rounded-sm shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col my-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-line flex items-center justify-between bg-ivory-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-green-50 border border-green-200 flex items-center justify-center text-green-800">
              {isSystemRole ? <Lock className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
            </div>
            <div>
              <h2 className="text-base font-bold text-ink-900 font-serif">
                {role ? `Edit Role: ${role.name}` : "Create Custom Role"}
              </h2>
              <p className="text-xs text-ink-500">
                Configure role identity, visual chip designation, and granular RBAC permissions.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-ink-400 hover:text-ink-700 p-1 rounded-sm hover:bg-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* System Role Warning */}
        {isSuperAdmin ? (
          <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 flex items-center gap-2 text-xs text-amber-800 shrink-0">
            <Lock className="w-4 h-4 shrink-0" />
            <span>
              <strong>Super Administrator:</strong> Core system permissions are permanently locked to ensure platform integrity.
            </span>
          </div>
        ) : isSystemRole ? (
          <div className="bg-blue-50 border-b border-blue-200 px-6 py-2.5 flex items-center gap-2 text-xs text-blue-800 shrink-0">
            <Info className="w-4 h-4 shrink-0" />
            <span>
              <strong>System Role:</strong> Changes here apply system-wide to all institutional staff and contributors with this assignment.
            </span>
          </div>
        ) : null}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-sm">
              {errorMsg}
            </div>
          )}

          {/* Role Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-ink-700 font-semibold mb-1">
                Role Identifier / Name *
              </label>
              <input
                type="text"
                disabled={isSystemRole}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. DESK_EDITOR"
                className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700 disabled:bg-ivory-100 disabled:text-ink-500 font-mono text-xs uppercase"
              />
              <span className="text-[11px] text-ink-400 mt-1 block">
                {isSystemRole ? "System role names cannot be renamed." : "Unique uppercase identifier string."}
              </span>
            </div>

            <div>
              <label className="block text-ink-700 font-semibold mb-1">
                Badge Chip Colour *
              </label>
              <div className="flex items-center gap-2 pt-1">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setChipColour(c.key)}
                    className={`w-7 h-7 rounded-sm flex items-center justify-center transition-all ${c.bg} ${
                      chipColour === c.key ? "ring-2 ring-offset-2 ring-ink-900 scale-105" : "opacity-80 hover:opacity-100"
                    }`}
                    title={c.label}
                  >
                    {chipColour === c.key && <Check className="w-4 h-4 text-white" />}
                  </button>
                ))}
                <span className="ml-2 font-mono text-[11px] uppercase text-ink-600">
                  {chipColour}
                </span>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-ink-700 font-semibold mb-1">
                Operational Description *
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe this role's mandate and authority level..."
                className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700 text-xs"
              />
            </div>
          </div>

          {/* Live Capability Summary Banner */}
          <div className="p-3.5 bg-ivory-100 border border-line rounded-sm flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-ink-500 block">
                Granted Capabilities Summary ({selectedPermissions.length} / 55 permissions active)
              </span>
              <p className="text-xs text-ink-800 font-medium italic">
                "{getSummary()}"
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2 py-1 bg-white border border-line rounded-sm font-mono text-[11px] font-bold text-ink-700">
                {Math.round((selectedPermissions.length / 55) * 100)}% Coverage
              </span>
            </div>
          </div>

          {/* Granular Permission Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-line">
              <div className="flex items-center gap-2">
                <span className="font-bold text-ink-900 text-xs uppercase tracking-wider">
                  Permission Catalogue (FRD Section 5.3)
                </span>
              </div>
              <div className="relative w-64">
                <Search className="w-3.5 h-3.5 text-ink-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter permissions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 border border-line rounded-sm text-xs bg-white focus:outline-none focus:border-green-700"
                />
              </div>
            </div>

            {/* Groups */}
            <div className="space-y-3">
              {PERMISSION_GROUPS.map((group) => {
                const filteredPerms = group.permissions.filter(
                  (p) =>
                    p.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.description.toLowerCase().includes(searchQuery.toLowerCase())
                );

                if (filteredPerms.length === 0) return null;

                const groupKeys = group.permissions.map((p) => p.key);
                const allGroupSelected = groupKeys.every((k) =>
                  selectedPermissions.includes(k)
                );
                const someGroupSelected = groupKeys.some((k) =>
                  selectedPermissions.includes(k)
                );
                const isExpanded = expandedGroups[group.name] ?? true;

                return (
                  <div
                    key={group.name}
                    className="border border-line rounded-sm overflow-hidden bg-white"
                  >
                    <div className="bg-ivory-50 px-4 py-2 flex items-center justify-between border-b border-line select-none">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => toggleGroupAccordion(group.name)}
                          className="text-ink-600 hover:text-ink-900 flex items-center gap-1.5 font-bold text-xs"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                          <span>{group.name}</span>
                        </button>
                        <span className="text-[10px] text-ink-400">
                          ({group.permissions.filter((p) => selectedPermissions.includes(p.key)).length} / {group.permissions.length})
                        </span>
                      </div>

                      {!isSuperAdmin && (
                        <button
                          type="button"
                          onClick={() => toggleGroup(group.permissions)}
                          className="text-[11px] font-semibold text-green-700 hover:text-green-800"
                        >
                          {allGroupSelected ? "Deselect All" : "Select All"}
                        </button>
                      )}
                    </div>

                    {isExpanded && (
                      <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-2 bg-white">
                        {filteredPerms.map((perm) => {
                          const isChecked = selectedPermissions.includes(perm.key);
                          return (
                            <label
                              key={perm.key}
                              className={`flex items-start gap-2.5 p-2 rounded-sm border transition-colors cursor-pointer ${
                                isChecked
                                  ? "bg-green-50/40 border-green-200"
                                  : "border-transparent hover:bg-ivory-50"
                              } ${isSuperAdmin ? "opacity-90 cursor-default" : ""}`}
                            >
                              <input
                                type="checkbox"
                                disabled={isSuperAdmin}
                                checked={isChecked}
                                onChange={() => togglePermission(perm.key)}
                                className="mt-0.5 rounded-sm border-line text-green-700 focus:ring-green-700 h-3.5 w-3.5"
                              />
                              <div className="min-w-0">
                                <span className="font-mono text-[11px] font-semibold text-ink-900 block truncate">
                                  {perm.key}
                                </span>
                                <span className="text-[11px] text-ink-500 leading-tight block">
                                  {perm.description}
                                </span>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-line bg-ivory-50 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-ink-500">
            {role ? `Last updated: ${new Date(role.updatedAt || Date.now()).toLocaleDateString("en-GB")}` : "Unsaved custom role"}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onClose} disabled={submitting}>
              Cancel
            </Button>
            {!isSuperAdmin && (
              <Button
                variant="primary"
                onClick={handleSave}
                disabled={submitting}
              >
                {submitting ? "Saving Role..." : role ? "Save Role Changes" : "Create Custom Role"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { AdminShell } from "@/components/layout/admin-shell";
import {
  KeyRound,
  Shield,
  ShieldAlert,
  Plus,
  Lock,
  Copy,
  Trash2,
  Edit2,
  Users,
  Check,
  Grid,
  List,
  RefreshCw,
  Search,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getRoles,
  duplicateRole,
  deleteRole,
} from "@/app/actions/role-actions";
import { PERMISSION_GROUPS, ALL_PERMISSIONS } from "@/lib/constants/rbac";
import { RoleEditorModal } from "@/components/admin/roles/role-editor-modal";

const CHIP_BG_MAP: Record<string, string> = {
  green: "bg-green-100 text-green-800 border-green-300",
  gold: "bg-[#FEF3C7] text-[#92400E] border-[#FCD34D]",
  navy: "bg-blue-100 text-blue-800 border-blue-300",
  steel: "bg-slate-200 text-slate-800 border-slate-300",
  slate: "bg-gray-100 text-gray-800 border-gray-300",
  amber: "bg-amber-100 text-amber-900 border-amber-300",
};

export default function AdminRolesPage() {
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"catalogue" | "matrix">("catalogue");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any | null>(null);

  // Duplicate state
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false);
  const [roleToDuplicate, setRoleToDuplicate] = useState<any | null>(null);
  const [newRoleName, setNewRoleName] = useState("");

  // Delete state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<any | null>(null);
  const [reassignRoleId, setReassignRoleId] = useState<string>("");
  const [actionError, setActionError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getRoles();
      setRoles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setSelectedRole(null);
    setEditorOpen(true);
  };

  const handleOpenEdit = (role: any) => {
    setSelectedRole(role);
    setEditorOpen(true);
  };

  const handleOpenDuplicate = (role: any) => {
    setRoleToDuplicate(role);
    setNewRoleName(`${role.name}_COPY`);
    setActionError(null);
    setDuplicateModalOpen(true);
  };

  const handleConfirmDuplicate = async () => {
    if (!roleToDuplicate || !newRoleName.trim()) return;
    try {
      const res = await duplicateRole(roleToDuplicate.id, newRoleName.trim());
      if (res.success) {
        setDuplicateModalOpen(false);
        loadData();
      } else {
        setActionError(res.error || "Failed to duplicate role");
      }
    } catch (err: any) {
      setActionError(err.message || "An error occurred");
    }
  };

  const handleOpenDelete = (role: any) => {
    setRoleToDelete(role);
    setActionError(null);
    // Default reassignment role to first other role
    const fallback = roles.find((r) => r.id !== role.id);
    setReassignRoleId(fallback ? fallback.id : "");
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!roleToDelete) return;
    try {
      const res = await deleteRole(roleToDelete.id, roleToDelete.userCount > 0 ? reassignRoleId : undefined);
      if (res.success) {
        setDeleteModalOpen(false);
        loadData();
      } else {
        setActionError(res.error || "Failed to delete role");
      }
    } catch (err: any) {
      setActionError(err.message || "An error occurred");
    }
  };

  const filteredRoles = roles.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminShell title="Roles & Permissions Management">
      <div className="space-y-6">
        {/* Top Breadcrumb & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
          <div>
            <div className="flex items-center gap-2 text-xs text-ink-500 mb-1">
              <span>Admin Console</span>
              <span>/</span>
              <span className="text-ink-900 font-semibold">Roles & RBAC</span>
            </div>
            <h1 className="text-2xl font-bold font-serif text-ink-900 tracking-tight">
              Roles & Permissions (RBAC)
            </h1>
            <p className="text-xs text-ink-600 mt-1 max-w-2xl">
              Configure strict Role-Based Access Control matrix. System roles protect institutional
              integrity, while custom roles permit fine-grained editorial assignment.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center bg-white border border-line rounded-sm p-0.5">
              <button
                onClick={() => setViewMode("catalogue")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-sm transition-colors ${
                  viewMode === "catalogue"
                    ? "bg-green-700 text-white"
                    : "text-ink-600 hover:text-ink-900"
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Catalogue</span>
              </button>
              <button
                onClick={() => setViewMode("matrix")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-sm transition-colors ${
                  viewMode === "matrix"
                    ? "bg-green-700 text-white"
                    : "text-ink-600 hover:text-ink-900"
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>RBAC Matrix</span>
              </button>
            </div>

            <Button variant="primary" onClick={handleOpenCreate}>
              <Plus className="w-4 h-4 mr-1.5" />
              <span>Create Custom Role</span>
            </Button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white border border-line rounded-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">
              Total Defined Roles
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold font-serif text-ink-900">
                {roles.length}
              </span>
              <KeyRound className="w-4 h-4 text-green-700" />
            </div>
          </div>

          <div className="p-4 bg-white border border-line rounded-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">
              System Protected Roles
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold font-serif text-ink-900">
                {roles.filter((r) => r.isSystem).length}
              </span>
              <Lock className="w-4 h-4 text-ink-500" />
            </div>
          </div>

          <div className="p-4 bg-white border border-line rounded-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">
              Custom Assigned Roles
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold font-serif text-ink-900">
                {roles.filter((r) => !r.isSystem).length}
              </span>
              <Shield className="w-4 h-4 text-blue-600" />
            </div>
          </div>

          <div className="p-4 bg-white border border-line rounded-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">
              RBAC Permissions
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold font-serif text-ink-900">
                55
              </span>
              <span className="text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded-sm font-semibold">
                17 Groups
              </span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-ink-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search roles by identifier or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-line rounded-sm bg-white text-xs text-ink-900 focus:outline-none focus:border-green-700"
            />
          </div>
          <button
            onClick={loadData}
            className="flex items-center gap-1.5 text-xs text-ink-600 hover:text-ink-900 px-3 py-2 border border-line bg-white rounded-sm hover:bg-ivory-50 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>

        {/* View Mode 1: Catalogue Table View */}
        {viewMode === "catalogue" && (
          <div className="bg-white border border-line rounded-sm overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-ivory-50 border-b border-line text-[11px] font-bold uppercase tracking-wider text-ink-600">
                    <th className="py-3 px-4">Role Identifier & Badge</th>
                    <th className="py-3 px-4">Operational Description</th>
                    <th className="py-3 px-4 text-center">Type</th>
                    <th className="py-3 px-4 text-center">Assigned Users</th>
                    <th className="py-3 px-4 text-center">Permissions</th>
                    <th className="py-3 px-4">Last Updated</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-ink-400">
                        Loading RBAC catalogue...
                      </td>
                    </tr>
                  ) : filteredRoles.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-ink-400">
                        No roles found matching "{searchQuery}".
                      </td>
                    </tr>
                  ) : (
                    filteredRoles.map((role) => {
                      const chipClass =
                        CHIP_BG_MAP[role.chipColour] || CHIP_BG_MAP.slate;

                      return (
                        <tr key={role.id} className="hover:bg-ivory-50/50 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-0.5 rounded-sm border font-mono text-[11px] font-bold ${chipClass}`}
                              >
                                {role.name}
                              </span>
                            </div>
                          </td>

                          <td className="py-3 px-4 max-w-md text-ink-700">
                            {role.description}
                          </td>

                          <td className="py-3 px-4 text-center">
                            {role.isSystem ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-ivory-100 text-ink-700 rounded-sm font-semibold text-[10px]">
                                <Lock className="w-3 h-3 text-ink-500" />
                                <span>System</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-sm font-semibold text-[10px]">
                                <Shield className="w-3 h-3 text-blue-600" />
                                <span>Custom</span>
                              </span>
                            )}
                          </td>

                          <td className="py-3 px-4 text-center">
                            <span className="font-semibold text-ink-900 inline-flex items-center gap-1">
                              <Users className="w-3 h-3 text-ink-400" />
                              {role.userCount}
                            </span>
                          </td>

                          <td className="py-3 px-4 text-center">
                            <span className="font-mono text-[11px] font-bold text-ink-800">
                              {role.permissionKeys.length} / 55
                            </span>
                          </td>

                          <td className="py-3 px-4 text-ink-500 font-mono text-[11px]">
                            {new Date(role.updatedAt).toLocaleDateString("en-GB")}
                          </td>

                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleOpenEdit(role)}
                                className="p-1.5 text-ink-600 hover:text-green-700 hover:bg-ivory-100 rounded-sm transition-colors"
                                title="Edit Permissions"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleOpenDuplicate(role)}
                                className="p-1.5 text-ink-600 hover:text-blue-700 hover:bg-ivory-100 rounded-sm transition-colors"
                                title="Duplicate Role"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>

                              {!role.isSystem && (
                                <button
                                  onClick={() => handleOpenDelete(role)}
                                  className="p-1.5 text-ink-600 hover:text-red-700 hover:bg-red-50 rounded-sm transition-colors"
                                  title="Delete Custom Role"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* View Mode 2: Full 2D RBAC Matrix Grid (FRD Section 5.4) */}
        {viewMode === "matrix" && (
          <div className="bg-white border border-line rounded-sm overflow-hidden shadow-sm">
            <div className="p-4 bg-ivory-50 border-b border-line flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-sm text-ink-900">
                  Granular Permission Matrix (55 Permissions × {roles.length} Roles)
                </h3>
                <p className="text-xs text-ink-600">
                  Complete view of granted capabilities according to PSF-FRD Section 5.4 default rules.
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5 text-green-700 font-semibold">
                  <span className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-[10px]">✔</span>
                  <span>Granted System-wide</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-700 font-semibold">
                  <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded-sm text-[10px]">Own</span>
                  <span>Author Only</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto max-h-[70vh]">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="sticky top-0 z-10 bg-ivory-100 border-b border-line shadow-xs">
                  <tr className="text-[11px] font-bold uppercase tracking-wider text-ink-700">
                    <th className="py-3 px-4 bg-ivory-100 min-w-[280px]">Permission Key & Group</th>
                    {roles.map((r) => (
                      <th
                        key={r.id}
                        className="py-3 px-3 text-center min-w-[120px] font-mono text-[10px]"
                      >
                        <div className="truncate">{r.name}</div>
                        <span className="text-[9px] font-normal normal-case text-ink-500 block">
                          {r.isSystem ? "System" : "Custom"}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {PERMISSION_GROUPS.map((group) => (
                    <React.Fragment key={group.name}>
                      <tr className="bg-ivory-50/80 font-bold text-ink-900 border-y border-line">
                        <td
                          colSpan={roles.length + 1}
                          className="py-2 px-4 text-[11px] uppercase tracking-wider bg-ivory-100/60"
                        >
                          {group.name}
                        </td>
                      </tr>
                      {group.permissions.map((perm) => (
                        <tr key={perm.key} className="hover:bg-ivory-50/40 transition-colors">
                          <td className="py-2.5 px-4">
                            <span className="font-mono text-[11px] font-semibold text-ink-900 block">
                              {perm.key}
                            </span>
                            <span className="text-[10px] text-ink-500 block leading-tight">
                              {perm.description}
                            </span>
                          </td>

                          {roles.map((role) => {
                            const isGranted = role.permissionKeys.includes(perm.key);
                            const isOwnOnly =
                              ["ARTICLE_WRITER", "RESEARCH_WRITER", "APPROVER", "EXPERT"].includes(role.name) &&
                              ["articles.submit", "reports.submit", "research.submit"].includes(perm.key);

                            return (
                              <td
                                key={`${role.id}-${perm.key}`}
                                className="py-2.5 px-3 text-center border-l border-line/40"
                              >
                                {isOwnOnly ? (
                                  <span className="inline-block px-1.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-sm font-semibold text-[10px]">
                                    Own
                                  </span>
                                ) : isGranted ? (
                                  <span className="w-5 h-5 rounded-full bg-green-50 border border-green-200 text-green-700 inline-flex items-center justify-center font-bold text-xs mx-auto">
                                    ✔
                                  </span>
                                ) : (
                                  <span className="text-ink-200 font-mono text-xs">—</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal 1: Role Editor Drawer */}
        <RoleEditorModal
          isOpen={editorOpen}
          role={selectedRole}
          onClose={() => setEditorOpen(false)}
          onSaved={() => {
            setEditorOpen(false);
            loadData();
          }}
        />

        {/* Modal 2: Duplicate Role Modal */}
        {duplicateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="bg-white border border-line rounded-sm shadow-xl w-full max-w-md p-6 space-y-4">
              <div className="flex items-center gap-2.5 text-ink-900">
                <Copy className="w-5 h-5 text-blue-600" />
                <h3 className="font-serif font-bold text-base">Duplicate Role</h3>
              </div>
              <p className="text-xs text-ink-600">
                Create a new custom role pre-populated with all {roleToDuplicate?.permissionKeys.length} permissions
                from <strong>{roleToDuplicate?.name}</strong>.
              </p>

              {actionError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm">
                  {actionError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">
                  New Role Identifier *
                </label>
                <input
                  type="text"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="e.g. SENIOR_EDITOR"
                  className="w-full px-3 py-2 border border-line rounded-sm bg-white text-xs font-mono uppercase focus:outline-none focus:border-green-700"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-line">
                <Button variant="outline" onClick={() => setDuplicateModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleConfirmDuplicate}>
                  Duplicate & Create
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Modal 3: Delete Role Dialog with Reassignment */}
        {deleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="bg-white border border-line rounded-sm shadow-xl w-full max-w-md p-6 space-y-4">
              <div className="flex items-center gap-2.5 text-red-700">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <h3 className="font-serif font-bold text-base text-ink-900">
                  Delete Role: {roleToDelete?.name}
                </h3>
              </div>

              <p className="text-xs text-ink-600">
                Are you sure you want to delete this custom role? This action is recorded in the immutable audit log.
              </p>

              {roleToDelete?.userCount > 0 ? (
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-sm space-y-2">
                  <span className="text-xs font-bold text-amber-900 block">
                    {roleToDelete.userCount} User(s) Currently Assigned
                  </span>
                  <p className="text-[11px] text-amber-800">
                    To maintain access integrity, select a replacement role to automatically reassign all affected users:
                  </p>
                  <select
                    value={reassignRoleId}
                    onChange={(e) => setReassignRoleId(e.target.value)}
                    className="w-full px-3 py-1.5 border border-amber-300 rounded-sm bg-white text-xs text-ink-900 focus:outline-none focus:border-green-700"
                  >
                    {roles
                      .filter((r) => r.id !== roleToDelete.id)
                      .map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name} ({r.description.slice(0, 40)}...)
                        </option>
                      ))}
                  </select>
                </div>
              ) : (
                <div className="p-3 bg-ivory-50 border border-line text-xs text-ink-600 rounded-sm">
                  No active users are currently assigned to this custom role. It can be deleted safely.
                </div>
              )}

              {actionError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm">
                  {actionError}
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-line">
                <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleConfirmDelete}>
                  Confirm Deletion
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { AdminShell } from "@/components/layout/admin-shell";
import {
  Users,
  Search,
  Filter,
  Shield,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Ban,
  ExternalLink,
  ChevronRight,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getUsersList,
  toggleUserStatus,
} from "@/app/actions/user-admin-actions";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getUsersList({
        status: statusFilter,
        query: searchQuery,
      });
      setUsers(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter, searchQuery]);

  const handleStatusUpdate = async (
    userId: string,
    newStatus: "ACTIVE" | "DEACTIVATED" | "BANNED"
  ) => {
    if (
      !confirm(`Are you sure you want to change this user's status to ${newStatus}?`)
    ) {
      return;
    }
    try {
      await toggleUserStatus(userId, newStatus);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to update user status.");
    }
  };

  return (
    <AdminShell title="Users & Author Accounts">
      <div className="space-y-6 font-sans">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded-chip">
                Section 12.3 • People & Access
              </span>
              <h1 className="text-xl font-serif font-bold text-ink-900">
                User Accounts & Accredited Authors
              </h1>
            </div>
            <p className="text-xs text-ink-500 mt-1">
              Manage identity credentials, institutional designations, multi-factor enforcement, and editorial authorship status.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-ink-500">
              Total Accounts: <strong>{users.length}</strong>
            </span>
            <span className="text-ink-300">•</span>
            <span className="text-green-700 font-semibold">
              Active: {users.filter((u) => u.status === "ACTIVE").length}
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 border border-line rounded-sm shadow-2xs">
          <div className="flex items-center gap-1 text-xs">
            {["ALL", "ACTIVE", "PENDING", "DEACTIVATED", "BANNED"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xs font-medium transition-colors ${
                  statusFilter === st
                    ? "bg-green-700 text-white font-bold"
                    : "text-ink-600 hover:bg-ivory-100"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-ink-400" />
            <input
              type="text"
              placeholder="Search by name, email, or handle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-line rounded-sm focus:border-green-700 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white border border-line rounded-sm overflow-hidden shadow-2xs">
          {loading ? (
            <div className="p-12 text-center text-xs text-ink-400">
              Loading user accounts and role assignments...
            </div>
          ) : users.length === 0 ? (
            <div className="p-12 text-center text-xs text-ink-500">
              No users found matching the selected criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-ivory-50 border-b border-line text-[11px] font-bold uppercase tracking-wider text-ink-600">
                    <th className="py-3 px-4">Author / User</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Roles</th>
                    <th className="py-3 px-4">Designation & Institution</th>
                    <th className="py-3 px-4 text-center">Authored</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Joined</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {users.map((u) => (
                    <tr
                      key={u.id}
                      className="hover:bg-ivory-50/70 transition-colors"
                    >
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="font-semibold text-ink-900">
                          {u.displayName}
                        </div>
                        <div className="text-[10px] text-ink-400 font-mono">
                          @{u.username}
                        </div>
                      </td>

                      <td className="py-3 px-4 font-mono text-ink-600 whitespace-nowrap">
                        {u.email}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {u.roles.map((r: string) => (
                            <span
                              key={r}
                              className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-chip ${
                                r === "SUPER_ADMIN"
                                  ? "bg-red-50 text-red-700"
                                  : r === "APPROVER"
                                  ? "bg-green-50 text-green-700"
                                  : "bg-blue-50 text-blue-700"
                              }`}
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="py-3 px-4 max-w-xs truncate text-ink-700">
                        <div>{u.designation}</div>
                        <div className="text-[10px] text-ink-500">
                          {u.institution}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-center font-mono text-ink-900">
                        {u.articlesCount}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-chip ${
                            u.status === "ACTIVE"
                              ? "bg-green-100 text-green-800"
                              : u.status === "PENDING"
                              ? "bg-warning-50 text-warning-800"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>

                      <td className="py-3 px-4 font-mono text-[11px] text-ink-500 whitespace-nowrap">
                        {u.createdAt}
                      </td>

                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {u.status === "ACTIVE" ? (
                            <button
                              type="button"
                              onClick={() =>
                                handleStatusUpdate(u.id, "DEACTIVATED")
                              }
                              title="Deactivate account"
                              className="p-1 text-ink-400 hover:text-warning-800 hover:bg-warning-50 rounded-xs"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                handleStatusUpdate(u.id, "ACTIVE")
                              }
                              title="Activate account"
                              className="p-1 text-green-700 hover:bg-green-50 rounded-xs"
                            >
                              <UserCheck className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {u.status !== "BANNED" && (
                            <button
                              type="button"
                              onClick={() =>
                                handleStatusUpdate(u.id, "BANNED")
                              }
                              title="Permanently Ban Account"
                              className="p-1 text-ink-400 hover:text-red-700 hover:bg-red-50 rounded-xs"
                            >
                              <Ban className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}

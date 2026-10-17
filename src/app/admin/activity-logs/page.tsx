"use client";

import React, { useState, useEffect } from "react";
import { AdminShell } from "@/components/layout/admin-shell";
import {
  History,
  Search,
  Filter,
  Download,
  RefreshCw,
  Shield,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ChevronRight,
  Eye,
  Clock,
  Globe,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getActivityLogs,
  exportActivityLogsCsv,
} from "@/app/actions/activity-actions";
import { ACTION_GROUPS } from "@/lib/constants/activity";
import { ActivityDetailModal } from "@/components/admin/activity/activity-detail-modal";

export default function AdminActivityLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  // Filters
  const [query, setQuery] = useState("");
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d" | "all">("all");
  const [resultFilter, setResultFilter] = useState<"ALL" | "SUCCESS" | "FAILED">("ALL");
  const [selectedGroup, setSelectedGroup] = useState("ALL");

  // Detail Modal state
  const [selectedLog, setSelectedLog] = useState<any | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getActivityLogs({
        query,
        timeframe,
        result: resultFilter,
        group: selectedGroup,
      });
      setLogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [timeframe, resultFilter, selectedGroup]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
  };

  const handleExportCsv = async () => {
    setExporting(true);
    try {
      const csv = await exportActivityLogsCsv({
        query,
        timeframe,
        result: resultFilter,
        group: selectedGroup,
      });

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `psf-audit-logs-${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Export error:", err);
    } finally {
      setExporting(false);
    }
  };

  // Metrics
  const successCount = logs.filter((l) => l.result === "SUCCESS").length;
  const failureCount = logs.filter((l) => l.result === "FAILED").length;
  const uniqueActors = new Set(logs.map((l) => l.actorEmail)).size;

  return (
    <AdminShell title="Activity Audit Logs">
      <div className="space-y-6">
        {/* Top Header & Export */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
          <div>
            <div className="flex items-center gap-2 text-xs text-ink-500 mb-1">
              <span>Admin Console</span>
              <span>/</span>
              <span className="text-ink-900 font-semibold">Security & Audit</span>
            </div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-bold font-serif text-ink-900 tracking-tight">
                Activity Logs
              </h1>
              <span className="px-2 py-0.5 bg-red-100 text-red-800 border border-red-300 rounded-sm text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Super Admin Only
              </span>
            </div>
            <p className="text-xs text-ink-600 mt-1 max-w-2xl">
              Immutable, append-only operational and security audit log. Every administrative action,
              review decision, permission change, and auth event is timestamped to the second in PKT.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={loadData}
              className="flex items-center gap-1.5 text-xs text-ink-600 hover:text-ink-900 px-3 py-2 border border-line bg-white rounded-sm hover:bg-ivory-50 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
            <Button
              variant="outline"
              onClick={handleExportCsv}
              disabled={exporting}
            >
              <Download className="w-4 h-4 mr-1.5" />
              <span>{exporting ? "Generating CSV..." : "Export CSV Archive"}</span>
            </Button>
          </div>
        </div>

        {/* Metric Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white border border-line rounded-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">
              Recorded Events
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold font-serif text-ink-900">
                {logs.length}
              </span>
              <History className="w-4 h-4 text-green-700" />
            </div>
          </div>

          <div className="p-4 bg-white border border-line rounded-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">
              Successful Actions
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold font-serif text-ink-900">
                {successCount}
              </span>
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            </div>
          </div>

          <div className="p-4 bg-white border border-line rounded-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">
              Security / Auth Failures
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold font-serif text-ink-900">
                {failureCount}
              </span>
              <XCircle className="w-4 h-4 text-red-600" />
            </div>
          </div>

          <div className="p-4 bg-white border border-line rounded-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">
              Active Actors Tracked
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold font-serif text-ink-900">
                {uniqueActors}
              </span>
              <Shield className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white border border-line rounded-sm p-4 space-y-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-ink-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by action, actor, target entity, or IP address..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-24 py-1.5 border border-line rounded-sm bg-white text-xs text-ink-900 focus:outline-none focus:border-green-700"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 px-2.5 py-1 bg-ivory-100 text-ink-700 hover:bg-ivory-200 text-xs font-semibold rounded-sm"
              >
                Search
              </button>
            </form>

            {/* Timeframe & Result Selectors */}
            <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
              <div className="flex items-center bg-ivory-50 border border-line rounded-sm p-0.5 text-xs">
                {(["24h", "7d", "30d", "all"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeframe(t)}
                    className={`px-2.5 py-1 rounded-sm uppercase text-[10px] font-bold tracking-wider transition-colors ${
                      timeframe === t
                        ? "bg-green-700 text-white"
                        : "text-ink-600 hover:text-ink-900"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <select
                value={resultFilter}
                onChange={(e) => setResultFilter(e.target.value as any)}
                className="px-2.5 py-1.5 border border-line rounded-sm bg-white text-xs text-ink-700 focus:outline-none focus:border-green-700"
              >
                <option value="ALL">All Results</option>
                <option value="SUCCESS">Success Only</option>
                <option value="FAILED">Failed Only</option>
              </select>
            </div>
          </div>

          {/* Action Group Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 text-xs">
            <span className="text-[10px] uppercase font-bold text-ink-400 tracking-wider mr-1 shrink-0">
              Module:
            </span>
            {ACTION_GROUPS.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGroup(g)}
                className={`px-2.5 py-0.5 rounded-sm text-[11px] font-semibold whitespace-nowrap transition-colors border ${
                  selectedGroup === g
                    ? "bg-ink-900 text-white border-ink-900"
                    : "bg-white text-ink-600 border-line hover:bg-ivory-50"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Activity Logs Table */}
        <div className="bg-white border border-line rounded-sm overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-ivory-50 border-b border-line text-[11px] font-bold uppercase tracking-wider text-ink-600">
                  <th className="py-3 px-4">Log ID</th>
                  <th className="py-3 px-4">Timestamp (PKT)</th>
                  <th className="py-3 px-4">Actor</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Target Entity</th>
                  <th className="py-3 px-4">Origin IP & Location</th>
                  <th className="py-3 px-4 text-center">Result</th>
                  <th className="py-3 px-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-ink-400">
                      Loading audit logs...
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-ink-400">
                      No activity events found matching the active filter criteria.
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => {
                    const logDate = new Date(log.occurredAt);
                    const formattedTime =
                      logDate.toLocaleTimeString("en-GB", {
                        timeZone: "Asia/Karachi",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      }) + " PKT";
                    const formattedDate =
                      logDate.toLocaleDateString("en-GB", {
                        timeZone: "Asia/Karachi",
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      });

                    return (
                      <tr
                        key={log.id}
                        className="hover:bg-ivory-50/50 transition-colors cursor-pointer"
                        onClick={() => setSelectedLog(log)}
                      >
                        <td className="py-3 px-4 font-mono text-[11px] font-bold text-ink-900">
                          {log.id}
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="font-semibold text-ink-800 block text-[11px]">
                            {formattedDate}
                          </span>
                          <span className="text-ink-500 font-mono text-[10px]">
                            {formattedTime}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-medium text-ink-900">{log.actorName}</div>
                          <span className="text-[10px] text-ink-500 font-mono block">
                            {log.actorEmail}
                          </span>
                        </td>

                        <td className="py-3 px-4 max-w-xs font-medium text-ink-800">
                          {log.action}
                        </td>

                        <td className="py-3 px-4 max-w-xs truncate">
                          <span className="px-1 py-0.2 bg-ivory-100 text-ink-600 rounded-sm font-semibold text-[10px] mr-1.5">
                            {log.targetType || "System"}
                          </span>
                          <span className="text-ink-700" title={log.targetLabel || ""}>
                            {log.targetLabel || log.targetId || "—"}
                          </span>
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap font-mono text-[11px] text-ink-600">
                          <div className="flex items-center gap-1.5">
                            <span>{log.ip || "127.0.0.1"}</span>
                            {log.country && (
                              <span className="px-1 py-0.2 bg-ivory-100 text-ink-700 rounded-sm text-[10px] font-bold font-sans">
                                {log.country}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm font-bold text-[10px] uppercase tracking-wider ${
                              log.result === "SUCCESS"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {log.result === "SUCCESS" ? (
                              <CheckCircle2 className="w-3 h-3" />
                            ) : (
                              <XCircle className="w-3 h-3" />
                            )}
                            <span>{log.result}</span>
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLog(log);
                            }}
                            className="p-1.5 text-ink-500 hover:text-green-700 hover:bg-ivory-100 rounded-sm transition-colors"
                            title="Inspect Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal 42: Row Details & Diff */}
        <ActivityDetailModal
          log={selectedLog}
          onClose={() => setSelectedLog(null)}
        />
      </div>
    </AdminShell>
  );
}

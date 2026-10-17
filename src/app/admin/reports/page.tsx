"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/layout/admin-shell";
import {
  FileSpreadsheet,
  FileText,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAdminReports } from "@/app/actions/report-actions";

export default function AdminReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getAdminReports({
        status: statusFilter,
        query: searchQuery,
      });
      setReports(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter, searchQuery]);

  return (
    <AdminShell title="Special Reports Moderation Queue">
      <div className="space-y-6 font-sans">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded-chip">
                Section 12.7 • Special Reports Queue
              </span>
              <h1 className="text-xl font-serif font-bold text-ink-900">
                Special Reports Moderation & Publications
              </h1>
            </div>
            <p className="text-xs text-ink-500 mt-1">
              Review, verify executive findings, validate attached PDFs, and issue publication approvals for institutional monographs.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-ink-500">
              Total Reports: <strong>{reports.length}</strong>
            </span>
            <span className="text-ink-300">•</span>
            <span className="text-warning-700 font-semibold">
              Pending: {reports.filter((r) => r.status === "SUBMITTED").length}
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 border border-line rounded-sm shadow-2xs">
          <div className="flex items-center gap-1 text-xs">
            {["ALL", "SUBMITTED", "PUBLISHED", "CHANGES_REQUESTED"].map((st) => (
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
              placeholder="Search by report # or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-line rounded-sm focus:border-green-700 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white border border-line rounded-sm overflow-hidden shadow-2xs">
          {loading ? (
            <div className="p-12 text-center text-xs text-ink-400">
              Loading special reports publication queue...
            </div>
          ) : reports.length === 0 ? (
            <div className="p-12 text-center text-xs text-ink-500">
              No special reports match the selected filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-ivory-50 border-b border-line text-[11px] font-bold uppercase tracking-wider text-ink-600">
                    <th className="py-3 px-4">Report Number</th>
                    <th className="py-3 px-4">Monograph Title</th>
                    <th className="py-3 px-4">Author</th>
                    <th className="py-3 px-4">Topic</th>
                    <th className="py-3 px-4 text-center">Pages / PDF</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Reads</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {reports.map((r) => (
                    <tr
                      key={r.id}
                      className="hover:bg-ivory-50/70 transition-colors"
                    >
                      <td className="py-3 px-4 font-mono font-bold text-ink-900 whitespace-nowrap">
                        {r.reportNumber}
                      </td>

                      <td className="py-3 px-4 max-w-sm">
                        <Link
                          href={`/admin/reports/${r.id}`}
                          className="font-serif font-bold text-xs text-ink-900 hover:text-green-800 line-clamp-1"
                        >
                          {r.title}
                        </Link>
                        <p className="text-[11px] text-ink-500 line-clamp-1 mt-0.5">
                          {r.standfirst}
                        </p>
                      </td>

                      <td className="py-3 px-4 text-ink-700 whitespace-nowrap">
                        {r.authorName}
                      </td>

                      <td className="py-3 px-4 text-ink-600 whitespace-nowrap">
                        {r.topic}
                      </td>

                      <td className="py-3 px-4 text-center whitespace-nowrap font-mono text-[11px]">
                        <span>{r.pages} pp</span>
                        {r.hasPdf && (
                          <span className="ml-1.5 px-1 bg-green-50 text-green-700 rounded-chip text-[9px] font-bold">
                            PDF
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-chip ${
                            r.status === "PUBLISHED"
                              ? "bg-green-100 text-green-800"
                              : r.status === "SUBMITTED"
                              ? "bg-warning-50 text-warning-800"
                              : r.status === "CHANGES_REQUESTED"
                              ? "bg-blue-50 text-blue-800"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right font-mono font-medium text-ink-900">
                        {r.reads.toLocaleString()}
                      </td>

                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/reports/${r.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs h-7 px-2.5 flex items-center gap-1"
                            >
                              <span>Review</span>
                              <ChevronRight className="w-3 h-3" />
                            </Button>
                          </Link>

                          {r.status === "PUBLISHED" && (
                            <Link href={`/reports/${r.slug}`} target="_blank">
                              <button
                                type="button"
                                title="View on Live Site"
                                className="p-1.5 text-ink-400 hover:text-green-700 hover:bg-ivory-200 rounded-xs"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>
                            </Link>
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

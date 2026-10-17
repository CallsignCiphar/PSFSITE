"use client";

import React from "react";
import {
  X,
  History,
  Shield,
  Globe,
  Monitor,
  CheckCircle2,
  XCircle,
  Copy,
  ExternalLink,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActivityDetailModalProps {
  log: any | null;
  onClose: () => void;
}

export function ActivityDetailModal({ log, onClose }: ActivityDetailModalProps) {
  if (!log) return null;

  const occurredDate = new Date(log.occurredAt);
  const pktFormatted =
    occurredDate.toLocaleString("en-GB", {
      timeZone: "Asia/Karachi",
      dateStyle: "full",
      timeStyle: "medium",
    }) + " PKT";

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(log, null, 2));
  };

  const hasDiff = log.metadata?.diff && (log.metadata.diff.before || log.metadata.diff.after);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto">
      <div className="bg-white border border-line rounded-sm shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col my-auto text-xs">
        {/* Header */}
        <div className="px-6 py-4 border-b border-line flex items-center justify-between bg-ivory-50 shrink-0">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-sm flex items-center justify-center shrink-0 border ${
                log.result === "SUCCESS"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-red-50 text-red-700 border-red-200"
              }`}
            >
              {log.result === "SUCCESS" ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <XCircle className="w-4 h-4" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs text-ink-900">
                  {log.id}
                </span>
                <span
                  className={`px-1.5 py-0.2 rounded-sm text-[10px] font-bold uppercase tracking-wider ${
                    log.result === "SUCCESS"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {log.result}
                </span>
              </div>
              <h2 className="text-sm font-bold font-serif text-ink-900 mt-0.5">
                {log.action}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-ink-400 hover:text-ink-700 p-1 rounded-sm hover:bg-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-ivory-50 border border-line rounded-sm">
            <div>
              <span className="text-[10px] uppercase font-bold text-ink-400 tracking-wider block mb-1">
                Timestamp (Strict PKT)
              </span>
              <div className="flex items-center gap-1.5 text-ink-800 font-medium">
                <Clock className="w-3.5 h-3.5 text-ink-400" />
                <span>{pktFormatted}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-ink-400 tracking-wider block mb-1">
                Actor Profile & Roles
              </span>
              <div className="text-ink-800 font-medium">
                <span>{log.actorName}</span>
                <span className="text-ink-500 font-mono text-[11px] block">
                  {log.actorEmail}
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {(log.actorRoles || []).map((r: string) => (
                    <span
                      key={r}
                      className="px-1.5 py-0.2 bg-white border border-line rounded-sm text-[10px] font-mono font-semibold text-ink-700"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-ink-400 tracking-wider block mb-1">
                Target Entity
              </span>
              <div className="text-ink-800">
                <span className="px-1.5 py-0.2 bg-white border border-line rounded-sm text-[10px] font-semibold text-ink-700 mr-2">
                  {log.targetType || "System"}
                </span>
                <span className="font-semibold">{log.targetLabel || log.targetId || "N/A"}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-ink-400 tracking-wider block mb-1">
                Endpoint URL
              </span>
              <div className="font-mono text-ink-700 truncate" title={log.url}>
                {log.url || "/"}
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-ink-400 tracking-wider block mb-1">
                Origin IP & Geolocation
              </span>
              <div className="flex items-center gap-2 text-ink-800">
                <Globe className="w-3.5 h-3.5 text-ink-400" />
                <span className="font-mono">{log.ip || "127.0.0.1"}</span>
                {log.country && (
                  <span className="px-1.5 py-0.2 bg-white border border-line rounded-sm font-bold text-[10px]">
                    {log.country} {log.city ? `(${log.city})` : ""}
                  </span>
                )}
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-ink-400 tracking-wider block mb-1">
                User Agent / Device
              </span>
              <div className="flex items-center gap-1.5 text-ink-700 truncate" title={log.userAgent}>
                <Monitor className="w-3.5 h-3.5 text-ink-400 shrink-0" />
                <span className="truncate">{log.userAgent || "Desktop Browser"}</span>
              </div>
            </div>
          </div>

          {/* Before & After Diff Inspection */}
          {hasDiff ? (
            <div className="space-y-2">
              <span className="text-xs font-bold text-ink-900 uppercase tracking-wider block">
                Field Mutation Diff (Before → After)
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="border border-line rounded-sm p-3 bg-red-50/20">
                  <span className="text-[10px] font-bold uppercase text-red-700 tracking-wider block mb-1.5">
                    State Before Action
                  </span>
                  <pre className="font-mono text-[11px] text-ink-800 overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(log.metadata.diff.before, null, 2)}
                  </pre>
                </div>
                <div className="border border-line rounded-sm p-3 bg-green-50/20">
                  <span className="text-[10px] font-bold uppercase text-green-700 tracking-wider block mb-1.5">
                    State After Action
                  </span>
                  <pre className="font-mono text-[11px] text-ink-800 overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(log.metadata.diff.after, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          ) : null}

          {/* Reason or Metadata Comments */}
          {log.metadata?.reason && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-sm">
              <span className="text-[10px] font-bold uppercase text-amber-900 tracking-wider block mb-0.5">
                Stated Justification / Editorial Comment
              </span>
              <p className="text-xs text-amber-950 italic">
                "{log.metadata.reason}"
              </p>
            </div>
          )}

          {/* Raw Structured JSON Viewer */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-ink-900 uppercase tracking-wider">
                Full Immutable Log Payload
              </span>
              <button
                onClick={copyJson}
                className="flex items-center gap-1 text-[11px] font-semibold text-green-700 hover:text-green-800"
              >
                <Copy className="w-3 h-3" />
                <span>Copy Raw JSON</span>
              </button>
            </div>
            <pre className="p-4 bg-ink-950 text-emerald-400 font-mono text-[11px] rounded-sm overflow-x-auto max-h-48 border border-ink-800">
              {JSON.stringify(log, null, 2)}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-line bg-ivory-50 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-ink-500">
            Immutable Audit Trail • Retention: 2 Years Online
          </span>
          <Button variant="outline" onClick={onClose}>
            Close Inspector
          </Button>
        </div>
      </div>
    </div>
  );
}

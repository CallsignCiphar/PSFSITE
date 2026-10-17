import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiTileProps {
  value: string | number;
  label: string;
  delta?: {
    value: string | number;
    positive?: boolean;
    period?: string;
  };
  className?: string;
}

export function KpiTile({ value, label, delta, className }: KpiTileProps) {
  return (
    <div className={cn("p-4 bg-white border border-line rounded-card", className)}>
      <div className="font-sans text-xs uppercase tracking-wider text-ink-500 font-semibold mb-1">
        {label}
      </div>
      <div className="font-sans text-3xl font-semibold tabular-nums text-ink-900 tracking-tight">
        {value}
      </div>
      {delta && (
        <div className="mt-1.5 flex items-center gap-1 text-xs font-sans">
          <span
            className={cn(
              "inline-flex items-center font-medium",
              delta.positive ? "text-green-700" : "text-danger-700"
            )}
          >
            {delta.positive ? (
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
            )}
            {delta.value}
          </span>
          {delta.period && <span className="text-ink-400">vs {delta.period}</span>}
        </div>
      )}
    </div>
  );
}

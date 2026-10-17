import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type LabelType =
  | "ANALYSIS"
  | "EXPLAINER"
  | "OPINION"
  | "INTERVIEW"
  | "INVESTIGATION"
  | "PROFILE"
  | "BOOK_REVIEW"
  | "NEWS_ANALYSIS"
  | "NEWS"
  | "REPORT"
  | "RESEARCH_PAPER"
  | "POLICY_BRIEF"
  | "PEER_REVIEWED"
  | "ARCHIVE"
  | "BREAKING";

interface ContentLabelProps {
  type: LabelType | string;
  className?: string;
  showIcon?: boolean;
}

export function ContentLabel({ type, className, showIcon = true }: ContentLabelProps) {
  const normType = type.toUpperCase().replace(/\s+/g, "_");

  if (normType === "PEER_REVIEWED") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 px-2 py-0.5 rounded-chip text-xs font-semibold uppercase tracking-wider bg-green-100 text-green-700 font-sans",
          className
        )}
      >
        {showIcon && <Check className="w-3 h-3 stroke-[2]" />}
        Peer-Reviewed
      </span>
    );
  }

  if (normType === "BREAKING") {
    return (
      <span
        className={cn(
          "inline-flex items-center px-2 py-0.5 rounded-chip text-xs font-bold uppercase tracking-wider bg-danger-700 text-white font-sans",
          className
        )}
      >
        Breaking
      </span>
    );
  }

  if (normType === "ARCHIVE") {
    return (
      <span
        className={cn(
          "inline-flex items-center px-1.5 py-0.5 rounded-chip text-xs font-medium uppercase tracking-wider bg-ivory-100 text-ink-500 border border-line font-sans",
          className
        )}
      >
        Archive
      </span>
    );
  }

  // Format label text: replace underscores with spaces
  const displayText = type.replace(/_/g, " ");

  return (
    <span
      className={cn(
        "inline-block text-xs font-semibold uppercase tracking-[0.08em] text-green-700 font-sans",
        className
      )}
    >
      {displayText}
    </span>
  );
}

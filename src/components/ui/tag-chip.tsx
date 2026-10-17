import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagChipProps {
  label: string;
  href?: string;
  onRemove?: () => void;
  isActive?: boolean;
  className?: string;
}

export function TagChip({ label, href, onRemove, isActive, className }: TagChipProps) {
  const content = (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 h-7 px-2.5 text-xs font-sans font-medium rounded-chip border transition-colors",
        isActive
          ? "bg-green-700 text-white border-green-700"
          : "bg-ivory-50 text-ink-700 border-line hover:border-ink-500 hover:bg-ivory-100",
        className
      )}
    >
      <span>{label}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove();
          }}
          className="hover:text-ink-900 focus:outline-none"
          aria-label={`Remove ${label}`}
        >
          <X className="w-3 h-3 stroke-[1.5]" />
        </button>
      )}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block no-underline">
        {content}
      </Link>
    );
  }

  return content;
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format UTC date to PKT (Pakistan Standard Time, UTC+05:00)
 */
export function formatPKT(date: Date | string | number, formatStr: string = "dd MMM yyyy, HH:mm 'PKT'"): string {
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  // Format with PKT timezone offset (+5 hours)
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Karachi",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d) + " PKT";
}

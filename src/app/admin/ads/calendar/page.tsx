"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/layout/admin-shell";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  Megaphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSlotCalendarData } from "@/app/actions/ad-actions";

export default function AdSlotCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState<{
    slots: any[];
    placements: any[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageFilter, setPageFilter] = useState("ALL");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const loadCalendar = async () => {
    setLoading(true);
    try {
      const data = await getSlotCalendarData(year, month);
      setCalendarData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCalendar();
  }, [year, month]);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const filteredSlots =
    !calendarData?.slots
      ? []
      : pageFilter === "ALL"
      ? calendarData.slots
      : calendarData.slots.filter((s) => s.page.includes(pageFilter));

  return (
    <AdminShell title="Ad Slot Calendar">
      <div className="space-y-6 font-sans">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-4">
          <div className="flex items-center gap-3">
            <Link href="/admin/ads">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Campaigns</span>
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-serif font-bold text-ink-900">
                Ad Slot Flight Calendar
              </h1>
              <p className="text-xs text-ink-500">
                Visual booking timeline across all official ad inventory slots
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/admin/ads/campaigns/new">
              <Button variant="primary" size="sm" className="flex items-center gap-1.5">
                <Plus className="w-4 h-4" />
                <span>Book Placement</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Calendar Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 border border-line rounded-sm shadow-2xs">
          {/* Month Navigator */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevMonth}
              className="p-1.5 border border-line rounded-sm hover:bg-ivory-100 text-ink-700"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-serif font-bold text-base text-ink-900 min-w-36 text-center">
              {monthNames[month]} {year}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="p-1.5 border border-line rounded-sm hover:bg-ivory-100 text-ink-700"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentDate(new Date())}
              className="ml-2 text-xs text-green-700 hover:underline font-semibold"
            >
              Today
            </button>
          </div>

          {/* Page Filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-ink-500 font-medium">Page Scope:</span>
            {["ALL", "Home", "Topics", "Articles", "Reports"].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPageFilter(p)}
                className={`px-2.5 py-1 rounded-xs font-medium ${
                  pageFilter === p
                    ? "bg-green-700 text-white font-bold"
                    : "text-ink-600 hover:bg-ivory-100"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Timeline Grid */}
        <div className="bg-white border border-line rounded-sm overflow-x-auto shadow-2xs">
          {loading ? (
            <div className="p-12 text-center text-xs text-ink-400">
              Loading calendar bookings and calculating interval spans...
            </div>
          ) : (
            <div className="min-w-[1000px]">
              {/* Header Days Row */}
              <div className="grid grid-cols-[220px_repeat(31,minmax(24px,1fr))] border-b border-line bg-ivory-50 text-[10px] font-bold text-ink-600">
                <div className="p-3 border-r border-line text-left uppercase tracking-wider">
                  Slot Key / Page
                </div>
                {daysArray.map((day) => (
                  <div
                    key={day}
                    className="p-2 border-r border-line/60 text-center last:border-r-0"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Rows per slot */}
              <div className="divide-y divide-line">
                {filteredSlots.map((slot) => {
                  const slotPlacements =
                    calendarData?.placements.filter(
                      (p) => p.slotKey === slot.key
                    ) || [];

                  return (
                    <div
                      key={slot.key}
                      className="grid grid-cols-[220px_repeat(31,minmax(24px,1fr))] text-xs min-h-16 items-center"
                    >
                      {/* Slot Label */}
                      <div className="p-3 border-r border-line bg-ivory-50/50 flex flex-col justify-center h-full">
                        <span className="font-mono font-bold text-[11px] text-ink-900 truncate">
                          {slot.key}
                        </span>
                        <span className="text-[10px] text-ink-500">
                          {slot.page} • {slot.desktopSize}
                        </span>
                      </div>

                      {/* 31-day visual cell strip */}
                      <div className="col-span-31 grid grid-cols-31 relative h-full items-center px-1">
                        {/* Render Placements as horizontal blocks */}
                        {slotPlacements.map((p) => {
                          const pStart = new Date(p.startsAt);
                          const pEnd = new Date(p.endsAt);

                          // Calculate start and end day in current month
                          let startDay = 1;
                          if (
                            pStart.getFullYear() === year &&
                            pStart.getMonth() === month
                          ) {
                            startDay = pStart.getDate();
                          }

                          let endDay = daysInMonth;
                          if (
                            pEnd.getFullYear() === year &&
                            pEnd.getMonth() === month
                          ) {
                            endDay = pEnd.getDate();
                          }

                          const colSpan = Math.max(1, endDay - startDay + 1);

                          return (
                            <div
                              key={p.id}
                              style={{
                                gridColumnStart: startDay,
                                gridColumnEnd: `span ${colSpan}`,
                              }}
                              className="h-9 my-1 bg-green-700 text-white rounded-xs px-2 flex items-center justify-between text-[10px] truncate shadow-xs border border-green-800"
                              title={`${p.campaign.brandName} (${p.campaign.campaignNumber}): ${pStart.toLocaleDateString("en-GB")} to ${pEnd.toLocaleDateString("en-GB")}`}
                            >
                              <div className="truncate font-semibold flex items-center gap-1.5">
                                <Megaphone className="w-3 h-3 shrink-0" />
                                <span className="truncate">
                                  {p.campaign.brandName} • {p.campaign.name}
                                </span>
                              </div>
                              <span className="font-mono text-[9px] opacity-80 shrink-0">
                                {p.campaign.campaignNumber}
                              </span>
                            </div>
                          );
                        })}

                        {slotPlacements.length === 0 && (
                          <div className="col-span-31 text-[11px] text-ink-400 text-center py-2 italic">
                            No campaigns booked in this slot for {monthNames[month]}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}

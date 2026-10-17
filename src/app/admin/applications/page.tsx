"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Filter, Clock, Eye, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { AdminShell } from "@/components/layout/admin-shell";
import { Button } from "@/components/ui/button";

const sampleApplications = [
  {
    id: "app-1",
    applicantName: "Dr. Hamza Shafqat",
    email: "h.shafqat@qau.edu.pk",
    track: "RESEARCH_WRITER",
    trackLabel: "Research Scholar",
    institution: "Quaid-i-Azam University",
    designation: "Assistant Professor, Strategic Studies",
    expertise: ["Strategic Systems", "Deterrence", "Hypersonics"],
    attempt: 1,
    submittedAt: "17 Oct 2026, 11:20 PKT",
    signupCountry: "Pakistan",
    hasIdFile: true,
    status: "PENDING",
  },
  {
    id: "app-2",
    applicantName: "Zainab Raza",
    email: "zainab.raza@defensewire.pk",
    track: "ARTICLE_WRITER",
    trackLabel: "Article Writer",
    institution: "Independent Defense Analyst",
    designation: "Senior Defense Correspondent",
    expertise: ["National Affairs", "Border Security", "Afghanistan"],
    attempt: 2,
    submittedAt: "16 Oct 2026, 14:40 PKT",
    signupCountry: "Pakistan",
    hasIdFile: false,
    status: "PENDING",
  },
  {
    id: "app-3",
    applicantName: "Lieutenant Colonel (Retd) Salman Tariq",
    email: "salman.tariq@gmail.com",
    track: "ARTICLE_WRITER",
    trackLabel: "Article Writer",
    institution: "Command and Staff College Alumnus",
    designation: "Retired Armoured Corps Officer",
    expertise: ["Land Warfare", "Armour", "Military History"],
    attempt: 1,
    submittedAt: "15 Oct 2026, 09:15 PKT",
    signupCountry: "Pakistan",
    hasIdFile: true,
    status: "PENDING",
  },
  {
    id: "app-4",
    applicantName: "Fahad Mustafa",
    email: "fahad.m@consultant.com",
    track: "ARTICLE_WRITER",
    trackLabel: "Article Writer",
    institution: "Private Consultant",
    designation: "Security Analyst",
    expertise: ["Cyber & EW"],
    attempt: 1,
    submittedAt: "14 Oct 2026, 18:00 PKT",
    signupCountry: "United Kingdom",
    hasIdFile: false,
    status: "RETURNED",
  },
];

export default function AdminApplicationsPage() {
  const [activeTab, setActiveTab] = useState("PENDING");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApps = sampleApplications.filter((app) => {
    if (activeTab === "PENDING" && app.status !== "PENDING") return false;
    if (activeTab === "RETURNED" && app.status !== "RETURNED") return false;
    if (activeTab === "APPROVED" && app.status !== "APPROVED") return false;

    if (
      searchQuery &&
      !app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !app.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <AdminShell title="Contributor Applications Queue">
      <div className="space-y-6">
        {/* Header Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif font-bold text-2xl text-ink-900">
              Applications Queue
            </h2>
            <p className="font-serif text-xs text-ink-500">
              Review credential submissions for Article Writers and Research Scholars. Oldest pending first.
            </p>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex border-b border-line overflow-x-auto text-xs font-sans font-medium">
          {[
            { id: "PENDING", label: "Pending Review", count: 3 },
            { id: "RETURNED", label: "Returned with Comments", count: 1 },
            { id: "APPROVED", label: "Approved", count: 85 },
            { id: "ALL", label: "All Submissions", count: 89 },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-green-700 text-green-700 font-semibold"
                  : "border-transparent text-ink-500 hover:text-ink-900"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeTab === tab.id
                    ? "bg-green-100 text-green-700 font-bold"
                    : "bg-ivory-100 text-ink-500"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-ink-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by applicant name or email..."
              className="w-full h-9 pl-9 pr-3 text-xs font-sans border border-line rounded-input bg-white focus:border-green-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white border border-line rounded-card shadow-level1 overflow-hidden">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="bg-ivory-50 border-b border-line text-ink-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-5">Applicant & Email</th>
                <th className="py-3 px-4">Track</th>
                <th className="py-3 px-4">Institution / Designation</th>
                <th className="py-3 px-4">Expertise Areas</th>
                <th className="py-3 px-4">Attempt</th>
                <th className="py-3 px-4">Submitted At (PKT)</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-ivory-50 transition-colors">
                  <td className="py-3.5 px-5">
                    <span className="font-serif font-bold text-sm text-ink-900 block">
                      {app.applicantName}
                    </span>
                    <span className="font-mono text-ink-500 text-[11px]">{app.email}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-chip text-[10px] font-semibold ${
                        app.track === "RESEARCH_WRITER"
                          ? "bg-green-100 text-green-700"
                          : "bg-ivory-100 text-ink-700 border border-line"
                      }`}
                    >
                      {app.trackLabel}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-ink-700">
                    <span className="font-medium text-ink-900 block">{app.institution}</span>
                    <span className="text-ink-400 text-[11px]">{app.designation}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {app.expertise.map((exp) => (
                        <span
                          key={exp}
                          className="px-1.5 py-0.2 bg-ivory-100 text-ink-700 rounded-sm text-[10px] border border-line"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-semibold text-ink-700">
                    #{app.attempt}
                  </td>

                  <td className="py-3.5 px-4 text-ink-500 whitespace-nowrap">
                    {app.submittedAt}
                  </td>

                  <td className="py-3.5 px-4">
                    {app.status === "PENDING" && (
                      <span className="px-2 py-0.5 rounded-chip text-[10px] font-semibold bg-warning-50 text-warning-700 border border-warning-700/20">
                        Pending Decision
                      </span>
                    )}
                    {app.status === "RETURNED" && (
                      <span className="px-2 py-0.5 rounded-chip text-[10px] font-semibold bg-warning-50 text-warning-700 border border-warning-700">
                        Returned
                      </span>
                    )}
                    {app.status === "APPROVED" && (
                      <span className="px-2 py-0.5 rounded-chip text-[10px] font-semibold bg-green-100 text-green-700">
                        Active
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <Link href={`/admin/applications/${app.id}`}>
                      <Button variant="primary" size="sm" className="text-xs">
                        Review →
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}

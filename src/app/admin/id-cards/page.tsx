"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  Plus,
  Search,
  Copy,
  Check,
  Download,
  QrCode,
  ShieldCheck,
  XCircle,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { AdminShell } from "@/components/layout/admin-shell";
import { Button } from "@/components/ui/button";
import { createIdCard, toggleIdCardStatus } from "@/app/actions/id-card-actions";

const sampleCards = [
  {
    id: "c-1",
    cardId: "PSF-STAFF-0482",
    designation: "Senior Research Fellow, Strategic Affairs",
    token: "demo-valid-token-2026",
    active: true,
    scanCount: 14,
    lastScannedAt: "16 Oct 2026, 14:10 PKT",
    createdAt: "10 Jan 2026",
  },
  {
    id: "c-2",
    cardId: "PSF-STAFF-0485",
    designation: "Director of Research & Academic Operations",
    token: "token-director-valid-882",
    active: true,
    scanCount: 42,
    lastScannedAt: "18 Oct 2026, 09:30 PKT",
    createdAt: "15 Jan 2026",
  },
  {
    id: "c-3",
    cardId: "PSF-STAFF-0390",
    designation: "Former Fellow, Central Asian Studies",
    token: "token-revoked-390",
    active: false,
    scanCount: 3,
    lastScannedAt: "05 Aug 2026, 11:00 PKT",
    createdAt: "22 May 2025",
  },
];

export default function AdminIdCardsPage() {
  const [cards, setCards] = useState(sampleCards);
  const [activeFilter, setActiveFilter] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Create Modal State
  const [createOpen, setCreateOpen] = useState(false);
  const [cardIdInput, setCardIdInput] = useState("");
  const [designationInput, setDesignationInput] = useState("");
  const [createdResult, setCreatedResult] = useState<{
    cardId: string;
    verifyUrl: string;
    token: string;
  } | null>(null);

  // Copy State
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCopyUrl = (token: string, id: string) => {
    const url = `https://forumstrategic.com/verify/${token}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await createIdCard({
        cardId: cardIdInput,
        designation: designationInput,
      });

      if (!res.success) {
        setError(res.error || "Failed to issue card.");
      } else {
        setCreatedResult({
          cardId: res.cardId!,
          verifyUrl: res.verifyUrl!,
          token: res.token!,
        });
        setCards([
          {
            id: `c-${Date.now()}`,
            cardId: res.cardId!,
            designation: designationInput,
            token: res.token!,
            active: true,
            scanCount: 0,
            lastScannedAt: "Never",
            createdAt: "Today",
          },
          ...cards,
        ]);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = async (cardId: string, currentActive: boolean) => {
    const next = !currentActive;
    await toggleIdCardStatus(cardId, next);
    setCards(
      cards.map((c) => (c.cardId === cardId ? { ...c, active: next } : c))
    );
  };

  const filtered = cards.filter((c) => {
    if (activeFilter === "ACTIVE" && !c.active) return false;
    if (activeFilter === "INACTIVE" && c.active) return false;
    if (
      searchQuery &&
      !c.cardId.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !c.designation.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <AdminShell title="Staff ID Cards & Credentials Registry">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif font-bold text-2xl text-ink-900">Official Staff ID Cards</h2>
            <p className="font-serif text-xs text-ink-500">
              Generate, monitor, and revoke verifiable QR credentials. Cards can never be deleted from the audit ledger.
            </p>
          </div>

          <Button
            variant="primary"
            size="default"
            onClick={() => {
              setCardIdInput("");
              setDesignationInput("");
              setCreatedResult(null);
              setError(null);
              setCreateOpen(true);
            }}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Issue New ID Card</span>
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex border-b border-line gap-4 text-xs font-sans font-medium">
          {[
            { id: "ALL", label: "All Issued Cards", count: cards.length },
            { id: "ACTIVE", label: "Active & Valid", count: cards.filter((c) => c.active).length },
            { id: "INACTIVE", label: "Deactivated", count: cards.filter((c) => !c.active).length },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id as any)}
              className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
                activeFilter === tab.id
                  ? "border-green-700 text-green-700 font-bold"
                  : "border-transparent text-ink-500 hover:text-ink-900"
              }`}
            >
              <span>{tab.label}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-ivory-100 text-[10px]">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-ink-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Card ID or designation..."
            className="w-full h-9 pl-9 pr-3 text-xs font-sans border border-line rounded-input bg-white focus:border-green-700 focus:outline-none"
          />
        </div>

        {/* Table */}
        <div className="bg-white border border-line rounded-card shadow-level1 overflow-hidden">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="bg-ivory-50 border-b border-line text-ink-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-5">Card ID</th>
                <th className="py-3 px-4">Designation</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Verification URL</th>
                <th className="py-3 px-4 text-center">Total Scans</th>
                <th className="py-3 px-4">Last Scanned</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((card) => (
                <tr key={card.id} className="hover:bg-ivory-50 transition-colors">
                  <td className="py-3.5 px-5 font-mono font-bold text-ink-900">
                    {card.cardId}
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-ink-900">
                    {card.designation}
                  </td>

                  <td className="py-3.5 px-4">
                    {card.active ? (
                      <span className="px-2 py-0.5 rounded-chip text-[10px] font-bold uppercase bg-green-100 text-green-700">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-chip text-[10px] font-bold uppercase bg-danger-50 text-danger-700">
                        Deactivated
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-[11px] text-ink-500 max-w-[140px] truncate">
                        /verify/{card.token}
                      </code>
                      <button
                        type="button"
                        onClick={() => handleCopyUrl(card.token, card.id)}
                        className="p-1 text-ink-400 hover:text-green-700"
                        title="Copy verification URL"
                      >
                        {copiedId === card.id ? (
                          <Check className="w-3.5 h-3.5 text-green-700" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <Link
                        href={`/verify/${card.token}`}
                        target="_blank"
                        className="p-1 text-ink-400 hover:text-green-700"
                        title="Test verification link"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-center font-mono font-semibold text-ink-700">
                    {card.scanCount}
                  </td>

                  <td className="py-3.5 px-4 text-ink-500 whitespace-nowrap">
                    {card.lastScannedAt}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <Button
                      variant={card.active ? "secondary" : "primary"}
                      size="sm"
                      onClick={() => handleToggle(card.cardId, card.active)}
                      className={`text-xs ${
                        card.active ? "text-danger-700 hover:bg-danger-50 border-danger-700/30" : ""
                      }`}
                    >
                      {card.active ? "Deactivate" : "Activate"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Issue ID Card Modal */}
        {createOpen && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white border border-line rounded-card p-6 shadow-level3 space-y-4 font-sans">
              <div className="flex items-center justify-between pb-2 border-b border-line">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-green-700" />
                  <h3 className="font-serif font-bold text-lg text-ink-900">
                    Issue Official Staff ID Card
                  </h3>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-danger-50 border border-danger-700/20 text-danger-700 text-xs rounded">
                  {error}
                </div>
              )}

              {createdResult ? (
                /* Card Generated Result */
                <div className="space-y-4 text-center py-2">
                  <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-lg text-ink-900">
                      Card Issued Successfully!
                    </h4>
                    <p className="font-mono font-bold text-green-700 text-sm mt-0.5">
                      {createdResult.cardId}
                    </p>
                  </div>

                  <div className="p-4 bg-ivory-50 border border-line rounded-card text-left space-y-2 text-xs">
                    <div>
                      <span className="text-ink-400 block mb-0.5">Verification URL</span>
                      <div className="flex items-center justify-between font-mono bg-white p-2 rounded border border-line">
                        <span className="truncate">{createdResult.verifyUrl}</span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(createdResult.verifyUrl);
                            alert("Copied!");
                          }}
                          className="ml-2 text-green-700 hover:text-green-800"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="pt-2 text-[11px] text-ink-500">
                      Provide this URL or QR code to the HR/Printing bureau for embedding on the physical staff card.
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="default"
                    onClick={() => setCreateOpen(false)}
                    className="w-full"
                  >
                    Done
                  </Button>
                </div>
              ) : (
                /* Card Input Form */
                <form onSubmit={handleCreateSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-ink-900 mb-1">
                      Card ID Number (Unique) <span className="text-danger-700">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={cardIdInput}
                      onChange={(e) => setCardIdInput(e.target.value)}
                      placeholder="e.g. PSF-STAFF-0490"
                      className="w-full h-10 px-3 text-sm font-mono border border-line rounded-input focus:border-green-700 focus:outline-none uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-ink-900 mb-1">
                      Official Designation <span className="text-danger-700">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={designationInput}
                      onChange={(e) => setDesignationInput(e.target.value)}
                      placeholder="e.g. Research Fellow, Nuclear Strategy"
                      className="w-full h-10 px-3 text-sm font-sans border border-line rounded-input focus:border-green-700 focus:outline-none"
                    />
                  </div>

                  <div className="p-3 bg-ivory-50 border border-line rounded text-[11px] text-ink-500">
                    A cryptographically unguessable 24-character token will be minted. The verification endpoint will render with <code className="font-mono">noindex</code>.
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <Button variant="secondary" size="sm" onClick={() => setCreateOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary" size="sm" isLoading={isLoading}>
                      Generate & Issue Card
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/layout/admin-shell";
import {
  Inbox,
  Mail,
  AlertCircle,
  Megaphone,
  Scale,
  MessageSquare,
  CheckCircle2,
  Clock,
  Send,
  Plus,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Search,
  Filter,
  User,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getInboxMessages,
  updateInboxStatus,
  addInboxNote,
  sendInboxReply,
} from "@/app/actions/inbox-actions";

export default function AdminInboxPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Filters
  const [sourceFilter, setSourceFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Composer & Notes State
  const [newNote, setNewNote] = useState("");
  const [replySubject, setReplySubject] = useState("");
  const [replyBody, setReplyBody] = useState("");
  const [submittingNote, setSubmittingNote] = useState(false);
  const [sendingReply, setSendingReply] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getInboxMessages({
        source: sourceFilter,
        status: statusFilter,
      });
      setMessages(res);
      if (res.length > 0 && !selectedId) {
        setSelectedId(res[0].id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [sourceFilter, statusFilter]);

  const selectedMessage =
    messages.find((m) => m.id === selectedId) || messages[0] || null;

  useEffect(() => {
    if (selectedMessage) {
      const fields = selectedMessage.fields as any;
      const defaultSubject =
        selectedMessage.source === "CORRECTIONS"
          ? `Re: Editorial Review of ${fields?.targetSlug || "Publication"}`
          : selectedMessage.source === "ADVERTISE"
          ? `Re: PSF Sponsorship & Ad Placement Inquiry - ${fields?.company || "Commercial"}`
          : selectedMessage.source === "COPYRIGHT"
          ? `Re: Notice of Intellectual Property Claim`
          : `Re: Inquiry regarding Pakistan Strategic Forum`;

      setReplySubject(defaultSubject);
      setReplyBody(
        `Dear ${fields?.name || "Contributor"},\n\nThank you for reaching out to the Pakistan Strategic Forum.\n\n`
      );
    }
  }, [selectedId]);

  const handleStatusChange = async (newStatus: any) => {
    if (!selectedMessage) return;
    try {
      await updateInboxStatus(selectedMessage.id, newStatus);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedMessage) return;
    setSubmittingNote(true);
    try {
      await addInboxNote(selectedMessage.id, newNote);
      setNewNote("");
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to add note");
    } finally {
      setSubmittingNote(false);
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replySubject.trim() || !replyBody.trim() || !selectedMessage) return;
    setSendingReply(true);
    try {
      await sendInboxReply({
        messageId: selectedMessage.id,
        subject: replySubject,
        body: replyBody,
      });
      alert("Official editorial response logged and dispatched.");
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to send reply");
    } finally {
      setSendingReply(false);
    }
  };

  const sourceTabs = [
    { key: "ALL", label: "All Messages" },
    { key: "CONTACT", label: "Contact" },
    { key: "CORRECTIONS", label: "Corrections" },
    { key: "ADVERTISE", label: "Advertise" },
    { key: "COPYRIGHT", label: "Copyright" },
  ];

  const filteredMessages = messages.filter((m) => {
    if (!searchQuery) return true;
    const f = m.fields as any;
    const q = searchQuery.toLowerCase();
    return (
      f?.name?.toLowerCase().includes(q) ||
      f?.email?.toLowerCase().includes(q) ||
      f?.organization?.toLowerCase().includes(q) ||
      f?.company?.toLowerCase().includes(q) ||
      f?.subject?.toLowerCase().includes(q)
    );
  });

  return (
    <AdminShell title="Unified Admin Inbox">
      <div className="space-y-4 font-sans">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded-chip">
                Section 12.14 • Communications
              </span>
              <h1 className="text-xl font-serif font-bold text-ink-900">
                Unified Editorial & Public Inbox
              </h1>
            </div>
            <p className="text-xs text-ink-500 mt-1">
              Consolidated 2-pane dispatch for public contact, editorial corrections, advertising inquiries, and copyright takedowns.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-ink-500">
              Total Messages: <strong>{messages.length}</strong>
            </span>
            <span className="text-ink-300">•</span>
            <span className="text-warning-700 font-semibold">
              New: {messages.filter((m) => m.status === "NEW").length}
            </span>
          </div>
        </div>

        {/* 2-Pane Container (Cols 1-4 Left Pane, Cols 5-12 Right Pane) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[750px]">
          {/* ============================================================
              LEFT PANE (Cols 1-4): Message List
              ============================================================ */}
          <div className="lg:col-span-4 bg-white border border-line rounded-sm flex flex-col shadow-2xs overflow-hidden">
            {/* Filter Tabs */}
            <div className="flex border-b border-line overflow-x-auto text-xs bg-ivory-50">
              {sourceTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setSourceFilter(tab.key)}
                  className={`px-3 py-2 font-medium border-b-2 shrink-0 transition-colors ${
                    sourceFilter === tab.key
                      ? "border-green-700 text-green-800 font-bold bg-white"
                      : "border-transparent text-ink-500 hover:text-ink-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search and Status Dropdown */}
            <div className="p-2.5 border-b border-line flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-ink-400" />
                <input
                  type="text"
                  placeholder="Search sender, email, org..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-xs border border-line rounded-xs focus:border-green-700 focus:outline-hidden"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs border border-line rounded-xs px-2 py-1 bg-white focus:border-green-700 focus:outline-hidden"
              >
                <option value="ALL">All Status</option>
                <option value="NEW">New</option>
                <option value="OPEN">Open</option>
                <option value="REPLIED">Replied</option>
                <option value="CLOSED">Closed</option>
                <option value="SPAM">Spam</option>
              </select>
            </div>

            {/* Scrollable Message List */}
            <div className="divide-y divide-line overflow-y-auto flex-1 max-h-[640px]">
              {loading ? (
                <div className="p-8 text-center text-xs text-ink-400">
                  Loading inbox queue...
                </div>
              ) : filteredMessages.length === 0 ? (
                <div className="p-8 text-center text-xs text-ink-400">
                  No submissions in this queue.
                </div>
              ) : (
                filteredMessages.map((m) => {
                  const f = m.fields as any;
                  const isSelected = selectedMessage?.id === m.id;

                  let sourceBadge = "bg-ivory-200 text-ink-700";
                  let icon = <Mail className="w-3.5 h-3.5" />;

                  if (m.source === "CORRECTIONS") {
                    sourceBadge = "bg-warning-50 text-warning-800";
                    icon = <AlertCircle className="w-3.5 h-3.5 text-warning-700" />;
                  } else if (m.source === "ADVERTISE") {
                    sourceBadge = "bg-green-50 text-green-800";
                    icon = <Megaphone className="w-3.5 h-3.5 text-green-700" />;
                  } else if (m.source === "COPYRIGHT") {
                    sourceBadge = "bg-red-50 text-red-800";
                    icon = <Scale className="w-3.5 h-3.5 text-red-700" />;
                  }

                  return (
                    <div
                      key={m.id}
                      onClick={() => setSelectedId(m.id)}
                      className={`p-3 cursor-pointer transition-all ${
                        isSelected
                          ? "bg-green-50/60 border-l-3 border-l-green-700"
                          : "hover:bg-ivory-50/70"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-chip flex items-center gap-1 ${sourceBadge}`}
                        >
                          {icon}
                          <span>{m.source}</span>
                        </span>
                        <span className="text-[10px] text-ink-400 font-mono">
                          {new Date(m.createdAt).toLocaleDateString("en-GB")}
                        </span>
                      </div>

                      <h4 className="font-serif font-bold text-xs text-ink-900 truncate">
                        {f?.name || "Anonymous Sender"}
                      </h4>
                      <p className="text-[11px] text-ink-500 truncate">
                        {f?.organization || f?.company || f?.email}
                      </p>

                      <div className="text-[11px] text-ink-700 line-clamp-1 mt-1 font-sans">
                        {f?.subject ||
                          f?.proposedCorrection ||
                          f?.campaignScope ||
                          f?.message ||
                          f?.originalWorkDescription}
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-line/40 text-[10px] text-ink-400">
                        <span>{m.country || "PK"}</span>
                        <span
                          className={`font-bold uppercase ${
                            m.status === "NEW"
                              ? "text-warning-700"
                              : m.status === "REPLIED"
                              ? "text-green-700"
                              : "text-ink-500"
                          }`}
                        >
                          {m.status}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* ============================================================
              RIGHT PANE (Cols 5-12): Detail View, Notes & Reply Composer
              ============================================================ */}
          <div className="lg:col-span-8 bg-white border border-line rounded-sm p-6 flex flex-col justify-between shadow-2xs space-y-6">
            {selectedMessage ? (
              <div className="space-y-6">
                {/* Detail View Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-line pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-chip bg-green-100 text-green-800">
                        {selectedMessage.source} SUBMISSION
                      </span>
                      <span className="text-xs text-ink-400">•</span>
                      <span className="text-xs text-ink-500">
                        Received {new Date(selectedMessage.createdAt).toLocaleString("en-GB")} PKT
                      </span>
                    </div>
                    <h2 className="text-base font-serif font-bold text-ink-900 mt-1">
                      {(selectedMessage.fields as any)?.subject ||
                        `${selectedMessage.source} Inquiry from ${(selectedMessage.fields as any)?.name}`}
                    </h2>
                    <div className="text-xs text-ink-600 mt-0.5 flex items-center gap-3">
                      <span>
                        <strong>From:</strong> {(selectedMessage.fields as any)?.name} &lt;
                        {(selectedMessage.fields as any)?.email}&gt;
                      </span>
                      <span>•</span>
                      <span>
                        IP: {selectedMessage.ip} ({selectedMessage.country})
                      </span>
                    </div>
                  </div>

                  {/* Status & Spam Controls */}
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedMessage.status}
                      onChange={(e) => handleStatusChange(e.target.value)}
                      className="text-xs font-semibold border border-line rounded-sm px-2.5 py-1.5 bg-white focus:border-green-700 focus:outline-hidden"
                    >
                      <option value="NEW">Status: NEW</option>
                      <option value="OPEN">Status: OPEN</option>
                      <option value="REPLIED">Status: REPLIED</option>
                      <option value="CLOSED">Status: CLOSED</option>
                      <option value="SPAM">Status: SPAM</option>
                    </select>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange("SPAM")}
                      className="text-red-700 border-red-200 hover:bg-red-50 text-xs"
                    >
                      Spam
                    </Button>
                  </div>
                </div>

                {/* Submitted Payload Box */}
                <div className="p-4 bg-ivory-50 border border-line rounded-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-line/60 pb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-ink-700">
                      Submitted Form Fields
                    </span>
                    {selectedMessage.pageUrl && (
                      <span className="text-xs font-mono text-ink-500">
                        Origin: {selectedMessage.pageUrl}
                      </span>
                    )}
                  </div>

                  {/* Render based on source */}
                  {selectedMessage.source === "CORRECTIONS" && (
                    <div className="space-y-3 text-xs text-ink-800">
                      <div>
                        <span className="font-semibold text-ink-500 block">
                          Target Article Slug:
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-mono bg-white px-2 py-0.5 border border-line rounded-xs">
                            {(selectedMessage.fields as any)?.targetSlug}
                          </span>
                          <Link
                            href={`/articles/${(selectedMessage.fields as any)?.targetSlug}`}
                            target="_blank"
                            className="text-green-700 hover:underline flex items-center gap-1 font-semibold"
                          >
                            <span>Inspect Article</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>

                      <div>
                        <span className="font-semibold text-ink-500 block">
                          Passage in Question:
                        </span>
                        <blockquote className="border-l-2 border-warning-600 pl-3 italic text-ink-900 bg-white p-2 rounded-xs mt-1">
                          {(selectedMessage.fields as any)?.specificPassage}
                        </blockquote>
                      </div>

                      <div>
                        <span className="font-semibold text-ink-500 block">
                          Proposed Correction & Evidence:
                        </span>
                        <p className="bg-white p-2 border border-line rounded-xs mt-1">
                          {(selectedMessage.fields as any)?.proposedCorrection}
                        </p>
                      </div>

                      <div>
                        <span className="font-semibold text-ink-500 block">
                          Sources Cited:
                        </span>
                        <p className="text-ink-600 mt-0.5">
                          {(selectedMessage.fields as any)?.sources}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedMessage.source === "ADVERTISE" && (
                    <div className="space-y-3 text-xs text-ink-800">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <span className="font-semibold text-ink-500 block">
                            Company / Entity:
                          </span>
                          <span className="font-bold text-ink-900">
                            {(selectedMessage.fields as any)?.company}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-ink-500 block">
                            Proposed Budget:
                          </span>
                          <span className="font-mono font-bold text-green-800">
                            {(selectedMessage.fields as any)?.proposedBudget}
                          </span>
                        </div>
                      </div>

                      <div>
                        <span className="font-semibold text-ink-500 block">
                          Preferred Slots:
                        </span>
                        <span className="font-mono">
                          {(selectedMessage.fields as any)?.preferredSlots}
                        </span>
                      </div>

                      <div>
                        <span className="font-semibold text-ink-500 block">
                          Campaign Scope & Brief:
                        </span>
                        <p className="bg-white p-2.5 border border-line rounded-xs mt-1">
                          {(selectedMessage.fields as any)?.message}
                        </p>
                      </div>

                      {/* Convert to Campaign Shortcut */}
                      <div className="pt-2">
                        <Link href="/admin/ads/campaigns/new">
                          <Button
                            variant="primary"
                            size="sm"
                            className="flex items-center gap-1.5"
                          >
                            <Megaphone className="w-3.5 h-3.5" />
                            <span>Convert to Ad Campaign (FRD §12.14)</span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}

                  {selectedMessage.source === "CONTACT" && (
                    <div className="space-y-3 text-xs text-ink-800">
                      <div>
                        <span className="font-semibold text-ink-500 block">
                          Organization:
                        </span>
                        <span>
                          {(selectedMessage.fields as any)?.organization ||
                            "Independent"}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-ink-500 block">
                          Message Body:
                        </span>
                        <p className="bg-white p-3 border border-line rounded-xs whitespace-pre-wrap mt-1">
                          {(selectedMessage.fields as any)?.message}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedMessage.source === "COPYRIGHT" && (
                    <div className="space-y-3 text-xs text-ink-800">
                      <div>
                        <span className="font-semibold text-ink-500 block">
                          Infringing URL:
                        </span>
                        <span className="font-mono text-red-700 bg-white px-2 py-0.5 border border-line rounded-xs">
                          {(selectedMessage.fields as any)?.infringingUrl}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-ink-500 block">
                          Claimed Work Description:
                        </span>
                        <p className="bg-white p-2 border border-line rounded-xs mt-1">
                          {(selectedMessage.fields as any)?.originalWorkDescription}
                        </p>
                      </div>
                      <div>
                        <span className="font-semibold text-ink-500 block">
                          Legal Signature:
                        </span>
                        <span className="font-serif italic font-bold">
                          {(selectedMessage.fields as any)?.signature}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Internal Notes Thread */}
                <div className="space-y-3 border-t border-line pt-4">
                  <h4 className="font-serif font-bold text-xs text-ink-900 flex items-center justify-between">
                    <span>Internal Editorial Notes ({selectedMessage.notes?.length || 0})</span>
                    <span className="text-[10px] text-ink-400 font-sans font-normal">
                      Visible only to admins & approvers
                    </span>
                  </h4>

                  <div className="space-y-2">
                    {selectedMessage.notes?.map((n: any) => (
                      <div
                        key={n.id}
                        className="p-2.5 bg-ivory-50 border border-line rounded-xs text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between text-[10px] text-ink-500">
                          <span className="font-semibold text-ink-800">
                            {n.author.profile?.displayName || n.author.email}
                          </span>
                          <span>{new Date(n.createdAt).toLocaleString("en-GB")}</span>
                        </div>
                        <p className="text-ink-700">{n.body}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add Note Form */}
                  <form onSubmit={handleAddNote} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add an internal note or flag for co-editors..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs border border-line rounded-xs focus:border-green-700 focus:outline-hidden"
                    />
                    <Button
                      type="submit"
                      variant="outline"
                      size="sm"
                      disabled={submittingNote || !newNote.trim()}
                    >
                      {submittingNote ? "Adding..." : "Add Note"}
                    </Button>
                  </form>
                </div>

                {/* Rich-Text Reply Composer (Modal 37 / Inline) */}
                <div className="space-y-3 border-t border-line pt-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-xs text-ink-900 flex items-center gap-1.5">
                      <Send className="w-3.5 h-3.5 text-green-700" />
                      <span>Official Editorial Reply</span>
                    </h4>
                    <span className="text-[10px] font-mono text-ink-500">
                      Sent from {selectedMessage.source === "ADVERTISE" ? "ads" : "editor"}@forumstrategic.com
                    </span>
                  </div>

                  <form onSubmit={handleSendReply} className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-ink-600 mb-1">
                        Subject Line
                      </label>
                      <input
                        type="text"
                        required
                        value={replySubject}
                        onChange={(e) => setReplySubject(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-line rounded-xs focus:border-green-700 focus:outline-hidden font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-ink-600 mb-1">
                        Message Body
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={replyBody}
                        onChange={(e) => setReplyBody(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-line rounded-xs focus:border-green-700 focus:outline-hidden font-sans resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-ink-400">
                        Automatically updates submission status to <strong>REPLIED</strong> and logs event to audit history.
                      </span>

                      <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        disabled={sendingReply}
                        className="flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{sendingReply ? "Sending..." : "Dispatch Official Reply"}</span>
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-xs text-ink-400">
                Select a message from the queue on the left to inspect its contents.
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

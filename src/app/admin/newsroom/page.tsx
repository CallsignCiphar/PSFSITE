"use client";

import React, { useState, useEffect } from "react";
import { AdminShell } from "@/components/layout/admin-shell";
import {
  Flame,
  Pin,
  Clock,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  ExternalLink,
  Eye,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getNewsroomPosts,
  togglePinNewsroomPost,
  deleteNewsroomPost,
} from "@/app/actions/newsroom-actions";
import { NewsroomEditModal } from "@/components/admin/newsroom/newsroom-edit-modal";

export default function AdminNewsroomPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getNewsroomPosts({
        status: statusFilter,
        query: searchQuery,
      });
      setPosts(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter, searchQuery]);

  const handleTogglePin = async (id: string) => {
    try {
      await togglePinNewsroomPost(id);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to toggle pin.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to unpublish/withdraw this wire post?")) {
      return;
    }
    try {
      await deleteNewsroomPost(id);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to delete post.");
    }
  };

  const openCreateModal = () => {
    setSelectedPost(null);
    setIsModalOpen(true);
  };

  const openEditModal = (post: any) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const pinnedCount = posts.filter((p) => p.pinned).length;

  return (
    <AdminShell title="Newsroom Wire Admin">
      <div className="space-y-6 font-sans">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded-chip">
                Section 12.9 • Real-Time Wire Desk
              </span>
              <h1 className="text-xl font-serif font-bold text-ink-900">
                Newsroom Wire Dispatch & Ticker
              </h1>
            </div>
            <p className="text-xs text-ink-500 mt-1">
              Publish rapid operational alerts, breaking defence announcements, and live diplomatic dispatches with automated ticker propagation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={openCreateModal}
              className="flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>New Wire Post (Modal 31)</span>
            </Button>
          </div>
        </div>

        {/* Info Banner on 3-Pin rule */}
        <div className="p-3 bg-ivory-50 border border-line rounded-sm flex items-center justify-between text-xs text-ink-600">
          <div className="flex items-center gap-2">
            <Pin className="w-4 h-4 text-green-700" />
            <span>
              Pinned to Home Ticker: <strong>{pinnedCount} of 3</strong> slots occupied. (Rule: pinning a 4th automatically unpins the oldest).
            </span>
          </div>
          <span className="text-[11px] text-ink-400 font-mono">
            FRD §12.9 Constraint
          </span>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 border border-line rounded-sm shadow-2xs">
          <div className="flex items-center gap-1 text-xs">
            {["ALL", "PUBLISHED", "SCHEDULED", "DRAFT"].map((st) => (
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
              placeholder="Search by headline or ref ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-line rounded-sm focus:border-green-700 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Newsroom Table */}
        <div className="bg-white border border-line rounded-sm overflow-hidden shadow-2xs">
          {loading ? (
            <div className="p-12 text-center text-xs text-ink-400">
              Loading newsroom dispatches and ticker statuses...
            </div>
          ) : posts.length === 0 ? (
            <div className="p-12 text-center text-xs text-ink-500">
              No wire dispatches match the selected filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-ivory-50 border-b border-line text-[11px] font-bold uppercase tracking-wider text-ink-600">
                    <th className="py-3 px-4">Time (PKT)</th>
                    <th className="py-3 px-4">Headline</th>
                    <th className="py-3 px-4">Topic</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-center">Alerts</th>
                    <th className="py-3 px-4 text-right">Clicks / Reads</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {posts.map((post) => (
                    <tr
                      key={post.id}
                      className="hover:bg-ivory-50/70 transition-colors"
                    >
                      <td className="py-3 px-4 font-mono text-[11px] text-ink-500 whitespace-nowrap">
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Unpublished"}
                      </td>

                      <td className="py-3 px-4 max-w-md">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-ink-400">
                            {post.refId}
                          </span>
                        </div>
                        <h4
                          onClick={() => openEditModal(post)}
                          className="font-serif font-bold text-xs text-ink-900 hover:text-green-800 cursor-pointer line-clamp-1 mt-0.5"
                        >
                          {post.headline}
                        </h4>
                      </td>

                      <td className="py-3 px-4 text-ink-600">
                        {post.topic}
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-chip ${
                            post.status === "PUBLISHED"
                              ? "bg-green-100 text-green-800"
                              : post.status === "SCHEDULED"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-ivory-200 text-ink-600"
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          {post.breaking && (
                            <span className="px-1.5 py-0.2 bg-red-100 text-red-700 rounded-chip text-[9px] font-bold uppercase flex items-center gap-0.5">
                              <Flame className="w-2.5 h-2.5" />
                              <span>Breaking</span>
                            </span>
                          )}
                          {post.pinned && (
                            <span className="px-1.5 py-0.2 bg-green-100 text-green-800 rounded-chip text-[9px] font-bold uppercase flex items-center gap-0.5">
                              <Pin className="w-2.5 h-2.5" />
                              <span>Pinned</span>
                            </span>
                          )}
                          {!post.breaking && !post.pinned && (
                            <span className="text-ink-400 text-[10px]">—</span>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right font-mono font-medium text-ink-900">
                        {post.clicks.toLocaleString()}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleTogglePin(post.id)}
                            title={post.pinned ? "Unpin post" : "Pin post to ticker"}
                            className={`p-1.5 rounded-xs ${
                              post.pinned
                                ? "text-green-700 bg-green-50"
                                : "text-ink-400 hover:text-green-700 hover:bg-ivory-200"
                            }`}
                          >
                            <Pin className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => openEditModal(post)}
                            title="Edit post"
                            className="p-1.5 text-ink-500 hover:text-ink-900 hover:bg-ivory-200 rounded-xs"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(post.id)}
                            title="Unpublish post"
                            className="p-1.5 text-ink-400 hover:text-red-700 hover:bg-red-50 rounded-xs"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal 31 */}
        <NewsroomEditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          post={selectedPost}
          onSuccess={loadData}
        />
      </div>
    </AdminShell>
  );
}

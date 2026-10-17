"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Flame,
  Pin,
  Clock,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Image as ImageIcon,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveNewsroomPost } from "@/app/actions/newsroom-actions";

interface NewsroomEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  post?: any | null;
  onSuccess: () => void;
}

export function NewsroomEditModal({
  isOpen,
  onClose,
  post,
  onSuccess,
}: NewsroomEditModalProps) {
  const [headline, setHeadline] = useState("");
  const [summary, setSummary] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [breaking, setBreaking] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [publishAction, setPublishAction] = useState<"NOW" | "SCHEDULE" | "DRAFT">("NOW");
  const [scheduledFor, setScheduledFor] = useState("");
  const [expiresAfter, setExpiresAfter] = useState("");

  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (post) {
      setHeadline(post.headline || "");
      setSummary(post.summary || "");
      setSourceName(post.sourceName || "");
      setSourceUrl(post.sourceUrl || "");
      setThumbnailUrl(post.cardImageUrl || "");
      setBreaking(post.breaking || false);
      setPinned(post.pinned || false);
      setPublishAction(post.status === "DRAFT" ? "DRAFT" : "NOW");
      setScheduledFor("");
      setExpiresAfter(post.expiresAt ? post.expiresAt.slice(0, 16) : "");
    } else {
      setHeadline("");
      setSummary("");
      setSourceName("");
      setSourceUrl("");
      setThumbnailUrl(
        "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=800"
      );
      setBreaking(false);
      setPinned(false);
      setPublishAction("NOW");
      setScheduledFor("");
      setExpiresAfter("");
    }
  }, [post, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (headline.length < 10 || headline.length > 110) {
      setErrorMessage("Headline must be between 10 and 110 characters.");
      return;
    }
    if (summary.length < 30 || summary.length > 800) {
      setErrorMessage("Summary must be between 30 and 800 characters.");
      return;
    }

    setSaving(true);
    try {
      const res = await saveNewsroomPost({
        id: post?.id,
        headline,
        summary,
        sourceName: sourceName.trim() || undefined,
        sourceUrl: sourceUrl.trim() || undefined,
        thumbnailUrl: thumbnailUrl.trim() || undefined,
        breaking,
        pinned,
        publishAction,
        scheduledFor: scheduledFor || undefined,
        expiresAfter: expiresAfter || undefined,
      });

      if (!res.success) {
        setErrorMessage("Failed to save newsroom post.");
      } else {
        onSuccess();
        onClose();
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in font-sans">
      <div className="bg-white border border-line rounded-xs shadow-2xl w-full max-w-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-line flex items-center justify-between bg-ivory-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded-chip">
                Modal 31 • Wire Post
              </span>
              <h2 className="text-base font-serif font-bold text-ink-900">
                {post ? "Edit Newsroom Post" : "Publish Wire Alert"}
              </h2>
            </div>
            <p className="text-xs text-ink-500 mt-0.5">
              Live updates for home ticker, global watch map, and real-time newsroom
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-ink-400 hover:text-ink-700 rounded-sm hover:bg-ivory-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form
          id="newsroomForm"
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto flex-1 space-y-4 text-xs"
        >
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-sm text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Headline */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-semibold text-ink-800">
                Headline * (10–110 characters)
              </label>
              <span
                className={`font-mono text-[10px] ${
                  headline.length > 110 ? "text-red-600 font-bold" : "text-ink-400"
                }`}
              >
                {headline.length}/110
              </span>
            </div>
            <input
              type="text"
              required
              placeholder="e.g. Pakistan Air Force Inducts Modernised Radar Systems in Northern Airspace"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-line rounded-sm focus:border-green-700 focus:outline-hidden font-medium"
            />
          </div>

          {/* Summary */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-semibold text-ink-800">
                Summary / Bullet Points * (30–800 characters)
              </label>
              <span
                className={`font-mono text-[10px] ${
                  summary.length > 800 ? "text-red-600 font-bold" : "text-ink-400"
                }`}
              >
                {summary.length}/800
              </span>
            </div>
            <textarea
              rows={4}
              required
              placeholder="Concise operational briefing detailing facts, official spokespersons, and strategic implications..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-line rounded-sm focus:border-green-700 focus:outline-hidden resize-none font-sans"
            />
          </div>

          {/* Source attribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-ink-700 mb-1">
                Source Attribution Name
              </label>
              <input
                type="text"
                placeholder="e.g. ISPR Official Press Release"
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
                className="w-full px-3 py-2 border border-line rounded-sm focus:border-green-700 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block font-semibold text-ink-700 mb-1">
                Source Document URL
              </label>
              <input
                type="url"
                placeholder="https://ispr.gov.pk/press-release"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                className="w-full px-3 py-2 border border-line rounded-sm focus:border-green-700 focus:outline-hidden font-mono"
              />
            </div>
          </div>

          {/* Thumbnail Image */}
          <div>
            <label className="block font-semibold text-ink-700 mb-1">
              16:9 Thumbnail Image URL (800x450)
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              className="w-full px-3 py-2 border border-line rounded-sm focus:border-green-700 focus:outline-hidden font-mono"
            />
          </div>

          {/* Toggles: Breaking & Pin to Top */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-line">
            <label className="flex items-start gap-2.5 p-3 border border-line rounded-sm bg-ivory-50 cursor-pointer">
              <input
                type="checkbox"
                checked={breaking}
                onChange={(e) => setBreaking(e.target.checked)}
                className="mt-0.5 rounded-xs text-red-600 focus:ring-red-600"
              />
              <div>
                <span className="font-bold text-ink-900 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-red-600" />
                  <span>Mark as Breaking Alert</span>
                </span>
                <span className="text-[10px] text-ink-500 block mt-0.5">
                  Shows the red Breaking badge on hero ticker for 6 hours, then automatically turns off.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-2.5 p-3 border border-line rounded-sm bg-ivory-50 cursor-pointer">
              <input
                type="checkbox"
                checked={pinned}
                onChange={(e) => setPinned(e.target.checked)}
                className="mt-0.5 rounded-xs text-green-700 focus:ring-green-700"
              />
              <div>
                <span className="font-bold text-ink-900 flex items-center gap-1.5">
                  <Pin className="w-3.5 h-3.5 text-green-700" />
                  <span>Pin to Top of Wire</span>
                </span>
                <span className="text-[10px] text-ink-500 block mt-0.5">
                  Max 3 pinned posts. Pinning a 4th post automatically unpins the oldest pinned story.
                </span>
              </div>
            </label>
          </div>

          {/* Publishing Dispatch Radios */}
          <div className="pt-2 border-t border-line space-y-2">
            <label className="block font-semibold text-ink-800">
              Publishing Options
            </label>
            <div className="grid grid-cols-3 gap-2">
              <label
                className={`p-2.5 border text-center rounded-sm cursor-pointer ${
                  publishAction === "NOW"
                    ? "border-green-700 bg-green-50 text-green-900 font-bold"
                    : "border-line bg-white text-ink-700"
                }`}
              >
                <input
                  type="radio"
                  name="publishAction"
                  value="NOW"
                  checked={publishAction === "NOW"}
                  onChange={() => setPublishAction("NOW")}
                  className="sr-only"
                />
                <span>Publish Immediately</span>
              </label>

              <label
                className={`p-2.5 border text-center rounded-sm cursor-pointer ${
                  publishAction === "SCHEDULE"
                    ? "border-green-700 bg-green-50 text-green-900 font-bold"
                    : "border-line bg-white text-ink-700"
                }`}
              >
                <input
                  type="radio"
                  name="publishAction"
                  value="SCHEDULE"
                  checked={publishAction === "SCHEDULE"}
                  onChange={() => setPublishAction("SCHEDULE")}
                  className="sr-only"
                />
                <span>Schedule (PKT)</span>
              </label>

              <label
                className={`p-2.5 border text-center rounded-sm cursor-pointer ${
                  publishAction === "DRAFT"
                    ? "border-green-700 bg-green-50 text-green-900 font-bold"
                    : "border-line bg-white text-ink-700"
                }`}
              >
                <input
                  type="radio"
                  name="publishAction"
                  value="DRAFT"
                  checked={publishAction === "DRAFT"}
                  onChange={() => setPublishAction("DRAFT")}
                  className="sr-only"
                />
                <span>Save as Draft</span>
              </label>
            </div>

            {publishAction === "SCHEDULE" && (
              <div className="pt-2">
                <label className="block font-medium text-ink-700 mb-1">
                  Schedule Release Time (PKT)
                </label>
                <input
                  type="datetime-local"
                  required
                  value={scheduledFor}
                  onChange={(e) => setScheduledFor(e.target.value)}
                  className="w-full px-3 py-1.5 border border-line rounded-sm focus:border-green-700 focus:outline-hidden"
                />
              </div>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-line bg-ivory-50 flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            form="newsroomForm"
            variant="primary"
            size="sm"
            disabled={saving}
            className="flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{saving ? "Saving..." : "Save Newsroom Post"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import {
  X,
  Image as ImageIcon,
  FileText,
  Upload,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { replaceMediaAsset } from "@/app/actions/cms-actions";
import { MediaAsset } from "@/lib/constants/cms";

interface MediaReplaceModalProps {
  asset: MediaAsset | null;
  onClose: () => void;
  onReplaced: () => void;
}

export function MediaReplaceModal({
  asset,
  onClose,
  onReplaced,
}: MediaReplaceModalProps) {
  const [newUrl, setNewUrl] = useState("");
  const [altText, setAltText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  React.useEffect(() => {
    if (asset) {
      setNewUrl(asset.url);
      setAltText(asset.altText);
      setErrorMsg(null);
    }
  }, [asset]);

  if (!asset) return null;

  const handleReplace = async () => {
    if (!newUrl.trim()) {
      setErrorMsg("New asset URL or binary file is required.");
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await replaceMediaAsset(asset.id, newUrl.trim(), altText.trim());
      if (res.success) {
        onReplaced();
      } else {
        setErrorMsg(res.error || "Failed to replace asset.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white border border-line rounded-sm shadow-xl w-full max-w-lg p-6 space-y-4 text-xs">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-line">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-green-50 border border-green-200 flex items-center justify-center text-green-800">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-ink-900">
                Replace Media Asset (Modal 41)
              </h3>
              <span className="font-mono text-[10px] text-ink-500">
                {asset.name}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-ink-400 hover:text-ink-700 p-1 rounded-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-sm">
            {errorMsg}
          </div>
        )}

        {/* Existing Asset Metadata Card */}
        <div className="p-3 bg-ivory-50 border border-line rounded-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-ink-900">Current Metadata</span>
            <span className="px-1.5 py-0.2 bg-white border border-line rounded-sm text-[10px] font-mono">
              {asset.type} • {asset.dimensions}
            </span>
          </div>
          <div className="text-[11px] text-ink-600 space-y-0.5">
            <div>
              <strong>Size:</strong> {(asset.fileSizeBytes / 1024).toFixed(1)} KB
            </div>
            <div>
              <strong>Attribution:</strong> {asset.credit}
            </div>
            <div>
              <strong>Referenced in:</strong>{" "}
              {asset.usedInPages.map((p) => (
                <span
                  key={p}
                  className="inline-block mr-1 px-1.5 py-0.2 bg-white border border-line rounded-sm text-[10px] text-ink-700"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Replacement Warning */}
        <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-sm flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            <strong>In-Place Replacement:</strong> Updating this asset preserves existing URL permalinks.
            All {asset.usageCount} active page references will immediately display the new media asset.
          </p>
        </div>

        {/* Replacement Form */}
        <div className="space-y-3">
          <div>
            <label className="block font-semibold text-ink-700 mb-1">
              New Media File Path / URL *
            </label>
            <input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="/images/updated-asset.jpg"
              className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 font-mono focus:outline-none focus:border-green-700"
            />
          </div>

          <div>
            <label className="block font-semibold text-ink-700 mb-1">
              Updated Alt Text (Accessibility) *
            </label>
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Descriptive text for screen readers..."
              className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-line">
          <Button variant="outline" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleReplace} disabled={submitting}>
            {submitting ? "Updating Asset..." : "Confirm In-Place Replacement"}
          </Button>
        </div>
      </div>
    </div>
  );
}

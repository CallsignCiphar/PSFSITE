"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/layout/admin-shell";
import {
  Image as ImageIcon,
  FileText,
  Search,
  Filter,
  Upload,
  RefreshCw,
  Eye,
  Trash2,
  ExternalLink,
  ChevronLeft,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMediaAssets } from "@/app/actions/cms-actions";
import { MediaAsset } from "@/lib/constants/cms";
import { MediaReplaceModal } from "@/components/admin/cms/media-replace-modal";

export default function AdminMediaLibraryPage() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getMediaAssets(searchQuery);
      setAssets(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchQuery]);

  const filteredAssets = assets.filter((a) => {
    if (typeFilter === "ALL") return true;
    return a.type === typeFilter;
  });

  return (
    <AdminShell title="Media Asset Library">
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
          <div>
            <div className="flex items-center gap-2 text-xs text-ink-500 mb-1">
              <Link href="/admin/cms" className="hover:text-ink-800 flex items-center gap-1">
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>CMS Hub</span>
              </Link>
              <span>/</span>
              <span className="text-ink-900 font-semibold">Media Library</span>
            </div>
            <h1 className="text-2xl font-bold font-serif text-ink-900 tracking-tight">
              Media Asset Library (FRD Section 12.16)
            </h1>
            <p className="text-xs text-ink-600 mt-1 max-w-2xl">
              Inspect, manage, and replace high-resolution images, SVG institutional crests, and PDF monographs.
              In-place replacement retains permalinks across all articles and reports.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="primary"
              onClick={() => alert("Upload dialog: select image or PDF to stage into media library.")}
            >
              <Upload className="w-4 h-4 mr-1.5" />
              <span>Upload New Asset</span>
            </Button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white border border-line rounded-sm p-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="w-4 h-4 text-ink-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search assets by filename, alt text, or credit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-line rounded-sm bg-white text-xs text-ink-900 focus:outline-none focus:border-green-700"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-1.5 border border-line rounded-sm bg-white text-xs text-ink-700 focus:outline-none focus:border-green-700"
            >
              <option value="ALL">All Media Types</option>
              <option value="IMAGE">Images (JPG, WebP)</option>
              <option value="VECTOR">Vectors (SVG Crests)</option>
              <option value="PDF">PDF Monographs</option>
            </select>

            <button
              onClick={loadData}
              className="p-1.5 border border-line rounded-sm bg-white hover:bg-ivory-50 text-ink-600"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Asset Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            <div className="col-span-full py-12 text-center text-xs text-ink-400">
              Loading media assets...
            </div>
          ) : filteredAssets.length === 0 ? (
            <div className="col-span-full py-12 text-center text-xs text-ink-400">
              No media assets match your active query.
            </div>
          ) : (
            filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className="bg-white border border-line rounded-sm overflow-hidden flex flex-col hover:border-green-700 transition-colors shadow-xs"
              >
                {/* Visual Preview / Thumbnail */}
                <div className="h-40 bg-ivory-100 border-b border-line flex items-center justify-center p-3 relative group">
                  {asset.type === "PDF" ? (
                    <div className="flex flex-col items-center justify-center text-ink-500">
                      <FileText className="w-12 h-12 text-red-700 mb-1" />
                      <span className="font-mono text-[10px] font-bold uppercase">
                        PDF Document
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-ink-400">
                      <ImageIcon className="w-12 h-12 mb-1" />
                      <span className="text-[10px] font-mono text-ink-500">
                        {asset.dimensions}
                      </span>
                    </div>
                  )}

                  <span className="absolute top-2 right-2 px-1.5 py-0.2 bg-white/90 backdrop-blur-xs border border-line rounded-sm font-mono text-[9px] font-bold text-ink-700 uppercase">
                    {asset.type}
                  </span>
                </div>

                {/* Details Body */}
                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2 text-xs">
                  <div>
                    <h3 className="font-mono font-bold text-[11px] text-ink-900 truncate" title={asset.name}>
                      {asset.name}
                    </h3>
                    <p className="text-[11px] text-ink-500 line-clamp-2 mt-1">
                      {asset.altText}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-line space-y-1 text-[10px] text-ink-500">
                    <div className="flex items-center justify-between">
                      <span>Dimensions:</span>
                      <span className="font-mono text-ink-800">{asset.dimensions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>File Size:</span>
                      <span className="font-mono text-ink-800">
                        {(asset.fileSizeBytes / 1024).toFixed(1)} KB
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Attribution:</span>
                      <span className="text-ink-800 truncate max-w-[120px]">
                        {asset.credit}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Active Usage:</span>
                      <span className="font-bold text-green-700">
                        {asset.usageCount} References
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-line flex items-center justify-between">
                    <Button
                      variant="outline"
                      className="w-full text-xs py-1"
                      onClick={() => setSelectedAsset(asset)}
                    >
                      <span>Replace Asset (Modal 41)</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Media Replace Modal (Modal 41) */}
        <MediaReplaceModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          onReplaced={() => {
            setSelectedAsset(null);
            loadData();
          }}
        />
      </div>
    </AdminShell>
  );
}

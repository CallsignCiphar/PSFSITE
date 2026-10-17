"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Layers,
  Save,
  CheckCircle2,
  Eye,
  History,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getPageSections,
  publishPageDraft,
} from "@/app/actions/cms-actions";
import { PublicPageItem } from "@/lib/constants/cms";

interface PageEditorDrawerProps {
  page: PublicPageItem | null;
  onClose: () => void;
  onPublished: () => void;
}

export function PageEditorDrawer({
  page,
  onClose,
  onPublished,
}: PageEditorDrawerProps) {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [activeTab, setActiveTab] = useState<"sections" | "history">("sections");
  const [historyOpen, setHistoryOpen] = useState(false);

  useEffect(() => {
    if (page) {
      setLoading(true);
      getPageSections(page.key)
        .then((data) => setSections(data))
        .finally(() => setLoading(false));
    }
  }, [page]);

  if (!page) return null;

  const handleFieldChange = (
    sectionIndex: number,
    fieldKey: string,
    val: string
  ) => {
    setSections((prev) => {
      const copy = [...prev];
      const targetSec = { ...copy[sectionIndex] };
      targetSec.fields = targetSec.fields.map((f: any) =>
        f.key === fieldKey ? { ...f, value: val } : f
      );
      copy[sectionIndex] = targetSec;
      return copy;
    });
  };

  const handlePublish = async () => {
    setPublishing(true);
    try {
      const res = await publishPageDraft(page.key, sections);
      if (res.success) {
        onPublished();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60">
      <div className="bg-white border-l border-line shadow-2xl w-full max-w-2xl h-full flex flex-col text-xs animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-line flex items-center justify-between bg-ivory-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-green-50 border border-green-200 flex items-center justify-center text-green-800">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold font-serif text-ink-900">
                  {page.title}
                </h2>
                <span
                  className={`px-1.5 py-0.2 rounded-sm text-[10px] font-bold uppercase tracking-wider ${
                    page.status === "PUBLISHED"
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {page.status === "PUBLISHED" ? "Published" : "Draft Pending"}
                </span>
              </div>
              <span className="font-mono text-[11px] text-ink-500 block mt-0.5">
                Route: {page.path}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.open(page.path, "_blank")}
              className="p-1.5 text-ink-500 hover:text-green-700 hover:bg-white rounded-sm"
              title="Open public page"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="text-ink-400 hover:text-ink-700 p-1.5 rounded-sm hover:bg-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Template Lock Notice */}
        <div className="bg-ivory-100/70 border-b border-line px-6 py-2 flex items-center justify-between text-[11px] text-ink-600 shrink-0">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-ink-500" />
            <span>
              <strong>Locked Editorial Template:</strong> Layout hierarchy and CSS tokens are locked. Copy and assets can be safely edited.
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {loading ? (
            <div className="py-12 text-center text-ink-400">
              Loading page sections...
            </div>
          ) : (
            <div className="space-y-6">
              {sections.map((section, sIdx) => (
                <div
                  key={section.sectionKey}
                  className="border border-line rounded-sm overflow-hidden bg-white shadow-xs"
                >
                  <div className="bg-ivory-50 px-4 py-2.5 border-b border-line flex items-center justify-between">
                    <span className="font-bold text-ink-900 text-xs">
                      {section.title}
                    </span>
                    <span className="font-mono text-[10px] text-ink-400">
                      #{section.sectionKey}
                    </span>
                  </div>

                  <div className="p-4 space-y-4">
                    {section.fields.map((f: any) => (
                      <div key={f.key}>
                        <label className="block text-ink-700 font-semibold mb-1 text-xs">
                          {f.label}
                        </label>
                        {f.type === "textarea" ? (
                          <textarea
                            rows={3}
                            value={f.value}
                            onChange={(e) =>
                              handleFieldChange(sIdx, f.key, e.target.value)
                            }
                            className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700 text-xs"
                          />
                        ) : f.type === "image" ? (
                          <div className="flex items-center gap-3">
                            <input
                              type="text"
                              value={f.value}
                              onChange={(e) =>
                                handleFieldChange(sIdx, f.key, e.target.value)
                              }
                              className="w-full px-3 py-1.5 border border-line rounded-sm bg-white text-ink-900 font-mono text-xs focus:outline-none focus:border-green-700"
                            />
                            <Button variant="outline" type="button">
                              <ImageIcon className="w-3.5 h-3.5 mr-1" />
                              <span>Select Asset</span>
                            </Button>
                          </div>
                        ) : (
                          <input
                            type="text"
                            value={f.value}
                            onChange={(e) =>
                              handleFieldChange(sIdx, f.key, e.target.value)
                            }
                            className="w-full px-3 py-1.5 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700 text-xs"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Revision History Section */}
              <div className="border border-line rounded-sm bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setHistoryOpen(!historyOpen)}
                  className="w-full bg-ivory-50 px-4 py-2.5 flex items-center justify-between text-ink-800 font-bold hover:bg-ivory-100"
                >
                  <div className="flex items-center gap-2">
                    <History className="w-3.5 h-3.5 text-ink-500" />
                    <span>Revision History & Rollbacks</span>
                  </div>
                  {historyOpen ? (
                    <ChevronUp className="w-4 h-4 text-ink-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-ink-500" />
                  )}
                </button>

                {historyOpen && (
                  <div className="p-4 space-y-3 divide-y divide-line">
                    <div className="pt-2 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-ink-900 block">
                          Revision 104 • Published Live
                        </span>
                        <span className="text-[10px] text-ink-500">
                          17 October 2026, 20:15 PKT by Dr. Tariq Niazi
                        </span>
                      </div>
                      <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-sm text-[10px] font-bold">
                        Current
                      </span>
                    </div>

                    <div className="pt-3 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-ink-800 block">
                          Revision 103 • Standfirst update
                        </span>
                        <span className="text-[10px] text-ink-500">
                          14 October 2026, 12:30 PKT by Ayesha Siddiqui
                        </span>
                      </div>
                      <Button variant="outline" type="button">
                        <RotateCcw className="w-3 h-3 mr-1" />
                        <span>Restore This</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        <div className="px-6 py-4 border-t border-line bg-ivory-50 flex items-center justify-between shrink-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => window.open(page.path, "_blank")}
            >
              <Eye className="w-3.5 h-3.5 mr-1" />
              <span>Preview Live</span>
            </Button>
            <Button
              variant="primary"
              onClick={handlePublish}
              disabled={publishing}
            >
              <Save className="w-3.5 h-3.5 mr-1" />
              <span>{publishing ? "Publishing Live..." : "Publish Revision"}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/layout/admin-shell";
import {
  Layers,
  FileText,
  Menu,
  Share2,
  Image as ImageIcon,
  ExternalLink,
  Edit2,
  CheckCircle2,
  Clock,
  Search,
  RefreshCw,
  Plus,
  Trash2,
  Save,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCmsPages } from "@/app/actions/cms-actions";
import { PublicPageItem } from "@/lib/constants/cms";
import { PageEditorDrawer } from "@/components/admin/cms/page-editor-drawer";

type CmsTab = "pages" | "navigation" | "footer" | "social";

export default function AdminCmsPage() {
  const [activeTab, setActiveTab] = useState<CmsTab>("pages");
  const [pages, setPages] = useState<PublicPageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  // Drawer state
  const [selectedPage, setSelectedPage] = useState<PublicPageItem | null>(null);

  // Global Navigation state
  const [headerCtaLabel, setHeaderCtaLabel] = useState("Publish With Us");
  const [headerCtaUrl, setHeaderCtaUrl] = useState("/join");

  // Footer state
  const [footerMission, setFooterMission] = useState(
    "Pakistan Strategic Forum is an independent, non-partisan research collective and digital platform dedicated to rigorous strategic, aerospace, and geopolitical studies."
  );
  const [footerCopyright, setFooterCopyright] = useState(
    "© {{year}} Pakistan Strategic Forum. All rights reserved. Registered think tank and research organisation."
  );

  // Social Links state
  const [socialLinks, setSocialLinks] = useState([
    { platform: "X (Twitter)", handle: "@PakStratForum", url: "https://x.com/PakStratForum", followers: "145K", showFooter: true, showUtility: true },
    { platform: "YouTube", handle: "Pakistan Strategic Forum", url: "https://youtube.com/@PakStratForum", followers: "92K", showFooter: true, showUtility: true },
    { platform: "LinkedIn", handle: "Pakistan Strategic Forum", url: "https://linkedin.com/company/pakstrategic", followers: "34K", showFooter: true, showUtility: false },
    { platform: "Telegram", handle: "t.me/PSF_Intelligence", url: "https://t.me/PSF_Intelligence", followers: "28K", showFooter: true, showUtility: true },
    { platform: "WhatsApp Channel", handle: "PSF Strategic Wire", url: "https://whatsapp.com/channel/psf", followers: "18K", showFooter: true, showUtility: false },
  ]);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getCmsPages();
      setPages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredPages = pages.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.path.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "ALL" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AdminShell title="CMS & Editorial Template Management">
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
          <div>
            <div className="flex items-center gap-2 text-xs text-ink-500 mb-1">
              <span>Admin Console</span>
              <span>/</span>
              <span className="text-ink-900 font-semibold">CMS Engine</span>
            </div>
            <h1 className="text-2xl font-bold font-serif text-ink-900 tracking-tight">
              Content Management System (CMS)
            </h1>
            <p className="text-xs text-ink-600 mt-1 max-w-2xl">
              Edit public text, navigation, social presences, and institutional policies without code
              within locked templates. Preserves typography and layout rules.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link href="/admin/cms/media">
              <Button variant="outline">
                <ImageIcon className="w-4 h-4 mr-1.5" />
                <span>Media Asset Library</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* CMS Tabs */}
        <div className="flex items-center gap-1 border-b border-line text-xs pb-px">
          {[
            { id: "pages", label: "Public Pages Hub", icon: FileText, count: pages.length },
            { id: "navigation", label: "Global Header & Utility", icon: Menu },
            { id: "footer", label: "Footer & Copyright", icon: Layers },
            { id: "social", label: "Social Presences", icon: Share2, count: socialLinks.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as CmsTab)}
                className={`flex items-center gap-2 px-4 py-2.5 font-semibold transition-colors border-b-2 whitespace-nowrap ${
                  isActive
                    ? "border-green-700 text-green-700 bg-white"
                    : "border-transparent text-ink-600 hover:text-ink-900 hover:bg-ivory-50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="px-1.5 py-0.2 bg-ivory-100 text-ink-700 rounded-sm text-[10px] font-mono">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: PUBLIC PAGES HUB */}
        {activeTab === "pages" && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="bg-white border border-line rounded-sm p-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
              <div className="relative flex-1 w-full max-w-md">
                <Search className="w-4 h-4 text-ink-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter public pages by title or URL path..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 border border-line rounded-sm bg-white text-xs text-ink-900 focus:outline-none focus:border-green-700"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-1.5 border border-line rounded-sm bg-white text-xs text-ink-700 focus:outline-none focus:border-green-700"
                >
                  <option value="ALL">All Page Categories</option>
                  <option value="Core Portal">Core Portal</option>
                  <option value="Editorial Hub">Editorial Hub</option>
                  <option value="Institutional & Legal">Institutional & Legal</option>
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

            {/* Pages Table */}
            <div className="bg-white border border-line rounded-sm overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-ivory-50 border-b border-line text-[11px] font-bold uppercase tracking-wider text-ink-600">
                      <th className="py-3 px-4">Page Title & Category</th>
                      <th className="py-3 px-4">Canonical Path</th>
                      <th className="py-3 px-4 text-center">Sections</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4">Last Edited</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-ink-400">
                          Loading public pages catalogue...
                        </td>
                      </tr>
                    ) : filteredPages.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-ink-400">
                          No pages found matching the active search.
                        </td>
                      </tr>
                    ) : (
                      filteredPages.map((page) => (
                        <tr
                          key={page.key}
                          className="hover:bg-ivory-50/50 transition-colors cursor-pointer"
                          onClick={() => setSelectedPage(page)}
                        >
                          <td className="py-3 px-4">
                            <span className="font-bold text-ink-900 block font-serif text-sm">
                              {page.title}
                            </span>
                            <span className="text-[10px] text-ink-500 uppercase tracking-wider font-semibold">
                              {page.category}
                            </span>
                          </td>

                          <td className="py-3 px-4 font-mono text-[11px] text-ink-700">
                            {page.path}
                          </td>

                          <td className="py-3 px-4 text-center font-mono text-ink-700 font-bold">
                            {page.sectionsCount} Sections
                          </td>

                          <td className="py-3 px-4 text-center">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm font-bold text-[10px] uppercase tracking-wider ${
                                page.status === "PUBLISHED"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {page.status === "PUBLISHED" ? (
                                <CheckCircle2 className="w-3 h-3" />
                              ) : (
                                <Clock className="w-3 h-3" />
                              )}
                              <span>{page.status === "PUBLISHED" ? "Published" : "Draft Pending"}</span>
                            </span>
                          </td>

                          <td className="py-3 px-4 text-ink-500">
                            <span className="block font-medium text-ink-700">
                              {page.lastEditedBy}
                            </span>
                            <span className="font-mono text-[10px]">
                              {new Date(page.updatedAt).toLocaleDateString("en-GB")}
                            </span>
                          </td>

                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(page.path, "_blank");
                                }}
                                className="p-1.5 text-ink-500 hover:text-ink-900 rounded-sm hover:bg-ivory-100"
                                title="View on site"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPage(page);
                                }}
                                className="px-2.5 py-1 bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 rounded-sm font-semibold text-xs flex items-center gap-1"
                              >
                                <Edit2 className="w-3 h-3" />
                                <span>Edit Sections</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GLOBAL NAVIGATION */}
        {activeTab === "navigation" && (
          <div className="bg-white border border-line rounded-sm p-6 space-y-6 text-xs">
            <div>
              <h3 className="font-serif font-bold text-sm text-ink-900">
                Global Header & Utility Bar Customisation (FRD Section 12.16)
              </h3>
              <p className="text-ink-500">
                Topics and category tabs are dynamically generated from Taxonomy. Configure primary CTA labels and utility bar quick links below.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-ink-700 font-semibold mb-1">
                  Primary Header Call-to-Action Label
                </label>
                <input
                  type="text"
                  value={headerCtaLabel}
                  onChange={(e) => setHeaderCtaLabel(e.target.value)}
                  className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label className="block text-ink-700 font-semibold mb-1">
                  Primary Header Call-to-Action URL
                </label>
                <input
                  type="text"
                  value={headerCtaUrl}
                  onChange={(e) => setHeaderCtaUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 font-mono focus:outline-none focus:border-green-700"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-line flex justify-end">
              <Button variant="primary">
                <Save className="w-4 h-4 mr-1.5" />
                <span>Save Navigation Links</span>
              </Button>
            </div>
          </div>
        )}

        {/* TAB 3: FOOTER */}
        {activeTab === "footer" && (
          <div className="bg-white border border-line rounded-sm p-6 space-y-6 text-xs">
            <div>
              <h3 className="font-serif font-bold text-sm text-ink-900">
                Footer Mission Statement & Legal Copyright (FRD Section 12.17)
              </h3>
              <p className="text-ink-500">
                Standard editorial mission deck and registered institutional copyright disclaimer.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-ink-700 font-semibold mb-1">
                  Institutional Mission Deck (Shown in footer column 1)
                </label>
                <textarea
                  rows={3}
                  value={footerMission}
                  onChange={(e) => setFooterMission(e.target.value)}
                  className="w-full p-3 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700 text-xs"
                />
              </div>

              <div>
                <label className="block text-ink-700 font-semibold mb-1">
                  Copyright Text Template (Dynamic year tag: &#123;&#123;year&#125;&#125;)
                </label>
                <input
                  type="text"
                  value={footerCopyright}
                  onChange={(e) => setFooterCopyright(e.target.value)}
                  className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 font-mono text-xs focus:outline-none focus:border-green-700"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-line flex justify-end">
              <Button variant="primary">
                <Save className="w-4 h-4 mr-1.5" />
                <span>Save Footer Content</span>
              </Button>
            </div>
          </div>
        )}

        {/* TAB 4: SOCIAL CHANNELS */}
        {activeTab === "social" && (
          <div className="bg-white border border-line rounded-sm p-6 space-y-6 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-sm text-ink-900">
                  Institutional Social Channels & Wire Broadcasts
                </h3>
                <p className="text-ink-500">
                  Verified platforms displayed across utility bar, footer, and "Where We Are" index.
                </p>
              </div>
            </div>

            <div className="border border-line rounded-sm overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-ivory-50 border-b border-line text-[11px] font-bold uppercase tracking-wider text-ink-600">
                    <th className="py-2.5 px-4">Platform</th>
                    <th className="py-2.5 px-4">Official Handle</th>
                    <th className="py-2.5 px-4">Followers</th>
                    <th className="py-2.5 px-4 text-center">Footer</th>
                    <th className="py-2.5 px-4 text-center">Utility Bar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {socialLinks.map((s, idx) => (
                    <tr key={s.platform} className="hover:bg-ivory-50/50">
                      <td className="py-2.5 px-4 font-bold text-ink-900">
                        {s.platform}
                      </td>
                      <td className="py-2.5 px-4 font-mono text-ink-700">
                        {s.handle}
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-ink-800">
                        {s.followers}
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={s.showFooter}
                          onChange={(e) => {
                            const updated = [...socialLinks];
                            updated[idx].showFooter = e.target.checked;
                            setSocialLinks(updated);
                          }}
                          className="rounded-sm border-line text-green-700 focus:ring-green-700"
                        />
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={s.showUtility}
                          onChange={(e) => {
                            const updated = [...socialLinks];
                            updated[idx].showUtility = e.target.checked;
                            setSocialLinks(updated);
                          }}
                          className="rounded-sm border-line text-green-700 focus:ring-green-700"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <Button variant="primary">
                <Save className="w-4 h-4 mr-1.5" />
                <span>Save Social Presences</span>
              </Button>
            </div>
          </div>
        )}

        {/* Page Editor Drawer (Modal 40) */}
        <PageEditorDrawer
          page={selectedPage}
          onClose={() => setSelectedPage(null)}
          onPublished={() => {
            setSelectedPage(null);
            loadData();
          }}
        />
      </div>
    </AdminShell>
  );
}

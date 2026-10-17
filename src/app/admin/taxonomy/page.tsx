"use client";

import React, { useState, useEffect } from "react";
import { AdminShell } from "@/components/layout/admin-shell";
import {
  Tags,
  FolderTree,
  FileSpreadsheet,
  GraduationCap,
  Plus,
  Edit2,
  GitMerge,
  Trash2,
  Check,
  X,
  ChevronRight,
  ChevronDown,
  Eye,
  EyeOff,
  Home,
  Navigation,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getTaxonomies,
  toggleCategoryFlag,
  saveCategory,
  mergeCategories,
  saveTag,
  deleteTag,
} from "@/app/actions/taxonomy-actions";

export default function TaxonomyPage() {
  const [data, setData] = useState<{
    topics: any[];
    reportCategories: any[];
    researchCategories: any[];
    tags: any[];
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "TOPICS" | "REPORT_CATEGORIES" | "RESEARCH_CATEGORIES" | "TAGS"
  >("TOPICS");

  // Drawer & Modal States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [drawerType, setDrawerType] = useState<
    "TOPIC" | "SUBTOPIC" | "REPORT_CATEGORY" | "RESEARCH_CATEGORY"
  >("TOPIC");
  const [parentTopicId, setParentTopicId] = useState<string | undefined>();

  // Drawer Form fields
  const [formName, setFormName] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formHeroImage, setFormHeroImage] = useState("");
  const [formShowInNav, setFormShowInNav] = useState(true);
  const [formShowQuickAccess, setFormShowQuickAccess] = useState(false);
  const [formShowHomeDesk, setFormShowHomeDesk] = useState(false);

  // Merge modal state
  const [mergeModalOpen, setMergeModalOpen] = useState(false);
  const [mergeSource, setMergeSource] = useState<any | null>(null);
  const [mergeTargetId, setMergeTargetId] = useState("");

  // Tag modal
  const [tagModalOpen, setTagModalOpen] = useState(false);
  const [tagName, setTagName] = useState("");
  const [editingTagId, setEditingTagId] = useState<string | undefined>();

  // Expanded tree nodes
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({
    defence: true,
    geopolitics: true,
    "national-affairs": true,
    history: true,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getTaxonomies();
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleExpand = (slug: string) => {
    setExpandedTopics((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const openCreateDrawer = (
    type: "TOPIC" | "SUBTOPIC" | "REPORT_CATEGORY" | "RESEARCH_CATEGORY",
    parentId?: string
  ) => {
    setEditingCategory(null);
    setDrawerType(type);
    setParentTopicId(parentId);
    setFormName("");
    setFormSlug("");
    setFormDescription("");
    setFormHeroImage("");
    setFormShowInNav(true);
    setFormShowQuickAccess(false);
    setFormShowHomeDesk(false);
    setIsDrawerOpen(true);
  };

  const openEditDrawer = (category: any) => {
    setEditingCategory(category);
    setDrawerType(category.type);
    setParentTopicId(category.parentId || undefined);
    setFormName(category.name);
    setFormSlug(category.slug);
    setFormDescription(category.description || "");
    setFormHeroImage(category.heroImageUrl || "");
    setFormShowInNav(category.showInNav);
    setFormShowQuickAccess(category.showOnHomeQuickAccess);
    setFormShowHomeDesk(category.showAsHomeDesk);
    setIsDrawerOpen(true);
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    try {
      await saveCategory({
        id: editingCategory?.id,
        type: drawerType,
        parentId: parentTopicId,
        name: formName,
        slug: formSlug || undefined,
        description: formDescription,
        heroImageUrl: formHeroImage || undefined,
        showInNav: formShowInNav,
        showOnHomeQuickAccess: formShowQuickAccess,
        showAsHomeDesk: formShowHomeDesk,
      });
      setIsDrawerOpen(false);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to save category.");
    }
  };

  const handleToggleFlag = async (
    id: string,
    flag: "active" | "showInNav" | "showOnHomeQuickAccess" | "showAsHomeDesk",
    currentVal: boolean
  ) => {
    try {
      await toggleCategoryFlag(id, flag, !currentVal);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to update flag.");
    }
  };

  const handleExecuteMerge = async () => {
    if (!mergeSource || !mergeTargetId) return;
    try {
      const res = await mergeCategories(mergeSource.id, mergeTargetId);
      if (!res.success) {
        alert(res.error || "Failed to merge.");
      } else {
        setMergeModalOpen(false);
        loadData();
      }
    } catch (err) {
      console.error(err);
      alert("Error executing merge.");
    }
  };

  const handleSaveTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagName.trim()) return;
    try {
      await saveTag(tagName, editingTagId);
      setTagModalOpen(false);
      setTagName("");
      setEditingTagId(undefined);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to save tag.");
    }
  };

  const handleDeleteTag = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tag?")) return;
    try {
      const res = await deleteTag(id);
      if (!res.success) {
        alert(res.error);
      } else {
        loadData();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete tag.");
    }
  };

  return (
    <AdminShell title="Taxonomy & Editorial Desks">
      <div className="space-y-6 font-sans">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded-chip">
                Section 12.11 • FR-TAX-01/02/03
              </span>
              <h1 className="text-xl font-serif font-bold text-ink-900">
                Taxonomy Desks & Content Classification
              </h1>
            </div>
            <p className="text-xs text-ink-500 mt-1">
              Dynamic hierarchical taxonomy. Modifications automatically propagate to main navigation, forms, filters, and footer (FR-NAV-01).
            </p>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === "TOPICS" && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => openCreateDrawer("TOPIC")}
                className="flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>New Topic</span>
              </Button>
            )}

            {activeTab === "REPORT_CATEGORIES" && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => openCreateDrawer("REPORT_CATEGORY")}
                className="flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>New Report Category</span>
              </Button>
            )}

            {activeTab === "RESEARCH_CATEGORIES" && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => openCreateDrawer("RESEARCH_CATEGORY")}
                className="flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>New Research Category</span>
              </Button>
            )}

            {activeTab === "TAGS" && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setEditingTagId(undefined);
                  setTagName("");
                  setTagModalOpen(true);
                }}
                className="flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Create Tag</span>
              </Button>
            )}
          </div>
        </div>

        {/* 4 Sibling Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-line pb-px overflow-x-auto text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("TOPICS")}
            className={`px-4 py-2 font-medium border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "TOPICS"
                ? "border-green-700 text-green-800 font-bold bg-white"
                : "border-transparent text-ink-500 hover:text-ink-800"
            }`}
          >
            <FolderTree className="w-3.5 h-3.5" />
            <span>Topics & Subtopics</span>
            {data?.topics && (
              <span className="text-[10px] px-1.5 py-0.2 bg-ivory-200 text-ink-600 rounded-chip">
                {data.topics.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("REPORT_CATEGORIES")}
            className={`px-4 py-2 font-medium border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "REPORT_CATEGORIES"
                ? "border-green-700 text-green-800 font-bold bg-white"
                : "border-transparent text-ink-500 hover:text-ink-800"
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Report Categories</span>
            {data?.reportCategories && (
              <span className="text-[10px] px-1.5 py-0.2 bg-ivory-200 text-ink-600 rounded-chip">
                {data.reportCategories.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("RESEARCH_CATEGORIES")}
            className={`px-4 py-2 font-medium border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "RESEARCH_CATEGORIES"
                ? "border-green-700 text-green-800 font-bold bg-white"
                : "border-transparent text-ink-500 hover:text-ink-800"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Research Categories</span>
            {data?.researchCategories && (
              <span className="text-[10px] px-1.5 py-0.2 bg-ivory-200 text-ink-600 rounded-chip">
                {data.researchCategories.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("TAGS")}
            className={`px-4 py-2 font-medium border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "TAGS"
                ? "border-green-700 text-green-800 font-bold bg-white"
                : "border-transparent text-ink-500 hover:text-ink-800"
            }`}
          >
            <Tags className="w-3.5 h-3.5" />
            <span>Tags & Keywords</span>
            {data?.tags && (
              <span className="text-[10px] px-1.5 py-0.2 bg-ivory-200 text-ink-600 rounded-chip">
                {data.tags.length}
              </span>
            )}
          </button>
        </div>

        {/* Tab 1: Topics & Subtopics Tree View */}
        {activeTab === "TOPICS" && (
          <div className="bg-white border border-line rounded-sm overflow-hidden shadow-2xs">
            {loading ? (
              <div className="p-12 text-center text-xs text-ink-400">
                Loading hierarchical topic tree...
              </div>
            ) : (
              <div className="divide-y divide-line">
                {data?.topics.map((t) => {
                  const isExpanded = !!expandedTopics[t.slug];
                  const subCount = t.children?.length || 0;

                  return (
                    <div key={t.id} className="space-y-0">
                      {/* Topic Row */}
                      <div className="p-4 bg-white hover:bg-ivory-50 flex items-center justify-between gap-4 transition-colors">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <button
                            type="button"
                            onClick={() => toggleExpand(t.slug)}
                            className="p-1 hover:bg-ivory-200 rounded-xs text-ink-500"
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </button>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-serif font-bold text-sm text-ink-900">
                                {t.name}
                              </span>
                              <span className="font-mono text-[11px] text-ink-400">
                                /{t.slug}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.2 bg-ivory-200 text-ink-600 rounded-chip">
                                {subCount} subtopics
                              </span>
                            </div>
                            <p className="text-xs text-ink-500 line-clamp-1 mt-0.5">
                              {t.description}
                            </p>
                          </div>
                        </div>

                        {/* Feature Flags */}
                        <div className="flex items-center gap-3 text-xs shrink-0">
                          <button
                            type="button"
                            title="Toggle Show in Main Navigation"
                            onClick={() =>
                              handleToggleFlag(t.id, "showInNav", t.showInNav)
                            }
                            className={`p-1.5 rounded-xs flex items-center gap-1 font-semibold ${
                              t.showInNav
                                ? "text-green-800 bg-green-50"
                                : "text-ink-300 hover:text-ink-600"
                            }`}
                          >
                            <Navigation className="w-3.5 h-3.5" />
                            <span className="text-[10px]">Nav</span>
                          </button>

                          <button
                            type="button"
                            title="Toggle Show on Home Quick Access Strip"
                            onClick={() =>
                              handleToggleFlag(
                                t.id,
                                "showOnHomeQuickAccess",
                                t.showOnHomeQuickAccess
                              )
                            }
                            className={`p-1.5 rounded-xs flex items-center gap-1 font-semibold ${
                              t.showOnHomeQuickAccess
                                ? "text-green-800 bg-green-50"
                                : "text-ink-300 hover:text-ink-600"
                            }`}
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span className="text-[10px]">Quick Access</span>
                          </button>

                          <button
                            type="button"
                            title="Toggle Show as Dedicated Home Desk"
                            onClick={() =>
                              handleToggleFlag(
                                t.id,
                                "showAsHomeDesk",
                                t.showAsHomeDesk
                              )
                            }
                            className={`p-1.5 rounded-xs flex items-center gap-1 font-semibold ${
                              t.showAsHomeDesk
                                ? "text-green-800 bg-green-50"
                                : "text-ink-300 hover:text-ink-600"
                            }`}
                          >
                            <Home className="w-3.5 h-3.5" />
                            <span className="text-[10px]">Home Desk</span>
                          </button>

                          <button
                            type="button"
                            title="Toggle Active Status (FR-TAX-02)"
                            onClick={() =>
                              handleToggleFlag(t.id, "active", t.active)
                            }
                            className={`px-2 py-0.5 rounded-chip text-[10px] font-bold uppercase ${
                              t.active
                                ? "bg-green-100 text-green-800"
                                : "bg-ink-100 text-ink-500"
                            }`}
                          >
                            {t.active ? "Active" : "Inactive"}
                          </button>

                          <div className="flex items-center gap-1 border-l border-line pl-2">
                            <button
                              type="button"
                              onClick={() => openCreateDrawer("SUBTOPIC", t.id)}
                              title="Add child subtopic"
                              className="p-1.5 text-ink-600 hover:text-green-800 hover:bg-ivory-200 rounded-xs"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => openEditDrawer(t)}
                              title="Edit Topic"
                              className="p-1.5 text-ink-600 hover:text-ink-900 hover:bg-ivory-200 rounded-xs"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setMergeSource(t);
                                setMergeTargetId("");
                                setMergeModalOpen(true);
                              }}
                              title="Merge Topic (FR-TAX-01)"
                              className="p-1.5 text-ink-400 hover:text-warning-800 hover:bg-warning-50 rounded-xs"
                            >
                              <GitMerge className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Nested Subtopics Repeater */}
                      {isExpanded && t.children && t.children.length > 0 && (
                        <div className="bg-ivory-50/70 border-t border-line/60 divide-y divide-line/40 pl-10 pr-4 py-1">
                          {t.children.map((sub: any) => (
                            <div
                              key={sub.id}
                              className="py-2.5 flex items-center justify-between gap-4 text-xs"
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-ink-400" />
                                <span className="font-semibold text-ink-900">
                                  {sub.name}
                                </span>
                                <span className="font-mono text-[10px] text-ink-400">
                                  /{sub.slug}
                                </span>
                                <span className="text-[11px] text-ink-500 ml-2">
                                  {sub.description}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleToggleFlag(
                                      sub.id,
                                      "active",
                                      sub.active
                                    )
                                  }
                                  className={`px-2 py-0.2 rounded-chip text-[9px] font-bold uppercase ${
                                    sub.active
                                      ? "bg-green-100 text-green-800"
                                      : "bg-ink-100 text-ink-500"
                                  }`}
                                >
                                  {sub.active ? "Active" : "Inactive"}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => openEditDrawer(sub)}
                                  className="p-1 text-ink-500 hover:text-ink-900 rounded-xs"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Report Categories */}
        {activeTab === "REPORT_CATEGORIES" && (
          <div className="bg-white border border-line rounded-sm overflow-hidden shadow-2xs">
            <div className="p-4 bg-ivory-50 border-b border-line text-xs font-semibold text-ink-700">
              Report Categories (Special Reports, Monographs & Strategic Reviews)
            </div>
            <div className="divide-y divide-line text-xs">
              {data?.reportCategories.map((rc) => (
                <div
                  key={rc.id}
                  className="p-4 flex items-center justify-between gap-4 hover:bg-ivory-50"
                >
                  <div>
                    <div className="font-serif font-bold text-sm text-ink-900">
                      {rc.name}
                    </div>
                    <div className="font-mono text-[11px] text-ink-400">
                      /{rc.slug}
                    </div>
                    <p className="text-ink-600 mt-0.5">{rc.description}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        handleToggleFlag(rc.id, "active", rc.active)
                      }
                      className={`px-2 py-0.5 rounded-chip text-[10px] font-bold uppercase ${
                        rc.active
                          ? "bg-green-100 text-green-800"
                          : "bg-ink-100 text-ink-500"
                      }`}
                    >
                      {rc.active ? "Active" : "Inactive"}
                    </button>

                    <button
                      type="button"
                      onClick={() => openEditDrawer(rc)}
                      className="p-1.5 text-ink-600 hover:text-ink-900 rounded-xs"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Research Categories */}
        {activeTab === "RESEARCH_CATEGORIES" && (
          <div className="bg-white border border-line rounded-sm overflow-hidden shadow-2xs">
            <div className="p-4 bg-ivory-50 border-b border-line text-xs font-semibold text-ink-700">
              Research Categories (Double-Blind Peer-Reviewed Archive)
            </div>
            <div className="divide-y divide-line text-xs">
              {data?.researchCategories.map((rsc) => (
                <div
                  key={rsc.id}
                  className="p-4 flex items-center justify-between gap-4 hover:bg-ivory-50"
                >
                  <div>
                    <div className="font-serif font-bold text-sm text-ink-900">
                      {rsc.name}
                    </div>
                    <div className="font-mono text-[11px] text-ink-400">
                      /{rsc.slug}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        handleToggleFlag(rsc.id, "active", rsc.active)
                      }
                      className={`px-2 py-0.5 rounded-chip text-[10px] font-bold uppercase ${
                        rsc.active
                          ? "bg-green-100 text-green-800"
                          : "bg-ink-100 text-ink-500"
                      }`}
                    >
                      {rsc.active ? "Active" : "Inactive"}
                    </button>

                    <button
                      type="button"
                      onClick={() => openEditDrawer(rsc)}
                      className="p-1.5 text-ink-600 hover:text-ink-900 rounded-xs"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Tags Table */}
        {activeTab === "TAGS" && (
          <div className="bg-white border border-line rounded-sm overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-ivory-50 border-b border-line text-[11px] font-bold uppercase tracking-wider text-ink-600">
                  <th className="py-3 px-4">Tag Name</th>
                  <th className="py-3 px-4">Slug</th>
                  <th className="py-3 px-4 text-center">Usage Count</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {data?.tags.map((tag) => (
                  <tr key={tag.id} className="hover:bg-ivory-50/70">
                    <td className="py-3 px-4 font-semibold text-ink-900">
                      {tag.name}
                    </td>
                    <td className="py-3 px-4 font-mono text-ink-500">
                      /{tag.slug}
                    </td>
                    <td className="py-3 px-4 text-center font-mono">
                      {tag._count?.content || 0}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingTagId(tag.id);
                            setTagName(tag.name);
                            setTagModalOpen(true);
                          }}
                          className="p-1 text-ink-500 hover:text-ink-900 rounded-xs"
                          title="Rename tag"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteTag(tag.id)}
                          className="p-1 text-ink-400 hover:text-red-700 rounded-xs"
                          title="Delete tag"
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

        {/* Create / Edit Drawer (Modal 33) */}
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
            <div className="bg-white w-full max-w-md h-full flex flex-col justify-between p-6 shadow-2xl animate-fade-in">
              <div className="space-y-4 overflow-y-auto">
                <div className="flex items-center justify-between border-b border-line pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-green-700">
                      Modal 33 • Drawer
                    </span>
                    <h3 className="font-serif font-bold text-base text-ink-900">
                      {editingCategory ? "Edit" : "Create"} {drawerType}
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-1 text-ink-400 hover:text-ink-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form id="categoryForm" onSubmit={handleSaveCategory} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-ink-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Strategic Deterrence"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-3 py-2 border border-line rounded-sm focus:border-green-700 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-ink-700 mb-1">
                      Slug
                    </label>
                    <input
                      type="text"
                      placeholder="Auto-generated if blank"
                      value={formSlug}
                      onChange={(e) => setFormSlug(e.target.value)}
                      className="w-full px-3 py-2 border border-line rounded-sm focus:border-green-700 focus:outline-hidden font-mono"
                    />
                    <p className="text-[10px] text-ink-400 mt-0.5">
                      Changing a published slug automatically creates a 301 redirect.
                    </p>
                  </div>

                  <div>
                    <label className="block font-semibold text-ink-700 mb-1">
                      Base Description (Hero standfirst)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Editorial mission and thematic focus of this desk..."
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      className="w-full px-3 py-2 border border-line rounded-sm focus:border-green-700 focus:outline-hidden resize-none"
                    />
                  </div>

                  {drawerType === "TOPIC" && (
                    <div className="space-y-2 pt-2 border-t border-line">
                      <label className="block font-semibold text-ink-700">
                        Feature Visibility Flags
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formShowInNav}
                          onChange={(e) => setFormShowInNav(e.target.checked)}
                          className="rounded-xs text-green-700 focus:ring-green-700"
                        />
                        <span>Show in primary header mega navigation</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formShowQuickAccess}
                          onChange={(e) =>
                            setFormShowQuickAccess(e.target.checked)
                          }
                          className="rounded-xs text-green-700 focus:ring-green-700"
                        />
                        <span>Show on Home quick access strip</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formShowHomeDesk}
                          onChange={(e) => setFormShowHomeDesk(e.target.checked)}
                          className="rounded-xs text-green-700 focus:ring-green-700"
                        />
                        <span>Show as dedicated Home page desk section</span>
                      </label>
                    </div>
                  )}
                </form>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-line">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  form="categoryForm"
                  variant="primary"
                  size="sm"
                >
                  Save Category
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Merge Modal (Modal 33 Variant) */}
        {mergeModalOpen && mergeSource && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="bg-white border border-line rounded-sm p-6 max-w-md w-full space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <h3 className="font-serif font-bold text-base text-ink-900">
                  Merge Topic: {mergeSource.name}
                </h3>
                <button onClick={() => setMergeModalOpen(false)}>✕</button>
              </div>

              <div className="p-3 bg-warning-50 border border-warning-200 text-warning-900 rounded-sm text-xs space-y-1">
                <strong>Rule FR-TAX-01:</strong> Topics with content cannot be deleted. Merging migrates all published articles, reports, and research to the destination topic, sets the source to inactive, and issues 301 redirects.
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">
                  Destination Topic
                </label>
                <select
                  value={mergeTargetId}
                  onChange={(e) => setMergeTargetId(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-line rounded-sm bg-white focus:border-green-700 focus:outline-hidden"
                >
                  <option value="">Select destination...</option>
                  {data?.topics
                    .filter((t) => t.id !== mergeSource.id)
                    .map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} (/{t.slug})
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-line">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMergeModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleExecuteMerge}
                  disabled={!mergeTargetId}
                >
                  Execute Merge (FR-TAX-01)
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Tag Create/Edit Modal */}
        {tagModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="bg-white border border-line rounded-sm p-5 max-w-sm w-full space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-line pb-2">
                <h3 className="font-serif font-bold text-sm text-ink-900">
                  {editingTagId ? "Rename Tag" : "Create Tag"}
                </h3>
                <button onClick={() => setTagModalOpen(false)}>✕</button>
              </div>

              <form onSubmit={handleSaveTag} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-ink-700 mb-1">
                    Tag Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hypersonic Glide Vehicles"
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                    className="w-full px-3 py-2 border border-line rounded-sm focus:border-green-700 focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setTagModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    Save Tag
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}

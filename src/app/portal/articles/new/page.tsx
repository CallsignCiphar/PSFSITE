"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Save,
  Send,
  Eye,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  MapPin,
  Tag,
  ShieldCheck,
  Search,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ArticleEditorPage() {
  // Main Editorial Content
  const [title, setTitle] = useState("");
  const [standfirst, setStandfirst] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [keyTakeaways, setKeyTakeaways] = useState<string[]>([""]);
  const [sources, setSources] = useState<Array<{ text: string; url: string }>>([{ text: "", url: "" }]);

  // Classification & Metadata
  const [label, setLabel] = useState("ANALYSIS");
  const [topic, setTopic] = useState("Defence");
  const [subtopic, setSubtopic] = useState("Air");
  const [tags, setTags] = useState<string[]>(["Air Defence", "Radar"]);
  const [tagInput, setTagInput] = useState("");

  // Location Cascade
  const [region, setRegion] = useState("South Asia");
  const [country, setCountry] = useState("Pakistan");
  const [city, setCity] = useState("Rawalpindi");

  // Images & Credits
  const [coverCaption, setCoverCaption] = useState("");
  const [coverCredit, setCoverCredit] = useState("Photo: ISPR");
  const [altText, setAltText] = useState("");

  // SEO & Declarations
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");
  const [originalWork, setOriginalWork] = useState(false);
  const [noCoi, setNoCoi] = useState(true);
  const [agreedToContributorAgreement, setAgreedToContributorAgreement] = useState(false);

  // Status & Modal states
  const [autosaveText, setAutosaveText] = useState("Saved 14:32 PKT");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Collapsible panels
  const [classificationOpen, setClassificationOpen] = useState(true);
  const [locationOpen, setLocationOpen] = useState(true);
  const [imagesOpen, setImagesOpen] = useState(true);
  const [seoOpen, setSeoOpen] = useState(false);
  const [declarationsOpen, setDeclarationsOpen] = useState(true);

  const handleAddTakeaway = () => {
    if (keyTakeaways.length < 5) setKeyTakeaways([...keyTakeaways, ""]);
  };

  const handleTakeawayChange = (index: number, val: string) => {
    const next = [...keyTakeaways];
    next[index] = val;
    setKeyTakeaways(next);
  };

  const handleRemoveTakeaway = (index: number) => {
    setKeyTakeaways(keyTakeaways.filter((_, i) => i !== index));
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim()) && tags.length < 10) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (t: string) => {
    setTags(tags.filter((item) => item !== t));
  };

  const handleSubmitForReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalWork || !agreedToContributorAgreement) {
      alert("Please accept all mandatory contributor declarations.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-ivory-50 flex flex-col font-sans">
      {/* ========================================================
          STICKY TOP BAR
          ======================================================== */}
      <header className="h-16 bg-white border-b border-line px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            href="/portal/articles"
            className="flex items-center gap-1.5 text-xs font-sans text-ink-500 hover:text-ink-900"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to My Articles
          </Link>
          <span className="text-line">|</span>
          <span className="text-xs font-mono text-ink-400">{autosaveText}</span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setPreviewOpen(true)}
            className="gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </Button>

          <Button type="button" variant="secondary" size="sm" className="gap-1.5">
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </Button>

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={handleSubmitForReview}
            className="gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit for Review</span>
          </Button>
        </div>
      </header>

      {/* ========================================================
          MAIN WORKSPACE (760px Main + 360px Sidebar)
          ======================================================== */}
      <div className="max-w-[1280px] w-full mx-auto px-6 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Editing Column (Cols 1-8) */}
        <div className="lg:col-span-8 bg-white border border-line rounded-card p-8 shadow-level1 space-y-6">
          {/* Article Title */}
          <div>
            <label className="block text-xs font-sans font-semibold text-ink-500 uppercase tracking-wider mb-1">
              Headline Title (10 to 120 Characters)
            </label>
            <textarea
              rows={2}
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter comprehensive analytical headline..."
              className="w-full font-serif font-bold text-2xl md:text-3xl text-ink-900 border-b border-line pb-2 focus:border-green-700 focus:outline-none resize-none leading-snug placeholder:text-ink-400"
            />
          </div>

          {/* Standfirst */}
          <div>
            <label className="block text-xs font-sans font-semibold text-ink-500 uppercase tracking-wider mb-1">
              Standfirst / Subtitle (40 to 220 Characters)
            </label>
            <textarea
              rows={2}
              required
              value={standfirst}
              onChange={(e) => setStandfirst(e.target.value)}
              placeholder="Provide a concise 2-sentence analytical summary..."
              className="w-full font-serif text-base text-ink-700 border border-line rounded-input p-3 focus:border-green-700 focus:outline-none resize-none leading-relaxed placeholder:text-ink-400"
            />
          </div>

          {/* Editor Toolbar */}
          <div className="border border-line rounded-card overflow-hidden">
            <div className="bg-ivory-100 border-b border-line px-3 py-2 flex flex-wrap items-center gap-1 text-xs font-sans text-ink-700">
              <span className="font-semibold px-2 py-1 rounded hover:bg-white cursor-pointer">¶ Paragraph</span>
              <span className="font-semibold px-2 py-1 rounded hover:bg-white cursor-pointer font-serif">H2</span>
              <span className="font-semibold px-2 py-1 rounded hover:bg-white cursor-pointer font-serif">H3</span>
              <span className="h-4 w-[1px] bg-line mx-1" />
              <button type="button" className="font-bold px-2 py-1 rounded hover:bg-white">B</button>
              <button type="button" className="italic px-2 py-1 rounded hover:bg-white">I</button>
              <button type="button" className="underline px-2 py-1 rounded hover:bg-white">U</button>
              <span className="h-4 w-[1px] bg-line mx-1" />
              <span className="px-2 py-1 rounded hover:bg-white cursor-pointer">• Bullet list</span>
              <span className="px-2 py-1 rounded hover:bg-white cursor-pointer">1. Numbered</span>
              <span className="px-2 py-1 rounded hover:bg-white cursor-pointer">&ldquo; Quote</span>
              <span className="px-2 py-1 rounded hover:bg-white cursor-pointer">Callout</span>
              <span className="h-4 w-[1px] bg-line mx-1" />
              <span className="px-2 py-1 rounded hover:bg-white cursor-pointer flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5" /> Image
              </span>
            </div>

            {/* Rich Text Body Area */}
            <textarea
              rows={16}
              required
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              placeholder="Commence analytical prose (min 400 words for editorial submission)..."
              className="w-full p-5 font-serif text-base text-ink-900 leading-[1.65] focus:outline-none resize-y placeholder:text-ink-400"
            />

            <div className="bg-ivory-50 border-t border-line px-4 py-2 flex items-center justify-between text-xs font-sans text-ink-500">
              <span>{bodyText.trim() ? bodyText.trim().split(/\s+/).length : 0} Words</span>
              <span>Est. Read Time: ~{Math.max(1, Math.ceil((bodyText.trim().split(/\s+/).length || 1) / 200))} mins</span>
            </div>
          </div>

          {/* Key Takeaways Box (Repeatable) */}
          <div className="p-5 bg-ivory-50 border border-line rounded-card space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-sm text-ink-900">Key Takeaways Box</h4>
                <p className="text-xs font-sans text-ink-500">Renders as a prominent executive summary box at the head of the article.</p>
              </div>
              {keyTakeaways.length < 5 && (
                <button
                  type="button"
                  onClick={handleAddTakeaway}
                  className="text-xs font-sans text-green-700 font-semibold hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Bullet
                </button>
              )}
            </div>

            {keyTakeaways.map((takeaway, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-green-700">0{idx + 1}.</span>
                <input
                  type="text"
                  value={takeaway}
                  onChange={(e) => handleTakeawayChange(idx, e.target.value)}
                  placeholder="Concise strategic takeaway..."
                  className="flex-1 h-9 px-3 text-xs font-sans border border-line rounded-input focus:border-green-700 focus:outline-none bg-white"
                />
                {keyTakeaways.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveTakeaway(idx)}
                    className="text-ink-400 hover:text-danger-700 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            SETTINGS SIDEBAR (Cols 9-12 / 360px)
            ======================================================== */}
        <div className="lg:col-span-4 space-y-4">
          {/* Panel 1: Classification */}
          <div className="bg-white border border-line rounded-card overflow-hidden shadow-sm">
            <button
              type="button"
              onClick={() => setClassificationOpen(!classificationOpen)}
              className="w-full p-4 flex items-center justify-between font-serif font-bold text-sm text-ink-900 bg-ivory-50 border-b border-line"
            >
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-green-700" />
                <span>Classification & Topic</span>
              </div>
              {classificationOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {classificationOpen && (
              <div className="p-4 space-y-3 text-xs font-sans">
                <div>
                  <label className="block font-medium text-ink-900 mb-1">Content Label</label>
                  <select
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    className="w-full h-9 px-2 border border-line rounded-input bg-white focus:border-green-700 focus:outline-none"
                  >
                    <option value="ANALYSIS">Analysis</option>
                    <option value="EXPLAINER">Explainer</option>
                    <option value="OPINION">Opinion</option>
                    <option value="INVESTIGATION">Investigation</option>
                    <option value="PROFILE">Profile</option>
                    <option value="BOOK_REVIEW">Book Review</option>
                    <option value="NEWS_ANALYSIS">News Analysis</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-medium text-ink-900 mb-1">Topic</label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full h-9 px-2 border border-line rounded-input bg-white focus:border-green-700 focus:outline-none"
                    >
                      <option value="Defence">Defence</option>
                      <option value="Geopolitics">Geopolitics</option>
                      <option value="National Affairs">National Affairs</option>
                      <option value="History">History</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-ink-900 mb-1">Subtopic</label>
                    <select
                      value={subtopic}
                      onChange={(e) => setSubtopic(e.target.value)}
                      className="w-full h-9 px-2 border border-line rounded-input bg-white focus:border-green-700 focus:outline-none"
                    >
                      <option value="Air">Air</option>
                      <option value="Land">Land</option>
                      <option value="Sea">Sea</option>
                      <option value="Strategic Systems">Strategic Systems</option>
                      <option value="Cyber">Cyber</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-ink-900 mb-1">Tags (Enter to add, max 10)</label>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Type and press Enter..."
                    className="w-full h-9 px-2 border border-line rounded-input bg-white focus:border-green-700 focus:outline-none mb-2"
                  />
                  <div className="flex flex-wrap gap-1">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-chip text-[11px] bg-ivory-100 text-ink-700 border border-line"
                      >
                        {t}
                        <button type="button" onClick={() => handleRemoveTag(t)}>
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Panel 2: Location (Drives Global Watch) */}
          <div className="bg-white border border-line rounded-card overflow-hidden shadow-sm">
            <button
              type="button"
              onClick={() => setLocationOpen(!locationOpen)}
              className="w-full p-4 flex items-center justify-between font-serif font-bold text-sm text-ink-900 bg-ivory-50 border-b border-line"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-700" />
                <span>Geographic Location</span>
              </div>
              {locationOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {locationOpen && (
              <div className="p-4 space-y-3 text-xs font-sans">
                <div>
                  <label className="block font-medium text-ink-900 mb-1">Analytical Region</label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full h-9 px-2 border border-line rounded-input bg-white focus:border-green-700 focus:outline-none"
                  >
                    <option value="South Asia">South Asia</option>
                    <option value="Middle East">Middle East</option>
                    <option value="Central Asia">Central Asia</option>
                    <option value="East Asia">East Asia</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-medium text-ink-900 mb-1">Country</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full h-9 px-2 border border-line rounded-input bg-white focus:border-green-700 focus:outline-none"
                    >
                      <option value="Pakistan">Pakistan</option>
                      <option value="Afghanistan">Afghanistan</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Turkey">Turkey</option>
                      <option value="China">China</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-ink-900 mb-1">Primary City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Rawalpindi"
                      className="w-full h-9 px-2 border border-line rounded-input bg-white focus:border-green-700 focus:outline-none"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-ink-500 italic">
                  Plots this dispatch onto the 3D Global Watch coverage map upon publication.
                </p>
              </div>
            )}
          </div>

          {/* Panel 3: Imagery & Credits */}
          <div className="bg-white border border-line rounded-card overflow-hidden shadow-sm">
            <button
              type="button"
              onClick={() => setImagesOpen(!imagesOpen)}
              className="w-full p-4 flex items-center justify-between font-serif font-bold text-sm text-ink-900 bg-ivory-50 border-b border-line"
            >
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-green-700" />
                <span>Featured Images & Scrim</span>
              </div>
              {imagesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {imagesOpen && (
              <div className="p-4 space-y-3 text-xs font-sans">
                <div>
                  <label className="block font-medium text-ink-900 mb-1">
                    Cover Image (1920×1080 px, 16:9, Max 8MB)
                  </label>
                  <div className="border-2 border-dashed border-line rounded-card p-4 text-center hover:border-green-700 cursor-pointer bg-ivory-50">
                    <ImageIcon className="w-6 h-6 text-ink-400 mx-auto mb-1" />
                    <span className="text-ink-700 font-medium">Upload Hero Cover Photo</span>
                    <span className="block text-[10px] text-ink-400 mt-0.5">JPG, PNG, WebP</span>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-ink-900 mb-1">Image Credit</label>
                  <input
                    type="text"
                    value={coverCredit}
                    onChange={(e) => setCoverCredit(e.target.value)}
                    placeholder="e.g. Photo: ISPR"
                    className="w-full h-9 px-2 border border-line rounded-input bg-white focus:border-green-700 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-ink-900 mb-1">Alt Text (Accessibility Required)</label>
                  <input
                    type="text"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    placeholder="Describe image content for screen readers..."
                    className="w-full h-9 px-2 border border-line rounded-input bg-white focus:border-green-700 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Panel 4: Declarations & Agreement */}
          <div className="bg-white border border-line rounded-card overflow-hidden shadow-sm">
            <button
              type="button"
              onClick={() => setDeclarationsOpen(!declarationsOpen)}
              className="w-full p-4 flex items-center justify-between font-serif font-bold text-sm text-ink-900 bg-ivory-50 border-b border-line"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-700" />
                <span>Mandatory Declarations</span>
              </div>
              {declarationsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {declarationsOpen && (
              <div className="p-4 space-y-3 text-xs font-sans">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={originalWork}
                    onChange={(e) => setOriginalWork(e.target.checked)}
                    className="mt-0.5 text-green-700 rounded-sm"
                  />
                  <span className="text-ink-700 leading-snug">
                    This is my original, unclassified analysis and has not been published elsewhere.
                  </span>
                </label>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={noCoi}
                    onChange={(e) => setNoCoi(e.target.checked)}
                    className="mt-0.5 text-green-700 rounded-sm"
                  />
                  <span className="text-ink-700 leading-snug">
                    I declare no commercial or institutional conflict of interest regarding this subject.
                  </span>
                </label>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToContributorAgreement}
                    onChange={(e) => setAgreedToContributorAgreement(e.target.checked)}
                    className="mt-0.5 text-green-700 rounded-sm"
                  />
                  <span className="text-ink-700 leading-snug">
                    I reaffirm agreement to the{" "}
                    <Link href="/contributor-agreement" target="_blank" className="text-green-700 underline">
                      Contributor Agreement
                    </Link>
                    .
                  </span>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================
          FULL-SCREEN PREVIEW MODAL (UI SPEC SECTION 8 #11)
          ======================================================== */}
      {previewOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex flex-col justify-between overflow-y-auto">
          <div className="h-14 bg-white border-b border-line px-6 flex items-center justify-between sticky top-0 z-10">
            <span className="font-serif font-bold text-sm text-ink-900">
              Live Article Preview Mode
            </span>
            <div className="flex items-center gap-3">
              <Button variant="secondary" size="sm" onClick={() => setPreviewOpen(false)}>
                Back to Editing
              </Button>
              <Button variant="primary" size="sm" onClick={handleSubmitForReview}>
                Confirm & Submit
              </Button>
            </div>
          </div>

          <div className="max-w-[720px] mx-auto w-full bg-white p-10 my-8 border border-line rounded-card shadow-level2 space-y-6">
            <div>
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-green-700">
                {label} · {topic} / {subtopic}
              </span>
              <h1 className="font-serif font-bold text-3xl md:text-4xl text-ink-900 mt-2 mb-3 leading-tight">
                {title || "Untitled Strategic Article"}
              </h1>
              <p className="font-serif text-lg text-ink-700 italic leading-relaxed">
                {standfirst || "Article standfirst and summary will appear here."}
              </p>
            </div>

            <div className="pt-4 border-t border-line text-xs font-sans text-ink-500 flex items-center justify-between">
              <span>By Dr. Tariq Mahmud · Pakistan Strategic Forum</span>
              <span>October 2026</span>
            </div>

            {keyTakeaways.filter(Boolean).length > 0 && (
              <div className="p-4 bg-ivory-100 border border-line rounded-card">
                <span className="font-serif font-bold text-xs uppercase tracking-wider text-ink-900 block mb-2">
                  Key Strategic Takeaways
                </span>
                <ul className="list-disc list-inside space-y-1 text-xs font-serif text-ink-700">
                  {keyTakeaways.filter(Boolean).map((k, i) => (
                    <li key={i}>{k}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="font-serif text-base text-ink-900 leading-[1.65] space-y-4 whitespace-pre-wrap">
              {bodyText || "Main editorial body text goes here..."}
            </div>
          </div>

          <div />
        </div>
      )}

      {/* ========================================================
          SUBMISSION SUCCESS MODAL
          ======================================================== */}
      {submitted && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white border border-line rounded-card p-8 shadow-level3 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 stroke-[2]" />
            </div>

            <h3 className="font-serif font-bold text-2xl text-ink-900">
              Article Submitted for Review!
            </h3>

            <p className="font-serif text-sm text-ink-700 leading-relaxed">
              Your piece <span className="font-semibold text-ink-900">&ldquo;{title}&rdquo;</span> has been locked and assigned reference ID <span className="font-mono text-green-700 font-bold">ART-2026-00481</span>.
            </p>

            <div className="p-4 bg-ivory-50 border border-line rounded-card text-left text-xs font-sans text-ink-500 space-y-1">
              <p className="font-semibold text-ink-900">Next Editorial Steps:</p>
              <p>1. Editorial screening for evidence and sourcing compliance (2–3 days).</p>
              <p>2. You will receive an automated notification once scheduled or if revisions are requested.</p>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <Link href="/portal/articles">
                <Button variant="primary" size="default">
                  Return to My Articles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { X, Copy, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  authors: string[];
  year: string;
  doi?: string;
  reportNumber?: string;
  url: string;
  isReport?: boolean;
}

export function CitationModal({
  isOpen,
  onClose,
  title,
  authors,
  year,
  doi,
  reportNumber,
  url,
  isReport = false,
}: CitationModalProps) {
  const [activeFormat, setActiveFormat] = useState<"APA" | "CHICAGO" | "HARVARD" | "BIBTEX" | "RIS">("APA");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const authorText = authors.length > 0 ? authors.join(", ") : "Pakistan Strategic Forum";

  const getCitationText = () => {
    switch (activeFormat) {
      case "APA":
        return isReport
          ? `${authorText} (${year}). ${title} (Report No. ${reportNumber || "PSF-R-2026-004"}). Pakistan Strategic Forum. ${url}`
          : `${authorText} (${year}). ${title}. PSF Research${doi ? `, https://doi.org/${doi}` : ""}.`;
      case "CHICAGO":
        return isReport
          ? `${authorText}. ${year}. "${title}." Report No. ${reportNumber || "PSF-R-2026-004"}. Islamabad: Pakistan Strategic Forum. ${url}.`
          : `${authorText}. ${year}. "${title}." PSF Research.${doi ? ` https://doi.org/${doi}.` : ""}`;
      case "HARVARD":
        return isReport
          ? `${authorText}, ${year}. ${title}. Report No. ${reportNumber || "PSF-R-2026-004"}. Islamabad: Pakistan Strategic Forum. Available at: <${url}>.`
          : `${authorText}, ${year}. '${title}', PSF Research.${doi ? ` Available at: <https://doi.org/${doi}>.` : ""}`;
      case "BIBTEX":
        return isReport
          ? `@techreport{psf_${year}_${reportNumber?.replace(/-/g, "_") || "report"},\n  author = {${authorText}},\n  title = {${title}},\n  institution = {Pakistan Strategic Forum},\n  year = {${year}},\n  number = {${reportNumber || "PSF-R-2026-004"}},\n  url = {${url}}\n}`
          : `@article{psf_${year}_research,\n  author = {${authorText}},\n  title = {${title}},\n  journal = {PSF Research},\n  year = {${year}},\n  doi = {${doi || ""}},\n  url = {${url}}\n}`;
      case "RIS":
        return isReport
          ? `TY  - RPRT\nTI  - ${title}\nAU  - ${authors[0] || "Pakistan Strategic Forum"}\nPY  - ${year}\nPB  - Pakistan Strategic Forum\nIS  - ${reportNumber || "PSF-R-2026-004"}\nUR  - ${url}\nER  -`
          : `TY  - JOUR\nTI  - ${title}\nAU  - ${authors[0] || "Pakistan Strategic Forum"}\nPY  - ${year}\nT2  - PSF Research\nDO  - ${doi || ""}\nUR  - ${url}\nER  -`;
    }
  };

  const currentCitation = getCitationText();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCitation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = activeFormat === "BIBTEX" ? "bib" : "ris";
    const blob = new Blob([currentCitation], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `citation.${ext}`;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[560px] bg-white border border-line rounded-card shadow-level3 p-6 space-y-5">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-line">
          <div>
            <h3 className="font-serif font-bold text-lg text-ink-900">Cite this {isReport ? "Report" : "Paper"}</h3>
            <p className="font-serif text-xs text-ink-500">
              Select standard academic or bibliographic format.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-ink-400 hover:text-ink-700"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector Tabs */}
        <div className="flex border-b border-line gap-2 text-xs font-sans font-medium">
          {(["APA", "CHICAGO", "HARVARD", "BIBTEX", "RIS"] as const).map((fmt) => (
            <button
              key={fmt}
              type="button"
              onClick={() => setActiveFormat(fmt)}
              className={`pb-2 px-2 border-b-2 transition-colors ${
                activeFormat === fmt
                  ? "border-green-700 text-green-700 font-semibold"
                  : "border-transparent text-ink-500 hover:text-ink-900"
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>

        {/* Formatted Citation Block */}
        <div className="p-4 bg-ivory-50 border border-line rounded-card">
          <pre className="font-serif text-xs text-ink-900 whitespace-pre-wrap leading-relaxed select-all">
            {currentCitation}
          </pre>
        </div>

        {/* Actions Footer */}
        <div className="flex items-center justify-between pt-2">
          {activeFormat === "BIBTEX" || activeFormat === "RIS" ? (
            <Button variant="secondary" size="sm" onClick={handleDownload} className="gap-1.5 text-xs">
              <Download className="w-3.5 h-3.5" />
              <span>Download .{activeFormat === "BIBTEX" ? "bib" : "ris"}</span>
            </Button>
          ) : (
            <span className="text-[11px] font-sans text-ink-400">
              Formatted according to latest manual guidelines.
            </span>
          )}

          <Button variant="primary" size="sm" onClick={handleCopy} className="gap-1.5 text-xs">
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Citation</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

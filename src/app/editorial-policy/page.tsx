import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Editorial Policy | Pakistan Strategic Forum",
  description: "Standards and guidelines governing publishing, independence, sourcing, and peer review at Pakistan Strategic Forum.",
};

const policyClauses = [
  { id: "purpose", num: "1", title: "Purpose & Scope", text: "This policy sets out the editorial standards Pakistan Strategic Forum (PSF) applies to every published article, report, paper, and newsroom briefing." },
  { id: "independence", num: "2", title: "Editorial Independence", text: "PSF editors make all editorial decisions without external direction. No advertiser, corporate sponsor, governmental body, or private donor may approve, alter, or suppress editorial content. Any sponsored or partner material is distinctly labelled." },
  { id: "sourcing", num: "3", title: "Accuracy & Sourcing", text: "We verify facts prior to publication. Information is explicitly attributed to primary sources wherever accessible. Anonymous sources are used solely when verified by a senior editor as having direct first-hand credibility, and the necessity for anonymity is explained to the reader." },
  { id: "labelling", num: "4", title: "Content Labelling", text: "Every item carries a conspicuous format label: News, Analysis, Explainer, Opinion, Interview, Investigation, Profile, Book Review, Report, Research Paper, or Policy Brief. Opinion pieces reflect the views of the author, not the institutional position of PSF." },
  { id: "fairness", num: "5", title: "Right of Reply", text: "Where institutions or individuals are the subject of substantial allegations, reasonable opportunity to respond is extended prior to publication." },
  { id: "security", num: "6", title: "Sensitive Security Information", text: "We do not publish classified materials or operational intelligence that would endanger human lives, identify protected personnel, or compromise ongoing active military operations." },
  { id: "territory", num: "7", title: "Nomenclature & Disputed Territory", text: "We adhere to standardized cartographic descriptions. Disputed regions are explicitly annotated as disputed, in alignment with relevant United Nations Security Council resolutions." },
  { id: "contributors", num: "8", title: "Contributor Responsibilities", text: "All authors agree to the Contributor Agreement. Contributors must disclose any financial, professional, or institutional conflict of interest relevant to their topic." },
  { id: "peer-review", num: "9", title: "Double-Blind Peer Review", text: "Research manuscripts published in PSF Research undergo mandatory double-blind peer review by two certified reviewers followed by an editorial screening decision." },
  { id: "corrections", num: "10", title: "Corrections & Transparency", text: "Significant factual errors are corrected promptly, transparently noted at the head and foot of the piece, and logged in the public Corrections Log." },
  { id: "ai-disclosure", num: "11", title: "Use of Artificial Intelligence", text: "Authors must disclose substantial use of AI generation tools in research or drafting. AI-generated text or fabricated imagery presented as authentic original reporting is strictly prohibited." },
  { id: "archive", num: "12", title: "Archive Integrity", text: "Content originally published between 2019 and 2024 is preserved with original dates under an 'Archive' designation. PSF does not silently alter historical articles." },
  { id: "contact", num: "13", title: "Editorial Queries", text: "Inquiries regarding this policy may be directed to the editorial board via editor@forumstrategic.com." },
];

export default function EditorialPolicyPage() {
  return (
    <div className="w-full bg-paper py-10 font-sans">
      <div className="max-w-container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Content (Cols 1-8 / 720px max measure) */}
          <article className="lg:col-span-8 flex flex-col">
            <div className="pb-6 border-b border-line mb-8">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-green-700 block mb-1">
                Institutional Standards
              </span>
              <h1 className="font-serif font-bold text-3xl sm:text-4xl text-ink-900 mb-2">
                Editorial Policy & Standards
              </h1>
              <p className="font-serif text-xs text-ink-500">
                Last updated: 16 October 2026 · Reviewed by PSF Editorial Board
              </p>
            </div>

            <div className="space-y-8 font-serif text-[18px] leading-[1.65] text-ink-900 max-w-[720px]">
              {policyClauses.map((clause) => (
                <section key={clause.id} id={clause.id} className="scroll-mt-24 pt-4 border-t border-line first:border-t-0 first:pt-0">
                  <h3 className="font-serif font-bold text-xl text-ink-900 mb-2">
                    {clause.num}. {clause.title}
                  </h3>
                  <p className="text-ink-700 leading-relaxed text-base">
                    {clause.text}
                  </p>
                </section>
              ))}
            </div>

            <div className="mt-12 pt-6 border-t border-line text-xs font-sans text-ink-500 flex items-center justify-between">
              <span>Related: <Link href="/corrections" className="text-green-700 underline">Corrections Policy</Link> · <Link href="/contributor-agreement" className="text-green-700 underline">Contributor Agreement</Link></span>
              <Link href="/contact" className="text-green-700 font-semibold hover:underline">Contact Editorial Team →</Link>
            </div>
          </article>

          {/* Sticky Table of Contents (Cols 9-12) */}
          <aside className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-white border border-line rounded-card p-6 shadow-level1">
              <h4 className="font-serif font-bold text-sm text-ink-900 pb-2 border-b border-line mb-3">
                Policy Clauses
              </h4>
              <nav className="space-y-1.5 text-xs font-sans">
                {policyClauses.map((c) => (
                  <a
                    key={c.id}
                    href={`#${c.id}`}
                    className="block text-ink-700 hover:text-green-700 truncate py-0.5"
                  >
                    {c.num}. {c.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

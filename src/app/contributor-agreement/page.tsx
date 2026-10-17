import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Contributor Agreement | Pakistan Strategic Forum",
  description: "Terms and conditions governing manuscript submission, authorship ethics, and non-exclusive publishing rights at Pakistan Strategic Forum.",
};

const agreementClauses = [
  {
    num: "1",
    title: "Originality of Work & Plagiarism Prohibition",
    text: "The Contributor warrants that any manuscript, research dataset, figure, or commentary submitted to Pakistan Strategic Forum ('PSF') is their original intellectual work and has not been plagiarised in whole or in part from other publications. Text or concepts from external sources must be properly cited using standard academic conventions.",
  },
  {
    num: "2",
    title: "Non-Exclusive Publishing License",
    text: "The Contributor grants PSF a non-exclusive, worldwide, perpetual, royalty-free license to publish, index, distribute, and archive the accepted manuscript across all PSF digital and print platforms. The Contributor retains copyright in their original text and may include the work in academic dissertations or institutional portfolios with citation of original publication in PSF.",
  },
  {
    num: "3",
    title: "Editorial Copyediting & Formatting",
    text: "PSF reserves the right to copyedit accepted manuscripts for house style, typographical clarity, British English spelling conventions, headline optimization, and layout design. Substantive factual alterations will not be made without author consultation.",
  },
  {
    num: "4",
    title: "Disclosure of Conflicts of Interest",
    text: "Contributors must disclose any active or recent (past 3 years) financial, governmental, commercial, or institutional affiliations that could reasonably be perceived as influencing the objectivity or independence of the published analysis.",
  },
  {
    num: "5",
    title: "Use of Generative Artificial Intelligence",
    text: "The substantial use of generative AI tools in the drafting or analytical synthesis of submissions must be declared upon submission. Submitting AI-generated hallucinations as authentic empirical research or primary reporting is grounds for permanent accreditation revocation.",
  },
];

export default function ContributorAgreementPage() {
  return (
    <div className="w-full bg-paper py-12 font-sans">
      <div className="max-w-container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <article className="lg:col-span-8 flex flex-col">
            <div className="pb-6 border-b border-line mb-8">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-green-700 block mb-1">
                Author & Contributor Terms
              </span>
              <h1 className="font-serif font-bold text-3xl sm:text-4xl text-ink-900 mb-2">
                Contributor & Publishing Agreement
              </h1>
              <p className="font-serif text-xs text-ink-500">
                Governing All Accepted Manuscripts · Version 2.0 · PSF Editorial Directorate
              </p>
            </div>

            <div className="space-y-8 font-serif text-[18px] leading-[1.65] text-ink-900 max-w-[720px]">
              {agreementClauses.map((clause) => (
                <section key={clause.num} className="pt-4 border-t border-line first:border-t-0 first:pt-0">
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
              <span>Ready to submit? <Link href="/join" className="text-green-700 underline font-semibold">Join the Contributor Network</Link></span>
              <Link href="/editorial-policy" className="text-green-700 font-semibold hover:underline">Read Editorial Policy →</Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

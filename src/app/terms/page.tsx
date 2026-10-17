import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Pakistan Strategic Forum",
  description: "Terms and conditions governing the access, citation, and intellectual property of Pakistan Strategic Forum publications.",
};

const termsSections = [
  {
    num: "1",
    title: "Acceptance of Terms",
    text: "By accessing or using Pakistan Strategic Forum ('PSF', 'forumstrategic.com'), you agree to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.",
  },
  {
    num: "2",
    title: "Intellectual Property & Academic Citation",
    text: "All analyses, research monographs, peer-reviewed journal papers, graphics, cartographic data, and newsroom wire dispatches published by PSF are the proprietary intellectual property of Pakistan Strategic Forum or its contributing authors. You may cite short excerpts (up to 250 words) provided direct attribution is given with a hyperlink to the original PSF permalink.",
  },
  {
    num: "3",
    title: "Prohibition on Wholesale Scraping & AI Model Ingestion",
    text: "Wholesale automated scraping, bulk data harvesting, or unauthorised commercial ingestion of PSF content for artificial intelligence training sets without explicit written institutional licensing is strictly prohibited.",
  },
  {
    num: "4",
    title: "Contributor & Peer Review Warranties",
    text: "Authors publishing through PSF warrant that all submitted manuscripts represent original intellectual work, free of plagiarism, unauthorized third-party copyright claims, or fabricated research data. Reviewers agree to strict confidentiality.",
  },
  {
    num: "5",
    title: "Governing Law & Jurisdiction",
    text: "These terms and conditions are governed by and construed in accordance with the laws of the Islamic Republic of Pakistan, and you irrevocably submit to the exclusive jurisdiction of the competent courts in Islamabad.",
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="w-full bg-paper py-12 font-sans">
      <div className="max-w-container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <article className="lg:col-span-8 flex flex-col">
            <div className="pb-6 border-b border-line mb-8">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-green-700 block mb-1">
                Legal & Governance
              </span>
              <h1 className="font-serif font-bold text-3xl sm:text-4xl text-ink-900 mb-2">
                Terms of Service
              </h1>
              <p className="font-serif text-xs text-ink-500">
                Last updated: 1 October 2026 · Registered Think Tank & Strategic Research Collective
              </p>
            </div>

            <div className="space-y-8 font-serif text-[18px] leading-[1.65] text-ink-900 max-w-[720px]">
              {termsSections.map((sec) => (
                <section key={sec.num} className="pt-4 border-t border-line first:border-t-0 first:pt-0">
                  <h3 className="font-serif font-bold text-xl text-ink-900 mb-2">
                    {sec.num}. {sec.title}
                  </h3>
                  <p className="text-ink-700 leading-relaxed text-base">
                    {sec.text}
                  </p>
                </section>
              ))}
            </div>

            <div className="mt-12 pt-6 border-t border-line text-xs font-sans text-ink-500 flex items-center justify-between">
              <span>Related: <Link href="/privacy" className="text-green-700 underline">Privacy Policy</Link> · <Link href="/disclaimer" className="text-green-700 underline">Territorial Disclaimer</Link></span>
              <Link href="/contact" className="text-green-700 font-semibold hover:underline">Contact Legal Directorate →</Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

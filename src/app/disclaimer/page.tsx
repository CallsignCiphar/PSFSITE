import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Territorial & Cartographic Disclaimer | Pakistan Strategic Forum",
  description: "Official statement regarding cartographic borders, United Nations resolutions, and strategic analysis disclaimers.",
};

const disclaimerClauses = [
  {
    num: "1",
    title: "Official Cartographic Representation",
    text: "All maps, regional geographic visualisations, and boundary demarcations published by Pakistan Strategic Forum strictly adhere to the official political map issued by the Survey of Pakistan and relevant United Nations Security Council resolutions.",
  },
  {
    num: "2",
    title: "Status of Jammu & Kashmir and Disputed Regions",
    text: "The State of Jammu and Kashmir is recognised as an internationally disputed territory whose final status remains to be decided in accordance with the relevant resolutions of the United Nations Security Council. Dotted lines and boundary annotations denote disputed borders and Line of Control (LoC) alignments.",
  },
  {
    num: "3",
    title: "Nature of Strategic Analysis",
    text: "Articles, technical aerospace breakdowns, monographs, and Global Watch threat assessments published on this platform represent the independent analytical assessments of the respective authors and PSF research fellows. They do not constitute official operational directives or pronouncements of the Armed Forces of Pakistan or the Government of Pakistan.",
  },
  {
    num: "4",
    title: "No Classified or Protected Materials",
    text: "Pakistan Strategic Forum operates entirely within open-source intelligence (OSINT) and declassified academic methodology. We do not solicit, accept, or publish classified state secrets, restricted operational manuals, or materials whose dissemination compromises active national security.",
  },
];

export default function DisclaimerPage() {
  return (
    <div className="w-full bg-paper py-12 font-sans">
      <div className="max-w-container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <article className="lg:col-span-8 flex flex-col">
            <div className="pb-6 border-b border-line mb-8">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-green-700 block mb-1">
                Cartographic & Legal Standards
              </span>
              <h1 className="font-serif font-bold text-3xl sm:text-4xl text-ink-900 mb-2">
                Territorial & Operational Disclaimer
              </h1>
              <p className="font-serif text-xs text-ink-500">
                Official Cartographic Guidelines · Survey of Pakistan Alignment · PSF Editorial Board
              </p>
            </div>

            <div className="space-y-8 font-serif text-[18px] leading-[1.65] text-ink-900 max-w-[720px]">
              {disclaimerClauses.map((clause) => (
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
              <span>Related: <Link href="/editorial-policy" className="text-green-700 underline">Editorial Policy</Link> · <Link href="/terms" className="text-green-700 underline">Terms of Service</Link></span>
              <Link href="/contact" className="text-green-700 font-semibold hover:underline">Contact Cartography Desk →</Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

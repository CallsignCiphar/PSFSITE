import React from "react";
import Link from "next/link";
import { Clock, MapPin, Share2, ExternalLink, ArrowLeft } from "lucide-react";
import { ContentLabel } from "@/components/ui/content-label";
import { Button } from "@/components/ui/button";

export default async function NewsroomPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="w-full bg-paper py-10 font-sans">
      <div className="max-w-[800px] mx-auto px-6">
        {/* Back link */}
        <Link
          href="/newsroom"
          className="inline-flex items-center gap-1.5 text-xs font-sans text-ink-500 hover:text-green-700 mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Newsroom Wire
        </Link>

        {/* Dispatch Card */}
        <article className="border border-line rounded-card p-8 bg-white shadow-level1 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-line text-xs font-sans text-ink-500">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-ink-900">14:45 PKT</span>
              <span>·</span>
              <span className="text-green-700 font-medium">Islamabad, Pakistan</span>
              <span>·</span>
              <span className="text-ink-400">Defence</span>
            </div>

            <span className="px-2 py-0.5 bg-danger-700 text-white rounded-chip font-bold uppercase text-[10px]">
              Breaking Alert
            </span>
          </div>

          <h1 className="font-serif font-bold text-2xl md:text-3xl text-ink-900 leading-snug">
            Joint Staff Headquarters concludes high-level bilateral defence dialogue with Turkish delegation
          </h1>

          <div className="font-serif text-base text-ink-900 leading-relaxed space-y-4">
            <p>
              RAWALPINDI — The Chairman Joint Chiefs of Staff Committee held an extensive bilateral strategic session today with a visiting senior delegation from the Turkish Ministry of National Defence at the Joint Staff Headquarters.
            </p>
            <p>
              According to an official communique from the Inter-Services Public Relations (ISPR), the deliberations encompassed joint production of fifth-generation aerospace subsystems, kinetic precision strike integration, and enhanced maritime surveillance cooperation in the Arabian Sea.
            </p>
            <p>
              Both sides reiterated their enduring commitment to institutionalizing military-to-military interoperability, establishing specialized technical committees to oversee ongoing co-development programs.
            </p>
          </div>

          <div className="pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-ink-500">
            <div className="flex items-center gap-2">
              <span>Source:</span>
              <a
                href="https://ispr.gov.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 font-medium hover:underline flex items-center gap-1"
              >
                <span>ISPR Official Directorate</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex items-center gap-2">
              <span>Share dispatch:</span>
              <button
                type="button"
                className="p-1.5 border border-line rounded-sm hover:border-green-700 hover:text-green-700"
                title="Share on X"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </article>

        {/* More from Newsroom */}
        <section className="mt-12 pt-8 border-t border-line space-y-4">
          <h3 className="font-serif font-bold text-lg text-ink-900">
            More from the Newsroom Wire
          </h3>
          <div className="space-y-3">
            {[
              {
                title: "Regional counter-terrorism coordination council issues joint protocol on border surveillance",
                city: "Dushanbe, Tajikistan",
                time: "13:20 PKT",
              },
              {
                title: "Naval drills 'Sea Guardians IV' commence in northern Arabian Sea",
                city: "Riyadh, Saudi Arabia",
                time: "11:10 PKT",
              },
              {
                title: "Pakistan Navy commissions fourth Babur-class corvette at Karachi Shipyard",
                city: "Karachi, Pakistan",
                time: "Yesterday",
              },
            ].map((item, idx) => (
              <div key={idx} className="p-4 border border-line rounded-card hover:border-green-700 bg-ivory-50/50">
                <div className="text-[11px] font-sans text-ink-500 mb-1">
                  <span className="font-mono text-ink-700 font-semibold">{item.time}</span> ·{" "}
                  <span className="text-green-700 font-medium">{item.city}</span>
                </div>
                <h5 className="font-serif font-bold text-sm text-ink-900 hover:text-green-700">
                  <Link href="/newsroom">{item.title}</Link>
                </h5>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

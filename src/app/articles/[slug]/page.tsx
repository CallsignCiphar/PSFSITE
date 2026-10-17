import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  MapPin,
  Share2,
  Bookmark,
  AlertCircle,
  ChevronRight,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import { ContentLabel } from "@/components/ui/content-label";
import { TagChip } from "@/components/ui/tag-chip";
import { StandardCard, ContentItemProps } from "@/components/ui/card";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return {
    title: "Modernising the Shield: Pakistan's Integrated Air Defence Architecture | PSF Analysis",
    description:
      "An exhaustive technical assessment of the HQ-9/P, HQ-16FE, and indigenous radar acquisitions transforming multi-tier airspace denial along the eastern border.",
    openGraph: {
      type: "article",
      title: "Modernising the Shield: Pakistan's Integrated Air Defence Architecture",
      description: "An exhaustive technical assessment of multi-tier airspace denial.",
      siteName: "Pakistan Strategic Forum",
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Sample related articles
  const relatedArticles: ContentItemProps[] = [
    {
      id: "rel-1",
      slug: "operation-swift-retort-revisited",
      title: "Operation Swift Retort Revisited: Aerial Tactics and Sensor Fusion Lessons",
      label: "ANALYSIS",
      topic: "Defence",
      author: { name: "Air Commodore (Retd) Kaiser Tufail" },
      publishedAt: "14 Oct 2026",
      readMinutes: 8,
      imageUrl: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "rel-2",
      slug: "jf-17-block-3-aesa-pl15-integration",
      title: "JF-17 Block III AESA Radar and PL-15 Missile Integration: Flight Test Results",
      label: "NEWS_ANALYSIS",
      topic: "Defence",
      author: { name: "Dr. Tariq Mahmud" },
      publishedAt: "10 Oct 2026",
      readMinutes: 6,
      imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "rel-3",
      slug: "radar-cross-section-reduction-tactics",
      title: "Passive Sensor Arrays and Ground-Based Intercept Radars Against Low-Observability Threats",
      label: "EXPLAINER",
      topic: "Defence",
      author: { name: "Hamza Shafqat" },
      publishedAt: "05 Oct 2026",
      readMinutes: 7,
      imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="w-full bg-paper py-8">
      {/* ========================================================
          STICKY VERTICAL SHARE RAIL (DESKTOP >= 1280px)
          ======================================================== */}
      <aside className="hidden xl:flex fixed left-8 top-44 flex-col gap-3 z-30 select-none">
        <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-ink-400 text-center">
          Share
        </span>
        <button
          type="button"
          className="w-10 h-10 rounded-full bg-white border border-line shadow-sm hover:border-green-700 hover:text-green-700 flex items-center justify-center transition-colors"
          title="Share on X"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>
        <button
          type="button"
          className="w-10 h-10 rounded-full bg-white border border-line shadow-sm hover:border-green-700 hover:text-green-700 flex items-center justify-center transition-colors"
          title="Share on LinkedIn"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.76-1.75 1.76m1.39 9.74v-8.37H5.07v8.37h2.78z" />
          </svg>
        </button>
        <button
          type="button"
          className="w-10 h-10 rounded-full bg-white border border-line shadow-sm hover:border-green-700 hover:text-green-700 flex items-center justify-center transition-colors"
          title="Copy Link"
        >
          <Share2 className="w-4 h-4 stroke-[1.75]" />
        </button>
      </aside>

      <div className="max-w-container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Article Column (Cols 1-8 / max 720px measure) */}
          <article className="lg:col-span-8 flex flex-col">
            {/* Breadcrumb */}
            <nav className="text-xs font-sans text-ink-500 mb-4 flex items-center gap-1.5" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-green-700">Home</Link>
              <span>/</span>
              <Link href="/topics/defence" className="hover:text-green-700">Defence</Link>
              <span>/</span>
              <Link href="/topics/defence/air" className="text-ink-700 font-medium">Air</Link>
            </nav>

            {/* Header: Label + Title + Standfirst */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <ContentLabel type="ANALYSIS" />
                <span className="text-line text-xs">·</span>
                <Link href="/topics/defence" className="text-xs font-sans font-semibold text-ink-700 hover:underline">
                  Defence / Air
                </Link>
              </div>

              <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl leading-[1.12] text-ink-900 tracking-tight mb-4">
                Modernising the Shield: Evaluating Pakistan&apos;s Integrated Air Defence Architecture
              </h1>

              <p className="font-serif text-xl md:text-2xl text-ink-700 leading-snug italic mb-6">
                An exhaustive technical assessment of the HQ-9/P, HQ-16FE, and indigenous radar acquisitions transforming multi-tier airspace denial along the eastern border.
              </p>

              {/* Byline Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-line text-xs font-sans text-ink-500">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 font-bold flex items-center justify-center font-serif text-sm border border-green-200">
                    TM
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Link href="/authors/tariq-mahmud" className="font-semibold text-ink-900 hover:underline">
                        Dr. Tariq Mahmud
                      </Link>
                      <span className="px-1.5 py-0.2 bg-green-100 text-green-700 rounded-chip text-[10px] font-bold">
                        PSF Expert
                      </span>
                    </div>
                    <span className="text-ink-400 text-[11px]">Senior Strategic Fellow</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-ink-400" />
                    <span>9 min read</span>
                  </div>
                  <span>·</span>
                  <span>16 Oct 2026, 14:30 PKT</span>
                  <span>·</span>
                  <Link
                    href="/global-watch?loc=rawalpindi"
                    className="inline-flex items-center gap-1 text-green-700 hover:underline font-medium"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Rawalpindi, Pakistan</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Cover Image */}
            <div className="mb-8">
              <div className="relative w-full aspect-[16/9] rounded-card overflow-hidden bg-ivory-100 border border-line">
                <Image
                  src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1600&q=80"
                  alt="Multi-tier radar and phased array tracking radar"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>
              <div className="flex items-center justify-between text-xs font-sans text-ink-500 mt-2 px-1">
                <span>Integrated radar surveillance dome deployed along tactical sector.</span>
                <span className="italic">Photo: ISPR / CASS</span>
              </div>
            </div>

            {/* Key Takeaways Box */}
            <div className="p-6 bg-ivory-50 border-l-4 border-green-700 rounded-r-card mb-8">
              <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-green-900 mb-3">
                Key Strategic Takeaways
              </h3>
              <ul className="space-y-2 text-sm font-serif text-ink-900 leading-relaxed list-disc list-inside">
                <li>
                  Deployment of the high-altitude HQ-9/P system establishes an area-denial bubble exceeding 125 km against aerial stand-off platforms.
                </li>
                <li>
                  Digitized integration with the TPS-77 MRR radars drastically compresses sensor-to-shooter latencies across the Combined Air Operations Centre (CAOC).
                </li>
                <li>
                  Dense passive radar networks mitigate low-observability airframe infiltration under intense electronic countermeasures (ECM).
                </li>
              </ul>
            </div>

            {/* Long-Form Body (Strict 720px Measure, Source Serif 4, 19px, line-height 1.65) */}
            <div className="font-serif text-[19px] leading-[1.65] text-ink-900 space-y-6 max-w-[720px]">
              <p>
                Over the past half-decade, the doctrine of regional airspace dominance has undergone an irreversible shift from human-vectored patrol interception to integrated automated surface-to-air missile (SAM) networks. In high-density contested operational corridors, survivability and airspace denial hinge entirely on the capability to interlink heterogenous sensors into a real-time, survivable command and control lattice.
              </p>

              <h2 className="font-serif font-bold text-2xl md:text-3xl text-ink-900 pt-4 border-t border-line">
                Layered Area Denial: The High-Medium Altitude Synthesis
              </h2>

              <p>
                The induction of the Chinese-manufactured HQ-9/P surface-to-air missile weapon system represents the crowning tier of Pakistan’s Army Air Defence command. Operating with active radar homing and high-explosive fragmentation warheads, the HQ-9/P is architected to engage fast jets, cruise missiles, and theater-range ballistic projectiles.
              </p>

              {/* Pull Quote Component (28px Serif Italic) */}
              <figure className="my-8 py-6 border-y-2 border-line text-center">
                <blockquote className="font-serif italic text-2xl md:text-3xl text-green-900 leading-snug">
                  &ldquo;Airspace denial is no longer a metric of fighter squadron parity; it is dictated by sensor survivability under saturated jamming environments.&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-xs font-sans uppercase tracking-wider text-ink-500 font-semibold">
                  — Air Commodore (Retd) Kaiser Tufail, PSF Fellow
                </figcaption>
              </figure>

              <p>
                Complementing this strategic envelope is the medium-range HQ-16FE system. Capable of engaging highly agile supersonic cruise missiles flying at sea-skimming altitudes, the HQ-16FE acts as an essential buffer protecting forward airbases, logistics hubs, and nuclear storage sites from preemptive stand-off precision strikes.
              </p>

              <h3 className="font-serif font-bold text-xl text-ink-900 pt-3">
                Indigenous C4ISR Linkages and Radar Integration
              </h3>

              <p>
                Crucially, these battery complexes do not operate as isolated defensive islands. Through indigenous tactical data links developed by the Air Weapons Complex (AWC) and Defence Science & Technology Organization (DESTO), feeds from TPS-77 phased array radars and Erieye AEW&C aircraft are fused into a singular common operational picture (COP).
              </p>
            </div>

            {/* Numbered Sources & References */}
            <div className="mt-12 pt-6 border-t border-line">
              <h4 className="font-serif font-bold text-base text-ink-900 mb-3">Sources & References</h4>
              <ol className="list-decimal list-inside text-xs font-serif text-ink-700 space-y-1.5 leading-relaxed">
                <li>
                  Air Weapons Complex (2025). <em>Tactical Data Link Protocols in Saturated EW Theaters</em>. Rawalpindi.
                </li>
                <li>
                  SIPRI Arms Transfers Database (2026). <em>Surface-to-Air Weapon Inductions in South Asia</em>. Stockholm International Peace Research Institute.
                </li>
                <li>
                  ISPR Communiqué (2024). <em>Commissioning of High-Altitude Air Defence Regiments</em>. Inter-Services Public Relations.
                </li>
              </ol>
            </div>

            {/* Author Box */}
            <div className="mt-10 p-6 bg-ivory-50 border border-line rounded-card flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-green-700 text-white font-serif font-bold text-xl flex items-center justify-center shrink-0">
                TM
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-serif font-bold text-lg text-ink-900">Dr. Tariq Mahmud</h4>
                  <span className="px-1.5 py-0.2 rounded-chip bg-green-100 text-green-700 text-[10px] font-bold">
                    PSF Expert
                  </span>
                </div>
                <p className="text-xs font-sans text-ink-500 mb-2">
                  Senior Strategic Fellow, Centre for Aerospace & Security Studies (CASS)
                </p>
                <p className="font-serif text-xs text-ink-700 leading-relaxed mb-3">
                  Dr. Mahmud specializes in South Asian nuclear deterrence, integrated aerospace defense architectures, and precision stand-off kinetics.
                </p>
                <Link
                  href="/authors/tariq-mahmud"
                  className="text-xs font-sans text-green-700 font-semibold hover:underline flex items-center gap-1"
                >
                  View full profile and publications →
                </Link>
              </div>
            </div>

            {/* Report an Error Link */}
            <div className="mt-6 text-right text-xs font-sans">
              <Link
                href={`/corrections?item=${slug}`}
                className="text-ink-500 hover:text-green-700 underline"
              >
                Report a factual error or request correction on this piece
              </Link>
            </div>
          </article>

          {/* Sticky Right Sidebar (Cols 9-12) */}
          <aside className="lg:col-span-4 space-y-8 sticky top-24">
            {/* Sidebar Ad Slot (300x600) */}
            <div className="w-full bg-ivory-50 border border-line rounded-card p-4 text-center">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-ink-400 block mb-2">
                Advertisement
              </span>
              <div className="w-[300px] h-[350px] mx-auto bg-ivory-100 border border-dashed border-line rounded-sm flex items-center justify-center text-xs font-sans text-ink-400">
                300×600 Half-Page Ad Creative
              </div>
            </div>

            {/* Most Read in Topic */}
            <div className="bg-white border border-line rounded-card p-6 shadow-level1">
              <h3 className="font-serif font-bold text-base text-ink-900 pb-3 border-b border-line mb-4">
                Most Read in Defence
              </h3>
              <div className="space-y-4">
                {relatedArticles.map((art, idx) => (
                  <div key={art.id} className="group">
                    <span className="font-serif font-bold text-lg text-green-700 mr-2">0{idx + 1}</span>
                    <h5 className="font-serif font-semibold text-sm leading-snug text-ink-900 group-hover:text-green-700 transition-colors inline">
                      <Link href={`/articles/${art.slug}`}>{art.title}</Link>
                    </h5>
                    <div className="text-[11px] font-sans text-ink-400 mt-1 pl-6">
                      {art.publishedAt} · {art.readMinutes} min
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Related Coverage Bottom Grid */}
        <section className="mt-16 pt-12 border-t border-line">
          <div className="section-rule flex items-center justify-between pt-2">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.1em] text-ink-900">
              Related Strategic Coverage
            </span>
            <Link href="/topics/defence" className="font-sans text-xs font-medium text-green-700 hover:underline">
              More from Defence Desk →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((item) => (
              <StandardCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

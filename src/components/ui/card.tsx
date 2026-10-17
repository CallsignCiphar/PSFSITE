import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, FileText, Download, ChevronRight } from "lucide-react";
import { ContentLabel, LabelType } from "./content-label";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export interface ContentItemProps {
  id: string;
  slug: string;
  title: string;
  standfirst?: string;
  label: LabelType | string;
  topic?: string;
  subtopic?: string;
  author: {
    name: string;
    avatarUrl?: string;
    designation?: string;
    institution?: string;
    isExpert?: boolean;
  };
  coAuthors?: Array<{ name: string }>;
  publishedAt: string;
  readMinutes?: number;
  imageUrl?: string;
  imageAlt?: string;
  reportNumber?: string;
  pages?: number;
  pdfUrl?: string;
  doi?: string;
  abstract?: string;
  category?: string;
}

// 1. Standard Editorial Card
export function StandardCard({ item, className }: { item: ContentItemProps; className?: string }) {
  return (
    <article className={cn("group flex flex-col bg-white border border-line rounded-card overflow-hidden transition-shadow hover:shadow-level1", className)}>
      {item.imageUrl && (
        <div className="relative w-full aspect-[3/2] overflow-hidden bg-ivory-100">
          <Image
            src={item.imageUrl}
            alt={item.imageAlt || item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ContentLabel type={item.label} />
            {item.topic && (
              <>
                <span className="text-line text-xs">·</span>
                <span className="text-xs font-sans text-ink-500 font-medium">{item.topic}</span>
              </>
            )}
          </div>
          <h4 className="font-serif font-semibold text-lg leading-snug text-ink-900 group-hover:text-green-700 transition-colors line-clamp-3 mb-2">
            <Link href={`/articles/${item.slug}`} className="no-underline">
              {item.title}
            </Link>
          </h4>
          {item.standfirst && (
            <p className="font-serif text-sm text-ink-700 line-clamp-2 mb-4 leading-relaxed">
              {item.standfirst}
            </p>
          )}
        </div>

        {/* Byline */}
        <div className="flex items-center justify-between pt-3 border-t border-line text-xs font-sans text-ink-500">
          <span className="font-medium text-ink-700">{item.author.name}</span>
          <div className="flex items-center gap-2">
            <span>{item.publishedAt}</span>
            {item.readMinutes && (
              <>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-ink-400" />
                  {item.readMinutes}m
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

// 2. Compact Ruled Card (Newspaper Style)
export function CompactRuledCard({ item, className }: { item: ContentItemProps; className?: string }) {
  return (
    <article className={cn("group py-3.5 border-b border-line last:border-b-0", className)}>
      <div className="flex items-center gap-2 mb-1">
        <ContentLabel type={item.label} />
        {item.topic && (
          <>
            <span className="text-line text-xs">·</span>
            <span className="text-xs font-sans text-ink-400">{item.topic}</span>
          </>
        )}
      </div>
      <h5 className="font-serif font-semibold text-base leading-snug text-ink-900 group-hover:text-green-700 transition-colors">
        <Link href={`/articles/${item.slug}`} className="no-underline">
          {item.title}
        </Link>
      </h5>
      <div className="mt-1.5 flex items-center gap-2 text-xs font-sans text-ink-500">
        <span className="font-medium text-ink-700">{item.author.name}</span>
        <span>·</span>
        <span>{item.publishedAt}</span>
      </div>
    </article>
  );
}

// 3. Horizontal Card (Thumbnail Left)
export function HorizontalCard({ item, className }: { item: ContentItemProps; className?: string }) {
  return (
    <article className={cn("group flex gap-4 p-3 bg-white border border-line rounded-card hover:shadow-level1 transition-shadow", className)}>
      {item.imageUrl && (
        <div className="relative w-24 h-24 shrink-0 overflow-hidden bg-ivory-100 rounded-sm">
          <Image
            src={item.imageUrl}
            alt={item.imageAlt || item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="96px"
          />
        </div>
      )}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ContentLabel type={item.label} />
            {item.topic && (
              <>
                <span className="text-line text-xs">·</span>
                <span className="text-xs font-sans text-ink-500">{item.topic}</span>
              </>
            )}
          </div>
          <h5 className="font-serif font-semibold text-sm leading-snug text-ink-900 group-hover:text-green-700 transition-colors line-clamp-2">
            <Link href={`/articles/${item.slug}`} className="no-underline">
              {item.title}
            </Link>
          </h5>
        </div>
        <div className="flex items-center gap-2 text-xs font-sans text-ink-500 pt-1">
          <span className="truncate">{item.author.name}</span>
          <span>·</span>
          <span>{item.publishedAt}</span>
        </div>
      </div>
    </article>
  );
}

// 4. Research Card (Academic & Double-blind verified)
export function ResearchCard({ item, className }: { item: ContentItemProps; className?: string }) {
  return (
    <article className={cn("group flex flex-col justify-between p-6 bg-white border border-line rounded-card hover:border-green-700 transition-colors", className)}>
      <div>
        <div className="flex items-center justify-between mb-3">
          <ContentLabel type="PEER_REVIEWED" />
          {item.category && (
            <span className="text-xs font-sans font-medium text-ink-500 uppercase tracking-wider">
              {item.category}
            </span>
          )}
        </div>
        <h4 className="font-serif font-bold text-lg leading-snug text-ink-900 group-hover:text-green-700 transition-colors mb-2">
          <Link href={`/research/${item.slug}`} className="no-underline">
            {item.title}
          </Link>
        </h4>
        {item.abstract && (
          <p className="font-serif text-sm text-ink-700 line-clamp-3 leading-relaxed mb-4">
            {item.abstract}
          </p>
        )}
      </div>

      <div className="pt-4 border-t border-line text-xs font-sans">
        <div className="font-medium text-ink-900 mb-0.5">
          {item.author.name}
          {item.author.institution && (
            <span className="text-ink-500 font-normal"> ({item.author.institution})</span>
          )}
        </div>
        <div className="flex items-center gap-2 text-ink-500">
          <span>Published {item.publishedAt}</span>
          {item.doi && (
            <>
              <span>·</span>
              <span className="font-mono text-[11px]">DOI: {item.doi}</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

// 5. Report Card (with Executive Summary & PDF apparatus)
export function ReportCard({ item, isFeatured = false, className }: { item: ContentItemProps; isFeatured?: boolean; className?: string }) {
  if (isFeatured) {
    return (
      <article className={cn("group grid grid-cols-1 md:grid-cols-12 gap-8 p-8 bg-ivory-50 border border-line rounded-card", className)}>
        {/* Portrait Cover (Cols 1-4) */}
        <div className="md:col-span-4 relative aspect-[3/4] bg-white border border-line shadow-sm overflow-hidden rounded-sm">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="w-full h-full p-6 flex flex-col justify-between bg-green-900 text-white">
              <div>
                <span className="font-sans text-xs uppercase tracking-widest text-green-200 font-semibold">
                  PSF Special Report
                </span>
                <div className="font-mono text-xs text-white/60 mt-1">{item.reportNumber}</div>
              </div>
              <h3 className="font-serif font-bold text-xl leading-snug">{item.title}</h3>
              <div className="text-xs font-sans text-white/60">{item.publishedAt}</div>
            </div>
          )}
        </div>

        {/* Content & Actions (Cols 5-12) */}
        <div className="md:col-span-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-0.5 bg-green-700 text-white font-sans text-xs font-bold uppercase tracking-wider rounded-chip">
                Featured Report
              </span>
              <span className="font-mono text-xs text-ink-500 font-semibold">{item.reportNumber}</span>
              {item.pages && <span className="text-xs font-sans text-ink-500">· {item.pages} Pages</span>}
            </div>

            <h3 className="font-serif font-bold text-2xl md:text-3xl leading-tight text-ink-900 mb-4 group-hover:text-green-700 transition-colors">
              <Link href={`/reports/${item.slug}`} className="no-underline">
                {item.title}
              </Link>
            </h3>

            {item.standfirst && (
              <p className="font-serif text-base text-ink-700 leading-relaxed mb-6">
                {item.standfirst}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-line">
            <Link href={`/reports/${item.slug}`}>
              <Button variant="primary" size="default">
                Read Executive Summary
              </Button>
            </Link>
            {item.pdfUrl && (
              <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="default" className="gap-2">
                  <Download className="w-4 h-4" />
                  <span>Download Full PDF</span>
                </Button>
              </a>
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={cn("group flex gap-4 p-5 bg-white border border-line rounded-card hover:shadow-level1 transition-shadow", className)}>
      <div className="relative w-20 aspect-[3/4] shrink-0 bg-ivory-100 border border-line rounded-sm overflow-hidden">
        {item.imageUrl ? (
          <Image src={item.imageUrl} alt={item.title} fill className="object-cover" sizes="80px" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-green-900 text-white">
            <FileText className="w-6 h-6 text-green-200" />
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[11px] text-green-700 font-semibold">{item.reportNumber}</span>
            {item.pages && <span className="text-xs text-ink-400">· {item.pages} pp</span>}
          </div>
          <h5 className="font-serif font-semibold text-base leading-snug text-ink-900 group-hover:text-green-700 transition-colors line-clamp-2">
            <Link href={`/reports/${item.slug}`} className="no-underline">
              {item.title}
            </Link>
          </h5>
        </div>
        <div className="flex items-center justify-between text-xs font-sans text-ink-500 pt-2 border-t border-line mt-2">
          <span>{item.publishedAt}</span>
          <span className="text-green-700 font-medium group-hover:underline flex items-center">
            View <ChevronRight className="w-3 h-3 ml-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  PUBLIC_PAGES_SEED,
  MEDIA_ASSETS_SEED,
  PublicPageItem,
  MediaAsset,
} from "@/lib/constants/cms";

// 1. Get CMS Public Pages List
export async function getCmsPages() {
  try {
    const pages = await prisma.cmsPage.findMany({
      include: {
        sections: true,
      },
    });

    if (pages.length === 0) {
      return PUBLIC_PAGES_SEED;
    }

    return pages.map((p) => ({
      key: p.key,
      title: p.title,
      path: `/${p.key === "home" ? "" : p.key}`,
      category: "Core Portal" as const,
      status: p.status as "PUBLISHED" | "DRAFT_PENDING",
      sectionsCount: p.sections.length || 4,
      lastEditedBy: "Administrator",
      updatedAt: p.updatedAt.toISOString(),
    }));
  } catch (err) {
    console.warn("CMS Pages fallback:", err);
    return PUBLIC_PAGES_SEED;
  }
}

// 2. Get Sections for a Page
export async function getPageSections(pageKey: string) {
  // Provide structured section data for the template editor
  return [
    {
      sectionKey: "hero",
      title: "Hero Lead Section",
      fields: [
        { key: "leadHeadline", label: "Hero Headline", type: "text", value: "Pakistan Strategic Forum" },
        { key: "standfirst", label: "Standfirst Deck", type: "textarea", value: "Authoritative defence analysis, aerospace intelligence, and grand strategy." },
        { key: "heroImage", label: "Featured Image", type: "image", value: "/images/mock-jf17.jpg" },
      ],
      hidden: false,
    },
    {
      sectionKey: "missionPillars",
      title: "Mission Pillars",
      fields: [
        { key: "pillar1", label: "Pillar 1 Title", type: "text", value: "Independent Peer Review" },
        { key: "pillar2", label: "Pillar 2 Title", type: "text", value: "Strategic Autonomy" },
        { key: "pillar3", label: "Pillar 3 Title", type: "text", value: "Geopolitical Rigour" },
      ],
      hidden: false,
    },
    {
      sectionKey: "editorialNotice",
      title: "Borders & Territorial Integrity Notice",
      fields: [
        { key: "disclaimerText", label: "Disclaimer Copy", type: "textarea", value: "Cartographic representations adhere to Government of Pakistan official territorial surveys." },
      ],
      hidden: false,
    },
  ];
}

// 3. Publish CMS Page Draft (Modal 40)
export async function publishPageDraft(pageKey: string, sectionsData: any) {
  try {
    await prisma.cmsPage.upsert({
      where: { key: pageKey },
      create: {
        key: pageKey,
        title: pageKey.toUpperCase(),
        status: "PUBLISHED",
      },
      update: {
        status: "PUBLISHED",
      },
    });

    await prisma.activityLog.create({
      data: {
        action: `Published CMS revision for page: ${pageKey}`,
        targetType: "CmsPage",
        targetId: pageKey,
        targetLabel: pageKey,
        result: "SUCCESS",
      },
    });

    revalidatePath(`/admin/cms`);
    revalidatePath(`/${pageKey === "home" ? "" : pageKey}`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// 4. Get Media Assets
export async function getMediaAssets(query?: string) {
  if (!query) return MEDIA_ASSETS_SEED;
  const q = query.toLowerCase();
  return MEDIA_ASSETS_SEED.filter(
    (m) =>
      m.name.toLowerCase().includes(q) ||
      m.altText.toLowerCase().includes(q) ||
      m.credit.toLowerCase().includes(q)
  );
}

// 5. Replace Media Asset (Modal 41)
export async function replaceMediaAsset(assetId: string, newUrl: string, newAltText?: string) {
  const asset = MEDIA_ASSETS_SEED.find((m) => m.id === assetId);
  if (!asset) return { success: false, error: "Asset not found" };

  asset.url = newUrl;
  if (newAltText) asset.altText = newAltText;

  await prisma.activityLog.create({
    data: {
      action: `Replaced media asset: ${asset.name}`,
      targetType: "MediaItem",
      targetId: assetId,
      targetLabel: asset.name,
      result: "SUCCESS",
      metadata: { retainedUrlReferences: asset.usedInPages },
    },
  }).catch(() => {});

  revalidatePath("/admin/cms/media");
  return { success: true };
}

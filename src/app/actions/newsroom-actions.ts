"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Ensure seed newsroom items exist if database is empty
export async function ensureSeedNewsroomPosts() {
  const count = await prisma.contentItem.count({
    where: { type: "NEWS" },
  });
  if (count > 0) return;

  const seedPosts = [
    {
      refId: "NW-2026-0042",
      title: "Pakistan Air Force Commissions Second Operational Squadron of JF-17 Thunder Block III Aircraft",
      slug: "paf-commissions-second-operational-squadron-jf17-block3",
      summary:
        "The Pakistan Air Force has officially inducted its second operational frontline squadron equipped with JF-17 Block III fighters featuring active electronically scanned array radars and long-range air-to-air ordnance integration.",
      sourceName: "Directorate of Public Relations, Air Headquarters",
      sourceUrl: "https://paf.gov.pk/press-releases",
      breaking: true,
      breakingHours: 6,
      pinned: true,
      cardImageUrl:
        "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=800",
      city: "Kamra",
      country: "Pakistan",
      region: "South Asia",
    },
    {
      refId: "NW-2026-0041",
      title: "Regional Security Dialogue Concludes in Islamabad with Joint Communiqué on Border Stability",
      slug: "regional-security-dialogue-islamabad-communique",
      summary:
        "Delegates from Central and South Asian states concluded bilateral consultations focusing on shared intelligence mechanisms, counter-terror coordination, and logistical corridor protections.",
      sourceName: "Ministry of Foreign Affairs, Islamabad",
      sourceUrl: "https://mofa.gov.pk/briefings",
      breaking: false,
      pinned: true,
      cardImageUrl:
        "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=800",
      city: "Islamabad",
      country: "Pakistan",
      region: "South Asia",
    },
    {
      refId: "NW-2026-0040",
      title: "Naval Exercise Sea Spark Demonstrates Enhanced Anti-Submarine Warfare Screening in Arabian Sea",
      slug: "naval-exercise-sea-spark-asw-arabian-sea",
      summary:
        "Pakistan Navy maritime patrol aircraft and guided-missile frigates executed live acoustic tracking and coordinated sub-surface interdiction drills during the ongoing Sea Spark operational maneuvers.",
      sourceName: "Directorate General Public Relations (Navy)",
      sourceUrl: "https://paknavy.gov.pk/releases",
      breaking: false,
      pinned: false,
      cardImageUrl:
        "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800",
      city: "Karachi",
      country: "Pakistan",
      region: "South Asia",
    },
  ];

  for (const post of seedPosts) {
    const breakingUntil = post.breaking
      ? new Date(Date.now() + (post.breakingHours || 6) * 3600 * 1000)
      : null;

    const item = await prisma.contentItem.create({
      data: {
        type: "NEWS",
        refId: post.refId,
        title: post.title,
        slug: post.slug,
        standfirst: post.summary,
        label: "ANALYSIS",
        status: "PUBLISHED",
        cardImageUrl: post.cardImageUrl,
        publishedAt: new Date(),
        readCount: Math.floor(Math.random() * 400) + 120,
      },
    });

    await prisma.newsDetails.create({
      data: {
        contentId: item.id,
        summaryJson: { text: post.summary },
        sourceName: post.sourceName,
        sourceUrl: post.sourceUrl,
        breaking: post.breaking,
        breakingUntil,
        pinned: post.pinned,
      },
    });
  }
}

// 1. Get Newsroom Wire Listing
export async function getNewsroomPosts(filters?: {
  status?: string;
  breaking?: boolean;
  pinned?: boolean;
  query?: string;
}) {
  await ensureSeedNewsroomPosts();

  const where: any = {
    type: "NEWS",
  };

  if (filters?.status && filters.status !== "ALL") {
    where.status = filters.status;
  }

  if (filters?.query) {
    where.OR = [
      { title: { contains: filters.query, mode: "insensitive" } },
      { refId: { contains: filters.query, mode: "insensitive" } },
    ];
  }

  const items = await prisma.contentItem.findMany({
    where,
    include: {
      newsDetails: true,
      topic: true,
      authors: {
        include: {
          user: {
            include: {
              profile: true,
            },
          },
        },
      },
    },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });

  const now = new Date();

  return items.map((item) => {
    const nd = item.newsDetails;
    // Check if breaking has expired (auto-off after 6h)
    const isBreakingActive =
      nd?.breaking && nd.breakingUntil ? nd.breakingUntil > now : nd?.breaking || false;

    return {
      id: item.id,
      refId: item.refId,
      headline: item.title,
      slug: item.slug,
      summary: item.standfirst || "",
      status: item.status,
      topic: item.topic?.name || "General Wire",
      publishedAt: item.publishedAt ? item.publishedAt.toISOString() : null,
      createdAt: item.createdAt.toISOString(),
      cardImageUrl: item.cardImageUrl,
      clicks: item.readCount,
      breaking: isBreakingActive,
      pinned: nd?.pinned || false,
      sourceName: nd?.sourceName || "",
      sourceUrl: nd?.sourceUrl || "",
      expiresAt: nd?.expiresAt ? nd.expiresAt.toISOString() : null,
      authorName:
        item.authors?.[0]?.user?.profile?.displayName || "PSF Wire Desk",
    };
  });
}

// 2. Save or Update Newsroom Post (Modal 31)
export async function saveNewsroomPost(data: {
  id?: string;
  headline: string;
  summary: string;
  topicId?: string;
  sourceName?: string;
  sourceUrl?: string;
  thumbnailUrl?: string;
  breaking?: boolean;
  pinned?: boolean;
  publishAction: "NOW" | "SCHEDULE" | "DRAFT";
  scheduledFor?: string;
  expiresAfter?: string;
}) {
  const headlineClean = data.headline.trim();
  const slug = headlineClean
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const now = new Date();

  // Rule FRD §12.9: Max 3 pinned; pinning a 4th unpins the oldest
  if (data.pinned) {
    const pinnedPosts = await prisma.newsDetails.findMany({
      where: {
        pinned: true,
        ...(data.id ? { contentId: { not: data.id } } : {}),
      },
      orderBy: { content: { publishedAt: "asc" } },
    });

    if (pinnedPosts.length >= 3) {
      // Unpin the oldest pinned post
      const oldest = pinnedPosts[0];
      await prisma.newsDetails.update({
        where: { contentId: oldest.contentId },
        data: { pinned: false },
      });
    }
  }

  // Determine publish state and date
  let status: any = "DRAFT";
  let publishedAt: Date | null = null;
  let scheduledDate: Date | null = null;

  if (data.publishAction === "NOW") {
    status = "PUBLISHED";
    publishedAt = now;
  } else if (data.publishAction === "SCHEDULE") {
    status = "SCHEDULED";
    scheduledDate = data.scheduledFor ? new Date(data.scheduledFor) : now;
  }

  // Breaking duration: 6 hours from publish
  const breakingUntil = data.breaking
    ? new Date(now.getTime() + 6 * 3600 * 1000)
    : null;

  const expiresAt = data.expiresAfter ? new Date(data.expiresAfter) : null;

  let contentItem;

  if (data.id) {
    // Update existing
    contentItem = await prisma.contentItem.update({
      where: { id: data.id },
      data: {
        title: headlineClean,
        slug,
        standfirst: data.summary.trim(),
        topicId: data.topicId || undefined,
        cardImageUrl: data.thumbnailUrl,
        status,
        publishedAt: publishedAt || undefined,
        scheduledFor: scheduledDate,
      },
    });

    await prisma.newsDetails.upsert({
      where: { contentId: contentItem.id },
      update: {
        summaryJson: { text: data.summary.trim() },
        sourceName: data.sourceName,
        sourceUrl: data.sourceUrl,
        breaking: data.breaking || false,
        breakingUntil,
        pinned: data.pinned || false,
        expiresAt,
      },
      create: {
        contentId: contentItem.id,
        summaryJson: { text: data.summary.trim() },
        sourceName: data.sourceName,
        sourceUrl: data.sourceUrl,
        breaking: data.breaking || false,
        breakingUntil,
        pinned: data.pinned || false,
        expiresAt,
      },
    });
  } else {
    // Generate next refId (NW-YYYY-NNNN)
    const year = now.getFullYear();
    const count = await prisma.contentItem.count({
      where: { type: "NEWS", refId: { startsWith: `NW-${year}-` } },
    });
    const refId = `NW-${year}-${String(count + 1).padStart(4, "0")}`;

    contentItem = await prisma.contentItem.create({
      data: {
        type: "NEWS",
        refId,
        title: headlineClean,
        slug,
        standfirst: data.summary.trim(),
        label: "ANALYSIS",
        status,
        topicId: data.topicId || undefined,
        cardImageUrl: data.thumbnailUrl,
        publishedAt,
        scheduledFor: scheduledDate,
      },
    });

    await prisma.newsDetails.create({
      data: {
        contentId: contentItem.id,
        summaryJson: { text: data.summary.trim() },
        sourceName: data.sourceName,
        sourceUrl: data.sourceUrl,
        breaking: data.breaking || false,
        breakingUntil,
        pinned: data.pinned || false,
        expiresAt,
      },
    });
  }

  await prisma.activityLog.create({
    data: {
      action: `Saved newsroom wire post: ${contentItem.refId}`,
      targetType: "ContentItem",
      targetId: contentItem.id,
      targetLabel: contentItem.title,
      result: "SUCCESS",
    },
  });

  revalidatePath("/admin/newsroom");
  revalidatePath("/newsroom");
  revalidatePath("/");

  return { success: true, post: contentItem };
}

// 3. Quick Toggle Pin Status
export async function togglePinNewsroomPost(contentId: string) {
  const current = await prisma.newsDetails.findUnique({
    where: { contentId },
  });

  if (!current) return { success: false };

  const nextPinned = !current.pinned;

  if (nextPinned) {
    const pinnedPosts = await prisma.newsDetails.findMany({
      where: { pinned: true, contentId: { not: contentId } },
      orderBy: { content: { publishedAt: "asc" } },
    });

    if (pinnedPosts.length >= 3) {
      await prisma.newsDetails.update({
        where: { contentId: pinnedPosts[0].contentId },
        data: { pinned: false },
      });
    }
  }

  await prisma.newsDetails.update({
    where: { contentId },
    data: { pinned: nextPinned },
  });

  revalidatePath("/admin/newsroom");
  revalidatePath("/newsroom");
  return { success: true, pinned: nextPinned };
}

// 4. Delete or Unpublish Post
export async function deleteNewsroomPost(contentId: string) {
  await prisma.contentItem.update({
    where: { id: contentId },
    data: { status: "UNPUBLISHED" },
  });

  revalidatePath("/admin/newsroom");
  revalidatePath("/newsroom");
  return { success: true };
}

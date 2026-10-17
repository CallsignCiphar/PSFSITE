"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Default slots specification according to Section 14.1 of the FRD
const DEFAULT_SLOTS = [
  {
    key: "home_hero_lead",
    page: "Home",
    positions: 1,
    allowedTypes: ["ARTICLE", "REPORT", "RESEARCH"],
    description: "Home hero lead story (cols 1-8)",
  },
  {
    key: "home_top_stories",
    page: "Home",
    positions: 4,
    allowedTypes: ["ARTICLE", "REPORT", "RESEARCH"],
    description: "Home Top Stories grid (positions 1-4)",
  },
  {
    key: "home_latest_featured",
    page: "Home",
    positions: 4,
    allowedTypes: ["ARTICLE", "REPORT", "RESEARCH"],
    description: "Home Latest Coverage pinned items",
  },
  {
    key: "topic_home_featured",
    page: "Home",
    positions: 1,
    allowedTypes: ["ARTICLE", "REPORT", "RESEARCH"],
    description: "Home desk for primary Topic",
  },
  {
    key: "home_reports_featured",
    page: "Home",
    positions: 1,
    allowedTypes: ["REPORT"],
    description: "Home Reports section lead showcase",
  },
  {
    key: "home_research_featured",
    page: "Home",
    positions: 3,
    allowedTypes: ["RESEARCH"],
    description: "Home Research Papers card strip (3 positions)",
  },
  {
    key: "topic_featured",
    page: "Topics",
    positions: 1,
    allowedTypes: ["ARTICLE", "REPORT", "RESEARCH"],
    description: "Topic page hero featured analysis",
  },
  {
    key: "subtopic_featured",
    page: "Topics",
    positions: 1,
    allowedTypes: ["ARTICLE", "REPORT", "RESEARCH"],
    description: "Subtopic page lead item",
  },
  {
    key: "reports_hub_featured",
    page: "Reports",
    positions: 1,
    allowedTypes: ["REPORT"],
    description: "Reports hub featured major publication",
  },
  {
    key: "report_category_featured",
    page: "Reports",
    positions: 1,
    allowedTypes: ["REPORT"],
    description: "Report category page featured item",
  },
  {
    key: "research_hub_featured",
    page: "Research",
    positions: 1,
    allowedTypes: ["RESEARCH"],
    description: "Research hub lead peer-reviewed manuscript",
  },
  {
    key: "mega_menu_featured",
    page: "Mega menu",
    positions: 1,
    allowedTypes: ["ARTICLE", "REPORT", "RESEARCH"],
    description: "Topic navigation mega-menu spotlight card",
  },
];

// Helper to ensure all slot definitions exist
export async function ensureDefaultFeaturedSlots() {
  for (const s of DEFAULT_SLOTS) {
    const existing = await prisma.featuredSlot.findUnique({
      where: { key: s.key },
    });
    if (!existing) {
      await prisma.featuredSlot.create({
        data: {
          key: s.key,
          page: s.page,
          positions: s.positions,
          allowedTypes: s.allowedTypes,
        },
      });
    }
  }
}

// 1. Get Slots Overview with Lifecycle Evaluation (FR-FEAT-04 Holding Rule)
export async function getFeaturedSlotsOverview() {
  await ensureDefaultFeaturedSlots();

  const now = new Date();

  // Evaluate lifecycle:
  // 1. Activate scheduled placements whose start time has arrived
  const pendingActivations = await prisma.featuredPlacement.findMany({
    where: {
      status: "SCHEDULED",
      startsAt: { lte: now },
    },
    include: { slot: true },
  });

  for (const p of pendingActivations) {
    // End previously active placements on same slot and position
    await prisma.featuredPlacement.updateMany({
      where: {
        slotId: p.slotId,
        position: p.position,
        status: { in: ["ACTIVE", "HOLDING"] },
        id: { not: p.id },
      },
      data: { status: "ENDED" },
    });

    await prisma.featuredPlacement.update({
      where: { id: p.id },
      data: { status: "ACTIVE" },
    });
  }

  // 2. Process expired ACTIVE placements:
  // FR-FEAT-04: If end passes, and no scheduled replacement, set to HOLDING
  const expiredActive = await prisma.featuredPlacement.findMany({
    where: {
      status: "ACTIVE",
      endsAt: { not: null, lte: now },
    },
    include: { slot: true },
  });

  for (const exp of expiredActive) {
    // Check if next placement is scheduled
    const nextScheduled = await prisma.featuredPlacement.findFirst({
      where: {
        slotId: exp.slotId,
        position: exp.position,
        status: "SCHEDULED",
        startsAt: { lte: now },
      },
    });

    if (nextScheduled) {
      await prisma.featuredPlacement.update({
        where: { id: exp.id },
        data: { status: "ENDED" },
      });
    } else {
      // Retain in HOLDING status so reader never sees an empty slot
      await prisma.featuredPlacement.update({
        where: { id: exp.id },
        data: { status: "HOLDING" },
      });
    }
  }

  // Fetch all slots with their placements and content items
  const slots = await prisma.featuredSlot.findMany({
    include: {
      placements: {
        where: {
          status: { in: ["ACTIVE", "HOLDING", "SCHEDULED"] },
        },
        include: {
          content: {
            select: {
              id: true,
              refId: true,
              title: true,
              slug: true,
              type: true,
              cardImageUrl: true,
              coverImageUrl: true,
              publishedAt: true,
              readCount: true,
            },
          },
        },
        orderBy: [{ position: "asc" }, { startsAt: "asc" }],
      },
    },
    orderBy: [{ page: "asc" }, { key: "asc" }],
  });

  // Group by page
  const grouped: Record<string, typeof slots> = {};
  for (const slot of slots) {
    if (!grouped[slot.page]) {
      grouped[slot.page] = [];
    }
    grouped[slot.page].push(slot);
  }

  return {
    grouped,
    allSlots: slots,
    totalSlots: slots.length,
    holdingCount: slots.reduce(
      (acc, s) =>
        acc + s.placements.filter((p) => p.status === "HOLDING").length,
      0
    ),
  };
}

// 2. Get Gantt Timeline for a Slot (past 30 days + upcoming 60 days)
export async function getSlotTimeline(slotKey: string) {
  const slot = await prisma.featuredSlot.findUnique({
    where: { key: slotKey },
    include: {
      placements: {
        include: {
          content: {
            select: {
              id: true,
              refId: true,
              title: true,
              type: true,
              slug: true,
              cardImageUrl: true,
              coverImageUrl: true,
              publishedAt: true,
            },
          },
          createdBy: {
            select: {
              email: true,
              profile: {
                select: {
                  displayName: true,
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
        orderBy: [{ position: "asc" }, { startsAt: "desc" }],
      },
    },
  });

  return slot;
}

// 3. Search Published Content Items for Placement Picker
export async function searchContentForFeaturing(query?: string, types?: string[]) {
  const where: any = {
    status: "PUBLISHED",
  };

  if (types && types.length > 0) {
    where.type = { in: types };
  }

  if (query && query.trim().length > 0) {
    where.OR = [
      { title: { contains: query.trim(), mode: "insensitive" } },
      { refId: { contains: query.trim(), mode: "insensitive" } },
    ];
  }

  const items = await prisma.contentItem.findMany({
    where,
    select: {
      id: true,
      refId: true,
      title: true,
      slug: true,
      type: true,
      label: true,
      cardImageUrl: true,
      coverImageUrl: true,
      publishedAt: true,
      authors: {
        select: {
          user: {
            select: {
              email: true,
              profile: {
                select: {
                  displayName: true,
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: { publishedAt: "desc" },
    take: 20,
  });

  return items;
}

// 4. Overlap & Conflict Check (FR-FEAT-01)
export async function checkPlacementConflict(data: {
  slotKey: string;
  position: number;
  startsAt: string;
  endsAt?: string | null;
  excludeId?: string;
}) {
  const slot = await prisma.featuredSlot.findUnique({
    where: { key: data.slotKey },
  });

  if (!slot) return { conflict: false };

  const start = new Date(data.startsAt);
  const end = data.endsAt ? new Date(data.endsAt) : null;

  // Conflict if another placement on same slot & position is active or scheduled during the interval
  const conflicts = await prisma.featuredPlacement.findMany({
    where: {
      slotId: slot.id,
      position: data.position,
      status: { in: ["ACTIVE", "SCHEDULED"] },
      ...(data.excludeId ? { id: { not: data.excludeId } } : {}),
      OR: [
        // Placements that have no end date or end after new start
        {
          startsAt: { lte: end || new Date(2099, 1, 1) },
          OR: [
            { endsAt: null },
            { endsAt: { gte: start } },
          ],
        },
      ],
    },
    include: {
      content: {
        select: {
          title: true,
          refId: true,
        },
      },
    },
  });

  if (conflicts.length > 0) {
    return {
      conflict: true,
      conflictingPlacements: conflicts.map((c) => ({
        id: c.id,
        title: c.content.title,
        refId: c.content.refId,
        startsAt: c.startsAt.toISOString(),
        endsAt: c.endsAt ? c.endsAt.toISOString() : null,
        status: c.status,
      })),
    };
  }

  return { conflict: false };
}

// 5. Create or Replace Featured Placement
export async function createFeaturedPlacement(data: {
  slotKey: string;
  position: number;
  contentId: string;
  startsAt: string;
  endsAt?: string | null;
  replaceConflicts?: boolean;
}) {
  const slot = await prisma.featuredSlot.findUnique({
    where: { key: data.slotKey },
  });

  if (!slot) {
    return { success: false, error: "Featured slot not found." };
  }

  const start = new Date(data.startsAt);
  const end = data.endsAt ? new Date(data.endsAt) : null;
  const now = new Date();

  // If replacing conflicts, truncate or end overlapping placements
  if (data.replaceConflicts) {
    const overlapping = await prisma.featuredPlacement.findMany({
      where: {
        slotId: slot.id,
        position: data.position,
        status: { in: ["ACTIVE", "SCHEDULED", "HOLDING"] },
      },
    });

    for (const item of overlapping) {
      if (item.status === "HOLDING" || item.startsAt >= start) {
        // Cancel or end directly
        await prisma.featuredPlacement.update({
          where: { id: item.id },
          data: { status: "ENDED" },
        });
      } else {
        // Truncate end time to new start time
        await prisma.featuredPlacement.update({
          where: { id: item.id },
          data: { endsAt: start },
        });
      }
    }
  } else {
    // Check conflict
    const conflictCheck = await checkPlacementConflict({
      slotKey: data.slotKey,
      position: data.position,
      startsAt: data.startsAt,
      endsAt: data.endsAt,
    });

    if (conflictCheck.conflict) {
      return {
        success: false,
        conflict: true,
        conflictingPlacements: conflictCheck.conflictingPlacements,
        error: "Placement overlaps with an existing scheduled or active story.",
      };
    }
  }

  // End any existing HOLDING items immediately (FR-FEAT-04)
  if (start <= now) {
    await prisma.featuredPlacement.updateMany({
      where: {
        slotId: slot.id,
        position: data.position,
        status: "HOLDING",
      },
      data: { status: "ENDED" },
    });
  }

  const initialStatus = start <= now ? "ACTIVE" : "SCHEDULED";

  const placement = await prisma.featuredPlacement.create({
    data: {
      slotId: slot.id,
      position: data.position,
      contentId: data.contentId,
      startsAt: start,
      endsAt: end,
      status: initialStatus,
    },
    include: {
      content: {
        select: {
          title: true,
          refId: true,
        },
      },
    },
  });

  await prisma.activityLog.create({
    data: {
      action: `Featured item in slot: ${slot.key} (Pos ${data.position})`,
      targetType: "FeaturedPlacement",
      targetId: placement.id,
      targetLabel: placement.content.title,
      result: "SUCCESS",
    },
  });

  revalidatePath("/admin/featured");
  revalidatePath("/");

  return { success: true, placement };
}

// 6. Remove or End Placement
export async function removeFeaturedPlacement(placementId: string) {
  const placement = await prisma.featuredPlacement.findUnique({
    where: { id: placementId },
    include: { slot: true },
  });

  if (!placement) {
    return { success: false, error: "Placement not found." };
  }

  await prisma.featuredPlacement.update({
    where: { id: placementId },
    data: { status: "CANCELLED" },
  });

  await prisma.activityLog.create({
    data: {
      action: `Removed featured placement: ${placement.slot.key} (Pos ${placement.position})`,
      targetType: "FeaturedPlacement",
      targetId: placementId,
      result: "SUCCESS",
    },
  });

  revalidatePath("/admin/featured");
  revalidatePath("/");

  return { success: true };
}

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Ensure seed special reports exist if database is empty
export async function ensureSeedReports() {
  const count = await prisma.contentItem.count({
    where: { type: "REPORT" },
  });
  if (count > 0) return;

  const seedReports = [
    {
      refId: "REP-2026-0001",
      reportNumber: "PSF-R-2026-001",
      title: "South Asian Theatre Air Defence Modernisation: Strategic Interdiction & Sensor Mesh 2026–2030",
      slug: "south-asian-theatre-air-defence-modernisation-2026",
      standfirst:
        "A technical monograph examining integrated air defence architectures, low-frequency counter-stealth radar nodes, and long-range surface-to-air missile proliferation across the Indus theatre.",
      executiveSummary:
        "This special assessment evaluates the ongoing operational transition from legacy point-defence missile batteries to fully networked, multi-tiered air defence complexes across the South Asian subcontinent.",
      keyFindings: [
        "Deployment of multi-spectral radar nodes operating in UHF/VHF bands significantly compresses detection ranges for 5th-generation stealth combat aircraft.",
        "Integrated battle management command systems now achieve sensor-to-shooter latencies under 14 seconds across frontline sectors.",
        "Indigenous long-range surface-to-air missile procurement schedules will reduce reliance on foreign supply chains by 45% before 2030.",
      ],
      pages: 48,
      pdfUrl: "https://psf-storage.org/reports/PSF-R-2026-001.pdf",
      portraitCoverUrl:
        "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=600",
      status: "PUBLISHED",
      readCount: 1420,
    },
    {
      refId: "REP-2026-0002",
      reportNumber: "PSF-R-2026-002",
      title: "Maritime Domain Awareness & Sub-Surface Deterrence Dynamics in the Northern Indian Ocean",
      slug: "maritime-domain-awareness-northern-indian-ocean",
      standfirst:
        "Comprehensive hydro-acoustic debrief on acoustic surveillance arrays, AIP-equipped conventional submarine deployments, and sea-denial strategies along critical energy corridors.",
      executiveSummary:
        "The expansion of submarine patrol intervals and underwater acoustic sensor barriers has heightened sub-surface competition across the Arabian Sea and Gulf of Oman.",
      keyFindings: [
        "Air-independent propulsion (AIP) integration extends submerged patrol endurance from 4 days to over 21 days without snorkeling.",
        "Coastal anti-ship cruise missile regiments provide layered sea-denial coverage extending 350km beyond territorial waters.",
        "Commercial maritime traffic monitoring via automated satellite AIS feeds creates unprecedented multi-domain transparency.",
      ],
      pages: 36,
      pdfUrl: "https://psf-storage.org/reports/PSF-R-2026-002.pdf",
      portraitCoverUrl:
        "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600",
      status: "SUBMITTED",
      readCount: 0,
    },
  ];

  for (const rep of seedReports) {
    const item = await prisma.contentItem.create({
      data: {
        type: "REPORT",
        refId: rep.refId,
        title: rep.title,
        slug: rep.slug,
        standfirst: rep.standfirst,
        label: "REPORT",
        status: rep.status as any,
        cardImageUrl: rep.portraitCoverUrl,
        coverImageUrl: rep.portraitCoverUrl,
        publishedAt: rep.status === "PUBLISHED" ? new Date() : null,
        submittedAt: new Date(),
        readCount: rep.readCount,
      },
    });

    await prisma.reportDetails.create({
      data: {
        contentId: item.id,
        reportNumber: rep.reportNumber,
        executiveSummary: rep.executiveSummary,
        keyFindings: rep.keyFindings,
        pdfUrl: rep.pdfUrl,
        portraitCoverUrl: rep.portraitCoverUrl,
        pages: rep.pages,
      },
    });
  }
}

// 1. Get Special Reports Queue
export async function getAdminReports(filters?: {
  status?: string;
  query?: string;
}) {
  await ensureSeedReports();

  const where: any = {
    type: "REPORT",
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

  const reports = await prisma.contentItem.findMany({
    where,
    include: {
      reportDetails: true,
      topic: true,
      subtopic: true,
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
    orderBy: [{ createdAt: "desc" }],
  });

  return reports.map((r) => ({
    id: r.id,
    refId: r.refId,
    reportNumber: r.reportDetails?.reportNumber || r.refId,
    title: r.title,
    slug: r.slug,
    standfirst: r.standfirst,
    status: r.status,
    topic: r.topic?.name || "Defence & Strategic Affairs",
    pages: r.reportDetails?.pages || 1,
    hasPdf: !!r.reportDetails?.pdfUrl,
    portraitCoverUrl: r.reportDetails?.portraitCoverUrl || r.cardImageUrl,
    reads: r.readCount,
    submittedAt: r.submittedAt ? r.submittedAt.toISOString() : r.createdAt.toISOString(),
    publishedAt: r.publishedAt ? r.publishedAt.toISOString() : null,
    authorName:
      r.authors?.[0]?.user?.profile?.displayName || "Strategic Studies Group",
  }));
}

// 2. Get Report by ID for Editorial Review
export async function getAdminReportById(id: string) {
  const report = await prisma.contentItem.findUnique({
    where: { id },
    include: {
      reportDetails: true,
      topic: true,
      subtopic: true,
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
  });

  return report;
}

// 3. Make Editorial Decision on Special Report
export async function decideReport(
  id: string,
  decision: "APPROVE" | "REQUEST_CHANGES" | "REJECT",
  comments?: string
) {
  const now = new Date();
  let status: any = "PUBLISHED";

  if (decision === "APPROVE") {
    status = "PUBLISHED";
  } else if (decision === "REQUEST_CHANGES") {
    status = "CHANGES_REQUESTED";
  } else {
    status = "REJECTED";
  }

  const updated = await prisma.contentItem.update({
    where: { id },
    data: {
      status,
      publishedAt: decision === "APPROVE" ? now : undefined,
    },
  });

  await prisma.activityLog.create({
    data: {
      action: `Editorial decision ${decision} on report ${updated.refId}`,
      targetType: "ContentItem",
      targetId: id,
      targetLabel: updated.title,
      result: "SUCCESS",
    },
  });

  revalidatePath("/admin/reports");
  revalidatePath(`/admin/reports/${id}`);
  revalidatePath("/reports");
  revalidatePath("/");

  return { success: true, updated };
}

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Ensure realistic seed inbox submissions if database is empty
export async function ensureSeedInboxMessages() {
  const count = await prisma.inboxMessage.count();
  if (count > 0) return;

  // Find or create admin user for notes/replies
  let admin = await prisma.user.findFirst({
    where: { email: "editor@forumstrategic.com" },
    include: { profile: true },
  });

  if (!admin) {
    admin = await prisma.user.create({
      data: {
        email: "editor@forumstrategic.com",
        passwordHash: "$2b$10$ep1QZz2K7mXkQ...",
        status: "ACTIVE",
        profile: {
          create: {
            firstName: "Director",
            lastName: "Publications",
            displayName: "Director of Publications",
            username: "director_publications",
            designation: "Super Administrator",
          },
        },
      },
      include: { profile: true },
    });
  }

  // 1. Correction Submission
  await prisma.inboxMessage.create({
    data: {
      source: "CORRECTIONS",
      pageUrl: "/articles/jf17-block3-pl15-integration-analysis",
      status: "NEW",
      ip: "39.40.12.84",
      country: "Pakistan",
      fields: {
        name: "Dr. Aamer Hameed",
        email: "aamer.hameed@aero-studies.pk",
        organization: "Airpower Studies Forum",
        targetSlug: "jf17-block3-pl15-integration-analysis",
        specificPassage:
          "In Section 3, paragraph 2: 'The KLJ-7A active electronically scanned array radar operates in X-band with liquid cooling...'",
        proposedCorrection:
          "The PAF Block III serial production variant utilizes air-cooled T/R modules for weight mitigation as confirmed during IDEAS 2024 briefings. Please amend cooling specification.",
        sources: "PAF Directorate of Public Relations press release No. 2024-11-PR",
      },
    },
  });

  // 2. Advertising Submission
  await prisma.inboxMessage.create({
    data: {
      source: "ADVERTISE",
      pageUrl: "/advertise",
      status: "OPEN",
      ip: "182.185.14.92",
      country: "Pakistan",
      fields: {
        name: "Maj Gen (R) Sohail Akhtar",
        email: "corporate@gids.com.pk",
        company: "Global Industrial & Defence Solutions (GIDS)",
        phone: "+92 51 927 0001",
        proposedBudget: "PKR 1,500,000",
        preferredSlots: "Home Leaderboard + Special Reports Hub Banner",
        campaignScope: "Fatah-II Guided MLRS Export Promotion Q4",
        message:
          "We wish to sponsor the upcoming Strategic Systems Quarterly Report and place a top banner for 30 days ahead of the regional security summit.",
      },
    },
  });

  // 3. Contact Inquiry
  await prisma.inboxMessage.create({
    data: {
      source: "CONTACT",
      pageUrl: "/contact",
      status: "OPEN",
      ip: "86.134.20.15",
      country: "United Kingdom",
      fields: {
        name: "Julian Borger",
        email: "j.borger@foreignpolicy-weekly.co.uk",
        organization: "Diplomatic Affairs Press",
        subject: "Interview Request: Regional Missile Defence Dynamics",
        message:
          "Good day, I am preparing an analytical feature on South Asian hypersonic test trajectories and would appreciate a 20-minute telephonic briefing with your Senior Fellow for Strategic Systems.",
      },
    },
  });

  // 4. Copyright & Takedown
  await prisma.inboxMessage.create({
    data: {
      source: "COPYRIGHT",
      pageUrl: "/copyright-takedown",
      status: "NEW",
      ip: "103.255.4.19",
      country: "Pakistan",
      fields: {
        name: "Advocate Malik Farhan",
        email: "legal@farhanassociates.com.pk",
        clientName: "GeoSpatial Mapping Services Ltd",
        infringingUrl: "/reports/karakoram-logistics-infrastructure-2026",
        originalWorkDescription:
          "Infographic map titled 'Northern Axis Supply Arteries' reproduced on page 14 without commercial license.",
        statement:
          "I have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner.",
        signature: "Malik Farhan, Advocate High Court",
      },
    },
  });
}

// 1. Get Messages with Filters
export async function getInboxMessages(filter?: {
  source?: string;
  status?: string;
  query?: string;
}) {
  await ensureSeedInboxMessages();

  const where: any = {};

  if (filter?.source && filter.source !== "ALL") {
    where.source = filter.source;
  }
  if (filter?.status && filter.status !== "ALL") {
    where.status = filter.status;
  }

  const messages = await prisma.inboxMessage.findMany({
    where,
    include: {
      notes: {
        include: {
          author: {
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
        orderBy: { createdAt: "desc" },
      },
      replies: {
        include: {
          sentBy: {
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
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return messages;
}

// 2. Update Status
export async function updateInboxStatus(
  messageId: string,
  newStatus: "NEW" | "OPEN" | "REPLIED" | "CLOSED" | "SPAM"
) {
  const message = await prisma.inboxMessage.update({
    where: { id: messageId },
    data: { status: newStatus },
  });

  await prisma.activityLog.create({
    data: {
      action: `Updated inbox submission status to ${newStatus}`,
      targetType: "InboxMessage",
      targetId: messageId,
      result: "SUCCESS",
    },
  });

  revalidatePath("/admin/inbox");
  return { success: true, message };
}

// 3. Add Internal Note
export async function addInboxNote(messageId: string, body: string) {
  const admin = await prisma.user.findFirst({
    where: { status: "ACTIVE" },
  });

  if (!admin) return { success: false, error: "No active admin user found." };

  const note = await prisma.inboxNote.create({
    data: {
      messageId,
      authorId: admin.id,
      body: body.trim(),
    },
    include: {
      author: {
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
  });

  revalidatePath("/admin/inbox");
  return { success: true, note };
}

// 4. Send Rich-Text Reply
export async function sendInboxReply(data: {
  messageId: string;
  subject: string;
  body: string;
}) {
  const admin = await prisma.user.findFirst({
    where: { status: "ACTIVE" },
  });

  if (!admin) return { success: false, error: "No active admin user found." };

  const reply = await prisma.inboxReply.create({
    data: {
      messageId: data.messageId,
      sentById: admin.id,
      subject: data.subject.trim(),
      body: data.body.trim(),
    },
    include: {
      sentBy: {
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
  });

  // Automatically mark status as REPLIED
  await prisma.inboxMessage.update({
    where: { id: data.messageId },
    data: { status: "REPLIED" },
  });

  await prisma.activityLog.create({
    data: {
      action: `Sent editorial reply to inbox submission`,
      targetType: "InboxReply",
      targetId: reply.id,
      result: "SUCCESS",
    },
  });

  revalidatePath("/admin/inbox");
  return { success: true, reply };
}

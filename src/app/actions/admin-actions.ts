"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. Decide Application (Approve / Return / Permanent Reject)
export async function decideApplication(data: {
  applicationId: string;
  decision: "APPROVE" | "REJECT_WITH_COMMENTS" | "REJECT_PERMANENTLY";
  commentToApplicant?: string;
  internalNote?: string;
  permanentReason?: any;
}) {
  const application = await prisma.application.findUnique({
    where: { id: data.applicationId },
    include: { user: true },
  });

  if (!application) {
    return { success: false, error: "Application not found." };
  }

  if (data.decision === "APPROVE") {
    // 1. Update Application status
    await prisma.application.update({
      where: { id: data.applicationId },
      data: { status: "APPROVED" },
    });

    // 2. Activate user & assign role
    const roleName = application.track === "RESEARCH_WRITER" ? "Research Writer" : "Article Writer";
    const role = await prisma.role.findUnique({ where: { name: roleName } });

    await prisma.user.update({
      where: { id: application.userId },
      data: {
        status: "ACTIVE",
        ...(role
          ? {
              roles: {
                create: {
                  roleId: role.id,
                },
              },
            }
          : {}),
      },
    });

    // 3. Log decision
    await prisma.applicationDecision.create({
      data: {
        applicationId: data.applicationId,
        decision: "APPROVE",
        commentToApplicant: data.commentToApplicant || "Welcome to Pakistan Strategic Forum.",
        internalNote: data.internalNote || null,
      },
    });

    // 4. Log in ActivityLog
    await prisma.activityLog.create({
      data: {
        action: "Approved contributor application",
        targetType: "Application",
        targetId: data.applicationId,
        targetLabel: `${application.user.email} (${application.track})`,
        result: "SUCCESS",
      },
    });
  } else if (data.decision === "REJECT_WITH_COMMENTS") {
    if (!data.commentToApplicant || data.commentToApplicant.trim().length < 20) {
      return { success: false, error: "A detailed comment (min 20 characters) is required when requesting revisions." };
    }

    await prisma.application.update({
      where: { id: data.applicationId },
      data: { status: "RETURNED" },
    });

    await prisma.user.update({
      where: { id: application.userId },
      data: { status: "RETURNED" },
    });

    await prisma.applicationDecision.create({
      data: {
        applicationId: data.applicationId,
        decision: "REJECT_WITH_COMMENTS",
        commentToApplicant: data.commentToApplicant,
        internalNote: data.internalNote || null,
      },
    });

    await prisma.activityLog.create({
      data: {
        action: "Returned application with comments",
        targetType: "Application",
        targetId: data.applicationId,
        targetLabel: `${application.user.email} (${application.track})`,
        result: "SUCCESS",
      },
    });
  } else if (data.decision === "REJECT_PERMANENTLY") {
    await prisma.application.update({
      where: { id: data.applicationId },
      data: { status: "PERMANENTLY_REJECTED" },
    });

    await prisma.user.update({
      where: { id: application.userId },
      data: { status: "PERMANENTLY_REJECTED" },
    });

    // Add to email blocklist (FRD 12.5)
    await prisma.emailBlocklist.upsert({
      where: { normalisedEmail: application.user.email },
      create: {
        normalisedEmail: application.user.email,
        reason: data.permanentReason || "PERMANENT_REJECT",
        sourceUserId: application.userId,
      },
      update: {},
    });

    await prisma.applicationDecision.create({
      data: {
        applicationId: data.applicationId,
        decision: "REJECT_PERMANENTLY",
        commentToApplicant: data.commentToApplicant || null,
        internalNote: data.internalNote || null,
        permanentReason: data.permanentReason || "OTHER",
      },
    });

    await prisma.activityLog.create({
      data: {
        action: "Permanently rejected application and blocklisted email",
        targetType: "Application",
        targetId: data.applicationId,
        targetLabel: `${application.user.email}`,
        result: "SUCCESS",
      },
    });
  }

  revalidatePath("/admin/applications");
  revalidatePath(`/admin/applications/${data.applicationId}`);
  return { success: true };
}

// 2. Decide Article / Report (Publish now / Schedule / Request Changes / Reject)
export async function decideArticle(data: {
  articleId: string;
  decision: "PUBLISH_NOW" | "SCHEDULE" | "CHANGES_REQUESTED" | "REJECT" | "UNPUBLISH";
  scheduledFor?: Date | string;
  comment?: string;
}) {
  const item = await prisma.contentItem.findUnique({
    where: { id: data.articleId },
  });

  if (!item) {
    return { success: false, error: "Content item not found." };
  }

  let newStatus: any = "DRAFT";
  let publishedAt: Date | null = null;
  let scheduledFor: Date | null = null;

  switch (data.decision) {
    case "PUBLISH_NOW":
      newStatus = "PUBLISHED";
      publishedAt = new Date();
      break;
    case "SCHEDULE":
      newStatus = "SCHEDULED";
      scheduledFor = data.scheduledFor ? new Date(data.scheduledFor) : null;
      break;
    case "CHANGES_REQUESTED":
      newStatus = "CHANGES_REQUESTED";
      break;
    case "REJECT":
      newStatus = "REJECTED";
      break;
    case "UNPUBLISH":
      newStatus = "UNPUBLISHED";
      break;
  }

  await prisma.contentItem.update({
    where: { id: data.articleId },
    data: {
      status: newStatus,
      ...(publishedAt ? { publishedAt } : {}),
      ...(scheduledFor ? { scheduledFor } : {}),
    },
  });

  if (data.comment) {
    await prisma.editorialComment.create({
      data: {
        contentId: data.articleId,
        authorId: "system-admin",
        body: data.comment,
        visibility: data.decision === "CHANGES_REQUESTED" ? "TO_AUTHOR" : "INTERNAL",
      },
    });
  }

  await prisma.activityLog.create({
    data: {
      action: `Editorial decision: ${data.decision}`,
      targetType: "ContentItem",
      targetId: data.articleId,
      targetLabel: item.title,
      result: "SUCCESS",
    },
  });

  revalidatePath("/admin/articles");
  revalidatePath(`/admin/articles/${data.articleId}`);
  revalidatePath("/");
  return { success: true };
}

// 3. Screen Research Paper (Desk Reject / Format Issues / Send to Review)
export async function screenResearchPaper(data: {
  paperId: string;
  action: "SEND_TO_REVIEW" | "RETURN_FORMATTING" | "DESK_REJECT";
  comment?: string;
}) {
  let newStatus: any = "UNDER_REVIEW";

  if (data.action === "DESK_REJECT") newStatus = "REJECTED";
  if (data.action === "RETURN_FORMATTING") newStatus = "CHANGES_REQUESTED";

  await prisma.contentItem.update({
    where: { id: data.paperId },
    data: { status: newStatus },
  });

  await prisma.editorialDecision.create({
    data: {
      contentId: data.paperId,
      stage: "SCREENING",
      decision: data.action,
      commentToAuthor: data.comment || null,
    },
  });

  revalidatePath("/admin/research");
  revalidatePath(`/admin/research/${data.paperId}`);
  return { success: true };
}

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Ensure seed roles and permissions exist
export async function ensureSeedRoles() {
  const rolesCount = await prisma.role.count();
  if (rolesCount > 0) return;

  const defaultRoles = [
    {
      name: "SUPER_ADMIN",
      description: "Full, unrestricted access across every system configuration, user role, and financial engine.",
      chipColour: "red",
      isSystem: true,
    },
    {
      name: "APPROVER",
      description: "Editorial board member authorised for double-blind peer reviews, screening, and final publication decisions.",
      chipColour: "green",
      isSystem: true,
    },
    {
      name: "SENIOR_CONTRIBUTOR",
      description: "Verified institutional fellow with direct manuscript submission rights across articles and special reports.",
      chipColour: "blue",
      isSystem: true,
    },
    {
      name: "CONTRIBUTOR",
      description: "Standard accredited author authorised to submit manuscripts for editorial screening.",
      chipColour: "slate",
      isSystem: true,
    },
  ];

  for (const r of defaultRoles) {
    await prisma.role.create({
      data: r,
    });
  }
}

// 1. Get Users Listing
export async function getUsersList(filters?: {
  role?: string;
  status?: string;
  query?: string;
}) {
  await ensureSeedRoles();

  const where: any = {};

  if (filters?.status && filters.status !== "ALL") {
    where.status = filters.status;
  }

  if (filters?.query) {
    where.OR = [
      { email: { contains: filters.query, mode: "insensitive" } },
      { profile: { displayName: { contains: filters.query, mode: "insensitive" } } },
      { profile: { username: { contains: filters.query, mode: "insensitive" } } },
    ];
  }

  const users = await prisma.user.findMany({
    where,
    include: {
      profile: true,
      roles: {
        include: { role: true },
      },
      _count: {
        select: {
          authoredContent: true,
          assignedReviews: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return users.map((u) => ({
    id: u.id,
    email: u.email,
    displayName: u.profile?.displayName || u.profile?.firstName ? `${u.profile?.firstName} ${u.profile?.lastName}` : u.email.split("@")[0],
    username: u.profile?.username || u.email.split("@")[0],
    designation: u.profile?.designation || "Contributor",
    institution: u.profile?.institution || "Independent Analyst",
    status: u.status,
    twoFactorRequired: u.twoFactorRequired,
    roles: u.roles.map((r) => r.role.name),
    articlesCount: u._count.authoredContent,
    reviewsCount: u._count.assignedReviews,
    lastActiveAt: u.lastActiveAt ? u.lastActiveAt.toISOString() : null,
    createdAt: u.createdAt.toISOString().slice(0, 10),
  }));
}

// 2. Toggle User Status (Activate, Deactivate, Ban)
export async function toggleUserStatus(
  userId: string,
  newStatus: "ACTIVE" | "DEACTIVATED" | "BANNED"
) {
  const updated = await prisma.user.update({
    where: { id: userId },
    data: { status: newStatus },
  });

  await prisma.activityLog.create({
    data: {
      action: `Updated user status to ${newStatus}`,
      targetType: "User",
      targetId: userId,
      result: "SUCCESS",
    },
  });

  revalidatePath("/admin/users");
  return { success: true, user: updated };
}

// 3. Get Roles & RBAC Matrix
export async function getRolesWithPermissions() {
  await ensureSeedRoles();

  const roles = await prisma.role.findMany({
    include: {
      _count: {
        select: { users: true },
      },
    },
    orderBy: { name: "asc" },
  });

  // 55 RBAC Permissions grouped
  const permissionGroups = [
    {
      group: "Editorial Content",
      permissions: [
        "articles.create",
        "articles.edit_own",
        "articles.edit_any",
        "articles.publish",
        "articles.unpublish",
        "articles.delete",
        "articles.feature",
        "reports.create",
        "reports.publish",
        "newsroom.publish",
      ],
    },
    {
      group: "Peer Review & Research",
      permissions: [
        "research.submit",
        "research.screen",
        "research.assign_approvers",
        "research.see_identities",
        "research.final_decision",
        "research.publish",
        "research.retract",
      ],
    },
    {
      group: "Access & Users",
      permissions: [
        "users.view",
        "users.create",
        "users.edit",
        "users.ban",
        "roles.manage",
        "applications.review",
        "id_cards.issue",
        "id_cards.revoke",
      ],
    },
    {
      group: "Commercial & Intelligence",
      permissions: [
        "ads.manage_campaigns",
        "ads.view_financials",
        "global_watch.edit_layers",
        "global_watch.settings",
        "inbox.reply",
        "inbox.assign",
      ],
    },
    {
      group: "System & Governance",
      permissions: [
        "cms.edit_pages",
        "cms.manage_media",
        "settings.edit",
        "activity_logs.view",
        "analytics.export",
      ],
    },
  ];

  return { roles, permissionGroups };
}

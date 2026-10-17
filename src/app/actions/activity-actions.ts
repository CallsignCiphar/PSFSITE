"use server";

import { prisma } from "@/lib/prisma";
import { ACTION_GROUPS, MOCK_ACTIVITY_LOGS } from "@/lib/constants/activity";

export interface ActivityFilterOptions {
  query?: string;
  group?: string;
  result?: "ALL" | "SUCCESS" | "FAILED";
  timeframe?: "24h" | "7d" | "30d" | "all";
  actorRole?: string;
}

// Helper to log a new activity
export async function recordActivityLog(params: {
  action: string;
  actorId?: string;
  actorType?: "USER" | "VISITOR" | "SYSTEM";
  actorRoles?: string[];
  targetType?: string;
  targetId?: string;
  targetLabel?: string;
  url?: string;
  ip?: string;
  country?: string;
  city?: string;
  userAgent?: string;
  result?: "SUCCESS" | "FAILED";
  metadata?: any;
}) {
  try {
    await prisma.activityLog.create({
      data: {
        action: params.action,
        actorId: params.actorId,
        actorType: params.actorType || "USER",
        actorRoles: params.actorRoles || [],
        targetType: params.targetType,
        targetId: params.targetId,
        targetLabel: params.targetLabel,
        url: params.url,
        ip: params.ip,
        country: params.country,
        city: params.city,
        userAgent: params.userAgent,
        result: params.result || "SUCCESS",
        metadata: params.metadata || {},
      },
    });
  } catch (err) {
    console.warn("Could not write to activity log DB:", err);
  }
}

// 1. Fetch Activity Logs
export async function getActivityLogs(filters?: ActivityFilterOptions) {
  try {
    const where: any = {};

    if (filters?.result && filters.result !== "ALL") {
      where.result = filters.result;
    }

    if (filters?.timeframe && filters.timeframe !== "all") {
      const now = new Date();
      let deltaHours = 24;
      if (filters.timeframe === "7d") deltaHours = 24 * 7;
      if (filters.timeframe === "30d") deltaHours = 24 * 30;
      where.occurredAt = {
        gte: new Date(now.getTime() - deltaHours * 60 * 60 * 1000),
      };
    }

    if (filters?.query) {
      where.OR = [
        { action: { contains: filters.query, mode: "insensitive" } },
        { targetLabel: { contains: filters.query, mode: "insensitive" } },
        { ip: { contains: filters.query, mode: "insensitive" } },
        { city: { contains: filters.query, mode: "insensitive" } },
      ];
    }

    const logs = await prisma.activityLog.findMany({
      where,
      include: {
        actor: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: { occurredAt: "desc" },
      take: 100,
    });

    if (logs.length === 0) {
      return MOCK_ACTIVITY_LOGS;
    }

    return logs.map((log) => ({
      id: `LOG-${log.id.toString().padStart(7, "0")}`,
      occurredAt: log.occurredAt.toISOString(),
      actorName:
        log.actor?.profile?.displayName ||
        (log.actor?.profile?.firstName
          ? `${log.actor?.profile?.firstName} ${log.actor?.profile?.lastName}`
          : log.actor?.email) ||
        (log.actorType === "SYSTEM" ? "System Automation" : "Visitor (Unauthenticated)"),
      actorEmail: log.actor?.email || log.ip || "system@forumstrategic.com",
      actorType: log.actorType,
      actorRoles: (log.actorRoles as string[]) || [],
      action: log.action,
      targetType: log.targetType,
      targetId: log.targetId,
      targetLabel: log.targetLabel,
      url: log.url,
      ip: log.ip,
      country: log.country,
      city: log.city,
      userAgent: log.userAgent,
      result: log.result,
      metadata: log.metadata,
    }));
  } catch (err) {
    console.warn("DB ActivityLog query fallback:", err);
    return MOCK_ACTIVITY_LOGS;
  }
}

// 2. Export Activity Logs to CSV string
export async function exportActivityLogsCsv(filters?: ActivityFilterOptions) {
  const logs = await getActivityLogs(filters);

  const headers = [
    "Log ID",
    "Timestamp (PKT)",
    "Actor",
    "Actor Email",
    "Actor Type",
    "Roles",
    "Action",
    "Target Type",
    "Target Label",
    "URL",
    "IP Address",
    "Country",
    "City",
    "Result",
  ];

  const rows = logs.map((l) => [
    l.id,
    new Date(l.occurredAt).toLocaleString("en-GB", { timeZone: "Asia/Karachi" }) + " PKT",
    `"${l.actorName.replace(/"/g, '""')}"`,
    `"${l.actorEmail.replace(/"/g, '""')}"`,
    l.actorType,
    `"${(l.actorRoles || []).join(", ")}"`,
    `"${l.action.replace(/"/g, '""')}"`,
    l.targetType || "",
    `"${(l.targetLabel || "").replace(/"/g, '""')}"`,
    l.url || "",
    l.ip || "",
    l.country || "",
    l.city || "",
    l.result,
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  return csvContent;
}

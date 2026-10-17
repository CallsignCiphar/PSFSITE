"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { EMAIL_TEMPLATES, EmailTemplate } from "@/lib/constants/settings";

// In-memory / DB representation of global settings
let SETTINGS_CACHE = {
  general: {
    siteName: "Pakistan Strategic Forum",
    tagline: "Premier Strategic, Defence & Geopolitical Intelligence",
    timezone: "Asia/Karachi (PKT, UTC+5)",
    dateFormat: "DD MMMM YYYY",
    editorialEmail: "editorial@forumstrategic.com",
    advertiseEmail: "ads@forumstrategic.com",
    legalEmail: "legal@forumstrategic.com",
    generalEmail: "info@forumstrategic.com",
    defaultReviewDays: 21,
    reminderThresholdDays: 3,
  },
  security: {
    minPasswordLength: 10,
    sessionIdleHours: 12,
    sessionAdminHours: 8,
    rememberMeDays: 30,
    lockoutThreshold: 5,
    mandatoryTwoFactorRoles: ["SUPER_ADMIN", "ADMIN", "APPROVER"],
    ipBlocklist: "103.255.4.19\n185.220.101.5\n45.154.255.0/24",
  },
  retention: {
    rawIpRetentionDays: 90,
    applicationDocsRetentionDays: 30,
    softDeletePurgeDays: 30,
    activityLogRetentionDays: 730,
  },
  integrations: {
    turnstileStatus: "ACTIVE",
    turnstileSiteKey: "0x4AAAAAAAT9Vz72k_19KqXz",
    youtubeStatus: "ACTIVE",
    youtubeChannelId: "UC_PakStrategicForumOfficial",
    twitterHandle: "@PakStratForum",
    resendStatus: "ACTIVE",
    geoIpLastSync: "17 October 2026, 04:00 PKT",
  },
  maintenance: {
    enabled: false,
    message: "Pakistan Strategic Forum is currently undergoing scheduled infrastructure updates. Full access will resume shortly.",
    allowedIps: "182.188.10.45\n111.92.140.12",
  },
  cookie: {
    version: "v1.2.0",
    lastBumpedAt: "2026-09-01T10:00:00Z",
  },
};

// 1. Get All Settings
export async function getPlatformSettings() {
  return SETTINGS_CACHE;
}

// 2. Update General Settings
export async function updateGeneralSettings(data: any) {
  SETTINGS_CACHE.general = { ...SETTINGS_CACHE.general, ...data };

  await prisma.activityLog.create({
    data: {
      action: "Updated general platform settings",
      targetType: "Settings",
      targetId: "general",
      targetLabel: "General Site Info & Contact Desks",
      result: "SUCCESS",
    },
  }).catch(() => {});

  revalidatePath("/admin/settings");
  return { success: true };
}

// 3. Update Security Policy
export async function updateSecuritySettings(data: any) {
  SETTINGS_CACHE.security = { ...SETTINGS_CACHE.security, ...data };

  await prisma.activityLog.create({
    data: {
      action: "Updated security policy & 2FA enforcement rules",
      targetType: "Settings",
      targetId: "security",
      targetLabel: "Security & Access Policy",
      result: "SUCCESS",
    },
  }).catch(() => {});

  revalidatePath("/admin/settings");
  return { success: true };
}

// 4. Update Data Retention Settings
export async function updateRetentionSettings(data: any) {
  SETTINGS_CACHE.retention = { ...SETTINGS_CACHE.retention, ...data };

  await prisma.activityLog.create({
    data: {
      action: "Updated data retention & document purge rules",
      targetType: "Settings",
      targetId: "retention",
      targetLabel: "Data Retention & Privacy",
      result: "SUCCESS",
    },
  }).catch(() => {});

  revalidatePath("/admin/settings");
  return { success: true };
}

// 5. Update Maintenance Mode
export async function updateMaintenanceMode(data: {
  enabled: boolean;
  message: string;
  allowedIps: string;
}) {
  SETTINGS_CACHE.maintenance = { ...SETTINGS_CACHE.maintenance, ...data };

  await prisma.activityLog.create({
    data: {
      action: data.enabled ? "Enabled emergency maintenance mode" : "Disabled maintenance mode",
      targetType: "Settings",
      targetId: "maintenance",
      targetLabel: `Maintenance Mode: ${data.enabled ? "ACTIVE" : "OFF"}`,
      result: "SUCCESS",
    },
  }).catch(() => {});

  revalidatePath("/admin/settings");
  return { success: true };
}

// 6. Update Integrations
export async function updateIntegrationSettings(data: any) {
  SETTINGS_CACHE.integrations = { ...SETTINGS_CACHE.integrations, ...data };

  await prisma.activityLog.create({
    data: {
      action: "Updated third-party integration credentials",
      targetType: "Settings",
      targetId: "integrations",
      targetLabel: "Integrations & API Keys",
      result: "SUCCESS",
    },
  }).catch(() => {});

  revalidatePath("/admin/settings");
  return { success: true };
}

// 7. Dispatch Test Email
export async function sendTestEmail(templateKey: string, recipientEmail: string) {
  const template = EMAIL_TEMPLATES.find((t) => t.key === templateKey);
  if (!template) {
    return { success: false, error: "Template not found" };
  }

  // Simulate transactional email dispatch
  console.log(`[TEST EMAIL] Sending "${template.name}" to ${recipientEmail}`);

  await prisma.activityLog.create({
    data: {
      action: `Dispatched test email: ${template.key}`,
      targetType: "EmailTemplate",
      targetId: templateKey,
      targetLabel: recipientEmail,
      result: "SUCCESS",
    },
  }).catch(() => {});

  return { success: true, message: `Test email "${template.name}" successfully queued for ${recipientEmail}` };
}

// 8. Bump Cookie Consent Policy Version
export async function bumpCookieConsentVersion(newVersion: string) {
  SETTINGS_CACHE.cookie.version = newVersion;
  SETTINGS_CACHE.cookie.lastBumpedAt = new Date().toISOString();

  await prisma.activityLog.create({
    data: {
      action: `Bumped cookie consent policy to version ${newVersion}`,
      targetType: "Settings",
      targetId: "cookie",
      targetLabel: `Cookie Policy ${newVersion}`,
      result: "SUCCESS",
    },
  }).catch(() => {});

  revalidatePath("/admin/settings");
  return { success: true, version: newVersion };
}

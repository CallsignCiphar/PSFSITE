"use server";

import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

// 1. Create Staff ID Card
export async function createIdCard(data: {
  cardId: string;
  designation: string;
}) {
  const cardIdClean = data.cardId.trim().toUpperCase();

  // Check unique cardId
  const existing = await prisma.idCard.findUnique({
    where: { cardId: cardIdClean },
  });

  if (existing) {
    return { success: false, error: "A card with this ID already exists." };
  }

  // Generate unguessable 24-character URL-safe token (approx 143 bits)
  const rawToken = crypto.randomBytes(18).toString("base64url");
  const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

  const card = await prisma.idCard.create({
    data: {
      cardId: cardIdClean,
      designation: data.designation.trim(),
      tokenHash,
      active: true,
      scanCount: 0,
    },
  });

  await prisma.activityLog.create({
    data: {
      action: "Created staff ID card",
      targetType: "IdCard",
      targetId: card.id,
      targetLabel: `${card.cardId} (${card.designation})`,
      result: "SUCCESS",
    },
  });

  revalidatePath("/admin/id-cards");
  return {
    success: true,
    cardId: card.cardId,
    token: rawToken,
    verifyUrl: `https://forumstrategic.com/verify/${rawToken}`,
  };
}

// 2. Toggle ID Card Active / Inactive Status
export async function toggleIdCardStatus(cardId: string, active: boolean) {
  const card = await prisma.idCard.update({
    where: { cardId },
    data: { active },
  });

  await prisma.activityLog.create({
    data: {
      action: active ? "Activated staff ID card" : "Deactivated staff ID card",
      targetType: "IdCard",
      targetId: card.id,
      targetLabel: `${card.cardId}`,
      result: "SUCCESS",
    },
  });

  revalidatePath("/admin/id-cards");
  return { success: true, active: card.active };
}

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Ensure Official Taxonomy Seed Data (FR-TAX-03)
export async function ensureSeedTaxonomies() {
  const count = await prisma.category.count();
  if (count > 0) return;

  const topicsSeed = [
    {
      name: "Defence",
      slug: "defence",
      description:
        "Comprehensive analyses of conventional forces, doctrinal posture, modernisation programmes, and strategic deterrent assets.",
      subtopics: [
        { name: "Land", slug: "land", desc: "Armour, artillery, mechanised infantry, and doctrinal evolutions." },
        { name: "Air", slug: "air", desc: "Combat aviation, air defence, ISR platforms, and airborne electronic warfare." },
        { name: "Sea", slug: "sea", desc: "Naval warfare, submarines, surface combatants, and maritime domain awareness." },
        { name: "Strategic Systems", slug: "strategic-systems", desc: "Ballistic, cruise, hypersonic delivery systems, and nuclear doctrine." },
        { name: "Cyber & Information", slug: "cyber-information", desc: "Network security, electronic intelligence, and cognitive warfare." },
      ],
    },
    {
      name: "Geopolitics",
      slug: "geopolitics",
      description:
        "Rigorous scholarly examination of major power competition, bilateral diplomacy, and regional geoeconomic realignments.",
      subtopics: [
        { name: "South Asia", slug: "south-asia", desc: "Indo-Pakistani strategic stability and bilateral diplomacy." },
        { name: "Afghanistan", slug: "afghanistan", desc: "Cross-border security, counter-terrorism, and regional stability." },
        { name: "Americas", slug: "americas", desc: "Washington-Islamabad strategic relations and hemispheric policies." },
        { name: "Middle East", slug: "middle-east", desc: "Gulf security architectures, energy corridors, and diplomatic ties." },
      ],
    },
    {
      name: "National Affairs",
      slug: "national-affairs",
      description:
        "Policy evaluations addressing internal security dynamics, macro-economic resilience, and institutional governance.",
      subtopics: [
        { name: "Security", slug: "security", desc: "Internal security, counter-insurgency, and border management." },
        { name: "Economy", slug: "economy", desc: "Defence budget allocations, macro fiscal trends, and supply chain sovereignty." },
        { name: "Policy", slug: "policy", desc: "National security framework formulation and legislative oversight." },
      ],
    },
    {
      name: "History",
      slug: "history",
      description:
        "Documented operational histories, military campaigns, tactical deconstructions, and biographical profiles.",
      subtopics: [
        { name: "Battles & Operations", slug: "battles-operations", desc: "Major historical engagements and campaign debriefs." },
        { name: "Profiles", slug: "profiles", desc: "Architects of strategic doctrine and military leadership." },
      ],
    },
  ];

  for (let i = 0; i < topicsSeed.length; i++) {
    const t = topicsSeed[i];
    const createdTopic = await prisma.category.create({
      data: {
        type: "TOPIC",
        name: t.name,
        slug: t.slug,
        description: t.description,
        sortOrder: i,
        active: true,
        showInNav: true,
        showOnHomeQuickAccess: true,
        showAsHomeDesk: true,
      },
    });

    for (let j = 0; j < t.subtopics.length; j++) {
      const sub = t.subtopics[j];
      await prisma.category.create({
        data: {
          type: "SUBTOPIC",
          parentId: createdTopic.id,
          name: sub.name,
          slug: sub.slug,
          description: sub.desc,
          sortOrder: j,
          active: true,
          showInNav: true,
        },
      });
    }
  }

  // Report Categories
  const reportCats = [
    { name: "Annual Strategic Reviews", slug: "annual-strategic-reviews", desc: "Comprehensive flagship year-in-review assessments." },
    { name: "Special Reports", slug: "special-reports", desc: "In-depth monographs on major procurement and tactical developments." },
    { name: "Policy Briefs", slug: "policy-briefs", desc: "High-density actionable briefs for security and foreign policy officials." },
    { name: "Regional Assessments", slug: "regional-assessments", desc: "Focused territorial and theatre situation briefs." },
  ];

  for (let i = 0; i < reportCats.length; i++) {
    const rc = reportCats[i];
    await prisma.category.create({
      data: {
        type: "REPORT_CATEGORY",
        name: rc.name,
        slug: rc.slug,
        description: rc.desc,
        sortOrder: i,
        active: true,
        showInNav: true,
      },
    });
  }

  // Research Categories
  const researchCats = [
    { name: "Strategic Studies", slug: "strategic-studies" },
    { name: "Military Technology", slug: "military-technology" },
    { name: "Deterrence & Arms Control", slug: "deterrence-arms-control" },
    { name: "International Security", slug: "international-security" },
  ];

  for (let i = 0; i < researchCats.length; i++) {
    const rsc = researchCats[i];
    await prisma.category.create({
      data: {
        type: "RESEARCH_CATEGORY",
        name: rsc.name,
        slug: rsc.slug,
        sortOrder: i,
        active: true,
        showInNav: true,
      },
    });
  }

  // Seed Tags
  const initialTags = [
    { name: "JF-17 Thunder", slug: "jf-17-thunder" },
    { name: "Al-Khalid MBT", slug: "al-khalid-mbt" },
    { name: "Babur Missile", slug: "babur-missile" },
    { name: "Shaheen-III", slug: "shaheen-iii" },
    { name: "C4ISR", slug: "c4isr" },
    { name: "AESA Radar", slug: "aesa-radar" },
    { name: "CPEC Security", slug: "cpec-security" },
    { name: "Deterrence Stability", slug: "deterrence-stability" },
  ];

  for (const tag of initialTags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    });
  }
}

// 1. Get All Taxonomies with Hierarchy & Item Counts
export async function getTaxonomies() {
  await ensureSeedTaxonomies();

  const categories = await prisma.category.findMany({
    include: {
      children: {
        include: {
          _count: {
            select: {
              contentItemsSubtopic: true,
            },
          },
        },
        orderBy: { sortOrder: "asc" },
      },
      _count: {
        select: {
          contentItemsTopic: true,
          contentItemsSection: true,
        },
      },
    },
    orderBy: { sortOrder: "asc" },
  });

  const topics = categories.filter((c) => c.type === "TOPIC");
  const reportCategories = categories.filter((c) => c.type === "REPORT_CATEGORY");
  const researchCategories = categories.filter((c) => c.type === "RESEARCH_CATEGORY");

  const tags = await prisma.tag.findMany({
    include: {
      _count: {
        select: {
          content: true,
        },
      },
    },
    orderBy: { name: "asc" },
  });

  return {
    topics,
    reportCategories,
    researchCategories,
    tags,
  };
}

// 2. Toggle Category Flags (FR-TAX-02)
export async function toggleCategoryFlag(
  id: string,
  flag: "active" | "showInNav" | "showOnHomeQuickAccess" | "showAsHomeDesk",
  value: boolean
) {
  const updated = await prisma.category.update({
    where: { id },
    data: { [flag]: value },
  });

  await prisma.activityLog.create({
    data: {
      action: `Toggled ${flag} to ${value} for category ${updated.name}`,
      targetType: "Category",
      targetId: id,
      targetLabel: updated.name,
      result: "SUCCESS",
    },
  });

  revalidatePath("/admin/taxonomy");
  revalidatePath("/");
  return { success: true, updated };
}

// 3. Save or Update Topic / Category (Modal 33)
export async function saveCategory(data: {
  id?: string;
  type: "TOPIC" | "SUBTOPIC" | "REPORT_CATEGORY" | "RESEARCH_CATEGORY";
  parentId?: string;
  name: string;
  slug?: string;
  description?: string;
  heroImageUrl?: string;
  iconUrl?: string;
  active?: boolean;
  showInNav?: boolean;
  showOnHomeQuickAccess?: boolean;
  showAsHomeDesk?: boolean;
}) {
  const cleanName = data.name.trim();
  const cleanSlug = (data.slug || cleanName.toLowerCase().replace(/[^a-z0-9]+/g, "-")).replace(/(^-|-$)/g, "");

  let category;
  if (data.id) {
    category = await prisma.category.update({
      where: { id: data.id },
      data: {
        name: cleanName,
        slug: cleanSlug,
        description: data.description?.trim(),
        heroImageUrl: data.heroImageUrl,
        iconUrl: data.iconUrl,
        active: data.active ?? true,
        showInNav: data.showInNav ?? true,
        showOnHomeQuickAccess: data.showOnHomeQuickAccess ?? false,
        showAsHomeDesk: data.showAsHomeDesk ?? false,
      },
    });
  } else {
    category = await prisma.category.create({
      data: {
        type: data.type,
        parentId: data.parentId,
        name: cleanName,
        slug: cleanSlug,
        description: data.description?.trim(),
        heroImageUrl: data.heroImageUrl,
        iconUrl: data.iconUrl,
        active: data.active ?? true,
        showInNav: data.showInNav ?? true,
        showOnHomeQuickAccess: data.showOnHomeQuickAccess ?? false,
        showAsHomeDesk: data.showAsHomeDesk ?? false,
      },
    });
  }

  revalidatePath("/admin/taxonomy");
  revalidatePath("/");
  return { success: true, category };
}

// 4. Merge Topic or Category (FR-TAX-01)
export async function mergeCategories(sourceId: string, targetId: string) {
  if (sourceId === targetId) {
    return { success: false, error: "Source and target categories cannot be the same." };
  }

  const source = await prisma.category.findUnique({
    where: { id: sourceId },
  });
  const target = await prisma.category.findUnique({
    where: { id: targetId },
  });

  if (!source || !target) {
    return { success: false, error: "Categories not found." };
  }

  // Move content items from source to target
  await prisma.contentItem.updateMany({
    where: { topicId: sourceId },
    data: { topicId: targetId },
  });

  await prisma.contentItem.updateMany({
    where: { subtopicId: sourceId },
    data: { subtopicId: targetId },
  });

  await prisma.contentItem.updateMany({
    where: { sectionCategoryId: sourceId },
    data: { sectionCategoryId: targetId },
  });

  // Deactivate source category
  await prisma.category.update({
    where: { id: sourceId },
    data: { active: false, showInNav: false },
  });

  await prisma.activityLog.create({
    data: {
      action: `Merged category ${source.name} into ${target.name} (FR-TAX-01)`,
      targetType: "Category",
      targetId: sourceId,
      result: "SUCCESS",
    },
  });

  revalidatePath("/admin/taxonomy");
  revalidatePath("/");
  return { success: true };
}

// 5. Save or Rename Tag
export async function saveTag(name: string, id?: string) {
  const cleanName = name.trim();
  const cleanSlug = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  let tag;
  if (id) {
    tag = await prisma.tag.update({
      where: { id },
      data: { name: cleanName, slug: cleanSlug },
    });
  } else {
    tag = await prisma.tag.create({
      data: { name: cleanName, slug: cleanSlug },
    });
  }

  revalidatePath("/admin/taxonomy");
  return { success: true, tag };
}

// 6. Delete Tag if usage is 0
export async function deleteTag(id: string) {
  const usageCount = await prisma.contentTag.count({
    where: { tagId: id },
  });

  if (usageCount > 0) {
    return {
      success: false,
      error: `Cannot delete tag with ${usageCount} active content associations. Merge instead.`,
    };
  }

  await prisma.tag.delete({
    where: { id },
  });

  revalidatePath("/admin/taxonomy");
  return { success: true };
}

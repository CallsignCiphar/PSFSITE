"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Ensure seed countries and status layers exist if empty
export async function ensureSeedGlobalWatch() {
  // Ensure Regions & Countries
  let pkRegion = await prisma.region.findFirst({
    where: { name: "South Asia" },
  });
  if (!pkRegion) {
    pkRegion = await prisma.region.create({
      data: { name: "South Asia" },
    });
  }

  let middleEast = await prisma.region.findFirst({
    where: { name: "Middle East" },
  });
  if (!middleEast) {
    middleEast = await prisma.region.create({
      data: { name: "Middle East" },
    });
  }

  let pkCountry = await prisma.country.findFirst({
    where: { iso2: "PK" },
  });
  if (!pkCountry) {
    pkCountry = await prisma.country.create({
      data: {
        iso2: "PK",
        name: "Pakistan",
        regionId: pkRegion.id,
        lat: 30.3753,
        lng: 69.3451,
      },
    });
  }

  let irCountry = await prisma.country.findFirst({
    where: { iso2: "IR" },
  });
  if (!irCountry) {
    irCountry = await prisma.country.create({
      data: {
        iso2: "IR",
        name: "Iran",
        regionId: middleEast.id,
        lat: 32.4279,
        lng: 53.688,
      },
    });
  }

  const entriesCount = await prisma.statusLayerEntry.count();
  if (entriesCount > 0) return;

  const today = new Date();
  const nextMonth = new Date(Date.now() + 30 * 24 * 3600 * 1000);

  // Seed status layers
  await prisma.statusLayerEntry.create({
    data: {
      countryId: pkCountry.id,
      areaName: "Line of Control / Northern Sector",
      status: "ACTIVE_CONFLICT",
      note: "Intermittent tactical skirmishes and heightened aerial combat air patrol screening along forward deployment corridors.",
      startsOn: today,
      reviewBy: nextMonth,
    },
  });

  await prisma.statusLayerEntry.create({
    data: {
      countryId: irCountry.id,
      areaName: "Strait of Hormuz Littoral",
      status: "HIGH_TENSION",
      note: "Elevated electronic surveillance and maritime interdiction patrols across commercial shipping choke points.",
      startsOn: today,
      reviewBy: nextMonth,
    },
  });
}

// 1. Get Status Layer Entries
export async function getStatusLayerEntries() {
  await ensureSeedGlobalWatch();

  const entries = await prisma.statusLayerEntry.findMany({
    include: {
      country: {
        include: {
          region: true,
        },
      },
    },
    orderBy: [{ endedOn: "asc" }, { startsOn: "desc" }],
  });

  return entries.map((e) => ({
    id: e.id,
    countryName: e.country.name,
    countryIso2: e.country.iso2,
    regionName: e.country.region.name,
    areaName: e.areaName || "National Border",
    status: e.status,
    note: e.note,
    startsOn: e.startsOn.toISOString().slice(0, 10),
    reviewBy: e.reviewBy.toISOString().slice(0, 10),
    endedOn: e.endedOn ? e.endedOn.toISOString().slice(0, 10) : null,
    isExpired: new Date(e.reviewBy) < new Date(),
  }));
}

// 2. Save or Update Status Layer Entry (Modal 34)
export async function saveStatusLayerEntry(data: {
  id?: string;
  countryIso2: string;
  areaName: string;
  status: "ACTIVE_CONFLICT" | "HIGH_TENSION" | "WATCH";
  note: string;
  startsOn: string;
  reviewBy: string;
}) {
  const country = await prisma.country.findFirst({
    where: { iso2: data.countryIso2.toUpperCase() },
  });

  if (!country) {
    return { success: false, error: "Country not found." };
  }

  let entry;

  if (data.id) {
    entry = await prisma.statusLayerEntry.update({
      where: { id: data.id },
      data: {
        countryId: country.id,
        areaName: data.areaName.trim(),
        status: data.status,
        note: data.note.trim(),
        startsOn: new Date(data.startsOn),
        reviewBy: new Date(data.reviewBy),
      },
    });
  } else {
    entry = await prisma.statusLayerEntry.create({
      data: {
        countryId: country.id,
        areaName: data.areaName.trim(),
        status: data.status,
        note: data.note.trim(),
        startsOn: new Date(data.startsOn),
        reviewBy: new Date(data.reviewBy),
      },
    });
  }

  await prisma.activityLog.create({
    data: {
      action: `Saved Global Watch status entry for ${country.name} (${data.status})`,
      targetType: "StatusLayerEntry",
      targetId: entry.id,
      result: "SUCCESS",
    },
  });

  revalidatePath("/admin/global-watch");
  revalidatePath("/global-watch");
  revalidatePath("/");

  return { success: true, entry };
}

// 3. End Status Layer Entry
export async function endStatusLayerEntry(id: string) {
  await prisma.statusLayerEntry.update({
    where: { id },
    data: { endedOn: new Date() },
  });

  revalidatePath("/admin/global-watch");
  revalidatePath("/global-watch");
  return { success: true };
}

// 4. Get Coverage Health & Stats
export async function getGlobalWatchCoverageHealth() {
  const totalContent = await prisma.contentItem.count({
    where: { status: "PUBLISHED" },
  });

  const activeLayers = await prisma.statusLayerEntry.count({
    where: { endedOn: null },
  });

  return {
    totalGeocodedContent: totalContent,
    itemsWithoutCoordinates: 0,
    activeThreatLayers: activeLayers,
    topLocations: [
      { name: "Islamabad, Pakistan", count: 84 },
      { name: "Kashmir Line of Control", count: 62 },
      { name: "Karachi Naval Base", count: 41 },
      { name: "Kamra Aeronautical Complex", count: 35 },
      { name: "Strait of Hormuz", count: 28 },
    ],
  };
}

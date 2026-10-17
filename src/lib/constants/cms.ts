export interface PublicPageItem {
  key: string;
  title: string;
  path: string;
  category: "Core Portal" | "Editorial Hub" | "Institutional & Legal" | "System Utility";
  status: "PUBLISHED" | "DRAFT_PENDING";
  sectionsCount: number;
  lastEditedBy: string;
  updatedAt: string;
}

export const PUBLIC_PAGES_SEED: PublicPageItem[] = [
  {
    key: "home",
    title: "Public Home Page",
    path: "/",
    category: "Core Portal",
    status: "PUBLISHED",
    sectionsCount: 14,
    lastEditedBy: "Dr. Tariq Niazi",
    updatedAt: "2026-10-17T20:15:00Z",
  },
  {
    key: "about",
    title: "About Us & Institutional Mandate",
    path: "/about",
    category: "Institutional & Legal",
    status: "PUBLISHED",
    sectionsCount: 6,
    lastEditedBy: "Ayesha Siddiqui",
    updatedAt: "2026-10-15T14:30:00Z",
  },
  {
    key: "editorial-policy",
    title: "Editorial & Peer Review Policy",
    path: "/editorial-policy",
    category: "Institutional & Legal",
    status: "PUBLISHED",
    sectionsCount: 5,
    lastEditedBy: "Dr. Tariq Niazi",
    updatedAt: "2026-10-16T11:00:00Z",
  },
  {
    key: "topics",
    title: "Strategic Desks & Topics Hub",
    path: "/topics",
    category: "Editorial Hub",
    status: "PUBLISHED",
    sectionsCount: 4,
    lastEditedBy: "Ayesha Siddiqui",
    updatedAt: "2026-10-14T09:45:00Z",
  },
  {
    key: "reports",
    title: "Special Reports & Monograph Hub",
    path: "/reports",
    category: "Editorial Hub",
    status: "PUBLISHED",
    sectionsCount: 5,
    lastEditedBy: "Hamza Ali",
    updatedAt: "2026-10-16T16:20:00Z",
  },
  {
    key: "research",
    title: "Academic Research Journal Hub",
    path: "/research",
    category: "Editorial Hub",
    status: "DRAFT_PENDING",
    sectionsCount: 6,
    lastEditedBy: "Dr. Tariq Niazi",
    updatedAt: "2026-10-18T01:10:00Z",
  },
  {
    key: "newsroom",
    title: "Newsroom Wire Index",
    path: "/newsroom",
    category: "Editorial Hub",
    status: "PUBLISHED",
    sectionsCount: 3,
    lastEditedBy: "Ayesha Siddiqui",
    updatedAt: "2026-10-18T02:00:00Z",
  },
  {
    key: "global-watch",
    title: "Global Watch 3D Conflict Tracker",
    path: "/global-watch",
    category: "Core Portal",
    status: "PUBLISHED",
    sectionsCount: 4,
    lastEditedBy: "Dr. Tariq Niazi",
    updatedAt: "2026-10-17T22:30:00Z",
  },
  {
    key: "contact",
    title: "Contact & Institutional Inquiries",
    path: "/contact",
    category: "Institutional & Legal",
    status: "PUBLISHED",
    sectionsCount: 4,
    lastEditedBy: "Ayesha Siddiqui",
    updatedAt: "2026-10-12T10:00:00Z",
  },
  {
    key: "privacy",
    title: "Privacy & Data Protection Policy",
    path: "/privacy",
    category: "Institutional & Legal",
    status: "PUBLISHED",
    sectionsCount: 3,
    lastEditedBy: "Legal Directorate",
    updatedAt: "2026-09-20T12:00:00Z",
  },
  {
    key: "terms",
    title: "Terms of Service & Usage",
    path: "/terms",
    category: "Institutional & Legal",
    status: "PUBLISHED",
    sectionsCount: 3,
    lastEditedBy: "Legal Directorate",
    updatedAt: "2026-09-20T12:00:00Z",
  },
  {
    key: "contributor-agreement",
    title: "Contributor & Author Agreement",
    path: "/contributor-agreement",
    category: "Institutional & Legal",
    status: "PUBLISHED",
    sectionsCount: 4,
    lastEditedBy: "Legal Directorate",
    updatedAt: "2026-10-01T08:00:00Z",
  },
];

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  type: "IMAGE" | "PDF" | "VECTOR";
  dimensions: string;
  fileSizeBytes: number;
  altText: string;
  credit: string;
  usageCount: number;
  usedInPages: string[];
  uploadedBy: string;
  createdAt: string;
}

export const MEDIA_ASSETS_SEED: MediaAsset[] = [
  {
    id: "med-01",
    name: "psf-official-crest-gold.svg",
    url: "/images/crest.svg",
    type: "VECTOR",
    dimensions: "512 × 512 px",
    fileSizeBytes: 48200,
    altText: "Pakistan Strategic Forum Official Institutional Crest",
    credit: "PSF Brand Directorate",
    usageCount: 8,
    usedInPages: ["Home", "Header", "Footer", "ID Cards", "About"],
    uploadedBy: "Dr. Tariq Niazi",
    createdAt: "2026-08-01T10:00:00Z",
  },
  {
    id: "med-02",
    name: "jf-17-block-3-sensor-mast.webp",
    url: "/images/mock-jf17.jpg",
    type: "IMAGE",
    dimensions: "2400 × 1600 px",
    fileSizeBytes: 245000,
    altText: "PAF JF-17C Block III aircraft during high-altitude patrol",
    credit: "PAF Strategic Communications / Public Domain",
    usageCount: 4,
    usedInPages: ["Articles", "Featured Slots", "Home Hero"],
    uploadedBy: "Ayesha Siddiqui",
    createdAt: "2026-10-10T14:30:00Z",
  },
  {
    id: "med-03",
    name: "psf-special-report-naval-modernisation-2026.pdf",
    url: "/downloads/psf-sr-naval-2026.pdf",
    type: "PDF",
    dimensions: "A4 (42 Pages)",
    fileSizeBytes: 4200000,
    altText: "Special Monograph: Maritime Doctrine and Subsurface Deterrence",
    credit: "PSF Maritime Desk",
    usageCount: 2,
    usedInPages: ["Special Reports", "Reports Hub"],
    uploadedBy: "Dr. Tariq Niazi",
    createdAt: "2026-10-15T11:00:00Z",
  },
  {
    id: "med-04",
    name: "indo-pacific-geopolitical-map.webp",
    url: "/images/mock-map.jpg",
    type: "IMAGE",
    dimensions: "1920 × 1080 px",
    fileSizeBytes: 180000,
    altText: "Littoral maritime chokepoints across the Indian Ocean Region",
    credit: "PSF Cartography Desk",
    usageCount: 3,
    usedInPages: ["Global Watch", "Topics Hub"],
    uploadedBy: "Hamza Ali",
    createdAt: "2026-10-12T09:15:00Z",
  },
  {
    id: "med-05",
    name: "rawalpindi-hq-briefing-room.webp",
    url: "/images/mock-briefing.jpg",
    type: "IMAGE",
    dimensions: "1600 × 900 px",
    fileSizeBytes: 120000,
    altText: "PSF Senior Academic Fellows Round Table Consultation",
    credit: "PSF Media Archive",
    usageCount: 2,
    usedInPages: ["About Us", "Editorial Policy"],
    uploadedBy: "Ayesha Siddiqui",
    createdAt: "2026-09-18T16:00:00Z",
  },
];

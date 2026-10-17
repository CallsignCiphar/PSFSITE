export interface PermissionDefinition {
  key: string;
  group: string;
  description: string;
}

export const PERMISSION_GROUPS: { name: string; permissions: PermissionDefinition[] }[] = [
  {
    name: "Dashboard & Analytics",
    permissions: [
      { key: "dashboard.view", group: "Dashboard", description: "Access admin Overview dashboard" },
      { key: "analytics.view", group: "Dashboard", description: "View platform and content Analytics module" },
      { key: "analytics.export", group: "Dashboard", description: "Export analytics CSV and PDF summaries" },
    ],
  },
  {
    name: "User & Access Management",
    permissions: [
      { key: "users.view", group: "Users", description: "View user list and contributor profiles" },
      { key: "users.create", group: "Users", description: "Create users directly via invitation email" },
      { key: "users.edit", group: "Users", description: "Edit user profile designations and institutional metadata" },
      { key: "users.assign_roles", group: "Users", description: "Grant or revoke user role assignments" },
      { key: "users.deactivate", group: "Users", description: "Temporarily deactivate and reactivate user accounts" },
      { key: "users.ban", group: "Users", description: "Permanently ban users and revoke all credentials" },
      { key: "users.view_ip", group: "Users", description: "Inspect IP addresses and geolocation on users and submissions" },
      { key: "users.impersonate_view", group: "Users", description: "View the contributor portal as the user (read-only)" },
    ],
  },
  {
    name: "Contributor Applications",
    permissions: [
      { key: "applications.view", group: "Applications", description: "View pending and past contributor track applications" },
      { key: "applications.decide", group: "Applications", description: "Approve or return applications with feedback" },
      { key: "applications.reject_permanent", group: "Applications", description: "Permanently reject applicant and blocklist email address" },
    ],
  },
  {
    name: "Roles & RBAC",
    permissions: [
      { key: "roles.view", group: "Roles", description: "View system and custom roles catalogue" },
      { key: "roles.manage", group: "Roles", description: "Create, edit, duplicate, and delete custom roles" },
    ],
  },
  {
    name: "Articles",
    permissions: [
      { key: "articles.submit", group: "Articles", description: "Create and submit own long-form articles" },
      { key: "articles.view_all", group: "Articles", description: "View all articles across all statuses in admin" },
      { key: "articles.edit_any", group: "Articles", description: "Edit any article with versioning tracking" },
      { key: "articles.decide", group: "Articles", description: "Approve, request changes, or reject article manuscripts" },
      { key: "articles.publish", group: "Articles", description: "Publish immediately, schedule, or unpublish articles" },
      { key: "articles.delete", group: "Articles", description: "Soft delete and restore articles" },
    ],
  },
  {
    name: "Special Reports",
    permissions: [
      { key: "reports.submit", group: "Reports", description: "Create and submit own Special Reports" },
      { key: "reports.view_all", group: "Reports", description: "View all Special Reports across all statuses in admin" },
      { key: "reports.edit_any", group: "Reports", description: "Edit any Special Report with versioning tracking" },
      { key: "reports.decide", group: "Reports", description: "Approve, request changes, or reject Special Reports" },
      { key: "reports.publish", group: "Reports", description: "Publish immediately, schedule, or unpublish Special Reports" },
      { key: "reports.delete", group: "Reports", description: "Soft delete and restore Special Reports" },
    ],
  },
  {
    name: "Research Papers & Peer Review",
    permissions: [
      { key: "research.submit", group: "Research", description: "Create and submit own academic research papers" },
      { key: "research.review", group: "Research", description: "Complete blind peer review for assigned research papers" },
      { key: "research.view_all", group: "Research", description: "View all research papers in editorial queue" },
      { key: "research.screen", group: "Research", description: "Desk-reject or accept research papers for double-blind review" },
      { key: "research.assign", group: "Research", description: "Assign and replace independent peer review approvers" },
      { key: "research.final_decide", group: "Research", description: "Make final editorial acceptance or rejection decisions" },
      { key: "research.publish", group: "Research", description: "Publish research papers, assign DOI, volume and issue" },
      { key: "research.delete", group: "Research", description: "Soft delete and restore research papers" },
      { key: "research.see_identities", group: "Research", description: "Inspect author identities during peer review (admins only)" },
    ],
  },
  {
    name: "Newsroom Wire",
    permissions: [
      { key: "newsroom.manage", group: "Newsroom", description: "Create, edit, pin, dispatch, and delete newsroom wire dispatches" },
    ],
  },
  {
    name: "Featured & Placement Engine",
    permissions: [
      { key: "featured.manage", group: "Featured", description: "Schedule and manage top stories and slot placements" },
    ],
  },
  {
    name: "Taxonomy & Desks",
    permissions: [
      { key: "taxonomy.manage", group: "Taxonomy", description: "Create and merge topics, subtopics, categories, and tags" },
    ],
  },
  {
    name: "Global Watch",
    permissions: [
      { key: "globe.manage", group: "Global Watch", description: "Manage conflict status layer entries and 3D globe settings" },
    ],
  },
  {
    name: "Ad Campaigns & Commercial",
    permissions: [
      { key: "ads.view", group: "Ads", description: "View commercial campaigns and flight schedules" },
      { key: "ads.manage", group: "Ads", description: "Create, edit, pause, and archive commercial ad bookings" },
      { key: "ads.export", group: "Ads", description: "Download campaign performance analytics reports" },
    ],
  },
  {
    name: "Unified Communications Inbox",
    permissions: [
      { key: "inbox.view", group: "Inbox", description: "Read contact, corrections, and advertising submissions" },
      { key: "inbox.manage", group: "Inbox", description: "Dispatch replies, assign messages, and manage internal notes" },
    ],
  },
  {
    name: "Staff Verification ID Cards",
    permissions: [
      { key: "cards.view", group: "ID Cards", description: "Inspect verified staff credential cards and QR codes" },
      { key: "cards.manage", group: "ID Cards", description: "Generate, activate, and deactivate staff ID credentials" },
    ],
  },
  {
    name: "CMS & Design System",
    permissions: [
      { key: "cms.edit", group: "CMS", description: "Edit page content within locked editorial templates" },
      { key: "cms.publish", group: "CMS", description: "Publish CMS revisions live to the public portal" },
      { key: "navigation.manage", group: "CMS", description: "Manage global header navigation, utility bar, and footer links" },
      { key: "media.manage", group: "CMS", description: "Upload, replace, and audit media library assets" },
    ],
  },
  {
    name: "Audit Logs",
    permissions: [
      { key: "logs.view", group: "Logs", description: "View immutable platform activity and security logs" },
      { key: "logs.export", group: "Logs", description: "Export activity log data as authenticated CSV archives" },
    ],
  },
  {
    name: "System Governance & Settings",
    permissions: [
      { key: "settings.manage", group: "Settings", description: "Manage system policies, email templates, integrations, and maintenance mode" },
    ],
  },
];

export const ALL_PERMISSIONS: PermissionDefinition[] = PERMISSION_GROUPS.flatMap((g) => g.permissions);

export const SEED_ROLES = [
  {
    name: "SUPER_ADMIN",
    displayName: "Super Administrator",
    description: "Unrestricted master authority across all editorial, commercial, technical, and governance engines.",
    chipColour: "gold",
    isSystem: true,
    permissions: ALL_PERMISSIONS.map((p) => p.key),
  },
  {
    name: "ADMIN",
    displayName: "Platform Administrator",
    description: "Operational leadership with full editorial, taxonomy, user administration, and newsroom wire controls.",
    chipColour: "green",
    isSystem: true,
    permissions: ALL_PERMISSIONS.filter(
      (p) => !["roles.manage", "logs.view", "logs.export", "settings.manage"].includes(p.key)
    ).map((p) => p.key),
  },
  {
    name: "APPROVER",
    displayName: "Editorial Approver & Reviewer",
    description: "Senior editorial board and academic referee authorised for double-blind peer review and manuscript screening.",
    chipColour: "navy",
    isSystem: true,
    permissions: [
      "articles.submit",
      "reports.submit",
      "research.review",
      "research.submit",
    ],
  },
  {
    name: "SENIOR_CONTRIBUTOR",
    displayName: "Senior Institutional Contributor",
    description: "Accredited military, diplomatic, or academic fellow with elevated manuscript submission rights.",
    chipColour: "steel",
    isSystem: true,
    permissions: [
      "articles.submit",
      "reports.submit",
      "research.submit",
    ],
  },
  {
    name: "CONTRIBUTOR",
    displayName: "Accredited Contributor",
    description: "Standard accredited contributor authorised to draft and submit articles for desk review.",
    chipColour: "slate",
    isSystem: true,
    permissions: ["articles.submit", "reports.submit"],
  },
  {
    name: "EXPERT",
    displayName: "Guest Subject Matter Expert",
    description: "Specialist contributor invited for designated strategic analyses and commentary pieces.",
    chipColour: "amber",
    isSystem: true,
    permissions: ["articles.submit", "reports.submit"],
  },
];

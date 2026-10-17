export interface EmailTemplate {
  key: string;
  name: string;
  category: "Auth" | "Editorial" | "Peer Review" | "Commercial";
  subject: string;
  body: string;
  variables: string[];
}

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    key: "WELCOME_CONTRIBUTOR",
    name: "Welcome Accredited Contributor",
    category: "Auth",
    subject: "Welcome to Pakistan Strategic Forum — Your Contributor Credentials",
    body: `Dear {{firstName}},

We are pleased to inform you that your contributor application to Pakistan Strategic Forum has been approved by the Editorial Board.

Your account is now active under the {{roleName}} designation. You may sign in to the PSF Contributor Portal to draft and submit manuscripts:
{{actionUrl}}

Institutional Contributor Guidelines:
- Strict double-blind peer review protocols apply to all academic submissions.
- Citations must adhere to PSF Defence & Strategic Studies standards.

Editorial Board
Pakistan Strategic Forum`,
    variables: ["firstName", "roleName", "actionUrl"],
  },
  {
    key: "PEER_REVIEW_ASSIGNED",
    name: "Double-Blind Peer Review Assigned",
    category: "Peer Review",
    subject: "Confidential Review Assignment: PSF Research Paper #{{paperId}}",
    body: `Dear Approver,

You have been assigned as an independent referee for an anonymised manuscript submitted to the Pakistan Strategic Forum Research Journal:

Title: "{{itemTitle}}"
Discipline: {{discipline}}
Review Deadline: {{dueDate}} (Strict PKT)

To preserve double-blind integrity, all author metadata has been stripped. Please access the secure referee evaluation portal:
{{actionUrl}}

PSF Research Editorial Committee`,
    variables: ["paperId", "itemTitle", "discipline", "dueDate", "actionUrl"],
  },
  {
    key: "MANUSCRIPT_CHANGES_REQUESTED",
    name: "Editorial Changes Requested",
    category: "Editorial",
    subject: "Editorial Review: Changes Requested for '{{itemTitle}}'",
    body: `Dear {{firstName}},

The PSF Editorial Desk has reviewed your manuscript "{{itemTitle}}".

The editor has requested revisions before publication. Please review the specific feedback and line notes in the portal:
"{{editorComments}}"

You may submit your revised draft directly at:
{{actionUrl}}

Regards,
Editorial Desk
Pakistan Strategic Forum`,
    variables: ["firstName", "itemTitle", "editorComments", "actionUrl"],
  },
  {
    key: "APPLICATION_RETURNED",
    name: "Application Returned for Clarification",
    category: "Auth",
    subject: "PSF Contributor Application: Information Required",
    body: `Dear {{firstName}},

Thank you for your application to Pakistan Strategic Forum. Our credential verification committee has reviewed your submission and requires additional details:

"{{committeeNotes}}"

Please log in to your pending application to update the requested information:
{{actionUrl}}

Membership Committee
Pakistan Strategic Forum`,
    variables: ["firstName", "committeeNotes", "actionUrl"],
  },
  {
    key: "PASSWORD_RESET",
    name: "Password Reset Request",
    category: "Auth",
    subject: "Security Notification: Password Reset for PSF Account",
    body: `Hello {{firstName}},

A password reset request was initiated for your Pakistan Strategic Forum account.

If you initiated this request, please set a new password within 30 minutes:
{{actionUrl}}

If you did not request this, please notify PSF Security Administration immediately.

PSF Security Directorate`,
    variables: ["firstName", "actionUrl"],
  },
  {
    key: "AD_CAMPAIGN_SCHEDULED",
    name: "Commercial Campaign Booking Confirmation",
    category: "Commercial",
    subject: "Booking Confirmation: Campaign {{campaignNumber}} ({{brandName}})",
    body: `Dear {{contactName}},

Your commercial sponsorship placement on Pakistan Strategic Forum has been verified and confirmed.

Campaign: {{campaignNumber}}
Brand: {{brandName}}
Placement Slot: {{slotName}}
Flight Dates: {{startsAt}} to {{endsAt}}

Your verified flight tracking report is accessible at:
{{actionUrl}}

Commercial & Strategic Partnerships Desk
Pakistan Strategic Forum`,
    variables: ["contactName", "campaignNumber", "brandName", "slotName", "startsAt", "endsAt", "actionUrl"],
  },
];

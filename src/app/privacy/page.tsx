import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Pakistan Strategic Forum",
  description: "Privacy and personal data protection policy governing reader data, contributor applications, and telemetry at Pakistan Strategic Forum.",
};

const privacySections = [
  {
    num: "1",
    title: "Commitment to Data Privacy",
    text: "Pakistan Strategic Forum ('PSF', 'we', 'our') is committed to protecting the privacy, confidentiality, and institutional anonymity of our readers, accredited contributors, peer review referees, and commercial partners. This policy outlines how information is collected, processed, and safeguarded across all PSF digital platforms.",
  },
  {
    num: "2",
    title: "Data Collected from Readers and Visitors",
    text: "We collect minimal diagnostic telemetry necessary for secure delivery and regional analytical reporting. This includes truncated IP addresses, country-level geolocation derived from MaxMind GeoIP databases, device categories (desktop/mobile), and non-identifying read-event telemetry. We do not sell, rent, or commercialise visitor browsing data with third-party ad brokers.",
  },
  {
    num: "3",
    title: "Contributor & Peer Reviewer Identity Data",
    text: "Authors submitting manuscripts and peer reviewers evaluating submissions provide professional designations, institutional affiliations, contact emails, and national identity credentials (CNIC or Passport for accreditation). These documents are stored in secure private storage buckets and subjected to mandatory 30-day auto-purge cycles post-verification.",
  },
  {
    num: "4",
    title: "Double-Blind Anonymity Integrity",
    text: "To preserve academic rigour in research peer review, author identities and private affiliation records are strictly segregated from referee review consoles. Referees never receive author identity data, and author accounts cannot inspect referee identities.",
  },
  {
    num: "5",
    title: "Data Retention & Automated Purge Schedules",
    text: "Raw IP records are retained for a maximum of 90 days before truncation. Contributor application identity documents are permanently shredded after 30 days. Soft-deleted content is completely expunged after 30 days. Immutable activity audit logs are retained online for 2 years (730 days) before archiving.",
  },
  {
    num: "6",
    title: "Your Rights & Data Subject Requests",
    text: "You have the right to request access to the personal data we hold about you, request rectification of factual inaccuracies, or request permanent deletion of your contributor profile (subject to preservation of published editorial archives). Requests may be submitted via legal@forumstrategic.com.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-paper py-12 font-sans">
      <div className="max-w-container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <article className="lg:col-span-8 flex flex-col">
            <div className="pb-6 border-b border-line mb-8">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-green-700 block mb-1">
                Institutional Governance
              </span>
              <h1 className="font-serif font-bold text-3xl sm:text-4xl text-ink-900 mb-2">
                Privacy & Data Protection Policy
              </h1>
              <p className="font-serif text-xs text-ink-500">
                Effective Date: 1 October 2026 · Version 1.2.0 · Governed by PSF Legal Directorate
              </p>
            </div>

            <div className="space-y-8 font-serif text-[18px] leading-[1.65] text-ink-900 max-w-[720px]">
              {privacySections.map((sec) => (
                <section key={sec.num} className="pt-4 border-t border-line first:border-t-0 first:pt-0">
                  <h3 className="font-serif font-bold text-xl text-ink-900 mb-2">
                    {sec.num}. {sec.title}
                  </h3>
                  <p className="text-ink-700 leading-relaxed text-base">
                    {sec.text}
                  </p>
                </section>
              ))}
            </div>

            <div className="mt-12 pt-6 border-t border-line text-xs font-sans text-ink-500 flex items-center justify-between">
              <span>Related: <Link href="/cookies" className="text-green-700 underline">Cookie Policy</Link> · <Link href="/terms" className="text-green-700 underline">Terms of Service</Link></span>
              <Link href="/contact" className="text-green-700 font-semibold hover:underline">Contact Data Protection Officer →</Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

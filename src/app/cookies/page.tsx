import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Cookie Policy | Pakistan Strategic Forum",
  description: "Information regarding cookie categories, session management, and consent preferences on Pakistan Strategic Forum.",
};

const cookieTable = [
  {
    name: "psf_session",
    purpose: "Maintains authenticated contributor and referee session identity.",
    duration: "12 hours (Session) / 30 days (Remember Me)",
    category: "Strictly Necessary",
  },
  {
    name: "psf_consent_v1",
    purpose: "Stores user cookie consent preference status to prevent recurring banners.",
    duration: "1 year",
    category: "Strictly Necessary",
  },
  {
    name: "cf_clearance",
    purpose: "Cloudflare Turnstile security token verifying human visitors and mitigating DDoS.",
    duration: "1 day",
    category: "Security & Anti-Bot",
  },
  {
    name: "psf_analytics_read",
    purpose: "Aggregated, non-identifying read-event counter for article and report engagement metrics.",
    duration: "24 hours",
    category: "Analytical",
  },
];

export default function CookiePolicyPage() {
  return (
    <div className="w-full bg-paper py-12 font-sans">
      <div className="max-w-container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <article className="lg:col-span-8 flex flex-col">
            <div className="pb-6 border-b border-line mb-8">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-green-700 block mb-1">
                Transparency & Governance
              </span>
              <h1 className="font-serif font-bold text-3xl sm:text-4xl text-ink-900 mb-2">
                Cookie & Telemetry Policy
              </h1>
              <p className="font-serif text-xs text-ink-500">
                Active Policy Version: v1.2.0 · Governed by PSF Digital Infrastructure Desk
              </p>
            </div>

            <div className="space-y-6 font-serif text-[18px] leading-[1.65] text-ink-900 max-w-[720px]">
              <p className="text-ink-700 text-base">
                Pakistan Strategic Forum uses cookies and local browser storage to secure authentication,
                safeguard the platform against malicious scraping bots, and measure aggregate readership without
                commercial behavioral profiling.
              </p>

              <h3 className="font-serif font-bold text-xl text-ink-900 pt-4 border-t border-line">
                Active Cookie Inventory
              </h3>

              <div className="border border-line rounded-sm overflow-hidden my-4 not-prose font-sans text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-ivory-50 border-b border-line text-[11px] font-bold uppercase tracking-wider text-ink-700">
                      <th className="py-2.5 px-3">Cookie Name</th>
                      <th className="py-2.5 px-3">Purpose</th>
                      <th className="py-2.5 px-3">Duration</th>
                      <th className="py-2.5 px-3">Category</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {cookieTable.map((c) => (
                      <tr key={c.name} className="hover:bg-ivory-50/50">
                        <td className="py-2 px-3 font-mono font-bold text-ink-900">
                          {c.name}
                        </td>
                        <td className="py-2 px-3 text-ink-700">
                          {c.purpose}
                        </td>
                        <td className="py-2 px-3 font-mono text-[11px] text-ink-600">
                          {c.duration}
                        </td>
                        <td className="py-2 px-3">
                          <span className="px-1.5 py-0.2 bg-ivory-100 border border-line rounded-sm text-[10px] font-semibold text-ink-800">
                            {c.category}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="font-serif font-bold text-xl text-ink-900 pt-4 border-t border-line">
                Managing Your Preferences
              </h3>
              <p className="text-ink-700 text-base">
                You can configure your browser to reject all non-essential cookies. Please note that disabling
                strictly necessary session cookies will prevent login to the Contributor Portal and Review Evaluation queues.
              </p>
            </div>

            <div className="mt-12 pt-6 border-t border-line text-xs font-sans text-ink-500 flex items-center justify-between">
              <span>Related: <Link href="/privacy" className="text-green-700 underline">Privacy Policy</Link> · <Link href="/terms" className="text-green-700 underline">Terms of Service</Link></span>
              <Link href="/contact" className="text-green-700 font-semibold hover:underline">Inquire About Privacy →</Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

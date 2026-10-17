import React from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export const metadata = {
  title: "ID Verification | Pakistan Strategic Forum",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function VerifyIdCardPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  // Lookup card by tokenHash in database
  let card = null;
  try {
    card = await prisma.idCard.findUnique({
      where: { tokenHash },
    });
  } catch (err) {
    // If database is not connected in build/mock time, card remains null
  }

  // Demonstration fallback for prototype verification token: "demo-valid-token-2026"
  const isDemo = token === "demo-valid-token-2026";
  const isValid = card?.active ?? isDemo;
  const isFound = card !== null || isDemo;

  const cardId = card?.cardId || "PSF-STAFF-0482";
  const designation = card?.designation || "Senior Research Fellow, Strategic Affairs";

  const verifiedTime = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Karachi",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date()) + " PKT";

  return (
    <div className="min-h-screen w-full bg-ivory-50 flex flex-col justify-between py-12 px-4 select-none">
      <div />

      {/* Verification Card */}
      <div className="w-full max-w-md mx-auto bg-white border border-line rounded-card shadow-level2 p-8 text-center">
        {/* PSF Emblem */}
        <div className="w-12 h-12 rounded-full bg-green-700 flex items-center justify-center text-white border border-green-800 shadow-sm mx-auto mb-6">
          <span className="font-serif font-bold text-base" style={{ color: "var(--logo-gold)" }}>
            PSF
          </span>
        </div>

        {isFound && isValid ? (
          /* ACTIVE / VALID STATE */
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 stroke-[2]" />
            </div>

            <div>
              <h2 className="font-serif font-bold text-2xl text-ink-900">Official Staff ID Verified</h2>
              <p className="font-serif text-sm text-ink-700 mt-1 leading-relaxed">
                This credential was issued by Pakistan Strategic Forum and is currently active and valid.
              </p>
            </div>

            <div className="p-4 bg-ivory-50 border border-line rounded-card text-left space-y-2 text-xs font-sans">
              <div className="flex justify-between py-1 border-b border-line">
                <span className="text-ink-500">Card ID</span>
                <span className="font-mono font-bold text-ink-900">{cardId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-line">
                <span className="text-ink-500">Designation</span>
                <span className="font-semibold text-ink-900">{designation}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-line">
                <span className="text-ink-500">Issuing Organization</span>
                <span className="font-medium text-ink-900">Pakistan Strategic Forum</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-ink-500">Verification Timestamp</span>
                <span className="font-medium text-green-700">{verifiedTime}</span>
              </div>
            </div>
          </div>
        ) : isFound && !isValid ? (
          /* INACTIVE / REVOKED STATE */
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-danger-50 text-danger-700 flex items-center justify-center mx-auto">
              <XCircle className="w-10 h-10 stroke-[2]" />
            </div>

            <div>
              <h2 className="font-serif font-bold text-2xl text-danger-700">Not Valid</h2>
              <p className="font-serif text-sm text-ink-700 mt-1 leading-relaxed">
                This card is not currently active. If you were presented with this credential, please contact PSF administration immediately.
              </p>
            </div>

            <div className="p-3 bg-ivory-50 border border-line rounded-card text-xs font-sans">
              <span className="text-ink-500">Card ID:</span>{" "}
              <span className="font-mono font-bold text-ink-900">{cardId}</span>
            </div>
          </div>
        ) : (
          /* UNKNOWN / INVALID TOKEN STATE */
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-ivory-100 text-ink-500 flex items-center justify-center mx-auto">
              <HelpCircle className="w-10 h-10 stroke-[2]" />
            </div>

            <div>
              <h2 className="font-serif font-bold text-2xl text-ink-900">Could Not Verify Card</h2>
              <p className="font-serif text-sm text-ink-700 mt-1 leading-relaxed">
                The verification token is unrecognized or invalid. Please check the QR code or URL and try again.
              </p>
            </div>
          </div>
        )}

        <div className="pt-6 mt-6 border-t border-line text-[11px] font-sans text-ink-400">
          Pakistan Strategic Forum · Secure Credential Registry
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs font-sans text-ink-400">
        © 2019–{new Date().getFullYear()} Pakistan Strategic Forum. All rights reserved.
      </div>
    </div>
  );
}

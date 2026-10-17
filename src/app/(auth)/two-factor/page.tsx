"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";

export default function TwoFactorChallengePage() {
  const [useBackupCode, setUseBackupCode] = useState(false);
  const [code, setCode] = useState("");
  const [backupCode, setBackupCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate 2FA challenge resolution
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/portal";
    }, 600);
  };

  return (
    <AuthShell
      title="Two-Factor Authentication"
      subtitle="Enter the security code from your authenticator application to verify your identity."
    >
      <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto mb-6">
        <ShieldCheck className="w-6 h-6" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!useBackupCode ? (
          <div>
            <label className="block text-xs font-sans font-medium text-ink-900 mb-1 text-center">
              6-Digit Authenticator Code
            </label>
            <input
              type="text"
              required
              maxLength={6}
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              className="w-48 mx-auto block h-12 text-center font-mono font-bold text-2xl tracking-[0.3em] border border-line rounded-input focus:border-green-700 focus:outline-none bg-ivory-50"
            />
          </div>
        ) : (
          <div>
            <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
              8-Character Backup Code
            </label>
            <input
              type="text"
              required
              autoFocus
              value={backupCode}
              onChange={(e) => setBackupCode(e.target.value.toUpperCase())}
              placeholder="A1B2-C3D4"
              className="w-full h-10 px-3 text-center font-mono text-sm border border-line rounded-input focus:border-green-700 focus:outline-none"
            />
          </div>
        )}

        <div className="pt-2">
          <Button type="submit" variant="primary" size="default" className="w-full" isLoading={isLoading}>
            Verify & Continue
          </Button>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs font-sans">
          <button
            type="button"
            onClick={() => setUseBackupCode(!useBackupCode)}
            className="text-green-700 hover:underline"
          >
            {useBackupCode ? "Use authenticator app" : "Use a backup code instead"}
          </button>

          <Link href="/sign-in" className="text-ink-500 hover:text-ink-900 flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Sign in
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}

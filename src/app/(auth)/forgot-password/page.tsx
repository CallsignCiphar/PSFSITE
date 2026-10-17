"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate sending reset link
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter the email associated with your PSF account and we'll send you a password recovery link."
    >
      {isSubmitted ? (
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-lg text-ink-900">Check your inbox</h3>
          <p className="font-serif text-sm text-ink-700 leading-relaxed">
            If an account exists for <span className="font-mono font-medium text-ink-900">{email}</span>, a secure password reset link has been dispatched. The link expires in 60 minutes.
          </p>
          <div className="pt-4">
            <Link href="/sign-in">
              <Button variant="secondary" size="default" className="w-full">
                Return to Sign in
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
              Account Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@organization.com"
              className="w-full h-10 px-3 text-sm font-sans border border-line rounded-input focus:border-green-700 focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" size="default" className="w-full" isLoading={isLoading}>
              Send Reset Link
            </Button>
          </div>

          <div className="pt-4 text-center">
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-1.5 text-xs font-sans text-ink-500 hover:text-green-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to sign in
            </Link>
          </div>
        </form>
      )}
    </AuthShell>
  );
}

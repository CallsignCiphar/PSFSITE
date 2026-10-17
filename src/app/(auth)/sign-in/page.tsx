"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { authenticateUser } from "@/app/actions/auth-actions";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await authenticateUser(email, password);
      if (!res.success) {
        setError(res.error || "Invalid credentials.");
      } else if (res.redirectUrl) {
        router.push(res.redirectUrl);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Sign in to your account"
      subtitle="Access your contributor portal, submission drafts, and review assignments."
    >
      {error && (
        <div className="mb-6 p-3.5 bg-danger-50 border border-danger-700/20 text-danger-700 text-xs font-sans rounded-sm flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
            Email address
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

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-sans font-medium text-ink-900">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-sans text-green-700 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full h-10 px-3 pr-9 text-sm font-sans border border-line rounded-input focus:border-green-700 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 top-2.5 text-ink-400 hover:text-ink-700"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={keepSignedIn}
              onChange={(e) => setKeepSignedIn(e.target.checked)}
              className="rounded-sm border-line text-green-700 focus:ring-green-500"
            />
            <span className="text-xs font-sans text-ink-700">Keep me signed in for 30 days</span>
          </label>
        </div>

        <div className="pt-2">
          <Button type="submit" variant="primary" size="default" className="w-full" isLoading={isLoading}>
            Sign in
          </Button>
        </div>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-line" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-3 font-sans text-ink-400">or</span>
        </div>
      </div>

      <div className="text-center text-xs font-sans text-ink-700">
        New to Pakistan Strategic Forum?{" "}
        <Link href="/join" className="text-green-700 font-semibold hover:underline">
          Write for PSF
        </Link>
      </div>
    </AuthShell>
  );
}

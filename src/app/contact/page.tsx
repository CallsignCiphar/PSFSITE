"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, MessageSquare, Newspaper, GraduationCap, Handshake, Laptop, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const routingGuides = [
  { reason: "Editorial Pitch", icon: Newspaper, desc: "Pitches for articles, analysis, or investigative leads." },
  { reason: "Research & Peer Review", icon: GraduationCap, desc: "Manuscript queries, peer review status, or academic citations." },
  { reason: "Corrections & Factual Errors", icon: MessageSquare, desc: "Submit via the dedicated Corrections Log form." },
  { reason: "Advertising & Partnerships", icon: Handshake, desc: "Media kit requests, display advertising, and campaign proposals." },
  { reason: "Media Requests & Interviews", icon: Mail, desc: "Press inquiries and expert analyst commentary." },
  { reason: "Technical Support", icon: Laptop, desc: "Portal access, two-factor auth, or credential issues." },
];

export default function ContactPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("Editorial Pitch");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setIsLoading(true);
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="w-full bg-paper py-12 font-sans">
      <div className="max-w-container mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-xs font-sans font-bold uppercase tracking-wider text-green-700 block mb-1">
            Get in Touch
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-ink-900 mb-3">
            Contact Pakistan Strategic Forum
          </h1>
          <p className="font-serif text-sm text-ink-700">
            Send inquiries to our editorial board, research coordinators, or media desk. We aim to respond within 3 working days.
          </p>
        </div>

        {/* 6 Routing Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
          {routingGuides.map((guide) => {
            const Icon = guide.icon;
            return (
              <div
                key={guide.reason}
                onClick={() => setReason(guide.reason)}
                className={`p-4 border rounded-card cursor-pointer transition-colors ${
                  reason === guide.reason
                    ? "border-green-700 bg-ivory-50/70"
                    : "border-line bg-white hover:border-ink-500"
                }`}
              >
                <Icon className={`w-5 h-5 mb-2 ${reason === guide.reason ? "text-green-700" : "text-ink-500"}`} />
                <h4 className="font-serif font-bold text-xs text-ink-900 mb-1">{guide.reason}</h4>
                <p className="text-[11px] font-sans text-ink-500 leading-snug">{guide.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Form Container (Cols 3-10 / max-w-2xl) */}
        <div className="max-w-2xl mx-auto bg-white border border-line rounded-card p-8 shadow-level1">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 stroke-[2]" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-ink-900">
                Message Dispatched
              </h3>
              <p className="font-serif text-sm text-ink-700 leading-relaxed">
                Thank you, <span className="font-semibold text-ink-900">{firstName}</span>. Your inquiry regarding &ldquo;{reason}&rdquo; has been routed to our staff inbox. Reference ID: <span className="font-mono text-green-700 font-bold">MSG-2026-00891</span>.
              </p>
              <div className="pt-4">
                <Button variant="secondary" size="sm" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
                    First Name <span className="text-danger-700">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Tariq"
                    className="w-full h-10 px-3 text-sm font-sans border border-line rounded-input focus:border-green-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
                    Last Name <span className="text-danger-700">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Mahmud"
                    className="w-full h-10 px-3 text-sm font-sans border border-line rounded-input focus:border-green-700 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
                  Email Address <span className="text-danger-700">*</span>
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
                <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
                  Reason for Inquiry <span className="text-danger-700">*</span>
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full h-10 px-3 text-sm font-sans border border-line rounded-input bg-white focus:border-green-700 focus:outline-none"
                >
                  <option value="Editorial Pitch">Editorial Pitch & Submissions</option>
                  <option value="Research & Peer Review">Research & Peer Review Inquiries</option>
                  <option value="Advertising & Partnerships">Advertising & Media Partnerships</option>
                  <option value="Media Requests & Interviews">Media Interviews & Analyst Quotes</option>
                  <option value="Technical Support">Technical & Portal Access Issues</option>
                  <option value="General Inquiry">General Inquiries</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
                  Subject Line <span className="text-danger-700">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Brief synopsis of inquiry..."
                  className="w-full h-10 px-3 text-sm font-sans border border-line rounded-input focus:border-green-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
                  Message Details <span className="text-danger-700">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Elaborate your request or proposal..."
                  className="w-full p-3 text-sm font-sans border border-line rounded-input focus:border-green-700 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 rounded-sm border-line text-green-700 focus:ring-green-500"
                  />
                  <span className="text-xs font-sans text-ink-700 leading-snug">
                    I agree to Pakistan Strategic Forum processing these contact details solely to evaluate and respond to this transmission per the{" "}
                    <Link href="/privacy" className="text-green-700 hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
              </div>

              <div className="pt-4">
                <Button type="submit" variant="primary" size="default" className="w-full" isLoading={isLoading}>
                  Send Transmission
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

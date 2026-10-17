"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ArrowLeft, KeyRound, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Stepper, Step } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { sendSignupOtp, verifySignupOtp, submitApplication } from "@/app/actions/auth-actions";

interface SignupFlowProps {
  track: "ARTICLE_WRITER" | "RESEARCH_WRITER";
}

const steps: Step[] = [
  { id: 1, label: "Account" },
  { id: 2, label: "Verify Email" },
  { id: 3, label: "About You" },
  { id: 4, label: "Submitted" },
];

const expertiseOptions = [
  "Air Warfare & Aviation",
  "Land Warfare & Armour",
  "Naval & Maritime Strategy",
  "Strategic Systems & Deterrence",
  "Cyber & Information Warfare",
  "South Asian Geopolitics",
  "Middle East & Gulf Security",
  "Afghanistan & Border Security",
  "National Security Policy",
  "Military History & Operations",
];

export function SignupFlow({ track }: SignupFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1 Form Data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [institution, setInstitution] = useState("");
  const [designation, setDesignation] = useState("Student");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Step 2 OTP Data
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  // Step 3 Track-specific Data
  // Article track:
  const [aboutWriting, setAboutWriting] = useState("");
  const [publicationLink, setPublicationLink] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  // Research track:
  const [department, setDepartment] = useState("");
  const [programme, setProgramme] = useState("");
  const [graduationStatus, setGraduationStatus] = useState("CURRENTLY_ENROLLED");
  const [graduationYear, setGraduationYear] = useState(new Date().getFullYear().toString());
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [orcid, setOrcid] = useState("");
  const [researchInterests, setResearchInterests] = useState("");
  const [purpose, setPurpose] = useState("");
  const [previousPublications, setPreviousPublications] = useState("");

  // Step 4 Confirmation Data
  const [submittedName, setSubmittedName] = useState("");

  // OTP Countdown Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentStep === 2 && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [currentStep, countdown]);

  const handleExpertiseToggle = (topic: string) => {
    if (selectedExpertise.includes(topic)) {
      setSelectedExpertise(selectedExpertise.filter((t) => t !== topic));
    } else {
      if (selectedExpertise.length < 5) {
        setSelectedExpertise([...selectedExpertise, topic]);
      }
    }
  };

  // Step 1: Submit Account & Trigger OTP
  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (selectedExpertise.length === 0) {
      setError("Please select at least one area of expertise.");
      return;
    }

    if (!agreedToTerms) {
      setError("You must agree to the Terms of Use, Privacy Policy, and Contributor Agreement.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await sendSignupOtp({
        track,
        firstName,
        lastName,
        email,
        password,
        expertise: selectedExpertise,
        institution,
        designation,
      });

      if (!res.success) {
        setError(res.error || "Failed to initiate signup.");
      } else {
        setCurrentStep(2);
        setCountdown(60);
        setCanResend(false);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Handle OTP input
  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
      // Paste handling
      const digits = val.replace(/\D/g, "").slice(0, 6).split("");
      const newOtp = [...otp];
      digits.forEach((d, i) => {
        if (i < 6) newOtp[i] = d;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(digits.length, 5);
      otpInputs.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const res = await verifySignupOtp(email, code);
      if (!res.success) {
        setError(res.error || "Verification failed.");
      } else {
        setCurrentStep(3);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await sendSignupOtp({
        track,
        firstName,
        lastName,
        email,
        password,
        expertise: selectedExpertise,
        institution,
        designation,
      });
      if (res.success) {
        setCountdown(60);
        setCanResend(false);
        setOtp(["", "", "", "", "", ""]);
      } else {
        setError(res.error || "Failed to resend code.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Submit Final Application Details
  const handleStep3Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const stepTwoData =
        track === "ARTICLE_WRITER"
          ? {
              aboutWriting,
              publicationLink,
              profileUrl,
            }
          : {
              department,
              programme,
              graduationStatus,
              graduationYear,
              registrationNumber,
              orcid,
              researchInterests,
              purpose,
              previousPublications,
            };

      const res = await submitApplication({
        email,
        track,
        stepTwoData,
      });

      if (!res.success) {
        setError(res.error || "Submission failed.");
      } else {
        setSubmittedName(res.firstName || firstName);
        setCurrentStep(4);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Stepper steps={steps} currentStep={currentStep} />

      {error && (
        <div className="mb-6 p-3.5 bg-danger-50 border border-danger-700/20 text-danger-700 text-xs font-sans rounded-sm flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* ========================================================
          STEP 1: ACCOUNT DETAILS
          ======================================================== */}
      {currentStep === 1 && (
        <form onSubmit={handleStep1Submit} className="space-y-4">
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
              placeholder="name@university.edu.pk"
              className="w-full h-10 px-3 text-sm font-sans border border-line rounded-input focus:border-green-700 focus:outline-none"
            />
            <p className="text-[11px] font-sans text-ink-500 mt-1">
              Institutional or official email preferred. A 6-digit verification code will be sent.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
                Password <span className="text-danger-700">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 10 characters"
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

            <div>
              <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
                Confirm Password <span className="text-danger-700">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full h-10 px-3 text-sm font-sans border border-line rounded-input focus:border-green-700 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
                Institution / University
              </label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="e.g. Quaid-i-Azam University"
                className="w-full h-10 px-3 text-sm font-sans border border-line rounded-input focus:border-green-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
                Designation / Position <span className="text-danger-700">*</span>
              </label>
              <input
                type="text"
                required
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="Student, Lecturer, Analyst..."
                className="w-full h-10 px-3 text-sm font-sans border border-line rounded-input focus:border-green-700 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-sans font-medium text-ink-900 mb-1.5">
              Areas of Expertise (Select 1 to 5) <span className="text-danger-700">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {expertiseOptions.map((topic) => {
                const selected = selectedExpertise.includes(topic);
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => handleExpertiseToggle(topic)}
                    className={`h-7 px-2.5 text-xs font-sans rounded-chip border transition-colors ${
                      selected
                        ? "bg-green-700 text-white border-green-700 font-semibold"
                        : "bg-ivory-50 text-ink-700 border-line hover:border-ink-500"
                    }`}
                  >
                    {topic}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 rounded-sm border-line text-green-700 focus:ring-green-500"
              />
              <span className="text-xs font-sans text-ink-700 leading-snug">
                I agree to the{" "}
                <Link href="/terms" target="_blank" className="text-green-700 hover:underline">
                  Terms of Use
                </Link>
                ,{" "}
                <Link href="/privacy" target="_blank" className="text-green-700 hover:underline">
                  Privacy Policy
                </Link>
                , and the{" "}
                <Link href="/contributor-agreement" target="_blank" className="text-green-700 hover:underline">
                  Contributor Agreement
                </Link>
                .
              </span>
            </label>
          </div>

          <div className="pt-4">
            <Button type="submit" variant="primary" size="default" className="w-full gap-2" isLoading={isLoading}>
              <span>Continue to Email Verification</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </form>
      )}

      {/* ========================================================
          STEP 2: EMAIL OTP VERIFICATION
          ======================================================== */}
      {currentStep === 2 && (
        <form onSubmit={handleVerifyOtp} className="space-y-6 text-center">
          <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto mb-2">
            <KeyRound className="w-6 h-6" />
          </div>

          <div>
            <h3 className="font-serif font-bold text-xl text-ink-900 mb-1">Check your email</h3>
            <p className="font-serif text-sm text-ink-500">
              We sent a 6-digit confirmation code to <span className="font-mono font-medium text-ink-900">{email}</span>.
            </p>
          </div>

          {/* 6 Digit Inputs */}
          <div className="flex justify-center gap-2 sm:gap-3 my-4">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  otpInputs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                className="w-11 h-12 text-center font-mono font-bold text-xl border border-line rounded-input focus:border-green-700 focus:ring-1 focus:ring-green-700 focus:outline-none bg-ivory-50"
              />
            ))}
          </div>

          <div className="space-y-3">
            <Button type="submit" variant="primary" size="default" className="w-full" isLoading={isLoading}>
              Verify Code & Continue
            </Button>

            <div className="text-xs font-sans text-ink-500 flex items-center justify-between px-2">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-ink-700 hover:underline flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" /> Edit email
              </button>

              <div>
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-green-700 font-medium hover:underline"
                  >
                    Resend code
                  </button>
                ) : (
                  <span>Resend in {countdown}s</span>
                )}
              </div>
            </div>
          </div>
        </form>
      )}

      {/* ========================================================
          STEP 3: ABOUT YOU (TRACK SPECIFIC)
          ======================================================== */}
      {currentStep === 3 && (
        <form onSubmit={handleStep3Submit} className="space-y-5">
          <div className="p-3 bg-ivory-100 border border-line rounded-sm flex items-center justify-between text-xs font-sans text-ink-700">
            <div>
              <span className="font-semibold text-ink-900">
                {firstName} {lastName}
              </span>{" "}
              · {email}
            </div>
            <span className="px-2 py-0.5 rounded-chip bg-green-100 text-green-700 font-semibold text-[10px]">
              Email Verified
            </span>
          </div>

          {track === "ARTICLE_WRITER" ? (
            /* Article Writer Details */
            <>
              <div>
                <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
                  Tell us about yourself and your strategic writing background{" "}
                  <span className="text-danger-700">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={aboutWriting}
                  onChange={(e) => setAboutWriting(e.target.value)}
                  placeholder="Detail your analytical focus, prior publications or commentary on defense and regional security..."
                  className="w-full p-3 text-sm font-sans border border-line rounded-input focus:border-green-700 focus:outline-none"
                />
                <p className="text-[11px] font-sans text-ink-500 mt-1">Minimum 100 characters.</p>
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
                  Link to a previous publication or writing sample
                </label>
                <input
                  type="url"
                  value={publicationLink}
                  onChange={(e) => setPublicationLink(e.target.value)}
                  placeholder="https://..."
                  className="w-full h-10 px-3 text-sm font-sans border border-line rounded-input focus:border-green-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
                  Social or Professional Profile URL (LinkedIn, X, personal site)
                </label>
                <input
                  type="url"
                  value={profileUrl}
                  onChange={(e) => setProfileUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full h-10 px-3 text-sm font-sans border border-line rounded-input focus:border-green-700 focus:outline-none"
                />
              </div>
            </>
          ) : (
            /* Research Writer Details */
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
                    Department / Faculty
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Strategic Studies"
                    className="w-full h-10 px-3 text-sm font-sans border border-line rounded-input focus:border-green-700 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
                    Programme / Degree <span className="text-danger-700">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={programme}
                    onChange={(e) => setProgramme(e.target.value)}
                    placeholder="e.g. MPhil / PhD Defense Studies"
                    className="w-full h-10 px-3 text-sm font-sans border border-line rounded-input focus:border-green-700 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
                    Status <span className="text-danger-700">*</span>
                  </label>
                  <select
                    value={graduationStatus}
                    onChange={(e) => setGraduationStatus(e.target.value)}
                    className="w-full h-10 px-2 text-sm font-sans border border-line rounded-input focus:border-green-700 focus:outline-none bg-white"
                  >
                    <option value="CURRENTLY_ENROLLED">Enrolled</option>
                    <option value="GRADUATED">Graduated</option>
                    <option value="NOT_APPLICABLE">Faculty</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
                    Year / Expected
                  </label>
                  <input
                    type="number"
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                    className="w-full h-10 px-3 text-sm font-sans border border-line rounded-input focus:border-green-700 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
                    Roll / Reg. No
                  </label>
                  <input
                    type="text"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    placeholder="Optional"
                    className="w-full h-10 px-3 text-sm font-sans border border-line rounded-input focus:border-green-700 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
                  ORCID iD (0000-0000-0000-0000)
                </label>
                <input
                  type="text"
                  value={orcid}
                  onChange={(e) => setOrcid(e.target.value)}
                  placeholder="0000-0002-1825-0097"
                  className="w-full h-10 px-3 text-sm font-sans border border-line rounded-input focus:border-green-700 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
                  Research Interests <span className="text-danger-700">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={researchInterests}
                  onChange={(e) => setResearchInterests(e.target.value)}
                  placeholder="Key methodologies, theoretical frameworks, or military capabilities you specialize in..."
                  className="w-full p-3 text-sm font-sans border border-line rounded-input focus:border-green-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-ink-900 mb-1">
                  Why do you wish to publish research with PSF? <span className="text-danger-700">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="State your objectives for contributing peer-reviewed research to Pakistan Strategic Forum..."
                  className="w-full p-3 text-sm font-sans border border-line rounded-input focus:border-green-700 focus:outline-none"
                />
              </div>
            </>
          )}

          <div className="pt-4 flex gap-3">
            <Button
              type="button"
              variant="secondary"
              size="default"
              onClick={() => setCurrentStep(1)}
              className="gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <Button type="submit" variant="primary" size="default" className="flex-1 gap-2" isLoading={isLoading}>
              <span>Submit Contributor Application</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </form>
      )}

      {/* ========================================================
          STEP 4: SUBMITTED CONFIRMATION
          ======================================================== */}
      {currentStep === 4 && (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 stroke-[1.75]" />
          </div>

          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-ink-900">
            Application Submitted!
          </h2>

          <p className="font-serif text-sm sm:text-base text-ink-700 max-w-md mx-auto leading-relaxed">
            Thank you, <span className="font-semibold text-ink-900">{submittedName}</span>. Our editorial and screening board will review your credentials and notify you at{" "}
            <span className="font-mono text-ink-900 font-medium">{email}</span>.
          </p>

          <div className="p-4 bg-ivory-50 border border-line rounded-card text-xs font-sans text-ink-500 max-w-sm mx-auto text-left">
            <span className="font-semibold text-ink-900 block mb-1">What happens next:</span>
            <ul className="list-disc list-inside space-y-1">
              <li>Editorial evaluation takes 3 to 5 working days.</li>
              <li>You can check your status anytime from the application portal.</li>
              <li>Once verified, your publishing dashboard will activate automatically.</li>
            </ul>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="secondary" size="default" className="w-full sm:w-auto">
                Back to Home
              </Button>
            </Link>
            <Link href="/portal/application" className="w-full sm:w-auto">
              <Button variant="primary" size="default" className="w-full sm:w-auto">
                View Application Status
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

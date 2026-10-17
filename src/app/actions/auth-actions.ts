"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// 1. Initiate Signup & Send Email OTP (Step 1)
export async function sendSignupOtp(data: {
  track: "ARTICLE_WRITER" | "RESEARCH_WRITER";
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  expertise: string[];
  institution?: string;
  designation: string;
}) {
  const normalisedEmail = data.email.trim().toLowerCase();

  // Check email blocklist (FRD 9.4)
  const blocklisted = await prisma.emailBlocklist.findUnique({
    where: { normalisedEmail },
  });
  if (blocklisted) {
    return { success: false, error: "We can't create an account with this email." };
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: normalisedEmail },
  });
  if (existingUser) {
    return { success: false, error: "An account with this email already exists. Please sign in instead." };
  }

  // Password validation (min 10 chars, 1 letter, 1 number)
  if (data.password.length < 10 || !/[A-Za-z]/.test(data.password) || !/[0-9]/.test(data.password)) {
    return { success: false, error: "Password must be at least 10 characters long and include both letters and numbers." };
  }

  // Generate 6-digit OTP
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const codeHash = await bcrypt.hash(otpCode, 10);
  const passwordHash = await bcrypt.hash(data.password, 10);

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Store in PendingSignup & EmailOtp
  await prisma.pendingSignup.upsert({
    where: { id: normalisedEmail },
    create: {
      id: normalisedEmail,
      email: normalisedEmail,
      track: data.track,
      passwordHash,
      stepOneData: {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        expertise: data.expertise,
        institution: data.institution?.trim() || null,
        designation: data.designation.trim(),
      },
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
    },
    update: {
      track: data.track,
      passwordHash,
      stepOneData: {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        expertise: data.expertise,
        institution: data.institution?.trim() || null,
        designation: data.designation.trim(),
      },
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });

  await prisma.emailOtp.upsert({
    where: { id: normalisedEmail },
    create: {
      id: normalisedEmail,
      email: normalisedEmail,
      codeHash,
      attempts: 0,
      expiresAt,
    },
    update: {
      codeHash,
      attempts: 0,
      expiresAt,
    },
  });

  // In production, Resend would send this email. For developer inspection:
  console.log(`[PSF AUTH OTP] Verification code for ${normalisedEmail}: ${otpCode}`);

  return { success: true, email: normalisedEmail, devOtp: otpCode };
}

// 2. Verify Email OTP (Step 2)
export async function verifySignupOtp(email: string, code: string) {
  const normalisedEmail = email.trim().toLowerCase();

  const otpRecord = await prisma.emailOtp.findUnique({
    where: { id: normalisedEmail },
  });

  if (!otpRecord) {
    return { success: false, error: "No pending verification found for this email. Please start again." };
  }

  if (new Date() > otpRecord.expiresAt) {
    return { success: false, error: "Verification code has expired. Please request a new code." };
  }

  if (otpRecord.attempts >= 5) {
    return { success: false, error: "Too many incorrect attempts. Please request a new code." };
  }

  const isValid = await bcrypt.compare(code.trim(), otpRecord.codeHash);
  if (!isValid) {
    await prisma.emailOtp.update({
      where: { id: normalisedEmail },
      data: { attempts: { increment: 1 } },
    });
    return { success: false, error: `Invalid code. ${4 - otpRecord.attempts} attempts remaining.` };
  }

  // Clean up OTP record
  await prisma.emailOtp.delete({ where: { id: normalisedEmail } });

  return { success: true };
}

// 3. Submit Final Application (Step 3 -> Step 4)
export async function submitApplication(data: {
  email: string;
  track: "ARTICLE_WRITER" | "RESEARCH_WRITER";
  stepTwoData: Record<string, any>;
}) {
  const normalisedEmail = data.email.trim().toLowerCase();

  const pending = await prisma.pendingSignup.findUnique({
    where: { id: normalisedEmail },
  });

  if (!pending) {
    return { success: false, error: "Application session expired. Please start over." };
  }

  const stepOne = pending.stepOneData as any;
  const username = `${stepOne.firstName.toLowerCase()}-${stepOne.lastName.toLowerCase()}-${crypto.randomBytes(2).toString("hex")}`;

  // Create User with APPLICATION_DRAFT or PENDING status
  const user = await prisma.user.create({
    data: {
      email: normalisedEmail,
      passwordHash: pending.passwordHash,
      status: "PENDING",
      emailVerifiedAt: new Date(),
      signupCountry: "Pakistan",
      profile: {
        create: {
          firstName: stepOne.firstName,
          lastName: stepOne.lastName,
          username,
          designation: stepOne.designation,
          institution: stepOne.institution || null,
          expertiseCategoryIds: stepOne.expertise || [],
          department: data.stepTwoData.department || null,
          programme: data.stepTwoData.programme || null,
          graduationStatus: data.stepTwoData.graduationStatus || null,
          graduationYear: data.stepTwoData.graduationYear ? parseInt(data.stepTwoData.graduationYear, 10) : null,
          registrationNumber: data.stepTwoData.registrationNumber || null,
          orcid: data.stepTwoData.orcid || null,
          shortBio: data.stepTwoData.aboutWriting || data.stepTwoData.researchInterests || null,
        },
      },
      applications: {
        create: {
          track: data.track,
          status: "PENDING",
          attempt: 1,
          stepTwoData: data.stepTwoData,
        },
      },
    },
    include: {
      profile: true,
      applications: true,
    },
  });

  // Clean up pending signup
  await prisma.pendingSignup.delete({ where: { id: normalisedEmail } });

  return {
    success: true,
    firstName: stepOne.firstName,
    applicationId: user.applications[0]?.id,
    userId: user.id,
  };
}

// 4. Authenticate / Sign In
export async function authenticateUser(email: string, password: string) {
  const normalisedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalisedEmail },
    include: {
      roles: {
        include: { role: true },
      },
    },
  });

  if (!user || !user.passwordHash) {
    return { success: false, error: "Email or password is incorrect." };
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return { success: false, error: "Email or password is incorrect." };
  }

  // Handle Account Status Routing (FRD 9.2 table)
  switch (user.status) {
    case "DEACTIVATED":
      return {
        success: false,
        error: "Your account has been deactivated. Contact PSF if you think this is a mistake.",
      };
    case "BANNED":
    case "PERMANENTLY_REJECTED":
      return {
        success: false,
        error: "This account is not available.",
      };
    case "PENDING":
    case "RETURNED":
    case "APPLICATION_DRAFT":
      return {
        success: true,
        redirectUrl: "/portal/application",
        status: user.status,
      };
    case "ACTIVE":
      // If admin permission and no contributor role -> /admin, else /portal
      const isAdmin = user.roles.some((r) => r.role.name === "Super Admin" || r.role.name === "Admin");
      return {
        success: true,
        redirectUrl: isAdmin ? "/admin" : "/portal",
        status: "ACTIVE",
      };
    default:
      return { success: true, redirectUrl: "/portal" };
  }
}

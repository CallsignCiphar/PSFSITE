import React from "react";
import { AuthShell } from "@/components/layout/auth-shell";
import { SignupFlow } from "@/components/auth/signup-flow";

export const metadata = {
  title: "Research Scholar Application | Pakistan Strategic Forum",
  description: "Apply as a Research Writer for Pakistan Strategic Forum peer-reviewed papers.",
  robots: { index: false, follow: false },
};

export default function ResearchSignupPage() {
  return (
    <AuthShell
      title="Research Scholar Application"
      subtitle="Register to submit scholarly manuscripts and policy briefs for double-blind peer review."
      maxWidth="wide"
    >
      <SignupFlow track="RESEARCH_WRITER" />
    </AuthShell>
  );
}

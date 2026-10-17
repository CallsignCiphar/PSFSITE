import React from "react";
import { AuthShell } from "@/components/layout/auth-shell";
import { SignupFlow } from "@/components/auth/signup-flow";

export const metadata = {
  title: "Article Writer Application | Pakistan Strategic Forum",
  description: "Apply as an Article Writer for Pakistan Strategic Forum.",
  robots: { index: false, follow: false },
};

export default function ArticleSignupPage() {
  return (
    <AuthShell
      title="Article Writer Application"
      subtitle="Join PSF's editorial team to contribute analyses, explainers, and strategic commentary."
      maxWidth="wide"
    >
      <SignupFlow track="ARTICLE_WRITER" />
    </AuthShell>
  );
}

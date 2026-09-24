import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service – Usage & License Terms",
  description:
    "Review the terms and conditions governing the use of Zenvuk's free browser-based SEO, marketing, and campaign tracking utilities and generators.",
  alternates: {
    canonical: "/terms/"
  },
  openGraph: {
    title: "Terms of Service – Usage & License Terms | Zenvuk",
    description:
      "Review the terms and conditions governing the use of Zenvuk's free browser-based SEO, marketing, and campaign tracking utilities and generators.",
    url: `${siteConfig.url}/terms/`,
    type: "website"
  }
};

export default function TermsPage() {
  return (
    <InfoPage
      title="Terms of Service"
      intro="Please read these terms carefully before using Zenvuk's utilities and informational resources."
      category="Legal"
      lastUpdated="September 2025"
      canonicalPath="/terms/"
    >
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and utilizing Zenvuk ({siteConfig.url}), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our utilities.
      </p>

      <h2>2. Permitted Use</h2>
      <p>
        Zenvuk provides free utilities for personal, commercial, and enterprise marketing purposes. You may use generated schema markup, product titles, meta descriptions, product names, and campaign tracking links in your commercial websites, client deliverables, and advertising campaigns without royalty fees.
      </p>

      <h2>3. Intellectual Property and Output Ownership</h2>
      <p>
        You retain full ownership of the questions, answers, product specifications, and campaign URLs you input into our tools. Zenvuk claims no intellectual property rights or ownership over the content you generate.
      </p>
      <p>
        All website software, design elements, logos, icons, styling, and deterministic generator code remain the intellectual property of Zenvuk and are protected by applicable copyright laws.
      </p>

      <h2>4. Prohibited Conduct</h2>
      <p>
        You agree not to:
      </p>
      <ul>
        <li>Deploy automated scrapers, denial-of-service bots, or malicious scripts against our hosting infrastructure.</li>
        <li>Attempt to reverse-engineer or circumvent client-side security measures.</li>
        <li>Use our utilities to generate deceptive, defamatory, or illegal spam structured data intended to violate search engine guidelines.</li>
      </ul>

      <h2>5. Disclaimer of Warranties</h2>
      <p>
        Zenvuk utilities are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, whether express or implied. We do not warrant that tool outputs will be completely error-free or that search engine algorithms will grant enhanced search visibility.
      </p>

      <h2>6. Changes to Terms</h2>
      <p>
        We reserve the right to modify these terms at any time. Changes will be posted to this page with an updated revision date.
      </p>

      <h2>7. Contact Information</h2>
      <p>
        For inquiries concerning these terms, licensing, or intellectual property rights, contact us at <a href={`mailto:${siteConfig.email}`} className="text-brand underline">{siteConfig.email}</a>.
      </p>
    </InfoPage>
  );
}

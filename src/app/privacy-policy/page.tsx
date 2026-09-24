import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy – Client-Side Data & Analytics",
  description:
    "Zenvuk's privacy policy explains our local-first browser data processing, minimal cookie usage, and transparent data protection principles.",
  alternates: {
    canonical: "/privacy-policy/"
  },
  openGraph: {
    title: "Privacy Policy – Client-Side Data & Analytics | Zenvuk",
    description:
      "Zenvuk's privacy policy explains our local-first browser data processing, minimal cookie usage, and transparent data protection principles.",
    url: `${siteConfig.url}/privacy-policy/`,
    type: "website"
  }
};

export default function PrivacyPolicyPage() {
  return (
    <InfoPage
      title="Privacy Policy"
      intro="Your privacy is fundamental to our architecture. Zenvuk operates as a client-side utility platform designed to minimize data collection."
      category="Legal"
      lastUpdated="September 2025"
      canonicalPath="/privacy-policy/"
    >
      <h2>1. Overview and Core Privacy Model</h2>
      <p>
        At Zenvuk ({siteConfig.url}), we believe that productivity and SEO utilities should not require surrendering personal data. We do not require account registration, passwords, email verification, or credit cards to use our core tools.
      </p>

      <h2>2. Client-Side Processing</h2>
      <p>
        When you use Zenvuk utilities—including the FAQ Schema Generator, Product Title Generator, Meta Description Generator, Product Name Generator, and UTM Builder—your input values (such as questions, answers, keywords, brand names, and campaign parameters) are processed in real-time within your web browser’s JavaScript runtime.
      </p>
      <p>
        <strong>Your tool inputs and generated outputs are never transmitted to or stored on Zenvuk web servers.</strong>
      </p>

      <h2>3. Local Browser Storage (localStorage)</h2>
      <p>
        Certain features, specifically the UTM Parameter Builder’s campaign history manager, utilize your browser’s native <code className="inline-code">localStorage</code> API. This allows you to retain a private list of your recently generated campaign tracking links across browser sessions.
      </p>
      <p>
        This information resides solely on your physical device. It is never synchronized across our servers. You can delete individual entries or clear your entire campaign history at any time directly through the tool interface or by clearing your browser cache.
      </p>

      <h2>4. Cookies and Web Analytics</h2>
      <p>
        Zenvuk does not use invasive advertising tracking cookies or cross-site fingerprinting scripts.
      </p>
      <p>
        If Google Analytics 4 (GA4) is enabled, it collects aggregated, anonymized metrics (such as page views, device types, general geographic region, and aggregate tool usage counts). We configure analytics to anonymize IP addresses and explicitly prohibit transmitting user-entered text, product names, or queries as event parameters.
      </p>

      <h2>5. Advertising &amp; Monetization Disclosure</h2>
      <p>
        <strong>Current Operating Status:</strong> Zenvuk currently operates entirely advertising-free. No third-party advertising networks, remarketing pixels, or advertising cookies are loaded on this website.
      </p>
      <p>
        <strong>Future Google AdSense Integration:</strong> To sustain Zenvuk as a free developer and SEO resource, we are preparing the technical infrastructure to serve non-intrusive advertisements via Google AdSense in the future. Once activated:
      </p>
      <ul>
        <li>Third-party vendors, including Google, will use cookies to serve ads based on prior visits to this website or other sites across the web.</li>
        <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to Zenvuk and/or other sites on the internet.</li>
        <li>Users will be able to opt out of personalized advertising by visiting Google&apos;s <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-brand underline">Ads Settings</a> or via <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-brand underline">aboutads.info</a>.</li>
      </ul>

      <h2>6. Contact Us Regarding Privacy</h2>
      <p>
        If you have questions regarding this Privacy Policy or our client-side data architecture, please contact us at <a href={`mailto:${siteConfig.email}`} className="text-brand underline">{siteConfig.email}</a>.
      </p>
    </InfoPage>
  );
}

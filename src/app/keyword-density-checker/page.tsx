import type { Metadata } from "next";
import { KeywordDensityContainer } from "./KeywordDensityContainer";
import { WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { RelatedTools } from "@/components/common/RelatedTools";
import { getRelatedTools, getToolBySlug } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { BarChart3, BookOpen, AlertTriangle, CheckCircle2, HelpCircle } from "lucide-react";

const tool = getToolBySlug("keyword-density-checker")!;
const related = getRelatedTools("keyword-density-checker");

export const metadata: Metadata = {
  title: {
    absolute: tool.metaTitle
  },
  description: tool.metaDescription,
  alternates: {
    canonical: "/keyword-density-checker/"
  },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    url: `${siteConfig.url}/keyword-density-checker/`,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: tool.metaTitle,
    description: tool.metaDescription
  }
};

const faqs = [
  {
    question: "What is an ideal keyword density for Google SEO in 2026?",
    answer:
      "There is no ideal or mandatory keyword density percentage in modern search engine algorithms. Google's semantic models (such as RankBrain, BERT, and Gemini) evaluate topical completeness, entity relationships, and user satisfaction rather than mathematical keyword quotas. A density between 1% and 2.5% is generally natural, while anything consistently exceeding 3.5% risks over-optimization.",
  },
  {
    question: "What is an N-Gram in SEO content analysis?",
    answer:
      "An n-gram is a contiguous sequence of n words from a given text. A 1-gram (unigram) is a single keyword, a 2-gram (bigram) is a two-word phrase, a 3-gram (trigram) is a three-word phrase, and a 4-gram is a four-word phrase. Analyzing n-grams reveals repetitive phrasing patterns that single-word density checks miss.",
  },
  {
    question: "Why should stop words be filtered during keyword analysis?",
    answer:
      "Stop words are common grammatical particles (such as 'the', 'is', 'at', 'which', and 'on') that carry little topical weight. Filtering stop words ensures your analysis focuses exclusively on high-value semantic nouns, verbs, and subject-matter terminology.",
  },
  {
    question: "Can high keyword density trigger a Google penalty?",
    answer:
      "Yes. Excessively repetitive keyword insertion constitutes keyword stuffing under Google's Spam Policies. Algorithms can downgrade page visibility or de-index content that degrades user experience through unnatural keyword repetition.",
  },
];

export default function KeywordDensityPage() {
  return (
    <>
      <WebApplicationJsonLd
        name={tool.name}
        description={tool.metaDescription}
        url={`${siteConfig.url}/keyword-density-checker/`}
        category="SEOApplication"
      />

      <KeywordDensityContainer>
        <article className="mt-16 border-t border-neutral-border pt-12 space-y-12 max-w-[880px]">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-brand" />
              What Is Keyword Density and Why Has SEO Evolved Beyond It?
            </h2>
            <div className="rounded-xl border border-neutral-border bg-surface p-4 border-l-4 border-l-brand mb-4 text-neutral-secondary text-sm leading-relaxed">
              <strong className="text-ink">Direct Definition:</strong> Keyword density is the mathematical percentage representing how frequently a specific word 
              or phrase appears within a body of text relative to total word count. While early search engines relied on density as a crude measure 
              of topical relevance, modern search algorithms evaluate semantic entity graphs and contextual meaning.
            </div>
            <p className="text-sm leading-relaxed text-neutral-secondary mb-3">
              Modern search engines do not calculate a minimum keyword density threshold to award top rankings. 
              Instead, density analysis serves primarily as a quality check against accidental keyword stuffing and awkward phrasing, 
              ensuring copy reads naturally for human audiences.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-brand-secondary" />
              The Power of Multi-Word N-Grams in Content Auditing
            </h2>
            <p className="text-sm leading-relaxed text-neutral-secondary mb-3">
              Single-word frequency checks often fail to reveal over-optimized copy. For example, looking at individual words like &quot;shoes&quot; or &quot;running&quot; 
              might appear within normal bounds, but analyzing multi-word n-grams reveals whether specific combinations are repeated excessively:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-surface border border-neutral-border">
                <h3 className="font-semibold text-ink mb-1">1-Grams &amp; 2-Grams</h3>
                <p className="text-xs text-neutral-secondary leading-relaxed">
                  Isolate primary subject keywords and core two-word topics (e.g., &quot;email marketing&quot;, &quot;technical audit&quot;).
                </p>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-neutral-border">
                <h3 className="font-semibold text-ink mb-1">3-Grams &amp; 4-Grams</h3>
                <p className="text-xs text-neutral-secondary leading-relaxed">
                  Identify recurring long-tail phrases and repeated call-to-actions (e.g., &quot;free shipping on orders&quot;, &quot;best tools for developers&quot;).
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-state-warning" />
              Recognizing and Preventing Search Spam Over-Optimization
            </h2>
            <p className="text-sm leading-relaxed text-neutral-secondary mb-3">
              Google&apos;s Spam Policies explicitly prohibit &quot;keyword stuffing&quot;, defined as loading pages with keywords or numbers in an attempt to manipulate search rankings. 
              Signs of over-optimization include:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-neutral-secondary">
              <li>Repeating the primary target keyword in every single subheading.</li>
              <li>Lists of phone numbers or geographical regions without added editorial value.</li>
              <li>Inserting keywords where they sound grammatically awkward or redundant.</li>
            </ul>
          </section>

          {/* Section 4: FAQ Section */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-brand" />
              Frequently Asked Questions About Keyword Density
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-neutral-border pb-4 last:border-0 last:pb-0">
                  <h3 className="font-semibold text-ink text-sm mb-1">{faq.question}</h3>
                  <p className="text-neutral-secondary text-xs sm:text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </article>

        {related && related.length > 0 && <RelatedTools tools={related} />}
      </KeywordDensityContainer>
    </>
  );
}

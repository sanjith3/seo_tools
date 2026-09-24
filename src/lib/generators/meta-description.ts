export type MetaDescriptionTone =
  | "Professional"
  | "Informative"
  | "Persuasive"
  | "Simple"
  | "Local Business"
  | "Ecommerce";

export type MetaDescriptionPagePurpose =
  | "Web Page"
  | "Homepage"
  | "Product / Ecommerce"
  | "Category Page"
  | "Blog / Article"
  | "Local Business"
  | "Facebook / Open Graph"
  | "Product Page"
  | "Service Page"
  | "Blog Post / Guide"
  | "Landing Page";

export interface MetaDescriptionInput {
  pageTitle: string;
  primaryKeyword: string;
  secondaryKeyword?: string;
  businessName?: string;
  pagePurpose: MetaDescriptionPagePurpose;
  mainBenefit: string;
  secondaryBenefit?: string;
  cta: string;
  tone: MetaDescriptionTone;
  targetLength: number; // 140, 150, 155, 160, or custom
  generateTitle?: boolean;
}

export interface GeneratedMetaDescription {
  id: string;
  description: string;
  characterCount: number;
  hasPrimaryKeyword: boolean;
  hasSecondaryKeyword: boolean;
  hasCta: boolean;
  score: number;
  reason: string;
  metaTitle?: string;
  titleCharCount?: number;
}

export interface MetaDescriptionSummary {
  totalGenerated: number;
  bestScore: number;
  averageLength: number;
  keywordCoveragePct: number;
  ctaCoveragePct: number;
}

function cleanText(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/\s+([,.!?])/g, "$1")
    .trim();
}

function ensurePunctuation(str: string): string {
  const trimmed = str.trim();
  if (/[.!?]$/.test(trimmed)) return trimmed;
  return `${trimmed}.`;
}

export function scoreMetaDescription(
  description: string,
  primaryKeyword: string,
  secondaryKeyword: string | undefined,
  cta: string,
  targetLength: number
): { score: number; reason: string } {
  let score = 0;
  const lowerDesc = description.toLowerCase();
  const lowerKw = primaryKeyword.trim().toLowerCase();
  const lowerCta = cta.trim().toLowerCase();

  // 1. Length precision relative to targetLength (up to 30 points)
  const len = description.length;
  if (len <= targetLength && len >= targetLength - 15) {
    score += 30; // Perfect length window
  } else if (len <= targetLength && len >= targetLength - 30) {
    score += 24;
  } else if (len <= targetLength && len >= 110) {
    score += 18;
  } else if (len > targetLength) {
    score += Math.max(5, 20 - (len - targetLength) * 2); // Penalty for truncation
  } else {
    score += 10;
  }

  // 2. Primary keyword usage (up to 30 points)
  let kwScore = 0;
  if (lowerKw && lowerDesc.includes(lowerKw)) {
    const kwPos = lowerDesc.indexOf(lowerKw);
    if (kwPos < 50) {
      kwScore = 30; // Front loaded
    } else {
      kwScore = 25;
    }
  } else if (lowerKw) {
    const words = lowerKw.split(/\s+/);
    const matched = words.filter((w) => lowerDesc.includes(w)).length;
    kwScore = Math.round((matched / Math.max(1, words.length)) * 18);
  }
  score += kwScore;

  // 3. CTA presence (up to 20 points)
  let ctaScore = 0;
  if (lowerCta && lowerDesc.includes(lowerCta)) {
    ctaScore = 20;
  } else if (
    /learn more|get started|discover|shop now|find out|request a quote|contact us|read our/i.test(
      lowerDesc
    )
  ) {
    ctaScore = 15;
  }
  score += ctaScore;

  // 4. Readability and repetition penalty (up to 20 points)
  const words = lowerDesc.replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean);
  const wordSet = new Set(words);
  const repRatio = words.length > 0 ? (words.length - wordSet.size) / words.length : 0;
  if (repRatio < 0.15) {
    score += 20;
  } else if (repRatio < 0.3) {
    score += 12;
  } else {
    score += 5;
  }

  const reasons: string[] = [];
  if (len <= targetLength && len >= targetLength - 20) {
    reasons.push("Ideal character length");
  }
  if (kwScore >= 25) {
    reasons.push("Strong keyword presence");
  }
  if (ctaScore >= 15) {
    reasons.push("Clear call to action");
  }
  if (reasons.length === 0) {
    reasons.push("Readable snippet structure");
  }

  return {
    score: Math.min(100, Math.max(30, score)),
    reason: reasons.join(" • ")
  };
}

function buildPairedMetaTitle(idx: number, kw: string, pageTitle: string, brand: string, benefit: string): string {
  const cleanTitle = pageTitle.trim();
  const brandPart = brand ? ` | ${brand}` : " | Zenvuk";
  const shortBenefit = benefit.length > 25 ? benefit.slice(0, 25).trim() : benefit;

  const titleTemplates = [
    `${kw} – ${shortBenefit}${brandPart}`,
    `${cleanTitle ? cleanTitle : `${kw} Solutions`}${brandPart}`,
    `${kw}: Practical Guide & Tips${brandPart}`,
    `${brand ? `${brand}: ` : ""}${kw} – ${shortBenefit}`,
    `${kw} – Fast & Accurate Results${brandPart}`,
    `${cleanTitle ? `${cleanTitle} – ` : ""}${kw}`,
    `${kw} Made Simple${brandPart}`,
    `${kw} Overview & Best Practices${brandPart}`,
    `${brand ? `${brand} ` : ""}${kw} – Complete Guide`,
    `${kw} – Optimize & Enhance Performance${brandPart}`,
    `${kw} – Professional Results${brandPart}`,
    `${kw} Resource${brandPart}`
  ];

  let title = titleTemplates[idx % titleTemplates.length];
  if (title.length > 60) {
    title = title.slice(0, 57).trim() + "...";
  }
  return title;
}

export function generateMetaDescriptions(input: MetaDescriptionInput): GeneratedMetaDescription[] {
  const kw = input.primaryKeyword.trim();
  const secKw = input.secondaryKeyword ? input.secondaryKeyword.trim() : "";
  const brand = input.businessName ? input.businessName.trim() : "";
  const benefit1 = input.mainBenefit.trim();
  const benefit2 = input.secondaryBenefit ? input.secondaryBenefit.trim() : "";
  const rawCta = input.cta.trim();
  const cta = rawCta ? ensurePunctuation(rawCta) : "Learn more today.";
  const targetLen = input.targetLength || 155;

  const templates: string[] = [];

  // Helper for brand prefix
  const brandMention = brand ? `at ${brand}` : "";
  const byBrand = brand ? `by ${brand}` : "";

  // Facebook / Open Graph Social specific templates
  if (input.pagePurpose === "Facebook / Open Graph") {
    templates.push(
      `Looking for ${kw}? Discover how to ${benefit1}. ${brandMention ? `Explore with ${brand}. ` : ""}${cta}`,
      `Everything you need to know about ${kw}. Learn how to ${benefit1}. ${cta}`,
      `Explore ${kw} engineered to ${benefit1}. Experience the difference ${brandMention}.`,
      `The modern way to ${benefit1}. Check out ${kw} ${brandMention ? `at ${brand}` : "now"}.`
    );
  }

  // 1. Benefit & Solution Driven Templates
  templates.push(
    `Looking for ${kw}? Discover how to ${benefit1}${benefit2 ? ` and ${benefit2}` : ""}. ${brandMention ? `Explore with ${brand}. ` : ""}${cta}`
  );

  templates.push(
    `Explore ${kw} designed to ${benefit1}. ${benefit2 ? `Enjoy ${benefit2}. ` : ""}${brandMention ? `Available ${brandMention}. ` : ""}${cta}`
  );

  // 2. Guide / Informational / Article style
  templates.push(
    `Everything you need to know about ${kw}. Learn how to ${benefit1}${benefit2 ? ` while achieving ${benefit2}` : ""}. ${cta}`
  );

  templates.push(
    `Compare top solutions for ${kw}. Discover key insights on ${benefit1}${secKw ? ` and ${secKw}` : ""}. ${cta}`
  );

  // 3. Ecommerce & Product Page style
  templates.push(
    `Shop premium ${kw} ${byBrand}. Engineered to ${benefit1}${benefit2 ? ` with ${benefit2}` : ""}. ${cta}`
  );

  templates.push(
    `Discover ${kw} built for real results. Experience ${benefit1}${benefit2 ? ` plus ${benefit2}` : ""}. ${brand ? `${brand} guarantees quality. ` : ""}${cta}`
  );

  // 4. Service / Agency / Local style
  templates.push(
    `Professional ${kw} services ${brandMention}. We help you ${benefit1}${benefit2 ? ` and ${benefit2}` : ""}. ${cta}`
  );

  templates.push(
    `Need dependable ${kw}? Get expert assistance to ${benefit1}. ${brand ? `Partner with ${brand}. ` : ""}${cta}`
  );

  // 5. Direct / Simple & Action-Oriented style
  templates.push(
    `Find the right ${kw} today. ${benefit1.charAt(0).toUpperCase() + benefit1.slice(1)}${benefit2 ? ` and ${benefit2}` : ""}. ${cta}`
  );

  templates.push(
    `${kw} made simple${brandMention ? ` with ${brand}` : ""}. Start experiencing ${benefit1}${benefit2 ? ` alongside ${benefit2}` : ""}. ${cta}`
  );

  // 6. Secondary keyword integrated variations
  if (secKw) {
    templates.push(
      `Master ${kw} and ${secKw}. Our practical guide shows you how to ${benefit1}. ${cta}`
    );
    templates.push(
      `High-performing ${kw} with advanced ${secKw}. Built to ${benefit1}${benefit2 ? ` and ${benefit2}` : ""}. ${cta}`
    );
  } else {
    templates.push(
      `Upgrade your approach to ${kw}. See how to ${benefit1} without unnecessary hassle. ${cta}`
    );
    templates.push(
      `Reliable, tested ${kw} solutions. Focus on ${benefit1} with confidence. ${cta}`
    );
  }

  // Deduplicate and fit to length
  const candidates: string[] = [];
  const seen = new Set<string>();

  for (const raw of templates) {
    let clean = cleanText(raw);
    if (clean.length > targetLen) {
      const truncated = clean.slice(0, targetLen);
      const lastSentence = truncated.lastIndexOf(".");
      if (lastSentence > 100) {
        clean = truncated.slice(0, lastSentence + 1);
      } else {
        const lastSpace = truncated.lastIndexOf(" ");
        clean = (lastSpace > 80 ? truncated.slice(0, lastSpace) : truncated) + "...";
      }
    }

    const lower = clean.toLowerCase();
    if (!seen.has(lower) && clean.length >= 60) {
      seen.add(lower);
      candidates.push(clean);
    }
  }

  // Ensure at least 10 items
  let fillIdx = 1;
  while (candidates.length < 10) {
    const extra = cleanText(
      `Discover effective ${kw} options ${brandMention}. Designed to ${benefit1}. ${cta} (Option ${fillIdx})`
    );
    if (!seen.has(extra.toLowerCase())) {
      seen.add(extra.toLowerCase());
      candidates.push(extra);
    }
    fillIdx++;
  }

  const results: GeneratedMetaDescription[] = candidates.slice(0, 12).map((desc, idx) => {
    const scored = scoreMetaDescription(desc, kw, secKw, rawCta || cta, targetLen);
    const lowerDesc = desc.toLowerCase();
    const metaTitle = input.generateTitle
      ? buildPairedMetaTitle(idx, kw, input.pageTitle, brand, benefit1)
      : undefined;

    return {
      id: `meta-${idx + 1}-${Date.now()}`,
      description: desc,
      characterCount: desc.length,
      hasPrimaryKeyword: Boolean(kw && lowerDesc.includes(kw.toLowerCase())),
      hasSecondaryKeyword: Boolean(secKw && lowerDesc.includes(secKw.toLowerCase())),
      hasCta: Boolean(rawCta && lowerDesc.includes(rawCta.toLowerCase())),
      score: scored.score,
      reason: scored.reason,
      metaTitle,
      titleCharCount: metaTitle ? metaTitle.length : undefined
    };
  });

  return results.sort((a, b) => b.score - a.score);
}

export function computeMetaDescriptionSummary(
  results: GeneratedMetaDescription[],
  primaryKeyword: string
): MetaDescriptionSummary {
  if (results.length === 0) {
    return {
      totalGenerated: 0,
      bestScore: 0,
      averageLength: 0,
      keywordCoveragePct: 0,
      ctaCoveragePct: 0
    };
  }

  const bestScore = Math.max(...results.map((r) => r.score));
  const avgLen = Math.round(
    results.reduce((acc, r) => acc + r.characterCount, 0) / results.length
  );
  const kwLower = primaryKeyword.trim().toLowerCase();
  const kwMatches = results.filter((r) => r.description.toLowerCase().includes(kwLower)).length;
  const ctaMatches = results.filter((r) => r.hasCta).length;

  return {
    totalGenerated: results.length,
    bestScore,
    averageLength: avgLen,
    keywordCoveragePct: Math.round((kwMatches / results.length) * 100),
    ctaCoveragePct: Math.round((ctaMatches / results.length) * 100)
  };
}

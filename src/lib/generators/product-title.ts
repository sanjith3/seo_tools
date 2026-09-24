export type MarketplaceType =
  | "General Ecommerce"
  | "Shopify"
  | "Amazon"
  | "eBay"
  | "WooCommerce"
  | "Etsy";

export type ProductTitleTone =
  | "Professional"
  | "Premium"
  | "Simple"
  | "Descriptive"
  | "SEO Focused";

export interface ProductTitleInput {
  productName: string;
  primaryKeyword: string;
  brand?: string;
  category?: string;
  feature1?: string;
  feature2?: string;
  feature3?: string;
  targetAudience?: string;
  marketplace: MarketplaceType;
  tone: ProductTitleTone;
  maxLength: number;
}

export interface GeneratedProductTitle {
  id: string;
  title: string;
  score: number;
  characterCount: number;
  keywordIndicator: "Front-Loaded" | "Early Position" | "Included" | "Not Found";
  reason: string;
  marketplace: MarketplaceType;
}

export interface ProductTitleSummary {
  totalGenerated: number;
  bestScore: number;
  averageLength: number;
  keywordCoveragePct: number;
}

function cleanText(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/\s+([,.|•\-])/g, "$1")
    .replace(/([,.|•\-])\s+/g, "$1 ")
    .replace(/[-|•]\s*[-|•]+/g, "-")
    .trim();
}

function toTitleCase(str: string): string {
  const smallWords = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "in", "nor", "of", "on", "or", "the", "to", "with", "vs"]);
  return str
    .toLowerCase()
    .split(" ")
    .map((word, idx) => {
      if (!word) return "";
      if (idx === 0 || !smallWords.has(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(" ");
}

function countWords(str: string): number {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

export function scoreProductTitle(
  title: string,
  primaryKeyword: string,
  features: string[],
  maxLength: number
): { score: number; keywordIndicator: GeneratedProductTitle["keywordIndicator"]; reason: string } {
  let score = 0;
  const lowerTitle = title.toLowerCase();
  const lowerKeyword = primaryKeyword.trim().toLowerCase();

  // 1. Keyword Presence & Placement (up to 45 points)
  let keywordIndicator: GeneratedProductTitle["keywordIndicator"] = "Not Found";
  if (lowerKeyword && lowerTitle.includes(lowerKeyword)) {
    const kwIndex = lowerTitle.indexOf(lowerKeyword);
    if (kwIndex === 0) {
      score += 45;
      keywordIndicator = "Front-Loaded";
    } else if (kwIndex < 25) {
      score += 40;
      keywordIndicator = "Early Position";
    } else {
      score += 30;
      keywordIndicator = "Included";
    }
  } else if (lowerKeyword) {
    // Partial word match
    const kwWords = lowerKeyword.split(/\s+/);
    const matchedCount = kwWords.filter((w) => lowerTitle.includes(w)).length;
    const matchRatio = matchedCount / Math.max(1, kwWords.length);
    score += Math.round(matchRatio * 20);
    keywordIndicator = matchRatio > 0.5 ? "Included" : "Not Found";
  }

  // 2. Length Optimization (up to 25 points)
  const charCount = title.length;
  if (charCount <= maxLength) {
    if (charCount >= 40 && charCount <= Math.min(maxLength, 120)) {
      score += 25; // Ideal sweet spot
    } else if (charCount < 40 && charCount >= 20) {
      score += 18;
    } else if (charCount <= maxLength) {
      score += 15;
    }
  } else {
    score += 5; // Over length penalty
  }

  // 3. Feature Relevance (up to 15 points)
  let featureBonus = 0;
  features.forEach((feat) => {
    if (feat && lowerTitle.includes(feat.toLowerCase())) {
      featureBonus += 5;
    }
  });
  score += Math.min(15, featureBonus);

  // 4. Repetition & Readability (up to 15 points)
  const words = lowerTitle.replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean);
  const wordSet = new Set(words);
  const repetitionRate = words.length > 0 ? (words.length - wordSet.size) / words.length : 0;
  if (repetitionRate === 0) {
    score += 15;
  } else if (repetitionRate < 0.2) {
    score += 8;
  } else {
    score += 2;
  }

  // Reason generation
  const reasons: string[] = [];
  if (keywordIndicator === "Front-Loaded" || keywordIndicator === "Early Position") {
    reasons.push("Strong keyword placement");
  }
  if (charCount >= 35 && charCount <= 100) {
    reasons.push("Optimal length for search visibility");
  }
  if (featureBonus > 0) {
    reasons.push("Clear feature relevance");
  }
  if (reasons.length === 0) {
    reasons.push("Clean listing structure");
  }

  return {
    score: Math.min(100, Math.max(20, score)),
    keywordIndicator,
    reason: reasons.join(" • ")
  };
}

export function generateProductTitles(input: ProductTitleInput): GeneratedProductTitle[] {
  const brand = input.brand ? toTitleCase(input.brand.trim()) : "";
  const name = toTitleCase(input.productName.trim());
  const keyword = toTitleCase(input.primaryKeyword.trim());
  const audience = input.targetAudience ? input.targetAudience.trim() : "";
  const category = input.category ? toTitleCase(input.category.trim()) : "";
  const rawMaxLength = Math.max(30, input.maxLength || 120);
  const isEbay = input.marketplace === "eBay";
  const maxLength = isEbay ? Math.min(rawMaxLength, 80) : rawMaxLength;

  const features = [input.feature1, input.feature2, input.feature3]
    .map((f) => (f ? toTitleCase(f.trim()) : ""))
    .filter((f) => Boolean(f) && f.length > 1);

  const f1 = features[0] || "";
  const f2 = features[1] || "";
  const f3 = features[2] || "";
  const combinedFeatures = features.slice(0, 2).join(" & ");

  // Marketplace & Tone tailored template matrix
  const candidates: string[] = [];

  // Helper to compose brand prefix
  const withBrand = (main: string) => (brand ? `${brand} ${main}` : main);

  // 1. eBay-focused structures (Strict 80 character ceiling, search term density, no punctuation waste)
  if (isEbay) {
    if (brand) {
      candidates.push(`${brand} ${name} ${keyword}${f1 ? ` ${f1}` : ""}`);
      candidates.push(`${brand} ${keyword} ${name}${f1 ? ` ${f1}` : ""}${f2 ? ` ${f2}` : ""}`);
      candidates.push(`${brand} ${name} ${keyword} Original${f1 ? ` ${f1}` : ""}`);
      candidates.push(`${brand} ${keyword} for ${audience || "Daily Use"} ${f1 || ""}`);
      candidates.push(`${brand} ${name} ${keyword} - ${f1 || "High Quality"}`);
      candidates.push(`${brand} ${keyword} ${f1 || ""} ${name}`);
      candidates.push(`${name} ${keyword} by ${brand}${f1 ? ` ${f1}` : ""}`);
      candidates.push(`${brand} ${name} Official ${keyword}`);
    } else {
      candidates.push(`${name} ${keyword}${f1 ? ` ${f1}` : ""}${f2 ? ` ${f2}` : ""}`);
      candidates.push(`${keyword} ${name}${f1 ? ` ${f1}` : ""}${audience ? ` ${audience}` : ""}`);
      candidates.push(`${name} ${keyword} New${f1 ? ` ${f1}` : ""}`);
      candidates.push(`${keyword} ${name} Set${f1 ? ` ${f1}` : ""}`);
      candidates.push(`New ${keyword} ${name}${f1 ? ` ${f1}` : ""}`);
      candidates.push(`${keyword} for ${audience || "Daily Use"} ${name}${f1 ? ` ${f1}` : ""}`);
      candidates.push(`${name} ${keyword} ${f1 || ""}`);
      candidates.push(`${keyword} ${name} OEM Style ${f1 || ""}`);
    }
  }

  // 2. Amazon-focused structures (Brand + Core Title + Specs/Key Feature + Audience)
  if (brand) {
    candidates.push(`${brand} ${keyword} – ${name} with ${combinedFeatures || f1 || "High Performance"}`);
    candidates.push(`${brand} ${name} – ${keyword}${f1 ? ` – ${f1}` : ""}${audience ? ` for ${audience}` : ""}`);
    candidates.push(`${brand} ${keyword} | ${name} | ${f1 || "Durable Design"}${f2 ? ` & ${f2}` : ""}`);
    candidates.push(`${brand} ${name}: ${keyword}${f1 ? `, ${f1}` : ""}${f2 ? `, ${f2}` : ""}`);
  } else {
    candidates.push(`${keyword} – ${name} with ${combinedFeatures || f1 || "Enhanced Design"}`);
    candidates.push(`${name} – ${keyword}${f1 ? ` – ${f1}` : ""}${audience ? ` for ${audience}` : ""}`);
    candidates.push(`${keyword} | ${name} | ${f1 || "Essential"}${f2 ? ` & ${f2}` : ""}`);
    candidates.push(`${name}: ${keyword}${f1 ? `, ${f1}` : ""}${f2 ? `, ${f2}` : ""}`);
  }

  // 3. Shopify & Direct-to-Consumer structures (Brand forward, benefit clarity, modern separators)
  candidates.push(withBrand(`${name} – The ${keyword}`));
  candidates.push(withBrand(`The ${name} ${keyword}${f1 ? ` • ${f1}` : ""}`));
  candidates.push(withBrand(`${keyword} | ${name}${audience ? ` for ${audience}` : ""}`));
  candidates.push(withBrand(`${name} | Premium ${keyword}${f1 ? ` with ${f1}` : ""}`));

  // 4. Etsy-focused structures (Descriptive, keyword-rich, audience-specific, handcrafted style)
  candidates.push(`${keyword}, ${name}${f1 ? `, ${f1}` : ""}${audience ? `, Gift for ${audience}` : ""}`);
  candidates.push(`${name} – Custom ${keyword}${f1 ? ` with ${f1}` : ""}${category ? ` | ${category}` : ""}`);
  candidates.push(`${keyword} for ${audience || "Daily Use"} – ${name}${f1 ? ` (${f1})` : ""}`);
  candidates.push(`Handcrafted ${name} – ${keyword}${f1 ? ` • ${f1}` : ""}`);

  // 5. WooCommerce & General Ecommerce structures
  candidates.push(withBrand(`${name} ${keyword}${f1 ? ` - ${f1}` : ""}${f2 ? ` - ${f2}` : ""}`));
  candidates.push(withBrand(`${keyword}: ${name}${audience ? ` (${audience})` : ""}`));
  candidates.push(`${keyword} – ${withBrand(name)}${f1 ? ` Featuring ${f1}` : ""}`);
  candidates.push(withBrand(`${name} – Official ${keyword}${category ? ` | ${category}` : ""}`));

  // 5. Tone-based variations:
  // Professional
  candidates.push(withBrand(`${name} Professional ${keyword}${f1 ? ` with ${f1}` : ""}`));
  candidates.push(`${keyword} – ${withBrand(name)} for Commercial and Everyday Demands`);

  // Premium / Luxury
  candidates.push(withBrand(`${name} Signature Series: ${keyword}${f1 ? ` with ${f1}` : ""}`));
  candidates.push(withBrand(`Elevated ${keyword} – The ${name}${f1 ? ` in ${f1}` : ""}`));

  // Simple / Minimal
  candidates.push(withBrand(`${keyword} – ${name}`));
  candidates.push(withBrand(`${name} | ${keyword}`));

  // Descriptive
  candidates.push(
    withBrand(
      `${keyword} (${name})${f1 ? ` with ${f1}` : ""}${f2 ? `, ${f2}` : ""}${audience ? ` – Ideal for ${audience}` : ""}`
    )
  );
  candidates.push(
    withBrand(
      `${name} ${keyword} – ${f1 ? `${f1}` : "Engineered Design"}${f2 ? ` and ${f2}` : ""}${audience ? ` for ${audience}` : ""}`
    )
  );

  // SEO Focused (Frontloaded keywords)
  candidates.push(`${keyword} | ${withBrand(name)}${f1 ? ` | ${f1}` : ""}${f2 ? ` | ${f2}` : ""}`);
  candidates.push(`${keyword} by ${brand || "Zenvuk"} – ${name}${f1 ? ` – ${f1}` : ""}`);
  candidates.push(`${keyword} for ${audience || "Everyday Use"} – ${withBrand(name)}`);
  candidates.push(`${keyword} – High Quality ${name}${f1 ? ` with ${f1}` : ""}`);

  // Clean, deduplicate and fit into maxLength
  const uniqueClean: string[] = [];
  const seen = new Set<string>();

  for (const raw of candidates) {
    let cleaned = cleanText(raw);
    // Trim to maxLength cleanly without cutting mid-word if possible
    if (cleaned.length > maxLength) {
      const truncated = cleaned.slice(0, maxLength);
      const lastSpace = truncated.lastIndexOf(" ");
      cleaned = lastSpace > 20 ? truncated.slice(0, lastSpace).trim() : truncated.trim();
      // Remove trailing punctuation from truncation
      cleaned = cleaned.replace(/[-–—,:|•]+$/, "").trim();
    }

    const lowerKey = cleaned.toLowerCase();
    if (!seen.has(lowerKey) && cleaned.length >= 15) {
      seen.add(lowerKey);
      uniqueClean.push(cleaned);
    }
  }

  // Ensure we reach 20 titles
  let fillerIndex = 1;
  while (uniqueClean.length < 20) {
    const extra = cleanText(
      withBrand(`${keyword} – ${name} Edition ${fillerIndex}${f1 ? ` (${f1})` : ""}`)
    );
    if (!seen.has(extra.toLowerCase())) {
      seen.add(extra.toLowerCase());
      uniqueClean.push(extra);
    }
    fillerIndex++;
  }

  // Score each title
  const scoredTitles: GeneratedProductTitle[] = uniqueClean.slice(0, 20).map((title, index) => {
    const scoreData = scoreProductTitle(title, input.primaryKeyword, features, maxLength);
    return {
      id: `title-${index + 1}-${Date.now()}`,
      title,
      score: scoreData.score,
      characterCount: title.length,
      keywordIndicator: scoreData.keywordIndicator,
      reason: scoreData.reason,
      marketplace: input.marketplace
    };
  });

  // Sort by score descending
  return scoredTitles.sort((a, b) => b.score - a.score);
}

export function computeProductTitleSummary(
  results: GeneratedProductTitle[],
  keyword: string
): ProductTitleSummary {
  if (results.length === 0) {
    return { totalGenerated: 0, bestScore: 0, averageLength: 0, keywordCoveragePct: 0 };
  }

  const bestScore = Math.max(...results.map((r) => r.score));
  const avgLen = Math.round(
    results.reduce((acc, r) => acc + r.characterCount, 0) / results.length
  );
  const kwLower = keyword.trim().toLowerCase();
  const matched = results.filter((r) => r.title.toLowerCase().includes(kwLower)).length;
  const coverage = Math.round((matched / results.length) * 100);

  return {
    totalGenerated: results.length,
    bestScore,
    averageLength: avgLen,
    keywordCoveragePct: coverage
  };
}

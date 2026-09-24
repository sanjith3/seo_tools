export type NamingStyle =
  | "Professional"
  | "Modern"
  | "Premium"
  | "Minimal"
  | "Technical"
  | "Playful"
  | "Futuristic"
  | "Luxury";

export type NameLengthFilter = "Short" | "Medium" | "Any";

export interface ProductNameInput {
  category: string;
  productType: string;
  keyword: string;
  concept: string;
  targetAudience?: string;
  style: NamingStyle;
  lengthFilter: NameLengthFilter;
  prefix?: string;
  suffix?: string;
  wordsToAvoid?: string;
}

export interface GeneratedProductName {
  id: string;
  name: string;
  style: NamingStyle;
  syllables: number;
  score: number;
  categoryTag: string;
  reason: string;
}

export interface ProductNameSummary {
  totalGenerated: number;
  bestScore: number;
  averageLength: number;
  styleName: string;
}

// Phonetic and semantic syllable banks
const MODERN_STEMS = ["Nova", "Velo", "Luma", "Nexa", "Aura", "Aven", "Solin", "Kivo", "Mira", "Verve", "Zeph", "Alto", "Stratos", "Apex", "Prism", "Echo", "Orion", "Volt", "Flux", "Axon"];
const TECH_STEMS = ["Syn", "Cortex", "Quant", "Data", "Byte", "Vector", "Logic", "Proto", "Algo", "Omni", "Hyper", "Cyber", "Nexus", "Pulse", "Matrix", "Kinetics", "Optic", "Helix", "Circuit", "Core"];
const LUXURY_STEMS = ["Aurelia", "Monarch", "Valence", "Sovereign", "Elysian", "Argent", "Celeste", "Opulence", "Vanguard", "Meridian", "Belgravia", "Kensington", "Crest", "Crown", "Veritas", "Regalia", "Nocturne", "Silk", "Luster", "Solstice"];
const PLAYFUL_STEMS = ["Zippy", "Sprout", "Bumble", "Wobble", "Pip", "Snack", "Doodle", "Twist", "Whiz", "Pebble", "Jolly", "Bub", "Nifty", "Spark", "Munch", "Pop", "Flick", "Chirp", "Tumble", "Scoot"];
const MINIMAL_STEMS = ["Form", "Pure", "Mod", "Base", "Mono", "Raw", "Line", "Null", "Root", "Plain", "Unit", "Bare", "Void", "Dot", "True", "Arc", "Axis", "Span", "Grid", "Fold"];

const STYLE_SUFFIXES: Record<NamingStyle, string[]> = {
  Professional: ["Pro", "Group", "Solutions", "Works", "Lab", "Hub", "Desk", "Craft", "Engine", "Logic"],
  Modern: ["ly", "ify", "io", "ia", "iq", "ex", "is", "up", "flow", "go"],
  Premium: ["Select", "Reserve", "Prime", "Elite", "Signature", "Heritage", "Edition", "Studio", "Atelier", "Guild"],
  Minimal: ["One", "Go", "Co", "Air", "Kit", "Box", "Set", "Pad", "Pod", "Base"],
  Technical: ["ix", "os", "sync", "link", "net", "tech", "node", "sys", "byte", "core"],
  Playful: ["roo", "pop", "pal", "bee", "hop", "kit", "ling", "joy", "box", "hub"],
  Futuristic: ["on", "ex", "ium", "oid", "tron", "ora", "ion", "ix", "aris", "nova"],
  Luxury: ["Maison", "Privé", "Imperial", "Noir", "Luxe", "Gold", "Velvet", "Royale", "Haute", "Parc"]
};

function cleanWord(str: string): string {
  return str.replace(/[^a-zA-Z0-9]/g, "").trim();
}

function toTitle(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function estimateSyllables(word: string): number {
  const clean = word.toLowerCase().replace(/[^a-z]/g, "");
  if (clean.length <= 3) return 1;
  const matches = clean.match(/[aeiouy]{1,2}/g);
  return matches ? Math.max(1, matches.length) : 1;
}

export function scoreProductName(
  name: string,
  keyword: string,
  concept: string,
  avoidWords: string[]
): { score: number; reason: string } {
  let score = 70;
  const lowerName = name.toLowerCase();

  // Deduct if contains avoided words
  for (const avoid of avoidWords) {
    if (avoid && lowerName.includes(avoid.toLowerCase())) {
      return { score: 10, reason: "Contains term from avoided words list." };
    }
  }

  // Length optimization (sweet spot 5 - 12 characters)
  const len = name.length;
  if (len >= 5 && len <= 10) {
    score += 15;
  } else if (len >= 11 && len <= 14) {
    score += 10;
  } else {
    score += 2;
  }

  // Pronounceability and rhythm (vowel-to-consonant balance)
  const vowels = (lowerName.match(/[aeiouy]/g) || []).length;
  const consonants = (lowerName.match(/[bcdfghjklmnpqrstvwxz]/g) || []).length;
  const ratio = vowels / Math.max(1, consonants);
  if (ratio >= 0.4 && ratio <= 0.9) {
    score += 10; // Natural phonetics
  } else {
    score += 4;
  }

  // Relevance bonus if stem from keyword or concept exists
  const kwLower = keyword.toLowerCase();
  const conceptLower = concept.toLowerCase();
  if (kwLower && lowerName.includes(kwLower.slice(0, 4))) {
    score += 5;
  }
  if (conceptLower && lowerName.includes(conceptLower.slice(0, 4))) {
    score += 5;
  }

  const reasons = [
    len <= 10 ? "Concise and brandable" : "Descriptive product identity",
    "Balanced syllable flow",
    "Distinct market positioning"
  ];

  return {
    score: Math.min(99, Math.max(40, score)),
    reason: reasons.slice(0, 2).join(" • ")
  };
}

export function generateProductNames(input: ProductNameInput): GeneratedProductName[] {
  const kwRoot = toTitle(cleanWord(input.keyword));
  const conceptRoot = toTitle(cleanWord(input.concept));
  const typeRoot = toTitle(cleanWord(input.productType));
  const categoryRoot = toTitle(cleanWord(input.category));
  const prefix = input.prefix ? toTitle(cleanWord(input.prefix)) : "";
  const suffix = input.suffix ? toTitle(cleanWord(input.suffix)) : "";

  const avoidList = (input.wordsToAvoid || "")
    .split(",")
    .map((w) => w.trim().toLowerCase())
    .filter(Boolean);

  // Select stem dictionary based on style
  let stemPool = MODERN_STEMS;
  if (input.style === "Technical") stemPool = TECH_STEMS;
  else if (input.style === "Luxury") stemPool = LUXURY_STEMS;
  else if (input.style === "Playful") stemPool = PLAYFUL_STEMS;
  else if (input.style === "Minimal") stemPool = MINIMAL_STEMS;
  else if (input.style === "Futuristic") stemPool = [...MODERN_STEMS, ...TECH_STEMS];
  else if (input.style === "Premium") stemPool = [...LUXURY_STEMS, ...MODERN_STEMS];

  const styleSuffixes = STYLE_SUFFIXES[input.style] || STYLE_SUFFIXES.Modern;

  const rawCandidates: string[] = [];

  // 1. Compound Stems: Style Stem + Concept/Keyword
  stemPool.forEach((stem) => {
    if (conceptRoot) rawCandidates.push(`${stem}${conceptRoot}`);
    if (kwRoot) rawCandidates.push(`${stem} ${kwRoot}`);
    if (typeRoot) rawCandidates.push(`${stem}${typeRoot}`);
  });

  // 2. Neologisms / Portmanteaus: Root + Suffix
  const roots = [kwRoot, conceptRoot, categoryRoot].filter(Boolean);
  roots.forEach((root) => {
    const shortened = root.length > 5 ? root.slice(0, 4) : root;
    styleSuffixes.forEach((suf) => {
      rawCandidates.push(`${shortened}${suf.toLowerCase()}`);
      rawCandidates.push(`${root} ${suf}`);
    });
  });

  // 3. Stems + Style Suffixes
  stemPool.forEach((stem) => {
    styleSuffixes.forEach((suf) => {
      rawCandidates.push(`${stem}${suf}`);
      rawCandidates.push(`${stem} ${suf}`);
    });
  });

  // 4. Clean and filter by avoid list, prefix, suffix, and lengthFilter
  const uniqueNames: string[] = [];
  const seen = new Set<string>();

  for (let candidate of rawCandidates) {
    if (prefix) candidate = `${prefix} ${candidate}`;
    if (suffix) candidate = `${candidate} ${suffix}`;
    candidate = candidate.trim().replace(/\s+/g, " ");

    const lower = candidate.toLowerCase();

    // Check avoid words
    const containsAvoid = avoidList.some((avoid) => lower.includes(avoid));
    if (containsAvoid) continue;

    // Check length filter
    const totalChars = candidate.replace(/\s+/g, "").length;
    if (input.lengthFilter === "Short" && totalChars > 9) continue;
    if (input.lengthFilter === "Medium" && (totalChars < 8 || totalChars > 16)) continue;

    if (!seen.has(lower) && candidate.length >= 3) {
      seen.add(lower);
      uniqueNames.push(candidate);
    }
  }

  // Ensure at least 30 names
  let fallbackIdx = 1;
  while (uniqueNames.length < 30) {
    const baseStem = stemPool[fallbackIdx % stemPool.length];
    const candidate = `${baseStem}${kwRoot ? kwRoot.slice(0, 3) : "Craft"}${fallbackIdx}`;
    if (!seen.has(candidate.toLowerCase())) {
      seen.add(candidate.toLowerCase());
      uniqueNames.push(candidate);
    }
    fallbackIdx++;
  }

  const results: GeneratedProductName[] = uniqueNames.slice(0, 30).map((name, index) => {
    const scored = scoreProductName(name, input.keyword, input.concept, avoidList);
    return {
      id: `name-${index + 1}-${Date.now()}`,
      name,
      style: input.style,
      syllables: estimateSyllables(name),
      score: scored.score,
      categoryTag: input.category || "Ecommerce",
      reason: scored.reason
    };
  });

  return results.sort((a, b) => b.score - a.score);
}

export function computeProductNameSummary(
  results: GeneratedProductName[],
  style: NamingStyle
): ProductNameSummary {
  if (results.length === 0) {
    return { totalGenerated: 0, bestScore: 0, averageLength: 0, styleName: style };
  }

  const bestScore = Math.max(...results.map((r) => r.score));
  const avgLen = Math.round(
    results.reduce((acc, r) => acc + r.name.length, 0) / results.length
  );

  return {
    totalGenerated: results.length,
    bestScore,
    averageLength: avgLen,
    styleName: style
  };
}

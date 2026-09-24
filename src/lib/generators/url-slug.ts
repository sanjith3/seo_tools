// Stop words for URL slug cleaning
const SLUG_STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for", "with",
  "by", "of", "from", "as", "is", "it", "this", "that", "are", "was", "be",
]);

export interface SlugOptions {
  separator?: "-" | "_";
  removeStopWords?: boolean;
  stripNumbers?: boolean;
  maxLength?: number;
  preserveCase?: boolean;
  prefix?: string;
  suffix?: string;
}

export interface SlugAnalysis {
  original: string;
  slug: string;
  charCount: number;
  wordCount: number;
  removedStopWords: string[];
  issues: string[];
}

export function generateSlug(rawInput: string, options: SlugOptions = {}): SlugAnalysis {
  const {
    separator = "-",
    removeStopWords = false,
    stripNumbers = false,
    maxLength = 80,
    preserveCase = false,
    prefix = "",
    suffix = "",
  } = options;

  if (!rawInput || !rawInput.trim()) {
    return {
      original: "",
      slug: "",
      charCount: 0,
      wordCount: 0,
      removedStopWords: [],
      issues: ["Input text is empty."],
    };
  }

  const issues: string[] = [];
  const removedStopWords: string[] = [];

  // Normalize Unicode characters (accents/diacritics e.g. é -> e, ñ -> n)
  let text = rawInput
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (!preserveCase) {
    text = text.toLowerCase();
  }

  // Strip or normalize punctuation & symbols
  text = text
    .replace(/[&]/g, " and ")
    .replace(/[@]/g, " at ")
    .replace(/[#]/g, " number ")
    .replace(/[%]/g, " percent ");

  // Remove all non-alphanumeric characters except whitespace
  text = text.replace(/[^a-zA-Z0-9\s-]/g, " ");

  if (stripNumbers) {
    text = text.replace(/[0-9]/g, " ");
  }

  // Tokenize into words
  const rawTokens = text.split(/\s+/).filter(Boolean);

  const filteredTokens: string[] = [];
  for (const token of rawTokens) {
    if (removeStopWords && SLUG_STOP_WORDS.has(token.toLowerCase())) {
      removedStopWords.push(token);
    } else {
      filteredTokens.push(token);
    }
  }

  let finalTokens = filteredTokens.length > 0 ? filteredTokens : rawTokens;

  // Join with chosen separator
  let slug = finalTokens.join(separator);

  // Apply Prefix and Suffix if present
  if (prefix.trim()) {
    const cleanPrefix = prefix.trim().replace(/[^a-zA-Z0-9_-]/g, "");
    slug = `${cleanPrefix}${separator}${slug}`;
  }

  if (suffix.trim()) {
    const cleanSuffix = suffix.trim().replace(/[^a-zA-Z0-9_-]/g, "");
    slug = `${slug}${separator}${cleanSuffix}`;
  }

  // Truncate cleanly at word boundary if maxLength exceeded
  if (maxLength && slug.length > maxLength) {
    let truncated = slug.slice(0, maxLength);
    const lastSeparator = truncated.lastIndexOf(separator);
    if (lastSeparator > 10) {
      truncated = truncated.slice(0, lastSeparator);
    }
    slug = truncated;
    issues.push(`Slug truncated to ${slug.length} chars to stay within the ${maxLength} character limit.`);
  }

  // Clean trailing or leading separators
  slug = slug.replace(new RegExp(`^\\${separator}+|\\${separator}+$`, "g"), "");

  if (slug.length > 75) {
    issues.push("Slug is relatively long (>75 characters). Shorter, keyword-focused slugs perform better in search results.");
  }

  return {
    original: rawInput,
    slug,
    charCount: slug.length,
    wordCount: finalTokens.length,
    removedStopWords,
    issues,
  };
}

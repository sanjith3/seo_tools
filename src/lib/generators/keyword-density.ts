// Stop words list for English filtering
export const ENGLISH_STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are",
  "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both",
  "but", "by", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't",
  "doing", "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't",
  "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here",
  "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm",
  "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's", "me", "more",
  "most", "mustn't", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or",
  "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "shan't", "she",
  "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such", "than", "that", "that's",
  "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they",
  "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under",
  "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were", "weren't",
  "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom",
  "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've",
  "your", "yours", "yourself", "yourselves"
]);

export interface NGramItem {
  phrase: string;
  count: number;
  density: number; // percentage (e.g. 2.45)
  isStopWord?: boolean;
}

export interface KeywordDensityResult {
  totalWords: number;
  uniqueWords: number;
  readingTimeMinutes: number;
  unigrams: NGramItem[];
  bigrams: NGramItem[];
  trigrams: NGramItem[];
  fourgrams: NGramItem[];
}

export interface AnalyzeOptions {
  includeStopWords?: boolean;
  minWordLength?: number;
  topLimit?: number;
}

export function analyzeKeywordDensity(
  text: string,
  options: AnalyzeOptions = {}
): KeywordDensityResult {
  const { includeStopWords = false, minWordLength = 2, topLimit = 20 } = options;

  if (!text || !text.trim()) {
    return {
      totalWords: 0,
      uniqueWords: 0,
      readingTimeMinutes: 0,
      unigrams: [],
      bigrams: [],
      trigrams: [],
      fourgrams: [],
    };
  }

  // Tokenize words, stripping punctuation and converting to lowercase
  const rawTokens = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= minWordLength);

  const totalWords = rawTokens.length;
  const readingTimeMinutes = Math.max(1, Math.round(totalWords / 200));

  // Compute 1-grams
  const unigramCounts = new Map<string, number>();
  for (const token of rawTokens) {
    if (!includeStopWords && ENGLISH_STOP_WORDS.has(token)) {
      continue;
    }
    unigramCounts.set(token, (unigramCounts.get(token) || 0) + 1);
  }

  // Compute 2-grams (bigrams)
  const bigramCounts = new Map<string, number>();
  for (let i = 0; i < rawTokens.length - 1; i++) {
    const w1 = rawTokens[i];
    const w2 = rawTokens[i + 1];
    if (!includeStopWords && (ENGLISH_STOP_WORDS.has(w1) || ENGLISH_STOP_WORDS.has(w2))) {
      continue;
    }
    const phrase = `${w1} ${w2}`;
    bigramCounts.set(phrase, (bigramCounts.get(phrase) || 0) + 1);
  }

  // Compute 3-grams (trigrams)
  const trigramCounts = new Map<string, number>();
  for (let i = 0; i < rawTokens.length - 2; i++) {
    const w1 = rawTokens[i];
    const w2 = rawTokens[i + 1];
    const w3 = rawTokens[i + 2];
    if (!includeStopWords && (ENGLISH_STOP_WORDS.has(w1) && ENGLISH_STOP_WORDS.has(w3))) {
      continue;
    }
    const phrase = `${w1} ${w2} ${w3}`;
    trigramCounts.set(phrase, (trigramCounts.get(phrase) || 0) + 1);
  }

  // Compute 4-grams (fourgrams)
  const fourgramCounts = new Map<string, number>();
  for (let i = 0; i < rawTokens.length - 3; i++) {
    const phrase = `${rawTokens[i]} ${rawTokens[i + 1]} ${rawTokens[i + 2]} ${rawTokens[i + 3]}`;
    fourgramCounts.set(phrase, (fourgramCounts.get(phrase) || 0) + 1);
  }

  const formatNGramList = (map: Map<string, number>, n: number): NGramItem[] => {
    const effectiveTotal = Math.max(1, totalWords - n + 1);
    return Array.from(map.entries())
      .map(([phrase, count]) => ({
        phrase,
        count,
        density: parseFloat(((count / effectiveTotal) * 100).toFixed(2)),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, topLimit);
  };

  return {
    totalWords,
    uniqueWords: new Set(rawTokens).size,
    readingTimeMinutes,
    unigrams: formatNGramList(unigramCounts, 1),
    bigrams: formatNGramList(bigramCounts, 2),
    trigrams: formatNGramList(trigramCounts, 3),
    fourgrams: formatNGramList(fourgramCounts, 4),
  };
}

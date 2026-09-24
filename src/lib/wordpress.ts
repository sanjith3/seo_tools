export interface WordPressEmbeddedMedia {
  id: number;
  source_url: string;
  alt_text?: string;
  media_details?: {
    width?: number;
    height?: number;
    sizes?: Record<string, { source_url: string; width: number; height: number }>;
  };
}

export interface WordPressEmbeddedAuthor {
  id: number;
  name: string;
  url?: string;
  description?: string;
  link?: string;
  slug?: string;
  avatar_urls?: Record<string, string>;
}

export interface WordPressEmbeddedTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
  link?: string;
}

export interface WordPressPost {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: "publish" | "draft" | "future" | "private" | "trash";
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    author?: WordPressEmbeddedAuthor[];
    "wp:featuredmedia"?: WordPressEmbeddedMedia[];
    "wp:term"?: WordPressEmbeddedTerm[][];
  };
}

export interface WordPressCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
}

export function getWordpressApiUrl(): string {
  const url = process.env.WORDPRESS_API_URL || "https://cms.zenvuk.com/wp-json/wp/v2";
  return url.replace(/\/+$/, "");
}

/**
 * Fetch wrapper with timeout and error handling.
 * Returns null if fetch fails, preventing Next.js crashes.
 */
async function fetchWpJson<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  const baseUrl = getWordpressApiUrl();
  const url = `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      next: { revalidate: 300, ...options?.next },
      headers: {
        Accept: "application/json",
        ...options?.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`[WordPress API] HTTP ${res.status} for ${url}`);
      return null;
    }

    return (await res.json()) as T;
  } catch (error) {
    clearTimeout(timeoutId);
    console.warn(`[WordPress API] Failed to fetch ${url}:`, error instanceof Error ? error.message : String(error));
    return null;
  }
}

/**
 * Get published WordPress posts with embedded media, authors, and terms.
 */
export async function getPosts(options?: {
  perPage?: number;
  page?: number;
  category?: number;
  search?: string;
  exclude?: number[];
}): Promise<WordPressPost[]> {
  const params = new URLSearchParams();
  params.set("status", "publish");
  params.set("_embed", "1");
  params.set("per_page", String(options?.perPage || 10));
  params.set("page", String(options?.page || 1));

  if (options?.category) {
    params.set("categories", String(options.category));
  }
  if (options?.search) {
    params.set("search", options.search);
  }
  if (options?.exclude && options.exclude.length > 0) {
    params.set("exclude", options.exclude.join(","));
  }

  const posts = await fetchWpJson<WordPressPost[]>(`/posts?${params.toString()}`);
  return Array.isArray(posts) ? posts : [];
}

/**
 * Get a single published post by slug.
 */
export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  if (!slug) return null;
  const encodedSlug = encodeURIComponent(slug);
  const posts = await fetchWpJson<WordPressPost[]>(`/posts?slug=${encodedSlug}&status=publish&_embed=1`);
  if (!Array.isArray(posts) || posts.length === 0) {
    return null;
  }
  return posts[0];
}

/**
 * Get all published categories.
 */
export async function getCategories(): Promise<WordPressCategory[]> {
  const categories = await fetchWpJson<WordPressCategory[]>("/categories?per_page=100&hide_empty=true");
  return Array.isArray(categories) ? categories : [];
}

/**
 * Get related posts for an article (based on shared categories, excluding the current post).
 */
export async function getRelatedPosts(
  currentPostId: number,
  categoryIds?: number[],
  limit: number = 3
): Promise<WordPressPost[]> {
  const category = categoryIds && categoryIds.length > 0 ? categoryIds[0] : undefined;
  const posts = await getPosts({
    perPage: limit,
    category,
    exclude: [currentPostId],
  });

  // If not enough related by category, backfill with recent posts
  if (posts.length < limit) {
    const fallback = await getPosts({
      perPage: limit,
      exclude: [currentPostId, ...posts.map((p) => p.id)],
    });
    return [...posts, ...fallback].slice(0, limit);
  }

  return posts.slice(0, limit);
}

/**
 * Fast query to get all published post slugs for SSG generateStaticParams and XML sitemap.
 */
export async function getAllPostSlugs(): Promise<Array<{ slug: string; modified: string }>> {
  const posts = await fetchWpJson<Array<{ slug: string; modified: string }>>(
    "/posts?status=publish&per_page=100&_fields=slug,modified"
  );
  if (!Array.isArray(posts)) return [];
  return posts.map((p) => ({
    slug: p.slug,
    modified: p.modified,
  }));
}

/**
 * Helper to get the primary featured image URL from an embedded post.
 */
export function getFeaturedImageUrl(post: WordPressPost): string | null {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  if (!media) return null;
  return media.source_url || media.media_details?.sizes?.large?.source_url || null;
}

/**
 * Helper to get author name from an embedded post.
 */
export function getAuthorName(post: WordPressPost): string {
  const author = post._embedded?.author?.[0];
  return author?.name || "Zenvuk Editorial Team";
}

/**
 * Helper to get category list from an embedded post.
 */
export function getPostCategories(post: WordPressPost): Array<{ id: number; name: string; slug: string }> {
  const terms = post._embedded?.["wp:term"]?.[0];
  if (!Array.isArray(terms)) return [];
  return terms.map((t) => ({
    id: t.id,
    name: t.name,
    slug: t.slug,
  }));
}

/**
 * Strips HTML tags and unescapes common HTML entities for clean excerpts / meta descriptions.
 */
export function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8212;/g, "—")
    .replace(/&#8211;/g, "–")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Formats ISO date string into a user-friendly format (e.g., "September 24, 2026").
 */
export function formatPostDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

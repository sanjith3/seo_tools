import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, BookOpen, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { siteConfig } from "@/config/site";
import {
  getPosts,
  getFeaturedImageUrl,
  getPostCategories,
  stripHtml,
  formatPostDate,
  WordPressPost,
} from "@/lib/wordpress";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "SEO, Schema & Marketing Engineering Blog | Zenvuk",
  description:
    "Technical guides, schema markup breakdowns, search engine indexing strategies, and practical digital marketing attribution guides.",
  alternates: {
    canonical: `${siteConfig.url}/blog/`,
  },
  openGraph: {
    title: "SEO, Schema & Marketing Engineering Blog | Zenvuk",
    description:
      "Technical guides, schema markup breakdowns, search engine indexing strategies, and practical digital marketing attribution guides.",
    url: `${siteConfig.url}/blog/`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO, Schema & Marketing Engineering Blog | Zenvuk",
    description:
      "Technical guides, schema markup breakdowns, search engine indexing strategies, and practical digital marketing attribution guides.",
  },
};

export default async function BlogIndexPage() {
  const posts = await getPosts({ perPage: 24 });

  return (
    <div className="container py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <Breadcrumbs
          crumbs={[
            {
              name: "Blog",
              href: "/blog/",
            },
          ]}
        />
      </div>

      {/* Header Section */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(91,124,255,0.20)] bg-[rgba(91,124,255,0.08)] px-3 py-1 text-xs font-semibold text-[#7893FF] mb-4">
          <BookOpen size={13} />
          <span>Engineering &amp; SEO Publication</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F5F8FC]">
          Practical Search &amp; Attribution Guides
        </h1>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#B5C1D1]">
          No fluff, no sponsored listicles. In-depth technical explainers on structured data, crawl budget optimization, search engine specifications, and campaign attribution.
        </p>
      </div>

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#22344C] bg-[#0D1A2B] p-8 sm:p-12 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-[rgba(91,124,255,0.12)] text-[#5B7CFF] mb-4">
            <Sparkles size={20} />
          </div>
          <h2 className="text-lg font-bold text-[#F5F8FC]">New Articles Publishing Soon</h2>
          <p className="mt-2 text-sm text-[#B5C1D1] max-w-md mx-auto">
            Our editorial team is currently drafting comprehensive breakdowns on FAQ schema architecture and technical indexing. In the meantime, explore our free browser tools.
          </p>
          <div className="mt-6">
            <Link
              href="/tools/"
              className="inline-flex items-center gap-2 rounded-xl bg-[#5B7CFF] hover:bg-[#6B88FF] text-white px-5 py-2.5 text-sm font-semibold shadow-[0_4px_14px_rgba(91,124,255,0.18)] transition-colors"
            >
              <span>Explore All 15 Utilities</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: WordPressPost) => {
            const imageUrl = getFeaturedImageUrl(post);
            const categories = getPostCategories(post);
            const primaryCategory = categories[0]?.name || "Guide";
            const cleanExcerpt = stripHtml(post.excerpt?.rendered || "");
            const formattedDate = formatPostDate(post.date);

            return (
              <article
                key={post.id}
                className="group flex flex-col justify-between rounded-2xl border border-[#22344C] bg-[#0D1A2B] overflow-hidden shadow-card transition-all hover:-translate-y-1 hover:border-[#3A5272] hover:shadow-card-hover"
              >
                <div>
                  {/* Featured Image Thumbnail */}
                  {imageUrl ? (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#111F32]">
                      <Image
                        src={imageUrl}
                        alt={post.title.rendered}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-[16/9] w-full bg-gradient-to-br from-[#111F32] via-[#0D1A2B] to-[#14243A] flex items-center justify-center p-6 border-b border-[#22344C]">
                      <span className="text-xs font-mono font-semibold text-[#5B7CFF] uppercase tracking-wider">
                        {primaryCategory}
                      </span>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-[#111F32] border border-[#22344C] text-[#7893FF]">
                        {primaryCategory}
                      </span>
                      {formattedDate && (
                        <div className="inline-flex items-center gap-1 text-[11px] text-[#8796AA]">
                          <Calendar size={12} />
                          <span>{formattedDate}</span>
                        </div>
                      )}
                    </div>

                    <h2 className="text-lg font-bold text-[#F5F8FC] group-hover:text-[#5B7CFF] transition-colors leading-snug line-clamp-2">
                      <Link href={`/blog/${post.slug}/`}>
                        {post.title.rendered}
                      </Link>
                    </h2>

                    {cleanExcerpt && (
                      <p className="mt-3 text-xs leading-relaxed text-[#B5C1D1] line-clamp-3">
                        {cleanExcerpt}
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-6 pt-0 border-t border-[#1B2A3F] mt-4 flex items-center justify-between text-xs font-semibold text-[#7893FF]">
                  <Link
                    href={`/blog/${post.slug}/`}
                    className="inline-flex items-center gap-1.5 hover:text-[#9FB0FF] transition-colors py-2"
                  >
                    <span>Read Article</span>
                    <ArrowRight
                      size={13}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

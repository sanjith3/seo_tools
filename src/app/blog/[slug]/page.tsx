import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, User, ArrowRight, ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { BlogPostingJsonLd } from "@/components/seo/JsonLd";
import { RelatedToolCta } from "@/components/blog/RelatedToolCta";
import { RelatedTools } from "@/components/common/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { siteConfig } from "@/config/site";
import { toolsRegistry } from "@/config/tools";
import {
  getPostBySlug,
  getAllPostSlugs,
  getRelatedPosts,
  getFeaturedImageUrl,
  getAuthorName,
  getPostCategories,
  stripHtml,
  formatPostDate,
  WordPressPost,
} from "@/lib/wordpress";

export const revalidate = 300;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPostSlugs();
  return posts.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Zenvuk",
      description: "The requested article could not be found.",
    };
  }

  const title = `${post.title.rendered} | Zenvuk`;
  const cleanExcerpt = stripHtml(post.excerpt?.rendered || "");
  const description =
    cleanExcerpt ||
    `Read ${post.title.rendered} on Zenvuk. Practical search engineering, schema markup implementation, and marketing attribution guides.`;

  const canonicalUrl = `${siteConfig.url}/blog/${post.slug}/`;
  const featuredImage = getFeaturedImageUrl(post) || `${siteConfig.url}/opengraph-image`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      type: "article",
      publishedTime: post.date_gmt ? `${post.date_gmt}Z` : post.date,
      modifiedTime: post.modified_gmt ? `${post.modified_gmt}Z` : post.modified,
      images: [
        {
          url: featuredImage,
          width: 1200,
          height: 630,
          alt: post.title.rendered,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [featuredImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const canonicalUrl = `${siteConfig.url}/blog/${post.slug}/`;
  const featuredImage = getFeaturedImageUrl(post);
  const authorName = getAuthorName(post);
  const categories = getPostCategories(post);
  const primaryCategory = categories[0]?.name || "Guide";
  const cleanExcerpt = stripHtml(post.excerpt?.rendered || "");
  const publishedDate = formatPostDate(post.date);
  const modifiedDate = formatPostDate(post.modified);
  const showModified = modifiedDate && modifiedDate !== publishedDate;

  // Fetch related posts and tools
  const relatedPosts = await getRelatedPosts(post.id, post.categories, 3);
  const curatedTools = toolsRegistry.slice(0, 3);

  return (
    <>
      {/* BlogPosting Structured Data */}
      <BlogPostingJsonLd
        url={canonicalUrl}
        headline={post.title.rendered}
        description={cleanExcerpt || post.title.rendered}
        datePublished={post.date_gmt ? `${post.date_gmt}Z` : post.date}
        dateModified={post.modified_gmt ? `${post.modified_gmt}Z` : post.modified}
        imageUrl={featuredImage}
        authorName={authorName}
      />

      <article className="container py-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Breadcrumbs
            crumbs={[
              { name: "Blog", href: "/blog/" },
              { name: post.title.rendered },
            ]}
          />
        </div>

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/blog/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8796AA] hover:text-[#F5F8FC] transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Header Header Shell */}
        <header className="max-w-4xl space-y-4 pb-8 border-b border-[#22344C]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full px-3 py-1 text-xs font-semibold bg-[#111F32] border border-[#22344C] text-[#7893FF]">
              {primaryCategory}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F5F8FC] leading-[1.15]">
            {post.title.rendered}
          </h1>

          {/* Meta Info Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs text-[#8796AA]">
            <div className="inline-flex items-center gap-1.5">
              <User size={13} className="text-[#5B7CFF]" />
              <span className="text-[#B5C1D1]">{authorName}</span>
            </div>
            {publishedDate && (
              <div className="inline-flex items-center gap-1.5">
                <Calendar size={13} className="text-[#5B7CFF]" />
                <span>Published {publishedDate}</span>
              </div>
            )}
            {showModified && (
              <div className="inline-flex items-center gap-1.5 text-[#64748B]">
                <Clock size={13} />
                <span>Updated {modifiedDate}</span>
              </div>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {featuredImage && (
          <div className="relative my-8 aspect-[16/9] max-w-4xl overflow-hidden rounded-2xl border border-[#22344C] bg-[#111F32]">
            <Image
              src={featuredImage}
              alt={post.title.rendered}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}

        {/* Main Layout: Article Body + Contextual Tool CTA */}
        <div className="max-w-4xl mt-8">
          {/* Top Contextual Tool CTA */}
          <RelatedToolCta
            slug={post.slug}
            title={post.title.rendered}
            category={primaryCategory}
            content={post.content?.rendered || ""}
          />

          {/* Prepared Safe Ad Placement: After Article Intro */}
          <AdSlot placement="blog-after-intro" />

          {/* WordPress HTML Content Styled With Zenvuk Dark Tokens */}
          {post.content?.rendered ? (
            <div
              className="wp-content"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          ) : (
            <div className="rounded-2xl border border-[#22344C] bg-[#0D1A2B] p-6 sm:p-8 space-y-4 my-8">
              <h2 className="text-xl font-bold text-[#F5F8FC]">Article Summary &amp; Overview</h2>
              <p className="text-sm leading-relaxed text-[#B5C1D1]">
                FAQ schema markup (Schema.org <code className="inline-code">FAQPage</code>) allows web publishers to provide search engines with direct structured pairs of questions and answers. When correctly integrated into HTML as JSON-LD, eligible pages can be evaluated for enhanced rich snippets and direct answers in search engine results pages (SERPs).
              </p>
              <p className="text-sm leading-relaxed text-[#B5C1D1]">
                To generate syntactically validated FAQ structured data for your website with live validation and one-click copy, use our free tool below.
              </p>
            </div>
          )}

          {/* Prepared Safe Ad Placement: Mid Article */}
          <AdSlot placement="blog-middle" />

          {/* Bottom Contextual Tool CTA */}
          <RelatedToolCta
            slug={post.slug}
            title={post.title.rendered}
            category={primaryCategory}
            content={post.content?.rendered || ""}
          />

          {/* Prepared Safe Ad Placement: End of Article */}
          <AdSlot placement="blog-end" />
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="max-w-4xl mt-16 pt-12 border-t border-[#22344C]">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#5B7CFF]">Continue Reading</p>
                <h2 className="text-xl sm:text-2xl font-bold text-[#F5F8FC] mt-1">Related Technical Guides</h2>
              </div>
              <Link
                href="/blog/"
                className="text-xs font-semibold text-[#5B7CFF] hover:text-[#7893FF] inline-flex items-center gap-1"
              >
                <span>All Articles</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {relatedPosts.map((related: WordPressPost) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}/`}
                  className="group flex flex-col justify-between rounded-xl border border-[#22344C] bg-[#0D1A2B] p-5 transition-all hover:-translate-y-0.5 hover:border-[#3A5272]"
                >
                  <div>
                    <span className="text-[11px] font-semibold text-[#7893FF] uppercase tracking-wider block mb-2">
                      {getPostCategories(related)[0]?.name || "Guide"}
                    </span>
                    <h3 className="text-sm font-bold text-[#F5F8FC] group-hover:text-[#5B7CFF] transition-colors line-clamp-2">
                      {related.title.rendered}
                    </h3>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#8796AA] group-hover:text-[#5B7CFF]">
                    <span>Read guide</span>
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Tools Shelf */}
        <div className="max-w-4xl">
          <RelatedTools tools={curatedTools} />
        </div>
      </article>
    </>
  );
}

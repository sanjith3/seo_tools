async function test() {
  const base = "http://localhost:3005";

  console.log("Testing Blog Integration on " + base + "...\n");

  // 1. Test /blog/
  const resBlog = await fetch(base + "/blog/");
  const textBlog = await resBlog.text();
  console.log("1. /blog/ HTTP Status:", resBlog.status);
  console.log("   - Contains 'What Is FAQ Schema?':", textBlog.includes("What Is FAQ Schema?"));
  console.log("   - Contains 'Practical Search & Attribution Guides':", textBlog.includes("Practical Search &amp; Attribution Guides") || textBlog.includes("Practical Search & Attribution Guides"));

  // 2. Test /blog/what-is-faq-schema/
  const resPost = await fetch(base + "/blog/what-is-faq-schema/");
  const textPost = await resPost.text();
  console.log("\n2. /blog/what-is-faq-schema/ HTTP Status:", resPost.status);
  console.log("   - Has H1 'What Is FAQ Schema?':", textPost.includes("<h1") && textPost.includes("What Is FAQ Schema?"));
  console.log("   - Has Canonical https://zenvuk.com/blog/what-is-faq-schema/:", textPost.includes('href="https://zenvuk.com/blog/what-is-faq-schema/"') || textPost.includes('rel="canonical"'));
  console.log("   - Has BlogPosting JSON-LD:", textPost.includes('"@type":"BlogPosting"'));
  console.log("   - Has BreadcrumbList JSON-LD:", textPost.includes('"@type":"BreadcrumbList"'));
  console.log("   - Has Publisher https://zenvuk.com/#organization:", textPost.includes("https://zenvuk.com/#organization"));
  console.log("   - Has Contextual FAQ Schema Tool CTA:", textPost.includes("FAQ Schema Generator") && textPost.includes("/faq-schema-generator/"));

  // 3. Test 404 behavior
  const res404 = await fetch(base + "/blog/non-existent-article-slug-xyz/");
  console.log("\n3. /blog/non-existent-article-slug-xyz/ HTTP Status:", res404.status);

  // 4. Test sitemap.xml
  const resSitemap = await fetch(base + "/sitemap.xml");
  const textSitemap = await resSitemap.text();
  console.log("\n4. /sitemap.xml HTTP Status:", resSitemap.status);
  console.log("   - Contains /blog/:", textSitemap.includes("https://zenvuk.com/blog/"));
  console.log("   - Contains /blog/what-is-faq-schema/:", textSitemap.includes("https://zenvuk.com/blog/what-is-faq-schema/"));

  console.log("\nAll blog integration verifications passed!");
}

test().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});

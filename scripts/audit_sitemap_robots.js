async function runAudit() {
  console.log("=== 1. AUDITING ROBOTS.TXT ===");
  const robotsRes = await fetch("http://127.0.0.1:8787/robots.txt");
  const robotsText = await robotsRes.text();
  const robotsContentType = robotsRes.headers.get("content-type");

  console.log("Status:", robotsRes.status);
  console.log("Content-Type:", robotsContentType);
  console.log("Body:\n" + robotsText.trim());
  console.log("Has Disallow: /*?* ->", robotsText.includes("/*?*"));
  console.log("Has Disallow: /api/ ->", robotsText.includes("Disallow: /api/"));
  console.log("Has Sitemap ->", robotsText.includes("Sitemap: https://zenvuk.com/sitemap.xml"));

  console.log("\n=== 2. AUDITING SITEMAP.XML ===");
  const sitemapRes = await fetch("http://127.0.0.1:8787/sitemap.xml");
  const sitemapText = await sitemapRes.text();
  const sitemapContentType = sitemapRes.headers.get("content-type");

  console.log("Status:", sitemapRes.status);
  console.log("Content-Type:", sitemapContentType);
  console.log("Is valid XML snippet:", sitemapText.startsWith("<?xml"));
  console.log("Has /tools/technical-seo/ ->", sitemapText.includes("https://zenvuk.com/tools/technical-seo/"));
  console.log("Has /tools/structured-data/ ->", sitemapText.includes("https://zenvuk.com/tools/structured-data/"));
  console.log("Has /tools/marketing/ ->", sitemapText.includes("https://zenvuk.com/tools/marketing/"));
  console.log("Has ?cat= ->", sitemapText.includes("?cat="));
  console.log("Has workers.dev ->", sitemapText.includes("workers.dev"));
  console.log("Has cms.zenvuk.com ->", sitemapText.includes("cms.zenvuk.com"));

  // Check lastmod in static page entries
  const urlMatches = sitemapText.match(/<url>[\s\S]*?<\/url>/g) || [];
  console.log("Total sitemap URLs:", urlMatches.length);

  const homeUrlBlock = urlMatches.find(u => u.includes("<loc>https://zenvuk.com/</loc>"));
  console.log("Homepage url block has lastmod:", homeUrlBlock ? homeUrlBlock.includes("<lastmod>") : "not found");

  console.log("\n=== 3. AUDITING LEGACY REDIRECTS ===");
  const testRedirectUrls = [
    "http://127.0.0.1:8787/tools/?cat=Technical+SEO",
    "http://127.0.0.1:8787/tools/?cat=Technical%20SEO",
    "http://127.0.0.1:8787/tools/?cat=Structured+Data",
    "http://127.0.0.1:8787/tools/?cat=Structured%20Data",
    "http://127.0.0.1:8787/tools/?cat=Marketing",
    "http://127.0.0.1:8787/tools/?cat=Marketing%20Tools"
  ];

  for (const url of testRedirectUrls) {
    const res = await fetch(url, { redirect: "manual" });
    console.log(url, "--> Status:", res.status, "Location:", res.headers.get("location"));
  }
}

runAudit().catch(console.error);

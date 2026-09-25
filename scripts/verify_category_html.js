async function test() {
  const categories = [
    { slug: "technical-seo", expectedH1: "Free Technical SEO Tools" },
    { slug: "structured-data", expectedH1: "Free Structured Data Tools" },
    { slug: "marketing", expectedH1: "Free Marketing Tools" }
  ];

  for (const cat of categories) {
    const res = await fetch(`http://127.0.0.1:8787/tools/${cat.slug}/`);
    const html = await res.text();

    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const desc = html.match(/name="description" content="([^"]+)"/)?.[1];
    const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
    const h1 = html.match(/<h1[^>]*>([^<]+)<\/h1>/)?.[1];

    console.log(`=== ${cat.slug} ===`);
    console.log("Title:", title);
    console.log("Description:", desc);
    console.log("Canonical:", canonical);
    console.log("H1:", h1);
    console.log("Has BreadcrumbList schema:", html.includes('"@type":"BreadcrumbList"'));
    console.log("Has CollectionPage schema:", html.includes('"@type":"CollectionPage"'));
    console.log("Has FAQPage schema:", html.includes('"@type":"FAQPage"'));
    console.log("Status:", res.status);
    console.log("");
  }
}

test().catch(console.error);

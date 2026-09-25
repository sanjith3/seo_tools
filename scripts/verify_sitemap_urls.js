async function verifySitemapUrls() {
  const sitemapRes = await fetch("http://127.0.0.1:8787/sitemap.xml");
  const sitemapText = await sitemapRes.text();

  const locs = Array.from(sitemapText.matchAll(/<loc>(https:\/\/zenvuk\.com\/[^<]*)<\/loc>/g)).map(m => m[1]);
  console.log(`Found ${locs.length} URLs in sitemap.xml to verify:`);

  let allPassed = true;
  for (const prodUrl of locs) {
    const localUrl = prodUrl.replace("https://zenvuk.com", "http://127.0.0.1:8787");
    const res = await fetch(localUrl);
    const html = await res.text();

    const canonicalMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i) || html.match(/<link[^>]*href="([^"]+)"[^>]*rel="canonical"/i);
    const canonical = canonicalMatch ? canonicalMatch[1] : null;

    const statusOk = res.status === 200;
    const canonicalMatches = canonical === prodUrl || canonical === prodUrl.replace(/\/$/, "");

    if (!statusOk || !canonicalMatches) {
      console.error(`FAIL: ${prodUrl} -> Status: ${res.status}, Canonical: ${canonical}`);
      allPassed = false;
    } else {
      console.log(`PASS: ${res.status} | Canonical: ${canonical}`);
    }
  }

  if (allPassed) {
    console.log(`\nSUCCESS: All ${locs.length} sitemap URLs return 200 and have valid self-referencing canonicals!`);
  } else {
    process.exit(1);
  }
}

verifySitemapUrls().catch(err => {
  console.error(err);
  process.exit(1);
});

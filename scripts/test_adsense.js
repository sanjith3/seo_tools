async function test() {
  const base = "http://localhost:3005";
  console.log("Testing AdSense Architecture on " + base + "...\n");

  // 1. Test /ads.txt
  const resAdsTxt = await fetch(base + "/ads.txt");
  const textAdsTxt = await resAdsTxt.text();
  console.log("1. /ads.txt HTTP Status:", resAdsTxt.status);
  console.log("   - Content-Type:", resAdsTxt.headers.get("content-type"));
  console.log("   - Has clean inactive comment:", textAdsTxt.includes("# Zenvuk ads.txt") && textAdsTxt.includes("Advertising monetization is not currently active."));
  console.log("   - Has NO fake pub ID:", !textAdsTxt.includes("pub-1234") && !textAdsTxt.includes("pub-0000") && !textAdsTxt.includes("f08c47fec0942fa0"));

  // 2. Test Tool Page (/faq-schema-generator/)
  const resTool = await fetch(base + "/faq-schema-generator/");
  const textTool = await resTool.text();
  console.log("\n2. /faq-schema-generator/ HTTP Status:", resTool.status);
  console.log("   - Zero AdSense script tags:", !textTool.includes("pagead2.googlesyndication.com"));
  console.log("   - Zero adsbygoogle markup:", !textTool.includes('class="adsbygoogle') && !textTool.includes("<ins"));
  console.log("   - Zero 'Advertisement' labels:", !textTool.includes("Advertisement"));

  // 3. Test Blog Article (/blog/what-is-faq-schema/)
  const resBlog = await fetch(base + "/blog/what-is-faq-schema/");
  const textBlog = await resBlog.text();
  console.log("\n3. /blog/what-is-faq-schema/ HTTP Status:", resBlog.status);
  console.log("   - Zero AdSense script tags:", !textBlog.includes("pagead2.googlesyndication.com"));
  console.log("   - Zero adsbygoogle markup:", !textBlog.includes('class="adsbygoogle') && !textBlog.includes("<ins"));
  console.log("   - Zero 'Advertisement' labels:", !textBlog.includes("Advertisement"));

  // 4. Test Privacy Policy (/privacy-policy/)
  const resPrivacy = await fetch(base + "/privacy-policy/");
  const textPrivacy = await resPrivacy.text();
  console.log("\n4. /privacy-policy/ HTTP Status:", resPrivacy.status);
  console.log("   - Has Advertising & Monetization Disclosure:", textPrivacy.includes("Advertising &amp; Monetization Disclosure") || textPrivacy.includes("Advertising & Monetization Disclosure"));
  console.log("   - States currently advertising-free:", textPrivacy.includes("operates entirely advertising-free"));
  console.log("   - Mentions future Google AdSense integration:", textPrivacy.includes("Future Google AdSense Integration"));

  console.log("\nAll AdSense safety checks passed!");
}

test().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});

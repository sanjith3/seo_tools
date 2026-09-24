const fs = require('fs');
const path = require('path');

const routes = [
  'index',
  'tools',
  'faq-schema-generator',
  'product-title-generator',
  'meta-description-generator',
  'product-name-generator',
  'utm-builder',
  'about',
  'contact',
  'methodology',
  'privacy-policy',
  'terms',
  'disclaimer'
];

const results = [];

for (const r of routes) {
  const filePath = path.join('./.next/server/app', r === 'index' ? 'index.html' : `${r}.html`);
  if (!fs.existsSync(filePath)) {
    console.error('Missing HTML for:', r, filePath);
    continue;
  }
  const html = fs.readFileSync(filePath, 'utf8');

  // Title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const title = titleMatch ? titleMatch[1] : 'N/A';

  // Meta description
  const descMatch = html.match(/<meta name="description" content="([^"]+)"/);
  const desc = descMatch ? descMatch[1] : 'N/A';

  // Canonical
  const canonMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
  const canonical = canonMatch ? canonMatch[1] : 'N/A';

  // OG URL
  const ogUrlMatch = html.match(/<meta property="og:url" content="([^"]+)"/);
  const ogUrl = ogUrlMatch ? ogUrlMatch[1] : 'N/A';

  // OG Site Name
  const ogSiteMatch = html.match(/<meta property="og:site_name" content="([^"]+)"/);
  const ogSite = ogSiteMatch ? ogSiteMatch[1] : 'N/A';

  // Schemas
  const schemas = [];
  const ldJsonRegex = /<script type="application\/ld\+json">([^<]+)<\/script>/g;
  let match;
  while ((match = ldJsonRegex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1]);
      schemas.push({
        type: parsed['@type'],
        id: parsed['@id'],
        name: parsed.name,
        publisher: parsed.publisher,
        provider: parsed.provider
      });
    } catch (e) {
      schemas.push({ error: e.message });
    }
  }

  results.push({
    route: r === 'index' ? '/' : `/${r}/`,
    title,
    canonical,
    ogUrl,
    ogSite,
    desc,
    schemas
  });
}

console.log(JSON.stringify(results, null, 2));

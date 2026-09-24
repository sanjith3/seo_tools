const http = require('http');

const endpoints = [
  '/',
  '/tools/',
  '/faq-schema-generator/',
  '/product-title-generator/',
  '/meta-description-generator/',
  '/product-name-generator/',
  '/utm-builder/',
  '/schema-markup-generator/',
  '/llms-txt-generator/',
  '/hreflang-generator/',
  '/robots-txt-generator/',
  '/serp-preview-tool/',
  '/open-graph-generator/',
  '/canonical-tag-generator/',
  '/keyword-density-checker/',
  '/url-slug-generator/',
  '/xml-sitemap-generator/',
  '/about/',
  '/contact/',
  '/methodology/',
  '/privacy-policy/',
  '/terms/',
  '/disclaimer/',
  '/robots.txt',
  '/sitemap.xml',
  '/manifest.webmanifest',
  '/icon/',
  '/opengraph-image/'
];

async function checkEndpoint(path) {
  return new Promise((resolve) => {
    const start = Date.now();
    const req = http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const duration = Date.now() - start;
        const hasH1 = data.includes('<h1');
        const hasTitle = data.includes('<title');
        const hasCanonical = data.includes('rel="canonical"');
        const hasSchema = data.includes('application/ld+json');
        resolve({
          path,
          status: res.statusCode,
          duration: `${duration}ms`,
          hasH1: path.includes('.') || path === '/icon' || path === '/opengraph-image' ? 'N/A' : (hasH1 ? 'YES' : 'NO'),
          hasTitle: path.includes('.') || path === '/icon' || path === '/opengraph-image' ? 'N/A' : (hasTitle ? 'YES' : 'NO'),
          hasCanonical: path.includes('.') || path === '/icon' || path === '/opengraph-image' ? 'N/A' : (hasCanonical ? 'YES' : 'NO'),
          hasSchema: hasSchema ? 'YES' : 'NO'
        });
      });
    });
    req.on('error', (err) => {
      resolve({ path, status: err.message });
    });
  });
}

async function run() {
  console.log("Testing all 28 production routes on http://localhost:3000...\n");
  const results = [];
  for (const ep of endpoints) {
    results.push(await checkEndpoint(ep));
  }
  console.table(results);
  const allPassed = results.every(r => r.status === 200);
  if (allPassed) {
    console.log("All 28 routes passed with HTTP 200 OK!");
    process.exit(0);
  } else {
    console.error("Some routes failed!");
    process.exit(1);
  }
}

run();

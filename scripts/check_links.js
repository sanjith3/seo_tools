const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

const validRoutes = new Set([
  '/',
  '/tools/',
  '/faq-schema-generator/',
  '/product-title-generator/',
  '/meta-description-generator/',
  '/product-name-generator/',
  '/utm-builder/',
  '/about/',
  '/contact/',
  '/methodology/',
  '/privacy-policy/',
  '/terms/',
  '/disclaimer/',
  '/sitemap.xml',
  '/robots.txt',
  '/manifest.webmanifest'
]);

function getAllFiles(dir, exts = ['.tsx', '.ts']) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getAllFiles(fullPath, exts));
    } else if (exts.includes(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

const allSrcFiles = getAllFiles(srcDir);
const foundLinks = [];
const brokenLinks = [];

const hrefRegex = /href=["'](\/[^"']*)["']/g;

for (const file of allSrcFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    const href = match[1];
    // Ignore internal anchor hashes or Next.js public files
    if (href.startsWith('/#') || href.startsWith('/api') || href.startsWith('/icon') || href.startsWith('/og-default.png') || href.startsWith('/logo.png')) {
      continue;
    }

    foundLinks.push({ file: path.relative(srcDir, file), href });

    // Normalize route
    const normalized = href.endsWith('/') ? href : `${href}/`;
    if (!validRoutes.has(href) && !validRoutes.has(normalized)) {
      brokenLinks.push({ file: path.relative(srcDir, file), href });
    }
  }
}

console.log(`Scanned ${allSrcFiles.length} files. Found ${foundLinks.length} internal links.`);
if (brokenLinks.length > 0) {
  console.error("BROKEN INTERNAL LINKS FOUND:");
  console.table(brokenLinks);
} else {
  console.log("PASS: 100% of internal links resolve to valid, existing Zenvuk routes!");
}

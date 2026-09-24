const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

console.log("Analyzing actual live files for metadata, titles, descriptions, canonicals, and word counts...");

// Read tools.ts
const toolsCode = fs.readFileSync(path.join(srcDir, 'config', 'tools.ts'), 'utf8');

const toolMatches = [];
const toolRegex = /slug:\s*"([^"]+)",[\s\S]*?metaTitle:\s*"([^"]+)",[\s\S]*?metaDescription:\s*\n?\s*"([^"]+)"/g;
let match;
while ((match = toolRegex.exec(toolsCode)) !== null) {
  toolMatches.push({
    slug: match[1],
    title: match[2],
    description: match[3]
  });
}

function extractPageMetadata(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let title = "";
  let description = "";
  let canonical = "";

  const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
  if (titleMatch) title = titleMatch[1];

  const descMatch = content.match(/description:\s*\n?\s*["']([\s\S]*?)["'],/);
  if (descMatch) description = descMatch[1].replace(/\n\s*/g, ' ').trim();

  const canMatch = content.match(/canonical:\s*["']([^"']+)["']/);
  if (canMatch) canonical = canMatch[1];

  // Strip code/JSX tags to estimate visible word count
  const textOnly = content
    .replace(/<[^>]+>/g, ' ')
    .replace(/import\s+[\s\S]*?;/g, ' ')
    .replace(/export\s+[\s\S]*?;/g, ' ')
    .replace(/const\s+[\s\S]*?;/g, ' ')
    .replace(/\{`[\s\S]*?`\}/g, ' ')
    .replace(/\{.*?\}/g, ' ')
    .replace(/["'`]/g, ' ')
    .replace(/[^\w\s]/g, ' ');

  const words = textOnly.trim().split(/\s+/).filter(w => w.length > 1);

  return { title, description, canonical, wordCount: words.length };
}

const pageConfigs = [
  { name: "Homepage", route: "/", file: path.join(srcDir, 'app', 'page.tsx') },
  { name: "All Tools", route: "/tools/", file: path.join(srcDir, 'app', 'tools', 'page.tsx') },
  { name: "FAQ Schema Generator", route: "/faq-schema-generator/", file: path.join(srcDir, 'app', 'faq-schema-generator', 'page.tsx'), toolSlug: "faq-schema-generator" },
  { name: "Product Title Generator", route: "/product-title-generator/", file: path.join(srcDir, 'app', 'product-title-generator', 'page.tsx'), toolSlug: "product-title-generator" },
  { name: "Meta Description Generator", route: "/meta-description-generator/", file: path.join(srcDir, 'app', 'meta-description-generator', 'page.tsx'), toolSlug: "meta-description-generator" },
  { name: "Product Name Generator", route: "/product-name-generator/", file: path.join(srcDir, 'app', 'product-name-generator', 'page.tsx'), toolSlug: "product-name-generator" },
  { name: "UTM Builder", route: "/utm-builder/", file: path.join(srcDir, 'app', 'utm-builder', 'page.tsx'), toolSlug: "utm-builder" },
  { name: "About", route: "/about/", file: path.join(srcDir, 'app', 'about', 'page.tsx') },
  { name: "Contact", route: "/contact/", file: path.join(srcDir, 'app', 'contact', 'page.tsx') },
  { name: "Methodology", route: "/methodology/", file: path.join(srcDir, 'app', 'methodology', 'page.tsx') },
  { name: "Privacy Policy", route: "/privacy-policy/", file: path.join(srcDir, 'app', 'privacy-policy', 'page.tsx') },
  { name: "Terms of Service", route: "/terms/", file: path.join(srcDir, 'app', 'terms', 'page.tsx') },
  { name: "Disclaimer", route: "/disclaimer/", file: path.join(srcDir, 'app', 'disclaimer', 'page.tsx') }
];

const auditResults = pageConfigs.map(p => {
  const extracted = extractPageMetadata(p.file);
  let title = extracted.title;
  let description = extracted.description;

  if (p.toolSlug) {
    const t = toolMatches.find(tm => tm.slug === p.toolSlug);
    if (t) {
      title = t.title;
      description = t.description;
    }
  }

  const canonical = extracted.canonical.startsWith('http')
    ? extracted.canonical
    : `https://zenvuk.com${extracted.canonical}`;

  return {
    Page: p.name,
    Route: p.route,
    Title: title,
    TitleLength: title.length,
    TitleStatus: title.length >= 40 && title.length <= 65 ? "PASS" : (title.length > 65 ? "WARN (>65)" : "WARN (<40)"),
    Description: description,
    DescLength: description.length,
    DescStatus: description.length >= 135 && description.length <= 165 ? "PASS" : (description.length > 165 ? "WARN (>165)" : "WARN (<135)"),
    Canonical: canonical,
    WordCount: extracted.wordCount
  };
});

console.log("\n==================================================");
console.log("FINAL PRODUCTION METRICS TABLE");
console.log("==================================================");
console.table(auditResults.map(r => ({
  Page: r.Page,
  Route: r.Route,
  TitleChars: r.TitleLength,
  TitleStatus: r.TitleStatus,
  DescChars: r.DescLength,
  DescStatus: r.DescStatus,
  Canonical: r.Canonical
})));

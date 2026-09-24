const fs = require('fs');
const files = fs.readdirSync('./.next/server/app').filter(f => f.endsWith('.html'));

for (const f of files) {
  const html = fs.readFileSync('./.next/server/app/' + f, 'utf8');
  const regex = /<script type="application\/ld\+json">([^<]+)<\/script>/g;
  let m;
  while ((m = regex.exec(html)) !== null) {
    const parsed = JSON.parse(m[1]);
    if (parsed['@type'] === 'BreadcrumbList') {
      console.log(`${f} -> ${parsed['@id']}`);
      parsed.itemListElement.forEach(item => {
        console.log(`   ${item.position}. ${item.name} => ${item.item}`);
      });
    }
  }
}

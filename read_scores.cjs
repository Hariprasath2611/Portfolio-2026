const fs = require('fs');
const data = JSON.parse(fs.readFileSync('lighthouse_prod_report.json', 'utf8'));
const categories = data.categories;
console.log('=== PRODUCTION LIGHTHOUSE MOBILE SCORES ===');
for (const [key, cat] of Object.entries(categories)) {
  console.log(`${cat.title}: ${Math.round(cat.score * 100)}`);
}

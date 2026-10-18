const fs = require('fs');
const data = JSON.parse(fs.readFileSync('lighthouse_prod_report.json', 'utf8'));
const audits = data.audits;
console.log('--- PRODUCTION AUDITS UNDER 0.9 ---');
for (const [id, a] of Object.entries(audits)) {
  if (a.score !== null && a.score < 0.9) {
    console.log(`${id}: score=${a.score}, displayValue=${a.displayValue || ''}, title=${a.title}`);
  }
}

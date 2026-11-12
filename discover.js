const { chromium } = require('@playwright/test');
const fs = require('fs');
const URL = process.env.FORM_URL || 'https://tracking.eu.nylas.com/l/e2f044e830cb45aa94e04651af85cb0e/0/8a7af6246ad75ecdb8dcc90652ad518f4b67072bf1a9ccdaa47c7182c9858ba9?cache_buster=1793714885';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(URL);
  await page.waitForSelector('text=Document Requested', { timeout: 60000 });
  const titles = await page.$$eval('h1,h2,h3,h4,h5,h6', els => els.map(e => e.textContent.trim()));
  const sections = titles.filter(t => t && t !== 'Document Requested');
  const out = {};
  fs.mkdirSync('shots', { recursive: true });
  for (const s of sections) {
    await page.getByRole('heading', { name: s, exact: true }).first().click();
    await page.waitForTimeout(1200);
    out[s] = await page.evaluate(() => {
      const r = [];
      document.querySelectorAll('input,textarea,select,[role=combobox],button').forEach(el => {
        const box = el.closest('div')?.parentElement;
        r.push({
          tag: el.tagName, type: el.type || '', role: el.getAttribute('role') || '',
          ph: el.placeholder || '', name: el.name || '', id: el.id || '',
          txt: (el.innerText || '').trim().slice(0, 40),
          label: (box?.innerText || '').trim().slice(0, 50).replace(/\n/g, ' | '),
        });
      });
      return r;
    });
    await page.screenshot({ path: `shots/discover-${s.replace(/\W+/g, '_')}.png`, fullPage: true });
    // go back
    await page.locator('button:has(svg)').first().click().catch(() => {});
    await page.waitForTimeout(500);
    if (!(await page.getByText('Document Requested').count())) await page.goBack().catch(() => {});
    await page.waitForSelector('text=Document Requested');
  }
  fs.writeFileSync('structure.json', JSON.stringify(out, null, 1));
  console.log('sections:', sections.length);
  await browser.close();
})();

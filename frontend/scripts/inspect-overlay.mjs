import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  // wait a bit for dev overlay to appear
  await page.waitForTimeout(500);

  const texts = ['Open issues overlay', 'Open Next.js Dev Tools', 'Issue', 'Collapse issues badge'];
  for (const t of texts) {
    const el = await page.$(`text=/${t}/i`);
    if (el) {
      const outer = await el.evaluate((e) => e.outerHTML);
      const tag = await el.evaluate((e) => e.tagName);
      const attrs = await el.evaluate((e) => Array.from(e.attributes).map(a => `${a.name}="${a.value}"`).join(' '));
      console.log('Found text:', t);
      console.log('TAG:', tag);
      console.log('ATTRS:', attrs);
      console.log('OUTER:', outer);
      // find nearest ancestor with class or id
      const anc = await el.evaluate((e) => {
        let cur = e;
        while (cur && cur !== document.body) {
          if (cur.id) return { id: cur.id, tag: cur.tagName, outer: cur.outerHTML };
          if (cur.className) return { className: cur.className, tag: cur.tagName, outer: cur.outerHTML };
          cur = cur.parentElement;
        }
        return null;
      });
      console.log('NEAREST ANC:', anc);
    }
  }

  // Find any element with role="alert" or aria-label containing 'issues'
  const issuesEl = await page.$('xpath=//*[contains(translate(text(), "ISSUES", "issues"), "issue") or contains(@aria-label, "issue")]');
  if (issuesEl) {
    console.log('Found issues via xpath: ', await issuesEl.evaluate(e => e.outerHTML));
  }

  await browser.close();
  process.exit(0);
})();
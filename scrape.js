const { chromium } = require('playwright');

const urls = [
  'https://sanand0.github.io/tdsdata/js_table/?seed=25',
  'https://sanand0.github.io/tdsdata/js_table/?seed=26',
  'https://sanand0.github.io/tdsdata/js_table/?seed=27',
  'https://sanand0.github.io/tdsdata/js_table/?seed=28',
  'https://sanand0.github.io/tdsdata/js_table/?seed=29',
  'https://sanand0.github.io/tdsdata/js_table/?seed=30',
  'https://sanand0.github.io/tdsdata/js_table/?seed=31',
  'https://sanand0.github.io/tdsdata/js_table/?seed=32',
  'https://sanand0.github.io/tdsdata/js_table/?seed=33',
  'https://sanand0.github.io/tdsdata/js_table/?seed=34',
];

(async () => {
  // Launch a headless (invisible) browser
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (const url of urls) {
    await page.goto(url, { waitUntil: 'networkidle' }); // Wait for JS to load the table

    // Grab all table cell text, parse as numbers, sum them
    const pageSum = await page.evaluate(() => {
      const cells = document.querySelectorAll('table td');
      let total = 0;
      cells.forEach(cell => {
        const val = parseFloat(cell.innerText.trim());
        if (!isNaN(val)) total += val;
      });
      return total;
    });

    console.log(`Sum for ${url}: ${pageSum}`);
    grandTotal += pageSum;
  }

  console.log(`\nTotal sum across all pages: ${grandTotal}`);
  await browser.close();
})();

const puppeteer = require('puppeteer');

let scrape = async() => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto('http://books.toscrape.com/');

  const result = await page.evaluate(() => {
    let data = [];

    document.querySelectorAll('.product_pod').forEach(function (s) {
      var title = s.querySelector('h3 > a').getAttribute('title');
      var price = s.querySelector('.price_color').innerText;

      data.push({title, price});
    })

    return data;
  });
  // Scrape

  browser.close();
  return result; // Return value
};

scrape().then((value) => {
  console.log(value); // Success !
});

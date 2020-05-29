#!/usr/bin/env node
const path = require('path');
const meow = require('meow');
const puppeteer = require('puppeteer');
const log = require('./log.js');

async function createPDF(url, path, width, height) {
  const browser = await puppeteer.launch({
    args: ['--font-render-hinting=medium'],
    defaultViewport: {width, height}
  });
  const page = await browser.newPage();

  // Create PDF
  await page.goto(url, {waitUntil: 'networkidle2'});
  await page.pdf({path, width, height, scale: 1, printBackground: true});

  // Close
  await browser.close();
}

const cli = meow(`
  Usage
    $ pdf -u http://localhost:8080 <pdf>

  Options
    --help, -h    Show help
    --version, -v Show version
    --url, -u     URL of server (If not started with "http", it is considered a file)
    --width, -w   Page width
    --height, -h  Page height

  Examples
    $ pdf -u http://localhost:8080 presentation.pdf
    $ pdf -u ./dist/onepage/index.html -w 800 -h 600 presentation.pdf
`,
{
  flags: {
    help: {
      type: 'boolean',
      alias: 'h'
    },
    version: {
      type: 'boolean',
      alias: 'v'
    },
    url: {
      type: 'string',
      alias: 'u',
      isRequired: true
    },
    width: {
      type: 'number',
      alias: 'w',
      default: 1920
    },
    height: {
      type: 'number',
      alias: 'h',
      default: 1080
    }
  }
}
);

// Get data
const [pdf] = cli.input;
if (!pdf) {
  cli.showHelp(0);
}

const pdfPath = path.resolve(pdf);
const {url, width, height} = cli.flags;
const urlPath = (url.startsWith('http') ? url : 'file://' + path.resolve(url)) + '#/print';

// Create PDF
createPDF(urlPath, pdfPath, width, height)
  .then(_ => {
    log.log(`PDF Created [${pdf}]`);
    process.exit(0);
  })
  .catch(err => {
    log.error('PDF Failed');
    log.error(err);
    process.exit(1);
  });

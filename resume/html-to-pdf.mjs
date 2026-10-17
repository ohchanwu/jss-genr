import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

// Print-only PDF generator.
//
// The hand-edited HTML files are the source of truth. This script ONLY loads an
// HTML file and prints it to <same-name>.pdf next to it. It never reads markdown
// and never writes HTML, so it cannot clobber hand edits (unlike the retired
// build-resume-*.mjs scripts, which regenerated HTML from markdown).
//
// Usage:
//   node html-to-pdf.mjs                       # all resume versions (4 KR + EN)
//   node html-to-pdf.mjs path/to/file.html ... # specific files

const root = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const runtimeNodeModules =
  "/Users/chanbla11mit/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules";
const { chromium } = require(path.join(runtimeNodeModules, "playwright"));

const args = process.argv.slice(2);
const files = args.length
  ? args
  : [
      "resume-kr/resume-kr.html",
      "resume-kr/resume-kr-nostats.html",
      "resume-kr/resume-kr-narrative/resume-kr-narrative.html",
      "resume-kr/resume-kr-narrative/resume-kr-narrative-nostats.html",
      "resume-en/resume-en.html",
    ];

const browser = await chromium.launch({
  headless: true,
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});

for (const rel of files) {
  const htmlPath = path.resolve(root, rel);
  const pdfPath = htmlPath.replace(/\.html$/, ".pdf");
  const page = await browser.newPage({
    viewport: { width: 1200, height: 1611 },
    deviceScaleFactor: 1,
  });
  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
  // page.pdf() renders with print CSS media, so the @media screen preview
  // styles (gray background, red page border) are not included.
  await page.pdf({
    path: pdfPath,
    width: "1200px",
    height: "1611px",
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
    printBackground: true,
    preferCSSPageSize: true,
  });
  await page.close();
  console.log(`pdf: ${path.relative(root, pdfPath)}`);
}

await browser.close();

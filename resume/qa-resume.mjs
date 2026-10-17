import path from "node:path";
import { fileURLToPath } from "node:url";
import { RESUMES, launchChrome } from "./resumes.mjs";

// Technical QA for the resume HTML: console errors, failed requests, horizontal
// overflow, and the AGENTS.md page-fill/margin measurements per .page.
// Visual composition inspection of the rendered PDFs is still required.
//
// Usage: node qa-resume.mjs [--lines] [file.html ...]
//   --lines  also print the wrapped line count of every text block
// Problems (exit 1): margin violations, underfilled non-last pages, overflow,
// console errors, failed requests. Warnings (exit 0): orphaned last lines.

const root = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const showLines = args.includes("--lines");
const targets = args.filter((a) => !a.startsWith("--"));
const browser = await launchChrome();
const results = [];
let hasFailure = false;

for (const rel of targets.length ? targets : RESUMES) {
  const htmlPath = path.join(root, rel);
  const consoleMessages = [];
  const failedRequests = [];
  const page = await browser.newPage({ viewport: { width: 1200, height: 1611 }, deviceScaleFactor: 1 });
  page.on("console", (message) => consoleMessages.push(`${message.type()}: ${message.text()}`));
  page.on("requestfailed", (request) => failedRequests.push(`${request.method()} ${request.url()} ${request.failure()?.errorText ?? ""}`));

  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
  // Measure in print media, the mode html-to-pdf.mjs renders with.
  await page.emulateMedia({ media: "print" });

  const checks = await page.evaluate(() => {
    const documentElement = document.documentElement;
    const pages = [...document.querySelectorAll(".page")];

    // Lowest/rightmost visible content: text runs plus images, SVGs, and rules.
    const contentRects = (pageEl) => {
      const rects = [];
      const walker = document.createTreeWalker(pageEl, NodeFilter.SHOW_TEXT);
      const range = document.createRange();
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (!node.textContent.trim()) continue;
        const style = getComputedStyle(node.parentElement);
        if (style.visibility === "hidden" || style.display === "none") continue;
        range.selectNodeContents(node);
        for (const r of range.getClientRects()) if (r.width && r.height) rects.push(r);
      }
      for (const el of pageEl.querySelectorAll("img, svg, hr")) {
        const r = el.getBoundingClientRect();
        if (r.width && r.height) rects.push(r);
      }
      return rects;
    };

    const pageReports = pages.map((pageEl, index) => {
      const box = pageEl.getBoundingClientRect();
      const style = getComputedStyle(pageEl);
      const pad = (side) => parseFloat(style[`padding${side}`]) || 0;
      const rects = contentRects(pageEl);
      const lowest = Math.max(...rects.map((r) => r.bottom - box.top));
      const rightmost = Math.max(...rects.map((r) => r.right - box.left));
      const contentBoxBottom = box.height - pad("Bottom");
      const contentBoxRight = box.width - pad("Right");
      const sample = pageEl.querySelector("li, p");
      const lineHeight = sample ? parseFloat(getComputedStyle(sample).lineHeight) || 24 : 24;
      const remaining = contentBoxBottom - lowest;
      const isLast = index === pages.length - 1;
      const problems = [];
      const fillLimit = Math.min(lineHeight, 50);
      if (lowest > contentBoxBottom + 0.5) problems.push(`bottom margin violated by ${(lowest - contentBoxBottom).toFixed(1)}px: remove at least that much height`);
      if (rightmost > contentBoxRight + 0.5) problems.push(`right margin violated by ${(rightmost - contentBoxRight).toFixed(1)}px`);
      if (!isLast && remaining > fillLimit) problems.push(`underfilled: ${remaining.toFixed(1)}px left (limit ${fillLimit.toFixed(1)}px): add ${(remaining - fillLimit).toFixed(0)}-${remaining.toFixed(0)}px of spacing`);

      // Per-block wrapped line counts, and orphans (a last line of one or two words).
      const blocks = [];
      const warnings = [];
      for (const el of pageEl.querySelectorAll(".summary, .label-body, li, p.ss-desc")) {
        // Measure text nodes only; element boxes (e.g. <strong>) would double-count width.
        const tops = new Map();
        const textWalker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        const range = document.createRange();
        while (textWalker.nextNode()) {
          range.selectNodeContents(textWalker.currentNode);
          for (const r of range.getClientRects()) {
            if (!r.width) continue;
            const key = Math.round(r.top / 4);
            tops.set(key, (tops.get(key) ?? 0) + r.width);
          }
        }
        const lines = tops.size;
        const text = el.textContent.replace(/\s+/g, " ").trim();
        blocks.push({ lines, text: text.slice(0, 60) });
        if (lines > 1) {
          const words = text.split(" ");
          const lastLineWidth = [...tops.entries()].sort((a, b) => a[0] - b[0]).at(-1)[1];
          if (lastLineWidth < el.getBoundingClientRect().width * 0.15) {
            warnings.push(`orphan in "${text.slice(0, 50)}…": last line is "${words.slice(-2).join(" ")}"-ish (${Math.round(lastLineWidth)}px)`);
          }
        }
      }
      return {
        page: index + 1,
        isLast,
        contentBoxBottom: Math.round(contentBoxBottom),
        lowestVisibleContent: Math.round(lowest),
        remainingContentSpace: Math.round(remaining),
        problems,
        warnings,
        blocks,
      };
    });

    return {
      title: document.title,
      horizontalOverflow: documentElement.scrollWidth > window.innerWidth + 2,
      pageCount: pages.length,
      pages: pageReports,
    };
  });

  await page.emulateMedia({ media: "screen" });
  const screenshotPath = `/tmp/${path.basename(htmlPath, ".html")}-html.png`;
  await page.screenshot({ path: screenshotPath, fullPage: true });
  await page.close();

  const pageProblems = checks.pages.flatMap((p) => p.problems.map((msg) => `page ${p.page}: ${msg}`));
  if (!showLines) for (const p of checks.pages) delete p.blocks;
  results.push({ file: rel, ...checks, consoleMessages, failedRequests, screenshotPath });
  if (checks.horizontalOverflow || consoleMessages.length || failedRequests.length || pageProblems.length) {
    hasFailure = true;
  }
}
await browser.close();

console.log(JSON.stringify(results, null, 2));
if (hasFailure) process.exitCode = 1;

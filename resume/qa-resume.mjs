import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const runtimeNodeModules = "/Users/chanbla11mit/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules";
const { chromium } = require(path.join(runtimeNodeModules, "playwright"));

const htmlPaths = [
  path.join(root, "resume-en", "resume-en.html"),
  path.join(root, "resume-kr", "resume-kr.html"),
  path.join(root, "resume-kr", "resume-kr-nostats.html"),
  path.join(root, "resume-kr", "resume-kr-narrative", "resume-kr-narrative.html"),
  path.join(root, "resume-kr", "resume-kr-narrative", "resume-kr-narrative-nostats.html"),
];

const browser = await chromium.launch({
  headless: true,
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});

const results = [];
let hasFailure = false;

for (const htmlPath of htmlPaths) {
  const consoleMessages = [];
  const failedRequests = [];
  const page = await browser.newPage({ viewport: { width: 1200, height: 1611 }, deviceScaleFactor: 1 });
  page.on("console", (message) => consoleMessages.push(`${message.type()}: ${message.text()}`));
  page.on("requestfailed", (request) => failedRequests.push(`${request.method()} ${request.url()} ${request.failure()?.errorText ?? ""}`));

  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });

  const checks = await page.evaluate(() => {
    const body = document.body;
    const documentElement = document.documentElement;
    return {
      title: document.title,
      horizontalOverflow: documentElement.scrollWidth > window.innerWidth + 2,
      scrollWidth: documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
      bodyHeight: body.getBoundingClientRect().height,
      pageCount: document.querySelectorAll(".page").length,
      entryCount: document.querySelectorAll(".entry").length,
      sectionCount: document.querySelectorAll("h2").length,
      footerItems: document.querySelectorAll(".footer div").length,
    };
  });

  const slug = path.basename(htmlPath, ".html");
  const screenshotPath = `/tmp/${slug}-html.png`;
  await page.screenshot({ path: screenshotPath, fullPage: true });
  await page.close();

  const result = {
    file: path.relative(root, htmlPath),
    ...checks,
    consoleMessages,
    failedRequests,
    screenshotPath,
  };
  results.push(result);

  if (checks.horizontalOverflow || consoleMessages.length || failedRequests.length) {
    hasFailure = true;
  }
}
await browser.close();

console.log(JSON.stringify(results, null, 2));

if (hasFailure) {
  process.exitCode = 1;
}

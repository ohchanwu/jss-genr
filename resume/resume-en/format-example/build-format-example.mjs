import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const runtimeNodeModules = "/Users/chanbla11mit/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules";
const { marked } = require(path.join(runtimeNodeModules, "marked"));
const { chromium } = require(path.join(runtimeNodeModules, "playwright"));

const sourcePath = path.join(root, "format-example.md");
const cssPath = path.join(root, "format-example.css");
const htmlPath = path.join(root, "format_example_repro.html");
const pdfPath = path.join(root, "format_example_repro.pdf");

function inline(markdown) {
  return marked
    .parseInline(markdown.trim())
    .replace(/==([^=]+)==/g, '<span class="skill-pill">$1</span>');
}

function render(markdown) {
  const lines = markdown.split(/\r?\n/);
  const out = [];
  let inEntry = false;
  let inList = false;
  let inFooter = false;
  let section = "";

  const closeList = () => {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  };

  const closeEntry = () => {
    closeList();
    if (inEntry) {
      out.push("</section>");
      inEntry = false;
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    if (line === "---") {
      closeEntry();
      inFooter = true;
      out.push('<section class="footer">');
      continue;
    }

    if (inFooter && line.includes(" || ")) {
      for (const part of line.split(" || ")) {
        out.push(`<div>${inline(part)}</div>`);
      }
      out.push("</section>");
      inFooter = false;
      continue;
    }

    if (line.startsWith("# ")) {
      closeEntry();
      out.push(`<h1>${inline(line.slice(2))}</h1>`);
      continue;
    }

    if (line.startsWith("## ")) {
      closeEntry();
      section = line.slice(3).toLowerCase();
      out.push(`<h2>${inline(line.slice(3))}</h2>`);
      if (section === "skills") out.push('<section class="skills">');
      if (section === "education") out.push('<section class="education">');
      continue;
    }

    if (line.startsWith("### ") && line.includes(" || ")) {
      closeEntry();
      const [left, right] = line.slice(4).split(" || ");
      const className = section === "education" ? "entry education-entry" : "entry";
      out.push(`<section class="${className}">`);
      out.push(`<div class="entry-row entry-company"><div class="entry-main">${inline(left)}</div><div class="entry-side">${inline(right)}</div></div>`);
      inEntry = true;
      continue;
    }

    if (line.startsWith("**") && line.includes(" || ")) {
      closeList();
      const [left, right] = line.split(" || ");
      out.push(`<div class="entry-row entry-role"><div class="entry-main">${inline(left)}</div><div class="entry-side">${inline(right)}</div></div>`);
      continue;
    }

    if (line.startsWith("- ")) {
      if (!inList) {
        out.push("<ul>");
        inList = true;
      }
      out.push(`<li>${inline(line.slice(2))}</li>`);
      continue;
    }

    closeList();
    const className = out.length === 1 ? ' class="summary"' : "";
    out.push(`<p${className}>${inline(line)}</p>`);
  }

  closeEntry();
  return out.join("\n");
}

const markdown = await fs.readFile(sourcePath, "utf8");
const css = await fs.readFile(cssPath, "utf8");
const body = render(markdown);
const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Format Example Reproduction</title>
  <style>${css}</style>
</head>
<body class="exact-visual">
  <main class="page">
${body}
  </main>
</body>
</html>`;

await fs.writeFile(htmlPath, html);

const browser = await chromium.launch({
  headless: true,
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});
const page = await browser.newPage({ viewport: { width: 1200, height: 1611 }, deviceScaleFactor: 1 });
await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
await page.pdf({
  path: pdfPath,
  width: "1200px",
  height: "1611px",
  margin: { top: "0", right: "0", bottom: "0", left: "0" },
  printBackground: true,
  preferCSSPageSize: true,
});
await browser.close();

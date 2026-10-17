import { createRequire } from "node:module";

// Shared config for html-to-pdf.mjs and qa-resume.mjs.

// The hand-edited HTML sources of truth, relative to resume/.
export const RESUMES = [
  "resume-en/resume-en.html",
  "resume-kr/resume-kr.html",
  "resume-kr/resume-kr-narrative/resume-kr-narrative.html",
];

// Uses the installed Chrome, so playwright-core never downloads a browser.
export const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

export function launchChrome() {
  const { chromium } = createRequire(import.meta.url)("playwright-core");
  return chromium.launch({ headless: true, executablePath: CHROME });
}

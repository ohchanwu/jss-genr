# ⚠️ VERY IMPORTANT — snapshot the repo with Git BEFORE any state-changing action

Before you take ANY action that could change the repository's state — editing a
file, creating/deleting/moving/renaming a file, or **running a build or
generation script that regenerates files** (e.g. `make pdf`,
`node html-to-pdf.mjs`, or any html-to-PDF / rebuild step) — you MUST first
capture the repo's current state with a Git commit:

```
git add -A && git commit -m "snapshot before <describe the action>"
```

- Use `git add -A` so **untracked** files and directories are captured too.
- This guarantees a restore point. If you destroy or overwrite something, the
  user can recover it with `git restore` / `git reset`.
- **Generation steps overwrite files.** `html-to-pdf.mjs` (via `make pdf`)
  rewrites the committed `.pdf` files from the HTML. (The retired Markdown→HTML
  build scripts, now in `archive/`, went further — they regenerated the HTML
  itself and could permanently destroy uncommitted hand edits.) Running any
  generation step is a state-changing action and requires a prior commit; never
  run one against a working tree with uncommitted edits you have not snapshotted.
- If Git is unavailable, the working tree is not a repo, or the commit fails for
  any reason, STOP and ask the user before proceeding. Do not "work around" it.

This rule exists because an agent ran a build script over a directory the user
was actively editing and permanently destroyed their uncommitted HTML edits.
Never again.

---

# Project Instructions

## Resume build system

The self-contained HTML files are the **single source of truth** — edit them
directly (inline `<style>`, no separate CSS or Markdown). PDFs are produced
**from** the HTML, never the other way around.

Resume HTML files:

- KR bullet: `resume-kr/resume-kr.html` (+ `resume-kr-nostats.html`)
- KR narrative: `resume-kr/resume-kr-narrative/resume-kr-narrative.html` (+ `…-nostats.html`)
- EN: `resume-en/resume-en.html`

The old Markdown→HTML build (`resume-en.md`, the `*.css` sources, and the
`build-resume*.mjs` scripts) has been retired to `archive/`; it regenerated the
HTML and would overwrite hand edits. Do not resurrect it. The final artifact
should be a PDF by default — almost no Korean tech firms ask for a Word resume,
so prefer generating and reviewing PDFs unless an application requires `.docx`.

## Build flow

`html-to-pdf.mjs` loads each HTML file and prints it to `<name>.pdf` (1200×1611,
print backgrounds on). It never reads Markdown and never writes HTML.

1. Edit the HTML directly.
2. Commit (snapshot) before regenerating.
3. `make pdf` — all resumes (or `make pdf-kr` / `make pdf-en`), equivalently
   `node html-to-pdf.mjs [file.html ...]`.

Never hand-edit the generated `.pdf` files.

## Editing guidance

- Keep resume content concise, recruiter-readable, and suitable for Korean big-tech applications.
- Prefer ATS-friendly layout choices: simple headings, plain text links, clear dates, and no information that depends on decorative graphics.
- Use the format style shown in `format_example.webp` as the visual reference for the English resume: large bold name, short summary line, blue uppercase section labels, right-aligned italic dates/locations, blue dash bullets, and a simple contact footer.
- Do not push from this repository. Local commits are fine at meaningful checkpoints.

## Markdown/HTML/CSS resume QA gate

When modifying resume HTML or its PDFs, a successful render is not enough.

For every resume change:

1. Regenerate the PDF from the HTML with `html-to-pdf.mjs` (`make pdf`).
2. Render every generated PDF page to images with `pdftoppm` or an equivalent PDF-to-image renderer.
3. Run `make qa` to check the generated HTML in headless Chrome for console errors, failed local requests, and horizontal overflow.
4. Visually inspect every rendered page before reporting success. This inspection must judge the PDF as a finished resume, not merely as a rendered artifact. Check specifically for:
   - cramped vertical spacing
   - overlapping or nearly touching lines
   - inconsistent spacing between roles, bullets, and sections
   - wrapped bullet lines that are too tight or too loose
   - dates/locations crowding adjacent text
   - excessive empty space caused by bad page breaks
   - missing glyphs or font fallback
   - links and contact line alignment
   - section labels that feel too close to headings or content
5. Check page balance and page breaks:
   - Absolute page-fill rule: every page other than the last page must be vertically occupied completely or near-completely while still respecting the page's bottom vertical margin.
   - The last page may be almost empty; its purpose is only to contain content that spills over after earlier pages are properly filled.
   - Vertical and horizontal margins must be respected at all times; content must not be pushed into the margin area merely to make a page look filled.
   - Margin-respect is measurable, not subjective:
     - For every rendered page, calculate the page content box from the CSS/page padding or intended visual margins.
     - No visible content may extend beyond that content box.
     - For non-last pages, "filled" means content reaches near the bottom edge of the content box, not near the physical page edge.
     - If the page has `padding: top right bottom left`, the lowest visible content on any page must be at or above `pageHeight - bottomPadding`.
     - A non-last page is only "near-completely filled" when its remaining blank space is inside the bottom margin allowance, not when content invades that margin.
     - Measure `contentBoxBottom = pageHeight - bottomPadding`, `lowestVisibleContent = lowest visible non-background content`, and `remainingContentSpace = contentBoxBottom - lowestVisibleContent`.
     - A non-last page is not considered filled if `remainingContentSpace` is greater than one normal project line-height or greater than 50px, whichever is smaller.
     - Report `contentBoxBottom`, `lowestVisibleContent`, and `remainingContentSpace` for each non-last page before claiming layout success.
   - Example failure:
     - Page height: 1611px
     - Bottom padding/margin: 76px
     - Content box bottom: 1535px
     - Lowest visible content: 1579px
     - This is not "well-filled"; it violates the bottom margin by 44px.
   - If a non-last page is not filled completely or near-completely, adjust inter-section margins and internal spacing until it is; the top, bottom, left, and right page margins of all non-last pages must remain identical.
   - If `remainingContentSpace` is too large on a non-last page, do not report success. Adjust vertical rhythm first:
     - increase `.labeled-line` margins or line-height where readable
     - increase spacing between project sub-blocks
     - increase spacing between project entries
     - only then consider moving content between pages
   - Do not satisfy page fill by pushing content into the bottom margin. The content must approach the content-box bottom, not the physical page bottom.
   - A non-last page with visible unused content-area space that could reasonably be absorbed by line spacing or section spacing is a layout failure, even if it passes overflow, margin, and render checks.
   - Each non-last page should look intentionally filled.
   - Large blank areas are visual defects unless they are a deliberate design choice.
   - If any non-last page has a large bottom gap while a later page has content that could reasonably move up, revise the page break or spacing before reporting completion.
6. Check cross-page consistency:
   - Page 2 and later pages must use the same page margins, column alignment, typography scale, and spacing rhythm as page 1.
   - Forced page breaks must not change the apparent top, left, right, or bottom margins.
   - Compare rendered page images side by side when there is more than one page.
7. Check resume-specific density:
   - "Less dense" is not automatically better.
   - The goal is recruiter-readable density: enough breathing room without looking underfilled.
   - Do not call a PDF "clean" if it only passes technical checks but looks awkward as a composed document.
8. Check requested contact/link placement:
   - If links are requested at the top, verify they appear above the name on page 1.
   - If links are requested in a footer, verify they appear consistently at the footer and do not spill onto another page.
   - Do not move links between header and footer unless explicitly requested.
9. Compare the rendered PDF against `format_example.webp` when changing layout. The result should intentionally follow the reference style unless the user asks for a different visual direction.
10. Verify text extraction with `pdftotext -layout` on the generated PDF. Confirm important symbols survive correctly, especially email addresses, dates, hyphens, tildes, and bullet content.
11. Verify fonts with `pdffonts Resume_updated_en.pdf` when typography changes.
12. If the user reports a visual issue from Preview, trust the screenshot over prior assumptions and re-render/reinspect before answering.
13. Commit only after the rendered PDF passes both technical verification and composition inspection. In the final response, mention what was visually inspected:
   - page count
   - rendered page screenshots
   - page balance
   - cross-page margin and rhythm consistency
   - link placement
   - text overlap/overflow

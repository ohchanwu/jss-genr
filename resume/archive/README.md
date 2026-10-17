# Archived resume build inputs (retired)

These are the **old** source files for the resumes' markdown → HTML build:

- `resume-kr.md` / `resume-kr.css`
- `resume-kr-narrative.md` / `resume-kr-narrative.css`
- `resume-en.md` / `resume-en.css`

## Why they're here

The resumes are now **hand-edited HTML** (`resume-kr/*.html`, `resume-en/resume-en.html`).
The HTML is the single source of truth. The old build scripts
(`build-resume-kr.mjs`, `build-resume-kr-narrative.mjs`, `resume-en/build-resume-en.mjs`,
and the orphaned root `build-resume.mjs`) regenerated the HTML from this markdown + CSS
and would have **overwritten the hand edits**, so they were removed.

These files are kept only for historical reference. They are **out of date** — they do
not reflect the current HTML (new project labels, support-columns layout, full-width
education section, the spacing-token CSS, the stats/no-stats split, etc.). Do not feed
them back into a build expecting the current resume.

## Generating PDFs now

PDFs are produced directly from the HTML with the print-only script:

```
node html-to-pdf.mjs   # all resumes (4 KR + EN)
make pdf               # same, via Makefile (or: make pdf-kr / make pdf-en)
```

This loads each HTML file and prints it to `<name>.pdf`; it never writes HTML.

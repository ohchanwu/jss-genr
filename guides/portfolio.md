# Portfolio site guide

The site lives in a separate repo; the path is in `profile/assets.md`. It's a
static site on GitHub Pages, and pushing `main` deploys it. That repo's own
`AGENTS.md` governs code, QA, and process there: feature branches, a QA matrix
(desktop and mobile, both themes, both languages) on the local preview, and no
push unless the owner asks.

## Copy (site text)
- Use Workflow A's pattern: the owner drafts in English, and the agent produces
  the Korean, fact-checks, and suggests. Don't write site copy from scratch
  unless the owner asks.
- Same facts as the resume. Same hard rules as `CLAUDE.md` (no plans, honest
  status, AI-work framing).

## Publication filter (stricter than the resume: the site is public and indexed)
Never publish:
- home address, date of birth, or government IDs (the owner's contact details on the resume PDFs are intentionally public)
- client staff names or internal details that the client hasn't made public
- PHI or billing data
- anything from `profile/sensitive.md`
- credentials, internal hostnames, or infrastructure identifiers
- unverified metrics

When unsure, leave it out and ask.

## Resume PDFs on the site
The site serves copies of the resume PDFs (`static/resume-kr.pdf` is the KR
bullet version; `static/resume-en.pdf` is EN). Refresh them with `make sync-site`
in `resume/`, then commit in the site repo. `python3 tools/check-materials.py`
reports drift and broken links across the resume and site.

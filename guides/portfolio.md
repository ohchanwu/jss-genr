# Portfolio site guide

The site lives in a separate repo; the path is in `profile/assets.md`. That
repo's own `CLAUDE.md` governs code and process there: branches, PRs, who
commits, and no deploys by agents.

## Copy (site text)
- The site's `CLAUDE.md` says the owner writes the site copy. Use Workflow A's
  pattern: the owner drafts, and the agent translates (KR/EN), fact-checks, and
  suggests. Don't write site copy from scratch unless the owner asks.
- Same facts as the resume. Same hard rules as `CLAUDE.md` (no plans, honest
  status, AI-work framing).

## Publication filter (stricter than the resume: the site is public and indexed)
Never publish:
- phone number, home address, date of birth, or government IDs
- client staff names or internal details that the client hasn't made public
- PHI or billing data
- anything from `profile/sensitive.md`
- credentials, internal hostnames, or infrastructure identifiers
- unverified metrics

When unsure, leave it out and ask.

## Resume PDFs on the site
The site serves its own copies of the resume PDFs (`static/resume-*.pdf`).
After a resume rebuild, copy the new PDFs over in that repo, following its
workflow. Check that the linked file names still match.

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

Read AGENTS.md.

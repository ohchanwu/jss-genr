# jss-genr — application-materials harness

This repo is a harness for agents (Claude Code, Codex, or others) to help the
owner, a 신입 backend developer, produce Korean IT job-application materials:

1. **자기소개서**, co-written iteratively (see Workflow A)
2. **Resume/CV**: `resume/` (Workflow B)
3. **Portfolio website**: ohchanwu.dev, a separate repo (Workflow C)

`AGENTS.md` is a symlink to this file.

## Privacy boundary

**This repo is pushed publicly.** `profile/`, `companies/`, and `resume/` are
gitignored and hold personal data. Never copy personal facts into tracked files
(`CLAUDE.md`, `guides/`, `tools/`, `README.md`, `.claude/`). `resume/` has its
own nested local git history. Commit there for resume changes; never push it.

## Read first, every session

1. `profile/README.md`: the index of facts about the owner and how to trust them.
2. `profile/assets.md`: where the resume and portfolio live and their rules.
3. The guide for the task: `guides/writing.md` (always), plus
   `guides/resume.md` or `guides/portfolio.md`.
4. For a specific application, its `companies/<slug>/` folder.

## Hard rules (all materials)

1. **Facts only from `profile/`.** Every claim must trace to a profile entry.
   If the owner's draft contains a fact that isn't in the profile, ask about
   it. Once the owner confirms, add it to `profile/facts.md` with a date and
   source. Never invent numbers, users, results, dates, or experiences.
2. **Check dates.** Every profile fact carries an as-of date. Prefer newer
   sources. Treat anything older than about a year, or contradicted by a newer
   source, as possibly stale, and ask before relying on it.
3. **No plans, predictions, or hypotheses.** Planned, unshipped, or "will
   build" work doesn't appear in any material. It reads as untrustworthy or as
   "not enough material". A 입사 후 포부 answer may state goals, but never
   present a goal as an achievement.
4. **Label status honestly.** "Deployed demo" is not "launched". "Invite-only
   alpha" is not "users". "Designed" is not "implemented".
5. **AI-assisted work** is described as AI 에이전트를 활용한 하네스 엔지니어링:
   the owner designs the workflows, context, and verification, and multiple
   agents and models implement the code. Don't name a single vendor as the way
   they build, and don't claim "직접 코딩" for agent-written code.
6. **Sensitive material** (`profile/sensitive.md`): default is don't use. Propose
   it to the owner first if a 문항 clearly calls for it.
7. **Never overwrite drafts.** Every revision is a new numbered file.
8. **Consistency.** 자소서, resume, and site must agree on facts. When a fact
   changes, list every material that needs the same update (see
   `profile/assets.md` → known stale items).

## Workflow A: 자소서 co-writing (default)

The owner writes; the agent translates, checks, and coaches. Iterate until the
owner says it's final.

1. **Intake.** Create `companies/<slug>/` (see `guides/company-template.md`).
   Save the posting verbatim to `posting.md`, the 문항 and limits to
   `questions.md`, and research (official sources first, cite URLs and dates)
   to `research.md`. Map requirements to profile evidence in `strategy.md` and
   share that map with the owner before they draft. It shows them which stories
   fit which 문항 and where the gaps are.
2. **Owner draft.** The owner writes a rough English draft:
   `drafts/en-v1.md`, one `## ` heading per 문항.
3. **Agent round N.** Produce two files:
   - `drafts/ko-vN.md`: a natural Korean rendering of the owner's draft. Keep
     the owner's content and intent. Rewrite structure and phrasing so it reads
     like native 자소서 prose, not a translation. Fit it to the 글자수 limit;
     if it can't fit, show the over/under count and say what you'd cut.
   - `drafts/notes-vN.md`, in English:
     1. 글자수 per answer (`python3 tools/charcount.py`).
     2. Fact check: claims not traceable to `profile/`, wrong dates, stale facts.
     3. Suggestions, each tagged **add**, **remove**, or **improve**, with the
        reason (cite the guide rule, posting requirement, or advice) and a
        concrete Korean sentence the owner can adopt. Prioritize; at most
        about 7 per round.
     4. Questions for the owner.
   Don't apply your own suggestions silently in `ko-vN.md`. Keep the
   translation faithful so the owner can see their own draft, and keep the
   suggestions separate.
4. **Owner revises.** The owner replies with decisions, or with a new
   `en-v(N+1).md` or direct edits. Repeat step 3.
5. **Review.** Before calling it final, run the `jss-reviewer` subagent on the
   latest `ko-vN.md` and save the result to `reviews/`.
6. **Final.** Save the owner-approved text as `final.md`, with the submission
   date. Then update `profile/voice.md`: what the owner kept, rejected, and
   rephrased, and any glossary entries. Over time this teaches agents how the
   owner wants to sound.

If the owner asks for a first draft from scratch instead, write `drafts/ko-v1.md`
directly from `profile/` and `strategy.md` (the earlier agent-first mode).

## Workflow B: resume (`resume/`)

Read `resume/AGENTS.md` and follow it exactly:
- Snapshot-commit inside `resume/` before any change or build.
- The HTML is the source of truth.
- PDFs come from `make pdf`.
- Pass the QA gate before reporting success.

Content rules are in `guides/resume.md`. After the PDFs change, tell the owner
that the site's copies (`static/resume-*.pdf`) need refreshing; that's Workflow C.

## Workflow C: portfolio site (separate repo)

The path and rules are in `profile/assets.md`. Read that repo's `CLAUDE.md`
first; its rules win inside that repo. Content rules are in `guides/portfolio.md`.
The site is public: apply the publication filter in that guide.

## Language

Harness docs are in English. 자소서 output is in Korean. Notes to the owner are
in English. Talk to the owner in the language they use.

# jss-genr — 자기소개서 generation harness

This repo is a harness for agents (Claude Code, Codex, or others) to write
자기소개서 for Korean IT job applications on behalf of the owner. `AGENTS.md` is
a symlink to this file.

The owner is a 신입 backend developer. Their personal data lives in `profile/`
and per-application work lives in `companies/`. **Both are gitignored, and this
repo is pushed publicly.** Never copy personal facts into tracked files
(`CLAUDE.md`, `guides/`, `tools/`, `README.md`, `.claude/`).

## Read first, every session

1. `profile/README.md`: the index of facts about the owner and how to trust them.
2. `guides/writing.md`: how to write. It is grounded in advice the owner got from
   senior engineers; the evidence behind each rule is in
   `profile/sources/advice-digest.md`.
3. `guides/review.md`: the review rubric.
4. If the task is for a specific company, read its `companies/<slug>/` folder.

## Hard rules

1. **Facts only from `profile/`.** Every claim in a draft must trace to a
   profile entry. If a 문항 needs a fact that isn't there, stop and ask the
   owner. Never invent numbers, users, results, dates, or experiences.
2. **Check dates.** Every profile fact carries an as-of date. Prefer newer
   sources. Treat anything older than about a year, or contradicted by a newer
   source, as possibly stale, and ask before relying on it.
3. **No plans, predictions, or hypotheses.** Planned, in-progress-but-unshipped,
   or "will build" work does not go in a 자소서. It reads as untrustworthy or as
   "not enough material". Write only about what already exists. A 입사 후
   포부 answer may state goals, but never present a goal as an achievement.
4. **Label status honestly.** "Deployed demo" is not "launched". "Invite-only
   alpha" is not "users". "Designed" is not "implemented".
5. **AI-assisted work.** Describe it as AI 에이전트를 활용한 하네스 엔지니어링:
   the owner designs the workflows, context, and verification, and multiple
   agents and models implement the code. Don't name a single vendor as the way
   they build, and don't claim "직접 코딩" for agent-written code. Pair this with
   hand-coded evidence when fundamentals matter.
6. **Sensitive material** (family finances, health, personal history) lives in
   `profile/sensitive.md`. Use it only when a 문항 clearly calls for it and it
   strengthens the answer. It rarely does.
7. **Never overwrite drafts.** Save each revision as a new numbered file:
   `drafts/v1.md`, `v2.md`, and so on.
8. **Respect 글자수.** Check every answer with `python3 tools/charcount.py`.
   Aim for 90–100% of the limit. Note whether the limit counts spaces
   (공백 포함) or not (공백 제외).

## Workflow for a new application

1. **Intake.** Create `companies/<slug>/` from `guides/company-template.md`.
   Save the posting verbatim to `posting.md` (with URL and fetch date) and the
   문항 and limits to `questions.md`.
2. **Research.** Fill `research.md` with what the company does, the team and
   role, the tech stack, 인재상 and values (from official sources first), and
   recent news. Cite URLs and dates.
3. **Match.** In `strategy.md`, map each posting requirement to profile
   evidence, flag requirements with no evidence (ask the owner; don't paper
   over them), and pick which story answers which 문항. Avoid reusing one story
   across 문항 unless asked.
4. **Draft.** Write `drafts/v1.md` in Korean following `guides/writing.md`.
   Put the 글자수 next to each answer.
5. **Review.** Run the `jss-reviewer` subagent (`.claude/agents/jss-reviewer.md`)
   or apply `guides/review.md` yourself in a fresh context. Save the result to
   `reviews/v1-review.md`, revise into `v2.md`, and repeat until no blocking
   issues remain.
6. **Hand-off.** Give the owner the final text, the 글자수 per answer, a list of
   every factual claim with its profile source, and any open questions.

## Language

Harness docs are in English. 자소서 output is in Korean. Talk to the owner in
the language they use.

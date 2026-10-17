# jss-genr

An agent harness for Korean IT job-application materials: 자기소개서 (co-written
from the applicant's English drafts), resume, and portfolio-site copy, tailored
to one applicant's real experience and each company's posting and 인재상.

- `CLAUDE.md` / `AGENTS.md`: agent rules and workflows
- `guides/`: writing, resume, portfolio, review rubric, company template, profile format
- `resume/`: resume HTML sources, PDF build, layout QA
- `tools/charcount.py`: 글자수 counter (공백 포함/제외, CRLF worst case, bytes)
- `tools/check-materials.py`: resume↔site PDF drift and broken-link check
- `.claude/agents/jss-reviewer.md`: reviewer subagent

Personal data (`profile/`, `companies/`) is gitignored. To reuse the
harness, create your own `profile/` following `guides/profile-format.md`.

## Writing a 자소서 for a company

Run each step in an agent session started in this directory (Claude Code or
Codex). The agent reads `CLAUDE.md` and follows Workflow A.

1. **Give the agent the posting.**
   - Paste the posting URL (or text), the 문항, and each 글자수 limit. Say
     whether spaces count (공백 포함/제외).
   - For a site that needs a login (자소설닷컴, a company portal), log in
     yourself first, or paste the 문항 directly.
   - Example: "New application: <URL>. 문항 and limits: …"
2. **Read the strategy before you write.**
   - The agent creates `companies/<company>-<role>/` with the posting,
     research, and `strategy.md`.
   - `strategy.md` maps each posting requirement to your evidence, suggests a
     story for each 문항, and lists the gaps. Answer its questions first, since
     missing facts block drafting.
3. **Write a rough English draft.**
   - Save it as `companies/<slug>/drafts/en-v1.md`, with one `## ` heading per
     문항 in the same order as `questions.md`.
   - Rough is fine: bullet points, half sentences, notes like
     "(mention the outage here?)". Don't count characters; the agent fits the
     Korean to the limit.
   - Write only what actually happened, never planned work. If you add a fact
     the profile doesn't have, the agent will ask you to confirm it and then
     record it.
4. **Ask for a round:** "Do round 1 for <slug>." You get two files:
   - `drafts/ko-v1.md`: your draft in natural Korean, within the limits.
   - `drafts/notes-v1.md`: 글자수, a fact check, up to about 7 add / remove /
     improve suggestions (each with a ready-to-use Korean sentence), and
     questions for you.
5. **Revise and repeat.**
   - Reply with decisions ("take suggestions 1 and 3, drop 2"), or write
     `en-v2.md`, then ask for round 2.
   - Repeat until you're happy. Drafts are never overwritten, so you can always
     go back to an earlier version.
6. **Finish.**
   - Say "final". The agent runs the reviewer (`reviews/`), then saves
     `final.md`.
   - It also records what you kept and changed in `profile/voice.md`, so later
     drafts sound more like you.
   - Before submitting, paste each answer into the company's form once and
     check its own character counter.

To start from an agent-written draft instead, ask "write v1 from my profile".
The agent then drafts `ko-v1.md` itself, and you revise from there.

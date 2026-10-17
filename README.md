# jss-genr

An agent harness for Korean IT job-application materials: 자기소개서 (co-written
from the applicant's English drafts), resume, and portfolio-site copy, tailored
to one applicant's real experience and each company's posting and 인재상.

- `CLAUDE.md` / `AGENTS.md`: agent rules and workflows
- `guides/`: writing, resume, portfolio, review rubric, company template, profile format
- `tools/charcount.py`: 글자수 counter (공백 포함/제외, CRLF worst case, bytes)
- `.claude/agents/jss-reviewer.md`: reviewer subagent

Personal data (`profile/`, `companies/`, `resume/`) is gitignored. To reuse the
harness, create your own `profile/` following `guides/profile-format.md`.

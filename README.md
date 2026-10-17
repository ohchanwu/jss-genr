# jss-genr

An agent harness for writing 자기소개서 (Korean cover letters) for IT job
applications, tailored to one applicant's real experience and to each company's
posting and 인재상.

- `CLAUDE.md` / `AGENTS.md`: agent instructions and workflow
- `guides/`: writing rules, review rubric, company research template, profile format
- `tools/charcount.py`: 글자수 counter (공백 포함/제외, bytes)
- `.claude/agents/jss-reviewer.md`: reviewer subagent

Personal data (`profile/`) and per-company work (`companies/`) are gitignored.
To reuse the harness, create your own `profile/` following `guides/profile-format.md`.

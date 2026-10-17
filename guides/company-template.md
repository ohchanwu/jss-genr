# companies/<slug>/ layout

The slug is `<company>-<role>`, for example `acme-backend`.

| File | Contents |
| --- | --- |
| `posting.md` | Posting text verbatim, URL, fetch date, deadline, hiring process |
| `questions.md` | Each 문항 verbatim, its 글자수 limit, and whether spaces count |
| `research.md` | Company, products, team, stack, 인재상/values, recent news (cite URL and date) |
| `strategy.md` | Requirement → evidence map, gaps and owner answers, story-per-문항 options |
| `drafts/en-vN.md` | The owner's English draft, round N (one `## ` heading per 문항) |
| `drafts/ko-vN.md` | Agent's Korean rendering of `en-vN` (faithful; checked with `tools/charcount.py`) |
| `drafts/notes-vN.md` | Agent's 글자수, fact check, add/remove/improve suggestions, questions |
| `reviews/<draft>-review.md` | Reviewer output |
| `final.md` | Owner-approved submitted text, with the submission date |

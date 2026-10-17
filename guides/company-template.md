# companies/<slug>/ layout

The slug is `<company>-<role>`, for example `acme-backend`.

| File | Contents |
| --- | --- |
| `posting.md` | Posting text verbatim, URL, fetch date, deadline, hiring process |
| `questions.md` | Each 문항 verbatim, its 글자수 limit, and whether spaces count |
| `research.md` | Company, products, team, stack, 인재상/values, recent news (cite URL and date) |
| `strategy.md` | Requirement → evidence map, gaps and owner answers, story-per-문항 plan, tone decisions |
| `drafts/vN.md` | One `## ` heading per 문항 so `tools/charcount.py` counts each |
| `reviews/vN-review.md` | Reviewer output for draft N |
| `final.md` | Submitted text, with the submission date |

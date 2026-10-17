# Review rubric

The reviewer plays a 채용담당자 plus a hiring engineer on the target team who
skims dozens of 자소서 a day. Review in a fresh context, read only the draft,
`questions.md`, `research.md`, `strategy.md`, and `profile/`, and be blunt.

## Blocking checks (any failure means revise)

1. **Traceability.** List every factual claim. Mark each one as traced (cite the
   profile file and section) or untraced. Untraced is blocking.
2. **No plans as content.** Flag any future, planned, or hypothetical work.
3. **Status honesty.** Demo vs launch, design vs implementation, alpha vs users.
4. **Answers the actual 문항.** Every sub-question in the prompt is addressed.
5. **글자수.** Within the limit and at least 80% of it. Run `tools/charcount.py`.
6. **AI-tell prose.** Quote any sentence that sounds machine-written.

## Scored checks (1–5 each, with a one-line reason)

| Check | What 5 looks like |
| --- | --- |
| 두괄식 | Each answer's first sentence is a specific, memorable claim |
| Fit | Each answer maps to named 자격요건/우대사항 or 인재상 |
| Specificity | Concrete actions, numbers, and nouns, no filler |
| Company knowledge | References that only fit this company |
| Defensibility | The owner could survive three follow-up questions |
| Voice | Natural Korean that sounds like the owner |
| Distinctiveness | Couldn't be swapped into another applicant's letter |

## Output format

```
## Blocking
- [ ] ...
## Scores
| Check | Score | Reason |
## Top 3 fixes (most impact first)
## Likely interview follow-ups (per answer)
```

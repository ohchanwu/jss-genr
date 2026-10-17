# Writing guide

These rules are distilled from advice the owner received from working engineers
and hiring-side reviewers. Who said what, and when, is recorded in
`profile/sources/advice-digest.md` (gitignored). Rules marked **[tailor]** depend
on the company. Decide them per application in `strategy.md`.

## 1. What goes in

1. **Only shipped work.** No 예측, 가설, "~할 예정", or roadmap items. A reader
   who sees unbuilt work wonders why it's there. This applies to resumes and
   자소서 alike.
2. **Lead with the strongest project, not the newest.** Real users, real money,
   and real operations beat side projects. The order doesn't have to be
   chronological.
3. **Show operations, not just building.** Building, maintaining, and repairing
   your own service, and being able to explain it, is the most valued evidence.
   Incidents, postmortems, monitoring, and recovery are first-class material.
4. **Show fundamentals.** In an era of AI-generated projects, reviewers look for
   신입 who understand the fundamentals (OS, networking, databases, Linux).
   Name the concept you applied, not just the tool.
5. **People and feedback over stack.** How real people used the work, what
   feedback came back, and how you iterated matters more than a list of
   technologies.
6. **Initiative.** Prefer stories where you found the problem yourself and
   built the fix.
7. **Numbers.** Use real 수치 from the profile. If a number isn't in the profile,
   don't write one. Ask the owner. A qualitative but concrete result beats an
   invented percentage.
8. **Relevance [tailor].** Every answer should connect to the company's actual
   product and the posting's 업무/자격요건. Map requirements to evidence before
   drafting. Pick the stories that a hiring manager on that team would care about.

## 2. Framing

1. **AI-assisted engineering is a strength, if it is explained.** Reviewers will
   ask how AI was used. Describe the harness: specs, context design, review and
   verification gates, cost control. Then show that you understand the system
   that was built. Token efficiency and judgment beat volume.
2. **Back it with hand-coded proof** when fundamentals are in question.
3. **Non-CS background as an asset.** Never self-deprecate. Don't use
   "비전공자" as an apology. Frame the background as a different, useful lens.
4. **Career change as passion.** A switch into software and a self-taught start
   read as commitment when told plainly and without excuses.
5. **Bilingual strength, tied to engineering value.** For example, reading
   untranslated primary docs and specs, adopting new tech early, and sharing
   knowledge with colleagues. Don't show off. Write "한·영", not "영·한". Never
   imply Korean is a weak language.
6. **Humble tone, confident substance.** State real accomplishments plainly and
   fully. Don't hedge them away. Don't inflate them either.
7. **Reader's real question [tailor].**
   - Startups and SMEs: "How soon can this person be productive?"
   - Large companies: "Are the fundamentals solid, and will they keep learning?"
     (They train new hires for months anyway.)
8. **Identity line.** The owner is a backend developer who also handles cloud
   infrastructure and deployment, not a "cloud infra engineer". Adjust the
   emphasis per posting **[tailor]**. For an infra or operations role, lean into
   the operations evidence while staying truthful.

## 3. Structure

1. **두괄식.** The first sentence of each answer is the conclusion: the claim
   the reader should remember. Evidence follows.
2. **Project stories use PAAR:** 문제 → 분석 → 해결 → 결과/교훈. In prose
   자소서 the labels can stay implicit, but the order holds.
3. **One story, one point.** Cut details that don't serve the claim. Readers
   skim. Make it effortless to read.
4. **Every claim must survive an interview.** Interviewers question from the
   자소서 and resume. Don't include anything the owner can't explain in depth.
5. **Use links where the form allows** (repo, postmortem, PR). Reviewers won't
   go looking.

## 4. Korean style

The style adapts to the company and situation. These are defaults, not laws.

- 합니다체. Natural, spoken-sounding sentences. No translated-English syntax.
- Prefer plain words over hard non-technical vocabulary. Don't Koreanize
  English words that have a natural Korean equivalent. Technical terms stay in
  their standard form (EC2, Kubernetes, gp3).
- Keep English tokens to the ones a Korean engineer would actually write.
- Avoid AI-tell punctuation and filler: overuse of "·", em dashes, "및" chains,
  "~라는 점에서", "다양한", "끊임없이", "꾸준히", and empty closers like
  "최선을 다하겠습니다" without specifics.
- Avoid stock 자소서 clichés ("어릴 때부터", "~의 중요성을 깨달았습니다" with
  nothing concrete behind it).
- Never write "불가능" or a defeatist frame. Show attempts and what was learned.
- The prose must not read as AI-generated. Vary sentence length, use concrete
  nouns and verbs, and keep the owner's voice (see `profile/voice.md`).

## 5. 문항 types: what each is really asking

| 문항 | Real question | Best evidence type |
| --- | --- | --- |
| 지원동기 | Why us, why this role? | Product knowledge plus your matching work |
| 직무역량 | Can you do the job? | Requirement-mapped projects with results |
| 문제해결/실패 | How do you think under pressure? | Incident or failure, root cause, prevention |
| 협업/갈등 | Can we work with you? | Real cross-person friction and the fix |
| 성장과정/가치관 | Who are you? | One formative thread tied to work behavior |
| 입사 후 포부 | Do you understand the role? | Concrete first-year contributions |

## 6. Red flags (instant fails in review)

1. Planned or unshipped work presented as content.
2. Any fact not traceable to `profile/`.
3. Generic company praise that would fit any company.
4. Self-deprecation, or "impossible" framing.
5. Claims the owner couldn't defend in an interview.
6. Prose that reads as AI-generated.
7. Over the 글자수 limit, or under 80% of it.

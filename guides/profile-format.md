# profile/ format

`profile/` holds the facts about the applicant. It is gitignored.

| File | Contents |
| --- | --- |
| `README.md` | Index and trust rules |
| `facts.md` | Identity, education, work, projects, skills, certifications |
| `stories.md` | STAR/PAAR episodes ready for 문항 |
| `voice.md` | How the owner writes and wants to sound, plus writing samples |
| `strategy.md` | Target roles and companies, timing, constraints |
| `sensitive.md` | Personal material to use only when clearly useful |
| `open-questions.md` | Unknowns and conflicts awaiting the owner |
| `sources/` | Digests of raw sources, such as advice notes |

Each fact is tagged `[as-of YYYY-MM-DD · source · status]`.

| Status | Meaning |
| --- | --- |
| `verified` | Official document, repo evidence, or the owner confirmed it |
| `self-report` | The owner said it but it isn't independently checked |
| `stale?` | Old, or contradicted by a newer source |
| `unknown` | Missing; ask before using |

Plans are never recorded as facts.

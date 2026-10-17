NODE := /Users/chanbla11mit/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node

KR_HTML := resume-kr/resume-kr.html resume-kr/resume-kr-nostats.html resume-kr/resume-kr-narrative/resume-kr-narrative.html resume-kr/resume-kr-narrative/resume-kr-narrative-nostats.html
EN_HTML := resume-en/resume-en.html

.PHONY: pdf pdf-kr pdf-en qa format-example

# Every resume is hand-edited HTML (the source of truth). These targets only
# print HTML -> PDF via html-to-pdf.mjs; they never regenerate or overwrite HTML.
pdf: pdf-kr pdf-en

pdf-kr:
	$(NODE) html-to-pdf.mjs $(KR_HTML)

pdf-en:
	$(NODE) html-to-pdf.mjs $(EN_HTML)

qa:
	$(NODE) qa-resume.mjs

format-example:
	$(NODE) build-format-example.mjs

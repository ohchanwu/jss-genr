NODE ?= node
SITE ?= $(HOME)/mystuff/projects/ohchanwu.dev

KR_HTML := resume-kr/resume-kr.html resume-kr/resume-kr-narrative/resume-kr-narrative.html
EN_HTML := resume-en/resume-en.html

.PHONY: setup pdf pdf-kr pdf-en qa sync-site

# Every resume is hand-edited HTML (the source of truth). These targets only
# print HTML -> PDF via html-to-pdf.mjs; they never regenerate or overwrite HTML.
setup:
	npm install --no-audit --no-fund

pdf: pdf-kr pdf-en

pdf-kr:
	$(NODE) html-to-pdf.mjs $(KR_HTML)

pdf-en:
	$(NODE) html-to-pdf.mjs $(EN_HTML)

qa:
	$(NODE) qa-resume.mjs

# Copy the PDFs the portfolio site serves; the owner reviews and commits there.
sync-site:
	python3 ../tools/check-materials.py --sync --site $(SITE)

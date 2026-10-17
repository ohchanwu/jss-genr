#!/usr/bin/env python3
"""Cross-material checks: site resume-PDF drift and broken links.

Usage (from the repo root):
  python3 tools/check-materials.py [--site PATH] [--sync] [--no-links]

--sync copies the resume PDFs into the site's static/ folder when they differ.
Exit code 1 if PDFs are out of sync (without --sync) or any link is broken.
"""
import argparse
import hashlib
import re
import shutil
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
# Site file -> resume source PDF it should mirror.
SITE_PDFS = {
    "static/resume-kr.pdf": "resume/resume-kr/resume-kr.pdf",
    "static/resume-en.pdf": "resume/resume-en/resume-en.pdf",
}
RESUME_HTML = [
    "resume/resume-en/resume-en.html",
    "resume/resume-kr/resume-kr.html",
    "resume/resume-kr/resume-kr-narrative/resume-kr-narrative.html",
]


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def check_pdfs(site: Path, sync: bool) -> bool:
    ok = True
    for site_rel, src_rel in SITE_PDFS.items():
        src, dst = ROOT / src_rel, site / site_rel
        if dst.exists() and sha256(src) == sha256(dst):
            print(f"pdf in sync: {site_rel}")
        elif sync:
            shutil.copy2(src, dst)
            print(f"pdf copied:  {src_rel} -> {dst} (review and commit in the site repo)")
        else:
            print(f"pdf DRIFT:   {site_rel} != {src_rel}  (run with --sync)")
            ok = False
    return ok


def link_ok(url: str) -> tuple[bool, str]:
    headers = {"User-Agent": "Mozilla/5.0 (link check)"}
    for method in ("HEAD", "GET"):
        try:
            req = urllib.request.Request(url, method=method, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as resp:
                return True, str(resp.status)
        except urllib.error.HTTPError as e:
            # Some hosts reject HEAD; retry with GET before calling it broken.
            if method == "HEAD" and e.code in (403, 405, 501):
                continue
            # 401/403/429 usually mean bot blocking, not a dead page.
            if e.code in (401, 403, 429):
                return True, f"{e.code}?"
            return False, str(e.code)
        except Exception as e:  # DNS, TLS, timeout
            return False, type(e).__name__
    return False, "unreachable"


def check_links(files: list[Path]) -> bool:
    urls = set()
    for f in files:
        if f.exists():
            urls |= set(re.findall(r'<a\b[^>]*\bhref="(https?://[^"#]+)', f.read_text(encoding="utf-8")))
    ok = True
    for url in sorted(urls):
        good, status = link_ok(url)
        label = "link BROKEN" if not good else ("link blocked" if status.endswith("?") else "link ok    ")
        print(f"{label} {status:>4} {url}  " + ("(bot-blocked; check by hand)" if status.endswith("?") else ""))
        ok &= good
    return ok


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--site", default=str(Path.home() / "mystuff/projects/ohchanwu.dev"))
    p.add_argument("--sync", action="store_true")
    p.add_argument("--no-links", action="store_true")
    a = p.parse_args()
    site = Path(a.site).expanduser()

    ok = check_pdfs(site, a.sync)
    if not a.no_links:
        ok &= check_links([ROOT / f for f in RESUME_HTML] + [site / "static/index.html"])
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()

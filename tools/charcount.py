#!/usr/bin/env python3
"""Count 글자수 for 자소서 answers.

Usage:
  python3 tools/charcount.py FILE [--limit N]
  echo "텍스트" | python3 tools/charcount.py - [--limit N]

If FILE contains '## ' headings, each section is counted separately
(heading lines and lines starting with '>' or '<!--' are excluded).
"""
import argparse
import re
import sys


def count(text: str) -> dict:
    text = text.strip()
    return {
        "공백포함": len(text),
        "공백제외": len(re.sub(r"\s", "", text)),
        "bytes(UTF-8)": len(text.encode("utf-8")),
        # Browsers submit line breaks as CRLF, so some forms count each as 2.
        "줄바꿈2자": len(text) + text.count("\n"),
    }


def sections(raw: str) -> list[tuple[str, str]]:
    if "\n## " not in "\n" + raw:
        return [("(전체)", raw)]
    out, title, buf = [], None, []
    for line in raw.splitlines():
        if line.startswith("## "):
            if title is not None:
                out.append((title, "\n".join(buf)))
            title, buf = line[3:].strip(), []
        elif title is not None and not line.lstrip().startswith((">", "<!--", "#")):
            buf.append(line)
    if title is not None:
        out.append((title, "\n".join(buf)))
    return out


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("file")
    p.add_argument("--limit", type=int)
    a = p.parse_args()
    raw = sys.stdin.read() if a.file == "-" else open(a.file, encoding="utf-8").read()
    for title, body in sections(raw):
        c = count(body)
        line = (f"{title}: 공백포함 {c['공백포함']} (줄바꿈 2자 시 {c['줄바꿈2자']}) / "
                f"공백제외 {c['공백제외']} / {c['bytes(UTF-8)']} bytes")
        if a.limit:
            line += f"  ({c['공백포함'] / a.limit:.0%} of {a.limit})"
        print(line)


if __name__ == "__main__":
    main()

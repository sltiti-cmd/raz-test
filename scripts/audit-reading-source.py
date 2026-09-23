"""Check the live reading question bank against the source test PDFs.

This is intentionally stricter than validateTestData.js: it checks that every
English stem and text option is present in the student PDF, then verifies the
reviewed answer-key sequence for every live reading level.
"""

from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]

LEVELS = {
    "A": {
        "module": "a.js",
        "export": "levelA",
        "pdf": "public/raw/A/A级别-入门-升级-测试.pdf",
        "additional_pdf": "public/raw/A/A级别-入门-升级-答案.pdf",
        # The separate A answer PDF uses an older option-letter order. These
        # letters are mapped to the visible options in the student test PDF.
        "answers": ["AAABB", "BAAAB", "BABBB", "AAABA"],
    },
    "D": {
        "module": "d.js",
        "export": "levelD",
        "pdf": "public/raw/D/D级别入门测试.pdf",
        "answers": ["CCCBB", "CCAAC", "CBCCB", "ACBBC"],
    },
    "G": {
        "module": "g.js",
        "export": "levelG",
        "pdf": "public/raw/G/G级别入门测试.pdf",
        "answers": ["ABCCA", "ABCBC", "CCBBB", "BCABA"],
    },
    "K": {
        "module": "k.js",
        "export": "levelK",
        "pdf": "public/raw/K/K级别-测试.pdf",
        "answers": ["CBCAB", "DCBBC", "BDACA", "BACCC"],
    },
    "O": {
        "module": "o.js",
        "export": "levelO",
        "pdf": "public/raw/O/O级别-测试.pdf",
        "answers": ["BCCAD", "CCBBA", "DDCAB", "CBCAD"],
    },
    "R": {
        "module": "r.js",
        "export": "levelR",
        "pdf": "public/raw/R/R级别测试-无答案.pdf",
        # R has no answer PDF; these were checked directly against the four passages.
        "answers": ["BBDCA", "BCDCD", "DBCDC", "DCCCB"],
    },
}


def normalize(value: str) -> str:
    value = (
        value.casefold()
        .replace("’", "'")
        .replace("‘", "'")
        .replace("“", '"')
        .replace("”", '"')
        .replace("—", "-")
        .replace("–", "-")
    )
    return re.sub(r"[^a-z0-9]+", "", value)


def load_live_levels() -> dict:
    specs = [
        [level, f"./src/data/levels/{config['module']}", config["export"]]
        for level, config in LEVELS.items()
    ]
    loader = f"""
const specs = {json.dumps(specs)};
const result = {{}};
for (const [level, path, key] of specs) {{
  const module = await import(path);
  result[level] = module[key];
}}
process.stdout.write(JSON.stringify(result));
"""
    completed = subprocess.run(
        ["node", "--input-type=module", "-e", loader],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
        encoding="utf-8",
    )
    return json.loads(completed.stdout)


def main() -> None:
    levels = load_live_levels()
    issues: list[str] = []
    checked_questions = 0

    for level, config in LEVELS.items():
        data = levels[level]
        source_paths = [config["pdf"]]
        if config.get("additional_pdf"):
            source_paths.append(config["additional_pdf"])
        pdf_text = "\n".join(
            page.extract_text() or ""
            for source_path in source_paths
            for page in PdfReader(ROOT / source_path).pages
        )
        normalized_pdf = normalize(pdf_text)

        passages = data.get("passages", [])
        if len(passages) != 4:
            issues.append(f"{level}: expected 4 passages, found {len(passages)}")
            continue

        expected_global_id = 1
        for passage_index, passage in enumerate(passages):
            questions = passage.get("questions", [])
            if len(questions) != 5:
                issues.append(
                    f"{level}{passage_index + 1}: expected 5 questions, found {len(questions)}"
                )
            actual_answers = "".join(question.get("answer", "") for question in questions)
            expected_answers = config["answers"][passage_index]
            if actual_answers != expected_answers:
                issues.append(
                    f"{level}{passage_index + 1}: answers {actual_answers}, expected {expected_answers}"
                )

            for question in questions:
                checked_questions += 1
                question_id = question.get("id")
                if question_id != expected_global_id:
                    issues.append(
                        f"{level}: question id {question_id}, expected {expected_global_id}"
                    )
                expected_global_id += 1

                stem = question.get("question", "")
                if normalize(stem) not in normalized_pdf:
                    issues.append(f"{level} Q{question_id}: stem not found in source PDF: {stem}")

                for option in question.get("options", []):
                    text = option.get("text", "").strip()
                    if not text or option.get("graphicOnly"):
                        continue
                    if normalize(text) not in normalized_pdf:
                        issues.append(
                            f"{level} Q{question_id} option {option.get('key')}: "
                            f"not found in source PDF: {text}"
                        )

        print(f"{level}: 4 passages / 20 questions checked")

    print(f"Total checked: {checked_questions} questions")
    if issues:
        print(f"Issues: {len(issues)}")
        for issue in issues:
            print(f"- {issue}")
        raise SystemExit(1)
    print("Issues: 0")


if __name__ == "__main__":
    main()

"""Extract only source-PDF artwork for the reading passage cards.

Run with the bundled Codex Python runtime (pypdf + Pillow are required).
Multiple illustrations from one passage page are placed on a white contact sheet;
no generated or external artwork is introduced.
"""

from __future__ import annotations

import hashlib
import math
import re
from pathlib import Path

from PIL import Image
from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "images" / "passages"

PASSAGES = {
    "A": ("public/raw/A/A级别-入门-升级-测试.pdf", [(1, "He Has Two"), (3, "This Plane"), (5, "Here Is a Number"), (7, "Three Birds")]),
    "C": ("public/raw/C/c passage quiz(2).pdf", [(1, "The Moon Can Look Different"), (3, "What Will You Have At a Party"), (5, "It Is a Birthday Party"), (7, "Monkeys Have Many Feelings")]),
    "D": ("public/raw/D/D级别入门测试.pdf", [(1, "Animals Like to Eat"), (3, "At the Playground"), (5, "I See Tall Trees"), (7, "We Use Our Senses")]),
    "E": ("public/raw/E/e级别测试-测试.pdf", [(1, "I Need Shoes to Play Soccer"), (3, "Jen and Ben Learn About Farms"), (5, "Shoes in Different Seasons"), (7, "Where Birds Make Nests")]),
    "G": ("public/raw/G/G级别入门测试.pdf", [(1, "Fruit From My Garden"), (3, "How to Penguin Dance"), (5, "Sally's Bath"), (7, "Steps to Make a Garden")]),
    "K": ("public/raw/K/K级别-测试.pdf", [(1, "The Treasure Map"), (3, "Map Tools"), (5, "The Great Zoo Escape"), (7, "The Bronx Zoo Cares")]),
    "O": ("public/raw/O/O级别-测试.pdf", [(1, "New Ways to Surf"), (4, "Take a Break"), (6, "Lost at the Beach"), (8, "MyPlate")]),
}


def slugify(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def unique_images(page) -> list[Image.Image]:
    found: list[Image.Image] = []
    signatures: set[str] = set()
    for embedded in page.images:
        image = embedded.image.convert("RGB")
        signature = hashlib.sha256(
            f"{image.width}x{image.height}".encode("ascii") + image.tobytes()
        ).hexdigest()
        if signature in signatures:
            continue
        signatures.add(signature)
        found.append(image)
    return found


def fit(image: Image.Image, width: int, height: int) -> Image.Image:
    copy = image.copy()
    copy.thumbnail((width, height), Image.Resampling.LANCZOS)
    return copy


def contact_sheet(images: list[Image.Image]) -> Image.Image:
    if len(images) == 1:
        image = images[0]
        if max(image.size) > 1800:
            image = fit(image, 1800, 1800)
        return image

    count = len(images)
    columns = 2 if count <= 4 else 3
    rows = math.ceil(count / columns)
    cell_width, cell_height = 500, 420
    outer, gap = 30, 24
    canvas = Image.new(
        "RGB",
        (
            outer * 2 + columns * cell_width + (columns - 1) * gap,
            outer * 2 + rows * cell_height + (rows - 1) * gap,
        ),
        "white",
    )
    for index, image in enumerate(images):
        thumb = fit(image, cell_width, cell_height)
        column = index % columns
        row = index // columns
        x = outer + column * (cell_width + gap) + (cell_width - thumb.width) // 2
        y = outer + row * (cell_height + gap) + (cell_height - thumb.height) // 2
        canvas.paste(thumb, (x, y))
    return canvas


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    written = 0
    for level, (relative_pdf, passages) in PASSAGES.items():
        reader = PdfReader(ROOT / relative_pdf)
        for passage_index, (page_number, title) in enumerate(passages, start=1):
            images = unique_images(reader.pages[page_number - 1])
            if not images:
                raise RuntimeError(f"No source image found: {level}{passage_index} {title}")
            output = OUTPUT_DIR / f"{level.lower()}-{slugify(title)}.jpg"
            contact_sheet(images).save(output, "JPEG", quality=91, optimize=True)
            print(f"{level}{passage_index}: {len(images)} source image(s) -> {output.relative_to(ROOT)}")
            written += 1
    print(f"Wrote {written} passage image files.")


if __name__ == "__main__":
    main()

from __future__ import annotations

import csv
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
INPUT_FILE = ROOT / "tools" / "input.txt"
OUTPUT_FILE = ROOT / "fab-overview" / "public" / "data" / "heroLivingLegendPoints.json"


def parse_living_legend_points(input_file: Path) -> list[dict[str, int | str]]:
    heroes: list[dict[str, int | str]] = []

    with input_file.open(encoding="utf-8", newline="") as file:
        reader = csv.reader(file, delimiter="\t")

        for row in reader:
            if len(row) < 4:
                continue

            name = row[1].strip()
            living_legend_points = row[3].strip()

            if not name or not living_legend_points.isdigit():
                continue

            heroes.append({
                "name": name,
                "livingLegendPoints": int(living_legend_points),
            })

    return heroes


def main() -> None:
    heroes = parse_living_legend_points(INPUT_FILE)

    with OUTPUT_FILE.open("w", encoding="utf-8", newline="\n") as file:
        json.dump(heroes, file, ensure_ascii=False, indent=2)
        file.write("\n")


if __name__ == "__main__":
    main()

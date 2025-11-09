from __future__ import annotations

import argparse
import sys
from pathlib import Path
from zipfile import ZipFile


def list_entries(pak_path: Path, substring: str | None = None, limit: int = 50) -> None:
    substring_lower = substring.lower() if substring else None
    with ZipFile(pak_path) as pak:
        names = pak.namelist()
        if substring_lower:
            names = [n for n in names if substring_lower in n.lower()]
        print(f"{pak_path.name}: {len(names)} entries")
        for name in names[:limit]:
            print(name)


def find_entry(pak_path: Path, needle: str) -> None:
    needle_lower = needle.lower()
    with ZipFile(pak_path) as pak:
        for name in pak.namelist():
            if needle_lower in name.lower():
                print(f"{pak_path.name}: {name}")
                return
    print(f"No match for {needle} in {pak_path}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("pak", type=Path)
    parser.add_argument("--contains")
    parser.add_argument("--find")
    parser.add_argument("--limit", type=int, default=30)
    args = parser.parse_args()

    if args.find:
        find_entry(args.pak, args.find)
    else:
        list_entries(args.pak, substring=args.contains, limit=args.limit)


if __name__ == "__main__":
    main()

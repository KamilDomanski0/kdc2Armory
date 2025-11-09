import argparse
import zipfile
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser(description="Print text content from a pak entry.")
    parser.add_argument("pak_path", type=Path)
    parser.add_argument("entry")
    parser.add_argument("--limit", type=int, default=1000)
    args = parser.parse_args()

    with zipfile.ZipFile(args.pak_path) as archive:
        data = archive.read(args.entry)

    text = data.decode("utf-8", errors="ignore")
    print(text[: args.limit])


if __name__ == "__main__":
    main()

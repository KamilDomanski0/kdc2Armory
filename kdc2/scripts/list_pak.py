import argparse
import zipfile
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser(description="List entries inside a .pak/.zip file.")
    parser.add_argument("pak_path", type=Path, help="Path to the pak file")
    parser.add_argument("--limit", type=int, default=50)
    args = parser.parse_args()

    with zipfile.ZipFile(args.pak_path) as archive:
        names = archive.namelist()

    print(f"{len(names)} entries found.")
    for name in names[: args.limit]:
        print(name)


if __name__ == "__main__":
    main()

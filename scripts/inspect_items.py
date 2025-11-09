import xml.etree.ElementTree as ET
from pathlib import Path

BASE = Path(r"C:\Program Files (x86)\Steam\steamapps\common\KingdomComeDeliverance2\Data\Tables\Libs\Tables\item")

FILES = ["item.xml", "item__unique.xml"]


def main() -> None:
    tags = set()
    total = 0
    for name in FILES:
        path = BASE / name
        tree = ET.parse(path)
        root = tree.getroot()
        for elem in root.iter():
            tags.add(elem.tag)
            total += 1
    print("unique tags:", sorted(tags))
    print("total elements:", total)


if __name__ == "__main__":
    main()

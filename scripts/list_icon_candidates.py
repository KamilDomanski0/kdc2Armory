import zipfile
from pathlib import Path

GAME_DATA_DIR = Path(r"C:\Program Files (x86)\Steam\steamapps\common\KingdomComeDeliverance2\Data")


def main() -> None:
    for pak in sorted(GAME_DATA_DIR.glob("*Textures*.pak")):
        with zipfile.ZipFile(pak) as archive:
            hits = [name for name in archive.namelist() if "icon" in name.lower()]
        if hits:
            print(pak.name, len(hits))
            for entry in hits[:20]:
                print("   ", entry)


if __name__ == "__main__":
    main()

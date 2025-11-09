"""
Generate the wearable-items dataset directly from local game assets.

Steps performed:
1. Parse item XML tables (including unique items) for all wearable categories.
2. Resolve localized names/descriptions from English localization files.
3. Export the matching icon DDS files from IPL_GameData.pak and convert them to PNG.
4. Write the resulting JSON seed file consumed by app/seed.py.
"""

from __future__ import annotations

import argparse
import io
import json
import re
import shutil
import zipfile
from collections import OrderedDict
from pathlib import Path
from typing import Dict, Iterable, List, Tuple, Set
import xml.etree.ElementTree as ET

from PIL import Image, UnidentifiedImageError

REPO_ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = REPO_ROOT / "data"
STATIC_ICONS = REPO_ROOT / "static" / "icons"

DEFAULT_GAME_ROOT = Path(
    r"C:\Program Files (x86)\Steam\steamapps\common\KingdomComeDeliverance2"
)

ITEM_FILES = [
    Path("Data/Tables/Libs/Tables/item/item.xml"),
    Path("Data/Tables/Libs/Tables/item/item__unique.xml"),
]

CHAR_COMPONENT_FILE = Path(
    "Data/Tables/Libs/Tables/Character/CharacterComponent.xml"
)
EQUIPMENT_SLOT_FILE = Path("Data/Tables/Libs/Tables/item/equipment_slot.xml")

LOCALIZATION_FILE = Path("Localization/English_xml.pak")
LOCALIZATION_ENTRY = "text_ui_items.xml"

ICON_PAK = Path("Data/IPL_GameData.pak")
ICON_PREFIX = "Libs/UI/Textures/Icons/Items/"
PLACEHOLDER_ICON = "_missing.png"

WEARABLE_TAGS = {"Armor", "Helmet", "Hood"}
NON_HUMAN_PART_KEYWORDS = (
    "horse",
    "dog",
    "cattle",
    "sheep",
    "hare",
    "animal",
    "cow",
    "pig",
)

SLOT_CATEGORY_MAP = {
    "Coif": ("head", "coif"),
    "Collar": ("head", "collar"),
    "Cap": ("head", "other"),
    "Gauntlets": ("arms", "gloves"),
    "Gauntlet": ("arms", "gloves"),
    "Caparison": ("body", "coat"),
    "Helmet": ("head", "helmet"),
    "Hood": ("head", "hood"),
    "Necklace": ("head", "necklace"),
    "Cloth": ("body", "body"),
    "Chainmail": ("body", "chainmail"),
    "Plate": ("body", "plate"),
    "Coat": ("body", "coat"),
    "Belt": ("body", "belt"),
    "Pouch": ("body", "belt"),
    "Gloves": ("arms", "gloves"),
    "Sleeves": ("arms", "sleeved"),
    "Ring": ("arms", "ring"),
    "Trousers": ("legs", "hose"),
    "LegArmor": ("legs", "cuisses"),
    "Boot": ("legs", "shoes"),
    "Spur": ("legs", "spurs"),
}

SLOT_CATEGORY_LOOKUP = {
    key.lower(): value for key, value in SLOT_CATEGORY_MAP.items()
}

ARMOR_TYPE_OVERRIDES = {
    "spectacles": ("head", "necklace"),
    "eyepatchzizka": ("head", "other"),
}

PART_CATEGORY_MAP = {
    "head": ("head", "other"),
    "face": ("head", "other"),
    "neck": ("head", "necklace"),
    "collar": ("head", "collar"),
    "torso": ("body", "body"),
    "waist": ("body", "belt"),
    "belt": ("body", "belt"),
    "arms": ("arms", "sleeved"),
    "hands": ("arms", "gloves"),
    "legs": ("legs", "hose"),
    "feet": ("legs", "shoes"),
}


TOKEN_PRIORITY_RULES = [
    ("body", "waffenrock", ("waffenrock",)),
    ("arms", "gloves", ("glove", "gauntlet", "mitt", "mitten", "handwrap")),
    ("arms", "sleeved", ("sleeve", "vambrace", "bracer", "armguard")),
    ("arms", "ring", ("ring", "signet", "band")),
]


def _contains(text: str, keywords: Iterable[str]) -> bool:
    separators = "-_/\\'\".,:;()[]{}!?*#+~|`"
    lower = text.lower()
    tokens: Set[str] = set(
        filter(
            None,
            re.split(rf"[{re.escape(separators)}\s]+", lower),
        )
    )
    for keyword in keywords:
        kw = keyword.lower()
        if " " in kw:
            if kw in lower:
                return True
        elif kw in tokens:
            return True
    return False


def _extract_identifier_tokens(identifier: str) -> List[str]:
    tokens: List[str] = []
    for part in identifier.split("_"):
        camel_segments = re.findall(r"[A-Za-z][a-z]*", part)
        if camel_segments:
            tokens.extend(seg.lower() for seg in camel_segments)
        else:
            tokens.extend(re.findall(r"[a-z]+", part.lower()))
    return tokens


def _match_token_priority(token: str) -> Tuple[str | None, str | None]:
    normalized_token = token.lower()
    for category, subcategory, keywords in TOKEN_PRIORITY_RULES:
        keyword_set = {kw.lower() for kw in keywords}
        if normalized_token in keyword_set:
            return category, subcategory
    return None, None


def classify_by_name(elem, display_name: str) -> Tuple[str, str]:
    base_text = " ".join(
        filter(
            None,
            [
                display_name,
                elem.attrib.get("Name"),
                elem.attrib.get("UIName"),
                elem.attrib.get("Clothing"),
            ],
        )
    ).lower()

    clothing_identifier = (elem.attrib.get("Clothing") or "").lower()
    tokens = _extract_identifier_tokens(clothing_identifier)
    for token in tokens:
        category, subcategory = _match_token_priority(token)
        if category:
            return category, subcategory

    tag = elem.tag.lower()

    if tag == "helmet":
        return "head", "helmet"
    if tag == "hood":
        return "head", "hood"

    if _contains(base_text, ["coif", "aventail"]):
        return "head", "coif"
    if _contains(base_text, ["collar", "gorget"]):
        return "head", "collar"
    if _contains(base_text, ["necklace", "amulet", "pendant", "medal", "spectacle", "glass"]):
        return "head", "necklace"
    if _contains(base_text, ["cap", "hat", "mask", "veil", "circlet", "bonnet", "hoodless", "chaperon"]):
        return "head", "cap"

    if _contains(base_text, ["ring", "signet", "wedding band"]):
        return "arms", "ring"
    if _contains(base_text, ["glove", "gauntlet", "mitt", "mitten", "handwrap"]):
        return "arms", "gloves"
    if _contains(base_text, ["sleeve", "vambrace", "bracer", "armguard", "arm guard"]):
        return "arms", "sleeved"

    if _contains(base_text, ["hose", "legging", "chausses", "stocking", "tight", "pants", "trouser"]):
        return "legs", "hose"
    if _contains(base_text, ["cuisse", "greave", "knee guard", "poleyn", "tasset", "leg armor"]):
        return "legs", "cuisses"
    if _contains(base_text, ["spur", "spurs"]):
        return "legs", "spurs"
    if _contains(base_text, ["shoe", "shoes", "boot", "boots", "sandal", "sandals", "sabatons"]):
        lady_words = ["lady", "women", "woman", "dame", "female", "princess"]
        if _contains(base_text, lady_words):
            return "legs", "ladies shoes"
        return "legs", "shoes"

    if _contains(base_text, ["belt", "girdle", "sash", "strap", "pouch", "bag", "scabbard"]):
        return "body", "belt"
    if _contains(base_text, ["dress", "robe", "gown", "habit"]):
        return "body", "dress"
    if _contains(base_text, ["waffenrock"]):
        return "body", "waffenrock"
    if _contains(base_text, ["coat", "gambeson", "doublet", "tabard", "surcoat", "tunic", "jerkin", "jacket", "cloak"]):
        return "body", "coat"
    if _contains(base_text, ["chainmail", "chain mail", "hauberk", "mailshirt", "mail coat"]):
        return "body", "chainmail"
    if _contains(base_text, ["plate", "brigandine", "cuirass", "breastplate", "plackart"]):
        return "body", "plate"

    return "body", "body"


def load_localization(game_root: Path) -> Dict[str, str]:
    pak_path = game_root / LOCALIZATION_FILE
    with zipfile.ZipFile(pak_path) as pak:
        table_bytes = pak.read(LOCALIZATION_ENTRY)
    root = ET.fromstring(table_bytes)
    mapping: Dict[str, str] = {}
    for row in root.findall("Row"):
        cells = [cell.text or "" for cell in row.findall("Cell")]
        if not cells:
            continue
        key = cells[0]
        text = next((cell for cell in cells[1:] if cell), "")
        mapping[key] = text
    return mapping


def load_clothing_metadata(game_root: Path) -> Dict[str, Dict[str, str]]:
    char_path = game_root / CHAR_COMPONENT_FILE
    metadata: Dict[str, Dict[str, str]] = {}
    if not char_path.exists():
        return metadata

    tree = ET.parse(char_path)
    root = tree.getroot()

    def visit(node: ET.Element, inherited: Dict[str, str]) -> None:
        current = dict(inherited)
        if node.tag == "Clothing":
            name = node.attrib.get("Name")
            if name:
                armor_type = node.attrib.get("ArmorType") or current.get("armor_type")
                if armor_type:
                    current["armor_type"] = armor_type
                part = None
                for element in node:
                    if element.tag not in {
                        "SkinElement",
                        "VClothElement",
                        "AccessoryElement",
                    }:
                        continue
                    part = element.attrib.get("EquipmentPart")
                    if part:
                        current["equipment_part"] = part.lower()
                        break
                metadata[name] = {k: v for k, v in current.items() if v}
        for child in node:
            visit(child, current)

    visit(root, {})
    return metadata


def load_armor_type_slots(game_root: Path) -> Dict[str, Dict[str, str]]:
    slot_path = game_root / EQUIPMENT_SLOT_FILE
    mapping: Dict[str, Dict[str, str]] = {}
    if not slot_path.exists():
        return mapping

    tree = ET.parse(slot_path)
    root = tree.getroot()
    for slot in root.iter("EquipmentSlot"):
        armor_types = slot.attrib.get("ArmorTypes")
        if not armor_types:
            continue
        slot_name = slot.attrib.get("UISlot")
        subtype = slot.attrib.get("UISlotSubType")
        for armor in armor_types.split():
            mapping[armor.lower()] = {
                "slot": slot_name,
                "subtype": subtype,
            }
    return mapping


def slot_to_category(slot_name: str | None) -> Tuple[str | None, str | None]:
    if not slot_name:
        return None, None
    return SLOT_CATEGORY_LOOKUP.get(slot_name.strip().lower(), (None, None))


def part_to_category(part: str | None) -> Tuple[str | None, str | None]:
    if not part:
        return None, None
    return PART_CATEGORY_MAP.get(part, (None, None))


def parse_float(value: str | None) -> float:
    if not value:
        return 0.0
    try:
        return float(value)
    except ValueError:
        return 0.0


def parse_int(value: str | None) -> int:
    return int(round(parse_float(value)))


def clamp_non_negative(value: float) -> float:
    return value if value >= 0 else 0.0


def collect_wearables(game_root: Path, localization: Dict[str, str]) -> List[Dict]:
    clothing_metadata = load_clothing_metadata(game_root)
    armor_type_slots = load_armor_type_slots(game_root)
    items: Dict[str, Dict] = OrderedDict()
    for relative in ITEM_FILES:
        xml_path = game_root / relative
        tree = ET.parse(xml_path)
        root = tree.getroot()
        for elem in root.iter():
            if elem.tag not in WEARABLE_TAGS:
                continue
            if elem.attrib.get("IsQuestItem", "").lower() == "true":
                continue
            icon_id = elem.attrib.get("IconId")
            if not icon_id:
                continue
            uuid = elem.attrib.get("Id")
            if not uuid or uuid in items:
                continue

            ui_name_key = elem.attrib.get("UIName")
            ui_info_key = elem.attrib.get("UIInfo")
            stab = clamp_non_negative(parse_float(elem.attrib.get("DefenseStab")))
            slash = clamp_non_negative(parse_float(elem.attrib.get("DefenseSlash")))
            blunt = clamp_non_negative(parse_float(elem.attrib.get("DefenseSmash")))
            consp = clamp_non_negative(parse_float(elem.attrib.get("Conspicuousness")))
            noise = clamp_non_negative(parse_float(elem.attrib.get("Noise")))
            visibility = clamp_non_negative(parse_float(elem.attrib.get("Visibility")))
            charisma = clamp_non_negative(parse_float(elem.attrib.get("Charisma")))

            clothing_name = elem.attrib.get("Clothing")
            if clothing_name and clothing_name.lower().startswith("f_"):
                continue
            clothing_info = clothing_metadata.get(clothing_name or "", {})
            first_identifier = ""
            identifier_tokens: List[str] = []
            if clothing_name:
                lowered = clothing_name.lower()
                if "caparison" in lowered or "chanfron" in lowered:
                    continue
                first_segment = clothing_name.split("_")[0]
                first_identifier = re.sub(r"\d+$", "", first_segment) or first_segment
                identifier_tokens = _extract_identifier_tokens(first_identifier)
            equipment_part = clothing_info.get("equipment_part")
            if equipment_part and any(
                keyword in equipment_part for keyword in NON_HUMAN_PART_KEYWORDS
            ):
                continue
            armor_type = clothing_info.get("armor_type")

            display_name = localization.get(
                ui_name_key, elem.attrib.get("Name", "Unknown")
            )
            if display_name.strip().lower() == "podezřelý váček":
                display_name = "A suspicious bag"

            slot_category = slot_subcategory = None
            if identifier_tokens:
                for token in identifier_tokens:
                    prefix_category, prefix_subcategory = slot_to_category(token)
                    if prefix_category:
                        slot_category, slot_subcategory = prefix_category, prefix_subcategory
                        break
            if not slot_category and first_identifier:
                prefix_category, prefix_subcategory = slot_to_category(first_identifier)
                if prefix_category:
                    slot_category, slot_subcategory = prefix_category, prefix_subcategory
            if armor_type:
                slot_entry = armor_type_slots.get(armor_type.lower())
                if slot_entry:
                    slot_category, slot_subcategory = slot_to_category(
                        slot_entry.get("slot")
                    )
                if not slot_category:
                    override = ARMOR_TYPE_OVERRIDES.get(armor_type.lower())
                    if override:
                        slot_category, slot_subcategory = override

            if not slot_category:
                slot_category, slot_subcategory = part_to_category(equipment_part)

            if not slot_category:
                slot_category, slot_subcategory = classify_by_name(
                    elem, display_name
                )

            display_identifier = clothing_name or elem.attrib.get("Name") or uuid
            alt_group = display_identifier
            if alt_group:
                alt_group = re.sub(r"_colorVar_\d+$", "", alt_group)
                alt_group = re.sub(r"_m\d+(?:_[A-Za-z0-9]+)?$", "", alt_group)
                alt_group = re.sub(r"_Broken.*$", "", alt_group)

            record = {
                "icon": f"/static/icons/{icon_id}.png",
                "icon_id": icon_id,
                "name": display_name,
                # Expose the readable clothing identifier (e.g., Cap05_m07) in item_id.
                "item_id": display_identifier or uuid,
                "category": elem.tag,
                "stab_defense": int(round(stab)),
                "slash_defense": int(round(slash)),
                "blunt_defense": int(round(blunt)),
                "conspicuousness": round(consp, 3),
                "noise": round(noise, 3),
                "visibility": round(visibility, 3),
                "charisma": round(charisma, 3),
                "slot_category": slot_category,
                "slot_subcategory": slot_subcategory,
                # Keep the UUID accessible in alt_id for console commands / debugging.
                "alt_id": uuid,
                "alt_group": alt_group or display_identifier or uuid,
            }
            items[uuid] = record
    sorted_items = sorted(items.values(), key=lambda row: row["name"])
    return sorted_items


def ensure_placeholder_icon() -> Path:
    STATIC_ICONS.mkdir(parents=True, exist_ok=True)
    placeholder = STATIC_ICONS / PLACEHOLDER_ICON
    if not placeholder.exists():
        image = Image.new("RGBA", (96, 96), (30, 33, 45, 255))
        for x in range(0, 96, 6):
            for y in range(0, 96, 6):
                if (x + y) % 12 == 0:
                    image.putpixel((x, y), (255, 200, 0, 255))
        image.save(placeholder)
    return placeholder


def export_icons(game_root: Path, icon_ids: Iterable[str]) -> Tuple[int, List[str]]:
    placeholder_path = ensure_placeholder_icon()
    icon_dir = STATIC_ICONS

    existing = list(icon_dir.glob("*.png"))
    for path in existing:
        if path.name != PLACEHOLDER_ICON:
            path.unlink()

    pak_path = game_root / ICON_PAK
    with zipfile.ZipFile(pak_path) as pak:
        available = set(pak.namelist())
        missing: List[str] = []
        exported = 0
        for icon_id in sorted(set(icon_ids)):
            candidates = [
                f"{ICON_PREFIX}{icon_id}_icon.dds",
                f"{ICON_PREFIX}{icon_id}.dds",
            ]
            match = next((c for c in candidates if c in available), None)
            if not match:
                alt = next(
                    (name for name in available if name.endswith(f"/{icon_id}_icon.dds")),
                    None,
                )
                match = alt
            target_path = icon_dir / f"{icon_id}.png"
            if not match:
                shutil.copy(placeholder_path, target_path)
                missing.append(icon_id)
                continue
            buffer = io.BytesIO(pak.read(match))
            try:
                image = Image.open(buffer)
                image.load()
                image = image.convert("RGBA")
                image.save(target_path)
                exported += 1
            except UnidentifiedImageError:
                shutil.copy(placeholder_path, target_path)
                missing.append(icon_id)
    return exported, missing


def write_seed(items: List[Dict]) -> None:
    output_path = DATA_DIR / "items_seed.json"
    output_path.write_text(json.dumps(items, indent=2), encoding="utf-8")
    print(f"Wrote {len(items)} items to {output_path}")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Extract wearable items and icons into the local project."
    )
    parser.add_argument(
        "--game-root",
        type=Path,
        default=DEFAULT_GAME_ROOT,
        help="Path to the Kingdom Come: Deliverance 2 installation directory.",
    )
    args = parser.parse_args()

    localization = load_localization(args.game_root)
    items = collect_wearables(args.game_root, localization)
    write_seed(items)

    icon_ids = [item["icon_id"] for item in items]
    exported, missing = export_icons(args.game_root, icon_ids)
    print(f"Exported {exported} icons to {STATIC_ICONS}")
    if missing:
        print(
            f"{len(missing)} icons missing/failed -> using static/icons/{PLACEHOLDER_ICON}:"
        )
        print(", ".join(missing))


if __name__ == "__main__":
    main()

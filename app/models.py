"""Database models for armour and clothing items."""

from typing import Optional

from sqlmodel import Field, SQLModel


class ItemBase(SQLModel):
    icon: str = Field(
        max_length=500,
        description="URL to an image/icon representing the item.",
    )
    name: str = Field(index=True, description="Display name of the item.")
    item_id: str = Field(
        index=True,
        description="In-game UUID or code used with cheat commands.",
    )
    is_quest_item: bool = Field(
        default=False,
        description="True if the item is flagged as a quest item in the game data.",
    )
    category: str = Field(
        default="armour",
        description="Item category such as armour or clothing.",
    )
    stab_defense: int = Field(default=0, description="Stab defense rating.")
    slash_defense: int = Field(default=0, description="Slash defense rating.")
    blunt_defense: int = Field(default=0, description="Blunt defense rating.")
    conspicuousness: float = Field(default=0.0, description="Conspicuousness score.")
    noise: float = Field(default=0.0, description="Noise score.")
    visibility: float = Field(default=0.0, description="Visibility score.")
    charisma: float = Field(default=0.0, description="Charisma score.")
    slot_category: str = Field(
        default="body",
        description="Top-level equipment slot category (head/body/arms/legs).",
    )
    slot_subcategory: str = Field(
        default="body",
        description="Slot subcategory (e.g., helmet, plate, gloves).",
    )
    alt_id: str = Field(
        default="",
        description="Alternative identifier (typically the clothing asset name).",
    )
    alt_group: str = Field(
        default="",
        description="Grouping key for variant sets (e.g., base clothing without color).",
    )


class Item(ItemBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class ItemRead(ItemBase):
    id: int

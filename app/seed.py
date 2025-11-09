"""Utility script to seed the database from a JSON file."""

from __future__ import annotations

import json
from pathlib import Path

from sqlmodel import delete

from .database import DATA_DIR, create_db_and_tables, session_scope
from .models import Item

SEED_FILE = DATA_DIR / "items_seed.json"


def seed_database(seed_file: Path = SEED_FILE) -> None:
    if not seed_file.exists():
        raise FileNotFoundError(
            f"Seed file {seed_file} not found. "
            "Add your data before running the seeder."
        )

    with seed_file.open("r", encoding="utf-8") as f:
        items = json.load(f)

    if not isinstance(items, list):
        raise ValueError("Seed file must contain a JSON list of items.")

    create_db_and_tables()
    with session_scope() as session:
        session.exec(delete(Item))
        for row in items:
            session.add(Item(**row))

    print(f"Seeded {len(items)} items from {seed_file}.")


if __name__ == "__main__":
    seed_database()

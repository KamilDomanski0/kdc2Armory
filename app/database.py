"""Database helpers."""

from contextlib import contextmanager
from pathlib import Path
from typing import Iterator

from sqlalchemy import text
from sqlmodel import Session, SQLModel, create_engine

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)

DATABASE_URL = f"sqlite:///{DATA_DIR / 'items.db'}"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
)


def create_db_and_tables() -> None:
    SQLModel.metadata.create_all(engine)
    ensure_item_columns()


def get_session() -> Iterator[Session]:
    with Session(engine) as session:
        yield session


@contextmanager
def session_scope() -> Iterator[Session]:
    """Provide a transactional scope for scripts."""
    with Session(engine) as session:
        try:
            yield session
            session.commit()
        except Exception:
            session.rollback()
            raise


def ensure_item_columns() -> None:
    """Adds newly introduced columns when the SQLite file already exists."""
    with engine.connect() as connection:
        table_exists = connection.execute(
            text("SELECT name FROM sqlite_master WHERE type='table' AND name='item'")
        ).fetchone()
        if not table_exists:
            return
        columns = {
            row[1]
            for row in connection.execute(text("PRAGMA table_info('item')"))
        }
        if "is_quest_item" not in columns:
            connection.execute(
                text("ALTER TABLE item ADD COLUMN is_quest_item BOOLEAN DEFAULT 0")
            )
        if "courage" not in columns:
            connection.execute(
                text("ALTER TABLE item ADD COLUMN courage REAL DEFAULT 0.0")
            )
        if "capacity" not in columns:
            connection.execute(
                text("ALTER TABLE item ADD COLUMN capacity REAL DEFAULT 0.0")
            )
        if "stamina" not in columns:
            connection.execute(
                text("ALTER TABLE item ADD COLUMN stamina REAL DEFAULT 0.0")
            )
        if "speed" not in columns:
            connection.execute(
                text("ALTER TABLE item ADD COLUMN speed REAL DEFAULT 0.0")
            )
        if "price" not in columns:
            connection.execute(
                text("ALTER TABLE item ADD COLUMN price INTEGER DEFAULT NULL")
            )
        if "stab_damage" not in columns:
            connection.execute(
                text("ALTER TABLE item ADD COLUMN stab_damage REAL DEFAULT 0.0")
            )
        if "slash_damage" not in columns:
            connection.execute(
                text("ALTER TABLE item ADD COLUMN slash_damage REAL DEFAULT 0.0")
            )
        if "blunt_damage" not in columns:
            connection.execute(
                text("ALTER TABLE item ADD COLUMN blunt_damage REAL DEFAULT 0.0")
            )
        if "weapon_defense" not in columns:
            connection.execute(
                text("ALTER TABLE item ADD COLUMN weapon_defense REAL DEFAULT 0.0")
            )
        if "durability" not in columns:
            connection.execute(
                text("ALTER TABLE item ADD COLUMN durability REAL DEFAULT 0.0")
            )
        if "reach" not in columns:
            connection.execute(
                text("ALTER TABLE item ADD COLUMN reach REAL DEFAULT 0.0")
            )
        if "weapon_speed" not in columns:
            connection.execute(
                text("ALTER TABLE item ADD COLUMN weapon_speed REAL DEFAULT 0.0")
            )
        if "weight" not in columns:
            connection.execute(
                text("ALTER TABLE item ADD COLUMN weight REAL DEFAULT 0.0")
            )
        if "strength_requirement" not in columns:
            connection.execute(
                text(
                    "ALTER TABLE item ADD COLUMN strength_requirement REAL DEFAULT 0.0"
                )
            )
        if "agility_requirement" not in columns:
            connection.execute(
                text(
                    "ALTER TABLE item ADD COLUMN agility_requirement REAL DEFAULT 0.0"
                )
            )

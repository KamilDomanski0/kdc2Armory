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

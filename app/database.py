"""Database helpers."""

from contextlib import contextmanager
from pathlib import Path
from typing import Iterator

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

"""FastAPI entrypoint for the KCD armour service."""

from __future__ import annotations

from pathlib import Path
from typing import List

from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy import or_, func
from sqlmodel import Session, select

from .database import create_db_and_tables, get_session
from .models import Item, ItemRead

BASE_DIR = Path(__file__).resolve().parent.parent
STATIC_DIR = BASE_DIR / "static"

app = FastAPI(
    title="Kingdom Come Armour Service",
    version="0.1.0",
    description="Catalogue of armour and clothing items with searchable metadata.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


@app.on_event("startup")
def on_startup() -> None:
    create_db_and_tables()


SORTABLE_FIELDS = {
    "name": Item.name,
    "item_id": Item.item_id,
    "stab_defense": Item.stab_defense,
    "slash_defense": Item.slash_defense,
    "blunt_defense": Item.blunt_defense,
    "conspicuousness": Item.conspicuousness,
    "noise": Item.noise,
    "visibility": Item.visibility,
    "charisma": Item.charisma,
}


@app.get("/api/items", response_model=List[ItemRead])
def list_items(
    search: str = Query(
        default="",
        description="Filter results by name, item id, or category.",
    ),
    sort: str = Query(default="name", description="Column to sort by."),
    direction: str = Query(default="asc", pattern="^(asc|desc)$"),
    session: Session = Depends(get_session),
) -> List[Item]:
    if sort not in SORTABLE_FIELDS:
        raise HTTPException(status_code=400, detail=f"Unsupported sort column: {sort}")

    statement = select(Item)
    if search:
        like = f"%{search.lower()}%"
        statement = statement.where(
            or_(
                func.lower(Item.name).like(like),
                func.lower(Item.item_id).like(like),
                func.lower(Item.alt_id).like(like),
                func.lower(Item.category).like(like),
            )
        )

    order_column = SORTABLE_FIELDS[sort]
    if direction == "desc":
        statement = statement.order_by(order_column.desc())
    else:
        statement = statement.order_by(order_column.asc())

    results = session.exec(statement).all()
    return results


@app.get("/", include_in_schema=False)
def index() -> FileResponse:
    index_file = STATIC_DIR / "index.html"
    if not index_file.exists():
        raise HTTPException(
            status_code=500,
            detail="Frontend bundle missing. Did you run the build?",
        )
    return FileResponse(index_file)

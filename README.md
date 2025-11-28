# KCD Armour Catalogue Service

FastAPI service backed by SQLite that exposes every wearable item from Kingdom Come: Deliverance II through:

- /api/items - searchable JSON feed (filters + sortable columns for icon, name, item UUID, alternative ID, stab/slash/blunt defence, conspicuousness, noise, visibility, charisma, horse stats, weapon damage/handling, requirements, and quest flag).
- / - lightweight front-end with a search bar, sortable headers, filter toggles, locally served in-game icons, and dedicated tabs for armour/clothing, horse tack, and weapons.
- The UI groups armour results into collapsible head/body/arms/legs buckets (with per-slot subcategories) and keeps column headers sticky while scrolling large lists. Within each subcategory, items are further grouped into variant sets (sharing the same alternative ID/clothing asset) with their own expandable sections. Horse and weapon tabs adopt the same variant grouping, organised by tack slot and weapon type respectively, so collapsing/expanding behaves consistently across all equipment views.
- **Stat note:** values come straight from item.xml (i.e., base stats at 100% condition, without perk/layer/quality modifiers). Armour rows therefore mirror raw defence/stealth values, horse gear exposes courage/capacity/stamina/speed, and weapons list their slash/stab/blunt damage, durability, reach, handling speed, weight, and STR/AGI requirements. The numbers shown inside the game UI can differ because the engine applies condition scaling, layering multipliers, and perk bonuses at runtime.
- Only human-wearable items are included; horse tack, animal gear, and female-only clothing (prefixed F_) are filtered out. NPC-only outfits and quest rewards are included for completeness, but both categories can be hidden via the default-on toggles in the UI.

All data and artwork are extracted directly from your installed game files so the catalogue always mirrors the current build.

## Project layout

```
kdc2/
├── app/                  # FastAPI app, SQLModel models and DB helpers
├── data/items_seed.json  # Auto-generated seed consumed by app/seed.py
├── scripts/              # Tooling for data/icon extraction
├── static/               # Front-end + /static/icons from the game
├── requirements.txt
└── Dockerfile
```

## Local setup

```powershell
cd kdc2
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
```

Save game data and icons:
```powershell
py .\scripts\build_wearables.py --game-root "C:\Program Files (x86)\Steam\steamapps\common\KingdomComeDeliverance2"
```

Seed (or re-seed) the DB:

```powershell
python -m app.seed
```

Run the service:

```powershell
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload
```

Visit `http://localhost:8000` for the UI and `http://localhost:8000/docs` for the interactive API schema.

## Refresh data and icons from the game

1. Ensure KCD2 is installed (default path: `C:\Program Files (x86)\Steam\steamapps\common\KingdomComeDeliverance2`).
2. Run the extractor; it will parse `item.xml` + `item__unique.xml`, resolve English localisation, export every wearable icon from `IPL_GameData.pak`, and rewrite `data/items_seed.json`.

   ```powershell
   .\.venv\Scripts\python.exe scripts/build_wearables.py `
     --game-root "C:\Program Files (x86)\Steam\steamapps\common\KingdomComeDeliverance2"
   ```

3. Re-seed to push the new dataset into SQLite:

   ```powershell
   python -m app.seed
   ```

The script produces ~2.7k catalogue rows and ~2.3k PNG icons under `static/icons/`, falling back to `_missing.png` if the engine uses placeholder art. Because every wearable entry extracted from the game files (including NPC-only outfits and quest rewards) is listed, some pieces may not rig or animate correctly on Henry's player model. The UI therefore exposes **Hide NPC items** and **Hide quest items** toggles (both enabled by default) so you can filter the list down to practical gear quickly.


### Quick refresh & run

```powershell
py .\scripts\build_wearables.py --game-root "C:\Program Files (x86)\Steam\steamapps\common\KingdomComeDeliverance2"
.\.venv\Scripts\python.exe -m app.seed
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload
```

If Windows reports that `data\items.db` is in use, close any Python/Uvicorn processes still holding the file, delete it, and rerun the commands above.

## API quick reference

```
GET /api/items?search=<text>&sort=<column>&direction=asc|desc
```

`sort` accepts:
`name`, `item_id`, `stab_defense`, `slash_defense`, `blunt_defense`,
`stab_damage`, `slash_damage`, `blunt_damage`, `weapon_defense`,
`durability`, `reach`, `weapon_speed`, `weight`,
`strength_requirement`, `agility_requirement`,
`conspicuousness`, `noise`, `visibility`, `charisma`,
`courage`, `capacity`, `stamina`, `speed`, `price`.

Example:

```
GET /api/items?search=brigandine&sort=slash_defense&direction=desc
```

## Deploying on Amazon EC2

You can run the service on EC2 either with Docker or directly on the host OS.

### Option 1 — Docker container

**Pros**
1. Identical environment everywhere (build locally, run on EC2 without surprises).
2. Easy rollbacks/rollouts by swapping images or using blue/green deployments.
3. Out-of-the-box process supervision handled by Docker; logs stream via `docker logs`.
4. Simplified dependency story (no Python/system packages bleeding onto the host).

**Cons**
1. Slightly higher resource usage (Docker daemon + overlay filesystem).
2. Need to manage image updates (push to ECR/Docker Hub, pull on EC2).
3. Extra networking layer if you later hook up load balancers (map host ports, etc.).

**Steps**
```bash
docker build -t kcd-armour .
docker tag kcd-armour <your-account>.dkr.ecr.<region>.amazonaws.com/kcd-armour:latest
# push to ECR (or Docker Hub)

ssh ec2-user@your-instance
sudo yum install docker -y
sudo systemctl enable --now docker
docker pull <registry>/kcd-armour:latest
docker run -d --name kcd-armour -p 80:8000 \
  -v /srv/kcd2/data:/app/data \
  <registry>/kcd-armour:latest
```

Mount `/srv/kcd2/data` (or your preferred path) so `items.db` survives container restarts. Re-run `python -m app.seed` inside the container whenever you refresh the dataset.

### Option 2 — Native Uvicorn service

**Pros**
1. Minimal overhead; your instance runs only what you install.
2. Easier filesystem access (game data, logs) without bind-mounts.
3. Straightforward debugging with system tools (journalctl, systemctl).

**Cons**
1. You must manage Python, virtualenv, and OS packages manually.
2. Dependency conflicts more likely if the host is shared with other apps.
3. Need to configure a process supervisor yourself.

**Steps**
```bash
ssh ec2-user@your-instance
sudo yum install python3 git -y
git clone <your repo> /srv/kcd2
cd /srv/kcd2
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m app.seed
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

For long-running use, create a `systemd` unit:

```
[Unit]
Description=KCD Armour Service
After=network.target

[Service]
WorkingDirectory=/srv/kcd2
ExecStart=/srv/kcd2/.venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000
Restart=always
Environment=PYTHONUNBUFFERED=1

[Install]
WantedBy=multi-user.target
```

Enable with `sudo systemctl enable --now kcd-armour`.

## Utility scripts

- `python scripts/build_wearables.py --game-root "C:\Program Files (x86)\Steam\steamapps\common\KingdomComeDeliverance2"` — re-export icons and rebuild `data/items_seed.json` from your game install.
- `python scripts/list_pak.py "C:\Program Files (x86)\Steam\steamapps\common\KingdomComeDeliverance2\Data\IPL_GameData.pak" --contains "Spectacles"` — quick helper to inspect pak contents via substring matches (omit `--contains` to list entire archives).

## Updating the code

- `scripts/build_wearables.py` regenerates data/icons.
- `python -m app.seed` syncs JSON → SQLite.
- `.venv\Scripts\python.exe -m uvicorn app.main:app --reload` runs the service locally.

Keep `static/icons` and `data/items_seed.json` under version control so deployments (local or EC2) do not need the original game assets to serve the catalogue.

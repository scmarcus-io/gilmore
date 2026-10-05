from pathlib import Path
import sqlite3
from contextlib import closing
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field

ROOT = Path(__file__).parent
DB = ROOT / "swiftmap.db"
ALBUMS = {
    "Taylor Swift": "Tim McGraw|Picture to Burn|Teardrops on My Guitar|A Place in This World|Our Song|Should've Said No",
    "Fearless": "Fearless|Fifteen|Love Story|White Horse|You Belong with Me|Breathe|The Way I Loved You",
    "Speak Now": "Mine|Sparks Fly|Back to December|Speak Now|Dear John|Mean|Enchanted|Haunted|Long Live",
    "Red": "State of Grace|Red|Treacherous|I Knew You Were Trouble|All Too Well|22|Holy Ground|Begin Again",
    "1989": "Welcome to New York|Blank Space|Style|Out of the Woods|Shake It Off|Bad Blood|Wildest Dreams|Clean",
    "reputation": "...Ready for It?|End Game|I Did Something Bad|Don't Blame Me|Delicate|Look What You Made Me Do|Getaway Car|New Year's Day",
    "Lover": "I Forgot That You Existed|Cruel Summer|Lover|The Man|Miss Americana & the Heartbreak Prince|You Need to Calm Down|Afterglow|Daylight",
    "folklore": "the 1|cardigan|the last great american dynasty|exile|my tears ricochet|august|betty|peace|hoax",
    "evermore": "willow|champagne problems|gold rush|tolerate it|no body, no crime|happiness|ivy|evermore|right where you left me",
    "Midnights": "Lavender Haze|Maroon|Anti-Hero|Snow on the Beach|You're on Your Own, Kid|Midnight Rain|Question...?|Bejeweled|Karma|Mastermind",
    "The Tortured Poets Department": "Fortnight|The Tortured Poets Department|My Boy Only Breaks His Favorite Toys|Down Bad|So Long, London|But Daddy",
}

class Connection(BaseModel):
    source_id: int
    target_id: int
    note: str = Field(min_length=20, max_length=500)
    author: str = Field(default="Anonymous", max_length=60)


def connect():
    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with closing(connect()) as db:
        db.executescript("""
        CREATE TABLE IF NOT EXISTS songs (id INTEGER PRIMARY KEY, title TEXT NOT NULL, album TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS human_connections (
            id INTEGER PRIMARY KEY, source_id INTEGER NOT NULL, target_id INTEGER NOT NULL,
            note TEXT NOT NULL, author TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
        """)
        if db.execute("SELECT COUNT(*) FROM songs").fetchone()[0] == 0:
            songs = [(title, album) for album, titles in ALBUMS.items() for title in titles.split("|")]
            db.executemany("INSERT INTO songs(title, album) VALUES (?, ?)", songs)
        db.commit()


app = FastAPI(title="Swift Song Map")
init_db()

@app.get("/")
def home():
    return FileResponse(ROOT / "index.html")

@app.get("/static.css")
def css():
    return FileResponse(ROOT / "static.css", media_type="text/css")

@app.get("/static.js")
def javascript():
    return FileResponse(ROOT / "static.js", media_type="application/javascript")

@app.get("/api/songs")
def songs():
    with closing(connect()) as db:
        return [dict(row) for row in db.execute("SELECT * FROM songs ORDER BY album, id")]

@app.get("/api/albums")
def albums():
    return list(ALBUMS)

@app.get("/api/connections")
def connections():
    with closing(connect()) as db:
        human = [dict(row) for row in db.execute("SELECT *, 'human' AS kind FROM human_connections")]
    # Demo edges keep the prototype useful without an API key. Replace with model output later.
    pairs = [("Love Story", "Enchanted", "Romantic fairytale framing and destiny imagery."),
             ("All Too Well", "cardigan", "Memory, objects, and the ache of looking backward connect these narratives."),
             ("Cruel Summer", "august", "Summer imagery masks uncertainty and an emotionally complicated relationship."),
             ("Anti-Hero", "mirrorball", "Both examine performance, self-doubt, and the fear of being truly seen.")]
    ai = []
    with closing(connect()) as db:
        for source, target, reason in pairs:
            rows = db.execute("SELECT id FROM songs WHERE title IN (?, ?)", (source, target)).fetchall()
            if len(rows) == 2:
                ai.append({"source_id": rows[0][0], "target_id": rows[1][0], "kind": "ai", "note": reason, "author": "SwiftMap AI"})
    return human + ai

@app.post("/api/connections", status_code=201)
def add_connection(item: Connection):
    if item.source_id == item.target_id:
        raise HTTPException(400, "Choose two different songs.")
    with closing(connect()) as db:
        if db.execute("SELECT COUNT(*) FROM songs WHERE id IN (?, ?)", (item.source_id, item.target_id)).fetchone()[0] != 2:
            raise HTTPException(404, "Song not found.")
        cur = db.execute("INSERT INTO human_connections(source_id,target_id,note,author) VALUES (?,?,?,?)", item.model_dump().values())
        db.commit()
        return {"id": cur.lastrowid, **item.model_dump(), "kind": "human"}
